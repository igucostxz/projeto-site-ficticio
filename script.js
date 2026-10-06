/* =========================================================
   VÉRTEX STREETWEAR — script.js
   ========================================================= */

/* ---------------- Dados dos produtos ----------------
   Para usar fotos reais, adicione "img: 'img/produto.jpg'" no produto
   (o código já usa a foto no lugar do desenho, se existir). */
const PRODUCTS = [
  { id: 1, name: "Camiseta Vértex Crown",   cat: "camisetas",  type: "tee",    price: 89.9,  old: 119.9, best: true,  color: "#111111", sizes: ["P","M","G","GG"] },
  { id: 2, name: "Moletom Vértex Hoodie",   cat: "moletons",   type: "hoodie", price: 229.9, old: null,  best: true,  color: "#b9bbbd", sizes: ["P","M","G","GG"] },
  { id: 3, name: "Calça Cargo Street",      cat: "calcas",     type: "pants",  price: 199.9, old: 249.9, best: false, color: "#151617", sizes: ["38","40","42","44"] },
  { id: 4, name: "Boné Vértex Snapback",    cat: "bones",      type: "cap",    price: 99.9,  old: null,  best: true,  color: "#0e0e0f", sizes: ["U"] },
  { id: 5, name: "Shoulder Bag Vértex",     cat: "acessorios", type: "bag",    price: 129.9, old: null,  best: false, color: "#101011", sizes: ["U"] },
  { id: 6, name: "Camiseta Oversized Rua",  cat: "camisetas",  type: "tee",    price: 99.9,  old: null,  best: false, color: "#d8d3c4", sizes: ["P","M","G","GG"] },
  { id: 7, name: "Moletom Canguru Black",   cat: "moletons",   type: "hoodie", price: 249.9, old: 289.9, best: true,  color: "#18181a", sizes: ["P","M","G","GG"] },
  { id: 8, name: "Calça Jogger Urban",      cat: "calcas",     type: "pants",  price: 179.9, old: null,  best: false, color: "#2a2c2e", sizes: ["38","40","42","44"] },
  { id: 9, name: "Boné Dad Hat Crown",      cat: "bones",      type: "cap",    price: 89.9,  old: null,  best: false, color: "#3b3a36", sizes: ["U"] },
  { id: 10, name: "Camiseta Graffiti Logo", cat: "camisetas",  type: "tee",    price: 94.9,  old: 109.9, best: false, color: "#2b2d31", sizes: ["P","M","G","GG"] },
];

const CAT_NAMES = {
  camisetas: "Camisetas", moletons: "Moletons", calcas: "Calças", bones: "Bonés", acessorios: "Acessórios",
};
const FREE_SHIPPING = 199;

/* ---------------- Utilidades ---------------- */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const lighten = (hex, amt = 40) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.min(255, v + amt);
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
};

