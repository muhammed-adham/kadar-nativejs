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

      {
        title_en: "All",
        title_ar: "الكل",

        items: [
          {
            label_en: "View All Products",
            label_ar: "جميع المنتجات",
            path: "#products",
          },
        ],
      },
    ],
  },

  {
    id: "machinery",
    label_en: "Machinery",
    label_ar: "المشاريع",
    path: "#machinery",
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
      title: "",
      subTitle: "",
      text: "",
      url: "/images/b-0.png",
      cta: "",
      path: "",
    },
    {
      title: "مراكز التكنولوجيا",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "اكتشف مراكز التكنولوجيا الحديثة لدينا والمجهزة بأحدث الأدوات والابتكارات.",
      url: "/images/cat-9.webp",
      cta: "",
      path: "/",
    },
    {
      title: "المركبات الإلكترونية",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "اكتشف مجموعة المركبات الإلكترونية الصديقة للبيئة.",
      url: "/images/b-1.webp",
      cta: "",
      path: "/",
    },
    {
      title: "أثاث مكتبي",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "حوّل مساحات معيشتك مع مجموعة أثاث المنزل الفاخرة لدينا.",
      url: "/images/b-3.webp",
      cta: "",
      path: "/",
    },
    {
      title: "مبادرة البنك الأهلي المصري",
      subTitle: "صناعات متنوعة، تميز موحد",
      text: "حوّل مساحات معيشتك مع مجموعة أثاث المنزل الفاخرة لدينا.",
      url: "/images/b-3.webp",
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
      category: "vehicle-Conversions",
      sub_category: "Mobile Labs",
      price: 68000,
      oldPrice: 79000,
    },
    {
      title: "Communication Center Vehicle",
      desc: "Mobile unit outfitted for field communications and networking.",
      url: "/images/prd-6.webp",
      category: "vehicle-Conversions",
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
      category: "vehicle-Conversions",
      sub_category: "معامل متنقلة",
      price: 68000,
      oldPrice: 79000,
    },
    {
      title: "مركبة مركز اتصالات",
      desc: "وحدة متنقلة مجهزة للاتصالات والشبكات الميدانية.",
      url: "/images/prd-6.webp",
      category: "vehicle-Conversions",
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
    variantsEn: [
      "Electric Scooters",
      "Electric Golf Cars",
      "Electric Bicycles",
      "Bicycles",
    ],
    variantsAr: [
      "سكوتر كهربائي",
      "عربات جولف كهربائية",
      "دراجات هوائية كهرباء",
      "دراجات هوائية",
    ],
    page: "products",
    categoryId: "electric-transport",
  },
  {
    img: "/images/cat-11.webp",
    nameEn: "Furnish Home",
    nameAr: "افرش بيتك",
    variantsEn: ["Living Room Sets", "Bedroom Sets", "Diningroom Sets"],
    variantsAr: ["طقم صالة", "طقم غرفة نوم", "طقم غرفة طعام"],
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
    nameEn: "Vehicle Conversions",
    nameAr: "مراكز تقنية",
    variantsEn: ["Mobile Labs", "Comm Units", "Server Cabins"],
    variantsAr: ["معامل متنقلة", "وحدات اتصال", "غرف سيرفرات"],
    page: "products",
    categoryId: "vehicle-Conversions",
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
    img: "/images/cat-12.webp",
    nameEn: "Agricultural Tractor",
    nameAr: "جرارات زراعية",
    variantsEn: [
      "Utility Tractors",
      "Field Tractors",
      "Agricultural Attachments",
    ],
    variantsAr: ["جرارات متعددة الاستخدام", "جرارات الحقول", "ملحقات زراعية"],
    page: "products",
    categoryId: "agricultural-tractor",
  },
  {
    img: "/images/cat-13.webp",
    nameEn: "Axle Flatbed Semi-Trailer",
    nameAr: "مقطورات نصف نقل مسطحة",
    variantsEn: ["2-Axle Flatbed", "3-Axle Flatbed", "Heavy-Duty Flatbed"],
    variantsAr: [
      "مقطورة مسطحة بمحورين",
      "مقطورة مسطحة بثلاثة محاور",
      "مقطورة مسطحة للخدمة الشاقة",
    ],
    page: "products",
    categoryId: "axle-flatbed-semi-trailer",
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

// ========== AboutUs DATA ==========
const aboutContent = {
  subtitle: { en: "About KADER", ar: "عن مصنع قادر" },
  title: { en: "Who We Are", ar: "من نحن" },
  founded: { en: "Founded", ar: "تأسس عام" },
  foundedYear: "1949",
  paragraphs: [
    {
      en: "Kader Factory for Advanced Industries is one of the major industrial entities affiliated with the Arab Organization for Industrialization (AOI) in Egypt. Established in 1949, it is considered one of the oldest and most prominent engineering manufacturing facilities in Egypt and the Middle East.",
      ar: "يعد مصنع قادر للصناعات المتطورة أحد الصروح الصناعية التابعة لـ الهيئة العربية للتصنيع في مصر، وقد تأسس عام 1949 ليكون من أقدم وأهم المصانع الهندسية في مصر والشرق الأوسط.",
    },
    {
      en: "With more than seven decades of experience in advanced engineering industries, the factory manufactures a wide range of products serving both defense and civilian sectors. These include armored vehicles, firefighting and rescue vehicles, cash-in-transit vehicles, specialized vehicle outfitting, and mobile technological centers.",
      ar: "يمتلك المصنع خبرة ممتدة لأكثر من سبعين عاماً في مجال الصناعات الهندسية المتطورة، حيث يقوم بتصنيع مجموعة واسعة من المنتجات التي تخدم القطاعات الدفاعية والمدنية، من بينها العربات المدرعة، سيارات الإطفاء والإنقاذ، عربات نقل الأموال، تجهيزات المركبات والمراكز التكنولوجية المتنقلة.",
    },
    {
      en: "In addition, the factory supports the civilian market by producing light and electric transportation solutions, such as electric scooters and e-bikes, as well as home, office, and hotel furniture, along with various equipment manufactured according to the highest standards of quality and modern technology.",
      ar: "كما يساهم المصنع في دعم السوق المدني من خلال إنتاج وسائل النقل الخفيف والكهربائي مثل السكوترات و الدراجات الكهربائية، بالإضافة إلى الأثاث المنزلي والمكتبي والفندقي والتجهيزات المختلفة، وفق أعلى معايير الجودة والتكنولوجيا الحديثة.",
    },
    {
      en: "Kader Factory continues to play a key role in localizing industry and technology in Egypt by expanding its production capabilities and delivering innovative products that meet the needs of both local and regional markets, strengthening its position as one of the leading pillars of national industry.",
      ar: "ويواصل المصنع جهوده في توطين الصناعة والتكنولوجيا في مصر، من خلال تطوير قدراته الإنتاجية وتقديم منتجات مبتكرة تلبي احتياجات السوق المحلي والإقليمي، بما يعزز من مكانته كأحد أهم قلاع الصناعة الوطنية.",
    },
  ],
  stats: [
    {
      value: "70+",
      label: { en: "Years of Experience", ar: "سنوات من الخبرة" },
    },
    {
      value: "AOI",
      label: { en: "Officially Affiliated", ar: "معتمد رسمياً" },
    },
  ],
};

// ========== Social Links ==========
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
                <a class="dropdown-item" href="/#login">${getLabel("Login", "تسجيل الدخول")}</a>
                <a class="dropdown-item"  onclick="setCurrentPage('register')" href="/#register">${getLabel("Register", "تسجيل جديد")}</a>
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

            <!-- Mobile search -->
            <div class="overlay-search px-3 pt-2 pb-3" id="mobileSearchWrapper">
                <input type="text"
                       class="form-control"
                       id="mobileSearchInput"
                       placeholder="${getLabel("Search...", "ابحث...")}">
                <div class="list-group d-none" id="mobileSearchDropdown"></div>
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

            <div class="d d-flex py-5 justify-content-center align-items-center bg-light px-3">

                <a class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 border-end h-100" href="${appState.user ? "/profile" : "/#register"}">
                    <i class="fas fa-user"></i>
                    ${appState.user ? appState.user.name : getLabel("Login / Register", "تسجيل الدخول / تسجيل جديد")}
                </a>

                <a href="#" class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 border-end h-100" id="mobileThemeToggle">
                    <i class="fas fa-${appState.theme === "dark" ? "sun" : "moon"}"></i>
                    ${appState.theme === "dark" ? getLabel("Light Mode", "الوضع الفاتح") : getLabel("Dark ", " داكن")}
                </a>

                <a href="#" class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 border-end h-100" id="mobileLangToggle">
                    <i class="fas fa-globe"></i>
                    ${appState.language === "ar" ? "English" : "العربية"}
                </a>

                <a class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 h-100" href="/cart" id="mobileCartBtn">
                    <i class="fas fa-shopping-cart"></i>
                    ${getLabel("Cart", "السلة")}
                    <span class="badge bg-primary rounded-pill" id="mobileCartCount">
                        ${appState.cartCount || 0}
                    </span>
                </a>

            </div>
        </div>
    `;

    document
      .getElementById("closeMobileMenuBtn")
      .addEventListener("click", closeMobileMenu);

    // Mega menu triggers
    mount.querySelectorAll("[data-mega-trigger]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const link = navigationLinks.find(
          (l) => l.id === el.getAttribute("data-mega-trigger"),
        );
        if (link) openMegaMenu(link);
      });
    });

    // Mobile search
    const mobileSearchInput = document.getElementById("mobileSearchInput");
    const mobileSearchDropdown = document.getElementById(
      "mobileSearchDropdown",
    );

    mobileSearchInput.addEventListener("input", function () {
      const query = this.value.trim();

      if (query.length === 0) {
        mobileSearchDropdown.classList.add("d-none");
        mobileSearchDropdown.innerHTML = "";
        return;
      }

      const allItems = window.appState?.products || [];
      const results = allItems
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8)
        .map((p) => ({ label: p.name, url: `/product/${p.id}` }));

      if (results.length === 0) {
        mobileSearchDropdown.innerHTML = `<div class="list-group-item text-muted">${getLabel("No results found", "لا توجد نتائج")}</div>`;
      } else {
        mobileSearchDropdown.innerHTML = results
          .map(
            (item) =>
              `<a href="${item.url}" class="list-group-item list-group-item-action">${item.label}</a>`,
          )
          .join("");
      }

      mobileSearchDropdown.classList.remove("d-none");
    });

    // Theme / language toggles
    document
      .getElementById("mobileThemeToggle")
      .addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof toggleTheme === "function") toggleTheme();
      });

    document
      .getElementById("mobileLangToggle")
      .addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof toggleLanguage === "function") toggleLanguage();
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
                    <h1 class="display-1 text-white wow fadeInUp text-capitalize ${getDirectionClass("pb-0", "pb-3")}">${slide.title}</h1>
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
    <div class="container-fluid footer bg-secondary pt-5">
        <div class="container pt-5">
            <!-- Row 1: Newsletter -->
            <div class="row g-4 align-items-center pb-4 mb-4 border-bottom border-light border-opacity-25">
                <div class="col-lg-3">
                    <h2 class="text-primary mb-3">${getLabel("Stay Updated", "ابق على تواصل")}</h2>
                    <p class="mb-3">${getLabel("Get the latest updates on our newest products and manufacturing solutions.", "تابع أحدث منتجاتنا وحلولنا الصناعية أولاً بأول")}</p>
                </div>
                <div class="col-lg-9">
                    <div class="footer-item text-center">
                        <div class="input-group rounded-2 mx-auto">
                            <input type="email" class="form-control" placeholder="${getLabel("Enter your email", "ادخل بريدك الالكتروني")}">
                            <button class="btn btn-primary rounded-right-1">
                                ${getLabel("Subscribe", "اشتراك")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Row 2: Accordion on mobile, static columns on desktop -->
            <div class="row g-0 g-lg-5">

                <div class="col-12 col-lg-3 footer-accordion-item">
                    <button class="footer-accordion-toggle d-flex d-lg-none align-items-center justify-content-between w-100 bg-transparent border-0 text-primary py-3"
                            type="button" data-bs-toggle="collapse" data-bs-target="#footerExplore">
                        <h4 class="text-primary mb-0">${getLabel("Explore", "استكشف")}</h4>
                        <i class="fas fa-chevron-down footer-chevron"></i>
                    </button>
                    <h4 class="text-primary mb-4 d-none d-lg-block">${getLabel("Explore", "استكشف")}</h4>
                    <div class="collapse footer-collapse" id="footerExplore">
                        <div class="footer-item d-flex flex-column pb-4 pb-lg-0">
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
                </div>

                <div class="col-12 col-lg-3 footer-accordion-item">
                    <button class="footer-accordion-toggle d-flex d-lg-none align-items-center justify-content-between w-100 bg-transparent border-0 text-primary py-3"
                            type="button" data-bs-toggle="collapse" data-bs-target="#footerServices">
                        <h4 class="text-primary mb-0">${getLabel("Our Services", "الأقسام")}</h4>
                        <i class="fas fa-chevron-down footer-chevron"></i>
                    </button>
                    <h4 class="text-primary mb-4 d-none d-lg-block">${getLabel("Our Services", "الأقسام")}</h4>
                    <div class="collapse footer-collapse" id="footerServices">
                        <div class="footer-item d-flex flex-column pb-4 pb-lg-0">
                            <a href="#products">${getLabel("Products", "المنتجات")}</a>
                            <a href="#machinery">${getLabel("Machinery", "المشاريع")}</a>
                            <a href="#news">${getLabel("News", "الأخبار")}</a>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-3 footer-accordion-item">
                    <button class="footer-accordion-toggle d-flex d-lg-none align-items-center justify-content-between w-100 bg-transparent border-0 text-primary py-3"
                            type="button" data-bs-toggle="collapse" data-bs-target="#footerLegal">
                        <h4 class="text-primary mb-0">${getLabel("Legal", "قانوني")}</h4>
                        <i class="fas fa-chevron-down footer-chevron"></i>
                    </button>
                    <h4 class="text-primary mb-4 d-none d-lg-block">${getLabel("Legal", "قانوني")}</h4>
                    <div class="collapse footer-collapse" id="footerLegal">
                        <div class="footer-item d-flex flex-column pb-4 pb-lg-0">
                            <a href="#" onclick="setCurrentPage('privacy-policy')">${getLabel("Privacy Policy", "سياسة الخصوصية")}</a>
                            <a href="#" onclick="setCurrentPage('terms-of-service')">${getLabel("Terms of Service", "الشروط والأحكام")}</a>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-3 footer-accordion-item footer-accordion-item-last">
                    <button class="footer-accordion-toggle d-flex d-lg-none align-items-center justify-content-between w-100 bg-transparent border-0 text-primary py-3"
                            type="button" data-bs-toggle="collapse" data-bs-target="#footerContact">
                        <h4 class="text-primary mb-0">${getLabel("Contact Info", "تواصل معنا")}</h4>
                        <i class="fas fa-chevron-down footer-chevron"></i>
                    </button>
                    <h4 class="text-primary mb-4 d-none d-lg-block">${getLabel("Contact Info", "تواصل معنا")}</h4>
                    <div class="collapse footer-collapse" id="footerContact">
                        <div class="footer-item d-flex flex-column pb-4 pb-lg-0">
                            <a href=""><i class="fa fa-map-marker-alt m-2"></i> ${getLabel("2 El Tayaran St, Nasr City", "2 ش الطيران، مدينة نصر")}</a>
                            <a href="mailto:marketing@kader-factory.com"><i class="fa fa-envelope m-2"></i> marketing@kader-factory</a>
                            <a href="tel:+201030009248"><i class="fa fa-phone m-2"></i> <span dir="ltr">+2010 3000 9248</span></a>
                            <a href="https://wa.me/201030009248" target="_blank"><i class="fa fa-comment m-2"></i> <span dir="ltr">+2010 3000 9248</span></a>

                            <div class="d-flex align-items-center gap-3 justify-content-start ps-2 py-3 border-top border-white border-opacity-25">
                                ${paymentIconsHtml}
                            </div>

                            <div class="d-flex align-items-center gap-3 justify-content-start ps-2 pt-3 border-top border-white border-opacity-25">
                                <a class="d-flex align-items-center gap-3 cursor-pointer">
                                    <i class="fas fa-file-invoice text-primary fs-3"></i>
                                    <div class="text-start">
                                        <div class="fw-semibold text-primary small">${getLabel("VAT Registered", "مسجل ضريبة القيمة المضافة")}</div>
                                        <div class="text-white" style="font-size: 0.8rem;">${getLabel("Tax No. 300-XXXXXXX-0003", "الرقم الضريبي 300-XXXXXXX-0003")}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    <div class="container-fluid copyright py-5 bg-secondary">
        <div class="container pt-5 copy-rights">
            <div class="row g-4 text-center">
                <div class="col-12">
                    <span class="text-primary opacity-75">
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

  // Rotate chevron icon on expand/collapse
  footer.querySelectorAll(".footer-accordion-toggle").forEach((btn) => {
    const targetId = btn.getAttribute("data-bs-target");
    const target = footer.querySelector(targetId);

    target.addEventListener("show.bs.collapse", () => {
      btn.querySelector(".footer-chevron").classList.add("rotated");
    });
    target.addEventListener("hide.bs.collapse", () => {
      btn.querySelector(".footer-chevron").classList.remove("rotated");
    });
  });
}
/**
 * Create banner component
 */
function createBanner(title, subTitle) {
  const titleLabel = getLabel(title, title);
  const subTitleLabel = subTitle ? getLabel(subTitle, subTitle) : '';

  return `
    <div class="container-fluid bg-breadcrumb bg-dark border-bottom border-black-25">
      <div class="container py-3">
        <ol class="breadcrumb justify-content-start align-items-center text-white mb-0">

          <!-- Home -->
          <li class="breadcrumb-item">
            <a href="#" 
               class="text-white-50" 
               onclick="setCurrentPage('home')">
              ${getLabel("Home", "الرئيسية")}
            </a>
          </li>

          <!-- Title -->
          <span class="px-2" style="opacity:0.4;">/</span>
          <li class="breadcrumb-item ${subTitle ? '' : 'active'} text-capitalize">
            ${
              subTitle
                ? `<a href="#" 
                     class="text-white-50"
                     onclick="setCurrentPage('${title}')">
                     ${titleLabel}
                   </a>`
                : titleLabel
            }
          </li>

          <!-- Subtitle -->
          ${
            subTitle
              ? `
                <span class="px-2" style="opacity:0.4;">/</span>
                <li class="breadcrumb-item active text-capitalize">
                  ${subTitleLabel}
                </li>
              `
              : ''
          }

        </ol>
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

    //Close Mobile Menu
    document.getElementById("mobileMenuPanel").classList.remove("is-open");
    const panel = document.getElementById("megaMenuPanel");
    if (panel) panel.classList.remove("is-open");
    document.body.style.overflow = "";

    // Scroll to top
    window.scrollTo(0, 0);

    // Show/hide nav and footer for chrome-free pages (e.g. auth pages)
    const pagesWithoutChrome = ["register", "login"];
    const mainNav = document.getElementById("mainNav");
    const mainFooter = document.getElementById("mainFooter");
    const mainHeader = document.getElementById("navLinksRow");

    if (pagesWithoutChrome.includes(pageId)) {
      if (mainNav) mainNav.style.display = "none";
      if (mainFooter) mainFooter.style.display = "none";
      if (mainHeader) mainHeader.style.display = "none";
    } else {
      if (mainNav) mainNav.style.display = "";
      if (mainFooter) mainFooter.style.display = "";
      if (mainHeader) mainHeader.style.display = "";
    }

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
    case "machinery":
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
    case "register":
      loadRegisterPage();
      break;
    case "login":
      loadLoginPage();
      break;
    case "contact":
      loadContactPage();
      break;
    case "single-product":
      loadSingleProductPage();
      break;
  }
}

