import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

export default function Catalogo() {
  // Simulação de produtos - Depois você pode mover isso para um arquivo .json ou API
  const produtos = [
    { 
      id: 1, 
      nome: "Raposa de Crochê Amigurumi", 
      preco: "89,90", 
      categoria: "Amigurumis", 
      tag: "Mais Vendido" 
    },
    { 
      id: 2, 
      nome: "Chaveiro Joystick Geek", 
      preco: "25,00", 
      categoria: "Geek", 
      tag: "Novo" 
    },
    { 
      id: 3, 
      nome: "Bolsa de Ombro em Macramê", 
      preco: "120,00", 
      categoria: "Acessórios", 
      tag: null 
    },
    { 
      id: 4, 
      nome: "Gatinho com Estampa Floral", 
      preco: "110,00", 
      categoria: "Amigurumis", 
      tag: "Exclusivo" 
    },
  ];

  const [filtro, setFiltro] = useState("Todos");
  const categorias = ["Todos", "Amigurumis", "Geek", "Acessórios"];

  const produtosFiltrados = filtro === "Todos" 
    ? produtos 
    : produtos.filter(p => p.categoria === filtro);

  return (
    <div className="bg-bg min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Título e Filtros */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-bold text-black mb-6">Nosso Catálogo</h1>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`px-6 py-2 rounded-full border transition-all text-sm font-medium ${
                  filtro === cat 
                  ? "bg-pink text-white border-pink shadow-lg shadow-pink/20" 
                  : "bg-white text-text border-pink/10 hover:border-pink/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="group bg-white rounded-3xl overflow-hidden border border-pink/5 hover:shadow-xl transition-all duration-300 relative">
              
              {/* Tag de Destaque */}
              {produto.tag && (
                <span className="absolute top-4 left-4 z-10 bg-pink text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-md">
                  {produto.tag}
                </span>
              )}

              {/* Botão de Favoritar */}
              <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-text hover:text-pink transition-colors shadow-sm">
                <Heart size={18} />
              </button>

              {/* Área da Imagem */}
              <div className="aspect-square bg-pink/5 flex items-center justify-center relative overflow-hidden">
                <div className="text-pink/10 font-bold uppercase tracking-widest -rotate-12 select-none text-2xl">
                  Gato Stampado
                </div>
                {/* <img src={produto.imagem} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> */}
              </div>

              {/* Info do Produto */}
              <div className="p-6">
                <p className="text-pink text-[10px] font-bold uppercase mb-1">{produto.categoria}</p>
                <h3 className="text-black font-bold text-lg leading-snug h-12 overflow-hidden mb-4">
                  {produto.nome}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text uppercase">Valor unitário</span>
                    <span className="text-xl font-bold text-black">R$ {produto.preco}</span>
                  </div>
                  
                  <button className="bg-pink text-white p-3 rounded-2xl hover:bg-pink/80 transition-all active:scale-95 shadow-lg shadow-pink/10">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem Caso não tenha produtos */}
        {produtosFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text">Nenhum produto encontrado nesta categoria. 🧶</p>
          </div>
        )}
      </div>
    </div>
  );
}