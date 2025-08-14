class FortWorthIndoorParksManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.parkDescriptions = [
            "This premier indoor dog facility in Fort Worth combines Cowtown hospitality with modern climate-controlled comfort.",
            "A favorite among Fort Worth dog owners, featuring Western charm and professional staff dedicated to pet wellness.",
            "Located in the heart of Fort Worth, this indoor park provides year-round comfort with true Texas hospitality.",
            "Experience top-tier indoor dog recreation where Fort Worth's friendly atmosphere meets specialized pet amenities.",
            "Fort Worth's most popular indoor dog destination, known for its welcoming community and clean facilities.",
            "A modern indoor dog park offering spacious play areas with that distinctive Fort Worth character.",
            "This upscale indoor facility embodies Fort Worth's attention to detail with thoughtfully designed play zones.",
            "Professional indoor dog care with experienced staff and premium amenities throughout Fort Worth.",
            "A well-maintained indoor space where Fort Worth dogs can exercise comfortably in any weather.",
            "Fort Worth families love this indoor dog park for its safe environment and engaging social activities.",
            "Featuring specialized indoor equipment with climate-controlled comfort perfect for Texas weather.",
            "This trusted Fort Worth location offers consistent quality and reliable indoor dog recreation services.",
            "A community favorite providing excellent indoor facilities with that signature Fort Worth friendly service.",
            "Modern indoor dog park with innovative design and unwavering focus on canine comfort and safety.",
            "Fort Worth's premier destination for indoor dog socialization and exercise in comfortable surroundings.",
            "This established facility combines traditional dog park fun with Fort Worth's commitment to quality.",
            "A spacious indoor environment designed specifically for active dogs and their devoted Fort Worth families.",
            "Professional indoor dog services emphasizing cleanliness and safety with Fort Worth's renowned hospitality.",
            "Conveniently located in Fort Worth, offering reliable indoor dog recreation and community connections.",
            "This indoor facility stands out for Fort Worth's attention to detail and unwavering commitment to pets."
        ];
        this.currentDescriptionIndex = 0;
    }

    getNextDescription() {
        const description = this.parkDescriptions[this.currentDescriptionIndex];
        this.currentDescriptionIndex = (this.currentDescriptionIndex + 1) % this.parkDescriptions.length;
        return description;
    }

    async initializeMap() {
        console.log('FortWorthIndoorParksManager: Starting map initialization');
        
        try {
            // Wait for Google Maps to be available
            if (typeof google === 'undefined' || !google.maps) {
                console.log('Google Maps not yet loaded, waiting...');
                await this.waitForGoogleMaps();
            }

            // Filter for Fort Worth area parks
            const fortWorthParks = window.indoorParksData?.filter(park => 
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
            ) || [];

            console.log(`Found ${fortWorthParks.length} Fort Worth area indoor parks`);

            if (fortWorthParks.length === 0) {
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
            this.addMarkersToMap(fortWorthParks);

            // Display parks list
            this.displayParksList(fortWorthParks);

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
                            ${this.getNextDescription()}
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

        console.log(`Displayed ${parks.length} Fort Worth parks in listings`);
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

// Global function for Google Maps callback
function initFortWorthParksMap() {
    console.log('Google Maps loaded, initializing Fort Worth parks map...');
    if (window.fortWorthParksManager) {
        window.fortWorthParksManager.initializeMap();
    } else {
        console.error('Fort Worth parks manager not found');
    }
}
