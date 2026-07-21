// ========== GLOBAL STATE & CONFIGURATION ==========
const appState = {
  currentPage: "home",
  direction: localStorage.getItem("direction") || "ltr",
  language: localStorage.getItem("language") || "en",
  theme: localStorage.getItem("theme") || "light",
  currentSlide: 0,
  selectedCategory: "",
  selectedSubcategory: "",
};

// ========== NAVIGATION DATA ==========
const navigationLinks = [
  { id: "home", label_en: "Home", label_ar: "الصفحة الرئيسية", path: "#home" },

  { id: "about", label_en: "About", label_ar: "عن المصنع", path: "#about" },

  {
    id: "products",
    label_en: "Products",
    label_ar: "المنتجات",
    path: "#products",

    megaMenu: [
      // Column 1
      {
        title_en: "Category",
        title_ar: "الفئات",

        items: [
          {
            label_en: "Civilian Products",
            label_ar: "المنتجات المدنية",
            path: "#products",
          },
          {
            label_en: "Corporate Products",
            label_ar: "منتجات الشركات",
            path: "#products",
          },
          {
            label_en: "Military Products",
            label_ar: "المنتجات العسكرية",
            path: "#products",
          },
          {
            label_en: "Furniture",
            label_ar: "الأثاث",
            path: "#products",
          },
          {
            label_en: "Plastic Products",
            label_ar: "المنتجات البلاستيكية",
            path: "#products",
          },
        ],
      },

      // Column 2
      {
        title_en: "Civilian Products",
        title_ar: "المنتجات المدنية",

        items: [
          {
            label_en: "Home Furniture",
            label_ar: "الأثاث المنزلي",
            path: "#products",
          },
          {
            label_en: "Office Furniture",
            label_ar: "الأثاث المكتبي",
            path: "#products",
          },
          {
            label_en: "Electric Vehicles",
            label_ar: "وسائل النقل الكهربائية",
            path: "#products",
          },
          {
            label_en: "Plastic Products",
            label_ar: "المنتجات البلاستيكية",
            path: "#products",
          },
        ],
      },

      // Column 3
      {
        title_en: "Corporate & Military",
        title_ar: "منتجات الشركات والعسكرية",

        items: [
          {
            label_en: "Corporate Products",
            label_ar: "منتجات الشركات",
            path: "#products",
          },
          {
            label_en: "Cash Transport Vehicles",
            label_ar: "مركبات نقل الأموال",
            path: "#products",
          },
          {
            label_en: "Armored Vehicles",
            label_ar: "المركبات المصفحة",
            path: "#products",
          },
          {
            label_en: "Military Products",
            label_ar: "المنتجات العسكرية",
            path: "#products",
          },
          {
            label_en: "Tactical Equipment",
            label_ar: "المعدات التكتيكية",
            path: "#products",
          },
        ],
      },

      // Column 4
      {
        title_en: "Furniture",
        title_ar: "الأثاث",

        items: [
          {
            label_en: "Home Furniture",
            label_ar: "الأثاث المنزلي",
            path: "#products",
          },
          {
            label_en: "Office Furniture",
            label_ar: "الأثاث المكتبي",
            path: "#products",
          },
          {
            label_en: "Hotel Furniture",
            label_ar: "الأثاث الفندقي",
            path: "#products",
          },
          {
            label_en: "Furnish Your Home",
            label_ar: "مبادرة أفرش بيتك",
            path: "#products",
          },
        ],
      },
    ],
  },

  {
    id: "projects",
    label_en: "Projects",
    label_ar: "المشاريع",
    path: "#projects",
  },

  {
    id: "contact",
    label_en: "Contact Us",
    label_ar: "اتصل بنا",
    path: "#contact",
  },

  { id: "news", label_en: "News", label_ar: "آخر الأخبار", path: "#news" },

  {
    id: "videos",
    label_en: "Video Library",
    label_ar: "معرض الفيديوهات",
    path: "#videos",
  },
];

// ========== SLIDER DATA ==========
const sliderData = {
  en: [
    {
      title: "",
      subTitle: "",
      text: "",
      url: "/images/b-0.png",
      cta: "",
      path: "",
    },
    {
      title: "Technology Centers",
      subTitle: "Diverse Industries, Unified Excellence",
      text: "Explore our state-of-the-art technology centers, equipped with cutting-edge tools and innovations.",
      url: "/images/cat-9.webp",
      cta: "",
      path: "/",
    },
    {
      title: "Electronic Motorbikes",
      subTitle: "Diverse Industries, Unified Excellence",
      text: "Discover our range of eco-friendly electronic motorbikes.",
      url: "/images/b-1.webp",
      cta: "",
      path: "/",
    },
    {
      title: "Office Furniture",
      subTitle: "Diverse Industries, Unified Excellence",
      text: "Transform your living spaces with our premium home furniture collection.",
      url: "/images/b-3.webp",
      cta: "",
      path: "/",
    },
    {
      title: "National Bank of Egypt",
      subTitle: "Furnish Your Home, Your Way",
      text: "Get everything you need for your home with instant financing and hassle-free procedures from NBE.",
      url: "/images/b-2.webp",
      cta: "",
      path: "/",
    },
  ],
  ar: [
    {
      title: "AOI",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "حوّل مساحات معيشتك مع مجموعة أثاث المنزل الفاخرة لدينا.",
      url: "/images/b-0.png",
      cta: "",
      path: "/",
    },
    {
      title: "مراكز التكنولوجيا",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "اكتشف مراكز التكنولوجيا الحديثة لدينا والمجهزة بأحدث الأدوات والابتكارات.",
      url: "/images/b-1.png",
      cta: "",
      path: "/",
    },
    {
      title: "المركبات الإلكترونية",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "اكتشف مجموعة المركبات الإلكترونية الصديقة للبيئة.",
      url: "/images/cat-7.webp",
      cta: "",
      path: "/",
    },
    {
      title: "أثاث المنزل",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "حوّل مساحات معيشتك مع مجموعة أثاث المنزل الفاخرة لدينا.",
      url: "/images/b-3.jpg",
      cta: "",
      path: "/",
    },
    {
      title: "أثاث المنزل",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "حوّل مساحات معيشتك مع مجموعة أثاث المنزل الفاخرة لدينا.",
      url: "/images/b-3.jpg",
      cta: "",
      path: "",
    },
  ],
};

