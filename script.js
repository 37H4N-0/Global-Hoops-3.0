const shoeDatabase = [
  { id: 1, brand: "NIKE", name: "Kobe 5 Protro 'Eggplant'", releaseDate: "March 28, 2026 10:00:00", price: 200, hype: 5, img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e4e04410-d9d1-4475-bed0-6e4a2c918e6c/kobe-5-protro-basketball-shoe-9J0v9T.png", tech: "Zoom Turbo", desc: "A legendary return of the Mamba classic with modern performance upgrades." },
  { id: 2, brand: "ADIDAS", name: "AE1 Velocity Blue", releaseDate: "April 05, 2026 10:00:00", price: 120, hype: 4, img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7f6517a618e04099a43e49e061c27df6_9366/AE_1_Velocity_Blue_Shoes_Blue_IF1864_01_standard.jpg", tech: "Jet Boost", desc: "Anthony Edwards' first signature, built for explosive verticality and speed." },
  { id: 3, brand: "JORDAN", name: "Luka 3 'Midnight'", releaseDate: "March 20, 2026 10:00:00", price: 130, hype: 3, img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/609426f3-8f0c-4e5a-8b38-d7a8d9a4242d/luka-2-basketball-shoes-v4V9L6.png", tech: "IsoPlate", desc: "Crafted specifically for Luka Dončić's deceleration and space-creation style." },
  { id: 4, brand: "NEW BALANCE", name: "Kawhi 4 'Pinkman'", releaseDate: "April 12, 2026 10:00:00", price: 165, hype: 3, img: "https://nb.scene7.com/is/image/NB/bbklsp1_nb_02_i?$pdp_main_v4_lg$&wid=700&hei=700", tech: "Energy Arc", desc: "The ultimate tool for the two-way superstar, focusing on mid-range dominance." },
  { id: 5, brand: "UNDER ARMOUR", name: "Curry 12 'Flow'", releaseDate: "April 15, 2026 10:00:00", price: 160, hype: 4, img: "https://underarmour.scene7.com/is/image/UnderArmour/3026620-100_DEFAULT?wid=566&hei=708", tech: "UA Flow", desc: "Elite traction and court feel for the greatest shooter in NBA history." },
  { id: 6, brand: "ANTA", name: "Kai 1 'Enlightened'", releaseDate: "March 18, 2026 10:00:00", price: 125, hype: 5, img: "https://images.complex.com/complex/images/c_fill,f_auto,g_center,w_1200/fl_lossy,pg_1/v9qjvz6j8f5m7k4n5o9d/anta-kai-1-artist-on-court", tech: "NitroEdge", desc: "Kyrie Irving's artistic expression through footwear, featuring carbon fiber plates." }
];

function renderShoes() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const priceLimit = document.getElementById('price-filter').value;
  const futureGrid = document.getElementById('future-grid');
  const recentGrid = document.getElementById('recent-grid');
  
  futureGrid.innerHTML = ''; recentGrid.innerHTML = '';
  const now = new Date().getTime();

  const filtered = shoeDatabase.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm) || s.brand.toLowerCase().includes(searchTerm);
    const matchesPrice = priceLimit === 'all' || s.price <= parseInt(priceLimit);
    return matchesSearch && matchesPrice;
  });

  filtered.forEach(shoe => {
    const isFuture = new Date(shoe.releaseDate).getTime() > now;
    const card = document.createElement('div');
    card.className = 'shoe-card';
    card.onclick = () => openModal(shoe);
    
    const tag = isFuture ? `<div id="t-${shoe.id}" class="timer-box">00:00:00</div>` : `<div class="status-label">RELEASED</div>`;
    const hypeFlames = "🔥".repeat(shoe.hype);
    
    card.innerHTML = `
      <div class="image-container"><img src="${shoe.img}"></div>
      <div class="hype-meter">${hypeFlames}</div>
      <div class="brand-label">${shoe.brand}</div>
      ${tag}
      <div class="shoe-name">${shoe.name}</div>
      <div class="shoe-price">$${shoe.price}</div>
    `;
    
    if (isFuture) { 
      futureGrid.appendChild(card); 
      startTimer(shoe.releaseDate, `t-${shoe.id}`); 
    } else { 
      recentGrid.appendChild(card); 
    }
  });
}

function startTimer(date, id) {
  const target = new Date(date).getTime();
  const timer = setInterval(() => {
    const diff = target - new Date().getTime();
    if (diff < 0) { clearInterval(timer); return; }
    const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4), s = Math.floor((diff % 6e4) / 1000);
    const el = document.getElementById(id);
    if (el) el.innerText = `${d}D:${h}H:${m}M:${s}S`;
  }, 1000);
}

function openModal(shoe) {
  const m = document.getElementById('modal');
  const now = new Date().getTime();
  const isFuture = new Date(shoe.releaseDate).getTime() > now;
  const shopUrl = `https://stockx.com/search?s=${encodeURIComponent(shoe.name)}`;
  
  document.body.classList.add('modal-open');

  const actionBtn = isFuture 
    ? `<button class="notify-btn">NOTIFY ON RELEASE</button>`
    : `<a href="${shopUrl}" target="_blank" class="buy-btn">SHOP ON STOCKX / GOAT</a>`;

  document.getElementById('modal-body').innerHTML = `
    <img src="${shoe.img}" style="width:100%; filter: drop-shadow(0 30px 60px rgba(0,0,0,0.15));">
    <div class="modal-info">
      <p style="color:var(--accent); font-weight:900;">${shoe.brand} // HYPE: ${"🔥".repeat(shoe.hype)}</p>
      <h2>${shoe.name}</h2>
      <p class="modal-desc">${shoe.desc}</p>
      <div style="border-top: 1px solid var(--border); padding-top: 25px;">
        <p><strong>MSRP:</strong> $${shoe.price}</p>
        <p><strong>ENGINEERING:</strong> ${shoe.tech}</p>
      </div>
      ${actionBtn}
    </div>`;
  m.style.display = "block";
}

document.getElementById('theme-toggle').onclick = () => {
  document.body.classList.toggle('dark-theme');
  document.getElementById('theme-toggle').innerText = document.body.classList.contains('dark-theme') ? "LIGHT MODE" : "DARK MODE";
};

document.getElementById('search-bar').oninput = renderShoes;
document.getElementById('price-filter').onchange = renderShoes;

document.querySelector('.modal-close').onclick = () => {
  document.getElementById('modal').style.display = "none";
  document.body.classList.remove('modal-open');
};

setInterval(() => { 
  document.getElementById('live-clock').innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}); 
}, 1000);

renderShoes();
