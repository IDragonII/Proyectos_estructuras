document.getElementById('generate-points').addEventListener('click', function() {
    const numPoints = parseInt(document.getElementById('num-points').value);
    addRandomPoints(numPoints);
});

document.getElementById('add-point').addEventListener('click', function() {
    const x = parseFloat(document.getElementById('point-x').value);
    const y = parseFloat(document.getElementById('point-y').value);
    if (!isNaN(x) && !isNaN(y)) {
        points.push([x, y]);
        kdTree = buildKDTree(points);
        kdTreeData = [];
        traverseKDTree(kdTree);
        drawKDTree();
    } else {
        alert('Por favor, ingrese coordenadas válidas.');
    }
});

document.getElementById('remove-point').addEventListener('click', function() {
    const xToRemove = parseFloat(document.getElementById('point-x').value);
    const yToRemove = parseFloat(document.getElementById('point-y').value);
    if (!isNaN(xToRemove) && !isNaN(yToRemove)) {
        const indexToRemove = points.findIndex(point => point[0] === xToRemove && point[1] === yToRemove);
        if (indexToRemove !== -1) {
            points.splice(indexToRemove, 1);
            kdTree = buildKDTree(points);
            kdTreeData = [];
            traverseKDTree(kdTree);
            drawKDTree();
        } else {
            alert('El punto especificado no existe.');
        }
    } else {
        alert('Por favor, ingrese coordenadas válidas para el punto a eliminar.');
    }
});

class KDNode {
    constructor(point, axis, left = null, right = null) {
        this.point = point;
        this.axis = axis;
        this.left = left;
        this.right = right;
    }
}

function buildKDTree(points, depth = 0) {
    if (points.length === 0) {
        return null;
    }
    const axis = depth % 2;
    points.sort((a, b) => a[axis] - b[axis]);
    const medianIndex = Math.floor(points.length / 2);
    const medianPoint = points[medianIndex];
    return new KDNode(
        medianPoint,
        axis,
        buildKDTree(points.slice(0, medianIndex), depth + 1),
        buildKDTree(points.slice(medianIndex + 1), depth + 1)
    );
}

