import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const toggleVisibilidade = () => {
      setVisivel(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibilidade);
    return () => window.removeEventListener("scroll", toggleVisibilidade);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visivel && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-pink text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-subtle"
          title="Voltar ao topo"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} strokeWidth={3} aria-hidden="true" />
        </button>
      )}
    </>
  );
}