/* Desenhos SVG simples de cada peça (placeholder até você colocar fotos) */
function shapeSVG(type, color) {
  const stroke = lighten(color, 38);
  const crown = (x, y, s = 1) =>
    `<g transform="translate(${x},${y}) scale(${s})" fill="none" stroke="${color === "#d8d3c4" || color === "#b9bbbd" ? "#222" : "#ddd"}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" opacity=".9">
       <path d="M0 16 L2.5 3 L8 9 L12 0 L16 9 L21.5 3 L24 16 Z"/><path d="M1 19 H23"/></g>`;
  const common = `fill="${color}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"`;
  const shapes = {
    tee: `<svg class="shape" viewBox="0 0 200 200"><path ${common} d="M70 28 L40 40 L12 72 L38 92 L52 78 L52 172 L148 172 L148 78 L162 92 L188 72 L160 40 L130 28 C124 42 76 42 70 28 Z"/>${crown(88, 86)}</svg>`,
    hoodie: `<svg class="shape" viewBox="0 0 200 200"><path ${common} d="M70 22 C70 8 130 8 130 22 L158 36 L190 118 L162 128 L152 100 L152 176 L48 176 L48 100 L38 128 L10 118 L42 36 Z"/><path d="M76 24 C84 56 116 56 124 24" fill="none" stroke="${stroke}" stroke-width="2"/><path d="M100 54 V84" stroke="${stroke}" stroke-width="2"/><path d="M66 140 H134" stroke="${stroke}" stroke-width="2" opacity=".5"/>${crown(88, 96)}</svg>`,
    pants: `<svg class="shape" viewBox="0 0 200 200"><path ${common} d="M56 16 H144 L152 184 H110 L100 70 L90 184 H48 Z"/><path d="M56 34 H144" stroke="${stroke}" stroke-width="2"/><rect x="62" y="96" width="20" height="26" rx="2" fill="none" stroke="${stroke}" stroke-width="2"/><rect x="118" y="96" width="20" height="26" rx="2" fill="none" stroke="${stroke}" stroke-width="2"/></svg>`,
    cap: `<svg class="shape" viewBox="0 0 200 200"><path ${common} d="M34 120 C30 60 70 36 104 36 C140 36 170 62 166 120 Z"/><path ${common} d="M34 120 C60 130 130 134 190 150 C196 130 170 122 166 120 Z"/><path d="M104 36 V120" stroke="${stroke}" stroke-width="1.6" opacity=".6"/>${crown(84, 66, 1.15)}</svg>`,
    bag: `<svg class="shape" viewBox="0 0 200 200"><path d="M52 62 C52 10 150 10 150 62" fill="none" stroke="${stroke}" stroke-width="7" stroke-linecap="round"/><rect ${common} x="34" y="56" width="132" height="104" rx="10"/><path d="M34 90 H166" stroke="${stroke}" stroke-width="2"/><rect x="88" y="84" width="24" height="12" rx="2" fill="${stroke}"/>${crown(88, 116)}</svg>`,
  };
  return shapes[type];
}

/* ---------------- Toast ---------------- */
const toastEl = $("#toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* =========================================================
   HEADER: scroll, progress, menu mobile, link ativo
   ========================================================= */
const header = $("#header");
const progress = $("#scrollProgress");
const burger = $("#burger");
const nav = $("#nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
}, { passive: true });

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
});
$$(".nav__link").forEach((a) => a.addEventListener("click", () => {
  burger.classList.remove("open"); nav.classList.remove("open"); document.body.style.overflow = "";
}));

/* Link ativo conforme a seção */
const sections = ["inicio", "loja", "sobre", "contato"].map((id) => document.getElementById(id));
const links = $$(".nav__link");
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => s && spy.observe(s));

/* =========================================================
   HERO SLIDER
   ========================================================= */
const slides = $$(".slide");
const bar = $("#heroBar");
const SLIDE_TIME = 6000;
let current = 0, slideTimer;

$("#slideTotal").textContent = slides.length;

function goTo(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
  $("#slideNow").textContent = current + 1;
  restartBar();
}
function restartBar() {
  bar.classList.remove("run");
  void bar.offsetWidth; // reinicia a animação
  bar.classList.add("run");
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goTo(current + 1), SLIDE_TIME);
}
$("#nextSlide").addEventListener("click", () => goTo(current + 1));
$("#prevSlide").addEventListener("click", () => goTo(current - 1));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && window.scrollY < innerHeight) goTo(current + 1);
  if (e.key === "ArrowLeft" && window.scrollY < innerHeight) goTo(current - 1);
});
/* swipe no celular */
let touchX = null;
$("#inicio").addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
$("#inicio").addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
  touchX = null;
});
/* parallax suave do fundo com o mouse */
$("#inicio").addEventListener("mousemove", (e) => {
  const x = (e.clientX / innerWidth - 0.5) * 24;
  const y = (e.clientY / innerHeight - 0.5) * 14;
  $$(".slide__crown").forEach((c) => (c.style.translate = `${x}px ${y}px`));
});
goTo(0);

