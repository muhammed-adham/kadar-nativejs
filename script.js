/* ============================================================
   GLOBAL STATE & CONFIGURATION
   ============================================================ */
const appState = {
  currentPage: "home",
  direction: localStorage.getItem("direction") || "ltr",
  language: localStorage.getItem("language") || "en",
  theme: localStorage.getItem("theme") || "light",
  currentSlide: 0,
  selectedCategory: "",
  selectedSubcategory: "",
  currentProductId: "",
  user: null, // set by initializeAuth() from localStorage — see AUTH SYSTEM
};

/* ============================================================================
   TABLE OF CONTENTS
   ============================================================================
   1.  MAIN APP DATA            — nav/slider/projects/clients/news/video data,
                                   about-us/social/share/policy content,
                                   products.json & categories.json loaders
   2.  UTILITY FUNCTIONS         — getLabel, getDirectionClass, theme, language
   3.  AUTH SYSTEM               — demo login/logout, roles (customer/admin)
   4.  CART SYSTEM               — add/remove/update/clear, badge count
   5.  MEGA MENU COLUMNS         — builds the Products nav dropdown from data
   6.  MAIN NAV                  — desktop nav, search, delegated nav events
   7.  MOBILE NAV                — top bar, slide-in menu, mega menu overlay
   8.  SLIDER & FOOTER           — home banner slider, site footer, breadcrumb
   9.  ROUTER                    — setCurrentPage(), loadPageContent()
   10. ABOUT PAGE
   11. PRODUCTS PAGE             — filters, grid, pagination
   12. MACHINERY / NEWS / VIDEOS / CONTACT PAGES
   13. REGISTER / LOGIN PAGES
   14. SINGLE PRODUCT PAGE       — gallery, variants, policies, reservation
   15. CART PAGE                 — editable review step: qty stepper, remove
   16. PROFILE PAGE              — account info + order history, role-aware
   17. CMS: CONTENT MANAGEMENT   — generic table+form engine for Products/
                                   Banner/News/Videos/Machinery (Admin only)
   18. ADMIN DASHBOARD           — overview KPIs/charts + orders table, plus
                                   the CMS section tabs above, role-gated
   19. CHECKOUT PAGE             — forms, payment methods, order submission
   20. HOME PAGE SECTIONS        — about/categories/products/news/trusted/etc.
   21. APP INIT & GLOBAL EVENTS  — initializeApp(), setupEventListeners()
   ============================================================================ */

/* ===============================================================================
  MAIN APP DATA
  =============================================================================== */

/* ============================================================
   CONTACT PLACEHOLDERS
   ============================================================ */
const RESERVATION_WHATSAPP = "201556336160";
const RESERVATION_EMAIL = "kaderfactory38@gmail.com";

/* ============================================================
   NAVIGATION LINKS
   ============================================================
   The Products entry's megaMenu is EMPTY here on purpose.
   It gets filled at runtime by buildProductsMegaMenuColumns()
   in initializeApp(), after categories.json has loaded.

   Do NOT put a hardcoded megaMenu array here — that's what caused
   the duplicate categories and the missing prefilter.
   ============================================================ */

const navigationLinks = [
  { id: "home", label_en: "Home", label_ar: "الصفحة الرئيسية", path: "#home" },

  { id: "about", label_en: "About", label_ar: "عن المصنع", path: "#about" },

  {
    id: "products",
    label_en: "Products",
    label_ar: "المنتجات",
    path: "#products",
    megaMenu: [], // filled in initializeApp() — see note above
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

  {
    id: "military",
    label_en: "Military",
    label_ar: "عسكري",
    path: "#products",
    categoryId: "military",
    restricted: true,
  },
];

/* ============================================================
   BANNER DATA (home page slider) — managed via the Admin Dashboard
   Home Banner tab. `let` (not const): CMS add/edit/delete reassigns
   this array; see CMS_TYPES.banner.
   ============================================================ */
let bannerSlides = [
  {
    id: "slide-0",
    titleEn: "",
    titleAr: "",
    subTitleEn: "",
    subTitleAr: "",
    textEn: "",
    textAr: "",
    url: "/images/b-0.webp",
    cta: "",
    path: "",
  },
  {
    id: "slide-1",
    titleEn: "Technology Centers",
    titleAr: "مراكز التكنولوجيا",
    subTitleEn: "Diverse Industries, Unified Excellence",
    subTitleAr: "صناعات متنوعة، تميز موحد",
    textEn:
      "Explore our state-of-the-art technology centers, equipped with cutting-edge tools and innovations.",
    textAr:
      "اكتشف مراكز التكنولوجيا الحديثة لدينا والمجهزة بأحدث الأدوات والابتكارات.",
    url: "/images/cat-9.webp",
    cta: "",
    path: "/",
  },
  {
    id: "slide-2",
    titleEn: "Electronic Motorbikes",
    titleAr: "المركبات الإلكترونية",
    subTitleEn: "Diverse Industries, Unified Excellence",
    subTitleAr: "صناعات متنوعة، تميز موحد",
    textEn: "Discover our range of eco-friendly electronic motorbikes.",
    textAr: "اكتشف مجموعة المركبات الإلكترونية الصديقة للبيئة.",
    url: "/images/b-1.webp",
    cta: "",
    path: "/",
  },
  {
    id: "slide-3",
    titleEn: "Office Furniture",
    titleAr: "أثاث مكتبي",
    subTitleEn: "Diverse Industries, Unified Excellence",
    subTitleAr: "صناعات متنوعة، تميز موحد",
    textEn:
      "Transform your living spaces with our premium home furniture collection.",
    textAr: "حوّل مساحات معيشتك مع مجموعة أثاث المنزل الفاخرة لدينا.",
    url: "/images/b-3.webp",
    cta: "",
    path: "/",
  },
  {
    id: "slide-4",
    titleEn: "National Bank of Egypt",
    titleAr: "مبادرة البنك الأهلي المصري",
    subTitleEn: "Furnish Your Home, Your Way",
    subTitleAr: "صناعات متنوعة، تميز موحد",
    textEn:
      "Get everything you need for your home with instant financing and hassle-free procedures from NBE.",
    textAr: "حوّل مساحات معيشتك مع مجموعة أثاث المنزل الفاخرة لدينا.",
    url: "/images/b-2.webp",
    cta: "",
    path: "/",
  },
];

/* ============================================================
   PROJECTS DATA (machinery rental)
   ============================================================ */
let projects = [
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

/* ============================================================
   NEWS DATA — shared by the homepage News section and the full
   News page. Sorted newest-first wherever it's rendered.
   ============================================================ */
let newsItems = [
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
    excerptAr: "نص تجريبي عربي يوضح تفاصيل الخبر الأول مع شرح موجز عن الموضوع.",
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

/* ============================================================
   VIDEO DATA — same placeholder embed reused across entries
   until real footage exists; swap `youtubeId` per item.
   ============================================================ */
const VIDEO_CATEGORIES = [
  { key: "facility", en: "Facility Tour", ar: "جولة المصنع" },
  { key: "product", en: "Product Demos", ar: "عروض المنتجات" },
  { key: "corporate", en: "Corporate", ar: "الشركة" },
  { key: "event", en: "Events", ar: "الفعاليات" },
];

let videoItems = [
  {
    id: "v1",
    titleEn: "Inside Kader Factory",
    titleAr: "داخل مصنع قادر",
    category: "facility",
    youtubeId: "dY3t90L_q3Q",
  },
  {
    id: "v2",
    titleEn: "CNC Machining Line Tour",
    titleAr: "جولة في خط تشغيل CNC",
    category: "facility",
    youtubeId: "dY3t90L_q3Q",
  },
  {
    id: "v3",
    titleEn: "Electric Scooter Assembly",
    titleAr: "تجميع السكوتر الكهربائي",
    category: "product",
    youtubeId: "dY3t90L_q3Q",
  },
  {
    id: "v4",
    titleEn: "Furniture Manufacturing Process",
    titleAr: "عملية تصنيع الأثاث",
    category: "product",
    youtubeId: "dY3t90L_q3Q",
  },
  {
    id: "v5",
    titleEn: "Message from Management",
    titleAr: "كلمة الإدارة",
    category: "corporate",
    youtubeId: "dY3t90L_q3Q",
  },
  {
    id: "v6",
    titleEn: "70 Years of Industry",
    titleAr: "70 عاماً من الصناعة",
    category: "corporate",
    youtubeId: "dY3t90L_q3Q",
  },
  {
    id: "v7",
    titleEn: "Regional Expo Highlights",
    titleAr: "أبرز لحظات المعرض الإقليمي",
    category: "event",
    youtubeId: "dY3t90L_q3Q",
  },
  {
    id: "v8",
    titleEn: "Safety Certification Ceremony",
    titleAr: "حفل اعتماد شهادة السلامة",
    category: "event",
    youtubeId: "dY3t90L_q3Q",
  },
];

/* ============================================================
   CLIENTS DATA
   ============================================================ */
const clients = [
  { name: "Client 1", logo: "/images/prt-1.webp" },
  { name: "Client 2", logo: "/images/prt-2.webp" },
  { name: "Client 3", logo: "/images/prt-3.webp" },
  { name: "Client 4", logo: "/images/prt-4.webp" },
  { name: "Client 5", logo: "/images/prt-5.webp" },
  { name: "Client 6", logo: "/images/prt-6.webp" },
  { name: "Client 7", logo: "/images/prt-7.webp" },
];

/* ============================================================
   ABOUT US DATA
   ============================================================ */
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

/* ============================================================
   SOCIAL LINKS
   ============================================================ */
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

/* ============================================================
   SHARE LINKS
   ============================================================ */
const shareLinks = [
  {
    id: "facebook",
    label: "Share on Facebook",
    icon: "fab fa-facebook-f",
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
  },
  {
    id: "messenger",
    label: "Share on Messenger",
    icon: "fab fa-facebook-messenger",
    url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=YOUR_APP_ID`,
  },
  {
    id: "whatsapp",
    label: "Share on WhatsApp",
    icon: "fab fa-whatsapp",
    url: `https://wa.me/?text=${encodeURIComponent(document.title + " " + window.location.href)}`,
  },
  {
    id: "copylink",
    label: "Copy link",
    icon: "fas fa-link",
    copy: true,
  },
];

/* ============================================================
   POLICY TABS DATA (short version — return / warranty / delivery)
   ============================================================ */
const policyTabsContent = {
  // Return
  returnPolicy: {
    tabLabel: { en: "Return Policy", ar: "سياسة الإرجاع" },
    icon: "fas fa-undo",
    intro: {
      en: "We offer a flexible return policy so you can shop with confidence.",
      ar: "نوفر سياسة إرجاع مرنة لتتسوق بثقة تامة.",
    },
    points: [
      {
        en: "Return within 14 days of purchase, unused and in original packaging with all accessories.",
        ar: "الإرجاع خلال 14 يوماً من تاريخ الشراء، بشرط أن يكون غير مستخدم وفي عبوته الأصلية مع جميع الملحقات.",
      },
      {
        en: "For verified manufacturing defects, returns are accepted within 30 days with a technical report.",
        ar: "في حالة وجود عيب تصنيع مؤكد، يمكن الإرجاع خلال 30 يوماً بموجب تقرير فني.",
      },
      {
        en: "Refunds processed within 5–10 business days after inspection.",
        ar: "يتم رد المبلغ خلال 5 إلى 10 أيام عمل بعد الفحص.",
      },
      {
        en: "Shipping fees are non-refundable.",
        ar: "رسوم الشحن غير قابلة للاسترداد.",
      },
    ],
    linkLabel: {
      en: "See Full Return Policy",
      ar: "عرض سياسة الإرجاع كاملة",
    },
    linkPage: "return-policy",
  },

  // Warranty
  warranty: {
    tabLabel: { en: "Warranty", ar: "الضمان" },
    icon: "fas fa-shield-alt",
    intro: {
      en: "Every product is backed by a manufacturer warranty for your peace of mind.",
      ar: "كل منتج مدعوم بضمان الشركة المصنعة لراحة بالك.",
    },
    points: [
      {
        en: "Warranty period is as specified on your product's warranty certificate or invoice.",
        ar: "مدة الضمان كما هي محددة في شهادة الضمان أو فاتورة الشراء الخاصة بمنتجك.",
      },
      {
        en: "Covers manufacturing defects — free repair or replacement of defective parts, no charge for parts or labor.",
        ar: "يغطي عيوب التصنيع — إصلاح أو استبدال القطع المعيبة مجاناً دون أي رسوم على القطع أو العمالة.",
      },
    ],
    linkLabel: { en: "See Full Warranty Terms", ar: "عرض شروط الضمان كاملة" },
    linkPage: "warranty-policy",
  },

  // Delivery
  delivery: {
    tabLabel: { en: "Delivery", ar: "التوصيل" },
    icon: "fas fa-truck",
    intro: {
      en: "Once your payment is confirmed, our team will coordinate delivery details with you directly.",
      ar: "بمجرد تأكيد الدفع سيتواصل فريقنا معك لتنسيق تفاصيل التوصيل.",
    },
    points: [
      {
        en: "Delivery available across Egypt; timeframe depends on your location.",
        ar: "التوصيل متاح في جميع أنحاء مصر، وتختلف المدة حسب المنطقة.",
      },
      {
        en: "Some orders may take longer than the estimated timeframe due to demand or availability.",
        ar: "قد تستغرق بعض الطلبات وقتًا أطول من المدة المتوقعة حسب الطلب أو التوفر.",
      },
      {
        en: "Delivery fees vary depending on your location and will be confirmed with your order.",
        ar: "تختلف رسوم التوصيل حسب موقعك، وسيتم تأكيدها مع طلبك.",
      },
      {
        en: "Our team will reach out shortly to confirm your exact delivery date, address, and fees.",
        ar: "سيتواصل معك فريقنا قريبًا لتأكيد موعد التوصيل والعنوان والرسوم بدقة.",
      },
    ],
    linkLabel: null, // no dedicated page for delivery
    linkPage: null,
  },
};

/* ============================================================
   PRODUCT DATA (loaded from /data/products.json)
   ============================================================ */
let productsData = [];

async function loadProductsData() {
  try {
    const response = await fetch("/data/products.json");
    const data = await response.json();
    productsData = data.products;
  } catch (e) {
    console.error("Failed to load products.json", e);
    productsData = [];
  }
}

/* ============================================================
   CATEGORY DATA (loaded from /data/categories.json)
   ============================================================ */
let categoriesData = [];

async function loadCategoriesData() {
  try {
    const response = await fetch("/data/categories.json");
    const data = await response.json();
    categoriesData = data.categories;
  } catch (e) {
    console.error("Failed to load categories.json", e);
    categoriesData = [];
  }
}
/* ================================================================================
  MAIN APP DATA END
  ================================================================================ */

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

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

/* ============================================================
   AUTH SYSTEM
   ============================================================
   DEMO ONLY — there is no real backend, so nothing here is secure:
   passwords are never checked. Logging in with the email below
   grants the "admin" role so the Admin Dashboard can be reached;
   any other email/registration gets the "customer" role.
   Swap this for a real API call + session cookie/JWT in production.
   ============================================================ */
const DEMO_ADMIN_EMAIL = "admin@kader-factory.com";

// Load the saved session (if any) on app start
function initializeAuth() {
  try {
    const saved = localStorage.getItem("user");
    appState.user = saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Failed to load user session", e);
    appState.user = null;
  }
}

// Persist + apply a session, then refresh the nav so it reflects the new role
function loginUser(user) {
  appState.user = user;
  localStorage.setItem("user", JSON.stringify(user));
  initializeNavigation();
}

function logout() {
  appState.user = null;
  localStorage.removeItem("user");
  initializeNavigation();
  setCurrentPage("home");
}

/* ============================================================
   MILITARY ACCESS GATE (OTP)
   ============================================================ */
const MILITARY_OTP_STORAGE_KEY = "militaryOtpCodes";
const MILITARY_ACCESS_STORAGE_KEY = "militaryAccessGrant";
const MILITARY_ATTEMPTS_STORAGE_KEY = "militaryOtpAttempts";
const MILITARY_OTP_TTL_MINUTES = 15;
const MILITARY_ACCESS_TTL_HOURS = 24;
const MILITARY_MAX_ATTEMPTS = 5;
const MILITARY_LOCKOUT_MINUTES = 15;

function getMilitaryOtpCodes() {
  try {
    return JSON.parse(localStorage.getItem(MILITARY_OTP_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveMilitaryOtpCodes(codes) {
  localStorage.setItem(MILITARY_OTP_STORAGE_KEY, JSON.stringify(codes));
}

function militaryOtpStatus(record) {
  if (record.revoked) return "revoked";
  if (record.used) return "used";
  if (record.expiresAt < Date.now()) return "expired";
  return "active";
}

// Admin: issue a new code for a specific recipient. Returns the plain
// code once — relay it out-of-band (phone/email/in person). It is not
// recoverable from here after the admin navigates away from the notice.
function generateMilitaryOtpCode(recipientName, recipientContact) {
  const now = Date.now();
  const record = {
    id: `motp_${now}_${Math.floor(Math.random() * 1000)}`,
    code: String(Math.floor(100000 + Math.random() * 900000)),
    recipientName,
    recipientContact,
    issuedBy: appState.user ? appState.user.email : "",
    createdAt: now,
    expiresAt: now + MILITARY_OTP_TTL_MINUTES * 60 * 1000,
    used: false,
    usedAt: null,
    revoked: false,
  };
  const codes = getMilitaryOtpCodes();
  codes.push(record);
  saveMilitaryOtpCodes(codes);
  return record;
}

// Admin: invalidate a code before it's used or expires
function revokeMilitaryOtpCode(id) {
  const codes = getMilitaryOtpCodes().map((c) =>
    c.id === id ? { ...c, revoked: true } : c,
  );
  saveMilitaryOtpCodes(codes);
}

function getMilitaryLockout() {
  try {
    return (
      JSON.parse(localStorage.getItem(MILITARY_ATTEMPTS_STORAGE_KEY)) || {
        count: 0,
        lockedUntil: 0,
      }
    );
  } catch (e) {
    return { count: 0, lockedUntil: 0 };
  }
}

function setMilitaryLockout(state) {
  localStorage.setItem(MILITARY_ATTEMPTS_STORAGE_KEY, JSON.stringify(state));
}

// Customer: submit a code from the military-access gate page.
// Returns { ok: true } on success, or { ok: false, reason } where
// reason is "locked" | "invalid".
function verifyMilitaryOtpCode(inputCode) {
  const lockout = getMilitaryLockout();
  if (lockout.lockedUntil && lockout.lockedUntil > Date.now()) {
    return { ok: false, reason: "locked" };
  }

  const codes = getMilitaryOtpCodes();
  const match = codes.find(
    (c) => c.code === inputCode && militaryOtpStatus(c) === "active",
  );

  if (!match) {
    const attempts = (lockout.count || 0) + 1;
    if (attempts >= MILITARY_MAX_ATTEMPTS) {
      setMilitaryLockout({
        count: 0,
        lockedUntil: Date.now() + MILITARY_LOCKOUT_MINUTES * 60 * 1000,
      });
    } else {
      setMilitaryLockout({ count: attempts, lockedUntil: 0 });
    }
    return { ok: false, reason: "invalid" };
  }

  match.used = true;
  match.usedAt = Date.now();
  saveMilitaryOtpCodes(codes);
  setMilitaryLockout({ count: 0, lockedUntil: 0 });
  grantMilitaryAccess();
  return { ok: true };
}

function grantMilitaryAccess() {
  localStorage.setItem(
    MILITARY_ACCESS_STORAGE_KEY,
    JSON.stringify({
      grantedAt: Date.now(),
      expiresAt: Date.now() + MILITARY_ACCESS_TTL_HOURS * 60 * 60 * 1000,
    }),
  );
}

function hasMilitaryAccess() {
  try {
    const grant = JSON.parse(localStorage.getItem(MILITARY_ACCESS_STORAGE_KEY));
    return !!grant && grant.expiresAt > Date.now();
  } catch (e) {
    return false;
  }
}

// Redirect to the OTP gate if the military catalog hasn't been
// unlocked on this device yet. Called from every entry point into
// the "military" category (goToProductsWithFilter via loadProductsPage,
// and the on-page category filter).
function requireMilitaryAccess() {
  if (hasMilitaryAccess()) return true;
  setCurrentPage("military-access");
  return false;
}

/* ============================================================
   CART SYSTEM
   ============================================================
   Fixes:
     1. addToCart used productsData.ar / productsData.en — the OLD split
        schema. productsData is a unified array now, so productsData.en
        was undefined and .find() threw, silently killing the click.
     2. Cart stored a single-language title string, so switching language
        left old cart items stuck in the previous language. Now stores the
        full {en,ar} object and resolves via getLabel() at render time.
     3. updateCartCount only updated the desktop badge — mobile badge
        (#mobileCartCount) never changed.
     4. Cart items now also store subCategoryId/categoryId so a cart page
        can link back or group items without re-looking-up products.
   ============================================================ */

// Initialize cart from localStorage on app load (call inside initializeApp())
function initializeCart() {
  try {
    const savedCart = localStorage.getItem("cart");
    appState.cart = savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error("Failed to load cart from storage", e);
    appState.cart = [];
  }
  updateCartCount();
}

// Save current cart state to localStorage
function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(appState.cart));
  } catch (e) {
    console.error("Failed to save cart to storage", e);
  }
}

/**
 * Add a product to the cart
 * @param {string} productId - product id (string slug, e.g. "trio-max-scooter")
 * @param {number} qty - quantity to add
 * @param {object} options - selected variant info, e.g. { color, size }
 */
function addToCart(productId, qty = 1, options = {}) {
  if (!appState.cart) appState.cart = [];

  // productsData is a UNIFIED array — no .en / .ar split
  const product = productsData.find((p) => p.id === productId);
  if (!product) {
    console.error("addToCart: product not found", productId);
    return;
  }

  const color = options.color || null;
  const size = options.size || null;

  // Same product + same variant → bump quantity instead of duplicating
  const existingItem = appState.cart.find(
    (item) =>
      item.productId === productId &&
      item.color === color &&
      item.size === size,
  );

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    appState.cart.push({
      productId: product.id,
      title: product.title, // full {en, ar} — resolve with getLabel() when rendering
      img: product.url,
      price: product.price || 0,
      categoryId: product.categoryId,
      subCategoryId: product.subCategoryId,
      color: color,
      size: size,
      qty: qty,
    });
  }

  saveCart();
  updateCartCount();
}

// Remove an item from the cart entirely
function removeFromCart(productId, color = null, size = null) {
  if (!appState.cart) return;
  appState.cart = appState.cart.filter(
    (item) =>
      !(
        item.productId === productId &&
        item.color === color &&
        item.size === size
      ),
  );
  saveCart();
  updateCartCount();
}

// Update quantity of an existing cart item
function updateCartItemQty(productId, color, size, newQty) {
  if (!appState.cart) return;
  const item = appState.cart.find(
    (i) => i.productId === productId && i.color === color && i.size === size,
  );
  if (!item) return;

  if (newQty <= 0) {
    removeFromCart(productId, color, size);
    return;
  }

  item.qty = newQty;
  saveCart();
  updateCartCount();
}

// Empty the cart
function clearCart() {
  appState.cart = [];
  saveCart();
  updateCartCount();
}

// Total number of items (sum of quantities)
function getCartCount() {
  if (!appState.cart) return 0;
  return appState.cart.reduce((sum, item) => sum + item.qty, 0);
}

// Total price of all items
function getCartTotal() {
  if (!appState.cart) return 0;
  return appState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Update BOTH cart badges (desktop nav + mobile menu)
function updateCartCount() {
  const count = getCartCount();

  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = count;

  const mobileCartCountEl = document.getElementById("mobileCartCount");
  if (mobileCartCountEl) mobileCartCountEl.textContent = count;
}

let navigationEventsBound = false;

/* ============================================================
   MEGA MENU COLUMN DEFINITIONS
   ============================================================ */
const MEGA_MENU_COLUMNS = [
  {
    title_en: "Civilian Products",
    title_ar: "المنتجات المدنية",
    categoryIds: ["electric-transport", "plastic"],
  },
  {
    title_en: "Furniture",
    title_ar: "الأثاث",
    categoryIds: ["home-furniture", "office-furniture", "furnish-home"],
  },
  {
    title_en: "Corporate",
    title_ar: "منتجات الشركات",
    categoryIds: [
      "cash-transfer",
      "vehicle-conversions",
      "firefighting",
      "ambulance",
    ],
  },
  {
    title_en: "Heavy & Agricultural",
    title_ar: "الثقيلة والزراعية",
    categoryIds: ["agricultural-tractor", "axle-flatbed-semi-trailer"],
  },
];

function buildProductsMegaMenuColumns() {
  if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
    console.warn(
      "buildProductsMegaMenuColumns: categoriesData is empty — call this AFTER loadCategoriesData()",
    );
    return [];
  }

  /* --- Guard 1: no category may appear in more than one column --- */
  const seen = new Set();
  const duplicates = new Set();
  MEGA_MENU_COLUMNS.forEach((col) => {
    col.categoryIds.forEach((id) => {
      if (seen.has(id)) duplicates.add(id);
      seen.add(id);
    });
  });
  if (duplicates.size > 0) {
    console.warn(
      "MEGA_MENU_COLUMNS: these categoryIds appear in multiple columns —",
      [...duplicates].join(", "),
    );
  }

  /* --- Guard 2: flag IDs that don't exist in categories.json (typos) --- */
  const realIds = new Set(categoriesData.map((c) => c.categoryId));
  const unknown = [...seen].filter((id) => !realIds.has(id));
  if (unknown.length > 0) {
    console.warn(
      "MEGA_MENU_COLUMNS: these categoryIds don't exist in categories.json —",
      unknown.join(", "),
    );
  }

  /* --- Guard 3: flag real categories missing from every column ---
     "military" is deliberately excluded — it has its own top-level nav
     link (see navigationLinks) instead of living in the mega menu. */
  const missing = [...realIds].filter(
    (id) => !seen.has(id) && id !== "military",
  );
  if (missing.length > 0) {
    console.warn(
      "MEGA_MENU_COLUMNS: these categories aren't in any column —",
      missing.join(", "),
    );
  }

  /* --- Build columns; claimed set enforces first-column-wins on any dupe --- */
  const claimed = new Set();

  const columns = MEGA_MENU_COLUMNS.map((column) => ({
    title_en: column.title_en,
    title_ar: column.title_ar,
    items: categoriesData
      .filter((cat) => {
        if (!column.categoryIds.includes(cat.categoryId)) return false;
        if (claimed.has(cat.categoryId)) return false; // already shown in an earlier column
        claimed.add(cat.categoryId);
        return true;
      })
      .sort(
        (a, b) =>
          column.categoryIds.indexOf(a.categoryId) -
          column.categoryIds.indexOf(b.categoryId),
      )
      .map((cat) => ({
        label_en: cat.name.en,
        label_ar: cat.name.ar,
        path: "#products",
        categoryId: cat.categoryId,
        subCategoryId: null,
      })),
  }));

  columns.push({
    title_en: "All",
    title_ar: "الكل",
    items: [
      {
        label_en: "View All Products",
        label_ar: "جميع المنتجات",
        path: "#products",
        categoryId: null,
        subCategoryId: null,
      },
    ],
  });

  return columns;
}

/* ============================================================
   MAIN NAV
   ============================================================ */
function initializeNavigation() {
  const navContainer = document.querySelector(".navbar-nav");
  if (!navContainer) return;

  navContainer.innerHTML = "";

  navigationLinks.forEach((link) => {
    const isMegaMenu = link.megaMenu && link.megaMenu.length > 0;

    if (isMegaMenu) {
      navContainer.innerHTML += `
        <div class="nav-item dropdown position-static text-center">
            <a class="nav-link py-4 text-white" href="${link.path}" data-bs-toggle="dropdown">
                <span class="dropdown-toggle">
                    ${getLabel(link.label_en, link.label_ar)}
                </span>
            </a>
            <div class="dropdown-menu mega-menu p-4">
                <div class="container d-lg-flex justify-content-lg-evenly align-items-lg-start ">
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
                                <a class="dropdown-item ${item.categoryId === "military" ? "dropdown-item-restricted" : ""}"
                                   href="${item.path}"
                                   data-nav-page-id="products"
                                   ${item.categoryId ? `data-category-id="${item.categoryId}"` : ""}
                                   ${item.subCategoryId ? `data-sub-category-id="${item.subCategoryId}"` : ""}>
                                    ${getLabel(item.label_en, item.label_ar)}
                                    ${item.categoryId === "military" ? '<i class="fas fa-lock ms-2 small text-danger"></i>' : ""}
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
    } else {
      navContainer.innerHTML += `
        <a class="nav-item nav-link py-4 text-white"
           href="${link.path}"
           data-nav-page-id="${link.id}"
           ${link.categoryId ? `data-category-id="${link.categoryId}"` : ""}
           id="nav-${link.id}">
            ${getLabel(link.label_en, link.label_ar)}
            ${
              link.restricted
                ? `<i class="fa-solid fa-fingerprint" 
   data-bs-toggle="popover" 
   data-bs-trigger="hover"
   data-bs-html="true"
   title="RESTRICTED ACCESS" 
   data-bs-content="<strong> AUTHORIZED PERSONNEL ONLY</strong> <br> Military & defense equipment is available to verified government and corporate buyers only.">
</i>`
                : ""
            }
        </a>
      `;
    }
  });

  /* ---- Initialize Bootstrap popovers for restricted links ---- */
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]',
  );
  [...popoverTriggerList].forEach((el) => new bootstrap.Popover(el));

  const topRightControls = document.getElementById("topRightControls");
  if (topRightControls) topRightControls.innerHTML = "";

  /* ---- Desktop search ---- */
  const searchInput = document.getElementById("searchInput");
  const searchDropdown = document.getElementById("searchDropdown");

  if (searchInput && searchDropdown) {
    searchInput.addEventListener("input", function () {
      const query = this.value.trim();

      if (query.length === 0) {
        searchDropdown.classList.add("d-none");
        searchDropdown.innerHTML = "";
        return;
      }

      const results = getSearchSuggestions(query);

      searchDropdown.innerHTML =
        results.length === 0
          ? `<div class="list-group-item text-muted">${getLabel("No results found", "لا توجد نتائج")}</div>`
          : results
              .map(
                (item) => `
                <a href="#" class="list-group-item list-group-item-action" data-search-product-id="${item.id}">
                    ${item.label}
                </a>`,
              )
              .join("");

      searchDropdown.classList.remove("d-none");
    });
  }

  /* ---- Theme ---- */
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            ${getLabel("Theme", "الوضع")}
        </a>
        <div class="dropdown-menu">
           <input type="radio" id="dark-theme" name="fav_language" value="dark">
            <label for="dark-theme">Light</label><br>
            <a class="dropdown-item" href="#" data-action="toggle-theme">
                ${appState.theme === "dark" ? getLabel("Light", "الوضع الفاتح") : getLabel("Dark", "الوضع الداكن")}
            </a>
        </div>
    </div>
  `;

  /* ---- Language ---- */
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            ${appState.language === "ar" ? "ع" : "EN"}
        </a>
        <div class="dropdown-menu ${appState.language === "ar" ? "text-start" : "text-end"}">
            <a class="dropdown-item" href="#" data-action="toggle-language">
                ${appState.language === "ar" ? "English" : "العربية"}
            </a>
        </div>
    </div>
  `;

  /* ---- Account ---- */
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
            <i class="fas fa-user mx-1"></i>
            ${appState.user ? appState.user.name : getLabel("Account", "الحساب")}
        </a>
        <div class="dropdown-menu">
            ${
              appState.user
                ? `
                <a class="dropdown-item" href="#" data-nav-page-id="profile">${getLabel("My Profile", "ملفي الشخصي")}</a>
                <a class="dropdown-item" href="#" onclick="goToProfileTab('orders')">${getLabel("My Orders", "طلباتي")}</a>
                ${
                  appState.user.role === "admin"
                    ? `<a class="dropdown-item" href="#" data-nav-page-id="admin">${getLabel("Admin Dashboard", "لوحة التحكم")}</a>`
                    : ""
                }
                <a class="dropdown-item" href="#" data-action="logout">${getLabel("Logout", "تسجيل الخروج")}</a>
            `
                : `
                <a class="dropdown-item" href="#" data-nav-page-id="login">${getLabel("Login", "تسجيل الدخول")}</a>
                <a class="dropdown-item" href="#" data-nav-page-id="register">${getLabel("Register", "تسجيل جديد")}</a>
            `
            }
        </div>
    </div>
  `;

  /* ---- Cart ---- */
  topRightControls.innerHTML += `
    <a class="nav-link border-${getDirectionClass("start", "end")} p${getDirectionClass("s", "e")}-3" href="#" data-nav-page-id="cart" id="cartBtn">
        <span class="position-relative d-inline-block">
            <i class="bi bi-bag-fill fs-3"></i>
            <span class="badge rounded-circle cart-count-badge" id="cartCount">
                ${typeof getCartCount === "function" ? getCartCount() : 0}
            </span>
        </span>
    </a>
  `;

  bindNavigationEvents();
  initializeMobileTopBar();
  initializeMobileMenu();
}

/* ============================================================
   SEARCH — reads real productsData + title:{en,ar}
   (was reading appState.products / p.name, which don't exist)
   ============================================================ */
function getSearchSuggestions(query) {
  const all =
    typeof productsData !== "undefined" && Array.isArray(productsData)
      ? productsData
      : [];
  const q = query.toLowerCase();

  return all
    .filter((p) => getLabel(p.title.en, p.title.ar).toLowerCase().includes(q))
    .slice(0, 8)
    .map((p) => ({ id: p.id, label: getLabel(p.title.en, p.title.ar) }));
}

/* ============================================================
   DELEGATED EVENTS — bound once, survives every innerHTML rebuild
   ============================================================ */
function bindNavigationEvents() {
  if (navigationEventsBound) return;
  navigationEventsBound = true;

  document.addEventListener("click", (e) => {
    const searchWrapper = document.getElementById("searchWrapper");
    const searchDropdown = document.getElementById("searchDropdown");

    /* Close desktop search dropdown when clicking outside it */
    if (searchWrapper && searchDropdown && !searchWrapper.contains(e.target)) {
      searchDropdown.classList.add("d-none");
    }

    /* Close the desktop mega menu on any click inside it.
       It's shown via CSS :hover (not Bootstrap's JS toggle), so without
       this it stays open after navigating — the mouse hasn't moved. */
    const megaMenuPanel = e.target.closest(".dropdown > .mega-menu");
    if (megaMenuPanel) {
      const dropdown = megaMenuPanel.closest(".dropdown");
      dropdown.classList.add("mega-closed");
      dropdown.addEventListener(
        "mouseleave",
        () => dropdown.classList.remove("mega-closed"),
        { once: true },
      );
    }

    /* Search result → single product page */
    const searchResult = e.target.closest("[data-search-product-id]");
    if (searchResult) {
      e.preventDefault();
      setCurrentPage("single-product", searchResult.dataset.searchProductId);

      // Clear both search inputs/dropdowns — whichever one was used
      const searchInput = document.getElementById("searchInput");
      const mobileSearchInput = document.getElementById("mobileSearchInput");
      const mobileSearchDropdown = document.getElementById(
        "mobileSearchDropdown",
      );
      if (searchInput) searchInput.value = "";
      if (mobileSearchInput) mobileSearchInput.value = "";
      if (searchDropdown) {
        searchDropdown.classList.add("d-none");
        searchDropdown.innerHTML = "";
      }
      if (mobileSearchDropdown) {
        mobileSearchDropdown.classList.add("d-none");
        mobileSearchDropdown.innerHTML = "";
      }

      closeMobileMenu();
      return;
    }

    /* Mega-menu item WITH a category filter */
    const filterLink = e.target.closest("[data-category-id]");
    if (filterLink) {
      e.preventDefault();
      goToProductsWithFilter(
        filterLink.dataset.categoryId,
        filterLink.dataset.subCategoryId || null,
      );
      closeMobileMenu();
      return;
    }

    /* Plain nav link (incl. "View All Products" — no category attached) */
    const navLink = e.target.closest("[data-nav-page-id]");
    if (navLink) {
      e.preventDefault();
      setCurrentPage(navLink.dataset.navPageId);
      closeMobileMenu();
      return;
    }

    /* Theme / language / logout */
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      e.preventDefault();
      const action = actionEl.dataset.action;
      if (action === "toggle-theme" && typeof toggleTheme === "function")
        toggleTheme();
      if (action === "toggle-language" && typeof toggleLanguage === "function")
        toggleLanguage();
      if (action === "logout" && typeof logout === "function") logout();
      return;
    }
  });
}

/* ============================================================
   MOBILE TOP BAR
   ============================================================ */
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

/* ============================================================
   MOBILE MENU OVERLAY
   ============================================================ */
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

        <div class="overlay-search px-3 pt-2 pb-3" id="mobileSearchWrapper">
            <input type="text" class="form-control" id="mobileSearchInput"
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
                    </a>`;
                }
                return `
                    <a href="#" class="overlay-link" data-nav-page-id="${link.id}"
                       ${link.categoryId ? `data-category-id="${link.categoryId}"` : ""}>
                        ${getLabel(link.label_en, link.label_ar)}
                        ${link.restricted ? '<i class="fa-solid fa-fingerprint small"></i>' : ""}
                    </a>`;
              })
              .join("")}
            ${
              appState.user && appState.user.role === "admin"
                ? `<a href="#" class="overlay-link" data-nav-page-id="admin">${getLabel("Admin Dashboard", "لوحة التحكم")}</a>`
                : ""
            }
        </div>

        <div class="d-flex py-5 justify-content-center align-items-center bg-light px-3">
            <a class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 border-end h-100"
               href="#" data-nav-page-id="${appState.user ? "profile" : "register"}">
                <i class="fas fa-user"></i>
                ${appState.user ? appState.user.name : getLabel("Login / Register", "تسجيل الدخول / تسجيل جديد")}
            </a>

            <a href="#" class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 border-end h-100"
               data-action="toggle-theme">
                <i class="fas fa-${appState.theme === "dark" ? "sun" : "moon"}"></i>
                ${appState.theme === "dark" ? getLabel("Light Mode", "الوضع الفاتح") : getLabel("Dark ", " داكن")}
            </a>

            <a href="#" class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 border-end h-100"
               data-action="toggle-language">
                <i class="fas fa-globe"></i>
                ${appState.language === "ar" ? "English" : "العربية"}
            </a>

            <a class="footer-row btn btn-white col-3 d-flex align-items-center gap-1 h-100"
               href="#" data-nav-page-id="cart" id="mobileCartBtn">
                <span class="position-relative d-inline-block">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="badge bg-danger rounded-pill cart-count-badge" id="mobileCartCount">
                        ${typeof getCartCount === "function" ? getCartCount() : 0}
                    </span>
                </span>
                ${getLabel("Cart", "السلة")}
            </a>
        </div>
    </div>
  `;

  document
    .getElementById("closeMobileMenuBtn")
    .addEventListener("click", closeMobileMenu);

  /* Mega-menu triggers — stopPropagation so the delegated nav handler
     below doesn't ALSO fire and navigate away instead of opening the panel */
  mount.querySelectorAll("[data-mega-trigger]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const link = navigationLinks.find((l) => l.id === el.dataset.megaTrigger);
      if (link) openMegaMenu(link);
    });
  });

  /* Mobile search */
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const mobileSearchDropdown = document.getElementById("mobileSearchDropdown");

  if (mobileSearchInput && mobileSearchDropdown) {
    mobileSearchInput.addEventListener("input", function () {
      const query = this.value.trim();

      if (query.length === 0) {
        mobileSearchDropdown.classList.add("d-none");
        mobileSearchDropdown.innerHTML = "";
        return;
      }

      const results = getSearchSuggestions(query);

      mobileSearchDropdown.innerHTML =
        results.length === 0
          ? `<div class="list-group-item text-muted">${getLabel("No results found", "لا توجد نتائج")}</div>`
          : results
              .map(
                (item) =>
                  `<a href="#" class="list-group-item list-group-item-action" data-search-product-id="${item.id}">${item.label}</a>`,
              )
              .join("");

      mobileSearchDropdown.classList.remove("d-none");
    });
  }
}

function openMobileMenu() {
  const panel = document.getElementById("mobileMenuPanel");
  if (!panel) return;
  panel.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const panel = document.getElementById("mobileMenuPanel");
  if (!panel) return;
  panel.classList.remove("is-open");
  closeMegaMenu();
  document.body.style.overflow = "";
}

/* ============================================================
   MEGA MENU OVERLAY (mobile)
   ============================================================ */
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
                        <a href="${item.path}"
                           class="${item.categoryId === "military" ? "dropdown-item-restricted" : ""}"
                           data-nav-page-id="products"
                           ${item.categoryId ? `data-category-id="${item.categoryId}"` : ""}
                           ${item.subCategoryId ? `data-sub-category-id="${item.subCategoryId}"` : ""}>
                            ${getLabel(item.label_en, item.label_ar)}
                            ${item.categoryId === "military" ? '<i class="fas fa-lock ms-2 small text-danger"></i>' : ""}
                        </a>`,
                      )
                      .join("")}
                </div>`,
              )
              .join("")}
        </div>
    </div>
  `;

  const panel = document.getElementById("megaMenuPanel");

  // two frames so the browser registers the starting transform before the
  // class flip — otherwise there's nothing to transition from
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

/**
 * Initialize slider/carousel
 */
function initializeSlider() {
  const bannerWrapper = document.getElementById("bannerWrapper");

  if (!bannerWrapper) return;

  // Clear existing content
  bannerWrapper.innerHTML = "";

  // Build slides
  bannerSlides.forEach((slide) => {
    const title = getLabel(slide.titleEn, slide.titleAr);
    const subTitle = getLabel(slide.subTitleEn, slide.subTitleAr);
    const text = getLabel(slide.textEn, slide.textAr);

    const item = document.createElement("div");
    const hasContent = title || subTitle || text;
    item.className = "swiper-slide";
    item.innerHTML = `
            <img src="${slide.url}" class="d-block w-100" alt="Banner Slide">
            <div class="carousel-caption align-items-center justify-content-center d-flex flex-column ${hasContent ? "" : "no-overlay"}"">
                <div">
                    <h4 class="text-white text-uppercase fw-bold wow fadeInUp">${subTitle}</h4>
                    <h1 class="display-1 text-white wow fadeInUp text-capitalize ${getDirectionClass("pb-0", "pb-3")}">${title}</h1>
                    <p class="text-white mx-auto fs-5 wow fadeInUp" style="max-width:36rem;">${text}</p>
                    ${
                      slide.path
                        ? `
                        <a href="#products"
                        onclick="setCurrentPage('${slide.path}')"
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
  const subTitleLabel = subTitle ? getLabel(subTitle, subTitle) : "";

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
          <li class="breadcrumb-item ${subTitle ? "" : "active"} text-capitalize">
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
              : ""
          }

        </ol>
      </div>
    </div>
  `;
}

