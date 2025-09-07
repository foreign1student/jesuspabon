// Elementos del DOM
let menuButton = document.getElementById('menu-button');
let menu = document.getElementById('menu');
let siteTitle = document.getElementById('site-title');
let categoryName = document.getElementById('category-name');
let slider = document.getElementById('slider');
let currentCategory = null;
let currentLang = 'es';
let slideInterval = null;

// Lista de imágenes por categoría (ejemplo, reemplaza con tus imágenes)
let images = {
    'trabajos': ['images/trabajos/img1.jpg', 'images/trabajos/img2.jpg'],
    'colaboraciones': ['images/colaboraciones/img1.jpg'],
    'creatividad': ['images/creatividad/img1.jpg'],
    'curriculum': ['images/curriculum/img1.jpg']
};

// Textos por idioma (JSON cargado dinámicamente)
let texts = {};

// Función para cargar idioma desde JSON
function loadLanguage(lang){
    fetch('lang/' + lang + '.json')
    .then(response => response.json())
    .then(data => {
        texts = data;
        updateTexts();
    });
}

// Actualizar textos de menú y categoría
function updateTexts(){
    document.querySelectorAll('#menu ul li[data-category]').forEach(li => {
        let cat = li.getAttribute('data-category');
        li.innerText = texts[cat];
    });
    if(currentCategory) categoryName.innerText = texts[currentCategory];
}

// Inicializar cambio de idioma
document.querySelectorAll('#languages li').forEach(li => {
    li.addEventListener('click', ()=>{
        currentLang = li.getAttribute('data-lang');
        loadLanguage(currentLang);
    });
});

// Mostrar/ocultar menú
menuButton.addEventListener('click', () => {
    menu.style.display = (menu.style.display==='block') ? 'none' : 'block';
});

// Volver a inicio al pulsar el título
siteTitle.addEventListener('click', () => {
    currentCategory = null;
    categoryName.innerText = '';
    slider.innerHTML = '';
});

// Función principal para mostrar categoría
function showCategory(cat){
    currentCategory = cat;
    categoryName.innerText = texts[cat];
    slider.innerHTML = '';

    let index = 0;

    // Crear imagen inicial
    let imgEl = document.createElement('img');
    imgEl.src = images[cat][0];
    imgEl.style.opacity = 0;
    imgEl.style.position = 'absolute';
    imgEl.style.top = '0';
    imgEl.style.left = '0';
    imgEl.style.width = '100%';
    imgEl.style.height = '100%';
    imgEl.style.transition = 'opacity 1s';
    slider.appendChild(imgEl);

    // Fade-in inicial
    setTimeout(()=>{ imgEl.style.opacity = 1; }, 100);

    // Intervalo para cambiar imágenes automáticamente
    if(slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        imgEl.style.opacity = 0; // fade out
        setTimeout(() => {
            index = (index + 1) % images[cat].length;
            imgEl.src = images[cat][index];
            imgEl.style.opacity = 1; // fade in
        }, 1000);
    }, 5000);

    // Ocultar menú al seleccionar categoría
    menu.style.display = 'none';
}

// Asignar evento a menú
document.querySelectorAll('#menu ul li[data-category]').forEach(li => {
    li.addEventListener('click', () => {
        showCategory(li.getAttribute('data-category'));
    });
});

// Cargar idioma inicial
loadLanguage(currentLang);