/* =========================================================
   PRODUTOS: render + filtro
   ========================================================= */
const grid = $("#productsGrid");
const title = $("#productsTitle");
let activeFilter = "best";
const selectedSize = {}; // id -> tamanho
const favs = new Set(JSON.parse(localStorage.getItem("vertex_favs") || "[]"));

function productCard(p, i) {
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const image = p.img
    ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" />`
    : shapeSVG(p.type, p.color);
  return `
  <article class="product" style="animation-delay:${i * 0.07}s" data-id="${p.id}">
    ${p.best ? '<span class="badge">Best seller</span>' : ""}
    ${off ? `<span class="badge badge--sale">-${off}%</span>` : ""}
    <button class="fav ${favs.has(p.id) ? "on" : ""}" aria-label="Favoritar" data-fav="${p.id}">
      <svg viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.7-8 11-8 11z"/></svg>
    </button>
    <div class="product__img">
      ${image}
      <button class="quick-add" data-add="${p.id}">Adicionar ao carrinho</button>
    </div>
    <div class="product__info">
      <span class="product__cat">${CAT_NAMES[p.cat]}</span>
      <h3 class="product__name">${p.name}</h3>
      <div class="sizes">
        ${p.sizes.map((s) => `<button class="${(selectedSize[p.id] || p.sizes[0]) === s ? "on" : ""}" data-size="${s}" data-pid="${p.id}">${s}</button>`).join("")}
      </div>
      <div class="product__price">
        <b>${brl(p.price)}</b>${p.old ? `<s>${brl(p.old)}</s>` : ""}
      </div>
      <span class="product__install">ou 12x de ${brl(p.price / 12)}</span>
    </div>
  </article>`;
}

function renderProducts() {
  let list = PRODUCTS;
  if (activeFilter === "best") list = PRODUCTS.filter((p) => p.best);
  else if (activeFilter !== "all") list = PRODUCTS.filter((p) => p.cat === activeFilter);

  title.textContent =
    activeFilter === "best" ? "MAIS VENDIDOS" :
    activeFilter === "all" ? "TODOS OS PRODUTOS" : CAT_NAMES[activeFilter].toUpperCase();

  grid.innerHTML = list.map(productCard).join("") ||
    `<p class="muted" style="grid-column:1/-1">Nenhum produto encontrado.</p>`;
  $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === activeFilter));
}

function setFilter(f, scroll = true) {
  activeFilter = f;
  renderProducts();
  if (scroll) document.getElementById("loja").scrollIntoView({ behavior: "smooth" });
}

$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (chip) setFilter(chip.dataset.filter, false);
});
$("#showAll").addEventListener("click", () => setFilter("all", false));
$$("[data-cat]").forEach((c) => c.addEventListener("click", (e) => { e.preventDefault(); setFilter(c.dataset.cat); }));
$$("[data-filter-link]").forEach((c) => c.addEventListener("click", (e) => { e.preventDefault(); setFilter(c.dataset.filterLink); }));

grid.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const size = e.target.closest("[data-size]");
  const fav = e.target.closest("[data-fav]");
  const productCard = e.target.closest(".product");

  if (size) {
    selectedSize[size.dataset.pid] = size.dataset.size;
    $$(`[data-pid="${size.dataset.pid}"]`, grid).forEach((b) => b.classList.toggle("on", b === size));
  }
  if (add) addToCart(Number(add.dataset.add), selectedSize[add.dataset.add]);
  if (fav) {
    const id = Number(fav.dataset.fav);
    favs.has(id) ? favs.delete(id) : favs.add(id);
    localStorage.setItem("vertex_favs", JSON.stringify([...favs]));
    fav.classList.toggle("on");
    toast(favs.has(id) ? "Adicionado aos favoritos" : "Removido dos favoritos");
  }
  if (productCard && !e.target.closest("button") && !e.target.closest("[data-fav]")) {
    openProductModal(Number(productCard.dataset.id));
  }
});

