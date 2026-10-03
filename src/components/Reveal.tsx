import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades and slides its children in the first time they scroll into view.
// Styling lives in index.css (.tt-reveal). Users with reduced motion see the content immediately.
export const Reveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`tt-reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
