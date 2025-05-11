import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import impedirAcessoTelaAdministrador from "../../service/administrador/impedirAcessoTelasAdministrador";

export default function ListagemProdutos() {
  const cliente = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("cliente")) || {};
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    impedirAcessoTelaAdministrador(cliente, navigate);
  }, [cliente, navigate]);

  const [listaVinhos, setListaVinhos] = useState([]);
  const [atualizarLista, setAtualizarLista] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    listarVinhos();
  }, [atualizarLista]);

  const listarVinhos = async () => {
    try {
      const resp = await axios.get("http://localhost:5001/estoque");
      const vinhos = resp.data;

      setListaVinhos(vinhos);
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
        `http://localhost:5001/estoque/busca/vinho?vinho=${nome}`
      );
      setListaVinhos(resp.data);
      alert(`Produto(s) com nome "${nome}" buscado(s) com sucesso!`);
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar as informações do estoque"
      );
    }
  }

  return (
    <main className="pagina-listagem-produtos pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
        <section className="banner-abas">
          <div className="titulo-banner">
            <h1>Listagem do Estoque</h1>
          </div>
          <div className="abas-navegacao">
            <AbaNavegacao
              nome="Análise de Clientes"
              navegacao="/analiseclientes"
            />
            <AbaNavegacao
              nome="Produtos Cadastrados"
              abaAtual={true}
              navegacao="/listagemprodutos"
            />
            <AbaNavegacao nome="Modificar Produtos" navegacao="/crudprodutos" />
            <AbaNavegacao nome="Lista de Pedidos" navegacao="/listapedidos" />
          </div>
        </section>
        <section className="conteudo">
          <div className="pesquisa">
            <div className="recarregar-dados">
              <i
                class="fa-solid fa-arrows-rotate"
                onClick={atualizarTabela}
              ></i>
              <span>Atualizar Tabela</span>
            </div>

            <div className="busca-vinho">
              <input
                type="text"
                placeholder="Insira o nome do vinho.."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input type="button" value="Buscar" onClick={Buscar} />
            </div>
          </div>
          <table>
            <colgroup>
              <col className="id" />
              <col className="vinho" />
              <col className="descricao" />
              <col className="vinicola" />
              <col className="valor" />
              <col className="status" />
              <col className="estoque" />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Vinho</th>
                <th>Nome do Vinho</th>
                <th>Vinícola</th>
                <th>Valor Unitário</th>
                <th>Status Estoque</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {listaVinhos.map((item) => (
                <tr key={item.id_vinho}>
                  <td>{item.id_vinho}</td>
                  <td>
                    <div className="primeira-coluna">
                      {item.vinho}
                      <img
                        src={item.imagem_vinho}
                        alt="imagem vinho"
                      />
                    </div>
                  </td>
                  <td>{item.descricao}</td>
                  <td>{item.vinicola_vinho}</td>
                  <td>
                    <div className="preco">
                      <span>R$</span>
                      {item.preco_vinho}
                    </div>
                  </td>
                  <td>{item.status_estoque}</td>
                  <td>{item.quantidade_estoque}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </main>
  );
}
