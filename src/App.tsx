import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackToTopButton from "./components/BackToTopButton";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Contato from "./pages/Contato";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <Navbar />

      <Routes>
        {/* caminhos */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contato" element={<Contato />} />

        <Route
          path="*"
          element={
            <h1 className="text-center py-20 text-3xl">
              Página não encontrada
            </h1>
          }
        />
      </Routes>
      <BackToTopButton />
      <Footer />
    </BrowserRouter>
  );
}
