<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "biblioteca";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM libros ORDER BY id";

$result = $conn->query($sql);

$libros = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $libros[] = $row;
    }
}

echo json_encode($libros);

$conn->close();
?>
