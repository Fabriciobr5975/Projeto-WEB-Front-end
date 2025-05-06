import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

export default function EnderecosCliente() {
  return (
    <div className="pagina-enderecos-cliente pagina">
      <TelaCarregamento tempo={250}>
        <Header />

        <section className="banner-perfil">
          <div className="titulo-banner">
            <h1>Meu Perfil</h1>
          </div>
          <div className="abas-navegacao">
            <AbaNavegacao nome="Perfil" navegacao="/perfil" />
            <AbaNavegacao
              nome="Endereço (s) Cadastrado (s)"
              abaAtual={true}
              navegacao="/enderecocliente"
            />
            <AbaNavegacao nome="Meus Pedidos" navegacao="/meuspedidos" />
            <AbaNavegacao nome="Meu Carrinho" navegacao="/meucarrinho" />
          </div>
        </section>

        <section className="enderecos-cliente">
          <div className="listagem-enderecos-salvos">
            <select name="lista-enderecos">
              <option value="" disabled selected>
                Lista de Endereços
              </option>
              <option value="endereco01">
                Via Transversal Sul, nº130, 06045420
              </option>
            </select>

            <button className="botao-adicionar-novo">Adicionar Novo</button>
          </div>

          <div className="entrada-dados">
            <div className="entrada">
              <label>Apelido do Endereço:</label>
              <input
                type="text"
                placeholder="Digite o apelido que você dar ao endereço"
              />
            </div>

            <div className="entrada">
              <label>Estado:</label>
              <input type="text" placeholder="Estado" />
            </div>

            <div className="entrada">
              <label>Logradouro:</label>
              <input type="text" placeholder="Logradouro" />
            </div>

            <div className="entrada">
              <label>Cidade:</label>
              <input type="text" placeholder="Cidade" />
            </div>

            <div className="entrada">
              <label>Bairro:</label>
              <input type="text" placeholder="Bairro" />
            </div>

            <div className="ultima-linha ">
              <div className="entrada">
                <label>Complemento:</label>
                <input type="text" placeholder="Complemento" />
              </div>

              <div className="entrada">
                <label>Número:</label>
                <input type="text" placeholder="Número" />
              </div>

              <div className="entrada">
                <label>CEP:</label>
                <input type="text" placeholder="CEP" />
              </div>
            </div>
          </div>
          <div className="salvar">
            <button className="botao-salvar">Salvar</button>
          </div>
        </section>

        <Footer />
      </TelaCarregamento>
    </div>
  );
}
