import "./index.scss";

import { useEffect } from "react";

import Header from "../../components/header";
import Footer from "../../components/footer";

export default function NotFound() {
  useEffect(() => {
    document.title = "Erro 404 - Página Não Encontrada";
  });

  return (
    <div className="pagina-nao-encontrado pagina">
      <Header />

      <div className="mensagem-nao-encontrado">
        <h1>Página não Encontrada</h1>
        <p>
          Verifique se o endereço digitado está correto ou o conteúdo buscado
          não existe
        </p>
      </div>

      <Footer />
    </div>
  );
}
