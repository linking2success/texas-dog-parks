// Collections Page JavaScript
// Utility functions and constants for park cards
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const localImagesOriginal = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop',
  'imagesdogpardirectory/Untitled-3-dopark_content_card-min.png',
  'imagesdogpardirectory/Untitled-6-dopark_content_card-min.png',
  'imagesdogpardirectory/Untitled-7-min.png',
  'imagesdogpardirectory/Untitled-8-dopark_content_card-min.png',
  'imagesdogpardirectory/Untitled-9-dopark_content_card-min.png',
  'imagesdogpardirectory/Untitled-10-min.png',
  'imagesdogpardirectory/Untitled-11-dopark_content_card-min.png',
  'imagesdogpardirectory/Untitled-16-dopark_content_card-min.png',
  'imagesdogpardirectory/Untitled-17-dopark_content_card-min.png',
  'imagesdogpardirectory/Untitled-18-dopark_content_card-min.png',
  'imagesdogpardirectory/dopark_content_card.png'
];
const localImages = shuffleArray(localImagesOriginal);

function getLocalParkImage(park, i) {
    if (park.photo && park.photo.startsWith('http')) return park.photo;
    // Try new images first
    const newImages = Array.from({length: 20}, (_, idx) => `new_images_dog_park/new_images_dog_park/Untitled-${idx+1}.png`);
    const oldImages = [
        'imagesdogpardirectory/Untitled-3-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-6-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-7-min.png',
        'imagesdogpardirectory/Untitled-8-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-9-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-10-min.png',
        'imagesdogpardirectory/Untitled-11-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-16-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-17-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-18-dopark_content_card-min.png',
        'imagesdogpardirectory/dopark_content_card.png'
    ];
    const hash = park.slug ? park.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) : i;
    const newImg = newImages[hash % newImages.length];
    // Check if new image exists by preloading (sync fallback)
    const img = new window.Image();
    img.src = newImg;
    if (img.complete && img.naturalWidth !== 0) {
        return newImg;
    }
    // Fallback to old image
    return oldImages[hash % oldImages.length];
}

const fallbackDescriptions = [
  "A tail-wagging adventure awaits!",
  "Perfect for pups who love to play.",
  "A local favorite for furry friends.",
  "Where every dog is top dog!",
  "A pawsome spot for socializing.",
  "Bring your best friend for some fun!",
  "A hidden gem for happy hounds.",
  "Sniff, run, and roll in style!",
  "A paradise for playful pups.",
  "Unleash the fun in this city park!"
];

function createParkCard(park, i, extractAmenities, createAmenityIcons) {
    // New and old image paths
    const hash = park.slug ? park.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) : i;
    const newImg = `new_images_dog_park/new_images_dog_park/Untitled-${(hash % 20) + 1}.png`;
    const oldImages = [
        'imagesdogpardirectory/Untitled-3-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-6-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-7-min.png',
        'imagesdogpardirectory/Untitled-8-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-9-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-10-min.png',
        'imagesdogpardirectory/Untitled-11-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-16-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-17-dopark_content_card-min.png',
        'imagesdogpardirectory/Untitled-18-dopark_content_card-min.png',
        'imagesdogpardirectory/dopark_content_card.png'
    ];
    const oldImg = oldImages[hash % oldImages.length];
    const imgSrc = park.photo && park.photo.startsWith('http') ? park.photo : newImg;
    const imgOnError = park.photo && park.photo.startsWith('http') ? '' : `this.onerror=null;this.src='${oldImg}';`;
    const amenities = extractAmenities(park.about);
    const amenityIcons = createAmenityIcons(amenities.length ? amenities : ['Dog Park']);
    let description = '';
    if (park.description && !/great place for dogs to play and socialize/i.test(park.description)) {
        description = park.description.substring(0, 120) + (park.description.length > 120 ? '...' : '');
    } else if (park.city) {
        description = `A favorite dog park in ${park.city}!`;
    } else {
        description = fallbackDescriptions[i % fallbackDescriptions.length];
    }
    return `
            <div class="park-card">
                    <div class="park-image">
                            <img src="${imgSrc}" alt="${park.name}" onerror="${imgOnError}">
                    </div>
                    <div class="park-content">
                            <h3>${park.name}</h3>
                            <div class="park-location">
                                    <span>📍</span>
                                    <span>${park.city}, TX</span>
                            </div>
                            <p class="park-description">${description}</p>
                            ${amenityIcons ? `<div class="park-amenities-icons">${amenityIcons}</div>` : ''}
                            <a href="collection-single.html?slug=${park.slug}" class="park-link">View Details</a>
                    </div>
            </div>
    `;
}

class DogParksManager {
    constructor() {
        this.parks = [];
        this.filteredParks = [];
        this.currentPage = 1;
        this.parksPerPage = 12;
        this.currentFilters = {
            search: '',
            city: '',
            amenity: '',
            status: ''
        };
        
        this.init();
    }
    
