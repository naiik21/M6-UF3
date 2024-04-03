<?php
include("datosConexion.php");

$conn = mysqli_connect($servername, $username, $password, $database);

// Verificar si se ha enviado el id
if (isset($_POST['idDistricte'])) {
    // Obtener el idDistricte desde $_POST
    $id = $_POST['idDistricte'];

    $barris = array();
    $consulta_barris = "SELECT name, id
                            FROM barris
                            WHERE id_districte = " . $id . "
                            ORDER BY name ASC;";
    $resultat_barris = mysqli_query($conn, $consulta_barris);

    if (!$resultat_barris) {
        die("Error en la consulta: " . mysqli_error($conn));
    } else {
        while ($fila = mysqli_fetch_assoc($resultat_barris)) {
            // Crear un objeto stdClass para cada fila
            $object = new stdClass();
            // Añadir la información de la fila al objeto
            $object->id = $fila["id"];
            $object->name = $fila["name"];
            // Añadir el objeto al array de barris
            array_push($barris, $object);
        }
    }

    // Convertir el array $barris a formato JSON
    $barris_json = json_encode($barris);

    // Enviar el JSON como respuesta
    echo $barris_json;
} else {
    echo "No se ha enviado la id";
}
