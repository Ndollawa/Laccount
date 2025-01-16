
interface AppRoute{
    name:string;
    path:string;
} 
export const generatePath = (route: AppRoute, params?: Record<string, string | number | undefined>) => {
  if(!route.path)return;
  return route.path.replace(/:(\w+)\/?/g, (_:any, key:any) => {
    if (!params || !params[key]) {
      // return `:${key}`;
      return ``;
    }
    return `${params[key]}/`;
  });
};


export const appRoutes: Record<string, AppRoute> = {
  "#": {
    path: "/#",
    name: "none",
  },
  home: {
    path: "/",
    name: "Home",
  },
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
  },
  "dashboard-services": {
    path: "/dashboard/services",
    name: "Services",
  },
  "dashboard-faq": {
    path: "/dashboard/faq/",
    name: "FAQ",
  },
  "dashboard-our-team": {
    path: "/dashboard/our-team",
    name: "Our Team",
  },
  "dashboard-sliders": {
    path: "/dashboard/sliders",
    name: "Homepage Sliders",
  },
  "dashboard-users": {
    path: "/dashboard/users",
    name: "Dashboard All Users",
  },
  "dashboard-mailer": {
    path: "/dashboard/mailer",
    name: "Mailer Settings",
  },
  "dashboard-blog": {
    path: "/dashboard/blog",
    name: "Blogs",
  },
  "dashboard-category": {
    path: "/dashboard/category",
    name: "Category Settings",
  },
  "dashboard-contacts": {
    path: "/dashboard/contacts",
    name: "Contacts ",
  },
  "dashboard-market": {
    path: "/dashboard/market",
    name: "Market ",
  },
  "dashboard-transactions": {
    path: "/dashboard/transactions",
    name: "Transactions",
  },
  "dashboard-wallets": {
    path: "/dashboard/wallets",
    name: "Walletx",
  },
  "dashboard-messenger": {
    path: "/dashboard/messenger",
    name: "Messenger ",
  },
  "dashboard-messenger-id": {
    path: "/dashboard/messenger/:action/:id/",
    name: "Messenger Chat ",
  },
  "dashboard-settings": {
    path: "/dashboard/settings",
    name: "Settings",
  },
  settings: {
    path: "/dashboard/settings",
    name: "Settings",
  },
  contact: {
    path: "/contact",
    name: "Contact",
  },
  careers: {
    path: "/careers/careers",
    name: "Careers",
  },
  "careers-apply-now": {
    path: "/careers/apply-now",
    name: "Apply now",
  },
  faqs: {
    path: "/faqs",
    name: "Faqs",
  },
  services: {
    path: "/services",
    name: "Services",
  },
      "service-id": {
      path: "/services/:action/:id/",
      name: "Service",
    },
  "terms-and-condition": {
    path: "/terms-and-condition",
    name: "Terms and Conditions",
  },
  "privacy-and-policy": {
    path: "/privacy-and-policy",
    name: "Privacy and Policy",
  },
  "our-blog": {
    path: "/our-blog",
    name: "Our blog",
  },
    "blog-id": {
      path: "/our-blog/posts/:action/:id/",
      name: "Post",
    },

  "our-team": {
    path: "/our-team",
    name: "Our team",
  },

    "team-id": {
      path: "/our-team/:action/:id/",
      name: "Team Member",
    },
  auth: {
    path: "/auth",
    name: "Dashboard",
  },
  login: {
    path: "/auth/login",
    name: "Log In",
  },
  register: {
    path: "/auth/register",
    name: "Register",
  },
  "forgot-password": {
    path: "/auth/forgot-password",
    name: "Forgot Password",
  },
  "reset-password": {
    path: "/auth/reset-password",
    name: "Reset Password",
  },

  error: {
    path: "/error/:errorCode",
    name: "Error",
  },

  support: {
    path: "/dashboard/support",
    name: "Support",
  },
  profile: {
    path: "/dashboard/profile",
    name: "Support",
  },
  "profile-edit": {
    path: "/dashboard/profile/edit",
    name: "Support",
  },
};
