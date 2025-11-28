// Get DOM elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-links a');
const navLinksContainer = document.getElementById('navLinks');

// Toggle menu visibility on mobile
menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
});

// Handle active link switching on click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    navLinksContainer.classList.remove('active');
  });
});

// Function to update active link based on scroll position
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Adjust offset for navbar height
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Listen for scroll events to update active link
window.addEventListener('scroll', updateActiveLink);

// Initial call to set active link on page load
updateActiveLink();

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.skills, .projects, .education-section, #About, .container').forEach(section => {
  observer.observe(section);
});
