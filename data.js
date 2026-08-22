// Datos consolidados del Centro de Acopio - Eje Cafetero y Valle del Cauca
// Fuente: reporte escrito entregado el 2026-08-21.
// Pendiente: base de datos en Excel con personas atendidas y mercados entregados por lugar.

const DASHBOARD_DATA = {
  meta: {
    titulo: "Centro de Acopio Bajo Cuerda",
  },

  flota: [
    { tipo: "Camiones", cantidad: 31 },
    { tipo: "Tractomulas", cantidad: 9 },
    { tipo: "Camionetas", cantidad: 37 },
    { tipo: "Avión", cantidad: 1 },
  ],

  // Logro destacado del acopio: toneladas totales movilizadas por toda la flota.
  // Estimado por el equipo, no un dato medido con báscula.
  logros: [
    {
      nombre: "Bajo Cuerda",
      toneladasTotales: 500,
      porcentajeAlimentos: 56,
      etiquetaAlimentos: "alimentos y agua",
      nota: "56% = No perecederos (38%) + Agua (18%) del desglose real por categoría (ver sección 'Composición de la ayuda'). Estimado por el equipo del centro de acopio, no un peso medido con báscula.",
    },
  ],

  // Composición estimada de la ayuda recibida por categoría (fuente: table_v01.csv).
  // Total 500 t — mismo total que el logro "Bajo Cuerda".
  composicionAyuda: {
    totalToneladas: 500,
    categorias: [
      { categoria: "No perecederos", porcentaje: 38, toneladas: 190, comentario: "Sigue siendo el mayor volumen" },
      { categoria: "Agua", porcentaje: 18, toneladas: 90, comentario: "Muy pesada; 20% original era alto" },
      { categoria: "Mascotas", porcentaje: 15, toneladas: 75, comentario: "Alto, pero creíble por las rutas de refugios" },
      { categoria: "Aseo", porcentaje: 9, toneladas: 45, comentario: "" },
      { categoria: "Construcción", porcentaje: 7, toneladas: 35, comentario: "Herramientas pesan menos que bultos de comida" },
      { categoria: "Acomodación", porcentaje: 5, toneladas: 25, comentario: "Carpas/cobijas ocupan volumen, menos peso" },
      { categoria: "Bebés", porcentaje: 4, toneladas: 20, comentario: "" },
      { categoria: "Seguridad", porcentaje: 2.5, toneladas: 12.5, comentario: "Cascos, guantes, linternas = liviano" },
      { categoria: "Medicina", porcentaje: 1.5, toneladas: 7.5, comentario: "Muy liviana por peso" },
    ],
  },

  donaciones: [
    { plataforma: "PayPal", monto: 16345, moneda: "USD" },
    { plataforma: "Zelle", monto: 2150, moneda: "USD" },
    { plataforma: "Binance", monto: 1100, moneda: "USD" },
    { plataforma: "Whydonate", monto: 935, moneda: "USD" },
    { plataforma: "Bancolombia", monto: 22173482, moneda: "COP" },
    { plataforma: "Bre-B", monto: 6232859, moneda: "COP" },
  ],

  // Municipios / lugares donde se ha entregado o gestionado ayuda, por departamento.
  cobertura: [
    {
      departamento: "Caldas",
      lugares: ["Anserma", "Belalcázar", "Chinchiná", "Risaralda", "Viterbo", "San José"],
    },
    {
      departamento: "Risaralda",
      lugares: [
        "Pereira", "Dosquebradas", "La Virginia", "Marsella", "Apía",
        "Belén de Umbría", "Guática", "Santuario", "Balboa", "La Celia",
        "Pueblo Rico", "Mistrató", "Kemberdé",
      ],
    },
    {
      departamento: "Quindío",
      lugares: ["Armenia", "Calarcá", "Circasia", "Filandia", "Montenegro", "Quimbaya", "Salento"],
    },
    {
      departamento: "Valle del Cauca",
      lugares: [
        "Argelia", "Alcalá", "Ansermanuevo", "Buenaventura", "Cartago",
        "El Águila", "El Tambor", "El Villar", "Restrepo", "Roldanillo",
        "San Francisco", "Toro", "Ulloa", "Versalles", "Zarzal",
      ],
    },
    {
      departamento: "Chocó",
      lugares: ["San José del Palmar", "Santa Cecilia", "Villa Claret", "Tadó"],
    },
  ],

  // Desglose detallado dentro del municipio de Pereira (comunas y corregimientos).
  detallePereira: [
    "Todas las comunas", "Yarumal", "Arabia", "Altagracia",
    "Combia", "La Florida", "La Moladora Alta", "Morelia",
    "Puerto Caldas", "Cerritos", "Galicia", "Betulia", "San Vicente",
  ],

  // Coordenadas por lugar, para el mapa. approx:true = ubicación estimada
  // (nombre no identificado con certeza como cabecera municipal; puede ser
  // vereda/corregimiento) — se muestra distinto en el mapa, no como dato exacto.
  coordenadas: [
    { departamento: "Caldas", lugar: "Anserma", lat: 5.2350, lon: -75.7864 },
    { departamento: "Caldas", lugar: "Belalcázar", lat: 5.2181, lon: -75.8194 },
    { departamento: "Caldas", lugar: "Chinchiná", lat: 4.9836, lon: -75.6178 },
    { departamento: "Caldas", lugar: "Risaralda", lat: 5.1667, lon: -75.7833 },
    { departamento: "Caldas", lugar: "Viterbo", lat: 5.0667, lon: -75.8667 },
    { departamento: "Caldas", lugar: "San José", lat: 5.1500, lon: -75.7500, approx: true },

    { departamento: "Risaralda", lugar: "Pereira", lat: 4.8087, lon: -75.6906 },
    { departamento: "Risaralda", lugar: "Puerto Caldas", lat: 4.8700, lon: -75.8500 },
    { departamento: "Risaralda", lugar: "Cerritos", lat: 4.8000, lon: -75.7700 },
    { departamento: "Risaralda", lugar: "Galicia", lat: 4.8300, lon: -75.8000, approx: true },
    { departamento: "Risaralda", lugar: "Betulia", lat: 4.7800, lon: -75.8300, approx: true },
    { departamento: "Risaralda", lugar: "San Vicente", lat: 4.7600, lon: -75.8000, approx: true },
    { departamento: "Risaralda", lugar: "Dosquebradas", lat: 4.8339, lon: -75.6711 },
    { departamento: "Risaralda", lugar: "La Virginia", lat: 4.8994, lon: -75.8814 },
    { departamento: "Risaralda", lugar: "Marsella", lat: 4.9394, lon: -75.7364 },
    { departamento: "Risaralda", lugar: "Apía", lat: 5.1058, lon: -75.9433 },
    { departamento: "Risaralda", lugar: "Belén de Umbría", lat: 5.1994, lon: -75.8683 },
    { departamento: "Risaralda", lugar: "Guática", lat: 5.3000, lon: -75.8167 },
    { departamento: "Risaralda", lugar: "Santuario", lat: 5.0167, lon: -75.9667 },
    { departamento: "Risaralda", lugar: "Balboa", lat: 4.9494, lon: -75.9539 },
    { departamento: "Risaralda", lugar: "La Celia", lat: 5.0064, lon: -76.0806 },
    { departamento: "Risaralda", lugar: "Pueblo Rico", lat: 5.2167, lon: -76.0333 },
    { departamento: "Risaralda", lugar: "Mistrató", lat: 5.3000, lon: -75.8833 },
    { departamento: "Risaralda", lugar: "Kemberdé", lat: 5.2800, lon: -76.0200, approx: true },

    { departamento: "Quindío", lugar: "Armenia", lat: 4.5339, lon: -75.6811 },
    { departamento: "Quindío", lugar: "Calarcá", lat: 4.5303, lon: -75.6437 },
    { departamento: "Quindío", lugar: "Circasia", lat: 4.6167, lon: -75.6333 },
    { departamento: "Quindío", lugar: "Filandia", lat: 4.6739, lon: -75.6636 },
    { departamento: "Quindío", lugar: "Montenegro", lat: 4.5667, lon: -75.7500 },
    { departamento: "Quindío", lugar: "Quimbaya", lat: 4.6231, lon: -75.7625 },
    { departamento: "Quindío", lugar: "Salento", lat: 4.6375, lon: -75.5703 },

    { departamento: "Valle del Cauca", lugar: "Argelia", lat: 4.7167, lon: -76.0667 },
    { departamento: "Valle del Cauca", lugar: "Alcalá", lat: 4.6717, lon: -75.7825 },
    { departamento: "Valle del Cauca", lugar: "Ansermanuevo", lat: 4.7897, lon: -75.9942 },
    { departamento: "Valle del Cauca", lugar: "Buenaventura", lat: 3.8801, lon: -77.0312 },
    { departamento: "Valle del Cauca", lugar: "Cartago", lat: 4.7458, lon: -75.9142 },
    { departamento: "Valle del Cauca", lugar: "El Águila", lat: 4.9167, lon: -75.9833 },
    { departamento: "Valle del Cauca", lugar: "El Tambor", lat: 4.9000, lon: -76.0000, approx: true },
    { departamento: "Valle del Cauca", lugar: "El Villar", lat: 4.6000, lon: -76.1800, approx: true },
    { departamento: "Valle del Cauca", lugar: "Restrepo", lat: 3.8236, lon: -76.5222 },
    { departamento: "Valle del Cauca", lugar: "Roldanillo", lat: 4.4147, lon: -76.1522 },
    { departamento: "Valle del Cauca", lugar: "San Francisco", lat: 4.8500, lon: -76.0500, approx: true },
    { departamento: "Valle del Cauca", lugar: "Toro", lat: 4.6103, lon: -76.0783 },
    { departamento: "Valle del Cauca", lugar: "Ulloa", lat: 4.6975, lon: -75.7625 },
    { departamento: "Valle del Cauca", lugar: "Versalles", lat: 4.5711, lon: -76.1936 },
    { departamento: "Valle del Cauca", lugar: "Zarzal", lat: 4.3958, lon: -76.0839 },

    { departamento: "Chocó", lugar: "San José del Palmar", lat: 4.9833, lon: -76.2333 },
    { departamento: "Chocó", lugar: "Santa Cecilia", lat: 5.2000, lon: -76.1000, approx: true },
    { departamento: "Chocó", lugar: "Villa Claret", lat: 5.0000, lon: -76.2800, approx: true },
    { departamento: "Chocó", lugar: "Tadó", lat: 5.2667, lon: -76.5667 },
  ],
};
