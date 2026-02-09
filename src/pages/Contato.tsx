import { useMemo, useRef, useState } from "react";
import {
  Mail,
  MessageCircle,
  Instagram,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const CONTACT = {
  email: "gatostampado@gmail.com",
  whatsappNumberE164: "5511982783096",
  whatsappLabel: "(11) 98278-3096",
  instagramHandle: "@ateliegatostampado",
  instagramUrl: "https://www.instagram.com/ateliegatostampado/",
} as const;

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as
  | string
  | undefined;

type FormState = {
  nome: string;
  email: string;
  whatsapp: string;
  assunto: "Dúvidas" | "Orçamento" | "Personalizado" | "Parcerias" | "Outros";
  mensagem: string;
  consentimento: boolean;
};

type FormKeys = keyof FormState;

type Touched = Partial<Record<FormKeys, boolean>>;
type Errors = Partial<Record<FormKeys, string>>;
type Status = "idle" | "loading" | "success" | "error";

export default function Contato() {
  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(
      "Olá! Vim pelo site e gostaria de falar sobre um pedido/orçamento."
    );
    return `https://wa.me/${CONTACT.whatsappNumberE164}?text=${text}`;
  }, []);

  const [form, setForm] = useState<FormState>({
    nome: "",
    email: "",
    whatsapp: "",
    assunto: "Dúvidas",
    mensagem: "",
    consentimento: true,
  });

  const [touched, setTouched] = useState<Touched>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");

  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  function setField<K extends FormKeys>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched(key: FormKeys) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function validate(values: FormState): Errors {
    const errors: Errors = {};

    if (!values.nome.trim()) errors.nome = "Informe seu nome.";

    if (!values.email.trim()) errors.email = "Informe seu e-mail.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      errors.email = "E-mail inválido.";

    if (!values.mensagem.trim()) errors.mensagem = "Escreva sua mensagem.";
    else if (values.mensagem.trim().length < 10)
      errors.mensagem = "Mensagem muito curta (mín. 10 caracteres).";

    if (!values.consentimento)
      errors.consentimento = "Você precisa concordar para enviar.";

    return errors;
  }

  const errors = validate(form);
  const canSubmit = Object.keys(errors).length === 0 && status !== "loading";

  function hasError(key: FormKeys) {
    return Boolean(touched[key] && errors[key]);
  }

  function describedByIds(key: FormKeys) {
    return hasError(key) ? `${String(key)}-error` : undefined;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const allTouched: Touched = {
      nome: true,
      email: true,
      whatsapp: true,
      assunto: true,
      mensagem: true,
      consentimento: true,
    };
    setTouched(allTouched);

    const currentErrors = validate(form);
    const errorKeys = Object.keys(currentErrors);

    if (errorKeys.length > 0) {
      // Foca o resumo de erros para teclado/leitor de tela
      setTimeout(() => errorSummaryRef.current?.focus(), 0);
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      setStatusMsg(
        "Configuração do formulário ausente. Defina VITE_FORMSPREE_ENDPOINT no .env."
      );
      return;
    }

    try {
      setStatus("loading");
      setStatusMsg("");

      const payload = {
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        assunto: form.assunto,
        mensagem: form.mensagem,
        origem: "site-gatostampado",
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Não foi possível enviar sua mensagem.");
      }

      setStatus("success");
      setStatusMsg("Mensagem enviada! Em breve eu te respondo.");
      setForm({
        nome: "",
        email: "",
        whatsapp: "",
        assunto: "Dúvidas",
        mensagem: "",
        consentimento: true,
      });
      setTouched({});
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao enviar. Tente novamente.";
      setStatus("error");
      setStatusMsg(message);
    }
  }

  const fieldBase =
    "w-full rounded-2xl border bg-bg-secondary/70 px-4 py-3 text-coffe placeholder:text-gray/70 outline-none transition focus:ring-2 focus:ring-pink/30";
  const fieldOk = "border-pink/10 focus:border-pink/30";
  const fieldErr = "border-pink/60 focus:border-pink/60";

  function inputClass(key: FormKeys) {
    return `${fieldBase} ${hasError(key) ? fieldErr : fieldOk}`;
  }

  const errorList = Object.entries(errors) as Array<[FormKeys, string]>;

  return (
    <main className="overflow-x-hidden">
      {/* Header da página */}
      <section className="bg-pink/5 pt-14 pb-10 px-6">
        <div className="max-w-7xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-secondary text-coffe">
            Contato
          </h1>
          <p className="mt-3 text-gray max-w-2xl">
            Fale com a GatoStampado para dúvidas, orçamento de peça personalizada
            ou parcerias.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coluna: Canais */}
          <aside className="lg:col-span-5 text-left">
            <div className="rounded-3xl border border-pink/10 bg-bg-secondary/60 p-6">
              <h2 className="text-2xl font-third text-coffe">
                Canais de atendimento
              </h2>
              <p className="mt-2 text-gray text-sm">
                Se preferir, você pode chamar direto no WhatsApp ou mandar e-mail.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-pink/10 bg-bg px-4 py-4 hover:border-pink/30 transition"
                  aria-label={`Abrir conversa no WhatsApp: ${CONTACT.whatsappLabel}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2 rounded-full bg-pink/10 text-pink"
                      aria-hidden="true"
                    >
                      <MessageCircle size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-coffe">WhatsApp</p>
                      <p className="text-sm text-gray">{CONTACT.whatsappLabel}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-pink group-hover:underline">
                    Abrir
                  </span>
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-pink/10 bg-bg px-4 py-4 hover:border-pink/30 transition"
                  aria-label={`Enviar e-mail para ${CONTACT.email}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2 rounded-full bg-id/10 text-id"
                      aria-hidden="true"
                    >
                      <Mail size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-coffe">E-mail</p>
                      <p className="text-sm text-gray">{CONTACT.email}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-id group-hover:underline">
                    Escrever
                  </span>
                </a>

                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-pink/10 bg-bg px-4 py-4 hover:border-pink/30 transition"
                  aria-label={`Abrir Instagram ${CONTACT.instagramHandle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2 rounded-full bg-coffe/10 text-coffe"
                      aria-hidden="true"
                    >
                      <Instagram size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-coffe">Instagram</p>
                      <p className="text-sm text-gray">
                        {CONTACT.instagramHandle}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-coffe group-hover:underline">
                    Visitar
                  </span>
                </a>
              </div>

              <div className="mt-6 rounded-2xl bg-pink/5 p-4 border border-pink/10">
                <p className="text-sm text-coffe">
                  <span className="font-semibold">Dica:</span> se for peça
                  personalizada, conte o tema, tamanho aproximado e prazo.
                </p>
              </div>
            </div>
          </aside>

          {/* Coluna: Form */}
          <div className="lg:col-span-7 text-left">
            <div className="rounded-3xl border border-pink/10 bg-bg-secondary/60 p-6 md:p-8">
              <h2 className="text-2xl font-third text-coffe">Envie uma mensagem</h2>
              <p className="mt-2 text-gray text-sm">
                Preencha o formulário e eu retorno o mais rápido possível.
              </p>

              {/* Resumo de erros */}
              {Object.keys(touched).length > 0 && errorList.length > 0 ? (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  aria-live="assertive"
                  className="mt-6 rounded-2xl border border-pink/30 bg-pink/10 p-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={18}
                      className="text-pink mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-coffe">
                        Revise os campos destacados
                      </p>
                      <ul className="mt-2 list-disc pl-5 text-sm text-gray">
                        {errorList.map(([key, msg]) => (
                          <li key={String(key)}>
                            <a href={`#${String(key)}`} className="underline">
                              {msg}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Status do envio */}
              {status !== "idle" && statusMsg ? (
                <div
                  className={`mt-6 rounded-2xl border p-4 flex items-start gap-3 ${
                    status === "success"
                      ? "border-id/20 bg-id/10 text-coffe"
                      : status === "error"
                      ? "border-pink/30 bg-pink/10 text-coffe"
                      : "border-pink/10 bg-bg text-coffe"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status === "success" ? (
                    <CheckCircle2 size={18} className="text-id" aria-hidden="true" />
                  ) : null}
                  {status === "error" ? (
                    <AlertCircle size={18} className="text-pink" aria-hidden="true" />
                  ) : null}
                  <p className="text-sm">{statusMsg}</p>
                </div>
              ) : null}

              <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="text-sm font-semibold text-coffe">
                      Nome
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      value={form.nome}
                      onChange={(e) => setField("nome", e.target.value)}
                      onBlur={() => markTouched("nome")}
                      className={inputClass("nome")}
                      placeholder="Seu nome"
                      autoComplete="name"
                      aria-invalid={hasError("nome")}
                      aria-describedby={describedByIds("nome")}
                    />
                    {hasError("nome") ? (
                      <p id="nome-error" className="mt-1 text-xs text-pink">
                        {errors.nome}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-coffe">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      onBlur={() => markTouched("email")}
                      className={inputClass("email")}
                      placeholder="seuemail@exemplo.com"
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={hasError("email")}
                      aria-describedby={describedByIds("email")}
                    />
                    {hasError("email") ? (
                      <p id="email-error" className="mt-1 text-xs text-pink">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="text-sm font-semibold text-coffe"
                    >
                      WhatsApp (opcional)
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={(e) => setField("whatsapp", e.target.value)}
                      onBlur={() => markTouched("whatsapp")}
                      className={inputClass("whatsapp")}
                      placeholder="(11) 99999-9999"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>

                  <div>
                    <label htmlFor="assunto" className="text-sm font-semibold text-coffe">
                      Assunto
                    </label>
                    <select
                      id="assunto"
                      name="assunto"
                      value={form.assunto}
                      onChange={(e) =>
                        setField("assunto", e.target.value as FormState["assunto"])
                      }
                      onBlur={() => markTouched("assunto")}
                      className={`${fieldBase} border-pink/10 focus:border-pink/30`}
                    >
                      <option>Dúvidas</option>
                      <option>Orçamento</option>
                      <option>Personalizado</option>
                      <option>Parcerias</option>
                      <option>Outros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="mensagem" className="text-sm font-semibold text-coffe">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={form.mensagem}
                    onChange={(e) => setField("mensagem", e.target.value)}
                    onBlur={() => markTouched("mensagem")}
                    className={inputClass("mensagem")}
                    placeholder="Escreva sua mensagem..."
                    rows={6}
                    aria-invalid={hasError("mensagem")}
                    aria-describedby={describedByIds("mensagem")}
                  />
                  {hasError("mensagem") ? (
                    <p id="mensagem-error" className="mt-1 text-xs text-pink">
                      {errors.mensagem}
                    </p>
                  ) : null}
                </div>

                <fieldset className="rounded-2xl border border-pink/10 bg-bg/60 p-4">
                  <legend className="px-2 text-sm font-semibold text-coffe">
                    Consentimento
                  </legend>

                  <div className="flex items-start gap-3 text-sm text-gray">
                    <input
                      id="consentimento"
                      name="consentimento"
                      type="checkbox"
                      checked={form.consentimento}
                      onChange={(e) => setField("consentimento", e.target.checked)}
                      onBlur={() => markTouched("consentimento")}
                      className="mt-1 accent-pink"
                      aria-invalid={hasError("consentimento")}
                      aria-describedby={
                        hasError("consentimento") ? "consentimento-error" : undefined
                      }
                    />
                    <label htmlFor="consentimento">
                      Concordo em enviar meus dados para que a Gato Stampado possa me responder.
                    </label>
                  </div>

                  {hasError("consentimento") ? (
                    <p id="consentimento-error" className="mt-2 text-xs text-pink">
                      {errors.consentimento}
                    </p>
                  ) : null}
                </fieldset>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-pink px-8 py-3 font-bold text-pink hover:bg-pink hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send size={18} aria-hidden="true" />
                  )}
                  <span>{status === "loading" ? "Enviando..." : "Enviar mensagem"}</span>
                </button>

                <p className="text-xs text-gray">
                  Se preferir, chame direto no WhatsApp. Respondo em horário comercial.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-pink/5 py-16 px-6 text-center">
        <h3 className="text-3xl font-secondary text-coffe mb-4">Quer agilizar?</h3>
        <p className="text-gray mb-8">
          Me chama no WhatsApp e já me conte a ideia da sua peça.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="border-2 border-pink text-pink hover:bg-pink hover:text-white px-10 py-3 rounded-full font-bold transition-all inline-flex items-center gap-2 justify-center"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Falar no WhatsApp
        </a>
      </section>
    </main>
  );
}