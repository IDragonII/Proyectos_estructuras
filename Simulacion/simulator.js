<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ball Tree Simulation</title>
<style>
    #canvas {
        width: 500px;
        height: 500px;
        border: 1px solid #ccc;
        position: relative;
    }
    .point {
        width: 8px;
        height: 8px;
        background-color: blue;
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
    .query-point {
        background-color: red;
    }
</style>
</head>
<body>
    <div id="canvas"></div>
    <br>
    <button onclick="findNearestNeighbors()">Find Nearest Neighbors</button>
    <br><br>
    <div id="results"></div>

    <script>
        // Generar puntos aleatorios en el canvas
        function generateRandomPoints(numPoints) {
            var canvas = document.getElementById('canvas');
            canvas.innerHTML = '';  // Limpiar el contenido actual

            for (var i = 0; i < numPoints; i++) {
                var x = Math.random() * canvas.offsetWidth;
                var y = Math.random() * canvas.offsetHeight;

                var point = document.createElement('div');
                point.className = 'point';
                point.style.left = x + 'px';
                point.style.top = y + 'px';
                canvas.appendChild(point);
            }
        }

        // Función para encontrar los vecinos más cercanos (simulación)
        function findNearestNeighbors() {
            var queryPoint = { x: Math.random() * 500, y: Math.random() * 500 };  // Punto de consulta aleatorio
            var queryPointElem = document.createElement('div');
            queryPointElem.className = 'point query-point';
            queryPointElem.style.left = queryPoint.x + 'px';
            queryPointElem.style.top = queryPoint.y + 'px';
            document.getElementById('canvas').appendChild(queryPointElem);

            // Simular encontrar vecinos más cercanos
            var results = document.getElementById('results');
            results.innerHTML = 'Query Point: (' + queryPoint.x.toFixed(2) + ', ' + queryPoint.y.toFixed(2) + ')<br>';
            results.innerHTML += 'Nearest Neighbors:<br>';
            results.innerHTML += 'Point 1: (x1, y1) - Distance: d1<br>';
            results.innerHTML += 'Point 2: (x2, y2) - Distance: d2<br>';
            results.innerHTML += '...';
        }

        // Generar 50 puntos aleatorios al cargar la página
        window.onload = function() {
            generateRandomPoints(50);
        };
    </script>
</body>
</html>
