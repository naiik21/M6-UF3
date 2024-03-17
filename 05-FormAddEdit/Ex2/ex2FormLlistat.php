<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulari</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<?php

include("/Xampp/htdocs/05-FormAddEdit/datosConexion.php");

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM productes";

$result = $conn->query($sql);

$array = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($array, array("id" => $row["id"], "nom" => $row["nom"]));
    }
} else {
    echo "0 results";
}

$conn->close();
?>

<body class="container mt-5 w-80">
    <div class="row">
        <div class="col">
            <h2 class="mb-3">Formulari</h2>

            <form action="ex2AddEdit.php" method="POST">
                <div class="form-group mb-2">
                    <input type="text" class="form-control" id="nomProducte" name="nomProducte" placeholder="Nom" value="">
                </div>


                <input type="hidden" name="addEdit" id="addEdit" value="0" />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="drop-area" draggable="true">
            <h2>Drag & Drop files</h2>
            <button id="buttonDrag">Upload files</button>
            <input type="file" name="inputFiles[]" id="input-file" hidden multiple />
        </div>
        <div id="preview"></div>
        <div class="col">
            <h2 class="mb-3">Llistat</h2>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>

                <tbody>
                    <?php
                    for ($i = 0; $i < sizeof($array); $i++) {
                        echo '<tr>
                                        <th scope="row">' . $array[$i]["id"] . '</th>
                                        <td>' . $array[$i]["nom"] . '</td>
                                        <td><p idProd="' . $array[$i]["id"] . '" class="btnEdit btn btn-outline-info">Edit</p></td>
                                        <form action="ex2AddEdit.php" method="POST">
                                            <input type="hidden" id="idDelete" name="idDelete" value="1">
                                            <input type="hidden" name="addEdit" id="addEdit" value="' . $array[$i]["id"] . '" />
                                            <td><button idProd="' . $array[$i]["id"] . '" class="btnDelete btn btn-outline-danger">Remove</button></td>
                                        </form>
                                        </tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>


    <script src="scriptAddEdit.js"></script>
    <script src="scriptDragAndDrop.js"></script>
</body>

</html>