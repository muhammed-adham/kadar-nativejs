// ── Contents ────────────────────────────────────────────
//  1. Global State & Configuration
//  2. Main App Data
//       Contact Placeholders · Navigation Links · Clients Data
//       About Us Data · Social Links · Share Links
//       Policy Tabs Data · Legal Documents · Product & Category Data
//  3. Utility Functions
//  4. Auth System · Google Sign-In · Password Reset
//  5. Military Access Gate (OTP)
//  6. Cart System
//  7. Mega Menu Column Definitions · Main Nav
//       Mobile Top Bar · Mobile Menu Overlay
//  8. Slider & Footer
//  9. Router
// 10. Pages
//       About · Products · Machinery · Military Products
//       News · Videos · Contact · Legal
//       Register & Login · Military Access · Single Product
//       Cart · Profile
// 11. CMS: Content Management · Admin Dashboard
// 12. Checkout Page
//       Order & Content Storage · Helpers · Events
//       Proof Upload · Validation · Order Submission
// 13. Home Page Sections
// 14. App Initialization
// ────────────────────────────────────────────────────────

// ── Global State & Configuration ──
const appState = {
  currentPage: "home",
  direction: localStorage.getItem("direction") || "ltr",
  language: localStorage.getItem("language") || "en",
  theme: localStorage.getItem("theme") || "light",
  currentSlide: 0,
  selectedCategory: "",
  selectedSubcategory: "",
  currentProductId: "",
  user: null,
};

// ── Main App Data ──

// ── Contact Placeholders ──
const RESERVATION_WHATSAPP = "2015 5633 6160";
const RESERVATION_EMAIL = "kaderfactory38@gmail.com";

// ── Navigation Links ──

const navigationLinks = [
  { id: "home", label_en: "Home", label_ar: "الصفحة الرئيسية", path: "#home" },

  { id: "about", label_en: "About", label_ar: "عن المصنع", path: "#about" },

  {
    id: "products",
    label_en: "Products",
    label_ar: "المنتجات",
    path: "#products",
    megaMenu: [],
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
    label_en: "Media",
    label_ar: "المحتوى الإعلامي",
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

let bannerSlides = [];

async function loadBannerData() {
  try {
    const response = await fetch("/data/banner.json");
    const data = await response.json();
    bannerSlides = data.slides || [];
  } catch (e) {
    console.error("Failed to load banner.json", e);
    bannerSlides = [];
  }
}

let machineryData = [];

async function loadMachineryData() {
  try {
    const response = await fetch("/data/machinery.json");
    const data = await response.json();
    machineryData = data.machinery;
  } catch (e) {
    console.error("Failed to load machinery.json", e);
    machineryData = [];
  }
}

let newsItems = [];

async function loadNewsData() {
  try {
    const response = await fetch("/data/news.json");
    const data = await response.json();
    newsItems = data.news;
  } catch (e) {
    console.error("Failed to load news.json", e);
    newsItems = [];
  }
}

let videoItems = [];

async function loadVideosData() {
  try {
    const response = await fetch("/data/videos.json");
    const data = await response.json();
    videoItems = data.videos || [];
  } catch (e) {
    console.error("Failed to load videos.json", e);
    videoItems = [];
  }
}

// ── Clients Data ──
const clients = [
  { name: "Client 1", logo: "/images/prt-1.webp" },
  { name: "Client 2", logo: "/images/prt-2.webp" },
  { name: "Client 3", logo: "/images/prt-3.webp" },
  { name: "Client 4", logo: "/images/prt-4.webp" },
  { name: "Client 5", logo: "/images/prt-5.webp" },
  { name: "Client 6", logo: "/images/prt-6.webp" },
  { name: "Client 7", logo: "/images/prt-7.webp" },
];

// ── About Us Data ──
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

// ── Social Links ──
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

// ── Share Links ──
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

// ── Policy Tabs Data ──

const policyTabsContent = {
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
    linkLabel: null,
    linkPage: null,
  },
};

// ── Legal Documents ──

const legalDocuments = {
  returns: {
    id: "returns",
    icon: "fas fa-retweet",
    title: {
      en: "Return and Exchange Policy",
      ar: "سياسة الاستبدال والاسترجاع",
    },
    subtitle: {
      en: "Kader Factory Products",
      ar: "منتجات مصنع قادر",
    },
    intro: {
      en: "At Kader Factory, we are committed to achieving the highest levels of customer satisfaction. Therefore, we provide a clear and flexible return and exchange policy that protects customers' rights while ensuring the quality of the products offered.",
      ar: "حرصاً من مصنع قادر على تحقيق أعلى مستويات رضا العملاء، نلتزم بتقديم سياسة واضحة ومرنة للاستبدال والاسترجاع بما يضمن حقوق العملاء وجودة المنتجات المقدمة.",
    },
    sections: [
      {
        heading: {
          en: "First: Return and Exchange Period",
          ar: "أولاً: مدة الاستبدال والاسترجاع",
        },
        ordered: true,
        items: [
          {
            en: "Customers are entitled to return or exchange products within 14 days from the date of purchase, provided that the product is in its original condition and includes all accessories.",
            ar: "الاستبدال أو الاسترجاع خلال 14 يوماً من تاريخ الشراء، بشرط أن يكون المنتج بحالته الأصلية وبكامل ملحقاته.",
          },
          {
            en: "In the case of a verified manufacturing defect, customers may request a return or exchange within 30 days from the date of purchase, provided that a technical report confirming the defect is submitted.",
            ar: "في حال وجود عيب صناعي مثبت، يحق للعميل الاستبدال أو الاسترجاع خلال 30 يوماً من تاريخ الشراء، على أن يتم تقديم تقرير فني يثبت العيب.",
          },
        ],
      },
      {
        heading: {
          en: "Second: Return and Exchange Conditions",
          ar: "ثانياً: شروط الاستبدال والاسترجاع",
        },
        items: [
          {
            en: "The original purchase invoice must be presented when requesting a return or exchange.",
            ar: "تقديم فاتورة الشراء الأصلية عند طلب الاستبدال أو الاسترجاع.",
          },
          {
            en: "The product must be in its original condition with all packaging and accessories included.",
            ar: "أن يكون المنتج بحالته الأصلية وبكامل التغليف والملحقات.",
          },
          {
            en: "Returns or exchanges will not be accepted if damage occurs due to improper transportation, storage, or misuse by the customer.",
            ar: "لا يُقبل الاستبدال أو الاسترجاع في حال حدوث تلف نتج عن سوء النقل أو التخزين أو سوء استخدام من قِبل العميل.",
          },
        ],
      },
      {
        heading: {
          en: "Third: Non-Returnable Products",
          ar: "ثالثاً: المنتجات غير القابلة للاسترجاع",
        },
        lead: {
          en: "Certain products cannot be returned for health or operational reasons, including:",
          ar: "لا يمكن استرجاع بعض المنتجات لأسباب صحية أو تشغيلية، ومنها:",
        },
        items: [
          { en: "Perishable products.", ar: "المنتجات القابلة للتلف." },
          {
            en: "Products manufactured or customized specifically upon the customer's request.",
            ar: "المنتجات المصنعة أو المجهزة خصيصاً بناءً على طلب العميل.",
          },
        ],
      },
      {
        heading: {
          en: "Fourth: Refund Process",
          ar: "رابعاً: آلية استرداد الأموال",
        },
        paragraphs: [
          {
            en: "Once the returned product is received and inspected to confirm that it meets the return conditions, the refund request will be approved.",
            ar: "بعد استلام المنتج وفحصه للتأكد من مطابقته لشروط الاسترجاع، يتم اعتماد طلب الاسترداد.",
          },
          {
            en: "The refund will be processed within 5 to 10 business days.",
            ar: "على أن تتم إعادة المبلغ خلال 5 إلى 10 أيام عمل.",
          },
        ],
      },
      {
        heading: { en: "Fifth: Shipping Fees", ar: "خامساً: رسوم الشحن" },
        items: [
          {
            en: "Shipping fees are non-refundable.",
            ar: "رسوم الشحن غير قابلة للاسترداد.",
          },
          {
            en: "In case of a return, the return shipping cost will be deducted from the refund amount.",
            ar: "في حالة الاسترجاع، يتم خصم رسوم إعادة الشحن من قيمة المبلغ المسترد.",
          },
        ],
      },
      {
        heading: { en: "Sixth: Refund Method", ar: "سادساً: طريقة رد المبلغ" },
        lead: {
          en: "Refunds will be issued using the same payment method used for the original purchase:",
          ar: "يتم رد المبلغ بنفس وسيلة الدفع الأصلية:",
        },
        items: [
          {
            en: "Electronic payments (bank cards): within 14 business days after the request is approved.",
            ar: "الدفع الإلكتروني (بطاقات بنكية): خلال 14 يوم عمل من اعتماد الطلب.",
          },
          {
            en: "Cash payments: the product value will be transferred via bank transfer within 7 business days after the request is approved.",
            ar: "الدفع النقدي: يتم تحويل قيمة المنتج عبر تحويل بنكي خلال 7 أيام عمل من اعتماد الطلب.",
          },
        ],
      },
    ],
    footNote: {
      en: "If you have any questions regarding the return and exchange policy, please contact our Customer Service Team, and we will be happy to assist you.",
      ar: "في حال وجود أي استفسارات، يرجى التواصل مع فريق خدمة العملاء، ويسعدنا دائماً خدمتكم.",
    },
  },

  warranty: {
    id: "warranty",
    icon: "fas fa-shield-alt",
    title: { en: "Warranty Terms", ar: "شروط الضمان" },
    subtitle: { en: "Kader Factory Products", ar: "منتجات مصنع قادر" },
    intro: {
      en: "Kader Factory is committed to delivering products that meet high-quality standards. This warranty covers defects resulting from manufacturing faults in accordance with the following terms and conditions:",
      ar: "يحرص مصنع قادر على تقديم منتجات بمعايير جودة عالية، ويغطي الضمان العيوب الناتجة عن عيوب الصناعة وفقاً للشروط التالية:",
    },
    sections: [
      {
        heading: { en: "First: Warranty Period", ar: "أولاً: مدة الضمان" },
        items: [
          {
            en: "The warranty period shall apply as specified in the warranty certificate or the purchase invoice for each product.",
            ar: "تسري مدة الضمان وفقاً لما هو محدد في شهادة الضمان أو فاتورة الشراء لكل منتج.",
          },
          {
            en: "The warranty period commences from the purchase date indicated on the invoice.",
            ar: "تبدأ فترة الضمان من تاريخ الشراء المثبت بالفاتورة.",
          },
        ],
      },
      {
        heading: { en: "Second: Scope of Warranty", ar: "ثانياً: نطاق الضمان" },
        lead: { en: "The warranty covers:", ar: "يشمل الضمان:" },
        items: [
          {
            en: "Malfunctions resulting from manufacturing defects or material faults.",
            ar: "الأعطال الناتجة عن عيوب تصنيع أو خلل في الخامات.",
          },
          {
            en: "Repair or replacement of defective parts without charging the customer for spare parts or repair labor during the warranty period.",
            ar: "استبدال أو إصلاح الأجزاء المتضررة دون تحميل العميل تكلفة قطع الغيار أو أجور الإصلاح خلال فترة الضمان.",
          },
        ],
        note: {
          en: "The appropriate action (repair or replacement) will be determined after the product undergoes an authorized technical inspection.",
          ar: "ويتم تحديد الإجراء المناسب (إصلاح أو استبدال) بعد الفحص الفني المعتمد.",
        },
      },
      {
        heading: {
          en: "Third: Warranty Exclusions",
          ar: "ثالثاً: ما لا يشمله الضمان",
        },
        lead: {
          en: "The warranty does not cover the following cases:",
          ar: "لا يغطي الضمان الحالات التالية:",
        },
        items: [
          {
            en: "Damage resulting from misuse, negligence, or improper storage.",
            ar: "التلف الناتج عن سوء الاستخدام أو الإهمال أو سوء التخزين.",
          },
          {
            en: "Damage caused by accidents, impacts, or natural disasters.",
            ar: "التلف الناتج عن الحوادث أو الصدمات أو الكوارث الطبيعية.",
          },
          {
            en: "Malfunctions resulting from installation or operation that does not comply with the product instructions.",
            ar: "الأعطال الناتجة عن تركيب أو تشغيل غير مطابق لتعليمات التشغيل.",
          },
          {
            en: "Any modification or repair carried out by an unauthorized service provider.",
            ar: "أي تعديل أو إصلاح تم بواسطة جهة غير معتمدة من المصنع.",
          },
          {
            en: "Consumable parts that deteriorate as a result of normal use.",
            ar: "الأجزاء الاستهلاكية التي تتعرض للتلف نتيجة الاستخدام الطبيعي.",
          },
        ],
      },
      {
        heading: {
          en: "Fourth: Warranty Eligibility Requirements",
          ar: "رابعاً: شروط الاستفادة من الضمان",
        },
        lead: {
          en: "To benefit from the warranty, the following conditions must be met:",
          ar: "للاستفادة من الضمان، يجب استيفاء الشروط التالية:",
        },
        items: [
          {
            en: "Presenting the original purchase invoice or the official warranty certificate.",
            ar: "تقديم فاتورة الشراء الأصلية أو شهادة الضمان المعتمدة.",
          },
          {
            en: "The product must not be tampered with, and the serial number must remain intact.",
            ar: "عدم العبث بالمنتج أو إزالة الرقم التسلسلي.",
          },
          {
            en: "The product must be submitted for inspection at one of the authorized service centers.",
            ar: "تسليم المنتج للفحص الفني في أحد مراكز الخدمة المعتمدة.",
          },
        ],
      },
      {
        heading: {
          en: "Fifth: Warranty Service Procedure",
          ar: "خامساً: آلية تنفيذ الضمان",
        },
        items: [
          {
            en: "The product will be examined within a reasonable period after it is received.",
            ar: "يتم فحص المنتج خلال فترة زمنية مناسبة من تاريخ الاستلام.",
          },
          {
            en: "If a manufacturing defect is confirmed, the product will be repaired or replaced in accordance with the technical department's assessment.",
            ar: "في حال ثبوت عيب صناعي، يتم الإصلاح أو الاستبدال وفقاً لتقدير الإدارة الفنية.",
          },
          {
            en: "The warranty does not entitle the customer to any compensation exceeding the value of the product.",
            ar: "لا يترتب على الضمان أي تعويضات إضافية تتجاوز قيمة المنتج.",
          },
        ],
      },
    ],
    footNote: {
      en: "For any inquiries regarding the warranty or maintenance requests, please contact Customer Service or visit the nearest authorized service center.",
      ar: "لأي استفسارات متعلقة بالضمان أو طلبات الصيانة، يرجى التواصل مع خدمة العملاء أو أقرب مركز خدمة معتمد.",
    },
  },

// Boilerplate, not legal advice — have counsel review before relying on it.
  privacy: {
    id: "privacy",
    icon: "fas fa-user-shield",
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    subtitle: {
      en: "Kader Factory for Advanced Industries",
      ar: "مصنع قادر للصناعات المتطورة",
    },
    updated: {
      en: "Last updated: 25 August 2026",
      ar: "آخر تحديث: 25 أغسطس 2026",
    },
    intro: {
      en: "Your privacy matters to us. This policy explains what personal information we collect when you use this website, how we use it, who we share it with, and the choices available to you.",
      ar: "خصوصيتك تهمنا. توضح هذه السياسة المعلومات الشخصية التي نجمعها عند استخدامك لهذا الموقع، وكيفية استخدامها، والجهات التي قد نشاركها معها، والخيارات المتاحة لك.",
    },
    sections: [
      {
        heading: {
          en: "First: Scope of This Policy",
          ar: "أولاً: نطاق هذه السياسة",
        },
        paragraphs: [
          {
            en: "This policy applies to this website and to the services offered through it by Kader Factory for Advanced Industries (\"Kader Factory\", \"we\", \"us\").",
            ar: "تسري هذه السياسة على هذا الموقع وعلى الخدمات المقدمة من خلاله من قِبل مصنع قادر للصناعات المتطورة (\"مصنع قادر\"، \"نحن\").",
          },
          {
            en: "It does not apply to third-party websites we link to, which are governed by their own privacy policies.",
            ar: "ولا تسري على مواقع الجهات الخارجية التي قد نضع روابط لها، حيث تخضع تلك المواقع لسياسات الخصوصية الخاصة بها.",
          },
        ],
      },
      {
        heading: {
          en: "Second: Information We Collect",
          ar: "ثانياً: المعلومات التي نجمعها",
        },
        lead: {
          en: "We collect the following categories of information:",
          ar: "نقوم بجمع الفئات التالية من المعلومات:",
        },
        items: [
          {
            en: "<strong>Account information</strong> — the name, email address and phone number you provide when you create an account, or the name and email address shared by Google if you choose to sign in with Google.",
            ar: "<strong>معلومات الحساب</strong> — الاسم والبريد الإلكتروني ورقم الهاتف التي تقدمها عند إنشاء حساب، أو الاسم والبريد الإلكتروني اللذين تشاركهما جوجل في حال اخترت تسجيل الدخول عبر جوجل.",
          },
          {
            en: "<strong>Order information</strong> — the products you order, your delivery address, contact details and order history.",
            ar: "<strong>معلومات الطلبات</strong> — المنتجات التي تطلبها وعنوان التوصيل وبيانات التواصل وسجل الطلبات.",
          },
          {
            en: "<strong>Payment information</strong> — payments are processed by our payment providers. We receive confirmation of the transaction and limited details such as the payment method and the last digits of the card. We do not store full card numbers.",
            ar: "<strong>معلومات الدفع</strong> — تتم معالجة المدفوعات عبر مزودي خدمات الدفع لدينا. ونستلم تأكيد العملية وبيانات محدودة مثل وسيلة الدفع وآخر أرقام البطاقة، ولا نحتفظ بأرقام البطاقات كاملة.",
          },
          {
            en: "<strong>Messages you send us</strong> — the content of enquiries submitted through our contact form, by email, by phone or through WhatsApp.",
            ar: "<strong>الرسائل التي ترسلها إلينا</strong> — محتوى الاستفسارات المرسلة عبر نموذج التواصل أو البريد الإلكتروني أو الهاتف أو واتساب.",
          },
          {
            en: "<strong>Verification data</strong> — where access to a restricted product category requires verification, we process the contact details used to send and confirm the one-time code.",
            ar: "<strong>بيانات التحقق</strong> — في حال تطلّب الوصول إلى فئة منتجات مقيّدة إجراء تحقق، نعالج بيانات التواصل المستخدمة لإرسال رمز التحقق لمرة واحدة وتأكيده.",
          },
          {
            en: "<strong>Technical information</strong> — IP address, browser and device type, pages visited and the date and time of your visit, collected automatically as you browse.",
            ar: "<strong>المعلومات التقنية</strong> — عنوان IP ونوع المتصفح والجهاز والصفحات التي تمت زيارتها وتاريخ ووقت الزيارة، ويتم جمعها تلقائياً أثناء تصفحك للموقع.",
          },
        ],
      },
      {
        heading: {
          en: "Third: How We Use Your Information",
          ar: "ثالثاً: كيفية استخدام معلوماتك",
        },
        lead: {
          en: "We use your information to:",
          ar: "نستخدم معلوماتك من أجل:",
        },
        items: [
          {
            en: "Create and manage your account and keep you signed in.",
            ar: "إنشاء حسابك وإدارته والحفاظ على تسجيل دخولك.",
          },
          {
            en: "Process, deliver and support your orders, including returns, exchanges and warranty claims.",
            ar: "معالجة طلباتك وتوصيلها ودعمها، بما في ذلك عمليات الاسترجاع والاستبدال وطلبات الضمان.",
          },
          {
            en: "Respond to your enquiries and provide customer service.",
            ar: "الرد على استفساراتك وتقديم خدمة العملاء.",
          },
          {
            en: "Send you service messages relating to your account or your orders.",
            ar: "إرسال رسائل الخدمة المتعلقة بحسابك أو طلباتك.",
          },
          {
            en: "Send you marketing communications where you have asked to receive them. You may unsubscribe at any time.",
            ar: "إرسال الرسائل التسويقية في حال طلبت تلقيها، ويمكنك إلغاء الاشتراك في أي وقت.",
          },
          {
            en: "Operate, secure and improve the website, and detect and prevent fraud or misuse.",
            ar: "تشغيل الموقع وتأمينه وتحسينه، واكتشاف الاحتيال أو إساءة الاستخدام ومنعهما.",
          },
          {
            en: "Meet our legal, accounting and regulatory obligations.",
            ar: "الوفاء بالتزاماتنا القانونية والمحاسبية والتنظيمية.",
          },
        ],
      },
      {
        heading: {
          en: "Fourth: Cookies and Browser Storage",
          ar: "رابعاً: ملفات تعريف الارتباط والتخزين في المتصفح",
        },
        paragraphs: [
          {
            en: "This website stores small amounts of data in your browser so that it works properly. This includes your sign-in session, your language and theme preferences, and the contents of your shopping cart.",
            ar: "يخزّن هذا الموقع قدراً محدوداً من البيانات في متصفحك لتمكينه من العمل بشكل صحيح، ويشمل ذلك جلسة تسجيل الدخول وتفضيلات اللغة والمظهر ومحتويات سلة التسوق.",
          },
          {
            en: "You can clear this data at any time through your browser settings. Doing so will sign you out and reset your preferences.",
            ar: "يمكنك حذف هذه البيانات في أي وقت من إعدادات المتصفح، وسيؤدي ذلك إلى تسجيل خروجك وإعادة ضبط تفضيلاتك.",
          },
        ],
      },
      {
        heading: {
          en: "Fifth: Sharing Your Information",
          ar: "خامساً: مشاركة معلوماتك",
        },
        lead: {
          en: "We do not sell your personal information. We share it only with:",
          ar: "نحن لا نبيع معلوماتك الشخصية، ولا نشاركها إلا مع:",
        },
        items: [
          {
            en: "<strong>Service providers</strong> acting on our behalf, such as payment processors, delivery and shipping companies, and IT and hosting providers.",
            ar: "<strong>مزودي الخدمات</strong> الذين يعملون نيابة عنا، مثل مزودي خدمات الدفع وشركات الشحن والتوصيل ومزودي خدمات تقنية المعلومات والاستضافة.",
          },
          {
            en: "<strong>Authorised service centres</strong>, where this is necessary to carry out a warranty or maintenance request.",
            ar: "<strong>مراكز الخدمة المعتمدة</strong>، عند الضرورة لتنفيذ طلب ضمان أو صيانة.",
          },
          {
            en: "<strong>Authorities or professional advisers</strong>, where we are required to do so by law, or to establish, exercise or defend legal claims.",
            ar: "<strong>الجهات الرسمية أو المستشارين المهنيين</strong>، عندما يقتضي القانون ذلك، أو لإثبات الحقوق القانونية أو ممارستها أو الدفاع عنها.",
          },
        ],
        note: {
          en: "Where a service provider is located outside your country, we take steps to ensure your information remains protected.",
          ar: "في حال كان أحد مزودي الخدمة خارج بلدك، نتخذ الإجراءات اللازمة لضمان استمرار حماية معلوماتك.",
        },
      },
      {
        heading: {
          en: "Sixth: How Long We Keep Your Information",
          ar: "سادساً: مدة الاحتفاظ بمعلوماتك",
        },
        paragraphs: [
          {
            en: "We keep your personal information only for as long as it is needed for the purposes described in this policy.",
            ar: "نحتفظ بمعلوماتك الشخصية للمدة اللازمة فقط لتحقيق الأغراض الموضحة في هذه السياسة.",
          },
          {
            en: "Order, invoice and warranty records are kept for as long as required to meet our legal, tax and accounting obligations. Account information is kept while your account remains open.",
            ar: "ويتم الاحتفاظ بسجلات الطلبات والفواتير والضمان طوال المدة المطلوبة للوفاء بالتزاماتنا القانونية والضريبية والمحاسبية، ويتم الاحتفاظ بمعلومات الحساب طالما ظل حسابك مفعّلاً.",
          },
        ],
      },
      {
        heading: { en: "Seventh: Data Security", ar: "سابعاً: أمن البيانات" },
        paragraphs: [
          {
            en: "We apply appropriate technical and organisational measures to protect your information against loss, misuse and unauthorised access.",
            ar: "نطبّق إجراءات تقنية وتنظيمية مناسبة لحماية معلوماتك من الفقدان وسوء الاستخدام والوصول غير المصرح به.",
          },
          {
            en: "No method of transmission over the internet is completely secure, so we cannot guarantee absolute security. Please keep your account password confidential and do not share it with anyone.",
            ar: "ولا توجد وسيلة نقل عبر الإنترنت آمنة بشكل كامل، لذا لا يمكننا ضمان الأمان المطلق. يرجى الحفاظ على سرية كلمة مرور حسابك وعدم مشاركتها مع أي شخص.",
          },
        ],
      },
      {
        heading: { en: "Eighth: Your Rights", ar: "ثامناً: حقوقك" },
        lead: {
          en: "Subject to applicable law, you may:",
          ar: "وفقاً للقوانين المعمول بها، يحق لك:",
        },
        items: [
          {
            en: "Request a copy of the personal information we hold about you.",
            ar: "طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك.",
          },
          {
            en: "Ask us to correct information that is inaccurate or incomplete.",
            ar: "طلب تصحيح المعلومات غير الدقيقة أو غير المكتملة.",
          },
          {
            en: "Ask us to delete your information, where there is no legal reason for us to keep it.",
            ar: "طلب حذف معلوماتك، ما لم يوجد سبب قانوني يلزمنا بالاحتفاظ بها.",
          },
          {
            en: "Object to, or ask us to restrict, certain uses of your information.",
            ar: "الاعتراض على بعض استخدامات معلوماتك أو طلب تقييدها.",
          },
          {
            en: "Withdraw your consent at any time, where we rely on consent.",
            ar: "سحب موافقتك في أي وقت، في الحالات التي نعتمد فيها على الموافقة.",
          },
          {
            en: "Unsubscribe from marketing communications.",
            ar: "إلغاء الاشتراك في الرسائل التسويقية.",
          },
        ],
        note: {
          en: "To exercise any of these rights, contact us using the details below. We may need to verify your identity before acting on your request.",
          ar: "لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر البيانات الموضحة أدناه. وقد نحتاج إلى التحقق من هويتك قبل تنفيذ طلبك.",
        },
      },
      {
        heading: { en: "Ninth: Children's Privacy", ar: "تاسعاً: خصوصية الأطفال" },
        paragraphs: [
          {
            en: "This website is not directed at children, and we do not knowingly collect personal information from anyone under the age of 18. If you believe a child has provided us with personal information, please contact us and we will delete it.",
            ar: "هذا الموقع غير موجّه للأطفال، ولا نجمع عن قصد أي معلومات شخصية ممن تقل أعمارهم عن 18 عاماً. وإذا كنت تعتقد أن طفلاً قد زوّدنا بمعلومات شخصية، يرجى التواصل معنا وسنقوم بحذفها.",
          },
        ],
      },
      {
        heading: {
          en: "Tenth: Links to Other Websites",
          ar: "عاشراً: الروابط إلى مواقع أخرى",
        },
        paragraphs: [
          {
            en: "Our website may contain links to other websites, including social media platforms and video services. We are not responsible for the privacy practices of those websites, and we encourage you to read their privacy policies.",
            ar: "قد يحتوي موقعنا على روابط لمواقع أخرى، بما في ذلك منصات التواصل الاجتماعي وخدمات الفيديو. ولسنا مسؤولين عن ممارسات الخصوصية في تلك المواقع، وننصحك بالاطلاع على سياسات الخصوصية الخاصة بها.",
          },
        ],
      },
      {
        heading: {
          en: "Eleventh: Changes to This Policy",
          ar: "الحادي عشر: التعديلات على هذه السياسة",
        },
        paragraphs: [
          {
            en: "We may update this policy from time to time. Any changes will be published on this page and the date shown at the top will be updated, so please review it periodically.",
            ar: "قد نقوم بتحديث هذه السياسة من وقت لآخر. وسيتم نشر أي تغييرات على هذه الصفحة مع تحديث التاريخ الموضح في أعلاها، لذا يرجى مراجعتها بشكل دوري.",
          },
        ],
      },
      {
        heading: { en: "Twelfth: Contact Us", ar: "الثاني عشر: التواصل معنا" },
        lead: {
          en: "If you have any questions about this policy or about how your information is handled, please contact us:",
          ar: "إذا كان لديك أي استفسار حول هذه السياسة أو حول كيفية التعامل مع معلوماتك، يرجى التواصل معنا:",
        },
        items: [
          {
            en: "<strong>Email:</strong> <a href=\"mailto:kaderfactory38@gmail.com\">kaderfactory38@gmail.com</a>",
            ar: "<strong>البريد الإلكتروني:</strong> <a href=\"mailto:kaderfactory38@gmail.com\">kaderfactory38@gmail.com</a>",
          },
          {
            en: "<strong>Phone / WhatsApp:</strong> <a href=\"tel:+201556336160\" dir=\"ltr\">+20 155 633 6160</a>",
            ar: "<strong>الهاتف / واتساب:</strong> <a href=\"tel:+201556336160\" dir=\"ltr\">+20 155 633 6160</a>",
          },
          {
            en: "<strong>Address:</strong> 2 El Tayaran St, Nasr City, Cairo, Egypt",
            ar: "<strong>العنوان:</strong> 2 ش الطيران، مدينة نصر، القاهرة، مصر",
          },
        ],
      },
    ],
    footNote: {
      en: "We are committed to handling your information responsibly and in accordance with applicable data protection laws.",
      ar: "نلتزم بالتعامل مع معلوماتك بمسؤولية ووفقاً لقوانين حماية البيانات المعمول بها.",
    },
  },
};

function legalSectionId(docId, index) {
  return `legal-${docId}-${index + 1}`;
}

function legalSectionHtml(doc, section, index) {
  const listTag = section.ordered ? "ol" : "ul";

  return `
    <section class="legal-section" id="${legalSectionId(doc.id, index)}">
      <h3 class="legal-section-title h5 fw-bold d-flex align-items-baseline gap-2">
        <span class="legal-section-mark" aria-hidden="true"></span>
        <span>${getLabel(section.heading.en, section.heading.ar)}</span>
      </h3>

      ${
        section.lead
          ? `<p class="legal-lead">${getLabel(section.lead.en, section.lead.ar)}</p>`
          : ""
      }

      ${
        section.items
          ? `<${listTag} class="legal-list">
              ${section.items
                .map(
                  (item) =>
                    `<li>${getLabel(item.en, item.ar)}</li>`,
                )
                .join("")}
             </${listTag}>`
          : ""
      }

      ${
        section.paragraphs
          ? section.paragraphs
              .map((p) => `<p class="legal-text">${getLabel(p.en, p.ar)}</p>`)
              .join("")
          : ""
      }

      ${
        section.note
          ? `<p class="legal-note">
               <i class="fas fa-info-circle ${getDirectionClass("me-2", "ms-2")}"></i>
               ${getLabel(section.note.en, section.note.ar)}
             </p>`
          : ""
      }
    </section>
  `;
}

function legalDocHtml(doc) {
  return `
    <article class="legal-doc" id="legal-${doc.id}">
      <header class="legal-doc-head">
        <span class="legal-doc-icon"><i class="${doc.icon}"></i></span>
        <div>
          <h2 class="h3 fw-bold mb-1">${getLabel(doc.title.en, doc.title.ar)}</h2>
          <p class="text-muted mb-0 small text-uppercase legal-doc-sub">
            ${getLabel(doc.subtitle.en, doc.subtitle.ar)}
          </p>
        </div>
      </header>

      <p class="legal-intro">${getLabel(doc.intro.en, doc.intro.ar)}</p>

      ${doc.sections.map((s, i) => legalSectionHtml(doc, s, i)).join("")}

      <p class="legal-footnote">
        <i class="fas fa-headset ${getDirectionClass("me-2", "ms-2")}"></i>
        ${getLabel(doc.footNote.en, doc.footNote.ar)}
      </p>
    </article>
  `;
}

function legalTocHtml(docs) {
  return `
    <nav class="legal-toc" aria-label="${getLabel("On this page", "في هذه الصفحة")}">
      <p class="legal-toc-title">${getLabel("On this page", "في هذه الصفحة")}</p>
      ${docs
        .map(
          (doc) => `
        <a class="legal-toc-doc" href="#legal-${doc.id}">
          <i class="${doc.icon} ${getDirectionClass("me-2", "ms-2")}"></i>
          ${getLabel(doc.title.en, doc.title.ar)}
        </a>
        <ol class="legal-toc-list">
          ${doc.sections
            .map(
              (section, i) => `
            <li>
              <a href="#${legalSectionId(doc.id, i)}">
                ${getLabel(section.heading.en, section.heading.ar)}
              </a>
            </li>`,
            )
            .join("")}
        </ol>`,
        )
        .join("")}
    </nav>
  `;
}

// ── Product & Category Data ──

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

// ── Utility Functions ──

function getLabel(en, ar) {
  return appState.language === "ar" ? ar : en;
}

function getDirectionClass(enClass, arClass) {
  return appState.direction === "rtl" ? arClass : enClass;
}

function setTheme(theme) {
  appState.theme = theme;
  localStorage.setItem("theme", theme);
  document.body.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-bs-theme", theme);
  updateLogoBasedOnTheme();
  initializeNavigation();
}

function toggleTheme() {
  setTheme(appState.theme === "light" ? "dark" : "light");
}

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

function setLanguage(lang) {
  const newDir = lang === "ar" ? "rtl" : "ltr";

  appState.language = lang;
  appState.direction = newDir;

  localStorage.setItem("language", lang);
  localStorage.setItem("direction", newDir);

  document.documentElement.lang = lang;
  document.documentElement.dir = newDir;

  location.reload();
}

function toggleLanguage() {
  setLanguage(appState.language === "ar" ? "en" : "ar");
}

// ── Auth System ──

// DEMO ONLY — passwords are never checked. Not safe to ship.
const DEMO_ADMIN_EMAIL = "admin@kader-factory.com";

const SESSION_KEY = "admin";

function initializeAuth() {
  try {
    const saved =
      sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    appState.user = saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Failed to load user session", e);
    appState.user = null;
  }
}

function loginUser(user, remember) {
  appState.user = user;

  let store;
  if (remember === undefined) {
    store = sessionStorage.getItem(SESSION_KEY) ? sessionStorage : localStorage;
  } else {
    store = remember ? localStorage : sessionStorage;
  }

  (store === localStorage ? sessionStorage : localStorage).removeItem(
    SESSION_KEY,
  );
  store.setItem(SESSION_KEY, JSON.stringify(user));

  initializeNavigation();
}

function logout() {
  appState.user = null;
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  initializeNavigation();
  setCurrentPage("home");
}

// ── Google Sign-In ──

// DEMO — the Google profile is trusted client-side; a server must verify it.
const GOOGLE_CLIENT_ID = "812452391552-uocctoj1jtoibf6587g11knmk50hg8dl.apps.googleusercontent.com";
const GOOGLE_GSI_SRC = "https://accounts.google.com/gsi/client";

let googleIdentityPromise = null;
function loadGoogleIdentityScript() {
  if (googleIdentityPromise) return googleIdentityPromise;

  googleIdentityPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GOOGLE_GSI_SRC;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      googleIdentityPromise = null;
      reject(new Error("Could not reach Google Identity Services"));
    };
    document.head.appendChild(script);
  });

  return googleIdentityPromise;
}

