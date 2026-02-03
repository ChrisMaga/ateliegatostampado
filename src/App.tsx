import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Catalogo from "./pages/Catalogo";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* caminhos */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />

        {/* Você pode criar uma rota para quando a página não existir */}
        <Route
          path="*"
          element={
            <h1 className="text-center py-20 text-3xl">
              Página não encontrada
            </h1>
          }
        />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}
