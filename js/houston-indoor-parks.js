// Houston Indoor Dog Parks JavaScript
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
    '../images/dogparkdirectory/Untitled-3-dopark_content_card-min.png',
    '../images/dogparkdirectory/Untitled-6-dopark_content_card-min.png',
    '../images/dogparkdirectory/Untitled-7-min.png',
    '../images/dogparkdirectory/Untitled-8-dopark_content_card-min.png',
    '../images/dogparkdirectory/Untitled-9-dopark_content_card-min.png',
    '../images/dogparkdirectory/Untitled-10-min.png',
    '../images/dogparkdirectory/Untitled-11-dopark_content_card-min.png',
    '../images/dogparkdirectory/Untitled-16-dopark_content_card-min.png',
    '../images/dogparkdirectory/Untitled-17-dogpark_content_card-min.png',
    '../images/dogparkdirectory/Untitled-18-dopark_content_card-min.png',
    '../images/dogparkdirectory/dopark_content_card.png'
];
const localImages = shuffleArray(localImagesOriginal);

function getLocalParkImage(park, i) {
  if (park.photo && park.photo.startsWith('http')) return park.photo;
  return localImages[i % localImages.length];
}

const fallbackDescriptions = [
  "Climate-controlled indoor play area perfect for Houston's hot weather!",
  "Beat the heat with air-conditioned indoor dog fun.",
  "A favorite indoor spot for Houston pups.",
  "Where every dog stays cool in Houston!",
  "Indoor paradise for playful pups.",
  "Rain or shine, the fun never stops!",
  "Air-conditioned comfort for furry friends.",
  "Houston's premier indoor dog facility.",
  "Cool comfort for dogs year-round.",
  "Indoor fun when it's too hot outside!"
];

