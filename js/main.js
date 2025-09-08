const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

let isAnimating = false;

menuToggle.addEventListener('click', () => {
  if (isAnimating) return;
  if (menu.classList.contains('show')) {
    fadeOut(menu);
  } else {
    fadeIn(menu);
  }
});

// Funciones de fade
function fadeIn(element) {
  isAnimating = true;
  element.classList.add('show');
  element.style.opacity = 0;
  requestAnimationFrame(() => {
    element.style.transition = "opacity 0.3s ease";
    element.style.opacity = 1;
  });
  setTimeout(() => isAnimating = false, 300);
}

function fadeOut(element) {
  isAnimating = true;
  element.style.opacity = 0;
  setTimeout(() => {
    element.classList.remove('show');
    isAnimating = false;
  }, 300);
}

// Cerrar menú al seleccionar opción
menu.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    fadeOut(menu);
    const section = document.querySelector(`#${item.dataset.section}`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Cambio de idioma
const translations = {
  es: { inicio: "Inicio", sobre: "Sobre", proyectos: "Proyectos", contacto: "Contacto" },
  de: { inicio: "Start", sobre: "Über", proyectos: "Projekte", contacto: "Kontakt" },
  en: { inicio: "Home", sobre: "About", proyectos: "Projects", contacto: "Contact" },
  fr: { inicio: "Accueil", sobre: "À propos", proyectos: "Projets", contacto: "Contact" }
};

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    menu.querySelectorAll('li').forEach(li => {
      li.textContent = translations[lang][li.dataset.section];
    });
  });
});
