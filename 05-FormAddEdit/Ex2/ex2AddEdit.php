    <?php
    include("/Xampp/htdocs/05-FormAddEdit/datosConexion.php");

    $conn = new mysqli($servername, $username, $password, $database);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Verifica si se recibió un valor de idDelete y lo utiliza para eliminar el registro correspondiente
    if (isset($_POST["idDelete"]) && !empty($_POST["idDelete"])) {
        $sql = "DELETE FROM productes WHERE id = " . $_POST["addEdit"];

        if ($conn->query($sql) === TRUE) {
            echo "Record deleted successfully";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
    } else {
        if (isset($_POST["nomProducte"]) && !empty($_POST["nomProducte"])) {
            if ($_POST["addEdit"] == 0) {
                $sql = "INSERT INTO productes (nom) VALUES ('" . $_POST["nomProducte"] . "')";
            } else {
                $sql = "UPDATE productes SET nom='" . $_POST["nomProducte"] . "' WHERE id=" . $_POST["addEdit"];
            }


            echo $sql;

            if ($conn->query($sql) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    }



    $conn->close();

    header('Location: ex2FormLlistat.php');
