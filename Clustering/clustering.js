document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const numPointsInput = document.getElementById('numPoints');
    const numClustersInput = document.getElementById('numClusters');
    const numIterationsInput = document.getElementById('numIterations');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');

    const wcssElement = document.getElementById('wcss');
    const bcssElement = document.getElementById('bcss');

    let data = [];
    let centroids = [];
    let iterations = 0;
    let maxIterations = 100;
    let animationFrame;
    let isRunning = false;

    function generateData(numPoints) {
        const data = [];
        for (let i = 0; i < numPoints; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            data.push({ x, y, cluster: null });
        }
        return data;
    }

    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    function assignClusters(data, centroids) {
        data.forEach(point => {
            let minDist = Infinity;
            let closestCentroid = null;
            centroids.forEach((centroid, index) => {
                const dist = distance(point, centroid);
                if (dist < minDist) {
                    minDist = dist;
                    closestCentroid = index;
                }
            });
            point.cluster = closestCentroid;
        });
    }

    function updateCentroids(data, centroids) {
        const sums = centroids.map(() => ({ x: 0, y: 0, count: 0 }));
        data.forEach(point => {
            const centroid = sums[point.cluster];
            centroid.x += point.x;
            centroid.y += point.y;
            centroid.count += 1;
        });
        sums.forEach((sum, index) => {
            centroids[index].x = sum.count ? sum.x / sum.count : centroids[index].x;
            centroids[index].y = sum.count ? sum.y / sum.count : centroids[index].y;
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function calculateMetrics(data, centroids) {
        let wcss = 0; // Inicializar la suma de las distancias dentro del cluster
        let bcss = 0; // Inicializar la suma de las distancias entre clusters

        // Calcular WCSS y BCSS para cada punto de datos
        data.forEach(point => {
            // Calcular la distancia al cuadrado entre el punto y su centroide
            const distToCentroid = distance(point, centroids[point.cluster]);
            wcss += distToCentroid ** 2; // Agregar al WCSS
        });

        // Calcular el centroide global (media de todos los puntos)
        const globalCentroid = { x: 0, y: 0 };
        centroids.forEach(centroid => {
            globalCentroid.x += centroid.x;
            globalCentroid.y += centroid.y;
        });
        globalCentroid.x /= centroids.length;
        globalCentroid.y /= centroids.length;

        // Calcular BCSS sumando las distancias al cuadrado entre los centroides y el centroide global
        centroids.forEach(centroid => {
            const distToGlobalCentroid = distance(centroid, globalCentroid);
            bcss += distToGlobalCentroid ** 2; // Agregar al BCSS
        });

        // Multiplicar BCSS por el número total de puntos para obtener la suma de las distancias entre clusters
        bcss *= data.length;

        return { wcss, bcss }; // Devolver las métricas calculadas
    }

    function updateMetrics() {
        // Calcular las métricas
        const { wcss, bcss } = calculateMetrics(data, centroids);

        // Mostrar las métricas en el HTML
        wcssElement.textContent = wcss.toFixed(2);
        bcssElement.textContent = bcss.toFixed(2);
    }

    function draw(data, centroids) {
        ctx.clearRect(0, 0, width, height);
        const colors = centroids.map(() => getRandomColor());
        data.forEach(point => {
            ctx.fillStyle = colors[point.cluster];
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
        centroids.forEach((centroid, index) => {
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.arc(centroid.x, centroid.y, 10, 0, 2 * Math.PI);
            ctx.fill();
        });
        updateMetrics();
    }

    function kmeans() {
        if (!isRunning) return;
        assignClusters(data, centroids);
        updateCentroids(data, centroids);
        draw(data, centroids);
        iterations += 1;
        if (iterations < maxIterations) {
            animationFrame = requestAnimationFrame(kmeans);
        } else {
            stop();
        }
    }

    function start() {
        isRunning = true;
        iterations = 0;
        data = generateData(parseInt(numPointsInput.value));
        centroids = kmeansPP(data, parseInt(numClustersInput.value));
        maxIterations = parseInt(numIterationsInput.value);
        kmeans();
    }

    function pause() {
        isRunning = false;
        cancelAnimationFrame(animationFrame);
    }

    function reset() {
        isRunning = false;
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, width, height);
        wcssElement.textContent = '0';
        bcssElement.textContent = '0';
    }

    function stop() {
        isRunning = false;
        cancelAnimationFrame(animationFrame);
    }

    function kmeansPP(data, k) {
        // Implementar el método K-means++ para inicializar los centroides
        const centroids = [data[Math.floor(Math.random() * data.length)]];
        while (centroids.length < k) {
            let maxDist = -1;
            let newCentroid = null;
            data.forEach(point => {
                const dist = Math.min(...centroids.map(centroid => distance(point, centroid)));
                if (dist > maxDist) {
                    maxDist = dist;
                    newCentroid = point;
                }
            });
            centroids.push(newCentroid);
        }
        return centroids;
    }

    startButton.addEventListener('click', start);
    pauseButton.addEventListener('click', pause);
    resetButton.addEventListener('click', reset);
});