class HoustonIndoorParksManager {
    constructor() {
        this.allParks = [];
        this.houstonParks = [];
        this.filteredParks = [];
        this.currentPage = 1;
        this.parksPerPage = 12;
        this.currentFilters = {
            search: '',
            area: '',
            type: ''
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
            // Filter Houston parks from the full dataset
            this.allParks = indoorParksData || [];
            this.houstonParks = this.allParks.filter(park => 
                park.metro_area === 'Houston Metro' || 
                park.city.toLowerCase().includes('houston') ||
                park.city.toLowerCase().includes('katy') ||
                park.city.toLowerCase().includes('sugar land') ||
                park.city.toLowerCase().includes('woodlands') ||
                park.city.toLowerCase().includes('cypress') ||
                park.city.toLowerCase().includes('pearland') ||
                park.city.toLowerCase().includes('spring') ||
                park.city.toLowerCase().includes('tomball') ||
                park.city.toLowerCase().includes('humble')
            );
            
            this.filteredParks = [...this.houstonParks];
            this.updateResultsCount();
        } catch (error) {
            console.error('Error loading Houston parks data:', error);
        }
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('park-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            });
        }

        // Filter functionality
        const areaFilter = document.getElementById('area-filter');
        const typeFilter = document.getElementById('type-filter');
        
        if (areaFilter) {
            areaFilter.addEventListener('change', (e) => {
                this.currentFilters.area = e.target.value;
                this.applyFilters();
            });
        }
        
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
                this.applyFilters();
            });
        }

        // Search button
        const searchBtn = document.querySelector('.search-box button');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }

        // Global search and clear functions
        window.searchParks = () => this.applyFilters();
        window.clearFilters = () => this.clearAllFilters();
    }
    
    applyFilters() {
        this.currentPage = 1;
        this.filteredParks = this.houstonParks.filter(park => {
            const searchTerm = this.currentFilters.search.toLowerCase();
            const matchesSearch = !searchTerm || 
                park.name.toLowerCase().includes(searchTerm) ||
                park.city.toLowerCase().includes(searchTerm) ||
                park.address.toLowerCase().includes(searchTerm);

            const matchesArea = !this.currentFilters.area || 
                this.getAreaCategory(park.city).includes(this.currentFilters.area);
                
            const matchesType = !this.currentFilters.type || 
                this.categorizeBusinessType(park.name).toLowerCase().includes(this.currentFilters.type);

            return matchesSearch && matchesArea && matchesType;
        });

        this.updateResultsCount();
        this.displayParks();
    }
    
    clearAllFilters() {
        document.getElementById('park-search').value = '';
        document.getElementById('area-filter').value = '';
        document.getElementById('type-filter').value = '';
        
        this.currentFilters = { search: '', area: '', type: '' };
        this.filteredParks = [...this.houstonParks];
        this.currentPage = 1;
        this.updateResultsCount();
        this.displayParks();
    }
    
    displayParks() {
        const startIndex = (this.currentPage - 1) * this.parksPerPage;
        const endIndex = startIndex + this.parksPerPage;
        const parksToShow = this.filteredParks.slice(startIndex, endIndex);
        
        const grid = document.getElementById('parks-grid');
        const noResults = document.getElementById('no-results');
        
        if (parksToShow.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        
        grid.innerHTML = parksToShow.map((park, i) => this.createParkCard(park, startIndex + i)).join('');
        this.setupPagination();
    }
    
    createParkCard(park, i) {
        const imageUrl = getLocalParkImage(park, i);
        const amenities = this.extractAmenities(park);
        const amenityIcons = this.createAmenityIcons(amenities.length ? amenities : ['Indoor Play', 'Climate Control']);
        
        let description = '';
        if (park.description && !/great place for dogs to play and socialize/i.test(park.description)) {
            description = park.description.substring(0, 120) + (park.description.length > 120 ? '...' : '');
        } else if (park.city) {
            description = `Climate-controlled indoor facility in ${park.city}!`;
        } else {
            description = fallbackDescriptions[i % fallbackDescriptions.length];
        }
        
        const rating = park.rating ? parseFloat(park.rating) : 0;
        const reviewCount = park.user_ratings_total || 0;
        
        return `
            <div class="park-card">
                <div class="park-image">
                    <img src="${imageUrl}" alt="${park.name}" loading="lazy">
                </div>
                <div class="park-content">
                    <h3>${park.name}</h3>
                    <div class="park-location">
                        <span>📍</span>
                        <span>${park.city}, TX</span>
                    </div>
                    ${rating > 0 ? `
                        <div class="park-rating">
                            <span>⭐</span>
                            <span>${rating.toFixed(1)} (${reviewCount} reviews)</span>
                        </div>
                    ` : ''}
                    <p class="park-description">${description}</p>
                    ${amenityIcons ? `<div class="park-amenities-icons">${amenityIcons}</div>` : ''}
                    <div class="park-actions">
                        ${park.website ? `
                            <a href="${park.website}" target="_blank" class="park-link">Visit Website</a>
                        ` : ''}
                        <button onclick="openInMaps('${park.name}', '${park.address}, ${park.city}')" class="park-link secondary">
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    extractAmenities(park) {
        const amenities = [];
        
        // Add indoor-specific amenities
        amenities.push('Indoor Play');
        amenities.push('Climate Control');
        
        // Check business name for specific amenities
        const name = park.name.toLowerCase();
        if (name.includes('daycare')) amenities.push('Daycare');
        if (name.includes('training')) amenities.push('Training');
        if (name.includes('boarding')) amenities.push('Boarding');
        if (name.includes('grooming')) amenities.push('Grooming');
        if (name.includes('play')) amenities.push('Play Area');
        if (name.includes('exercise')) amenities.push('Exercise');
        
        return amenities.slice(0, 3); // Limit to 3 amenities
    }
    
    createAmenityIcons(amenities) {
        const iconMap = {
            'indoor play': '🏠',
            'climate control': '❄️',
            'daycare': '🐕‍🦺',
            'training': '🎓',
            'boarding': '🏨',
            'grooming': '✂️',
            'play area': '🎾',
            'exercise': '🏃‍♂️',
            'water': '💧',
            'parking': '🚗',
            'wifi': '📶',
            'food': '🍽️',
            'socialization': '🐾',
            'agility': '🎯',
            'supervision': '👀',
            'safe': '🛡️',
            'clean': '✨'
        };
        
        return amenities.map(amenity => {
            const key = amenity.toLowerCase();
            const icon = iconMap[key] || '🐾';
            return `<div class="amenity-icon" title="${amenity}"><span>${icon}</span><span>${amenity}</span></div>`;
        }).join('');
    }
    
    getAreaCategory(city) {
        const cityLower = city.toLowerCase();
        
        if (cityLower.includes('downtown') || cityLower === 'houston') {
            return 'downtown';
        } else if (cityLower.includes('katy')) {
            return 'katy';
        } else if (cityLower.includes('sugar land')) {
            return 'sugarland';
        } else if (cityLower.includes('woodlands')) {
            return 'woodlands';
        } else if (cityLower.includes('cypress')) {
            return 'cypress';
        } else if (cityLower.includes('pearland')) {
            return 'pearland';
        } else if (cityLower.includes('spring')) {
            return 'northside';
        } else if (cityLower.includes('west')) {
            return 'westside';
        }
        
        return 'other';
    }
    
    categorizeBusinessType(name) {
        const nameLower = name.toLowerCase();
        
        if (nameLower.includes('daycare') || nameLower.includes('day care')) {
            return 'daycare';
        } else if (nameLower.includes('training') || nameLower.includes('obedience')) {
            return 'training';
        } else if (nameLower.includes('boarding') || nameLower.includes('kennel')) {
            return 'boarding';
        } else if (nameLower.includes('play') || nameLower.includes('park') || nameLower.includes('recreation')) {
            return 'play-center';
        }
        
        return 'other';
    }
    
    setupPagination() {
        const totalPages = Math.ceil(this.filteredParks.length / this.parksPerPage);
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button onclick="houstonParksManager.goToPage(${this.currentPage - 1})" class="pagination-btn">« Previous</button>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="pagination-btn active">${i}</button>`;
            } else if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `<button onclick="houstonParksManager.goToPage(${i})" class="pagination-btn">${i}</button>`;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }
        
        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button onclick="houstonParksManager.goToPage(${this.currentPage + 1})" class="pagination-btn">Next »</button>`;
        }
        
        pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.displayParks();
        
        // Scroll to top of parks section
        document.querySelector('.parks-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    updateResultsCount() {
        const resultsElement = document.getElementById('results-count');
        if (resultsElement) {
            const total = this.houstonParks.length;
            const filtered = this.filteredParks.length;
            
            if (filtered === total) {
                resultsElement.textContent = `Showing all ${total} indoor dog parks and facilities`;
            } else {
                resultsElement.textContent = `Showing ${filtered} of ${total} indoor dog parks`;
            }
        }
    }
}

// Global functions
function openInMaps(name, address) {
    const query = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.houstonParksManager = new HoustonIndoorParksManager();
    
    // Dropdown functionality
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
        const dropdownContent = dropdown.querySelector('.nav-dropdown-content');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownContent.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownContent.style.display = 'none';
        });
    }
});
