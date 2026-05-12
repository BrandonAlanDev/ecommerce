export const categories = [
  { id: 1, name: "Tablas", subcategories: ["Shortboards", "Longboards", "Funboards", "Evolutivas"] },
  { id: 2, name: "Wetsuits", subcategories: ["3/2 mm", "4/3 mm", "Accesorios Neoprene", "Lycras"] },
  { id: 3, name: "Accesorios", subcategories: ["Quillas", "Leashes", "Fundas", "Parafina"] },
  { id: 4, name: "Indumentaria", subcategories: ["Remeras", "Bermudas", "Buzos", "Gorros"] },
];

export const products = [
  {
    id: 1,
    title: "Tabla Lost Driver 3.0 Pro",
    category: "Tablas",
    subcategory: "Shortboards",
    price: 850000,
    rating: 4.9,
    image: ["https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=1000&auto=format&fit=crop"],
    isNew: true,
    shipping: "Gratis"
  },
  {
    id: 2,
    title: "Wetsuit Rip Curl Flashbomb 4/3 Chest Zip",
    category: "Wetsuits",
    subcategory: "4/3 mm",
    price: 420000,
    rating: 4.8,
    image: ["/images/products/traje.jpg"],
    isNew: true,
    shipping: "Gratis"
  },
  {
    id: 3,
    title: "Quillas FCS II Mick Fanning PC Thruster",
    category: "Accesorios",
    subcategory: "Quillas",
    price: 125000,
    rating: 4.7,
    image: [""],
    isNew: false,
    shipping: "Envío: $5500"
  },
  {
    id: 4,
    title: "Leash Creatures of Leisure Pro 6'",
    category: "Accesorios",
    subcategory: "Leashes",
    price: 45000,
    rating: 4.8,
    image: [""],
    isNew: false,
    shipping: "Gratis"
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "New Surf Board",
    subtitle: "Personalizado.",
    description: "Crea tu propia tabla.",
    image: ["images/new.jpg"],
    ctaText: "Contactanos",
    targetCategory: "Tablas",
    theme: "dark"
  },
  {
    id: 2,
    title: "Indumentaria",
    subtitle: "Nuestro estilo.",
    description: "Encontrá las mejores indumentaria surfera.",
    image: ["https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop"],
    ctaText: "Ver Indumentaria",
    targetCategory: "Indumentaria",
    theme: "dark"
  }
  , {
    id: 3,
    title: "Accesorios",
    subtitle: "Accesorios de alta calidad.",
    description: "Encontrá los mejores accesorios.",
    image: ["https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop"],
    ctaText: "Ver Accesorios",
    targetCategory: "Accesorios",
    theme: "dark"
  },
   {
    id: 4,
    title: "Trajes",
    subtitle: "Equipamiento de alto rendimiento.",
    description: "",
    image: ["images/products/traje.jpg"],
    ctaText: "Ver Trajes",
    targetCategory: "Trajes",
    theme: "dark"
  }
];