/**
 * Set current page and update display
 */
function setCurrentPage(pageId, productId) {
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
    const pagesWithoutChrome = ["register", "login", "military-access"];
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

    // Update the URL to reflect the current page (and product, if applicable)
    if (pageId === "single-product" && productId) {
      appState.currentProductId = productId;
      history.pushState(
        { pageId, productId },
        "",
        `#single-product/${productId}`,
      );
    } else {
      history.pushState({ pageId }, "", `#${pageId}`);
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
    case "military-access":
      loadMilitaryAccessPage();
      break;
    case "contact":
      loadContactPage();
      break;
    case "single-product":
      loadSingleProductPage(appState.currentProductId);
      break;
    case "cart":
      loadCartPage();
      break;
    case "profile":
      loadProfilePage();
      break;
    case "admin":
      loadAdminPage();
      break;
    case "checkout":
      loadCheckoutPage();
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

/* =============================================================
   PRODUCTS PAGE START
   ============================================================= */
/* ============================================================
   PRODUCTS PAGE — complete file
   ============================================================
   Assumes these already exist in your app (loaded before this file):
     - productsData     (array, from /data/products.json)
     - categoriesData   (array, from /data/categories.json)
     - appState         (global, has appState.language)
     - getLabel(en, ar)
     - createBanner(title)
     - setCurrentPage(pageId, productId)  — your existing router

   Real schema used (no renamed fields):
     products.json:   id, categoryId, subCategoryId, category:{en,ar},
                       sub_category:{en,ar}, title:{en,ar}, gallery[],
                       price, oldPrice, rating, reviewCount, stockQty
     categories.json: categoryId, name:{en,ar}, subCategories:[
                         { subCategoryId, name:{en,ar} }
                       ]
     NOTE: subCategoryId (products.json) and subCategories (categories.json)
     are the two additions agreed on earlier — add them to your real JSON
     files if not already there.
   ============================================================ */

let filterState = { categoryId: null, subCategoryId: null };
let productsPageEventsBound = false;

const PRODUCTS_PAGE_SIZE = 12;
let displayedProductsCount = PRODUCTS_PAGE_SIZE;

/**
 * Call this from nav links, category cards, homepage "Explore" buttons, etc.
 * to land on the Products page with a category (and optionally sub-category)
 * already applied.
 *
 * Example: goToProductsWithFilter('plastic')
 * Example: goToProductsWithFilter('plastic', 'plastic-storage-boxes')
 */
function goToProductsWithFilter(categoryId, subCategoryId = null) {
  appState.pendingProductFilter = { categoryId, subCategoryId };
  setCurrentPage("products");
}

/**
 * Load products page
 */
function loadProductsPage() {
  const container = document.getElementById("productsPageContent");
  if (!container) return;

  const incomingCategoryId = appState.pendingProductFilter
    ? appState.pendingProductFilter.categoryId
    : filterState.categoryId;
  if (incomingCategoryId === "military" && !requireMilitaryAccess()) {
    return;
  }

  const productHTML = `
        ${createBanner(getLabel("Products", "المنتجات"))}
        <div class="container-fluid service overflow-hidden py-5 bg-light">
            <div class="container">
                <div class="row g-4">
                    <!-- Desktop filter sidebar -->
                    <aside class="col-lg-3 d-none d-lg-block">
                        <div class="filter-panel">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5 class="mb-0">${getLabel("Filter Options", "الفلاتر")}</h5>
                                </div>
                                <hr>
                            <div id="category-filter-container"></div>
                            <div id="subcategory-filter-container"></div>
                        </div>
                    </aside>

                    <!-- Mobile filters trigger -->
                    <div class="col-12 d-lg-none">
                        <button class="btn btn-primary filters-toggle-btn mb-2" type="button"
                                data-bs-toggle="offcanvas" data-bs-target="#filtersOffcanvas">
                            <i class="fa-solid fa-sliders"></i>
                        </button>
                    </div>

                    <!-- Mobile off-canvas -->
                    <div class="offcanvas offcanvas-start mt-0" tabindex="-1" id="filtersOffcanvas">
                        <div class="offcanvas-header pb-0">
                            <h5 class="offcanvas-title">${getLabel("Filter Options", "الفلاتر")}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <hr>
                        <div class="offcanvas-body">
                            <div id="category-filter-container-mobile"></div>
                            <div id="subcategory-filter-container-mobile"></div>
                        </div>
                    </div>

                    <!-- Grid + active filter chips -->
                    <div class="col-lg-9">
                        <div class="d-flex justify-content-between align-items-start flex-wrap mb-2" style="min-height:3rem;">
                            <div id="active-filters-container" class="flex-grow-1"></div>
                            <div class="text-muted small ms-auto ps-3" id="results-count"></div>
                        </div>
                        <div id="products-grid-container" class="row g-4"></div>
                    </div>

                </div>
            </div>
        </div>
    `;

  container.innerHTML = productHTML;

  // Apply a pending filter from goToProductsWithFilter() if one was set,
  // otherwise start with no filters. Consumed once so a later plain
  // navigation to Products (e.g. via nav link) isn't affected.
  if (appState.pendingProductFilter) {
    filterState = {
      categoryId: appState.pendingProductFilter.categoryId || null,
      subCategoryId: appState.pendingProductFilter.subCategoryId || null,
    };
    appState.pendingProductFilter = null;
  } else {
    filterState = { categoryId: null, subCategoryId: null };
  }

  displayedProductsCount = PRODUCTS_PAGE_SIZE;
  bindProductsPageEvents();
  renderCategoryFilter();
  renderSubCategoryFilter();
  renderActiveFilterChips();
  renderProductsGrid(applyFilters(productsData, filterState));
}

/* ------------------------------------------------------------
   PURE FILTER FUNCTION
   ------------------------------------------------------------ */
function applyFilters(products, state) {
  return products.filter((p) => {
    if (state.categoryId && p.categoryId !== state.categoryId) return false;
    if (state.subCategoryId && p.subCategoryId !== state.subCategoryId)
      return false;
    return true;
  });
}

/* ------------------------------------------------------------
   EVENT BINDING — delegated on document, bound once
   ------------------------------------------------------------ */
function bindProductsPageEvents() {
  if (productsPageEventsBound) return;
  productsPageEventsBound = true;

  document.addEventListener("change", (e) => {
    if (e.target.matches('input[name="categoryFilter"]')) {
      onCategoryFilterChange(e.target.value || null);
    }
    if (e.target.matches('input[name="subCategoryFilter"]')) {
      onSubCategoryFilterChange(e.target.value || null);
    }
  });

  document.addEventListener("click", (e) => {
    if (
      e.target.closest(
        "#clear-filters-btn, #clear-filters-btn-mobile, #clear-filters-btn-empty",
      )
    ) {
      clearAllFilters();
      return;
    }

    const chipRemove = e.target.closest("[data-remove-filter]");
    if (chipRemove) {
      const type = chipRemove.dataset.removeFilter;
      if (type === "category") onCategoryFilterChange(null);
      if (type === "subcategory") onSubCategoryFilterChange(null);
      return;
    }

    const card = e.target.closest("[data-product-id]");
    if (card) {
      setCurrentPage("single-product", Number(card.dataset.productId));
    }

    if (e.target.closest("#show-more-products-btn")) {
      displayedProductsCount += PRODUCTS_PAGE_SIZE;
      renderProductsGrid(applyFilters(productsData, filterState));
    }
  });
}

/* ------------------------------------------------------------
   CATEGORY FILTER
   ------------------------------------------------------------ */
function renderCategoryFilter() {
  const targets = [
    document.getElementById("category-filter-container"),
    document.getElementById("category-filter-container-mobile"),
  ].filter(Boolean);

  // "military" is deliberately excluded here — it's a restricted, OTP-gated
  // category reached only via the mega menu / homepage category section
  // (see requireMilitaryAccess()), not offered as a filter option here.
  const itemsHtml = categoriesData
    .filter((cat) => cat.categoryId !== "military")
    .map(
      (cat) => `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="categoryFilter"
                   id="cat-${cat.categoryId}" value="${cat.categoryId}"
                   ${filterState.categoryId === cat.categoryId ? "checked" : ""}>
            <label class="form-check-label" for="cat-${cat.categoryId}">
                ${getLabel(cat.name.en, cat.name.ar)}
            </label>
        </div>
    `,
    )
    .join("");

  const html = `
        <div class="filter-group mb-4">
            <h6 class="fw-bold mb-3">${getLabel("Category", "الفئة")}</h6>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="categoryFilter"
                       id="cat-all" value="" ${!filterState.categoryId ? "checked" : ""}>
                <label class="form-check-label" for="cat-all">
                    ${getLabel("All Categories", "كل الفئات")}
                </label>
            </div>
            ${itemsHtml}
        </div>
    `;

  targets.forEach((t) => (t.innerHTML = html));
}

function onCategoryFilterChange(categoryId) {
  if (categoryId === "military" && !requireMilitaryAccess()) return;
  filterState.categoryId = categoryId;
  filterState.subCategoryId = null;
  displayedProductsCount = PRODUCTS_PAGE_SIZE;
  renderCategoryFilter();
  renderSubCategoryFilter();
  renderActiveFilterChips();
  renderProductsGrid(applyFilters(productsData, filterState));
}

/* ------------------------------------------------------------
   SUB-CATEGORY FILTER
   ------------------------------------------------------------ */
function renderSubCategoryFilter() {
  const targets = [
    document.getElementById("subcategory-filter-container"),
    document.getElementById("subcategory-filter-container-mobile"),
  ].filter(Boolean);

  if (!filterState.categoryId) {
    targets.forEach((t) => (t.innerHTML = ""));
    return;
  }

  const activeCategory = categoriesData.find(
    (c) => c.categoryId === filterState.categoryId,
  );
  const subCats = activeCategory?.subCategories || [];

  if (subCats.length === 0) {
    targets.forEach((t) => (t.innerHTML = ""));
    return;
  }

  const itemsHtml = subCats
    .map(
      (sub) => `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="subCategoryFilter"
                   id="sub-${sub.subCategoryId}" value="${sub.subCategoryId}"
                   ${filterState.subCategoryId === sub.subCategoryId ? "checked" : ""}>
            <label class="form-check-label" for="sub-${sub.subCategoryId}">
                ${getLabel(sub.name.en, sub.name.ar)}
            </label>
        </div>
    `,
    )
    .join("");

  const html = `
        <div class="filter-group mb-4">
            <h6 class="fw-bold mb-3">${getLabel("Sub-Category", "الفئة الفرعية")}</h6>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="subCategoryFilter"
                       id="sub-all" value="" ${!filterState.subCategoryId ? "checked" : ""}>
                <label class="form-check-label" for="sub-all">
                    ${getLabel("All Sub-Categories", "كل الفئات الفرعية")}
                </label>
            </div>
            ${itemsHtml}
        </div>
    `;

  targets.forEach((t) => (t.innerHTML = html));
}

function onSubCategoryFilterChange(subCategoryId) {
  filterState.subCategoryId = subCategoryId;
  displayedProductsCount = PRODUCTS_PAGE_SIZE;
  renderSubCategoryFilter();
  renderActiveFilterChips();
  renderProductsGrid(applyFilters(productsData, filterState));
}

/* ------------------------------------------------------------
   ACTIVE FILTER CHIPS
   ------------------------------------------------------------ */
function renderActiveFilterChips() {
  const container = document.getElementById("active-filters-container");
  if (!container) return;

  const clearFiltersBtn = `                                
    <button type="button" class="btn btn-link text-decoration-none d-none d-lg-inline-block" id="clear-filters-btn">
      ${getLabel("Clear All", "مسح الكل")}
    </button>`;

  const chips = [];

  if (filterState.categoryId) {
    const cat = categoriesData.find(
      (c) => c.categoryId === filterState.categoryId,
    );
    if (cat) {
      chips.push(`
                <span class="badge filter-chip me-2 mb-2 p-2 active-filter-chip">
                    ${getLabel(cat.name.en, cat.name.ar)}
                    <button type="button" class="btn-close small ps-2" style="width:8px; height:8px;" aria-label="Remove" data-remove-filter="category"></button>
                </span>
            `);
    }
  }

  if (filterState.subCategoryId) {
    const cat = categoriesData.find(
      (c) => c.categoryId === filterState.categoryId,
    );
    const sub = cat?.subCategories?.find(
      (s) => s.subCategoryId === filterState.subCategoryId,
    );
    if (sub) {
      chips.push(`
                <span class="badge filter-chip me-2 mb-2 p-2 active-filter-chip">
                    ${getLabel(sub.name.en, sub.name.ar)}
                    <button type="button" class="btn-close" style="width:8px; height:8px;" aria-label="Remove" data-remove-filter="subcategory"></button>
                </span>
            `);
    }
  }

  if (filterState.categoryId) chips.push(clearFiltersBtn);
  container.innerHTML = chips.join("");
}

function clearAllFilters() {
  filterState = { categoryId: null, subCategoryId: null };
  displayedProductsCount = PRODUCTS_PAGE_SIZE;
  renderCategoryFilter();
  renderSubCategoryFilter();
  renderActiveFilterChips();
  renderProductsGrid(applyFilters(productsData, filterState));
}

/* ------------------------------------------------------------
   PRODUCTS GRID
   ------------------------------------------------------------ */
function renderProductsGrid(products) {
  const container = document.getElementById("products-grid-container");
  const countEl = document.getElementById("results-count");
  if (!container) return;

  if (countEl) {
    countEl.textContent = getLabel(
      `${displayedProductsCount} result${displayedProductsCount === 1 ? "" : "s"}`,
      `${displayedProductsCount} نتيجة`,
    );
  }

  if (products.length === 0) {
    container.innerHTML = `
            <div class="col-12">
                <div class="empty-state text-center py-5">
                    <i class="bi bi-inbox" style="font-size:2.5rem;color:#ced4da;"></i>
                    <h5 class="mt-3">${getLabel("No products found", "لم يتم العثور على منتجات")}</h5>
                    <p class="mb-3">${getLabel("Try a different category or sub-category.", "جرّب فئة أو فئة فرعية مختلفة.")}</p>
                    <button type="button" class="btn btn-outline-primary btn-sm" id="clear-filters-btn-empty">
                        ${getLabel("Clear Filters", "مسح الفلاتر")}
                    </button>
                </div>
            </div>
        `;
    return;
  }

  const visibleProducts = products.slice(0, displayedProductsCount);
  const hasMore = displayedProductsCount < products.length;

  const cardsHtml = visibleProducts
    .map(
      (product) => /*html*/ `
        <div class="col-6 col-md-4 col-xl-4">
                <div class="card product-card h-100 border-0 " data-product-id="${product.id}">
                    <div class="product-img-wrap bg-light">
                        <img src="${product.url}" class="card-img-top" alt="${getLabel(product.title.en, product.title.ar)}">
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
            <span class="badge bg-light text-dark mb-2">${getLabel(product.sub_category.en, product.sub_category.ar)}</span>

            <h6 class="card-title mb-1">${getLabel(product.title.en, product.title.ar)}</h6>

            <p class="card-text text-muted small product-desc">
                ${getLabel(product.desc.en, product.desc.ar)}
            </p>
        </div>
    </div>
        </div>
    `,
    )
    .join("");

  const showMoreHtml = hasMore
    ? `
        <div class="col-12 text-center mt-4">
            <button type="button" class="btn btn-primary px-5 py-2" id="show-more-products-btn">
                ${getLabel("Show More", "عرض المزيد")}
            </button>
        </div>
    `
    : "";

  container.innerHTML = cardsHtml + showMoreHtml;

  // Make each card clickable through to the single product page

  container.querySelectorAll(".product-card").forEach((card, i) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      setCurrentPage("single-product", visibleProducts[i].id);
    });
  });
}

