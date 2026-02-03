import { Link } from "react-router-dom";
import heroBg from '../assets/bg-hero.jpg';

export default function Hero() {
  return (
    // 1. Definimos o background na section principal
    <section 
      className="relative h-150 flex items-center px-6 md:px-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* 2. Overlay: Uma camada escura ou clara para dar leitura ao texto */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] bg-position-[50%]"></div>

      {/* 3. Conteúdo: Precisa ser 'relative' para ficar acima do overlay */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-third text-coffe font-light leading-tight">
          Peças únicas <br />
          <span className="text-pink text-6xl md:text-7xl">Artesanais</span>
        </h1>
        
        <p className="mt-6 text-coffe text-lg md:text-xl max-w-lg leading-relaxed font-medium font-primary">
          Descubra a magia do artesanato brasileiro. Cada peça conta uma história de amor e dedicação.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button className="bg-pink text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition shadow-lg text-lg">
            
            <Link to="/Catalogo">
            Explorar Catálogo</Link>
          </button>
          <button className="bg-white/40 border-2 border-pink text-pink px-10 py-4 rounded-full font-bold hover:bg-bg/40 hover:text-id hover:border-id transition text-lg">
            Conheça o Ateliê
          </button>
        </div>
      </div>
    </section>
  );
}