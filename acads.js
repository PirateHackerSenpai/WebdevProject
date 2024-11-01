var map = L.map('map').setView([12.991225,80.233381], 17);
const amap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
        
amap.addTo(map)




function toggleDropdown(id) {
    // Close any open dropdowns before opening the new one
    document.querySelectorAll('.list').forEach(list => {
        if (list.id !== id) {
            list.style.display = 'none';
        }
    });
    
    // Toggle the clicked dropdown
    const list = document.getElementById(id);
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
}

// Close the dropdown if clicked outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('.heading')) {
        document.querySelectorAll('.list').forEach(dropdown => {
            list.style.display = 'none';
        });
    }
});

let currentMarker = null;
let pathline;
let userMarker;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Get the latitude and longitude from the user's location
            const mylat = position.coords.latitude;
            const mylng = position.coords.longitude;

            // Set the map view to the user's location
            map.setView([mylat, mylng], 17);

            // Place a marker at the user's location
            userMarker = L.marker([mylat, mylng]).addTo(map)
                .bindPopup("You are here!")
                .openPopup();
        },
        (error) => {
            console.error("Geolocation error:", error);
            alert("Unable to retrieve your location.");
        }
    );
} else {
    alert("Geolocation is not supported by your browser.");
}


function addMarker(coords, event) {
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    // Create a marker
    const name = event.target.textContent;  
     currentMarker = L.marker(coords).addTo(map);
    currentMarker.bindPopup(name).openPopup();
    // Move the map view to the marker
    map.setView(coords, 15); // Zoom in on the marker
    createPathButton.style.display = 'inline-block';
}

createPathButton.addEventListener('click', () => {
    // Remove the existing path if it exists
    if (pathline) {
        map.removeLayer(pathline);
    }
    if (userMarker && currentMarker) {
        const userLatLng = userMarker.getLatLng();
        const markerLatLng = currentMarker.getLatLng();

        pathline = L.polyline([userLatLng, markerLatLng], { color: 'blue' }).addTo(map);
    }
});

