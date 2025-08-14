class SanAntonioIndoorParksManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.parkDescriptions = [
            "This premier indoor dog facility in San Antonio offers climate-controlled comfort perfect for beating the Texas heat.",
            "A beloved Alamo City destination featuring modern amenities and professional staff dedicated to dog wellness.",
            "Located in the heart of San Antonio, this indoor park provides year-round comfort for dogs and their families.",
            "Experience top-tier indoor dog recreation with specialized equipment designed for safe, fun play.",
            "San Antonio's most popular indoor dog destination, known for its clean facilities and welcoming atmosphere.",
            "A modern indoor dog park offering spacious play areas in a convenient San Antonio location.",
            "This upscale indoor facility caters to dogs of all sizes with thoughtfully designed play zones.",
            "Professional indoor dog care with experienced staff and premium amenities throughout San Antonio.",
            "A well-maintained indoor space perfect for dogs to exercise regardless of the unpredictable Texas weather.",
            "San Antonio families love this indoor dog park for its safe environment and engaging activities.",
            "Featuring specialized indoor equipment and climate-controlled comfort for optimal year-round dog play.",
            "This trusted San Antonio location offers consistent quality and reliable indoor dog recreation.",
            "A community favorite providing excellent indoor facilities with professional oversight and care.",
            "Modern indoor dog park with innovative design and unwavering focus on canine comfort and safety.",
            "San Antonio's premier destination for indoor dog socialization and exercise in any weather.",
            "This established facility combines traditional dog park fun with the convenience of indoor comfort.",
            "A spacious indoor environment designed specifically for active dogs and their devoted owners.",
            "Professional indoor dog services with emphasis on cleanliness and the highest safety standards.",
            "Conveniently located in San Antonio, offering reliable indoor dog recreation and socialization opportunities.",
            "This indoor facility stands out for its attention to detail and unwavering commitment to dog welfare."
        ];
        this.currentDescriptionIndex = 0;
    }

    getNextDescription() {
        const description = this.parkDescriptions[this.currentDescriptionIndex];
        this.currentDescriptionIndex = (this.currentDescriptionIndex + 1) % this.parkDescriptions.length;
        return description;
    }

    async initializeMap() {
        console.log('SanAntonioIndoorParksManager: Starting map initialization');
        
        try {
            // Wait for Google Maps to be available
            if (typeof google === 'undefined' || !google.maps) {
                console.log('Google Maps not yet loaded, waiting...');
                await this.waitForGoogleMaps();
            }

            // Filter for San Antonio area parks
            const sanAntonioParks = window.indoorParksData?.filter(park => 
                park.city && (
                    park.city.toLowerCase().includes('san antonio') ||
                    park.city.toLowerCase().includes('schertz') ||
                    park.city.toLowerCase().includes('cibolo') ||
                    park.city.toLowerCase().includes('live oak') ||
                    park.city.toLowerCase().includes('converse') ||
                    park.city.toLowerCase().includes('universal city') ||
                    park.city.toLowerCase().includes('kirby') ||
                    park.city.toLowerCase().includes('terrell hills') ||
                    park.city.toLowerCase().includes('alamo heights') ||
                    park.city.toLowerCase().includes('olmos park') ||
                    park.city.toLowerCase().includes('balcones heights') ||
                    park.city.toLowerCase().includes('castle hills') ||
                    park.city.toLowerCase().includes('hill country village') ||
                    park.city.toLowerCase().includes('hollywood park') ||
                    park.city.toLowerCase().includes('shavano park') ||
                    park.city.toLowerCase().includes('windcrest') ||
                    park.city.toLowerCase().includes('leon valley') ||
                    park.city.toLowerCase().includes('lackland') ||
                    park.city.toLowerCase().includes('kelly') ||
                    park.city.toLowerCase().includes('elmendorf') ||
                    park.city.toLowerCase().includes('von ormy') ||
                    park.city.toLowerCase().includes('somerset') ||
                    park.city.toLowerCase().includes('selma') ||
                    park.city.toLowerCase().includes('garden ridge') ||
                    park.city.toLowerCase().includes('new braunfels') ||
                    park.city.toLowerCase().includes('seguin') ||
                    park.city.toLowerCase().includes('boerne') ||
                    park.city.toLowerCase().includes('fair oaks ranch') ||
                    park.city.toLowerCase().includes('stone oak') ||
                    park.city.toLowerCase().includes('helotes')
                )
            ) || [];

            console.log(`Found ${sanAntonioParks.length} San Antonio area indoor parks`);

            if (sanAntonioParks.length === 0) {
                console.warn('No San Antonio area parks found in data');
                this.showMapError('No San Antonio area indoor dog parks found in our database.');
                return;
            }

            // San Antonio center coordinates
            const sanAntonioCenter = { lat: 29.4241, lng: -98.4936 };

            const mapOptions = {
                zoom: 11,
                center: sanAntonioCenter,
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
            this.addMarkersToMap(sanAntonioParks);

            // Display parks list
            this.displayParksList(sanAntonioParks);

            console.log('San Antonio indoor parks map initialization complete');

        } catch (error) {
            console.error('Error initializing San Antonio parks map:', error);
            this.showMapError('Unable to load the San Antonio indoor dog parks map. Please refresh the page to try again.');
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
        console.log(`Adding ${parks.length} markers to San Antonio map`);

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
                        fillColor: '#e74c3c',
                        fillOpacity: 0.8,
                        strokeColor: '#c0392b',
                        strokeWeight: 2
                    }
                });

                // Create info window
                const infoWindowContent = `
                    <div style="max-width: 300px; padding: 10px;">
                        <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">${park.name}</h3>
                        <p style="color: #7f8c8d; margin: 0 0 10px 0; font-size: 14px; line-height: 1.4;">
                            ${this.getNextDescription()}
                        </p>
                        ${park.address ? `<p style="color: #34495e; margin: 0 0 8px 0; font-size: 13px;"><strong>📍 Address:</strong> ${park.address}</p>` : ''}
                        ${park.phone ? `<p style="color: #34495e; margin: 0 0 8px 0; font-size: 13px;"><strong>📞 Phone:</strong> ${park.phone}</p>` : ''}
                        ${park.website ? `<p style="margin: 10px 0 0 0;"><a href="${park.website}" target="_blank" style="color: #e74c3c; text-decoration: none; font-weight: 500;">🌐 Visit Website</a></p>` : ''}
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

        console.log(`Successfully added ${this.markers.length} markers to San Antonio map`);
    }

    displayParksList(parks) {
        const listingsContainer = document.getElementById('park-listings');
        if (!listingsContainer) {
            console.warn('Park listings container not found');
            return;
        }

        listingsContainer.innerHTML = '';

        parks.forEach(park => {
            const parkCard = document.createElement('div');
            parkCard.className = 'park-card';
            parkCard.innerHTML = `
                <div class="park-content">
                    <h3 class="park-name">${park.name}</h3>
                    <p class="park-description">${this.getNextDescription()}</p>
                    <div class="park-info">
                        ${park.address ? `<p class="park-address"><span class="icon">📍</span> ${park.address}</p>` : ''}
                        ${park.phone ? `<p class="park-phone"><span class="icon">📞</span> ${park.phone}</p>` : ''}
                    </div>
                    <div class="park-actions">
                        <a href="collection-single.html?park=${encodeURIComponent(park.name)}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;
            listingsContainer.appendChild(parkCard);
        });

        console.log(`Displayed ${parks.length} San Antonio parks in listings`);
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
    console.log('San Antonio indoor parks page loaded, initializing manager...');
    window.sanAntonioParksManager = new SanAntonioIndoorParksManager();
});

// Global function for Google Maps callback
function initSanAntonioParksMap() {
    console.log('Google Maps loaded, initializing San Antonio parks map...');
    if (window.sanAntonioParksManager) {
        window.sanAntonioParksManager.initializeMap();
    } else {
        console.error('San Antonio parks manager not found');
    }
}
