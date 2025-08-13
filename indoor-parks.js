// Indoor Dog Parks JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedIndoorParks();
    initializeFilters();
    initializeMap();
});

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
    const formatHours = (hours) => {
        if (!hours) return 'Hours vary';
        if (hours.Monday === 'Open 24 hours') return '24/7 Access';
        if (hours.Monday === 'Closed') return 'Limited Hours';
        return hours.Monday || 'Contact for hours';
    };

    const getAmenityIcons = (amenities) => {
        const iconMap = {
            'Climate Controlled': '🌡️',
            'Daycare': '🏠',
            'Indoor Play': '🎾',
            '24/7 Access': '🕒',
            'Professional Staff': '👨‍⚕️',
            'Boarding': '🛏️',
            'Grooming': '✂️',
            'Training': '🎓'
        };
        
        return amenities.slice(0, 4).map(amenity => {
            const icon = iconMap[amenity] || '✅';
            return `<span class="amenity-icon" title="${amenity}">${icon}</span>`;
        }).join('');
    };

    return `
        <div class="park-card indoor-park-card" data-city="${park.city.toLowerCase()}">
            <div class="park-image">
                <img src="${park.photo}" alt="${park.name}" loading="lazy">
                <div class="park-status ${park.status.toLowerCase()}">${park.status}</div>
            </div>
            <div class="park-content">
                <h3 class="park-name">${park.name}</h3>
                <div class="park-location">
                    <span class="location-icon">📍</span>
                    <span>${park.city}, ${park.state}</span>
                </div>
                
                <div class="park-description">
                    <p>${park.description || 'Indoor dog park with climate-controlled facilities'}</p>
                </div>

                <div class="park-amenities">
                    ${getAmenityIcons(park.amenities)}
                </div>

                <div class="park-details">
                    <div class="park-hours">
                        <span class="hours-icon">🕒</span>
                        <span>${formatHours(park.hours)}</span>
                    </div>
                    ${park.phone ? `
                        <div class="park-phone">
                            <span class="phone-icon">📞</span>
                            <a href="tel:${park.phone}">${park.phone}</a>
                        </div>
                    ` : ''}
                </div>

                <div class="park-actions">
                    <a href="${park.mapLink}" target="_blank" class="btn btn-primary btn-small">
                        View on Map
                    </a>
                    ${park.website ? `
                        <a href="${park.website}" target="_blank" class="btn btn-secondary btn-small">
                            Visit Website
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
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

// Initialize map placeholder
function initializeMap() {
    const mapContainer = document.getElementById('texas-indoor-parks-map');
    if (!mapContainer) return;
    
    // Add some interactive behavior to the map placeholder
    setTimeout(() => {
        const placeholder = mapContainer.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="map-placeholder-content">
                    <h3>🗺️ Texas Indoor Dog Parks Map</h3>
                    <p>Interactive map showing ${indoorParksData.length}+ indoor dog park locations</p>
                    <div class="map-stats">
                        <div class="map-stat">
                            <span class="stat-number">${indoorParksData.length}+</span>
                            <span class="stat-label">Locations</span>
                        </div>
                        <div class="map-stat">
                            <span class="stat-number">${indoorParkCities.length}</span>
                            <span class="stat-label">Cities</span>
                        </div>
                        <div class="map-stat">
                            <span class="stat-number">5</span>
                            <span class="stat-label">Metro Areas</span>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="showMapModal()">
                        View Full Map
                    </button>
                </div>
            `;
        }
    }, 1000);
}

// Show map modal (placeholder for future Google Maps integration)
function showMapModal() {
    alert('Interactive map feature coming soon! For now, use the "View on Map" buttons on individual park cards to see locations.');
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
