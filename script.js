// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initAnimatedCounters();
    initRippleEffects();
    initGlitchTexts();
    initContactForm();
    initMobileMenu();
});

// Scroll Animation with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps approximation
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target.toLocaleString();
                        counterObserver.unobserve(entry.target);
                    } else {
                        entry.target.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Ripple Effect for Buttons
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Position ripple at click location
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Glitch Text Effects
function initGlitchTexts() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Add random glitch effect periodically
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance to glitch
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = '';
                }, 10);
            }
        }, 3000);
    });
}

// Contact Form Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! Our team will contact you soon.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 23, 0.98)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'rgba(10, 14, 23, 0.95)';
        navbar.style.padding = '1rem 0';
    }
});

// Parallax effect for background
document.addEventListener('mousemove', (e) => {
    const gridLines = document.querySelector('.grid-lines');
    if (gridLines) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        gridLines.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    }
});