class FortWorthIndoorParksManager {
    constructor() {
        this.parks = [];
        this.filteredParks = [];
        this.currentPage = 1;
        this.parksPerPage = 12;
        this.currentFilters = {
            search: '',
            area: '',
            amenity: ''
        };
        this.map = null;
        this.markers = [];
        
        this.init();
    }
    
    async init() {
        await this.loadParksData();
        this.displayParks();
    }
    
    async loadParksData() {
        try {
            console.log('Loading Fort Worth parks data...');
            // Filter for Fort Worth area parks
            this.parks = indoorParksData.filter(park => 
                park.city && (
                    park.city.toLowerCase().includes('fort worth') ||
                    park.city.toLowerCase().includes('arlington') ||
                    park.city.toLowerCase().includes('grand prairie') ||
                    park.city.toLowerCase().includes('euless') ||
                    park.city.toLowerCase().includes('bedford') ||
                    park.city.toLowerCase().includes('hurst') ||
                    park.city.toLowerCase().includes('colleyville') ||
                    park.city.toLowerCase().includes('grapevine') ||
                    park.city.toLowerCase().includes('southlake') ||
                    park.city.toLowerCase().includes('keller') ||
                    park.city.toLowerCase().includes('north richland hills') ||
                    park.city.toLowerCase().includes('richland hills') ||
                    park.city.toLowerCase().includes('haltom city') ||
                    park.city.toLowerCase().includes('watauga') ||
                    park.city.toLowerCase().includes('saginaw') ||
                    park.city.toLowerCase().includes('blue mound') ||
                    park.city.toLowerCase().includes('westworth village') ||
                    park.city.toLowerCase().includes('westover hills') ||
                    park.city.toLowerCase().includes('river oaks') ||
                    park.city.toLowerCase().includes('sansom park') ||
                    park.city.toLowerCase().includes('white settlement') ||
                    park.city.toLowerCase().includes('benbrook') ||
                    park.city.toLowerCase().includes('crowley') ||
                    park.city.toLowerCase().includes('burleson') ||
                    park.city.toLowerCase().includes('joshua') ||
                    park.city.toLowerCase().includes('alvarado') ||
                    park.city.toLowerCase().includes('mansfield') ||
                    park.city.toLowerCase().includes('kennedale') ||
                    park.city.toLowerCase().includes('pantego') ||
                    park.city.toLowerCase().includes('dalworthington gardens')
                )
            );
            
            this.filteredParks = [...this.parks];
            console.log(`Loaded ${this.parks.length} Fort Worth area parks`);
            
        } catch (error) {
            console.error('Error loading parks data:', error);
            this.parks = [];
            this.filteredParks = [];
        }
    }
    
    displayParks() {
        const parksGrid = document.getElementById('park-listings');
        if (!parksGrid) return;
        
        const startIndex = (this.currentPage - 1) * this.parksPerPage;
        const endIndex = startIndex + this.parksPerPage;
        const parksToShow = this.filteredParks.slice(startIndex, endIndex);
        
        if (parksToShow.length === 0) {
            parksGrid.innerHTML = '<div class="no-results"><p>No parks found matching your criteria.</p></div>';
            return;
        }
        
        parksGrid.innerHTML = parksToShow.map((park, i) => this.createParkCard(park, i)).join('');
        this.createPagination();
    }
    
    createParkCard(park, i) {
        const localImages = [
            'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop',
            '../imagesdogpardirectory/Untitled-3-dopark_content_card-min.png',
            '../imagesdogpardirectory/Untitled-6-dopark_content_card-min.png',
            '../imagesdogpardirectory/Untitled-7-min.png',
            '../imagesdogpardirectory/Untitled-8-dopark_content_card-min.png',
            '../imagesdogpardirectory/Untitled-9-dopark_content_card-min.png',
            '../imagesdogpardirectory/Untitled-10-min.png',
            '../imagesdogpardirectory/Untitled-11-dopark_content_card-min.png',
            '../imagesdogpardirectory/Untitled-16-dopark_content_card-min.png',
            '../imagesdogpardirectory/Untitled-17-dopark_content_card-min.png',
            '../imagesdogpardirectory/Untitled-18-dopark_content_card-min.png',
            '../imagesdogpardirectory/dopark_content_card.png'
        ];
        
        const imageUrl = park.photo || localImages[i % localImages.length];
        const amenities = this.extractAmenities(park);
        const amenityIcons = this.createAmenityIcons(amenities.length ? amenities : ['Indoor Play']);
        
        let description = '';
        if (park.description && park.description.length > 10) {
            description = park.description.substring(0, 120) + (park.description.length > 120 ? '...' : '');
        } else {
            description = `Indoor dog facility in ${park.city || 'Fort Worth'}`;
        }
        
        return `
            <div class="park-card">
                <div class="park-image">
                    <img src="${imageUrl}" alt="${park.name}">
                </div>
                <div class="park-content">
                    <h3>${park.name}</h3>
                    <div class="park-location">
                        <span>📍</span>
                        <span>${park.city || 'Fort Worth'}, TX</span>
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
        
        // Check for common amenities based on park data
        if (park.amenities) {
            if (typeof park.amenities === 'string') {
                return park.amenities.split(',').map(a => a.trim()).slice(0, 4);
            } else if (Array.isArray(park.amenities)) {
                return park.amenities.slice(0, 4);
            }
        }
        
        // Default amenities for indoor parks
        const defaultAmenities = ['Indoor Play', 'Climate Control', 'Safe Environment', 'Supervised Play'];
        return defaultAmenities.slice(0, 4);
    }
    
    createAmenityIcons(amenities) {
        const iconMap = {
            'Indoor Play': '🏠',
            'Climate Control': '❄️',
            'Safe Environment': '🛡️',
            'Supervised Play': '👥',
            'Parking': '🅿️',
            'Water': '💧',
            'Treats': '🦴',
            'Training': '🎓',
            'Grooming': '✂️',
            'Daycare': '🏫',
            'Boarding': '🏨',
            'Agility': '🏃',
            'Small Dogs': '🐕',
            'Large Dogs': '🐕‍🦺',
            'Puppies': '🐶',
            'Senior Dogs': '🦮'
        };
        
        return amenities.slice(0, 4).map(amenity => {
            const icon = iconMap[amenity] || iconMap[Object.keys(iconMap).find(key => 
                amenity.toLowerCase().includes(key.toLowerCase())
            )] || '🐕';
            return `<span class="amenity-icon" title="${amenity}">${icon}</span>`;
        }).join('');
    }
    
    createPagination() {
        const totalPages = Math.ceil(this.filteredParks.length / this.parksPerPage);
        const pagination = document.getElementById('pagination');
        
        if (!pagination || totalPages <= 1) {
            if (pagination) pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="window.fortWorthParksManager.goToPage(${this.currentPage - 1})"
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                ← Previous
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                            onclick="window.fortWorthParksManager.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<span class="pagination-ellipsis">...</span>';
            }
        }
        
        // Next button
        paginationHTML += `
            <button class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    onclick="window.fortWorthParksManager.goToPage(${this.currentPage + 1})"
                    ${this.currentPage === totalPages ? 'disabled' : ''}>
                Next →
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredParks.length / this.parksPerPage);
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.displayParks();
        
