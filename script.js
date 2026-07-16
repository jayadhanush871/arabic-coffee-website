// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });

    // --- Menu Tabs ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuPanes = document.querySelectorAll('.menu-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            menuPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding pane
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- Star Rating Input ---
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating-value');

    if (stars.length > 0) {
        // Function to update star visuals
        const updateStars = (targetRating) => {
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= targetRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                    s.style.fontWeight = '900'; // Force solid star
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                    s.style.fontWeight = '400'; // Force outline star
                }
            });
        };

        stars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseover', () => {
                const hoverRating = parseInt(star.getAttribute('data-rating'));
                updateStars(hoverRating);
            });

            // Mouseout effect (reset to clicked rating)
            star.addEventListener('mouseout', () => {
                const currentRating = parseInt(ratingInput.value);
                updateStars(currentRating);
            });

            // Click effect
            star.addEventListener('click', () => {
                const clickRating = parseInt(star.getAttribute('data-rating'));
                ratingInput.value = clickRating;
                updateStars(clickRating);
            });
        });
    }

    // --- Form Submission Handler (Formspree) ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Show sending state
            btn.disabled = true;
            btn.textContent = 'Sending...';
            formFeedback.style.display = 'block';
            formFeedback.style.color = '#ffffff';
            formFeedback.textContent = 'Sending your message...';

            fetch('https://formspree.io/f/xnjejlgl', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    btn.textContent = 'Message Sent!';
                    btn.style.backgroundColor = '#4caf50'; // Green
                    btn.style.color = '#fff';
                    
                    formFeedback.style.color = '#4caf50';
                    formFeedback.textContent = 'Thank you! Your feedback has been sent successfully.';
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                        formFeedback.style.display = 'none';
                    }, 3000);
                } else {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    formFeedback.style.color = '#ff6b6b';
                    formFeedback.textContent = 'Oops! There was a problem submitting your form.';
                }
            })
            .catch(error => {
                btn.disabled = false;
                btn.textContent = originalText;
                formFeedback.style.color = '#ff6b6b';
                formFeedback.textContent = 'Oops! Connection error. Please try again.';
            });
        });
    }
});