// ========== PRODUCTS DATA ==========
const productsData = {
  en: [
    // ---- Home Furniture ----
    {
      title: "Bedroom",
      desc: "Spacious wardrobe with premium finish for master bedrooms.",
      url: "/images/prd-4.webp",
      category: "home-furniture",
      sub_category: "Master Room",
      price: 350,
      // oldPrice: 450,
    },
    {
      title: "Living Room Sofa",
      desc: "Three-seat sofa upholstered in durable fabric.",
      url: "/images/prd-3.webp",
      category: "home-furniture",
      sub_category: "Living Room",
      price: 420,
      oldPrice: 520,
    },

    // ---- Office Furniture ----
    {
      title: "Hydraulic Office Chair",
      desc: "Ergonomic chair with adjustable height and lumbar support.",
      url: "/images/prd-5.webp",
      category: "office-furniture",
      sub_category: "Hydraulic Chairs",
      price: 120,
      oldPrice: 180,
    },
    {
      title: "Executive Desk",
      desc: "Solid wood desk with built-in storage drawers.",
      url: "/images/prd-4.webp",
      category: "office-furniture",
      sub_category: "Desks",
      price: 520,
      oldPrice: 650,
    },

    // ---- Military ----
    {
      title: "Armored Personnel Carrier",
      desc: "Heavy-duty armored vehicle for troop transport.",
      url: "/images/prd-5.webp",
      category: "military",
      sub_category: "Armored Carriers",
      price: 185000,
      // oldPrice: 210000,
    },
    {
      title: "Field Command Vehicle",
      desc: "Mobile command unit equipped for battlefield coordination.",
      url: "/images/prd-6.webp",
      category: "military",
      sub_category: "Command Vehicles",
      price: 142000,
      oldPrice: 165000,
    },

    // ---- Firefighting ----
    {
      title: "Pumper Fire Truck",
      desc: "High-pressure pump truck for structural fire response.",
      url: "/images/prd-1.webp",
      category: "firefighting",
      sub_category: "Pumper Trucks",
      price: 96000,
      oldPrice: 112000,
    },
    {
      title: "Aerial Ladder Truck",
      desc: "Extendable ladder truck for high-rise rescue operations.",
      url: "/images/prd-2.webp",
      category: "firefighting",
      sub_category: "Ladder Trucks",
      price: 134000,
      // oldPrice: 155000,
    },

    // ---- Ambulance ----
    {
      title: "ICU Ambulance",
      desc: "Fully equipped ambulance with intensive care unit fittings.",
      url: "/images/prd-3.webp",
      category: "ambulance",
      sub_category: "ICU Ambulance",
      price: 78000,
      oldPrice: 92000,
    },
    {
      title: "Basic Life Support Ambulance",
      desc: "Standard ambulance equipped for emergency first response.",
      url: "/images/prd-4.webp",
      category: "ambulance",
      sub_category: "Basic Life Support",
      price: 52000,
      oldPrice: 61000,
    },

    // ---- Tech Centers ----
    {
      title: "Mobile Tech Unit",
      desc: "Self-contained mobile lab for on-site technical work.",
      url: "/images/prd-5.webp",
      category: "tech-centers",
      sub_category: "Mobile Labs",
      price: 68000,
      oldPrice: 79000,
    },
    {
      title: "Communication Center Vehicle",
      desc: "Mobile unit outfitted for field communications and networking.",
      url: "/images/prd-6.webp",
      category: "tech-centers",
      sub_category: "Comm Units",
      price: 71000,
      // oldPrice: 84000,
    },

    // ---- Electric Transport ----
    {
      title: "Electric Bike",
      desc: "Lightweight electric bike for short urban commutes.",
      url: "/images/prd-1.webp",
      category: "electric-transport",
      sub_category: "Electric Bikes",
      price: 950,
      oldPrice: 1150,
    },
    {
      title: "Electric Golf Cart",
      desc: "Four-seat electric cart suited for resorts and campuses.",
      url: "/images/prd-2.webp",
      category: "electric-transport",
      sub_category: "Golf Carts",
      price: 4200,
      oldPrice: 4900,
    },

    // ---- Plastic Products ----
    {
      title: "Plastic Storage Box",
      desc: "Stackable storage box with secure locking lid.",
      url: "/images/prd-3.webp",
      category: "plastic",
      sub_category: "Storage Boxes",
      price: 18,
      oldPrice: 25,
    },
    {
      title: "Plastic Outdoor Chair",
      desc: "Weather-resistant chair for gardens and patios.",
      url: "/images/prd-4.webp",
      category: "plastic",
      sub_category: "Outdoor Furniture",
      price: 32,
      // oldPrice: 40,
    },
  ],
  ar: [
    // ---- أثاث منزلي ----
    {
      title: "دولاب غرفة نوم",
      desc: "دولاب فسيح بتشطيب فاخر يناسب غرف النوم الرئيسية.",
      url: "/images/prd-1.webp",
      category: "home-furniture",
      sub_category: "غرفة النوم",
      price: 350,
      // oldPrice: 450,
    },
    {
      title: "كنبة صالة",
      desc: "كنبة ثلاثية المقاعد مصنوعة من قماش متين.",
      url: "/images/prd-2.webp",
      category: "home-furniture",
      sub_category: "الصالة",
      price: 420,
      oldPrice: 520,
    },

    // ---- أثاث مكتبي ----
    {
      title: "كرسي مكتب هيدروليك",
      desc: "كرسي مريح بارتفاع قابل للتعديل ودعم أسفل الظهر.",
      url: "/images/prd-3.webp",
      category: "office-furniture",
      sub_category: "كراسي هيدروليك",
      price: 120,
      oldPrice: 180,
    },
    {
      title: "مكتب تنفيذي",
      desc: "مكتب خشبي صلب مزود بأدراج تخزين مدمجة.",
      url: "/images/prd-4.webp",
      category: "office-furniture",
      sub_category: "مكاتب",
      price: 520,
      oldPrice: 650,
    },

    // ---- عسكري ----
    {
      title: "ناقلة جنود مدرعة",
      desc: "مركبة مدرعة شديدة التحمل لنقل الجنود.",
      url: "/images/prd-5.webp",
      category: "military",
      sub_category: "ناقلات مدرعة",
      price: 185000,
      // oldPrice: 210000,
    },
    {
      title: "مركبة قيادة ميدانية",
      desc: "وحدة قيادة متنقلة مجهزة لتنسيق العمليات الميدانية.",
      url: "/images/prd-6.webp",
      category: "military",
      sub_category: "مركبات قيادة",
      price: 142000,
      oldPrice: 165000,
    },

    // ---- إطفاء ----
    {
      title: "شاحنة إطفاء بمضخة",
      desc: "شاحنة بمضخة عالية الضغط للاستجابة لحرائق المباني.",
      url: "/images/prd-1.webp",
      category: "firefighting",
      sub_category: "شاحنات مضخة",
      price: 96000,
      oldPrice: 112000,
    },
    {
      title: "شاحنة سلم هوائي",
      desc: "شاحنة بسلم قابل للتمديد لعمليات الإنقاذ في المباني العالية.",
      url: "/images/prd-2.webp",
      category: "firefighting",
      sub_category: "شاحنات سلم",
      price: 134000,
      // oldPrice: 155000,
    },

    // ---- إسعاف ----
    {
      title: "سيارة إسعاف عناية مركزة",
      desc: "سيارة إسعاف مجهزة بالكامل بتجهيزات العناية المركزة.",
      url: "/images/prd-3.webp",
      category: "ambulance",
      sub_category: "عناية مركزة",
      price: 78000,
      oldPrice: 92000,
    },
    {
      title: "سيارة إسعاف أساسي",
      desc: "سيارة إسعاف قياسية مجهزة للاستجابة الطارئة الأولى.",
      url: "/images/prd-4.webp",
      category: "ambulance",
      sub_category: "إسعاف أساسي",
      price: 52000,
      oldPrice: 61000,
    },

    // ---- مراكز تقنية ----
    {
      title: "وحدة تقنية متنقلة",
      desc: "معمل متنقل ذاتي الاحتواء للعمل التقني الميداني.",
      url: "/images/prd-5.webp",
      category: "tech-centers",
      sub_category: "معامل متنقلة",
      price: 68000,
      oldPrice: 79000,
    },
    {
      title: "مركبة مركز اتصالات",
      desc: "وحدة متنقلة مجهزة للاتصالات والشبكات الميدانية.",
      url: "/images/prd-6.webp",
      category: "tech-centers",
      sub_category: "وحدات اتصال",
      price: 71000,
      // oldPrice: 84000,
    },

    // ---- نقل كهربائي ----
    {
      title: "دراجة كهربائية",
      desc: "دراجة كهربائية خفيفة الوزن للتنقلات الحضرية القصيرة.",
      url: "/images/prd-1.webp",
      category: "electric-transport",
      sub_category: "دراجات كهربائية",
      price: 950,
      oldPrice: 1150,
    },
    {
      title: "عربة جولف كهربائية",
      desc: "عربة كهربائية بأربعة مقاعد تناسب المنتجعات والحرم الجامعي.",
      url: "/images/prd-2.webp",
      category: "electric-transport",
      sub_category: "عربات جولف",
      price: 4200,
      oldPrice: 4900,
    },

    // ---- منتجات بلاستيكية ----
    {
      title: "صندوق تخزين بلاستيك",
      desc: "صندوق تخزين قابل للتكديس بغطاء قفل آمن.",
      url: "/images/prd-3.webp",
      category: "plastic",
      sub_category: "صناديق تخزين",
      price: 18,
      oldPrice: 25,
    },
    {
      title: "كرسي بلاستيك خارجي",
      desc: "كرسي مقاوم للعوامل الجوية للحدائق والشرفات.",
      url: "/images/prd-4.webp",
      category: "plastic",
      sub_category: "أثاث خارجي",
      price: 32,
      // oldPrice: 40,
    },
  ],
};

// ========== Category DATA ==========
const categories = [
  {
    img: "/images/cat-7.webp",
    nameEn: "Electric Transport",
    nameAr: "نقل كهربائي",
    variantsEn: ["Electric Buses", "Electric Vans", "Charging Units"],
    variantsAr: ["حافلات كهربائية", "فانات كهربائية", "وحدات شحن"],
    page: "products",
    categoryId: "electric-transport",
  },
  {
    img: "/images/cat-11.webp",
    nameEn: "Furnish Home",
    nameAr: "افرش بيتك",
    variantsEn: ["Living Room Sets", "Bedroom Sets", "Kitchen Packages"],
    variantsAr: ["طقم صالة", "طقم غرفة نوم", "باقات مطبخ"],
    page: "products",
    categoryId: "furnish-home",
  },
  {
    img: "/images/cat-8.webp",
    nameEn: "Home Furniture",
    nameAr: "أثاث منزلي",
    variantsEn: ["Sofas", "Dining Tables", "Bedroom Furniture"],
    variantsAr: ["كنب", "طاولات سفرة", "أثاث غرف نوم"],
    page: "products",
    categoryId: "home-furniture",
  },
  {
    img: "/images/cat-5.webp",
    nameEn: "Office Furniture",
    nameAr: "أثاث مكتبي",
    variantsEn: ["Office Desks", "Ergonomic Chairs", "Storage Cabinets"],
    variantsAr: ["مكاتب", "كراسي مريحة", "خزائن تخزين"],
    page: "products",
    categoryId: "office-furniture",
  },
  {
    img: "/images/cat-6.webp",
    nameEn: "Plastic Products",
    nameAr: "منتجات بلاستيكية",
    variantsEn: ["Storage Boxes", "Outdoor Furniture", "Household Items"],
    variantsAr: ["صناديق تخزين", "أثاث خارجي", "أدوات منزلية"],
    page: "products",
    categoryId: "plastic",
  },
  {
    img: "/images/cat-9.webp",
    nameEn: "Tech Centers",
    nameAr: "مراكز تقنية",
    variantsEn: ["Mobile Labs", "Comm Units", "Server Cabins"],
    variantsAr: ["معامل متنقلة", "وحدات اتصال", "غرف سيرفرات"],
    page: "products",
    categoryId: "tech-centers",
  },
  {
    img: "/images/cat-4.webp",
    nameEn: "Firefighting",
    nameAr: "إطفاء",
    variantsEn: ["Pumper Trucks", "Ladder Trucks", "Rescue Units"],
    variantsAr: ["شاحنات إطفاء", "سلالم آلية", "وحدات إنقاذ"],
    page: "products",
    categoryId: "firefighting",
  },
  {
    img: "/images/cat-2.webp",
    nameEn: "Cash Transfer",
    nameAr: "نقل الأموال",
    variantsEn: ["Armored Vans", "ATM Trucks", "Escort Vehicles"],
    variantsAr: ["فانات مصفحة", "شاحنات صرافات", "مركبات مرافقة"],
    page: "products",
    categoryId: "cash-transfer",
  },
  {
    img: "/images/cat-3.webp",
    nameEn: "Ambulance",
    nameAr: "إسعاف",
    variantsEn: ["Basic Life Support", "ICU Ambulance", "Off-Road Units"],
    variantsAr: ["إسعاف أساسي", "إسعاف عناية مركزة", "وحدات وعرة"],
    page: "products",
    categoryId: "ambulance",
  },
  {
    img: "/images/cat-10.webp",
    nameEn: "Military",
    nameAr: "عسكري",
    variantsEn: ["Armored Carriers", "Field Trucks", "Command Vehicles"],
    variantsAr: ["ناقلات مدرعة", "شاحنات ميدانية", "مركبات قيادة"],
    page: "products",
    categoryId: "military",
  },
];

