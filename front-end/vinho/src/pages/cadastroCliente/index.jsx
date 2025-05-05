import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function CadastroCliente() {
  const [bloqueioCampo, setBloqueioCampo] = useState(true);

  const [cliente, setCliente] = useState({
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
        `https://viacep.com.br/ws/${cliente.cep}/json/`
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
  }, [cliente.cep]);

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
    if (cliente.cep.length === 8 || cliente.cep.length === 9) {
      pegarEnderecoViaCep();
    }

    if (cliente.cep !== "" && cliente.cep.length === 0) {
      limparEndereco();
    }

  }, [cliente.cep, pegarEnderecoViaCep, limparEndereco]);


  const inserirNovoCliente = async () => {
    try {
      const url = `http://localhost:5001/cliente`;
      const resp = await axios.post(url, cliente);
      alert(resp.data.resposta);
    } catch (err) {
      alert("O ocorreu um erro na inserção do cliente");
    }
  };

  

  return (
    <div className="pagina-cadastro-cliente pagina">
      <TelaCarregamento tempo={500}>
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
                  onChange={(e) =>
                    setCliente({ ...cliente, nome: e.target.value })
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
                  value={cliente.sobrenome}
                  onChange={(e) =>
                    setCliente({ ...cliente, sobrenome: e.target.value })
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
                  value={cliente.cpf}
                  onChange={(e) =>
                    setCliente({ ...cliente, cpf: e.target.value })
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
                  value={cliente.email}
                  onChange={(e) =>
                    setCliente({ ...cliente, email: e.target.value })
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
                  value={cliente.senha}
                  onChange={(e) =>
                    setCliente({ ...cliente, senha: e.target.value })
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
                  value={cliente.celular}
                  onChange={(e) =>
                    setCliente({ ...cliente, celular: e.target.value })
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
                  value={cliente.cep}
                  onChange={(e) =>
                    setCliente({ ...cliente, cep: e.target.value })
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
                  value={cliente.numero}
                  onChange={(e) =>
                    setCliente({ ...cliente, numero: e.target.value })
                  }
                  readOnly={bloqueioCampo}
                />
              </div>

              <div className="campo">
                <label>Complemento:</label>
                <input
                  type="text"
                  placeholder="Digite o complemento do seu endereço"
                  value={cliente.complemento}
                  onChange={(e) =>
                    setCliente({ ...cliente, complemento: e.target.value })
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
              <i class="fa-solid fa-circle-chevron-left"></i>
              <p>Voltar</p>
            </div>
            <div className="botao">
              <button onClick={inserirNovoCliente}>Cadastrar</button>
            </div>
          </div>
        </div>

        <Footer />
      </TelaCarregamento>
    </div>
  );
}
