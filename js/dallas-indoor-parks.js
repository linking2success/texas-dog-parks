// Dallas Indoor Dog Parks JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter Dallas parks from the full dataset
    const dallasParks = indoorParksData.filter(park => 
        park.metro_area === 'Dallas Metro' || 
        park.city.toLowerCase().includes('dallas') ||
        park.city.toLowerCase().includes('plano') ||
        park.city.toLowerCase().includes('frisco') ||
        park.city.toLowerCase().includes('richardson') ||
        park.city.toLowerCase().includes('garland') ||
        park.city.toLowerCase().includes('irving') ||
        park.city.toLowerCase().includes('carrollton') ||
        park.city.toLowerCase().includes('addison') ||
        park.city.toLowerCase().includes('allen') ||
        park.city.toLowerCase().includes('mckinney') ||
        park.city.toLowerCase().includes('mesquite')
    );

    let filteredParks = [...dallasParks];

    // Initialize the page
    displayParks(filteredParks);
    updateResultsCount(filteredParks.length);

    // Search functionality
    window.searchParks = function() {
        const searchTerm = document.getElementById('park-search').value.toLowerCase();
        const areaFilter = document.getElementById('area-filter').value;
        const typeFilter = document.getElementById('type-filter').value;

        filteredParks = dallasParks.filter(park => {
            const matchesSearch = !searchTerm || 
                park.name.toLowerCase().includes(searchTerm) ||
                park.city.toLowerCase().includes(searchTerm) ||
                park.address.toLowerCase().includes(searchTerm);

            const matchesArea = !areaFilter || getAreaCategory(park.city).includes(areaFilter);
            const matchesType = !typeFilter || categorizeBusinessType(park.name).includes(typeFilter);

            return matchesSearch && matchesArea && matchesType;
        });

        displayParks(filteredParks);
        updateResultsCount(filteredParks.length);
    };

    // Clear filters
    window.clearFilters = function() {
        document.getElementById('park-search').value = '';
        document.getElementById('area-filter').value = '';
        document.getElementById('type-filter').value = '';
        filteredParks = [...dallasParks];
        displayParks(filteredParks);
        updateResultsCount(filteredParks.length);
    };

    // Add event listeners for real-time filtering
    document.getElementById('park-search').addEventListener('input', searchParks);
    document.getElementById('area-filter').addEventListener('change', searchParks);
    document.getElementById('type-filter').addEventListener('change', searchParks);
});

function displayParks(parks) {
    const grid = document.getElementById('parks-grid');
    const noResults = document.getElementById('no-results');
    
    if (parks.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = parks.map(park => createParkCard(park)).join('');
}

function createParkCard(park) {
    const rating = park.rating ? parseFloat(park.rating) : 0;
    const reviewCount = park.user_ratings_total || 0;
    const hours = formatHours(park.hours);
    const businessType = categorizeBusinessType(park.name);
    const area = getDallasArea(park.city);
    
    return `
        <div class="park-card">
            <div class="park-header">
                <h3 class="park-name">${park.name}</h3>
                <div class="park-badges">
                    <span class="badge badge-type">${businessType}</span>
                    <span class="badge badge-area">${area}</span>
                </div>
            </div>
            
            <div class="park-info">
                <div class="park-location">
                    <span class="icon">📍</span>
                    <span>${park.address}, ${park.city}</span>
                </div>
                
                ${rating > 0 ? `
                <div class="park-rating">
                    <span class="icon">⭐</span>
                    <span>${rating.toFixed(1)} (${reviewCount} reviews)</span>
                </div>
                ` : ''}
                
                ${hours ? `
                <div class="park-hours">
                    <span class="icon">🕒</span>
                    <span>${hours}</span>
                </div>
                ` : ''}
                
                ${park.phone ? `
                <div class="park-phone">
                    <span class="icon">📞</span>
                    <span>${park.phone}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="park-actions">
                ${park.website ? `
                    <a href="${park.website}" target="_blank" class="btn btn-primary">Visit Website</a>
                ` : ''}
                <button onclick="openInMaps('${park.name}', '${park.address}, ${park.city}')" class="btn btn-secondary">
                    Get Directions
                </button>
            </div>
        </div>
    `;
}

function getDallasArea(city) {
    const cityLower = city.toLowerCase();
    
    if (cityLower.includes('plano')) {
        return 'Plano';
    } else if (cityLower.includes('frisco')) {
        return 'Frisco';
    } else if (cityLower.includes('richardson')) {
        return 'Richardson';
    } else if (cityLower.includes('garland')) {
        return 'Garland';
    } else if (cityLower.includes('irving')) {
        return 'Irving';
    } else if (cityLower.includes('carrollton')) {
        return 'Carrollton';
    } else if (cityLower.includes('addison')) {
        return 'Addison';
    } else if (cityLower.includes('allen')) {
        return 'Allen';
    } else if (cityLower.includes('mckinney')) {
        return 'McKinney';
    } else if (cityLower.includes('mesquite')) {
        return 'Mesquite';
    } else if (cityLower === 'dallas') {
        return 'Dallas';
    } else {
        return 'Dallas Metro';
    }
}

function getAreaCategory(city) {
    const area = getDallasArea(city);
    const cityLower = city.toLowerCase();
    
    if (area === 'Dallas') {
        // Determine specific Dallas area
        if (cityLower.includes('north')) return 'northdallas';
        if (cityLower.includes('east')) return 'eastdallas';
        if (cityLower.includes('south')) return 'southdallas';
        if (cityLower.includes('west')) return 'westdallas';
        return 'downtown'; // Default Dallas to downtown
    }
    
    if (area === 'Plano') return 'plano';
    if (area === 'Frisco') return 'frisco';
    if (area === 'Richardson') return 'richardson';
    if (area === 'Garland') return 'garland';
    if (area === 'Irving') return 'irving';
    if (area === 'Carrollton') return 'carrollton';
    if (area === 'Addison') return 'addison';
    
    return 'other';
}

function categorizeBusinessType(name) {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('daycare') || nameLower.includes('day care')) {
        return 'Dog Daycare';
    } else if (nameLower.includes('training') || nameLower.includes('obedience')) {
        return 'Training Facility';
    } else if (nameLower.includes('boarding') || nameLower.includes('kennel')) {
        return 'Boarding Facility';
    } else if (nameLower.includes('play') || nameLower.includes('park') || nameLower.includes('recreation')) {
        return 'Play Center';
    } else if (nameLower.includes('grooming')) {
        return 'Grooming & Play';
    } else {
        return 'Indoor Facility';
    }
}

function formatHours(hoursData) {
    if (!hoursData || !Array.isArray(hoursData) || hoursData.length === 0) {
        return null;
    }
    
    // Get today's hours
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const todayHours = hoursData.find(h => h.day === today);
    
    if (todayHours) {
        if (todayHours.is_closed) {
            return 'Closed today';
        } else {
            return `Open: ${todayHours.open} - ${todayHours.close}`;
        }
    }
    
    return 'Hours vary';
}

function updateResultsCount(count) {
    const resultsElement = document.getElementById('results-count');
    if (count === dallasParks.length) {
        resultsElement.textContent = `Showing all ${count} indoor dog parks and facilities`;
    } else {
        resultsElement.textContent = `Showing ${count} of ${dallasParks.length} indoor dog parks`;
    }
}

function openInMaps(name, address) {
    const query = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
}

// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownContent = dropdown.querySelector('.nav-dropdown-content');
    
    dropdown.addEventListener('mouseenter', function() {
        dropdownContent.style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', function() {
        dropdownContent.style.display = 'none';
    });
});