/* =========================================================
   CARRINHO
   ========================================================= */
let cart = JSON.parse(localStorage.getItem("vertex_cart") || "[]"); // [{id,size,qty}]
const drawer = $("#cartDrawer");
const backdrop = $("#backdrop");

const saveCart = () => localStorage.setItem("vertex_cart", JSON.stringify(cart));
const openCart = () => { drawer.classList.add("open"); backdrop.classList.add("open"); document.body.style.overflow = "hidden"; };
const closeCart = () => { drawer.classList.remove("open"); backdrop.classList.remove("open"); document.body.style.overflow = ""; };

$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

function addToCart(id, size) {
  const p = PRODUCTS.find((x) => x.id === id);
  size = size || p.sizes[0];
  const found = cart.find((i) => i.id === id && i.size === size);
  found ? found.qty++ : cart.push({ id, size, qty: 1 });
  saveCart(); renderCart();
  const btn = $("#openCart");
  btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
  toast(`${p.name} adicionado!`);
}

function renderCart() {
  const box = $("#cartItems");
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const subtotal = cart.reduce((a, i) => a + PRODUCTS.find((p) => p.id === i.id).price * i.qty, 0);
  const deliverySelect = $("#deliveryAddressSelect");
  const addresses = accountData.addresses || [];

  $("#cartCount").textContent = count;
  $("#cartSubtotal").textContent = brl(subtotal);
  $("#cartInstall").textContent = subtotal ? `ou 12x de ${brl(subtotal / 12)} sem juros` : "";

  if (deliverySelect) {
    const selectedAddressId = accountData.selectedAddressId || addresses[0]?.id || "";
    deliverySelect.innerHTML = addresses.length
      ? addresses.map((address) => `<option value="${address.id}" ${address.id === selectedAddressId ? "selected" : ""}>${address.street}, ${address.number} · ${address.city}</option>`).join("")
      : `<option value="">Cadastre um endereço</option>`;
    deliverySelect.disabled = !addresses.length;
  }

  const left = FREE_SHIPPING - subtotal;
  $("#shipMsg").innerHTML = left > 0
    ? `Faltam <b>${brl(left)}</b> para o <b>frete grátis</b>`
    : `🎉 Você ganhou <b>frete grátis</b>!`;
  $("#shipFill").style.width = Math.min(100, (subtotal / FREE_SHIPPING) * 100) + "%";

  if (!cart.length) {
    box.innerHTML = `<div class="cart-empty">
      <svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>
      Seu carrinho está vazio.</div>`;
    return;
  }
  box.innerHTML = cart.map((i, idx) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    const thumb = p.img ? `<img src="${p.img}" alt="" style="width:100%;height:100%;object-fit:cover"/>` : shapeSVG(p.type, p.color);
    return `<div class="cart-item">
      <div class="thumb">${thumb}</div>
      <div>
        <h4>${p.name}</h4>
        <small>Tamanho: ${i.size} · ${brl(p.price)}</small>
        <div class="qty">
          <button data-dec="${idx}" aria-label="Diminuir">−</button><span>${i.qty}</span><button data-inc="${idx}" aria-label="Aumentar">+</button>
        </div>
      </div>
      <div class="right"><b>${brl(p.price * i.qty)}</b><button class="remove" data-rm="${idx}">Remover</button></div>
    </div>`;
  }).join("");
}

$("#cartItems").addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const rm = e.target.closest("[data-rm]");
  if (inc) cart[inc.dataset.inc].qty++;
  if (dec) { const it = cart[dec.dataset.dec]; it.qty--; if (it.qty <= 0) cart.splice(dec.dataset.dec, 1); }
  if (rm) cart.splice(rm.dataset.rm, 1);
  saveCart(); renderCart();
});

