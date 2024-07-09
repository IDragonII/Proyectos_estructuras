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

// Obtener datos enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);
$sequence = $data['sequence'];
$personName = $data['person_name'];

// Preparar y ejecutar la consulta SQL para insertar la nueva secuencia y nombre
$sql = "INSERT INTO dna_sequences (sequence, person_name) VALUES ('$sequence', '$personName')";
if ($conn->query($sql) === TRUE) {
    $response = array(
        'success' => true,
        'id' => $conn->insert_id
    );
    echo json_encode($response);
} else {
    echo json_encode(array('success' => false));
}

// Cerrar conexión
$conn->close();
?>