// ========== Projects DATA ==========
const projects = [
  {
    id: "cnc-horizontal-lathe",
    img: "/images/prj-1.webp",
    titleEn: "CNC Horizontal Lathe",
    titleAr: "مخرطة أفقية CNC",
    descEn:
      "High-precision CNC horizontal lathe available for rental, ideal for machining shafts, cylinders, and precision metal components.",
    descAr:
      "مخرطة أفقية CNC عالية الدقة متاحة للإيجار، مثالية لتشغيل الأعمدة والأسطوانات والقطع المعدنية الدقيقة.",
  },
  {
    id: "cnc-turning-center",
    img: "/images/prj-2.webp",
    titleEn: "CNC Turning Center",
    titleAr: "مركز خراطة CNC",
    descEn:
      "Advanced CNC turning center designed for complex turning operations with exceptional accuracy and productivity.",
    descAr:
      "مركز خراطة CNC متطور متاح للإيجار لتنفيذ عمليات الخراطة المعقدة بدقة وكفاءة عالية.",
  },
  {
    id: "cnc-vertical-milling-machine",
    img: "/images/prj-3.webp",
    titleEn: "CNC Vertical Milling Machine",
    titleAr: "فريزة رأسية CNC",
    descEn:
      "Professional CNC vertical milling machine for precision milling, drilling, and machining of various metal parts.",
    descAr:
      "فريزة رأسية CNC احترافية متاحة للإيجار لتنفيذ عمليات التفريز والثقب وتشغيل المعادن بدقة عالية.",
  },
  {
    id: "cnc-boring-machine",
    img: "/images/prj-4.webp",
    titleEn: "CNC Boring Machine",
    titleAr: "فريزة بورينج CNC",
    descEn:
      "Heavy-duty CNC boring machine suitable for large-scale precision boring and machining applications.",
    descAr:
      "فريزة بورينج CNC متاحة للإيجار، مناسبة لعمليات التجويف وتشغيل القطع الكبيرة بأعلى مستويات الدقة.",
  },
];

// ========== Clients DATA ==========
const clients = [
  { name: "Client 1", logo: "/images/prt-1.webp" },
  { name: "Client 2", logo: "/images/prt-2.webp" },
  { name: "Client 3", logo: "/images/prt-3.webp" },
  { name: "Client 4", logo: "/images/prt-4.webp" },
  { name: "Client 5", logo: "/images/prt-5.webp" },
  { name: "Client 6", logo: "/images/prt-6.webp" },
  { name: "Client 7", logo: "/images/prt-7.webp" },
];

// ========== UTILITY FUNCTIONS ==========

/**
 * Get text based on current language
 */
function getText(obj, key) {
  const currentLang = appState.language === "ar" ? "ar" : "en";
  return obj[`${key}_${currentLang}`] || obj[key] || "";
}

/**
 * Get label based on language
 */
function getLabel(en, ar) {
  return appState.language === "ar" ? ar : en;
}

/**
 * Get CSS class for direction
 */
function getDirectionClass(enClass, arClass) {
  return appState.direction === "rtl" ? arClass : enClass;
}

/**
 * Toggle theme (light/dark)
 */
function toggleTheme() {
  const newTheme = appState.theme === "light" ? "dark" : "light";
  appState.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  document.body.setAttribute("data-theme", newTheme);
  updateLogoBasedOnTheme();
}

/**
 * Update logo based on theme
 */
function updateLogoBasedOnTheme() {
  const logoImg = document.getElementById("logoImg");
  if (logoImg) {
    if (appState.theme === "dark") {
      logoImg.src = "/images/logo-kader-white.png";
    } else {
      logoImg.src = "/images/logo-kader.png";
    }
  }
}

/**
 * Toggle language and direction
 */
function toggleLanguage() {
  const newLang = appState.language === "ar" ? "en" : "ar";
  const newDir = appState.direction === "ltr" ? "rtl" : "ltr";

  appState.language = newLang;
  appState.direction = newDir;

  localStorage.setItem("language", newLang);
  localStorage.setItem("direction", newDir);

  document.documentElement.lang = newLang;
  document.documentElement.dir = newDir;

  location.reload();
}

/**
 * Initialize navigation
 */
function initializeNavigation() {
  const navContainer = document.querySelector(".navbar-nav");
  if (!navContainer) return;

  navContainer.innerHTML = "";

  navigationLinks.forEach((link, index) => {
    const isMegaMenu = link.megaMenu && link.megaMenu.length > 0;

    if (isMegaMenu) {
      const megaMenuHTML = `
        <div class="nav-item dropdown position-static text-center">

            <a class="nav-link py-4 text-white" href="${link.path}" data-bs-toggle="dropdown">
                <span class="dropdown-toggle">
                    ${getLabel(link.label_en, link.label_ar)}
                </span>
            </a>

            <div class="dropdown-menu mega-menu p-4">

                <div class="d-lg-flex justify-content-lg-evenly align-items-lg-start">

                    ${link.megaMenu
                      .map(
                        (column) => `

                        <div class="d-flex flex-column">

                            <h6 class="mega-title">
                                ${getLabel(column.title_en, column.title_ar)}
                            </h6>

                            ${column.items
                              .map(
                                (item) => `

                                <a class="dropdown-item"
                                   href="${item.path}"
                                   onclick="setCurrentPage('products')">

                                    ${getLabel(item.label_en, item.label_ar)}

                                </a>

                            `,
                              )
                              .join("")}

                        </div>

                    `,
                      )
                      .join("")}

                </div>

            </div>

        </div>
    `;

      navContainer.innerHTML += megaMenuHTML;
    } else {
      const linkHTML = `
            <a class="nav-item nav-link py-4 text-white"
               href="${link.path}"
               onclick="setCurrentPage('${link.id}')"
               id="nav-${link.id}">

                ${getLabel(link.label_en, link.label_ar)}

            </a>
        `;

      navContainer.innerHTML += linkHTML;
    }
  });

  // Add separator line
  // navContainer.innerHTML += '<div class="d-none d-lg-block vertical-line m-4"></div>';

  const topRightControls = document.getElementById("topRightControls");
  const navLinksContainer = document.getElementById("navLinksContainer");

  // ---- TOP ROW: cart, profile, theme, language ----

  // Search Bar
  const searchInput = document.getElementById("searchInput");
  const searchDropdown = document.getElementById("searchDropdown");

  searchInput.addEventListener("input", function () {
    const query = this.value.trim();

    if (query.length === 0) {
      searchDropdown.classList.add("d-none");
      searchDropdown.innerHTML = "";
      return;
    }

    // Replace this with your real search/filter logic
    const results = getSearchSuggestions(query); // returns an array of { label, url } or similar

    if (results.length === 0) {
      searchDropdown.innerHTML = `<div class="list-group-item text-muted">${getLabel("No results found", "لا توجد نتائج")}</div>`;
    } else {
      searchDropdown.innerHTML = results
        .map(
          (item) => `
            <a href="${item.url}" class="list-group-item list-group-item-action">${item.label}</a>
        `,
        )
        .join("");
    }

    searchDropdown.classList.remove("d-none");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!document.getElementById("searchWrapper").contains(e.target)) {
      searchDropdown.classList.add("d-none");
    }
  });

  // Example placeholder function — swap with your real data source (products array, API call, etc.)
  function getSearchSuggestions(query) {
    const allItems = window.appState?.products || []; // adjust to your data source
    return allItems
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8)
      .map((p) => ({ label: p.name, url: `/product/${p.id}` }));
  }

  // Cart button
  topRightControls.innerHTML += `
    <a class="nav-link position-relative" href="/cart" id="cartBtn">
        <i class="fas fa-shopping-cart mx-1"></i>
        ${getLabel("Cart", "السلة")}
        <span class="badge bg-primary rounded-pill position-absolute top-0 start-100 translate-middle" id="cartCount" style="font-size: 0.65rem;">
            ${appState.cartCount || 0}
        </span>
    </a>
`;

  // Profile/account dropdown
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
            <i class="fas fa-user mx-1"></i>
            ${appState.user ? appState.user.name : getLabel("Account", "الحساب")}
        </a>
        <div class="dropdown-menu ${appState.language === "ar" ? "text-end" : "text-start"}" style="min-width: fit-content;">
            ${
              appState.user
                ? `
                <a class="dropdown-item" href="/profile">${getLabel("My Profile", "ملفي الشخصي")}</a>
                <a class="dropdown-item" href="/orders">${getLabel("My Orders", "طلباتي")}</a>
                <a class="dropdown-item" onclick="logout()">${getLabel("Logout", "تسجيل الخروج")}</a>
            `
                : `
                <a class="dropdown-item" href="/login">${getLabel("Login", "تسجيل الدخول")}</a>
                <a class="dropdown-item" href="/register">${getLabel("Register", "تسجيل جديد")}</a>
            `
            }
        </div>
    </div>
`;

  // Theme toggle
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
            <i class="fas fa-${appState.theme === "dark" ? "moon" : "sun"} mx-1"></i>
            ${getLabel("Theme", "الوضع")}
        </a>
        <div class="dropdown-menu " style="min-width: 6rem;">
            <a class="dropdown-item" onclick="toggleTheme()">
                ${appState.theme === "dark" ? getLabel("Light", "الوضع الفاتح") : getLabel("Dark", "الوضع الداكن")}
            </a>
        </div>
    </div>
`;

  // Language toggle
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
            <i class="fas fa-globe mx-1"></i>
            ${appState.language === "ar" ? "ع" : "EN"}
        </a>
        <div class="dropdown-menu ${appState.language === "ar" ? "text-start" : "text-end"}" style="min-width: 6rem;">
            <a class="dropdown-item" onclick="toggleLanguage()">
                ${appState.language === "ar" ? "English" : "العربية"}
            </a>
        </div>
    </div>
