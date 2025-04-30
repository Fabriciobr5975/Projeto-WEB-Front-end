import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { useState } from "react";
import axios from "axios";

export default function CadastroCliente() {
  const [cliente, setCliente] = useState({
    nome: "",
    sobrenome: "",
    email: "", 
    senha: "",
    celular: "",
    cep: "",
    numero: "",
    complemento: ""
  });

  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bloqueioCampo, setBloqueioCampo] = useState(true);

  const pegarEnderecoViaCep = async () => {
    const resp = await axios.get(`https://viacep.com.br/ws/${cliente.cep}/json/`);
  
    const endereco = resp.data;

    setBairro(endereco.bairro);
    setEstado(endereco.estado);
    setCidade(endereco.cidade);
    setLogradouro(endereco.logradouro);
    setBloqueioCampo(false)
  }

  const inserirNovoCliente = async () => {
    const url = `http://localhost:5001/cliente`;

    const resp = await axios.post(url, cliente);

    alert(`${resp.data?.mensagem}`);
  }

  return (
    <div className="pagina-cadastro-cliente pagina">
      <Header />

      <div className="cadastro">
        <div className="cadastro-usuario">
          <span className="titulo-secao">Cadastro de Usuário</span>

          <div className="campos-entrada-obrigatório">
            <div className="campo">
              <label>Nome:</label>
              <input
                type="text"
                placeholder="Digite seu primeiro nome"
                value={cliente.nome}
                onChange={(e) => setCliente({ ...cliente, nome: e.target.value})}
                required
              />
              <p>*</p>
            </div>

            <div className="campo">
              <label>Sobrenome:</label>
              <input
                type="text"
                placeholder="Digite seu sobrenome"
                value={cliente.sobrenome}
                onChange={(e) => setCliente({ ...cliente, sobrenome: e.target.value})}
                required
              />
              <p>*</p>
            </div>

            <div className="campo">
              <label>E-mail:</label>
              <input
                type="text"
                placeholder="Digite seu E-mail"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value})}
                required
              />
              <p>*</p>
            </div>

            <div className="campo">
              <label>Senha:</label>
              <input
                type="text"
                placeholder="Digite sua senha"
                value={cliente.senha}
                onChange={(e) => setCliente({ ...cliente, senha: e.target.value})}
                required
              />
              <p>*</p>
            </div>

            <div className="campo">
              <label>Celular:</label>
              <input
                type="text"
                placeholder="Digite o número de celular"
                value={cliente.celular}
                onChange={(e) => setCliente({ ...cliente, celular: e.target.value})}
                required
              />
              <p>*</p>
            </div>
          </div>

          <div className="campos-entrada-opcionais">
            <div className="campo">
              <label>CEP:</label>
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cliente.cep}
                onChange={(e) => setCliente({ ...cliente, cep: e.target.value})}
              />
            </div>

            <div className="campo">
              <div className="campo"></div>
              <label>Bairro:</label>
              <input type="text" placeholder="Bairro" value={bairro} readOnly/>
            </div>

            <div className="campo">
              <label>Estado:</label>
              <input type="text" placeholder="Estado" value={estado} readOnly />
            </div>

            <div className="campo">
              <label>Cidade:</label>
              <input type="text" placeholder="Cidade" value={cidade} readOnly />
            </div>

            <div className="campo">
              <label>Logradouro:</label>
              <input type="text" placeholder="Logradouro" value={logradouro} readOnly />
            </div>

            <div className="campo">
              <label>Número:</label>
              <input
                type="text"
                placeholder="Digite o número do seu imóvel"
                value={cliente.numero}
                onChange={e => setCliente({ ...cliente, numero: e.target.value})}
                readOnly={bloqueioCampo}
              />
            </div>

            <div className="campo">
              <label>Complemento:</label>
              <input
                type="text"
                placeholder="Digite o complemento do seu endereço"
                value={cliente.complemento}
                onChange={e => setCliente({ ...cliente, complemento: e.target.value})}
                readOnly={bloqueioCampo}
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
            <button onClick={pegarEnderecoViaCep}>Cadastrar</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
