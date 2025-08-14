// Indoor Dog Parks JavaScript Functionality
let map;
let markers = [];

document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedIndoorParks();
    initializeFilters();
    // Map will be initialized by Google Maps callback
});

// Initialize Google Map
function initMap() {
    const mapContainer = document.getElementById('texas-indoor-parks-map');
    if (!mapContainer) return;

    // Center map on Texas
    const texasCenter = { lat: 31.9686, lng: -99.9018 };
    
    map = new google.maps.Map(mapContainer, {
        zoom: 6,
        center: texasCenter,
        mapTypeId: 'roadmap',
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    // Add markers for indoor parks
    if (typeof indoorParksData !== 'undefined') {
        addMarkersToMap();
    }

    // Setup city filter functionality
    setupMapFilters();
}

// Add markers to map
function addMarkersToMap() {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    indoorParksData.forEach(park => {
        if (park.latitude && park.longitude) {
            const marker = new google.maps.Marker({
                position: { lat: park.latitude, lng: park.longitude },
                map: map,
                title: park.name,
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="12" fill="#007bff" stroke="white" stroke-width="2"/>
                            <text x="15" y="20" text-anchor="middle" fill="white" font-size="16">🏠</text>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(30, 30),
                    anchor: new google.maps.Point(15, 15)
                }
            });

            // Create info window
            const infoWindow = new google.maps.InfoWindow({
                content: createMapInfoWindow(park)
            });

            marker.addListener('click', () => {
                // Close other info windows
                markers.forEach(m => {
                    if (m.infoWindow) m.infoWindow.close();
                });
                infoWindow.open(map, marker);
            });

            marker.infoWindow = infoWindow;
            markers.push(marker);
        }
    });
}

// Create info window content
function createMapInfoWindow(park) {
    return `
        <div class="map-info-window">
            <h4>${park.name}</h4>
            <p><strong>📍</strong> ${park.address}</p>
            <p><strong>📞</strong> ${park.phone || 'Contact for info'}</p>
            <p><strong>🕒</strong> ${park.hours?.Monday || 'Contact for hours'}</p>
            <div class="info-actions">
                ${park.website ? `<a href="${park.website}" target="_blank" class="btn btn-small btn-primary">Website</a>` : ''}
                <a href="${park.mapLink}" target="_blank" class="btn btn-small btn-secondary">Directions</a>
            </div>
        </div>
    `;
}

// Setup map filters
function setupMapFilters() {
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
        cityFilter.addEventListener('change', function() {
            filterMapMarkers(this.value);
        });
    }
}

// Filter map markers by city
function filterMapMarkers(selectedCity) {
    markers.forEach(marker => {
        const parkData = indoorParksData.find(park => 
            park.latitude && park.longitude &&
            marker.getPosition().lat() === park.latitude && 
            marker.getPosition().lng() === park.longitude
        );
        
        if (!selectedCity || !parkData || parkData.city.toLowerCase().includes(selectedCity)) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
            if (marker.infoWindow) marker.infoWindow.close();
        }
    });
}

// Load featured indoor parks
function loadFeaturedIndoorParks() {
    const grid = document.getElementById('indoorParksGrid');
    if (!grid) return;

    // Get first 6 parks as featured
    const featuredParks = indoorParksData.slice(0, 6);
    
    grid.innerHTML = featuredParks.map(park => createParkCard(park)).join('');
}

// Create park card HTML
function createParkCard(park) {
    return `
        <div class="park-card">
            <div class="park-image">
                <img src="${park.photo || 'imagesdogpardirectory/dopark_content_card.png'}" alt="${park.name}" loading="lazy">
            </div>
            <div class="park-content">
                <h3>${park.name}</h3>
                <p class="park-location">${park.city}, TX</p>
                <p class="park-description">${park.description || 'Climate-controlled indoor dog facility with professional amenities and safe play areas.'}</p>
                <div class="park-stats">
                    <span class="park-status">${park.status || 'Open'}</span>
                    ${park.phone ? `<span class="park-phone">${park.phone}</span>` : ''}
                </div>
                <a href="collection-single.html?park=${encodeURIComponent(park.name)}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `;
}
}

// Initialize filters
function initializeFilters() {
    const cityFilter = document.getElementById('cityFilter');
    const hoursFilter = document.getElementById('hoursFilter');
    
    if (cityFilter) {
        cityFilter.addEventListener('change', applyFilters);
    }
    
    if (hoursFilter) {
        hoursFilter.addEventListener('change', applyFilters);
    }
}

// Apply filters to park display
function applyFilters() {
    const cityFilter = document.getElementById('cityFilter');
    const hoursFilter = document.getElementById('hoursFilter');
    const parkCards = document.querySelectorAll('.park-card');
    
    const selectedCity = cityFilter ? cityFilter.value : '';
    const selectedHours = hoursFilter ? hoursFilter.value : '';
    
    parkCards.forEach(card => {
        let showCard = true;
        
        // City filter
        if (selectedCity) {
            const cardCity = card.dataset.city;
            if (selectedCity === 'houston' && !cardCity.includes('houston') && !cardCity.includes('spring') && !cardCity.includes('cypress')) {
                showCard = false;
            } else if (selectedCity === 'austin' && !cardCity.includes('austin')) {
                showCard = false;
            } else if (selectedCity === 'dallas' && !cardCity.includes('dallas')) {
                showCard = false;
            } else if (selectedCity === 'san-antonio' && !cardCity.includes('san antonio')) {
                showCard = false;
            } else if (selectedCity === 'fort-worth' && !cardCity.includes('fort worth')) {
                showCard = false;
            }
        }
        
        // Hours filter
        if (selectedHours && showCard) {
            const hoursText = card.querySelector('.park-hours span:last-child').textContent;
            if (selectedHours === '24-hours' && !hoursText.includes('24/7')) {
                showCard = false;
            } else if (selectedHours === 'extended' && hoursText.includes('Limited')) {
                showCard = false;
            } else if (selectedHours === 'business' && hoursText.includes('24/7')) {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Show map modal (placeholder for future enhancements)
function showMapModal() {
    alert('Interactive map feature coming soon! Use individual park "Get Directions" buttons to view locations.');
}

// Search functionality
function searchIndoorParks(query) {
    if (!query) {
        loadFeaturedIndoorParks();
        return;
    }
    
    const filteredParks = indoorParksData.filter(park => 
        park.name.toLowerCase().includes(query.toLowerCase()) ||
        park.city.toLowerCase().includes(query.toLowerCase()) ||
        park.description.toLowerCase().includes(query.toLowerCase()) ||
        park.amenities.some(amenity => amenity.toLowerCase().includes(query.toLowerCase()))
    );
    
    const grid = document.getElementById('indoorParksGrid');
    if (grid) {
        grid.innerHTML = filteredParks.map(park => createParkCard(park)).join('');
    }
}

// Get parks by city (utility function)
function getParksByCity(cityName) {
    return indoorParksData.filter(park => 
        park.city.toLowerCase().includes(cityName.toLowerCase())
    );
}

// Analytics tracking (placeholder)
function trackParkView(parkId, parkName) {
    // This would integrate with Google Analytics or similar
    console.log(`Park viewed: ${parkName} (ID: ${parkId})`);
}

// Initialize page-specific functionality
function initializePage() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    const cards = document.querySelectorAll('.park-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);