    async init() {
        await this.loadParksData();
        this.setupEventListeners();
        this.displayParks();
    }
    
    async loadParksData() {
        try {
            // Use the parks data from parks-data.js
            this.parks = TEXAS_DOG_PARKS;
            this.filteredParks = [...this.parks];
            this.updateResultsCount();
        } catch (error) {
            console.error('Error loading parks data:', error);
            this.showError('Unable to load dog parks data. Please try again later.');
        }
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchInput.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value;
            this.applyFilters();
        });
        
        searchBtn.addEventListener('click', () => {
            this.applyFilters();
        });
        
        // Filter functionality
        const cityFilter = document.getElementById('cityFilter');
        const amenityFilter = document.getElementById('amenityFilter');
        const statusFilter = document.getElementById('statusFilter');
        const clearFiltersBtn = document.getElementById('clearFilters');
        
        cityFilter.addEventListener('change', (e) => {
            this.currentFilters.city = e.target.value;
            this.applyFilters();
        });
        
        amenityFilter.addEventListener('change', (e) => {
            this.currentFilters.amenity = e.target.value;
            this.applyFilters();
        });
        
        statusFilter.addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.applyFilters();
        });
        
        clearFiltersBtn.addEventListener('click', () => {
            this.clearFilters();
        });
        
        // Sort functionality
        const sortSelect = document.getElementById('sortSelect');
        sortSelect.addEventListener('change', (e) => {
            this.sortParks(e.target.value);
        });
    }
    
    applyFilters() {
        this.filteredParks = this.parks.filter(park => {
            // Search filter
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search.toLowerCase();
                const searchableText = `${park.name} ${park.city} ${park.description}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }
            
            // City filter
            if (this.currentFilters.city && park.city !== this.currentFilters.city) {
                return false;
            }
            
            // Status filter
            if (this.currentFilters.status && park.business_status !== this.currentFilters.status) {
                return false;
            }
            
            return true;
        });
        
        this.currentPage = 1;
        this.updateResultsCount();
        this.displayParks();
    }
    
    clearFilters() {
        this.currentFilters = {
            search: '',
            city: '',
            amenity: '',
            status: ''
        };
        
        // Reset form elements
        document.getElementById('searchInput').value = '';
        document.getElementById('cityFilter').value = '';
        document.getElementById('amenityFilter').value = '';
        document.getElementById('statusFilter').value = '';
        
        this.filteredParks = [...this.parks];
        this.currentPage = 1;
        this.updateResultsCount();
        this.displayParks();
    }
    
    sortParks(sortBy) {
        this.filteredParks.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'city':
                    return a.city.localeCompare(b.city);
                case 'rating':
                    // For now, just sort by name since we don't have ratings
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });
        
        this.displayParks();
    }
    
    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        resultsCount.textContent = this.filteredParks.length.toLocaleString();
    }
    
    displayParks() {
        const parksGrid = document.getElementById('parksGrid');
        const startIndex = (this.currentPage - 1) * this.parksPerPage;
        const endIndex = startIndex + this.parksPerPage;
        const parksToShow = this.filteredParks.slice(startIndex, endIndex);
        
        if (parksToShow.length === 0) {
            parksGrid.innerHTML = `
                <div class="no-results">
                    <h3>No dog parks found</h3>
                    <p>Try adjusting your search criteria or filters.</p>
                </div>
            `;
            return;
        }
        
        parksGrid.innerHTML = parksToShow.map((park, i) => createParkCard(park, i, this.extractAmenities.bind(this), this.createAmenityIcons.bind(this))).join('');
        this.createPagination();
    }
    
    createAmenityIcons(amenities) {
        if (!amenities || amenities.length === 0) return '';
        const iconMap = {
            'water': '💧',
            'shade': '🌳',
            'fenced': '🔒',
            'agility': '🎯',
            'separate areas': '📐',
            'parking': '🚗',
            'benches': '🪑',
            'bench': '🪑',
            'open space': '🏃',
            'river access': '🏊',
            'mountain views': '⛰️',
            'beach access': '🏖️',
            'ocean views': '🌊',
            'swimming': '🏊‍♂️',
            'prairie views': '🌾',
            'wind protection': '🛡️',
            'multiple zones': '🎪',
            'water features': '⛲',
            'tropical landscaping': '🌴',
            'family friendly': '👨‍👩‍👧‍👦',
            'restroom': '🚻',
            'restrooms': '🚻',
            'bathroom': '🚻',
            'bathrooms': '🚻',
            'wi-fi': '📶',
            'wifi': '📶',
            'restaurant': '🍽️',
            'playground': '🎠',
            'picnic tables': '🧺',
            'picnic table': '🧺',
            'swings': '🪑',
            'swing': '🪑',
            'equipment': '🎪',
            'enclosed': '🏰',
            'trees': '🌲',
            'drinking': '🥤',
            'seating': '🪑',
            'large dogs': '🐕',
            'small dogs': '🐕‍🦺',
            'training': '🎓',
            'exercise': '💪',
            'socialization': '🤝',
            'recreation': '🎾',
            'entertainment': '🎭',
            'relaxation': '😌',
            'adventure': '🗺️',
            'exploration': '🔍',
            'freedom': '🕊️',
            'safety': '🛡️',
            'clean': '✨',
            'maintained': '🔧',
            'professional': '👔',
            'community': '🏘️',
            'neighborhood': '🏠',
            'downtown': '🏙️',
            'riverside': '🌊',
            'coastal': '🏝️',
            'urban': '🏢',
            'suburban': '🏡',
            'rural': '🌄',
            'dog park': '🐾',
            'table': '🧺',
            'bbq': '🍖',
            'barbecue': '🍖',
            'grill': '🍖',
            'trash': '🗑️',
            'trash can': '🗑️',
            'lighting': '💡',
            'water fountain': '🚰',
            'fountain': '🚰',
            'rest area': '🛋️',
            'dog wash': '🛁',
            'dog shower': '🛁',
            'dog pool': '🏊‍♂️',
            'dog run': '🏃',
            'dog area': '🐶',
            'leash area': '🦮',
            'off-leash': '🦴',
            'on-leash': '🦮',
            'trail': '🥾',
            'walking trail': '🥾',
            'hiking': '🥾',
            'gazebo': '🏖️',
            'shelter': '🏕️',
            'covered area': '🏕️',
            'fire hydrant': '🚒',
            'dog friendly': '🐶',
            'dog station': '🦴',
            'dog bag': '🦴',
            'dog bags': '🦴',
            'bag dispenser': '🦴',
            'waste bags': '🦴',
            'waste station': '🦴',
            'water bowl': '🥣',
            'dog bowl': '🥣',
            'picnic': '🧺',
            'bench': '🪑',
            'shade structure': '🌳',
            'sun shelter': '🏖️',
            'dog agility': '🎯',
            'dog equipment': '🎪',
            'dog playground': '🎠',
            'dog fountain': '🚰',
            'dog restroom': '🚻',
            'dog parking': '🚗',
            'dog restaurant': '🍽️',
            'dog wi-fi': '📶',
            'dog pool': '🏊‍♂️',
            'dog swings': '🪑',
            'dog picnic': '🧺',
            'dog table': '🧺',
            'dog trash': '🗑️',
            'dog lighting': '💡',
            'dog clean': '✨',
            'dog maintained': '🔧',
            'dog professional': '👔',
            'dog community': '🏘️',
            'dog neighborhood': '🏠',
            'dog downtown': '🏙️',
            'dog riverside': '🌊',
            'dog coastal': '🏝️',
            'dog urban': '🏢',
            'dog suburban': '🏡',
            'dog rural': '🌄'
        };
        // Only show first 3 amenities to keep it clean
        const limitedAmenities = amenities.slice(0, 3);
        return limitedAmenities.map(amenity => {
            const key = amenity.trim().toLowerCase();
            // Try exact match
            if (iconMap[key]) {
                return `<div class="amenity-icon" title="${amenity}"><span>${iconMap[key]}</span><span>${amenity}</span></div>`;
            }
            // Try partial match
            const found = Object.keys(iconMap).find(k => key.includes(k));
            if (found) {
                return `<div class="amenity-icon" title="${amenity}"><span>${iconMap[found]}</span><span>${amenity}</span></div>`;
            }
            // Default
            return `<div class="amenity-icon" title="${amenity}"><span>🐾</span><span>${amenity}</span></div>`;
        }).join('');
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
        
        return amenities.slice(0, 3); // Limit to 3 amenities
    }
    
    truncateDescription(description) {
        if (description.length > 120) {
            return description.substring(0, 120) + '...';
        }
        return description;
    }
    
    createPagination() {
        const totalPages = Math.ceil(this.filteredParks.length / this.parksPerPage);
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="parksManager.goToPage(${this.currentPage - 1})">
                Previous
            </button>
        `;
        
        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="${i === this.currentPage ? 'active' : ''}" onclick="parksManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        // Next button
        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="parksManager.goToPage(${this.currentPage + 1})">
                Next
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.displayParks();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    showError(message) {
        const parksGrid = document.getElementById('parksGrid');
        parksGrid.innerHTML = `
            <div class="error">
                <h2>Error</h2>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize the parks manager when the page loads
let parksManager;
document.addEventListener('DOMContentLoaded', () => {
    parksManager = new DogParksManager();
}); 