import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useState } from "react";
import axios from "axios";

export default function CrudProdutos() {
  const [imagemCampo, setImagemCampo] = useState(null);
  const [nomeImagem, setNomeImagem] = useState("");

  const colocarImagemNoCampo = (e) => {
    const arquivo = e.target.files[0];

    if (arquivo) {
      const imagemUrl = URL.createObjectURL(arquivo);
      setImagemCampo(imagemUrl);
      setNomeImagem(arquivo.name);
    }
  };

  const [id, setId] = useState("");

  const [vinho, setVinho] = useState({
    nome_vinho: "",
    classificacao_vinho: "",
    imagem: [],
    vinicola: "",
    id_vinho: "",
    uva_vinho: "",
    teor_alcolico: "",
    volume_vinho: "volume",
    temperatura_servir: "",
    pais: "",
    safra_vinho: "",
    preco_vinho: 0.0,
    descricao: "",
  });

  async function Cadastrar() {
    let resp = await axios.post("http://localhost:5001/vinho", vinho);
    alert(`produto cadastrado com sucesso! (${resp.data.novoId})`);

    // limpar();
  }

  async function Alterar() {
    let resp = await axios.put(`http://localhost:5001/vinho/${id}`, vinho);
    alert(`O produto (${resp.data.nome}) foi alterado com sucesso!`);

    limpar();
  }

  async function Excluir() {
    let resp = await axios.delete(`http://localhost:5001/${id}`);
    alert(`O produto (${resp.data.nome}) foi excluido com sucesso! `);
  }

  async function Buscar() {
    const resp = await axios.get(`http://localhost:5001/vinho/${Number(id)}`);
    const vinhoBuscado = resp.data;

    setVinho({
      ...vinho,
      id_vinho: vinhoBuscado.id_vinho,
      nome_vinho: vinhoBuscado.nome_vinho,
      classificacao_vinho: vinhoBuscado.classificacao_vinho,
      image: vinhoBuscado.imagem_vinho,
      vinicola: vinhoBuscado.vinicola,
      uva_vinho: vinhoBuscado.uva_vinho,
      teor_alcolico: vinhoBuscado.teor_alcolico,
      volume_vinho: vinhoBuscado.volume_vinho,
      temperatura_servir: vinhoBuscado.temperatura_servir,
      pais: vinhoBuscado.pais,
      safra_vinho: vinhoBuscado.safra_vinho,
      preco_vinho: vinhoBuscado.preco_vinho,
      descricao: vinhoBuscado.descricao,
    });

    alert(
      `Produto(s) com nome "${vinhoBuscado.nome_vinho}" buscado(s) com sucesso! `
    );
  }
  function limpar() {
    setVinho({});
  }

  return (
    <main className="pagina-crud-produtos pagina">
       <TelaCarregamento tempo={500}>
      <Header />
      <section className="banner-abas">
      <div className="titulo-banner">
          <h1>Manipulação dos Vinhos</h1>
        </div>
        <div className="abas-navegacao">
          <AbaNavegacao
            nome="Análise de Clientes"
            navegacao="/analiseclientes"
          />
          <AbaNavegacao
            nome="Produtos Cadastrados"
            navegacao="/listagemprodutos"
          />
          <AbaNavegacao
            nome="Modificar Produtos"
            abaAtual={true}
            navegacao="/crudprodutos"
          />
          <AbaNavegacao nome="Lista de Pedidos" navegacao="/listapedidos" />
        </div>
      </section>
      <section className="conteudo">
        <div className="pesquisa1">
          <input type="button" value="Buscar" onClick={Buscar} />
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Digite o ID do vinho para realizar a busca"
          />
        </div>
        <div className="busca-imagem-campos">
          <div className="inserir-imagem">
            <input
              type="file"
              accept="image/*"
              onChange={colocarImagemNoCampo}
              style={{
                backgroundImage: imagemCampo
                  ? `url(${imagemCampo})`
                  : `url("/assets/images/file-input-image.png")`,
                backgroundSize: imagemCampo ? "cover" : "80%",
              }}
            />
            <p>{nomeImagem ? nomeImagem : "Coloque a Imagem aqui!"}</p>
          </div>
          <div>
            {" "}
            Identificação do Vinho (ID):
            <br />{" "}
            <input
              type="text"
              value={vinho.id_vinho}
              onChange={(e) => setVinho({ ...vinho, id_vinho: e.target.value })}
              placeholder="ID do vinho"
              readOnly
            />{" "}
          </div>
          <div>
            {" "}
            Nome :<br />{" "}
            <input
              type="text"
              value={vinho.nome_vinho}
              onChange={(e) =>
                setVinho({ ...vinho, nome_vinho: e.target.value })
              }
              placeholder="Digite o nome do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Classificação :<br />{" "}
            <input
              type="text"
              value={vinho.classificacao_vinho}
              onChange={(e) =>
                setVinho({ ...vinho, classificacao_vinho: e.target.value })
              }
              placeholder="Digite a classificação do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Vinicola :<br />{" "}
            <input
              type="text"
              value={vinho.vinicola}
              onChange={(e) => setVinho({ ...vinho, vinicola: e.target.value })}
              placeholder="Digite a Vínicola do vinho"
            />{" "}
          </div>
        </div>
        <div className="campos-descricao-botao">
          <div>
            {" "}
            Uva :
            <input
              type="text"
              value={vinho.uva_vinho}
              onChange={(e) =>
                setVinho({ ...vinho, uva_vinho: e.target.value })
              }
              placeholder="Digite o nome da Uva do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Teor Alcoólico :
            <input
              type="text"
              value={vinho.teor_alcolico}
              onChange={(e) =>
                setVinho({ ...vinho, teor_alcolico: e.target.value })
              }
              placeholder="Digite o qtd. do teor alcoólco"
            />{" "}
          </div>
          <div>
            {" "}
            Volume :
            <input
              type="text"
              value={vinho.volume_vinho}
              onChange={(e) =>
                setVinho({ ...vinho, volume_vinho: e.target.value })
              }
              placeholder="Digite o volume em litros"
            />{" "}
          </div>
          <div>
            {" "}
            Temperatura p/ Servir :
            <input
              type="text"
              value={vinho.temperatura_servir}
              onChange={(e) =>
                setVinho({ ...vinho, temperatura_servir: e.target.value })
              }
              placeholder="Digite a temperatura que o vinho tem que ser servido"
            />{" "}
          </div>
          <div>
            {" "}
            Pais :
            <input
              type="text"
              value={vinho.pais}
              onChange={(e) => setVinho({ ...vinho, pais: e.target.value })}
              placeholder="Digite o país de origem"
            />{" "}
          </div>
          <div>
            {" "}
            Safra :
            <input
              type="text"
              value={vinho.safra_vinho}
              onChange={(e) =>
                setVinho({ ...vinho, safra_vinho: e.target.value })
              }
              placeholder="Digite o ano da safra do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Preço (Un) :
            <input
              type="text"
              value={vinho.preco_vinho}
              onChange={(e) =>
                setVinho({ ...vinho, preco_vinho: e.target.value })
              }
              placeholder="Digite o preço unitário do vinho"
            />
          </div>
          <div className="descricao">
            {" "}
            Descrição : <br />
            <textarea
              className="area-descricao"
              value={vinho.descricao}
              onChange={(e) =>
                setVinho({ ...vinho, descricao: e.target.value })
              }
              placeholder="Coloque aqui caracteristicas adicionais para o vinho..."
            />
          </div>

          <div className="botao">
            <input type="button" value="Cadastrar" onClick={Cadastrar} />{" "}
          </div>
          <div className="botao">
            <input type="button" value="Alterar" onClick={Alterar} />{" "}
          </div>
          <div className="botao">
            <input type="button" value="Excluir" onClick={Excluir} />{" "}
          </div>
        </div>
      </section>
      <Footer />
      </TelaCarregamento>
    </main>
  );
}
