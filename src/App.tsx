import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebase";
import { services, doctors, results, testimonials, faqs } from "./data";
import { Home, Services, About, Doctors, Results, Location } from "./pages";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Star, 
  Sparkles, 
  Zap, 
  User, 
  Droplets, 
  Scissors,
  Clock,
  ChevronLeft,
  Instagram,
  Facebook,
  ShieldCheck,
  Award,
  Menu,
  X,
  CheckCircle2,
  Users,
  Calendar,
  ArrowLeft,
  Mail,
  Loader2,
  ChevronDown,
  Play,
  GraduationCap,
  Stethoscope,
  Globe
} from "lucide-react";

const Navbar = ({ setSelectedDoctor }: { setSelectedDoctor: (doc: any) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.services'), path: "/services" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.doctors'), path: "/doctors" },
    { name: t('nav.results'), path: "/results" },
    { name: t('nav.location'), path: "/location" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "premium-glass border-b border-[#f1f1f1] py-3" : "bg-[#ffffff] py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <Link to="/">
              <img 
                src="https://i.postimg.cc/hGn2M6Tc/556542688-122185234094376669-5342517379412419834-n-removebg-preview.png" 
                alt="We Derma Logo" 
                className={`${scrolled ? "h-12 md:h-14" : "h-16 md:h-20"} w-auto object-contain transition-all duration-500`}
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 text-sm font-bold text-[#1f2937]">
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} className={`hover:text-[#0f766e] transition-colors relative group ${location.pathname === link.path ? 'text-[#0f766e]' : ''}`}>
                {link.name}
                <span className={`absolute -bottom-1 right-0 h-0.5 bg-[#0f766e] transition-all ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 text-[#374151] hover:text-[#0f766e] transition-colors font-bold text-sm"
            >
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            
            <div className="hidden md:flex items-center gap-3 border-l border-[#e5e7eb] pl-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#374151] hover:text-[#0f766e] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#374151] hover:text-[#0f766e] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <Link to="/#احجزي الآن" className="hidden md:flex bg-gradient-to-r from-[#14b8a6] to-[#0f766e] text-[#ffffff] px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#0f766e]/20 hover:from-[#0f766e] hover:to-[#115e59] transition-all">
              {t('nav.bookNow')}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-[#1f2937]">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`lg:hidden fixed inset-0 ${scrolled ? 'top-[72px]' : 'top-[96px] md:top-[128px]'} premium-glass z-40 overflow-y-auto transition-all duration-500`}
          >
            <div className="px-8 py-12 flex flex-col gap-8 text-2xl font-black text-[#111827] text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`transition-colors ${location.pathname === link.path ? 'text-[#0f766e]' : 'hover:text-[#0f766e]'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => {
                    setLanguage(language === 'ar' ? 'en' : 'ar');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 text-[#111827] hover:text-[#0f766e] transition-colors font-black text-xl w-full"
                >
                  <Globe className="w-6 h-6" />
                  {language === 'ar' ? 'English' : 'العربية'}
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link 
                  to="/#احجزي الآن" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="block bg-gradient-to-r from-[#14b8a6] to-[#0f766e] text-[#ffffff] py-6 rounded-[2rem] shadow-xl text-xl hover:from-[#0f766e] hover:to-[#115e59] transition-all"
                >
                  {t('nav.bookNow')}
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-6 mt-4"
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#f9fafb] border border-[#e5e7eb] flex items-center justify-center text-[#374151] hover:bg-[#0f766e] hover:text-[#ffffff] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#f9fafb] border border-[#e5e7eb] flex items-center justify-center text-[#374151] hover:bg-[#0f766e] hover:text-[#ffffff] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const phoneNumber = "01060008882";
  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.services'), path: "/services" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.doctors'), path: "/doctors" },
    { name: t('nav.results'), path: "/results" },
    { name: t('nav.location'), path: "/location" },
  ];

  return (
    <footer className="bg-[#ffffff] pt-20 md:pt-32 pb-12 border-t border-[#f1f1f1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-24">
          <div className="lg:col-span-2">
            <div className="mb-8 md:mb-10">
              <img 
                src="https://i.postimg.cc/hGn2M6Tc/556542688-122185234094376669-5342517379412419834-n-removebg-preview.png" 
                alt="We Derma Logo" 
                className="h-32 md:h-44 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[#6b7280] max-w-sm leading-relaxed mb-8 md:mb-12 text-base md:text-lg font-light">
              {t('footer.description')}
            </p>
            <div className="flex gap-4 md:gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0f766e]/10 flex items-center justify-center hover:bg-[#0f766e] hover:text-[#ffffff] transition-all premium-shadow premium-hover">
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0f766e]/10 flex items-center justify-center hover:bg-[#0f766e] hover:text-[#ffffff] transition-all premium-shadow premium-hover">
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href={`tel:${phoneNumber}`} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0f766e]/10 flex items-center justify-center hover:bg-[#0f766e] hover:text-[#ffffff] transition-all premium-shadow premium-hover">
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-black text-[#111827] mb-6 md:mb-10">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 md:space-y-6 text-[#6b7280] font-bold text-sm md:text-base">
              {navLinks.map((link, i) => (
                <li key={i}><Link to={link.path} className="hover:text-[#0f766e] transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-black text-[#111827] mb-6 md:mb-10">{t('footer.contact')}</h4>
            <ul className="space-y-6 md:space-y-8 text-[#6b7280] font-bold text-sm md:text-base">
              <li className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#0f766e]/5 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 md:w-6 md:h-6 text-[#0f766e]" /></div>
                <span dir="ltr" className="text-base md:text-lg">{phoneNumber}</span>
              </li>
              <li className="flex items-center gap-4 md:gap-5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#0f766e]/5 flex items-center justify-center shrink-0"><MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#0f766e]" /></div>
                <span className="text-base md:text-lg">{t('footer.whatsappAvailable')}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 md:pt-12 border-t border-[#f1f1f1] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-[#9ca3af] font-bold text-xs md:text-sm">
          <div className="text-center md:text-right">&copy; {new Date().getFullYear()} We Derma Clinic. {t('footer.rights')}</div>
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="hover:text-[#0f766e] transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-[#0f766e] transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const MainApp = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const { t, language, isRTL } = useLanguage();
  const phoneNumber = "01060008882";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div className={`min-h-screen bg-[#ffffff] selection:bg-[#0f766e]/10 overflow-x-hidden ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      <Navbar setSelectedDoctor={setSelectedDoctor} />
      
      <main className="pt-[96px] md:pt-[128px]">
        <Routes>
          <Route path="/" element={<Home setSelectedService={setSelectedService} />} />
          <Route path="/services" element={<Services setSelectedService={setSelectedService} />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors setSelectedDoctor={setSelectedDoctor} />} />
          <Route path="/results" element={<Results />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <motion.a 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
        href={whatsappLink} target="_blank" rel="noopener noreferrer"
        className={`fixed bottom-10 ${isRTL ? 'left-10' : 'right-10'} z-50 bg-gradient-to-r from-[#14b8a6] to-[#0f766e] text-[#ffffff] p-6 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center group`}
      >
        <MessageCircle className="w-10 h-10" />
        <span className={`max-w-0 overflow-hidden group-hover:max-w-xs ${isRTL ? 'group-hover:mr-4' : 'group-hover:ml-4'} transition-all duration-500 font-black whitespace-nowrap`}>
          {t('nav.bookNow')}
        </span>
      </motion.a>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#111827]/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="premium-card w-full max-w-4xl max-h-[95vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative flex flex-col"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} z-10 w-12 h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-[#111827] hover:bg-[#0f766e] hover:text-[#ffffff] transition-all`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar flex-grow">
                <div className="w-20 h-20 rounded-3xl bg-[#0f766e]/10 flex items-center justify-center text-[#0f766e] mb-8">
                  {selectedService.icon}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#111827] mb-6">{t(selectedService.title)}</h2>
                <p className="text-xl md:text-2xl font-light text-[#6b7280] leading-relaxed mb-12">
                  {t(selectedService.description)}
                </p>
                
                {selectedService.videoUrl ? (
                  <div className="w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden mb-12 bg-[#f8f6f4] flex items-center justify-center border border-[#e5e7eb]">
                    <iframe 
                      src={selectedService.videoUrl} 
                      className="w-full h-full border-0" 
                      allowFullScreen 
                      scrolling="no"
                    ></iframe>
                  </div>
                ) : selectedService.image && (
                  <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12">
                    <img src={selectedService.image} alt={t(selectedService.title)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}

                <button 
                  onClick={() => {
                    setSelectedService(null);
                    setTimeout(() => {
                      document.getElementById('احجزي الآن')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="w-full bg-gradient-to-r from-[#14b8a6] to-[#0f766e] text-[#ffffff] py-5 md:py-6 rounded-2xl font-black text-lg md:text-xl shadow-xl hover:scale-[1.02] hover:from-[#0f766e] hover:to-[#115e59] transition-all"
                >
                  {t({ ar: "احجزي هذه الخدمة الآن", en: "Book this service now" })}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Doctor Details Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#111827]/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="premium-card w-full max-w-6xl max-h-[95vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedDoctor(null)}
                className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[#111827] hover:bg-[#0f766e] hover:text-[#ffffff] transition-all`}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Image & Info */}
              <div className="lg:w-2/5 relative h-[300px] lg:h-auto">
                <img src={selectedDoctor.image} alt={t(selectedDoctor.name)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">{t(selectedDoctor.specialty)}</div>
                  <h2 className="text-3xl md:text-4xl font-black text-white">{t(selectedDoctor.name)}</h2>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="lg:w-3/5 p-6 md:p-16 overflow-y-auto custom-scrollbar">
                <div className="space-y-10 md:space-y-12">
                  {/* Personal Statement */}
                  <div>
                    <h4 className="text-[#0f766e] font-black text-[10px] md:text-xs uppercase tracking-widest mb-4">
                      {t('doctors.statement')}
                    </h4>
                    <p className="text-xl md:text-2xl font-light text-[#111827] leading-relaxed italic">"{t(selectedDoctor.statement)}"</p>
                  </div>

                  <div className={`grid md:grid-cols-2 gap-8 md:gap-12 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Credentials */}
                    <div>
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-[#0f766e]" />
                        <h4 className="text-lg md:text-xl font-bold text-[#111827]">
                          {t('doctors.credentials')}
                        </h4>
                      </div>
                      <ul className="space-y-3 md:space-y-4">
                        {t(selectedDoctor.credentials).map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-[#6b7280] leading-relaxed text-sm md:text-base">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e] mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specializations */}
                    <div>
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-[#0f766e]" />
                        <h4 className="text-lg md:text-xl font-bold text-[#111827]">
                          {t('doctors.specializations')}
                        </h4>
                      </div>
                      <ul className="space-y-3 md:space-y-4">
                        {t(selectedDoctor.specializations).map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-[#6b7280] leading-relaxed text-sm md:text-base">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e] mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Video Intro */}
                  <div className="pt-8 border-t border-[#f1f1f1]">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <Play className="w-5 h-5 md:w-6 md:h-6 text-[#0f766e]" />
                      <h4 className="text-lg md:text-xl font-bold text-[#111827]">
                        {t('doctors.introVideo')}
                      </h4>
                    </div>
                    <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden premium-card border border-[#f1f1f1] relative">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={selectedDoctor.videoUrl} 
                        title="Doctor Introduction" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute inset-0"
                      ></iframe>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedDoctor(null);
                      document.getElementById('احجزي الآن')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-gradient-to-r from-[#14b8a6] to-[#0f766e] text-white py-5 md:py-6 rounded-2xl font-black text-lg md:text-xl shadow-xl hover:scale-[1.02] hover:from-[#0f766e] hover:to-[#115e59] transition-all"
                  >
                    {t('doctors.bookWith')} {t(selectedDoctor.name).split(' ')[1]} {t('doctors.now')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

