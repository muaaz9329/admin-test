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
  intervals: {
    // like 5/10/15/... seconds/minutes
    "seconds#other": "{count} seconds",
    "minutes#other": "{count} minutes",
    "hours#other": "{count} hours",
    "days#other": "{count} days",
    "weeks#other": "{count} weeks",
    "months#other": "{count} months",
    "years#other": "{count} years",
  },
} as const;
