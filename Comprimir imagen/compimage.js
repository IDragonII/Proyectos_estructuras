        document.getElementById('uploadForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const file = document.getElementById('imageInput').files[0];

            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    // Crear un nuevo lienzo
                    const canvas = document.getElementById('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Convertir la imagen a Quadtree
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const quadTree = createQuadTree(imageData, 0, 0, canvas.width, canvas.height);

                    // Mostrar el Quadtree en el lienzo HTML
                    drawQuadTree(canvas, quadTree);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });

        function createQuadTree(imageData, x, y, width, height) {
            const leafSize = 4;
            const errorRate = 0.5;

            const quad = {
                x: x,
                y: y,
                width: width,
                height: height,
                color: null,
                isLeaf: false,
                children: []
            };

            const histogram = getHistogram(imageData, x, y, width, height);
            const color = colorFromHistogram(histogram);
            quad.color = color;

            if (width <= leafSize || height <= leafSize) {
                quad.isLeaf = true;
            } else {
                const lr = x + Math.floor(width / 2); // Redondear hacia abajo
                const tb = y + Math.floor(height / 2); // Redondear hacia abajo
                const tl = createQuadTree(imageData, x, y, lr - x, tb - y);
                const tr = createQuadTree(imageData, lr, y, width - (lr - x), tb - y);
                const bl = createQuadTree(imageData, x, tb, lr - x, height - (tb - y));
                const br = createQuadTree(imageData, lr, tb, width - (lr - x), height - (tb - y));
                quad.children = [tl, tr, bl, br];
            }

            return quad;
        }

        function getHistogram(imageData, x, y, width, height) {
            const histogram = {};
            for (let i = y; i < y + height; i++) {
                for (let j = x; j < x + width; j++) {
                    const index = (i * imageData.width + j) * 4;
                    const r = imageData.data[index];
                    const g = imageData.data[index + 1];
                    const b = imageData.data[index + 2];
                    const color = `${r},${g},${b}`;
                    if (!(color in histogram)) {
                        histogram[color] = 0;
                    }
                    histogram[color]++;
                }
            }
            return histogram;
        }

        function colorFromHistogram(hist) {
            let maxCount = 0;
            let mostFrequentColor = null;
            for (const color in hist) {
                if (hist.hasOwnProperty(color)) {
                    if (hist[color] > maxCount) {
                        maxCount = hist[color];
                        mostFrequentColor = color.split(',').map(Number);
                    }
                }
            }
            return mostFrequentColor;
        }

        function drawQuadTree(canvas, quad) {
            const ctx = canvas.getContext('2d');
            const queue = [quad];
            while (queue.length > 0) {
                const currentQuad = queue.shift();
                if (currentQuad.isLeaf) {
                    ctx.fillStyle = `rgb(${currentQuad.color[0]}, ${currentQuad.color[1]}, ${currentQuad.color[2]})`;
                    ctx.fillRect(currentQuad.x, currentQuad.y, currentQuad.width, currentQuad.height);
                } else {
                    queue.push(...currentQuad.children);
                }
            }
        }