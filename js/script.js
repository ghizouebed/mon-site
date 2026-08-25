// Met à jour automatiquement l'année dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile : ouverture / fermeture au clic sur le burger
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Ferme le menu mobile après avoir cliqué sur un lien (meilleure UX)
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
