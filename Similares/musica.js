let songs = [
    { name: "Bohemian Rhapsody", features: [76, 42, 354] },
    { name: "Shape of You", features: [95, 56, 234] },
    { name: "Stairway to Heaven", features: [80, 48, 482] },
    { name: "Despacito", features: [89, 45, 230] },
    { name: "Billie Jean", features: [117, 50, 293] },
    { name: "Hotel California", features: [75, 47, 391] },
    { name: "Imagine", features: [74, 44, 187] },
    { name: "Hey Jude", features: [67, 46, 431] },
    { name: "Yesterday", features: [61, 43, 157] },
    { name: "Thriller", features: [118, 49, 357] }
];

function distanceFunc(a, b) {
    return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

class Node {
    constructor(song) {
        this.song = song;
        this.radius = 0;
        this.inside = null;
        this.outside = null;
    }
}

class VPTree {
    constructor(songs, distanceFunc) {
        this.distanceFunc = distanceFunc;
        this.root = this.buildTree(songs);
    }

    buildTree(songs) {
        if (songs.length === 0) return null;
        const index = Math.floor(Math.random() * songs.length);
        const song = songs[index];
        const node = new Node(song);
        songs.splice(index, 1);
        if (songs.length === 0) return node;
        const distances = songs.map(s => this.distanceFunc(song.features, s.features));
        const median = this.median(distances);
        node.radius = median;
        const insideSongs = songs.filter((s, i) => distances[i] <= median);
        const outsideSongs = songs.filter((s, i) => distances[i] > median);
        node.inside = this.buildTree(insideSongs);
        node.outside = this.buildTree(outsideSongs);
        return node;
    }

    median(values) {
        values.sort((a, b) => a - b);
        const mid = Math.floor(values.length / 2);
        return values[mid];
    }

    search(song, maxResults, node = this.root, neighbors = []) {
        if (!node) return neighbors;
        const dist = this.distanceFunc(song.features, node.song.features);
        if (neighbors.length < maxResults || dist < neighbors[0].distance) {
            neighbors.push({ song: node.song, distance: dist });
            neighbors.sort((a, b) => b.distance - a.distance);
            if (neighbors.length > maxResults) neighbors.shift();
        }
        const checkInsideFirst = dist < node.radius;
        if (checkInsideFirst) {
            this.search(song, maxResults, node.inside, neighbors);
            if (neighbors.length < maxResults || Math.abs(node.radius - dist) < neighbors[0].distance) {
                this.search(song, maxResults, node.outside, neighbors);
            }
        } else {
            this.search(song, maxResults, node.outside, neighbors);
            if (neighbors.length < maxResults || Math.abs(node.radius - dist) < neighbors[0].distance) {
                this.search(song, maxResults, node.inside, neighbors);
            }
        }
        return neighbors;
    }

    getSuggestions(input) {
        const suggestions = songs.filter(song =>
            song.name.toLowerCase().includes(input.toLowerCase())
        );
        return suggestions;
    }
}

const tree = new VPTree(songs, distanceFunc);

const songNameInput = document.getElementById('songName');
const suggestionsList = document.getElementById('suggestionsList');
const suggestionsContainer = document.querySelector('.suggestions');

songNameInput.addEventListener('input', function () {
    const input = this.value.trim();
    if (input.length === 0) {
        suggestionsContainer.style.display = 'none';
        suggestionsList.innerHTML = '';
        return;
    }

    const suggestions = tree.getSuggestions(input);
    if (suggestions.length > 0) {
        suggestionsContainer.style.display = 'block';
        suggestionsList.innerHTML = '';
        suggestions.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.name;
            li.addEventListener('click', function () {
                songNameInput.value = song.name;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsList.appendChild(li);
        });
    } else {
        suggestionsContainer.style.display = 'none';
        suggestionsList.innerHTML = '';
    }
});
function addsongs() {
    const songsName = document.getElementById('songsName').value.trim();
    const songsFeaturesStr = document.getElementById('songsFeatures').value.trim();
    const songsFeatures = songsFeaturesStr.split(',').map(Number);

    if (!songsName || !songsFeaturesStr) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const newsongs = {
        name: songsName,
        features: songsFeatures
    };

    songs.push(newsongs);
    tree.root = tree.buildTree(songs);

    document.getElementById('songsName').value = '';
    document.getElementById('songsFeatures').value = '';
}

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const songName = document.getElementById('songName').value;

    // Find the song by name
    const foundSong = songs.find(song => song.name.toLowerCase() === songName.toLowerCase());

    if (foundSong) {
        const maxResults = 2;
        const similarSongs = tree.search(foundSong, maxResults);

        // Clear previous results
        const resultsContainer = document.getElementById('similarSongs');
        resultsContainer.innerHTML = '';

        // Display new results
        similarSongs.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Name:</strong> ${item.song.name}<br>
                <strong>Features:</strong> ${item.song.features.join(', ')}<br>
                <strong>Distance:</strong> ${item.distance.toFixed(2)}
            `;
            resultsContainer.appendChild(li);
        });
    } else {
        alert(`No se encontró ninguna canción con el nombre "${songName}".`);
    }
});