/* =============================================================
    PRODUCTS PAGE END
    ============================================================= */

/**
 * Load projects page
 */
/* ============================================================
   MACHINERY PAGE — full catalog over the `projects` data (see
   PROJECTS DATA). Previously ignored that data entirely and
   showed one hardcoded Lorem-ipsum card.
   ============================================================ */
function loadProjectsPage() {
  const container = document.getElementById("projectsPageContent");
  if (!container) return;

  const cardsHtml = projects
    .map(
      (p) => `
      <div class="col-md-6 col-lg-4">
        <div class="machinery-card h-100">
          <div class="machinery-card-img">
            <img src="${p.img}" class="img-fluid w-100 h-100" alt="${getLabel(p.titleEn, p.titleAr)}" loading="lazy">
          </div>
          <div class="bg-secondary rounded-bottom p-4 h-100 d-flex flex-column">
            <h4 class="text-white">${getLabel(p.titleEn, p.titleAr)}</h4>
            <p class="text-white-50 flex-grow-1">${getLabel(p.descEn, p.descAr)}</p>
            <a href="#" class="btn btn-secondary rounded-pill text-white p-0 align-self-start" onclick="setCurrentPage('contact')">
              ${getLabel("Request Quote", "اطلب عرض سعر")} <i class="fas fa-arrow-${getDirectionClass("right", "left")} px-1"></i>
            </a>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  container.innerHTML = `
    ${createBanner(getLabel("Machinery", "الآلات"))}
    <div class="container-fluid overflow-hidden py-5">
      <div class="container py-5">
        <div class="section-title text-left mb-5">
          <div class="sub-style">
            <h5 class="sub-title px-3">${getLabel("Our Machinery", "آلاتنا")}</h5>
          </div>
          <h1 class="display-5 mb-4">${getLabel("Industrial Machinery Available for Rental", "آلات صناعية متاحة للإيجار")}</h1>
          <p class="mb-0">${getLabel("Precision CNC equipment for rent, maintained to the highest standards.", "معدات CNC دقيقة متاحة للإيجار بأعلى معايير الصيانة.")}</p>
        </div>
        <div class="row g-4">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   NEWS PAGE — full grid over the shared `newsItems` data (see
   NEWS DATA), with a "Show More" pattern matching the Products
   page. "Read More" opens the shared #overlayModal for a quick
   read without a dedicated article route.
   ============================================================ */
const NEWS_PAGE_SIZE = 6;
let displayedNewsCount = NEWS_PAGE_SIZE;
let newsPageEventsBound = false;

function loadNewsPage() {
  const container = document.getElementById("newsPageContent");
  if (!container) return;

  displayedNewsCount = NEWS_PAGE_SIZE;

  container.innerHTML = `
    ${createBanner(getLabel("News", "الأخبار"))}
    <div class="container-fluid overflow-hidden py-5 bg-light">
      <div class="container">
        <div class="section-title text-center mb-5">
          <h5 class="sub-title px-3">${getLabel("News", "الأخبار")}</h5>
          <h1 class="display-5 mb-3">${getLabel("Stay Informed on the Latest Updates", "ابق على اطلاع بأحدث المستجدات")}</h1>
          <p class="text-muted mb-0">${getLabel("The latest announcements, milestones, and updates from Kader Factory.", "أحدث الإعلانات والإنجازات والمستجدات من مصنع قادر.")}</p>
        </div>
        <div class="row g-4" id="newsGridContainer"></div>
      </div>
    </div>
  `;

  renderNewsGrid();
  bindNewsPageEvents();
}

function renderNewsGrid() {
  const grid = document.getElementById("newsGridContainer");
  if (!grid) return;

  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.dateRaw) - new Date(a.dateRaw),
  );
  const visible = sorted.slice(0, displayedNewsCount);
  const hasMore = displayedNewsCount < sorted.length;

  const cardsHtml = visible
    .map(
      (item) => `
      <div class="col-md-6 col-lg-4">
        <div class="news-card bg-white rounded-3 overflow-hidden h-100 shadow-sm">
          <div class="news-card-img">
            <img src="${item.img}" class="img-fluid w-100 h-100" alt="${getLabel(item.titleEn, item.titleAr)}" loading="lazy">
          </div>
          <div class="p-4">
            <span class="text-muted small fw-semibold"><i class="far fa-calendar me-1"></i>${getLabel(item.dateEn, item.dateAr)}</span>
            <h5 class="fw-bold mt-2 mb-2">${getLabel(item.titleEn, item.titleAr)}</h5>
            <p class="text-muted small mb-3 news-card-excerpt">${getLabel(item.excerptEn, item.excerptAr)}</p>
            <a href="#" class="btn btn-link small ps-0" data-news-id="${item.id}">
              ${getLabel("Read More", "اقرأ المزيد")} <i class="fas fa-arrow-${getDirectionClass("right", "left")}"></i>
            </a>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  const showMoreHtml = hasMore
    ? `
      <div class="col-12 text-center mt-2">
        <button type="button" class="btn btn-primary px-5 py-2" id="showMoreNewsBtn">
          ${getLabel("Show More", "عرض المزيد")}
        </button>
      </div>
    `
    : "";

  grid.innerHTML = cardsHtml + showMoreHtml;
}

function bindNewsPageEvents() {
  if (newsPageEventsBound) return;
  newsPageEventsBound = true;

  document.addEventListener("click", (e) => {
    if (e.target.closest("#showMoreNewsBtn")) {
      displayedNewsCount += NEWS_PAGE_SIZE;
      renderNewsGrid();
      return;
    }

    const readMoreLink = e.target.closest("[data-news-id]");
    if (readMoreLink) {
      e.preventDefault();
      const item = newsItems.find((n) => n.id === readMoreLink.dataset.newsId);
      if (!item) return;

      document.getElementById("modalTitle").textContent = getLabel(
        item.titleEn,
        item.titleAr,
      );
      document.getElementById("modalBody").innerHTML = `
        <img src="${item.img}" class="img-fluid rounded mb-3 w-100" alt="${getLabel(item.titleEn, item.titleAr)}">
        <p class="text-muted small mb-2"><i class="far fa-calendar me-1"></i>${getLabel(item.dateEn, item.dateAr)}</p>
        <p>${getLabel(item.excerptEn, item.excerptAr)}</p>
      `;
      new bootstrap.Modal(document.getElementById("overlayModal")).show();
    }
  });
}

/* ============================================================
   VIDEOS PAGE — filterable grid over `videoItems` (see VIDEO DATA)
   ============================================================ */
let activeVideoCategory = "all";
let videosPageEventsBound = false;

function loadVideosPage() {
  const container = document.getElementById("videosPageContent");
  if (!container) return;

  activeVideoCategory = "all";

  container.innerHTML = `
    ${createBanner(getLabel("Video Library", "معرض الفيديوهات"))}
    <div class="container-fluid overflow-hidden py-5 bg-light">
      <div class="container">
        <div class="section-title text-center mb-4">
          <h5 class="sub-title px-3">${getLabel("Video Gallery", "معرض الفيديو")}</h5>
          <h1 class="display-5 mb-3">${getLabel("Explore Our Visual Content", "استكشف محتوانا المرئي")}</h1>
        </div>
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-4" id="videoFilterChips"></div>
        <div class="row g-4" id="videosGridContainer"></div>
      </div>
    </div>
  `;

  renderVideoFilterChips();
  renderVideosGrid();
  bindVideosPageEvents();
}

function renderVideoFilterChips() {
  const container = document.getElementById("videoFilterChips");
  if (!container) return;

  const chips = [{ key: "all", en: "All", ar: "الكل" }, ...VIDEO_CATEGORIES];

  container.innerHTML = chips
    .map(
      (c) => `
      <button type="button" class="filter-chip ${activeVideoCategory === c.key ? "active" : ""}" data-video-category="${c.key}">
        ${getLabel(c.en, c.ar)}
      </button>
    `,
    )
    .join("");
}

function renderVideosGrid() {
  const grid = document.getElementById("videosGridContainer");
  if (!grid) return;

  const filtered =
    activeVideoCategory === "all"
      ? videoItems
      : videoItems.filter((v) => v.category === activeVideoCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-muted">
        ${getLabel("No videos in this category yet.", "لا توجد فيديوهات في هذا القسم بعد.")}
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (v) => `
      <div class="col-md-6 col-lg-3">
        <div class="video-card">
          <div class="video-embed-wrap">
            <iframe src="https://www.youtube.com/embed/${v.youtubeId}" title="${getLabel(v.titleEn, v.titleAr)}" allowfullscreen loading="lazy"></iframe>
          </div>
          <h6 class="fw-semibold mt-2 mb-0">${getLabel(v.titleEn, v.titleAr)}</h6>
        </div>
      </div>
    `,
    )
    .join("");
}

function bindVideosPageEvents() {
  if (videosPageEventsBound) return;
  videosPageEventsBound = true;

  document.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-video-category]");
    if (chip) {
      activeVideoCategory = chip.dataset.videoCategory;
      renderVideoFilterChips();
      renderVideosGrid();
    }
  });
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
        title: { en: "Secured", ar: "آمن" },
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
        <div class="container-fluid contact overflow-hidden bg-light">
            <div class="container p-5">
                <div class="row g-5 mb-5">

                    <!-- Left: Quick Contact Info -->
                    <div class="col-lg-6 pt-5 px-0 mt-0 mt-xl-5">
                        <h5 class="sub-title px-3 py-0">${getLabel("Quick Contact", "اتصل بنا")}</h5>
                        <p class="ps-3 pb-3">
                            ${getLabel(
                              "We are here to help! Whether you have a question, feedback, or need support, our team is ready to assist you.",
                              "نحن هنا لمساعدتك! سواء كان لديك سؤال، أو ملاحظات، أو تحتاج إلى دعم، فإن فريقنا مستعد لتقديم المساعدة لك.",
                            )}
                        </p>

                        <div class="ps-3">
                            <h5 class="fw-bolder pb-2">
                                ${getLabel("Phone", "الهاتف")}:<br>
                                <a class="ps-0 btn btn-white text-decoration-underline pt-0" href="https://wa.me/${RESERVATION_WHATSAPP}" target="_blank" dir="ltr">+${RESERVATION_WHATSAPP}</a>
                            </h5>

                            <h5 class="fw-bolder pb-2">
                                ${getLabel("Email", "البريد")}:<br>
                                <a class="ps-0 btn btn-white text-decoration-underline pt-0" href="mailto:${RESERVATION_EMAIL}" target="_blank">${RESERVATION_EMAIL}</a>
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
    if (!validateSignupForm()) return;

    const email = document.getElementById("signupEmail").value.trim();
    const user = {
      name: `${document.getElementById("firstName").value.trim()} ${document.getElementById("lastName").value.trim()}`.trim(),
      email,
      phone: document.getElementById("signupPhone").value.trim(),
      role: email.toLowerCase() === DEMO_ADMIN_EMAIL ? "admin" : "customer",
    };

    loginUser(user);
    setCurrentPage(user.role === "admin" ? "admin" : "profile");
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

  loginPage.innerHTML = /*html*/ `
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

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert(
        getLabel(
          "Please enter your email and password",
          "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        ),
      );
      return;
    }

    // DEMO: no real password check / backend — see AUTH SYSTEM notes above
    const isAdmin = email.toLowerCase() === DEMO_ADMIN_EMAIL;
    const namePart = email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .trim();
    const displayName = isAdmin
      ? "Admin"
      : namePart.replace(/\b\w/g, (c) => c.toUpperCase());

    loginUser({
      name: displayName,
      email,
      phone: "",
      role: isAdmin ? "admin" : "customer",
    });
    setCurrentPage(isAdmin ? "admin" : "profile");
  });
}

/**
 * Military Access Gate — OTP-only entry to the "military" category.
 * See MILITARY ACCESS GATE section above for the storage/verify logic.
 */
