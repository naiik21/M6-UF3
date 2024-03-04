let map;
let geocoder = new google.maps.Geocoder();
let address = document.getElementById('adreca');
console.log(address.value)

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const myLatLng = { lat: 41.491500, lng: 2.140179 };

    map = new Map(document.getElementById("map"), {
        center: { lat: 41.491500, lng: 2.140179 },
        zoom: 14,
    });

    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Cerdanyola del valles",
    });
    console.log(address.value)
}

initMap();

geocoder.geocode({ 'address': address.value }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        console.log(latitude)
        console.log(longitude)
    }
});