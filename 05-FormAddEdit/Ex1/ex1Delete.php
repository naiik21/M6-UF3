<?php
include("/Xampp/htdocs/05-FormAddEdit/datosConexion.php");

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET["id"]) && !empty($_GET["id"])) {


    $sql = "DELETE FROM productes WHERE id=" . $_GET["id"];

    $result = $conn->query($sql);


    $conn->close();
}
header('Location: ex1Llistat.php');
