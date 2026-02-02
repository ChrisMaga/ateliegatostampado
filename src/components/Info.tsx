import { Heart, Truck, Award, Gift } from "lucide-react";

export default function Info() {
  const itens = [
    {
      icon: <Heart size={28} strokeWidth={2} />,
      title: "Feito com Amor",
      desc: "Cada peça é criada com carinho e atenção aos detalhes",
    },
    {
      icon: <Truck size={28} strokeWidth={2} />,
      title: "Entrega Segura",
      desc: "Enviamos para todo o Brasil com todo cuidado",
    },
    {
      icon: <Award size={28} strokeWidth={2} />,
      title: "Qualidade Garantida",
      desc: "Materiais selecionados e acabamento impecável",
    },
    {
      icon: <Gift size={28} strokeWidth={2} />,
      title: "Embalagem Especial",
      desc: "Perfeito para presente com embalagem personalizada",
    },
  ];

  return (
    <section className="bg-bg-secondary py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
        {itens.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
            {/* Container do Ícone */}
            <div className="flex-shrink-0 flex items-center justify-center bg-pink/10 text-pink h-16 w-16 rounded-2xl">
              {item.icon}
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-1 mt-2 md:mt-0">
              <h3 className="text-black font-bold text-lg leading-tight">
                {item.title}
              </h3>
              <p className="text-text text-sm md:text-base leading-relaxed max-w-[200px]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
