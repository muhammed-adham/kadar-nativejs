// ========== GLOBAL STATE & CONFIGURATION ==========
const appState = {
  currentPage: "home",
  direction: localStorage.getItem("direction") || "ltr",
  language: localStorage.getItem("language") || "en",
  theme: localStorage.getItem("theme") || "light",
  currentSlide: 0,
  selectedCategory: "",
  selectedSubcategory: "",
  currentProductId: "",
};

// document.documentElement.lang = appState.language;
// document.documentElement.dir = appState.direction;
// document.body.setAttribute("data-theme", appState.theme);

/* ===============================================================================
  MAIN APP DATA
  =============================================================================== */

// ========== contact placeholders ==========
const RESERVATION_WHATSAPP = "201556336160";
const RESERVATION_EMAIL = "kaderfactory38@gmail.com";

// ========== NAVIGATION DATA ==========
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

// ========== Share Links ==========
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

// ========== Policy Tabs Data Short Version==========
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

// ========== Product Data JSon ==========
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

// ========== Category Data JSon ==========
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

// ========== UTILITY FUNCTIONS ==========

/**
 * Get text based on current language
 */
// function getText(obj, key) {
//   const currentLang = appState.language === "ar" ? "ar" : "en";
//   return obj[`${key}_${currentLang}`] || obj[key] || "";
// }

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
 * Cart Management
 */

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

/**
 * Initialize navigation
 */
/* ============================================================
   NAVIGATION — full file
   ============================================================
   LOAD ORDER (this is what broke before):
     1. categories.json + products.json fetched
        (categoriesData / productsData populated)
     2. buildProductsMegaMenuColumns() assigned to the Products link
     3. initializeNavigation() called

   In initializeApp():

     await loadProductsData();
     await loadCategoriesData();
     initializeCart();

     const productsLink = navigationLinks.find(l => l.id === "products");
     productsLink.megaMenu = buildProductsMegaMenuColumns();

     initializeNavigation();

   Calling initializeNavigation() before step 2 leaves megaMenu empty,
   which makes Products render as a plain link and the mobile mega-menu
   overlay never open.
   ============================================================ */

let navigationEventsBound = false;

/* ============================================================
   MEGA MENU COLUMN DEFINITIONS
   ------------------------------------------------------------
   You control grouping + order here. Names/translations still come
   from categoriesData, so they can't drift out of sync.
   A typo'd categoryId here silently drops that item — check spelling
   against categories.json if a column renders short.
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
    title_en: "Corporate & Military",
    title_ar: "منتجات الشركات والعسكرية",
    categoryIds: [
      "cash-transfer",
      "vehicle-conversions",
      "military",
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

  /* --- Guard 3: flag real categories missing from every column --- */
  const missing = [...realIds].filter((id) => !seen.has(id));
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
                <div class="container d-lg-flex justify-content-lg-evenly align-items-lg-start">
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
                                   data-nav-page-id="products"
                                   ${item.categoryId ? `data-category-id="${item.categoryId}"` : ""}
                                   ${item.subCategoryId ? `data-sub-category-id="${item.subCategoryId}"` : ""}>
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
    } else {
      navContainer.innerHTML += `
        <a class="nav-item nav-link py-4 text-white"
           href="${link.path}"
           data-nav-page-id="${link.id}"
           id="nav-${link.id}">
            ${getLabel(link.label_en, link.label_ar)}
        </a>
      `;
    }
  });

  const topRightControls = document.getElementById("topRightControls");

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

  /* ---- Cart ---- */
  topRightControls.innerHTML += `
    <a class="nav-link position-relative" href="#" data-nav-page-id="cart" id="cartBtn">
        <i class="fas fa-shopping-cart mx-1"></i>
        ${getLabel("Cart", "السلة")}
        <span class="badge bg-primary rounded-pill position-absolute top-0 start-100 translate-middle" id="cartCount" style="font-size: 0.65rem;">
            ${typeof getCartCount === "function" ? getCartCount() : 0}
        </span>
    </a>
  `;

  /* ---- Account ---- */
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
                <a class="dropdown-item" href="#" data-nav-page-id="profile">${getLabel("My Profile", "ملفي الشخصي")}</a>
                <a class="dropdown-item" href="#" data-nav-page-id="orders">${getLabel("My Orders", "طلباتي")}</a>
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

  /* ---- Theme ---- */
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
            <i class="fas fa-${appState.theme === "dark" ? "moon" : "sun"} mx-1"></i>
            ${getLabel("Theme", "الوضع")}
        </a>
        <div class="dropdown-menu" style="min-width: 6rem;">
            <a class="dropdown-item" href="#" data-action="toggle-theme">
                ${appState.theme === "dark" ? getLabel("Light", "الوضع الفاتح") : getLabel("Dark", "الوضع الداكن")}
            </a>
        </div>
    </div>
  `;

  /* ---- Language ---- */
  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
            <i class="fas fa-globe mx-1"></i>
            ${appState.language === "ar" ? "ع" : "EN"}
        </a>
        <div class="dropdown-menu ${appState.language === "ar" ? "text-start" : "text-end"}" style="min-width: 6rem;">
            <a class="dropdown-item" href="#" data-action="toggle-language">
                ${appState.language === "ar" ? "English" : "العربية"}
            </a>
        </div>
    </div>
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

    /* Search result → single product page */
    const searchResult = e.target.closest("[data-search-product-id]");
    if (searchResult) {
      e.preventDefault();
      setCurrentPage("single-product", searchResult.dataset.searchProductId);
      if (searchDropdown) searchDropdown.classList.add("d-none");
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
                    <a href="#" class="overlay-link" data-nav-page-id="${link.id}">
                        ${getLabel(link.label_en, link.label_ar)}
                    </a>`;
              })
              .join("")}
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
                <i class="fas fa-shopping-cart"></i>
                ${getLabel("Cart", "السلة")}
                <span class="badge bg-primary rounded-pill" id="mobileCartCount">
                    ${typeof getCartCount === "function" ? getCartCount() : 0}
                </span>
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
                           data-nav-page-id="products"
                           ${item.categoryId ? `data-category-id="${item.categoryId}"` : ""}
                           ${item.subCategoryId ? `data-sub-category-id="${item.subCategoryId}"` : ""}>
                            ${getLabel(item.label_en, item.label_ar)}
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
    case "contact":
      loadContactPage();
      break;
    case "single-product":
      loadSingleProductPage(appState.currentProductId);
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

const PRODUCTS_PER_PAGE = 12;
let currentPage = 1;

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

  const itemsHtml = categoriesData
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
   ALSO FIX — the relatedHtml template (was rendering `product.*`
   instead of `p.*`, so all 4 related cards showed the CURRENT
   product). Replace your existing relatedHtml block with this:
   ============================================================ */

/*
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
*/

/* ============================================================
   ALSO REMOVE — this block near the top of loadSingleProductPage().
   It attaches a NEW document-level listener every time the page
   loads, stacking duplicates. Move it into your global event setup
   (setupEventListeners) so it binds exactly once:

     document.addEventListener("click", async (e) => {
       const btn = e.target.closest(".copy-link");
       if (!btn) return;
       await navigator.clipboard.writeText(btn.dataset.url);
       btn.innerHTML = `<i class="fas fa-check"></i>`;
       setTimeout(() => { btn.innerHTML = `<i class="fas fa-link"></i>`; }, 1500);
     });
   ============================================================ */
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

  // ============================
  // UI Components
  // ============================
  await loadProductsData();
  await loadCategoriesData();

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

  // Sticky navbar on scroll
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
