// ── DATA PRODUL DENGAN GAMBAR EXTERNAL SOURCE ──
const products = [
  { 
    id: 0, 
    name: 'Tote Bag Arunika Kencana', 
    variant: 'Kanvas Premium · Krem Gading', 
    price: 'Rp 485.000', 
    stock: 'in', 
    category: 'arunika', 
    badge: 'New', 
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop', // Aesthetic Cream Tote
    philosophy: '"Seperti cahaya Arunika yang menembus kabut pagi, tas ini hadir untuk menemani setiap langkah pertamamu—membawa harapan yang selalu layak untuk dibawa pergi."', 
    colors: ['#E8DDD0','#C8BAA8'], 
    philosophy_short: 'Kencana' 
  },
  { 
    id: 1, 
    name: 'Tote Bag Arunika Saga', 
    variant: 'Linen Organik · Cokelat Bumi', 
    price: 'Rp 525.000', 
    stock: 'in', 
    category: 'arunika', 
    badge: null, 
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop', // Minimalist Brown Bag Structure
    philosophy: '"Dari tanah yang subur, lahir bahan-bahan yang menceritakan kejujuran. Saga adalah perjalanan yang ditempuh dengan penuh integritas dan ketenangan."', 
    colors: ['#D4C5B0','#A8957E'], 
    philosophy_short: 'Saga' 
  },
  { 
    id: 2, 
    name: 'Tote Bag Arunika Rimba', 
    variant: 'Kanvas Batik · Hijau Alam', 
    price: 'Rp 565.000', 
    stock: 'hampir', 
    category: 'arunika', 
    badge: 'Limited', 
    image: 'https://images.unsplash.com/photo-1575844611520-cb9b16550974?q=80&w=600&auto=format&fit=crop', // Earth tone/olive textile look
    philosophy: '"Motif batik yang menghiasi kanvas ini adalah doa para pengrajin—setiap garis adalah harapan, setiap warna adalah keberanian untuk tumbuh."', 
    colors: ['#B8C5B0','#8CA07E'], 
    philosophy_short: 'Rimba' 
  },
  { 
    id: 3, 
    name: 'Tote Bag Arunika Fajar', 
    variant: 'Katun Dobby · Putih Bersih', 
    price: 'Rp 445.000', 
    stock: 'in', 
    category: 'arunika', 
    badge: null, 
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop', // Aesthetic White Fabric Bag
    philosophy: '"Fajar adalah momen paling jujur dalam sehari. Tas ini hadir seputih niat awal yang selalu murni."', 
    colors: ['#F0EBE0','#D8CFC0'], 
    philosophy_short: 'Fajar' 
  },
  { 
    id: 4, 
    name: 'Pouch Mini Arunika', 
    variant: 'Kanvas Cotton · Krem', 
    price: 'Rp 185.000', 
    stock: 'in', 
    category: 'aksesoris', 
    badge: null, 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop', // Small pouch/cosmetic organizer aesthetic
    philosophy: '"Kecil namun penuh makna—untuk hal-hal berharga yang selalu ingin kamu bawa dekat."', 
    colors: ['#E0D5C5','#C0B5A0'], 
    philosophy_short: 'Pouch' 
  },
  { 
    id: 5, 
    name: 'Tali Pengaman Extra', 
    variant: 'Webbing Cotton · Tan', 
    price: 'Rp 85.000', 
    stock: 'in', 
    category: 'aksesoris', 
    badge: null, 
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop', // Cotton strap/aesthetic roll rope
    philosophy: '"Kadang yang paling sederhana adalah yang paling setia menemani."', 
    colors: ['#C8B89A','#A89870'], 
    philosophy_short: 'Tali' 
  },
];

let cartCount = 0;
let activeFilter = 'semua';
let currentProduct = 0;

// ── NAVIGATION ──
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'catalog') renderCatalog();
}