function loadMilitaryAccessPage() {
  const container = document.getElementById("militaryAccessPageContent");
  if (!container) return;

  // Already unlocked on this device — skip straight to the catalog
  if (hasMilitaryAccess()) {
    goToProductsWithFilter("military");
    return;
  }

  const lockout = getMilitaryLockout();
  const isLocked = lockout.lockedUntil && lockout.lockedUntil > Date.now();

  container.innerHTML = /*html*/ `
        <div class="container-fluid p-0">
            <div class="row g-0 min-vh-100">

                <!-- Left: Branded visual panel -->
                <div class="col-lg-4 d-none d-lg-flex signup-visual-panel position-relative v-100">
                    <div class="signup-visual-overlay"></div>
                      <div class="position-relative d-flex align-items-start flex-column justify-content-between p-5">
                        <a href="/#home">
                          <img src="/images/logo-kader-white.png" alt="KADER" style="max-height: 3.2rem; object-fit:contain;">
                        </a>
                        <div>
                            <h2 class="display-1 fw-bold mb-3 text-primary">${getLabel("Restricted Access", "محتوي مقيد")}</h2>
                            <p class="text-white-50 mb-4" style="max-width: 400px;">
                                ${getLabel(
                                  "Military & defense equipment is available to verified government and corporate buyers only.",
                                  "معدات الدفاع والقطاع العسكري متاحة فقط للمشترين الحكوميين والمؤسسيين الموثقين.",
                                )}
                            </p>
                        </div>
                        <span class="text-white-50 small">${getLabel("© 2026 Kader Factory for Advanced Industries", "© 2026 مصنع قادر للصناعات المتطورة")}</span>
                    </div>
                </div>

                <!-- Right: OTP form -->
                <div class="col-lg-8 d-flex align-items-center justify-content-center py-5">
                    <div class="w-100 px-4 px-md-5" style="max-width: 420px;">

                        <div class="mb-4">
                            <span class="badge bg-danger d-inline-flex align-items-center gap-2 px-3 py-2 mb-3">
                                <i class="fa-solid fa-fingerprint"></i>
                                ${getLabel("RESTRICTED ACCESS — AUTHORIZED PERSONNEL ONLY", "وصول مقيد — الوصول للمصرح به فقط")}
                            </span>
                            <h5 class="sub-title text-primary px-3 px-lg-0">${getLabel("VERIFICATION REQUIRED", "التحقق مطلوب")}</h5>
                            <h2 class="fw-bold mb-2">${getLabel("Enter Access Code", "أدخل رمز الوصول")}</h2>
                            <p class="text-muted mb-0">
                                ${getLabel(
                                  "Enter the one-time code provided by your Kader Factory contact to view military & defense products.",
                                  "أدخل الرمز المؤقت الذي حصلت عليه من ممثل مصنع قادر لعرض المنتجات العسكرية والدفاعية.",
                                )}
                            </p>
                        </div>

                        <form id="militaryAccessForm" novalidate>
                            <div class="mb-3">
                                <label class="form-label small fw-semibold" for="militaryOtpInput">${getLabel("Access Code", "رمز الوصول")}</label>
                                <input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6"
                                       class="form-control py-2 text-center fw-bold" style="letter-spacing:0.5em; font-size:1.4rem;"
                                       id="militaryOtpInput" ${isLocked ? "disabled" : ""} required>
                                <div class="invalid-feedback" id="militaryOtpInput-error"></div>
                            </div>

                            ${
                              isLocked
                                ? `<div class="alert alert-danger small mb-3">
                                     ${getLabel("Too many incorrect attempts. Please try again later.", "عدد كبير من المحاولات الخاطئة. يرجى المحاولة لاحقاً.")}
                                   </div>`
                                : ""
                            }

                            <button type="submit" class="btn btn-primary w-100 py-3 rounded-0 fw-semibold" ${isLocked ? "disabled" : ""}>
                                ${getLabel("Verify", "تحقق")}
                            </button>

                            <p class="text-muted small text-center mt-4 mb-0">
                                ${getLabel("Don't have a code?", "ليس لديك رمز؟")}
                                <a href="#contact" class="text-primary text-decoration-none fw-semibold" onclick="setCurrentPage('contact')">
                                    ${getLabel("Contact Us", "تواصل معنا")}
                                </a>
                            </p>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    `;

  const form = document.getElementById("militaryAccessForm");
  const input = document.getElementById("militaryOtpInput");
  const errorEl = document.getElementById("militaryOtpInput-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const code = input.value.trim();

    if (!/^\d{6}$/.test(code)) {
      input.classList.add("is-invalid");
      errorEl.textContent = getLabel(
        "Enter the 6-digit code exactly as provided.",
        "أدخل الرمز المكون من 6 أرقام كما هو مرسل إليك.",
      );
      return;
    }

    const result = verifyMilitaryOtpCode(code);
    if (result.ok) {
      goToProductsWithFilter("military");
      return;
    }

    if (result.reason === "locked") {
      loadMilitaryAccessPage();
      return;
    }

    input.classList.add("is-invalid");
    errorEl.textContent = getLabel(
      "Invalid or expired code. Please check and try again.",
      "الرمز غير صحيح أو منتهي الصلاحية. يرجى التحقق والمحاولة مرة أخرى.",
    );
  });
}

/**
 * Initialize Single Product Page
 */

function loadSingleProductPage(productId) {
  const container = document.getElementById("singleProductContent");
  if (!container) return;

  const product = productsData.find((p) => p.id === productId);

  if (!product) {
    container.innerHTML = `<div class="container py-5 text-center text-muted">${getLabel("Product not found", "المنتج غير موجود")}</div>`;
    return;
  }

  // REMOVED — RESERVATION_WHATSAPP / RESERVATION_EMAIL already declared
  // at the top of your file; no need to redeclare them here.

  // ===== Data — read directly from the JSON, no fallback defaults =====
  const gallery = product.gallery;
  const price = product.price;
  const colors = product.colors;
  const sizes = product.sizes;
  const specGroups = product.specGroups;
  const warranty = product.warranty;

  const productTitle = getLabel(product.title.en, product.title.ar);
  const productDesc = getLabel(product.desc.en, product.desc.ar);
  const productSubCategory = product.sub_category
    ? getLabel(product.sub_category.en, product.sub_category.ar)
    : "";

  const relatedProducts = productsData
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  // ===== Render helpers =====

  const galleryThumbsHtml = gallery
    .map(
      (img, i) => `
        <div class="product-thumb ${i === 0 ? "active" : ""}" data-img="${img}" data-index="${i}">
            <img src="${img}" alt="${product.title} ${i + 1}" class="img-fluid">
        </div>
    `,
    )
    .join("");

  const colorSwatchesHtml = colors
    .map(
      (c, i) => `
        <button type="button" class="color-swatch ${i === 0 ? "active" : ""}" data-color="${getLabel(c.name, c.nameAr)}" style="background:${c.hex};" title="${getLabel(c.name, c.nameAr)}"></button>
    `,
    )
    .join("");

  const sizeOptionsHtml = sizes
    .map(
      (s, i) => `
        <button type="button" class="size-option ${i === 0 ? "active" : ""}" data-size="${getLabel(s.en, s.ar)}">${getLabel(s.en, s.ar)}</button>
    `,
    )
    .join("");

  const specGroupsHtml = specGroups
    .map(
      (group, i) => `
        <div class="spec-group-item border-bottom border-black-25">
            <button class="spec-group-toggle d-flex align-items-center justify-content-between w-100 bg-transparent border-0 py-3" type="button" data-bs-toggle="collapse" data-bs-target="#specGroup${i}">
                <h6 class="fw-bold mb-0">${getLabel(group.titleEn, group.titleAr)}</h6>
                <i class="fas fa-chevron-down spec-chevron"></i>
            </button>
            <div class="collapse" id="specGroup${i}">
                <ul class="text-muted small mb-3 ps-3">
                    ${group.items.map((item) => `<li class="mb-1">${getLabel(item.en, item.ar)}</li>`).join("")}
                </ul>
            </div>
        </div>
    `,
    )
    .join("");

  const relatedHtml = relatedProducts
    .map(
      (p) => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card product-card related-product-card h-100 border-0" data-product-id="${p.id}">
                <div class="product-img-wrap bg-light">
                    <img src="${p.url}" class="card-img-top" alt="${getLabel(p.title.en, p.title.ar)}">
                </div>
                <div class="card-body">
                    <div class="price-section mt-3">
                        ${p.oldPrice ? `<span class="discount-badge">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : ""}
                        <div class="price-row">
                            <span class="current-price">EGP ${p.price}</span>
                            ${p.oldPrice ? `<span class="old-price">EGP ${p.oldPrice}</span>` : ""}
                        </div>
                    </div>
                    <span class="badge bg-light text-dark mb-2">${getLabel(p.sub_category.en, p.sub_category.ar)}</span>
                    <h6 class="card-title mb-1">${getLabel(p.title.en, p.title.ar)}</h6>
                    <p class="card-text text-muted small product-desc">${getLabel(p.desc.en, p.desc.ar)}</p>
                </div>
            </div>
        </div>
      `,
    )
    .join("");

  const shareLinksHtml = shareLinks
    .map((s) => {
      if (s.copy) {
        return `
            <button type="button"
                    class="btn btn-white fs-5 px-2 copy-link"
                    data-url="${window.location.href}"
                    aria-label="${s.label}">
                <i class="${s.icon}"></i>
            </button>
        `;
      }

      return `
        <a href="${s.url}"
           target="_blank"
           rel="noopener noreferrer"
           class="btn btn-white fs-5 px-2"
           aria-label="${s.label}">
            <i class="${s.icon}"></i>
        </a>
    `;
    })
    .join("");

  // ===== Render =====
  const policyTabButtonsHtml = Object.entries(policyTabsContent)
    .map(
      ([key, tab], i) => `
          <li class="nav-item">
              <button class="nav-link ${i === 0 ? "active" : ""}" data-bs-toggle="tab" data-bs-target="#${key}Tab" type="button">
                  <i class="${tab.icon} me-2"></i>${getLabel(tab.tabLabel.en, tab.tabLabel.ar)}
              </button>
          </li>
      `,
    )
    .join("");

  const policyTabPanesHtml = Object.entries(policyTabsContent)
    .map(
      ([key, tab], i) => `
          <div class="tab-pane fade ${i === 0 ? "show active" : ""}" id="${key}Tab">
              <p class="text-muted mb-3">${getLabel(tab.intro.en, tab.intro.ar)}</p>
              <ul class="text-muted ${tab.linkLabel ? "mb-3" : "mb-0"}">
                  ${tab.points.map((point) => `<li class="mb-2">${getLabel(point.en, point.ar)}</li>`).join("")}
              </ul>
              ${
                tab.linkLabel
                  ? `
                  <a href="#" class="btn btn-link" onclick="setCurrentPage('${tab.linkPage}')">
                      ${getLabel(tab.linkLabel.en, tab.linkLabel.ar)}</i>
                  </a>
              `
                  : ""
              }
          </div>
      `,
    )
    .join("");

  // ===== Res Section =====
  // Assumes product has a stockQty field — add this to your product data objects
  const stockQty = product.stockQty || 20; // fallback default if not set
  const maxSelectable = Math.min(stockQty, 20); // cap the dropdown length even if stock is huge

  const qtyOptionsHtml = Array.from({ length: maxSelectable }, (_, i) => i + 1)
    .map((n) => `<option value="${n}">${n}</option>`)
    .join("");

  // ===== Render page =====

  container.innerHTML = /*html*/ `
    ${createBanner(getLabel("All Products", "المنتجات"), getLabel("Product", "المنتج"))}

        <div class="container-fluid overflow-hidden py-5 bg-light">
            <div class="container border-bottom pb-5">
                <div class="row g-5">

            <!-- Left: Gallery -->
            <div class="col-lg-5">
                <div class="d-flex gap-3 gallery-wrapper" id="productGalleryWrapper">

                    <!-- Vertical thumbnails -->
                    <div class="swiper galleryOverlayThumbs">
                        <div class="swiper-wrapper">
                            ${gallery
                              .map(
                                (img) => `
                                <div class="swiper-slide">
                                    <img src="${img}" class="img-fluid" alt="${product.title} thumb">
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>

                    <!-- Main image swiper -->
                    <div class="swiper galleryOverlaySwiper position-relative">
                        <div class="swiper-wrapper">
                            ${gallery
                              .map(
                                (img) => `
                                <div class="swiper-slide d-flex align-items-center justify-content-center">
                                    <img src="${img}" class="img-fluid" alt="${product.title}">
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>

                        <button type="button" class="btn btn-primary position-absolute d-flex justify-content-center align-items-center top-0 end-0 rounded-circle m-2" style="height:40px; width:40px; z-index: 10;" id="openGalleryOverlay" aria-label="${getLabel("View full image", "عرض الصورة كاملة")}">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>

                </div>
            </div>

                    <!-- Middle: Product Info -->
                    <div class="col-lg-4">
                        <h5 class=" small mb-0">${getLabel(product.sub_category.en, product.sub_category.ar)}</h5>
                        <h2 class="fw-bold mb-0">${getLabel(product.title.en, product.title.ar)}</h2>

                        <p class="text-muted m-0">${getLabel(product.desc.en, product.desc.ar)}</p>

                        <div class="">
                            ${
                              product.oldPrice
                                ? `<span class="text-danger fs-3 pe-2">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>`
                                : ""
                            }
                          <span class="current-price fs-3 fw-bold text-primary">
                            ${getLabel("EGP", "ج.م")} ${product.price}
                          </span>
                            ${
                              product.oldPrice
                                ? `
                                <div class="d-flex gap-1 align-items-center">
                                  <span class="small">${getLabel("List Price", "")}: </span>
                                  <span class="old-price">${getLabel("EGP", "ج.م")} ${product.oldPrice}</span>
                                </div>
                                `
                                : ""
                            }
                        </div>

                        <div class="d-flex justify-content-start align-items-center">
                        <p class="m-0 pe-2">Share</p>
                        ${shareLinksHtml}
                        </div>

                        <hr>

                        <h5 class="sub-title p-0 pt-3">${getLabel("Details", "مواصفات المنتج")}</h5>
                        <div class="spec-groups-wrapper">
                            ${specGroupsHtml}
                        </div>


                    </div>

                    <!-- Right: Reservation Box -->
                    <div class="col-lg-3 d">
                        <div class="buy-box border rounded-3 p-4">
                            <div class="mb-3">
                                <span class="fs-4 fw-bold text-primary">${price.toLocaleString()} ${getLabel("EGP", "ج.م")}</span>
                            </div>

                            <div class="mb-4">
                                <label class="form-label small fw-semibold">${getLabel("Select Color", "اختر اللون")}</label>
                                <div class="d-flex gap-2" id="colorSwatches">
                                    ${colorSwatchesHtml}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label small fw-semibold">${getLabel("Select Size", "اختر المقاس")}</label>
                                <div class="d-flex gap-2 flex-wrap" id="sizeOptions">
                                    ${sizeOptionsHtml}
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label small fw-semibold" for="productQty">${getLabel("Quantity", "الكمية")}</label>
                                <select class="form-select ${stockQty === 0 ? "d-none" : ""}" id="productQty" style="max-width: 140px;">
                                    ${qtyOptionsHtml}
                                </select>
                                ${
                                  stockQty === 0
                                    ? `
                                    <div class="form-text text-danger small mt-1">
                                        ${getLabel(`Out of stock`, ` غير متاح`)}
                                    </div>`
                                    : stockQty <= 10
                                      ? `
                                    <div class="form-text text-danger small mt-1">
                                        ${getLabel(`Only ${stockQty} left in stock`, `متبقي ${stockQty} فقط في المخزون`)}
                                    </div>
                                `
                                      : ""
                                }
                            </div>

                            <button class="btn btn-primary w-100 py-2 rounded-0 mb-2" id="addToCartBtn" ${stockQty === 0 ? "disabled" : ""}>
                                ${getLabel("Add to Cart", "أضف إلى السلة")}
                            </button>

                            <button class="btn btn-secondary w-100 py-2 rounded-0 mb-2" id="buyNowBtn" ${stockQty === 0 ? "disabled" : ""}>
                                ${getLabel("Buy Now", "اشترِ الآن")}
                            </button>
                            
                            <button class="btn btn-warning w-100 py-2 rounded-0 mb-3" id="openReservationModal"  ${stockQty === 0 ? "" : "hidden"}>
                                ${getLabel("Request Reservation", "طلب حجز")}
                            </button>

                            <hr>

                            <div class="d-flex align-items-start gap-2 mb-3">
                                <i class="fas fa-shield-alt text-primary mt-1"></i>
                                <div>
                                    <div class="small fw-semibold">${getLabel("Quality Guaranteed", "جودة مضمونة")}</div>
                                    <div class="small text-muted">${getLabel("Manufactured to international standards", "مُصنّع وفق المعايير الدولية")}</div>
                                </div>
                            </div>

                            <div class="d-flex align-items-start gap-2">
                                <i class="fas fa-undo text-primary mt-1"></i>
                                <div>
                                    <div class="small fw-semibold">${getLabel("Return Policy", "سياسة الإرجاع")}</div>
                                    <div class="small text-muted">${getLabel("14-day return window", "فترة إرجاع 14 يوماً")}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Policies: Return / Warranty / Delivery Tabs -->
        <div class="container-fluid overflow-hidden bg-light">
            <div class="container">
                <ul class="nav nav-tabs policy-tabs" id="policyTabs" role="tablist">
                    ${policyTabButtonsHtml}
                </ul>

                <div class="tab-content bg-white p-4 p-lg-5 rounded-bottom shadow-sm pb-5">
                    ${policyTabPanesHtml}
                </div>
            </div>
        </div>

        <!-- Related Products -->
        ${
          relatedProducts.length > 0
            ? `
        <div class="container-fluid overflow-hidden py-5 bg-light">
            <div class="container border-top pt-5">
                <h4 class="fw-bold mb-4">${getLabel("You Might Also Like", "قد يعجبك أيضاً")}</h4>
                <div class="row g-4">
                    ${relatedHtml}
                </div>
            </div>
        </div>
        `
            : ""
        }

        <!-- Fullscreen Gallery Overlay -->
        <div class="product-gallery-overlay d-none" id="galleryOverlay">
            <button type="button" class="gallery-overlay-close" id="closeGalleryOverlay" aria-label="${getLabel("Close", "إغلاق")}">
                <i class="fas fa-times"></i>
            </button>
            <div class="swiper galleryOverlaySwiper">
                <div class="swiper-wrapper">
                    ${gallery
                      .map(
                        (img) => `
                        <div class="swiper-slide d-flex align-items-center justify-content-center">
                            <img src="${img}" class="img-fluid" style="max-height: 85vh;" alt="${product.title}">
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </div>
        </div>

        <!-- Reservation Modal -->
        <div class="reservation-modal-backdrop d-none" id="reservationModalBackdrop">
            <div class="reservation-modal">
                <button type="button" class="reservation-modal-close" id="closeReservationModal" aria-label="${getLabel("Close", "إغلاق")}">
                    <i class="fas fa-times"></i>
                </button>

                <h4 class="fw-bold mb-1">${getLabel("Request Reservation", "طلب حجز")}</h4>
                <p class="text-muted small mb-4">${getLabel("Fill in your details and we will confirm your reservation shortly.", "أدخل بياناتك وسنؤكد حجزك في أقرب وقت.")}</p>

                <div class="bg-light rounded-3 p-3 mb-4">
                    <div class="d-flex justify-content-between small mb-1">
                        <span class="text-muted">${getLabel("Product", "المنتج")}</span>
                        <span class="fw-semibold">${product.title}</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                        <span class="text-muted">${getLabel("Color", "اللون")}</span>
                        <span class="fw-semibold" id="reservationSummaryColor">${getLabel(colors[0].name, colors[0].nameAr)}</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                        <span class="text-muted">${getLabel("Size", "المقاس")}</span>
                        <span class="fw-semibold" id="reservationSummarySize">${getLabel(sizes[0].en, sizes[0].ar)}</span>
                    </div>
                    <div class="d-flex justify-content-between small">
                        <span class="text-muted">${getLabel("Quantity", "الكمية")}</span>
                        <span class="fw-semibold" id="reservationSummaryQty">1</span>
                    </div>
                </div>

                <form id="reservationForm">
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">${getLabel("Full Name", "الاسم الكامل")}</label>
                        <input type="text" class="form-control" id="reservationName" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label small fw-semibold">${getLabel("Phone Number", "رقم الهاتف")}</label>
                        <input type="tel" class="form-control" id="reservationPhone" dir="ltr" required>
                    </div>

                    <p class="small text-muted mb-2">${getLabel("Send this reservation via:", "أرسل الحجز عبر:")}</p>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-success flex-fill py-2" id="sendViaWhatsapp">
                            <i class="fab fa-whatsapp me-2"></i>${getLabel("WhatsApp", "واتساب")}
                        </button>
                        <button type="button" class="btn btn-outline-secondary flex-fill py-2" id="sendViaEmail">
                            <i class="fas fa-envelope me-2"></i>${getLabel("Email", "البريد")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

  // ===================== Interactions =====================
  // NOTE: all shared state is declared FIRST, before any handler that
  // references it. Previously qtySelect / selectedColor / selectedSize
  // were declared at the bottom, so if anything above them threw, the
  // Add to Cart / Buy Now handlers hit a TDZ ReferenceError on click.

  const qtySelect = container.querySelector("#productQty");
  let selectedColor = getLabel(colors[0].name, colors[0].nameAr);
  let selectedSize = getLabel(sizes[0].en, sizes[0].ar);

  const getQty = () => parseInt(qtySelect?.value || "1", 10);

  // --- Related product cards ---
  // (was: relatedHtml[i].id — relatedHtml is a STRING, not an array)
  container.querySelectorAll(".related-product-card").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      setCurrentPage("single-product", card.dataset.productId);
    });
  });

  // --- Add to Cart ---
  const addToCartBtn = container.querySelector("#addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      addToCart(product.id, getQty(), {
        color: selectedColor,
        size: selectedSize,
      });

      const originalHtml = addToCartBtn.innerHTML;
      addToCartBtn.innerHTML = `<i class="fas fa-check me-2"></i>${getLabel("Added!", "تمت الإضافة!")}`;
      addToCartBtn.disabled = true;
      setTimeout(() => {
        addToCartBtn.innerHTML = originalHtml;
        addToCartBtn.disabled = false;
      }, 1500);
    });
  }

  // --- Buy Now ---
  const buyNowBtn = container.querySelector("#buyNowBtn");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      addToCart(product.id, getQty(), {
        color: selectedColor,
        size: selectedSize,
      });
      setCurrentPage("checkout");
    });
  }

  // --- Color swatches ---
  container.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", function () {
      container
        .querySelectorAll(".color-swatch")
        .forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
      selectedColor = this.dataset.color;
    });
  });

  // --- Size options ---
  container.querySelectorAll(".size-option").forEach((opt) => {
    opt.addEventListener("click", function () {
      container
        .querySelectorAll(".size-option")
        .forEach((o) => o.classList.remove("active"));
      this.classList.add("active");
      selectedSize = this.dataset.size;
    });
  });

  // --- Spec group chevrons ---
  container.querySelectorAll(".spec-group-toggle").forEach((btn) => {
    const targetId = btn.getAttribute("data-bs-target");
    const target = container.querySelector(targetId);
    if (!target) return; // defensive: don't throw and abort everything below
    target.addEventListener("show.bs.collapse", () =>
      btn.querySelector(".spec-chevron").classList.add("rotated"),
    );
    target.addEventListener("hide.bs.collapse", () =>
      btn.querySelector(".spec-chevron").classList.remove("rotated"),
    );
  });

  // --- Gallery swipers ---
  // NOTE: the inline gallery and the fullscreen overlay must NOT share the
  // same class — new Swiper(".x") only binds the FIRST match, so the second
  // one silently never initializes. Rename the overlay's classes in the
  // markup to .galleryFullscreenSwiper / .galleryFullscreenThumbs.
  const galleryThumbs = new Swiper(".galleryOverlayThumbs", {
    direction: "vertical",
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    rtl: document.documentElement.dir === "rtl",
    breakpoints: {
      0: { direction: "horizontal", slidesPerView: 4, spaceBetween: 8 },
      768: { direction: "vertical", slidesPerView: 4, spaceBetween: 10 },
    },
  });

  const gallerySwiper = new Swiper(".galleryOverlaySwiper", {
    slidesPerView: 1,
    loop: true,
    rtl: document.documentElement.dir === "rtl",
    navigation: {
      nextEl: ".galleryOverlaySwiper .swiper-button-next",
      prevEl: ".galleryOverlaySwiper .swiper-button-prev",
    },
    pagination: {
      el: ".galleryOverlaySwiper .swiper-pagination",
      clickable: true,
    },
    thumbs: { swiper: galleryThumbs },
  });

  // --- Fullscreen toggle ---
  const galleryWrapper = document.getElementById("productGalleryWrapper");
  const openGalleryBtn = document.getElementById("openGalleryOverlay");

  if (galleryWrapper && openGalleryBtn) {
    openGalleryBtn.addEventListener("click", () => {
      const isFullscreen =
        galleryWrapper.classList.toggle("gallery-fullscreen");
      document.documentElement.style.overflow = isFullscreen ? "hidden" : "";
      document.body.style.overflow = isFullscreen ? "hidden" : "";
      openGalleryBtn.querySelector("i").className = isFullscreen
        ? "fas fa-compress"
        : "fas fa-expand";
      gallerySwiper.update();
      galleryThumbs.update();
    });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        galleryWrapper.classList.contains("gallery-fullscreen")
      ) {
        galleryWrapper.classList.remove("gallery-fullscreen");
        document.body.style.overflow = "";
        openGalleryBtn.querySelector("i").className = "fas fa-expand";
        gallerySwiper.update();
        galleryThumbs.update();
      }
    });
  }

  // --- Reservation Modal ---
  const reservationBackdrop = document.getElementById(
    "reservationModalBackdrop",
  );
  const openReservationBtn = document.getElementById("openReservationModal");
  const closeReservationBtn = document.getElementById("closeReservationModal");

  if (openReservationBtn && reservationBackdrop) {
    openReservationBtn.addEventListener("click", () => {
      const colorEl = document.getElementById("reservationSummaryColor");
      const sizeEl = document.getElementById("reservationSummarySize");
      const qtyEl = document.getElementById("reservationSummaryQty");

      if (colorEl) colorEl.textContent = selectedColor;
      if (sizeEl) sizeEl.textContent = selectedSize;
      if (qtyEl) qtyEl.textContent = getQty();

      reservationBackdrop.classList.remove("d-none");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeReservationBtn && reservationBackdrop) {
    closeReservationBtn.addEventListener("click", () => {
      reservationBackdrop.classList.add("d-none");
      document.body.style.overflow = "";
    });
  }

  function buildReservationMessage() {
    const name = document.getElementById("reservationName").value.trim();
    const phone = document.getElementById("reservationPhone").value.trim();

    return getLabel(
      `Reservation Request\nProduct: ${productTitle}\nColor: ${selectedColor}\nSize: ${selectedSize}\nQuantity: ${getQty()}\nName: ${name}\nPhone: ${phone}`,
      `طلب حجز\nالمنتج: ${productTitle}\nاللون: ${selectedColor}\nالمقاس: ${selectedSize}\nالكمية: ${getQty()}\nالاسم: ${name}\nالهاتف: ${phone}`,
    );
  }

  function validateReservation() {
    const name = document.getElementById("reservationName").value.trim();
    const phone = document.getElementById("reservationPhone").value.trim();
    if (!name || !phone) {
      alert(
        getLabel(
          "Please enter your name and phone number",
          "يرجى إدخال الاسم ورقم الهاتف",
        ),
      );
      return false;
    }
    return true;
  }

  const whatsappBtn = document.getElementById("sendViaWhatsapp");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      if (!validateReservation()) return;
      const message = encodeURIComponent(buildReservationMessage());
      window.open(
        `https://wa.me/${RESERVATION_WHATSAPP}?text=${message}`,
        "_blank",
      );
    });
  }

  const emailBtn = document.getElementById("sendViaEmail");
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      if (!validateReservation()) return;
      const subject = encodeURIComponent(
        getLabel(
          `Reservation Request - ${productTitle}`,
          `طلب حجز - ${productTitle}`,
        ),
      );
      const body = encodeURIComponent(buildReservationMessage());
      window.location.href = `mailto:${RESERVATION_EMAIL}?subject=${subject}&body=${body}`;
    });
  }
}

