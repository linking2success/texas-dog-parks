// Indoor Dog Parks JavaScript Functionality
// Handles park display, filtering, and interactive features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the indoor parks page
  initializeIndoorParks();
});

function initializeIndoorParks() {
  loadFeaturedParks();
  setupLoadMoreButton();
  setupCityNavigation();
  
  // Initialize map placeholder (ready for Google Maps integration)
  setupMapPlaceholder();
}

function loadFeaturedParks() {
  const parksContainer = document.getElementById('indoorParksGrid');
  if (!parksContainer) return;
  
  // Get featured parks from multiple cities
  const featuredParks = getFeaturedParks();
  
  parksContainer.innerHTML = '';
  featuredParks.forEach(park => {
    const parkCard = createParkCard(park);
    parksContainer.appendChild(parkCard);
  });
}

function getFeaturedParks() {
  // Get top parks from each city for featured section
  const allParks = IndoorParksUtils.getAllParks();
  
  // For now, return first 6 parks as featured
  // In production, you might have a "featured" flag in your data
  return allParks.slice(0, 6);
}

function createParkCard(park) {
  const card = document.createElement('div');
  card.className = 'park-card';
  
  // Format amenities with icons
  const amenityTags = park.amenities ? park.amenities.map(amenity => {
    const icon = indoorDogParksData.amenityIcons[amenity] || '🐕';
    return `<span class="amenity-tag">${icon} ${amenity}</span>`;
  }).join('') : '';
  
  // Format hours display
  const todayHours = getTodaysHours(park.hours);
  const isOpenNow = IndoorParksUtils.isOpen(park.hours);
  const statusClass = isOpenNow ? 'open' : 'closed';
  const statusText = isOpenNow ? 'Open Now' : 'Closed';
  
  card.innerHTML = `
    <div class="park-image">
      <img src="${park.photo || 'imagesdogpardirectory/Untitled-16-dopark_content_card-min.png'}" 
           alt="${park.name}" 
           onerror="this.src='imagesdogpardirectory/Untitled-16-dopark_content_card-min.png'">
      <div class="park-status ${statusClass}">${statusText}</div>
    </div>
    <div class="park-content">
      <h3 class="park-title">${park.name}</h3>
      <div class="park-location">
        <span class="location-icon">📍</span>
        <span>${park.city}, TX</span>
      </div>
      <div class="park-description">
        <p>${park.description || 'Indoor dog park with climate-controlled environment.'}</p>
      </div>
      <div class="park-amenities">
        ${amenityTags}
      </div>
      <div class="park-hours">
        <strong>Today:</strong> ${todayHours}
      </div>
      <div class="park-actions">
        <a href="${park.mapLink}" target="_blank" class="btn btn-primary btn-sm">
          🗺️ Directions
        </a>
        ${park.phone ? `<a href="tel:${park.phone}" class="btn btn-secondary btn-sm">📞 Call</a>` : ''}
        ${park.website ? `<a href="${park.website}" target="_blank" class="btn btn-secondary btn-sm">🌐 Website</a>` : ''}
      </div>
    </div>
  `;
  
  return card;
}

function getTodaysHours(hours) {
  if (!hours) return 'Hours not available';
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayHours = hours[today];
  
  if (!todayHours) return 'Hours not available';
  if (todayHours === 'Closed') return 'Closed';
  if (todayHours === 'Open 24 hours') return 'Open 24 hours';
  
  return todayHours;
}

function setupLoadMoreButton() {
  const loadMoreBtn = document.getElementById('loadMoreParks');
  if (!loadMoreBtn) return;
  
  let currentPage = 1;
  const parksPerPage = 6;
  
  loadMoreBtn.addEventListener('click', function() {
    const allParks = IndoorParksUtils.getAllParks();
    const startIndex = currentPage * parksPerPage;
    const endIndex = startIndex + parksPerPage;
    const nextParks = allParks.slice(startIndex, endIndex);
    
    if (nextParks.length === 0) {
      loadMoreBtn.style.display = 'none';
      return;
    }
    
    const parksContainer = document.getElementById('indoorParksGrid');
    nextParks.forEach(park => {
      const parkCard = createParkCard(park);
      parksContainer.appendChild(parkCard);
    });
    
    currentPage++;
    
    // Hide button if no more parks
    if (endIndex >= allParks.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
}

function setupCityNavigation() {
  // Add click tracking for city cards
  const cityCards = document.querySelectorAll('.city-card');
  cityCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Allow normal link navigation
      if (e.target.tagName !== 'A') {
        const link = card.querySelector('a.btn');
        if (link) {
          window.location.href = link.href;
        }
      }
    });
  });
}

function setupMapPlaceholder() {
  const mapContainer = document.getElementById('indoor-parks-map');
  if (!mapContainer) return;
  
  // Placeholder functionality - replace with actual Google Maps implementation
  mapContainer.addEventListener('click', function() {
    // For now, show alert - replace with actual map initialization
    alert('Interactive map feature coming soon! \n\nThis will show all indoor dog park locations with:\n• Clickable markers\n• Park details popup\n• Driving directions\n• Current status');
  });
  
  // Add hover effect
  mapContainer.style.cursor = 'pointer';
  mapContainer.style.transition = 'all 0.3s ease';
  
  mapContainer.addEventListener('mouseenter', function() {
    mapContainer.style.background = '#e8e8e8';
  });
  
  mapContainer.addEventListener('mouseleave', function() {
    mapContainer.style.background = '#f0f0f0';
  });
}

// Utility functions for park filtering and search
const IndoorParksUI = {
  filterByCity: function(city) {
    const parks = IndoorParksUtils.getParksByCity(city);
    const container = document.getElementById('indoorParksGrid');
    if (!container) return;
    
    container.innerHTML = '';
    parks.forEach(park => {
      const card = createParkCard(park);
      container.appendChild(card);
    });
  },
  
  filterByAmenity: function(amenity) {
    const allParks = IndoorParksUtils.getAllParks();
    const filteredParks = allParks.filter(park => 
      park.amenities && park.amenities.includes(amenity)
    );
    
    const container = document.getElementById('indoorParksGrid');
    if (!container) return;
    
    container.innerHTML = '';
    filteredParks.forEach(park => {
      const card = createParkCard(park);
      container.appendChild(card);
    });
  },
  
  searchParks: function(query) {
    const allParks = IndoorParksUtils.getAllParks();
    const searchResults = allParks.filter(park => {
      const searchText = `${park.name} ${park.city} ${park.description || ''} ${(park.amenities || []).join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    
    const container = document.getElementById('indoorParksGrid');
    if (!container) return;
    
    container.innerHTML = '';
    searchResults.forEach(park => {
      const card = createParkCard(park);
      container.appendChild(card);
    });
  }
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.IndoorParksUI = IndoorParksUI;
}