/**
 * Load about page
 */
function loadAboutPage() {
  const container = document.getElementById("aboutPageContent");
  if (!container) return;

  // ===== Content Data (full text, all paragraphs) =====

  const sectorsContent = {
    subtitle: {
      en: "Engineering Excellence Across Civilian & Military Industries",
      ar: "ريادة هندسية في الصناعات المدنية والعسكرية",
    },
    title: { en: "What We Manufacture", ar: "ماذا نصنع" },
    defense: {
      title: { en: "Defense & Government", ar: "القطاع الدفاعي والحكومي" },
      items: [
        { en: "Armored Vehicles", ar: "العربات المدرعة" },
        { en: "Firefighting & Rescue Vehicles", ar: "سيارات الإطفاء والإنقاذ" },
        { en: "Cash-in-Transit Vehicles", ar: "عربات نقل الأموال" },
        { en: "Specialized Vehicle Outfitting", ar: "تجهيزات المركبات" },
        {
          en: "Mobile Technological Centers",
          ar: "المراكز التكنولوجية المتنقلة",
        },
      ],
    },
    civilian: {
      title: { en: "Civilian & Commercial", ar: "القطاع المدني والتجاري" },
      items: [
        {
          en: "Electric Scooters & E-Bikes",
          ar: "السكوترات والدراجات الكهربائية",
        },
        { en: "Home Furniture", ar: "الأثاث المنزلي" },
        { en: "Office Furniture", ar: "الأثاث المكتبي" },
        { en: "Hotel Furniture & Equipment", ar: "الأثاث والتجهيزات الفندقية" },
        { en: "Plastic Products", ar: "المنتجات البلاستيكية" },
      ],
    },
  };

  const visionMissionContent = {
    vision: {
      tabLabel: { en: "Our Vision", ar: "رؤيتنا" },
      eyebrow: { en: "Where We're Headed", ar: "إلى أين نتجه" },
      icon: "fas fa-eye",
      paragraphs: [
        {
          en: "The vision of Kader Factory for Advanced Industries, affiliated with the Arab Organization for Industrialization, is to strengthen its position as a global leader in industrial and technological innovation by developing advanced products and solutions that meet the latest international standards.",
          ar: "تتمثل رؤية مصنع قادر للصناعات المتطورة، التابع لـ الهيئة العربية للتصنيع، في ترسيخ مكانته كأحد الرواد عالمياً في مجالات الابتكار الصناعي والتكنولوجي من خلال تطوير منتجات وحلول متقدمة تواكب أحدث المعايير العالمية.",
        },
        {
          en: "We aspire to become a leading industrial model that actively contributes to sustainable development, providing innovative industrial technologies and solutions that help build a more advanced future for Egypt while enhancing its industrial presence in regional and global markets.",
          ar: "ونسعى إلى أن نكون نموذجاً صناعياً رائداً يسهم بفاعلية في دعم التنمية المستدامة، وتقديم تقنيات وحلول صناعية مبتكرة تسهم في بناء مستقبل أكثر تطوراً لمصر، وتعزز حضورها الصناعي في الأسواق الإقليمية والعالمية.",
        },
        {
          en: "We continuously leverage our accumulated expertise and modern technologies to develop high-quality products that enhance industrial competitiveness and address both present needs and future aspirations.",
          ar: "كما نعمل باستمرار على توظيف الخبرات المتراكمة والتكنولوجيا الحديثة لابتكار منتجات عالية الجودة تدعم التنافسية الصناعية وتلبي احتياجات الحاضر وتطلعات المستقبل.",
        },
      ],
    },
    mission: {
      tabLabel: { en: "Our Mission", ar: "هدفنا" },
      eyebrow: { en: "Why We Exist", ar: "لماذا نحن هنا" },
      icon: "fas fa-bullseye",
      paragraphs: [
        {
          en: "Kader Factory for Advanced Industries aims to lead excellence and innovation in engineering and technological manufacturing by delivering advanced industrial solutions and high-quality products that meet the needs of our customers and partners across various sectors.",
          ar: "يسعى مصنع قادر للصناعات المتطورة، التابع لـ الهيئة العربية للتصنيع، إلى قيادة مسيرة التميز والابتكار في مجالات التصنيع الهندسي والتكنولوجي، من خلال تقديم حلول صناعية متطورة ومنتجات عالية الجودة تلبي احتياجات عملائنا وشركائنا في مختلف القطاعات.",
        },
        {
          en: "We strive to exceed customer expectations by utilizing our extensive experience and adopting the latest industrial technologies, while maintaining the highest standards of quality and efficiency throughout all stages of design, manufacturing, and implementation.",
          ar: "ونعمل على تجاوز توقعات العملاء عبر توظيف خبراتنا المتراكمة، والاستفادة من أحدث التقنيات الصناعية، مع الالتزام بأعلى معايير الجودة والكفاءة في جميع مراحل التصميم والتصنيع والتنفيذ.",
        },
        {
          en: "We are also committed to fostering a culture of continuous innovation and development to ensure that our products and services deliver real value to our customers and support the growth of industrial and economic development.",
          ar: "كما نحرص على ترسيخ ثقافة الابتكار المستمر والتطوير الدائم لضمان تقديم منتجات وخدمات تضيف قيمة حقيقية لعملائنا، ويدعم مسيرة التنمية الصناعية والاقتصادية.",
        },
      ],
    },
  };

  const valuesContent = {
    subtitle: { en: "What Guides Our Work", ar: "ما يوجه أعمالنا" },
    title: { en: "Our Values", ar: "قيمنا" },
    paragraphs: [
      {
        en: "At Kader Factory for Advanced Industries, part of the Arab Organization for Industrialization, we are guided by a set of core values that shape all our operations. These include integrity, innovation, excellence in performance, and teamwork.",
        ar: "في مصنع قادر للصناعات المتطورة التابع لـ الهيئة العربية للتصنيع، نلتزم بمجموعة من القيم التي توجه جميع أعمالنا، وفي مقدمتها النزاهة، والابتكار، والتميز في الأداء، والعمل بروح الفريق.",
      },
      {
        en: "Through these values, we aim to build strong and sustainable partnerships with our customers, while delivering high-quality industrial products and solutions that contribute to development and serve the community.",
        ar: "ونسعى من خلال هذه القيم إلى بناء شراكات قوية ومستدامة مع عملائنا، وتقديم منتجات وحلول صناعية عالية الجودة تسهم في دعم التنمية وخدمة المجتمع.",
      },
    ],
    items: [
      {
        icon: "fas fa-ranking-star",
        title: {
          en: "Quality",
          ar: "الجودة",
        },
        text: {
          en: "Delivering products that meet the highest standards of quality, precision, and durability.",
          ar: "نلتزم بتقديم منتجات بأعلى معايير الجودة والدقة والمتانة.",
        },
      },
      {
        icon: "fas fa-rocket",
        title: {
          en: "Innovation",
          ar: "الابتكار",
        },
        text: {
          en: "Embracing advanced technologies and innovative solutions to drive continuous improvement.",
          ar: "نعتمد أحدث التقنيات والحلول المبتكرة لتحقيق التطوير المستمر.",
        },
      },
      {
        icon: "fas fa-user-shield",
        title: {
          en: "Reliability",
          ar: "الاعتمادية",
        },
        text: {
          en: "Providing dependable products and services our customers can trust with confidence.",
          ar: "نوفر منتجات وخدمات موثوقة تلبي احتياجات عملائنا بثقة واستمرارية.",
        },
      },
      {
        icon: "fas fa-medal",
        title: {
          en: "Excellence",
          ar: "التميز",
        },
        text: {
          en: "Pursuing excellence through skilled craftsmanship, operational efficiency, and continuous growth.",
          ar: "نسعى للتميز من خلال الكفاءة التشغيلية، والحرفية العالية، والتطوير المستمر.",
        },
      },
    ],
  };

  // ===== Render =====

  const sectorItemsHtml = (items, textClass, borderClass) =>
    items
      .map(
        (item) => `
        <li class="d-flex align-items-center ${textClass} py-2 ${borderClass}">
            <i class="fas fa-angle-${getDirectionClass("right", "left")} text-primary ${getDirectionClass("me-2", "ms-2")}"></i> ${getLabel(item.en, item.ar)}
        </li>
    `,
      )
      .join("");

  const paragraphsHtml = (paragraphs, extraClass = "") =>
    paragraphs
      .map(
        (p, i) => `
        <p class="text-muted ${i === paragraphs.length - 1 ? "mb-0" : "mb-3"} ${extraClass}">${getLabel(p.en, p.ar)}</p>
    `,
      )
      .join("");

  container.innerHTML = `
        ${createBanner(getLabel("About Us", "من نحن"))}

        <!-- Who We Are -->
        <div class="container-fluid overflow-hidden py-2 bg-light">
            <div class="container py-5 border-bottom border-black-25">
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6 position-relative">
                        <img src="/images/_about.webp" class="img-fluid rounded-2 w-100" style="height: 48rem; object-fit: cover;" alt="Who We Are">
                    </div>
                    <div class="col-lg-6">
                        <h5 class="sub-title text-primary pb-0">${getLabel(aboutContent.subtitle.en, aboutContent.subtitle.ar)}</h5>
                        <h1 class="display-5 fw-bold mb-4">${getLabel(aboutContent.title.en, aboutContent.title.ar)}</h1>
                        ${paragraphsHtml(aboutContent.paragraphs)}
                        <div class="d-flex align-items-center gap-4 mt-4">
                            ${aboutContent.stats
                              .map(
                                (s, i) => `
                                ${i !== 0 ? '<div class="vr"></div>' : ""}
                                <div>
                                    <h2 class="text-secondary fw-bold mb-0">${s.value}</h2>
                                    <span class="text-muted small">${getLabel(s.label.en, s.label.ar)}</span>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- What We Manufacture -->
        <div class="container-fluid overflow-hidden bg-light">
            <div class="container py-5">
                <div class="section-title text-center">
                    <h5 class="sub-title pb-2">${getLabel(sectorsContent.title.en, sectorsContent.title.ar)}</h5>
                </div>

                <div class="row g-4">
                
                    <div class="col-lg-6">
                        <div class="sector-card sector-card-civilian h-100 rounded-1 p-4 p-lg-5 bg-white shadow-sm">
                            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary bg-opacity-10 mb-4" style="width: 64px; height: 64px;">
                                <i class="fas fa-handshake fa-2x text-white"></i>
                            </div>
                            <h3 class="fw-bold mb-3">${getLabel(sectorsContent.civilian.title.en, sectorsContent.civilian.title.ar)}</h3>
                            <ul class="list-unstyled mb-0">
                                ${sectorItemsHtml(sectorsContent.civilian.items, "text-muted", "border-bottom")}
                            </ul>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="sector-card sector-card-defense h-100 rounded-1 p-4 p-lg-5">
                            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 mb-4" style="width: 64px; height: 64px;">
                                <i class="fas fa-landmark-flag fa-2x text-secondary"></i>
                            </div>
                            <h3 class="text-white fw-bold mb-3">${getLabel(sectorsContent.defense.title.en, sectorsContent.defense.title.ar)}</h3>
                            <ul class="list-unstyled mb-0">
                                ${sectorItemsHtml(sectorsContent.defense.items, "text-white-50", "border-bottom border-white border-opacity-10")}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Vision & Mission: tab switcher, full paragraphs -->
        <div class="container-fluid overflow-hidden bg-light">
            <div class="container pb-5 ">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="vm-tabs-wrapper rounded-1 overflow-hidden shadow-sm">

                            <div class="d-flex vm-tabs-nav">
                                <button class="vm-tab-btn active" data-vm-tab="vision">
                                    <i class="${visionMissionContent.vision.icon} me-2"></i>
                                    ${getLabel(visionMissionContent.vision.tabLabel.en, visionMissionContent.vision.tabLabel.ar)}
                                </button>
                                <button class="vm-tab-btn" data-vm-tab="mission">
                                    <i class="${visionMissionContent.mission.icon} me-2"></i>
                                    ${getLabel(visionMissionContent.mission.tabLabel.en, visionMissionContent.mission.tabLabel.ar)}
                                </button>
                            </div>

                            <div class="vm-tab-content p-4 p-lg-5 bg-white">
                                <div class="vm-tab-pane active" data-vm-pane="vision">
                                    <h5 class="sub-title text-primary px-0">${getLabel(visionMissionContent.vision.eyebrow.en, visionMissionContent.vision.eyebrow.ar)}</h5>
                                    ${paragraphsHtml(visionMissionContent.vision.paragraphs, "fs-5")}
                                </div>
                                <div class="vm-tab-pane" data-vm-pane="mission">
                                    <h5 class="sub-title text-primary px-0">${getLabel(visionMissionContent.mission.eyebrow.en, visionMissionContent.mission.eyebrow.ar)}</h5>
                                    ${paragraphsHtml(visionMissionContent.mission.paragraphs, "fs-5")}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Our Values: full paragraphs + stacked feature rows -->
        <div class="container-fluid overflow-hidden bg-light border-bottom border-black-25">
            <div class="container pb-5">
                <div class="d-flex justify-content-between flex-wrap">
                    <div class="col-12 col-lg-4 pb-4">
                        <h5 class="sub-title text-secondary">${getLabel(valuesContent.title.en, valuesContent.title.ar)}</h5>
                        ${paragraphsHtml(valuesContent.paragraphs)}
                    </div>
                    <div class="row col-lg-8">
                        ${valuesContent.items
                          .map(
                            (v, i) => `
                            <div class="col-12 col-lg-6 p-4 border bg-white rounded-1 shadow-sm">
                                <div class="d-flex">
                                  <i class="${v.icon} fa-2x text-secondary value-row-icon"></i>
                                  <div>
                                    <h5 class="fw-bold mb-0">${getLabel(v.title.en, v.title.ar)}</h5>
                                     <p class="text-black-50 mb-4 mx-auto" >
                                       ${getLabel(v.text.en, v.text.ar)}
                                      </p>
                                  </div>
                                </div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div class="container-fluid overflow-hidden bg-light text-center">
            <div class="container py-4  px-0 d-flex flex-wrap justify-content-between align-items-center">
            <div class="${getDirectionClass("text-start", "text-end")} col-12 col-lg-8">
             <h2 class="display-5 fw-bolder mb-3">${getLabel("Manufacturing Excellence Starts Here", "الصناعة المتميزة تبدأ من هنا")}</h2>
             <p class="text-black-50 mb-4 mx-auto" >
              ${getLabel("Whether you need manufacturing solutions or machinery rental, our team is ready to help.", "سواء كنت بحاجة إلى حلول تصنيع أو تأجير معدات، فريقنا جاهز لمساعدتك.")}
                </p>
            </div>
                <a href="#" class="col-12 col-lg-3 btn btn-primary rounded-0 py-3 px-5" onclick="setCurrentPage('contact')">
                    ${getLabel("Contact Us", "تواصل معنا")}
                </a>
            </div>
        </div>
    `;

  // Vision/Mission tab switching
  container.querySelectorAll(".vm-tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = this.dataset.vmTab;
      container
        .querySelectorAll(".vm-tab-btn")
        .forEach((b) => b.classList.remove("active"));
      container
        .querySelectorAll(".vm-tab-pane")
        .forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      container
        .querySelector(`.vm-tab-pane[data-vm-pane="${target}"]`)
        .classList.add("active");
    });
  });
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

  // ===== Data =====

  const socialHtml = socialLinks
    .map(
      (s) => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer"
           class="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center"
           style="width: 52px; height: 52px;" aria-label="${s.label}">
            <i class="${s.icon}"></i>
        </a>
    `,
    )
    .join("");

  const supportInfoContent = {
    subtitle: { en: "Here to Help", ar: "هنا لمساعدتك" },
    title: { en: "Support & Assistance", ar: "الدعم والمساعدة" },
    items: [
      {
        icon: "fas fa-clock",
        title: { en: "Working Hours", ar: "ساعات العمل" },
        lines: [
          {
            en: "Sunday – Thursday: 8:00 AM – 3:00 PM",
            ar: "الأحد – الخميس: 8:00 ص – 3:00 م",
          },
          { en: "Friday – Saturday: Closed", ar: "الجمعة – السبت: مغلق" },
        ],
      },
      {
        icon: "fas fa-bolt",
        title: { en: "Response Time", ar: "وقت الاستجابة" },
        lines: [
          {
            en: "We respond to all inquiries within one business day.",
            ar: "نستجيب لجميع الاستفسارات خلال يوم عمل واحد.",
          },
        ],
      },
      {
        icon: "fas fa-lock",
        title: { en: "Secured Payment", ar: "دفع آمن" },
        lines: [
          {
            en: "Your data and payment details are always kept safe.",
            ar: "بياناتك وتفاصيل الدفع محمية دائماً.",
          },
        ],
      },
    ],
  };

  const supportItemsHtml = supportInfoContent.items
    .map(
      (item) => `
        <div class="col-md-6 col-lg-4">
            <div class="support-info-card bg-white rounded-1 shadow-sm p-4 h-100">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-opacity-10 mb-3" style="width: 24px; height: 24px;">
                    <i class="${item.icon} text-secondary fs-4"></i>
                </div>
                <p class="fw-bold mb-3">${getLabel(item.title.en, item.title.ar)}</p>
                ${item.lines
                  .map(
                    (line) => `
                    <p class="text-muted small mb-1">${getLabel(line.en, line.ar)}</p>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `,
    )
    .join("");

  // ===== Render =====

  container.innerHTML = `
        ${createBanner(getLabel("Contact Us", "اتصل بنا"))}

        <!-- Quick Contact + Form -->
        <div class="container-fluid contact overflow-hidden pt-5 bg-light">
            <div class="container p-5">
                <div class="row g-5 mb-5">

                    <!-- Left: Quick Contact Info -->
                    <div class="col-lg-6 p-5">
                        <h5 class="sub-title px-3 py-0">${getLabel("Quick Contact", "اتصل بنا")}</h5>
                        <p class="ps-3 pb-3 w-75">
                            ${getLabel(
                              "We are here to help! Whether you have a question, feedback, or need support, our team is ready to assist you.",
                              "نحن هنا لمساعدتك! سواء كان لديك سؤال، أو ملاحظات، أو تحتاج إلى دعم، فإن فريقنا مستعد لتقديم المساعدة لك.",
                            )}
                        </p>

                        <div class="ps-3">
                            <h5 class="fw-bolder pb-2">
                                ${getLabel("Phone", "الهاتف")}:<br>
                                <a class="ps-0 btn btn-white text-decoration-underline pt-0" href="https://wa.me/201556336160" target="_blank" dir="ltr">+20 15 56336160</a>
                            </h5>

                            <h5 class="fw-bolder pb-2">
                                ${getLabel("Email", "البريد")}:<br>
                                <a class="ps-0 btn btn-white text-decoration-underline pt-0" href="mailto:kaderfactory38@gmail.com" target="_blank">kaderfactory38@gmail.com</a>
                            </h5>

                            <h5 class="fw-bolder pb-2">
                                ${getLabel("Location", "الموقع")}:<br>
                                <a class="ps-0 btn btn-white text-decoration-underline pt-0" href="https://www.google.com/maps/search/?api=1&query=Kader+Factory+For+Developed+Industries" target="_blank">
                                    ${getLabel("2 El Tayaran St, Al Golf, Nasr City", "2 شارع الطياران، الجولف، مدينة نصر")}
                                </a>
                            </h5>

                            <h5 class="fw-bolder pb-2">
                                ${getLabel("Follow us", "تابعنا")}:
                                <div class="d-flex gap-2 p-2">
                                    ${socialHtml}
                                </div>
                            </h5>


                        </div>
                    </div>

                    <!-- Right: Contact Form -->
                    <div class="col-lg-6 bg-white p-5 shadow-sm rounded-1">
                        <h5 class="sub-title px-3">${getLabel("Get in touch", "تواصل معنا")}</h5>
                        <form id="contactForm">
                            <div class="row g-4">
                                <div class="col-12">
                                    <input type="text" class="form-control bg-light" id="contactName" placeholder="${getLabel("Your Name / Company Name", "الاسم / اسم الشركة")}">
                                </div>
                                <div class="col-12">
                                    <input type="email" class="form-control bg-light" id="contactEmail" placeholder="${getLabel("Your Email", "البريد الألكتروني")}">
                                </div>
                                <div class="col-12">
                                    <input type="text" class="form-control bg-light" id="contactSubject" placeholder="${getLabel("Subject", "الموضوع")}">
                                </div>
                                <div class="col-12">
                                    <textarea class="form-control bg-light" id="contactMessage" rows="5" placeholder="${getLabel("Message", "الرسالة")}"></textarea>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary w-100 py-3 rounded-0">
                                        ${getLabel("Send Message", "إرسال")}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Support Info: Working Hours / Response Time / Support & Assistance -->
                    <div class=" bg-light px-0 pt-5 border-top">
                        <div class="text-center">
                                <h5 class="sub-title fw-bolder">${getLabel(supportInfoContent.title.en, supportInfoContent.title.ar)}</h5>
                            <div class="row g-4">
                                ${supportItemsHtml}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

    `;

  // Contact form submit handler
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      const email = document.getElementById("contactEmail").value;
      const subject = document.getElementById("contactSubject").value;
      const message = document.getElementById("contactMessage").value;

      // Hook your actual contact/API call here
      console.log("Contact form submitted", { name, email, subject, message });
    });
  }
}
/**
 * Initialize Sign Up Page
 */