/* ============================================================
   CART PAGE
   ============================================================
   The review/edit step before checkout. Reuses the existing cart
   functions (removeFromCart / updateCartItemQty / getCartTotal) —
   no new cart state is introduced here.
   ============================================================ */
let cartPageEventsBound = false;

function loadCartPage() {
  const container = document.getElementById("cartPageContent");
  if (!container) return;

  const cart = appState.cart || [];

  if (cart.length === 0) {
    container.innerHTML = `
      ${createBanner(getLabel("Cart", "السلة"))}
      <div class="container py-5">
        <div class="text-center py-5">
          <i class="fas fa-cart-shopping text-muted" style="font-size:3rem;"></i>
          <h4 class="mt-3">${getLabel("Your cart is empty", "سلتك فارغة")}</h4>
          <p class="text-muted mb-4">${getLabel("Browse our products and add something you like.", "تصفح منتجاتنا وأضف ما يعجبك.")}</p>
          <button type="button" class="btn btn-primary px-5" data-nav-page-id="products">
            ${getLabel("Browse Products", "تصفح المنتجات")}
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    ${createBanner(getLabel("Cart", "السلة"))}
    <div class="container-fluid py-5 bg-light">
      <div class="container">
        <div class="row g-4">

          <div class="col-lg-8">
            <div class="cart-items-list bg-white rounded-3 p-4">
              ${cart.map((item) => renderCartLineItem(item)).join("")}
            </div>
          </div>

          <div class="col-lg-4">
            <div class="checkout-summary bg-white rounded-3 p-4">
              <h5 class="fw-bold mb-3">${getLabel("Order Summary", "ملخص الطلب")}</h5>
              <div class="d-flex justify-content-between align-items-center mb-4">
                <span class="fw-bold">${getLabel("Subtotal", "المجموع الفرعي")}</span>
                <span class="fs-4 fw-bold text-primary">${formatEGP(getCartTotal())}</span>
              </div>
              <button type="button" class="btn btn-primary w-100 py-2 mb-2" data-nav-page-id="checkout">
                ${getLabel("Proceed to Checkout", "متابعة الدفع")}
              </button>
              <button type="button" class="btn btn-outline-secondary w-100 py-2" data-nav-page-id="products">
                ${getLabel("Continue Shopping", "متابعة التسوق")}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  bindCartPageEvents();
}

function renderCartLineItem(item) {
  const title =
    typeof item.title === "string"
      ? item.title
      : getLabel(item.title.en, item.title.ar);
  const variants = [item.color, item.size].filter(Boolean).join(" · ");

  return `
    <div class="cart-line-item d-flex gap-3 align-items-center py-3 border-bottom"
         data-product-id="${item.productId}"
         data-color="${item.color || ""}"
         data-size="${item.size || ""}">
      <img src="${item.img}" alt="${title}" class="checkout-item-img">
      <div class="flex-grow-1 min-width-0">
        <div class="fw-semibold text-truncate">${title}</div>
        ${variants ? `<div class="small text-muted">${variants}</div>` : ""}
        <div class="small text-muted">${formatEGP(item.price)} ${getLabel("each", "للقطعة")}</div>
      </div>
      <div class="qty-stepper d-flex align-items-center gap-2">
        <button type="button" class="qty-btn" data-qty-action="decrease" aria-label="${getLabel("Decrease quantity", "تقليل الكمية")}">−</button>
        <span class="qty-value">${item.qty}</span>
        <button type="button" class="qty-btn" data-qty-action="increase" aria-label="${getLabel("Increase quantity", "زيادة الكمية")}">+</button>
      </div>
      <div class="fw-semibold text-nowrap" style="min-width:5rem; text-align:end;">${formatEGP(item.price * item.qty)}</div>
      <button type="button" class="btn btn-sm btn-link text-danger" data-cart-remove aria-label="${getLabel("Remove item", "إزالة المنتج")}">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
}

/* Delegated qty-stepper / remove handling, scoped to #cartPageContent
   so it never fires for unrelated [data-product-id] elements elsewhere
   (e.g. product grid cards) */
function bindCartPageEvents() {
  if (cartPageEventsBound) return;
  cartPageEventsBound = true;

  document.addEventListener("click", (e) => {
    const row = e.target.closest("[data-product-id]");
    if (!row || !row.closest("#cartPageContent")) return;

    const productId = row.dataset.productId;
    const color = row.dataset.color || null;
    const size = row.dataset.size || null;

    const qtyBtn = e.target.closest("[data-qty-action]");
    if (qtyBtn) {
      const currentItem = appState.cart.find(
        (i) =>
          i.productId === productId && i.color === color && i.size === size,
      );
      if (!currentItem) return;
      const newQty =
        qtyBtn.dataset.qtyAction === "increase"
          ? currentItem.qty + 1
          : currentItem.qty - 1;
      updateCartItemQty(productId, color, size, newQty);
      loadCartPage();
      return;
    }

    if (e.target.closest("[data-cart-remove]")) {
      removeFromCart(productId, color, size);
      loadCartPage();
      return;
    }
  });
}

/* ============================================================
   PROFILE PAGE
   ============================================================
   Route-guarded: redirects to Login if nobody is signed in.
   Tabs: Overview (editable account info) + Order History (orders
   from ORDER STORAGE, filtered to the signed-in user's email).
   ============================================================ */
function goToProfileTab(tab) {
  appState.pendingProfileTab = tab;
  setCurrentPage("profile");
}

function loadProfilePage() {
  const container = document.getElementById("profilePageContent");
  if (!container) return;

  if (!appState.user) {
    setCurrentPage("login");
    return;
  }

  const activeTab = appState.pendingProfileTab || "overview";
  appState.pendingProfileTab = null;

  const justSaved = appState.profileJustSaved;
  appState.profileJustSaved = false;

  const user = appState.user;
  const initials =
    (user.name || "")
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const myOrders = getOrders().filter(
    (o) =>
      o.email &&
      user.email &&
      o.email.toLowerCase() === user.email.toLowerCase(),
  );

  const ordersHtml =
    myOrders.length === 0
      ? `
      <div class="text-center py-5">
        <i class="fas fa-box-open text-muted" style="font-size:2.5rem;"></i>
        <p class="text-muted mt-3 mb-3">${getLabel("You haven't placed any orders yet.", "لم تقم بأي طلبات حتى الآن.")}</p>
        <button type="button" class="btn btn-primary px-4" data-nav-page-id="products">${getLabel("Browse Products", "تصفح المنتجات")}</button>
      </div>
    `
      : myOrders
          .map(
            (order) => `
        <div class="order-history-card border rounded-3 p-3 mb-3">
          <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
            <div>
              <div class="fw-semibold" dir="ltr">${order.id}</div>
              <div class="small text-muted">${new Date(order.date).toLocaleDateString()}</div>
            </div>
            ${orderStatusBadge(order.status)}
          </div>
          <div class="small text-muted mb-2">${(order.items || []).length} ${getLabel("item(s)", "منتج")}</div>
          <div class="fw-bold text-primary">${formatEGP(order.total)}</div>
        </div>
      `,
          )
          .join("");

  container.innerHTML = `
    ${createBanner(getLabel("My Profile", "ملفي الشخصي"))}
    <div class="container-fluid py-5 bg-light">
      <div class="container">
        <div class="row g-4">

          <!-- Sidebar -->
          <div class="col-lg-3">
            <div class="bg-white rounded-3 p-4 text-center">
              <div class="profile-avatar mx-auto mb-3">${initials}</div>
              <h6 class="fw-bold mb-0">${user.name || getLabel("Customer", "عميل")}</h6>
              <div class="small text-muted text-break">${user.email}</div>
              ${user.role === "admin" ? `<span class="badge bg-secondary mt-2">${getLabel("Admin", "مسؤول")}</span>` : ""}
            </div>
          </div>

          <!-- Main -->
          <div class="col-lg-9">
            <div class="bg-white rounded-3 p-4">
              <ul class="nav nav-tabs profile-tabs mb-4">
                <li class="nav-item">
                  <button class="nav-link ${activeTab === "overview" ? "active" : ""}" data-profile-tab="overview">${getLabel("Overview", "نظرة عامة")}</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link ${activeTab === "orders" ? "active" : ""}" data-profile-tab="orders">${getLabel("Order History", "سجل الطلبات")}</button>
                </li>
              </ul>

              <div class="profile-tab-pane ${activeTab === "overview" ? "" : "d-none"}" data-profile-pane="overview">
                <form id="profileForm">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label small fw-semibold">${getLabel("Full Name", "الاسم الكامل")}</label>
                      <input type="text" class="form-control" id="profileName" value="${user.name || ""}">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small fw-semibold">${getLabel("Email", "البريد الإلكتروني")}</label>
                      <input type="email" class="form-control" id="profileEmail" value="${user.email || ""}" dir="ltr">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small fw-semibold">${getLabel("Phone Number", "رقم الهاتف")}</label>
                      <input type="tel" class="form-control" id="profilePhone" value="${user.phone || ""}" dir="ltr">
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary mt-4 px-4">${getLabel("Save Changes", "حفظ التغييرات")}</button>
                  <span class="small text-success ms-3 ${justSaved ? "" : "d-none"}" id="profileSavedMsg">${getLabel("Saved!", "تم الحفظ!")}</span>
                </form>
              </div>

              <div class="profile-tab-pane ${activeTab === "orders" ? "" : "d-none"}" data-profile-pane="orders">
                ${ordersHtml}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  bindProfilePageEvents(container);
}

// Shared by Profile order history + Admin orders table
function orderStatusBadge(status) {
  const s = ORDER_STATUSES.find((x) => x.key === status) || ORDER_STATUSES[0];
  return `<span class="badge ${s.badgeClass}">${getLabel(s.en, s.ar)}</span>`;
}

function bindProfilePageEvents(container) {
  container.querySelectorAll("[data-profile-tab]").forEach((btn) => {
    btn.addEventListener("click", function () {
      container
        .querySelectorAll("[data-profile-tab]")
        .forEach((b) => b.classList.remove("active"));
      container
        .querySelectorAll("[data-profile-pane]")
        .forEach((p) => p.classList.add("d-none"));
      this.classList.add("active");
      container
        .querySelector(`[data-profile-pane="${this.dataset.profileTab}"]`)
        .classList.remove("d-none");
    });
  });

  const savedMsg = document.getElementById("profileSavedMsg");
  if (savedMsg && !savedMsg.classList.contains("d-none")) {
    setTimeout(() => savedMsg.classList.add("d-none"), 2000);
  }

  const form = document.getElementById("profileForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      loginUser({
        ...appState.user,
        name: document.getElementById("profileName").value.trim(),
        email: document.getElementById("profileEmail").value.trim(),
        phone: document.getElementById("profilePhone").value.trim(),
      });
      appState.profileJustSaved = true;
      appState.pendingProfileTab = "overview";
      loadProfilePage();
    });
  }
}

/* ============================================================
   CMS: CONTENT MANAGEMENT (Admin Dashboard)
   ============================================================
   One generic table + modal-form engine reused across all 5
   manageable content types instead of five separate CRUD
   implementations — each type is just a config entry in
   CMS_TYPES (columns for the list view, fields for the form).

   Each type's live data is the same `let` array used everywhere
   else on the site (productsData, bannerSlides, newsItems,
   videoItems, projects), persisted via CONTENT STORE — so an
   edit here is immediately what every public page reads next
   time it renders.
   ============================================================ */

// Dotted-path get/set — lets form fields target nested values like
// "title.en" (products) as easily as flat ones like "titleEn" (news).
function getByPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

function setByPath(obj, path, value) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] == null) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

const CMS_TYPES = {
  products: {
    label: { en: "Products", ar: "المنتجات" },
    icon: "fas fa-box",
    idKey: "id",
    getAll: () => productsData,
    setAll: (arr) => {
      productsData = arr;
      saveContentStore("products", arr);
    },
    newItem: () => ({
      id: `product-${Date.now()}`,
      title: { en: "", ar: "" },
      desc: { en: "", ar: "" },
      sub_category: { en: "", ar: "" },
      price: 0,
      oldPrice: null,
      url: "/images/prd-1.webp",
      gallery: ["/images/prd-1.webp"],
      categoryId: categoriesData[0]?.categoryId || "",
      subCategoryId: null,
      colors: [],
      sizes: [],
      specGroups: [],
      stockQty: 20,
      rating: 0,
      reviewCount: 0,
    }),
    columns: [
      {
        label: { en: "Image", ar: "الصورة" },
        render: (p) => `<img src="${p.url}" class="cms-thumb" alt="">`,
      },
      {
        label: { en: "Title", ar: "الاسم" },
        render: (p) => getLabel(p.title?.en, p.title?.ar) || "—",
      },
      {
        label: { en: "Category", ar: "الفئة" },
        render: (p) => p.categoryId || "—",
      },
      {
        label: { en: "Price", ar: "السعر" },
        render: (p) => formatEGP(p.price || 0),
      },
      {
        label: { en: "Stock", ar: "المخزون" },
        render: (p) => p.stockQty ?? "—",
      },
    ],
    fields: [
      {
        key: "title.en",
        label: { en: "Title (English)", ar: "الاسم (إنجليزي)" },
        type: "text",
        required: true,
      },
      {
        key: "title.ar",
        label: { en: "Title (Arabic)", ar: "الاسم (عربي)" },
        type: "text",
        required: true,
      },
      {
        key: "desc.en",
        label: { en: "Description (English)", ar: "الوصف (إنجليزي)" },
        type: "textarea",
      },
      {
        key: "desc.ar",
        label: { en: "Description (Arabic)", ar: "الوصف (عربي)" },
        type: "textarea",
      },
      {
        key: "price",
        label: { en: "Price (EGP)", ar: "السعر" },
        type: "number",
        required: true,
      },
      {
        key: "oldPrice",
        label: {
          en: "Old Price (EGP, optional)",
          ar: "السعر القديم (اختياري)",
        },
        type: "number",
      },
      {
        key: "categoryId",
        label: { en: "Category", ar: "الفئة" },
        type: "select",
        options: () =>
          categoriesData.map((c) => ({
            value: c.categoryId,
            label: getLabel(c.name.en, c.name.ar),
          })),
      },
      {
        key: "stockQty",
        label: { en: "Stock Quantity", ar: "الكمية بالمخزون" },
        type: "number",
      },
      {
        key: "url",
        label: { en: "Image", ar: "الصورة" },
        type: "image",
        required: true,
      },
    ],
  },

  banner: {
    label: { en: "Home Banner", ar: "بانر الرئيسية" },
    icon: "fas fa-images",
    idKey: "id",
    getAll: () => bannerSlides,
    setAll: (arr) => {
      bannerSlides = arr;
      saveContentStore("bannerSlides", arr);
    },
    // Unlike News/Videos/Machinery, the home page banner is built once
    // at app boot and doesn't re-render on navigation — so without this,
    // a CMS edit wouldn't show up until a full page reload.
    afterChange: () => {
      if (typeof initializeSlider === "function") initializeSlider();
    },
    newItem: () => ({
      id: `slide-${Date.now()}`,
      titleEn: "",
      titleAr: "",
      subTitleEn: "",
      subTitleAr: "",
      textEn: "",
      textAr: "",
      url: "/images/b-1.webp",
      cta: "",
      path: "/",
    }),
    columns: [
      {
        label: { en: "Image", ar: "الصورة" },
        render: (s) => `<img src="${s.url}" class="cms-thumb" alt="">`,
      },
      {
        label: { en: "Title", ar: "العنوان" },
        render: (s) => getLabel(s.titleEn, s.titleAr) || "—",
      },
      {
        label: { en: "Subtitle", ar: "العنوان الفرعي" },
        render: (s) => getLabel(s.subTitleEn, s.subTitleAr) || "—",
      },
    ],
    fields: [
      {
        key: "titleEn",
        label: { en: "Title (English)", ar: "العنوان (إنجليزي)" },
        type: "text",
      },
      {
        key: "titleAr",
        label: { en: "Title (Arabic)", ar: "العنوان (عربي)" },
        type: "text",
      },
      {
        key: "subTitleEn",
        label: { en: "Subtitle (English)", ar: "العنوان الفرعي (إنجليزي)" },
        type: "text",
      },
      {
        key: "subTitleAr",
        label: { en: "Subtitle (Arabic)", ar: "العنوان الفرعي (عربي)" },
        type: "text",
      },
      {
        key: "textEn",
        label: { en: "Body Text (English)", ar: "النص (إنجليزي)" },
        type: "textarea",
      },
      {
        key: "textAr",
        label: { en: "Body Text (Arabic)", ar: "النص (عربي)" },
        type: "textarea",
      },
      {
        key: "cta",
        label: { en: "Button Label", ar: "نص الزر" },
        type: "text",
      },
      {
        key: "url",
        label: { en: "Image", ar: "الصورة" },
        type: "image",
        required: true,
      },
    ],
  },

  news: {
    label: { en: "News", ar: "الأخبار" },
    icon: "fas fa-newspaper",
    idKey: "id",
    getAll: () => newsItems,
    setAll: (arr) => {
      newsItems = arr;
      saveContentStore("newsItems", arr);
    },
    newItem: () => {
      const now = new Date();
      return {
        id: `news-${Date.now()}`,
        img: "/images/news-1.webp",
        dateRaw: now.toISOString().slice(0, 10),
        dateEn: now.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        dateAr: now.toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        titleEn: "",
        titleAr: "",
        excerptEn: "",
        excerptAr: "",
      };
    },
    columns: [
      {
        label: { en: "Image", ar: "الصورة" },
        render: (n) => `<img src="${n.img}" class="cms-thumb" alt="">`,
      },
      {
        label: { en: "Title", ar: "العنوان" },
        render: (n) => getLabel(n.titleEn, n.titleAr) || "—",
      },
      {
        label: { en: "Date", ar: "التاريخ" },
        render: (n) => getLabel(n.dateEn, n.dateAr),
      },
    ],
    fields: [
      {
        key: "titleEn",
        label: { en: "Title (English)", ar: "العنوان (إنجليزي)" },
        type: "text",
        required: true,
      },
      {
        key: "titleAr",
        label: { en: "Title (Arabic)", ar: "العنوان (عربي)" },
        type: "text",
        required: true,
      },
      {
        key: "excerptEn",
        label: { en: "Excerpt (English)", ar: "الملخص (إنجليزي)" },
        type: "textarea",
      },
      {
        key: "excerptAr",
        label: { en: "Excerpt (Arabic)", ar: "الملخص (عربي)" },
        type: "textarea",
      },
      {
        key: "dateRaw",
        label: { en: "Date", ar: "التاريخ" },
        type: "date",
        required: true,
      },
      { key: "img", label: { en: "Image", ar: "الصورة" }, type: "image" },
    ],
    // Keep dateEn/dateAr in sync with dateRaw on save — the public News
    // page displays the formatted labels, not the raw ISO date.
    beforeSave: (item) => {
      const d = new Date(item.dateRaw);
      if (!isNaN(d)) {
        item.dateEn = d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        item.dateAr = d.toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    },
  },

  videos: {
    label: { en: "Videos", ar: "الفيديوهات" },
    icon: "fas fa-video",
    idKey: "id",
    getAll: () => videoItems,
    setAll: (arr) => {
      videoItems = arr;
      saveContentStore("videoItems", arr);
    },
    newItem: () => ({
      id: `video-${Date.now()}`,
      titleEn: "",
      titleAr: "",
      category: VIDEO_CATEGORIES[0].key,
      youtubeId: "",
    }),
    columns: [
      {
        label: { en: "Title", ar: "العنوان" },
        render: (v) => getLabel(v.titleEn, v.titleAr) || "—",
      },
      {
        label: { en: "Category", ar: "الفئة" },
        render: (v) => {
          const c = VIDEO_CATEGORIES.find((c) => c.key === v.category);
          return c ? getLabel(c.en, c.ar) : v.category;
        },
      },
      {
        label: { en: "YouTube ID", ar: "معرف يوتيوب" },
        render: (v) => v.youtubeId || "—",
      },
    ],
    fields: [
      {
        key: "titleEn",
        label: { en: "Title (English)", ar: "العنوان (إنجليزي)" },
        type: "text",
        required: true,
      },
      {
        key: "titleAr",
        label: { en: "Title (Arabic)", ar: "العنوان (عربي)" },
        type: "text",
        required: true,
      },
      {
        key: "category",
        label: { en: "Category", ar: "الفئة" },
        type: "select",
        options: () =>
          VIDEO_CATEGORIES.map((c) => ({
            value: c.key,
            label: getLabel(c.en, c.ar),
          })),
      },
      {
        key: "youtubeId",
        label: { en: "YouTube Video ID", ar: "معرف فيديو يوتيوب" },
        type: "text",
        required: true,
      },
    ],
  },

  machinery: {
    label: { en: "Machinery", ar: "الآلات" },
    icon: "fas fa-industry",
    idKey: "id",
    getAll: () => projects,
    setAll: (arr) => {
      projects = arr;
      saveContentStore("projects", arr);
    },
    newItem: () => ({
      id: `machine-${Date.now()}`,
      img: "/images/prj-1.webp",
      titleEn: "",
      titleAr: "",
      descEn: "",
      descAr: "",
    }),
    columns: [
      {
        label: { en: "Image", ar: "الصورة" },
        render: (p) => `<img src="${p.img}" class="cms-thumb" alt="">`,
      },
      {
        label: { en: "Title", ar: "العنوان" },
        render: (p) => getLabel(p.titleEn, p.titleAr) || "—",
      },
    ],
    fields: [
      {
        key: "titleEn",
        label: { en: "Title (English)", ar: "العنوان (إنجليزي)" },
        type: "text",
        required: true,
      },
      {
        key: "titleAr",
        label: { en: "Title (Arabic)", ar: "العنوان (عربي)" },
        type: "text",
        required: true,
      },
      {
        key: "descEn",
        label: { en: "Description (English)", ar: "الوصف (إنجليزي)" },
        type: "textarea",
      },
      {
        key: "descAr",
        label: { en: "Description (Arabic)", ar: "الوصف (عربي)" },
        type: "textarea",
      },
      {
        key: "img",
        label: { en: "Image", ar: "الصورة" },
        type: "image",
        required: true,
      },
    ],
  },
};

/* ============================================================
   ADMIN: MILITARY ACCESS SECTION
   ============================================================
   Lets an admin issue OTP codes (15-min expiry, one-time use) for
   the military-access gate — see MILITARY ACCESS GATE above for the
   underlying storage/verify functions.
   ============================================================ */
function renderMilitaryOtpSection() {
  const container = document.getElementById("adminSectionBody");
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white rounded-3 p-4 mb-4">
      <h5 class="fw-bold mb-3">${getLabel("Issue Access Code", "إصدار رمز وصول")}</h5>
      <p class="text-muted small mb-3">
        ${getLabel(
          "Generate a one-time code for a verified military/corporate contact. It expires in 15 minutes and can only be used once — relay it directly to the recipient (phone/email), not over any public channel.",
          "أصدر رمزاً مؤقتاً لجهة اتصال عسكرية/مؤسسية موثقة. ينتهي خلال 15 دقيقة ويُستخدم مرة واحدة فقط — أرسله مباشرة إلى المستلم (هاتف/بريد إلكتروني) وليس عبر أي قناة عامة.",
        )}
      </p>
      <form id="militaryOtpGenerateForm" class="row g-2 align-items-end" novalidate>
        <div class="col-md-4">
          <label class="form-label small fw-semibold">${getLabel("Recipient Name", "اسم المستلم")}</label>
          <input type="text" class="form-control" id="motpRecipientName" required>
        </div>
        <div class="col-md-4">
          <label class="form-label small fw-semibold">${getLabel("Phone or Email", "الهاتف أو البريد الإلكتروني")}</label>
          <input type="text" class="form-control" id="motpRecipientContact" required>
        </div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-primary w-100">
            <i class="fas fa-key me-1"></i> ${getLabel("Generate Code", "إصدار رمز")}
          </button>
        </div>
      </form>
      <div id="motpGeneratedNotice" class="mt-3"></div>
    </div>

    <div class="bg-white rounded-3 p-4">
      <h5 class="fw-bold mb-3">${getLabel("Issued Codes", "الرموز الصادرة")}</h5>
      <div class="table-responsive">
        <table class="table align-middle admin-orders-table">
          <thead>
            <tr>
              <th>${getLabel("Recipient", "المستلم")}</th>
              <th>${getLabel("Code", "الرمز")}</th>
              <th>${getLabel("Status", "الحالة")}</th>
              <th>${getLabel("Issued", "تاريخ الإصدار")}</th>
              <th>${getLabel("Expires", "تاريخ الانتهاء")}</th>
              <th class="text-end">${getLabel("Actions", "إجراءات")}</th>
            </tr>
          </thead>
          <tbody id="motpCodesTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  renderMilitaryOtpTable();
  bindMilitaryOtpFormEvents();
}

function renderMilitaryOtpTable() {
  const tbody = document.getElementById("motpCodesTableBody");
  if (!tbody) return;

  const statusBadge = {
    active: `<span class="badge bg-success">${getLabel("Active", "نشط")}</span>`,
    used: `<span class="badge bg-secondary">${getLabel("Used", "مستخدم")}</span>`,
    expired: `<span class="badge bg-warning text-dark">${getLabel("Expired", "منتهي")}</span>`,
    revoked: `<span class="badge bg-danger">${getLabel("Revoked", "ملغى")}</span>`,
  };

  const codes = getMilitaryOtpCodes()
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt);

  tbody.innerHTML =
    codes.length === 0
      ? `<tr><td colspan="6" class="text-center text-muted py-5">${getLabel("No codes issued yet.", "لم يتم إصدار أي رموز بعد.")}</td></tr>`
      : codes
          .map((c) => {
            const status = militaryOtpStatus(c);
            return `
        <tr>
          <td>
            <div class="fw-semibold">${c.recipientName || "-"}</div>
            <div class="small text-muted">${c.recipientContact || ""}</div>
          </td>
          <td><code class="fs-6">${c.code}</code></td>
          <td>${statusBadge[status]}</td>
          <td class="small text-muted">${new Date(c.createdAt).toLocaleString()}</td>
          <td class="small text-muted">${new Date(c.expiresAt).toLocaleString()}</td>
          <td class="text-end">
            ${
              status === "active"
                ? `<button type="button" class="btn btn-sm btn-outline-danger military-revoke-btn" data-otp-id="${c.id}">
                     ${getLabel("Revoke", "إلغاء")}
                   </button>`
                : ""
            }
          </td>
        </tr>
      `;
          })
          .join("");

  tbody.querySelectorAll(".military-revoke-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      revokeMilitaryOtpCode(this.dataset.otpId);
      renderMilitaryOtpTable();
    });
  });
}

function bindMilitaryOtpFormEvents() {
  const form = document.getElementById("militaryOtpGenerateForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.getElementById("motpRecipientName");
    const contactInput = document.getElementById("motpRecipientContact");
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    if (!name || !contact) return;

    const record = generateMilitaryOtpCode(name, contact);

    document.getElementById("motpGeneratedNotice").innerHTML = `
      <div class="alert alert-success d-flex justify-content-between align-items-center mb-0">
        <span>
          ${getLabel("Code for", "رمز لـ")} <strong>${name}</strong>:
          <code class="fs-5 ms-2">${record.code}</code>
          <span class="d-block small">${getLabel("Expires in 15 minutes and can only be used once. Relay it now — it will not be shown again.", "ينتهي خلال 15 دقيقة ويُستخدم مرة واحدة. أرسله الآن — لن يظهر مرة أخرى.")}</span>
        </span>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="motpCopyBtn" data-code="${record.code}">
          <i class="fas fa-copy"></i> <span class="motp-copy-label">${getLabel("Copy", "نسخ")}</span>
        </button>
      </div>
    `;
    const copyBtn = document.getElementById("motpCopyBtn");
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(this.dataset.code);

      const icon = this.querySelector("i");
      const label = this.querySelector(".motp-copy-label");
      this.classList.remove("btn-outline-secondary");
      this.classList.add("btn-success");
      icon.className = "fas fa-check";
      label.textContent = getLabel("Copied", "تم النسخ");

      clearTimeout(this._motpResetTimer);
      this._motpResetTimer = setTimeout(() => {
        this.classList.remove("btn-success");
        this.classList.add("btn-outline-secondary");
        icon.className = "fas fa-copy";
        label.textContent = getLabel("Copy", "نسخ");
      }, 1500);
    });

    nameInput.value = "";
    contactInput.value = "";
    renderMilitaryOtpTable();
  });
}

let cmsActiveType = null;
let cmsEditingId = null;

function renderCmsSection(typeKey) {
  const type = CMS_TYPES[typeKey];
  const container = document.getElementById("adminSectionBody");
  if (!container || !type) return;

  const items = type.getAll();

  const rowsHtml =
    items.length === 0
      ? `<tr><td colspan="${type.columns.length + 1}" class="text-center text-muted py-5">${getLabel("No items yet.", "لا توجد عناصر بعد.")}</td></tr>`
      : items
          .map(
            (item) => `
        <tr>
          ${type.columns.map((col) => `<td>${col.render(item)}</td>`).join("")}
          <td class="text-end text-nowrap">
            <button type="button" class="btn btn-sm btn-outline-secondary cms-edit-btn" data-cms-type="${typeKey}" data-cms-id="${item[type.idKey]}" aria-label="${getLabel("Edit", "تعديل")}">
              <i class="fas fa-pen"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger cms-delete-btn" data-cms-type="${typeKey}" data-cms-id="${item[type.idKey]}" aria-label="${getLabel("Delete", "حذف")}">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `,
          )
          .join("");

  container.innerHTML = `
    <div class="bg-white rounded-3 p-4">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h5 class="fw-bold mb-0">${getLabel(type.label.en, type.label.ar)}</h5>
        <button type="button" class="btn btn-primary btn-sm cms-add-btn" data-cms-type="${typeKey}">
          <i class="fas fa-plus me-1"></i> ${getLabel("Add New", "إضافة جديد")}
        </button>
      </div>
      <div class="table-responsive">
        <table class="table align-middle admin-orders-table">
          <thead>
            <tr>
              ${type.columns.map((col) => `<th>${getLabel(col.label.en, col.label.ar)}</th>`).join("")}
              <th class="text-end">${getLabel("Actions", "إجراءات")}</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </div>
  `;

  bindCmsListEvents(container);
}

