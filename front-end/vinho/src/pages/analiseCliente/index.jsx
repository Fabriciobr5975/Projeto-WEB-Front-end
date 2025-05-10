import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import impedirAcessoTelaAdministrador from "../../service/administrador/impedirAcessoTelasAdministrador";

export default function AnaliseClientes() {
  const cliente = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("cliente")) || {};
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    impedirAcessoTelaAdministrador(cliente, navigate);
  }, [cliente, navigate]);

  const [listaClientes, setListaClientes] = useState([]);
  const [atualizarLista, setAtualizarLista] = useState(false);
  const [filtroBusca, setFiltroBusca] = useState("");

  useEffect(() => {
    listarClientes();
  }, [atualizarLista]);

  const listarClientes = async () => {
    try {
      const resp = await axios.get("http://localhost:5001/enderecoCliente");
      const vinhos = resp.data;

      setListaClientes(vinhos);
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar as informações do estoque"
      );
    }
  };

  const atualizarTabela = () => {
    setAtualizarLista((atualizar) => !atualizar);
  };

  async function Buscar() {
    try {
      let resp = await axios.get(
        `http://localhost:5001/endereco/busca/cidade?cidade=${filtroBusca}`
      );
      setListaClientes(resp.data);
    } catch (error) {
      alert(
        error.response?.data?.erro ??
          `Erro ao buscar as informações do filtro ${filtroBusca}`
      );
    }
  }

  return (
    <div className="pagina-analise-cliente pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <section className="banner-abas">
          <div className="titulo-banner">
            <h1>Listagem de Clientes</h1>
          </div>
          <div className="abas-navegacao">
            <AbaNavegacao
              nome="Análise de Clientes"
              abaAtual={true}
              navegacao="/analiseclientes"
            />
            <AbaNavegacao
              nome="Produtos Cadastrados"
              navegacao="/listagemprodutos"
            />
            <AbaNavegacao nome="Modificar Produtos" navegacao="/crudprodutos" />
            <AbaNavegacao nome="Lista de Pedidos" navegacao="/listapedidos" />
          </div>
        </section>

        <section className="listagem-cliente">
          <div className="pesquisa">
            <div className="recarregar-dados">
              <i
                class="fa-solid fa-arrows-rotate"
                onClick={atualizarTabela}
              ></i>
              <span>Atualizar Tabela</span>
            </div>

            <div className="filtro-busca">
              <input
                type="text"
                placeholder="Busque por Cidade, Ticket Médio ou Região"
                value={filtroBusca}
                onChange={(e) => setFiltroBusca(e.target.value)}
              />
              <input type="button" value="Buscar" onClick={Buscar} />
            </div>
          </div>
          <table>
            <colgroup>
              <col className="identificacao-cliente" />
              <col className="nome-cliente" />
              <col className="email-cliente" />
              <col className="cidade-cliente" />
              <col className="bairro-cliente" />
              <col className="cliente-ativo" />
              <col className="ticket-medio-cliente" />
            </colgroup>
            <thead>
              <tr>
                <th>Identificação</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Ativo?</th>
                <th>Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {listaClientes.map((item) => (
                <tr key={item.id_cliente}>
                  <td>{item.id_cliente}</td>
                  <td>{item.nome_completo_cliente}</td>
                  <td>{item.email}</td>
                  <td>{item.cidade}</td>
                  <td>{item.bairro}</td>
                  <td>{"Sim"}</td>
                  <td>
                    <div className="preco">
                      <span>R$</span>
                      {250.0}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
