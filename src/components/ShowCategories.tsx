export default function Categories() {
    const cats = [
    { title: "Crochê", desc: "Peças delicadas em crochê", icon: "🧶" },
    { title: "Amigurumis", desc: "Bichinhos e personagens fofos", icon: "🧸" },
    { title: "Macramê", desc: "Acessórios com cristais", icon: "✨" },
    { title: "Geek", desc: "Peças temáticas geek", icon: "🎮" },
    { title: "Acessórios", desc: "Bolsas, chaveiros e mais", icon: "💎" },
  ];


    return(
        <section className="bg-white py-16 px-6 md:px-20 text-center">
      <span className="text-pink uppercase tracking-widest text-sm font-bold">Explore</span>
      <h2 className="text-3xl md:text-4xl font-third text-coffe mt-2 mb-4">Nossas Categorias</h2>
      <p className="text-coffe max-w-2xl mx-auto mb-12">
        Descubra peças únicas feitas à mão com muito carinho e dedicação.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {cats.map((cat, i) => (
          <div 
            key={i}
            className="group bg-bg p-8 rounded-3xl border border-pink/5 hover:border-pink/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {cat.icon}
            </span>
            <h3 className="font-third text-lg text-coffe">{cat.title}</h3>
            <p className="text-coffe text-sm mt-1">{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
    );
}