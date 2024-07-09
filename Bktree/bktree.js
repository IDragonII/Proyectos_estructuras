        // JavaScript para interactuar con el árbol BK-tree y enviar/recibir datos al backend PHP
        class BKTreeNode {
            constructor(sequence, name, id) {
                this.sequence = sequence;
                this.name = name;
                this.id = id; // ID de la entrada en la base de datos
                this.children = {};
            }
        }

        class BKTree {
            constructor() {
                this.root = null;
            }

            insert(sequence, name, id) {
                if (!this.root) {
                    this.root = new BKTreeNode(sequence, name, id);
                } else {
                    let node = this.root;
                    while (true) {
                        const distance = levenshteinDistance(sequence, node.sequence);
                        if (node.children[distance]) {
                            node = node.children[distance];
                        } else {
                            node.children[distance] = new BKTreeNode(sequence, name, id);
                            break;
                        }
                    }
                }
            }

            search(target, maxDistance) {
                const result = [];
                const nodes = [this.root];
                while (nodes.length) {
                    const node = nodes.pop();
                    const distance = levenshteinDistance(target, node.sequence);
                    if (distance <= maxDistance) {
                        result.push({ name: node.name, sequence: node.sequence, distance: distance });
                    }
                    for (let d = distance - maxDistance; d <= distance + maxDistance; d++) {
                        if (node.children[d]) {
                            nodes.push(node.children[d]);
                        }
                    }
                }
                return result;
            }
        }

        function levenshteinDistance(seq1, seq2) {
            const lenSeq1 = seq1.length + 1;
            const lenSeq2 = seq2.length + 1;

            const matrix = Array.from(Array(lenSeq1), () => Array(lenSeq2).fill(0));

            for (let i = 0; i < lenSeq1; i++) {
                matrix[i][0] = i;
            }
            for (let j = 0; j < lenSeq2; j++) {
                matrix[0][j] = j;
            }

            for (let i = 1; i < lenSeq1; i++) {
                for (let j = 1; j < lenSeq2; j++) {
                    const cost = seq1[i - 1] === seq2[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1,      // Deletion
                        matrix[i][j - 1] + 1,      // Insertion
                        matrix[i - 1][j - 1] + cost // Substitution
                    );
                }
            }
            return matrix[lenSeq1 - 1][lenSeq2 - 1];
        }

        // Crear el árbol BK-tree y agregar secuencias de ADN con nombres desde la base de datos
        const bkTree = new BKTree();

        // Función para obtener secuencias y nombres desde la base de datos
        function fetchSequencesFromDatabase() {
            // Realizar una solicitud AJAX (o fetch) para obtener datos desde tu backend PHP
            // Supongamos que tu endpoint PHP devuelve un JSON con las secuencias y nombres
            fetch('fetch_sequences.php')
                .then(response => response.json())
                .then(data => {
                    data.forEach(seqObj => bkTree.insert(seqObj.sequence, seqObj.person_name, seqObj.id));
                })
                .catch(error => console.error('Error fetching sequences:', error));
        }

        // Llamar a la función para cargar las secuencias desde la base de datos al iniciar la aplicación
        fetchSequencesFromDatabase();

        // Función para agregar una nueva secuencia de ADN desde el frontend
        function addSequence() {
            const newSequenceInput = document.getElementById('new-sequence');
            const personNameInput = document.getElementById('person-name');
            const newSequence = newSequenceInput.value.trim();
            const personName = personNameInput.value.trim();

            if (newSequence && personName) {
                // Realizar una solicitud AJAX (o fetch) para agregar la secuencia y nombre a la base de datos
                fetch('add_sequence.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sequence: newSequence, person_name: personName })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            bkTree.insert(newSequence, personName, data.id);
                            newSequenceInput.value = '';
                            personNameInput.value = '';
                            alert(`Secuencia ${newSequence} asociada a ${personName} agregada.`);
                        } else {
                            alert('Error al agregar la secuencia. Por favor, inténtelo nuevamente.');
                        }
                    })
                    .catch(error => console.error('Error adding sequence:', error));
            } else {
                alert('Por favor, ingrese un nombre y una secuencia de ADN válida.');
            }
        }

        // Función para buscar secuencias de ADN similares desde el frontend
        function searchDNA() {
            const input = document.getElementById('dna-sequence').value.trim();
            const maxDistance = parseInt(document.getElementById('max-distance').value, 10);
            if (!input) {
                alert('Por favor, ingrese una secuencia de ADN para buscar.');
                return;
            }

            const results = bkTree.search(input, maxDistance);
            const resultsElement = document.getElementById('results');
            resultsElement.innerHTML = '';

            if (results.length === 0) {
                resultsElement.innerHTML = '<li>No se encontraron resultados.</li>';
            } else {
                resultsElement.innerHTML = '<li>ADN Encontrados:</li>'
                results.forEach(result => {
                    const li = document.createElement('li');
                    li.textContent = `${result.name}: ${result.sequence} (Distancia: ${result.distance})`;
                    resultsElement.appendChild(li);
                });
            }
        }

        // Función para mostrar gráficamente la secuencia de ADN buscada
        function displaySequence() {
            const input = document.getElementById('dna-sequence').value.trim();
            const sequenceDisplay = document.getElementById('sequence-display');
            sequenceDisplay.innerHTML = '';

            if (!input) return;

            for (let char of input) {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = `nucleotide ${char}`;
                sequenceDisplay.appendChild(span);
            }
        }