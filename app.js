function fmt(n) {
  return n.toLocaleString("es-CO");
}

function renderKPIs() {
  const totalLugares = DASHBOARD_DATA.cobertura.reduce((a, d) => a + d.lugares.length, 0);
  const totalDeptos = DASHBOARD_DATA.cobertura.length;
  const usdTotal = DASHBOARD_DATA.donaciones.filter(d => d.moneda === "USD").reduce((a, d) => a + d.monto, 0);
  const copTotal = DASHBOARD_DATA.donaciones.filter(d => d.moneda === "COP").reduce((a, d) => a + d.monto, 0);

  const kpis = [
    { value: totalLugares, label: "Municipios / lugares atendidos" },
    { value: totalDeptos, label: "Departamentos con cobertura" },
    { value: `US$ ${fmt(usdTotal)}`, label: "Recaudado en USD (4 plataformas)", note: "Saldo actual donaciones recibidas" },
    { value: `$ ${fmt(copTotal)}`, label: "Recaudado en COP (2 plataformas)", note: "Saldo actual donaciones recibidas" },
  ];

  document.getElementById("kpi-grid").innerHTML = kpis.map(k => `
    <div class="kpi">
      <div class="value">${k.value}</div>
      <div class="label">${k.label}</div>
      ${k.note ? `<div class="kpi-note">${k.note}</div>` : ""}
    </div>
  `).join("");
}

const FLEET_EMOJI = {
  "Camiones": "🚛",
  "Tractomulas": "🚚",
  "Camionetas": "🛻",
  "Avión": "✈️",
};

function renderFlota() {
  document.getElementById("flota-chart").innerHTML = `<div class="fleet-grid">` +
    DASHBOARD_DATA.flota.map(f => `
      <div class="fleet-card">
        <div class="fleet-emoji">${FLEET_EMOJI[f.tipo] || "🚗"}</div>
        <div class="fleet-value">${f.cantidad}</div>
        <div class="fleet-label">${f.tipo}</div>
      </div>
    `).join("") +
  `</div>`;
}

const RECON_EMOJI = {
  "Casas construidas": "🏠",
  "Cocina comunitaria": "🍲",
  "Aula educativa": "📚",
  "Pisos": "🧱",
  "Techos": "🏗️",
};

function renderReconstruccion() {
  document.getElementById("reconstruccion-chart").innerHTML = `<div class="fleet-grid">` +
    DASHBOARD_DATA.reconstruccion.map(r => `
      <div class="fleet-card">
        <div class="fleet-emoji">${RECON_EMOJI[r.tipo] || "🔨"}</div>
        <div class="fleet-value">${r.cantidad}</div>
        <div class="fleet-label">${r.tipo}</div>
      </div>
    `).join("") +
  `</div>`;
}

function renderCobertura() {
  const max = Math.max(...DASHBOARD_DATA.cobertura.map(d => d.lugares.length));
  document.getElementById("cobertura-chart").innerHTML = DASHBOARD_DATA.cobertura
    .slice()
    .sort((a, b) => b.lugares.length - a.lugares.length)
    .map(d => `
      <div class="bar-row">
        <div>${d.departamento}</div>
        <div class="bar-track"><div class="bar-fill alt" style="width:${(d.lugares.length / max * 100).toFixed(1)}%"></div></div>
        <div class="bar-value">${d.lugares.length}</div>
      </div>
    `).join("");
}

function renderDonaciones() {
  document.getElementById("donation-grid").innerHTML = DASHBOARD_DATA.donaciones.map(d => `
    <div class="donation-card">
      <div class="platform">${d.plataforma}</div>
      <div class="amount">${d.moneda === "USD" ? "US$" : "$"} ${fmt(d.monto)}</div>
      <span class="tag ${d.moneda.toLowerCase()}">${d.moneda}</span>
    </div>
  `).join("");

  const usdTotal = DASHBOARD_DATA.donaciones.filter(d => d.moneda === "USD").reduce((a, d) => a + d.monto, 0);
  const copTotal = DASHBOARD_DATA.donaciones.filter(d => d.moneda === "COP").reduce((a, d) => a + d.monto, 0);

  document.getElementById("donation-subtotals").innerHTML = `
    <div class="subtotal">Subtotal plataformas en USD <b>US$ ${fmt(usdTotal)}</b></div>
    <div class="subtotal">Subtotal plataformas en COP <b>$ ${fmt(copTotal)}</b></div>
  `;
}

