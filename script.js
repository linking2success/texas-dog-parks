// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', performSearch);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            alert('Please enter a city or zip code to search.');
            return;
        }
        
        // Simple search logic - redirect to appropriate city page
        const cityPages = {
            'dallas': 'dallas.html',
            'san antonio': 'san-antonio.html',
            'conroe': 'conroe.html',
            'houston': 'houston.html',
            'austin': 'austin.html',
            'fort worth': 'fort-worth.html',
            'el paso': 'el-paso.html',
            'arlington': 'arlington.html',
            'corpus christi': 'corpus-christi.html',
            'plano': 'plano.html',
            'lubbock': 'lubbock.html',
            'garland': 'garland.html',
            'irving': 'irving.html',
            'amarillo': 'amarillo.html',
            'grand prairie': 'grand-prairie.html'
        };
        
        // Check for exact city matches
        if (cityPages[query]) {
            window.location.href = cityPages[query];
            return;
        }
        
        // Check for partial matches
        for (let city in cityPages) {
            if (city.includes(query) || query.includes(city)) {
                window.location.href = cityPages[city];
                return;
            }
        }
        
        // If no match found, show a message
        alert(`No dog parks found for "${query}". Try searching for a major Texas city like Dallas, San Antonio, or Houston.`);
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Newsletter Subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter');
    
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const subscribeBtn = newsletterForm.querySelector('button');
        
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                
                if (!email) {
                    alert('Please enter your email address.');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Simulate subscription
                subscribeBtn.textContent = 'Subscribed!';
                subscribeBtn.style.background = '#10b981';
                emailInput.value = '';
                
                setTimeout(() => {
                    subscribeBtn.textContent = 'Subscribe';
                    subscribeBtn.style.background = '#2c5aa0';
                }, 3000);
            });
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Featured Listing Button
document.addEventListener('DOMContentLoaded', function() {
    const featuredBtn = document.querySelector('.btn-secondary');
    
    if (featuredBtn) {
        featuredBtn.addEventListener('click', function() {
            // Simulate opening a contact form or modal
            alert('Thank you for your interest! Please contact us at info@texasdogparks.com to list your dog park.');
        });
    }
});

// Rating System (for future implementation)
function initializeRatings() {
    const ratingElements = document.querySelectorAll('.rating');
    
    ratingElements.forEach(rating => {
        const stars = rating.querySelectorAll('i.fas.fa-star, i.far.fa-star');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                // Reset all stars
                stars.forEach(s => {
                    s.classList.remove('fas');
                    s.classList.add('far');
                });
                
                // Fill stars up to clicked position
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.remove('far');
                    stars[i].classList.add('fas');
                }
            });
        });
    });
}

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Analytics Tracking (placeholder for future implementation)
function trackEvent(eventName, eventData) {
    // Placeholder for Google Analytics or other tracking
    console.log('Event tracked:', eventName, eventData);
}

// Search Analytics
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.trim();
            
            if (query) {
                trackEvent('search', {
                    query: query,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }
});

// City Card Click Tracking
document.addEventListener('DOMContentLoaded', function() {
    const cityCards = document.querySelectorAll('.city-card');
    
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            const cityName = this.querySelector('h3').textContent;
            trackEvent('city_card_click', {
                city: cityName,
                timestamp: new Date().toISOString()
            });
        });
    });
});

// Ad Click Tracking (for future implementation)
function trackAdClick(adType, adContent) {
    trackEvent('ad_click', {
        type: adType,
        content: adContent,
        timestamp: new Date().toISOString()
    });
}

// Performance Monitoring
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.now();
    trackEvent('page_load', {
        loadTime: loadTime,
        url: window.location.href
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    trackEvent('error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        timestamp: new Date().toISOString()
    });
});

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeRatings();
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.city-card, .listing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 