import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import impedirAcessoTelaAdministrador from "../../service/administrador/impedirAcessoTelasAdministrador";

import { imprimirNumeroComVirgula } from "../../utils/conversaoUtil";
import { calcularTicketMedioCliente } from "../../service/calculosCarrinho/calculosCarrinhoCliente";

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
      const resp = await axios.get(
        "http://localhost:5001/cliente/lista/pedidos"
      );

      setListaClientes(Object.values(resp.data));
    } catch (error) {
      alert(
        error.response?.data?.erro ??
          "Erro ao buscar as informações dos clientes."
      );
    }
  };

  const atualizarTabela = () => {
    setAtualizarLista((atualizar) => !atualizar);
  };

  const verificarSeUsuarioTemPedidos = (idCliente) => {
    if (
      !listaClientes[idCliente]?.quantidade_pedidos ||
      listaClientes[idCliente]?.quantidade_pedidos === 0
    ) {
      console.log(listaClientes[idCliente]);
      return false;
    }
    return true;
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
            <AbaNavegacao
              nome="Modificar Vinicola/Pais"
              navegacao="/crudvinicolapais"
            />
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
                placeholder="Busque por Preço Total ou Ticket Médio"
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
              <col className="celular-cliente" />
              <col className="total-pedidos-cliente" />
              <col className="ticket-medio-cliente" />
            </colgroup>
            <thead>
              <tr>
                <th>Identificação</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Celular</th>
                <th>Total em Compras</th>
                <th>Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {listaClientes.map((item, index) => (
                <tr key={item.id_cliente}>
                  <td>{item.id_cliente}</td>
                  <td>{item.nome_completo}</td>
                  <td>{item.email}</td>
                  <td>{item.celular}</td>
                  <td>
                    <div className="preco">
                      {verificarSeUsuarioTemPedidos(index) && <span>R$</span>}
                      {verificarSeUsuarioTemPedidos(index)
                        ? imprimirNumeroComVirgula(
                            Number(item?.preco_total_pedido).toFixed(2)
                          )
                        : "Sem Pedidos"}
                    </div>
                  </td>
                  <td>
                    <div className="preco">
                      <span>R$</span>
                      {verificarSeUsuarioTemPedidos(index)
                        ? imprimirNumeroComVirgula(
                            calcularTicketMedioCliente(
                              item?.preco_total_pedido,
                              item?.quantidade_pedidos
                            ).toFixed(2)
                          )
                        : "0,00"}
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
