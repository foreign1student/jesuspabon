// =============================
// SLIDER AUTOMÁTICO por CATEGORÍAS con FADE
// =============================

// Cada categoría tiene su propio array de imágenes
const sliderImages = {
  trabajos: [
    "images/slider/trabajos/img1.jpg",
    "images/slider/trabajos/img2.jpg",
    "images/slider/trabajos/img3.jpg"
  ],
  colaboraciones: [
    "images/slider/colaboraciones/img1.jpg",
    "images/slider/colaboraciones/img2.jpg"
  ],
  creatividad: [
    "images/slider/creatividad/img1.jpg",
    "images/slider/creatividad/img2.jpg",
    "images/slider/creatividad/img3.jpg",
    "images/slider/creatividad/img4.jpg"
  ],
  curriculum: [
    "images/slider/curriculum/img1.jpg"
  ]
};

// Estado del slider
let currentCategory = "trabajos"; // categoría inicial
let currentIndex = 0;
const slider = document.getElementById("slider");
const changeTime = 5000; // ms entre imágenes
const fadeTime = 1000;   // ms de fade (coincidir con CSS)

/* === Función que cambia la imagen con fade === */
function changeImage() {
  const images = sliderImages[currentCategory];
  if (!images || images.length === 0) return;

  slider.style.opacity = 0; // fade out

  setTimeout(() => {
    slider.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length;
    slider.style.opacity = 1; // fade in
  }, fadeTime);
}

// Iniciar slider
changeImage();
setInterval(changeImage, changeTime);

/* === Cambiar categoría al hacer clic en el menú === */
document.querySelectorAll("#menu li").forEach(item => {
  item.addEventListener("click", () => {
    const category = item.getAttribute("data-category");
    if (sliderImages[category]) {
      currentCategory = category;
      currentIndex = 0; // empezar desde la primera imagen
      changeImage();
      document.getElementById("category-name").textContent = item.textContent;
    }
  });
});