function bindCmsListEvents(container) {
  container.querySelectorAll(".cms-add-btn").forEach((btn) => {
    btn.addEventListener("click", () => openCmsForm(btn.dataset.cmsType, null));
  });
  container.querySelectorAll(".cms-edit-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      openCmsForm(btn.dataset.cmsType, btn.dataset.cmsId),
    );
  });
  container.querySelectorAll(".cms-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      deleteCmsItem(btn.dataset.cmsType, btn.dataset.cmsId),
    );
  });
}

function deleteCmsItem(typeKey, itemId) {
  const type = CMS_TYPES[typeKey];
  const confirmed = confirm(
    getLabel(
      "Delete this item? This cannot be undone.",
      "هل تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.",
    ),
  );
  if (!confirmed) return;

  type.setAll(type.getAll().filter((i) => i[type.idKey] !== itemId));
  if (type.afterChange) type.afterChange();
  renderCmsSection(typeKey);
}

function cmsFieldInputHtml(field, item) {
  const value = getByPath(item, field.key) ?? "";
  const label = getLabel(field.label.en, field.label.ar);
  const requiredAttr = field.required ? "required" : "";

  let inputHtml;
  if (field.type === "textarea") {
    inputHtml = `<textarea class="form-control" data-cms-field="${field.key}" rows="3" ${requiredAttr}>${value}</textarea>`;
  } else if (field.type === "select") {
    const options = field.options();
    inputHtml = `
      <select class="form-select" data-cms-field="${field.key}" ${requiredAttr}>
        ${options.map((o) => `<option value="${o.value}" ${String(o.value) === String(value) ? "selected" : ""}>${o.label}</option>`).join("")}
      </select>`;
  } else if (field.type === "image") {
    inputHtml = `
      <div class="cms-image-field">
        <img src="${value || "/images/prd-1.webp"}" class="cms-image-preview mb-2" data-cms-image-preview alt="">
        <input type="text" class="form-control mb-2" data-cms-field="${field.key}" value="${value}" placeholder="/images/example.webp" ${requiredAttr}>
        <input type="file" class="form-control form-control-sm" accept="image/*" data-cms-image-file>
      </div>`;
  } else if (field.type === "date") {
    inputHtml = `<input type="date" class="form-control" data-cms-field="${field.key}" value="${value}" ${requiredAttr}>`;
  } else if (field.type === "number") {
    inputHtml = `<input type="number" class="form-control" data-cms-field="${field.key}" value="${value}" ${requiredAttr}>`;
  } else {
    inputHtml = `<input type="text" class="form-control" data-cms-field="${field.key}" value="${value}" ${requiredAttr}>`;
  }

  return `
    <div class="mb-3">
      <label class="form-label small fw-semibold">${label}${field.required ? " *" : ""}</label>
      ${inputHtml}
    </div>
  `;
}

function openCmsForm(typeKey, itemId) {
  const type = CMS_TYPES[typeKey];
  const items = type.getAll();
  const isEdit = itemId != null;
  const item = isEdit
    ? items.find((i) => String(i[type.idKey]) === String(itemId))
    : type.newItem();
  if (!item) return;

  cmsActiveType = typeKey;
  cmsEditingId = isEdit ? itemId : null;

  document.getElementById("modalTitle").textContent = isEdit
    ? getLabel(`Edit ${type.label.en}`, `تعديل ${type.label.ar}`)
    : getLabel(`Add ${type.label.en}`, `إضافة ${type.label.ar}`);

  document.getElementById("modalBody").innerHTML = `
    <form id="cmsForm">
      ${type.fields.map((f) => cmsFieldInputHtml(f, item)).join("")}
      <div class="d-flex gap-2 justify-content-end mt-4">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">${getLabel("Cancel", "إلغاء")}</button>
        <button type="submit" class="btn btn-primary">${getLabel("Save", "حفظ")}</button>
      </div>
    </form>
  `;

  bindCmsFormEvents(item);

  new bootstrap.Modal(document.getElementById("overlayModal")).show();
}

function bindCmsFormEvents(item) {
  const modalBody = document.getElementById("modalBody");

  modalBody.querySelectorAll("[data-cms-image-file]").forEach((fileInput) => {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const wrapper = fileInput.closest(".cms-image-field");
        const textInput = wrapper.querySelector("[data-cms-field]");
        const preview = wrapper.querySelector("[data-cms-image-preview]");
        textInput.value = reader.result;
        preview.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  });

  document.getElementById("cmsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    saveCmsForm(item);
  });
}

function saveCmsForm(originalItem) {
  const type = CMS_TYPES[cmsActiveType];
  const modalBody = document.getElementById("modalBody");

  let valid = true;
  modalBody.querySelectorAll("[data-cms-field][required]").forEach((el) => {
    if (!el.value.trim()) {
      el.classList.add("is-invalid");
      valid = false;
    } else {
      el.classList.remove("is-invalid");
    }
  });
  if (!valid) return;

  const updated = { ...originalItem };
  modalBody.querySelectorAll("[data-cms-field]").forEach((el) => {
    let value = el.value;
    if (el.type === "number") value = value === "" ? null : Number(value);
    setByPath(updated, el.dataset.cmsField, value);
  });

  if (type.beforeSave) type.beforeSave(updated);

  const items = type.getAll();
  if (cmsEditingId != null) {
    const idx = items.findIndex(
      (i) => String(i[type.idKey]) === String(cmsEditingId),
    );
    if (idx !== -1) items[idx] = updated;
  } else {
    items.push(updated);
  }
  type.setAll(items);
  if (type.afterChange) type.afterChange();

  const modalInstance = bootstrap.Modal.getInstance(
    document.getElementById("overlayModal"),
  );
  if (modalInstance) modalInstance.hide();

  renderCmsSection(cmsActiveType);
}

/* ============================================================
   ADMIN DASHBOARD
   ============================================================
   Route-guarded: redirects to Login if signed out, or Home if
   signed in without the "admin" role (see DEMO_ADMIN_EMAIL above
   for how to reach it). Reads the same ORDER STORAGE as Profile.

   Financial analytics: every KPI + chart reacts to the 7D/30D/All
   period switcher. KPIs compare against the PRIOR equal-length
   period (e.g. this week vs last week) — the standard pattern in
   Stripe/analytics-style dashboards. "All" has no prior window to
   compare against, so its KPIs show no trend arrow.
   ============================================================ */
const ADMIN_PERIOD_DAYS = { "7d": 7, "30d": 30, all: null };
let adminPeriod = "7d";

// Orders whose `date` falls in the window ending `windowsAgo` periods back.
// days === null means "all time" (only meaningful for windowsAgo 0).
function ordersInWindow(orders, days, windowsAgo = 0) {
  if (days == null) return windowsAgo === 0 ? orders : [];
  const dayMs = 86400000;
  const end = Date.now() - windowsAgo * days * dayMs;
  const start = end - days * dayMs;
  return orders.filter((o) => {
    const t = new Date(o.date).getTime();
    return t > start && t <= end;
  });
}

function sumRevenue(orders) {
  return orders.reduce((sum, o) => sum + (o.total || 0), 0);
}

function countCustomers(orders) {
  return new Set(
    orders.map((o) => (o.email || "").toLowerCase()).filter(Boolean),
  ).size;
}

// % change of current vs previous — null when there's nothing to compare against
function computeTrendPct(current, previous, hasPreviousWindow) {
  if (!hasPreviousWindow) return null;
  if (previous === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - previous) / previous) * 100);
}

// Daily revenue buckets for the last `days` days, oldest first
function groupRevenueByDay(orders, days) {
  const buckets = new Map();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }

  orders.forEach((o) => {
    const key = new Date(o.date).toISOString().slice(0, 10);
    if (buckets.has(key)) buckets.set(key, buckets.get(key) + (o.total || 0));
  });

  return {
    labels: [...buckets.keys()].map((k) =>
      new Date(k).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
    ),
    values: [...buckets.values()],
  };
}

