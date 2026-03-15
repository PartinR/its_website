document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  // Handle Scroll Effect for the glassy background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Menu Open/Close
  function toggleMenu() {
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      iconMenu.style.display = 'none';
      iconClose.style.display = 'block';
    } else {
      iconMenu.style.display = 'block';
      iconClose.style.display = 'none';
    }
  }

  // Listen for hamburger clicks
  mobileToggle.addEventListener('click', toggleMenu);

  // Close mobile menu automatically when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // once: true equivalent
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });

  // Contact Form Handling (Simulated)
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const sendIcon = document.querySelector('.send-icon');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // UI Loading State
      submitBtn.disabled = true;
      submitSpinner.classList.remove('hidden');
      sendIcon.classList.add('hidden');
      submitText.textContent = 'Sending...';
      formMessage.classList.add('hidden');

      // Simulate network request delays
      setTimeout(() => {
        // UI Success State
        submitBtn.disabled = false;
        submitSpinner.classList.add('hidden');
        sendIcon.classList.remove('hidden');
        submitText.textContent = 'Send Message';
        formMessage.classList.remove('hidden');
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 5000);
      }, 1200);
    });
  }
});