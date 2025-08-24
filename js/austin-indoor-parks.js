// Austin Indoor Dog Parks JavaScript
// Austin-specific functionality with unique descriptions and fixed buttons

class AustinIndoorParksManager {
    constructor() {
        this.allParks = [];
        this.austinParks = [];
        this.filteredParks = [];
        this.currentPage = 1;
        this.parksPerPage = 12;
        
        // Austin-specific unique descriptions
        this.austinDescriptions = [
            "Keep Austin weird with this climate-controlled indoor dog paradise perfect for hot Texas days!",
            "A favorite spot for Austin pups to stay cool and socialize in air-conditioned comfort.",
            "Where Live Music Capital dogs come to play when it's too hot to handle outside!",
            "Beat the heat at this premier indoor facility designed for active Austin dogs.",
            "Climate-controlled fun for your furry friend in the heart of Austin's dog-loving community.",
            "Indoor playtime perfection where Austin dogs can exercise safely year-round.",
            "A cool oasis for hot dogs - literally! Perfect for escaping Austin's summer heat.",
            "Where Austin's four-legged residents enjoy premium indoor recreation and socialization.",
            "Keep your pup comfortable and entertained at this modern indoor dog facility.",
            "Austin's go-to spot for climate-controlled canine fun and community.",
            "Indoor dog park excellence designed specifically for Austin's unique climate needs.",
            "A safe haven from Texas weather where dogs can play, learn, and socialize indoors.",
            "Professional indoor dog care and play in the heart of Austin's pet-friendly culture.",
            "Climate-controlled comfort meets Austin's laid-back vibe at this indoor dog destination.",
            "Where responsible Austin pet parents bring their dogs for safe indoor exercise.",
            "Indoor dog paradise with all the amenities Austin pups need to stay happy and healthy.",
            "Beat the elements at this state-of-the-art indoor facility for Austin's beloved dogs.",
            "Austin's premier destination for indoor canine recreation and professional care.",
            "Keep your dog cool, comfortable, and entertained at this top-rated indoor facility.",
            "Where Austin dogs discover the joy of climate-controlled indoor play and socialization."
        ];
        
        this.init();
    }
    
    async init() {
        await this.loadParksData();
        this.displayParks();
    }
    
    async loadParksData() {
        try {
            console.log('Loading Austin parks data...');
            // Filter for Austin metro area parks
            this.allParks = indoorParksData || [];
            this.austinParks = this.allParks.filter(park => {
                const cityLower = (park.city || '').toLowerCase();
                const austinCities = ['austin', 'round rock', 'cedar park', 'leander', 'pflugerville', 
                                    'lakeway', 'bee cave', 'dripping springs', 'manor', 'elgin'];
                return austinCities.some(city => cityLower.includes(city));
            });
            
            console.log('Found', this.austinParks.length, 'Austin area parks');
            this.filteredParks = [...this.austinParks];
            this.updateResultsCount();
        } catch (error) {
            console.error('Error loading Austin parks data:', error);
            this.showError('Unable to load parks data. Please try again later.');
        }
    }
    
    displayParks() {
        const startIndex = (this.currentPage - 1) * this.parksPerPage;
        const endIndex = startIndex + this.parksPerPage;
        const parksToShow = this.filteredParks.slice(startIndex, endIndex);
        
        const grid = document.getElementById('parks-grid');
        const noResults = document.getElementById('no-results');
        
        if (parksToShow.length === 0) {
            if (grid) grid.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
            return;
        }
        
        if (grid) {
            grid.style.display = 'grid';
            grid.innerHTML = parksToShow.map((park, i) => this.createParkCard(park, startIndex + i)).join('');
        }
        if (noResults) noResults.style.display = 'none';
        
        this.setupPagination();
    }
    
