<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selecció de Categoria i Subcategoria</title>
</head>
<body>
    <form action="backend.php" method="POST">
        <label for="categoria">Categoria:</label>
        <select name="categoria" id="categoria">
        <?php
            // Connexió a la base de dades
            $connexio = new mysqli("servidor", "usuari", "contrasenya", "nom_base_de_dades");

            // Comprovem si la connexió ha tingut èxit
            if ($connexio->connect_error) {
                die("Error en la connexió a la base de dades: " . $connexio->connect_error);
            }

            // Consulta a la taula de categories
            $consulta_categories = "SELECT id, nom FROM categories";
            $resultat_categories = $connexio->query($consulta_categories);

            echo "<option value='" . '1' . "'>" . 'cat1' . "</option>";
            // Creem les opcions del selector
            if ($resultat_categories->num_rows > 0) {
                while($fila = $resultat_categories->fetch_assoc()) {
                    echo "<option value='" . $fila['id'] . "'>" . $fila['nom'] . "</option>";
                }
            } else {
                echo "<option value=''>No hi ha categories disponibles</option>";
            }

            // Tanquem la connexió
            $connexio->close();
        ?>
        </select>

        <br><br>

        <label for="subcategoria">Subcategoria:</label>
        <select name="subcategoria" id="subcategoria">
            <!-- Aquest select estarà buit per ara -->
        </select>

        <br><br>

        <input type="submit" value="Enviar">
    </form>
</body>
</html>