function completeGoogleSignIn(profile, remember) {
  const email = String(profile.email || "").trim();
  if (!email) return;

  const isAdmin = email.toLowerCase() === DEMO_ADMIN_EMAIL;
  const fallbackName = email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  loginUser(
    {
      name: profile.name || fallbackName,
      email,
      phone: "",
      role: isAdmin ? "admin" : "customer",
      provider: "google",
    },
    remember,
  );

  setCurrentPage(isAdmin ? "admin" : "profile");
}

function setGoogleButtonBusy(button, busy) {
  if (!button) return;
  button.disabled = busy;
  button.classList.toggle("disabled", busy);
}

async function startGoogleAuth(button, remember) {
  if (!GOOGLE_CLIENT_ID) {
    openGoogleDemoPicker(remember);
    return;
  }

  setGoogleButtonBusy(button, true);
  try {
    await loadGoogleIdentityScript();

    google.accounts.oauth2
      .initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "openid email profile",
        callback: async (response) => {
          setGoogleButtonBusy(button, false);

          if (response.error || !response.access_token) {
            if (response.error && response.error !== "access_denied") {
              console.error("Google sign-in failed", response);
            }
            return;
          }

          try {
            const res = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              { headers: { Authorization: `Bearer ${response.access_token}` } },
            );
            if (!res.ok) throw new Error(`userinfo ${res.status}`);
            const profile = await res.json();
            completeGoogleSignIn(profile, remember);
          } catch (err) {
            console.error("Google sign-in failed", err);
            alert(
              getLabel(
                "Could not complete Google sign-in. Please try again.",
                "تعذر إكمال تسجيل الدخول عبر جوجل. يرجى المحاولة مرة أخرى.",
              ),
            );
          }
        },
        error_callback: () => setGoogleButtonBusy(button, false),
      })
      .requestAccessToken();
  } catch (err) {
    setGoogleButtonBusy(button, false);
    console.error(err);
    alert(
      getLabel(
        "Could not reach Google. Check your connection and try again.",
        "تعذر الوصول إلى جوجل. تحقق من اتصالك وحاول مرة أخرى.",
      ),
    );
  }
}

function openGoogleDemoPicker(remember) {
  const accounts = [
    { name: "Adham Kader", email: "adham.kader@gmail.com" },
    { name: "Admin", email: DEMO_ADMIN_EMAIL },
  ];

  const initials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const host = document.createElement("div");
  host.className = "modal fade";
  host.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" style="max-width: 26rem;">
      <div class="modal-content rounded-0">
        <div class="modal-header border-0 pb-0">
          <div>
            <span class="d-flex align-items-center gap-2 fw-semibold">
              <i class="fab fa-google"></i>
              ${getLabel("Choose an account", "اختر حساباً")}
            </span>
            <small class="text-muted">${getLabel("to continue to Kader Factory", "للمتابعة إلى مصنع قادر")}</small>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body pt-3">
          <div class="list-group list-group-flush" id="googleDemoAccounts">
            ${accounts
              .map(
                (account) => `
              <button type="button" class="list-group-item list-group-item-action d-flex align-items-center gap-3 px-2"
                      data-google-email="${account.email}" data-google-name="${account.name}">
                <span class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-semibold"
                      style="width:2.25rem;height:2.25rem;font-size:.8rem;">${initials(account.name)}</span>
                <span class="${getDirectionClass("text-start", "text-end")}">
                  <span class="d-block fw-semibold small">${account.name}</span>
                  <span class="d-block text-muted small">${account.email}</span>
                </span>
              </button>`,
              )
              .join("")}

            <button type="button" class="list-group-item list-group-item-action d-flex align-items-center gap-3 px-2"
                    id="googleDemoOther">
              <span class="d-inline-flex align-items-center justify-content-center rounded-circle border text-muted"
                    style="width:2.25rem;height:2.25rem;">
                <i class="fas fa-user"></i>
              </span>
              <span class="small ${getDirectionClass("text-start", "text-end")}">
                ${getLabel("Use another account", "استخدام حساب آخر")}
              </span>
            </button>
          </div>

          <form id="googleDemoOtherForm" class="d-none mt-3">
            <label for="googleDemoEmail" class="form-label small fw-semibold">
              ${getLabel("Email address", "البريد الإلكتروني")}
            </label>
            <input type="email" class="form-control rounded-0 py-2" id="googleDemoEmail" required
                   placeholder="you@example.com">
            <button type="submit" class="btn btn-primary w-100 rounded-0 mt-3 py-2">
              ${getLabel("Continue", "متابعة")}
            </button>
          </form>

          <p class="alert alert-warning rounded-0 small mt-3 mb-0">
            <i class="fas fa-flask ${getDirectionClass("me-1", "ms-1")}"></i>
            ${getLabel(
              "Demo picker — Google is not contacted. Set GOOGLE_CLIENT_ID in script.js for the real flow.",
              "قائمة تجريبية — لا يتم الاتصال بجوجل. عيّن GOOGLE_CLIENT_ID في script.js لتفعيل التدفق الحقيقي.",
            )}
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(host);
  const modal = new bootstrap.Modal(host);

  host.addEventListener("hidden.bs.modal", () => host.remove());

  host.querySelectorAll("[data-google-email]").forEach((button) => {
    button.addEventListener("click", () => {
      modal.hide();
      completeGoogleSignIn(
        { name: button.dataset.googleName, email: button.dataset.googleEmail },
        remember,
      );
    });
  });

  const otherForm = host.querySelector("#googleDemoOtherForm");
  host.querySelector("#googleDemoOther").addEventListener("click", () => {
    host.querySelector("#googleDemoAccounts").classList.add("d-none");
    otherForm.classList.remove("d-none");
    host.querySelector("#googleDemoEmail").focus();
  });

  otherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = host.querySelector("#googleDemoEmail");
    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.classList.add("is-invalid");
      return;
    }
    modal.hide();
    completeGoogleSignIn({ email }, remember);
  });

  modal.show();
}

