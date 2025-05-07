import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  const { cliente } = location.state || {};
  
  return (
    <div className="pagina-nao-encontrado pagina">
      <TelaCarregamento tempo={200} tituloPagina="Erro 404 - Página Não Encontrada">
        <Header cliente={cliente}/>

        <div className="mensagem-nao-encontrado">
          <h1>Página não Encontrada</h1>
          <p>
            Verifique se o endereço digitado está correto ou o conteúdo buscado
            não existe
          </p>
        </div>

        <Footer cliente={cliente}/>
      </TelaCarregamento>
    </div>
  );
}
