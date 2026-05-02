import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const LocationSection = () => {
  return (
    <section id="ubicacion" className="relative py-16 w-full mx-auto overflow-hidden">
      
      {/* --- Fondo Decorativo (Igual que el Banner) --- */}
      {/* Nota: Asumimos que el fondo de la pagina es claro, asi que le ponemos un fondo oscuro a la seccion 
          o dejamos que las tarjetas sean oscuras. Aquí hago que la sección tenga fondo oscuro para maximo impacto. */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-bold tracking-wider text-xs uppercase mb-2 block">
            Encuéntranos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Nuestra Ubicación
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
            Visita nuestro local y descubre nuestra selección de productos de alta calidad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Columna de Información */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 flex flex-col justify-center"
          >
            {/* Card 1: Dirección */}
            <div className="group flex gap-5 p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <MapPin className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Showroom Principal</h3>
                <p className="text-slate-400 font-light">Av. del Libertador 1234, CABA</p>
                <p className="text-slate-500 text-sm mt-1">Piso 2, Oficina 204</p>
              </div>
            </div>

            {/* Card 2: Contacto */}
            <div className="group flex gap-5 p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <Phone className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Contacto Directo</h3>
                <p className="text-slate-400 font-light">+54 459 123 4567</p>
                <p className="text-slate-500 text-sm mt-1">ventas@botines.com</p>
              </div>
            </div>

            {/* Card 3: Horarios */}
            <div className="group flex gap-5 p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Clock className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Horarios de Atención</h3>
                <div className="flex justify-between gap-8">
                  <span className="text-slate-400 font-light">Lun - Vie</span>
                  <span className="text-white font-medium">9:00 - 20:00</span>
                </div>
                <div className="flex justify-between gap-8 mt-1">
                  <span className="text-slate-400 font-light">Sábados</span>
                  <span className="text-white font-medium">10:00 - 14:00</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna del Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full min-h-[400px]"
          >
            <div className="h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 relative group">
              {/* Overlay gradiente sobre el mapa para integrarlo al modo oscuro */}
              <div className="absolute inset-0 pointer-events-none bg-indigo-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889453!2d-58.38157048477038!3d-34.60373888045939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses!2sar!4v1625684385921!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  // Truco CSS para invertir colores del mapa y hacerlo "Dark Mode"
                  filter: "invert(90%) hue-rotate(180deg) contrast(90%) grayscale(20%)" 
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación TechStore"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
           <div className="pt-2 text-center text-slate-400 text-sm">
             © 2026 Deportes
           </div>
      </div>
    </section>
  );
}

export default LocationSection;
