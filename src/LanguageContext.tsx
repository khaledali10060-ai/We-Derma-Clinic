import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string | { ar: any; en: any }) => any;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.doctors': 'Doctors',
    'nav.results': 'Results',
    'nav.location': 'Location',
    'nav.bookNow': 'Book Now',

    // Hero
    'hero.title': 'Your Beauty Deserves The Best',
    'hero.subtitle': 'We provide the latest beauty and skincare technologies under the supervision of elite specialized doctors.',
    'hero.cta': 'Phone Consultation',

    // Stats
    'stats.happyClients': 'Happy Clients',
    'stats.yearsExp': 'Years of Experience',
    'stats.specialists': 'Specialists',
    'stats.medicalDevices': 'Medical Devices',

    // Sections
    'section.testimonials': 'Our Clients\' Reviews',
    'section.faq': 'Frequently Asked Questions',
    'section.faqSubtitle': 'Everything you want to know about our services and results.',
    'section.booking': 'Book Your Appointment Easily & Safely',
    'section.bookingSubtitle': 'Choose the right service and time that fits your schedule, and our team will contact you immediately to confirm the booking.',
    'section.ctaTitle': 'Start Your Journey Towards Perfect Skin Today',
    'section.ctaSubtitle': 'Book now and enjoy a personalized consultation session with the best beauty experts in Egypt.',

    // Booking Form
    'form.name': 'Full Name',
    'form.namePlaceholder': 'Enter your name',
    'form.phone': 'Phone Number',
    'form.phonePlaceholder': '01xxxxxxxxx',
    'form.service': 'Requested Service',
    'form.selectService': 'Select Service',
    'form.doctor': 'Specialist Doctor',
    'form.selectDoctor': 'Select Doctor',
    'form.dateTime': 'Preferred Date & Time',
    'form.confirm': 'Confirm Booking',
    'form.whatsapp': 'Book via WhatsApp',
    'form.success': 'Your request has been received successfully!',
    'form.successSubtitle': 'We will contact you within minutes to confirm the appointment.',
    'form.error': 'Sorry, something went wrong. Please try again.',

    // Footer
    'footer.description': 'We don\'t just provide beauty services, we offer an integrated experience that enhances your self-confidence using the latest globally certified aesthetic medicine technologies.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Direct Contact',
    'footer.whatsappAvailable': 'WhatsApp available 24/7',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',

    // Services Page
    'services.title': 'Integrated Medical Aesthetic Services',
    'services.subtitle': 'We use the latest scientific advancements in the world of beauty to ensure you get the best results.',

    // About Page
    'about.title': 'About We Derma Clinic',
    'about.subtitle': 'Our success story begins with our passion for beauty and medical excellence.',

    // Doctors Page
    'doctors.title': 'Elite Specialized Doctors',
    'doctors.subtitle': 'A medical team that combines medical expertise with an aesthetic touch.',
    'doctors.statement': 'Doctor\'s Statement',
    'doctors.credentials': 'Academic Credentials',
    'doctors.specializations': 'Areas of Specialization',
    'doctors.introVideo': 'Intro Video',
    'doctors.bookWith': 'Book your appointment with',
    'doctors.now': 'now',

    // Results Page
    'results.title': 'Our Results Speak For Themselves',
    'results.subtitle': 'See the real transformation of our clients before and after sessions.',

    // Location Page
    'location.title': 'Clinic Location',
    'location.address': 'Address',
    'location.addressDetail': 'Fifth Settlement, South 90th St, CMC Medical Building, 4th Floor, Clinic 405',
    'location.workingHours': 'Working Hours',
    'location.workingHoursDetail': 'Saturday - Thursday: 10 AM - 10 PM, Friday: Closed',
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.about': 'عن العيادة',
    'nav.doctors': 'الأطباء',
    'nav.results': 'النتائج',
    'nav.location': 'الموقع',
    'nav.bookNow': 'احجزي الآن',

    // Hero
    'hero.title': 'جمالكِ يستحق الأفضل',
    'hero.subtitle': 'نقدم لكِ أحدث تقنيات التجميل والعناية بالبشرة تحت إشراف نخبة من الأطباء المتخصصين.',
    'hero.cta': 'استشارة هاتفية',

    // Stats
    'stats.happyClients': 'عميلة سعيدة',
    'stats.yearsExp': 'سنوات خبرة',
    'stats.specialists': 'طبيب متخصص',
    'stats.medicalDevices': 'جهاز طبي',

    // Sections
    'section.testimonials': 'آراء عميلاتنا',
    'section.faq': 'الأسئلة الشائعة',
    'section.faqSubtitle': 'كل ما تودين معرفته عن خدماتنا ونتائجنا.',
    'section.booking': 'احجزي موعدكِ بسهولة وأمان',
    'section.bookingSubtitle': 'اختاري الخدمة المناسبة والوقت الذي يفضله جدولكِ، وسيقوم فريقنا بالتواصل معكِ فوراً لتأكيد الحجز.',
    'section.ctaTitle': 'ابدئي رحلتكِ نحو بشرة مثالية اليوم',
    'section.ctaSubtitle': 'احجزي الآن واستمتعي بجلسة استشارة مخصصة مع أفضل خبراء التجميل في مصر.',

    // Booking Form
    'form.name': 'الاسم بالكامل',
    'form.namePlaceholder': 'أدخلي اسمكِ',
    'form.phone': 'رقم الهاتف',
    'form.phonePlaceholder': '01xxxxxxxxx',
    'form.service': 'الخدمة المطلوبة',
    'form.selectService': 'اختر الخدمة',
    'form.doctor': 'الطبيب المختص',
    'form.selectDoctor': 'اختر الطبيب',
    'form.dateTime': 'التاريخ والوقت المفضل',
    'form.confirm': 'تأكيد الحجز',
    'form.whatsapp': 'حجز عبر واتساب',
    'form.success': 'تم استلام طلبكِ بنجاح!',
    'form.successSubtitle': 'سنتواصل معكِ خلال دقائق لتأكيد الموعد.',
    'form.error': 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.',

    // Footer
    'footer.description': 'نحن لا نقدم خدمات تجميل فقط، بل نقدم تجربة متكاملة تعزز ثقتك بنفسك باستخدام أحدث تقنيات الطب التجميلي المعتمد عالميًا.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.contact': 'تواصل مباشر',
    'footer.whatsappAvailable': 'واتساب متاح 24/7',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',

    // Services Page
    'services.title': 'خدمات طبية تجميلية متكاملة',
    'services.subtitle': 'نستخدم أحدث ما توصل إليه العلم في عالم التجميل لنضمن لكِ أفضل النتائج.',

    // About Page
    'about.title': 'عن وي ديرما كلينك',
    'about.subtitle': 'قصة نجاحنا تبدأ من شغفنا بالجمال والتميز الطبي.',

    // Doctors Page
    'doctors.title': 'نخبة من أفضل الأطباء',
    'doctors.subtitle': 'فريق طبي متخصص يجمع بين الخبرة الطبية واللمسة الجمالية.',
    'doctors.statement': 'كلمة الطبيب',
    'doctors.credentials': 'المؤهلات العلمية',
    'doctors.specializations': 'مجالات التخصص',
    'doctors.introVideo': 'فيديو تعريفي',
    'doctors.bookWith': 'احجزي موعدكِ مع',
    'doctors.now': 'الآن',

    // Results Page
    'results.title': 'نتائجنا تتحدث عن نفسها',
    'results.subtitle': 'شاهدي التحول الحقيقي لعميلاتنا قبل وبعد الجلسات.',

    // Location Page
    'location.title': 'موقع العيادة',
    'location.address': 'العنوان',
    'location.addressDetail': 'التجمع الخامس، شارع التسعين الجنوبي، مبنى CMC الطبي، الدور الرابع، عيادة 405',
    'location.workingHours': 'ساعات العمل',
    'location.workingHoursDetail': 'السبت - الخميس: 10 صباحاً - 10 مساءً، الجمعة: مغلق',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string | { ar: any; en: any }) => {
    if (typeof key === 'object' && key !== null) {
      return key[language] || key['en'] || key['ar'];
    }
    return translations[language][key as string] || translations['en'][key as string] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
