// Navbar tubelight glow effect - active tab tracking
// Updates CSS custom properties to position glowing indicator

function updateGlowPosition(activeLink) {
  const container = document.querySelector('.navbar-pill-container');
  if (!container || !activeLink) return;

  const containerRect = container.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  const left = linkRect.left - containerRect.left;
  const width = linkRect.width;

  container.style.setProperty('--glow-left', `${left}px`);
  container.style.setProperty('--glow-width', `${width}px`);
  container.classList.add('has-active');
}

function initNavbarGlow() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-pill-container .nav-link');

  if (!sections.length || !navLinks.length) return;

  // IntersectionObserver to track visible sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const id = entry.target.id;
        const activeLink = document.querySelector(`.navbar-pill-container .nav-link[href*="#${id}"]`);

        if (activeLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
          updateGlowPosition(activeLink);
        }
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-pill-container .nav-link');

  if (!navLinks.length) return;

  // Click handlers for immediate feedback
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      updateGlowPosition(this);
    });
  });

  // Initialize IntersectionObserver
  initNavbarGlow();

  // Set initial active state (first link on load)
  const firstLink = navLinks[0];
  if (firstLink) {
    firstLink.classList.add('active');
    updateGlowPosition(firstLink);
  }

  // Re-calculate glow position on window resize
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.navbar-pill-container .nav-link.active');
    if (activeLink) {
      updateGlowPosition(activeLink);
    }
  });
});
