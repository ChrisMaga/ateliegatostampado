import { useState } from "react";
import { Search, Heart, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="bg-bege-claro relative shadow-sm font-['Nunito']">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="./src/assets/logo.svg"
            alt="Gato Stampado"
            className="h-12"
          />
        </div>

        {/* Links Centrais */}
        <ul className="hidden md:flex items-center gap-8 text-cafe font-medium">
          <li className="hover:text-rosa-escuro cursor-pointer transition">
            Início
          </li>
          <li className="hover:text-rosa-escuro cursor-pointer transition">
            Catálogo
          </li>
          <li className="hover:text-rosa-escuro cursor-pointer transition">
            Sobre
          </li>
          <li className="hover:text-rosa-escuro cursor-pointer transition">
            Blog
          </li>
          <li className="hover:text-rosa-escuro cursor-pointer transition">
            Contato
          </li>
        </ul>

        {/* Ícones da Direita */}
        <div className="flex items-center gap-4 text-cafe">
          <Search size={20} className="cursor-pointer hover:text-rosa-escuro" />
          <User size={20} className="cursor-pointer hover:text-rosa-escuro" />
          <Heart size={20} className="cursor-pointer hover:text-rosa-escuro hidden md:flex" />

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
        <div className="md:hidden bg-bege-claro border-t border-nude p-6 absolute w-full z-50 shadow-lg">
          <ul className="flex flex-col gap-6 text-cafe font-medium">
            <li className="hover:text-rosa-escuro">Início</li>
            <li className="hover:text-rosa-escuro">Catálogo</li>
            <li className="hover:text-rosa-escuro">Sobre</li>
            <li className="hover:text-rosa-escuro">Blog</li>
            <li className="hover:text-rosa-escuro">Contato</li>
            <li className="hover:text-rosa-escuro flex gap-4 pt-4 border-t border-nude">
              <Heart size={20} /> Meus Favoritos
            </li>
          </ul>
        </div>
      )}
    

    
    
    </nav>
  );
}