`;

  // ---- SECOND ROW: category / nav links ----
  // (keep your existing loop that builds category links, just target navLinksContainer instead of navContainer)

  /* ======================================================================
   MOBILE TOP BAR — logo + hamburger button (visible only on small screens)
   ====================================================================== */
  function initializeMobileTopBar() {
    const mount = document.getElementById("mobileTopBar");
    if (!mount) return;

    mount.innerHTML = `
        <div class="mobile-topbar d-lg-none">
            <button class="hamburger-btn" id="hamburgerBtn" aria-label="Open menu">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    `;

    document
      .getElementById("hamburgerBtn")
      .addEventListener("click", openMobileMenu);
  }

  /* ======================================================================
       MOBILE MENU OVERLAY — main nav links
       ====================================================================== */
  function initializeMobileMenu() {
    const mount = document.getElementById("mobileMenu");
    if (!mount) return;

    mount.innerHTML = `
        <div class="nav-overlay" id="mobileMenuPanel">
            <div class="overlay-header">
                <span class="overlay-title">${getLabel("Menu", "القائمة")}</span>
                <button class="overlay-icon-btn" id="closeMobileMenuBtn" aria-label="Close menu">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>

            <div class="overlay-body">
                ${navigationLinks
                  .map((link) => {
                    const hasMega = link.megaMenu && link.megaMenu.length > 0;
                    if (hasMega) {
                      return `
                            <a href="#" class="overlay-link" data-mega-trigger="${link.id}">
                                ${getLabel(link.label_en, link.label_ar)}
                                <i class="fas fa-chevron-right chevron"></i>
                            </a>
                        `;
                    }
                    return `
                        <a href="${link.path}" class="overlay-link" onclick="setCurrentPage('${link.id}')">
                            ${getLabel(link.label_en, link.label_ar)}
                        </a>
                    `;
                  })
                  .join("")}
            </div>
        </div>
    `;

    document
      .getElementById("closeMobileMenuBtn")
      .addEventListener("click", closeMobileMenu);

    // Wire up any link that opens a mega menu (e.g. "Products")
    mount.querySelectorAll("[data-mega-trigger]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const link = navigationLinks.find(
          (l) => l.id === el.getAttribute("data-mega-trigger"),
        );
        if (link) openMegaMenu(link);
      });
    });
  }

  function openMobileMenu() {
    document.getElementById("mobileMenuPanel").classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    document.getElementById("mobileMenuPanel").classList.remove("is-open");
    closeMegaMenu();
    document.body.style.overflow = "";
  }

  /* ======================================================================
       MEGA MENU OVERLAY — Products sub-menu (sibling div, sits on top)
       ====================================================================== */
  function openMegaMenu(link) {
    const mount = document.getElementById("megaMenuOverlay");
    if (!mount) return;

    mount.innerHTML = `
        <div class="nav-overlay" id="megaMenuPanel">
            <div class="overlay-header">
                <button class="overlay-icon-btn" id="backToMobileMenuBtn" aria-label="Back">
                    <i class="fas fa-arrow-${appState.language === "ar" ? "right" : "left"}"></i>
                </button>
                <span class="overlay-title">${getLabel(link.label_en, link.label_ar)}</span>
                <button class="overlay-icon-btn" id="closeMegaMenuBtn" aria-label="Close menu">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>

            <div class="overlay-body" style="padding:0;">
                ${link.megaMenu
                  .map(
                    (column) => `
                    <div class="mega-section">
                        <h6>${getLabel(column.title_en, column.title_ar)}</h6>
                        ${column.items
                          .map(
                            (item) => `
                            <a href="${item.path}" onclick="setCurrentPage('${link.id}')">
                                ${getLabel(item.label_en, item.label_ar)}
                            </a>
                        `,
                          )
                          .join("")}
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `;

    const panel = document.getElementById("megaMenuPanel");

    // force the browser to register the starting position (translateX 100%)
    // before we flip the class, otherwise there's nothing to transition from
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.add("is-open");
      });
    });

    document
      .getElementById("backToMobileMenuBtn")
      .addEventListener("click", closeMegaMenu);
    document
      .getElementById("closeMegaMenuBtn")
      .addEventListener("click", closeMobileMenu);
  }

  function closeMegaMenu() {
    const panel = document.getElementById("megaMenuPanel");
    if (panel) panel.classList.remove("is-open");
  }

  /* ======================================================================
       INIT — call these alongside your existing initializeNavigation()
       ====================================================================== */
  initializeMobileTopBar();
  initializeMobileMenu();
}

/**
/**
 * Initialize slider/carousel
 */
function initializeSlider() {
  const currentData =
    appState.language === "ar" ? sliderData.ar : sliderData.en;
  const bannerWrapper = document.getElementById("bannerWrapper");

  if (!bannerWrapper) return;

  // Clear existing content
  bannerWrapper.innerHTML = "";

  // Build slides
  currentData.forEach((slide) => {
    const item = document.createElement("div");
    const hasContent = slide.title || slide.subTitle || slide.text;
    item.className = "swiper-slide";
    item.innerHTML = `
            <img src="${slide.url}" class="d-block w-100" alt="Banner Slide">
            <div class="carousel-caption align-items-center justify-content-center d-flex flex-column ${hasContent ? "" : "no-overlay"}"">
                <div">
                    <h4 class="text-white text-uppercase fw-bold wow fadeInUp">${slide.subTitle}</h4>
                    <h1 class="display-1 text-white wow fadeInUp text-capitalize">${slide.title}</h1>
                    <p class="text-white mx-auto fs-5 wow fadeInUp" style="max-width:36rem;">${slide.text}</p>
                    ${
                      slide.path
                        ? `
                        <a href="#products"
                        onclick="setCurrentPage('${item.path}')"
                        class="btn btn-primary border-secondary text-white py-3 px-5 wow fadeInUp rounded-0">
                            ${slide.cta || getLabel("More Details", "المزيد من التفاصيل")}
                        </a>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
    bannerWrapper.appendChild(item);
  });

  // Destroy previous instance if it exists (avoids duplicate init on language/theme switch)
  if (window.bannerSwiperInstance) {
    window.bannerSwiperInstance.destroy(true, true);
  }

  // Initialize Swiper AFTER injecting the HTML
  window.bannerSwiperInstance = new Swiper(".bannerSwiper", {
    slidesPerView: 1,
    loop: true,
    effect: "slide",
    fadeEffect: { crossFade: true },
    rtl: document.documentElement.dir === "rtl",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: { enabled: true }, // arrow key navigation
    a11y: { enabled: true }, // accessibility labels
    lazy: true, // lazy-load images (add loading="lazy" or use swiper-lazy class)
  });
}

/**
 * Initialize footer
 */
function initializeFooter() {
  const footer = document.getElementById("mainFooter");
  if (!footer) return;

  const paymentIcons = [
      { img: "./images/pay-3.svg", label: "Visa" },
      { img: "./images/pay-4.svg", label: "Mastercard" },
      { img: "./images/pay-2-white.svg", label: "Mada" },
  ];

  const paymentIconsHtml = paymentIcons
    .map(
      (p) => `
    <div class="d-flex align-items-center justify-content-center rounded-0 p-1" style="width: 3rem; height: 1.6rem; object-fit: contain;" title="${p.label}">
        <img src="${p.img}" class=" h-100" style="object-fit: contain;"></img>
    </div>
  `,
    )
    .join("");

  footer.innerHTML = `
        <div class="container-fluid footer bg-secondary py-5">
            <div class="container py-5">

                <!-- Row 1: Payment methods (left) | Newsletter (middle) | VAT (right) -->
                <div class="row g-4 align-items-center pb-4 mb-4 border-bottom border-light border-opacity-25">

                    <h2 class="col-lg-3 text-white mb-3">${getLabel("Stay connected", "كن أول المطلعين على المنتجات الجديدة")}</h2>

                    <div class="col-lg-9">
                        <div class="footer-item text-center">
                            <div class="input-group rounded-2 mx-auto" >
                                <input type="email" class="form-control" placeholder="${getLabel("Enter your email", "ادخل بريدك الالكتروني")}">
                                <button class="btn btn-primary rounded-right-1">
                                    ${getLabel("Subscribe", "اشتراك")}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Row 2: Contact | Explore | Services | Legal -->
                <div class="row g-5">
                    <div class="col-md-6 col-lg-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="text-primary mb-4">${getLabel("Explore", "استكشف")}</h4>
                            ${navigationLinks
                              .map((link) =>
                                !link.dropdown
                                  ? `
                                <a href="#${link.id}" onclick="setCurrentPage('${link.id}')">
                                     ${getLabel(link.label_en, link.label_ar)}
                                </a>
                            `
                                  : "",
                              )
                              .join("")}
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="text-primary mb-4">${getLabel("Our Services", "الأقسام")}</h4>
                            <a href="#products"> ${getLabel("Products", "المنتجات")}</a>
                            <a href="#projects"> ${getLabel("Projects", "المشاريع")}</a>
                            <a href="#news"> ${getLabel("News", "الأخبار")}</a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="text-primary mb-4">${getLabel("Legal", "قانوني")}</h4>
                            <a href="#" onclick="setCurrentPage('privacy-policy')"> ${getLabel("Privacy Policy", "سياسة الخصوصية")}</a>
                            <a href="#" onclick="setCurrentPage('terms-of-service')"> ${getLabel("Terms of Service", "الشروط والأحكام")}</a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="text-primary mb-4">${getLabel("Contact Info", "تواصل معنا")}</h4>
                            <a href=""><i class="fa fa-map-marker-alt m-2"></i> ${getLabel("2 El Tayaran St, Nasr City", "2 ش الطيران، مدينة نصر")}</a>
                            <a href="mailto:marketing@kader-factory.com"><i class="fa fa-envelope m-2"></i> marketing@kader-factory</a>
                            <a href="tel:+201030009248"><i class="fa fa-phone m-2"></i> <span dir="ltr">+2010 3000 9248</span></a>
                            <a href="https://wa.me/201030009248" target="_blank"><i class="fa fa-comment m-2"></i> <span dir="ltr">+2010 3000 9248</span></a>
                            
                            <div class="d-flex align-items-center gap-3 justify-content-start justify-content-lg-start ps-2 py-3 border-top border-white border-opacity-25">
                                ${paymentIconsHtml}
                            </div>
                            
                        <div class="d-flex align-items-center gap-3 justify-content-start justify-content-lg-start ps-2 pt-3 border-top border-white border-opacity-25">
                            <i class="fas fa-file-invoice text-primary fs-3"></i>
                            <div class="text-start">
                                <div class="fw-semibold text-white small">${getLabel("VAT Registered", "مسجل ضريبة القيمة المضافة")}</div>
                                <div class="text-white-50" style="font-size: 0.8rem;">${getLabel("Tax No. 300-XXXXXXX-0003", "الرقم الضريبي 300-XXXXXXX-0003")}</div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="container-fluid copyright py-5 bg-secondary">
            <div class="container">
                <div class="row g-4 text-center">
                    <div class="col-12">
                        <span class="text-light">
                            ${getLabel(
                              "Copyright © Kader Factory for Advanced Industries, 2026. All rights reserved",
                              "حقوق النشر © مصنع قادر للصناعات المتطورة، 2026. جميع الحقوق محفوظة",
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
/**
 * Create banner component
 */
function createBanner(title) {
  return `
        <div class="container-fluid bg-breadcrumb bg-primary">
            <div class="container text-center py-5">
                <h3 class="text-white display-3 mb-4 text-capitalize">${title}</h3>
                <ol class="breadcrumb justify-content-center text-white mb-0">
                    <li class="breadcrumb-item">
                        <a href="#" class="text-white" onclick="setCurrentPage('home')">${getLabel("Home", "الرئيسية")}</a>
                    </li>
                    <span class="px-2" style="opacity: 0.3;">|</span>
                    <li class="breadcrumb-item active text-secondary text-capitalize">${title}</li>
                </ol>
            </div>
        </div>
    `;
}

/**
 * Create counter section
 */
function createCounterSection() {
  return `
        <div class="container-fluid counter-facts bg-white py-5">
            <div class="container py-5">
                <div class="row g-4">
                    <div class="col-12 col-sm-6 col-md-6 col-xl-3">
                        <div class="counter">
                            <div class="counter-icon"><i class="fas fa-passport"></i></div>
                            <div class="counter-content">
                                <h3>${getLabel("Technological Centers", "مراكز التكنولوجيا")}</h3>
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="counter-value">31</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-xl-3">
                        <div class="counter">
                            <div class="counter-icon"><i class="fas fa-users"></i></div>
                            <div class="counter-content">
                                <h3>${getLabel("Firefighting Cars", "سيارات الإطفاء")}</h3>
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="counter-value">11</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-xl-3">
                        <div class="counter">
                            <div class="counter-icon"><i class="fas fa-user-check"></i></div>
                            <div class="counter-content">
                                <h3>${getLabel("Home Furniture", "أثاث المنزل")}</h3>
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="counter-value">13</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-xl-3">
                        <div class="counter">
                            <div class="counter-icon"><i class="fas fa-handshake"></i></div>
                            <div class="counter-content">
                                <h3>${getLabel("Office Furniture", "أثاث المكاتب")}</h3>
                                <div class="d-flex align-items-center justify-content-center">
                                    <span class="counter-value">20</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Set current page and update display
 */
function setCurrentPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.style.display = "none";
  });

  // Show selected page
  const selectedPage = document.getElementById(`${pageId}-page`);
  if (selectedPage) {
    selectedPage.style.display = "block";
    appState.currentPage = pageId;

    // Update active navigation link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    const activeLink = document.getElementById(`nav-${pageId}`);
    if (activeLink) activeLink.classList.add("active");

    // Scroll to top
    window.scrollTo(0, 0);

    // Load page-specific content if needed
    loadPageContent(pageId);
  }
}

