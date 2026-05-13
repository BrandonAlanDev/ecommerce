export const categories = [
  { id: 1, name: "Botines", subcategories: ["Tapones de Acero", "Tapones de Plástico"] },
  { id: 2, name: "Zapatillas de Papi", subcategories: ["Salón", "Césped Sintético"] },
  { id: 3, name: "Indumentaria", subcategories: ["Camisetas", "Shorts", "Conjuntos"] },
  { id: 4, name: "Accesorios", subcategories: ["Medias", "Canilleras", "Guantes"] },
];

export const products = [
  {
    id: 1,
    title: "Botines Nike Mercurial Vapor 15",
    category: "Botines",
    subcategory: "Tapones de Acero",
    price: 260000,
    rating: 4.9,
    image: ["https://http2.mlstatic.com/D_NQ_NP_847746-MLM88026441300_072025-O.webp", "https://www.stockcenter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw4e0601c9/products/NIDJ5631-700/NIDJ5631-700-2.JPG"],
    isNew: true,
    shipping: "Gratis"
  },
  {
    id: 2,
    title: "Adidas Predator Accuracy+",
    category: "Botines",
    subcategory: "Tapones de Plástico",
    price: 250000,
    rating: 4.8,
    image: ["https://assets.adidas.com/images/w_600,f_auto,q_auto/7a74238c9a054d1dbb4d069791c6dba9_9366/PREDATOR_ACCURACY.1_FG_Blanco_GZ0035_HM1.jpg"],
    isNew: false,
    shipping: "Gratis"
  },
  {
    id: 3,
    title: "Zapatillas Nike Tiempo Legend Indoor",
    category: "Zapatillas de Papi",
    subcategory: "Salón",
    price: 150000,
    rating: 4.7,
    image: ["https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw3ef1bbc8/products/NIDA1190-001/NIDA1190-001-1.JPG"],
    isNew: true,
    shipping: "Envío: $10"
  },
  {
    id: 4,
    title: "Adidas Copa Pure III Turf",
    category: "Zapatillas de Papi",
    subcategory: "Césped Sintético",
    price: 140000,
    rating: 4.8,
    image: ["https://images.prodirectsport.com/ProductImages/Main/1026199_Main_1916738.jpg"],
    isNew: false,
    shipping: "Gratis"
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Velocidad Profesional",
    subtitle: "Diseñados para romper líneas.",
    description: "Los nuevos botines de alto rendimiento ofrecen tracción, control y explosividad en cada jugada.",
    image: ["https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/global_radiant_blaze_main_pack_3_football_fw25_launch_pdp_banner_statement_16_d_9567afe76d.jpg"],
    ctaText: "Ver Botines",
    targetCategory: "Botines",
    theme: "dark"
  },
  {
    id: 2,
    title: "Dominá el Papi",
    subtitle: "Precisión en cada toque.",
    description: "Zapatillas diseñadas para fútbol 5 con máximo control, agarre y comodidad en superficies de salón y césped sintético.",
    image: ["https://www.uniminutoradio.com.co/wp-content/uploads/2017/08/FutsalaBelcor.jpg"],
    ctaText: "Ver Zapatillas",
    targetCategory: "Zapatillas de Papi",
    theme: "dark" 
  },
  {
    id: 3,
    title: "No te pongas limites",
    subtitle: "Rendimiento sin límites.",
    description: "Indumentaria deportiva de alto nivel para entrenar y competir con máxima comodidad.",
    image: ["https://mejorconsalud.as.com/wp-content/uploads/2021/12/corredor-pista-atletismo-e1730915758931.jpg"],
    ctaText: "Explorar Indumentaria",
    targetCategory: "Indumentaria",
    theme: "light"
  }
];