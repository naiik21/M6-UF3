<?php

include("/Xampp/htdocs/05-FormAddEdit/datosConexion.php");

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST["id"]) && !empty($_POST["id"])) {

    $sql = "SELECT * FROM productes WHERE id=" . $_POST["id"];

    $result = $conn->query($sql);

    $array = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $object = new stdClass();
        $object->nom = $row["nom"];
        $object->addEdit = $row["id"];

        echo json_encode($object);
    } else {
        echo "0 results";
    }

    $conn->close();
}
