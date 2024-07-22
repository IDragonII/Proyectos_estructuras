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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $autor = $_POST['autor'];
    $fecha = $_POST['fecha'];

    $sql = "INSERT INTO libros (nombre, autor, fecha) VALUES ('$nombre', '$autor', '$fecha')";

    if ($conn->query($sql) === TRUE) {
        echo "Nuevo libro insertado exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
