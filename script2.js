// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        mobileMenu.classList.add('active');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenu.classList.remove('active');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
} 

// WhatsApp Functions
function openWhatsApp(message) {
    const phoneNumber = '330780806038';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

function sendWhatsAppFromForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    if (!name.trim() || !phone.trim() || !message.trim()) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    const whatsappMessage = `Bonjour, je souhaite prendre rendez-vous pour un lavage automobile. Voici mes coordonnées :
            Nom : ${name}
            Téléphone : ${phone}
            Message : ${message}`;
    
    openWhatsApp(whatsappMessage);
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) {
        console.error('Element notification non trouvé');
        return;
    }
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Form Validation Functions
function validatePhoneNumber(phone) {
    // Version plus permissive pour les tests
    const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]*\d{2}){4}$/;
    const cleanedPhone = phone.replace(/\s/g, '');
    return phoneRegex.test(cleanedPhone);
}

function validateForm(name, phone, message) {
    const errors = [];
    
    if (!name.trim()) {
        errors.push('Le nom est requis');
    } else if (name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!phone.trim()) {
        errors.push('Le téléphone est requis');
    } else if (!validatePhoneNumber(phone)) {
        errors.push('Le numéro de téléphone n\'est pas valide (format: 06 12 34 56 78)');
    }
    
    if (!message.trim()) {
        errors.push('Le message est requis');
    } else if (message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    return errors;
}

// Contact Form Submission for SMS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const errors = validateForm(name, phone, message);
            if (errors.length > 0) {
                showNotification(errors[0], 'error');
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Préparation du message...';
            submitButton.disabled = true;

            // Construction du SMS
            const smsNumber = "+33780806038"; 
            const smsMessage = `Bonjour, je souhaite prendre rendez-vous. 
                Nom : ${name}
                Téléphone : ${phone}
                Message : ${message}`;
            const encodedMessage = encodeURIComponent(smsMessage);

            setTimeout(() => {
                showNotification('Ouverture de l’application SMS...', 'success');
                
                // Reset form + bouton
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Ouvre l’app SMS du téléphone
                window.location.href = `sms:${smsNumber}?body=${encodedMessage}`;
            }, 800);
        });
    }
});


// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 64; // 4rem in pixels
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .gallery-item, .testimonial-card, .contact-form-card, .contact-info-card'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Gallery Image Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');
            
            console.log('Gallery image clicked:', { src, alt });
        });
    });
});

// Service Card Hover Effects Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Auto-format phone number input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            // Format as XX XX XX XX XX
            if (value.length >= 10) {
                value = value.substring(0, 10);
                value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
            } else if (value.length >= 8) {
                value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
            } else if (value.length >= 6) {
                value = value.replace(/(\d{2})(\d{2})(\d{2})/, '$1 $2 $3');
            } else if (value.length >= 4) {
                value = value.replace(/(\d{2})(\d{2})/, '$1 $2');
            }
            
            e.target.value = value;
        });
    }
});

// Scroll to top functionality
function addScrollToTop() {
    // Vérifier si le bouton existe déjà
    if (document.querySelector('.scroll-to-top')) {
        return;
    }
    
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Retour en haut');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-button);
    `;
    
    document.body.appendChild(scrollButton);
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Carousel Functionality
let currentSlideIndex = 0;
let carouselInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Hide all slides and remove active class
    slides.forEach((slide, i) => {
        slide.style.display = 'none';
        slide.classList.remove('active');
    });
    
    // Show current slide and add active class
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].style.display = 'block';
        // Petit délai pour l'animation
        setTimeout(() => {
            slides[currentSlideIndex].classList.add('active');
        }, 50);
    }
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.className = i === currentSlideIndex ? 'carousel-dot active' : 'carousel-dot';
    });
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetCarouselAutoplay();
}

function goToSlide(index) {
    showSlide(index);
    resetCarouselAutoplay();
}

function autoplayCarousel() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function startCarouselAutoplay() {
    carouselInterval = setInterval(autoplayCarousel, 4000);
}

function resetCarouselAutoplay() {
    clearInterval(carouselInterval);
    startCarouselAutoplay();
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        showSlide(0);
        startCarouselAutoplay();
        
        // Pause autoplay on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', function() {
                clearInterval(carouselInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', function() {
                startCarouselAutoplay();
            });
        }
        
        // Add accessibility attributes
        const carouselPrev = document.querySelector('.carousel-prev');
        const carouselNext = document.querySelector('.carousel-next');
        
        if (carouselPrev) {
            carouselPrev.setAttribute('aria-label', 'Image précédente');
        }
        if (carouselNext) {
            carouselNext.setAttribute('aria-label', 'Image suivante');
        }
    }
});

// Map Initialization
function initializeMap() {
    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.log('Map container not found');
        return;
    }
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    // Coordonnées GPS de l'adresse
    const lat = 49.3499435726613;
    const lng = 6.146754235582267;
    
    try {
        // Création de la carte dans le div #map
        const map = L.map('map').setView([lat, lng], 16);
        
        // Fond de carte OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Ajout du marqueur
        L.marker([lat, lng]).addTo(map)
            .bindPopup("6 Rue Camille du Gast, 57100 Thionville")
            .openPopup();
            
        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Leaflet to load completely
    setTimeout(initializeMap, 1000);
});

// Error handling for global errors
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

console.log('JavaScript loaded successfully');

// click sur avis doit ramener en haut de la section avis
