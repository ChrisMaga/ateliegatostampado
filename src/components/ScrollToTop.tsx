import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visivel, setVisivel] = useState(false);

  // Script para monitorar o scroll da tela
  useEffect(() => {
    const toggleVisibilidade = () => {
      // O botão aparece se o usuário descer mais de 300px
      if (window.scrollY > 300) {
        setVisivel(true);
      } else {
        setVisivel(false);
      }
    };

    window.addEventListener("scroll", toggleVisibilidade);

    // Limpa o evento ao desmontar o componente
    return () => window.removeEventListener("scroll", toggleVisibilidade);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Efeito de deslize suave
    });
  };

  return (
    <>
      {visivel && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-pink text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-subtle"
          title="Voltar ao topo"
        >
          <ArrowUp size={24} strokeWidth={3} />
        </button>
      )}
    </>
  );
}