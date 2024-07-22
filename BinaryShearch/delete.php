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
    $id = $_POST['id'];

    $sql = "DELETE FROM libros WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo "Libro eliminado exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
