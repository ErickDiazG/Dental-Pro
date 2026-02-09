import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MapPin,
  Calendar,
  Menu,
  X,
  Smile,
  Star,
  Cpu,
  ArrowRight,
  CheckCircle,
  Clock,
  Instagram,
  Facebook
} from 'lucide-react';
import comparisonImg from './assets/antes-despues.jpg';
import tecnologiaImg from './assets/tecnologia-3d.jpg';
import ortodonciaImg from './assets/ortodoncia.jpg';

// --- Componentes Auxiliares ---

// 1. Componente de Comparación de Imágenes (El Factor Wow)
const ImageComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const position = ((clientX - left) / width) * 100;

    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-blue-900 mb-2">Transformaciones Reales</h3>
        <p className="text-gray-600">Desliza para ver el cambio instantáneo.</p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize select-none border-4 border-gray-100 touch-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Imagen del "Después" (Fondo - Mitad Derecha) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <img
            src={comparisonImg}
            alt="Sonrisa Perfecta Después"
            className="absolute top-0 h-full max-w-none object-cover"
            style={{ width: '200%', left: '-100%' }}
          />
        </div>

        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
          DESPUÉS
        </div>

        {/* Imagen del "Antes" (Superpuesta - Mitad Izquierda) */}
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden border-r-4 border-white z-20"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden" style={{ width: sliderPosition > 0 ? `${10000 / sliderPosition}%` : '100vw' }}>
            <img
              src={comparisonImg}
              alt="Sonrisa Antes"
              className="absolute top-0 left-0 h-full max-w-none object-cover"
              style={{ width: '200%' }}
            />
          </div>

          <div className="absolute top-4 left-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ANTES
          </div>
        </div>


        {/* El botón deslizante */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-white"></div>
              <div className="w-0.5 h-4 bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Componente de Carrusel de Tips/Testimonios
const TipsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      type: "tip",
      content: "Recuerda cambiar tu cepillo dental cada 3 meses o después de una enfermedad para evitar bacterias.",
      author: "Dr. Experto",
      role: "Perfect Tip"
    },
    {
      type: "testimonial",
      content: "Llegué con miedo y me fui feliz. El Doctor tiene una mano super ligera, ni sentí la anestesia.",
      author: "María González",
      role: "Paciente de Ortodoncia"
    },
    {
      type: "tip",
      content: "El uso de hilo dental diario reduce en un 40% la probabilidad de caries interdentales.",
      author: "Dra. Especialista",
      role: "Perfect Tip"
    },
    {
      type: "testimonial",
      content: "La tecnología que usan es impresionante. Me mostraron mi diseño de sonrisa en 3D antes de tocarme un diente.",
      author: "Carlos Ruiz",
      role: "Paciente de Estética"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="bg-blue-50 py-16 px-4 rounded-3xl my-12 mx-4 md:mx-auto max-w-6xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-300 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10 transition-all duration-500 ease-in-out">
        <div className="mb-6 flex justify-center">
          {items[activeIndex].type === 'tip' ? (
            <div className="bg-blue-100 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          ) : (
            <div className="bg-yellow-100 p-3 rounded-full">
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          )}
        </div>

        <h4 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">
          {items[activeIndex].role}
        </h4>

        <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed italic">
          "{items[activeIndex].content}"
        </p>

        <p className="font-bold text-gray-900">— {items[activeIndex].author}</p>

        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${idx === activeIndex ? 'bg-blue-600' : 'bg-blue-200'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white text-gray-800">

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo Simulado */}
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Smile size={24} />
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-blue-900' : 'text-blue-900 md:text-white'} tracking-tight`}>
              Dental <span className="text-blue-500">Pro</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['Servicios', 'Tecnología', 'Testimonios', 'Ubicación'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                className={`text-sm font-medium hover:text-blue-400 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}
              >
                {item}
              </button>
            ))}
            <a
              href="https://wa.me/528994266944?text=Hola%20Clínica%20Dental%20Pro,%20quisiera%20agendar%20una%20cita..."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-5 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95 text-sm"
            >
              Agendar Cita
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-600 bg-white p-2 rounded-md shadow-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col gap-4 px-6 border-t">
            {['Servicios', 'Tecnología', 'Testimonios', 'Ubicación'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                className="text-left text-gray-700 font-medium py-2 border-b border-gray-100"
              >
                {item}
              </button>
            ))}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-2">
              Agendar por WhatsApp
            </button>
          </div>
        )}
      </nav>

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
            alt="Equipo dental feliz"
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-20">
          <div className="max-w-2xl text-white">
            <div className="inline-block bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 px-4 py-1 rounded-full text-sm font-semibold mb-6">
              👋 Bienvenidos a Clínica Dental Pro
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Recupera la <br />
              <span className="text-blue-300">Confianza de Sonreír</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Odontología integral con tecnología avanzada y un trato tan humano que te hará sentir en familia. Olvida el miedo al dentista.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/528994266944?text=Hola%20Clínica%20Dental%20Pro,%20quisiera%20agendar%20una%20valoración..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-green-500/30 transition-all hover:scale-105"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-6 h-6 invert" />
                Agendar Valoración
              </a>
              <button
                onClick={() => scrollToSection('transformaciones')}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all"
              >
                Ver Transformaciones <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sección de Servicios */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2">Tratamientos Integrales</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Todo lo que tu sonrisa necesita</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="group bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Cpu size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Implantes y Prótesis</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Recupera la funcionalidad completa. Utilizamos moldes digitales para un ajuste perfecto y natural.
              </p>
              <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1000&auto=format&fit=crop" alt="Implantes" className="w-full h-32 object-cover rounded-lg opacity-80" />
            </div>

            {/* Card 2 */}
            <div className="group bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 hover:-translate-y-2">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Smile size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Estética Dental</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Carillas y blanqueamiento. Diseñamos digitalmente la sonrisa que siempre quisiste ver en el espejo.
              </p>
              <img src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=1000&auto=format&fit=crop" alt="Estética" className="w-full h-32 object-cover rounded-lg opacity-80" />
            </div>

            {/* Card 3 */}
            <div className="group bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 hover:-translate-y-2">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Star size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Ortodoncia</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Alineación perfecta para todas las edades. Desde brackets tradicionales hasta alineadores invisibles.
              </p>
              <img src={ortodonciaImg} alt="Ortodoncia" className="w-full h-32 object-cover rounded-lg opacity-80" />
            </div>

            {/* Card 4 */}
            <div className="group bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 hover:-translate-y-2">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Calendar size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">General y Niños</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cuidado preventivo para toda la familia. Odontopediatría con amor y paciencia.
              </p>
              <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop" alt="Niños" className="w-full h-32 object-cover rounded-lg opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Slider Interactivo */}
      <section id="transformaciones" className="bg-white pb-20">
        <ImageComparisonSlider />
      </section>

      {/* 4. Tecnología y Equipo */}
      <section id="tecnologia" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Texto */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4 text-blue-400">
                <Cpu size={20} />
                <span className="font-bold uppercase tracking-widest text-sm">Innovación Dental</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">No adivinamos,<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Diagnosticamos.</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Utilizamos tecnología de escaneo intraoral e impresión 3D para tratamientos precisos, rápidos y menos invasivos. Tu salud bucal respaldada por ciencia, no por suposiciones.
              </p>

              <ul className="space-y-4">
                {[
                  'Escáner Intraoral 3D (Adiós a la pasta rosa)',
                  'Diseño Digital de Sonrisa',
                  'Radiografía Digital de Baja Radiación',
                  'Esterilización de Grado Hospitalario'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Grid de Imágenes */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop"
                alt="Doctor trabajando"
                className="w-full h-64 object-cover rounded-2xl shadow-lg transform translate-y-8"
              />
              <img
                src={tecnologiaImg}
                alt="Tecnología 3D"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonios y Tips
      <section id="testimonios" className="bg-white pt-20">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900">Lo que dicen nuestros pacientes</h2>
          <p className="text-gray-500 mt-2">Y algunos consejos para mantener tu sonrisa brillante</p>
        </div>
        <TipsCarousel />
      </section>
      */}

      {/* 6. Footer y Ubicación */}
      <section id="ubicacion" className="bg-blue-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

            {/* Info Contacto */}
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-900">
                  <Smile size={20} />
                </div>
                <span className="text-2xl font-bold">Salud y Cuidado Dental</span>
              </div>
              <p className="text-blue-200 mb-6 leading-relaxed">
                Estamos listos para transformar tu sonrisa y tu confianza. Agenda tu cita hoy mismo.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-400 mt-1" />
                  <span className="text-gray-300">Av. 20 de Noviembre 987, esq. Patricia fracc Reynosa (Almaguer) <br />Reynosa, Tamaulipas 88780</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-400" />
                  <span className="text-gray-300">+52 899 426 6944</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-400" />
                  <span className="text-gray-300">Lun - Vie: 10am - 7:30pm | Sáb: 10am - 5pm | Dom: 10:30am - 2pm</span>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="md:w-2/3 h-64 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-blue-800 relative group">
              {/* Overlay de mapa interactivo simulado */}
              <iframe
                src="https://maps.google.com/maps?q=Clínica+Dental+Pro&ll=26.0328393,-98.2366687&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              ></iframe>
              <div className="absolute top-4 right-4 bg-white text-blue-900 px-4 py-2 rounded-lg font-bold shadow-lg pointer-events-none">
                Ubicación
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-sm">
              <a
                href="https://devdiazlabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-blue-400 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
              >
                <span>Desarrollado por</span>
                <span className="relative overflow-hidden">
                  DevDiaz Labs
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </a>
            </div>

            <div className="flex gap-6">
              {/* <Instagram className="cursor-pointer hover:text-pink-400 transition-colors" /> */}
              <a
                href="https://www.facebook.com/p/Cl%C3%ADnica-Dental-Pro-61569973328929/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="cursor-pointer hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button - WhatsApp */}
      <a
        href="https://wa.me/528994266944?text=Hola%20Clínica%20Dental%20Pro,%20quisiera%20agendar%20una%20revisión..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center animate-bounce-slow"
        aria-label="Contactar por WhatsApp"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-8 h-8 invert" />
      </a>

      {/* Estilo simple para la animación suave del botón */}
      <style>{`
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