        // Scroll to parks section
        document.querySelector('.parks-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    async initializeMap() {
        console.log('FortWorthIndoorParksManager: Starting map initialization');
        
        try {
            // Wait for Google Maps to be available
            if (typeof google === 'undefined' || !google.maps) {
                console.log('Google Maps not yet loaded, waiting...');
                await this.waitForGoogleMaps();
            }

            console.log(`Found ${this.parks.length} Fort Worth area indoor parks for map`);

            if (this.parks.length === 0) {
                console.warn('No Fort Worth area parks found in data');
                this.showMapError('No Fort Worth area indoor dog parks found in our database.');
                return;
            }

            // Fort Worth center coordinates
            const fortWorthCenter = { lat: 32.7555, lng: -97.3308 };

            const mapOptions = {
                zoom: 11,
                center: fortWorthCenter,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                    {
                        featureType: "poi.park",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#a5b076" }]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#447530" }]
                    }
                ]
            };

            this.map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
            console.log('Map created successfully');

            // Add markers for each park
            this.addMarkersToMap(this.parks);

            console.log('Fort Worth indoor parks map initialization complete');

        } catch (error) {
            console.error('Error initializing Fort Worth parks map:', error);
            this.showMapError('Unable to load the Fort Worth indoor dog parks map. Please refresh the page to try again.');
        }
    }

    async waitForGoogleMaps() {
        return new Promise((resolve) => {
            const checkGoogle = () => {
                if (typeof google !== 'undefined' && google.maps) {
                    resolve();
                } else {
                    setTimeout(checkGoogle, 100);
                }
            };
            checkGoogle();
        });
    }

    addMarkersToMap(parks) {
        console.log(`Adding ${parks.length} markers to Fort Worth map`);

        parks.forEach((park, index) => {
            if (!park.latitude || !park.longitude) {
                console.warn(`Park ${park.name} missing coordinates`);
                return;
            }

            try {
                // Create marker with simple circle design
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) },
                    map: this.map,
                    title: park.name,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#8e44ad',
                        fillOpacity: 0.8,
                        strokeColor: '#732d91',
                        strokeWeight: 2
                    }
                });

                // Create info window
                const infoWindowContent = `
                    <div style="max-width: 300px; padding: 10px;">
                        <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">${park.name}</h3>
                        <p style="color: #7f8c8d; margin: 0 0 10px 0; font-size: 14px; line-height: 1.4;">
                            Indoor dog facility in ${park.city || 'Fort Worth'} offering climate-controlled comfort and safe play.
                        </p>
                        ${park.address ? `<p style="color: #34495e; margin: 0 0 8px 0; font-size: 13px;"><strong>📍 Address:</strong> ${park.address}</p>` : ''}
                        ${park.phone ? `<p style="color: #34495e; margin: 0 0 8px 0; font-size: 13px;"><strong>📞 Phone:</strong> ${park.phone}</p>` : ''}
                        ${park.website ? `<p style="margin: 10px 0 0 0;"><a href="${park.website}" target="_blank" style="color: #8e44ad; text-decoration: none; font-weight: 500;">🌐 Visit Website</a></p>` : ''}
                    </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                marker.addListener('click', () => {
                    // Close any open info windows
                    this.markers.forEach(m => {
                        if (m.infoWindow) {
                            m.infoWindow.close();
                        }
                    });
                    
                    infoWindow.open(this.map, marker);
                });

                this.markers.push({
                    marker: marker,
                    infoWindow: infoWindow,
                    park: park
                });

            } catch (error) {
                console.error(`Error creating marker for ${park.name}:`, error);
            }
        });

        console.log(`Successfully added ${this.markers.length} markers to Fort Worth map`);
    }

    showMapError(message) {
        const mapContainer = document.getElementById('google-map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #e74c3c; background: #fdf2f2; border-radius: 12px; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <h3>Map Loading Error</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Fort Worth indoor parks page loaded, initializing manager...');
    window.fortWorthParksManager = new FortWorthIndoorParksManager();
});
