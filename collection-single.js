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
        const parkName = urlParams.get('park');
        
        if (!parkSlug && !parkName) {
            this.showError('No park specified');
            return;
        }
        
        // Try to find the park in regular parks data first
        if (typeof TEXAS_DOG_PARKS !== 'undefined') {
            if (parkSlug) {
                this.park = TEXAS_DOG_PARKS.find(park => park.slug === parkSlug);
            } else if (parkName) {
                this.park = TEXAS_DOG_PARKS.find(park => park.name === decodeURIComponent(parkName));
            }
        }
        
        // If not found in regular parks, try indoor parks data
        if (!this.park && typeof indoorParksData !== 'undefined') {
            if (parkName) {
                this.park = indoorParksData.find(park => park.name === decodeURIComponent(parkName));
            }
        }
        
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
        
        // Update breadcrumb and back navigation
        document.getElementById('parkName').textContent = this.park.name;
        // Setup smart navigation system
  setupSmartNavigation();
  
  // Setup mobile dropdown functionality
  setupMobileDropdowns();
}
        
        // Update main image
        const mainImage = document.getElementById('parkMainImage');
        mainImage.src = this.park.photo || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop';
        mainImage.alt = this.park.name;
        
        // Update park title
        document.getElementById('parkTitle').textContent = this.park.name;
        
        // Update address - handle both regular and indoor park formats
        const address = this.park.full_address || this.park.address || `${this.park.city}, TX`;
        document.getElementById('parkAddress').textContent = address;
        
        // Update description - handle both regular and indoor park formats
        let description = this.park.description || this.park.about;
        
        // Check if description is JSON data and format it properly
        if (description && typeof description === 'string') {
            // Try to detect JSON format (starts with { and contains structured data)
            if (description.trim().startsWith('{') && description.includes(':')) {
                try {
                    const jsonData = JSON.parse(description);
                    description = this.formatJsonToDescription(jsonData);
                } catch (e) {
                    console.log('Failed to parse JSON description, using fallback');
                    description = null; // Will trigger fallback logic below
                }
            }
        }
        
        // Clean up any problematic text and provide fallbacks
        if (!description || description.length < 10 || description.includes('undefined') || description.includes('null')) {
            if (this.park.name && this.park.name.toLowerCase().includes('indoor')) {
                description = `${this.park.name} is a climate-controlled indoor dog facility providing year-round comfort for dogs and their families. This modern indoor space offers safe play areas, professional supervision, and protection from Texas weather conditions.`;
            } else if (this.park.name && (this.park.name.toLowerCase().includes('daycare') || this.park.name.toLowerCase().includes('boarding'))) {
                description = `${this.park.name} offers professional dog care services with indoor play facilities. Dogs enjoy supervised playtime in a safe, clean environment with experienced staff and modern amenities.`;
            } else {
                description = `${this.park.name} provides indoor dog recreation facilities with climate-controlled comfort. This facility offers a safe, supervised environment for dogs to play and socialize year-round.`;
            }
        }
        
        // Ensure description is clean and readable
        description = description.replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim();
        
        document.getElementById('parkDescription').textContent = description;
        
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
        
        // Website - handle both regular parks (site) and indoor parks (website)
        const websiteLink = document.getElementById('contactWebsite');
        const websiteUrl = this.park.site || this.park.website;
        if (websiteUrl) {
            websiteLink.href = websiteUrl;
            websiteLink.textContent = 'Visit website';
        } else {
            websiteLink.href = '#';
            websiteLink.textContent = 'Not available';
        }
        
        // Address
        const addressDisplay = document.getElementById('contactAddress');
        const address = this.park.full_address || this.park.address || `${this.park.city}, TX`;
        addressDisplay.textContent = address;
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
        let allParks = [];
        
        // Combine regular parks and indoor parks
        if (typeof TEXAS_DOG_PARKS !== 'undefined') {
            allParks = allParks.concat(TEXAS_DOG_PARKS);
        }
        if (typeof indoorParksData !== 'undefined') {
            allParks = allParks.concat(indoorParksData);
        }
        
        const nearbyParks = allParks
            .filter(park => park.city === this.park.city && park.name !== this.park.name)
            .slice(0, 3);
        
        if (nearbyParks.length === 0) {
            nearbyContainer.innerHTML = '<p>No other parks found in this area.</p>';
            return;
        }
        
        nearbyContainer.innerHTML = nearbyParks.map(park => {
            const linkUrl = park.slug ? 
                `collection-single.html?slug=${park.slug}` : 
                `collection-single.html?park=${encodeURIComponent(park.name)}`;
            
            return `
                <div class="nearby-park-item">
                    <h4>${park.name}</h4>
                    <p>${park.city}, TX</p>
                    <a href="${linkUrl}" class="nearby-park-link">View Details →</a>
                </div>
            `;
        }).join('');
    }
    
    setupSmartNavigation() {
        // Determine if this is an indoor park and set up appropriate navigation
        const isIndoorPark = this.park && (
            typeof indoorParksData !== 'undefined' && 
            indoorParksData.some(park => park.name === this.park.name)
        );
        
        const parentLink = document.getElementById('parentListingLink');
        const backBtn = document.getElementById('backToListingsBtn');
        
        if (isIndoorPark) {
            // Check if we can determine the specific city
            const city = this.park.city ? this.park.city.toLowerCase() : '';
            let cityPage = null;
            let cityName = '';
            
            if (city.includes('houston')) {
                cityPage = 'indoor-dog-parks/houston.html';
                cityName = 'Houston';
            } else if (city.includes('austin')) {
                cityPage = 'indoor-dog-parks/austin.html';
                cityName = 'Austin';
            } else if (city.includes('dallas') || city.includes('plano') || city.includes('frisco') || city.includes('irving')) {
                cityPage = 'indoor-dog-parks/dallas.html';
                cityName = 'Dallas';
            } else if (city.includes('san antonio')) {
                cityPage = 'indoor-dog-parks/san-antonio.html';
                cityName = 'San Antonio';
            } else if (city.includes('fort worth') || city.includes('arlington')) {
                cityPage = 'indoor-dog-parks/fort-worth.html';
                cityName = 'Fort Worth';
            }
            
            if (cityPage) {
                parentLink.href = cityPage;
                parentLink.textContent = `${cityName} Indoor Parks`;
                backBtn.textContent = `← Back to ${cityName} Indoor Parks`;
                
                // Store the back URL globally for the button
                window.backToListingsUrl = cityPage;
            } else {
                // Fallback to general indoor parks page
                parentLink.href = 'indoor-dog-parks.html';
                parentLink.textContent = 'Indoor Dog Parks';
                backBtn.textContent = '← Back to Indoor Parks';
                window.backToListingsUrl = 'indoor-dog-parks.html';
            }
        } else {
            // Regular outdoor park
            parentLink.href = 'collections.html';
            parentLink.textContent = 'All Dog Parks';
            backBtn.textContent = '← Back to All Parks';
            window.backToListingsUrl = 'collections.html';
        }
    }
    
    formatJsonToDescription(jsonData) {
        let description = '';
        
        try {
            // Extract meaningful information from JSON structure
            const sections = [];
            
            // Handle Accessibility section
            if (jsonData.Accessibility) {
                const accessFeatures = [];
                for (const [key, value] of Object.entries(jsonData.Accessibility)) {
                    if (value === true) {
                        accessFeatures.push(key.toLowerCase().replace(/_/g, ' '));
                    }
                }
                if (accessFeatures.length > 0) {
                    sections.push(`This facility offers ${accessFeatures.join(', ')}.`);
                }
            }
            
            // Handle Amenities section
            if (jsonData.Amenities) {
                const amenities = [];
                for (const [key, value] of Object.entries(jsonData.Amenities)) {
                    if (value === true) {
                        amenities.push(key.toLowerCase().replace(/_/g, ' '));
                    }
                }
                if (amenities.length > 0) {
                    sections.push(`Available amenities include ${amenities.join(', ')}.`);
                }
            }
            
            // Handle Pets section
            if (jsonData.Pets) {
                const petFeatures = [];
                for (const [key, value] of Object.entries(jsonData.Pets)) {
                    if (value === true) {
                        petFeatures.push(key.toLowerCase().replace(/_/g, ' '));
                    }
                }
                if (petFeatures.length > 0) {
                    sections.push(`Pet policies: ${petFeatures.join(', ')}.`);
                }
            }
            
            // Handle Services section
            if (jsonData.Services) {
                const services = [];
                for (const [key, value] of Object.entries(jsonData.Services)) {
                    if (value === true) {
                        services.push(key.toLowerCase().replace(/_/g, ' '));
                    }
                }
                if (services.length > 0) {
                    sections.push(`Services offered: ${services.join(', ')}.`);
                }
            }
            
            // Handle Planning section
            if (jsonData.Planning) {
                const planning = [];
                for (const [key, value] of Object.entries(jsonData.Planning)) {
                    if (value === true) {
                        planning.push(key.toLowerCase().replace(/_/g, ' '));
                    }
                }
                if (planning.length > 0) {
                    sections.push(`Planning features: ${planning.join(', ')}.`);
                }
            }
            
            // Handle other sections dynamically
            for (const [sectionKey, sectionValue] of Object.entries(jsonData)) {
                if (typeof sectionValue === 'object' && 
                    !['Accessibility', 'Amenities', 'Pets', 'Services', 'Planning'].includes(sectionKey)) {
                    const features = [];
                    for (const [key, value] of Object.entries(sectionValue)) {
                        if (value === true) {
                            features.push(key.toLowerCase().replace(/_/g, ' '));
                        }
                    }
                    if (features.length > 0) {
                        sections.push(`${sectionKey}: ${features.join(', ')}.`);
                    }
                }
            }
            
            // Combine all sections into a readable description
            if (sections.length > 0) {
                description = sections.join(' ');
                
                // Add a nice opening if it's an indoor facility
                if (this.park.name && this.park.name.toLowerCase().includes('indoor')) {
                    description = `This indoor dog facility provides a comfortable, climate-controlled environment for your pets. ${description}`;
                } else {
                    description = `This dog facility offers various amenities and services for you and your pets. ${description}`;
                }
            }
            
        } catch (error) {
            console.error('Error formatting JSON description:', error);
            return null; // Will trigger fallback
        }
        
        return description;
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

// Setup mobile dropdown functionality for better navigation
function setupMobileDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function(e) {
        // On mobile devices, handle dropdown clicks
        if (window.innerWidth <= 768) {
          e.preventDefault();
          
          // Close other dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle('active');
        }
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
}

// Initialize the park details manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ParkDetailsManager();
});

// Global function for back navigation
function goBackToListings() {
    if (window.backToListingsUrl) {
        window.location.href = window.backToListingsUrl;
    } else {
        // Fallback to browser back button
        window.history.back();
    }
} 