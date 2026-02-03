import { Instagram, MessageCircle, Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-id border-t border-pink/10 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Coluna 1: Branding */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-bg-secondary font-primary">Gato Stampado</h2>
          <p className="text-bg-secondary text-sm leading-relaxed">
            Transformando fios em histórias e pontos em amor. Especialista em amigurumis e peças exclusivas feitas à mão.
          </p>
          <div className="flex gap-4 mt-2">
            <Link to="https://www.instagram.com/ateliegatostampado/" target="_blank" className="p-2 bg-pink/5 rounded-full text-bg-secondary hover:bg-pink hover:text-white transition-all">
              <Instagram size={20} />
            </Link>
            <Link to="https://wa.me/5511982783096" target="_blank" className="p-2 bg-pink/5 rounded-full text-bg-secondary hover:bg-pink hover:text-white transition-all">
              <MessageCircle size={20} />
            </Link>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div>
          <h3 className="font-bold text-bg-secondary mb-6">Links Rápidos</h3>
          <ul className="flex flex-col gap-3 text-sm text-bg-secondary">
            <li><Link to="/" className="hover:text-pink transition-colors">Início</Link></li>
            <li><Link to="/catalogo" className="hover:text-pink transition-colors">Catálogo</Link></li>
            <li><Link to="/sobre" className="hover:text-pink transition-colors">Sobre Nós</Link></li>
            <li><Link to="/contato" className="hover:text-pink transition-colors">Contato</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Categorias (Baseado no seu componente ShowCategories) */}
        <div>
          <h3 className="font-bold text-bg-secondary mb-6">Categorias</h3>
          <ul className="flex flex-col gap-3 text-sm text-bg-secondary">
            <li className="hover:text-pink cursor-pointer transition-colors">Amigurumis</li>
            <li className="hover:text-pink cursor-pointer transition-colors">Geek</li>
            <li className="hover:text-pink cursor-pointer transition-colors">Acessórios</li>
            <li className="hover:text-pink cursor-pointer transition-colors">Decoração</li>
          </ul>
        </div>

        {/* Coluna 4: Contato */}
        <div>
          <h3 className="font-bold text-bg-secondary mb-6">Atendimento</h3>
          <div className="flex flex-col gap-3 text-sm text-bg-secondary">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-bg-secondary" />
              <span>gatostampado@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle size={18} className="text-bg-secondary" />
              <span>(11) 98278-3096</span>
            </div>
          </div>
        </div>
      </div>

      {/* Linha Final: Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-pink/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bg-secondary/80">
        <p>© 2026 GatoStampado - Todos os direitos reservados.</p>
        <p className="flex items-center gap-1">
          Desenvolvido por 
          <Link to="">CM Technology </Link>
          e feito com <Heart size={12} className="text-bg-secondary fill-bg-secondary" /> para você.
        </p>
      </div>
    </footer>
  );
}