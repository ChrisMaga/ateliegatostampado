import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoUrl from "../assets/logo.svg";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navLinks = useMemo(
    () => [
      { label: "Início", to: "/" },
      { label: "Catálogo", to: "/catalogo" },
      { label: "Sobre", to: null },
        // Quando criar, troque para: { label: "Blog", to: "/blog" }
      { label: "Blog", to: null },
      { label: "Contato", to: "/contato" },
    ],
    [],
  );

  function fecharMenu() {
    setMenuAberto(false);
  }

  // Fecha o menu ao trocar de rota (ex.: usuário clica em Link)
  useEffect(() => {
    fecharMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Fecha o menu ao clicar fora (mobile)
  useEffect(() => {
    if (!menuAberto) return;

    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;

      const target = e.target as Node | null;
      if (!target) return;

      if (!menuRef.current.contains(target)) {
        fecharMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuAberto]);

  return (
    <nav className="bg-bg sticky top-0 z-40 shadow-md font-primary">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Ir para a página inicial"
        >
          <img src={logoUrl} alt="Logo GatoStampado" className="h-12" />
        </Link>

        {/* Links Desktop */}
        <ul className="hidden md:flex items-center gap-8 text-coffe font-bold">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="hover:text-pink cursor-pointer transition"
            >
              {item.to ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span
                  className="opacity-70 cursor-not-allowed"
                  title="Em breve"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Botão Hamburguer (Mobile) */}
        <div className="flex items-center text-coffe">
          <button
            type="button"
            className="md:hidden p-1"
            onClick={() => setMenuAberto((v) => !v)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="mobile-menu"
          >
            {menuAberto ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden bg-bg border-t border-bg p-6 absolute top-full w-full z-50 shadow-lg"
        >
          <ul className="flex flex-col gap-6 text-coffe font-medium">
            {navLinks.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link
                    to={item.to}
                    onClick={fecharMenu}
                    className="block hover:text-pink transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={fecharMenu}
                    className="text-left w-full hover:text-pink transition opacity-70"
                    title="Em breve"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
