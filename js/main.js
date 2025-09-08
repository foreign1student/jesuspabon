// --------- MENÚ DESPLEGABLE ---------
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
let menuAnimating = false;

menuToggle.addEventListener('click', ()=>{
  if(menuAnimating) return;
  if(menu.classList.contains('show')) fadeOutMenu(menu);
  else fadeInMenu(menu);
});

function fadeInMenu(el){ menuAnimating=true; el.classList.add('show'); requestAnimationFrame(()=>el.style.opacity=1); setTimeout(()=>menuAnimating=false,300);}
function fadeOutMenu(el){ menuAnimating=true; el.style.opacity=0; setTimeout(()=>{ el.classList.remove('show'); menuAnimating=false; },300);}

// --------- SECCIONES Y SLIDERS ---------
const sliders = { trabajos:3, colaboraciones:2, creatividad:4, curriculum:1 };
let currentSection = null;
const sections = document.querySelectorAll('.section');
const currentSectionTitle = document.getElementById('current-section');
const siteTitle = document.getElementById('site-title');

for(let sec in sliders){
  const sliderDiv = document.getElementById(`slider-${sec}`);
  for(let i=1;i<=sliders[sec];i++){
    const img = document.createElement('img');
    img.src = `images/slider/${sec}/img${i}.jpg`;
    img.alt = `${sec} image ${i}`;
    sliderDiv.appendChild(img);
  }
}

function showSection(sec){
  sections.forEach(s=>s.classList.remove('active'));
  const div = document.getElementById(sec);
  div.classList.add('active');
  currentSection = sec;
  currentSectionTitle.textContent = sec.charAt(0).toUpperCase() + sec.slice(1);
  siteTitle.classList.add('inactive');
  startSlider(sec);
}

document.querySelectorAll('#menu li').forEach(li=>{
  li.addEventListener('click', ()=>{
    fadeOutMenu(menu);
    showSection(li.dataset.section);
  });
});

siteTitle.addEventListener('click', ()=>{ // volver al inicio
  sections.forEach(s=>s.classList.remove('active'));
  currentSectionTitle.textContent = '';
  siteTitle.classList.remove('inactive');
});

// --------- SLIDERS CON FADE ---------
let sliderIntervals = {};
function startSlider(sec){
  const imgs = document.querySelectorAll(`#slider-${sec} img`);
  if(imgs.length===0) return;
  let idx=0;
  imgs.forEach(img=>img.classList.remove('active'));
  imgs[idx].classList.add('active');
  clearInterval(sliderIntervals[sec]);
  sliderIntervals[sec] = setInterval(()=>{
    imgs[idx].classList.remove('active');
    idx = (idx+1)%imgs.length;
    imgs[idx].classList.add('active');
  },3000);
}

// --------- CAMBIO DE IDIOMA ---------
const translations = {
  es:{trabajos:"Trabajos", colaboraciones:"Colaboraciones", creatividad:"Creatividad", curriculum:"Currículum"},
  de:{trabajos:"Arbeiten", colaboraciones:"Zusammenarbeit", creatividad:"Kreativität", curriculum:"Lebenslauf"},
  en:{trabajos:"Work", colaboraciones:"Collaborations", creatividad:"Creativity", curriculum:"Resume"},
  fr:{trabajos:"Travaux", colaboraciones:"Collaborations", creatividad:"Créativité", curriculum:"CV"},
  it:{trabajos:"Lavori", colaboraciones:"Collaborazioni", creatividad:"Creatività", curriculum:"Curriculum"}
};

document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const lang=btn.dataset.lang;
    document.querySelectorAll('#menu li').forEach(li=>{
      li.textContent = translations[lang][li.dataset.section];
    });
    if(currentSection) currentSectionTitle.textContent = translations[lang][currentSection];
  });
});