    createParkCard(park, i) {
        const localImages = [
            'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop',
            '../images/dogparkdirectory/Untitled-3-dopark_content_card-min.png',
            '../images/dogparkdirectory/Untitled-6-dopark_content_card-min.png',
            '../images/dogparkdirectory/Untitled-7-min.png',
            '../images/dogparkdirectory/Untitled-8-dopark_content_card-min.png',
            '../images/dogparkdirectory/Untitled-9-dopark_content_card-min.png',
            '../images/dogparkdirectory/Untitled-10-min.png',
            '../images/dogparkdirectory/Untitled-11-dopark_content_card-min.png',
            '../images/dogparkdirectory/Untitled-16-dopark_content_card-min.png',
            '../images/dogparkdirectory/Untitled-17-dopark_content_card-min.png',
            '../images/dogparkdirectory/Untitled-18-dopark_content_card-min.png',
            '../images/dogparkdirectory/dopark_content_card.png'
        ];
        
        const imageUrl = park.photo || localImages[i % localImages.length];
        const amenities = this.extractAmenities(park);
        const amenityIcons = this.createAmenityIcons(amenities.length ? amenities : ['Indoor Play', 'Climate Control']);
        
        // Use unique Austin-specific descriptions
        let description = '';
        if (park.description && park.description.length > 20 && 
            !park.description.toLowerCase().includes('great place for dogs to play')) {
            description = park.description.substring(0, 120) + (park.description.length > 120 ? '...' : '');
        } else {
            description = this.austinDescriptions[i % this.austinDescriptions.length];
        }
        
        return `
            <div class="park-card">
                <div class="park-image">
                    <img src="${imageUrl}" alt="${park.name}" loading="lazy">
                </div>
                <div class="park-content">
                    <h3>${park.name}</h3>
                    <div class="park-location">
                        <span>📍</span>
                        <span>${park.city || 'Austin'}, TX</span>
                    </div>
                    <p class="park-description">${description}</p>
                    ${amenityIcons ? `<div class="park-amenities-icons">${amenityIcons}</div>` : ''}
                    <a href="../collection-single.html?park=${encodeURIComponent(park.name)}" class="park-link">
                        View Details
                    </a>
                </div>
            </div>
        `;
    }
    
    extractAmenities(park) {
        const amenities = [];
        
        // Always include basic indoor amenities
        amenities.push('Indoor Play');
        amenities.push('Climate Control');
        
        // Check business name and description for specific amenities
        const name = (park.name || '').toLowerCase();
        const desc = (park.description || '').toLowerCase();
        const combined = name + ' ' + desc;
        
        if (combined.includes('daycare') || combined.includes('day care')) amenities.push('Daycare');
        if (combined.includes('training') || combined.includes('obedience')) amenities.push('Training');
        if (combined.includes('boarding') || combined.includes('kennel')) amenities.push('Boarding');
        if (combined.includes('grooming') || combined.includes('bath')) amenities.push('Grooming');
        if (combined.includes('agility')) amenities.push('Agility');
        if (combined.includes('socialization')) amenities.push('Socialization');
        
        return amenities.slice(0, 3); // Limit to 3 amenities for clean display
    }
    
    createAmenityIcons(amenities) {
        if (!amenities || amenities.length === 0) return '';
        
        const iconMap = {
            'indoor play': '🏠',
            'climate control': '❄️',
            'daycare': '🐕‍🦺',
            'training': '🎓',
            'boarding': '🏨',
            'grooming': '✂️',
            'agility': '🎯',
            'socialization': '🤝',
            'exercise': '🏃‍♂️',
            'supervision': '👀',
            'safe': '🛡️',
            'water': '💧',
            'parking': '🚗'
        };
        
        return amenities.map(amenity => {
            const key = amenity.toLowerCase();
            const icon = iconMap[key] || '🐾';
            return `<div class="amenity-icon" title="${amenity}"><span>${icon}</span><span>${amenity}</span></div>`;
        }).join('');
    }
    