function loadRegisterPage() {
  const container = document.getElementById("registerPageContent");
  if (!container) return;

  container.innerHTML = `
        <div class="container-fluid p-0">
            <div class="row g-0">

                <!-- Left: Branded visual panel -->
                <div class="col-lg-4 d-none d-lg-flex signup-visual-panel position-relative vh-100">
                    <div class="signup-visual-overlay"></div>
                    <div class="position-relative d-flex align-items-start flex-column justify-content-between p-5">

                    <a href="/#home" >
                    <img src="/images/logo-kader-white.png" alt="KADER" style="max-height: 3.2rem; object-fit:contain;">
                    </a>

                        <div >
                            <h2 class="display-1 fw-bold mb-3 text-primary">${getLabel("Join Our Network", "انضم إلى شبكتنا")}</h2>
                            <p class="text-white-50 mb-4" style="max-width: 400px;">
                                ${getLabel(
                                  "Create an account to access exclusive pricing, track orders, and manage your industrial equipment needs in one place.",
                                  "أنشئ حساباً للوصول إلى أسعار حصرية، وتتبع الطلبات، وإدارة احتياجاتك من المعدات الصناعية في مكان واحد.",
                                )}
                            </p>
                            <div class="d-flex gap-4">
                                <div>
                                    <h4 class="fw-bold mb-0">70+</h4>
                                    <span class="text-white-50 small">${getLabel("Years Experience", "سنوات خبرة")}</span>
                                </div>
                                <div>
                                    <h4 class="fw-bold mb-0">100+</h4>
                                    <span class="text-white-50 small">${getLabel("Industrial Partners", "شريك صناعي")}</span>
                                </div>
                            </div>
                        </div>

                        <span class="text-white-50 small">${getLabel("© 2026 Kader Factory for Advanced Industries", "© 2026 مصنع قادر للصناعات المتطورة")}</span>
                    </div>
                </div>

                <!-- Right: Sign up form -->
                <div class="col-lg-8 d-flex align-items-center justify-content-center py-5">
                    <div class="w-100 px-4 px-md-5" style="max-width: 480px;">

                        <div class="text-center text-lg-start mb-2">
                            <h5 class="sub-title text-primary px-3 px-lg-0">${getLabel("GET STARTED", "ابدأ الآن")}</h5>
                            <h2 class="fw-bold mb-2">${getLabel("Create Your Account", "أنشئ حسابك")}</h2>
                            <p class="text-muted mb-0">
                                ${getLabel("Already have an account?", "لديك حساب بالفعل؟")}
                                <a href="#login" class="fw-semibold text-primary text-decoration-none" onclick="setCurrentPage('login')">
                                    ${getLabel("Sign In", "تسجيل الدخول")}
                                </a>
                            </p>
                        </div>

                        <form id="signupForm" novalidate>
                            <div class="row g-3 mb-3">
                                <div class="col-md-6">
                                    <label class="form-label small fw-semibold" for="firstName">${getLabel("First Name", "الاسم الأول")}</label>
                                    <input type="text" class="form-control py-2" id="firstName" required>
                                    <div class="invalid-feedback" id="firstName-error"></div>


                                </div>
                                <div class="col-md-6">
                                    <label class="form-label small fw-semibold" for="lastName">${getLabel("Last Name", "اسم العائلة")}</label>
                                    <input type="text" class="form-control py-2" id="lastName" required>
                                    <div class="invalid-feedback" id="lastName-error"></div>


                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label small fw-semibold" for="signupEmail">${getLabel("Email Address", "البريد الإلكتروني")}</label>
                                <input type="email" class="form-control py-2" id="signupEmail" required>
                                <div class="invalid-feedback" id="signupEmail-error"></div>


                            </div>

                            <div class="mb-3">
                                <label class="form-label small fw-semibold" for="signupPhone">${getLabel("Phone Number", "رقم الهاتف")}</label>
                                <input type="tel" class="form-control py-2" id="signupPhone" dir="ltr" required>
                                <div class="invalid-feedback" id="signupPhone-error"></div>


                            </div>

                            <div class="mb-3">
                                <label class="form-label small fw-semibold" for="signupPassword">${getLabel("Password", "كلمة المرور")}</label>
                                <div class="input-group">
                                    <input type="password" class="form-control py-2" id="signupPassword" required>
                                    <div class="invalid-feedback" id="signupPassword-error"></div>
                                    
                                    <button class="btn btn-outline-primary position-absolute end-0"  type="button" id="togglePassword">
                                    <i class="far fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label small fw-semibold" for="confirmPassword">${getLabel("Confirm Password", "تأكيد كلمة المرور")}</label>
                                <input type="password" class="form-control py-2" id="confirmPassword" required>
                                <div class="invalid-feedback" id="confirmPassword-error"></div>


                            </div>

                            <div class="form-check mb-4">
                                <input class="form-check-input" type="checkbox" id="agreeTerms" required>
                                <label class="form-check-label small text-muted" for="agreeTerms">
                                    ${getLabel("I agree to the", "أوافق على")}
                                    <a href="#" onclick="setCurrentPage('terms-of-service')">${getLabel("Terms of Service", "الشروط والأحكام")}</a>
                                    ${getLabel("and", "و")}
                                    <a href="#" onclick="setCurrentPage('privacy-policy')">${getLabel("Privacy Policy", "سياسة الخصوصية")}</a>
                                </label>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 py-3 rounded-0 fw-semibold">
                                ${getLabel("Create Account", "إنشاء الحساب")}
                            </button>

                            <div class="text-center my-4 signup-divider">
                                <span class="bg-white px-3 text-muted small">${getLabel("OR", "أو")}</span>
                            </div>

                            <button type="button" class="btn btn-outline-secondary w-100 py-3 rounded-0 d-flex align-items-center justify-content-center gap-2">
                                <i class="fab fa-google"></i>
                                ${getLabel("Continue with Google", "المتابعة عبر جوجل")}
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    `;

  // Toggle password visibility
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("signupPassword");
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.querySelector("i").className = isPassword
      ? "far fa-eye-slash"
      : "far fa-eye";
  });

  // Basic client-side validation feedback
  const form = document.getElementById("signupForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateSignupForm();

    // Hook your actual signup/API call here
    console.log("Signup submitted");
  });

  // Validations
  function validateSignupForm() {
    let isValid = true;

    const fields = {
      firstName: document.getElementById("firstName"),
      lastName: document.getElementById("lastName"),
      signupEmail: document.getElementById("signupEmail"),
      signupPhone: document.getElementById("signupPhone"),
      signupPassword: document.getElementById("signupPassword"),
      confirmPassword: document.getElementById("confirmPassword"),
      agreeTerms: document.getElementById("agreeTerms"),
    };

    function showError(field, message) {
      field.classList.add("is-invalid");
      const errorEl = document.getElementById(`${field.id}-error`);
      if (errorEl) errorEl.textContent = message;
      isValid = false;
    }

    function clearError(field) {
      field.classList.remove("is-invalid");
      const errorEl = document.getElementById(`${field.id}-error`);
      if (errorEl) errorEl.textContent = "";
    }

    // Reset all first
    Object.values(fields).forEach((f) => f && clearError(f));

    // First / Last name — required, letters only (basic check)
    if (!fields.firstName.value.trim()) {
      showError(
        fields.firstName,
        getLabel("First name is required", "الاسم الأول مطلوب"),
      );
    }
    if (!fields.lastName.value.trim()) {
      showError(
        fields.lastName,
        getLabel("Last name is required", "اسم العائلة مطلوب"),
      );
    }

    // Email — required + valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.signupEmail.value.trim()) {
      showError(
        fields.signupEmail,
        getLabel("Email is required", "البريد الإلكتروني مطلوب"),
      );
    } else if (!emailRegex.test(fields.signupEmail.value.trim())) {
      showError(
        fields.signupEmail,
        getLabel(
          "Enter a valid email address",
          "أدخل بريداً إلكترونياً صحيحاً",
        ),
      );
    }

    // Phone — required, digits only, reasonable length
    const phoneDigits = fields.signupPhone.value.replace(/\D/g, "");
    if (!phoneDigits) {
      showError(
        fields.signupPhone,
        getLabel("Phone number is required", "رقم الهاتف مطلوب"),
      );
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      showError(
        fields.signupPhone,
        getLabel("Enter a valid phone number", "أدخل رقم هاتف صحيح"),
      );
    }

    // Password — required, min length, at least one number
    const password = fields.signupPassword.value;
    if (!password) {
      showError(
        fields.signupPassword,
        getLabel("Password is required", "كلمة المرور مطلوبة"),
      );
    } else if (password.length < 8) {
      showError(
        fields.signupPassword,
        getLabel(
          "Password must be at least 8 characters",
          "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
        ),
      );
    } else if (!/\d/.test(password)) {
      showError(
        fields.signupPassword,
        getLabel(
          "Password must include at least one number",
          "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
        ),
      );
    }

    // Confirm password — must match
    if (!fields.confirmPassword.value) {
      showError(
        fields.confirmPassword,
        getLabel("Please confirm your password", "يرجى تأكيد كلمة المرور"),
      );
    } else if (fields.confirmPassword.value !== password) {
      showError(
        fields.confirmPassword,
        getLabel("Passwords do not match", "كلمتا المرور غير متطابقتين"),
      );
    }

    // Terms checkbox — must be checked
    if (!fields.agreeTerms.checked) {
      fields.agreeTerms.classList.add("is-invalid");
      isValid = false;
    } else {
      fields.agreeTerms.classList.remove("is-invalid");
    }

    return isValid;
  }
}

