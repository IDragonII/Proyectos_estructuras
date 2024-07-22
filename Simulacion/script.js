// Definir el tamaño del gráfico
const margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Crear un elemento SVG
const svg = d3.select("#tree-container").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Crear una escala para los ejes
const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

// Datos iniciales del Ball-Tree
let ballTree = {
    center: [50, 50],
    radius: 50,
    children: []
};

// Función para actualizar el gráfico
function update() {
    svg.selectAll("*").remove();

    // Dibujar los nodos del Ball-Tree
    function drawNode(node) {
        svg.append("circle")
            .attr("cx", xScale(node.center[0]))
            .attr("cy", yScale(node.center[1]))
            .attr("r", xScale(node.radius) - xScale(0))
            .attr("class", "node")
            .attr("stroke", node.color)
            .attr("fill", node.color);

        if (node.children) {
            node.children.forEach(drawNode);
        }
    }

    // Dibujar los puntos en el Ball-Tree
    function drawPoints(node) {
        if (node.children) {
            node.children.forEach(drawPoints);
        } else {
            node.points.forEach(point => {
                svg.append("circle")
                    .attr("cx", xScale(point[0]))
                    .attr("cy", yScale(point[1]))
                    .attr("r", 5)
                    .attr("class", "point");
            });
        }
    }

    drawNode(ballTree);
    drawPoints(ballTree);
}

// Función para agregar un punto al Ball-Tree
function addPoint() {
    const x = parseFloat(document.getElementById("x-coordinate").value);
    const y = parseFloat(document.getElementById("y-coordinate").value);
    if (!isNaN(x) && !isNaN(y)) {
        insertPoint(ballTree, [x, y]);
        update();
    }
}

// Función para insertar un punto en el Ball-Tree
function insertPoint(node, point) {
    if (!node.children) {
        if (!node.points) {
            node.points = [];
        }
        node.points.push(point);
        if (node.points.length > 3) {
            splitNode(node);
        }
    } else {
        let closestChild = node.children[0];
        let minDistance = distance(node.children[0].center, point);
        for (let child of node.children) {
            let d = distance(child.center, point);
            if (d < minDistance) {
                closestChild = child;
                minDistance = d;
            }
        }
        insertPoint(closestChild, point);
    }
}

// Función para dividir un nodo cuando tiene demasiados puntos
function splitNode(node) {
    node.children = [];
    for (let point of node.points) {
        let newNode = {
            center: point,
            radius: node.radius / 2,
            color: node.color === "red" ? "blue" : "red"
        };
        node.children.push(newNode);
        insertPoint(newNode, point);
    }
    delete node.points;
}

// Función para calcular la distancia euclidiana entre dos puntos
function distance(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], b[0]) + Math.pow(a[1] - b[1], b[1]));
}

// Inicializar el gráfico
update();
