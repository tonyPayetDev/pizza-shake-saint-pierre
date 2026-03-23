// Navigation scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.flexDirection = 'column';
    navLinks.style.background = 'var(--light)';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = 'var(--shadow)';
  });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 150;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Gallery lightbox (simple implementation)
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length > 0) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const overlay = item.querySelector('.gallery-overlay h4');
      const title = overlay ? overlay.textContent : 'Galerie PIZZA&SHAKE';
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <img src="${img.src}" alt="${img.alt}">
          <p>${title}</p>
        </div>
      `;
      
      // Add styles
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
      `;
      
      const content = lightbox.querySelector('.lightbox-content');
      content.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
      `;
      
      const imgEl = lightbox.querySelector('img');
      imgEl.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 12px;
      `;
      
      const closeBtn = lightbox.querySelector('.lightbox-close');
      closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
      `;
      
      const caption = lightbox.querySelector('p');
      caption.style.cssText = `
        color: white;
        text-align: center;
        margin-top: 1rem;
        font-size: 1.1rem;
      `;
      
      // Close handlers
      const closeLightbox = () => lightbox.remove();
      closeBtn.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
      });
      
      document.body.appendChild(lightbox);
    });
  });
}

// Current day highlight in hours
const highlightCurrentDay = () => {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const today = days[new Date().getDay()];
  
  const hoursList = document.querySelectorAll('.hours-list li');
  hoursList.forEach(li => {
    const daySpan = li.querySelector('.day');
    if (daySpan && daySpan.textContent.includes(today)) {
      li.classList.add('current');
      daySpan.innerHTML += ' <span class="badge">Aujourd\'hui</span>';
    }
  });
};

document.addEventListener('DOMContentLoaded', highlightCurrentDay);

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .info-card, .gallery-item').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
