<?php
include("datosConexion.php");
$cat = $_POST['cat1'];;

$conn = mysqli_connect($servername, $username, $password, $database);

// Verificar la conexión
try {
    $consulta_subcategories = "SELECT * FROM subcategorias WHERE catId= $cat;";
    $resultat_subcategories = mysqli_query($conn, $consulta_subcategories);
    $subcategorias = array();
    if (!$resultat_subcategories) {
        die("Error en la consulta: " . mysqli_error($conn));
    } else {
        while ($fila = mysqli_fetch_assoc($resultat_subcategories)) {
            $object = new stdClass();
            $object->subId = $fila["subId"];
            $object->name = $fila["name"];
            $object->catId = $fila["catId"];
            array_push($subcategorias, $object);
        }
    }

    // Convertir el array $categorias a formato JSON
    $subcategorias_json = json_encode($subcategorias);

    // Enviar el JSON como respuesta
    echo $subcategorias_json;
} catch (Exception $e) {
    die("Error de conexión: " . $e);
} finally {
    mysqli_close($conn);
}
