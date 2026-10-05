import { SITE } from "../config/site";

// Lets any component (e.g. the footer) change page without prop drilling. App.tsx listens for this.
export const goToPage = (page: string) => {
  window.dispatchEvent(new CustomEvent("tt-navigate", { detail: page }));
};

// Passes, combos and merch are bought on the separate registration site (SITE.registerUrl).
// Same tab, so the visitor stays in the flow and can use the back button.
export const openRegistration = () => {
  window.location.assign(SITE.registerUrl);
};
