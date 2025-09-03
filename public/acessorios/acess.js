// Utilidades
const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Base de produtos (poderia vir de API). Categorias: tenis, fones, perifericos
const PRODUCTS = [
  // Tênis
  { id:'t1', name:'Tênis RunWave X', category:'tenis', price:349.90, old:399.90, thumb:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop', tag:'Lançamento' },
  { id:'t2', name:'Tênis Street Pro', category:'tenis', price:289.90, old:329.90, thumb:'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop', tag:'Frete grátis' },
  { id:'t3', name:'Tênis Pulse Neo', category:'tenis', price:459.90, old:null, thumb:'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop', tag:'Conforto' },
  { id:'t4', name:'Tênis Blink Air', category:'tenis', price:379.90, old:429.90, thumb:'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1200&auto=format&fit=crop', tag:'Leve' },
  // Fones
  { id:'f1', name:'Headset Sonic 7.1', category:'fones', price:249.90, old:299.90, thumb:'https://images.unsplash.com/photo-1518443895914-6ce93c2b2d59?q=80&w=1200&auto=format&fit=crop', tag:'Surround' },
  { id:'f2', name:'Fone Bluetooth Lite', category:'fones', price:129.90, old:159.90, thumb:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', tag:'Bluetooth 5.3' },
  { id:'f3', name:'Fone In-Ear Sport', category:'fones', price:89.90, old:null, thumb:'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop', tag:'Esportivo' },
  { id:'f4', name:'Headphone Studio Pro', category:'fones', price:599.90, old:749.90, thumb:'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop', tag:'Studio' },
  // Periféricos
  { id:'p1', name:'Teclado Mecânico RGB', category:'perifericos', price:299.90, old:369.90, thumb:'https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=1200&auto=format&fit=crop', tag:'Switch Red' },
  { id:'p2', name:'Mouse Gamer 16000 DPI', category:'perifericos', price:189.90, old:229.90, thumb:'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop', tag:'Programmable' },
  { id:'p3', name:'Monitor 27\" 144Hz', category:'perifericos', price:1399.90, old:1699.90, thumb:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', tag:'144Hz' },
  { id:'p4', name:'Mousepad XL', category:'perifericos', price:69.90, old:null, thumb:'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop', tag:'Antiderrapante' },
];

// Estado do carrinho em memória + persistência
let cart = JSON.parse(localStorage.getItem('blink-cart') || '[]');

function saveCart(){
  localStorage.setItem('blink-cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const count = cart.reduce((acc, it) => acc + it.qty, 0);
  document.getElementById('cartCount').textContent = count;
}

// Render dos cards
function productCard(p){
  const old = p.old ? `<span class="old">${fmtBRL(p.old)}</span>` : '';
  return `
    <article class="card">
      <img class="cover" src="${p.thumb}" alt="${p.name}" />
      <div class="content">
        <div class="badge">${p.tag}</div>
        <h4>${p.name}</h4>
        <div class="price"><strong>${fmtBRL(p.price)}</strong> ${old}</div>
        <div class="row">
          <div class="qty" data-id="${p.id}">
            <button class="qminus" aria-label="Diminuir">−</button>
            <input class="qinput" type="number" value="1" min="1" />
            <button class="qplus" aria-label="Aumentar">+</button>
          </div>
          <button class="btn add" data-add="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(list){
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = list.map(productCard).join('');
}

// Filtro por categoria
function applyFilter(cat){
  const chips = document.querySelectorAll('.chip');
  chips.forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
  const filtered = cat === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  renderProducts(filtered);
}

// Busca
function applySearch(text){
  const q = text.trim().toLowerCase();
  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
  renderProducts(filtered);
}

// Carrinho
function addToCart(id, qty=1){
  const prod = PRODUCTS.find(p => p.id === id);
  if(!prod) return;
  const found = cart.find(i => i.id === id);
  if(found) found.qty += qty;
  else cart.push({ id: prod.id, name: prod.name, price: prod.price, thumb: prod.thumb, qty });
  saveCart();
  flashAdded();

  // 🚀 Abre o carrinho automaticamente ao adicionar
  drawer.setAttribute('aria-hidden', 'false');
  renderCart();
}

function flashAdded(){
  const btn = document.getElementById('openCart');
  btn.classList.add('flash');
  setTimeout(() => btn.classList.remove('flash'), 400);
}

function removeFromCart(id){
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
}

function cartItemRow(it){
  return `
    <div class="cart-row">
      <img src="${it.thumb}" alt="${it.name}" />
      <div>
        <h5>${it.name}</h5>
        <div class="small">${fmtBRL(it.price)} un.</div>
        <button class="remove" data-remove="${it.id}">Remover</button>
      </div>
      <div class="qty">
        <button data-dec="${it.id}">−</button>
        <span>${it.qty}</span>
        <button data-inc="${it.id}">+</button>
      </div>
    </div>
  `;
}

function renderCart(){
  const el = document.getElementById('cartItems');
  if(cart.length === 0){
    el.innerHTML = `<p class="muted">Seu carrinho está vazio.</p>`;
  } else {
    el.innerHTML = cart.map(cartItemRow).join('');
  }

  const subtotal = cart.reduce((s,i)=> s + i.price * i.qty, 0);
  const discount = document.querySelector('input[name="pgto"]:checked')?.value === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal - discount;

  document.getElementById('subtotal').textContent = fmtBRL(subtotal);
  document.getElementById('discounts').textContent = `− ${fmtBRL(discount)}`;
  document.getElementById('total').textContent = fmtBRL(total);

  // Resumo no checkout (se existir)
  const orderItems = document.getElementById('orderItems');
  if(orderItems){
    orderItems.innerHTML = cart.map(i => `
      <div class="mini-item">
        <span>${i.qty}× ${i.name}</span>
        <strong>${fmtBRL(i.price * i.qty)}</strong>
      </div>`).join('');
    document.getElementById('checkoutTotal').textContent = fmtBRL(total);
  }
}

// Drawer open/close
const drawer = document.getElementById('cartDrawer');
document.getElementById('openCart').addEventListener('click', () => {
  drawer.setAttribute('aria-hidden', 'false');
  renderCart();
});
document.getElementById('closeCart').addEventListener('click', () => {
  drawer.setAttribute('aria-hidden', 'true');
});
drawer.querySelector('.drawer-backdrop').addEventListener('click', () => {
  drawer.setAttribute('aria-hidden', 'true');
});

// Delegações globais
document.addEventListener('click', (e) => {
  // Adicionar ao carrinho
  const addId = e.target.closest('[data-add]')?.dataset.add;
  if(addId){
    const wrap = e.target.closest('article').querySelector('.qinput');
    const qty = Math.max(1, parseInt(wrap.value || '1', 10));
    addToCart(addId, qty);
  }
  // Ajustar qty nos cards
  if(e.target.matches('.qplus')){
    const input = e.target.parentElement.querySelector('.qinput');
    input.value = Math.max(1, parseInt(input.value||'1',10)+1);
  }
  if(e.target.matches('.qminus')){
    const input = e.target.parentElement.querySelector('.qinput');
    input.value = Math.max(1, parseInt(input.value||'1',10)-1);
  }
  // Carrinho: remover / inc / dec
  const idRemove = e.target.dataset.remove;
  if(idRemove) removeFromCart(idRemove);
  const idInc = e.target.dataset.inc;
  if(idInc) changeQty(idInc, +1);
  const idDec = e.target.dataset.dec;
  if(idDec) changeQty(idDec, -1);
  // Filtros
  const chip = e.target.closest('.chip');
  if(chip){
    applyFilter(chip.dataset.filter);
  }
});

// Busca
document.getElementById('searchInput').addEventListener('input', (e) => {
  const txt = e.target.value;
  if(!txt) {
    // volta ao filtro ativo
    const active = document.querySelector('.chip.active')?.dataset.filter || 'todos';
    applyFilter(active);
  } else {
    applySearch(txt);
  }
});

// Ir para checkout
document.getElementById('goCheckout').addEventListener('click', () => {
  drawer.setAttribute('aria-hidden','true');
  document.getElementById('checkout').hidden = false;
  document.getElementById('checkout').scrollIntoView({ behavior:'smooth' });
  renderCart();
});

// Pagamento dinâmico
const paymentExtra = document.getElementById('paymentExtra');
document.querySelectorAll('input[name="pgto"]').forEach(r => {
  r.addEventListener('change', (e) => {
    const v = e.target.value;
    if(v === 'pix'){
      paymentExtra.innerHTML = `<div class="field"><label>Chave Pix</label><input value="contato@blink.com.br" readonly /></div><p class="muted">Pague usando a chave e anexe o comprovante após confirmar.</p>`;
    } else if(v === 'cartao'){
      paymentExtra.innerHTML = `
        <div class="field"><label>Número do cartão</label><input inputmode="numeric" placeholder="0000 0000 0000 0000" required /></div>
        <div class="field-row">
          <div class="field"><label>Validade</label><input placeholder="MM/AA" required /></div>
          <div class="field"><label>CVV</label><input placeholder="123" required /></div>
          <div class="field"><label>Parcelas</label><input value="1x" /></div>
        </div>`;
    } else {
      paymentExtra.innerHTML = `<p class="muted">Um boleto será gerado após a confirmação do pedido.</p>`;
    }
    renderCart(); // atualiza desconto do Pix
  });
});
// inicia extra como Pix
paymentExtra.innerHTML = `<div class="field"><label>Chave Pix</label><input value="contato@blink.com.br" readonly /></div><p class="muted">Pague usando a chave e anexe o comprovante após confirmar.</p>`;

// Submit do checkout (simulado)
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if(cart.length === 0){
    alert('Seu carrinho está vazio.');
    return;
  }
  const code = 'BLK-' + Math.random().toString(36).slice(2,8).toUpperCase();
  document.getElementById('orderCode').textContent = code;
  document.getElementById('orderSuccess').hidden = false;
  e.target.hidden = true;
  // Limpa carrinho
  cart = [];
  saveCart();
  renderCart();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Init
applyFilter('todos');
updateCartCount();
renderCart();
