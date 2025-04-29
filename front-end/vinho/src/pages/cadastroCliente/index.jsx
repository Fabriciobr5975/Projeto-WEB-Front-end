import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";

export default function CadastroCliente() {
  return (
    <div className="pagina-cadastro-cliente pagina">
      <Header />

      <div className="cadastro">
        <div className="cadastro-usuario">
          <span className="titulo-secao">Cadastro de Usuário</span>

          <div className="campos-entrada-obrigatório">
            <div className="campo">
              <label>Nome:</label>
              <input type="text" placeholder="Digite seu primeiro nome" required/>
              <p>*</p>
            </div>

            <div className="campo">
              <label>Sobrenome:</label>
              <input type="text" placeholder="Digite seu sobrenome" required/>
              <p>*</p>
            </div>

            <div className="campo">
              <label>E-mail:</label>
              <input type="text" placeholder="Digite seu E-mail" required/>
              <p>*</p>
            </div>

            <div className="campo">
              <label>Senha:</label>
              <input type="text" placeholder="Digite sua senha" required/>
              <p>*</p>
            </div>

            <div className="campo">
              <label>Celular:</label>
              <input type="text" placeholder="Digite o número de celular" required/>
              <p>*</p>
            </div>
          </div>

          <div className="campos-entrada-opcionais">
            <div className="campo">
              <label>CEP:</label>
              <input type="text" placeholder="Digite seu CEP" />
            </div>

            <div className="campo">
              <div className="campo"></div>
              <label>Bairro:</label>
              <input type="text" placeholder="Bairro" />
            </div>

            <div className="campo">
              <label>Estado:</label>
              <input type="text" placeholder="Estado" />
            </div>

            <div className="campo">
              <label>Cidade:</label>
              <input type="text" placeholder="Cidade" />
            </div>

            <div className="campo">
              <label>Logradouro:</label>
              <input type="text" placeholder="Logradouro" />
            </div>

            <div className="campo">
              <label>Número:</label>
              <input type="text" placeholder="Digite o número do seu imóvel" />
            </div>

            <div className="campo">
              <label>Complemento:</label>
              <input
                type="text"
                placeholder="Digite o complemento do seu endereço"
              />
            </div>
          </div>
          <span className="info-campos-obrigatorios">* Campo Obrigatórios</span>
        </div>

        <div className="finalizacao-cadastro">
          <div className="icone-voltar">
            <i class="fa-solid fa-circle-chevron-left"></i>
            <p>Voltar</p>
          </div>
          <div className="botao">
            <button>Cadastrar</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
