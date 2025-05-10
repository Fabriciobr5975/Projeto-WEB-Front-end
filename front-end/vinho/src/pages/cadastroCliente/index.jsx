import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CadastroCliente() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
  const navigate = useNavigate();

  const [bloqueioCampo, setBloqueioCampo] = useState(true);

  const [clienteCadastro, setCliente] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    senha: "",
    celular: "",
    cep: "",
    numero: "",
    complemento: "",
  });

  const [endereco, setEndereco] = useState({
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
  });

  const pegarEnderecoViaCep = useCallback(async () => {
    try {
      const resp = await axios.get(
        `https://viacep.com.br/ws/${clienteCadastro.cep}/json/`
      );
      const enderecoBusca = resp.data;

      if (enderecoBusca?.erro) {
        alert("CEP inválido! Tente novamente.");
        return;
      }

      setEndereco((novoEndereco) => ({
        ...novoEndereco,
        estado: enderecoBusca.uf,
        cidade: enderecoBusca.localidade,
        bairro: enderecoBusca.bairro,
        logradouro: enderecoBusca.logradouro,
      }));

      setBloqueioCampo(false);
    } catch (err) {
      console.error("Erro ao buscar endereço");
    }
  }, [clienteCadastro.cep]);

  const limparEndereco = useCallback(() => {
    setEndereco((enderecoLimpo) => ({
      ...enderecoLimpo,
      estado: "",
      cidade: "",
      bairro: "",
      logradouro: "",
    }));

    setCliente((clienteSemEndereco) => ({
      ...clienteSemEndereco,
      numero: "",
      complemento: "",
    }));
  }, []);

  useEffect(() => {
    if (clienteCadastro.cep.length === 8 || clienteCadastro.cep.length === 9) {
      pegarEnderecoViaCep();
    }

    if (clienteCadastro.cep !== "" && clienteCadastro.cep.length === 0) {
      limparEndereco();
    }
  }, [clienteCadastro.cep, pegarEnderecoViaCep, limparEndereco]);

  const inserirNovoCliente = async () => {
    try {
      const url = `http://localhost:5001/cliente`;
      const resp = await axios.post(url, clienteCadastro);
      alert(resp.data.resposta);
      navigate("/login");
    } catch (err) {
      alert("O ocorreu um erro na inserção do cliente");
    }
  };

  return (
    <div className="pagina-cadastro-cliente pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />

        <div className="cadastro">
          <div className="cadastro-usuario">
            <span className="titulo-secao">Cadastro de Usuário</span>

            <div className="campos-entrada-obrigatório">
              <div className="campo">
                <label>Nome:</label>
                <input
                  type="text"
                  placeholder="Digite seu primeiro nome"
                  value={clienteCadastro.nome}
                  onChange={(e) =>
                    setCliente({ ...clienteCadastro, nome: e.target.value })
                  }
                  required
                />
                <p>*</p>
              </div>

              <div className="campo">
                <label>Sobrenome:</label>
                <input
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={clienteCadastro.sobrenome}
                  onChange={(e) =>
                    setCliente({
                      ...clienteCadastro,
                      sobrenome: e.target.value,
                    })
                  }
                  required
                />
                <p>*</p>
              </div>

              <div className="campo">
                <label>CPF:</label>
                <input
                  type="text"
                  placeholder="Digite seu CPF"
                  value={clienteCadastro.cpf}
                  onChange={(e) =>
                    setCliente({ ...clienteCadastro, cpf: e.target.value })
                  }
                  required
                />
                <p>*</p>
              </div>

              <div className="campo">
                <label>E-mail:</label>
                <input
                  type="text"
                  placeholder="Digite seu E-mail"
                  value={clienteCadastro.email}
                  onChange={(e) =>
                    setCliente({ ...clienteCadastro, email: e.target.value })
                  }
                  required
                />
                <p>*</p>
              </div>

              <div className="campo">
                <label>Senha:</label>
                <input
                  type="text"
                  placeholder="Digite sua senha"
                  value={clienteCadastro.senha}
                  onChange={(e) =>
                    setCliente({ ...clienteCadastro, senha: e.target.value })
                  }
                  required
                />
                <p>*</p>
              </div>

              <div className="campo">
                <label>Celular:</label>
                <input
                  type="text"
                  placeholder="Digite o número de celular"
                  value={clienteCadastro.celular}
                  onChange={(e) =>
                    setCliente({ ...clienteCadastro, celular: e.target.value })
                  }
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
                  value={clienteCadastro.cep}
                  onChange={(e) =>
                    setCliente({ ...clienteCadastro, cep: e.target.value })
                  }
                />
              </div>

              <div className="campo">
                <div className="campo"></div>
                <label>Bairro:</label>
                <input
                  type="text"
                  placeholder="Bairro"
                  value={endereco.bairro}
                  readOnly
                />
              </div>

              <div className="campo">
                <label>Estado:</label>
                <input
                  type="text"
                  placeholder="Estado"
                  value={endereco.estado}
                  readOnly
                />
              </div>

              <div className="campo">
                <label>Cidade:</label>
                <input
                  type="text"
                  placeholder="Cidade"
                  value={endereco.cidade}
                  readOnly
                />
              </div>

              <div className="campo">
                <label>Logradouro:</label>
                <input
                  type="text"
                  placeholder="Logradouro"
                  value={endereco.logradouro}
                  readOnly
                />
              </div>

              <div className="campo">
                <label>Número:</label>
                <input
                  type="text"
                  placeholder="Digite o número do seu imóvel"
                  value={clienteCadastro.numero}
                  onChange={(e) =>
                    setCliente({ ...clienteCadastro, numero: e.target.value })
                  }
                  readOnly={bloqueioCampo}
                />
              </div>

              <div className="campo">
                <label>Complemento:</label>
                <input
                  type="text"
                  placeholder="Digite o complemento do seu endereço"
                  value={clienteCadastro.complemento}
                  onChange={(e) =>
                    setCliente({
                      ...clienteCadastro,
                      complemento: e.target.value,
                    })
                  }
                  readOnly={bloqueioCampo}
                />
              </div>
            </div>
            <span className="info-campos-obrigatorios">
              * Campo Obrigatórios
            </span>
          </div>

          <div className="finalizacao-cadastro">
            <div className="icone-voltar">
              <i class="fa-solid fa-circle-chevron-left" onClick={() => navigate("/login")}></i>
              <p>Voltar</p>
            </div>
            <div className="botao">
              <button onClick={inserirNovoCliente}>Cadastrar</button>
            </div>
          </div>
        </div>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
