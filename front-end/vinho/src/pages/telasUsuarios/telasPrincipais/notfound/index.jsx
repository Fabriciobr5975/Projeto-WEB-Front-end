import "./index.scss";

import TelaCarregamento from "../../../../components/componentesPrincipais/telaCarregamento";
import Header from "../../../../components/componentesPrincipais/header";
import Footer from "../../../../components/componentesPrincipais/footer";

export default function NotFound() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};

  return (
    <div className="pagina-nao-encontrado pagina">
      <TelaCarregamento
        tempo={200}
        tituloPagina="Erro 404 - Página Não Encontrada"
      >
        <Header cliente={cliente} />

        <div className="mensagem-nao-encontrado">
          <h1>Página não Encontrada</h1>
          <p>
            Verifique se o endereço digitado está correto ou o conteúdo buscado
            não existe
          </p>
        </div>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
