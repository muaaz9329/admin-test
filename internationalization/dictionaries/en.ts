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
    dailyStudies: {
      formTitle: "Daily Studies Form",
      studyContent: "Study Content",
    },
    categories: {
      formTitle: "Category Form",
      addCategory: "Add Category",
    },
    subcategories: {
      formTitle: "Sub-Category Form",
      addCategory: "Add a sub-category",
    },
    settingsForm: {
      settingsFormTitle: "Settings Form",
      adminLogo: "Administrator Logo",
    },
    requests: {
      formTitle: "Details of the request",
      type: "Type",
      name: "Name",
      email: "Email",
      phoneNumber: "Phone Number",
      address: "Address",
    },
    links: {
      formTitle: "Add a new link",
      links: "Links",
      youtube: "Youtube",
      whatsapp: "Whatsapp",
      website: "Website",
      youtubePlaylist: "Youtube Playlist",
      websiteUrl: "Website URL",
      chooseType: "Choose a type",
    },
    consultation: {
      addBtn: "Add a new product",
      files: "files",
      payment: "Payment",
      formTitle: "file form",
      free: "free",
      paid: "paid",
      amount: "Amount",
    },
    subcategoryContent: {
      formTitle: "Subcategory Content Form",
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
    upload: "Upload",
    choose: "Choose",
    save: "Save",
    edit: "Edit",
    add: "Add",
    new: "New",

    delete: "Delete",
    addFile: "Add File",
    addAField: "Add a field",
    addCover: "Add Cover",
    uploadImage: "Upload Image",
    uploadVideo: "Upload Video",
    approve: "Approve",
  },
  messages: {
    areYouSure: "Are you sure?",
    cantUndo: "You can't undo this action",
  },
  words: {
    text: "Text",
    video: "Video",
    image: "Image",
    file: "File",
    title: "Title",
    description: "Description",
    serialNo: "Sr #",
    dailyStudies: "Daily Studies",
    fileName: "File Name",
    requests: "Requests",
    name: "Name",
    email: "Email",
    phoneNumber: "Phone Number",
    address: "Address",
    type: "Type",
    category: "Category",
    subcategory: "Subcategory",
    link: "Link",
    links: "Links",
    consultation: "Consultation",
    categories: "Categories",
    subcategories: "Subcategories",
    addContent: "Add Content",
    noContent: "No Content",
    timeToRead: "Time to read",
    content: "Content",
  },
} as const;
