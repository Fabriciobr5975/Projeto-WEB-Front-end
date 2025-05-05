import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function NotFound() {
  return (
    <div className="pagina-nao-encontrado pagina">
      <TelaCarregamento tempo={250} tituloPagina="Erro 404 - Página Não Encontrada">
        <Header />

        <div className="mensagem-nao-encontrado">
          <h1>Página não Encontrada</h1>
          <p>
            Verifique se o endereço digitado está correto ou o conteúdo buscado
            não existe
          </p>
        </div>

        <Footer />
      </TelaCarregamento>
    </div>
  );
}