// ── Password Reset ──

// DEMO — no mail server: the reset link is shown on screen instead.
const PASSWORD_RESET_STORAGE_KEY = "passwordResetTokens";
const PASSWORD_RESET_TTL_MINUTES = 15;

function getPasswordResetTokens() {
  try {
    return JSON.parse(localStorage.getItem(PASSWORD_RESET_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function savePasswordResetTokens(tokens) {
  localStorage.setItem(PASSWORD_RESET_STORAGE_KEY, JSON.stringify(tokens));
}

function passwordResetStatus(record) {
  if (!record) return "missing";
  if (record.used) return "used";
  if (record.expiresAt < Date.now()) return "expired";
  return "active";
}

function createPasswordResetToken(email) {
  const now = Date.now();
  const normalised = String(email).trim().toLowerCase();

  const tokens = getPasswordResetTokens()
    .filter((t) => t.email !== normalised)
    .filter((t) => t.expiresAt > now - 24 * 60 * 60 * 1000);

  const record = {
    token: `prt_${now.toString(36)}_${Math.random().toString(36).slice(2, 12)}`,
    email: normalised,
    createdAt: now,
    expiresAt: now + PASSWORD_RESET_TTL_MINUTES * 60 * 1000,
    used: false,
    usedAt: null,
  };

  tokens.push(record);
  savePasswordResetTokens(tokens);
  return record;
}

function findPasswordResetToken(token) {
  return getPasswordResetTokens().find((t) => t.token === token) || null;
}

function consumePasswordResetToken(token) {
  const tokens = getPasswordResetTokens().map((t) =>
    t.token === token ? { ...t, used: true, usedAt: Date.now() } : t,
  );
  savePasswordResetTokens(tokens);
}

function passwordResetLink(token) {
  return `${location.origin}${location.pathname}#reset-password/${token}`;
}

function passwordResetMinutesLeft(record) {
  return Math.max(0, Math.ceil((record.expiresAt - Date.now()) / 60000));
}

function authShellHtml({ title, subtitle, body, footer }) {
  return `
    <div class="container-fluid p-0">
      <div class="row g-0 min-vh-100">
        <div class="col-lg-4 d-none d-lg-flex signup-visual-panel position-relative vh-100">
          <div class="signup-visual-overlay"></div>
          <div class="position-relative d-flex align-items-start flex-column justify-content-between p-5">
            <a href="#home" data-nav-page-id="home">
              <img src="/images/logo-kader-white.png" alt="KADER" style="max-height: 3.2rem; object-fit:contain;">
            </a>
            <div>
              <h2 class="display-4 fw-bold mb-3 text-primary">${title}</h2>
              <p class="text-white-50 mb-0" style="max-width: 400px;">${subtitle}</p>
            </div>
            <span class="text-white-50 small">${getLabel("© 2026 Kader Factory for Advanced Industries", "© 2026 مصنع قادر للصناعات المتطورة")}</span>
          </div>
        </div>

        <div class="col-lg-8 d-flex align-items-center justify-content-center py-5">
          <div class="w-100 px-4 px-md-5" style="max-width: 440px;">
            ${body}
            <div class="text-center mt-4">${footer}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function loadForgotPasswordPage() {
  const host = document.getElementById("forgotPasswordPageContent");
  if (!host) return;

  host.innerHTML = authShellHtml({
    title: getLabel("Forgot your password?", "نسيت كلمة المرور؟"),
    subtitle: getLabel(
      "Enter the email on your account and we will send you a link to choose a new password.",
      "أدخل البريد الإلكتروني المسجل وسنرسل لك رابطاً لاختيار كلمة مرور جديدة.",
    ),
    body: `
      <div class="text-center ${getDirectionClass("text-lg-start", "text-lg-end")} mb-4">
        <h3 class="fw-bold mb-2">${getLabel("Reset your password", "إعادة تعيين كلمة المرور")}</h3>
        <p class="text-muted small mb-0">
          ${getLabel(
            "The link stays valid for " + PASSWORD_RESET_TTL_MINUTES + " minutes.",
            "الرابط صالح لمدة " + PASSWORD_RESET_TTL_MINUTES + " دقيقة.",
          )}
        </p>
      </div>

      <form id="forgotPasswordForm" novalidate>
        <div class="mb-3">
          <label for="forgotEmail" class="form-label small fw-semibold">${getLabel("Email address", "البريد الإلكتروني")}</label>
          <input type="email" class="form-control py-3 rounded-0" id="forgotEmail" autocomplete="email" required placeholder="you@example.com">
          <div class="invalid-feedback" id="forgotEmailError"></div>
        </div>
        <button type="submit" class="btn btn-primary w-100 py-3 rounded-0">
          ${getLabel("Send reset link", "إرسال رابط إعادة التعيين")}
        </button>
      </form>

      <div id="forgotPasswordSent" class="d-none mt-4">
        <div class="alert alert-success rounded-0 mb-3">
          <i class="fas fa-check-circle ${getDirectionClass("me-2", "ms-2")}"></i>
          ${getLabel(
            "If that address has an account, a reset link is on its way.",
            "إذا كان هذا البريد مسجلاً، فسيصلك رابط إعادة التعيين.",
          )}
        </div>

        <div class="alert alert-warning rounded-0 small mb-0">
          <strong class="d-block mb-1">
            ${getLabel("Demo build", "نسخة تجريبية")}
          </strong>
          
          <a href="#" id="forgotPasswordLink" class="d-block text-break fw-semibold mb-2"></a>
        </div>
      </div>
    `,
    footer:
      '<a href="#login" class="small btn btn-link ps-3 text-decoration-none" data-nav-page-id="login">' +
      getLabel("Back to sign in", "العودة لتسجيل الدخول") +
      "</a>",
  });

  const form = document.getElementById("forgotPasswordForm");
  const input = document.getElementById("forgotEmail");
  const error = document.getElementById("forgotEmailError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.classList.add("is-invalid");
      error.textContent = getLabel(
        "Enter a valid email address",
        "أدخل بريداً إلكترونياً صحيحاً",
      );
      return;
    }
    input.classList.remove("is-invalid");

    const record = createPasswordResetToken(email);

    form.classList.add("d-none");
    document.getElementById("forgotPasswordSent").classList.remove("d-none");

    const link = document.getElementById("forgotPasswordLink");
    link.textContent = passwordResetLink(record.token);
    link.href = "#reset-password/" + record.token;
    link.addEventListener("click", (ev) => {
      ev.preventDefault();
      appState.passwordResetToken = record.token;
      setCurrentPage("reset-password");
    });

    document.getElementById("forgotPasswordExpiry").textContent = getLabel(
      "Expires in " + passwordResetMinutesLeft(record) + " minutes.",
      "ينتهي خلال " + passwordResetMinutesLeft(record) + " دقيقة.",
    );
  });
}

function loadResetPasswordPage() {
  const host = document.getElementById("resetPasswordPageContent");
  if (!host) return;

  const token = appState.passwordResetToken || "";
  const record = findPasswordResetToken(token);
  const status = passwordResetStatus(record);

  if (status !== "active") {
    const reason = {
      missing: getLabel(
        "This reset link is not valid.",
        "رابط إعادة التعيين هذا غير صالح.",
      ),
      expired: getLabel(
        "This reset link has expired. Links are only valid for " + PASSWORD_RESET_TTL_MINUTES + " minutes.",
        "انتهت صلاحية هذا الرابط. الروابط صالحة لمدة " + PASSWORD_RESET_TTL_MINUTES + " دقيقة فقط.",
      ),
      used: getLabel(
        "This reset link has already been used.",
        "تم استخدام رابط إعادة التعيين هذا بالفعل.",
      ),
    }[status];

    host.innerHTML = authShellHtml({
      title: getLabel("Link no longer valid", "الرابط لم يعد صالحاً"),
      subtitle: getLabel(
        "Reset links are short-lived and single-use, for your account's safety.",
        "روابط إعادة التعيين قصيرة الأجل وتُستخدم مرة واحدة، حفاظاً على أمان حسابك.",
      ),
      body: `
        <div class="text-center">
          <i class="fas fa-unlink text-danger" style="font-size:2.5rem;"></i>
          <h3 class="fw-bold mt-3 mb-2">${getLabel("Something went wrong", "حدث خطأ ما")}</h3>
          <p class="text-muted">${reason}</p>
          <a href="#forgot-password" class="btn btn-primary w-100 py-3 rounded-0 mt-2" data-nav-page-id="forgot-password">
            ${getLabel("Request a new link", "اطلب رابطاً جديداً")}
          </a>
        </div>
      `,
      footer:
        '<a href="#login" class="small text-decoration-none" data-nav-page-id="login">' +
        getLabel("Back to sign in", "العودة لتسجيل الدخول") +
        "</a>",
    });
    return;
  }

  host.innerHTML = authShellHtml({
    title: getLabel("Choose a new password", "اختر كلمة مرور جديدة"),
    subtitle: getLabel(
      "Pick something you have not used on this account before.",
      "اختر كلمة مرور لم تستخدمها من قبل على هذا الحساب.",
    ),
    body: `
      <div class="text-center ${getDirectionClass("text-lg-start", "text-lg-end")} mb-4">
        <h3 class="fw-bold mb-2">${getLabel("New password", "كلمة مرور جديدة")}</h3>
        <p class="text-muted small mb-1">${record.email}</p>
        <p class="small mb-0 fw-semibold text-primary" id="resetCountdown"></p>
      </div>

      <form id="resetPasswordForm" novalidate>
        <div class="mb-3">
          <label for="resetPassword" class="form-label small fw-semibold">${getLabel("New password", "كلمة المرور الجديدة")}</label>
          <div class="input-group">
            <input type="password" class="form-control py-3 rounded-0" id="resetPassword" autocomplete="new-password" required>
            <button class="btn btn-outline-primary position-absolute h-100  ${getDirectionClass("end-0", "start-0")} rounded-0" type="button" id="toggleResetPassword">
                <i class="far fa-eye-slash"></i>
            </button>
          </div>
          <div class="form-text small">${getLabel("At least 8 characters.", "٨ أحرف على الأقل.")}</div>
        </div>

        <div class="mb-3">
          <label for="resetPasswordConfirm" class="form-label small fw-semibold">${getLabel("Confirm password", "تأكيد كلمة المرور")}</label>
          <input type="password" class="form-control py-3 rounded-0" id="resetPasswordConfirm" autocomplete="new-password" required>
        </div>

        <div class="alert alert-danger rounded-0 d-none py-2 small" id="resetPasswordError"></div>

        <button type="submit" class="btn btn-primary w-100 py-3 rounded-0">
          ${getLabel("Set new password", "تعيين كلمة المرور")}
        </button>
      </form>

      <div id="resetPasswordDone" class="d-none text-center">
        <i class="fas fa-check-circle text-success" style="font-size:2.5rem;"></i>
        <h3 class="fw-bold mt-3 mb-2">${getLabel("Password updated", "تم تحديث كلمة المرور")}</h3>
        <p class="text-muted">${getLabel("You can sign in with your new password now.", "يمكنك تسجيل الدخول بكلمة المرور الجديدة الآن.")}</p>
        <a href="#login" class="btn btn-primary w-100 py-3 rounded-0" data-nav-page-id="login">
          ${getLabel("Go to sign in", "الذهاب لتسجيل الدخول")}
        </a>
      </div>
    `,
    footer:
      '<a href="#forgot-password" class="small text-decoration-none" data-nav-page-id="forgot-password">' +
      getLabel("Request a new link", "اطلب رابطاً جديداً") +
      "</a>",
  });

  const toggle = document.getElementById("toggleResetPassword");
  const pw = document.getElementById("resetPassword");
  toggle.addEventListener("click", () => {
    const hidden = pw.type === "password";
    pw.type = hidden ? "text" : "password";
    toggle.querySelector("i").className = hidden
      ? "far fa-eye"
      : "far fa-eye-slash";
  });

  const countdown = document.getElementById("resetCountdown");
  const timer = setInterval(tick, 1000);

  function tick() {
    if (!countdown.isConnected) {
      clearInterval(timer);
      return;
    }

    const left = record.expiresAt - Date.now();
    if (left <= 0) {
      clearInterval(timer);
      loadResetPasswordPage();
      return;
    }

    const mins = Math.floor(left / 60000);
    const secs = Math.floor((left % 60000) / 1000);
    const clock = mins + ":" + String(secs).padStart(2, "0");
    countdown.textContent = getLabel(
      "Link expires in " + clock,
      "ينتهي الرابط خلال " + clock,
    );
  }
  tick();

  document
    .getElementById("resetPasswordForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const error = document.getElementById("resetPasswordError");
      const value = pw.value;
      const confirmValue = document.getElementById("resetPasswordConfirm").value;

      const fail = (msg) => {
        error.textContent = msg;
        error.classList.remove("d-none");
      };

      if (value.length < 8) {
        return fail(
          getLabel(
            "Password must be at least 8 characters.",
            "يجب ألا تقل كلمة المرور عن ٨ أحرف.",
          ),
        );
      }
      if (value !== confirmValue) {
        return fail(
          getLabel(
            "The two passwords do not match.",
            "كلمتا المرور غير متطابقتين.",
          ),
        );
      }

      if (passwordResetStatus(findPasswordResetToken(token)) !== "active") {
        clearInterval(timer);
        loadResetPasswordPage();
        return;
      }

      error.classList.add("d-none");
      consumePasswordResetToken(token);
      clearInterval(timer);

      document.getElementById("resetPasswordForm").classList.add("d-none");
      countdown.textContent = "";
      document.getElementById("resetPasswordDone").classList.remove("d-none");
    });
}

// ── Military Access Gate (OTP) ──
const MILITARY_OTP_STORAGE_KEY = "militaryOtpCodes";
const MILITARY_ACCESS_STORAGE_KEY = "militaryAccessGrant";
const MILITARY_ATTEMPTS_STORAGE_KEY = "militaryOtpAttempts";
const MILITARY_OTP_TTL_MINUTES = 4320;
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
  grantMilitaryAccess(match.id);
  return { ok: true };
}

function grantMilitaryAccess(codeId = null) {
  localStorage.setItem(
    MILITARY_ACCESS_STORAGE_KEY,
    JSON.stringify({
      grantedAt: Date.now(),
      expiresAt: Date.now() + MILITARY_ACCESS_TTL_HOURS * 60 * 60 * 1000,
      grantedByCodeId: codeId,
    }),
  );
}

function hasMilitaryAccess() {
  try {
    const grant = JSON.parse(localStorage.getItem(MILITARY_ACCESS_STORAGE_KEY));
    if (!grant || grant.expiresAt <= Date.now()) return false;

    if (grant.grantedByCodeId) {
      const code = getMilitaryOtpCodes().find(
        (c) => c.id === grant.grantedByCodeId,
      );
      if (code && code.revoked) {
        localStorage.removeItem(MILITARY_ACCESS_STORAGE_KEY);
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
}

function requireMilitaryAccess() {
  if (hasMilitaryAccess()) return true;
  setCurrentPage("military-access");
  return false;
}

// ── Cart System ──

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

function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(appState.cart));
  } catch (e) {
    console.error("Failed to save cart to storage", e);
  }
}

function addToCart(productId, qty = 1, options = {}) {
  if (!appState.cart) appState.cart = [];

  const product = productsData.find((p) => p.id === productId);
  if (!product) {
    console.error("addToCart: product not found", productId);
    return;
  }

  const color = options.color || null;
  const size = options.size || null;

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
      title: product.title,
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

function clearCart() {
  appState.cart = [];
  saveCart();
  updateCartCount();
}

function getCartCount() {
  if (!appState.cart) return 0;
  return appState.cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  if (!appState.cart) return 0;
  return appState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartCount() {
  const count = getCartCount();

  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = count;

  const mobileCartCountEl = document.getElementById("mobileCartCount");
  if (mobileCartCountEl) mobileCartCountEl.textContent = count;
}

let navigationEventsBound = false;

// ── Mega Menu Column Definitions ──
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

  const realIds = new Set(categoriesData.map((c) => c.categoryId));
  const unknown = [...seen].filter((id) => !realIds.has(id));
  if (unknown.length > 0) {
    console.warn(
      "MEGA_MENU_COLUMNS: these categoryIds don't exist in categories.json —",
      unknown.join(", "),
    );
  }

  const missing = [...realIds].filter(
    (id) => !seen.has(id) && id !== "military",
  );
  if (missing.length > 0) {
    console.warn(
      "MEGA_MENU_COLUMNS: these categories aren't in any column —",
      missing.join(", "),
    );
  }

  const claimed = new Set();

  const columns = MEGA_MENU_COLUMNS.map((column) => ({
    title_en: column.title_en,
    title_ar: column.title_ar,
    items: categoriesData
      .filter((cat) => {
        if (!column.categoryIds.includes(cat.categoryId)) return false;
        if (claimed.has(cat.categoryId)) return false;
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

// ── Main Nav ──
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
   title=${getLabel("RESTRICTED ACCESS", "مقيد")}
   data-bs-content="
   <strong>${getLabel("AUTHORIZED PERSONNEL ONLY", "للجهات المصرح لها فقط")}</strong> 
   <br> 
   ${getLabel("Military & defense equipment is available to verified government and corporate buyers only.", " معدات الأمن والدفاع متاحة فقط للجهات الحكومية والشركات المعتمدة التي تم التحقق منها.")}
   ">
</i>`
                : ""
            }
        </a>
      `;
    }
  });

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]',
  );
  [...popoverTriggerList].forEach((el) => new bootstrap.Popover(el));

  const topRightControls = document.getElementById("topRightControls");
  if (topRightControls) topRightControls.innerHTML = "";

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

  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static">
            ${getLabel("Theme", "الوضع")}
        </a>
        <div class="dropdown-menu toggle-menu p-3">
            <span class="form-check-header border-bottom pb-1">${getLabel("Change Theme", "تغيير المظهر")}</span>
            <div class="form-check py-1">
                <input class="form-check-input" type="radio" name="themeOption" id="theme-light" value="light" ${appState.theme === "light" ? "checked" : ""}>
                <label class="form-check-label" for="theme-light">${getLabel("Light", "فاتح")}</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="themeOption" id="theme-dark" value="dark" ${appState.theme === "dark" ? "checked" : ""}>
                <label class="form-check-label" for="theme-dark">${getLabel("Dark", "داكن")}</label>
            </div>
        </div>
    </div>
  `;

  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static">
            ${appState.language === "ar" ? "ع" : "EN"}
        </a>
        <div class="dropdown-menu toggle-menu p-3 ${appState.language === "ar" ? "text-start" : "text-end"}">
            <span class="form-check-header border-bottom pb-1">${getLabel("Change Language", "تغيير اللغة")}</span>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="languageOption" id="lang-ar" value="ar" ${appState.language === "ar" ? "checked" : ""}>
                <label class="form-check-label" for="lang-ar">العربية - AR</label>
            </div>
            <div class="form-check py-1">
                <input class="form-check-input" type="radio" name="languageOption" id="lang-en" value="en" ${appState.language === "en" ? "checked" : ""}>
                <label class="form-check-label" for="lang-en">English - EN</label>
            </div>
        </div>
    </div>
  `;

  topRightControls.innerHTML += `
    <div class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static">
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

function bindNavigationEvents() {
  if (navigationEventsBound) return;
  navigationEventsBound = true;

  document.addEventListener("change", (e) => {
    if (e.target.matches('input[name="themeOption"]')) {
      setTheme(e.target.value);
    }
    if (e.target.matches('input[name="languageOption"]')) {
      setLanguage(e.target.value);
    }
  });

  document.addEventListener("click", (e) => {
    const searchWrapper = document.getElementById("searchWrapper");
    const searchDropdown = document.getElementById("searchDropdown");

    if (searchWrapper && searchDropdown && !searchWrapper.contains(e.target)) {
      searchDropdown.classList.add("d-none");
    }

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

    const searchResult = e.target.closest("[data-search-product-id]");
    if (searchResult) {
      e.preventDefault();
      setCurrentPage("single-product", searchResult.dataset.searchProductId);

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

    const navLink = e.target.closest("[data-nav-page-id]");
    if (navLink) {
      e.preventDefault();
      setCurrentPage(navLink.dataset.navPageId);
      closeMobileMenu();
      return;
    }

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

// ── Mobile Top Bar ──
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

// ── Mobile Menu Overlay ──
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

  mount.querySelectorAll("[data-mega-trigger]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const link = navigationLinks.find((l) => l.id === el.dataset.megaTrigger);
      if (link) openMegaMenu(link);
    });
  });

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

function goToBannerTarget(categoryId) {
  if (categoryId) {
    goToProductsWithFilter(categoryId);
  } else {
    setCurrentPage("products");
  }
  return false;
}

// ── Slider & Footer ──

function initializeSlider() {
  const bannerWrapper = document.getElementById("bannerWrapper");

  if (!bannerWrapper) return;

  bannerWrapper.innerHTML = "";

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
                      slide.categoryId || slide.path
                        ? `
                        <a href="#products"
                        onclick="return goToBannerTarget('${slide.categoryId || ""}')"
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

  if (window.bannerSwiperInstance) {
    window.bannerSwiperInstance.destroy(true, true);
  }

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
    keyboard: { enabled: true },
    a11y: { enabled: true },
    lazy: true,
  });
}

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
                            <a href="mailto:kaderfactory38@gmail.com"><i class="fa fa-envelope m-2"></i>kaderfactory38@gmail.com</a>
                            <a href="tel:+201030009248"><i class="fa fa-phone m-2"></i> <span dir="ltr">+2015 5633 6160</span></a>
                            <a href="https://wa.me/201556336160" target="_blank"><i class="fa fa-comment m-2"></i> <span dir="ltr">+2015 5633 6160</span></a>

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

// ── Router ──

function setCurrentPage(pageId, productId) {
  if (pageId === "return-policy" || pageId === "warranty-policy") {
    appState.legalScrollTarget =
      pageId === "return-policy" ? "legal-returns" : "legal-warranty";
    pageId = "terms-of-service";
  }

  document.querySelectorAll(".page").forEach((page) => {
    page.style.display = "none";
  });

  const selectedPage = document.getElementById(`${pageId}-page`);
  if (selectedPage) {
    selectedPage.style.display = "block";
    appState.currentPage = pageId;

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    const activeLink = document.getElementById(`nav-${pageId}`);
    if (activeLink) activeLink.classList.add("active");

    document.getElementById("mobileMenuPanel").classList.remove("is-open");
    const panel = document.getElementById("megaMenuPanel");
    if (panel) panel.classList.remove("is-open");
    document.body.style.overflow = "";

    window.scrollTo(0, 0);

    const pagesWithoutChrome = [
      "register",
      "login",
      "military-access",
      "forgot-password",
      "reset-password",
    ];
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

    if (pageId === "reset-password" && appState.passwordResetToken) {
      history.pushState(
        { pageId },
        "",
        `#reset-password/${appState.passwordResetToken}`,
      );
    } else if (pageId === "single-product" && productId) {
      appState.currentProductId = productId;
      history.pushState(
        { pageId, productId },
        "",
        `#single-product/${productId}`,
      );
    } else {
      history.pushState({ pageId }, "", `#${pageId}`);
    }

    loadPageContent(pageId);
  }
}

function loadPageContent(pageId) {
  switch (pageId) {
    case "about":
      loadAboutPage();
      break;
    case "products":
      loadProductsPage();
      break;
    case "machinery":
      loadMachineryPage();
      break;
    case "military":
      loadMilitaryPage();
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
    case "terms-of-service":
      loadTermsOfServicePage();
      break;
    case "privacy-policy":
      loadPrivacyPolicyPage();
      break;
    case "forgot-password":
      loadForgotPasswordPage();
      break;
    case "reset-password":
      loadResetPasswordPage();
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

// ── About Page ──

function loadAboutPage() {
  const container = document.getElementById("aboutPageContent");
  if (!container) return;

  // ── Content Data (Full Text, All Paragraphs) ──

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

  // ── Render ──

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
                        <h5 class="sub-title pb-0">${getLabel(aboutContent.subtitle.en, aboutContent.subtitle.ar)}</h5>
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
                                    <h5 class="sub-title px-0">${getLabel(visionMissionContent.vision.eyebrow.en, visionMissionContent.vision.eyebrow.ar)}</h5>
                                    ${paragraphsHtml(visionMissionContent.vision.paragraphs, "fs-5")}
                                </div>
                                <div class="vm-tab-pane" data-vm-pane="mission">
                                    <h5 class="sub-title px-0">${getLabel(visionMissionContent.mission.eyebrow.en, visionMissionContent.mission.eyebrow.ar)}</h5>
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

// ── Products Page ──

let filterState = { categoryId: null, subCategoryId: null };
let productsPageEventsBound = false;

const PRODUCTS_PAGE_SIZE = 12;
let displayedProductsCount = PRODUCTS_PAGE_SIZE;

function goToProductsWithFilter(categoryId, subCategoryId = null) {
  if (categoryId === "military") {
    goToMilitaryPage(subCategoryId);
    return;
  }
  appState.pendingProductFilter = { categoryId, subCategoryId };
  setCurrentPage("products");
}

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

function applyFilters(products, state) {
  return products.filter((p) => {
    if (state.categoryId && p.categoryId !== state.categoryId) return false;
    if (state.subCategoryId && p.subCategoryId !== state.subCategoryId)
      return false;
    return true;
  });
}

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

function renderCategoryFilter() {
  const targets = [
    document.getElementById("category-filter-container"),
    document.getElementById("category-filter-container-mobile"),
  ].filter(Boolean);

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
      (product) => `
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
                            <span class="current-price text-white">
                                EGP ${product.price}
                            </span>

                            ${
                              product.oldPrice
                                ? `<span class="old-price text-white-50">EGP ${product.oldPrice}</span>`
                                : ""
                            }
                        </div>
                    </div>
            <span class="badge bg-primary rounded-0 text-dark mb-2">${getLabel(product.sub_category.en, product.sub_category.ar)}</span>

            <h6 class="card-title mb-1 text-white">${getLabel(product.title.en, product.title.ar)}</h6>

            <p class="card-text text-white-50 small product-desc">
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

  container.querySelectorAll(".product-card").forEach((card, i) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      setCurrentPage("single-product", visibleProducts[i].id);
    });
  });
}

const MACHINERY_PAGE_SIZE = 9;
let displayedMachineryCount = MACHINERY_PAGE_SIZE;

// ── Machinery Page ──

function loadMachineryPage() {
  const container = document.getElementById("projectsPageContent");
  if (!container) return;

  displayedMachineryCount = MACHINERY_PAGE_SIZE;

  container.innerHTML = `
    ${createBanner(getLabel("Machinery", "الآلات"))}
    <div class="container-fluid overflow-hidden py-5">
      <div class="container">
        <div class="section-title text-left mb-5">
          <h5 class="sub-title pb-0">${getLabel("Industrial Technology & Capabilities", "التقنيات والقدرات الصناعية")}</h5>
          <p class="mb-0">${getLabel("Advanced CNC systems supporting precision manufacturing.", " أنظمة CNC متقدمة تدعم التصنيع الدقيق والمتطور.")}</p>
        </div>
        <div class="row g-4" id="machineryGridContainer"></div>
      </div>
    </div>
  `;

  renderMachineryGrid();
  bindMachineryPageEvents();
}

function renderMachineryGrid() {
  const grid = document.getElementById("machineryGridContainer");
  if (!grid) return;

  const visible = machineryData.slice(0, displayedMachineryCount);
  const hasMore = displayedMachineryCount < machineryData.length;

  const cardsHtml = visible
    .map((p) => {
      const hoverSpecItems = (p.specGroups?.[0]?.items || []).slice(0, 3);
      const hoverSpecsHtml = hoverSpecItems.length
        ? `
          <ul class="machinery-card-hover-specs">
            ${hoverSpecItems
              .map(
                (item) => `
              <li><i class="fas fa-check ${getDirectionClass("me-2", "ms-2")}"></i>${getLabel(item.en, item.ar)}</li>
            `,
              )
              .join("")}
          </ul>
        `
        : "";

      return `
      <div class="col-md-6 col-lg-4 pb-4">
        <div class="machinery-card h-100">
          <div class="machinery-card-img p-4">
            <img src="${p.img}" class="img-fluid w-100 h-100 " alt="${getLabel(p.titleEn, p.titleAr)}" loading="lazy">
          </div>
          <div class=" rounded-bottom p-4 h-100 d-flex flex-column justify-content-between">
          <div class="machinery-card-content">
            <h4 class="text-white">${getLabel(p.titleEn, p.titleAr)}</h4>
            <p class="text-white-50 small">${getLabel(p.descEn, p.descAr)}</p>
            ${hoverSpecsHtml}
          </div>
            <button type="button" class="btn btn-link text-white ${getDirectionClass("ps-0", "pe-0 ps-3")} pt-4 align-self-start" data-machine-id="${p.id}">
              ${getLabel("Read More", "اقرأ المزيد")}
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  const showMoreHtml = hasMore
    ? `
      <div class="col-12 text-center pt-3 mt-0 mb-3">
        <button type="button" class="btn btn-primary px-5 py-2" id="showMoreMachineryBtn">
          ${getLabel("Show More", "عرض المزيد")}
        </button>
      </div>
    `
    : "";

  grid.innerHTML = cardsHtml + showMoreHtml;
}

let machineryPageEventsBound = false;

function bindMachineryPageEvents() {
  if (machineryPageEventsBound) return;
  machineryPageEventsBound = true;

  document.addEventListener("click", (e) => {
    if (e.target.closest("#showMoreMachineryBtn")) {
      displayedMachineryCount += MACHINERY_PAGE_SIZE;
      renderMachineryGrid();
      return;
    }

    const btn = e.target.closest("[data-machine-id]");
    if (!btn) return;
    openMachineDetailOverlay(btn.dataset.machineId);
  });
}

function machineSpecGroupHtml(group) {
  return `
    <div class="machine-detail-spec-group pb-2">
      <h5 class="sub-title fw-bold fs-6 pb-0">${getLabel(group.titleEn, group.titleAr)}</h5>
      <ul class="machine-detail-spec-list">
        ${group.items
          .map(
            (item) => `
          <li class="d-flex align-items-baseline"><i class="fas fa-check-circle text-secondary ${getDirectionClass("me-2", "ms-2")}"></i>${getLabel(item.en, item.ar)}</li>
        `,
          )
          .join("")}
      </ul>
    </div>
  `;
}

function machineDetailSpecsHtml(m) {
  return (m.specGroups || []).map(machineSpecGroupHtml).join("");
}

function animateMachineDetailSwap(el, updateFn) {
  if (!el) return;
  el.classList.add("machine-detail-swap-out");
  setTimeout(() => {
    updateFn();
    el.classList.remove("machine-detail-swap-out");
  }, 180);
}

function updateMachineDetailContent(index) {
  const m = machineryData[index];
  if (!m) return;

  animateMachineDetailSwap(
    document.getElementById("machineDetailHeading"),
    () => {
      document.getElementById("machineDetailTitle").textContent = getLabel(
        m.titleEn,
        m.titleAr,
      );
      document.getElementById("machineDetailSubtitle").textContent = getLabel(
        m.descEn,
        m.descAr,
      );
    },
  );

  animateMachineDetailSwap(
    document.getElementById("machineDetailSpecsWrap"),
    () => {
      document.getElementById("machineDetailSpecsWrap").innerHTML =
        machineDetailSpecsHtml(m);
    },
  );
}

const DETAIL_DOT_WINDOW = 5;

function renderWindowedDots(container, activeIndex, total, itemLabel) {
  if (!container) return;
  const size = Math.min(DETAIL_DOT_WINDOW, total);

  if (container.children.length !== size) {
    container.innerHTML = Array.from(
      { length: size },
      () => `<button type="button" class="swiper-pagination-bullet"></button>`,
    ).join("");
  }

  const start = Math.max(
    0,
    Math.min(activeIndex - Math.floor(size / 2), total - size),
  );

  Array.from(container.children).forEach((dot, offset) => {
    const index = start + offset;
    const isEdge =
      (offset === 0 && start > 0) ||
      (offset === size - 1 && start + size < total);

    dot.dataset.dotIndex = index;
    dot.classList.toggle(
      "swiper-pagination-bullet-active",
      index === activeIndex,
    );
    dot.classList.toggle("swiper-pagination-bullet-edge", isEdge);
    dot.setAttribute("aria-label", `${itemLabel} ${index + 1}`);
    dot.setAttribute("aria-current", index === activeIndex);
  });
}

function bindWindowedDots(container, swiper, itemLabel) {
  if (!container || !swiper) return;
  renderWindowedDots(
    container,
    swiper.activeIndex,
    swiper.slides.length,
    itemLabel,
  );
  container.addEventListener("click", (e) => {
    const dot = e.target.closest("[data-dot-index]");
    if (dot) swiper.slideTo(Number(dot.dataset.dotIndex));
  });
}

function openMachineDetailOverlay(machineId) {
  const startIndex = machineryData.findIndex((m) => m.id === machineId);
  if (startIndex === -1) return;

  const startMachine = machineryData[startIndex];

  document.getElementById("modalTitle").textContent = getLabel(
    "Machine Details",
    "تفاصيل الماكينة",
  );

  const dialog = document.querySelector("#overlayModal .modal-dialog");
  dialog.classList.add("modal-xl", "modal-dialog-scrollable");

  document.getElementById("modalBody").innerHTML = `
    <div class="machine-detail-wrap">
      <div class="machine-detail-pagination-top detail-pagination-dots"></div>
      <div class="row g-4 py-3 bg-white shadow-sm">
        <div class="col-lg-5 h-100">
          <div class="machine-detail-heading" id="machineDetailHeading">
            <h4 class="fw-bold mb-1" id="machineDetailTitle">${getLabel(startMachine.titleEn, startMachine.titleAr)}</h4>
            <p class="text-muted small mb-0" id="machineDetailSubtitle">${getLabel(startMachine.descEn, startMachine.descAr)}</p>
          </div>

          <div class="swiper machineDetailMainSwiper mt-3">
            <div class="swiper-wrapper">
              ${machineryData
                .map(
                  (m) => `
                <div class="swiper-slide">
                  <div class="machine-detail-img-wrap">
                    <img src="${m.img}" class="machine-detail-img" alt="${getLabel(m.titleEn, m.titleAr)}">
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="machine-detail-specs-wrap" id="machineDetailSpecsWrap">
            ${machineDetailSpecsHtml(startMachine)}
          </div>
          <div class="text-end mt-4">
            <button type="button" class="btn btn-secondary" onclick="setCurrentPage('contact')" data-bs-dismiss="modal">
              ${getLabel("Contact Us", "تواصل معنا")}
            </button>
          </div>
        </div>
      </div>

      <div class="machine-detail-nav-bottom d-flex justify-content-center gap-3">
        <button type="button" class="nav-btn-custom machineDetailPrev" aria-label="${getLabel("Previous machine", "الماكينة السابقة")}">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button type="button" class="nav-btn-custom machineDetailNext" aria-label="${getLabel("Next machine", "الماكينة التالية")}">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  const modalEl = document.getElementById("overlayModal");
  const modal = new bootstrap.Modal(modalEl);

  modalEl.addEventListener(
    "shown.bs.modal",
    () => {
      if (window.machineDetailSwiperInstance) {
        window.machineDetailSwiperInstance.destroy(true, true);
      }

      const dotsEl = document.querySelector(".machine-detail-pagination-top");
      const dotLabel = getLabel("Machine", "الماكينة");

      window.machineDetailSwiperInstance = new Swiper(
        ".machineDetailMainSwiper",
        {
          initialSlide: startIndex,
          slidesPerView: 1,
          spaceBetween: 0,
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          rtl: document.documentElement.dir === "rtl",
          keyboard: { enabled: true },
          a11y: { enabled: true },
          navigation: {
            nextEl: ".machineDetailNext",
            prevEl: ".machineDetailPrev",
          },
          on: {
            slideChange(swiper) {
              updateMachineDetailContent(swiper.activeIndex);
              renderWindowedDots(
                dotsEl,
                swiper.activeIndex,
                swiper.slides.length,
                dotLabel,
              );
            },
          },
        },
      );

      bindWindowedDots(dotsEl, window.machineDetailSwiperInstance, dotLabel);
    },
    { once: true },
  );

  modal.show();

  modalEl.addEventListener(
    "hidden.bs.modal",
    () => dialog.classList.remove("modal-xl", "modal-dialog-scrollable"),
    { once: true },
  );
}

// ── Military Products Page ──
let militarySubFilter = "all";
let militaryPageEventsBound = false;
const MILITARY_PAGE_SIZE = 5;
let displayedMilitaryCount = MILITARY_PAGE_SIZE;

function goToMilitaryPage(subCategoryId = null) {
  appState.pendingMilitarySubCategory = subCategoryId || "all";
  setCurrentPage("military");
}

function loadMilitaryPage() {
  const container = document.getElementById("militaryPageContent");
  if (!container) return;

  if (!requireMilitaryAccess()) return;

  if (appState.pendingMilitarySubCategory !== undefined) {
    militarySubFilter = appState.pendingMilitarySubCategory;
    appState.pendingMilitarySubCategory = undefined;
  }
  displayedMilitaryCount = MILITARY_PAGE_SIZE;

  container.innerHTML = `
    ${createBanner(getLabel("Military & Defense", "عسكري ودفاعي"))}
    <div class="container-fluid overflow-hidden py-5 bg-light">
      <div class="container">
        <div class="section-title text-center mb-4">
          <h5 class="sub-title pb-0">${getLabel("Military & Defense Equipment", "المعدات العسكرية والدفاعية")}</h5>
          <p class="text-muted mb-0">
          <i class="fa-solid fa-circle-exclamation pe-1"></i>
          ${getLabel("Access restricted to verified government and corporate entities only.", "الوصول مقصور على الجهات الحكومية والشركات الموثقة فقط.")}</p>
        </div>
        <div class="d-flex flex-wrap justify-content-start gap-2 mb-4" id="militaryFilterTabs"></div>
        <div id="militaryProductsList" class="d-flex flex-column gap-4"></div>
      </div>
    </div>
  `;

  renderMilitaryFilterTabs();
  renderMilitaryProductsList();
  bindMilitaryPageEvents();
  startMilitaryAccessWatch();
}

function startMilitaryAccessWatch() {
  stopMilitaryAccessWatch();
  window.militaryAccessWatchInterval = setInterval(() => {
    if (appState.currentPage !== "military") {
      stopMilitaryAccessWatch();
      return;
    }
    if (!hasMilitaryAccess()) {
      stopMilitaryAccessWatch();
      setCurrentPage("military-access");
    }
  }, 3000);
}

function stopMilitaryAccessWatch() {
  if (window.militaryAccessWatchInterval) {
    clearInterval(window.militaryAccessWatchInterval);
    window.militaryAccessWatchInterval = null;
  }
}

function renderMilitaryFilterTabs() {
  const container = document.getElementById("militaryFilterTabs");
  if (!container) return;

  const militaryCategory = categoriesData.find(
    (c) => c.categoryId === "military",
  );
  const subCategories = militaryCategory?.subCategories || [];
  const tabs = [
    { subCategoryId: "all", name: { en: "All", ar: "الكل" } },
    ...subCategories,
  ];

  container.innerHTML = tabs
    .map(
      (s) => `
      <button type="button" class="filter-chip ${militarySubFilter === s.subCategoryId ? "active" : ""}" data-military-subcategory="${s.subCategoryId}">
        ${getLabel(s.name.en, s.name.ar)}
      </button>
    `,
    )
    .join("");
}

function renderMilitaryProductsList() {
  const container = document.getElementById("militaryProductsList");
  if (!container) return;

  const products = productsData.filter(
    (p) =>
      p.categoryId === "military" &&
      (militarySubFilter === "all" || p.subCategoryId === militarySubFilter),
  );

  if (products.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        ${getLabel("No products in this category yet.", "لا توجد منتجات في هذه الفئة بعد.")}
      </div>
    `;
    return;
  }

  const visibleProducts = products.slice(0, displayedMilitaryCount);
  const hasMore = displayedMilitaryCount < products.length;

  const cardsHtml = visibleProducts
    .map((p) => renderMilitaryProductCard(p))
    .join("");

  const showMoreHtml = hasMore
    ? `
      <div class="text-center mt-2">
        <button type="button" class="btn btn-primary px-5 py-2" id="show-more-military-btn">
          ${getLabel("Show More", "عرض المزيد")}
        </button>
      </div>
    `
    : "";

  container.innerHTML = cardsHtml + showMoreHtml;
}

function renderMilitaryProductCard(p) {
  const stockBadge =
    p.stockQty === 0
      ? {
          cls: "bg-warning text-dark",
          en: "AVAILABLE ON REQUEST",
          ar: "متوفر عند الطلب",
        }
      : p.stockQty <= 3
        ? {
            cls: "bg-warning text-dark",
            en: "AVAILABLE ON REQUEST",
            ar: "متوفر عند الطلب",
          }
        : { cls: "", en: "", ar: "" };

  const starsHtml = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.round(p.rating || 0);
    return `<i class="fa${filled ? "s" : "r"} fa-star"></i>`;
  }).join("");

  const colorsHtml = (p.colors || [])
    .map(
      (c) =>
        `<span class="military-color-dot" style="background:${c.hex};" title="${getLabel(c.name, c.nameAr)}"></span>`,
    )
    .join("");

  const sizesHtml = (p.sizes || [])
    .map((s) => `<span class="small">${getLabel(s.en, s.ar)}</span>`)
    .join(" ");

  const specHighlightsHtml = (p.specGroups || [])
    .flatMap((g) => g.items || [])
    .slice(0, 3)
    .map(
      (item) =>
        `<li><i class="fas fa-minus text-bs-black ${getDirectionClass("me-1", "ms-1")}"></i>${getLabel(item.en, item.ar)}</li>`,
    )
    .join("");

  return `
    <div class="military-product-card bg-white rounded-0">
      <div class="row g-0 align-items-stretch">

        <!-- Image -->
        <div class="col-md-3">
          <div class="military-card-img">
            <img src="${p.url}" alt="${getLabel(p.title.en, p.title.ar)}" loading="lazy">
            <span class="badge ${stockBadge.cls} military-stock-badge">${getLabel(stockBadge.en, stockBadge.ar)}</span>
            <span class="military-lock-badge" title="${getLabel("AUTHORIZED ACCESS", "دخول مصرح")}"><i class="fas fa-lock"></i></span>
          </div>
        </div>

        <!-- Title + Description -->
        <div class="col-md-3 p-4 military-card-col">
          <span class="badge bg-light text-dark mb-2">${getLabel(p.sub_category.en, p.sub_category.ar)}</span>
          <h5 class="fw-bold mb-2">${getLabel(p.title.en, p.title.ar)}</h5>
          <p class="text-muted small mb-2">${getLabel(p.desc.en, p.desc.ar)}</p>
        </div>

        <!-- Price + Details -->
        <div class="col-md-3 p-4 military-card-col">
          <div class="pb-4">
            ${p.oldPrice ? `<span class="text-danger small me-2">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : ""}
            <span class="fs-4 fw-bold text-secondary">${formatEGP(p.price)}</span>
            ${p.oldPrice ? `<span class="old-price ms-2">${formatEGP(p.oldPrice)}</span>` : ""}
          </div>

            ${
              colorsHtml
                ? `<div class="mb-2 d-flex align-items-center gap-2"><span class="small fw-bold">${getLabel("Colors", "الألوان")}:</span> ${colorsHtml}</div>`
                : ""
            }
            ${
              sizesHtml
                ? `<div class="mb-2 d-flex flex-wrap align-items-center gap-1"><span class="small fw-bold ${getDirectionClass("me-1", "ms-1")}">${getLabel("Config", "التكوين")}:</span> ${sizesHtml}</div>`
                : ""
            }
                        ${
                          p.weight
                            ? `<div class="mb-2 d-flex align-items-center gap-2"><span class="small fw-bold">${getLabel("Weight", "الوزن")}:</span> <span class="small text-muted">${p.weight} ${getLabel("kg", "كجم")}</span></div>`
                            : ""
                        }
            ${specHighlightsHtml ? `<div class="d-flex align-items-start gap-4 pt-2 border-top"><span class="small fw-bold">${getLabel("Details", "التفالصيل")}: </span> <ul class="list-unstyled small text-muted mb-0 ">${specHighlightsHtml}</ul></div>` : ""}
        </div>

        <!-- CTA -->
        <div class="col-md-3 p-4 military-card-col d-flex flex-column justify-content-center align-items-stretch gap-2">
          <button type="button" class="btn btn-secondary" data-military-product-id="${p.id}">
            ${getLabel("More Details", "عرض التفاصيل")}
          </button>
          <span class="text-center small text-muted">
          <i class="fa-solid fa-circle-info"></i>
          ${getLabel("Technical specifications are not publicly disclosed.", "المواصفات الفنية غير معلنة للعامة.")}
          </span>
        </div>

      </div>
    </div>
  `;
}

function bindMilitaryPageEvents() {
  if (militaryPageEventsBound) return;
  militaryPageEventsBound = true;

  document.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-military-subcategory]");
    if (tab) {
      militarySubFilter = tab.dataset.militarySubcategory;
      displayedMilitaryCount = MILITARY_PAGE_SIZE;
      renderMilitaryFilterTabs();
      renderMilitaryProductsList();
      return;
    }

    if (e.target.closest("#show-more-military-btn")) {
      displayedMilitaryCount += MILITARY_PAGE_SIZE;
      renderMilitaryProductsList();
      return;
    }

    const cta = e.target.closest("[data-military-product-id]");
    if (cta) {
      setCurrentPage("single-product", cta.dataset.militaryProductId);
    }
  });
}

const NEWS_PAGE_SIZE = 8;
let displayedNewsCount = NEWS_PAGE_SIZE;
let newsPageEventsBound = false;

const NEWS_TIME_RANGE_DAYS = {
  all: null,
  week: 7,
  month: 30,
  quarter: 90,
  half: 183,
  year: 365,
  lastYear: 630,
};
let newsTimeFilter = "all";
let newsSortOrder = "newest"; // "newest" | "oldest"

function formatNewsDate(date) {
  const locale = appState.language === "ar" ? "ar-EG" : "en-US";
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getNewsFilterRangeLabel() {
  const days = NEWS_TIME_RANGE_DAYS[newsTimeFilter];
  let start, end;

  if (days == null) {
    if (newsItems.length === 0) return "";
    const times = newsItems.map((n) => new Date(n.dateRaw).getTime());
    start = new Date(Math.min(...times));
    end = new Date(Math.max(...times));
  } else {
    end = new Date();
    start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  }

  return `${formatNewsDate(start)} – ${formatNewsDate(end)}`;
}

function isNewsBreaking(item) {
  return (
    new Date(item.dateRaw).getTime() >= Date.now() - 30 * 24 * 60 * 60 * 1000
  );
}

function applyNewsFilters(items) {
  const days = NEWS_TIME_RANGE_DAYS[newsTimeFilter];
  const filtered =
    days == null
      ? items
      : items.filter(
          (n) =>
            new Date(n.dateRaw).getTime() >=
            Date.now() - days * 24 * 60 * 60 * 1000,
        );

  return [...filtered].sort((a, b) => {
    const diff = new Date(a.dateRaw) - new Date(b.dateRaw);
    return newsSortOrder === "newest" ? -diff : diff;
  });
}

// ── News Page ──

function loadNewsPage() {
  const container = document.getElementById("newsPageContent");
  if (!container) return;

  displayedNewsCount = NEWS_PAGE_SIZE;

  container.innerHTML = `
    ${createBanner(getLabel("News", "الأخبار"))}
    <div class="container-fluid overflow-hidden py-5 bg-light">
      <div class="container">
        <div class="section-title text-center mb-5">
          <h5 class="sub-title pb-0">${getLabel("Stay Informed on the Latest Updates", "ابق على اطلاع بأحدث المستجدات")}</h5>
          <p class="text-muted mb-0">${getLabel("The latest announcements, milestones, and updates from Kader Factory.", "أحدث الإنجازات والمستجدات من مصنع قادر.")}</p>
        </div>
        <div class="mb-4" id="newsFilterBar"></div>
        <div class="row g-4" id="newsGridContainer"></div>
      </div>
    </div>
  `;

  renderNewsFilterBar();
  renderNewsGrid();
  bindNewsPageEvents();
}

function renderNewsFilterBar() {
  const bar = document.getElementById("newsFilterBar");
  if (!bar) return;

  const timeOptions = [
    { key: "all", en: "All", ar: "الكل" },
    { key: "week", en: "This Week", ar: "هذا الأسبوع" },
    { key: "month", en: "This Month", ar: "هذا الشهر" },
    { key: "quarter", en: "Last 3 Month", ar: "آخر ثلاث أشهر" },
    { key: "half", en: "Last 6 Month", ar: "آخر ستة أشهر" },
    { key: "year", en: "This Year", ar: "هذا العام" },
    { key: "lastYear", en: "Last Year", ar: "العام الماضي" },
  ];

  bar.innerHTML = `
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
      <div class="d-flex flex-wrap gap-2">
        ${timeOptions
          .map(
            (o) => `
          <button type="button" class="filter-chip ${newsTimeFilter === o.key ? "active" : ""}" data-news-time="${o.key}">
          <i class="fa-regular fa-calendar-days pe-1"></i>
            ${getLabel(o.en, o.ar)}
          </button>
        `,
          )
          .join("")}
      </div>
      <div class="d-flex align-items-center gap-2">
        <label for="newsSortSelect" class="small fw-semibold text-muted mb-0">⇅ ${getLabel("Sort by", "ترتيب حسب")}</label>
        <select id="newsSortSelect" class="form-select form-select-sm" style="width:auto;">
          <option value="newest" ${newsSortOrder === "newest" ? "selected" : ""}>${getLabel("Newest First", "الأحدث أولاً")}</option>
          <option value="oldest" ${newsSortOrder === "oldest" ? "selected" : ""}>${getLabel("Oldest First", "الأقدم أولاً")}</option>
        </select>
      </div>
    </div>
    <div class="small text-muted mt-2 py-2 border-bottom" id="newsFilterRangeLabel">
      <i class="far fa-calendar ${getDirectionClass("pe-2", "ps-2")}"></i>${getNewsFilterRangeLabel()}
    </div>
  `;
}

function renderNewsGrid() {
  const grid = document.getElementById("newsGridContainer");
  if (!grid) return;

  const sorted = applyNewsFilters(newsItems);

  if (sorted.length === 0) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="empty-state text-center py-5">
          <i class="far fa-newspaper" style="font-size:2.5rem;color:#ced4da;"></i>
          <h5 class="mt-3">${getLabel("No news in this range", "لا توجد أخبار في هذه الفترة")}</h5>
          <p class="mb-3">${getLabel("Try a different time range.", "جرّب فترة زمنية مختلفة.")}</p>
          <button type="button" class="btn btn-outline-primary btn-sm" id="clearNewsFilterBtn">
            ${getLabel("Clear Filter", "مسح الفلتر")}
          </button>
        </div>
      </div>
    `;
    return;
  }

  const visible = sorted.slice(0, displayedNewsCount);
  const hasMore = displayedNewsCount < sorted.length;

  const cardsHtml = visible
    .map(
      (item) => `
      <div class="col-md-6 col-lg-3">
        <div class="news-card bg-white rounded-1 overflow-hidden h-100 d-flex flex-column align-items-start">
          <div class="news-card-img">
            <img src="${item.img}" class="img-fluid w-100 h-100" alt="${getLabel(item.titleEn, item.titleAr)}" loading="lazy">
            ${isNewsBreaking(item) ? `<span class="breaking-badge"><span class="breaking-badge-dot"></span>${getLabel("Breaking News", "أحدث الأخبار")}</span>` : ""}
          </div>
          <div class="news-card-content-shadow">
            <div class="p-4 news-card-content">
              <i class="fa-solid fa-quote-${getDirectionClass("left", "right")} text-primary ${getDirectionClass("border-end pe-3", "border-start ps-3")} border-white border-opacity-25"></i>
              <div class="col-md-10 col-lg-10 news-card-body">
                <span class="text-white-50 small fw-semibold"><i class="far fa-calendar ${getDirectionClass("pe-1", "ps-1")}"></i>${getLabel(item.dateEn, item.dateAr)}</span>
                <h5 class="fw-bold text-primary my-2 pb-3 news-card-title">${getLabel(item.titleEn, item.titleAr)}</h5>
                <p class="text-white small mb-3 news-card-excerpt pt-4">${getLabel(item.excerptEn, item.excerptAr)}</p>
              </div>
            </div>
          </div>
          <a href="#" class="btn btn-link text-white small ps-0 news-card-readmore" data-news-id="${item.id}">
            ${getLabel("Read More", "اقرأ المزيد")}
          </a>
        </div>
      </div>
    `,
    )
    .join("");

  const showMoreHtml = hasMore
    ? `
      <div class="col-12 text-center pt-3 mb-3">
        <button type="button" class="btn btn-primary px-5 py-2" id="showMoreNewsBtn">
          ${getLabel("Show More", "عرض المزيد")}
        </button>
      </div>
    `
    : "";

  grid.innerHTML = cardsHtml + showMoreHtml;
}

let newsDetailList = [];

function newsDetailBodyHtml(item) {
  return `<p class="mb-0 d-flex gap-2">
  <i class="fa-solid fa-quote-${getDirectionClass("left border-end pe-2", "right border-start ps-2")} text-primary"></i>
  ${getLabel(item.excerptEn, item.excerptAr)}
  </p>`;
}

function newsDetailSlideHtml(item) {
  return `
    <div class="swiper-slide">
      <div class="news-detail-slide-img-wrap">
        <img src="${item.img}" class="news-detail-slide-img" alt="${getLabel(item.titleEn, item.titleAr)}">
        <div class="news-detail-caption pb-4">
          ${isNewsBreaking(item) ? `<span class="breaking-badge position-relative top-0 start-0 shadow-none h-fit"><span class="breaking-badge-dot"></span>${getLabel("Breaking News", "أحدث الأخبار")}</span>` : ""}
          <span class="news-detail-caption-date pt-2 text-primary fw-bold"><i class="far fa-calendar ${getDirectionClass("me-1", "ms-1")}"></i>${getLabel(item.dateEn, item.dateAr)}</span>
          <h4 class="news-detail-caption-title text-white">${getLabel(item.titleEn, item.titleAr)}</h4>
        </div>
      </div>
    </div>
  `;
}

function updateNewsDetailContent(index) {
  const item = newsDetailList[index];
  if (!item) return;

  animateMachineDetailSwap(
    document.getElementById("newsDetailBodyWrap"),
    () => {
      document.getElementById("newsDetailBodyWrap").innerHTML =
        newsDetailBodyHtml(item);
    },
  );
}

function openNewsDetailOverlay(newsId) {
  newsDetailList = applyNewsFilters(newsItems);
  const startIndex = newsDetailList.findIndex((n) => n.id === newsId);
  if (startIndex === -1) return;

  const startItem = newsDetailList[startIndex];

  document.getElementById("modalTitle").textContent = getLabel(
    "News",
    "الأخبار",
  );

  const dialog = document.querySelector("#overlayModal .modal-dialog");
  dialog.classList.add("modal-xl", "modal-dialog-scrollable");

  document.getElementById("modalBody").innerHTML = `
    <div class="machine-detail-wrap">
      <div class="machine-detail-pagination-top news-detail-pagination detail-pagination-dots pb-2"></div>
      <div class="row g-4 py-3 bg-white shadow-sm align-items-start">
        <div class="col-lg-6 h-100 mt-0">
          <div class="swiper newsDetailMainSwiper">
            <div class="swiper-wrapper">
              ${newsDetailList.map(newsDetailSlideHtml).join("")}
            </div>
          </div>
        </div>

        <div class="col-lg-6 d-flex align-items-center">
          <div class="news-detail-body-wrap" id="newsDetailBodyWrap">
            ${newsDetailBodyHtml(startItem)}
          </div>
        </div>
      </div>

      <div class="machine-detail-nav-bottom d-flex justify-content-center gap-3">
        <button type="button" class="nav-btn-custom newsDetailPrev" aria-label="${getLabel("Previous article", "الخبر السابق")}">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button type="button" class="nav-btn-custom newsDetailNext" aria-label="${getLabel("Next article", "الخبر التالي")}">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  const modalEl = document.getElementById("overlayModal");
  const modal = new bootstrap.Modal(modalEl);

  modalEl.addEventListener(
    "shown.bs.modal",
    () => {
      if (window.newsDetailSwiperInstance) {
        window.newsDetailSwiperInstance.destroy(true, true);
      }

      const dotsEl = document.querySelector(".news-detail-pagination");
      const dotLabel = getLabel("Article", "الخبر");

      window.newsDetailSwiperInstance = new Swiper(".newsDetailMainSwiper", {
        initialSlide: startIndex,
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        fadeEffect: { crossFade: true },
        rtl: document.documentElement.dir === "rtl",
        keyboard: { enabled: true },
        a11y: { enabled: true },
        navigation: {
          nextEl: ".newsDetailNext",
          prevEl: ".newsDetailPrev",
        },
        on: {
          slideChange(swiper) {
            updateNewsDetailContent(swiper.activeIndex);
            renderWindowedDots(
              dotsEl,
              swiper.activeIndex,
              swiper.slides.length,
              dotLabel,
            );
          },
        },
      });

      bindWindowedDots(dotsEl, window.newsDetailSwiperInstance, dotLabel);
    },
    { once: true },
  );

  modal.show();

  modalEl.addEventListener(
    "hidden.bs.modal",
    () => dialog.classList.remove("modal-xl", "modal-dialog-scrollable"),
    { once: true },
  );
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

    const timeChip = e.target.closest("[data-news-time]");
    if (timeChip) {
      newsTimeFilter = timeChip.dataset.newsTime;
      displayedNewsCount = NEWS_PAGE_SIZE;
      renderNewsFilterBar();
      renderNewsGrid();
      return;
    }

    if (e.target.closest("#clearNewsFilterBtn")) {
      newsTimeFilter = "all";
      displayedNewsCount = NEWS_PAGE_SIZE;
      renderNewsFilterBar();
      renderNewsGrid();
      return;
    }

    const readMoreLink = e.target.closest("[data-news-id]");
    if (readMoreLink) {
      e.preventDefault();
      openNewsDetailOverlay(readMoreLink.dataset.newsId);
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.matches("#newsSortSelect")) {
      newsSortOrder = e.target.value;
      renderNewsGrid();
    }
  });
}

let videoSortMode = "newest"; // must match VIDEO_SORT_OPTIONS[0].key
let videoViewLayout = "grid"; // "grid" | "list"
let videosPageEventsBound = false;

const VIDEOS_PAGE_SIZE = 9  ;
let displayedVideosCount = VIDEOS_PAGE_SIZE;

const VIDEO_SORT_OPTIONS = [
  { key: "newest", en: "Newest", ar: "الأحدث" },
  { key: "oldest", en: "Oldest", ar: "الأقدم" },
  { key: "alpha", en: "A–Z", ar: "أ–ي" },
  { key: "alphaDesc", en: "Z–A", ar: "ي–أ" },
];

function compareVideoTitle(a, b) {
  const locale = appState.language === "ar" ? "ar" : "en";
  return getLabel(a.titleEn, a.titleAr).localeCompare(
    getLabel(b.titleEn, b.titleAr),
    locale,
    { sensitivity: "base", numeric: true },
  );
}

const VIDEO_SORTERS = {
  newest: (a, b) => compareVideoDate(a, b, -1),
  oldest: (a, b) => compareVideoDate(a, b, 1),

  alpha: compareVideoTitle,

  alphaDesc: (a, b) => compareVideoTitle(b, a),
};

function videoPublishedTime(v) {
  const t = v.publishedAt ? new Date(v.publishedAt).getTime() : NaN;
  return Number.isNaN(t) ? -Infinity : t;
}

function compareVideoDate(a, b, direction) {
  const ta = videoPublishedTime(a);
  const tb = videoPublishedTime(b);

  if (ta === tb) return 0;
  if (ta === -Infinity) return 1;
  if (tb === -Infinity) return -1;

  return direction * (ta - tb);
}

function sortVideos(list) {
  const sorter = VIDEO_SORTERS[videoSortMode];
  return sorter ? [...list].sort(sorter) : list;
}

// ── Videos Page ──

function loadVideosPage() {
  const container = document.getElementById("videosPageContent");
  if (!container) return;

  videoSortMode = VIDEO_SORT_OPTIONS[0].key;
  videoViewLayout = "grid";
  displayedVideosCount = VIDEOS_PAGE_SIZE;

  container.innerHTML = `
    ${createBanner(getLabel("Media", "المحتوى الإعلامي"))}
    <div class="container-fluid overflow-hidden py-5 bg-light">
      <div class="container">
        <div class="section-title text-center mb-4">
          <h5 class="sub-title pb-0">${getLabel("Watch & Discover", "شاهد واكتشف عالمنا")}</h5>
          <p class="mb-0">${getLabel("Explore our latest videos, events, interviews, and highlights, and get a closer look at the people, activities, and stories behind our company.", " استكشف أحدث فيديوهاتنا وفعالياتنا ومقابلاتنا وأبرز لحظاتنا، وتعرّف عن قرب على الأشخاص والأنشطة والقصص التي تقف وراء شركتنا.")}</p>

        </div>
        <div class="videos-featured mb-5" id="videosFeaturedSection"></div>

        <div class="videos-toolbar d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div class="videos-toolbar-left d-flex align-items-center gap-4">
            <div class="videos-view-toggle d-flex gap-4" role="group" aria-label="${getLabel("View layout", "طريقة العرض")}">
              <button type="button" class="videos-view-btn" data-video-layout="grid" aria-label="${getLabel("Grid view", "عرض شبكي")}">
                <i class="fas fa-grip-vertical" aria-hidden="true"></i>
              </button>
              <button type="button" class="videos-view-btn" data-video-layout="list" aria-label="${getLabel("List view", "عرض قائمة")}">
                <i class="fas fa-list" aria-hidden="true"></i>
              </button>
            </div>
            <span class="small text-muted" id="videosCount"></span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <label for="videoSortSelect" class="small fw-semibold text-muted mb-0">⇅ ${getLabel("Sort by", "ترتيب حسب")}</label>
            <select id="videoSortSelect" class="form-select form-select-sm" style="width:auto;">
              ${VIDEO_SORT_OPTIONS.map(
                (o) => `
              <option value="${o.key}" ${videoSortMode === o.key ? "selected" : ""}>${getLabel(o.en, o.ar)}</option>
              `,
              ).join("")}
            </select>
          </div>
        </div>
        <div class="row" id="videosGridContainer"></div>
      </div>
    </div>
  `;

  renderFeaturedVideos();
  renderVideosGrid();
  bindVideosPageEvents();
}

function renderVideoViewToggle() {
  document.querySelectorAll("[data-video-layout]").forEach((btn) => {
    const isActive = btn.dataset.videoLayout === videoViewLayout;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive);
  });
}

const VIDEO_NEW_DAYS = 14;

function isVideoNew(v) {
  if (!v.publishedAt) return false;
  const age = Date.now() - new Date(v.publishedAt).getTime();
  return age >= 0 && age <= VIDEO_NEW_DAYS * 86400000;
}

function getVideoBadge(v) {
  if (isVideoNew(v)) return { key: "new", en: "New", ar: "جديد" };
  return null;
}

function videoCardHtml(v) {
  return videoPosterCardHtml(v, { badge: getVideoBadge(v) });
}

function resolveVideoThumb(img, youtubeId) {
  if (img.dataset.thumbFallback) return;
  if (img.naturalWidth > 200) return;

  img.dataset.thumbFallback = "1";
  img.src = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

function videoPosterCardHtml(v, { badge = null } = {}) {
  const title = getLabel(v.titleEn, v.titleAr);

  return `
    <button type="button" class="video-poster-card" data-video-play data-video-id="${v.id}" data-youtube-id="${v.youtubeId}" aria-label="${getLabel("Play", "تشغيل")}: ${title}">
      <img
        src="https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg"
        onload="resolveVideoThumb(this, '${v.youtubeId}')"
        onerror="resolveVideoThumb(this, '${v.youtubeId}')"
        alt="${title}"
        class="video-poster-img"
        loading="lazy">
      ${badge ? `<span class="video-badge video-badge-${badge.key}"><span class="breaking-badge-dot"></span>${getLabel(badge.en, badge.ar)}</span>` : ""}
      <span class="video-poster-caption">
        <i class="fa-solid fa-circle-play video-poster-play" aria-hidden="true"></i>
        <span class="video-poster-title">${title}</span>
      </span>
    </button>
  `;
}

function featuredVideoCardHtml(v) {
  return videoPosterCardHtml(v);
}

let youTubeApiPromise = null;

function loadYouTubeApi() {
  if (youTubeApiPromise) return youTubeApiPromise;

  youTubeApiPromise = new Promise((resolve, reject) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous();
      resolve(window.YT);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = reject;
    document.head.appendChild(tag);
  });

  return youTubeApiPromise;
}

function setCarouselAutoplay(running) {
  const sw = window.videosFeaturedSwiperInstance;
  if (!sw || !sw.autoplay) return;
  if (running) sw.autoplay.start();
  else sw.autoplay.stop();
}

let currentVideoPlayback = null;

const VIDEO_PLAYER_ANIM_MS = 320;

function animateCardHeight(el, fromPx, toPx) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || Math.abs(fromPx - toPx) < 1) return;

  el.style.height = fromPx + "px";
  void el.offsetHeight;

  el.style.transition = `height ${VIDEO_PLAYER_ANIM_MS}ms ease`;
  el.style.height = toPx + "px";

  const clear = () => {
    el.style.height = "";
    el.style.transition = "";
  };
  el.addEventListener("transitionend", clear, { once: true });
  setTimeout(clear, VIDEO_PLAYER_ANIM_MS + 80);
}

