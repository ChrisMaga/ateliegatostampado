import { Link } from "react-router-dom";
import Categories from "../components/ShowCategories"; // Componente que criamos
import Info from "../components/Info"; // Componente de diferenciais
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />

      {/* SEÇÃO DE DIFERENCIAIS (INFO) */}
      <div className="-mt-10 relative z-20">
        <Info />
      </div>

      {/* SEÇÃO DE CATEGORIAS */}
      <Categories />

      {/* CTA FINAL (CHAMADA PARA AÇÃO) */}
      <section className="bg-pink/5 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-coffe mb-4">
          Quer um amigurumi personalizado?
        </h2>
        <p className="text-gray mb-8">
          Transformo sua ideia em pontos de crochê.
        </p>
        <Link
          to="/contato"
          className="border-2 border-pink text-pink hover:bg-pink hover:text-white px-10 py-3 rounded-full font-bold transition-all"
        >
          Fale Conosco no WhatsApp
        </Link>
      </section>
    </main>
  );
}