$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) return toast("Seu carrinho está vazio");

  const addresses = accountData.addresses || [];
  if (!addresses.length) {
    toast("Cadastre pelo menos um endereço antes de finalizar");
    openAccount();
    return;
  }

  const selectedAddress = addresses.find((address) => address.id === accountData.selectedAddressId) || addresses[0];
  const addressText = `${selectedAddress.street}, ${selectedAddress.number} - ${selectedAddress.city}`;
  /* Aqui você conecta o pagamento (Mercado Pago, Stripe, Pagar.me, etc.) */
  toast(`Pedido pronto para entrega em ${addressText}`);
});

$("#deliveryAddressSelect").addEventListener("change", (event) => {
  const value = event.target.value;
  if (!value) return;
  accountData.selectedAddressId = value;
  saveAccountData();
});

/* =========================================================
   BUSCA
   ========================================================= */
const input = $("#searchInput");
const results = $("#searchResults");

function openSearch() {
  input.focus();
}

function closeSearch() {
  input.value = "";
  results.innerHTML = "";
}

$("#openSearch").addEventListener("click", openSearch);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeSearch(); closeCart(); }
});
input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  if (!q) return (results.innerHTML = "");
  const found = PRODUCTS.filter((p) => (p.name + " " + CAT_NAMES[p.cat]).toLowerCase().includes(q));
  results.innerHTML = found.length
    ? found.map((p) => `<div class="search-item" data-search="${p.id}">
        <div class="thumb">${shapeSVG(p.type, p.color)}</div>
        <div><b>${p.name}</b><span>${CAT_NAMES[p.cat]} · ${brl(p.price)}</span></div></div>`).join("")
    : `<p class="search-empty">Nenhum resultado para "${input.value}".</p>`;
});
results.addEventListener("click", (e) => {
  const it = e.target.closest("[data-search]");
  if (!it) return;
  closeSearch();
  openProductModal(Number(it.dataset.search));
});

/* =========================================================
   PRODUTO: modal de detalhe + troca de cor
   ========================================================= */
const productModal = $("#productModal");
const productBackdrop = $("#productModalBackdrop");
let productModalState = { productId: null, color: null, size: null };

function getProductPalette(product) {
  const base = product.color || "#ffffff";
  const palette = [
    { name: "Original", value: base },
    { name: "Preto", value: "#111111" },
    { name: "Bege", value: "#d8d3c4" },
    { name: "Cinza", value: "#757b81" },
    { name: "Verde", value: "#4d6d5d" },
    { name: "Marrom", value: "#5a4338" }
  ];
  return palette.filter((option, index, arr) => arr.findIndex((item) => item.value.toLowerCase() === option.value.toLowerCase()) === index);
}

function openProductModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  productModalState = {
    productId: product.id,
    color: product.color,
    size: product.sizes[0]
  };

  renderProductModal();
  productModal.classList.add("open");
  productBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.remove("open");
  productBackdrop.classList.remove("open");
  document.body.style.overflow = "";
}

function renderProductModal() {
  const product = PRODUCTS.find((p) => p.id === productModalState.productId);
  if (!product) return;

  const palette = getProductPalette(product);
  const selectedSize = productModalState.size || product.sizes[0];
  const preview = shapeSVG(product.type, productModalState.color || product.color);

  productModal.innerHTML = `
    <div class="product-modal__header">
      <h3>Detalhes do produto</h3>
      <button class="icon-btn" id="closeProductModal" aria-label="Fechar detalhes do produto">✕</button>
    </div>
    <div class="product-modal__body">
      <div class="product-modal__visual">
        <div class="product-modal__stage">${preview}</div>
      </div>
      <div class="product-modal__info">
        <span class="product__cat">${CAT_NAMES[product.cat]}</span>
        <h2>${product.name}</h2>
        <div class="product__price product__price--large">
          <b>${brl(product.price)}</b>${product.old ? `<s>${brl(product.old)}</s>` : ""}
        </div>
        <p class="product-modal__desc">Peça pensada para quem vive a rua com atitude. Modelagem confortável, acabamento premium e identidade visual marcante.</p>

        <div class="product-modal__group">
          <span>Escolha a cor</span>
          <div class="product-modal__colors">
            ${palette.map((color) => `
              <button
                type="button"
                class="color-swatch ${productModalState.color && color.value.toLowerCase() === productModalState.color.toLowerCase() ? "active" : ""}"
                data-color="${color.value}"
                style="--swatch:${color.value};"
                aria-label="${color.name}"
                title="${color.name}"
              ></button>
            `).join("")}
          </div>
        </div>

        <div class="product-modal__group">
          <span>Tamanho</span>
          <div class="product-modal__sizes">
            ${product.sizes.map((size) => `
              <button type="button" class="size-option ${selectedSize === size ? "active" : ""}" data-product-size="${size}">${size}</button>
            `).join("")}
          </div>
        </div>

        <div class="product-modal__actions">
          <button type="button" class="btn btn--light" data-product-add="${product.id}">Adicionar ao carrinho</button>
          <button type="button" class="btn btn--ghost" data-product-fav="${product.id}">${favs.has(product.id) ? "Favoritado" : "Favoritar"}</button>
        </div>
      </div>
    </div>
  `;
}

