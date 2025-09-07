let menuButton = document.getElementById('menu-button');
let menu = document.getElementById('menu');
let siteTitle = document.getElementById('site-title');
let categoryName = document.getElementById('category-name');
let slider = document.getElementById('slider');
let currentCategory = null;
let languages = document.querySelectorAll('#languages li');
let currentLang = 'es';
let images = {
    'trabajos': ['images/trabajos/lady1.jpg','images/trabajos/lady2.jpg'],
    'colaboraciones': ['images/colaboraciones/img1.jpg','images/colaboraciones/img2.jpg'],
    'creatividad': ['images/creatividad/img1.jpg','images/creatividad/img2.jpg'],
    'curriculum': ['images/curriculum/img1.jpg']
};
let texts = {};

// Cargar idioma
function loadLanguage(lang){
    fetch('lang/'+lang+'.json')
    .then(response => response.json())
    .then(data => { texts=data; updateTexts(); });
}

function updateTexts(){
    document.querySelectorAll('#menu ul li[data-category]').forEach(li=>{
        let cat = li.getAttribute('data-category');
        li.innerText = texts[cat];
    });
    if(currentCategory) categoryName.innerText = texts[currentCategory];
}

languages.forEach(li=>{
    li.addEventListener('click',()=>{
        currentLang = li.getAttribute('data-lang');
        loadLanguage(currentLang);
    });
});

menuButton.addEventListener('click', () => { menu.style.display = menu.style.display==='block'?'none':'block'; });
siteTitle.addEventListener('click', () => { 
    currentCategory=null; 
    categoryName.innerText=''; 
    slider.innerHTML=''; 
});

function showCategory(cat){
    currentCategory=cat;
    categoryName.innerText = texts[cat];
    slider.innerHTML='';
    let index=0;
    let imgEl = document.createElement('img');
    imgEl.src=images[cat][0];
    imgEl.style.width='100%';
    imgEl.style.height='100%';
    imgEl.style.position='absolute';
    imgEl.style.top='0'; imgEl.style.left='0';
    imgEl.style.opacity='0';
    imgEl.style.transition='opacity 1s';
    slider.appendChild(imgEl);
    setTimeout(()=>{ imgEl.style.opacity='1'; },100);
    clearInterval(window.slideInterval);
    window.slideInterval=setInterval(()=>{
        imgEl.style.opacity='0';
        setTimeout(()=>{
            index=(index+1)%images[cat].length;
            imgEl.src=images[cat][index];
            imgEl.style.opacity='1';
        },1000);
    },5000);
    menu.style.display='none';
}

document.querySelectorAll('#menu ul li[data-category]').forEach(li=>{
    li.addEventListener('click',()=> showCategory(li.getAttribute('data-category')) );
});

loadLanguage(currentLang);
