<?php
// Conectar a la base de datos (asegúrate de manejar correctamente la conexión y las credenciales)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dna_sequences_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta SQL para obtener todas las secuencias y nombres
$sql = "SELECT id, sequence, person_name FROM dna_sequences";
$result = $conn->query($sql);

// Arreglo para almacenar resultados
$rows = array();

// Verificar si hay resultados y agregarlos al arreglo
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
} else {
    echo "0 resultados encontrados";
}

// Devolver resultados como JSON
header('Content-Type: application/json');
echo json_encode($rows);

// Cerrar conexión
$conn->close();
?>
