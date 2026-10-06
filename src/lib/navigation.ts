// Lets any component (e.g. the footer) change page without prop drilling. App.tsx listens for this.
export const goToPage = (page: string) => {
  window.dispatchEvent(new CustomEvent("tt-navigate", { detail: page }));
};

// Login, passes, combos and merch used to go to the separate registration site (SITE.registerUrl).
// Sales are not open yet, so every one of these buttons shows the coming-soon page instead.
export const openRegistration = () => {
  goToPage("comingsoon");
};
