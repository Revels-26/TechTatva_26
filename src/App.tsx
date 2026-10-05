import { useEffect, useState } from "react";
import { VALID_PAGES } from "./config/site";

import Landing from "./components/Landing";
import EventsPage from "./pages/Events";
import Timetable from "./pages/Timetable";
import Speakers from "./pages/Speakers";
import MeetTheTeam from "./pages/MeetTheTeam";
import NotFound from "./pages/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const checkRoute = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash.slice(1);

      if (pathname !== "/" && pathname !== "") {
        const pathPage = pathname.slice(1).toLowerCase();
        if (VALID_PAGES.includes(pathPage)) {
          setCurrentPage(pathPage);
          window.location.hash = pathPage === "home" ? "" : pathPage;
        } else {
          setCurrentPage("404");
        }
      } else if (hash && VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      } else if (hash && !VALID_PAGES.includes(hash)) {
        setCurrentPage("404");
      } else {
        setCurrentPage("home");
      }
    };

    checkRoute();

    window.addEventListener("popstate", checkRoute);
    window.addEventListener("hashchange", checkRoute);

    const scrollToTop = () => window.scrollTo(0, 0);
    window.addEventListener("hashchange", scrollToTop);

    return () => {
      window.removeEventListener("popstate", checkRoute);
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("hashchange", scrollToTop);
    };
  }, []);

  const handleNavigate = (page: string) => {
    if (page === currentPage) return;

    if (VALID_PAGES.includes(page)) {
      setCurrentPage(page);
      if (page === "home") {
        window.history.pushState({}, "", "/");
        window.location.hash = "";
      } else {
        window.history.pushState({}, "", `/${page}`);
        window.location.hash = page;
      }
    } else {
      setCurrentPage("404");
      window.history.pushState({}, "", "/404");
    }

    window.scrollTo(0, 0);
  };

  // Footer links dispatch "tt-navigate" (see goToPage in components/Brut.tsx).
  useEffect(() => {
    const onNavigateEvent = (e: Event) => handleNavigate((e as CustomEvent<string>).detail);
    window.addEventListener("tt-navigate", onNavigateEvent);
    return () => window.removeEventListener("tt-navigate", onNavigateEvent);
  });

  switch (currentPage) {
    case "timetable":
      return <Timetable onNavigate={handleNavigate} />;
    case "404":
      return <NotFound onNavigate={handleNavigate} />;
    case "events":
      return <EventsPage onNavigate={handleNavigate} />;
    case "speakers":
      return <Speakers onNavigate={handleNavigate} />;
    case "meettheteam":
      return <MeetTheTeam onNavigate={handleNavigate} />;
    default:
      return <Landing onNavigate={handleNavigate} />;
  }
}

export default App;