function stopCurrentVideo() {
  if (!currentVideoPlayback) return;

  const { wrap, poster, inCarousel, player } = currentVideoPlayback;
  currentVideoPlayback = null;

  if (player && typeof player.destroy === "function") {
    try {
      player.destroy();
    } catch (e) {
    }
  }

  if (inCarousel) setCarouselAutoplay(true);

  if (!wrap.isConnected) return;

  const from = wrap.getBoundingClientRect().height;
  wrap.replaceWith(poster);
  const to = poster.getBoundingClientRect().height;
  animateCardHeight(poster, from, to);
}

function playVideoCard(card) {
  const youtubeId = card.dataset.youtubeId;
  if (!youtubeId) return;

  stopCurrentVideo();

  const wrap = document.createElement("div");
  wrap.className = "video-poster-card is-playing";
  wrap.dataset.videoId = card.dataset.videoId;

  const inCarousel = !!card.closest(".videosFeaturedSwiper");
  if (inCarousel) {
    const box = card.getBoundingClientRect();
    if (box.width > 0 && box.height > 0) {
      wrap.style.flex = "0 0 auto";
      wrap.style.width = box.width + "px";
      wrap.style.height = box.height + "px";
      wrap.style.aspectRatio = "auto";
    }
  }

  wrap.innerHTML = `
    <iframe
        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}"
        title="${card.getAttribute("aria-label")}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
    </iframe>
  `;

  const from = card.getBoundingClientRect().height;
  card.replaceWith(wrap);

  if (!inCarousel) {
    animateCardHeight(wrap, from, wrap.getBoundingClientRect().height);
  }

  currentVideoPlayback = { wrap, poster: card, inCarousel, player: null };

  if (!inCarousel) return;

  setCarouselAutoplay(false);

  const playback = currentVideoPlayback;
  loadYouTubeApi()
    .then((YT) => {
      if (currentVideoPlayback !== playback || !playback.wrap.isConnected) return;

      playback.player = new YT.Player(playback.wrap.querySelector("iframe"), {
        events: {
          onStateChange: (e) => {
            if (currentVideoPlayback !== playback) return;
            const done =
              e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED;
            setCarouselAutoplay(done);
          },
        },
      });
    })
    .catch(() => {
    });
}