    setupPagination() {
        const totalPages = Math.ceil(this.filteredParks.length / this.parksPerPage);
        const pagination = document.getElementById('pagination');
        
        if (!pagination || totalPages <= 1) {
            if (pagination) pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button onclick="austinParksManager.goToPage(${this.currentPage - 1})" class="pagination-btn">« Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="pagination-btn active">${i}</button>`;
            } else if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `<button onclick="austinParksManager.goToPage(${i})" class="pagination-btn">${i}</button>`;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button onclick="austinParksManager.goToPage(${this.currentPage + 1})" class="pagination-btn">Next »</button>`;
        }
        
        pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.displayParks();
        
        // Scroll to top of parks section
        const parksSection = document.querySelector('.parks-section');
        if (parksSection) {
            parksSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    updateResultsCount() {
        const resultsElement = document.getElementById('results-count');
        if (resultsElement) {
            const total = this.austinParks.length;
            resultsElement.textContent = `Showing ${total} indoor dog parks and facilities`;
        }
    }
    
    showError(message) {
        const grid = document.getElementById('parks-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-message">
                    <h3>Unable to Load Parks</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Global function for opening maps
function openInMaps(name, address) {
    const query = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
}

// Google Maps functionality for Austin
let map;
let markers = [];

function initializeAustinMap() {
    console.log('Initializing Austin map...');
    // Center the map on Austin
    const austinCenter = { lat: 30.2672, lng: -97.7431 };
    
    const mapElement = document.getElementById("google-map");
    if (!mapElement) {
        console.error('Map element not found!');
        return;
    }

    // Check if Google Maps is available
    if (typeof google === 'undefined') {
        console.error('Google Maps API not loaded!');
        mapElement.innerHTML = '<div style="padding: 40px; text-align: center; color: #666; background: #f9f9f9; border-radius: 12px;"><h3>Map Loading Issue</h3><p>The Google Maps API could not be loaded. Please check your internet connection and try refreshing the page.</p></div>';
        return;
    }
    
    try {
        map = new google.maps.Map(mapElement, {
            zoom: 10,
            center: austinCenter,
            styles: [
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{"visibility": "off"}]
                }
            ]
        });

        console.log('Austin map created successfully!');
        
        // Wait for parks data to load, then add markers
        function waitForParksData() {
            console.log('Checking for Austin parks data...');
            if (typeof indoorParksData !== 'undefined' && indoorParksData.length > 0) {
                console.log('Parks data loaded, filtering Austin parks...');
                const austinParks = indoorParksData.filter(park => {
                    const cityLower = (park.city || '').toLowerCase();
                    const austinCities = ['austin', 'round rock', 'cedar park', 'leander', 'pflugerville', 
                                        'lakeway', 'bee cave', 'dripping springs', 'manor', 'elgin'];
                    return austinCities.some(city => cityLower.includes(city));
                });
                console.log('Found', austinParks.length, 'Austin parks');
                if (austinParks.length > 0) {
                    addMarkersToMap(austinParks);
                } else {
                    console.log('No Austin parks found in data');
                }
            } else {
                console.log('Parks data not ready yet, trying again...');
                setTimeout(waitForParksData, 500);
            }
        }
        
        // Start checking for parks data
        waitForParksData();
    } catch (error) {
        console.error('Error creating Austin map:', error);
        mapElement.innerHTML = '<div style="padding: 40px; text-align: center; color: #666; background: #f9f9f9; border-radius: 12px;"><h3>Map Error</h3><p>There was an error loading the map. Error: ' + error.message + '</p></div>';
    }
}

function addMarkersToMap(parks) {
    console.log('Adding markers to Austin map for', parks.length, 'parks');
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    parks.forEach((park, index) => {
        console.log('Processing Austin park:', park.name, 'lat:', park.latitude, 'lng:', park.longitude);
        if (park.latitude && park.longitude) {
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) },
                map: map,
                title: park.name,
                icon: {
                    url: 'data:image/svg+xml;base64,' + btoa(`
                        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="12" fill="#6b3ded" stroke="#fff" stroke-width="2"/>
                            <circle cx="16" cy="16" r="6" fill="#fff"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(32, 32)
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="max-width: 300px;">
                        <h3 style="margin: 0 0 8px 0; color: #333;">${park.name}</h3>
                        <p style="margin: 0 0 8px 0; color: #666;">${park.address || park.city + ', TX'}</p>
                        ${park.phone ? `<p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${park.phone}</p>` : ''}
                        ${park.website ? `<p style="margin: 0;"><a href="${park.website}" target="_blank" style="color: #6b3ded;">Visit Website</a></p>` : ''}
                    </div>
                `
            });

            marker.addListener('click', () => {
                // Close any open info windows
                markers.forEach(m => {
                    if (m.infoWindow) m.infoWindow.close();
                });
                infoWindow.open(map, marker);
            });

            marker.infoWindow = infoWindow;
            markers.push(marker);
            console.log('Added marker for Austin park:', park.name);
        } else {
            console.log('Skipping Austin park with missing coordinates:', park.name);
        }
    });

    console.log('Total Austin markers added:', markers.length);

    // Fit map to show all markers
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
        
        // Don't zoom in too much for single markers
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
            if (map.getZoom() > 15) {
                map.setZoom(12);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Austin Indoor Parks Manager...');
    window.austinParksManager = new AustinIndoorParksManager();
    
    // Setup navigation dropdown functionality
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
        const dropdownContent = dropdown.querySelector('.nav-dropdown-content');
        const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');
        
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownContent.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownContent.style.display = 'none';
        });
    }
    
    // Setup hamburger menu
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('mainNav');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
        
        hamburger.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                navMenu.classList.toggle('open');
                hamburger.classList.toggle('open');
            }
        });
        
        // Close menu on link click (mobile)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    navMenu.classList.remove('open');
                    hamburger.classList.remove('open');
                }
            });
        });
    }
});
