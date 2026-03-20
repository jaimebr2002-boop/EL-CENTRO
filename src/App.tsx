import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Award, 
  Dog, 
  Accessibility, 
  Car, 
  Compass, 
  Droplets, 
  Utensils, 
  Package,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { Logo, Divider } from './components/BrandAssets';
import { MENU_DATA, REVIEWS } from './constants';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(Object.keys(MENU_DATA)[0]);
  const [reviewPage, setReviewPage] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewPage((prev) => (prev + 1) % 5);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const reviewsPerPage = 3;
  const currentReviews = REVIEWS.slice(reviewPage * reviewsPerPage, (reviewPage + 1) * reviewsPerPage);

  return (
    <div className="min-h-screen selection:bg-brand-lime selection:text-brand-bone">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-cream/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('inicio')}>
            <Logo className="h-10 w-auto mr-3" />
            <span className={`font-serif text-xl font-bold hidden sm:block ${scrolled ? 'text-brand-green' : 'text-brand-bone'}`}>
              El Centro
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Inicio', 'Nosotros', 'La Carta', 'Reseñas', 'Visítanos'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                className={`font-serif text-lg transition-colors hover:text-brand-wine ${scrolled ? 'text-brand-earth' : 'text-brand-bone'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('reservar')}
              className="bg-brand-wine text-brand-bone px-6 py-2 rounded-full font-serif text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Reservar ahora
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-brand-bone" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? 'text-brand-earth' : 'text-brand-bone'} /> : <MenuIcon className={scrolled ? 'text-brand-earth' : 'text-brand-bone'} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-brand-cream shadow-xl md:hidden py-6 px-4 flex flex-col space-y-4"
            >
              {['Inicio', 'Nosotros', 'La Carta', 'Reseñas', 'Visítanos', 'Reservar'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                  className="font-serif text-2xl text-brand-earth text-left border-b border-brand-wood/20 pb-2"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="inicio" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029518/Gemini_Generated_Image_ugtgh3ugtgh3ugtg_cleanup_jewx94.png" 
            alt="Sidrería Tapería El Centro Hero" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-sepia-[0.2]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-brand-lime/20 backdrop-blur-sm border border-brand-lime/30 text-brand-lime px-4 py-1 rounded-full mb-6">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm font-bold uppercase tracking-widest">Travellers' Choice TripAdvisor</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-brand-bone font-serif mb-6 leading-tight">
              La mejor cocina asturiana <br />
              <span className="italic text-brand-wood">entre Cudillero y El Pito</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-bone/90 font-sans mb-10 max-w-2xl mx-auto">
              Cachopo, sidra escanciada y sabores de siempre — en Aroncés, frente al Palacio de Selgas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo('la-carta')} className="btn-primary w-full sm:w-auto">
                Ver la carta
              </button>
              <button onClick={() => scrollTo('reservar')} className="btn-secondary !text-brand-bone !border-brand-bone hover:!bg-brand-bone hover:!text-brand-green w-full sm:w-auto">
                Reservar mesa
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-bone cursor-pointer"
          onClick={() => scrollTo('nosotros')}
        >
          <ChevronLeft className="rotate-270 w-8 h-8" />
        </motion.div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section id="nosotros" className="py-24 px-4 bg-brand-bone relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green mb-8">
              Un sitio de los que <br />
              <span className="italic text-brand-wine">ya no abundan</span>
            </h2>
            <div className="space-y-6 text-lg text-brand-earth leading-relaxed">
              <p>
                En Sidrería Tapería El Centro no encontrarás artificios. Encontrarás una cazuela de la casa que te dejará sin palabras, un cachopo que lleva camino de ser el mejor que hayas probado, y un equipo que te trata como si llevaras años siendo cliente.
              </p>
              <p>
                Estamos en Aroncés, a un paso de Cudillero y frente al Palacio de Selgas — lejos del bullicio turístico, cerca de lo que Asturias tiene de mejor.
              </p>
              <p className="font-serif italic text-2xl text-brand-wood">
                "Mihai, Vasi y todo el equipo llevan años volcados en un único objetivo: que salgas queriendo volver."
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Award, text: "TripAdvisor Choice" },
                { icon: Dog, text: "Pet Friendly" },
                { icon: Accessibility, text: "Acceso Adaptado" },
                { icon: Car, text: "Parking Fácil" },
                { icon: Compass, text: "Camino Santiago" },
                { icon: Droplets, text: "Sidra Escanciada" },
                { icon: Utensils, text: "Sin Gluten" },
                { icon: Package, text: "Para Llevar" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center mb-2 group-hover:bg-brand-lime transition-colors">
                    <item.icon className="w-6 h-6 text-brand-green group-hover:text-brand-bone" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-tighter text-brand-earth/70">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-brand-bone rotate-2">
              <img 
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029914/484074376_678142758108672_6673258461000152715_n_vufht8.jpg" 
                alt="Sidrería Tapería El Centro - Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* LA CARTA */}
      <section id="la-carta" className="py-24 px-4 bg-brand-cream">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-green mb-4">Lo que ponemos en tu mesa</h2>
          <p className="text-xl text-brand-wood italic">Producto fresco, cocina casera, raciones generosas</p>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(MENU_DATA).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full font-serif text-lg transition-all ${activeTab === cat ? 'bg-brand-green text-brand-bone shadow-lg' : 'bg-brand-bone text-brand-earth hover:bg-brand-wood/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-x-12 gap-y-8 bg-brand-bone p-8 md:p-12 rounded-3xl shadow-xl border border-brand-wood/10"
          >
            {MENU_DATA[activeTab as keyof typeof MENU_DATA].map((item, i) => (
              <div key={i} className="flex justify-between items-start group">
                <div className="flex-1 pr-4">
                  <h4 className="text-xl font-serif text-brand-earth group-hover:text-brand-wine transition-colors">{item.name}</h4>
                  {item.desc && <p className="text-sm text-brand-earth/60 italic mt-1">{item.desc}</p>}
                </div>
                <div className="flex items-center">
                  <div className="h-px w-8 bg-brand-wood/20 mx-2 hidden sm:block"></div>
                  <span className="font-serif text-xl text-brand-green font-bold whitespace-nowrap">{item.price}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Facebook Menu Link */}
          <div className="mt-16 bg-brand-green text-brand-bone p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-serif mb-2">¿Buscas el menú del día?</h3>
              <p className="opacity-80">Lo publicamos cada mañana en nuestro Facebook con los platos más frescos.</p>
            </div>
            <a 
              href="https://www.facebook.com/p/Sidreria-taperia-El-Centro-100077388619804/" 
              target="_blank" 
              className="bg-brand-bone text-brand-green px-8 py-3 rounded-full font-bold flex items-center hover:scale-105 transition-transform"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Ver menú en Facebook
            </a>
          </div>
        </div>

        {/* Gallery */}
        <div className="max-w-7xl mx-auto mt-24">
          <h3 className="text-3xl font-serif text-center mb-12">Así se ve nuestra cocina</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029544/611035714_915357414387204_1752376344800683335_n_qpcbws.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029544/561352346_853638427225770_5346895364146334039_n_ma9rxl.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029543/485061291_685652190691062_3635042120808299596_n_yaylrm.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029543/485150526_685652220691059_3377865536134700018_n_p68f0q.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029543/485148002_685652320691049_3883452507168592074_n_v1u2rb.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1774029542/481183951_671682675421347_2899799927888281050_n_tbfzlt.jpg"
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img src={img} alt="Plato" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section id="reseñas" className="py-24 px-4 bg-brand-bone relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green mb-4">Lo que dicen quienes ya nos conocen</h2>
            <p className="text-xl text-brand-wood italic">Más de 200 reseñas. Una sola conclusión: volver.</p>
          </div>

          <div className="relative overflow-hidden px-4 md:px-12">
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {currentReviews.map((review, i) => (
                  <motion.div
                    key={`${reviewPage}-${i}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-brand-cream p-8 rounded-2xl border-l-8 border-brand-wine shadow-lg flex flex-col h-full"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-brand-wine text-brand-bone flex items-center justify-center font-serif text-xl mr-4">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-earth">{review.name}</h4>
                        <div className="flex text-brand-lime">
                          {[...Array(review.stars)].map((_, s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-brand-earth/80 italic mb-6 flex-grow">"{review.text}"</p>
                    <span className="text-xs text-brand-wood uppercase font-bold tracking-widest">{review.date}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-12 gap-4">
              <button 
                onClick={() => setReviewPage((prev) => (prev - 1 + 5) % 5)}
                className="p-2 rounded-full bg-brand-green text-brand-bone hover:bg-brand-wine transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setReviewPage(i)}
                    className={`w-3 h-3 rounded-full transition-all ${reviewPage === i ? 'bg-brand-wine w-8' : 'bg-brand-wood/30'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setReviewPage((prev) => (prev + 1) % 5)}
                className="p-2 rounded-full bg-brand-green text-brand-bone hover:bg-brand-wine transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
            <a 
              href="https://www.google.com/maps/place/Sidrer%C3%ADa+Taperia+El+Centro/@43.5495959,-6.1560396,15z/data=!4m8!3m7!1s0xd36a3e208fa3fff:0x8f86243c4c1603aa!8m2!3d43.5495818!4d-6.1375856!9m1!1b1!16s%2Fg%2F11dxj0xt25?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank"
              className="flex items-center justify-center bg-white border border-gray-200 px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Star className="w-5 h-5 text-yellow-400 mr-2 fill-current" />
              <span className="font-bold">Dejar reseña en Google Maps</span>
            </a>
            <a 
              href="https://www.tripadvisor.es/UserReviewEdit-g608996-d23856881-Sidreria_Taperia_El_Centro-Cudillero_Asturias.html" 
              target="_blank"
              className="flex items-center justify-center bg-[#00AF87] text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Award className="w-5 h-5 mr-2" />
              <span className="font-bold">Dejar reseña en TripAdvisor</span>
            </a>
          </div>
        </div>
      </section>

      {/* VISÍTANOS */}
      <section id="visítanos" className="py-24 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green mb-4">¿Cómo llegar?</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl h-[500px] border-8 border-brand-bone relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.432857418924!2d-6.13977422340864!3d43.54958567912497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd36a3e208fa3fff%3A0x8f86243c4c1603aa!2sSidrer%C3%ADa%20Taperia%20El%20Centro!5e0!3m2!1ses!2ses!4v1710950000000!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Ubicación Sidrería El Centro"
              ></iframe>
              <a 
                href="https://www.google.com/maps/place/Sidrer%C3%ADa+Taperia+El+Centro/@43.5495959,-6.1560396,15z/data=!3m1!4b1!4m6!3m5!1s0xd36a3e208fa3fff:0x8f86243c4c1603aa!8m2!3d43.5495818!4d-6.1375856!16s%2Fg%2F11dxj0xt25?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="absolute bottom-4 right-4 bg-brand-wine text-brand-bone px-6 py-2 rounded-full font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Abrir en Google Maps
              </a>
            </div>

            <div className="space-y-8">
              <div className="bg-brand-bone p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-serif text-brand-wine mb-6">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-brand-green mr-4 shrink-0" />
                    <p>Carretera El Pito S/N (CU-2, nº 201), Aroncés, Cudillero, 33154 Asturias</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-brand-green mr-4 shrink-0" />
                    <a href="tel:+34610268487" className="text-xl font-bold hover:text-brand-wine transition-colors">+34 610 26 84 87</a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-brand-green mr-4 shrink-0" />
                    <div>
                      <p className="font-bold">Lunes: 11:30–16:30</p>
                      <p className="text-brand-wine font-bold">Martes: Cerrado</p>
                      <p>Mié - Dom: 11:30–17:00 / 19:00–23:30</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="flex items-center bg-brand-cream px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-green">
                    <Car className="w-3 h-3 mr-1" /> Parking Gratis
                  </div>
                  <div className="flex items-center bg-brand-cream px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-green">
                    <Dog className="w-3 h-3 mr-1" /> Pet Friendly
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/p/Sidreria-taperia-El-Centro-100077388619804/" 
                  target="_blank"
                  className="w-full bg-brand-green text-brand-bone p-4 rounded-2xl flex items-center justify-center hover:bg-brand-wine transition-colors shadow-lg"
                >
                  <Facebook className="w-6 h-6 mr-2" />
                  <span className="font-bold text-lg">Síguenos en Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVAR */}
      <section id="reservar" className="py-24 px-4 bg-brand-green text-brand-bone relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Logo className="w-96 h-96 -mr-20 -mt-20 rotate-12" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">¿Reservas mesa?</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 italic">
            "Te recomendamos reservar — especialmente en fin de semana, nos llenamos rápido."
          </p>
          <div className="bg-brand-bone/10 backdrop-blur-md p-10 rounded-3xl border border-brand-bone/20 mb-12">
            <p className="text-xl mb-8 leading-relaxed">
              No hay formularios complicados. Sólo llámanos y te guardamos tu sitio. Solemos estar muy concurridos, especialmente en temporada alta y fines de semana.
            </p>
            <a 
              href="tel:+34610268487" 
              className="inline-flex items-center bg-brand-wine text-brand-bone px-10 py-5 rounded-full text-2xl font-serif hover:scale-105 transition-transform shadow-2xl"
            >
              <Phone className="w-8 h-8 mr-4" />
              Llamar ahora: 610 26 84 87
            </a>
          </div>
          <p className="text-brand-bone/60">
            También puedes escribirnos a <span className="underline">elcentrobarelpito@gmail.com</span> <br />
            Recuerda: <span className="font-bold text-brand-lime">Martes cerrado por descanso.</span>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-earth text-brand-bone py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Logo className="h-12 w-auto mr-3" />
              <span className="font-serif text-2xl font-bold">El Centro</span>
            </div>
            <p className="text-brand-bone/60 max-w-xs mx-auto md:mx-0">
              Cocina asturiana de verdad en el corazón de Aroncés, Cudillero. Tradición, calidad y familia.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="font-serif text-xl mb-4 text-brand-wood">Navegación</h4>
            {['Inicio', 'Nosotros', 'La Carta', 'Reseñas', 'Visítanos'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                className="hover:text-brand-lime transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-xl mb-4 text-brand-wood">Contacto y Horario</h4>
            <p className="flex items-center justify-center md:justify-start">
              <MapPin className="w-4 h-4 mr-2 text-brand-lime" /> Aroncés, Cudillero, Asturias
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <Phone className="w-4 h-4 mr-2 text-brand-lime" /> +34 610 26 84 87
            </p>
            <div className="pt-2 text-sm text-brand-bone/80 space-y-1">
              <p className="flex items-center justify-center md:justify-start">
                <Clock className="w-4 h-4 mr-2 text-brand-lime" /> 
                <span>Lun: 11:30–16:30 | <span className="text-brand-lime">Mar: Cerrado</span></span>
              </p>
              <p className="flex items-center justify-center md:justify-start ml-6">
                Mié - Dom: 11:30–17:00 / 19:00–23:30
              </p>
            </div>
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <a href="https://www.facebook.com/p/Sidreria-taperia-El-Centro-100077388619804/" target="_blank" className="hover:text-brand-lime transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-bone/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-bone/40">
          <p>© 2025 Sidrería Tapería El Centro · Todos los derechos reservados</p>
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-2 text-brand-lime" />
            <span>Premio Travellers' Choice TripAdvisor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
