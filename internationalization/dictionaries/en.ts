export default {
  hello: "Hello",
  auth: {
    loginTitle: "Login To System Administrator",
    email: "Email",
    password: "Password",
    login: "Login",

    errorMessages: {
      "auth/user-not-found": "User not found",
      "auth/wrong-password": "Wrong password",
      "auth/too-many-requests": "Too many requests",
      "auth/network-request-failed": "Network request failed",
      "auth/invalid-email": "Invalid email",
      "auth/email-already-in-use": "Email already in use",
      "auth/weak-password": "Weak password",
      "auth/operation-not-allowed": "Operation not allowed",
      "auth/internal-error": "Internal error",
    },
  },
  dashboard: {
    headerTitle: "Administration",
    sidebar: {
      categories: "Categories",
      subcategories: "Subcategories",
      links: "Links",
      consultation: "Consultation",
      requests: "Requests",
      settings: "Settings",
      dailyStudies: "Daily Studies",
      homeSlider: "Home Slider",
      detailForm: "Detail Form",
      popupNews: "Popup News",
      logout: "Logout",
    },
  },
  pages: {
    newsPopup: {
      popupNewsTitle: "Popup News",
      formTitle: "Popup News form",
      addNews: "Add News",
      noNews: "No News Added",
    },
    homeSlider: {
      imageSlider: "Image Slider",
      refreshInterval: "Refresh Interval",
    },
    settingsForm: {
      settingsFormTitle: "Settings Form",
      adminLogo: "Administrator Logo",
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
    search: "Search",
    done: "Done",
    cancel: "Cancel",
    confirm: "Confirm",
    change: "Change",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    addFile: "Add File",
    addAField: "Add a field",
    uploadImage: "Upload Image",
    uploadVideo: "Upload Video",
  },
  messages: {
    areYouSure: "Are you sure?",
    cantUndo: "You can't undo this action",
  },
  words: {
    text: "Text",
    video: "Video",
    image: "Image",
  },
} as const;