function renderFeaturedVideos() {
  const section = document.getElementById("videosFeaturedSection");
  if (!section) return;

  if (window.videosFeaturedSwiperInstance) {
    window.videosFeaturedSwiperInstance.destroy(true, true);
    window.videosFeaturedSwiperInstance = null;
  }

  const featured = videoItems.filter((v) => v.featured);

  if (featured.length === 0) {
    section.innerHTML = "";
    return;
  }

  section.innerHTML = `
    <div class="videos-featured-head section-title border-top d-flex align-items-center justify-content-between gap-3 pt-5 mb-3">
      <h4 class="fw-bold mb-0">${getLabel("Highlights", "أبرز الأحداث")}</h4>
      <div class="d-flex gap-2">
          <div class="videos-featured-prev nav-btn-custom" role="button" tabindex="0" aria-label="${getLabel("Previous", "السابق")}">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="videos-featured-next nav-btn-custom" role="button" tabindex="0" aria-label="${getLabel("Next", "التالي")}">
            <i class="fas fa-arrow-right"></i>
          </div>
      </div>
    </div>

    <div class="videos-featured-carousel border-bottom pb-4">
      <div class="swiper videosFeaturedSwiper">
        <div class="swiper-wrapper">
          ${featured.map((v) => `<div class="swiper-slide">${featuredVideoCardHtml(v)}</div>`).join("")}
        </div>
      </div>
    </div>
  `;

  const TRACK_LANES = 2;

  const SPACE_BETWEEN = "-46.3768%";

  const perView = (n) => Math.min(n, Math.max(1, featured.length - 1));

  const canLoop = featured.length >= perView(TRACK_LANES) * 2;

  window.videosFeaturedSwiperInstance = new Swiper(".videosFeaturedSwiper", {
    slidesPerView: perView(TRACK_LANES),
    centeredSlides: false,
    centeredSlidesBounds: !canLoop,
    loop: canLoop,
    loopAdditionalSlides: TRACK_LANES,
    rewind: !canLoop,
    speed: 400,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    initialSlide: 0,
    spaceBetween: SPACE_BETWEEN,
    slideToClickedSlide: false,
    watchSlidesProgress: true,
    rtl: document.documentElement.dir === "rtl",
    navigation: {
      nextEl: ".videos-featured-next",
      prevEl: ".videos-featured-prev",
    },
    on: {
      slideChange() {
        if (currentVideoPlayback && currentVideoPlayback.inCarousel) {
          stopCurrentVideo();
        }
      },
    },
    breakpoints: {
      0: { slidesPerView: Math.min(1, featured.length), spaceBetween: 0 },
      768: { slidesPerView: perView(TRACK_LANES), spaceBetween: SPACE_BETWEEN },
    },
  });
}

