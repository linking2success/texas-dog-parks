// Generic Indoor Dog Parks JavaScript Template
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
const localImages = shuffleArray(localImagesOriginal);

function getLocalParkImage(park, i) {
  if (park.photo && park.photo.startsWith('http')) return park.photo;
  return localImages[i % localImages.length];
}

// City-specific configurations
const cityConfigs = {
  'austin': {
    metroArea: 'Austin Metro',
    cities: ['austin', 'round rock', 'cedar park', 'leander', 'pflugerville', 'lakeway', 'bee cave', 'dripping springs', 'manor', 'elgin'],
    fallbackDescriptions: [
      "Climate-controlled indoor play area perfect for Austin's hot weather!",
      "Keep Austin weird with air-conditioned indoor dog fun.",
      "A favorite indoor spot for Austin pups.",
      "Where every dog stays cool in the Live Music Capital!",
      "Indoor paradise for playful pups.",
      "Rain or shine, the fun never stops!",
      "Air-conditioned comfort for furry friends.",
      "Austin's premier indoor dog facility.",
      "Cool comfort for dogs year-round.",
      "Indoor fun when it's too hot outside!"
    ]
  },
  'dallas': {
    metroArea: 'Dallas Metro',
    cities: ['dallas', 'plano', 'frisco', 'richardson', 'garland', 'irving', 'carrollton', 'addison', 'allen', 'mckinney', 'mesquite'],
    fallbackDescriptions: [
      "Climate-controlled indoor play area perfect for Dallas's extreme weather!",
      "Beat the Big D heat with air-conditioned indoor dog fun.",
      "A favorite indoor spot for Dallas pups.",
      "Where every dog stays cool in Dallas!",
      "Indoor paradise for playful pups.",
      "Rain or storm, the fun never stops!",
      "Air-conditioned comfort for furry friends.",
      "Dallas's premier indoor dog facility.",
      "Cool comfort for dogs year-round.",
      "Indoor fun when it's too hot outside!"
    ]
  },
  'san-antonio': {
    metroArea: 'San Antonio Metro',
    cities: ['san antonio'],
    fallbackDescriptions: [
      "Climate-controlled indoor play area perfect for San Antonio's hot weather!",
      "Beat the Alamo City heat with air-conditioned indoor dog fun.",
      "A favorite indoor spot for San Antonio pups.",
      "Where every dog stays cool in San Antonio!",
      "Indoor paradise for playful pups.",
      "Rain or shine, the fun never stops!",
      "Air-conditioned comfort for furry friends.",
      "San Antonio's premier indoor dog facility.",
      "Cool comfort for dogs year-round.",
      "Indoor fun when it's too hot outside!"
    ]
  },
  'fort-worth': {
    metroArea: 'Fort Worth Metro',
    cities: ['fort worth'],
    fallbackDescriptions: [
      "Climate-controlled indoor play area perfect for Fort Worth's hot weather!",
      "Beat the Cowtown heat with air-conditioned indoor dog fun.",
      "A favorite indoor spot for Fort Worth pups.",
      "Where every dog stays cool in Fort Worth!",
      "Indoor paradise for playful pups.",
      "Rain or shine, the fun never stops!",
      "Air-conditioned comfort for furry friends.",
      "Fort Worth's premier indoor dog facility.",
      "Cool comfort for dogs year-round.",
      "Indoor fun when it's too hot outside!"
    ]
  }
};

function createIndoorParksManager(cityKey) {
  const config = cityConfigs[cityKey];
  if (!config) {
    console.error(`No configuration found for city: ${cityKey}`);
    return;
  }

  class IndoorParksManager {
    constructor() {
      this.allParks = [];
      this.cityParks = [];
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
        // Filter city parks from the full dataset
        this.allParks = indoorParksData || [];
        this.cityParks = this.allParks.filter(park => {
          const parkCity = park.city.toLowerCase();
          return park.metro_area === config.metroArea || 
                 config.cities.some(city => parkCity.includes(city));
        });
        
        this.filteredParks = [...this.cityParks];
        this.updateResultsCount();
      } catch (error) {
        console.error(`Error loading ${cityKey} parks data:`, error);
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
      this.filteredParks = this.cityParks.filter(park => {
        const searchTerm = this.currentFilters.search.toLowerCase();
        const matchesSearch = !searchTerm || 
          park.name.toLowerCase().includes(searchTerm) ||
          park.city.toLowerCase().includes(searchTerm) ||
          park.address.toLowerCase().includes(searchTerm);

        const matchesArea = !this.currentFilters.area || 
          this.getAreaCategory(park.city, park.address).includes(this.currentFilters.area);
          
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
      this.filteredParks = [...this.cityParks];
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
        description = config.fallbackDescriptions[i % config.fallbackDescriptions.length];
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
    
    getAreaCategory(city, address) {
      const cityLower = city.toLowerCase();
      const addressLower = address ? address.toLowerCase() : '';
      
      // City-specific area categorization
      if (cityKey === 'houston') {
        if (cityLower.includes('katy')) return 'katy';
        if (cityLower.includes('sugar land')) return 'sugarland';
        if (cityLower.includes('woodlands')) return 'woodlands';
        if (cityLower.includes('cypress')) return 'cypress';
        if (cityLower.includes('pearland')) return 'pearland';
        if (cityLower.includes('spring')) return 'northside';
        if (cityLower.includes('west')) return 'westside';
        return 'downtown';
      }
      
      // Generic area detection
      if (addressLower.includes('downtown') || cityLower.includes('downtown')) return 'downtown';
      if (addressLower.includes('north') || cityLower.includes('north')) return 'northside';
      if (addressLower.includes('south') || cityLower.includes('south')) return 'southside';
      if (addressLower.includes('east') || cityLower.includes('east')) return 'eastside';
      if (addressLower.includes('west') || cityLower.includes('west')) return 'westside';
      
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
        paginationHTML += `<button onclick="indoorParksManager.goToPage(${this.currentPage - 1})" class="pagination-btn">« Previous</button>`;
      }
      
      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        if (i === this.currentPage) {
          paginationHTML += `<button class="pagination-btn active">${i}</button>`;
        } else if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
          paginationHTML += `<button onclick="indoorParksManager.goToPage(${i})" class="pagination-btn">${i}</button>`;
        } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
          paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
      }
      
      // Next button
      if (this.currentPage < totalPages) {
        paginationHTML += `<button onclick="indoorParksManager.goToPage(${this.currentPage + 1})" class="pagination-btn">Next »</button>`;
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
        const total = this.cityParks.length;
        const filtered = this.filteredParks.length;
        
        if (filtered === total) {
          resultsElement.textContent = `Showing all ${total} indoor dog parks and facilities`;
        } else {
          resultsElement.textContent = `Showing ${filtered} of ${total} indoor dog parks`;
        }
      }
    }
  }
  
  return new IndoorParksManager();
}

// Global functions
function openInMaps(name, address) {
  const query = encodeURIComponent(`${name} ${address}`);
  window.open(`https://www.google.com/maps/search/${query}`, '_blank');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Determine city from current page URL
  const path = window.location.pathname;
  let cityKey = 'houston'; // default
  
  if (path.includes('austin')) cityKey = 'austin';
  else if (path.includes('dallas')) cityKey = 'dallas';
  else if (path.includes('san-antonio')) cityKey = 'san-antonio';
  else if (path.includes('fort-worth')) cityKey = 'fort-worth';
  
  window.indoorParksManager = createIndoorParksManager(cityKey);
  
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
