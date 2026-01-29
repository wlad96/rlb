function initMap() {
    const location = {
        lat: 56.950965,
        lng: 24.119873
    };

    const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
        disableDefaultUI: true,
        styles: [
            {
              elementType: "geometry",
              stylers: [{ color: "#1b1b1b" }]
            },
            {
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }]
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#8a8a8a" }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1b1b1b" }]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#5f5f5f" }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#242424" }]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#7a7a7a" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#2b2b2b" }]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.text.fill",
              stylers: [{ color: "#7a7a7a" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#3a3a3a" }]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9a9a9a" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#000000" }]
            }
          ]
          
    });

    new google.maps.Marker({
        position: location,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#111",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#fff"
        }
    });
}