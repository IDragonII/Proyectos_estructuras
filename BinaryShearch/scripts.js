let binarySearchTree = null;

document.addEventListener('DOMContentLoaded', function() {
    fetch('fetch.php')
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data);
            binarySearchTree = buildBalancedBST(data);
            console.log('Árbol Binario de Búsqueda:', binarySearchTree);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayBooks(books) {
    const librosDiv = document.getElementById('libros');
    librosDiv.innerHTML = '';
    books.forEach(book => {
        librosDiv.innerHTML += `<p>${book.id}: ${book.nombre} by ${book.autor} (${book.fecha})</p>`;
    });
}

function buildBalancedBST(data) {
    if (data.length === 0) return null;

    // Ordenar los datos por nombre (para mantener el orden alfabético)
    data.sort((a, b) => a.nombre.localeCompare(b.nombre));

    function buildTree(start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = {
            id: data[mid].id,
            nombre: data[mid].nombre,
            autor: data[mid].autor,
            fecha: data[mid].fecha,
            left: buildTree(start, mid - 1),
            right: buildTree(mid + 1, end)
        };
        return node;
    }

    return buildTree(0, data.length - 1);
}

function searchBookByName(name) {
    if (!binarySearchTree) return null; // Retornar null si el árbol está vacío

    let results = []; // Arreglo para almacenar los resultados encontrados

    // Función auxiliar recursiva para buscar en el árbol
    function search(node) {
        if (!node) return;

        // Comparar el nombre buscado con el nombre del nodo actual
        if (name === node.nombre) {
            results.push(node); // Agregar el nodo actual al arreglo de resultados
        }

        // Si el nombre buscado es menor, buscar en el subárbol izquierdo
        if (name < node.nombre) {
            search(node.left);
        }
        // Si el nombre buscado es mayor, buscar en el subárbol derecho
        else if (name > node.nombre) {
            search(node.right);
        }
        // Si se encontró una coincidencia exacta, el flujo seguirá para el nodo actual
    }

    search(binarySearchTree); // Llamar a la función de búsqueda comenzando desde el nodo raíz

    return results; // Devolver el arreglo de resultados encontrados
}
function searchBookByAuthor(author) {
    if (!binarySearchTree) return null;

    let results = [];

    function traverse(node) {
        if (node) {
            traverse(node.left);
            if (node.autor === author) {
                results.push(node);
            }
            traverse(node.right);
        }
    }

    traverse(binarySearchTree);

    return results;
}

function searchBookByDate(date) {
    if (!binarySearchTree) return null;

    let results = [];

    function traverse(node) {
        if (node) {
            traverse(node.left);
            if (node.fecha === date) {
                results.push(node);
            }
            traverse(node.right);
        }
    }

    traverse(binarySearchTree);

    return results;
}

document.getElementById('insertForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const autor = document.getElementById('autor').value;
    const fecha = document.getElementById('fecha').value;

    fetch('insert.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nombre=${encodeURIComponent(nombre)}&autor=${encodeURIComponent(autor)}&fecha=${encodeURIComponent(fecha)}`,
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload(); // Recargar la página después de insertar
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
function searchBookById(id) {
    if (!binarySearchTree) return null;

    let result = null;

    function traverse(node) {
        if (node) {
            traverse(node.left);
            // Comparar el ID como texto o número según corresponda
            if (node.id.toString() === id.toString()) {
                result = node;
            }
            traverse(node.right);
        }
    }

    traverse(binarySearchTree);

    return result ? [result] : [];
}

document.getElementById('deleteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;

    fetch('delete.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${encodeURIComponent(id)}`,
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload(); // Recargar la página después de eliminar
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('searchByNameForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchName = document.getElementById('searchName').value; // Obtener el ID como texto
    console.log('Nombre buscado:', searchName); // Verificar que se esté obteniendo el ID correcto

    const results = searchBookByName(searchName);
    console.log('Resultados de búsqueda:', results);  // Verificar los resultados de la búsqueda por ID

    displayBooks(results); // Mostrar los resultados en el panel de libros
});
document.getElementById('searchByAuthorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchAuthor = document.getElementById('searchAuthor').value; // Obtener el ID como texto
    console.log('Date buscado:', searchDate); // Verificar que se esté obteniendo el ID correcto

    const results = searchBookByAuthor(searchAuthor);
    console.log('Resultado de búsqueda por Date:', results); // Verificar los resultados de la búsqueda por ID

    displayBooks(results); // Mostrar los resultados en el panel de libros
});

document.getElementById('searchByDateForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchDate = document.getElementById('searchDate').value; // Obtener el ID como texto
    console.log('Date buscado:', searchDate); // Verificar que se esté obteniendo el ID correcto

    const results = searchBookByDate(searchDate);
    console.log('Resultado de búsqueda por Date:', results); // Verificar los resultados de la búsqueda por ID

    displayBooks(results); // Mostrar los resultados en el panel de libros
});
document.getElementById('searchByIdForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchId = document.getElementById('searchId').value.trim(); // Obtener el ID como texto
    console.log('ID buscado:', searchId); // Verificar que se esté obteniendo el ID correcto

    const results = searchBookById(searchId);
    console.log('Resultado de búsqueda por ID:', results); // Verificar los resultados de la búsqueda por ID

    displayBooks(results); // Mostrar los resultados en el panel de libros
});




