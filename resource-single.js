// Resource Single Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get resource type from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const resourceType = urlParams.get('type') || 'safety';
    
    // Resource data
    const resourceData = {
        'safety': {
            title: 'Dog Park Safety & Best Practices',
            icon: '🛡️',
            subtitle: 'Essential guidelines to ensure a safe and enjoyable experience for everyone at the dog park.',
            overview: `
                <p>Dog parks can be wonderful places for your furry friend to socialize, exercise, and have fun. However, they also come with their own set of challenges and potential risks. Understanding proper safety protocols and etiquette is crucial for creating a positive environment for all dogs and their owners.</p>
                <p>This comprehensive guide covers everything you need to know about dog park safety, from pre-visit preparation to handling emergencies. Whether you're a first-time visitor or a seasoned dog park regular, these guidelines will help ensure every visit is safe and enjoyable.</p>
            `,
            keyPoints: `
                <ul>
                    <li><strong>Always supervise your dog:</strong> Never leave your dog unattended, even for a moment</li>
                    <li><strong>Know your dog's temperament:</strong> Only bring dogs that are well-socialized and comfortable around other dogs</li>
                    <li><strong>Keep vaccinations current:</strong> Ensure all vaccinations are up to date before visiting</li>
                    <li><strong>Bring essential supplies:</strong> Water, waste bags, leash, and first aid kit</li>
                    <li><strong>Respect other dogs and owners:</strong> Be mindful of personal space and comfort levels</li>
                    <li><strong>Monitor play behavior:</strong> Intervene if play becomes too rough or aggressive</li>
                </ul>
            `,
            tips: `
                <div class="tip-grid">
                    <div class="tip-item">
                        <h4>🕐 Best Times to Visit</h4>
                        <p>Early morning or late afternoon are often the best times, as parks tend to be less crowded and temperatures are more comfortable for dogs.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🎯 Read Body Language</h4>
                        <p>Learn to recognize signs of stress, fear, or aggression in dogs. A tucked tail, raised hackles, or stiff posture may indicate discomfort.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🚨 Emergency Preparedness</h4>
                        <p>Always have your vet's phone number and the nearest emergency animal hospital contact information readily available.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🧹 Clean Up</h4>
                        <p>Always pick up after your dog immediately. Carry extra waste bags and dispose of them properly.</p>
                    </div>
                </div>
            `,
            mistakes: `
                <ul>
                    <li><strong>Bringing aggressive dogs:</strong> Dogs with a history of aggression should not visit dog parks</li>
                    <li><strong>Ignoring warning signs:</strong> Failing to recognize when your dog is stressed or uncomfortable</li>
                    <li><strong>Bringing puppies too young:</strong> Puppies under 4 months may not have all necessary vaccinations</li>
                    <li><strong>Using retractable leashes:</strong> These can be dangerous in crowded areas</li>
                    <li><strong>Bringing toys or treats:</strong> These can cause resource guarding and conflicts</li>
                    <li><strong>Not having an exit strategy:</strong> Always know how to quickly remove your dog if needed</li>
                </ul>
            `,
            links: `
                <div class="resource-links-grid">
                    <a href="https://www.aspca.org/pet-care/dog-care/dog-park-safety" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>ASPCA Dog Park Safety Guide</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.akc.org/expert-advice/lifestyle/dog-park-etiquette/" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AKC Dog Park Etiquette</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.avma.org/resources/pet-owners/petcare/dog-park-safety" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AVMA Dog Park Safety Tips</span>
                        <span class="link-arrow">→</span>
                    </a>
                </div>
            `,
            related: ['training', 'health', 'socialization']
        },
        'training': {
            title: 'Training & Behavior',
            icon: '🎓',
            subtitle: 'Learn how to prepare your dog for the dog park and handle common behavioral challenges.',
            overview: `
                <p>Proper training is the foundation for successful dog park visits. A well-trained dog is not only safer but also more enjoyable to be around. This guide covers essential training techniques and behavioral management strategies that will help your dog become a model citizen at the dog park.</p>
                <p>From basic obedience commands to advanced socialization skills, we'll explore the training methods that professional dog trainers use to prepare dogs for social environments. Remember, training is an ongoing process that requires patience, consistency, and positive reinforcement.</p>
            `,
            keyPoints: `
                <ul>
                    <li><strong>Master basic commands:</strong> Come, sit, stay, and leave it are essential</li>
                    <li><strong>Practice recall in distractions:</strong> Your dog should respond even when excited</li>
                    <li><strong>Socialize gradually:</strong> Start with one-on-one playdates before dog parks</li>
                    <li><strong>Use positive reinforcement:</strong> Reward good behavior with treats and praise</li>
                    <li><strong>Address problem behaviors:</strong> Work on issues before visiting dog parks</li>
                    <li><strong>Maintain consistency:</strong> Use the same commands and rewards at home and park</li>
                </ul>
            `,
            tips: `
                <div class="tip-grid">
                    <div class="tip-item">
                        <h4>🎯 Start Small</h4>
                        <p>Begin training in quiet environments and gradually increase distractions. Don't rush to the dog park until your dog is ready.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🏆 Use High-Value Rewards</h4>
                        <p>In distracting environments, use treats your dog loves most. This increases the likelihood of desired behavior.</p>
                    </div>
                    <div class="tip-item">
                        <h4>⏰ Keep Sessions Short</h4>
                        <p>Short, frequent training sessions are more effective than long, infrequent ones. Aim for 5-10 minutes several times daily.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🔄 Practice Everywhere</h4>
                        <p>Train in different environments to help your dog generalize commands. Practice in your yard, on walks, and in pet stores.</p>
                    </div>
                </div>
            `,
            mistakes: `
                <ul>
                    <li><strong>Punishing fear:</strong> Never punish a dog for being afraid or anxious</li>
                    <li><strong>Inconsistent commands:</strong> Using different words for the same command</li>
                    <li><strong>Expecting too much too soon:</strong> Rushing the training process</li>
                    <li><strong>Ignoring warning signs:</strong> Not recognizing when your dog is overwhelmed</li>
                    <li><strong>Using outdated methods:</strong> Avoid harsh corrections or dominance-based training</li>
                    <li><strong>Not practicing regularly:</strong> Training requires ongoing reinforcement</li>
                </ul>
            `,
            links: `
                <div class="resource-links-grid">
                    <a href="https://www.akc.org/expert-advice/training/preparing-your-dog-for-the-dog-park/" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AKC Dog Park Training Guide</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.aspca.org/pet-care/dog-care/common-dog-behavior-issues" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>ASPCA Behavior Resources</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.cesarsway.com/dog-behavior/socialization/dog-park-training/" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>Cesar's Way Dog Park Training</span>
                        <span class="link-arrow">→</span>
                    </a>
                </div>
            `,
            related: ['safety', 'socialization', 'exercise']
        },
        'health': {
            title: 'Health & Wellness',
            icon: '🏥',
            subtitle: 'Keep your dog healthy and safe with vaccination info, parasite prevention, and wellness tips.',
            overview: `
                <p>Your dog's health is paramount when visiting dog parks. These social environments can expose your pet to various health risks, from parasites to infectious diseases. This guide provides comprehensive information about maintaining your dog's health and preventing common issues that can arise from dog park visits.</p>
                <p>We'll cover everything from vaccination schedules to parasite prevention, seasonal health considerations, and emergency preparedness. Remember, a healthy dog is a happy dog, and proper health management ensures your pet can enjoy many years of safe dog park adventures.</p>
            `,
            keyPoints: `
                <ul>
                    <li><strong>Keep vaccinations current:</strong> Core vaccines plus any required by your area</li>
                    <li><strong>Use parasite prevention:</strong> Flea, tick, and heartworm prevention year-round</li>
                    <li><strong>Monitor for signs of illness:</strong> Know what symptoms to watch for</li>
                    <li><strong>Maintain regular vet visits:</strong> Annual check-ups are essential</li>
                    <li><strong>Practice good hygiene:</strong> Clean paws and coat after visits</li>
                    <li><strong>Have emergency contacts:</strong> Vet and emergency clinic numbers handy</li>
                </ul>
            `,
            tips: `
                <div class="tip-grid">
                    <div class="tip-item">
                        <h4>💉 Vaccination Schedule</h4>
                        <p>Keep a vaccination record and ensure all shots are current. Some parks require proof of vaccination.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🐛 Parasite Prevention</h4>
                        <p>Use veterinarian-recommended flea, tick, and heartworm prevention. Check your dog after each visit.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🌡️ Weather Considerations</h4>
                        <p>Adjust visit times based on weather. Avoid extreme heat or cold, and ensure adequate hydration.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🧼 Post-Visit Care</h4>
                        <p>Clean your dog's paws and check for ticks after each visit. Bathe regularly to remove dirt and allergens.</p>
                    </div>
                </div>
            `,
            mistakes: `
                <ul>
                    <li><strong>Skipping vaccinations:</strong> Putting your dog and others at risk</li>
                    <li><strong>Ignoring parasite prevention:</strong> Fleas and ticks can spread quickly</li>
                    <li><strong>Bringing sick dogs:</strong> Even minor illnesses can spread</li>
                    <li><strong>Not monitoring water intake:</strong> Dehydration can occur quickly</li>
                    <li><strong>Ignoring seasonal risks:</strong> Different seasons bring different health challenges</li>
                    <li><strong>Not having vet contacts:</strong> Emergency situations require quick action</li>
                </ul>
            `,
            links: `
                <div class="resource-links-grid">
                    <a href="https://www.cdc.gov/healthypets/pets/dogs.html" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>CDC Dog Health Guidelines</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.avma.org/resources/pet-owners/petcare/vaccinations" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AVMA Vaccination Information</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.aspca.org/pet-care/dog-care/dog-care-general" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>ASPCA General Dog Care</span>
                        <span class="link-arrow">→</span>
                    </a>
                </div>
            `,
            related: ['safety', 'emergency', 'exercise']
        },
        'exercise': {
            title: 'Exercise & Activities',
            icon: '🏃',
            subtitle: 'Fun activities and exercise ideas to make the most of your dog park visits.',
            overview: `
                <p>Dog parks offer excellent opportunities for physical exercise and mental stimulation. However, not all exercise is created equal, and different dogs have different needs. This guide will help you understand how to provide appropriate exercise for your dog's age, breed, and energy level.</p>
                <p>From structured games to free play, we'll explore various activities that can make your dog park visits more engaging and beneficial. Remember, exercise isn't just about physical health—it's also crucial for mental well-being and behavior management.</p>
            `,
            keyPoints: `
                <ul>
                    <li><strong>Match exercise to your dog:</strong> Consider age, breed, and energy level</li>
                    <li><strong>Include mental stimulation:</strong> Training games and puzzle activities</li>
                    <li><strong>Monitor intensity:</strong> Watch for signs of fatigue or overexertion</li>
                    <li><strong>Vary activities:</strong> Mix different types of exercise and games</li>
                    <li><strong>Consider weather conditions:</strong> Adjust activities for heat, cold, or rain</li>
                    <li><strong>Include rest periods:</strong> Allow time for recovery and hydration</li>
                </ul>
            `,
            tips: `
                <div class="tip-grid">
                    <div class="tip-item">
                        <h4>🎾 Interactive Games</h4>
                        <p>Bring toys for fetch, tug-of-war, or hide-and-seek. These games provide both physical and mental exercise.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🏃‍♂️ Structured Play</h4>
                        <p>Set up obstacle courses or agility exercises using natural features or portable equipment.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🧠 Mental Exercise</h4>
                        <p>Practice training commands during play. This keeps your dog's mind engaged while exercising.</p>
                    </div>
                    <div class="tip-item">
                        <h4>👥 Social Exercise</h4>
                        <p>Encourage play with other dogs. Social interaction is excellent exercise and builds confidence.</p>
                    </div>
                </div>
            `,
            mistakes: `
                <ul>
                    <li><strong>Over-exercising puppies:</strong> Young dogs need controlled exercise</li>
                    <li><strong>Ignoring breed needs:</strong> Different breeds have different exercise requirements</li>
                    <li><strong>Not monitoring fatigue:</strong> Over-exertion can lead to injury</li>
                    <li><strong>Focusing only on physical:</strong> Mental exercise is equally important</li>
                    <li><strong>Ignoring weather:</strong> Extreme conditions require exercise modifications</li>
                    <li><strong>Not providing variety:</strong> Dogs can become bored with repetitive activities</li>
                </ul>
            `,
            links: `
                <div class="resource-links-grid">
                    <a href="https://www.akc.org/expert-advice/health/exercise-ideas-for-dogs/" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AKC Exercise Ideas</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.aspca.org/pet-care/dog-care/dog-exercise" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>ASPCA Dog Exercise Guide</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.petmd.com/dog/wellness/evr_dg_dog_exercise_guide" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>PetMD Exercise Guide</span>
                        <span class="link-arrow">→</span>
                    </a>
                </div>
            `,
            related: ['training', 'socialization', 'health']
        },
        'socialization': {
            title: 'Socialization Tips',
            icon: '🤝',
            subtitle: 'Help your dog develop positive social skills and build confidence around other dogs.',
            overview: `
                <p>Proper socialization is crucial for a well-adjusted dog. Dog parks can be excellent environments for socialization, but they can also be overwhelming for dogs who aren't properly prepared. This guide will help you understand how to safely and effectively socialize your dog in group settings.</p>
                <p>We'll cover everything from reading dog body language to managing social interactions and building confidence. Remember, socialization is a lifelong process that should be approached with patience and positive reinforcement.</p>
            `,
            keyPoints: `
                <ul>
                    <li><strong>Start early and go slow:</strong> Gradual exposure builds confidence</li>
                    <li><strong>Read body language:</strong> Understand both your dog's and other dogs' signals</li>
                    <li><strong>Provide positive experiences:</strong> Reward calm, friendly behavior</li>
                    <li><strong>Respect individual differences:</strong> Not all dogs need to be social butterflies</li>
                    <li><strong>Monitor interactions:</strong> Be ready to intervene if needed</li>
                    <li><strong>Build confidence gradually:</strong> Start with one-on-one playdates</li>
                </ul>
            `,
            tips: `
                <div class="tip-grid">
                    <div class="tip-item">
                        <h4>👶 Start Young</h4>
                        <p>Begin socialization as early as possible, ideally between 3-16 weeks of age. This is the critical socialization period.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🎯 Positive Associations</h4>
                        <p>Pair social interactions with treats and praise. This helps dogs associate other dogs with positive experiences.</p>
                    </div>
                    <div class="tip-item">
                        <h4>👀 Watch for Signals</h4>
                        <p>Learn to recognize signs of stress, fear, or aggression. Intervene before situations escalate.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🏠 Practice at Home</h4>
                        <p>Invite friends with well-behaved dogs to your home for controlled socialization sessions.</p>
                    </div>
                </div>
            `,
            mistakes: `
                <ul>
                    <li><strong>Forcing interactions:</strong> Never force a dog to interact if they're uncomfortable</li>
                    <li><strong>Ignoring warning signs:</strong> Missing signals of stress or fear</li>
                    <li><strong>Starting too late:</strong> Socialization is most effective when started early</li>
                    <li><strong>Not supervising:</strong> Always monitor social interactions</li>
                    <li><strong>Punishing fear:</strong> This can make socialization problems worse</li>
                    <li><strong>Expecting too much:</strong> Some dogs are naturally more reserved</li>
                </ul>
            `,
            links: `
                <div class="resource-links-grid">
                    <a href="https://www.akc.org/expert-advice/training/socialization/" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AKC Socialization Guide</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.aspca.org/pet-care/dog-care/dog-socialization" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>ASPCA Socialization Tips</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.avma.org/resources/pet-owners/petcare/socialization" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AVMA Socialization Resources</span>
                        <span class="link-arrow">→</span>
                    </a>
                </div>
            `,
            related: ['training', 'safety', 'exercise']
        },
        'emergency': {
            title: 'Emergency Preparedness',
            icon: '🚨',
            subtitle: 'Be prepared for emergencies with first aid knowledge and emergency contact information.',
            overview: `
                <p>Emergencies can happen anywhere, including dog parks. Being prepared can mean the difference between a minor incident and a serious situation. This guide provides essential information about emergency preparedness, first aid basics, and how to respond to common dog park emergencies.</p>
                <p>We'll cover everything from building a first aid kit to recognizing emergency signs and knowing when to seek professional help. Remember, prevention is the best medicine, but preparation is crucial when prevention isn't enough.</p>
            `,
            keyPoints: `
                <ul>
                    <li><strong>Carry a first aid kit:</strong> Include essential supplies for minor injuries</li>
                    <li><strong>Know emergency contacts:</strong> Vet, emergency clinic, and poison control numbers</li>
                    <li><strong>Learn basic first aid:</strong> Know how to handle common injuries</li>
                    <li><strong>Recognize emergency signs:</strong> Know when to seek immediate help</li>
                    <li><strong>Stay calm:</strong> Your dog will pick up on your emotions</li>
                    <li><strong>Document incidents:</strong> Keep records of any injuries or incidents</li>
                </ul>
            `,
            tips: `
                <div class="tip-grid">
                    <div class="tip-item">
                        <h4>🩹 First Aid Kit Essentials</h4>
                        <p>Include gauze, antiseptic, tweezers, scissors, and a muzzle. Know how to use each item safely.</p>
                    </div>
                    <div class="tip-item">
                        <h4>📞 Emergency Contacts</h4>
                        <p>Program your vet's number, nearest emergency clinic, and pet poison control into your phone.</p>
                    </div>
                    <div class="tip-item">
                        <h4>🚨 Know the Signs</h4>
                        <p>Learn to recognize signs of heatstroke, poisoning, and other emergencies that require immediate attention.</p>
                    </div>
                    <div class="tip-item">
                        <h4>📱 Stay Connected</h4>
                        <p>Keep your phone charged and have a backup plan for contacting help if needed.</p>
                    </div>
                </div>
            `,
            mistakes: `
                <ul>
                    <li><strong>Not having emergency contacts:</strong> Wasting time searching for numbers</li>
                    <li><strong>Ignoring warning signs:</strong> Delaying treatment for serious conditions</li>
                    <li><strong>Not carrying first aid supplies:</strong> Being unprepared for minor injuries</li>
                    <li><strong>Panicking:</strong> Stress can make situations worse</li>
                    <li><strong>Attempting advanced procedures:</strong> Leave complex treatments to professionals</li>
                    <li><strong>Not documenting incidents:</strong> Important for insurance and future prevention</li>
                </ul>
            `,
            links: `
                <div class="resource-links-grid">
                    <a href="https://www.avma.org/resources/pet-owners/emergencycare" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>AVMA Emergency Care Guide</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.aspca.org/pet-care/animal-poison-control" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>ASPCA Poison Control</span>
                        <span class="link-arrow">→</span>
                    </a>
                    <a href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/pet-safety.html" target="_blank" rel="noopener noreferrer" class="resource-link">
                        <span>Red Cross Pet Safety</span>
                        <span class="link-arrow">→</span>
                    </a>
                </div>
            `,
            related: ['safety', 'health', 'training']
        }
    };

    // Load resource content
    function loadResource() {
        const resource = resourceData[resourceType];
        if (!resource) {
            // Handle invalid resource type
            window.location.href = 'resources.html';
            return;
        }

        // Update page content
        document.title = `${resource.title} - Texas Dog Park Directory`;
        document.getElementById('resource-title').textContent = resource.title;
        document.getElementById('resource-icon').textContent = resource.icon;
        document.getElementById('resource-hero-title').textContent = `Explore: ${resource.title}`;
        document.getElementById('resource-hero-subtitle').textContent = 'Your trusted guide for happy, safe, and fun dog park adventures in Texas.';
        
        document.getElementById('resource-overview').innerHTML = resource.overview;
        document.getElementById('resource-key-points').innerHTML = resource.keyPoints;
        document.getElementById('resource-tips').innerHTML = resource.tips;
        document.getElementById('resource-mistakes').innerHTML = resource.mistakes;
        document.getElementById('resource-links').innerHTML = resource.links;

        // Load related resources
        loadRelatedResources(resource.related);
    }

    // Load related resources
    function loadRelatedResources(relatedTypes) {
        const relatedContainer = document.getElementById('related-resources');
        let relatedHTML = '';
        
        relatedTypes.forEach(type => {
            const resource = resourceData[type];
            if (resource) {
                relatedHTML += `
                    <a href="resource-single.html?type=${type}" class="related-resource-link">
                        <span class="related-icon">${resource.icon}</span>
                        <span class="related-title">${resource.title}</span>
                    </a>
                `;
            }
        });
        
        relatedContainer.innerHTML = relatedHTML;
    }

    // Initialize page
    loadResource();

    // Share functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = window.location.href;
            const title = document.getElementById('resource-hero-title').textContent;
            
            if (this.classList.contains('share-facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
            } else if (this.classList.contains('share-twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
            } else if (this.classList.contains('share-email')) {
                window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this resource: ${url}`)}`);
            }
        });
    });

    // Smooth scrolling for quick navigation
    document.querySelectorAll('.quick-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(`resource-${targetId}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}); 