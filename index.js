// Dynamically render featured parks on the homepage
(function() {
  if (!window.TEXAS_DOG_PARKS) return;
  const featuredParksGrid = document.getElementById('featuredParksGrid');
  if (!featuredParksGrid) return;

  // Pick the first 6 parks (or randomize if you want variety)
  const featuredParks = window.TEXAS_DOG_PARKS.slice(0, 6);

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
    'Picnic Table': '🧺',
    'Swings': '🪑',
    'Swing': '🪑',
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
    'Rural': '🌄',
    'Dog Park': '🐾',
    'Table': '🧺',
    'BBQ': '🍖',
    'Barbecue': '🍖',
    'Grill': '🍖',
    'Trash': '🗑️',
    'Trash Can': '🗑️',
    'Lighting': '💡',
    'Water Fountain': '🚰',
    'Fountain': '🚰',
    'Rest Area': '🛋️',
    'Restrooms': '🚻',
    'Bathroom': '🚻',
    'Bathrooms': '🚻',
    'Dog Wash': '🛁',
    'Dog Shower': '🛁',
    'Dog Pool': '🏊‍♂️',
    'Dog Run': '🏃',
    'Dog Area': '🐶',
    'Leash Area': '🦮',
    'Off-Leash': '🦴',
    'On-Leash': '🦮',
    'Trail': '🥾',
    'Walking Trail': '🥾',
    'Hiking': '🥾',
    'Gazebo': '🏖️',
    'Shelter': '🏕️',
    'Covered Area': '🏕️',
    'Fire Hydrant': '🚒',
    'Dog Friendly': '🐶',
    'Dog Station': '🦴',
    'Dog Bag': '🦴',
    'Dog Bags': '🦴',
    'Bag Dispenser': '🦴',
    'Waste Bags': '🦴',
    'Waste Station': '🦴',
    'Water Bowl': '🥣',
    'Dog Bowl': '🥣',
    'Picnic': '🧺',
    'Table': '🧺',
    'Bench': '🪑',
    'Shade Structure': '🌳',
    'Sun Shelter': '🏖️',
    'Dog Agility': '🎯',
    'Dog Equipment': '🎪',
    'Dog Playground': '🎠',
    'Dog Fountain': '🚰',
    'Dog Restroom': '🚻',
    'Dog Parking': '🚗',
    'Dog Restaurant': '🍽️',
    'Dog Wi-Fi': '📶',
    'Dog Pool': '🏊‍♂️',
    'Dog Swings': '🪑',
    'Dog Picnic': '🧺',
    'Dog Table': '🧺',
    'Dog Trash': '🗑️',
    'Dog Lighting': '💡',
    'Dog Clean': '✨',
    'Dog Maintained': '🔧',
    'Dog Professional': '👔',
    'Dog Community': '🏘️',
    'Dog Neighborhood': '🏠',
    'Dog Downtown': '🏙️',
    'Dog Riverside': '🌊',
    'Dog Coastal': '🏝️',
    'Dog Urban': '🏢',
    'Dog Suburban': '🏡',
    'Dog Rural': '🌄'
  };

  function extractAmenities(aboutText) {
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
      const about = aboutText.toLowerCase();
      if (about.includes('water') || about.includes('drinking')) amenities.push('Water');
      if (about.includes('shade') || about.includes('trees')) amenities.push('Shade');
      if (about.includes('fence') || about.includes('enclosed')) amenities.push('Fenced');
      if (about.includes('agility') || about.includes('equipment')) amenities.push('Agility');
      if (about.includes('separate') || about.includes('small') || about.includes('large')) amenities.push('Separate Areas');
      if (about.includes('parking')) amenities.push('Parking');
      if (about.includes('bench') || about.includes('seating')) amenities.push('Benches');
    }
    return amenities.slice(0, 3);
  }

  function getLocalParkImage(park) {
  // Use the photo field if available, otherwise fallback to new or old local image
  if (park.photo && park.photo.startsWith('http')) return park.photo;
  const newImages = Array.from({length: 20}, (_, i) => `new_images_dog_park/new_images_dog_park/Untitled-${i+1}.png`);
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
  const hash = park.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
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

  // Fun fallback descriptions
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

  function getDescription(park, i) {
    if (park.description && !/great place for dogs to play and socialize/i.test(park.description)) {
      return park.description.substring(0, 120) + (park.description.length > 120 ? '...' : '');
    }
    // Use city-based or random fallback
    if (park.city) {
      return `A favorite dog park in ${park.city}!`;
    }
    return fallbackDescriptions[i % fallbackDescriptions.length];
  }

  featuredParksGrid.innerHTML = featuredParks.map((park, i) => {
    const amenities = extractAmenities(park.about);
    // New and old image paths
    const hash = park.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
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
    const imgOnError = park.photo && park.photo.startsWith('http')
      ? 'console.error(`Broken image: ${this.src}`);'
      : `console.error('Broken image: ' + this.src);this.onerror=null;this.src='${oldImg}';`;
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
          <p class="park-description">${getDescription(park, i)}</p>
          <div class="park-amenities-icons">
            ${amenities.map(amenity => `
              <div class="amenity-icon" title="${amenity}">
                <span>${iconMap[amenity] || '🐾'}</span>
                <span>${amenity}</span>
              </div>
            `).join('')}
          </div>
          <a href="collection-single.html?slug=${park.slug}" class="park-link">View Details</a>
        </div>
      </div>
    `;
  }).join('');
})(); 