// script.js - Complete Interactive Portfolio

console.log("Portfolio loaded successfully");

// Remove loader after page load
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Star Rating System
const stars = document.querySelectorAll('.star-rating i');
const ratingInput = document.getElementById('rating');

if (stars.length > 0 && ratingInput) {
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            ratingInput.value = rating;
            updateStars(rating);
        });

        star.addEventListener('mouseover', () => {
            const rating = star.getAttribute('data-rating');
            updateStars(rating);
        });
    });

    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', () => {
            updateStars(ratingInput.value);
        });
    }
}

function updateStars(rating) {
    stars.forEach(star => {
        const starRating = star.getAttribute('data-rating');
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

// Initialize stars to default rating
if (ratingInput) {
    updateStars(ratingInput.value);
}

// Testimonial Form Handling
const testimonialForm = document.getElementById('testimonialForm');
const testimonialsContainer = document.getElementById('testimonialsContainer');

// Load saved testimonials from localStorage
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || getDefaultTestimonials();
    renderTestimonials(testimonials);
}

function getDefaultTestimonials() {
    return [
        {
            name: 'Dr. Nkosi',
            position: 'Senior Lecturer',
            message: 'Cosby consistently demonstrates strong problem-solving skills and a genuine passion for software development.',
            rating: 5,
            date: '2024-03-15'
        },
        {
            name: 'Thabo M.',
            position: 'Project Partner',
            message: 'Great team player with excellent communication skills. Always delivers quality work on time.',
            rating: 4,
            date: '2024-02-20'
        }
    ];
}

function renderTestimonials(testimonials) {
    if (!testimonialsContainer) return;
    testimonialsContainer.innerHTML = testimonials.map(t => {
        const initials = t.name.split(' ').map(n => n[0]).join('');
        const starsHtml = Array.from({ length: 5 }, (_, i) =>
            '<i class="' + (i < t.rating ? 'fas' : 'far') + ' fa-star"></i>'
        ).join('');

        return '<div class="testimonial">' +
            '<div class="testimonial-header">' +
                '<div class="testimonial-avatar">' + initials + '</div>' +
                '<div class="testimonial-author">' +
                    '<h4>' + t.name + '</h4>' +
                    '<span>' + t.position + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="testimonial-rating">' + starsHtml + '</div>' +
            '<p>"' + t.message + '"</p>' +
            '<div class="testimonial-date">' + new Date(t.date).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }) + '</div>' +
        '</div>';
    }).join('');
}

if (testimonialForm) {
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const position = document.getElementById('position').value.trim();
        const message = document.getElementById('message').value.trim();
        const rating = parseInt(document.getElementById('rating').value, 10);

        if (!name || !position || !message) return;

        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || getDefaultTestimonials();
        testimonials.push({
            name,
            position,
            message,
            rating,
            date: new Date().toISOString().split('T')[0]
        });

        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        renderTestimonials(testimonials);
        testimonialForm.reset();
        ratingInput.value = 5;
        updateStars(5);
    });
}

// Quick Contact Form Handling
const quickContactForm = document.getElementById('quickContactForm');
if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        quickContactForm.reset();
    });
}

// Load testimonials on page load
loadTestimonials();