productModal.addEventListener("click", (e) => {
  const closeBtn = e.target.closest("#closeProductModal");
  const swatch = e.target.closest("[data-color]");
  const size = e.target.closest("[data-product-size]");
  const add = e.target.closest("[data-product-add]");
  const fav = e.target.closest("[data-product-fav]");

  if (closeBtn) return closeProductModal();

  if (swatch) {
    productModalState.color = swatch.dataset.color;
    renderProductModal();
    return;
  }

  if (size) {
    productModalState.size = size.dataset.productSize;
    renderProductModal();
    return;
  }

  if (add) {
    addToCart(Number(add.dataset.productAdd), productModalState.size || PRODUCTS.find((p) => p.id === Number(add.dataset.productAdd)).sizes[0]);
    closeProductModal();
    openCart();
    return;
  }

  if (fav) {
    const id = Number(fav.dataset.productFav);
    favs.has(id) ? favs.delete(id) : favs.add(id);
    localStorage.setItem("vertex_favs", JSON.stringify([...favs]));
    toast(favs.has(id) ? "Adicionado aos favoritos" : "Removido dos favoritos");
    renderProductModal();
  }
});
productBackdrop.addEventListener("click", closeProductModal);

/* =========================================================
   ÁREA DO CLIENTE
   ========================================================= */
const accountPanel = $("#accountPanel");
const accountBackdrop = $("#accountBackdrop");
const defaultOrders = [
  { id: "#VTX-1024", item: "Moletom Crown + Boné", status: "Em transporte", date: "05/10/2026", total: 239.9 },
  { id: "#VTX-0998", item: "Camiseta Oversized", status: "Entregue", date: "28/09/2026", total: 99.9 },
  { id: "#VTX-0921", item: "Calça Cargo Street", status: "Em processamento", date: "18/09/2026", total: 199.9 }
];

function normalizeAccountData(data) {
  const fallbackAddress = {
    id: `addr-${Date.now()}`,
    recipient: "Cliente VÉRTEX",
    cep: "",
    city: "",
    street: "",
    number: "",
    complement: ""
  };

  const base = {
    photo: "",
    addresses: [fallbackAddress],
    selectedAddressId: fallbackAddress.id,
    activeCoupon: "VERTEX10",
    orders: defaultOrders
  };

  if (!data) return base;

  const normalized = { ...base, ...data };
  const legacyAddress = data.address && typeof data.address === "object" ? data.address : null;

  if (Array.isArray(data.addresses) && data.addresses.length) {
    normalized.addresses = data.addresses.map((address) => ({ ...fallbackAddress, ...address, id: String(address.id || `addr-${Date.now()}-${Math.random()}`) }));
  } else if (legacyAddress) {
    normalized.addresses = [{ ...fallbackAddress, ...legacyAddress, id: `addr-${Date.now()}` }];
  }

  const selected = normalized.selectedAddressId || normalized.addresses[0]?.id;
  normalized.selectedAddressId = normalized.addresses.some((address) => address.id === selected) ? selected : normalized.addresses[0]?.id || null;

  return normalized;
}