/**
 * Load page-specific content
 */
function loadPageContent(pageId) {
  switch (pageId) {
    case "about":
      loadAboutPage();
      break;
    case "products":
      loadProductsPage();
      break;
    case "projects":
      loadProjectsPage();
      break;
    case "news":
      loadNewsPage();
      break;
    case "videos":
      loadVideosPage();
      break;
    case "contact":
      loadContactPage();
      break;
  }
}

/**
 * Load about page
 */
function loadAboutPage() {
  const container = document.getElementById("aboutPageContent");
  if (!container) return;

  container.innerHTML = `
        ${createBanner(getLabel("About Us", "من نحن"))}
        <div class="container-fluid overflow-hidden py-5 bg-white">
            <div class="container py-5">
                <div class="row g-5">
                    <div class="col-xl-5 wow fadeInRight" data-wow-delay="0.1s">
                        <div class="bg-light rounded" style="height: 100%; width: 100%;">
                            <img src="/images/about.webp" class="img-fluid w-100" style="width: 100%; height: 100%; object-fit: cover;" alt="About">
                        </div>
                    </div>
                    <div class="col-xl-7 wow fadeInRight" data-wow-delay="0.3s">
                        <h5 class="sub-title p-3">${getLabel("About KADER", "عن مصنع قادر")}</h5>
                        <h1 class="display-5 mb-4">${getLabel("We're Trusted Factory Affiliated with AOI", "نحن مصنع موثوق به ومعتمد من الهيئة العربية للتصنيع")}</h1>
                        <p class="mb-4">${getLabel("At KADER, we pride ourselves on decades of expertise and innovation in manufacturing.", "في مصنع قادر، نفخر بعقود من الخبرة والابتكار في مجال التصنيع.")}</p>
                        <div class="row gy-4 align-items-center">
                            <div class="col-4 col-md-3">
                                <div class="bg-light text-center rounded p-3">
                                    <div class="mb-2">
                                        <i class="fas fa-ticket-alt fa-4x text-primary"></i>
                                    </div>
                                    <h1 class="display-5 fw-bold mb-2 text-dark">70+</h1>
                                    <p class="text-muted mb-0">${getLabel("Years of Experience", "سنوات من الخبرة")}</p>
                                </div>
                            </div>
                            <div class="col-8 col-md-9">
                                <div class="d-flex flex-wrap">
                                    <div class="d-flex align-items-center justify-content-center m-4">
                                        <i class="fa fa-phone-alt text-primary fa-3x"></i>
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                        <span class="text-primary">${getLabel("Have any questions?", "هل لديك أي أسئلة؟")}</span>
                                        <span class="text-secondary fw-bold fs-5">call: <span dir="ltr">+0123 456 7890</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${createCounterSection()}
    `;
}

/**
 * Load products page
 */
