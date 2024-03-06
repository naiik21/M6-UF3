let map;
let latitude;
let longitude;
const image = "/resources/rocket-lunch.svg"

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const myLatLng = { lat: 41.4910462, lng: 2.1407443 };
    let jsonData;
    fetch('/resources/map.json')
        .then(response => response.json())
        .then(data => {
            // Almacenar el JSON en la variable
            jsonData = data;

            // Crear el mapa y realizar otras operaciones que dependen del JSON
            map = new Map(document.getElementById("map"), {
                center: { lat: 41.4910462, lng: 2.1407443 },
                zoom: 14,
                styles: jsonData
            });

            let marker = new google.maps.Marker({
                position: myLatLng,
                map,
                icon: image
            });

            let infowindow = new google.maps.InfoWindow({
                content: '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h1 id="firstHeading" class="firstHeading">Marcador</h1>' +
                    "</div>" +
                    "</div>"
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        })
        .catch(error => console.error('Error:', error));



}

function coordenades() {
    let geocoder = new google.maps.Geocoder();
    let address = document.getElementById('adreca');
    let lat = document.getElementById('lat');
    let lng = document.getElementById('lng');
    let myLatLng;

    geocoder.geocode({ 'address': address.value }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            let center = new google.maps.LatLng(latitude, longitude);
            map.setCenter(center);
            map.setZoom(16);
            myLatLng = { lat: latitude, lng: longitude };
            let marker = new google.maps.Marker({
                position: myLatLng,
                map,
                icon: image
            });
            lat.value = latitude
            lng.value = longitude

            let infowindow = new google.maps.InfoWindow({
                content: '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h1 id="firstHeading" class="firstHeading">Marcador</h1>' +
                    "</div>" +
                    "</div>"
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

        } else {
            alert("No s'ha trobat la direcció")
        }
    });

}

function geolocat() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            let center = new google.maps.LatLng(latitude, longitude);
            map.setCenter(center);
            map.setZoom(16);
            myLatLng = { lat: latitude, lng: longitude };
            let marker = new google.maps.Marker({
                position: myLatLng,
                map,
                icon: image
            });
            lat.value = latitude
            lng.value = longitude

            let infowindow = new google.maps.InfoWindow({
                content: '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h1 id="firstHeading" class="firstHeading">Marcador</h1>' +
                    "</div>" +
                    "</div>"
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        });
    }
}
