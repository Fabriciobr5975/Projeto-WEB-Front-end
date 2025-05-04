import "./index.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ListagemProdutos() {
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
      alert(error.response?.data?.erro ?? "Erro ao buscar as informações do estoque");
    }
  };

  const atualizarTabela = () => {
    setAtualizarLista((atualizar) => !atualizar);
  };

  async function Buscar() {
    try {
      let resp = await axios.get(`http://localhost:5001/estoque/busca/vinho?vinho=${nome}`);
      setListaVinhos(resp.data);
      alert(`Produto(s) com nome "${nome}" buscado(s) com sucesso!`);
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao buscar as informações do estoque");
    }
  }

  return (
    <main className="pagina">
      <Header />
      <section className="banner-abas">
        <div className="abas-navegacao">
          <AbaNavegacao nome="Análise de Clientes" />
          <AbaNavegacao nome="Produtos Cadastrados" abaAtual={true} />
          <AbaNavegacao nome="Modificar Produtos" />
          <AbaNavegacao nome="Lista de Pedidos" />
        </div>
      </section>
      <section className="conteudo">
        <div className="pesquisa">
          <div className="recarregar-dados">
            <i class="fa-solid fa-arrows-rotate" onClick={atualizarTabela}></i>
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
              <th>Classificação do Vinho</th>
              <th>Vinícola</th>
              <th>Valor Unitário</th>
              <th>Status Estoque</th>
              <th>Qtd Estoque</th>
            </tr>
          </thead>
          <tbody>
            {listaVinhos.map((item) => (
              <tr key={item.id_vinho}>
                <td>{item.id_vinho}</td>
                <td>{item.vinho}</td>
                <td>{item.classificao_vinho}</td>
                <td>{item.vinicola_vinho}</td>
                <td>{item.preco_vinho}</td>
                <td>{item.status_estoque}</td>
                <td>{item.quantidade_estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Footer />
    </main>
  );
}