function distanceSquared(point1, point2) {
    return (point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2;
}

function nearestNeighbor(node, target, depth = 0, best = null) {
    if (node === null) {
        return best;
    }
    const axis = depth % 2;
    const nextBest = best === null || distanceSquared(target, node.point) < distanceSquared(target, best.point) ? node : best;
    const nextDepth = depth + 1;
    let nextNode = null;
    let oppositeNode = null;
    if (target[axis] < node.point[axis]) {
        nextNode = node.left;
        oppositeNode = node.right;
    } else {
        nextNode = node.right;
        oppositeNode = node.left;
    }
    best = nearestNeighbor(nextNode, target, nextDepth, nextBest);
    if (distanceSquared(target, best.point) > (target[axis] - node.point[axis]) ** 2) {
        best = nearestNeighbor(oppositeNode, target, nextDepth, best);
    }
    return best;
}

function kNearestNeighbors(node, target, k, depth = 0, heap = []) {
    if (node === null) {
        return heap;
    }
    const axis = depth % 2;
    const distance = distanceSquared(target, node.point);
    if (heap.length < k) {
        heap.push({ node: node, distance: distance });
        heap.sort((a, b) => a.distance - b.distance);
    } else if (distance < heap[heap.length - 1].distance) {
        heap[heap.length - 1] = { node: node, distance: distance };
        heap.sort((a, b) => a.distance - b.distance);
    }
    const nextNode = target[axis] < node.point[axis] ? node.left : node.right;
    const oppositeNode = target[axis] < node.point[axis] ? node.right : node.left;
    heap = kNearestNeighbors(nextNode, target, k, depth + 1, heap);
    if (heap.length < k || Math.abs(target[axis] - node.point[axis]) ** 2 < heap[heap.length - 1].distance) {
        heap = kNearestNeighbors(oppositeNode, target, k, depth + 1, heap);
    }
    return heap;
}
let kdTree;
// Conjunto inicial de puntos (x, y)
const points = [
];

let queryPoint = null;
let nearest = null;
let kNearest = null;
kdTree = buildKDTree(points);
// Visualización usando p5.js
let kdTreeData = [];
function traverseKDTree(node, depth = 0, minX = 0, maxX = 20, minY = 0, maxY = 20) {
    if (node === null) {
        return;
    }
    const axis = depth % 2;
    const point = {
        x: node.point[0],
        y: node.point[1],
        axis: axis,
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };
    kdTreeData.push(point);
    if (axis === 0) {
        traverseKDTree(node.left, depth + 1, minX, point.x, minY, maxY);
        traverseKDTree(node.right, depth + 1, point.x, maxX, minY, maxY);
    } else {
        traverseKDTree(node.left, depth + 1, minX, maxX, minY, point.y);
        traverseKDTree(node.right, depth + 1, minX, maxX, point.y, maxY);
    }
}
traverseKDTree(kdTree);

function setup() {
    createCanvas(500, 500).parent('sketch');
    textSize(12);
    textAlign(CENTER, CENTER);
    drawKDTree();
}

function drawKDTree() {
    background(255);

    // Dibujar ejes
    stroke(0);
    line(50, 450, 450, 450); // Eje X
    line(50, 450, 50, 50);   // Eje Y

    // Dibujar líneas de división y puntos
    kdTreeData.forEach(point => {
        const x = map(point.x, 0, 20, 50, 450);
        const y = map(point.y, 0, 20, 450, 50);
        stroke(0);
        fill(0);
        ellipse(x, y, 5, 5);
        text(`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, x, y - 10);
    });

    // Dibujar punto ingresado por click
    if (queryPoint !== null) {
        const qpX = map(queryPoint[0], 0, 20, 50, 450);
        const qpY = map(queryPoint[1], 0, 20, 450, 50);
        fill(255, 0, 0);
        ellipse(qpX, qpY, 10, 10);
        text(`(${queryPoint[0].toFixed(1)}, ${queryPoint[1].toFixed(1)})`, qpX, qpY - 10);
    }

    if (queryPoint !== null && nearest !== null && kNearest !== null) {
        // Dibujar punto de consulta
        const qpX = map(queryPoint[0], 0, 20, 50, 450);
        const qpY = map(queryPoint[1], 0, 20, 450, 50);
        fill(255, 0, 0);
        ellipse(qpX, qpY, 10, 10);

        // Encontrar la distancia máxima entre el punto de consulta y sus vecinos más cercanos
        let maxDistance = 0;
        kNearest.forEach(result => {
            const distance = Math.sqrt(result.distance);
            if (distance > maxDistance) {
                maxDistance = distance;
            }
        });

        // Dibujar el círculo que contiene a todos los vecinos cercanos
        const circleX = qpX;
        const circleY = qpY;
        const circleRadius = map(maxDistance, 0, 20, 0, 400); // Ajustar el radio al tamaño del canvas
        noFill();
        stroke(0, 0, 255);
        ellipse(circleX, circleY, circleRadius * 2, circleRadius * 2);

        // Dibujar el vecino más cercano y los otros vecinos dentro del círculo
        kNearest.forEach(result => {
            const knX = map(result.node.point[0], 0, 20, 50, 450);
            const knY = map(result.node.point[1], 0, 20, 450, 50);
            fill(0, 0, 255);
            ellipse(knX, knY, 10, 10);
        });

        // Mostrar resultados
        document.getElementById('query-point').textContent = `[${queryPoint[0]}, ${queryPoint[1]}]`;
        document.getElementById('nearest-neighbor').textContent = nearest ? `(${nearest.point[0]}, ${nearest.point[1]})` : '';
        document.getElementById('nearest-distance').textContent = nearest ? `Distancia: ${Math.sqrt(distanceSquared(queryPoint, nearest.point)).toFixed(2)}` : '';
        let kNearestText = '';
        if (kNearest) {
            kNearest.forEach((result, index) => {
                kNearestText += `${index + 1}: (${result.node.point[0]}, ${result.node.point[1]})\n`;
                kNearestText += `Distancia: ${Math.sqrt(result.distance).toFixed(2)}\n\n`; // Añadir la distancia al texto
            });
        }
        document.getElementById('k-nearest-neighbors').textContent = kNearestText;
    }
}

function mousePressed() {
    // Verificar si el clic del mouse está dentro del plano dibujado (canvas)
    if (mouseX >= 50 && mouseX <= 450 && mouseY >= 50 && mouseY <= 450) {
        const x = map(mouseX, 50, 450, 0, 20);
        const y = map(mouseY, 450, 50, 0, 20);
        queryPoint = [x, y];

        // Actualizar vecinos
        nearest = nearestNeighbor(kdTree, queryPoint);
        kNearest = kNearestNeighbors(kdTree, queryPoint, 3);

        drawKDTree();
    }
}
function addRandomPoints(numPoints) {
    const existingPoints = new Set(points.map(point => `${point[0].toFixed(1)},${point[1].toFixed(1)}`));
    let generatedPoints = 0;
    while (generatedPoints < numPoints) {
        let x, y;
        do {
            x = parseFloat((Math.random() * 20).toFixed(1));
            y = parseFloat((Math.random() * 20).toFixed(1));
        } while (existingPoints.has(`${x},${y}`));
        existingPoints.add(`${x},${y}`);
        points.push([x, y]);
        generatedPoints++;
    }
    // Reconstruir el kd-tree con los nuevos puntos
    kdTree = buildKDTree(points);
    // Actualizar la visualización
    kdTreeData = [];
    traverseKDTree(kdTree);
    drawKDTree();
}