function getAccountData() {
  const saved = JSON.parse(localStorage.getItem("vertex_account") || "null");
  return normalizeAccountData(saved);
}

let accountData = getAccountData();

function saveAccountData() {
  localStorage.setItem("vertex_account", JSON.stringify(accountData));
}

function renderCoupons() {
  const couponList = $("#couponList");
  const coupons = [
    { code: "VERTEX10", title: "10% OFF", text: "Desconto na primeira compra" },
    { code: "RUA15", title: "R$ 15 OFF", text: "Acima de R$ 150" },
    { code: "FRETEFREE", title: "Frete grátis", text: "Para pedidos acima de R$ 199" }
  ];

  couponList.innerHTML = coupons.map((coupon) => `
    <button type="button" class="coupon-card ${accountData.activeCoupon === coupon.code ? "active" : ""}" data-coupon="${coupon.code}">
      <div>
        <strong>${coupon.title}</strong>
        <span>${coupon.text}</span>
      </div>
      <small>${coupon.code}</small>
    </button>
  `).join("");
}

function renderOrders() {
  const ordersList = $("#ordersList");
  if (!accountData.orders || !accountData.orders.length) {
    ordersList.innerHTML = '<p class="empty-state">Você ainda não possui pedidos.</p>';
    return;
  }

  ordersList.innerHTML = accountData.orders.map((order) => `
    <article class="order-card">
      <div class="order-card__head">
        <strong>${order.id}</strong>
        <span class="status status--${order.status.toLowerCase().replace(/\s+/g, "-")}">${order.status}</span>
      </div>
      <p>${order.item}</p>
      <div class="order-card__meta">
        <small>${order.date}</small>
        <strong>${brl(order.total)}</strong>
      </div>
    </article>
  `).join("");
}

function renderSavedAddresses() {
  const list = $("#savedAddressList");
  if (!list) return;

  if (!accountData.addresses || !accountData.addresses.length) {
    list.innerHTML = '<p class="empty-state">Você ainda não salvou nenhum endereço.</p>';
    return;
  }

  list.innerHTML = accountData.addresses.map((address) => `
    <div class="saved-address ${address.id === accountData.selectedAddressId ? "selected" : ""}" data-address-id="${address.id}">
      <div>
        <strong>${address.recipient || "Cliente VÉRTEX"}</strong>
        <span>${address.street || "Rua"}, ${address.number || "N/A"}${address.complement ? ` · ${address.complement}` : ""}</span>
        <small>${address.city || "Cidade"} · ${address.cep || "CEP"}</small>
      </div>
      <div class="saved-address__actions">
        <button type="button" class="mini-btn" data-select-address="${address.id}">${address.id === accountData.selectedAddressId ? "Selecionado" : "Usar"}</button>
        <button type="button" class="mini-btn mini-btn--danger" data-delete-address="${address.id}">Excluir</button>
      </div>
    </div>
  `).join("");
}

function renderAccountPanel() {
  const avatar = $("#profileAvatar");
  const name = $("#customerName");
  const email = $("#customerEmail");
  const selectedAddress = accountData.addresses.find((address) => address.id === accountData.selectedAddressId) || accountData.addresses[0];

  if (accountData.photo) {
    avatar.src = accountData.photo;
    avatar.style.display = "block";
  } else {
    avatar.src = "";
    avatar.style.display = "none";
  }

  const recipient = selectedAddress?.recipient || "Cliente VÉRTEX";
  name.textContent = recipient;
  email.textContent = "cliente@vertexstreetwear.com";

  $("#addressRecipient").value = selectedAddress?.recipient || "";
  $("#addressCep").value = selectedAddress?.cep || "";
  $("#addressCity").value = selectedAddress?.city || "";
  $("#addressStreet").value = selectedAddress?.street || "";
  $("#addressNumber").value = selectedAddress?.number || "";
  $("#addressComplement").value = selectedAddress?.complement || "";

  renderSavedAddresses();
  renderCoupons();
  renderOrders();
}

