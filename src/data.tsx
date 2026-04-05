import React from "react";
import { Zap, Sparkles, Droplets, User, Scissors, ShieldCheck } from "lucide-react";

export const services = [
  {
    id: "laser",
    title: { ar: "ليزر إزالة الشعر", en: "Laser Hair Removal" },
    description: { 
      ar: "أحدث تقنيات الليزر العالمية (Candela & GentleLase) لنتائج تدوم طويلاً وبأمان تام على جميع أنواع البشرة.",
      en: "Latest global laser technologies (Candela & GentleLase) for long-lasting results and complete safety on all skin types."
    },
    icon: <Zap className="w-8 h-8" />,
  },
  {
    id: "filler",
    title: { ar: "فيلر وبوتوكس", en: "Filler & Botox" },
    description: {
      ar: "لمسات جمالية دقيقة تعيد لكِ شبابكِ وثقتكِ بنفسكِ باستخدام أجود الأنواع العالمية المعتمدة.",
      en: "Precise aesthetic touches that restore your youth and self-confidence using the finest globally certified types."
    },
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    id: "skin",
    title: { ar: "العناية بالبشرة", en: "Skincare" },
    description: {
      ar: "جلسات تنظيف وترطيب عميق (HydraFacial) لبشرة مشرقة وصحية وخالية من العيوب.",
      en: "Deep cleansing and moisturizing sessions (HydraFacial) for bright, healthy, and flawless skin."
    },
    icon: <Droplets className="w-8 h-8" />,
  },
  {
    id: "meso",
    title: { ar: "الميزوثيرابي", en: "Mesotherapy" },
    description: {
      ar: "تغذية مكثفة للبشرة والشعر بأفضل المواد العلاجية والفيتامينات لتحفيز الكولاجين الطبيعي.",
      en: "Intensive nutrition for skin and hair with the best therapeutic materials and vitamins to stimulate natural collagen."
    },
    icon: <User className="w-8 h-8" />,
  },
  {
    id: "body",
    title: { ar: "نحت الجسم", en: "Body Sculpting" },
    description: {
      ar: "حلول متقدمة لتنسيق القوام وتفتيت الدهون الموضعية بأحدث الأجهزة غير الجراحية.",
      en: "Advanced solutions for body contouring and localized fat reduction using the latest non-surgical devices."
    },
    icon: <Scissors className="w-8 h-8" />,
  },
  {
    id: "hair",
    title: { ar: "Hair Protocol", en: "Hair Protocol" },
    description: {
      ar: "بروتوكول متكامل لعلاج تساقط الشعر وتحفيز نموه باستخدام أحدث التقنيات الطبية.",
      en: "An integrated protocol for treating hair loss and stimulating its growth using the latest medical technologies."
    },
    icon: <Sparkles className="w-8 h-8" />,
    image: "https://i.postimg.cc/fRnkw09C/622029480-17923773360213824-1832947779910047733-n.jpg",
  },
  {
    id: "shingles",
    title: { ar: "علاج الحزام الناري", en: "Shingles Treatment" },
    description: {
      ar: "تشخيص وعلاج حالات الحزام الناري (الهربس النطاقي) وتوفير الرعاية الطبية اللازمة لتخفيف الآلام والحد من المضاعفات.",
      en: "Diagnosis and treatment of shingles cases (Herpes Zoster) and providing the necessary medical care to relieve pain and limit complications."
    },
    icon: <ShieldCheck className="w-8 h-8" />,
    image: "https://i.postimg.cc/nr3537tL/570824065-122187714230376669-4787344330446368436-n.jpg",
    videoUrl: "https://www.instagram.com/reel/C9IiT-tgdOG/embed",
  },
];