function openDetail(idx) {
  currentProduct = idx;
  const p = products[idx];
  document.getElementById('detail-name').textContent = p.name;
  document.getElementById('detail-subtitle').textContent = p.variant;
  document.getElementById('detail-price').textContent = p.price;
  document.getElementById('detail-philosophy').textContent = p.philosophy;
  document.getElementById('detail-breadcrumb-name').textContent = p.philosophy_short;
  document.getElementById('qty-input').value = 1;

  // Ganti background gradient menjadi render GAMBAL RIIL di detail
  const main = document.getElementById('gallery-main');
  main.style.backgroundImage = `url('${p.image}')`;
  main.style.backgroundSize = 'cover';
  main.style.backgroundPosition = 'center';
  document.getElementById('gallery-label').textContent = ''; // Hapus text placeholder

  const stockEl = document.getElementById('detail-stock');
  if (p.stock === 'in') { stockEl.textContent = 'In Stock'; stockEl.className = 'product-stock in-stock'; }
  else if (p.stock === 'hampir') { stockEl.textContent = 'Hampir Habis'; stockEl.className = 'product-stock out-stock'; }
  else { stockEl.textContent = 'Out of Stock'; stockEl.className = 'product-stock out-stock'; }

  // Reset accordion
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
  
  // Update gambar mini thumbs dengan variasi crop gambar agar seolah angle berbeda
  document.querySelectorAll('.thumb').forEach((t, i) => {
    t.classList.toggle('active', i === 0);
    const inner = t.querySelector('.thumb-inner');
    inner.textContent = ''; // hapus teks
    inner.style.backgroundImage = `url('${p.image}')`;
    inner.style.backgroundSize = 'cover';
    inner.style.backgroundPosition = i === 1 ? 'top' : i === 2 ? 'bottom' : 'center';
  });

  showPage('detail');
}

// ── CATALOG ──
function renderCatalog(filter = activeFilter, search = '') {
  const grid = document.getElementById('catalog-grid');
  const searchLow = search.toLowerCase();
  const filtered = products.filter(p => {
    const matchFilter = filter === 'semua' || p.category === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(searchLow) || p.variant.toLowerCase().includes(searchLow);
    return matchFilter && matchSearch;
  });

  document.getElementById('catalog-count').textContent = `Menampilkan ${filtered.length} produk`;

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="openDetail(${p.id})">
      <div class="product-card-img">
        <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0;">
        <div class="product-img-hover" style="background:rgba(17,17,17,0.15); opacity: 0; display: flex; align-items: center; justify-content: center; position:absolute; inset:0; transition:0.3s;">
          <span class="product-img-icon" style="font-size:0.85rem; color:#fff; background:rgba(0,0,0,0.6); padding: 5px 12px; border-radius:20px;">Lihat Detail</span>
        </div>
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-name" style="font-family:'Playfair Display', serif; font-size: 1rem; font-weight: 500; margin-bottom: 0.3rem;">${p.name}</div>
        <div class="product-variant">${p.variant}</div>
        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <span class="product-stock ${p.stock === 'in' ? 'in-stock' : 'out-stock'}">${p.stock === 'in' ? 'In Stock' : p.stock === 'hampir' ? 'Hampir Habis' : 'Out of Stock'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function setFilter(filter, btn) {
  activeFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  filterProducts();
}

function filterProducts() {
  const q = document.getElementById('search-input')?.value || '';
  renderCatalog(activeFilter, q);
}

// ── ACCORDION ──
function toggleAccordion(item) {
  item.classList.toggle('open');
}

// ── THUMB CLICK ACTION ──
function selectThumb(idx, el) {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const p = products[currentProduct];
  const main = document.getElementById('gallery-main');
  
  // Simulasi angle dengan menggeser posisi background image
  main.style.backgroundImage = `url('${p.image}')`;
  main.style.backgroundPosition = idx === 1 ? 'top' : idx === 2 ? 'bottom' : 'center';
}

// ── QTY ──
function changeQty(delta) {
  const input = document.getElementById('qty-input');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 10) val = 10;
  input.value = val;
}

// ── CART ──
function addToCart() {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  const btn = document.querySelector('.btn-add-cart');
  btn.textContent = '✓ Ditambahkan';
  btn.style.background = '#3A5C4A';
  setTimeout(() => {
    btn.textContent = '+ Masukkan Keranjang';
    btn.style.background = '';
  }, 2000);
  showToast();
}

function showToast() {
  const t = document.getElementById('toast');
  const p = products[currentProduct];
  t.textContent = `"${p.philosophy_short}" ditambahkan ke keranjang ✓`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── INIT ──
renderCatalog();

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 40 ? '0 4px 30px rgba(17,17,17,0.06)' : 'none';
});