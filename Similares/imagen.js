let images = [
    { id: 1, name: 'atardecer.jpg', features: [123, 117, 93, 0.5, 0.8] },
    { id: 2, name: 'bosque.jpg', features: [34, 78, 56, 0.6, 0.7] },
    { id: 3, name: 'oceano.jpg', features: [52, 152, 219, 0.4, 0.9] },
    { id: 4, name: 'montaña.jpg', features: [67, 99, 123, 0.7, 0.6] },
    { id: 5, name: 'ciudad.jpg', features: [100, 100, 100, 0.8, 0.5] },
    { id: 6, name: 'desierto.jpg', features: [201, 170, 102, 0.3, 0.4] },
    { id: 7, name: 'rio.jpg', features: [70, 130, 180, 0.5, 0.7] },
    { id: 8, name: 'cascada.jpg', features: [120, 180, 190, 0.6, 0.8] },
    { id: 9, name: 'pradera.jpg', features: [85, 107, 47, 0.4, 0.6] },
    { id: 10, name: 'nieve.jpg', features: [240, 248, 255, 0.5, 0.7] },
    { id: 11, name: 'playa.jpg', features: [210, 180, 140, 0.4, 0.9] },
    { id: 12, name: 'volcan.jpg', features: [50, 50, 50, 0.7, 0.5] },
    { id: 13, name: 'selva.jpg', features: [34, 139, 34, 0.6, 0.8] },
    { id: 14, name: 'glaciar.jpg', features: [173, 216, 230, 0.5, 0.6] },
    { id: 15, name: 'cueva.jpg', features: [70, 70, 70, 0.6, 0.5] },
    { id: 16, name: 'isla.jpg', features: [144, 238, 144, 0.4, 0.7] },
    { id: 17, name: 'campo.jpg', features: [154, 205, 50, 0.5, 0.8] },
    { id: 18, name: 'noche.jpg', features: [25, 25, 112, 0.5, 0.7] },
    { id: 19, name: 'amanecer.jpg', features: [255, 223, 186, 0.6, 0.7] },
    { id: 20, name: 'puente.jpg', features: [105, 105, 105, 0.7, 0.6] }
];

let nextImageId = images.length + 1;

function euclideanDistance(a, b) {
    return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

class Node {
    constructor(image) {
        this.image = image;
        this.radius = 0;
        this.inside = null;
        this.outside = null;
    }
}

class VPTree {
    constructor(images, distanceFunc) {
        this.distanceFunc = distanceFunc;
        this.root = this.buildTree(images);
    }

    buildTree(images) {
        if (images.length === 0) return null;
        const index = Math.floor(Math.random() * images.length);
        const image = images[index];
        const node = new Node(image);
        images.splice(index, 1);
        if (images.length === 0) return node;

        const distances = images.map(img => this.distanceFunc(image.features, img.features));
        const median = this.median(distances);
        node.radius = median;

        const insideImages = images.filter((img, i) => distances[i] <= median);
        const outsideImages = images.filter((img, i) => distances[i] > median);

        node.inside = this.buildTree(insideImages);
        node.outside = this.buildTree(outsideImages);

        return node;
    }

    median(values) {
        values.sort((a, b) => a - b);
        const mid = Math.floor(values.length / 2);
        return values[mid];
    }

    search(image, maxResults, node = this.root, neighbors = []) {
        if (!node) return neighbors;
        const dist = this.distanceFunc(image.features, node.image.features);

        if (neighbors.length < maxResults || dist < neighbors[0].distance) {
            neighbors.push({ image: node.image, distance: dist });
            neighbors.sort((a, b) => b.distance - a.distance);
            if (neighbors.length > maxResults) neighbors.shift();
        }

        const checkInsideFirst = dist < node.radius;

        if (checkInsideFirst) {
            this.search(image, maxResults, node.inside, neighbors);
            if (neighbors.length < maxResults || Math.abs(node.radius - dist) < neighbors[0].distance) {
                this.search(image, maxResults, node.outside, neighbors);
            }
        } else {
            this.search(image, maxResults, node.outside, neighbors);
            if (neighbors.length < maxResults || Math.abs(node.radius - dist) < neighbors[0].distance) {
                this.search(image, maxResults, node.inside, neighbors);
            }
        }

        return neighbors;
    }
}

const tree = new VPTree(images, euclideanDistance);

function searchSimilarImages() {
    const queryName = document.getElementById('queryName').value.trim().toLowerCase();
    const queryImage = images.find(img => img.name.toLowerCase() === queryName);
    if (!queryImage) {
        alert('No se encontró ninguna imagen con ese nombre.');
        return;
    }

    const maxResults = 2;
    const similarImages = tree.search(queryImage, maxResults);

    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    similarImages.forEach(similar => {
        const li = document.createElement('li');
        li.textContent = `${similar.image.name} - Distancia: ${similar.distance.toFixed(2)}`;
        resultsList.appendChild(li);
    });
}

function addImage() {
    const imageName = document.getElementById('imageName').value.trim();
    const imageFeaturesStr = document.getElementById('imageFeatures').value.trim();
    const imageFeatures = imageFeaturesStr.split(',').map(Number);

    if (!imageName || !imageFeaturesStr) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const newImage = {
        id: nextImageId++,
        name: imageName,
        features: imageFeatures
    };

    images.push(newImage);
    tree.root = tree.buildTree(images); // Rebuild the tree with the updated images

    alert(`Imagen "${imageName}" agregada correctamente.`);

    // Clear form fields
    document.getElementById('imageName').value = '';
    document.getElementById('imageFeatures').value = '';
}

function showSuggestions() {
    const input = document.getElementById('queryName');
    const inputValue = input.value.trim().toLowerCase();

    const suggestions = images.filter(img => img.name.toLowerCase().includes(inputValue));

    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = suggestion.name;
        suggestionItem.classList.add('autocomplete-suggestion');
        suggestionItem.addEventListener('click', () => {
            input.value = suggestion.name;
            autocompleteList.innerHTML = ''; // Clear suggestions
        });
        autocompleteList.appendChild(suggestionItem);
    });

    if (inputValue === '') {
        autocompleteList.innerHTML = ''; // Clear suggestions if input is empty
    } else {
        autocompleteList.style.display = 'block';
    }
}

// Close autocomplete list when clicking outside of it
document.addEventListener('click', function (event) {
    const autocompleteList = document.getElementById('autocomplete-list');
    if (!event.target.closest('.autocomplete-container')) {
        autocompleteList.innerHTML = '';
    }
});