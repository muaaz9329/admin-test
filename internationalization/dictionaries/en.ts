export default {
  hello: "Hello",
  auth: {
    loginTitle: "Login To System Administrator",
    email: "Email",
    password: "Password",
    login: "Login",
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
      formTitle: "News pop-up form",
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
    addFile: "Add File",
    done: "Done",
    cancel: "Cancel",
    addAField: "Add a field",
    delete: "Delete",
    uploadImage: "Upload Image",
    uploadVideo: "Upload Video",
  },
  words: {
    text: "Text",
    video: "Video",
    image: "Image",
  },
} as const;
