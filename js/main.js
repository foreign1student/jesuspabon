// =============================
// SLIDER AUTOMÁTICO con FADE
// =============================

// Lista de imágenes del slider
const sliderImages = [
  "images/slider/imagen1.jpg",
  "images/slider/imagen2.jpg",
  "images/slider/imagen3.jpg"
];

// Configuración
let currentIndex = 0;
const slider = document.getElementById("slider");
const changeTime = 5000; // tiempo entre imágenes (ms)
const fadeTime = 1000;   // duración del fade (ms), debe coincidir con el CSS

// Función para cambiar la imagen con efecto fade
function changeImage() {
  // bajar opacidad a 0
  slider.style.opacity = 0;

  setTimeout(() => {
    // cambiar imagen cuando está invisible
    slider.style.backgroundImage = `url('${sliderImages[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % sliderImages.length;

    // volver a opacidad 1
    slider.style.opacity = 1;
  }, fadeTime);
}

// Iniciar slider
changeImage(); // primera carga
setInterval(changeImage, changeTime);
