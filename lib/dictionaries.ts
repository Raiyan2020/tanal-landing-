export type Lang = 'en' | 'ar';

export const dictionaries = {
  en: {
    nav: {
      create: "Create Invitation",
      howItWorks: "How it Works",
      features: "Features",
      portfolio: "Portfolio",
      contact: "Contact",
      login: "Login",
    },
    hero: {
      title: "Elevate your occasion into the era of digital transformation",
      subtitle: "A complete system for managing smart invitations, combining elegant design with technological precision to create an exceptional experience for you and your guests.",
      primaryCta: "Create Your Invitation",
      secondaryCta: "View Portfolio"
    },
    howItWorks: {
      title: "How it Works",
      steps: [
        {
          title: "Smart Setup",
          desc: "The admin uploads the invitation design, and the system automatically distributes the codes and buttons in pre-programmed locations."
        },
        {
          title: "Phased Sending",
          desc: "A welcome message is sent to the invitee via WhatsApp, and once they confirm their interest, they receive their personal invitation link immediately."
        },
        {
          title: "Digital Reception",
          desc: "Upon arrival, the receptionist scans the QR code to ensure safe and fast entry and prevent any manipulation."
        }
      ]
    },
    features: {
      title: "Elegant Features for Your Special Day",
      subtitle: "Everything you need to create, manage, and share your perfect wedding invitations.",
      items: [
        {
          title: "Automated WhatsApp Sending",
          desc: "Direct and fast communication with guests via the most used app.",
          icon: "MessageCircle"
        },
        {
          title: "Unique QR Code System",
          desc: "A specific code for each guest, ensuring invitation privacy and preventing duplicate entry.",
          icon: "QrCode"
        },
        {
          title: "Smart Response Logic",
          desc: "Three types of invitations (auto-accept, auto-reject, or FYI) to suit all types of events.",
          icon: "Settings"
        },
        {
          title: "Client Dashboard",
          desc: "Track who confirmed attendance and who apologized in real-time through an interactive reporting interface.",
          icon: "LayoutDashboard"
        },
        {
          title: "Download PDF Invitation",
          desc: "Guests can save their invitation to their device with one click to ensure quick access.",
          icon: "Download"
        },
        {
          title: "Google Maps Integration",
          desc: "Feature to copy location or navigate directly to the map to ensure guests arrive easily.",
          icon: "MapPin"
        }
      ]
    },
    portfolio: {
      title: "Our Luxury Portfolio",
      subtitle: "View some of our most elegant and memorable creations."
    },
    reservationForm: {
      title: "Book Your Experience",
      subtitle: "Are you ready to make your next event unforgettable?",
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      phoneLabel: "Phone Number (WhatsApp)",
      phonePlaceholder: "Enter your phone number",
      eventTypeLabel: "Event Type",
      eventTypePlaceholder: "Select event type",
      eventTypes: {
        wedding: "Wedding",
        graduation: "Graduation",
        party: "Party",
        other: "Other"
      },
      eventDateLabel: "Event Date",
      submitButton: "Send",
      successMessage: "Your booking request has been sent successfully. We will contact you soon."
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Let's create something beautiful together.",
      social: "Follow Us",
      whatsapp: "Contact via WhatsApp",
      address: "Visit Us",
      addressValue: "123 Elegance Avenue, Kuwait City, Kuwait",
      cta: "Message on WhatsApp"
    },
    footer: {
      bio: "Crafting digital luxury for your most memorable moments. Tanal offers elegant digital invitations that bring your vision to life.",
      privacyPolicy: "Privacy Policy",
      terms: "Terms & Conditions",
      aboutUs: "About Us",
      rights: "© 2026 Tanal. All rights reserved."
    },
    pages: {
      privacyPolicy: {
        title: "Privacy Policy",
        content: "At Tanal, we prioritize the protection of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us when using our digital invitation platform. We only collect the necessary information required to deliver our services, such as your name, contact details, and event information. We do not sell or share your data with third parties for marketing purposes. By using our platform, you consent to the practices described in this policy."
      },
      terms: {
        title: "Terms & Conditions",
        content: "These Terms & Conditions govern your use of the Tanal digital invitation platform. By accessing or using our services, you agree to be bound by these terms. Our platform is designed to provide you with elegant digital invitations and event management tools. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. Tanal reserves the right to modify or terminate services at any time without prior notice."
      },
      aboutUs: {
        title: "About Us",
        content: "Tanal is a premium digital invitation platform dedicated to transforming how you celebrate life's most special moments. We believe that an invitation is more than just a notification; it is the first impression of your event. Our team blends elegant design with cutting-edge technology to create seamless, luxurious experiences for you and your guests. From automated WhatsApp distribution to unique QR code entry systems, we handle the details so you can focus on making memories."
      }
    }
  },
  ar: {
    nav: {
      create: "إنشاء دعوة",
      howItWorks: "كيف يعمل",
      features: "الميزات",
      portfolio: "معرض الأعمال",
      contact: "تواصل معنا",
      login: "تسجيل الدخول",
    },
    hero: {
      title: "ارتقِ بمناسبتك إلى عصر التحول الرقمي",
      subtitle: "نظام متكامل لإدارة الدعوات الذكية، يجمع بين أناقة التصميم ودقة التكنولوجيا، ليمنحك تجربة استثنائية لك ولضيوفك.",
      primaryCta: "أنشئ دعوتك",
      secondaryCta: "شاهد معرض الأعمال"
    },
    howItWorks: {
      title: "كيف يعمل النظام",
      steps: [
        {
          title: "الإعداد الذكي",
          desc: "يرفع المسؤول تصميم الدعوة، ويقوم النظام آلياً بتوزيع الأكواد والأزرار في أماكنها المبرمجة مسبقاً."
        },
        {
          title: "الإرسال المرحلي",
          desc: "تصل رسالة ترحيبية للمدعو عبر الواتساب، وبمجرد تأكيد رغبته، يصله رابط دعوته الشخصية فوراً."
        },
        {
          title: "الاستقبال الرقمي",
          desc: "عند وصول الضيف، يقوم موظف الاستقبال بمسح كود الـ QR لضمان دخول آمن وسريع ومنع أي تلاعب."
        }
      ]
    },
    features: {
      title: "ميزات أنيقة لمناسبتك الخاصة",
      subtitle: "كل ما تحتاجه لإنشاء وإدارة ومشاركة دعوات زفافك المثالية.",
      items: [
        {
          title: "إرسال آلي عبر الواتساب",
          desc: "تواصل مباشر وسريع مع الضيوف عبر التطبيق الأكثر استخداماً.",
          icon: "MessageCircle"
        },
        {
          title: "نظام الـ QR Code الفريد",
          desc: "لكل مدعو كود خاص به، يضمن خصوصية الدعوة ومنع تكرار الدخول.",
          icon: "QrCode"
        },
        {
          title: "منطق الاستجابة الذكي",
          desc: "ثلاثة أنواع من الدعوات (قبول تلقائي، رفض تلقائي، أو للعلم فقط) لتناسب كافة أنواع المناسبات.",
          icon: "Settings"
        },
        {
          title: "لوحة تحكم العميل",
          desc: "تابع من أكد حضور ومن اعتذر في لحظتها عبر واجهة تقارير تفاعلية.",
          icon: "LayoutDashboard"
        },
        {
          title: "تحميل الدعوة PDF",
          desc: "يمكن للضيف حفظ دعوته على جهازه بضغطة زر واحدة لضمان الوصول السريع.",
          icon: "Download"
        },
        {
          title: "خرائط جوجل",
          desc: "ميزة نسخ الموقع أو الانتقال المباشر للخريطة لضمان وصول الضيوف بكل سهولة.",
          icon: "MapPin"
        }
      ]
    },
    portfolio: {
      title: "نماذج من أعمالنا",
      subtitle: "شاهد بعضاً من أكثر إبداعاتنا أناقة وخلوداً."
    },
    reservationForm: {
      title: "احجز تجربتك",
      subtitle: "هل أنت مستعد لجعل مناسبتك القادمة لا تُنسى؟",
      nameLabel: "الاسم",
      namePlaceholder: "أدخل اسمك",
      phoneLabel: "رقم الهاتف (واتساب)",
      phonePlaceholder: "أدخل رقم هاتفك",
      eventTypeLabel: "نوع المناسبة",
      eventTypePlaceholder: "اختر نوع المناسبة",
      eventTypes: {
        wedding: "زفاف",
        graduation: "تخرج",
        party: "حفلة",
        other: "أخرى"
      },
      eventDateLabel: "تاريخ المناسبة",
      submitButton: "إرسال",
      successMessage: "تم إرسال طلب الحجز بنجاح. سنتواصل معك قريبًا."
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "دعنا نصنع شيئاً جميلاً معاً.",
      social: "تابعنا",
      whatsapp: "تواصل عبر الواتساب",
      address: "قم بزيارتنا",
      addressValue: "١٢٣ شارع الأناقة، مدينة الكويت، الكويت",
      cta: "أرسل رسالة عبر الواتساب"
    },
    footer: {
      bio: "نصنع الفخامة الرقمية لأجمل لحظاتك. تقدم تنال دعوات رقمية أنيقة تجسد رؤيتك وتزيد مناسبتك تألقاً.",
      privacyPolicy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      aboutUs: "من نحن",
      rights: "© 2026 منصة تنال. جميع الحقوق محفوظة."
    },
    pages: {
      privacyPolicy: {
        title: "سياسة الخصوصية",
        content: "في تنال، نولي أولوية قصوى لحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية البيانات التي تقدمها لنا عند استخدام منصة الدعوات الرقمية الخاصة بنا. نحن نجمع فقط المعلومات الضرورية المطلوبة لتقديم خدماتنا، مثل اسمك وتفاصيل الاتصال ومعلومات المناسبة. نحن لا نبيع أو نشارك بياناتك مع أطراف ثالثة لأغراض التسويق. باستخدامك لمنصتنا، فإنك توافق على الممارسات الموضحة في هذه السياسة."
      },
      terms: {
        title: "الشروط والأحكام",
        content: "تحكم هذه الشروط والأحكام استخدامك لمنصة الدعوات الرقمية تنال. من خلال الوصول إلى خدماتنا أو استخدامها، فإنك توافق على الالتزام بهذه الشروط. تم تصميم منصتنا لتزويدك بدعوات رقمية أنيقة وأدوات إدارة الفعاليات. أنت مسؤول عن الحفاظ على سرية معلومات حسابك وعن جميع الأنشطة التي تحدث تحت حسابك. تحتفظ تنال بالحق في تعديل أو إنهاء الخدمات في أي وقت دون إشعار مسبق."
      },
      aboutUs: {
        title: "من نحن",
        content: "تنال هي منصة دعوات رقمية متميزة مكرسة لتغيير طريقة احتفالك بأجمل لحظات الحياة. نحن نؤمن بأن الدعوة هي أكثر من مجرد إشعار؛ إنها الانطباع الأول لحدثك. يمزج فريقنا بين التصميم الأنيق والتكنولوجيا المتطورة لخلق تجارب سلسة وفاخرة لك ولضيوفك. من التوزيع الآلي عبر الواتساب إلى أنظمة الدخول الفريدة باستخدام QR code، نهتم بجميع التفاصيل لتتمكن أنت من التركيز على صنع ذكريات لا تُنسى."
      }
    }
  }
};

/**
 * Resolves the page language from `?lang=` first, then the `tanal_lang` cookie,
 * defaulting to Arabic. Every page needs the same two-step lookup, and having
 * one copy per page invited them to drift.
 */
export function resolveLang(
  searchParamLang: string | undefined,
  cookieLang: string | undefined
): Lang {
  if (searchParamLang === 'en' || searchParamLang === 'ar') return searchParamLang;
  if (cookieLang === 'en' || cookieLang === 'ar') return cookieLang;
  return 'ar';
}
