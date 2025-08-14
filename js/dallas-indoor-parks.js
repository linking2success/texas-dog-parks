class DallasIndoorParksManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.parkDescriptions = [
            "This premier indoor dog facility in Dallas offers state-of-the-art climate control and spacious play areas.",
            "A favorite among Dallas dog owners, featuring modern amenities and professional staff supervision.",
            "Located in the heart of Dallas, this indoor park provides year-round comfort for dogs and their families.",
            "Experience top-tier indoor dog recreation with specialized equipment and safety features.",
            "Dallas's most popular indoor dog destination, known for its clean facilities and friendly atmosphere.",
            "A modern indoor dog park offering spacious play areas and convenient Dallas location.",
            "This upscale indoor facility caters to dogs of all sizes with dedicated play zones.",
            "Professional indoor dog care with experienced staff and premium amenities in Dallas.",
            "A well-maintained indoor space perfect for dogs to exercise regardless of weather conditions.",
            "Dallas families love this indoor dog park for its safe environment and engaging activities.",
            "Featuring specialized indoor equipment and climate-controlled comfort for optimal dog play.",
            "This trusted Dallas location offers consistent quality and reliable indoor dog recreation.",
            "A community favorite providing excellent indoor facilities and professional oversight.",
            "Modern indoor dog park with innovative design and focus on canine comfort and safety.",
            "Dallas's premier destination for indoor dog socialization and exercise year-round.",
            "This established facility combines traditional dog park fun with indoor convenience.",
            "A spacious indoor environment designed specifically for active dogs and their owners.",
            "Professional indoor dog services with emphasis on cleanliness and safety standards.",
            "Located conveniently in Dallas, offering reliable indoor dog recreation and socialization.",
            "This indoor facility stands out for its attention to detail and commitment to dog welfare."
        ];
        this.currentDescriptionIndex = 0;
    }

    getNextDescription() {
        const description = this.parkDescriptions[this.currentDescriptionIndex];
        this.currentDescriptionIndex = (this.currentDescriptionIndex + 1) % this.parkDescriptions.length;
        return description;
    }

    async initializeMap() {
        console.log('DallasIndoorParksManager: Starting map initialization');
        
        try {
            // Wait for Google Maps to be available
            if (typeof google === 'undefined' || !google.maps) {
                console.log('Google Maps not yet loaded, waiting...');
                await this.waitForGoogleMaps();
            }

            // Filter for Dallas area parks
            const dallasParks = window.indoorParksData?.filter(park => 
                park.city && (
                    park.city.toLowerCase().includes('dallas') ||
                    park.city.toLowerCase().includes('plano') ||
                    park.city.toLowerCase().includes('irving') ||
                    park.city.toLowerCase().includes('garland') ||
                    park.city.toLowerCase().includes('mesquite') ||
                    park.city.toLowerCase().includes('richardson') ||
                    park.city.toLowerCase().includes('arlington') ||
                    park.city.toLowerCase().includes('grand prairie') ||
                    park.city.toLowerCase().includes('carrollton') ||
                    park.city.toLowerCase().includes('denton') ||
                    park.city.toLowerCase().includes('lewisville') ||
                    park.city.toLowerCase().includes('mckinney') ||
                    park.city.toLowerCase().includes('frisco') ||
                    park.city.toLowerCase().includes('allen') ||
                    park.city.toLowerCase().includes('flower mound') ||
                    park.city.toLowerCase().includes('grapevine') ||
                    park.city.toLowerCase().includes('euless') ||
                    park.city.toLowerCase().includes('bedford') ||
                    park.city.toLowerCase().includes('hurst') ||
                    park.city.toLowerCase().includes('colleyville') ||
                    park.city.toLowerCase().includes('southlake') ||
                    park.city.toLowerCase().includes('coppell') ||
                    park.city.toLowerCase().includes('farmers branch') ||
                    park.city.toLowerCase().includes('addison') ||
                    park.city.toLowerCase().includes('duncanville') ||
                    park.city.toLowerCase().includes('desoto') ||
                    park.city.toLowerCase().includes('cedar hill') ||
                    park.city.toLowerCase().includes('lancaster') ||
                    park.city.toLowerCase().includes('balch springs') ||
                    park.city.toLowerCase().includes('rowlett') ||
                    park.city.toLowerCase().includes('rockwall') ||
                    park.city.toLowerCase().includes('wylie')
                )
            ) || [];

            console.log(`Found ${dallasParks.length} Dallas area indoor parks`);

            if (dallasParks.length === 0) {
                console.warn('No Dallas area parks found in data');
                this.showMapError('No Dallas area indoor dog parks found in our database.');
                return;
            }

            // Dallas center coordinates
            const dallasCenter = { lat: 32.7831, lng: -96.8067 };

            const mapOptions = {
                zoom: 10,
                center: dallasCenter,
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
            this.addMarkersToMap(dallasParks);

            // Display parks list
            this.displayParksList(dallasParks);

            console.log('Dallas indoor parks map initialization complete');

        } catch (error) {
            console.error('Error initializing Dallas parks map:', error);
            this.showMapError('Unable to load the Dallas indoor dog parks map. Please refresh the page to try again.');
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
        console.log(`Adding ${parks.length} markers to Dallas map`);

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
                        fillColor: '#3498db',
                        fillOpacity: 0.8,
                        strokeColor: '#2980b9',
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
                        ${park.website ? `<p style="margin: 10px 0 0 0;"><a href="${park.website}" target="_blank" style="color: #3498db; text-decoration: none; font-weight: 500;">🌐 Visit Website</a></p>` : ''}
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

        console.log(`Successfully added ${this.markers.length} markers to Dallas map`);
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

        console.log(`Displayed ${parks.length} Dallas parks in listings`);
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
    console.log('Dallas indoor parks page loaded, initializing manager...');
    window.dallasParksManager = new DallasIndoorParksManager();
});

// Global function for Google Maps callback
function initDallasParksMap() {
    console.log('Google Maps loaded, initializing Dallas parks map...');
    if (window.dallasParksManager) {
        window.dallasParksManager.initializeMap();
    } else {
        console.error('Dallas parks manager not found');
    }
}