function openAccount() {
  renderAccountPanel();
  accountPanel.classList.add("open");
  accountBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeAccount() {
  accountPanel.classList.remove("open");
  accountBackdrop.classList.remove("open");
  document.body.style.overflow = "";
}

$("#openAccount").addEventListener("click", openAccount);
$("#closeAccount").addEventListener("click", closeAccount);
accountBackdrop.addEventListener("click", closeAccount);

$$(".account-tab-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const tab = button.dataset.tab;
    $$(".account-tab-trigger").forEach((item) => item.classList.toggle("active", item === button));
    $$('[data-tab-content]').forEach((panel) => panel.classList.toggle("active", panel.dataset.tabContent === tab));
  });
});

$("#addressForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const recipient = $("#addressRecipient").value.trim();
  const cep = $("#addressCep").value.trim();
  const city = $("#addressCity").value.trim();
  const street = $("#addressStreet").value.trim();
  const number = $("#addressNumber").value.trim();
  const complement = $("#addressComplement").value.trim();

  if (!recipient || !city || !street || !number || !cep) {
    toast("Preencha nome, CEP, cidade, rua e número.");
    return;
  }

  const newAddress = {
    id: `addr-${Date.now()}`,
    recipient,
    cep,
    city,
    street,
    number,
    complement
  };

  accountData.addresses = [...(accountData.addresses || []), newAddress];
  accountData.selectedAddressId = newAddress.id;
  saveAccountData();
  renderAccountPanel();
  renderCart();
  toast("Endereço salvo com sucesso!");
});

$("#savedAddressList").addEventListener("click", (event) => {
  const selectAddress = event.target.closest("[data-select-address]");
  const deleteAddress = event.target.closest("[data-delete-address]");

  if (selectAddress) {
    accountData.selectedAddressId = selectAddress.dataset.selectAddress;
    saveAccountData();
    renderAccountPanel();
    renderCart();
    toast("Endereço selecionado para entrega.");
    return;
  }

  if (deleteAddress) {
    const id = deleteAddress.dataset.deleteAddress;
    accountData.addresses = (accountData.addresses || []).filter((address) => address.id !== id);

    if (accountData.selectedAddressId === id) {
      accountData.selectedAddressId = accountData.addresses[0]?.id || null;
    }

    if (!accountData.addresses.length) {
      accountData.selectedAddressId = null;
    }

    saveAccountData();
    renderAccountPanel();
    renderCart();
    toast("Endereço removido.");
  }
});

$("#profilePhotoInput").addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    accountData.photo = String(reader.result);
    saveAccountData();
    renderAccountPanel();
    toast("Foto de perfil atualizada!");
  };
  reader.readAsDataURL(file);
});

$("#couponList").addEventListener("click", (event) => {
  const coupon = event.target.closest("[data-coupon]");
  if (!coupon) return;
  accountData.activeCoupon = coupon.dataset.coupon;
  saveAccountData();
  renderCoupons();
  toast(`Cupom ${coupon.dataset.coupon} ativado!`);
});

/* =========================================================
   NEWSLETTER
   ========================================================= */
$("#newsletter").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  toast("Cupom VERTEX10 enviado para seu e-mail!");
});

/* =========================================================
   ANIMAÇÕES AO ROLAR + CONTADORES
   ========================================================= */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.15 });
$$(".reveal").forEach((el) => revealObs.observe(el));

const countObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, dur = 1800, t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.floor(end * (1 - Math.pow(1 - k, 3))).toLocaleString("pt-BR") + (k === 1 && end > 100 ? "+" : "");
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
}, { threshold: 0.6 });
$$("[data-count]").forEach((el) => countObs.observe(el));

/* ---------------- Início ---------------- */
renderProducts();
renderCart();