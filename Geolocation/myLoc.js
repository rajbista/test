
window.onload = getMyLocation;

function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getLocation, getError);
    
    }
    else{
        alert("Oops, no geolocation support");
    }
}

function getLocation(pos){
    showMap(pos.coords);
}

function getError(err){
    var div = document.getElementById("location");

    div.innerHTML = err.message;
}

function showMap(coords){
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 15,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.CATELLITE
    };

    var mapDiv = document.getElementById("map");
    var map = new google.maps.Map(mapDiv, mapOptions);

    var title = "Your Location";
    var content = "Sarju and Raj are making  Love here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content){
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    });
}