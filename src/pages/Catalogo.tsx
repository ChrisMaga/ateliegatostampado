import { useMemo, useState, useEffect } from "react";
import produtosData from "../data/produtos.json";

type Produto = {
  id: number;
  nome: string;
  categorias: string[];
  tag?: string | null;
  imagem?: string | null;

  preco?: string | null;
  descricao?: string | null;
  materiais?: string[];
  medidas?: string | null;
  prazoProducaoDias?: number | null;
};

const WHATSAPP_NUMBER = "5511982783096";

export default function Catalogo() {
  const produtos = produtosData as Produto[];

  const [filtro, setFiltro] = useState("Todos");
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null,
  );

  const categorias = useMemo(() => {
    const todas = produtos.flatMap((p) => p.categorias);
    return ["Todos", ...Array.from(new Set(todas))];
  }, [produtos]);

  const produtosFiltrados =
    filtro === "Todos"
      ? produtos
      : produtos.filter((p) => p.categorias.includes(filtro));

  function getWhatsappLink(produto: Produto) {
    const texto = `Olá! Tenho interesse no produto: ${produto.nome}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  }

  // Fecha modal com ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setProdutoSelecionado(null);
    }

    if (produtoSelecionado) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [produtoSelecionado]);

  // Trava scroll do fundo enquanto modal estiver aberto
  useEffect(() => {
    if (!produtoSelecionado) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [produtoSelecionado]);

  return (
    <div className="bg-bg min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              onClick={() => setProdutoSelecionado(produto)}
              className="group bg-white rounded-3xl overflow-hidden border border-pink/5 hover:shadow-xl transition-all duration-300 relative cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setProdutoSelecionado(produto);
              }}
            >
              {produto.tag ? (
                <span className="absolute top-4 left-4 z-10 bg-pink text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-md">
                  {produto.tag}
                </span>
              ) : null}

              <div className="aspect-square bg-pink/5 flex items-center justify-center relative overflow-hidden">
                {produto.imagem ? (
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-pink/10 font-bold uppercase tracking-widest -rotate-12 select-none text-2xl">
                    GatoStampado
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-pink text-[10px] font-bold uppercase mb-1">
                  {produto.categorias.join(" • ")}
                </p>

                <h3 className="text-black font-bold text-lg leading-snug h-12 overflow-hidden">
                  {produto.nome}
                </h3>

                {produto.preco ? (
                  <p className="mt-3 text-black font-bold text-xl">
                    R$ {produto.preco}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text">
              Nenhum produto encontrado nesta categoria. 🧶
            </p>
          </div>
        )}

        {/* Modal */}
        {produtoSelecionado && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/50"
            onClick={() => setProdutoSelecionado(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setProdutoSelecionado(null)}
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
                aria-label="Fechar modal"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-pink/5 relative h-72 md:h-full md:min-h-[420px]">
                  {produtoSelecionado.imagem ? (
                    <img
                      src={produtoSelecionado.imagem}
                      alt={produtoSelecionado.nome}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-pink/20 font-bold uppercase tracking-widest">
                      Sem imagem
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  {produtoSelecionado.tag ? (
                    <span className="inline-block bg-pink text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-md mb-4">
                      {produtoSelecionado.tag}
                    </span>
                  ) : null}

                  <h2 className="text-2xl font-bold text-black mb-2">
                    {produtoSelecionado.nome}
                  </h2>

                  <p className="text-text text-sm mb-4">
                    {produtoSelecionado.categorias.join(" • ")}
                  </p>

                  {produtoSelecionado.preco ? (
                    <div className="mb-4">
                      <p className="text-[10px] text-text uppercase">Valor</p>
                      <p className="text-2xl font-bold text-black">
                        R$ {produtoSelecionado.preco}
                      </p>
                    </div>
                  ) : null}

                  {produtoSelecionado.descricao ? (
                    <p className="text-text text-sm leading-relaxed mb-4">
                      {produtoSelecionado.descricao}
                    </p>
                  ) : null}

                  {produtoSelecionado.medidas ||
                  typeof produtoSelecionado.prazoProducaoDias === "number" ? (
                    <div className="border-t pt-4 space-y-2">
                      {produtoSelecionado.medidas ? (
                        <p className="text-sm text-text">
                          <span className="font-semibold text-black">
                            Medidas:
                          </span>{" "}
                          {produtoSelecionado.medidas}
                        </p>
                      ) : null}

                      {typeof produtoSelecionado.prazoProducaoDias ===
                      "number" ? (
                        <p className="text-sm text-text">
                          <span className="font-semibold text-black">
                            Prazo de produção:
                          </span>{" "}
                          {produtoSelecionado.prazoProducaoDias} dias
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {produtoSelecionado.materiais &&
                  produtoSelecionado.materiais.length > 0 ? (
                    <div className="mt-4">
                      <p className="text-[10px] text-text uppercase mb-2">
                        Materiais
                      </p>
                      <ul className="list-disc list-inside text-sm text-text space-y-1">
                        {produtoSelecionado.materiais.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setProdutoSelecionado(null)}
                      className="px-5 py-2 rounded-full border border-pink/20 text-coffe hover:border-pink/40 transition"
                    >
                      Fechar
                    </button>

                    <a
                      href={getWhatsappLink(produtoSelecionado)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2 rounded-full bg-pink text-white hover:opacity-90 transition"
                    >
                      Falar no WhatsApp
                    </a>
                  </div>

                  <p className="mt-4 text-[11px] text-text">
                    Ao clicar em “Falar no WhatsApp”, uma mensagem será
                    preenchida automaticamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
