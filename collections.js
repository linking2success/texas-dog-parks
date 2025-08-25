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
    // Unsplash fallback
    'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop',
    // dogparkdirectory PNGs
    'images/dogparkdirectory/Untitled-3-dopark_content_card-min.png',
    'images/dogparkdirectory/Untitled-6-dopark_content_card-min.png',
    'images/dogparkdirectory/Untitled-7-min.png',
    'images/dogparkdirectory/Untitled-8-dopark_content_card-min.png',
    'images/dogparkdirectory/Untitled-9-dopark_content_card-min.png',
    'images/dogparkdirectory/Untitled-10-min.png',
    'images/dogparkdirectory/Untitled-11-dopark_content_card-min.png',
    'images/dogparkdirectory/Untitled-16-dopark_content_card-min.png',
    'images/dogparkdirectory/Untitled-17-dopark_content_card-min.png',
    'images/dogparkdirectory/Untitled-18-dopark_content_card-min.png',
    'images/dogparkdirectory/dopark_content_card.png',
    // dogparkdirectory JPGs
    'images/dogparkdirectory/220_F_122185380_baKZ5HkR6EisiN4mKZ40MRCw0JRLI9pj.jpg',
    // texas_city_dog_content JPGs
    'images/texas_city_dog_content/220_F_1072158505_HqBos1wUTIfsQEPlw9wG3BNfFZaHGttp.jpg',
    'images/texas_city_dog_content/220_F_1072167199_60wbUwsPowqjbtZ0PtxWpVWAULPW5mIX.jpg',
    'images/texas_city_dog_content/220_F_111710527_d3wKTsIeS2Vjc4DFbOLzZjt4f9p0WZ50.jpg',
    'images/texas_city_dog_content/220_F_1540037270_KTzAikyRWV027Ag97SK6XPmY9A51tQjH.jpg',
    'images/texas_city_dog_content/220_F_176241508_8DWdcgyyBauNzEGeteijAIFx5gGl7JO5.jpg',
    'images/texas_city_dog_content/220_F_251689485_dsuuP00gvSDncOmhFJ7IhhseNuXUdm46.jpg',
    'images/texas_city_dog_content/220_F_283563163_cocLR3bGNuFCczaapt999K62PFvOcL54.jpg',
    'images/texas_city_dog_content/220_F_314172989_58UwpoEEL1zPKEisot2ArRaqamFrLTKH.jpg',
    'images/texas_city_dog_content/220_F_314742253_bHfkW2e3zCaKMTRCrlLZSkMmKvCQRNis.jpg',
    'images/texas_city_dog_content/220_F_372575591_xxKIgv9qXBZAoPmLPPl2D07bmEcGRkCE.jpg',
    'images/texas_city_dog_content/220_F_479349005_InkGKWFtbjBEfv4GvijC3zb0pWKS8EZd (1).jpg',
    'images/texas_city_dog_content/220_F_51708219_MdYfq9oR6U6XyvvS3z9WnN6kGicPR8sd.jpg',
    'images/texas_city_dog_content/220_F_983655304_Ku91dzZBaUj6ODqFlqpXVf0YSFRJtObo.jpg',
    'images/texas_city_dog_content/240_F_122753734_OG4ot7JpfdK4WNK9dvwwNYFRzTRWuns8.jpg',
    'images/texas_city_dog_content/240_F_1292370572_Ff36XZ6xXV4hzVHNvtX5n4DkertBNy4q.jpg',
    'images/texas_city_dog_content/240_F_1303303907_byeuSE8VLnNZWOsYX0SiaYLBt7wqxYcS.jpg',
    'images/texas_city_dog_content/240_F_1315286686_ioxd1A1JZWgmH0J9ZXV1dhljyVF1wSIj.jpg',
    'images/texas_city_dog_content/240_F_1345162324_vADe7EEGX3utsVHF2sVCYoqEPldpmF3k.jpg',
    'images/texas_city_dog_content/240_F_1481399433_cDIKM4Vi1gbIq4jI5FjYMzEKRkQU8RL2.jpg',
    'images/texas_city_dog_content/240_F_315214140_4po7QndT2WYLgyoVLIxv3j3J6jAgUONP.jpg',
    'images/texas_city_dog_content/240_F_506929963_cNsJcRdlYBC8WkOnhh81kiQlHRmluGMV.jpg',
    'images/texas_city_dog_content/240_F_506929994_6vYxEC7N6OSk39dmauhDgqqdaYOq6Ns0.jpg',
    'images/texas_city_dog_content/240_F_536434604_XrhxBtaxo70qCVd1Jz2M0F3aXTaj7r7m.jpg',
    'images/texas_city_dog_content/240_F_805347736_S66yplJZByQenKDr7AZqfaFQronaW7pC.jpg',
    // new_images_dog_park/Untitled PNGs
    'new_images_dog_park/Untitled/Untitled-1.png',
    'new_images_dog_park/Untitled/Untitled-2.png',
    'new_images_dog_park/Untitled/Untitled-3.png',
    'new_images_dog_park/Untitled/Untitled-4.png',
    'new_images_dog_park/Untitled/Untitled-5.png',
    'new_images_dog_park/Untitled/Untitled-6.png',
    'new_images_dog_park/Untitled/Untitled-7.png',
    'new_images_dog_park/Untitled/Untitled-8.png',
    'new_images_dog_park/Untitled/Untitled-9.png',
    'new_images_dog_park/Untitled/Untitled-10.png',
    'new_images_dog_park/Untitled/Untitled-11.png',
    'new_images_dog_park/Untitled/Untitled-12.png',
    'new_images_dog_park/Untitled/Untitled-13.png',
    'new_images_dog_park/Untitled/Untitled-14.png',
    'new_images_dog_park/Untitled/Untitled-15.png',
    'new_images_dog_park/Untitled/Untitled-16.png',
    'new_images_dog_park/Untitled/Untitled-17.png',
    'new_images_dog_park/Untitled/Untitled-18.png',
    'new_images_dog_park/Untitled/Untitled-19.png',
    'new_images_dog_park/Untitled/Untitled-20.png',
];
const localImages = shuffleArray(localImagesOriginal);

function getLocalParkImage(park, i) {
    // If photo is missing or is the fallback, use a rotated local image
    if (!park.photo || park.photo.trim() === "" || park.photo.trim() === "images/dogparkdirectory/dopark_content_card.png") {
        return localImages[i % localImages.length];
    }
    // Otherwise, use the provided photo
    return park.photo;
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
    const imgSrc = getLocalParkImage(park, i);
    const imgOnError = `console.error('Broken image: ' + this.src);this.onerror=null;this.src='images/dogparkdirectory/dopark_content_card.png';`;
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
        
        parksGrid.innerHTML = parksToShow.map((park, i) => {
            // Find the absolute index of this park in the filteredParks array
            const absoluteIndex = this.filteredParks.indexOf(park);
            return createParkCard(park, absoluteIndex, this.extractAmenities.bind(this), this.createAmenityIcons.bind(this));
        }).join('');
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