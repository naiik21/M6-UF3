let categoria = document.querySelector("#categoria");
let subcategoria = document.querySelector("#subcategoria");
let opt = document.createElement('option');
let selectedOption;

fetch('getCategorias.php')
    .then(response => response.json())
    .then(data => {
        // Crear un string con opciones HTML para cada categoría
        let opcionesHTML = '';
        data.forEach(categoria => {
            opcionesHTML += `<option id='categoria' value='${categoria.id}'>${categoria.name}</option>`;
        });
        categoria.innerHTML = opcionesHTML;
    })
    .catch(error => console.error('Error:', error));

categoria.addEventListener('change',
    function () {
        // Obtener la opción seleccionada
        let selectedOption = this.options[categoria.selectedIndex];
        //console.log(selectedOption.value + ': ' + selectedOption.text);

        // Crear FormData y agregar el valor seleccionado
        let formData = new FormData();
        formData.append("cat1", selectedOption.value);

        // Configurar opciones para la solicitud fetch
        let options = {
            method: 'POST',
            body: formData
        };
        // Realizar la solicitud fetch al backend.php
        fetch("getSubCat.php", options)
            .then((response) => response.json())
            .then((data) => {
                // Crear un string con opciones HTML para cada categoría
                let opcionesHTML = '';
                data.forEach(subcategoria => {
                    opcionesHTML += `<option id='subcategoria' value='${subcategoria.id}'>${subcategoria.name}</option>`;
                });
                subcategoria.innerHTML = opcionesHTML;
            })
            .catch((error) => {
                // Manejar errores de la solicitud fetch
                console.error('Error en la solicitud fetch:', error);
            });

    });



