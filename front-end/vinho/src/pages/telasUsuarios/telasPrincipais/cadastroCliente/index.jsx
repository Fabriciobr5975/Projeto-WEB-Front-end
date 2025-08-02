import "./index.scss";

import TelaCarregamento from "../../../../components/componentesPrincipais/telaCarregamento";
import Header from "../../../../components/componentesPrincipais/header";
import Footer from "../../../../components/componentesPrincipais/footer";
import InputPadrao from "../../../../components/componentesPrincipais/inputs/inputPadrao";
import InputSenha from "../../../../components/componentesPrincipais/inputs/inputSenha";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import validarSenha from "../../../../service/validacaoCampos/validacaoCampoSenha";
import validarEmail from "../../../../service/validacaoCampos/validacaoCampoEmail";
import validarCPF from "../../../../service/validacaoCampos/validacaoCampoCPF";
import validarCelular from "../../../../service/validacaoCampos/validacaoCampoCelular";
import validarCEP from "../../../../service/validacaoCampos/validacaoCampoCEP";

export default function CadastroCliente() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("cliente")) {
      navigate("/");
    }
  }, [navigate]);

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
    apelido_endereco: "",
  });

  const [confirmarSenhaCliente, setConfirmarSenhacliente] = useState("");

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
      setBloqueioCampo(true);
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
      apelido_endereco: "",
    }));
  }, []);

  useEffect(() => {
    if (clienteCadastro.cep.length === 8 || clienteCadastro.cep.length === 9) {
      pegarEnderecoViaCep();
    }

    if (clienteCadastro.cep !== "" && clienteCadastro.cep.length < 8) {
      limparEndereco();
      setBloqueioCampo(true);
    }

    if (clienteCadastro.cep === "") {
      limparEndereco();
      setBloqueioCampo(true);
    }
  }, [clienteCadastro.cep, pegarEnderecoViaCep, limparEndereco]);

  const colocarApelidoEnderecoPadrao = () => {
    if (!clienteCadastro.apelido_endereco) {
      clienteCadastro.apelido_endereco =
        `${endereco.logradouro} ${clienteCadastro.numero} - ${clienteCadastro.cep}, ${clienteCadastro.numero} ${endereco.cidade}`.replace(
          /\n/g,
          " "
        );
    }
  };

  const validarCampos = () => {
    if (!clienteCadastro.senha) {
      alert("Digite a senha!");
      return false;
    } else if (!confirmarSenhaCliente) {
      alert("Confirme a senha!");
      return false;
    } else if (!validarSenha(clienteCadastro.senha)) {
      alert("A senha passada não atende aos critérios para a criação da senha");
      return false;
    } else if (clienteCadastro.senha !== confirmarSenhaCliente) {
      alert("As senha não estão iguais!");
      return false;
    }

    if (!validarEmail(clienteCadastro.email)) {
      alert("O e-mail informado não contem os caracteres de um e-mail válido");
      return false;
    }

    if (!validarCelular(clienteCadastro.celular)) {
      alert("O número de celular informado não contém os digitos corretos");
      return false;
    }

    return true;
  };

  const inserirNovoCliente = async () => {
    try {
      colocarApelidoEnderecoPadrao();

      if (!validarCampos()) {
        return;
      }

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
                <div className="input-obrigatorio">
                  <InputPadrao
                    labelCampo="Nome:"
                    placeholder="Digite seu nome"
                    valor={clienteCadastro.nome}
                    setValor={(novoNome) =>
                      setCliente((prev) => ({
                        ...prev,
                        nome: novoNome,
                      }))
                    }
                    tamanhoMaximo={30}
                    requerido={true}
                  />

                  <h5>*</h5>
                </div>
              </div>

              <div className="campo">
                <div className="input-obrigatorio">
                  <InputPadrao
                    labelCampo="Sobrenome:"
                    placeholder="Digite Seu sobrenome"
                    valor={clienteCadastro.sobrenome}
                    setValor={(novoSobrenome) =>
                      setCliente((prev) => ({
                        ...prev,
                        sobrenome: novoSobrenome,
                      }))
                    }
                    tamanhoMaximo={30}
                    requerido={true}
                  />

                  <h5>*</h5>
                </div>
              </div>

              <div className="campo">
                <div className="input-obrigatorio">
                  <InputPadrao
                    bordaDinamica={clienteCadastro.cpf.length >= 1}
                    campoValido={validarCPF(clienteCadastro.cpf)}
                    labelCampo="CPF:"
                    placeholder="Digite seu CPF"
                    valor={clienteCadastro.cpf}
                    setValor={(novoCPF) =>
                      setCliente((prev) => ({
                        ...prev,
                        cpf: novoCPF,
                      }))
                    }
                    tamanhoMaximo={14}
                    requerido={true}
                  />
                  <h5>*</h5>
                </div>
              </div>

              <div className="campo">
                <div className="input-obrigatorio">
                  <InputPadrao
                    tipoCampo="email"
                    bordaDinamica={clienteCadastro.email.length >= 1}
                    campoValido={validarEmail(clienteCadastro.email)}
                    labelCampo="E-mail:"
                    placeholder="Digite seu e-mail. Exemplo: seuemail@email.com"
                    valor={clienteCadastro.email}
                    setValor={(novoEmail) =>
                      setCliente((prev) => ({
                        ...prev,
                        email: novoEmail,
                      }))
                    }
                    tamanhoMaximo={100}
                    requerido={true}
                  />

                  <h5>*</h5>
                </div>
              </div>

              <div className="campo">
                <div className="input-obrigatorio">
                  <InputSenha
                    bordaDinamica={clienteCadastro.senha.length >= 1}
                    labelCampo="Senha:"
                    setSenha={(novaSenha) =>
                      setCliente((prev) => ({
                        ...prev,
                        senha: novaSenha,
                      }))
                    }
                    placeholder="Digite sua Senha"
                    habilitarCampoSenhaValido={true}
                  />
                  <h5>*</h5>
                </div>
              </div>

              <div className="campo">
                <div className="input-obrigatorio">
                  <InputSenha
                    bordaDinamica={confirmarSenhaCliente.length >= 1}
                    labelCampo="Confirmar Senha:"
                    setSenha={setConfirmarSenhacliente}
                    placeholder="Confirme a senha"
                  />
                  <h5>*</h5>
                </div>
              </div>

              <div className="campo">
                <div className="input-obrigatorio">
                  <InputPadrao
                    bordaDinamica={clienteCadastro.celular.length >= 1}
                    campoValido={validarCelular(clienteCadastro.celular)}
                    labelCampo="Celular:"
                    placeholder="Digite o número de celular. Exemplo: (11) 91111-1111"
                    valor={clienteCadastro.celular}
                    setValor={(novoCelular) =>
                      setCliente((prev) => ({
                        ...prev,
                        celular: novoCelular,
                      }))
                    }
                    tamanhoMaximo={15}
                    requerido={true}
                  />

                  <h5>*</h5>
                </div>
              </div>
            </div>
            
            <div className="campos-entrada-opcionais">
              <div className="campo">
                <InputPadrao
                  bordaDinamica={clienteCadastro.cep.length >= 1}
                  campoValido={validarCEP(clienteCadastro.cep)}
                  labelCampo="CEP:"
                  placeholder="Digite seu CEP"
                  valor={clienteCadastro.cep}
                  setValor={(novoCEP) =>
                    setCliente((prev) => ({
                      ...prev,
                      cep: novoCEP,
                    }))
                  }
                  tamanhoMaximo={9}
                  requerido={true}
                />
              </div>

              <div className="campo">
                <InputPadrao
                  labelCampo="Bairro:"
                  placeholder="Bairro"
                  valor={endereco.bairro}
                  apenasLeitura={true}
                />
              </div>

              <div className="campo">
                <InputPadrao
                  labelCampo="Estado:"
                  placeholder="Estado"
                  valor={endereco.estado}
                  apenasLeitura={true}
                />
              </div>

              <div className="campo">
                <InputPadrao
                  labelCampo="Cidade:"
                  placeholder="Cidade"
                  valor={endereco.cidade}
                  apenasLeitura={true}
                />
              </div>

              <div className="campo">
                <InputPadrao
                  labelCampo="Logradouro:"
                  placeholder="Logradouro"
                  valor={endereco.logradouro}
                  apenasLeitura={true}
                />
              </div>

              <div className="campo campo-obrigatorio">
                <InputPadrao
                  tipoCampo="number"
                  labelCampo="Numero:"
                  placeholder="Digite o número do seu imóvel"
                  valor={clienteCadastro.numero}
                  setValor={(novoNumero) =>
                    setCliente((prev) => ({
                      ...prev,
                      numero: novoNumero,
                    }))
                  }
                  tamanhoMaximo={10}
                  requerido={true}
                  apenasLeitura={bloqueioCampo}
                />
                {!bloqueioCampo && <h5>*</h5>}
              </div>

              <div className="campo campo-obrigatorio">
                <InputPadrao
                  labelCampo="Complemento:"
                  placeholder="Digite o complemento do seu endereço"
                  valor={clienteCadastro.complemento}
                  setValor={(novoComplemento) =>
                    setCliente((prev) => ({
                      ...prev,
                      complemento: novoComplemento,
                    }))
                  }
                  tamanhoMaximo={50}
                  requerido={true}
                  apenasLeitura={bloqueioCampo}
                />
                {!bloqueioCampo && <h5>*</h5>}
              </div>
            </div>
            <span className="info-campos-obrigatorios">
              * Campo Obrigatórios
            </span>
          </div>

          <div className="finalizacao-cadastro">
            <div className="icone-voltar">
              <i
                class="fa-solid fa-circle-chevron-left"
                onClick={() => navigate("/login")}
              ></i>
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