function loadProductsPage() {
  const container = document.getElementById("productsPageContent");
  if (!container) return;

  const productHTML = `
        ${createBanner(getLabel("Products", "المنتجات"))}
        <div class="container-fluid service overflow-hidden py-5">
            <div class="container py-5">
                <div class="section-title text-center mb-5">
                    <div class="sub-style">
                        <h5 class="sub-title px-3">${getLabel("CHECK OUR PRODUCTS", "اكتشف المنتجات")}</h5>
                    </div>
                    <h1 class="display-5 mb-4">${getLabel("Offer Tailor Made Products", "منتجات مخصصة حسب احتياجاتك")}</h1>
                    <p class="mb-0">${getLabel("Discover our wide range of high-quality products", "استكشف مجموعة واسعة من المنتجات عالية الجودة")}</p>
                </div>
                <div class="row g-4">
                    <div class="col-lg-6 col-xl-4">
                        <div class="service-item">
                            <div class="service-inner">
                                <div class="service-img" style="height: 16rem;">
                                    <img src="/images/b-5.jpg" class="img-fluid w-100 rounded" alt="Transport" style="width: 100%; height: 100%; object-fit: contain;">
                                </div>
                                <div class="service-title">
                                    <div class="service-title-name">
                                        <div class="bg-primary text-center rounded-0 p-3 mx-5 mb-4">
                                            <a href="#" class="h4 text-white mb-0">${getLabel("Transport Vehicles", "مركبات النقل")}</a>
                                        </div>
                                        <a class="btn bg-white shadow-sm text-secondary rounded-0 py-3 px-5 mb-4" href="#">
                                            ${getLabel("Explore More", "استكشف المزيد")}
                                        </a>
                                    </div>
                                    <div class="service-content pb-4 bg-primary">
                                        <h4 class="text-white mb-4 py-3">${getLabel("Transport Vehicles", "مركبات النقل")}</h4>
                                        <div class="px-4">
                                            <p class="mb-4">${getLabel("High-quality transport solutions", "حلول نقل عالية الجودة")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  container.innerHTML = productHTML;
}

/**
 * Load projects page
 */
function loadProjectsPage() {
  const container = document.getElementById("projectsPageContent");
  if (!container) return;

  container.innerHTML = `
        ${createBanner(getLabel("Projects", "المشاريع"))}
        <div class="container-fluid  overflow-hidden py-5">
            <div class="container py-5">
                <div class="section-title text-left mb-5">
                    <div class="sub-style">
                        <h5 class="sub-title px-3">${getLabel("Our Projects", "مشاريعنا")}</h5>
                    </div>
                    <h1 class="display-5 mb-4">${getLabel("Projects that demonstrate our professionalism", "مشاريع تثبت مستوى احترافيتنا")}</h1>
                    <p class="mb-0">${getLabel("This page showcases our latest projects", "تعرض هذه الصفحة أحدث مشاريعنا")}</p>
                </div>
                <div class="row g-4">
                    <div class="col-lg-6 col-xl-4">
                        <div class="">
                            <div  style="height: 32rem;">
                                <img src="/images/pro-1.jpg" class="img-fluid w-100 rounded" alt="Project">
                            </div>
                            <div class=" bg-secondary rounded-bottom p-4">
                                <h4 class="text-white">${getLabel("Project 1", "المشروع 1")}</h4>
                                <p class="text-white-50">Lorem ipsum dolor sit amet consectetur</p>
                                <a href="#" class="btn btn-secondary rounded-pill text-white p-0">
                                    ${getLabel("Read More", "اقرأ المزيد")} <i class="fas fa-arrow-right px-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Load news page
 */
function loadNewsPage() {
  const container = document.getElementById("newsPageContent");
  if (!container) return;

  container.innerHTML = `
        ${createBanner(getLabel("News", "الأخبار"))}
        <div class="container-fluid  overflow-hidden py-5">
            <div class="container py-5">
                <div class="section-title text-left mb-5">
                    <div class="sub-style">
                        <h5 class="sub-title text-primary px-3">${getLabel("News", "الأخبار")}</h5>
                    </div>
                    <h1 class="display-5 mb-4">${getLabel("Stay Informed on the Latest Updates", "ابق على اطلاع بأحدث المستجدات")}</h1>
                </div>
                <div class="row g-4">
                    <div class="col-lg-6 col-xl-6">
                        <div class="">
                            <div  style="height: 24rem;">
                                <img src="/images/news-1.webp" class="img-fluid w-100 rounded" alt="News">
                            </div>
                            <div class="bg-secondary rounded-bottom p-4">
                                <h4 class="text-white">${getLabel("Latest News", "أحدث الأخبار")}</h4>
                                <p class="text-white-50">Lorem ipsum dolor sit amet</p>
                                <a href="#" class="btn btn-secondary rounded-pill text-white p-0">
                                    ${getLabel("Read More", "اقرأ المزيد")} <i class="fas fa-arrow-right px-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Load videos page
 */
function loadVideosPage() {
  const container = document.getElementById("videosPageContent");
  if (!container) return;

  container.innerHTML = `
        ${createBanner(getLabel("Video Library", "معرض الفيديوهات"))}
        <div class="container-fluid  overflow-hidden py-5">
            <div class="container py-5">
                <div class="section-title text-center mb-5">
                    <h5 class="sub-title px-3">${getLabel("Video Gallery", "معرض الفيديو")}</h5>
                    <h1 class="display-5 mb-4">${getLabel("Explore Our Visual Content", "استكشف محتوانا المرئي")}</h1>
                </div>
                <div class="row g-5">
                    <div class="col-lg-6 col-xl-3">
                        <div class="position-relative" style="padding-bottom: 56.25%; height: 0; overflow: hidden;">
                            <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                                src="https://www.youtube.com/embed/dY3t90L_q3Q" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Load contact page
 */
function loadContactPage() {
  const container = document.getElementById("contactPageContent");
  if (!container) return;

  container.innerHTML = `
        ${createBanner(getLabel("Contact Us", "اتصل بنا"))}
        <div class="container-fluid contact overflow-hidden py-5">
            <div class="container py-5">
                <div class="row g-5 mb-5">
                    <div class="col-lg-6">
                        <h5 class="sub-title p-3">${getLabel("Quick Contact", "اتصل بنا")}</h5>
                        <h1 class="display-5 mb-4">${getLabel("Have Questions?", "هل لديك أسئلة؟")}</h1>
                        <div class="d-flex border-bottom mb-4 pb-4">
                            <i class="fas fa-map-marked-alt fa-4x text-primary px-3 rounded"></i>
                            <div class="ps-3">
                                <h5>${getLabel("Location", "الموقع")}</h5>
                                <p>${getLabel("2 El Tayaran St, Al Golf, Nasr City", "2 شارع الطياران، الجولف، مدينة نصر")}</p>
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-xl-6">
                                <div class="d-flex">
                                    <i class="fas fa-tty fa-3x text-primary px-3"></i>
                                    <div class="ps-3">
                                        <h5>${getLabel("Quick Contact", "اتصل بنا")}</h5>
                                        <p><strong>${getLabel("Phone", "الهاتف")}:</strong> <a href="tel:+201030009248" dir="ltr">+2010 3000 9248</a></p>
                                        <p><strong>${getLabel("Email", "البريد")}:</strong> <a href="mailto:marketing@kader-factory.com">marketing@kader-factory.com</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h5 class="sub-title p-3">${getLabel("Let's Connect", "لنتواصل")}</h5>
                        <form>
                            <div class="row g-4">
                                <div class="col-12">
                                    <input type="text" class="form-control" placeholder="${getLabel("Your Name", "اسمك")}">
                                </div>
                                <div class="col-12">
                                    <input type="email" class="form-control" placeholder="${getLabel("Your Email", "بريدك الإلكتروني")}">
                                </div>
                                <div class="col-12">
                                    <input type="text" class="form-control" placeholder="${getLabel("Subject", "الموضوع")}">
                                </div>
                                <div class="col-12">
                                    <textarea class="form-control" rows="5" placeholder="${getLabel("Message", "الرسالة")}"></textarea>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary w-100 py-3 rounded-0">
                                        ${getLabel("Send Message", "إرسال")}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="office pt-5">
                    <div class="row g-4 justify-content-center">
                        <div class="col-12 pt-5">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1726.2533249816152!2d31.31804038889666!3d30.07967296942901!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f17819003bd%3A0x5788391b0502453f!2sKader%20Factory" 
                                class="rounded w-100" style="height: 500px;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/*========================================================================================================*/

/**
 * Initialize home page sections
 */
function initializeHomePageSections() {
  // Initialize About Section
  const aboutSection = document.getElementById("aboutSection");
  if (aboutSection) {
    aboutSection.innerHTML = `
            <div class="container-fluid overflow-hidden py-5 bg-white" style="width: 100%;">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-xl-5 order-2 order-md-1 wow fadeInLeft" data-wow-delay="0.1s">
                            <div class="bg-light h-100 rounded-2 overflow-hidden">
                                <img src="/images/about.webp" class="img-fluid about-img w-100"  alt="About">
                            </div>
                        </div>
                        <div class="col-xl-7 order-1 order-md-2 wow fadeInRight" data-wow-delay="0.3s">
                            <h5 class="sub-title py-3">${getLabel("About KADER", "عن مصنع قادر")}</h5>
                            <h1 class="display-5 mb-3">${getLabel("We're Trusted Factory Affiliated with AOI", "نحن مصنع موثوق به")}</h1>
                            <p class="mb-4">
                                ${getLabel("At KADER, we pride ourselves on decades of expertise and innovation in manufacturing. As a trusted factory affiliated with the Authority of Organization and Inspection (AOI), we are committed to delivering high-quality products and solutions that meet global standards. Our dedication to excellence and customer satisfaction has made us a leader in our industry.", "في شركة كادر، نفخر بخبرتنا الممتدة لعقود في مجال التصنيع وابتكاراتنا. وبصفتنا مصنعًا موثوقًا به تابعًا للهيئة العربية للتصنيع، فإننا ملتزمون بتقديم منتجات وحلول عالية الجودة تلبي المعايير العالمية. وقد جعلنا تفانينا في التميز ورضا العملاء روادًا في صناعتنا.")}
                                <br/>
                                <br/>
                                <a class="btn btn-white ps-0 pt-0 pb-0" href="/#about" data-discover="true" ;">
                                 ${getLabel("Read More", "اقرأ المزيد")} 
                                </a>
                            </p>


                        </div>
                    </div>
                </div>
            </div>
            `;
  }

  // Initialize Categories Section
  const categorySection = document.getElementById("categorySection");
  if (categorySection) {
    const categorySlidesHtml = categories
      .map(
        (cat) => `
    <div class="swiper-slide">
        <a href="#" class="category-card-link" onclick="setCurrentPage('${cat.page}', '${cat.categoryId}')">
            <div class="category-card">
                 <div class="category-card-img">
                    <img src="${cat.img}" class="img-fluid" alt="${getLabel(cat.nameEn, cat.nameAr)}">
                </div>
                 <ul class="category-card-details">
                    ${getLabel(cat.variantsEn, cat.variantsAr)
                      .map(
                        (variant, i) => `
                        <li style="transition-delay: ${i * 80}ms;">${variant}</li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
            <div class="category-card-name text-start">
                ${getLabel(cat.nameEn, cat.nameAr)}
            </div>
        </a>
    </div>
`,
      )
      .join("");

    categorySection.innerHTML = `
        <div class="container-fluid service overflow-hidden py-5 bg-white">
        <div class="section-title container mb-0">
            <h5 class="sub-title px-3">${getLabel("Our Categories", "الأقسام")}</h5>
        </div>
            <div class="container bg-white p-0 rounded-3">
                <div class="swiper categoriesSwiper">
                    <div class="swiper-wrapper">
                        ${categorySlidesHtml}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </div>
    `;

    // Initialize Swiper AFTER injecting the HTML
    new Swiper(".categoriesSwiper", {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row", // or 'column' — controls how slides fill the grid
      },
      spaceBetween: 20,
      loop: true, // note: loop + grid can behave oddly together — see note below
      rtl: document.documentElement.dir === "rtl",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: { slidesPerView: 2, grid: { rows: 6 } },
        420: { slidesPerView: 2, grid: { rows: 6 } },
        576: { slidesPerView: 3, grid: { rows: 4 } },
        992: { slidesPerView: 5, grid: { rows: 2 } },
        1200: { slidesPerView: 5, grid: { rows: 2 } },
      },
    });
  }

  // Initialize Products Section

  // Products Section state
  let activeProductCategory = "all";

  const productSection = document.getElementById("productSection");
  if (productSection) {
    productSection.innerHTML = `
        <div class="container-fluid products overflow-hidden bg-white">
            <div class="container py-5 pb-3">
                <div class="section-title text-center d-flex align-items-center justify-content-between">
                    <h5 class="sub-title px-3">${getLabel("Products", "المنتجات")}</h5>
                    <span class="text-black-50 small border border-opacity-25 border-secondary border-1 p-2" id="productCount"></span>
                    </div>
                    
                    <!-- Filter Bar (Swiper) -->
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 filter-bar">
                        <div class="swiper filterChipsSwiper flex-grow-1">
                            <div class="swiper-wrapper" id="filterChips"></div>
                        </div>
                    </div>
                    
                    <!-- Product Grid -->
                    <div class="row g-4" id="productsGrid"></div>
                    
                    <div class="col-12 text-end p-2">
                        <a class="btn btn-white border-secondary rounded-0" href="#" onclick="setCurrentPage('products')">
                            ${getLabel("View All", "عرض الكل")}
                        </a>
                    </div>

                <!-- Empty state -->
                <div class="text-center py-5 d-none" id="emptyState">
                    <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                    <p class="text-muted">${getLabel("No products found in this category", "لا توجد منتجات في هذه الفئة")}</p>
                </div>

            </div>
        </div>
    `;

    renderFilterChips();
    renderProductsGrid();
  }

  /**
   * Render filter chips (as Swiper slides) from unique categories in productsData
   */
  function renderFilterChips() {
    const chipsContainer = document.getElementById("filterChips");
    if (!chipsContainer) return;

    const currentData =
      appState.language === "ar" ? productsData.ar : productsData.en;
    const uniqueCategories = [...new Set(currentData.map((p) => p.category))];

    let chipsHtml = `
            <div class="swiper-slide" style="width: auto;">
                <div class="filter-chip ${activeProductCategory === "all" ? "active" : ""}" data-category="all" role="button" tabindex="0">
                    ${getLabel("All", "الكل")}
                </div>
            </div>
        `;

    uniqueCategories.forEach((cat) => {
      chipsHtml += `
                <div class="swiper-slide" style="width: auto;">
                    <div class="filter-chip ${activeProductCategory === cat ? "active" : ""}" data-category="${cat}" role="button" tabindex="0">
                        ${cat}
                    </div>
                </div>
            `;
    });

    chipsContainer.innerHTML = chipsHtml;

    chipsContainer.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", function () {
        activeProductCategory = this.dataset.category;
        renderFilterChips();
        renderProductsGrid();
      });

      // keep keyboard accessibility since it's no longer a real <button>
      chip.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });

    initFilterChipsSwiper();
  }

  /**
   * Initialize the filter chips Swiper
   */
  function initFilterChipsSwiper() {
    if (window.filterChipsSwiperInstance) {
      window.filterChipsSwiperInstance.destroy(true, true);
    }

    window.filterChipsSwiperInstance = new Swiper(".filterChipsSwiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: true,
      rtl: document.documentElement.dir === "rtl",
      grabCursor: true,
      simulateTouch: true,
      touchStartPreventDefault: false,
    });
  }

  /**
   * Render product grid from productsData, filtered by activeProductCategory
   */
  function renderProductsGrid() {
    const grid = document.getElementById("productsGrid");
    const emptyState = document.getElementById("emptyState");
    const countLabel = document.getElementById("productCount");
    if (!grid) return;

    const currentData =
      appState.language === "ar" ? productsData.ar : productsData.en;

    const filtered =
      activeProductCategory === "all"
        ? currentData
        : currentData.filter((p) => p.category === activeProductCategory);

    const displayedProducts = filtered.slice(0, 12); // Show only the first 12

    if (countLabel) {
      countLabel.textContent = `${displayedProducts.length} ${getLabel("products", "منتج")}`;
    }

    if (displayedProducts.length === 0) {
      grid.innerHTML = "";
      emptyState.classList.remove("d-none");
      return;
    }

    emptyState.classList.add("d-none");

    grid.innerHTML = displayedProducts
      .map(
        (product) => `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card product-card h-100 border-0 ">
                    <div class="product-img-wrap">
                        <img src="${product.url}" class="card-img-top" alt="${product.title}">
                    </div>
                    
                    <div class="card-body">
                        <div class="price-section mt-3">
                            ${
                              product.oldPrice
                                ? `<span class="discount-badge">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>`
                                : ""
                            }
        
                        <div class="price-row">
                            <span class="current-price">
                                EGP ${product.price}
                            </span>
        
                            ${
                              product.oldPrice
                                ? `<span class="old-price">EGP ${product.oldPrice}</span>`
                                : ""
                            }
                        </div>
                    </div>
            <span class="badge bg-light text-dark mb-2">${product.sub_category}</span>

            <h6 class="card-title mb-1">${product.title}</h6>

            <p class="card-text text-muted small product-desc">
                ${product.desc}
            </p>
        </div>
    </div>
    </div>
    `,
      )
      .join("");
  }

  // Initialize News Section
  const newsSection = document.getElementById("newsSection");
  if (newsSection) {
    const newsItems = [
      {
        id: "news-1",
        img: "/images/news-1.webp",
        dateRaw: "2026-07-12",
        dateEn: "July 12, 2026",
        dateAr: "12 يوليو 2026",
        titleEn: "Latest News",
        titleAr: "أحدث خبر",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر الأول مع شرح موجز عن الموضوع.",
      },
      {
        id: "news-2",
        img: "/images/news-2.webp",
        dateRaw: "2026-07-08",
        dateEn: "July 8, 2026",
        dateAr: "8 يوليو 2026",
        titleEn: "Company Update",
        titleAr: "تحديث الشركة",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر الثاني مع شرح موجز عن الموضوع.",
      },
      {
        id: "news-3",
        img: "/images/news-3.webp",
        dateRaw: "2026-07-02",
        dateEn: "July 2, 2026",
        dateAr: "2 يوليو 2026",
        titleEn: "New Partnership",
        titleAr: "شراكة جديدة",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر الثالث مع شرح موجز عن الموضوع.",
      },
      {
        id: "news-4",
        img: "/images/news-4.webp",
        dateRaw: "2026-06-25",
        dateEn: "June 25, 2026",
        dateAr: "25 يونيو 2026",
        titleEn: "Facility Expansion",
        titleAr: "توسعة المنشأة",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر الرابع مع شرح موجز عن الموضوع.",
      },
      {
        id: "news-5",
        img: "/images/news-5.webp",
        dateRaw: "2026-06-18",
        dateEn: "June 18, 2026",
        dateAr: "18 يونيو 2026",
        titleEn: "New Product Line Launch",
        titleAr: "إطلاق خط إنتاج جديد",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر الخامس مع شرح موجز عن الموضوع.",
      },
      {
        id: "news-6",
        img: "/images/news-6.webp",
        dateRaw: "2026-06-10",
        dateEn: "June 10, 2026",
        dateAr: "10 يونيو 2026",
        titleEn: "Safety Certification Achieved",
        titleAr: "الحصول على شهادة السلامة",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر السادس مع شرح موجز عن الموضوع.",
      },
      {
        id: "news-7",
        img: "/images/news-7.webp",
        dateRaw: "2026-05-30",
        dateEn: "May 30, 2026",
        dateAr: "30 مايو 2026",
        titleEn: "Regional Expo Participation",
        titleAr: "المشاركة في المعرض الإقليمي",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر السابع مع شرح موجز عن الموضوع.",
      },
      {
        id: "news-8",
        img: "/images/news-8.webp",
        dateRaw: "2026-05-20",
        dateEn: "May 20, 2026",
        dateAr: "20 مايو 2026",
        titleEn: "Sustainability Initiative",
        titleAr: "مبادرة الاستدامة",
        excerptEn:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        excerptAr:
          "نص تجريبي عربي يوضح تفاصيل الخبر الثامن مع شرح موجز عن الموضوع.",
      },
      // ...add as many news items as you need
    ];

    const sortedNews = [...newsItems].sort(
      (a, b) => new Date(b.dateRaw) - new Date(a.dateRaw),
    );

    const newsSlidesHtml = sortedNews
      .map(
        (item) => `
        <div class="swiper-slide">
            <div class="card card-news border-0 overflow-hidden h-100 m-1 shadow-sm">
                <div class="row g-0 align-items-stretch h-100">
                    <div class="col-md-4">
                        <img src="${item.img}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 220px;" alt="${getLabel(item.titleEn, item.titleAr)}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body h-100 d-flex flex-column justify-content-center align-items-start">
                            <span class="text-muted small fw-semibold">
                                <i class="far fa-calendar me-1"></i>${getLabel(item.dateEn, item.dateAr)}
                            </span>
                            <h6 class="card-title">${getLabel(item.titleEn, item.titleAr)}</h6>
                            <p class="card-text text-muted">${getLabel(item.excerptEn, item.excerptAr)}</p>
                            <a href="#" class="btn btn-white small p-0 pe-4" onclick="setCurrentPage('news', '${item.id}')">
                                ${getLabel("Read More", "اقرأ المزيد")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
      )
      .join("");

    newsSection.innerHTML = `
        <div class="container-fluid overflow-hidden bg-white">
            <div class="container py-4 border-bottom">

                <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="section-title mb-0">
                        <h5 class="sub-title mb-0">${getLabel("Latest News", "الأخبار")}</h5>
                    </div>
                    <div class="d-flex gap-3">
                        <div class="news-button-prev nav-btn-custom">
                            <i class="fas fa-arrow-left"></i>
                        </div>
                        <div class="news-button-next nav-btn-custom">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>

                <div class="swiper newsSwiper">
                    <div class="swiper-wrapper">
                        ${newsSlidesHtml}
                    </div>
                </div>

                <div class="news-pagination text-center mt-4"></div>

                <div class="text-end">
                    <a class="btn btn-white p-0 pe-4" href="#" onclick="setCurrentPage('news')">
                        ${getLabel("View All", "عرض الكل")}
                    </a>
                </div>

            </div>
        </div>
    `;

    // Destroy old instance if it exists
    if (window.newsSwiperInstance) {
      window.newsSwiperInstance.destroy(true, true);
    }

    window.newsSwiperInstance = new Swiper(".newsSwiper", {
      slidesPerView: 1,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 20,
      loop: true,
      rtl: document.documentElement.dir === "rtl",
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".news-button-next",
        prevEl: ".news-button-prev",
      },
      pagination: {
        el: ".news-pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1, grid: { rows: 1 } },
        420: { slidesPerView: 1, grid: { rows: 1 } },
        576: { slidesPerView: 1, grid: { rows: 1 } },
        992: { slidesPerView: 2, grid: { rows: 1 } },
        1200: { slidesPerView: 2, grid: { rows: 2 } },
      },
    });
  }

  // Initialize Project Section
  const projectsSection = document.getElementById("projectsSection");
  if (projectsSection) {
    projectsSection.innerHTML = `
    <div class="container overflow-hidden rounded-2 p-5 position-relative my-5" id="projectsBgWrapper">

        <!-- Background image layer -->
        <div class="projects-bg-image" id="projectsBgImage" style="background-image: url('${projects[0].img}');"></div>

        <!-- Dark overlay for readability -->
        <div class="projects-bg-overlay"></div>

        <!-- Content -->
        <div class="container projects-container position-relative py-5">
            <h5 class="sub-title px-3 pb-5">${getLabel("Machinery", "الآلات")}</h5>

            <div class="row g-5 align-items-stretch flex-column-reverse flex-lg-row">

                <div class="col-lg-4 d-flex">
                    <div class="d-flex flex-column justify-content-center h-100 w-100">
                        <div class="section-title text-start flex-grow-1">
                            <h1 class="display-5 text-white" id="activeProjectTitle">${getLabel(projects[0].titleEn, projects[0].titleAr)}</h1>
                            <p class="text-white-50 mb-0" id="activeProjectDesc">${getLabel(projects[0].descEn, projects[0].descAr)}</p>
                        </div>
                        <div>
                            <a href="#" class="btn btn-white text-primary border-secondary rounded-0 ps-0 py-0 mb-4" id="activeProjectLink" onclick="setCurrentPage('projects', '${projects[0].id}')">
                                ${getLabel("Read More", "اقرأ المزيد")}
                            </a>
                            <div class="d-flex gap-3">
                                <div class="projects-button-prev nav-btn-custom">
                                    <i class="fas fa-arrow-left"></i>
                                </div>
                                <div class="projects-button-next nav-btn-custom">
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8"></div>

            </div>
        </div>

        <!-- Pagination: pinned to bottom of the whole section -->
        <div class="projects-pagination"></div>

    </div>
`;

    let activeIndex = 0;

    function updateActiveProject(index) {
      activeIndex = index;
      const activeProject = projects[index];

      const titleEl = document.getElementById("activeProjectTitle");
      const descEl = document.getElementById("activeProjectDesc");
      const linkEl = document.getElementById("activeProjectLink");

      // Swap background image
      document.getElementById("projectsBgImage").style.backgroundImage =
        `url('${activeProject.img}')`;

      // Update text content
      titleEl.textContent = getLabel(
        activeProject.titleEn,
        activeProject.titleAr,
      );
      descEl.textContent = getLabel(activeProject.descEn, activeProject.descAr);
      linkEl.setAttribute(
        "onclick",
        `setCurrentPage('projects', '${activeProject.id}')`,
      );

      // Retrigger slide-in animation
      [titleEl, descEl, linkEl].forEach((el) => {
        el.classList.remove("slide-in-active");
        void el.offsetWidth;
        el.classList.add("slide-in-active");
      });

      renderDots();
    }

    function renderDots() {
      const pag = document.querySelector(".projects-pagination");
      pag.innerHTML = projects
        .map(
          (_, i) => `
            <span class="stack-dot ${i === activeIndex ? "active" : ""}" data-index="${i}"></span>
        `,
        )
        .join("");
      pag.querySelectorAll(".stack-dot").forEach((dot) => {
        dot.addEventListener("click", () =>
          updateActiveProject(parseInt(dot.dataset.index, 10)),
        );
      });
    }

    document
      .querySelector(".projects-button-next")
      .addEventListener("click", () => {
        updateActiveProject((activeIndex + 1) % projects.length);
      });

    document
      .querySelector(".projects-button-prev")
      .addEventListener("click", () => {
        updateActiveProject(
          (activeIndex - 1 + projects.length) % projects.length,
        );
      });

    renderDots();
  }

  // Intialize Trusted Section
  const trustedSection = document.getElementById("trustedSection");
  if (trustedSection) {
    const stats = [
      {
        value: "70+",
        labelEn: "Years of Experience",
        labelAr: "سنوات من الخبرة",
      },
      {
        value: "10K+",
        labelEn: "Products Manufactured",
        labelAr: "منتج تم تصنيعه",
      },
      { value: "30+", labelEn: "Machines Available", labelAr: "ماكينة متاحة" },
      { value: "100+", labelEn: "Industrial Partners", labelAr: "شريك صناعي" },
    ];

    const logoCardsHtml = clients
      .map(
        (c) => `
            <div class="col-6 col-md-4 col-lg-4 col-xl-4">
                <div class="trust-logo-card d-flex align-items-center justify-content-center m-1">
                    <img src="${c.logo}" alt="${c.name}" class="img-fluid" loading="lazy">
                </div>
            </div>
        `,
      )
      .join("");

    const statsHtml = stats
      .map(
        (s) => `
            <div class="col-6 col-lg-3 d-flex g-2 m-0">
                <div class="trust-stat-card text-center bg-white rounded-2 shadow-sm py-4 h-100 my-1">
                    <h5 class="text-primary fw-bold mb-3">${s.value}</h5>
                    <p class="text-muted mb-0">${getLabel(s.labelEn, s.labelAr)}</p>
                </div>
            </div>
        `,
      )
      .join("");

    trustedSection.innerHTML = `
            <div class="container-fluid trust overflow-hidden py-0 bg-light">
                <div class="container py-5 d-flex flex-wrap align-items-start gap-4 flex-lg-nowrap">
    
                    <!-- Header -->
                    <div class="section-title text-center mb-5 trust-header-block">
                        <h5 class="sub-title px-3">${getLabel("TRUSTED BY", "موثوق به من قبل")}</h5>
                        <h1 class="display-5 mb-4">${getLabel("Trusted by Leading Organizations", "موثوق به من قبل المؤسسات الرائدة")}</h1>
                        <p class="text-muted" style="max-width: 700px;">
                            ${getLabel(
                              "We proudly serve government entities, industrial companies, and leading organizations with reliable manufacturing and machinery rental solutions.",
                              "نفتخر بخدمة الجهات الحكومية والشركات الصناعية والمؤسسات الرائدة بحلول موثوقة في التصنيع وتأجير المعدات.",
                            )}
                        </p>
                    </div>
    
                    <!-- Client Logos -->
                    <div class="d-flex flex-wrap mb-5 trust-logos-block">
                        ${logoCardsHtml}
                    </div>
    
                    <div class="text-center trust-stats-block">
                        <!-- Stats -->
                        <div class="row g-0 mb-5">
                            ${statsHtml}
                        </div>
    
                        <!-- CTA -->
                        <h4 class="mb-4">
                            ${getLabel(
                              "Looking for reliable industrial manufacturing or machinery rental?",
                              "تبحث عن حلول موثوقة في التصنيع الصناعي أو تأجير المعدات؟",
                            )}
                        </h4>
                        <a href="#" class="btn btn-primary border-secondary rounded-0 py-3 px-5" onclick="setCurrentPage('contact')">
                            ${getLabel("Request a Quote", "اطلب عرض سعر")}
                        </a>
                    </div>
    
                </div>
            </div>
        `;
  }

  // Initialize Social Section
  const trustSocialSection = document.getElementById("socialSection");
  if (trustSocialSection) {
    const socialLinks = [
      {
        icon: "fab fa-facebook-f",
        url: "https://facebook.com/yourpage",
        label: "Facebook",
      },
      {
        icon: "fab fa-instagram",
        url: "https://instagram.com/yourpage",
        label: "Instagram",
      },
      {
        icon: "fab fa-youtube",
        url: "https://youtube.com/yourchannel",
        label: "YouTube",
      },
    ];

    const socialHtml = socialLinks
      .map(
        (s) => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer"
            class="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center p-0"
            style="width: 52px; height: 52px;" aria-label="${s.label}">
                <i class="${s.icon} fs-4"></i>
            </a>
        `,
      )
      .join("");

    trustSocialSection.innerHTML = `
            <div class="container-fluid overflow-hidden py-5">
                <div class="container text-center social-section py-5 rounded-1 overflow-hidden">
                <img src="./images/logo-kader-white.png" style="height:4rem;" class="position-relative z-3 pb-2"/>
                    <h2 class="text-primary fw-bolder position-relative z-3">${getLabel("Get in Touch", "تواصل معنا")}</h2>
                    <p class="mx-auto text-white-50 position-relative z-3" style="max-width: 500px;">
                        ${getLabel(
                          "Follow us on social media for updates, news, and behind-the-scenes moments.",
                          "تابعنا على مواقع التواصل الاجتماعي للاطلاع على آخر الأخبار والتحديثات.",
                        )}
                    </p>
                    <div class="d-flex gap-2 justify-content-center position-relative z-3">
                        ${socialHtml}
                    </div>
                </div>
            </div>
        `;
  }

  // Initialize Payment Partners Section
  const paymentPartnersSection = document.getElementById(
    "paymentPartnersSection",
  );
  if (paymentPartnersSection) {
    const paymentLogos = [
      { name: "Bank 1", img: "/images/bank-1.png" },
      { name: "Bank 2", img: "/images/bank-2.png" },
      { name: "Bank 3", img: "/images/bank-3.png" },
      { name: "Bank 4", img: "/images/bank-4.png" },
      { name: "Bank 5", img: "/images/bank-5.png" },
    ];

    const logoCardsHtml = paymentLogos
      .map(
        (p) => `
        <div class="col-4">
            <div class="bg-white border rounded-1 d-flex align-items-center justify-content-center" style="height: 4rem;">
                <img src="${p.img}" alt="${p.name}" class="img-fluid payment-logo">
            </div>
        </div>
    `,
      )
      .join("");

    paymentPartnersSection.innerHTML = `
        <div class="container-fluid bg-white">
        <div class="container overflow-hidden pb-5 ">
            <div class="row align-items-center g-4">

                <!-- Title -->
                <div class="col-lg-12 text-center">
                <h5 class="text-secondary px-3 py-0">${getLabel("Trusted Payment Partners", "شركاء الدفع الموثوقون")}</h5>
                <p class="text-muted px-3 mb-0">
                    ${getLabel(
                      "We work with leading banks and payment providers to ensure every transaction is secure and dependable.",
                      "نتعامل مع كبرى البنوك ومزودي خدمات الدفع لضمان أن تكون كل معاملة آمنة وموثوقة.",
                    )}
                </p>
                </div>

                <!-- Logos: 3 per row -->
                <div class="col-lg-12">
                    <div class="row g-3 justify-content-center">
                        ${logoCardsHtml}
                    </div>
                </div>
                </div>

            </div>
        </div>
    `;
  }
}