function renderGeografia() {
  document.getElementById("coverage-grid").innerHTML = DASHBOARD_DATA.cobertura.map(d => `
    <div class="dept-card">
      <div class="dept-head">
        <h3>${d.departamento}</h3>
        <span class="count-badge">${d.lugares.length} lugares</span>
      </div>
      <div class="chip-list">
        ${d.lugares.map(l => `<span class="chip${l === "Pereira" ? " highlight" : ""}">${l}</span>`).join("")}
      </div>
      ${d.departamento === "Risaralda" ? `
        <div class="pereira-detail">
          <p>Detalle dentro de Pereira (comunas / corregimientos):</p>
          <div class="chip-list">
            ${DASHBOARD_DATA.detallePereira.map(c => `<span class="chip">${c}</span>`).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `).join("");
}

function renderLogros() {
  const section = document.getElementById("logros-section");
  section.innerHTML = DASHBOARD_DATA.logros.map(l => {
    const alimentos = Math.round(l.toneladasTotales * l.porcentajeAlimentos / 100);
    const otros = l.toneladasTotales - alimentos;
    return `
      <div class="achievement-card">
        <div class="achievement-body">
          <div class="achievement-kicker">Logro del acopio</div>
          <h2 class="achievement-name">${l.nombre}</h2>
          <div class="achievement-value">${fmt(l.toneladasTotales)} <span>toneladas movilizadas</span></div>
          <div class="achievement-split">
            <div class="split-bar">
              <div class="split-fill" style="width:${l.porcentajeAlimentos}%"></div>
            </div>
            <div class="split-legend">
              <span><b>${l.porcentajeAlimentos}%</b> ${l.etiquetaAlimentos || "alimentos"} (~${fmt(alimentos)} t)</span>
              <span><b>${100 - l.porcentajeAlimentos}%</b> otros (~${fmt(otros)} t)</span>
            </div>
          </div>
          <p class="achievement-note">${l.nota}</p>
        </div>
      </div>
    `;
  }).join("");
}

function renderComposicion() {
  const c = DASHBOARD_DATA.composicionAyuda;
  const max = Math.max(...c.categorias.map(cat => cat.porcentaje));
  document.getElementById("composicion-chart").innerHTML = `<div class="comp-grid">` +
    c.categorias.map(cat => `
      <div class="comp-card">
        <div class="comp-cat">${cat.categoria}</div>
        <div class="comp-pct">${cat.porcentaje}%<span class="comp-tons">${fmt(cat.toneladas)} t</span></div>
        <div class="bar-track"><div class="bar-fill alt" style="width:${cat.porcentaje / max * 100}%"></div></div>
      </div>
    `).join("") +
  `</div><p class="note">Total estimado: ${fmt(c.totalToneladas)} toneladas.</p>`;
}

const DEPT_COLORS = {
  "Caldas": "#7a4b1e",
  "Risaralda": "#4b7f52",
  "Quindío": "#b5822c",
  "Valle del Cauca": "#2f6fa8",
  "Chocó": "#7a3ec1",
};

function renderMapa() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") {
    if (mapEl) mapEl.innerHTML = '<p style="padding:16px;color:var(--ink-soft)">No se pudo cargar el mapa (sin conexión a internet).</p>';
    return;
  }

  const map = L.map("map", { scrollWheelZoom: false }).setView([4.9, -76.0], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map);

  DASHBOARD_DATA.coordenadas.forEach(p => {
    const color = DEPT_COLORS[p.departamento] || "#555";
    const marker = L.circleMarker([p.lat, p.lon], {
      radius: p.approx ? 7 : 8,
      color,
      weight: p.approx ? 2 : 1,
      dashArray: p.approx ? "3,3" : null,
      fillColor: color,
      fillOpacity: p.approx ? 0.25 : 0.85,
    }).addTo(map);

    marker.bindPopup(`
      <b>${p.lugar}</b><br/>
      ${p.departamento}
      ${p.approx ? "<br/><i>Ubicación aproximada</i>" : ""}
    `);
  });

  document.getElementById("map-legend").innerHTML = Object.entries(DEPT_COLORS).map(([dep, color]) => `
    <span class="legend-item"><span class="legend-dot" style="background:${color}"></span>${dep}</span>
  `).join("") + `<span class="legend-item"><span class="legend-dot approx"></span>Ubicación aproximada</span>`;
}

function renderHeader() {
  document.getElementById("main-title").textContent = DASHBOARD_DATA.meta.titulo;
}

renderHeader();
renderKPIs();
renderFlota();
renderReconstruccion();
renderLogros();
renderComposicion();
renderCobertura();
renderDonaciones();
renderMapa();
renderGeografia();
