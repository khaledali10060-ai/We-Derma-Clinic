import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebase";
import { 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Star, 
  ArrowLeft, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Mail, 
  ChevronDown,
  User,
  Calendar,
  MessageCircle,
  Loader2,
  Instagram
} from "lucide-react";
import { services, doctors, results, faqs, testimonials } from "./data";
import { useLanguage } from "./LanguageContext";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const InstagramFeed = () => {
  const { t, isRTL } = useLanguage();
  
  const posts = results.slice(0, 6).map(result => result.image);

  return (
    <section className="py-20 md:py-32 bg-[#FDF8F3]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 soft-shadow border border-[#E6C9A8]/20">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                  <img 
                    src="https://i.postimg.cc/hGn2M6Tc/556542688-122185234094376669-5342517379412419834-n-removebg-preview.png" 
                    alt="We Derma Logo" 
                    className="w-full h-full object-contain p-2"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-start">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-[#6B3E2E]">wederma_clinic</h3>
                <div className="flex gap-2">
                  <a 
                    href="https://www.instagram.com/wedermaclinic/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-medical-teal text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#4A2B20] transition-all"
                  >
                    {t({ ar: "متابعة", en: "Follow" })}
                  </a>
                  <a 
                    href="https://wa.me/01060008882" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#E6C9A8]/20 text-[#6B3E2E] px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#E6C9A8]/30 transition-all"
                  >
                    {t({ ar: "رسالة", en: "Message" })}
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start gap-8 md:gap-12">
                <div className="text-center md:text-start">
                  <div className="font-black text-[#6B3E2E] text-lg">452</div>
                  <div className="text-[#6B3E2E]/50 text-xs uppercase tracking-widest">{t({ ar: "منشور", en: "Posts" })}</div>
                </div>
                <div className="text-center md:text-start">
                  <div className="font-black text-[#6B3E2E] text-lg">12.5K</div>
                  <div className="text-[#6B3E2E]/50 text-xs uppercase tracking-widest">{t({ ar: "متابع", en: "Followers" })}</div>
                </div>
                <div className="text-center md:text-start">
                  <div className="font-black text-[#6B3E2E] text-lg">184</div>
                  <div className="text-[#6B3E2E]/50 text-xs uppercase tracking-widest">{t({ ar: "يتابع", en: "Following" })}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {posts.map((post, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 0.98 }}
                className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
              >
                <img src={post} alt="Instagram Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-medical-teal font-black hover:gap-5 transition-all"
            >
              <Instagram className="w-5 h-5" />
              {t({ ar: "مشاهدة المزيد على إنستجرام", en: "View more on Instagram" })}
              <ArrowLeft className={`w-5 h-5 ${isRTL ? "" : "rotate-180"}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Home = ({ setSelectedService }: any) => {
  const { t, language, isRTL } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    serviceId: '',
    doctor: '',
    dateTime: ''
  });

  const phoneNumber = "01060008882";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  const handleBookingSubmit = async (e: React.FormEvent, method: 'database' | 'whatsapp') => {
    e.preventDefault();
    setBookingStatus('submitting');

    const appointmentData = {
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    };

    try {
      // Always save to database for clinic records
      await addDoc(collection(db, 'appointments'), appointmentData);

      if (method === 'whatsapp') {
        const message = language === 'ar' 
          ? `*طلب حجز جديد من الموقع* \n\n` +
            `*الاسم:* ${formData.name}\n` +
            `*الموبايل:* ${formData.phone}\n` +
            `*الخدمة:* ${formData.service}\n` +
            `*الطبيب:* ${formData.doctor}\n` +
            `*الموعد:* ${formData.dateTime}`
          : `*New Booking Request from Website* \n\n` +
            `*Name:* ${formData.name}\n` +
            `*Mobile:* ${formData.phone}\n` +
            `*Service:* ${formData.service}\n` +
            `*Doctor:* ${formData.doctor}\n` +
            `*Appointment:* ${formData.dateTime}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      }

      setBookingStatus('success');
      setFormData({ name: '', phone: '', email: '', service: '', serviceId: '', doctor: '', dateTime: '' });
      setTimeout(() => setBookingStatus('idle'), 5000);
    } catch (error) {
      setBookingStatus('error');
      handleFirestoreError(error, OperationType.CREATE, 'appointments');
    }
  };

  const filteredDoctors = doctors.filter(doc => 
    !formData.serviceId || doc.specialtyIds.includes(formData.serviceId)
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/qvWTRkP8/ʿyadh-1.jpg" 
            alt="Professional Skincare Beauty" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#4A2B20]/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A2B20]/60 via-transparent to-[#4A2B20]/60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-10"
            >
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white/30 bg-slate-200/20 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <span className={isRTL ? "mr-2" : "ml-2"}>{t({ ar: "انضمي لـ +5000 عميلة سعيدة", en: "Join +5000 happy clients" })}</span>
              <Star className="w-4 h-4 fill-current text-yellow-400" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.3] md:leading-[1.2] mb-6 tracking-tight drop-shadow-2xl">
              {t({ ar: "جمالكِ يستحق", en: "Your beauty deserves" })} <br />
              <span className="text-medical-blue drop-shadow-lg">{t({ ar: "دقة الخبراء", en: "Expert precision" })}</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              {t({ ar: "في", en: "At" })} <span className="font-bold border-b-2 border-medical-teal/40">We Derma</span>، {t({ ar: "نجمع بين أحدث تقنيات الليزر العالمية واللمسات التجميلية الدقيقة لنمنحكِ النتيجة التي تحلمين بها.", en: "we combine the latest global laser technologies with precise aesthetic touches to give you the results you dream of." })}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a 
                whileHover={{ scale: 1.05, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(107, 62, 46, 0.4)", 
                    "0 0 0 15px rgba(107, 62, 46, 0)"
                  ] 
                }}
                transition={{ 
                  boxShadow: {
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeOut"
                  }
                }}
                href={`#${t({ ar: "احجزي الآن", en: "Book Now" })}`}
                className="bg-medical-gradient text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl text-lg md:text-xl font-black shadow-2xl shadow-medical-teal/40 hover:shadow-medical-teal/60 transition-all flex items-center justify-center gap-3 group w-full sm:w-auto"
              >
                {t({ ar: "احجزي الآن", en: "Book Now" })}
                <ChevronLeft className={`w-6 h-6 group-hover:translate-x-${isRTL ? "-2" : "2"} transition-transform ${isRTL ? "" : "rotate-180"}`} />
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.05, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${phoneNumber}`} 
                className="bg-white/10 backdrop-blur-xl text-white border border-white/30 px-8 md:px-12 py-4 md:py-6 rounded-2xl text-lg md:text-xl font-black hover:bg-white/20 transition-all flex items-center justify-center gap-3 shadow-2xl w-full sm:w-auto"
              >
                <Phone className="w-6 h-6 text-medical-blue" />
                {t({ ar: "استشارة هاتفية", en: "Phone consultation" })}
              </motion.a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 md:mt-20 flex flex-wrap justify-center gap-6 md:gap-10 opacity-80">
              <div className="flex items-center gap-2 md:gap-3 font-bold text-white/70 text-base md:text-lg">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-medical-teal" />
                {t({ ar: "أطباء معتمدون", en: "Certified Doctors" })}
              </div>
              <div className="flex items-center gap-2 md:gap-3 font-bold text-white/70 text-base md:text-lg">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-medical-teal" />
                {t({ ar: "أجهزة أصلية", en: "Original Devices" })}
              </div>
              <div className="flex items-center gap-2 md:gap-3 font-bold text-white/70 text-base md:text-lg">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-medical-teal" />
                {t({ ar: "نتائج مضمونة", en: "Guaranteed Results" })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white border-b border-[#E6C9A8]/20 relative z-20 -mt-10 mx-6 md:mx-auto max-w-5xl rounded-[2rem] md:rounded-[3rem] luxury-shadow">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-x-reverse divide-[#E6C9A8]/30">
            {[
              { label: t({ ar: "عميلة سعيدة", en: "Happy Clients" }), value: "+5000" },
              { label: t({ ar: "سنوات خبرة", en: "Years of Experience" }), value: "15" },
              { label: t({ ar: "طبيب متخصص", en: "Specialist Doctor" }), value: "12" },
              { label: t({ ar: "جهاز طبي", value: "20", en: "Medical Device" }) }
            ].map((stat, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl md:text-5xl lg:text-6xl font-black text-[#6B3E2E] mb-2">{stat.value}</div>
                <div className="text-[#6B3E2E]/60 font-bold uppercase tracking-widest text-[10px] md:text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Slider Section */}
      <section className="py-20 md:py-32 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-medical-teal font-black uppercase tracking-[0.4em] text-xs mb-4 block">{t({ ar: "Our Services", en: "Our Services" })}</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#6B3E2E] leading-tight">{t({ ar: "خدمات طبية تجميلية", en: "Medical Aesthetic Services" })} <br /> {t({ ar: "بمعايير عالمية", en: "With Global Standards" })}</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const slider = document.getElementById('services-slider');
                  if (slider) slider.scrollBy({ left: isRTL ? 300 : -300, behavior: 'smooth' });
                }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#E6C9A8]/30 flex items-center justify-center text-[#6B3E2E] hover:bg-medical-teal hover:text-white transition-all"
              >
                {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => {
                  const slider = document.getElementById('services-slider');
                  if (slider) slider.scrollBy({ left: isRTL ? -300 : 300, behavior: 'smooth' });
                }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#E6C9A8]/30 flex items-center justify-center text-[#6B3E2E] hover:bg-medical-teal hover:text-white transition-all"
              >
                {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <div 
            id="services-slider"
            className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, i) => (
              <motion.div 
                key={i}
                onClick={() => setSelectedService(service)}
                className="min-w-[280px] md:min-w-[350px] bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6C9A8]/20 soft-shadow snap-start group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-medical-teal/5 flex items-center justify-center mb-8 group-hover:bg-medical-gradient group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#6B3E2E] mb-4">{t(service.title)}</h3>
                <p className="text-[#6B3E2E]/70 leading-relaxed font-light text-base md:text-lg mb-8 line-clamp-3">{t(service.description)}</p>
                <button className="text-medical-teal font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                  {t({ ar: "اكتشفي المزيد", en: "Discover More" })}
                  <ArrowLeft className={`w-4 h-4 ${isRTL ? "" : "rotate-180"}`} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-medical-teal font-black uppercase tracking-[0.4em] text-xs mb-4 block">{t({ ar: "Testimonials", en: "Testimonials" })}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#6B3E2E]">{t({ ar: "ماذا تقول عميلاتنا؟", en: "What Our Clients Say?" })}</h2>
          </div>

          <div className="relative">
            <div 
              id="testimonials-slider"
              className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((t_item, i) => (
                <motion.div 
                  key={i} 
                  className="min-w-[300px] md:min-w-[400px] bg-[#FDF8F3] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] snap-start relative"
                >
                  <div className="flex text-medical-teal mb-6">
                    {[...Array(t_item.rating)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
                  </div>
                  <p className="text-[#6B3E2E]/70 text-lg md:text-xl leading-relaxed mb-8 italic">"{t(t_item.text)}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-medical-gradient flex items-center justify-center text-white font-black text-lg">
                      {t(t_item.name)[0]}
                    </div>
                    <div>
                      <div className="font-black text-[#6B3E2E]">{t(t_item.name)}</div>
                      <div className="text-[#6B3E2E]/40 text-xs font-bold uppercase tracking-widest">{t({ ar: "عميلة معتمدة", en: "Verified Client" })}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={() => {
                  const slider = document.getElementById('testimonials-slider');
                  if (slider) slider.scrollBy({ left: isRTL ? 400 : -400, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full border border-[#E6C9A8]/30 flex items-center justify-center text-[#6B3E2E] hover:bg-medical-teal hover:text-white transition-all"
              >
                {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => {
                  const slider = document.getElementById('testimonials-slider');
                  if (slider) slider.scrollBy({ left: isRTL ? -400 : 400, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full border border-[#E6C9A8]/30 flex items-center justify-center text-[#6B3E2E] hover:bg-medical-teal hover:text-white transition-all"
              >
                {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id={t({ ar: "الأسئلة", en: "FAQ" })} className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-medical-teal font-black uppercase tracking-[0.4em] text-xs mb-4 block">{t({ ar: "Common Questions", en: "Common Questions" })}</span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#6B3E2E] mb-6">{t({ ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" })}</h2>
            <p className="text-[#6B3E2E]/60 text-lg">{t({ ar: "كل ما تودين معرفته عن خدماتنا ونتائجنا.", en: "Everything you want to know about our services and results." })}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={false}
                className="border border-[#E6C9A8]/30 rounded-[2rem] overflow-hidden bg-[#FDF8F3]/50"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className={`w-full px-8 py-6 flex items-center justify-between ${isRTL ? "text-right" : "text-left"} hover:bg-[#FDF8F3] transition-colors`}
                >
                  <span className="text-xl font-bold text-[#6B3E2E]">{t(faq.question)}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-medical-teal" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-[#6B3E2E]/70 text-lg leading-relaxed border-t border-[#E6C9A8]/10 pt-4">
                        {t(faq.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id={t({ ar: "احجزي الآن", en: "Book Now" })} className="py-20 md:py-32 bg-[#F5E6D3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeIn}>
              <span className="text-medical-teal font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">{t({ ar: "Online Booking", en: "Online Booking" })}</span>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-[#6B3E2E] mb-6 md:mb-8 leading-tight">{t({ ar: "احجزي موعدكِ", en: "Book Your Appointment" })} <br /> <span className="text-gradient">{t({ ar: "بسهولة وأمان", en: "Easily & Safely" })}</span></h2>
              <p className="text-[#6B3E2E]/70 text-lg md:text-xl font-light mb-8 md:mb-12 leading-relaxed">
                {t({ ar: "اختاري الخدمة المناسبة والوقت الذي يفضله جدولكِ، وسيقوم فريقنا بالتواصل معكِ فوراً لتأكيد الحجز.", en: "Choose the appropriate service and the time that suits your schedule, and our team will contact you immediately to confirm the booking." })}
              </p>
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: <CheckCircle2 className="text-medical-teal w-5 h-5 md:w-6 md:h-6" />, text: t({ ar: "تأكيد فوري عبر الهاتف أو واتساب", en: "Immediate confirmation via phone or WhatsApp" }) },
                  { icon: <CheckCircle2 className="text-medical-teal w-5 h-5 md:w-6 md:h-6" />, text: t({ ar: "نخبة من أفضل الأطباء المتخصصين", en: "Elite of the best specialized doctors" }) },
                  { icon: <CheckCircle2 className="text-medical-teal w-5 h-5 md:w-6 md:h-6" />, text: t({ ar: "خصوصية تامة وأعلى معايير التعقيم", en: "Complete privacy and highest sterilization standards" }) },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4 text-[#6B3E2E]/80 font-bold text-sm md:text-base">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="bg-white p-6 md:p-8 lg:p-12 rounded-[2.5rem] md:rounded-[4rem] luxury-shadow border border-[#E6C9A8]/20 relative mt-12 lg:mt-0"
            >
              {bookingStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-[#6B3E2E] mb-4">{t({ ar: "تم استلام طلبكِ بنجاح!", en: "Your request has been received successfully!" })}</h3>
                  <p className="text-[#6B3E2E]/60 text-lg">{t({ ar: "سنتواصل معكِ خلال دقائق لتأكيد الموعد.", en: "We will contact you within minutes to confirm the appointment." })}</p>
                </motion.div>
              ) : (
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-sm font-bold text-[#6B3E2E]/80 ${isRTL ? "mr-2" : "ml-2"}`}>{t({ ar: "الاسم بالكامل", en: "Full Name" })}</label>
                      <div className="relative">
                        <User className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B3E2E]/40`} />
                        <input 
                          required
                          type="text"
                          placeholder={t({ ar: "أدخلي اسمكِ", en: "Enter your name" })}
                          className={`w-full bg-[#E6C9A8]/10 border-none rounded-2xl py-4 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} focus:ring-2 focus:ring-medical-teal transition-all`}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={`text-sm font-bold text-[#6B3E2E]/80 ${isRTL ? "mr-2" : "ml-2"}`}>{t({ ar: "رقم الهاتف", en: "Phone Number" })}</label>
                      <div className="relative">
                        <Phone className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B3E2E]/40`} />
                        <input 
                          required
                          type="tel"
                          placeholder="01xxxxxxxxx"
                          className={`w-full bg-[#E6C9A8]/10 border-none rounded-2xl py-4 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} focus:ring-2 focus:ring-medical-teal transition-all text-right`}
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-sm font-bold text-[#6B3E2E]/80 ${isRTL ? "mr-2" : "ml-2"}`}>{t({ ar: "الخدمة المطلوبة", en: "Requested Service" })}</label>
                      <select 
                        required
                        className="w-full bg-[#E6C9A8]/10 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-medical-teal transition-all appearance-none"
                        value={formData.serviceId}
                        onChange={(e) => {
                          const service = services.find(s => s.id === e.target.value);
                          setFormData({
                            ...formData, 
                            serviceId: e.target.value, 
                            service: service ? t(service.title) : '',
                            doctor: '' // Reset doctor when service changes
                          });
                        }}
                      >
                        <option value="">{t({ ar: "اختر الخدمة", en: "Select Service" })}</option>
                        {services.map(s => <option key={s.id} value={s.id}>{t(s.title)}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-sm font-bold text-[#6B3E2E]/80 ${isRTL ? "mr-2" : "ml-2"}`}>{t({ ar: "الطبيب المختص", en: "Specialist Doctor" })}</label>
                      <select 
                        required
                        disabled={!formData.serviceId}
                        className="w-full bg-[#E6C9A8]/10 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-medical-teal transition-all appearance-none disabled:opacity-50"
                        value={formData.doctor}
                        onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                      >
                        <option value="">{t({ ar: "اختر الطبيب", en: "Select Doctor" })}</option>
                        {filteredDoctors.map(doc => <option key={doc.id} value={t(doc.name)}>{t(doc.name)}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm font-bold text-[#6B3E2E]/80 ${isRTL ? "mr-2" : "ml-2"}`}>{t({ ar: "التاريخ والوقت المفضل", en: "Preferred Date & Time" })}</label>
                    <div className="relative">
                      <Calendar className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B3E2E]/40`} />
                      <input 
                        required
                        type="datetime-local"
                        className={`w-full bg-[#E6C9A8]/10 border-none rounded-2xl py-4 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} focus:ring-2 focus:ring-medical-teal transition-all text-right`}
                        value={formData.dateTime}
                        onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-1 gap-4">
                    <button 
                      disabled={bookingStatus === 'submitting'}
                      onClick={(e) => handleBookingSubmit(e, 'whatsapp')}
                      className="w-full bg-green-500 text-white py-5 rounded-2xl text-lg font-black hover:bg-green-600 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      <MessageCircle className="w-6 h-6" />
                      {t({ ar: "حجز عبر واتساب", en: "Book via WhatsApp" })}
                    </button>
                  </div>

                  {bookingStatus === 'error' && (
                    <p className="text-red-500 text-center font-bold text-sm">{t({ ar: "عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.", en: "Sorry, something went wrong. Please try again." })}</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* Results Slider Section */}
      <ResultsSlider />

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-medical-gradient opacity-10" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="bg-[#4A2B20] rounded-[2.5rem] md:rounded-[5rem] p-8 md:p-16 lg:p-24 text-center luxury-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-medical-gradient opacity-5" />
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-10 leading-tight">{t({ ar: "ابدئي رحلتكِ نحو", en: "Start Your Journey Towards" })} <br /> <span className="text-medical-blue">{t({ ar: "بشرة مثالية", en: "Perfect Skin" })}</span> {t({ ar: "اليوم", en: "Today" })}</h2>
            <p className="text-white/60 text-lg md:text-xl mb-10 md:mb-16 font-light max-w-2xl mx-auto">{t({ ar: "احجزي الآن واستمتعي بجلسة استشارة مخصصة مع أفضل خبراء التجميل في مصر.", en: "Book now and enjoy a personalized consultation session with the best beauty experts in Egypt." })}</p>
            <div className="flex flex-col items-center gap-8 md:gap-10">
              <div className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter" dir="ltr">{phoneNumber}</div>
              <a href={`#${t({ ar: "احجزي الآن", en: "Book Now" })}`} className="bg-medical-gradient text-white px-10 md:px-16 py-5 md:py-7 rounded-full text-xl md:text-2xl font-black hover:shadow-2xl hover:shadow-medical-teal/40 transition-all flex items-center gap-4 group">
                <Calendar className="w-8 h-8 md:w-10 md:h-10" />
                {t({ ar: "احجزي موعدكِ الآن", en: "Book Your Appointment Now" })}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export const Services = ({ setSelectedService }: any) => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-32 bg-[#E6C9A8]/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.span {...fadeIn} className="text-medical-teal font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">{t({ ar: "Our Services", en: "Our Services" })}</motion.span>
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl lg:text-6xl font-black text-[#6B3E2E] mb-6 md:mb-8">{t({ ar: "خدمات طبية تجميلية متكاملة", en: "Integrated Medical Aesthetic Services" })}</motion.h2>
          <motion.p {...fadeIn} className="text-[#6B3E2E]/70 max-w-2xl mx-auto text-lg md:text-xl font-light">{t({ ar: "نستخدم أحدث ما توصل إليه العلم في عالم التجميل لنضمن لكِ أفضل النتائج.", en: "We use the latest scientific advancements in the world of beauty to ensure the best results for you." })}</motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -15 }}
              onClick={() => setSelectedService(service)}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-[#E6C9A8]/20 soft-shadow group transition-all duration-500 relative overflow-hidden flex flex-col cursor-pointer"
            >
              <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-2 h-full bg-medical-gradient opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              {service.image && (
                <div className="mb-8 rounded-2xl overflow-hidden h-48 w-full relative">
                  <img src={service.image} alt={t(service.title)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A2B20]/40 to-transparent" />
                </div>
              )}

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-medical-teal/5 flex items-center justify-center mb-8 md:mb-10 group-hover:bg-medical-gradient group-hover:text-white transition-all duration-500 shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#6B3E2E] mb-4 md:mb-6">{t(service.title)}</h3>
              <p className="text-[#6B3E2E]/70 leading-relaxed font-light mb-8 md:mb-10 text-base md:text-lg flex-grow">{t(service.description)}</p>
              <button className="flex items-center gap-3 text-medical-teal font-black text-sm group-hover:gap-5 transition-all mt-auto">
                {t({ ar: "اكتشفي التفاصيل", en: "Discover Details" })}
                <ArrowLeft className={`w-5 h-5 ${isRTL ? "" : "rotate-180"}`} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-32 bg-white overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] luxury-shadow">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
                alt={t({ ar: "عيادة التجميل", en: "Beauty Clinic" })} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2B20]/60 to-transparent" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`absolute -bottom-10 ${isRTL ? "-left-10" : "-right-10"} bg-white p-8 rounded-[2rem] luxury-shadow max-w-[250px] hidden md:block z-10`}
            >
              <div className="text-medical-teal mb-4">
                <Star className="w-10 h-10 fill-current" />
              </div>
              <div className="text-3xl font-black text-[#6B3E2E] mb-2">+15</div>
              <div className="text-[#6B3E2E]/70 font-bold">{t({ ar: "عاماً من الخبرة في مجال التجميل الطبي", en: "Years of experience in medical aesthetics" })}</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-medical-teal font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">{t({ ar: "About Our Clinic", en: "About Our Clinic" })}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#6B3E2E] mb-8 leading-tight">
              {t({ ar: "نصنع الجمال", en: "We Create Beauty" })} <br />
              <span className="text-medical-blue">{t({ ar: "بمعايير عالمية", en: "With Global Standards" })}</span>
            </h2>
            <p className="text-[#6B3E2E]/70 text-lg md:text-xl font-light leading-relaxed mb-8">
              {t({ ar: "في عيادتنا، نؤمن بأن الجمال الحقيقي يكمن في التفاصيل. نسعى دائماً لتقديم أرقى الخدمات الطبية التجميلية باستخدام أحدث التقنيات العالمية، في بيئة تتسم بالفخامة والخصوصية التامة.", en: "In our clinic, we believe that true beauty lies in the details. We always strive to provide the finest medical aesthetic services using the latest global technologies, in an environment characterized by luxury and complete privacy." })}
            </p>
            <p className="text-[#6B3E2E]/70 text-lg md:text-xl font-light leading-relaxed mb-12">
              {t({ ar: "فريقنا الطبي المتميز يضع خبرته الطويلة بين يديكِ ليمنحكِ النتائج التي تطمحين إليها بأعلى درجات الأمان والموثوقية.", en: "Our distinguished medical team puts its long experience in your hands to give you the results you aspire to with the highest degrees of safety and reliability." })}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <ShieldCheck className="w-6 h-6" />, title: t({ ar: "أمان تام", en: "Complete Safety" }), desc: t({ ar: "معايير تعقيم عالمية", en: "Global sterilization standards" }) },
                { icon: <Sparkles className="w-6 h-6" />, title: t({ ar: "تقنيات حديثة", en: "Modern Technologies" }), desc: t({ ar: "أحدث الأجهزة الطبية", en: "Latest medical devices" }) },
                { icon: <Users className="w-6 h-6" />, title: t({ ar: "رعاية شخصية", en: "Personal Care" }), desc: t({ ar: "خطط علاجية مخصصة", en: "Customized treatment plans" }) },
                { icon: <Award className="w-6 h-6" />, title: t({ ar: "خبرة طبية", en: "Medical Expertise" }), desc: t({ ar: "أطباء معتمدون دولياً", en: "Internationally certified doctors" }) }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-medical-teal/10 flex items-center justify-center text-medical-teal shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-[#6B3E2E] text-lg mb-1">{feature.title}</h4>
                    <p className="text-[#6B3E2E]/60 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Doctors = ({ setSelectedDoctor }: any) => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-[#F5E6D3]/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10 md:gap-16 items-end mb-16 md:mb-20">
          <div className="lg:col-span-2">
            <span className="text-medical-teal font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">{t({ ar: "Medical Team", en: "Medical Team" })}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#6B3E2E] leading-tight">{t({ ar: "نخبة من أفضل الأطباء", en: "Elite of the Best Doctors" })} <br /> {t({ ar: "في خدمتكِ", en: "At Your Service" })}</h2>
          </div>
          <p className="text-[#6B3E2E]/70 text-lg md:text-xl font-light">{t({ ar: "فريقنا الطبي يجمع بين الخبرة الطبية الطويلة والحس الفني المرهف.", en: "Our medical team combines long medical experience with a refined artistic sense." })}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {doctors.map((doc, i) => (
            <motion.div key={i} {...fadeIn} className="group relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden luxury-shadow">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={doc.image} alt={t(doc.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2B20] via-[#4A2B20]/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div className="text-xs font-bold text-medical-blue mb-2 uppercase tracking-widest">{t(doc.specialty)}</div>
                <h3 className="text-2xl md:text-3xl font-black mb-4">{t(doc.name)}</h3>
                <div className="flex items-center gap-3 text-white/70 mb-6 md:mb-8">
                  <Award className="w-5 h-5" />
                  <span className="text-sm md:text-base">{t(doc.experience)}</span>
                </div>
                <button 
                  onClick={() => setSelectedDoctor(doc)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-bold hover:bg-white hover:text-[#6B3E2E] transition-all"
                >
                  {t({ ar: "عرض الملف الطبي", en: "View Medical Profile" })}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ResultsSlider = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 md:py-32 bg-[#4A2B20] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-medical-blue font-black uppercase tracking-[0.4em] text-xs mb-4 block">{t({ ar: "Real Results", en: "Real Results" })}</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">{t({ ar: "نتائج حقيقية من عيادتنا", en: "Real Results from Our Clinic" })}</h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                const slider = document.getElementById('results-slider');
                if (slider) slider.scrollBy({ left: isRTL ? 300 : -300, behavior: 'smooth' });
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#4A2B20] transition-all"
            >
              {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => {
                const slider = document.getElementById('results-slider');
                if (slider) slider.scrollBy({ left: isRTL ? -300 : 300, behavior: 'smooth' });
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#4A2B20] transition-all"
            >
              {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div 
          id="results-slider"
          className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {results.map((res, i) => (
            <motion.div 
              key={i}
              className="min-w-[280px] md:min-w-[350px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm snap-start group"
            >
              <div className="h-[300px] md:h-[400px] overflow-hidden">
                <img 
                  src={res.image} 
                  alt={t(res.title)} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl md:text-2xl font-black">{t(res.title)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Results = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-[#4A2B20] text-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-medical-blue font-black uppercase tracking-[0.4em] text-xs mb-4 block">{t({ ar: "Real Results", en: "Real Results" })}</span>
          <h2 className="text-4xl lg:text-6xl font-black mb-8">{t({ ar: "نتائج حقيقية من عيادتنا", en: "Real Results from Our Clinic" })}</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-xl font-light">{t({ ar: "ثقتكِ هي رأس مالنا، وهذه بعض قصص النجاح التي نفخر بها.", en: "Your trust is our capital, and these are some of the success stories we are proud of." })}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((res, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="h-[300px] md:h-[400px] overflow-hidden">
                <img 
                  src={res.image} 
                  alt={t(res.title)} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2B20] to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="text-xl md:text-2xl font-black">{t(res.title)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Location = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m1!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1709664123456!5m2!1sen!2seg"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-60"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="bg-white/90 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] max-w-2xl luxury-shadow border border-white">
          <span className="text-medical-teal font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">{t({ ar: "Visit Us", en: "Visit Us" })}</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#6B3E2E] mb-8">{t({ ar: "موقع العيادة", en: "Clinic Location" })}</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-medical-teal/10 flex items-center justify-center text-medical-teal shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#6B3E2E] text-xl mb-2">{t({ ar: "العنوان", en: "Address" })}</h3>
                <p className="text-[#6B3E2E]/70 leading-relaxed text-lg">{t({ ar: "التجمع الخامس، شارع التسعين الجنوبي", en: "Fifth Settlement, South 90th Street" })}<br />{t({ ar: "مبنى CMC الطبي، الدور الرابع، عيادة 405", en: "CMC Medical Building, 4th Floor, Clinic 405" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-medical-teal/10 flex items-center justify-center text-medical-teal shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#6B3E2E] text-xl mb-2">{t({ ar: "ساعات العمل", en: "Working Hours" })}</h3>
                <p className="text-[#6B3E2E]/70 leading-relaxed text-lg">{t({ ar: "السبت - الخميس: 10 صباحاً - 10 مساءً", en: "Saturday - Thursday: 10 AM - 10 PM" })}<br />{t({ ar: "الجمعة: مغلق", en: "Friday: Closed" })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