/**
 * Initialize Sign In Page
 */
function loadLoginPage() {
  const loginPage = document.getElementById("loginPageContent");
  if (!loginPage) return;

  loginPage.innerHTML = `
        <div class="container-fluid p-0">
            <div class="row g-0 min-vh-100">

                <!-- Left: Branded visual panel -->
                <div class="col-lg-4 d-none d-lg-flex signup-visual-panel position-relative v-100">
                    <div class="signup-visual-overlay"></div>
                    <div class="position-relative d-flex align-items-start flex-column justify-content-between p-5">

                    <a href="/#home" >
                    <img src="/images/logo-kader-white.png" alt="KADER" style="max-height: 3.2rem; object-fit:contain;">
                    </a>

                        <div>
                            <h2 class="display-1 fw-bold mb-3 text-primary">${getLabel("Welcome Back", "مرحباً بعودتك")}</h2>
                            <p class="text-white-50 mb-4" style="max-width: 400px;">
                                ${getLabel(
                                  "Sign in to access your account, track orders, and manage your industrial equipment needs.",
                                  "سجل الدخول للوصول إلى حسابك، وتتبع طلباتك، وإدارة احتياجاتك من المعدات الصناعية.",
                                )}
                            </p>
                            <div class="d-flex gap-4">
                                <div>
                                    <h4 class="fw-bold mb-0">70+</h4>
                                    <span class="text-white-50 small">${getLabel("Years Experience", "سنوات خبرة")}</span>
                                </div>
                                <div>
                                    <h4 class="fw-bold mb-0">100+</h4>
                                    <span class="text-white-50 small">${getLabel("Industrial Partners", "شريك صناعي")}</span>
                                </div>
                            </div>
                        </div>

                        <span class="text-white-50 small">${getLabel("© 2026 Kader Factory for Advanced Industries", "© 2026 مصنع قادر للصناعات المتطورة")}</span>
                    </div>
                </div>

                <!-- Right: Sign in form -->
                <div class="col-lg-8 d-flex align-items-center justify-content-center py-5">
                    <div class="w-100 px-4 px-md-5" style="max-width: 440px;">

                        <div class="text-center text-lg-start mb-5">
                            <h5 class="sub-title text-primary px-3 px-lg-0">${getLabel("WELCOME BACK", "مرحباً بعودتك")}</h5>
                            <h2 class="fw-bold mb-2">${getLabel("Sign In to Your Account", "تسجيل الدخول إلى حسابك")}</h2>
                            <p class="text-muted mb-0">
                                ${getLabel("Don't have an account?", "ليس لديك حساب؟")}
                                <a href="#register" class="fw-semibold text-primary text-decoration-none" onclick="setCurrentPage('register')">
                                    ${getLabel("Create One", "أنشئ حساباً")}
                                </a>
                            </p>
                        </div>

                        <form id="loginForm" novalidate>
                            <div class="mb-3">
                                <label class="form-label small fw-semibold" for="loginEmail">${getLabel("Email Address", "البريد الإلكتروني")}</label>
                                <input type="email" class="form-control py-2" id="loginEmail" required>
                            </div>

                            <div class="mb-2">
                                <label class="form-label small fw-semibold" for="loginPassword">${getLabel("Password", "كلمة المرور")}</label>
                                <div class="input-group">
                                    <input type="password" class="form-control py-2" id="loginPassword" required>
                                    <button class="btn btn-outline-primary position-absolute end-0"  type="button" id="toggleLoginPassword">

                                        <i class="far fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="rememberMe">
                                    <label class="form-check-label small text-muted" for="rememberMe">
                                        ${getLabel("Remember me", "تذكرني")}
                                    </label>
                                </div>
                                <a href="#" class="small text-primary text-decoration-none" onclick="setCurrentPage('forgot-password')">
                                    ${getLabel("Forgot Password?", "نسيت كلمة المرور؟")}
                                </a>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 py-3 rounded-0 fw-semibold">
                                ${getLabel("Sign In", "تسجيل الدخول")}
                            </button>

                            <div class="text-center my-4 signup-divider">
                                <span class="bg-white px-3 text-muted small">${getLabel("OR", "أو")}</span>
                            </div>

                            <button type="button" class="btn btn-outline-secondary w-100 py-3 rounded-0 d-flex align-items-center justify-content-center gap-2">
                                <i class="fab fa-google"></i>
                                ${getLabel("Continue with Google", "المتابعة عبر جوجل")}
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    `;

  // Toggle password visibility
  const toggleBtn = document.getElementById("toggleLoginPassword");
  const passwordInput = document.getElementById("loginPassword");
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.querySelector("i").className = isPassword
      ? "far fa-eye-slash"
      : "far fa-eye";
  });

  // Form submit
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Hook your actual login/API call here
    console.log("Login submitted", { email, password });
  });
}

