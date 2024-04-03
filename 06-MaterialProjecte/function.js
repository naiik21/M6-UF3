let nom = document.querySelector("#nom");
let preu = document.querySelector("#preu");
let via = document.querySelector("#via");
let nomVia = document.querySelector("#nomVia");
let numeroVia = document.querySelector("#numeroVia");
let pis = document.querySelector("#pis");
let escala = document.querySelector("#escala");
let porta = document.querySelector("#porta");
let cp = document.querySelector("#cp");
let districte = document.querySelector("#districte");
let barri = document.querySelector("#barri");
let poblacio = document.querySelector("#poblacio");
let text = document.querySelector("#text");
let registre = document.querySelector("#preview");


$(document).ready(function () {
    // Deshabilitar el select
    $(".select-barris").prop("disabled", true);

    // Detectar cambio en la selección
    $(".select-districte").change(function () {
        var selectedValue = $(this).val();
        alert("Seleccionado: " + selectedValue);

        var formData = new FormData();
        formData.append("idDistricte", selectedValue);
        console.log("Seleccionado: " + formData);
        // Enviar la l'id al servidor PHP
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", "consultaBarris.php");
        // xhr.send(formData);
        let options = {
            method: 'POST',
            body: formData
        }

        fetch('consultaBarris.php', options)
            .then(response => response.json())
            .then(data => {
                // Crear un string con opciones HTML para cada categoría
                let opcionesHTML = '';
                data.forEach(barris => {
                    opcionesHTML += `<option id='barri' value='${barris.id}'>${barris.name}</option>`;
                });
                console.log(opcionesHTML)
                $(".select-barris").prop("disabled", false);
                document.querySelector(".select-barris").innerHTML = opcionesHTML;
            })
            .catch(error => console.error('Error:', error));
    });

});


function preview() {
    let message = '<h4 id="nomPis">' + nom.value + ' + ' + barri.options[barri.selectedIndex].text + ', ' + districte.options[districte.selectedIndex].text + '</h4>' +
        '<p id="dir">' + via.options[via.selectedIndex].text + ' ' + nomVia.value + ' ' + numeroVia.value + ' ' + pis.value + ' ' + escala.value + ' ' + porta.value + ' · ' + cp.value + ' · ' + districte.options[districte.selectedIndex].text + ' · ' + barri.options[barri.selectedIndex].text + ' · ' + poblacio.options[poblacio.selectedIndex].text + '</p>' +
        '<p id="preu">' + preu.value + '€</p>' +
        '<p>' + text.value + '</p>';

    message.replace("[object HTMLInputElement]", "");
    message.replace("Open this select menu", "");
    console.log(message)

    $(registre).html(message);

}


function coordenades() {
    let geocoder = new google.maps.Geocoder();
    let address = via.options[via.selectedIndex].text + ' ' + nomVia.value + ', ' + numeroVia.value + ", " + poblacio.options[poblacio.selectedIndex].text;


    geocoder.geocode({ 'address': address.value }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            let lat = results[0].geometry.location.lat();
            let lon = results[0].geometry.location.lng();
            let latitud = document.querySelector("#latitud");
            let longitud = document.querySelector("#longitud");

            latitud.value = lat
            longitud.value = lon

        } else {
            alert(address)
        }
    });

}