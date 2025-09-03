let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');
let addCartButtons = document.querySelectorAll('.checkout button:first-child');
let checkoutButtons = document.querySelectorAll('.checkout button:last-child');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}

let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 800) // reduzido para deixar rápido
}

// MOSTRAR DETALHES
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
        document.body.style.overflow = "hidden"; // trava rolagem
    }
});

// FECHAR DETALHES
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
    document.body.style.overflow = ""; // libera rolagem
}

// FECHAR DETALHES COM ESC
document.addEventListener("keydown", function(event) {
    if(event.key === "Escape"){
        carousel.classList.remove('showDetail');
        document.body.style.overflow = "";
    }
});

// ADICIONAR AO CARRINHO
addCartButtons.forEach((btn) => {
    btn.onclick = function(e){
        let product = e.target.closest(".item").querySelector(".title").textContent;
        console.log("✅ Produto adicionado ao carrinho:", product);
        alert(product + " foi adicionado ao carrinho!");
    }
});

// FINALIZAR COMPRA
checkoutButtons.forEach((btn) => {
    btn.onclick = function(e){
        let product = e.target.closest(".item").querySelector(".title").textContent;
        alert("🛒 Finalizando a compra de: " + product);
    }
});
