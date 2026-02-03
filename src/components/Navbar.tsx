import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, User, Menu, X } from "lucide-react";
import logoUrl from '../assets/logo.svg';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="bg-bg relative shadow-sm font-primary">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logoUrl} alt="Logo GatoStampado"
            className="h-12"
          />
        </div>

        {/* Links Centrais */}
        <ul className="hidden md:flex items-center gap-8 text-coffe font-bold">
          <li className="hover:text-pink cursor-pointer transition">
            <Link to="/">Início</Link>
          </li>
          <li className="hover:text-pink cursor-pointer transition">
            <Link to="/catalogo">Catálogo</Link>
          </li>
          <li className="hover:text-pink cursor-pointer transition">
            <Link to="/about">Sobre</Link>
          </li>
          <li className="hover:text-pink cursor-pointer transition">
            Blog
          </li>
          <li className="hover:text-pink cursor-pointer transition">
            Contato
          </li>
        </ul>

        {/* Ícones da Direita */}
        <div className="flex items-center gap-10 text-coffe">
          <Search size={20} className="cursor-pointer hover:text-pink" />
          <User size={20} className="cursor-pointer hover:text-pink" />
          <Heart size={20} className="cursor-pointer hover:text-pink hidden md:flex" />

          {/* {botão hamburguer - mobile} */}
          <button
            className="md:hidden p-1"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            {menuAberto ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    {/* Menu Mobile (Dropdown) */}
      {menuAberto && (
        <div className="md:hidden bg-bg border-t border-bg p-6 absolute w-full z-50 shadow-lg">
          <ul className="flex flex-col gap-6 text-coffe font-medium">
            <li className="hover:text-pink">Início</li>
            <li className="hover:text-pink">Catálogo</li>
            <li className="hover:text-pink">Sobre</li>
            <li className="hover:text-pink">Blog</li>
            <li className="hover:text-pink">Contato</li>
            <li className="hover:text-pink flex gap-4 pt-4 border-t border-text">
              <Heart size={20} /> Meus Favoritos
            </li>
          </ul>
        </div>
      )}
    

    
    
    </nav>
  );
}
