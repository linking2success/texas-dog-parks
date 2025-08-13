"use strict";
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Enhanced CSV to JS Converter for Indoor Dog Parks Data
// This script processes the CSV data into structured JavaScript format

// Helper function to parse hours string
function parseHours(hoursString) {
  if (!hoursString || hoursString === '') return {};
  
  try {
    // The hours string is in JSON format, parse it
    const parsed = JSON.parse(hoursString.replace(/'/g, '"'));
    return parsed;
  } catch (e) {
    // If parsing fails, return a simple format
    return { "Monday": hoursString, "Tuesday": hoursString, "Wednesday": hoursString, "Thursday": hoursString, "Friday": hoursString, "Saturday": hoursString, "Sunday": hoursString };
  }
}

// Helper function to generate amenities based on park data
function generateAmenities(park) {
  const amenities = [];
  
  // Check for 24/7 access
  if (park.working_hours && park.working_hours.includes('24 hours')) {
    amenities.push('24/7 Access');
  }
  
  // Check for climate control (all indoor parks have this)
  amenities.push('Climate Controlled');
  
  // Check for specific services based on name
  const name = (park.name || '').toLowerCase();
  const description = (park.description || '').toLowerCase();
  
  if (name.includes('daycare') || description.includes('daycare')) {
    amenities.push('Daycare');
  }
  
  if (name.includes('dogtopia') || name.includes('boarding') || description.includes('boarding')) {
    amenities.push('Boarding');
  }
  
  if (name.includes('grooming') || description.includes('grooming')) {
    amenities.push('Grooming');
  }
  
  if (name.includes('training') || description.includes('training')) {
    amenities.push('Training');
  }
  
  if (name.includes('resort') || name.includes('spa') || description.includes('spa')) {
    amenities.push('Spa Services');
  }
  
  if (name.includes('coworking') || description.includes('coworking')) {
    amenities.push('Coworking Space');
  }
  
  // Default amenities for all indoor parks
  if (amenities.length < 2) {
    amenities.push('Indoor Play', 'Professional Staff');
  }
  
  return amenities;
}

// Columns to extract from CSV
const columns = [
  "name",
  "site", 
  "phone",
  "full_address",
  "city",
  "postal_code",
  "state",
  "latitude",
  "longitude",
  "photo",
  "working_hours",
  "business_status",
  "description",
  "location_link"
];

const inputCsv = path.join(__dirname, "indoor_dog_parks.csv");
const outputJs = path.join(__dirname, "indoor-parks-data-full.js");

const parks = [];

fs.createReadStream(inputCsv)
  .pipe(csv())
  .on("data", (row) => {
    // Process indoor dog parks data with enhanced structure
    const park = {
      id: parks.length + 1,
      name: row.name || 'Indoor Dog Park',
      website: row.site || null,
      phone: row.phone || null,
      address: row.full_address || '',
      city: row.city || '',
      postalCode: row.postal_code || '',
      state: row.state || 'Texas',
      latitude: parseFloat(row.latitude) || 0,
      longitude: parseFloat(row.longitude) || 0,
      photo: row.photo || 'imagesdogpardirectory/Untitled-5-dogpark_hero_section-min.png',
      hours: parseHours(row.working_hours),
      status: row.business_status || 'OPERATIONAL',
      description: row.description || 'Indoor dog park with climate-controlled facilities',
      mapLink: row.location_link || '',
      amenities: generateAmenities({
        name: row.name,
        description: row.description,
        working_hours: row.working_hours
      }),
      category: 'indoor',
      slug: (row.name || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    };
    parks.push(park);
  })
  .on("end", () => {
    // Group parks by metro areas
    const metroAreas = {
      houston: {
        name: 'Houston Metro',
        cities: ['houston', 'spring', 'cypress', 'humble', 'conroe', 'tomball', 'willis', 'the woodlands'],
        parks: []
      },
      austin: {
        name: 'Austin Metro', 
        cities: ['austin', 'buda', 'round rock', 'cedar park'],
        parks: []
      },
      dallas: {
        name: 'Dallas Metro',
        cities: ['dallas', 'plano', 'frisco', 'mckinney', 'allen', 'richardson'],
        parks: []
      },
      fortWorth: {
        name: 'Fort Worth Metro',
        cities: ['fort worth', 'arlington', 'irving', 'grand prairie', 'garland'],
        parks: []
      },
      sanAntonio: {
        name: 'San Antonio Metro',
        cities: ['san antonio', 'new braunfels', 'schertz', 'universal city'],
        parks: []
      },
      other: {
        name: 'Other Texas Cities',
        cities: [],
        parks: []
      }
    };
    
    // Categorize parks by metro area
    parks.forEach(park => {
      const cityLower = park.city.toLowerCase();
      const addressLower = park.address.toLowerCase();
      
      let assigned = false;
      
      // Check each metro area
      Object.keys(metroAreas).forEach(metroKey => {
        if (metroKey !== 'other' && !assigned) {
          const metro = metroAreas[metroKey];
          if (metro.cities.some(city => cityLower.includes(city) || addressLower.includes(city))) {
            metro.parks.push(park);
            assigned = true;
          }
        }
      });
      
      // If not assigned to a metro area, add to other
      if (!assigned) {
        metroAreas.other.parks.push(park);
      }
    });

    // Get unique cities list
    const cities = [...new Set(parks.map(park => park.city))].sort();

    // Generate comprehensive JavaScript file
    const jsContent = `// Auto-generated from indoor_dog_parks.csv
// Complete Indoor Dog Parks Data for Texas

// All indoor dog parks data
const indoorParksData = ${JSON.stringify(parks, null, 2)};

// Parks grouped by metro areas
const indoorParksByMetroArea = ${JSON.stringify(metroAreas, null, 2)};

// All unique cities
const indoorParkCities = ${JSON.stringify(cities, null, 2)};

// Parks by individual city for easy filtering
const indoorParksByCity = {
  houston: indoorParksData.filter(park => 
    park.city.toLowerCase().includes('houston') || 
    park.address.toLowerCase().includes('houston')
  ),
  austin: indoorParksData.filter(park => 
    park.city.toLowerCase().includes('austin') || 
    park.address.toLowerCase().includes('austin')
  ),
  spring: indoorParksData.filter(park => 
    park.city.toLowerCase().includes('spring')
  ),
  cypress: indoorParksData.filter(park => 
    park.city.toLowerCase().includes('cypress')
  ),
  dallas: indoorParksData.filter(park => 
    park.city.toLowerCase().includes('dallas')
  ),
  fortWorth: indoorParksData.filter(park => 
    park.city.toLowerCase().includes('fort worth')
  ),
  sanAntonio: indoorParksData.filter(park => 
    park.city.toLowerCase().includes('san antonio')
  )
};

// Statistics
const indoorParksStats = {
  totalParks: indoorParksData.length,
  totalCities: indoorParkCities.length,
  metroAreas: Object.keys(indoorParksByMetroArea).length,
  operationalParks: indoorParksData.filter(park => park.status === 'OPERATIONAL').length,
  twentyFourSevenParks: indoorParksData.filter(park => 
    park.amenities.includes('24/7 Access')
  ).length
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    indoorParksData, 
    indoorParksByMetroArea, 
    indoorParksByCity, 
    indoorParkCities,
    indoorParksStats
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.indoorParksData = indoorParksData;
  window.indoorParksByMetroArea = indoorParksByMetroArea;
  window.indoorParksByCity = indoorParksByCity;
  window.indoorParkCities = indoorParkCities;
  window.indoorParksStats = indoorParksStats;
}`;

    fs.writeFileSync(outputJs, jsContent, "utf8");
    console.log(`✅ indoor-parks-data-full.js generated with ${parks.length} indoor dog parks.`);
    console.log(`📊 Metro area breakdown:`);
    Object.keys(metroAreas).forEach(metro => {
      console.log(`   ${metroAreas[metro].name}: ${metroAreas[metro].parks.length} parks`);
    });
    console.log(`🏙️  Total cities covered: ${cities.length}`);
  }); 