export const doctors = [
  {
    id: "sara",
    name: { ar: "د. سارة أحمد", en: "Dr. Sara Ahmed" },
    specialty: { ar: "استشاري الجلدية والتجميل", en: "Consultant of Dermatology & Aesthetics" },
    specialtyIds: ["filler", "skin", "meso"],
    experience: { ar: "12 سنة خبرة", en: "12 Years Experience" },
    image: "https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=800",
    credentials: {
      ar: [
        "دكتوراه الجلدية والتجميل - جامعة القاهرة",
        "عضو الجمعية الأمريكية لطب التجميل",
        "دبلوم متقدم في تطبيقات الليزر الطبية",
        "خبير معتمد في حقن الفيلر والبوتوكس من شركة Allergan"
      ],
      en: [
        "PhD in Dermatology & Aesthetics - Cairo University",
        "Member of the American Academy of Aesthetic Medicine",
        "Advanced Diploma in Medical Laser Applications",
        "Certified Expert in Filler & Botox injections from Allergan"
      ]
    },
    specializations: {
      ar: [
        "علاجات البشرة المتقدمة",
        "حقن الفيلر والبوتوكس",
        "علاج التصبغات والندبات",
        "الميزوثيرابي والخيوط التجميلية"
      ],
      en: [
        "Advanced Skincare Treatments",
        "Filler & Botox Injections",
        "Pigmentation & Scar Treatment",
        "Mesotherapy & Aesthetic Threads"
      ]
    },
    statement: {
      ar: "أؤمن بأن الجمال الحقيقي يبدأ من صحة البشرة، وهدفي دائماً هو الوصول لنتائج طبيعية تبرز جمالكِ الخاص دون مبالغة.",
      en: "I believe true beauty starts with healthy skin, and my goal is always to achieve natural results that highlight your unique beauty without exaggeration."
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "mohamed",
    name: { ar: "د. محمد علي", en: "Dr. Mohamed Ali" },
    specialty: { ar: "أخصائي الليزر وتنسيق القوام", en: "Laser & Body Contouring Specialist" },
    specialtyIds: ["laser", "body"],
    experience: { ar: "10 سنوات خبرة", en: "10 Years Experience" },
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    credentials: {
      ar: [
        "ماجستير الأمراض الجلدية والليزر",
        "زمالة المجلس الأوروبي لليزر الطبي",
        "مدرب معتمد لأجهزة الليزر من شركة Candela"
      ],
      en: [
        "Master's in Dermatology & Laser",
        "Fellowship of the European Medical Laser Council",
        "Certified Laser Trainer from Candela"
      ]
    },
    specializations: {
      ar: [
        "إزالة الشعر بالليزر",
        "علاج الدوالي السطحية",
        "نحت الجسم وتنسيق القوام",
        "علاج السيلوليت"
      ],
      en: [
        "Laser Hair Removal",
        "Superficial Vein Treatment",
        "Body Sculpting & Contouring",
        "Cellulite Treatment"
      ]
    },
    statement: {
      ar: "نستخدم أحدث التقنيات العالمية لنضمن لكِ نتائج فعالة وآمنة في وقت قياسي.",
      en: "We use the latest global technologies to ensure effective and safe results in record time."
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "nourhan",
    name: { ar: "د. نورهان خالد", en: "Dr. Nourhan Khaled" },
    specialty: { ar: "أخصائية العناية بالبشرة والشعر", en: "Skin & Hair Care Specialist" },
    specialtyIds: ["skin", "hair", "meso"],
    experience: { ar: "8 سنوات خبرة", en: "8 Years Experience" },
    image: "https://images.unsplash.com/photo-1594824436998-058a231b611c?auto=format&fit=crop&q=80&w=800",
    credentials: {
      ar: [
        "ماجستير الأمراض الجلدية - جامعة عين شمس",
        "دبلومة التجميل الطبي والعناية بالشعر",
        "عضو الجمعية الأفروآسيوية للتجميل"
      ],
      en: [
        "Master's in Dermatology - Ain Shams University",
        "Diploma in Medical Aesthetics & Hair Care",
        "Member of the Afro-Asian Society for Aesthetics"
      ]
    },
    specializations: {
      ar: [
        "بروتوكولات علاج تساقط الشعر",
        "جلسات النضارة والميزوثيرابي",
        "علاج حب الشباب وآثاره",
        "التقشير الكيميائي والبارد"
      ],
      en: [
        "Hair Loss Treatment Protocols",
        "Freshness & Mesotherapy Sessions",
        "Acne & Scar Treatment",
        "Chemical & Cold Peeling"
      ]
    },
    statement: {
      ar: "صحة شعرك وبشرتك هي انعكاس لاهتمامك الداخلي والخارجي، ونحن هنا لنقدم لكِ أفضل الحلول الطبية الموثوقة.",
      en: "The health of your hair and skin is a reflection of your internal and external care, and we are here to provide you with the best reliable medical solutions."
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "ahmed",
    name: { ar: "د. أحمد حسن", en: "Dr. Ahmed Hassan" },
    specialty: { ar: "استشاري الأمراض الجلدية والعلاج بالليزر", en: "Consultant of Dermatology & Laser Treatment" },
    specialtyIds: ["laser", "shingles", "skin"],
    experience: { ar: "15 سنة خبرة", en: "15 Years Experience" },
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    credentials: {
      ar: [
        "دكتوراه الأمراض الجلدية والتناسلية",
        "عضو الأكاديمية الأوروبية للأمراض الجلدية",
        "استشاري علاج الأمراض الجلدية المستعصية"
      ],
      en: [
        "PhD in Dermatology & Venereology",
        "Member of the European Academy of Dermatology",
        "Consultant for Incurable Skin Diseases"
      ]
    },
    specializations: {
      ar: [
        "علاج الحزام الناري والأمراض الفيروسية",
        "علاج الصدفية والبهاق",
        "إزالة الوحمات والتصبغات بالليزر",
        "الكشف المبكر عن أورام الجلد"
      ],
      en: [
        "Shingles & Viral Disease Treatment",
        "Psoriasis & Vitiligo Treatment",
        "Laser Removal of Birthmarks & Pigmentation",
        "Early Detection of Skin Tumors"
      ]
    },
    statement: {
      ar: "الخبرة الطبية الدقيقة هي الأساس في تشخيص وعلاج الأمراض الجلدية للوصول إلى الشفاء التام بإذن الله.",
      en: "Precise medical expertise is the foundation for diagnosing and treating skin diseases to achieve complete recovery, God willing."
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "reem",
    name: { ar: "د. ريم مصطفى", en: "Dr. Reem Mostafa" },
    specialty: { ar: "أخصائية التجميل غير الجراحي", en: "Non-Surgical Aesthetic Specialist" },
    specialtyIds: ["filler", "body", "skin"],
    experience: { ar: "9 سنوات خبرة", en: "9 Years Experience" },
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=800",
    credentials: {
      ar: [
        "البورد الأمريكي في الطب التجميلي",
        "دبلومة حقن الفيلر المتقدمة",
        "خبيرة معتمدة في تقنيات شد الوجه بدون جراحة"
      ],
      en: [
        "American Board of Aesthetic Medicine",
        "Advanced Filler Injection Diploma",
        "Certified Expert in Non-Surgical Facelift Techniques"
      ]
    },
    specializations: {
      ar: [
        "تحديد الفك وإبراز الملامح",
        "حقن البوتوكس لعلاج التجاعيد",
        "شد الوجه بالخيوط التجميلية",
        "نحت الجسم الموضعي"
      ],
      en: [
        "Jawline Contouring & Feature Enhancement",
        "Botox Injections for Wrinkles",
        "Aesthetic Thread Facelift",
        "Localized Body Sculpting"
      ]
    },
    statement: {
      ar: "اللمسات البسيطة تصنع فارقاً كبيراً، أسعى دائماً لإبراز جمالك الطبيعي بأحدث التقنيات الآمنة.",
      en: "Simple touches make a big difference, I always strive to highlight your natural beauty with the latest safe technologies."
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export const videos = [
  { id: 1, url: "https://www.instagram.com/reel/C9Vn1Dmg3Ga/embed" }, // تجربة الفنان ماجد المصري
  { id: 2, url: "https://www.instagram.com/reel/DBT2R1rMBIn/embed" }, // so check
  { id: 3, url: "https://www.instagram.com/reel/DS-gHSFDC3W/embed" }, // MesoJet
  { id: 4, url: "https://www.instagram.com/reel/C9IiT-tgdOG/embed" }, // الحزام الناري
];

export const results = [
  { title: { ar: "علاج التصبغات", en: "Pigmentation Treatment" }, image: "https://i.postimg.cc/VN5W7w5P/568279814-122187531290376669-8604403795620943965-n.jpg" },
  { title: { ar: "MesoJet", en: "MesoJet" }, image: "https://i.postimg.cc/TPWWL3pw/569019980-122187694472376669-2591032782597203251-n.jpg" },
  { title: { ar: "علاج تساقط الشعر", en: "Hair Loss Treatment" }, image: "https://i.postimg.cc/fRnkw09C/622029480-17923773360213824-1832947779910047733-n.jpg" },
  { title: { ar: "BOTOX", en: "BOTOX" }, image: "https://i.postimg.cc/nhmHqjYW/51g-VFHJJCc-L-AC-SX522.jpg" },
];

export const testimonials = [
  { name: { ar: "منى س.", en: "Mona S." }, text: { ar: "تجربة رائعة جداً، النتائج ظهرت من أول جلسة ليزر والتعامل في منتهى الرقي.", en: "A very wonderful experience, results appeared from the first laser session and the treatment was extremely sophisticated." }, rating: 5 },
  { name: { ar: "ياسمين ع.", en: "Yasmine A." }, text: { ar: "أفضل عيادة تجميل في التجمع، دقة في المواعيد واحترافية طبية عالية.", en: "The best beauty clinic in the Settlement, precision in appointments and high medical professionalism." }, rating: 5 },
  { name: { ar: "نورهان م.", en: "Nourhan M." }, text: { ar: "عملت جلسة فيلر والنتيجة طبيعية جداً وممتازة، شكراً دكتورة سارة.", en: "I had a filler session and the result was very natural and excellent, thank you Dr. Sara." }, rating: 5 },
  { name: { ar: "ليلى ك.", en: "Layla K." }, text: { ar: "العيادة نظيفة جداً والأجهزة حديثة، والنتائج فاقت توقعاتي في جلسات النضارة.", en: "The clinic is very clean, the devices are modern, and the results exceeded my expectations in freshness sessions." }, rating: 5 },
  { name: { ar: "سارة ف.", en: "Sarah F." }, text: { ar: "فريق عمل ودود جداً وأطباء متميزين، أنصح الجميع بزيارة وي ديرما.", en: "Very friendly staff and excellent doctors, I recommend everyone to visit We Derma." }, rating: 5 },
  { name: { ar: "هبة ن.", en: "Heba N." }, text: { ar: "أفضل مكان لعمل الهيدرافيشل، بشرتي بقت أنعم وأكتر إشراقاً بكتير.", en: "Best place for HydraFacial, my skin became much smoother and brighter." }, rating: 5 },
];

export const faqs = [
  {
    question: { ar: "هل جلسات الليزر مؤلمة؟", en: "Are laser sessions painful?" },
    answer: { 
      ar: "نستخدم أحدث أجهزة الليزر المزودة بأنظمة تبريد متطورة (Dynamic Cooling Device) لضمان أقصى درجات الراحة وتقليل الشعور بالألم إلى أدنى مستوياته.",
      en: "We use the latest laser devices equipped with advanced cooling systems (Dynamic Cooling Device) to ensure maximum comfort and reduce pain to its lowest levels."
    }
  },
  {
    question: { ar: "متى تظهر نتائج الفيلر والبوتوكس؟", en: "When do filler and botox results appear?" },
    answer: {
      ar: "تظهر نتائج الفيلر فوراً بعد الجلسة وتتحسن خلال أسبوعين. أما البوتوكس فيبدأ مفعوله بالظهور خلال 3-5 أيام وتكتمل النتيجة خلال 14 يوماً.",
      en: "Filler results appear immediately after the session and improve within two weeks. Botox starts taking effect within 3-5 days and the full result is complete within 14 days."
    }
  },
  {
    question: { ar: "كم عدد الجلسات التي أحتاجها لإزالة الشعر نهائياً؟", en: "How many sessions do I need for permanent hair removal?" },
    answer: {
      ar: "يختلف عدد الجلسات من شخص لآخر حسب طبيعة الشعر ولون البشرة والمنطقة المعالجة، ولكن في المتوسط يحتاج المراجع من 6 إلى 8 جلسات للحصول على نتائج مرضية.",
      en: "The number of sessions varies from person to person depending on hair nature, skin color, and the treated area, but on average, the client needs 6 to 8 sessions to get satisfactory results."
    }
  },
  {
    question: { ar: "هل استشارة الطبيب مجانية؟", en: "Is the doctor's consultation free?" },
    answer: {
      ar: "نعم، نقدم استشارة أولية مجانية لتقييم الحالة وتحديد الخطة العلاجية المناسبة لكِ.",
      en: "Yes, we offer a free initial consultation to evaluate the case and determine the appropriate treatment plan for you."
    }
  }
];
