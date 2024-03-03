<?php
include("datosConexion.php");

$conn = mysqli_connect($servername, $username, $password, $database);

// Verificar la conexión
try {
  $consulta_categories = "SELECT * FROM categorias;";
  $resultat_categories = mysqli_query($conn, $consulta_categories);
  $categorias = array();
  if (!$resultat_categories) {
    die("Error en la consulta: " . mysqli_error($conn));
  } else {
    while ($fila = mysqli_fetch_assoc($resultat_categories)) {
      $object = new stdClass();
      $object->id = $fila["id"];
      $object->name = $fila["name"];
      array_push($categorias, $object);
    }
  }

  // Convertir el array $categorias a formato JSON
  $categorias_json = json_encode($categorias);

  // Enviar el JSON como respuesta
  echo $categorias_json;
} catch (Exception $e) {
  die("Error de conexión: " . $e);
} finally {
  mysqli_close($conn);
}
