// script.js - Complete Interactive Portfolio

console.log("🚀 Portfolio loaded successfully");

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
            behavior
