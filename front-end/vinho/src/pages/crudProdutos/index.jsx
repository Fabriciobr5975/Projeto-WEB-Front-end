import Header from "../../components/header";
import Footer from "../../components/footer";

import { useState } from "react";
import axios from "axios";

import "./index.scss";
import AbaNavegacao from "../../components/abaNavegacao";

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

  const [nome, setNome] = useState("");
  const [classif, setClassif] = useState("");
  const [imagem, setImagem] = useState([]);
  const [vinicola, setVinicola] = useState("");
  const [marca, setMarca] = useState("");
  const [uva, setUva] = useState("");
  const [teor, setTeor] = useState("");
  const [volume, setVolume] = useState("");
  const [temp, setTemp] = useState("");
  const [pais, setPais] = useState("");
  const [safra, setSafra] = useState("");
  const [preco, setPreco] = useState("");
  const [descr, setDescr] = useState("");

  async function Cadastrar() {
    let corpo = {
      nome_vinho: nome,
      classificacao_vinho: classif,
      imagem: imagem,
      vinicola: vinicola,
      marca: marca,
      uva_vinho: uva,
      teor_alcolico: teor,
      volume_vinho: volume,
      temperatura_servir: temp,
      pais: pais,
      safra_vinho: safra,
      preco_vinho: preco,
      descricao: descr,
    };
    let resp = await axios.post("http://localhost:5001/vinho", corpo);
    alert(`produto cadastrado com sucesso! (${resp.data.novoId})`);

    // limpar();
  }

  async function Alterar() {
    let corpo = {
      nome_vinho: nome,
      classificacao_vinho: classif,
      imagem: imagem,
      vinicola: vinicola,
      marca: marca,
      uva_vinho: uva,
      teor_alcolico: teor,
      volume_vinho: volume,
      temperatura_servir: temp,
      pais: pais,
      safra_vinho: safra,
      preco_vinho: preco,
      descricao: descr,
    };
    let resp = await axios.put(`http://localhost:5001/vinho/${id}`, corpo);
    alert(`O produto (${resp.data.nome}) foi alterado com sucesso!`);

    limpar();
  }

  async function Excluir() {
    let resp = await axios.delete(`http://localhost:5001/${id}`);
    alert(`O produto (${resp.data.nome}) foi excluido com sucesso! `);
  }
  async function Buscar() {
    let resp = await axios.get(`http://localhost:5001/vinho/${id}`);
    setNome(resp.data.nome_vinho);
    setClassif(resp.data.classificacao_vinho);
    setImagem(null);
    setVinicola(resp.data.vinicola);
    setMarca("");
    setUva(resp.data.uva_vinho);
    setTeor(resp.data.teor_alcolico);
    setVolume(resp.data.volume_vinho);
    setTemp(resp.data.temperatura_servir);
    setPais(resp.data.pais);
    setSafra(resp.data.safra_vinho);
    setPreco(resp.data.preco_vinho);
    setDescr("");
    alert(
      `Produto(s) com nome "${resp.data.nome_vinho}" buscado(s) com sucesso! `
    );
  }
  function limpar() {
    setNome("");
    setClassif("");
    setImagem(null);
    setVinicola("");
    setMarca("");
    setUva("");
    setTeor("");
    setVolume("");
    setTemp("");
    setPais("");
    setSafra("");
    setPreco("");
    setDescr("");
  }

  return (
    <main className="pagina">
      <Header />
      <section className="banner-abas">
        <div className="abas-navegacao">
          <AbaNavegacao nome="Análise de Clientes" />
          <AbaNavegacao nome="Produtos Cadastrados" />
          <AbaNavegacao nome="Modificar Produtos" abaAtual={true} />
          <AbaNavegacao nome="Lista de Pedidos" />
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
            Nome :<br />{" "}
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Classificação :<br />{" "}
            <input
              type="text"
              value={classif}
              onChange={(e) => setClassif(e.target.value)}
              placeholder="Digite a classificação do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Vinicola :<br />{" "}
            <input
              type="text"
              value={vinicola}
              onChange={(e) => setVinicola(e.target.value)}
              placeholder="Digite a Vínicola do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Marca :<br />{" "}
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Digite a marca do vinho"
            />{" "}
          </div>
        </div>
        <div className="campos-descricao-botao">
          <div>
            {" "}
            Uva :
            <input
              type="text"
              value={uva}
              onChange={(e) => setUva(e.target.value)}
              placeholder="Digite o nome da Uva do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Teor Alcoólico :
            <input
              type="text"
              value={teor}
              onChange={(e) => setTeor(e.target.value)}
              placeholder="Digite o qtd. do teor alcoólco"
            />{" "}
          </div>
          <div>
            {" "}
            Volume :
            <input
              type="text"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Digite o volume em litros"
            />{" "}
          </div>
          <div>
            {" "}
            Temperatura p/ Servir :
            <input
              type="text"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              placeholder="Digite a temperatura que o vinho tem que ser servido"
            />{" "}
          </div>
          <div>
            {" "}
            Pais :
            <input
              type="text"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              placeholder="Digite o país de origem"
            />{" "}
          </div>
          <div>
            {" "}
            Safra :
            <input
              type="text"
              value={safra}
              onChange={(e) => setSafra(e.target.value)}
              placeholder="Digite o ano da safra do vinho"
            />{" "}
          </div>
          <div>
            {" "}
            Preço (Un) :
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Digite o preço unitário do vinho"
            />
          </div>
          <div className="descricao">
            {" "}
            Descrição : <br />
            <textarea
              className="area-descricao"
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
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
    </main>
  );
}