/**
 * Initialize the application
 */
function initializeApp() {
  // ============================
  // App Settings
  // ============================

  document.documentElement.lang = appState.language;
  document.documentElement.dir = appState.direction;
  document.body.setAttribute("data-theme", appState.theme);

  // ============================
  // UI Components
  // ============================

  initializeNavigation();
  initializeSlider();
  initializeFooter();

  // ============================
  // Pages
  // ============================

  initializeHomePageSections();

  // ============================
  // Theme
  // ============================

  updateLogoBasedOnTheme();

  // ============================
  // Events
  // ============================

  setupEventListeners();

  // ============================
  // Initial Page
  // ============================

  setCurrentPage("home");
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Mobile nav toggler
  const toggler = document.getElementById("navbarToggler");
  const navCollapse = document.getElementById("navbarCollapse");

  if (toggler) {
    toggler.addEventListener("click", () => {
      navCollapse.classList.toggle("show");
    });
  }

  // Home logo click
  const homeLogo = document.getElementById("homeLogo");
  if (homeLogo) {
    homeLogo.addEventListener("click", (e) => {
      e.preventDefault();
      setCurrentPage("home");
    });
  }

  // Sticky navbar on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("mainNav");
    if (window.scrollY > 45) {
      navbar.classList.add("sticky-top", "shadow-sm");
    } else {
      navbar.classList.remove("sticky-top", "shadow-sm");
    }
  });

  // Handle hash navigation
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    if (hash) setCurrentPage(hash);
  });
}

/**
 * Scroll to top utility
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);

// Expose functions to global scope for inline event handlers
window.setCurrentPage = setCurrentPage;
window.toggleTheme = toggleTheme;
window.toggleLanguage = toggleLanguage;
window.scrollToTop = scrollToTop;
