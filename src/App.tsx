import { useEffect, useState } from "react";
import AOS from "aos";
import { VALID_PAGES } from "./config/site";

import Header from "./components/Header";
import Hero from "./components/Hero";
import EventCategories from "./components/EventCategories";
import Passes from "./components/Passes";
import Combo from "./components/Combo";
import EventsCarousel from "./components/EventsCarousel";
import Merchandise from "./components/Merchandise";
import Moments from "./components/Moments";
import About from "./components/About";
import Sponsors from "./components/Sponsors";
import FAQ from "./components/FAQ";
import Socials from "./components/Socials";
import RulebookTimetable from "./components/RulebookTimetable";
import Footer from "./components/Footer";

import EventsPage from "./pages/Events";
import Speakers from "./pages/Speakers";
import MeetTheTeam from "./pages/MeetTheTeam";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

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

    const refreshAOS = () => setTimeout(() => AOS.refresh(), 100);
    const scrollToTop = () => window.scrollTo(0, 0);
    window.addEventListener("hashchange", refreshAOS);
    window.addEventListener("hashchange", scrollToTop);

    return () => {
      window.removeEventListener("popstate", checkRoute);
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("hashchange", refreshAOS);
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
    setTimeout(() => AOS.refresh(), 100);
  };

  if (currentPage === "404") {
    return (
      <div className="relative w-full overflow-hidden">
        <Header activePage="404" onNavigate={handleNavigate} />
        <NotFound onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "events") {
    return (
      <div className="relative w-full overflow-hidden">
        <Header activePage="events" onNavigate={handleNavigate} />
        <EventsPage />
        <Footer hideContactSection onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "speakers") {
    return (
      <div className="relative w-full overflow-hidden">
        <Header activePage="speakers" onNavigate={handleNavigate} />
        <Speakers />
        <Footer hideContactSection onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "meettheteam") {
    return (
      <div className="relative w-full overflow-hidden">
        <Header activePage="meettheteam" onNavigate={handleNavigate} />
        <MeetTheTeam />
        <Footer hideContactSection onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "signin") {
    return (
      <div className="relative w-full overflow-hidden">
        <Header activePage="signin" onNavigate={handleNavigate} />
        <SignIn onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "signup") {
    return (
      <div className="relative w-full overflow-hidden">
        <Header activePage="signup" onNavigate={handleNavigate} />
        <SignUp onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <Header activePage="home" onNavigate={handleNavigate} />
      <Hero />
      <EventCategories />
      <div id="passes-section">
        <Passes />
      </div>
      <Combo />
      <EventsCarousel />
      <Merchandise />
      <Moments />
      <About />
      <Sponsors />
      <FAQ />
      <Socials />
      <RulebookTimetable />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
