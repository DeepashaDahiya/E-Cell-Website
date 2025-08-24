

// Fade in on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Load navbar from components folder
fetch('components/nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;

        
            });

            // Smooth scroll
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                });
            });