/**
 * Initialize Single Product Page
 */

function loadSingleProductPage(productId) {
    const container = document.getElementById("singleProductContent");
    if (!container) return;

    const currentData = appState.language === 'ar' ? productsData.ar : productsData.en;
    const product = currentData.find(p => p.id === productId) || currentData[0];

    if (!product) {
        container.innerHTML = `<div class="container py-5 text-center text-muted">${getLabel('Product not found', 'المنتج غير موجود')}</div>`;
        return;
    }

    // ===== Data (adjust field names to match your real product objects) =====
    const gallery = product.gallery || [product.url, product.url, product.url];
    const price = product.price || 0;
    const colors = product.colors || [
        { name: 'Black', nameAr: 'أسود', hex: '#1a1a1a' },
        { name: 'Red', nameAr: 'أحمر', hex: '#c0392b' },
        { name: 'White', nameAr: 'أبيض', hex: '#f5f5f5' }
    ];
    const sizes = product.sizes || [{ en: 'One Size', ar: 'مقاس واحد' }];

    const specGroups = product.specGroups || [
        {
            titleEn: 'Performance & Motor', titleAr: 'الأداء والمحرك',
            items: [
                { en: '1500W electric motor delivering stable power and high efficiency', ar: 'محرك كهربائي 1500 وات يوفر طاقة ثابتة وكفاءة عالية' },
                { en: 'Maximum speed ranging from 40 to 50 km/h', ar: 'سرعة قصوى تتراوح بين 40 و50 كم/س' },
                { en: 'Driving range of 40–50 km per charge (depending on usage conditions)', ar: 'مدى قيادة من 40 إلى 50 كم لكل شحنة (حسب ظروف الاستخدام)' }
            ]
        },
        {
            titleEn: 'Battery & Charging', titleAr: 'البطارية والشحن',
            items: [
                { en: 'High-efficiency 60V – 32Ah lithium battery', ar: 'بطارية ليثيوم عالية الكفاءة 60 فولت – 32 أمبير/ساعة' },
                { en: 'Fast charging system with a charging time of only 4 to 6 hours', ar: 'نظام شحن سريع بزمن شحن من 4 إلى 6 ساعات فقط' }
            ]
        },
        {
            titleEn: 'Durability & Structure', titleAr: 'المتانة والتصميم',
            items: [
                { en: 'Load capacity up to 250 kg', ar: 'سعة تحميل تصل إلى 250 كجم' },
                { en: 'Robust design ensuring stability and safety during driving', ar: 'تصميم قوي يضمن الثبات والأمان أثناء القيادة' }
            ]
        },
        {
            titleEn: 'Features & Technology', titleAr: 'المميزات والتقنية',
            items: [
                { en: 'Remote control system with 2 remotes (dual keys) for ease of use and enhanced security', ar: 'نظام تحكم عن بعد بريموتين (مفتاحين) لسهولة الاستخدام وأمان إضافي' },
                { en: 'Digital display for clear monitoring of essential data', ar: 'شاشة رقمية لعرض البيانات الأساسية بوضوح' },
                { en: 'USB port for charging devices on the go', ar: 'منفذ USB لشحن الأجهزة أثناء التنقل' }
            ]
        },
        {
            titleEn: 'Safety & Comfort', titleAr: 'السلامة والراحة',
            items: [
                { en: 'Front and rear disc brakes for maximum safety', ar: 'فرامل قرصية أمامية وخلفية لأقصى درجات الأمان' },
                { en: 'Tubeless tires to reduce breakdown risks and improve reliability', ar: 'إطارات بدون أنبوب لتقليل مخاطر الأعطال وتحسين الموثوقية' }
            ]
        }
    ];

    const warranty = product.warranty || [
        { en: '3-year warranty on the battery', ar: 'ضمان 3 سنوات على البطارية' },
        { en: '2-year warranty on the scooter against manufacturing defects', ar: 'ضمان سنتين على السكوتر ضد عيوب التصنيع' }
    ];

    const relatedProducts = currentData.filter(p => p.category === product.category && p !== product).slice(0, 4);

    // ===== Reservation contact placeholders (reuse your real contact details) =====
    const RESERVATION_WHATSAPP = '201556336160'; // placeholder, matches contact page number without '+'
    const RESERVATION_EMAIL = 'kaderfactory38@gmail.com'; // placeholder, matches contact page email

    // ===== Render helpers =====

    const galleryThumbsHtml = gallery.map((img, i) => `
        <div class="product-thumb ${i === 0 ? 'active' : ''}" data-img="${img}" data-index="${i}">
            <img src="${img}" alt="${product.title} ${i + 1}" class="img-fluid">
        </div>
    `).join('');

    const colorSwatchesHtml = colors.map((c, i) => `
        <button type="button" class="color-swatch ${i === 0 ? 'active' : ''}" data-color="${getLabel(c.name, c.nameAr)}" style="background:${c.hex};" title="${getLabel(c.name, c.nameAr)}"></button>
    `).join('');

    const sizeOptionsHtml = sizes.map((s, i) => `
        <button type="button" class="size-option ${i === 0 ? 'active' : ''}" data-size="${getLabel(s.en, s.ar)}">${getLabel(s.en, s.ar)}</button>
    `).join('');

    const specGroupsHtml = specGroups.map((group, i) => `
        <div class="spec-group-item border-bottom">
            <button class="spec-group-toggle d-flex align-items-center justify-content-between w-100 bg-transparent border-0 py-3" type="button" data-bs-toggle="collapse" data-bs-target="#specGroup${i}">
                <h6 class="fw-bold mb-0">${getLabel(group.titleEn, group.titleAr)}</h6>
                <i class="fas fa-chevron-down spec-chevron"></i>
            </button>
            <div class="collapse ${i === 0 ? 'show' : ''}" id="specGroup${i}">
                <ul class="text-muted small mb-3 ps-3">
                    ${group.items.map(item => `<li class="mb-1">${getLabel(item.en, item.ar)}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    const relatedHtml = relatedProducts.map(p => `
        <div class="col-6 col-md-3">
            <div class="card h-100 border-0 shadow-sm product-related-card" onclick="loadSingleProductPage('${p.id}')">
                <img src="${p.url}" class="card-img-top" style="height: 160px; object-fit: cover;" alt="${p.title}">
                <div class="card-body">
                    <h6 class="card-title text-truncate mb-1">${p.title}</h6>
                    <span class="text-muted small">${p.sub_category || ''}</span>
                </div>
            </div>
        </div>
    `).join('');

    // ===== Render page =====

    container.innerHTML = `
        <div class="container-fluid overflow-hidden py-4 bg-white border-bottom">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 small">
                        <li class="breadcrumb-item"><a href="#" onclick="setCurrentPage('home')">${getLabel('Home', 'الرئيسية')}</a></li>
                        <li class="breadcrumb-item"><a href="#" onclick="setCurrentPage('products')">${getLabel('Products', 'المنتجات')}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">${product.title}</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="container-fluid overflow-hidden py-5 bg-white">
            <div class="container">
                <div class="row g-5">

                    <!-- Left: Gallery -->
                    <div class="col-lg-5">
                        <div class="product-main-image mb-3 position-relative">
                            <img src="${gallery[0]}" class="img-fluid w-100" id="mainProductImage" alt="${product.title}">
                            <button type="button" class="product-zoom-btn" id="openGalleryOverlay" aria-label="${getLabel('View full image', 'عرض الصورة كاملة')}">
                                <i class="fas fa-magnifying-glass-plus"></i>
                            </button>
                        </div>
                        <div class="d-flex gap-2 product-thumbs-row">
                            ${galleryThumbsHtml}
                        </div>
                    </div>

                    <!-- Middle: Product Info -->
                    <div class="col-lg-4">
                        <h5 class="text-muted small mb-1">${product.sub_category || ''}</h5>
                        <h2 class="fw-bold mb-3">${product.title}</h2>

                        <div class="mb-3">
                            <span class="fs-3 fw-bold text-primary">${price.toLocaleString()} ${getLabel('EGP', 'ج.م')}</span>
                        </div>

                        <p class="text-muted">${product.desc}</p>

                        <hr>

                        <h6 class="fw-bold mb-3">${getLabel('Technical Specifications', 'المواصفات الفنية')}</h6>
                        <div class="spec-groups-wrapper">
                            ${specGroupsHtml}
                        </div>

                        <hr>

                        <h6 class="fw-bold mb-2">${getLabel('Warranty', 'الضمان')}</h6>
                        <ul class="text-muted small">
                            ${warranty.map(w => `<li class="mb-1">${getLabel(w.en, w.ar)}</li>`).join('')}
                        </ul>
                    </div>

                    <!-- Right: Reservation Box -->
                    <div class="col-lg-3">
                        <div class="buy-box border rounded-3 p-4">
                            <div class="mb-3">
                                <span class="fs-4 fw-bold text-primary">${price.toLocaleString()} ${getLabel('EGP', 'ج.م')}</span>
                            </div>

                            <div class="mb-4">
                                <label class="form-label small fw-semibold">${getLabel('Select Color', 'اختر اللون')}</label>
                                <div class="d-flex gap-2" id="colorSwatches">
                                    ${colorSwatchesHtml}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label small fw-semibold">${getLabel('Select Size', 'اختر المقاس')}</label>
                                <div class="d-flex gap-2 flex-wrap" id="sizeOptions">
                                    ${sizeOptionsHtml}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label small fw-semibold">${getLabel('Quantity', 'الكمية')}</label>
                                <div class="input-group" style="max-width: 140px;">
                                    <button class="btn btn-outline-secondary" type="button" id="qtyDecrease">-</button>
                                    <input type="number" class="form-control text-center" id="productQty" value="1" min="1">
                                    <button class="btn btn-outline-secondary" type="button" id="qtyIncrease">+</button>
                                </div>
                            </div>

                            <button class="btn btn-primary w-100 py-3 rounded-0 mb-3" id="openReservationModal">
                                ${getLabel('Request Reservation', 'طلب حجز')}
                            </button>

                            <hr>

                            <div class="d-flex align-items-start gap-2 mb-3">
                                <i class="fas fa-shield-alt text-primary mt-1"></i>
                                <div>
                                    <div class="small fw-semibold">${getLabel('Quality Guaranteed', 'جودة مضمونة')}</div>
                                    <div class="small text-muted">${getLabel('Manufactured to international standards', 'مُصنّع وفق المعايير الدولية')}</div>
                                </div>
                            </div>

                            <div class="d-flex align-items-start gap-2">
                                <i class="fas fa-undo text-primary mt-1"></i>
                                <div>
                                    <div class="small fw-semibold">${getLabel('Return Policy', 'سياسة الإرجاع')}</div>
                                    <div class="small text-muted">${getLabel('14-day return window', 'فترة إرجاع 14 يوماً')}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Return Policy -->
        <div class="container-fluid overflow-hidden py-5 bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <h4 class="fw-bold mb-3">${getLabel('Return Policy', 'سياسة الإرجاع')}</h4>
                        <p class="text-muted mb-3">
                            ${getLabel(
                                'We always strive to ensure our customers are satisfied with the products they purchase. If you are not satisfied with any product, we offer a flexible return policy under the following conditions:',
                                'نحرص دائماً على رضا عملائنا عن المنتجات التي يشترونها. في حال عدم رضاك عن أي منتج، نوفر سياسة إرجاع مرنة وفق الشروط التالية:'
                            )}
                        </p>
                        <ul class="text-muted">
                            <li class="mb-2">${getLabel('Return Period: Within 14 days of receiving the product, provided it is unused and in its original packaging.', 'فترة الإرجاع: خلال 14 يوماً من استلام المنتج، بشرط أن يكون غير مستخدم وفي عبوته الأصلية.')}</li>
                            <li class="mb-2">${getLabel('Condition: The product must be unused, in good condition, with all accessories and tags included.', 'الحالة: يجب أن يكون المنتج غير مستخدم وبحالة جيدة، مع جميع الملحقات والبطاقات.')}</li>
                            <li class="mb-2">${getLabel('Proof of Purchase: Please provide a receipt or invoice with the returned product.', 'إثبات الشراء: يرجى إرفاق الفاتورة أو الإيصال مع المنتج المرتجع.')}</li>
                            <li class="mb-2">${getLabel('Refunds: Once inspected, refunds are processed to the original payment method within 5–10 business days.', 'الاسترداد: بعد الفحص، تتم إعادة المبلغ بنفس وسيلة الدفع خلال 5 إلى 10 أيام عمل.')}</li>
                            <li class="mb-2">${getLabel('Shipping Fees: Shipping fees are non-refundable.', 'رسوم الشحن: رسوم الشحن غير قابلة للاسترداد.')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Related Products -->
        ${relatedProducts.length > 0 ? `
        <div class="container-fluid overflow-hidden py-5 bg-white">
            <div class="container">
                <h4 class="fw-bold mb-4">${getLabel('You Might Also Like', 'قد يعجبك أيضاً')}</h4>
                <div class="row g-4">
                    ${relatedHtml}
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Fullscreen Gallery Overlay -->
        <div class="product-gallery-overlay d-none" id="galleryOverlay">
            <button type="button" class="gallery-overlay-close" id="closeGalleryOverlay" aria-label="${getLabel('Close', 'إغلاق')}">
                <i class="fas fa-times"></i>
            </button>
            <div class="swiper galleryOverlaySwiper">
                <div class="swiper-wrapper">
                    ${gallery.map(img => `
                        <div class="swiper-slide d-flex align-items-center justify-content-center">
                            <img src="${img}" class="img-fluid" style="max-height: 85vh;" alt="${product.title}">
                        </div>
                    `).join('')}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </div>
        </div>

        <!-- Reservation Modal -->
        <div class="reservation-modal-backdrop d-none" id="reservationModalBackdrop">
            <div class="reservation-modal">
                <button type="button" class="reservation-modal-close" id="closeReservationModal" aria-label="${getLabel('Close', 'إغلاق')}">
                    <i class="fas fa-times"></i>
                </button>

                <h4 class="fw-bold mb-1">${getLabel('Request Reservation', 'طلب حجز')}</h4>
                <p class="text-muted small mb-4">${getLabel('Fill in your details and we will confirm your reservation shortly.', 'أدخل بياناتك وسنؤكد حجزك في أقرب وقت.')}</p>

                <div class="bg-light rounded-3 p-3 mb-4">
                    <div class="d-flex justify-content-between small mb-1">
                        <span class="text-muted">${getLabel('Product', 'المنتج')}</span>
                        <span class="fw-semibold">${product.title}</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                        <span class="text-muted">${getLabel('Color', 'اللون')}</span>
                        <span class="fw-semibold" id="reservationSummaryColor">${getLabel(colors[0].name, colors[0].nameAr)}</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                        <span class="text-muted">${getLabel('Size', 'المقاس')}</span>
                        <span class="fw-semibold" id="reservationSummarySize">${getLabel(sizes[0].en, sizes[0].ar)}</span>
                    </div>
                    <div class="d-flex justify-content-between small">
                        <span class="text-muted">${getLabel('Quantity', 'الكمية')}</span>
                        <span class="fw-semibold" id="reservationSummaryQty">1</span>
                    </div>
                </div>

                <form id="reservationForm">
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">${getLabel('Full Name', 'الاسم الكامل')}</label>
                        <input type="text" class="form-control" id="reservationName" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label small fw-semibold">${getLabel('Phone Number', 'رقم الهاتف')}</label>
                        <input type="tel" class="form-control" id="reservationPhone" dir="ltr" required>
                    </div>

                    <p class="small text-muted mb-2">${getLabel('Send this reservation via:', 'أرسل الحجز عبر:')}</p>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-success flex-fill py-2" id="sendViaWhatsapp">
                            <i class="fab fa-whatsapp me-2"></i>${getLabel('WhatsApp', 'واتساب')}
                        </button>
                        <button type="button" class="btn btn-outline-secondary flex-fill py-2" id="sendViaEmail">
                            <i class="fas fa-envelope me-2"></i>${getLabel('Email', 'البريد')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // ===================== Interactions =====================

    // --- Gallery thumbnail click ---
    let activeThumbIndex = 0;
    container.querySelectorAll('.product-thumb').forEach(thumb => {
        thumb.addEventListener('click', function () {
            container.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            activeThumbIndex = parseInt(this.dataset.index, 10);
            document.getElementById('mainProductImage').src = this.dataset.img;
        });
    });

    // --- Quantity stepper (defensive, scoped to this container) ---
    const qtyInput = container.querySelector('#productQty');
    const qtyIncreaseBtn = container.querySelector('#qtyIncrease');
    const qtyDecreaseBtn = container.querySelector('#qtyDecrease');

    if (qtyInput && qtyIncreaseBtn && qtyDecreaseBtn) {
        qtyIncreaseBtn.addEventListener('click', () => {
            const current = parseInt(qtyInput.value, 10) || 1;
            qtyInput.value = current + 1;
        });
        qtyDecreaseBtn.addEventListener('click', () => {
            const current = parseInt(qtyInput.value, 10) || 1;
            if (current > 1) qtyInput.value = current - 1;
        });
        qtyInput.addEventListener('input', () => {
            if (parseInt(qtyInput.value, 10) < 1 || isNaN(parseInt(qtyInput.value, 10))) {
                qtyInput.value = 1;
            }
        });
    }

    // --- Color swatches ---
    let selectedColor = getLabel(colors[0].name, colors[0].nameAr);
    container.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', function () {
            container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.dataset.color;
        });
    });

    // --- Size options ---
    let selectedSize = getLabel(sizes[0].en, sizes[0].ar);
    container.querySelectorAll('.size-option').forEach(opt => {
        opt.addEventListener('click', function () {
            container.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
        });
    });

    // --- Spec group chevrons ---
    container.querySelectorAll('.spec-group-toggle').forEach(btn => {
        const targetId = btn.getAttribute('data-bs-target');
        const target = container.querySelector(targetId);
        target.addEventListener('show.bs.collapse', () => btn.querySelector('.spec-chevron').classList.add('rotated'));
        target.addEventListener('hide.bs.collapse', () => btn.querySelector('.spec-chevron').classList.remove('rotated'));
    });

    // --- Fullscreen Gallery Overlay ---
    const galleryOverlay = document.getElementById('galleryOverlay');
    const openGalleryBtn = document.getElementById('openGalleryOverlay');
    const closeGalleryBtn = document.getElementById('closeGalleryOverlay');
    let galleryOverlaySwiper = null;

    openGalleryBtn.addEventListener('click', () => {
        galleryOverlay.classList.remove('d-none');
        document.body.style.overflow = 'hidden';

        if (!galleryOverlaySwiper) {
            galleryOverlaySwiper = new Swiper('.galleryOverlaySwiper', {
                slidesPerView: 1,
                loop: true,
                initialSlide: activeThumbIndex,
                rtl: document.documentElement.dir === 'rtl',
                navigation: {
                    nextEl: '.galleryOverlaySwiper .swiper-button-next',
                    prevEl: '.galleryOverlaySwiper .swiper-button-prev',
                },
                pagination: {
                    el: '.galleryOverlaySwiper .swiper-pagination',
                    clickable: true,
                }
            });
        } else {
            galleryOverlaySwiper.slideToLoop(activeThumbIndex, 0);
        }
    });

    closeGalleryBtn.addEventListener('click', () => {
        galleryOverlay.classList.add('d-none');
        document.body.style.overflow = '';
    });

    // --- Reservation Modal ---
    const reservationBackdrop = document.getElementById('reservationModalBackdrop');
    const openReservationBtn = document.getElementById('openReservationModal');
    const closeReservationBtn = document.getElementById('closeReservationModal');

    openReservationBtn.addEventListener('click', () => {
        document.getElementById('reservationSummaryColor').textContent = selectedColor;
        document.getElementById('reservationSummarySize').textContent = selectedSize;
        document.getElementById('reservationSummaryQty').textContent = qtyInput.value;
        reservationBackdrop.classList.remove('d-none');
        document.body.style.overflow = 'hidden';
    });

    closeReservationBtn.addEventListener('click', () => {
        reservationBackdrop.classList.add('d-none');
        document.body.style.overflow = '';
    });

    function buildReservationMessage() {
        const name = document.getElementById('reservationName').value.trim();
        const phone = document.getElementById('reservationPhone').value.trim();
        const qty = qtyInput.value;

        return getLabel(
            `Reservation Request\nProduct: ${product.title}\nColor: ${selectedColor}\nSize: ${selectedSize}\nQuantity: ${qty}\nName: ${name}\nPhone: ${phone}`,
            `طلب حجز\nالمنتج: ${product.title}\nاللون: ${selectedColor}\nالمقاس: ${selectedSize}\nالكمية: ${qty}\nالاسم: ${name}\nالهاتف: ${phone}`
        );
    }

    document.getElementById('sendViaWhatsapp').addEventListener('click', () => {
        const name = document.getElementById('reservationName').value.trim();
        const phone = document.getElementById('reservationPhone').value.trim();
        if (!name || !phone) {
            alert(getLabel('Please enter your name and phone number', 'يرجى إدخال الاسم ورقم الهاتف'));
            return;
        }
        const message = encodeURIComponent(buildReservationMessage());
        window.open(`https://wa.me/${RESERVATION_WHATSAPP}?text=${message}`, '_blank');
    });

    document.getElementById('sendViaEmail').addEventListener('click', () => {
        const name = document.getElementById('reservationName').value.trim();
        const phone = document.getElementById('reservationPhone').value.trim();
        if (!name || !phone) {
            alert(getLabel('Please enter your name and phone number', 'يرجى إدخال الاسم ورقم الهاتف'));
            return;
        }
        const subject = encodeURIComponent(getLabel(`Reservation Request - ${product.title}`, `طلب حجز - ${product.title}`));
        const body = encodeURIComponent(buildReservationMessage());
        window.location.href = `mailto:${RESERVATION_EMAIL}?subject=${subject}&body=${body}`;
    });
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
            <div class="container-fluid overflow-hidden py-5 bg-light" style="width: 100%;">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-xl-5 order-2 order-md-1 wow fadeInLeft" data-wow-delay="0.1s">
                            <div class="bg-light h-100 rounded-2 overflow-hidden">
                                <img src="/images/about.webp" class="img-fluid about-img w-100 h-100" style="object-fit:cover;"  alt="About">
                            </div>
                        </div>
                        <div class="col-xl-7 order-1 order-md-2 wow fadeInRight" data-wow-delay="0.3s">
                            <h5 class="sub-title py-3 pb-0">${getLabel("About KADER", "عن مصنع قادر")}</h5>
                            <h1 class="display-5 mb-3">${getLabel("We're Trusted Factory Affiliated with AOI", "نحن مصنع موثوق به")}</h1>
                            <p class="mb-4">
                                ${getLabel(aboutContent.paragraphs[0].en, aboutContent.paragraphs[0].ar)}
                                <br/>
                                <br/>
                                <a class="btn btn-link ps-0 pt-0 pb-0" href="/#about" data-discover="true" ;">
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
        <div class="container-fluid service overflow-hidden py-5 bg-light">
        <div class="section-title container px-0 mb-0">
            <h5 class="sub-title ">${getLabel("Our Categories", "الأقسام")}</h5>
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
        992: { slidesPerView: 6, grid: { rows: 2 } },
        1200: { slidesPerView: 6, grid: { rows: 2 } },
      },
    });
  }

  // Initialize Products Section

  // Products Section state
  let activeProductCategory = "all";

  const productSection = document.getElementById("productSection");
  if (productSection) {
    productSection.innerHTML = `
        <div class="container-fluid products overflow-hidden bg-light">
            <div class="container py-5 pb-3 border-top border-bottom border-black-25">
                <div class="section-title text-center d-flex align-items-center justify-content-between">
                    <h5 class="sub-title">${getLabel("Our Products", "المنتجات")}</h5>
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
                        <a class="btn btn-link border-secondary rounded-0" href="#" onclick="setCurrentPage('products')">
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
                    <div class="product-img-wrap bg-light">
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
                            <a href="#" class="btn btn-link small ps-0" onclick="setCurrentPage('news', '${item.id}')">
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
        <div class="container-fluid overflow-hidden bg-light">
            <div class="container border-bottom">

                <div class="d-flex align-items-center justify-content-start py-4">
                    <div class="section-title mb-0">
                        <h5 class="sub-title mb-0 pe-3 pb-0">${getLabel("Latest News", "الأخبار")}</h5>
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
                    <a class="btn btn-link " href="#" onclick="setCurrentPage('news')">
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
    <div class="container overflow-hidden rounded-1 p-5 position-relative" id="projectsBgWrapper">

        <!-- Background image layer -->
        <div class="projects-bg-image" id="projectsBgImage" style="background-image: url('${projects[0].img}');"></div>

        <!-- Dark overlay for readability -->
        <div class="projects-bg-overlay"></div>

        <!-- Content -->
        <div class="container projects-container position-relative py-5">
            <h5 class="sub-title pb-5">${getLabel("Machinery", "الآلات")}</h5>

            <div class="row g-5 align-items-stretch flex-column-reverse flex-lg-row">

                <div class="col-lg-4 d-flex">
                    <div class="d-flex flex-column justify-content-center h-100 w-100">
                        <div class="section-title text-start flex-grow-1">
                            <h1 class="display-5 text-white" id="activeProjectTitle">${getLabel(projects[0].titleEn, projects[0].titleAr)}</h1>
                            <p class="text-white-50 mb-0" id="activeProjectDesc">${getLabel(projects[0].descEn, projects[0].descAr)}</p>
                        </div>
                        <div>
                            <a href="#" class="btn btn-link text-primary border-secondary rounded-0 ps-0 py-0 mb-4" id="activeProjectLink" onclick="setCurrentPage('projects', '${projects[0].id}')">
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
                <div class="container py-5 d-flex flex-wrap align-items-start gap-4 flex-lg-nowrap  border-bottom border-black-25">
    
                    <!-- Header -->
                    <div class="section-title text-center mb-5 trust-header-block">
                        <h5 class="sub-title pb-0">${getLabel("TRUSTED BY", "موثوق به من قبل")}</h5>
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
            <div class="container-fluid overflow-hidden py-5 bg-light">
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
        <div class="container-fluid bg-light">
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

  setCurrentPage("single-product");
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
