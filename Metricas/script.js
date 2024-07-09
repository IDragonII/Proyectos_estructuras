const puntos = [];
let lineas = [];

function drawCartesianPlane(xMin, xMax, yMin, yMax) {
    const canvas = document.getElementById('planoCartesiano');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const stepX = width / (xMax - xMin);
    const stepY = height / (yMax - yMin);

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Dibujar ejes
    ctx.beginPath();
    ctx.moveTo((0 - xMin) * stepX, 0);
    ctx.lineTo((0 - xMin) * stepX, height);
    ctx.moveTo(0, (yMax - 0) * stepY);
    ctx.lineTo(width, (yMax - 0) * stepY);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Dibujar marcas de los ejes
    ctx.strokeStyle = 'grey';

    // Eje X
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x !== 0) {
            ctx.beginPath();
            ctx.moveTo((x - xMin) * stepX, (yMax - 0) * stepY - 5);
            ctx.lineTo((x - xMin) * stepX, (yMax - 0) * stepY + 5);
            ctx.stroke();
        }
    }

    // Eje Y
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y !== 0) {
            ctx.beginPath();
            ctx.moveTo((0 - xMin) * stepX - 5, (yMax - y) * stepY);
            ctx.lineTo((0 - xMin) * stepX + 5, (yMax - y) * stepY);
            ctx.stroke();
        }
    }

    // Dibujar números en los ejes
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';

    // Eje X
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        if (x !== 0) {
            ctx.fillText(x, (x - xMin) * stepX, (yMax - 0) * stepY + 15);
        }
    }

    // Eje Y
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
        if (y !== 0) {
            ctx.fillText(y, (0 - xMin) * stepX + 15, (yMax - y) * stepY);
        }
    }
    // Dibujar puntos
    ctx.fillStyle = 'red';
    puntos.forEach(function (punto, index) {
        ctx.beginPath();
        ctx.arc((punto.x - xMin) * stepX, (yMax - punto.y) * stepY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`P${index + 1}: (${punto.x.toFixed(1)}, ${punto.y.toFixed(1)})`, (punto.x - xMin) * stepX, (yMax - punto.y) * stepY - 10);
    });

    // Dibujar líneas
    ctx.strokeStyle = 'blue';
    lineas.forEach(function (linea) {
        const punto1 = puntos[linea[0]];
        const punto2 = puntos[linea[1]];
        ctx.beginPath();
        ctx.moveTo((punto1.x - xMin) * stepX, (yMax - punto1.y) * stepY);
        ctx.lineTo((punto2.x - xMin) * stepX, (yMax - punto2.y) * stepY);
        ctx.stroke();
    });
}

function actualizarSelectsPuntos() {
    const punto1Select = document.getElementById('punto1Select');
    const punto2Select = document.getElementById('punto2Select');
    punto1Select.innerHTML = '';
    punto2Select.innerHTML = '';
    puntos.forEach(function (punto, index) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Punto ${index + 1}`;
        punto1Select.appendChild(option.cloneNode(true));
        punto2Select.appendChild(option);
    });
}

function calcularDistancia(punto1, punto2) {
    const dx = punto1.x - punto2.x;
    const dy = punto1.y - punto2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function dibujarLinea() {
    const punto1Index = parseInt(document.getElementById('punto1Select').value);
    const punto2Index = parseInt(document.getElementById('punto2Select').value);

    lineas.push([punto1Index, punto2Index]);
    if (punto1Index === punto2Index) {
        const distanciaText = "La distancia entre un punto y sí mismo es 0.";
        const distanciaDiv = document.createElement('div');
        distanciaDiv.textContent = distanciaText;
        document.getElementById('distancias').appendChild(distanciaDiv);
        drawCartesianPlane(
            parseInt(document.getElementById('xMin').value),
            parseInt(document.getElementById('xMax').value),
            parseInt(document.getElementById('yMin').value),
            parseInt(document.getElementById('yMax').value)
        );
    } else {
        const distancia = calcularDistancia(puntos[punto1Index], puntos[punto2Index]);
        const distanciaText = `Punto ${punto1Index + 1} a Punto ${punto2Index + 1} = ${distancia.toFixed(2)}`;
        const distanciaDiv = document.createElement('div');
        distanciaDiv.textContent = distanciaText;
        document.getElementById('distancias').appendChild(distanciaDiv);
        drawCartesianPlane(
            parseInt(document.getElementById('xMin').value),
            parseInt(document.getElementById('xMax').value),
            parseInt(document.getElementById('yMin').value),
            parseInt(document.getElementById('yMax').value)
        );
    }
}



function limpiarPlano() {
    puntos.length = 0;
    lineas.length = 0;
    const xMin = parseInt(document.getElementById('xMin').value);
    const xMax = parseInt(document.getElementById('xMax').value);
    const yMin = parseInt(document.getElementById('yMin').value);
    const yMax = parseInt(document.getElementById('yMax').value);
    drawCartesianPlane(xMin, xMax, yMin, yMax);
    actualizarSelectsPuntos();
    document.getElementById('distancias').innerHTML = '';
}

document.getElementById('updateButton').addEventListener('click', function () {
    const xMin = parseInt(document.getElementById('xMin').value);
    const xMax = parseInt(document.getElementById('xMax').value);
    const yMin = parseInt(document.getElementById('yMin').value);
    const yMax = parseInt(document.getElementById('yMax').value);
    drawCartesianPlane(xMin, xMax, yMin, yMax);
});

document.getElementById('planoCartesiano').addEventListener('click', function (event) {
    const canvas = document.getElementById('planoCartesiano');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xMin = parseInt(document.getElementById('xMin').value);
    const xMax = parseInt(document.getElementById('xMax').value);
    const yMin = parseInt(document.getElementById('yMin').value);
    const yMax = parseInt(document.getElementById('yMax').value);
    const stepX = canvas.width / (xMax - xMin);
    const stepY = canvas.height / (yMax - yMin);
    const punto = {
        x: (x / stepX) + xMin,
        y: yMax - (y / stepY)
    };
    puntos.push(punto);
    actualizarSelectsPuntos();
    drawCartesianPlane(xMin, xMax, yMin, yMax);
});


document.getElementById('clearButton').addEventListener('click', limpiarPlano);

drawCartesianPlane(-10, 10, -10, 10);