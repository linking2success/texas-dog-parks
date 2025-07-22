// Park Details Page JavaScript
class ParkDetailsManager {
    constructor() {
        this.park = null;
        this.init();
    }
    
    init() {
        this.loadParkData();
        this.setupEventListeners();
    }
    
    loadParkData() {
        // Get park name from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const parkSlug = urlParams.get('slug');
        
        if (!parkSlug) {
            this.showError('No park specified');
            return;
        }
        
        // Find the park in our data
        this.park = TEXAS_DOG_PARKS.find(park => park.slug === parkSlug);
        
        if (!this.park) {
            this.showError('Park not found');
            return;
        }
        
        this.displayParkDetails();
        this.loadNearbyParks();
    }
    
    displayParkDetails() {
        // Update page title
        document.title = `${this.park.name} - Bark & Play Directory`;
        
        // Update breadcrumb
        document.getElementById('parkName').textContent = this.park.name;
        
        // Update main image
        const mainImage = document.getElementById('parkMainImage');
        mainImage.src = this.park.photo || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop';
        mainImage.alt = this.park.name;
        
        // Update park title
        document.getElementById('parkTitle').textContent = this.park.name;
        
        // Update address
        document.getElementById('parkAddress').textContent = this.park.full_address || `${this.park.city}, TX`;
        
        // Update description
        document.getElementById('parkDescription').textContent = this.park.description;
        
        // Update amenities
        this.displayAmenities();
        
        // Update contact information
        this.updateContactInfo();
        
        // Update action buttons
        this.updateActionButtons();
        
        // Update features
        this.displayFeatures();
    }
    
    displayAmenities() {
        const amenitiesContainer = document.getElementById('parkAmenities');
        const amenities = this.extractAmenities(this.park.about);

        const iconMap = {
            'Water': '💧',
            'Shade': '🌳',
            'Fenced': '🔒',
            'Agility': '🎯',
            'Separate Areas': '📐',
            'Parking': '🚗',
            'Benches': '🪑',
            'Open Space': '🏃',
            'River Access': '🏊',
            'Mountain Views': '⛰️',
            'Beach Access': '🏖️',
            'Ocean Views': '🌊',
            'Swimming': '🏊‍♂️',
            'Prairie Views': '🌾',
            'Wind Protection': '🛡️',
            'Multiple Zones': '🎪',
            'Water Features': '⛲',
            'Tropical Landscaping': '🌴',
            'Family Friendly': '👨‍👩‍👧‍👦',
            'Restroom': '🚻',
            'Wi-Fi': '📶',
            'Restaurant': '🍽️',
            'Playground': '🎠',
            'Picnic Tables': '🧺',
            'Swings': '🎢',
            'Equipment': '🎪',
            'Enclosed': '🏰',
            'Trees': '🌲',
            'Drinking': '🥤',
            'Seating': '🪑',
            'Large Dogs': '🐕',
            'Small Dogs': '🐕‍🦺',
            'Training': '🎓',
            'Exercise': '💪',
            'Socialization': '🤝',
            'Recreation': '🎾',
            'Entertainment': '🎭',
            'Relaxation': '😌',
            'Adventure': '🗺️',
            'Exploration': '🔍',
            'Freedom': '🕊️',
            'Safety': '🛡️',
            'Clean': '✨',
            'Maintained': '🔧',
            'Professional': '👔',
            'Community': '🏘️',
            'Neighborhood': '🏠',
            'Downtown': '🏙️',
            'Riverside': '🌊',
            'Coastal': '🏝️',
            'Urban': '🏢',
            'Suburban': '🏡',
            'Rural': '🌄'
        };

        if (amenities.length === 0) {
            amenitiesContainer.innerHTML = '<div class="amenity-icon"><span>🐾</span><span>Dog Park</span></div>';
            return;
        }

        amenitiesContainer.innerHTML = amenities.map(amenity =>
            `<div class="amenity-icon" title="${amenity}"><span>${iconMap[amenity] || '🐾'}</span><span>${amenity}</span></div>`
        ).join('');
    }
    