function renderVideosGrid() {
  const grid = document.getElementById("videosGridContainer");
  if (!grid) return;

  renderVideoViewToggle();

  grid.classList.toggle("videos-list-view", videoViewLayout === "list");
  const colClass = videoViewLayout === "list" ? "col-12" : "col-md-6 col-lg-4";

  if (videoItems.length === 0) {
    renderVideosCount(0, 0);
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-muted">
        ${getLabel("No videos yet.", "لا توجد فيديوهات بعد.")}
      </div>
    `;
    return;
  }

  const sorted = sortVideos(videoItems);
  const visible = sorted.slice(0, displayedVideosCount);
  const hasMore = displayedVideosCount < sorted.length;

  renderVideosCount(visible.length, sorted.length);

  const cardsHtml = visible
    .map((v) => `<div class="${colClass} p-3">${videoCardHtml(v)}</div>`)
    .join("");

  const showMoreHtml = hasMore
    ? `
      <div class="col-12 text-center pt-3 mb-3">
        <button type="button" class="btn btn-primary px-5 py-2" id="showMoreVideosBtn">
          ${getLabel("Show More", "عرض المزيد")}
        </button>
      </div>
    `
    : "";

  grid.innerHTML = cardsHtml + showMoreHtml;
}

function renderVideosCount(shown, total) {
  const el = document.getElementById("videosCount");
  if (!el) return;

  if (shown < total) {
    el.textContent = getLabel(
      `Showing ${shown} of ${total} videos`,
      `عرض ${shown} من ${total} فيديو`,
    );
    return;
  }

  el.textContent =
    total === 1
      ? getLabel("1 video", "فيديو واحد")
      : getLabel(`${total} videos`, `${total} فيديو`);
}

function bindVideosPageEvents() {
  if (videosPageEventsBound) return;
  videosPageEventsBound = true;

  document.addEventListener("click", (e) => {
    const playCard = e.target.closest("[data-video-play]");
    if (playCard) {
      const slide = playCard.closest(".videosFeaturedSwiper .swiper-slide");
      if (slide && !slide.classList.contains("swiper-slide-active")) {
        const swiper = window.videosFeaturedSwiperInstance;
        const loopIndex = Number(slide.dataset.swiperSlideIndex);

        if (swiper && Number.isFinite(loopIndex)) {
          swiper.slideToLoop(loopIndex);
        } else if (swiper) {
          swiper.slideTo([...slide.parentElement.children].indexOf(slide));
        }
        return;
      }

      playVideoCard(playCard);
      return;
    }

    if (e.target.closest("#showMoreVideosBtn")) {
      displayedVideosCount += VIDEOS_PAGE_SIZE;
      renderVideosGrid();
      return;
    }

    const layoutBtn = e.target.closest("[data-video-layout]");
    if (layoutBtn && layoutBtn.dataset.videoLayout !== videoViewLayout) {
      videoViewLayout = layoutBtn.dataset.videoLayout;
      renderVideosGrid();
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.matches("#videoSortSelect")) {
      videoSortMode = e.target.value;
      displayedVideosCount = VIDEOS_PAGE_SIZE;
      renderVideosGrid();
    }
  });
}

// ── Contact Page ──

function loadContactPage() {
  const container = document.getElementById("contactPageContent");
  if (!container) return;

  // ── Data ──

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

  // ── Render ──

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
                                    ${getLabel("2 El Tayaran St, Nasr City", "2 شارع الطياران، مدينة نصر")}
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

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      const email = document.getElementById("contactEmail").value;
      const subject = document.getElementById("contactSubject").value;
      const message = document.getElementById("contactMessage").value;

      console.log("Contact form submitted", { name, email, subject, message });
    });
  }
}

// ── Legal Pages ──

function bindLegalToc(container) {
  const toc = container.querySelector(".legal-toc");
  if (!toc) return;

  toc.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function legalPageHtml({ pageTitle, tagline, updated, toc, body }) {
  return `
    ${createBanner(pageTitle)}

    <div class="container py-5">
      <div class="legal-header text-${getDirectionClass("start", "end")} mb-5">
        <h5 class="sub-title p-0">${pageTitle}</h5>
        <p class="text-muted mb-0">${tagline}</p>
        ${updated ? `<p class="legal-updated mb-0">${updated}</p>` : ""}
      </div>

      <div class="row g-4 g-lg-5">
        <div class="col-lg-4 col-xl-3 d-none d-lg-block">
          ${toc}
        </div>
        <div class="col-lg-8 col-xl-9">
          ${body}
        </div>
      </div>
    </div>
  `;
}

function loadTermsOfServicePage() {
  const container = document.getElementById("termsPageContent");
  if (!container) return;

  const docs = [legalDocuments.returns, legalDocuments.warranty];

  container.innerHTML = legalPageHtml({
    pageTitle: getLabel("Terms of Service", "الشروط والأحكام"),
    tagline: getLabel(
      "The return, exchange and warranty terms that apply to every Kader Factory product.",
      "شروط الاستبدال والاسترجاع والضمان المطبقة على جميع منتجات مصنع قادر.",
    ),
    toc: legalTocHtml(docs),
    body: `
      ${docs.map(legalDocHtml).join('<hr class="legal-divider">')}

      <div class="legal-contact">
        <div>
          <h3 class="h5 fw-bold mb-1">${getLabel("Still have a question?", "هل لديك استفسار؟")}</h3>
          <p class="mb-0 text-muted small">
            ${getLabel(
              "Our customer service team can walk you through any of the above.",
              "فريق خدمة العملاء لدينا مستعد لمساعدتك في أي مما سبق.",
            )}
          </p>
        </div>
        <a href="#contact" class="btn btn-primary rounded-0 px-4 py-2 flex-shrink-0" data-nav-page-id="contact">
          ${getLabel("Contact Us", "تواصل معنا")}
        </a>
      </div>
    `,
  });

  bindLegalToc(container);

  if (appState.legalScrollTarget) {
    const target = document.getElementById(appState.legalScrollTarget);
    appState.legalScrollTarget = null;
    if (target) {
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }
}

function loadPrivacyPolicyPage() {
  const container = document.getElementById("privacyPageContent");
  if (!container) return;

  const doc = legalDocuments.privacy;

  container.innerHTML = legalPageHtml({
    pageTitle: getLabel("Privacy Policy", "سياسة الخصوصية"),
    tagline: getLabel(
      "How Kader Factory handles the information you share with us.",
      "كيف يتعامل مصنع قادر مع المعلومات التي تشاركها معنا.",
    ),
    updated: getLabel(doc.updated.en, doc.updated.ar),
    toc: legalTocHtml([doc]),
    body: `
      ${legalDocHtml(doc)}

      <div class="legal-contact">
        <div>
          <h3 class="h5 fw-bold mb-1">${getLabel("A question about your data?", "لديك استفسار بشأن بياناتك؟")}</h3>
          <p class="mb-0 text-muted small">
            ${getLabel(
              "Write to us and we will answer directly.",
              "راسلنا وسنجيبك مباشرة.",
            )}
          </p>
        </div>
        <a href="#contact" class="btn btn-primary rounded-0 px-4 py-2 flex-shrink-0" data-nav-page-id="contact">
          ${getLabel("Contact Us", "تواصل معنا")}
        </a>
      </div>
    `,
  });

  bindLegalToc(container);
}

// ── Register & Login Pages ──

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
                                    <h4 class="fw-bold text-primary mb-0">70+</h4>
                                    <span class="text-white-50 small">${getLabel("Years Experience", "سنوات خبرة")}</span>
                                </div>
                                <div>
                                    <h4 class="fw-bold text-primary mb-0">100+</h4>
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

                        <div class="text-center text-lg-${getDirectionClass("start", "end")} mb-2">
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
                            <div class="row g-3 mb-3 pt-5">
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
                                    
                                    <button class="btn btn-outline-primary position-absolute ${getDirectionClass("end-0", "start-0")}"  type="button" id="togglePassword">
                                    <i class="far fa-eye-slash"></i>
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

                            <button type="button" id="googleSignupBtn" class="btn btn-outline-secondary w-100 py-3 rounded-0 d-flex align-items-center justify-content-center gap-2">
                                <i class="fab fa-google"></i>
                                ${getLabel("Continue with Google", "المتابعة عبر جوجل")}
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    `;

  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("signupPassword");
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.querySelector("i").className = isPassword
      ? "far fa-eye"
      : "far fa-eye-slash";
  });

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

    loginUser(user, true);
    setCurrentPage(user.role === "admin" ? "admin" : "profile");
  });

  const googleSignupBtn = document.getElementById("googleSignupBtn");
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener("click", () =>
      startGoogleAuth(googleSignupBtn, true),
    );
  }

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

    Object.values(fields).forEach((f) => f && clearError(f));

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

    if (!fields.agreeTerms.checked) {
      fields.agreeTerms.classList.add("is-invalid");
      isValid = false;
    } else {
      fields.agreeTerms.classList.remove("is-invalid");
    }

    return isValid;
  }
}

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
                                <h4 class="fw-bold text-primary mb-0">70+</h4>
                                <span class="text-white-50 small">${getLabel("Years Experience", "سنوات خبرة")}</span>
                              </div>
                            <div>
                              <h4 class="fw-bold text-primary mb-0">100+</h4>
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

                        <div class="text-center ${getDirectionClass("text-lg-start", "text-lg-end")} mb-5">
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
                                    <button class="btn btn-outline-primary position-absolute ${getDirectionClass("end-0", "start-0")}"  type="button" id="toggleLoginPassword">

                                        <i class="far fa-eye-slash"></i>
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
                                <a href="#forgot-password" class="small text-primary text-decoration-none" data-nav-page-id="forgot-password">
                                    ${getLabel("Forgot Password?", "نسيت كلمة المرور؟")}
                                </a>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 py-3 rounded-0 fw-semibold">
                                ${getLabel("Sign In", "تسجيل الدخول")}
                            </button>

                            <div class="text-center my-4 signup-divider">
                                <span class="bg-white px-3 text-muted small">${getLabel("OR", "أو")}</span>
                            </div>

                            <button type="button" id="googleLoginBtn" class="btn btn-outline-secondary w-100 py-3 rounded-0 d-flex align-items-center justify-content-center gap-2">
                                <i class="fab fa-google"></i>
                                ${getLabel("Continue with Google", "المتابعة عبر جوجل")}
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    `;

  const toggleBtn = document.getElementById("toggleLoginPassword");
  const passwordInput = document.getElementById("loginPassword");
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.querySelector("i").className = isPassword
      ? "far fa-eye"
      : "far fa-eye-slash";
  });

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

    const isAdmin = email.toLowerCase() === DEMO_ADMIN_EMAIL;
    const namePart = email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .trim();
    const displayName = isAdmin
      ? "Admin"
      : namePart.replace(/\b\w/g, (c) => c.toUpperCase());

    loginUser(
      {
        name: displayName,
        email,
        phone: "",
        role: isAdmin ? "admin" : "customer",
      },
      document.getElementById("rememberMe").checked,
    );
    setCurrentPage(isAdmin ? "admin" : "profile");
  });

  const googleLoginBtn = document.getElementById("googleLoginBtn");
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () =>
      startGoogleAuth(
        googleLoginBtn,
        document.getElementById("rememberMe").checked,
      ),
    );
  }
}

// ── Military Access Page ──

function loadMilitaryAccessPage() {
  const container = document.getElementById("militaryAccessPageContent");
  if (!container) return;

  if (hasMilitaryAccess()) {
    goToProductsWithFilter("military");
    return;
  }

  const lockout = getMilitaryLockout();
  const isLocked = lockout.lockedUntil && lockout.lockedUntil > Date.now();

  container.innerHTML = `
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
                            <h2 class="display-1 fw-bold ${getDirectionClass("pb-3", "pb-5")} text-primary">${getLabel("Restricted Access", "محتوي مقيد")}</h2>
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
                            <span class="badge bg-info d-inline-flex align-items-center gap-2 px-3 py-2 mb-3">
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
                                <p class="form-text small mt-2 mb-0" id="militaryOtpHint">
                                    <i class="fas fa-clock ${getDirectionClass("me-1", "ms-1")}"></i>
                                    ${getLabel(
                                      `It expires in ${MILITARY_OTP_TTL_MINUTES / 60} hours and can only be used once.`,
                                      `ينتهي خلال ${MILITARY_OTP_TTL_MINUTES / 60} ساعة ويُستخدم مرة واحدة فقط.`,
                                    )}
                                </p>
                            </div>

                            ${
                              isLocked
                                ? `<div class="alert alert-danger small mb-3">
                                     ${getLabel("Too many incorrect attempts. Please try again later.", "عدد كبير من المحاولات الخاطئة. يرجى المحاولة لاحقاً.")}
                                   </div>`
                                : ""
                            }

                            <button type="submit" class="btn btn-secondary w-100 py-3 rounded-0 fw-semibold" ${isLocked ? "disabled" : ""}>
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

