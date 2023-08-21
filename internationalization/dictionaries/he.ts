export default {
  hello: "שלום",
  auth: {
    loginTitle: "כניסה למנהל מערכת",
    email: "אימייל",
    password: "סיסמה",
    login: "התחברות",
  },
  dashboard: {
    headerTitle: "מנהל מערכת",
    sidebar: {
      categories: "קטגוריות",
      subcategories: "קטגוריות משנה",
      links: "קישורים",
      consultation: "ייעוץ",
      requests: "בקשות",
      settings: "הגדרה",
      dailyStudies: "לימודים יומיים",
      homeSlider: "סליידר ביתי",
      detailForm: "טופס פירוט",
      popupNews: "חדשות קופצות",
      logout: "להתנתק",
    },
  },
  pages: {
    newsPopup: {
      popupNewsTitle: "חדשות קופצות",
      formTitle: "טופס קופץ חדשות",
      addNews: "הוסף חדשות",
      noNews: "לא נוספו חדשות",
    },
  },
  intervals: {
    "seconds#other": "{count} שניות",
    "minutes#other": "{count} דקות",
    "hours#other": "{count} שעות",
    "days#other": "{count} ימים",
    "weeks#other": "{count} שבועות",
    "months#other": "{count} חודשים",
    "years#other": "{count} שנים",
  },
  actions: {
    search: "לחפש",
    addFile: "הוסף קובץ",
    done: "אישור",
    cancel: "לְבַטֵל",
    confirm: "לְאַשֵׁר",
    edit: "לַעֲרוֹך",
    addAField: "הוסף שדה",
    delete: "לִמְחוֹק",
    uploadImage: "העלה תמונה",
    uploadVideo: "העלה וידאו",
  },
  messages: {
    areYouSure: "האם אתה בטוח?",
    cantUndo: "אתה לא יכול לבטל פעולה זו",
  },
  words: {
    image: "תמונה",
    video: "וידאו",
    text: "טקסט",
  },
} as const;