    extractAmenities(aboutText) {
        const amenities = [];
        if (!aboutText) return amenities;
        
        try {
            const about = JSON.parse(aboutText);
            if (about.Amenities) {
                Object.keys(about.Amenities).forEach(amenity => {
                    if (about.Amenities[amenity]) {
                        amenities.push(amenity);
                    }
                });
            }
        } catch (e) {
            // Fallback to string parsing if JSON parsing fails
            const about = aboutText.toLowerCase();
            
            if (about.includes('water') || about.includes('drinking')) {
                amenities.push('Water');
            }
            if (about.includes('shade') || about.includes('trees')) {
                amenities.push('Shade');
            }
            if (about.includes('fence') || about.includes('enclosed')) {
                amenities.push('Fenced');
            }
            if (about.includes('agility') || about.includes('equipment')) {
                amenities.push('Agility');
            }
            if (about.includes('separate') || about.includes('small') || about.includes('large')) {
                amenities.push('Separate Areas');
            }
            if (about.includes('parking')) {
                amenities.push('Parking');
            }
            if (about.includes('bench') || about.includes('seating')) {
                amenities.push('Benches');
            }
        }
        
        return amenities;
    }
    
    updateContactInfo() {
        // Phone
        const phoneLink = document.getElementById('contactPhone');
        const phoneDisplay = document.getElementById('contactPhone');
        
        if (this.park.phone) {
            phoneLink.href = `tel:${this.park.phone}`;
            phoneDisplay.textContent = this.park.phone;
        } else {
            phoneLink.href = '#';
            phoneDisplay.textContent = 'Not available';
        }
        
        // Website
        const websiteLink = document.getElementById('contactWebsite');
        if (this.park.site) {
            websiteLink.href = this.park.site;
            websiteLink.textContent = 'Visit website';
        } else {
            websiteLink.href = '#';
            websiteLink.textContent = 'Not available';
        }
        
        // Address
        const addressDisplay = document.getElementById('contactAddress');
        addressDisplay.textContent = this.park.full_address || `${this.park.city}, TX`;
    }
    
    updateActionButtons() {
        // Directions button
        const directionsLink = document.getElementById('directionsLink');
        const address = this.park.full_address || `${this.park.city}, TX`;
        directionsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        
        // Phone button
        const phoneLink = document.getElementById('phoneLink');
        if (this.park.phone) {
            phoneLink.href = `tel:${this.park.phone}`;
        } else {
            phoneLink.href = '#';
            phoneLink.classList.add('phone-disabled');
        }
    }
    
    displayFeatures() {
        const featuresContainer = document.getElementById('parkFeatures');
        const amenities = this.extractAmenities(this.park.about);
        
        if (amenities.length === 0) {
            featuresContainer.innerHTML = `
                <div class="feature-item">
                    <h4>Off-Leash Area</h4>
                    <p>Designated space for dogs to run and play freely.</p>
                </div>
            `;
            return;
        }
        
        const featureDescriptions = {
            'Water': 'Water stations available for dogs to stay hydrated.',
            'Shade': 'Shaded areas to keep dogs cool on hot days.',
            'Fenced': 'Securely fenced area for safe off-leash play.',
            'Agility': 'Agility equipment for training and exercise.',
            'Separate Areas': 'Separate spaces for small and large dogs.',
            'Parking': 'Convenient parking available for visitors.',
            'Benches': 'Seating areas for owners to relax while dogs play.'
        };
        
        featuresContainer.innerHTML = amenities.map(amenity => `
            <div class="feature-item">
                <h4>${amenity}</h4>
                <p>${featureDescriptions[amenity] || 'Available at this park.'}</p>
            </div>
        `).join('');
    }
    
    loadNearbyParks() {
        const nearbyContainer = document.getElementById('nearbyParks');
        const nearbyParks = TEXAS_DOG_PARKS
            .filter(park => park.city === this.park.city && park.name !== this.park.name)
            .slice(0, 3);
        
        if (nearbyParks.length === 0) {
            nearbyContainer.innerHTML = '<p>No other parks found in this area.</p>';
            return;
        }
        
        nearbyContainer.innerHTML = nearbyParks.map(park => `
            <div class="nearby-park-item">
                <h4>${park.name}</h4>
                <p>${park.city}, TX</p>
                <a href="collection-single.html?slug=${park.slug}" class="nearby-park-link">View Details →</a>
            </div>
        `).join('');
    }
    
    setupEventListeners() {
        // Add any additional event listeners here
    }
    
    showError(message) {
        const container = document.querySelector('.park-details .container');
        container.innerHTML = `
            <div class="error" style="text-align: center; padding: 4rem 0;">
                <h2>Error</h2>
                <p>${message}</p>
                <a href="collections.html" class="btn btn-primary" style="margin-top: 1rem;">Back to All Parks</a>
            </div>
        `;
    }
}

// Initialize the park details manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ParkDetailsManager();
}); 