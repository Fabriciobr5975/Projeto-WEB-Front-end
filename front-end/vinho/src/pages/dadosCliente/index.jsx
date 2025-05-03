import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { Link } from "react-router-dom";

export default function PerfilCliente() {
  return (
    <div className="pagina-perfil-cliente pagina">
      <Header />

      <section className="banner-perfil">
        <div className="titulo-banner">
          <h1>Meu Perfil</h1>
        </div>
        <div className="abas-navegacao">
        <AbaNavegacao nome="Perfil" abaAtual={true}/>
        <AbaNavegacao nome="Endereço (s) Cadastrado (s)"/>
        <AbaNavegacao nome="Meus Pedidos"/>
        <AbaNavegacao nome="Meu Carrinho"/>
        </div>
      </section>

      <section className="dados-cliente">
        <div className="entrada-dados">
          <div className="entrada">
            <label>Nome:</label>
            <input type="text" placeholder="Seu nome" />
          </div>

          <div className="entrada">
            <label>Sobrenome:</label>
            <input type="text" placeholder="Seu sobrenome" />
          </div>

          <div className="entrada">
            <label>E-mail:</label>
            <input type="email" placeholder="Seu e-mail" />
          </div>

          <div className="entrada">
            <label>Celular:</label>
            <input type="text" placeholder="Seu celular" />
          </div>

          <div className="entrada">
            <label>Senha:</label>
            <input type="password" placeholder="Sua Senha Cadastrada" />
            <Link to="/recuperacaosenha">Alterar Senha</Link>
          </div>

          <div className="entrada">
            <label>CPF:</label>
            <input type="text" placeholder="Seu CPF" readOnly />
          </div>

          <div className="entrada">
            <label>Data de Nascimento</label>
            <input type="date"  />
          </div>
        </div>
        <div className="botao">
          <button>Salvar</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