function topProductsFromOrders(orders, limit = 5) {
  const totals = new Map();
  orders.forEach((o) => {
    (o.items || []).forEach((item) => {
      const title =
        typeof item.title === "string"
          ? item.title
          : getLabel(item.title.en, item.title.ar);
      totals.set(
        title,
        (totals.get(title) || 0) + (item.price || 0) * (item.qty || 0),
      );
    });
  });
  return [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function adminKpiCardHtml(icon, label, value, trendPct) {
  const trendHtml =
    trendPct === null
      ? `<span class="admin-kpi-trend text-muted">${getLabel("All time", "كل الوقت")}</span>`
      : `<span class="admin-kpi-trend ${trendPct >= 0 ? "text-success" : "text-danger"}">
           <i class="fas fa-arrow-${trendPct >= 0 ? "up" : "down"}"></i> ${Math.abs(trendPct)}%
         </span>
         <span class="text-muted small"> ${getLabel("vs prior period", "مقارنة بالفترة السابقة")}</span>`;

  return `
    <div class="col-6 col-lg-3">
      <div class="admin-kpi-card bg-white rounded-3 p-4">
        <div class="admin-kpi-icon mb-2"><i class="${icon}"></i></div>
        <div class="fs-4 fw-bold">${value}</div>
        <div class="small text-muted mb-2">${label}</div>
        <div class="admin-kpi-trend-row">${trendHtml}</div>
      </div>
    </div>
  `;
}

/* ---------- Orders table: status filter, column sort, urgency ----------
   Urgency is derived purely from "days since order date" vs current
   status (there's no per-status timestamp history in this demo), so
   it's a proxy for "how long has this been sitting" rather than a
   real SLA breach — good enough to spot what needs attention first. */
let adminStatusFilter = "all";
let adminSortKey = "date";
let adminSortDir = "desc"; // "asc" | "desc"

const URGENCY_RANK = { late: 3, duesoon: 2, ontrack: 1, done: 0 };
const URGENCY_LABELS = {
  done: {
    en: "Delivered",
    ar: "تم التوصيل",
    badgeClass: "bg-light text-muted",
  },
  ontrack: { en: "On Track", ar: "في الموعد", badgeClass: "bg-success" },
  duesoon: { en: "Due Soon", ar: "قريباً", badgeClass: "bg-warning text-dark" },
  late: { en: "Late", ar: "متأخر", badgeClass: "bg-danger" },
};

// Hour-level granularity — day-level made every order placed in the last
// 24h show "0d" regardless of whether it was 5 minutes or 23 hours old,
// which made the priority column look frozen for anything recent.
function getOrderUrgency(order) {
  const hours = Math.floor(
    (Date.now() - new Date(order.date).getTime()) / 3600000,
  );
  if (order.status === "delivered") return { level: "done", hours };
  if (hours >= 72) return { level: "late", hours };
  if (hours >= 24) return { level: "duesoon", hours };
  return { level: "ontrack", hours };
}

// "Just now" / "2h" for anything under a day, "3d" once it's been a while
function formatElapsed(hours) {
  if (hours < 1) return getLabel("Just now", "الآن");
  if (hours < 24) return getLabel(`${hours}h`, `${hours} س`);
  return getLabel(
    `${Math.floor(hours / 24)}d`,
    `${Math.floor(hours / 24)} يوم`,
  );
}

function orderUrgencyBadge(order) {
  const { level, hours } = getOrderUrgency(order);
  const u = URGENCY_LABELS[level];
  const elapsedLabel = level === "done" ? "" : ` · ${formatElapsed(hours)}`;
  return `<span class="badge ${u.badgeClass}">${getLabel(u.en, u.ar)}${elapsedLabel}</span>`;
}

function sortOrders(orders, key, dir) {
  const factor = dir === "asc" ? 1 : -1;
  return [...orders].sort((a, b) => {
    let av, bv;
    if (key === "total") {
      av = a.total || 0;
      bv = b.total || 0;
    } else if (key === "status") {
      av = ORDER_STATUSES.findIndex((s) => s.key === a.status);
      bv = ORDER_STATUSES.findIndex((s) => s.key === b.status);
    } else if (key === "priority") {
      const ua = getOrderUrgency(a);
      const ub = getOrderUrgency(b);
      av = URGENCY_RANK[ua.level] * 100000 + ua.hours;
      bv = URGENCY_RANK[ub.level] * 100000 + ub.hours;
    } else {
      av = new Date(a.date).getTime();
      bv = new Date(b.date).getTime();
    }
    return (av - bv) * factor;
  });
}

function adminSortIconHtml(key) {
  if (adminSortKey !== key)
    return '<i class="fas fa-sort text-muted opacity-50 small"></i>';
  return adminSortDir === "asc"
    ? '<i class="fas fa-sort-up small"></i>'
    : '<i class="fas fa-sort-down small"></i>';
}

const ADMIN_SECTIONS = [
  {
    key: "overview",
    en: "Overview",
    ar: "نظرة عامة",
    icon: "fas fa-chart-line",
  },
  { key: "products", en: "Products", ar: "المنتجات", icon: "fas fa-box" },
  {
    key: "banner",
    en: "Home Banner",
    ar: "بانر الرئيسية",
    icon: "fas fa-images",
  },
  { key: "news", en: "News", ar: "الأخبار", icon: "fas fa-newspaper" },
  { key: "videos", en: "Videos", ar: "الفيديوهات", icon: "fas fa-video" },
  { key: "machinery", en: "Machinery", ar: "الآلات", icon: "fas fa-industry" },
  {
    key: "military-otp",
    en: "Military Access",
    ar: "الوصول العسكري",
    icon: "fas fa-shield-halved",
  },
];
let adminSection = "overview";

function loadAdminPage() {
  const container = document.getElementById("adminPageContent");
  if (!container) return;

  if (!appState.user) {
    setCurrentPage("login");
    return;
  }
  if (appState.user.role !== "admin") {
    setCurrentPage("home");
    return;
  }

  const sectionTabsHtml = ADMIN_SECTIONS.map(
    (s) => `
      <button type="button" class="admin-section-tab ${adminSection === s.key ? "active" : ""}" data-admin-section="${s.key}">
        <i class="${s.icon} me-1"></i> ${getLabel(s.en, s.ar)}
      </button>
    `,
  ).join("");

  container.innerHTML = `
    ${createBanner(getLabel("Admin Dashboard", "لوحة التحكم"))}
    <div class="container-fluid py-5 bg-light">
      <div class="container">
        <div class="admin-section-tabs mb-4">${sectionTabsHtml}</div>
        <div id="adminSectionBody"></div>
      </div>
    </div>
  `;

  if (adminSection === "overview") {
    renderAdminOverview();
  } else if (adminSection === "military-otp") {
    renderMilitaryOtpSection();
  } else {
    renderCmsSection(adminSection);
  }

  bindAdminPageEvents();
}

function renderAdminOverview() {
  const container = document.getElementById("adminSectionBody");
  if (!container) return;

  const allOrders = getOrders();
  const days = ADMIN_PERIOD_DAYS[adminPeriod];
  const hasPreviousWindow = days != null;

  const periodOrders = ordersInWindow(allOrders, days, 0);
  const prevPeriodOrders = ordersInWindow(allOrders, days, 1);

  const revenue = sumRevenue(periodOrders);
  const prevRevenue = sumRevenue(prevPeriodOrders);
  const aov = periodOrders.length ? revenue / periodOrders.length : 0;
  const prevAov = prevPeriodOrders.length
    ? prevRevenue / prevPeriodOrders.length
    : 0;
  const customers = countCustomers(periodOrders);
  const prevCustomers = countCustomers(prevPeriodOrders);

  const kpiHtml = [
    adminKpiCardHtml(
      "fas fa-sack-dollar",
      getLabel("Revenue", "الإيرادات"),
      formatEGP(revenue),
      computeTrendPct(revenue, prevRevenue, hasPreviousWindow),
    ),
    adminKpiCardHtml(
      "fas fa-receipt",
      getLabel("Orders", "الطلبات"),
      periodOrders.length,
      computeTrendPct(
        periodOrders.length,
        prevPeriodOrders.length,
        hasPreviousWindow,
      ),
    ),
    adminKpiCardHtml(
      "fas fa-chart-simple",
      getLabel("Avg. Order Value", "متوسط قيمة الطلب"),
      formatEGP(Math.round(aov)),
      computeTrendPct(aov, prevAov, hasPreviousWindow),
    ),
    adminKpiCardHtml(
      "fas fa-users",
      getLabel("Customers", "العملاء"),
      customers,
      computeTrendPct(customers, prevCustomers, hasPreviousWindow),
    ),
  ].join("");

  const periodButtonsHtml = [
    { key: "7d", en: "7D", ar: "٧ أيام" },
    { key: "30d", en: "30D", ar: "٣٠ يوماً" },
    { key: "all", en: "All", ar: "الكل" },
  ]
    .map(
      (p) => `
      <button type="button" class="filter-chip ${adminPeriod === p.key ? "active" : ""}" data-admin-period="${p.key}">
        ${getLabel(p.en, p.ar)}
      </button>
    `,
    )
    .join("");

  const statusFilterChipsHtml = [
    { key: "all", en: "All", ar: "الكل", count: allOrders.length },
    ...ORDER_STATUSES.map((s) => ({
      ...s,
      count: allOrders.filter((o) => o.status === s.key).length,
    })),
  ]
    .map(
      (s) => `
      <button type="button" class="filter-chip ${adminStatusFilter === s.key ? "active" : ""}" data-status-filter="${s.key}">
        ${getLabel(s.en, s.ar)} <span class="badge bg-light text-dark ms-1">${s.count}</span>
      </button>
    `,
    )
    .join("");

  const filteredOrders =
    adminStatusFilter === "all"
      ? allOrders
      : allOrders.filter((o) => o.status === adminStatusFilter);
  const tableOrders = sortOrders(filteredOrders, adminSortKey, adminSortDir);

  const ordersRowsHtml =
    tableOrders.length === 0
      ? `
      <tr>
        <td colspan="7" class="text-center text-muted py-5">
          ${getLabel("No orders in this status.", "لا توجد طلبات بهذه الحالة.")}
        </td>
      </tr>
    `
      : tableOrders
          .map(
            (order) => `
      <tr>
        <td dir="ltr" class="fw-semibold">${order.id}</td>
        <td>
          <div class="fw-semibold">${order.name || "-"}</div>
          <div class="small text-muted" dir="ltr">${order.phone || ""}</div>
        </td>
        <td>${new Date(order.date).toLocaleDateString()}</td>
        <td>${(order.items || []).length}</td>
        <td class="fw-semibold">${formatEGP(order.total)}</td>
        <td>${orderUrgencyBadge(order)}</td>
        <td>
          <select class="form-select form-select-sm admin-status-select" style="min-width:9rem;" data-order-id="${order.id}">
            ${ORDER_STATUSES.map(
              (s) =>
                `<option value="${s.key}" ${order.status === s.key ? "selected" : ""}>${getLabel(s.en, s.ar)}</option>`,
            ).join("")}
          </select>
        </td>
      </tr>
    `,
          )
          .join("");

  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
      <h4 class="fw-bold mb-0">${getLabel("Overview", "نظرة عامة")}</h4>
      <div class="d-flex gap-2" id="adminPeriodSelector">${periodButtonsHtml}</div>
    </div>

    <div class="row g-4 mb-4">
      ${kpiHtml}
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-7">
        <div class="bg-white rounded-3 p-4 h-100">
          <h6 class="fw-bold mb-3">${getLabel("Revenue Trend", "اتجاه الإيرادات")}</h6>
          <div class="admin-chart-wrap"><canvas id="revenueTrendChart"></canvas></div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="bg-white rounded-3 p-4 h-100">
          <h6 class="fw-bold mb-3">${getLabel("Orders by Status", "الطلبات حسب الحالة")}</h6>
          <div class="admin-chart-wrap admin-chart-wrap-sm"><canvas id="orderStatusChart"></canvas></div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-12">
        <div class="bg-white rounded-3 p-4">
          <h6 class="fw-bold mb-3">${getLabel("Top Products by Revenue", "أفضل المنتجات حسب الإيرادات")}</h6>
          <div class="admin-chart-wrap admin-chart-wrap-sm"><canvas id="topProductsChart"></canvas></div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-12">
        <div class="bg-white rounded-3 p-4">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h5 class="fw-bold mb-0">${getLabel("Orders", "الطلبات")}</h5>
            <div class="d-flex flex-wrap gap-2" id="adminStatusFilter">${statusFilterChipsHtml}</div>
          </div>
          <div class="table-responsive">
            <table class="table align-middle admin-orders-table">
              <thead>
                <tr>
                  <th>${getLabel("Order ID", "رقم الطلب")}</th>
                  <th>${getLabel("Customer", "العميل")}</th>
                  <th class="sortable-th" data-sort-key="date">${getLabel("Date", "التاريخ")} ${adminSortIconHtml("date")}</th>
                  <th>${getLabel("Items", "المنتجات")}</th>
                  <th class="sortable-th" data-sort-key="total">${getLabel("Total", "الإجمالي")} ${adminSortIconHtml("total")}</th>
                  <th class="sortable-th" data-sort-key="priority">${getLabel("Priority", "الأولوية")} ${adminSortIconHtml("priority")}</th>
                  <th class="sortable-th" data-sort-key="status">${getLabel("Status", "الحالة")} ${adminSortIconHtml("status")}</th>
                </tr>
              </thead>
              <tbody>
                ${ordersRowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  renderAdminCharts(allOrders, periodOrders, days);
}

/* ---------- Chart.js rendering — instances stored on window so
   re-renders (period switch, status change) destroy the old ones
   first instead of stacking duplicate charts on the same canvas ---------- */
function renderAdminCharts(allOrders, periodOrders, days) {
  if (typeof Chart === "undefined") return; // CDN blocked/offline — dashboard still works without charts

  window.adminCharts = window.adminCharts || {};
  Object.values(window.adminCharts).forEach((chart) => chart?.destroy());

  const chartDays = days || 30;
  const revenueSeries = groupRevenueByDay(allOrders, chartDays);

  window.adminCharts.revenue = new Chart(
    document.getElementById("revenueTrendChart"),
    {
      type: "line",
      data: {
        labels: revenueSeries.labels,
        datasets: [
          {
            label: getLabel("Revenue", "الإيرادات"),
            data: revenueSeries.values,
            borderColor: "#ff6600",
            backgroundColor: "rgba(255, 102, 0, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    },
  );

  window.adminCharts.status = new Chart(
    document.getElementById("orderStatusChart"),
    {
      type: "doughnut",
      data: {
        labels: ORDER_STATUSES.map((s) => getLabel(s.en, s.ar)),
        datasets: [
          {
            data: ORDER_STATUSES.map(
              (s) => periodOrders.filter((o) => o.status === s.key).length,
            ),
            backgroundColor: ["#ffc107", "#0dcaf0", "#0d6efd", "#198754"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
      },
    },
  );

  const topProducts = topProductsFromOrders(periodOrders, 5);
  window.adminCharts.topProducts = new Chart(
    document.getElementById("topProductsChart"),
    {
      type: "bar",
      data: {
        labels: topProducts.map(([name]) => name),
        datasets: [
          {
            label: getLabel("Revenue", "الإيرادات"),
            data: topProducts.map(([, revenue]) => revenue),
            backgroundColor: "#003049",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } },
      },
    },
  );
}

function bindAdminPageEvents() {
  const container = document.getElementById("adminPageContent");

  container.querySelectorAll(".admin-status-select").forEach((select) => {
    select.addEventListener("change", function () {
      updateOrderStatus(this.dataset.orderId, this.value);
    });
  });

  container.querySelectorAll("[data-admin-period]").forEach((btn) => {
    btn.addEventListener("click", function () {
      adminPeriod = this.dataset.adminPeriod;
      loadAdminPage();
    });
  });

  container.querySelectorAll("[data-status-filter]").forEach((chip) => {
    chip.addEventListener("click", function () {
      adminStatusFilter = this.dataset.statusFilter;
      loadAdminPage();
    });
  });

  container.querySelectorAll("[data-sort-key]").forEach((th) => {
    th.addEventListener("click", function () {
      const key = this.dataset.sortKey;
      if (adminSortKey === key) {
        adminSortDir = adminSortDir === "asc" ? "desc" : "asc";
      } else {
        adminSortKey = key;
        adminSortDir = "desc";
      }
      loadAdminPage();
    });
  });

  container.querySelectorAll("[data-admin-section]").forEach((tab) => {
    tab.addEventListener("click", function () {
      adminSection = this.dataset.adminSection;
      loadAdminPage();
    });
  });
}

/* ============================================================
   CHECKOUT PAGE
   ============================================================
   Business model notes:
     - Reservation flow lives on the single-product page and only
       appears when stockQty === 0. Checkout is for in-stock purchases.
     - Payment methods: InstaPay / bank transfer (proof screenshot),
       card via gateway redirect (Paymob/Fawry), or cash on delivery.

   SECURITY: there are deliberately NO card number / CVV inputs here.
   Collecting raw card data in your own form makes you liable for PCI
   DSS compliance. The "Card" option should redirect to a hosted
   gateway page (Paymob / Fawry) — see startGatewayPayment() below.

   LIMITATION: wa.me deep links can only pre-fill TEXT. The uploaded
   screenshot cannot be auto-attached — the customer attaches it in
   WhatsApp themselves, or you POST it to your backend (see
   uploadProofToBackend() stub).
   ============================================================ */

const CHECKOUT_INSTAPAY_HANDLE = "kaderfactory@instapay"; // TODO: real handle
const CHECKOUT_BANK_ACCOUNT = "EG00 0000 0000 0000 0000 0000"; // TODO: real IBAN
const CHECKOUT_SHIPPING_FLAT = 0; // set a flat shipping fee, or 0 for free

const EGYPT_GOVERNORATES = [
  { en: "Cairo", ar: "القاهرة" },
  { en: "Giza", ar: "الجيزة" },
  { en: "Alexandria", ar: "الإسكندرية" },
  { en: "Qalyubia", ar: "القليوبية" },
  { en: "Sharqia", ar: "الشرقية" },
  { en: "Dakahlia", ar: "الدقهلية" },
  { en: "Beheira", ar: "البحيرة" },
  { en: "Gharbia", ar: "الغربية" },
  { en: "Monufia", ar: "المنوفية" },
  { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  { en: "Damietta", ar: "دمياط" },
  { en: "Port Said", ar: "بورسعيد" },
  { en: "Ismailia", ar: "الإسماعيلية" },
  { en: "Suez", ar: "السويس" },
  { en: "North Sinai", ar: "شمال سيناء" },
  { en: "South Sinai", ar: "جنوب سيناء" },
  { en: "Beni Suef", ar: "بني سويف" },
  { en: "Faiyum", ar: "الفيوم" },
  { en: "Minya", ar: "المنيا" },
  { en: "Asyut", ar: "أسيوط" },
  { en: "Sohag", ar: "سوهاج" },
  { en: "Qena", ar: "قنا" },
  { en: "Luxor", ar: "الأقصر" },
  { en: "Aswan", ar: "أسوان" },
  { en: "Red Sea", ar: "البحر الأحمر" },
  { en: "New Valley", ar: "الوادي الجديد" },
  { en: "Matrouh", ar: "مطروح" },
];

let checkoutState = {
  paymentMethod: "instapay", // instapay | card | cod
  proofFile: null,
};

/* ============================================================
   ORDER STORAGE (localStorage) — shared by Profile order history
   and the Admin Dashboard orders table. Stands in for a real
   orders table/API in this backend-less demo.
   ============================================================ */
const ORDER_STATUSES = [
  {
    key: "pending",
    en: "Pending",
    ar: "قيد الانتظار",
    badgeClass: "bg-warning text-dark",
  },
  {
    key: "confirmed",
    en: "Confirmed",
    ar: "مؤكد",
    badgeClass: "bg-info text-dark",
  },
  { key: "shipped", en: "Shipped", ar: "تم الشحن", badgeClass: "bg-primary" },
  {
    key: "delivered",
    en: "Delivered",
    ar: "تم التوصيل",
    badgeClass: "bg-success",
  },
];

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  } catch (e) {
    console.error("Failed to load orders", e);
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

/* ============================================================
   CONTENT STORE (localStorage) — backs the Admin Dashboard's
   content-management tabs (Products / Home Banner / News /
   Videos / Machinery). First run seeds localStorage from the
   in-memory defaults above; every run after that reads/writes
   localStorage exclusively, so admin edits persist across reloads.
   ============================================================ */
function loadContentStore(key, seedData) {
  const raw = localStorage.getItem(`cms_${key}`);
  if (raw === null) {
    saveContentStore(key, seedData);
    return JSON.parse(JSON.stringify(seedData)); // deep clone, avoids aliasing the seed
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to load content store "${key}"`, e);
    return JSON.parse(JSON.stringify(seedData));
  }
}

function saveContentStore(key, data) {
  localStorage.setItem(`cms_${key}`, JSON.stringify(data));
}

// Turns a checkout order into a persisted record and returns it
function recordOrder(order) {
  const orders = getOrders();
  const record = {
    id: `ORD-${Date.now()}`,
    date: new Date().toISOString(),
    status: "pending", // pending -> confirmed -> shipped -> delivered
    ...order,
  };
  orders.unshift(record);
  saveOrders(orders);
  return record;
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;
  order.status = status;
  saveOrders(orders);
  if (appState.currentPage === "admin") loadAdminPage();
}

/* ============================================================
   ENTRY POINT — call from loadPageContent() case "checkout"
   ============================================================ */
function loadCheckoutPage() {
  const container = document.getElementById("checkoutPageContent");
  if (!container) return;

  const cart = appState.cart || [];

  // Empty cart → nothing to check out
  if (cart.length === 0) {
    container.innerHTML = `
      ${createBanner(getLabel("Checkout", "إتمام الطلب"))}
      <div class="container py-5">
        <div class="text-center py-5">
          <i class="fas fa-cart-shopping text-muted" style="font-size:3rem;"></i>
          <h4 class="mt-3">${getLabel("Your cart is empty", "سلتك فارغة")}</h4>
          <p class="text-muted mb-4">${getLabel("Add some products before checking out.", "أضف بعض المنتجات قبل إتمام الطلب.")}</p>
          <button type="button" class="btn btn-primary px-5" data-nav-page-id="products">
            ${getLabel("Browse Products", "تصفح المنتجات")}
          </button>
        </div>
      </div>
    `;
    return;
  }

  checkoutState = { paymentMethod: "instapay", proofFile: null };

  container.innerHTML = `
    ${createBanner(getLabel("Checkout", "إتمام الطلب"))}

    <div class="container-fluid py-5 bg-light">
      <div class="container">
        <div class="row g-4">

          <!-- ============ LEFT: forms ============ -->
          <div class="col-lg-8">

            <!-- 1. Contact -->
            <div class="checkout-section bg-white rounded-3 p-4 mb-4">
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="checkout-step-num">1</span>
                <h5 class="fw-bold mb-0">${getLabel("Contact Details", "بيانات التواصل")}</h5>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-semibold">${getLabel("Full Name", "الاسم الكامل")} *</label>
                  <input type="text" class="form-control" id="checkoutName" required>
                  <div class="invalid-feedback">${getLabel("Please enter your name", "يرجى إدخال الاسم")}</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-semibold">${getLabel("Phone Number", "رقم الهاتف")} *</label>
                  <input type="tel" class="form-control" id="checkoutPhone" dir="ltr" required>
                  <div class="invalid-feedback">${getLabel("Please enter a valid phone number", "يرجى إدخال رقم هاتف صحيح")}</div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-semibold">${getLabel("Email", "البريد الإلكتروني")}</label>
                  <input type="email" class="form-control" id="checkoutEmail" dir="ltr">
                  <div class="invalid-feedback">${getLabel("Please enter a valid email", "يرجى إدخال بريد صحيح")}</div>
                </div>
              </div>
            </div>

            <!-- 2. Delivery -->
            <div class="checkout-section bg-white rounded-3 p-4 mb-4">
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="checkout-step-num">2</span>
                <h5 class="fw-bold mb-0">${getLabel("Delivery Address", "عنوان التوصيل")}</h5>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-semibold">${getLabel("Governorate", "المحافظة")} *</label>
                  <select class="form-select" id="checkoutGovernorate" required>
                    <option value="">${getLabel("Select…", "اختر…")}</option>
                    ${EGYPT_GOVERNORATES.map(
                      (g) =>
                        `<option value="${g.en}">${getLabel(g.en, g.ar)}</option>`,
                    ).join("")}
                  </select>
                  <div class="invalid-feedback">${getLabel("Please select a governorate", "يرجى اختيار المحافظة")}</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-semibold">${getLabel("City / Area", "المدينة / المنطقة")} *</label>
                  <input type="text" class="form-control" id="checkoutCity" required>
                  <div class="invalid-feedback">${getLabel("Please enter your city", "يرجى إدخال المدينة")}</div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-semibold">${getLabel("Street Address", "العنوان بالتفصيل")} *</label>
                  <input type="text" class="form-control" id="checkoutAddress" required>
                  <div class="invalid-feedback">${getLabel("Please enter your address", "يرجى إدخال العنوان")}</div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-semibold">${getLabel("Order Notes (optional)", "ملاحظات الطلب (اختياري)")}</label>
                  <textarea class="form-control" id="checkoutNotes" rows="2"></textarea>
                </div>
              </div>
            </div>

            <!-- 3. Payment -->
            <div class="checkout-section bg-white rounded-3 p-4 mb-4">
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="checkout-step-num">3</span>
                <h5 class="fw-bold mb-0">${getLabel("Payment Method", "طريقة الدفع")}</h5>
              </div>

              <div class="payment-methods">
                <label class="payment-option active" data-payment-option="instapay">
                  <input type="radio" name="paymentMethod" value="instapay" checked hidden>
                  <i class="fas fa-mobile-screen-button"></i>
                  <div>
                    <div class="fw-semibold">${getLabel("InstaPay / Bank Transfer", "إنستاباي / تحويل بنكي")}</div>
                    <div class="small text-muted">${getLabel("Transfer, then upload your receipt", "حوّل المبلغ ثم ارفع إيصال التحويل")}</div>
                  </div>
                </label>

                <label class="payment-option" data-payment-option="card">
                  <input type="radio" name="paymentMethod" value="card" hidden>
                  <i class="fas fa-credit-card"></i>
                  <div>
                    <div class="fw-semibold">${getLabel("Credit / Debit Card", "بطاقة ائتمان / خصم")}</div>
                    <div class="small text-muted">${getLabel("Secure payment via gateway", "دفع آمن عبر بوابة الدفع")}</div>
                  </div>
                </label>

                <label class="payment-option" data-payment-option="cod">
                  <input type="radio" name="paymentMethod" value="cod" hidden>
                  <i class="fas fa-money-bill-wave"></i>
                  <div>
                    <div class="fw-semibold">${getLabel("Cash on Delivery", "الدفع عند الاستلام")}</div>
                    <div class="small text-muted">${getLabel("Pay when your order arrives", "ادفع عند وصول طلبك")}</div>
                  </div>
                </label>
              </div>

              <!-- InstaPay panel -->
              <div class="payment-panel mt-4" id="panel-instapay">
                <div class="alert alert-light border small mb-3">
                  <div class="fw-semibold mb-2">${getLabel("Transfer to:", "حوّل إلى:")}</div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="text-muted">${getLabel("InstaPay", "إنستاباي")}</span>
                    <span class="d-flex align-items-center gap-2">
                      <code dir="ltr">${CHECKOUT_INSTAPAY_HANDLE}</code>
                      <button type="button" class="btn btn-sm btn-link p-0" data-copy-text="${CHECKOUT_INSTAPAY_HANDLE}">
                        <i class="fas fa-copy"></i>
                      </button>
                    </span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">${getLabel("Bank Account", "الحساب البنكي")}</span>
                    <span class="d-flex align-items-center gap-2">
                      <code dir="ltr">${CHECKOUT_BANK_ACCOUNT}</code>
                      <button type="button" class="btn btn-sm btn-link p-0" data-copy-text="${CHECKOUT_BANK_ACCOUNT}">
                        <i class="fas fa-copy"></i>
                      </button>
                    </span>
                  </div>
                </div>

                <label class="form-label small fw-semibold">
                  ${getLabel("Upload Transfer Receipt", "ارفع إيصال التحويل")} *
                </label>
                <div class="proof-upload" id="proofUploadZone">
                  <input type="file" id="checkoutProof" accept="image/*,application/pdf" hidden>
                  <div class="proof-placeholder" id="proofPlaceholder">
                    <i class="fas fa-cloud-arrow-up"></i>
                    <div class="fw-semibold">${getLabel("Click to upload screenshot", "اضغط لرفع لقطة الشاشة")}</div>
                    <div class="small text-muted">${getLabel("PNG, JPG or PDF · max 5MB", "PNG أو JPG أو PDF · بحد أقصى 5 ميجا")}</div>
                  </div>
                  <div class="proof-preview d-none" id="proofPreview"></div>
                </div>
                <div class="form-text text-danger small d-none" id="proofError"></div>
              </div>

              <!-- Card panel -->
              <div class="payment-panel mt-4 d-none" id="panel-card">
                <div class="alert alert-light border small mb-0">
                  <i class="fas fa-lock me-2"></i>
                  ${getLabel(
                    "You will be redirected to our secure payment provider to complete the payment. We never see or store your card details.",
                    "سيتم تحويلك إلى بوابة الدفع الآمنة لإتمام العملية. نحن لا نرى أو نحتفظ ببيانات بطاقتك.",
                  )}
                </div>
              </div>

              <!-- COD panel -->
              <div class="payment-panel mt-4 d-none" id="panel-cod">
                <div class="alert alert-light border small mb-0">
                  <i class="fas fa-circle-info me-2"></i>
                  ${getLabel(
                    "Please have the exact amount ready. Our delivery agent will contact you before arrival.",
                    "يرجى تجهيز المبلغ بالكامل. سيتواصل معك مندوب التوصيل قبل الوصول.",
                  )}
                </div>
              </div>
            </div>

          </div>

          <!-- ============ RIGHT: sticky order summary ============ -->
          <div class="col-lg-4">
            <div class="checkout-summary bg-white rounded-3 p-4">
              <h5 class="fw-bold mb-3">${getLabel("Order Summary", "ملخص الطلب")}</h5>

              <div class="checkout-items mb-3">
                ${cart.map((item) => renderCheckoutItem(item)).join("")}
              </div>

              <hr>

              <div class="d-flex justify-content-between small mb-2">
                <span class="text-muted">${getLabel("Subtotal", "المجموع الفرعي")}</span>
                <span id="summarySubtotal">${formatEGP(getCartTotal())}</span>
              </div>
              <div class="d-flex justify-content-between small mb-2">
                <span class="text-muted">${getLabel("Shipping", "الشحن")}</span>
                <span>${CHECKOUT_SHIPPING_FLAT > 0 ? formatEGP(CHECKOUT_SHIPPING_FLAT) : getLabel("Free", "مجاني")}</span>
              </div>

              <hr>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <span class="fw-bold">${getLabel("Total", "الإجمالي")}</span>
                <span class="fs-4 fw-bold text-primary" id="summaryTotal">
                  ${formatEGP(getCartTotal() + CHECKOUT_SHIPPING_FLAT)}
                </span>
              </div>

              <button type="button" class="btn btn-primary w-100 py-2 mb-2" id="placeOrderBtn">
                ${getLabel("Place Order", "تأكيد الطلب")}
              </button>

              <button type="button" class="btn btn-success w-100 py-2" id="sendOrderWhatsapp">
                <i class="fab fa-whatsapp me-2"></i>${getLabel("Send via WhatsApp", "إرسال عبر واتساب")}
              </button>

              <p class="small text-muted text-center mt-3 mb-0">
                ${getLabel("By placing this order you agree to our terms.", "بتأكيد الطلب أنت توافق على الشروط والأحكام.")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  bindCheckoutEvents();
}

/* ============================================================
   HELPERS
   ============================================================ */
function formatEGP(amount) {
  return `${getLabel("EGP", "ج.م")} ${Number(amount).toLocaleString()}`;
}

function renderCheckoutItem(item) {
  // Handles both new {en,ar} titles and legacy string titles from old carts
  const title =
    typeof item.title === "string"
      ? item.title
      : getLabel(item.title.en, item.title.ar);

  const variants = [item.color, item.size].filter(Boolean).join(" · ");

  return `
    <div class="checkout-item d-flex gap-3 mb-3"
         data-product-id="${item.productId}"
         data-color="${item.color || ""}"
         data-size="${item.size || ""}">
      <img src="${item.img}" alt="${title}" class="checkout-item-img">
      <div class="flex-grow-1 min-width-0">
        <div class="small fw-semibold text-truncate">${title}</div>
        ${variants ? `<div class="small text-muted">${variants}</div>` : ""}
        <div class="d-flex align-items-center gap-2 mt-1">
          <div class="qty-stepper qty-stepper-sm d-flex align-items-center gap-1">
            <button type="button" class="qty-btn qty-btn-sm" data-qty-action="decrease" aria-label="${getLabel("Decrease quantity", "تقليل الكمية")}">−</button>
            <span class="qty-value small">${item.qty}</span>
            <button type="button" class="qty-btn qty-btn-sm" data-qty-action="increase" aria-label="${getLabel("Increase quantity", "زيادة الكمية")}">+</button>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger p-0" data-cart-remove aria-label="${getLabel("Remove item", "إزالة المنتج")}">
            <i class="fas fa-trash small"></i>
          </button>
        </div>
      </div>
      <div class="small fw-semibold text-nowrap">${formatEGP(item.price * item.qty)}</div>
    </div>
  `;
}

/* ============================================================
   EVENTS
   ============================================================ */
let checkoutEventsBound = false;

function bindCheckoutEvents() {
  if (checkoutEventsBound) return;
  checkoutEventsBound = true;

  document.addEventListener("click", (e) => {
    /* Payment method selection */
    const paymentOption = e.target.closest("[data-payment-option]");
    if (paymentOption) {
      selectPaymentMethod(paymentOption.dataset.paymentOption);
      return;
    }

    /* Order summary: qty stepper / remove item — reload the whole
       checkout page afterward so totals and the empty-cart state
       (if the last item was removed) stay correct */
    const summaryRow = e.target.closest(".checkout-items [data-product-id]");
    if (summaryRow) {
      const productId = summaryRow.dataset.productId;
      const color = summaryRow.dataset.color || null;
      const size = summaryRow.dataset.size || null;

      const qtyBtn = e.target.closest("[data-qty-action]");
      if (qtyBtn) {
        const currentItem = appState.cart.find(
          (i) =>
            i.productId === productId && i.color === color && i.size === size,
        );
        if (currentItem) {
          const newQty =
            qtyBtn.dataset.qtyAction === "increase"
              ? currentItem.qty + 1
              : currentItem.qty - 1;
          updateCartItemQty(productId, color, size, newQty);
          loadCheckoutPage();
        }
        return;
      }

      if (e.target.closest("[data-cart-remove]")) {
        removeFromCart(productId, color, size);
        loadCheckoutPage();
        return;
      }
    }

    /* Copy InstaPay handle / bank account */
    const copyBtn = e.target.closest("[data-copy-text]");
    if (copyBtn) {
      navigator.clipboard.writeText(copyBtn.dataset.copyText);
      const icon = copyBtn.querySelector("i");
      icon.className = "fas fa-check";
      setTimeout(() => (icon.className = "fas fa-copy"), 1500);
      return;
    }

    /* Open file picker */
    if (e.target.closest("#proofUploadZone")) {
      document.getElementById("checkoutProof")?.click();
      return;
    }

    /* Remove uploaded proof */
    if (e.target.closest("#removeProofBtn")) {
      e.stopPropagation();
      clearProofFile();
      return;
    }

    /* Place order */
    if (e.target.closest("#placeOrderBtn")) {
      handlePlaceOrder();
      return;
    }

    /* Send via WhatsApp */
    if (e.target.closest("#sendOrderWhatsapp")) {
      handleSendViaWhatsapp();
      return;
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "checkoutProof") {
      handleProofUpload(e.target.files[0]);
    }
  });
}

function selectPaymentMethod(method) {
  checkoutState.paymentMethod = method;

  document.querySelectorAll("[data-payment-option]").forEach((el) => {
    el.classList.toggle("active", el.dataset.paymentOption === method);
    const radio = el.querySelector("input[type=radio]");
    if (radio) radio.checked = el.dataset.paymentOption === method;
  });

  ["instapay", "card", "cod"].forEach((m) => {
    document
      .getElementById(`panel-${m}`)
      ?.classList.toggle("d-none", m !== method);
  });
}

/* ============================================================
   PROOF UPLOAD
   ============================================================ */
function handleProofUpload(file) {
  const errorEl = document.getElementById("proofError");
  const placeholder = document.getElementById("proofPlaceholder");
  const preview = document.getElementById("proofPreview");

  if (!file) return;

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "application/pdf",
  ];

  if (!ALLOWED.includes(file.type)) {
    showProofError(
      getLabel(
        "Only PNG, JPG or PDF files are allowed",
        "يُسمح فقط بملفات PNG أو JPG أو PDF",
      ),
    );
    return;
  }

  if (file.size > MAX_SIZE) {
    showProofError(
      getLabel(
        "File is too large (max 5MB)",
        "حجم الملف كبير جداً (بحد أقصى 5 ميجا)",
      ),
    );
    return;
  }

  errorEl?.classList.add("d-none");
  checkoutState.proofFile = file;

  const isPdf = file.type === "application/pdf";
  const sizeKb = Math.round(file.size / 1024);

  preview.innerHTML = `
    <div class="d-flex align-items-center gap-3">
      ${
        isPdf
          ? `<div class="proof-pdf-icon"><i class="fas fa-file-pdf"></i></div>`
          : `<img src="${URL.createObjectURL(file)}" class="proof-thumb" alt="receipt">`
      }
      <div class="flex-grow-1 min-width-0">
        <div class="small fw-semibold text-truncate">${file.name}</div>
        <div class="small text-muted">${sizeKb} KB</div>
      </div>
      <button type="button" class="btn btn-sm btn-link text-danger" id="removeProofBtn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;

  placeholder.classList.add("d-none");
  preview.classList.remove("d-none");
}

function clearProofFile() {
  checkoutState.proofFile = null;
  const input = document.getElementById("checkoutProof");
  if (input) input.value = "";
  document.getElementById("proofPlaceholder")?.classList.remove("d-none");
  const preview = document.getElementById("proofPreview");
  if (preview) {
    preview.classList.add("d-none");
    preview.innerHTML = "";
  }
}

function showProofError(msg) {
  const errorEl = document.getElementById("proofError");
  if (!errorEl) return;
  errorEl.textContent = msg;
  errorEl.classList.remove("d-none");
}

/* ============================================================
   VALIDATION
   ============================================================ */
function validateCheckoutForm() {
  const fields = [
    { id: "checkoutName", test: (v) => v.trim().length >= 2 },
    { id: "checkoutPhone", test: (v) => /^[0-9+\s-]{8,}$/.test(v.trim()) },
    { id: "checkoutGovernorate", test: (v) => v !== "" },
    { id: "checkoutCity", test: (v) => v.trim().length >= 2 },
    { id: "checkoutAddress", test: (v) => v.trim().length >= 5 },
  ];

  const email = document.getElementById("checkoutEmail");
  if (email && email.value.trim() !== "") {
    fields.push({
      id: "checkoutEmail",
      test: (v) => /^\S+@\S+\.\S+$/.test(v.trim()),
    });
  }

  let valid = true;
  let firstInvalid = null;

  fields.forEach(({ id, test }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const ok = test(el.value);
    el.classList.toggle("is-invalid", !ok);
    if (!ok) {
      valid = false;
      if (!firstInvalid) firstInvalid = el;
    }
  });

  // InstaPay requires a receipt
  if (checkoutState.paymentMethod === "instapay" && !checkoutState.proofFile) {
    showProofError(
      getLabel("Please upload your transfer receipt", "يرجى رفع إيصال التحويل"),
    );
    valid = false;
    if (!firstInvalid)
      firstInvalid = document.getElementById("proofUploadZone");
  }

  if (firstInvalid) {
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalid.focus?.();
  }

  return valid;
}

function collectCheckoutData() {
  return {
    name: document.getElementById("checkoutName").value.trim(),
    phone: document.getElementById("checkoutPhone").value.trim(),
    email: document.getElementById("checkoutEmail").value.trim(),
    governorate: document.getElementById("checkoutGovernorate").value,
    city: document.getElementById("checkoutCity").value.trim(),
    address: document.getElementById("checkoutAddress").value.trim(),
    notes: document.getElementById("checkoutNotes").value.trim(),
    paymentMethod: checkoutState.paymentMethod,
    items: appState.cart,
    subtotal: getCartTotal(),
    shipping: CHECKOUT_SHIPPING_FLAT,
    total: getCartTotal() + CHECKOUT_SHIPPING_FLAT,
  };
}

/* ============================================================
   ORDER SUBMISSION
   ============================================================ */
function handlePlaceOrder() {
  if (!validateCheckoutForm()) return;

  const order = collectCheckoutData();

  if (order.paymentMethod === "card") {
    startGatewayPayment(order);
    return;
  }

  // InstaPay or COD → submit to your backend
  submitOrder(order, checkoutState.proofFile);
}

function handleSendViaWhatsapp() {
  if (!validateCheckoutForm()) return;

  const order = collectCheckoutData();
  const message = encodeURIComponent(buildOrderMessage(order));

  window.open(
    `https://wa.me/${RESERVATION_WHATSAPP}?text=${message}`,
    "_blank",
  );

  // Reminder: wa.me can't attach the receipt file — the customer must
  // attach it manually in the WhatsApp chat that just opened.
  if (checkoutState.proofFile) {
    alert(
      getLabel(
        "Please attach your transfer receipt in the WhatsApp chat that just opened.",
        "يرجى إرفاق إيصال التحويل في محادثة واتساب التي تم فتحها.",
      ),
    );
  }
}

function buildOrderMessage(order) {
  const itemLines = order.items
    .map((item) => {
      const title =
        typeof item.title === "string"
          ? item.title
          : getLabel(item.title.en, item.title.ar);
      const variants = [item.color, item.size].filter(Boolean).join(" / ");
      return `• ${title}${variants ? ` (${variants})` : ""} × ${item.qty} — ${formatEGP(item.price * item.qty)}`;
    })
    .join("\n");

  const methodLabel = {
    instapay: getLabel("InstaPay / Bank Transfer", "إنستاباي / تحويل بنكي"),
    card: getLabel("Card", "بطاقة"),
    cod: getLabel("Cash on Delivery", "الدفع عند الاستلام"),
  }[order.paymentMethod];

  return getLabel(
    `New Order\n\n${itemLines}\n\nSubtotal: ${formatEGP(order.subtotal)}\nShipping: ${order.shipping > 0 ? formatEGP(order.shipping) : "Free"}\nTotal: ${formatEGP(order.total)}\n\nPayment: ${methodLabel}\n\nName: ${order.name}\nPhone: ${order.phone}\nEmail: ${order.email || "-"}\nAddress: ${order.address}, ${order.city}, ${order.governorate}\nNotes: ${order.notes || "-"}`,
    `طلب جديد\n\n${itemLines}\n\nالمجموع الفرعي: ${formatEGP(order.subtotal)}\nالشحن: ${order.shipping > 0 ? formatEGP(order.shipping) : "مجاني"}\nالإجمالي: ${formatEGP(order.total)}\n\nطريقة الدفع: ${methodLabel}\n\nالاسم: ${order.name}\nالهاتف: ${order.phone}\nالبريد: ${order.email || "-"}\nالعنوان: ${order.address}، ${order.city}، ${order.governorate}\nملاحظات: ${order.notes || "-"}`,
  );
}

/* ============================================================
   BACKEND STUBS — wire these to your server
   ============================================================ */

/**
 * Sends the order + receipt file to your backend.
 * Replace the fetch URL with your real endpoint.
 */
async function submitOrder(order, proofFile) {
  const btn = document.getElementById("placeOrderBtn");
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${getLabel("Processing…", "جارٍ المعالجة…")}`;

  try {
    const formData = new FormData();
    formData.append("order", JSON.stringify(order));
    if (proofFile) formData.append("proof", proofFile);

    // TODO: replace with your real endpoint
    // const response = await fetch("/api/orders", { method: "POST", body: formData });
    // if (!response.ok) throw new Error("Order submission failed");

    // Placeholder success path until the backend exists:
    console.log("Order ready to submit:", order, proofFile);
    await new Promise((r) => setTimeout(r, 800));

    const record = recordOrder(order);
    clearCart();
    showOrderSuccess(record);
  } catch (err) {
    console.error(err);
    alert(
      getLabel(
        "Something went wrong. Please try again or contact us on WhatsApp.",
        "حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.",
      ),
    );
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

/**
 * Redirects to a hosted payment gateway (Paymob / Fawry).
 * Your backend creates the payment intent and returns a redirect URL —
 * card details are entered on the GATEWAY's page, never on yours.
 */
async function startGatewayPayment(order) {
  try {
    // TODO: replace with your real endpoint
    // const res = await fetch("/api/payments/create", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(order),
    // });
    // const { redirectUrl } = await res.json();
    // window.location.href = redirectUrl;

    alert(
      getLabel(
        "Card payment gateway is not configured yet. Please use InstaPay or Cash on Delivery.",
        "بوابة الدفع بالبطاقة غير مفعّلة بعد. يرجى استخدام إنستاباي أو الدفع عند الاستلام.",
      ),
    );
  } catch (err) {
    console.error(err);
  }
}

function showOrderSuccess(order) {
  const container = document.getElementById("checkoutPageContent");
  container.innerHTML = `
    ${createBanner(getLabel("Order Confirmed", "تم تأكيد الطلب"))}
    <div class="container py-5">
      <div class="text-center py-5">
        <div class="order-success-icon mb-4"><i class="fas fa-check"></i></div>
        <h3 class="fw-bold mb-2">${getLabel("Thank you for your order!", "شكراً لطلبك!")}</h3>
        <p class="text-muted mb-1">
          ${getLabel(
            `We've received your order and will contact you on ${order.phone} shortly to confirm.`,
            `لقد استلمنا طلبك وسنتواصل معك على ${order.phone} قريباً للتأكيد.`,
          )}
        </p>
        ${order.id ? `<p class="text-muted small mb-4">${getLabel("Order reference", "رقم الطلب")}: <span class="fw-semibold" dir="ltr">${order.id}</span></p>` : ""}
        <div class="d-flex gap-2 justify-content-center flex-wrap">
          <button type="button" class="btn btn-primary px-5" data-nav-page-id="products">
            ${getLabel("Continue Shopping", "متابعة التسوق")}
          </button>
          <button type="button" class="btn btn-outline-secondary px-5" onclick="goToProfileTab('orders')">
            ${getLabel("View My Orders", "عرض طلباتي")}
          </button>
        </div>
      </div>
    </div>
  `;
}

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

  document.addEventListener("click", (e) => {
    const catLink = e.target.closest("[data-category-id]");
    if (catLink) {
      e.preventDefault();
      goToProductsWithFilter(catLink.dataset.categoryId);
    }
  });

  // Initialize Categories Section
  const categorySection = document.getElementById("categorySection");
  if (categorySection) {
    const categorySlidesHtml = categoriesData
      .map(
        (cat) => /*html*/ `
    <div class="swiper-slide">
        <a href="#" class="category-card-link" data-category-id="${cat.categoryId}" onclick="setCurrentPage('${cat.page}', '${cat.categoryId}')">
            <div class="category-card">
                 <div class="category-card-img">
                    <img src="${cat.img}" class="img-fluid" alt="${getLabel(cat.name.en, cat.name.ar)}">
                </div>
                 <ul class="category-card-details">
                    ${cat.subCategories
                      .map(
                        (variant, i) => `
                        <li style="transition-delay: ${i * 80}ms;">${getLabel(variant.name.en, variant.name.ar)}</li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
            <div class="category-card-name text-start">
                ${getLabel(cat.name.en, cat.name.ar)}
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

    // Get unique categories from the single unified array
    const uniqueCategories = [
      ...new Map(categoriesData.map((p) => [p.categoryId, p.name])).entries(),
    ];
    // uniqueCategories is now: [ [categoryId, {en, ar}], [categoryId, {en, ar}], ... ]

    let chipsHtml = `
        <div class="swiper-slide" style="width: auto;">
            <div class="filter-chip ${activeProductCategory === "all" ? "active" : ""}" data-category="all" role="button" tabindex="0">
                ${getLabel("All", "الكل")}
            </div>
        </div>
    `;

    uniqueCategories.forEach(([categoryId, categoryLabel]) => {
      chipsHtml += `
            <div class="swiper-slide" style="width: auto;">
                <div class="filter-chip ${activeProductCategory === categoryId ? "active" : ""}" data-category="${categoryId}" role="button" tabindex="0">
                    ${getLabel(categoryLabel.en, categoryLabel.ar)}
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

    // productsData is now one unified array (not split by language)
    const filtered =
      activeProductCategory === "all"
        ? productsData
        : productsData.filter((p) => p.categoryId === activeProductCategory);

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
        (product) => /*html*/ `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card product-card h-100 border-0 ">
                    <div class="product-img-wrap bg-light">
                        <img src="${product.url}" class="card-img-top" alt="${getLabel(product.title.en, product.title.ar)}">
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
            <span class="badge bg-light text-dark mb-2">${getLabel(product.sub_category.en, product.sub_category.ar)}</span>

            <h6 class="card-title mb-1">${getLabel(product.title.en, product.title.ar)}</h6>

            <p class="card-text text-muted small product-desc">
                ${getLabel(product.desc.en, product.desc.ar)}
            </p>
        </div>
    </div>
    </div>
    `,
      )
      .join("");

    // Make each card clickable through to the single product page
    grid.querySelectorAll(".product-card").forEach((card, i) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        setCurrentPage("single-product", displayedProducts[i].id);
      });
    });
  }

  // Initialize News Section
  const newsSection = document.getElementById("newsSection");
  if (newsSection) {
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

  // initialize Trusted Section
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
async function initializeApp() {
  // ============================
  // App Settings
  // ============================

  document.documentElement.lang = appState.language;
  document.documentElement.dir = appState.direction;
  document.body.setAttribute("data-theme", appState.theme);
  initializeAuth();

  // ============================
  // UI Components
  // ============================
  await loadProductsData();
  await loadCategoriesData();

  // Layer the localStorage content store on top of the defaults above,
  // so admin-added/edited/deleted content persists across reloads.
  productsData = loadContentStore("products", productsData);
  bannerSlides = loadContentStore("bannerSlides", bannerSlides);
  newsItems = loadContentStore("newsItems", newsItems);
  videoItems = loadContentStore("videoItems", videoItems);
  projects = loadContentStore("projects", projects);

  // Build the Products mega menu from categoriesData.
  // MUST be after loadCategoriesData() and before initializeNavigation().
  const productsLink = navigationLinks.find((l) => l.id === "products");
  productsLink.megaMenu = buildProductsMegaMenuColumns();

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

  // Copy-link buttons (product share row) — delegated so it works
  // for content injected later, and binds exactly once
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".copy-link");
    if (!btn) return;
    await navigator.clipboard.writeText(btn.dataset.url);
    btn.innerHTML = `<i class="fas fa-check"></i>`;
    setTimeout(() => {
      btn.innerHTML = `<i class="fas fa-link"></i>`;
    }, 1500);
  });

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
window.goToProfileTab = goToProfileTab;
window.updateOrderStatus = updateOrderStatus;