// ── Single Product Page ──

function loadSingleProductPage(productId) {
  const container = document.getElementById("singleProductContent");
  if (!container) return;

  const product = productsData.find((p) => p.id === productId);

  if (!product) {
    container.innerHTML = `<div class="container py-5 text-center text-muted">${getLabel("Product not found", "المنتج غير موجود")}</div>`;
    return;
  }

  // ── Data — Read Directly From The Json, No Fallback Defaults ──
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

  // ── Render Helpers ──

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
        <div class="filter-chip  border-bottom border-black-25">
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
                            <span class="current-price text-white">EGP ${p.price}</span>
                            ${p.oldPrice ? `<span class="old-price text-white-50">EGP ${p.oldPrice}</span>` : ""}
                        </div>
                    </div>
                    <span class="badge bg-primary rounded-0 text-dark mb-2">${getLabel(p.sub_category.en, p.sub_category.ar)}</span>
                    <h6 class="card-title text-white mb-1">${getLabel(p.title.en, p.title.ar)}</h6>
                    <p class="card-text text-white-50 small product-desc">${getLabel(p.desc.en, p.desc.ar)}</p>
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

  // ── Render ──
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
                  <a href="#" class="btn btn-link ${getDirectionClass("", "ps-3 pe-0")}" onclick="setCurrentPage('${tab.linkPage}')">
                      ${getLabel(tab.linkLabel.en, tab.linkLabel.ar)}</i>
                  </a>
              `
                  : ""
              }
          </div>
      `,
    )
    .join("");

  // ── Res Section ──
  const stockQty = product.stockQty || 20;
  const maxSelectable = Math.min(stockQty, 20);

  const qtyOptionsHtml = Array.from({ length: maxSelectable }, (_, i) => i + 1)
    .map((n) => `<option value="${n}">${n}</option>`)
    .join("");

  // ── Render Page ──

  container.innerHTML = `
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

                        ${
                          product.categoryId === "military"
                            ? ""
                            : `
                        <div class="d-flex justify-content-start align-items-center">
                        <p class="m-0 pe-2">Share</p>
                        ${shareLinksHtml}
                        </div>
                        `
                        }

                        <hr>

                        <h5 class="sub-title p-0 pt-3">${getLabel("Details", "مواصفات المنتج")}</h5>
                        ${
                          product.weight
                            ? `<div class="spec-group-item border-bottom border-black-25">
                              <button class="spec-group-toggle d-flex align-items-center justify-content-between w-100 bg-transparent border-0 py-3" type="button" data-bs-toggle="collapse" data-bs-target="#specWeight">
                                <h6 class="fw-bold mb-0">${getLabel("Weight", "الوزن")}</h6>
                                <i class="fas fa-chevron-down spec-chevron"></i>
                              </button>
                              <div class="collapse" id="specWeight">
                                <ul class="text-muted small mb-3 ps-0">
                                <i class="fas fa-weight-hanging me-1"></i>
                                    ${product.weight} ${getLabel("kg", "كجم")}
                                </ul>
                              </div>
                            </div>`
                            : ""
                        }
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
                                        ${getLabel(`Only ${stockQty} left in stock`, `متبقي ${stockQty} فقط`)}
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
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333333">
                                  <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>
                                <div>
                                    <div class="small fw-semibold">${getLabel("Quality Guaranteed", "جودة مضمونة")}</div>
                                    <div class="small text-muted">${getLabel("Manufactured to international standards", "مُصنّع وفق المعايير الدولية")}</div>
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

  // ── Interactions ──

  const qtySelect = container.querySelector("#productQty");
  let selectedColor = getLabel(colors[0].name, colors[0].nameAr);
  let selectedSize = getLabel(sizes[0].en, sizes[0].ar);

  const getQty = () => parseInt(qtySelect?.value || "1", 10);

  container.querySelectorAll(".related-product-card").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      setCurrentPage("single-product", card.dataset.productId);
    });
  });

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

  container.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", function () {
      container
        .querySelectorAll(".color-swatch")
        .forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
      selectedColor = this.dataset.color;
    });
  });

  container.querySelectorAll(".size-option").forEach((opt) => {
    opt.addEventListener("click", function () {
      container
        .querySelectorAll(".size-option")
        .forEach((o) => o.classList.remove("active"));
      this.classList.add("active");
      selectedSize = this.dataset.size;
    });
  });

  container.querySelectorAll(".spec-group-toggle").forEach((btn) => {
    const targetId = btn.getAttribute("data-bs-target");
    const target = container.querySelector(targetId);
    if (!target) return;
    target.addEventListener("show.bs.collapse", () =>
      btn.querySelector(".spec-chevron").classList.add("rotated"),
    );
    target.addEventListener("hide.bs.collapse", () =>
      btn.querySelector(".spec-chevron").classList.remove("rotated"),
    );
  });

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

// ── Cart Page ──
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

// ── Profile Page ──
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
      weight: null,
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
        key: "weight",
        label: { en: "Weight (kg, optional)", ar: "الوزن (كجم، اختياري)" },
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
      categoryId: "",
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
        key: "categoryId",
        label: {
          en: "Button Links To (category filter)",
          ar: "الزر يؤدي إلى (فلتر الفئة)",
        },
        type: "select",
        options: () => [
          { value: "", label: getLabel("No button", "بدون زر") },
          ...categoriesData.map((c) => ({
            value: c.categoryId,
            label: getLabel(c.name.en, c.name.ar),
          })),
        ],
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
      {
        label: { en: "Breaking News", ar: "أحدث الأخبار" },
        render: (n) =>
          isNewsBreaking(n)
            ? `<span class="badge bg-danger">${getLabel("Breaking News", "أحدث الأخبار")}</span>`
            : "—",
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
    label: { en: "Media", ar: "المحتوى الإعلامي" },
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
      youtubeId: "",
      publishedAt: new Date().toISOString().slice(0, 10),
    }),
    columns: [
      {
        label: { en: "Title", ar: "العنوان" },
        render: (v) => getLabel(v.titleEn, v.titleAr) || "—",
      },
      {
        label: { en: "Published", ar: "تاريخ النشر" },
        render: (v) => v.publishedAt || "—",
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
        key: "youtubeId",
        label: { en: "YouTube Video ID", ar: "معرف فيديو يوتيوب" },
        type: "text",
        required: true,
      },
      {
        key: "publishedAt",
        label: { en: "Published", ar: "تاريخ النشر" },
        type: "date",
      },
    ],
  },

  machinery: {
    label: { en: "Machinery", ar: "الآلات" },
    icon: "fas fa-industry",
    idKey: "id",
    getAll: () => machineryData,
    setAll: (arr) => {
      machineryData = arr;
      saveContentStore("machineryData", arr);
    },
    newItem: () => ({
      id: `machine-${Date.now()}`,
      img: "/images/prj-1.webp",
      titleEn: "",
      titleAr: "",
      descEn: "",
      descAr: "",
      specGroups: [],
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

function renderMilitaryOtpSection() {
  const container = document.getElementById("adminSectionBody");
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white rounded-3 p-4 mb-4">
      <h5 class="fw-bold mb-3">${getLabel("Issue Access Code", "إصدار رمز وصول")}</h5>
      <p class="text-muted small mb-3">
        ${getLabel(
          `Generate a one-time code for a verified military/corporate contact. It expires in ${MILITARY_OTP_TTL_MINUTES / 60} and can only be used once — relay it directly to the recipient (phone/email), not over any public channel.`,
          `أصدر رمزاً مؤقتاً لجهة اتصال عسكرية/مؤسسية موثقة. ينتهي خلال ${MILITARY_OTP_TTL_MINUTES / 60} ويُستخدم مرة واحدة فقط — أرسله مباشرة إلى المستلم (هاتف/بريد إلكتروني) وليس عبر أي قناة عامة.`,
        )}
      </p>
      <form id="militaryOtpGenerateForm" class="row g-2 align-items-end" novalidate>
        <div class="col-md-4">
          <label class="form-label small fw-semibold">${getLabel("Recipient Name", "اسم المستلم")}</label>
          <input type="text" class="form-control" id="motpRecipientName" required>
          <div class="invalid-feedback" id="motpRecipientName-error"></div>
        </div>
        <div class="col-md-4">
          <label class="form-label small fw-semibold">${getLabel("Phone or Email", "الهاتف أو البريد الإلكتروني")}</label>
          <input type="text" class="form-control" id="motpRecipientContact" required>
          <div class="invalid-feedback" id="motpRecipientContact-error"></div>
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

function militaryRevokeActionHtml(code, status) {
  if (status === "active") {
    return `<button type="button" class="btn btn-sm btn-outline-danger military-revoke-btn" data-otp-id="${code.id}">
      ${getLabel("Revoke", "إلغاء")}
    </button>`;
  }
  if (status === "used") {
    return `<button type="button" class="btn btn-sm btn-outline-danger military-revoke-btn" data-otp-id="${code.id}" title="${getLabel("Also blocks the access this code already granted — same browser/device only", "يمنع أيضاً الوصول الذي منحه هذا الرمز بالفعل — لنفس المتصفح/الجهاز فقط")}">
      ${getLabel("Revoke Access", "إلغاء الوصول")}
    </button>`;
  }
  const reason =
    status === "expired"
      ? getLabel("Already expired", "منتهي الصلاحية بالفعل")
      : getLabel("Already revoked", "ملغى بالفعل");
  return `<button type="button" class="btn btn-sm btn-outline-secondary" disabled title="${reason}">
    ${getLabel("Revoke", "إلغاء")}
  </button>`;
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
            ${militaryRevokeActionHtml(c, status)}
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

  function showError(field, message) {
    field.classList.add("is-invalid");
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(field) {
    field.classList.remove("is-invalid");
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) errorEl.textContent = "";
  }

  function validateGenerateForm(nameInput, contactInput) {
    let isValid = true;
    clearError(nameInput);
    clearError(contactInput);

    if (!nameInput.value.trim()) {
      showError(
        nameInput,
        getLabel("Recipient name is required", "اسم المستلم مطلوب"),
      );
      isValid = false;
    }

    const contact = contactInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d][\d\s-]{6,}$/;
    if (!contact) {
      showError(
        contactInput,
        getLabel(
          "Phone or email is required",
          "الهاتف أو البريد الإلكتروني مطلوب",
        ),
      );
      isValid = false;
    } else if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      showError(
        contactInput,
        getLabel(
          "Enter a valid phone number or email address",
          "أدخل رقم هاتف أو بريداً إلكترونياً صحيحاً",
        ),
      );
      isValid = false;
    }

    return isValid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.getElementById("motpRecipientName");
    const contactInput = document.getElementById("motpRecipientContact");

    if (!validateGenerateForm(nameInput, contactInput)) return;

    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();

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

// ── CMS: Content Management ──

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

// ── Admin Dashboard ──
const ADMIN_PERIOD_DAYS = { "7d": 7, "30d": 30, all: null };
let adminPeriod = "7d";

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

function computeTrendPct(current, previous, hasPreviousWindow) {
  if (!hasPreviousWindow) return null;
  if (previous === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - previous) / previous) * 100);
}

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

function getOrderUrgency(order) {
  const hours = Math.floor(
    (Date.now() - new Date(order.date).getTime()) / 3600000,
  );
  if (order.status === "delivered") return { level: "done", hours };
  if (hours >= 72) return { level: "late", hours };
  if (hours >= 24) return { level: "duesoon", hours };
  return { level: "ontrack", hours };
}

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
  { key: "videos", en: "Media", ar: "المحتوى الإعلامي", icon: "fas fa-video" },
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

// ── Checkout Page ──

const CHECKOUT_INSTAPAY_HANDLE = "kaderfactory@instapay"; // TODO: real handle
const CHECKOUT_BANK_ACCOUNT = "EG00 0000 0000 0000 0000 0000"; // TODO: real IBAN
const CHECKOUT_SHIPPING_FLAT = 0;

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

// ── Order & Content Storage ──

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

function mergeContentStore(seedData, storedData) {
  if (!Array.isArray(seedData) || !Array.isArray(storedData)) return storedData;

  const storedById = new Map(
    storedData.filter((i) => i && i.id != null).map((i) => [String(i.id), i]),
  );
  const seedIds = new Set(
    seedData.filter((i) => i && i.id != null).map((i) => String(i.id)),
  );

  const merged = seedData.map((seedItem) => {
    const saved = storedById.get(String(seedItem?.id));
    return saved ? { ...seedItem, ...saved } : seedItem;
  });

  const extras = storedData.filter(
    (i) => i && i.id != null && !seedIds.has(String(i.id)),
  );

  return [...merged, ...extras];
}

function loadContentStore(key, seedData) {
  const raw = localStorage.getItem(`cms_${key}`);
  if (raw === null) {
    return JSON.parse(JSON.stringify(seedData));
  }
  try {
    return mergeContentStore(
      JSON.parse(JSON.stringify(seedData)),
      JSON.parse(raw),
    );
  } catch (e) {
    console.error(`Failed to load content store "${key}"`, e);
    return JSON.parse(JSON.stringify(seedData));
  }
}

function saveContentStore(key, data) {
  localStorage.setItem(`cms_${key}`, JSON.stringify(data));
}

const CONTENT_STORE_VERSION = "2";

function discardSeedSnapshots() {
  try {
    if (localStorage.getItem("cms_storeVersion") === CONTENT_STORE_VERSION) {
      return;
    }
    Object.keys(localStorage)
      .filter((k) => k.startsWith("cms_"))
      .forEach((k) => localStorage.removeItem(k));
    localStorage.setItem("cms_storeVersion", CONTENT_STORE_VERSION);
  } catch (e) {
    console.error("Could not clear seed snapshots", e);
  }
}

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

function loadCheckoutPage() {
  const container = document.getElementById("checkoutPageContent");
  if (!container) return;

  const cart = appState.cart || [];

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

// ── Helpers ──
function formatEGP(amount) {
  return `${getLabel("EGP", "ج.م")} ${Number(amount).toLocaleString()}`;
}

function renderCheckoutItem(item) {
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

// ── Events ──
let checkoutEventsBound = false;

function bindCheckoutEvents() {
  if (checkoutEventsBound) return;
  checkoutEventsBound = true;

  document.addEventListener("click", (e) => {
    const paymentOption = e.target.closest("[data-payment-option]");
    if (paymentOption) {
      selectPaymentMethod(paymentOption.dataset.paymentOption);
      return;
    }

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

    const copyBtn = e.target.closest("[data-copy-text]");
    if (copyBtn) {
      navigator.clipboard.writeText(copyBtn.dataset.copyText);
      const icon = copyBtn.querySelector("i");
      icon.className = "fas fa-check";
      setTimeout(() => (icon.className = "fas fa-copy"), 1500);
      return;
    }

    if (e.target.closest("#proofUploadZone")) {
      document.getElementById("checkoutProof")?.click();
      return;
    }

    if (e.target.closest("#removeProofBtn")) {
      e.stopPropagation();
      clearProofFile();
      return;
    }

    if (e.target.closest("#placeOrderBtn")) {
      handlePlaceOrder();
      return;
    }

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

// ── Proof Upload ──
function handleProofUpload(file) {
  const errorEl = document.getElementById("proofError");
  const placeholder = document.getElementById("proofPlaceholder");
  const preview = document.getElementById("proofPreview");

  if (!file) return;

  const MAX_SIZE = 5 * 1024 * 1024;
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

// ── Validation ──
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

// ── Order Submission ──
function handlePlaceOrder() {
  if (!validateCheckoutForm()) return;

  const order = collectCheckoutData();

  if (order.paymentMethod === "card") {
    startGatewayPayment(order);
    return;
  }

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

async function submitOrder(order, proofFile) {
  const btn = document.getElementById("placeOrderBtn");
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${getLabel("Processing…", "جارٍ المعالجة…")}`;

  try {
    const formData = new FormData();
    formData.append("order", JSON.stringify(order));
    if (proofFile) formData.append("proof", proofFile);

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

async function startGatewayPayment(order) {
  try {

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

// ── Home Page Sections ──

function initializeHomePageSections() {
  const aboutSection = document.getElementById("aboutSection");
  if (aboutSection) {
    aboutSection.innerHTML = `
            <div class="container-fluid overflow-hidden pt-5 bg-light" style="width: 100%;">
                <div class="container bg-light pb-5 border-bottom">
                    <div class="row g-4">
                        <div class="col-xl-5 order-2 order-md-1 wow fadeInLeft" data-wow-delay="0.1s">
                            <div class="bg-light h-100 rounded-0 overflow-hidden">
                                <img src="/images/_about.webp" class="img-fluid about-img w-100 h-100" style="object-fit:cover;"  alt="About">
                            </div>
                        </div>
                        <div class="col-xl-7 order-1 order-md-2 wow fadeInRight" data-wow-delay="0.3s">
                            <h5 class="sub-title py-3 pb-0">${getLabel("About KADER", "عن مصنع قادر")}</h5>
                            <h1 class="display-5 mb-3">${getLabel("We're Trusted Factory Affiliated with AOI", "نحن مصنع موثوق به")}</h1>
                            <p class="mb-4 text-muted">
                                ${getLabel(aboutContent.paragraphs[0].en, aboutContent.paragraphs[0].ar)}
                                <br/>
                                <br/>
                                <a class="btn btn-link text-secondary ${getDirectionClass("ps-0", "ps-3 pe-0")} pt-0 pb-0" href="/#about" data-discover="true" ;">
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
    const subLink = e.target.closest("[data-subcategory-id]");
    if (subLink) {
      e.preventDefault();
      e.stopPropagation();
      goToProductsWithFilter(
        subLink.dataset.categoryId,
        subLink.dataset.subcategoryId,
      );
      return;
    }

    const catLink = e.target.closest("[data-category-id]");
    if (catLink) {
      e.preventDefault();
      goToProductsWithFilter(catLink.dataset.categoryId);
    }
  });

  const categorySection = document.getElementById("categorySection");
  if (categorySection) {
    const categorySlidesHtml = categoriesData
      .map(
        (cat) => `
    <div class="swiper-slide">
        <a href="#" class="category-card-link" data-category-id="${cat.categoryId}">
            <div class="category-card">
                 <div class="category-card-name text-start w-100 p-2 rounded-0">
                 <i class="fa-solid fa-chevron-down small pe-2 category-card-name-icon"></i>
                  ${getLabel(cat.name.en, cat.name.ar)}
                 </div>
                 <div class="category-card-img">
                    <img src="${cat.img}" class="img-fluid" alt="${getLabel(cat.name.en, cat.name.ar)}">
                </div>
                 <ul class="category-card-details pt-2">
                    ${
                      cat.categoryId === "military"
                        ? `
                        <i class="fa-solid fa-fingerprint display-1" style="opacity:.15;position:absolute;left:50%;top:50%;transform: translate(-50% ,-30%);"></i>
                        <li class="category-card-restricted ps-0 mx-auto text-info" style="transition-delay: 0ms; list-style: none"><i class="fas fa-lock ${getDirectionClass("me-2", "ms-2")}"></i>${getLabel("Authorization Required", "يتطلب تصريح دخول")}</li>
                        `
                        : cat.subCategories
                            .map(
                              (variant, i) => `
                        <li style="transition-delay: ${i * 80}ms;" data-category-id="${cat.categoryId}" data-subcategory-id="${variant.subCategoryId}">${"  "}${getLabel(variant.name.en, variant.name.ar)}</li>
                    `,
                            )
                            .join("")
                    }
                </ul>
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

    new Swiper(".categoriesSwiper", {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row", // or 'column' — controls how slides fill the grid
      },
      spaceBetween: 20,
      loop: true,
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

  let activeProductCategory = "all";

  const HOME_HIDDEN_CATEGORIES = new Set(["military"]);
  const homeProducts = () =>
    productsData.filter((p) => !HOME_HIDDEN_CATEGORIES.has(p.categoryId));

  const productSection = document.getElementById("productSection");
  if (productSection) {
    productSection.innerHTML = `
        <div class="container-fluid products overflow-hidden bg-light">
            <div class="container py-5 pb-3 border-top border-bottom border-black-25">
                <div class="section-title text-center d-flex align-items-center justify-content-between">
                    <h5 class="sub-title">${getLabel("Our Products", "المنتجات")}</h5>
                    <span class="text-black-50 small border border-opacity-25 border-secondary border-1 py-2 px-3" id="productCount"></span>
                    </div>
                    
                    <!-- Filter Bar (Swiper) -->
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 filter-bar">
                        <div class="swiper filterChipsSwiper flex-grow-1">
                            <div class="swiper-wrapper" id="filterChips"></div>
                        </div>
                    </div>
                    
                    <!-- Product Grid -->
                    <div class="row g-4" id="productsGrid"></div>
                    
                    <div class="col-12 ${getDirectionClass("text-end","text-start")} p-2" id="viewAllProductsSection">
                        <a class="btn btn-link border-secondary rounded-0 ps-3" href="#" onclick="setCurrentPage('products')">
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

  function renderFilterChips() {
    const chipsContainer = document.getElementById("filterChips");
    if (!chipsContainer) return;

    const uniqueCategories = [
      ...new Map(categoriesData.map((p) => [p.categoryId, p.name])).entries(),
    ].filter(([categoryId]) => !HOME_HIDDEN_CATEGORIES.has(categoryId));

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

  function renderProductsGrid() {
    const grid = document.getElementById("productsGrid");
    const emptyState = document.getElementById("emptyState");
    const viewAll = document.getElementById("viewAllProductsSection");
    const countLabel = document.getElementById("productCount");
    if (!grid) return;

    const pool = homeProducts();
    const filtered =
      activeProductCategory === "all"
        ? pool
        : pool.filter((p) => p.categoryId === activeProductCategory);

    const displayedProducts = filtered.slice(0, 12);

    if (countLabel) {
      countLabel.textContent = `${displayedProducts.length} ${getLabel("products", "منتج")}`;
    }

    if (displayedProducts.length === 0) {
      grid.innerHTML = "";
      emptyState.classList.remove("d-none");
      viewAll.classList.add("d-none");
      return;
    }

    emptyState.classList.add("d-none");
    viewAll.classList.remove("d-none");

    grid.innerHTML = displayedProducts
      .map(
        (product) => `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card product-card h-100 border-0 ">
                    <div class="product-img-wrap bg-white border">
                        <img src="${product.url}" class="card-img-top" alt="${getLabel(product.title.en, product.title.ar)}">
                    </div>

                    <div class="card-body">
                        <div class="price-section mt-3">
                            ${
                              product.oldPrice
                                ? `<span class="discount-badge bg-danger">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>`
                                : ""
                            }

                        <div class="price-row">
                            <span class="current-price text-white">
                                EGP ${product.price}
                            </span>

                            ${
                              product.oldPrice
                                ? `<span class="old-price text-white-50">EGP ${product.oldPrice}</span>`
                                : ""
                            }
                        </div>
                    </div>
            <span class="badge bg-primary rounded-0 text-black mb-2">${getLabel(product.sub_category.en, product.sub_category.ar)}</span>

            <h6 class="card-title mb-1 text-white">${getLabel(product.title.en, product.title.ar)}</h6>

            <p class="card-text text-white-50 small product-desc">
                ${getLabel(product.desc.en, product.desc.ar)}
            </p>
        </div>
    </div>
    </div>
    `,
      )
      .join("");

    grid.querySelectorAll(".product-card").forEach((card, i) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        setCurrentPage("single-product", displayedProducts[i].id);
      });
    });
  }

  const newsSection = document.getElementById("newsSection");
  if (newsSection) {
    const sortedNews = [...newsItems]
      .sort((a, b) => new Date(b.dateRaw) - new Date(a.dateRaw))
      .slice(0, 6);

    const newsSlidesHtml = sortedNews
      .map(
        (item) => `
        <div class="swiper-slide">
          <div class="news-card bg-white rounded-1 overflow-hidden h-100 d-flex flex-column align-items-start">
            <div class="news-card-img">
              <img src="${item.img}" class="img-fluid w-100 h-100" alt="${getLabel(item.titleEn, item.titleAr)}" loading="lazy">
              ${isNewsBreaking(item) ? `<span class="breaking-badge"><span class="breaking-badge-dot"></span>${getLabel("Breaking News", "أحدث الأخبار")}</span>` : ""}
            </div>
            <div class="news-card-content-shadow">
              <div class="p-4 news-card-content">
                <i class="fa-solid fa-quote-${getDirectionClass("left", "right")} text-primary ${getDirectionClass("border-end","border-start")} border-white border-opacity-25 ${getDirectionClass("pe-3", "ps-3")}"></i>
                <div class="col-md-10 col-lg-10 news-card-body">
                  <span class="text-white-50 small fw-semibold"><i class="far fa-calendar ${getDirectionClass("pe-1", "ps-1")}"></i>${getLabel(item.dateEn, item.dateAr)}</span>
                  <h5 class="fw-bold text-primary my-2 pb-3 news-card-title">${getLabel(item.titleEn, item.titleAr)}</h5>
                  <p class="text-white small mb-3 news-card-excerpt pt-4">${getLabel(item.excerptEn, item.excerptAr)}</p>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-link text-white small ps-0 news-card-readmore" onclick="setCurrentPage('news', '${item.id}')">
              ${getLabel("Read More", "اقرأ المزيد")}
            </a>
          </div>
        </div>
    `,
      )
      .join("");

    newsSection.innerHTML = `
        <div class="container-fluid overflow-hidden bg-light pt-4">
            <div class="container border-bottom pb-4">

                <div class="d-flex align-items-center justify-content-between py-3">
                    <div class="section-title mb-0">
                        <h5 class="sub-title mb-0 pe-3 pb-0">${getLabel("News", "الأخبار")}</h5>
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

                <div class="${getDirectionClass("text-end", "text-start")}">
                    <a class="btn btn-link ${getDirectionClass("", "ps-3")}" href="#" onclick="setCurrentPage('news')">
                        ${getLabel("View All", "عرض الكل")}
                    </a>
                </div>

            </div>
        </div>
    `;

    if (window.newsSwiperInstance) {
      window.newsSwiperInstance.destroy(true, true);
    }

    window.newsSwiperInstance = new Swiper(".newsSwiper", {
      slidesPerView: 1,
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
        320: { slidesPerView: 2 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  }

  const projectsSection = document.getElementById("projectsSection");
  if (projectsSection) {
    projectsSection.innerHTML = `
    <div class="container overflow-hidden rounded-1 p-5 position-relative" id="projectsBgWrapper">

        <!-- Background image layer -->
        <div class="projects-bg-image" id="projectsBgImage" style="background-image: url('${machineryData[0].img}');"></div>

        <!-- Dark overlay for readability -->
        <div class="projects-bg-overlay"></div>

        <!-- Content -->
        <div class="container projects-container position-relative py-5">
            <h5 class="sub-title pb-5">${getLabel("Machinery", "الآلات")}</h5>

            <div class="row g-5 align-items-stretch flex-column-reverse flex-lg-row">

                <div class="col-lg-4 d-flex">
                    <div class="d-flex flex-column justify-content-center h-100 w-100">
                        <div class="section-title text-start flex-grow-1">
                            <h1 class="display-5 text-white" id="activeProjectTitle">${getLabel(machineryData[0].titleEn, machineryData[0].titleAr)}</h1>
                            <p class="text-white-50 mb-0" id="activeProjectDesc">${getLabel(machineryData[0].descEn, machineryData[0].descAr)}</p>
                        </div>
                        <div>
                            <a href="#" class="btn btn-link text-primary border-secondary rounded-0 ${getDirectionClass("ps-0", "pe-0 ps-3")} py-0 mb-4" id="activeProjectLink" onclick="openMachineDetailOverlay('${machineryData[0].id}')">
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
      const activeMachine = machineryData[index];

      const titleEl = document.getElementById("activeProjectTitle");
      const descEl = document.getElementById("activeProjectDesc");
      const linkEl = document.getElementById("activeProjectLink");

      document.getElementById("projectsBgImage").style.backgroundImage =
        `url('${activeMachine.img}')`;

      titleEl.textContent = getLabel(
        activeMachine.titleEn,
        activeMachine.titleAr,
      );
      descEl.textContent = getLabel(activeMachine.descEn, activeMachine.descAr);
      linkEl.setAttribute(
        "onclick",
        `openMachineDetailOverlay('${activeMachine.id}')`,
      );

      [titleEl, descEl, linkEl].forEach((el) => {
        el.classList.remove("slide-in-active");
        void el.offsetWidth;
        el.classList.add("slide-in-active");
      });

      renderDots();
    }

    function renderDots() {
      const pag = document.querySelector(".projects-pagination");
      pag.innerHTML = machineryData
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
        updateActiveProject((activeIndex + 1) % machineryData.length);
      });

    document
      .querySelector(".projects-button-prev")
      .addEventListener("click", () => {
        updateActiveProject(
          (activeIndex - 1 + machineryData.length) % machineryData.length,
        );
      });

    renderDots();
  }

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
                <div class="trust-logo-card bg-white d-flex align-items-center justify-content-center m-1">
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
                <div class="trust-stat-card text-center bg-white rounded-1 shadow-sm py-4 px-1 h-100 my-1">
                    <h5 class="text-primary fw-bold mb-3">${s.value}</h5>
                    <p class="text-muted mb-0">${getLabel(s.labelEn, s.labelAr)}</p>
                </div>
            </div>
        `,
      )
      .join("");

    trustedSection.innerHTML = `
            <div class="container-fluid trust overflow-hidden py-0 bg-secondary pt-1">
                <div class="container d-flex flex-wrap align-items-start gap-4 flex-lg-nowrap bg-secondary p-5">
    
                    <!-- Header -->
                    <div class="section-title text-center mb-5 trust-header-block">
                        <h5 class="sub-title pb-0">${getLabel("TRUSTED BY", "موثوق به من قبل")}</h5>
                        <h1 class="display-5 mb-4 text-primary text-shadow">${getLabel("Trusted by Leading Organizations", "موثوق به من قبل المؤسسات الرائدة")}</h1>
                        <p class="text-white-50" style="max-width: 700px;">
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
                        <h4 class="mb-4 text-white">
                            ${getLabel(
                              "Looking for reliable industrial manufacturing or machinery rental?",
                              "تبحث عن حلول موثوقة في المجال الصناعي أو تأجير المعدات؟",
                            )}
                        </h4>
                        <a href="#" class="btn btn-primary border-secondary rounded-0 py-3 px-5" onclick="setCurrentPage('contact')">
                            ${getLabel("Contact Us", "تواصل معنا")}
                        </a>
                    </div>
    
                </div>
            </div>
        `;
  }

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

function showAppLoader() {
  const loader = document.getElementById("appLoader");
  if (loader) loader.classList.remove("app-loader-hidden");
}

function hideAppLoader() {
  const loader = document.getElementById("appLoader");
  if (!loader) return;

  loader.classList.add("app-loader-hidden");

  const remove = () => loader.remove();
  loader.addEventListener("transitionend", remove, { once: true });
  setTimeout(remove, 600);
}

// ── App Initialization ──

async function initializeApp() {
  try {
    // ── App Settings ──
    document.documentElement.lang = appState.language;
    document.documentElement.dir = appState.direction;
    document.body.setAttribute("data-theme", appState.theme);
    document.documentElement.setAttribute("data-bs-theme", appState.theme);
    initializeAuth();

    // ── UI Components ──
    await Promise.all([
      loadProductsData(),
      loadCategoriesData(),
      loadMachineryData(),
      loadNewsData(),
      loadVideosData(),
      loadBannerData(),
    ]);

    discardSeedSnapshots();
    productsData = loadContentStore("products", productsData);
    bannerSlides = loadContentStore("bannerSlides", bannerSlides);
    newsItems = loadContentStore("newsItems", newsItems);
    videoItems = loadContentStore("videoItems", videoItems);
    machineryData = loadContentStore("machineryData", machineryData);

    const productsLink = navigationLinks.find((l) => l.id === "products");
    productsLink.megaMenu = buildProductsMegaMenuColumns();

    initializeNavigation();
    initializeSlider();
    initializeFooter();

    // ── Pages ──
    initializeHomePageSections();

    // ── Theme ──
    updateLogoBasedOnTheme();

    // ── Events ──
    setupEventListeners();

    // ── Initial Page ──
    const initialHash = window.location.hash.substring(1);
    const [initialPage, initialParam] = initialHash.split("/");
    if (initialPage === "reset-password") {
      appState.passwordResetToken = initialParam || "";
      setCurrentPage("reset-password");
    } else {
      setCurrentPage("home");
    }
  } finally {
    hideAppLoader();
  }
}

function setupEventListeners() {
  const toggler = document.getElementById("navbarToggler");
  const navCollapse = document.getElementById("navbarCollapse");

  if (toggler) {
    toggler.addEventListener("click", () => {
      navCollapse.classList.toggle("show");
    });
  }

  const homeLogo = document.getElementById("homeLogo");
  if (homeLogo) {
    homeLogo.addEventListener("click", (e) => {
      e.preventDefault();
      setCurrentPage("home");
    });
  }

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".copy-link");
    if (!btn) return;
    await navigator.clipboard.writeText(btn.dataset.url);
    btn.innerHTML = `<i class="fas fa-check"></i>`;
    setTimeout(() => {
      btn.innerHTML = `<i class="fas fa-link"></i>`;
    }, 1500);
  });

  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("mainNav");
    if (window.scrollY > 45) {
      navbar.classList.add("sticky-top", "shadow-sm");
    } else {
      navbar.classList.remove("sticky-top", "shadow-sm");
    }
  });

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const [pageId, param] = hash.split("/");
    if (pageId === "reset-password") {
      appState.passwordResetToken = param || "";
      setCurrentPage("reset-password");
      return;
    }

    setCurrentPage(hash);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const SCROLL_TOP_THRESHOLD = 400;

function initScrollTopButton() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  btn.setAttribute("aria-label", getLabel("Scroll to top", "العودة للأعلى"));

  const sync = () =>
    btn.classList.toggle("is-visible", window.scrollY > SCROLL_TOP_THRESHOLD);

  window.addEventListener("scroll", sync, { passive: true });
  btn.addEventListener("click", scrollToTop);

  sync();
}

document.addEventListener("DOMContentLoaded", initializeApp);
document.addEventListener("DOMContentLoaded", initScrollTopButton);

window.setCurrentPage = setCurrentPage;
window.toggleTheme = toggleTheme;
window.toggleLanguage = toggleLanguage;
window.scrollToTop = scrollToTop;
window.goToProfileTab = goToProfileTab;
window.updateOrderStatus = updateOrderStatus;
window.openMachineDetailOverlay = openMachineDetailOverlay;
window.resolveVideoThumb = resolveVideoThumb;
window.showAppLoader = showAppLoader;
window.hideAppLoader = hideAppLoader;
