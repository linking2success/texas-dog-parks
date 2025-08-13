// Austin Indoor Dog Parks JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter Austin parks from the full dataset
    const austinParks = indoorParksData.filter(park => 
        park.metro_area === 'Austin Metro' || 
        park.city.toLowerCase().includes('austin') ||
        park.city.toLowerCase().includes('round rock') ||
        park.city.toLowerCase().includes('cedar park') ||
        park.city.toLowerCase().includes('leander') ||
        park.city.toLowerCase().includes('pflugerville') ||
        park.city.toLowerCase().includes('lakeway') ||
        park.city.toLowerCase().includes('bee cave') ||
        park.city.toLowerCase().includes('dripping springs') ||
        park.city.toLowerCase().includes('manor') ||
        park.city.toLowerCase().includes('elgin')
    );

    let filteredParks = [...austinParks];

    // Initialize the page
    displayParks(filteredParks);
    updateResultsCount(filteredParks.length);

    // Search functionality
    window.searchParks = function() {
        const searchTerm = document.getElementById('park-search').value.toLowerCase();
        const areaFilter = document.getElementById('area-filter').value;
        const typeFilter = document.getElementById('type-filter').value;

        filteredParks = austinParks.filter(park => {
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
        filteredParks = [...austinParks];
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
    const area = getAustinArea(park.city);
    
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

function getAustinArea(city) {
    const cityLower = city.toLowerCase();
    
    if (cityLower.includes('downtown') || cityLower === 'austin') {
        // Determine if it's downtown vs other Austin areas based on address patterns
        return 'Austin';
    } else if (cityLower.includes('round rock')) {
        return 'Round Rock';
    } else if (cityLower.includes('cedar park')) {
        return 'Cedar Park';
    } else if (cityLower.includes('leander')) {
        return 'Leander';
    } else if (cityLower.includes('pflugerville')) {
        return 'Pflugerville';
    } else if (cityLower.includes('lakeway')) {
        return 'Lakeway';
    } else if (cityLower.includes('bee cave')) {
        return 'Bee Cave';
    } else if (cityLower.includes('dripping springs')) {
        return 'Dripping Springs';
    } else if (cityLower.includes('manor')) {
        return 'Manor';
    } else if (cityLower.includes('elgin')) {
        return 'Elgin';
    } else {
        return 'Austin Metro';
    }
}

function getAreaCategory(city) {
    const area = getAustinArea(city);
    const cityLower = city.toLowerCase();
    
    if (area === 'Austin') {
        // Determine specific Austin area
        if (cityLower.includes('south')) return 'southaustin';
        if (cityLower.includes('north')) return 'northaustin';
        if (cityLower.includes('east')) return 'eastaustin';
        if (cityLower.includes('west')) return 'westaustin';
        return 'downtown'; // Default Austin to downtown
    }
    
    if (area === 'Round Rock') return 'roundrock';
    if (area === 'Cedar Park') return 'cedar-park';
    if (area === 'Leander') return 'leander';
    if (area === 'Pflugerville') return 'pflugerville';
    if (area === 'Lakeway') return 'lakeway';
    
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
    if (count === austinParks.length) {
        resultsElement.textContent = `Showing all ${count} indoor dog parks and facilities`;
    } else {
        resultsElement.textContent = `Showing ${count} of ${austinParks.length} indoor dog parks`;
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
