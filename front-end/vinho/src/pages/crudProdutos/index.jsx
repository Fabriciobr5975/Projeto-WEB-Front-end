import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AbaNavegacao from "../../components/abaNavegacao";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import impedirAcessoTelaAdministrador from "../../service/administrador/impedirAcessoTelasAdministrador";

export default function CrudProdutos() {
  const cliente = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("cliente")) || {};
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    impedirAcessoTelaAdministrador(cliente, navigate);
  }, [cliente, navigate]);

  const [imagemCampo, setImagemCampo] = useState(null);
  const [temImagemCampo, setTemImagemCampo] = useState(false);
  const [nomeImagem, setNomeImagem] = useState("");
  const [id, setId] = useState("");

  const [listaVinicolas, setListaVinicolas] = useState([]);
  const [listaPaises, setListaPaises] = useState([]);

  const [vinho, setVinho] = useState({
    id_vinho: 0,
    imagem_vinho: "",
    nome_imagem: "",
    extensao: "",
    nome_vinho: "",
    classificacao_vinho: "",
    vinicola: "",
    uva_vinho: "",
    teor_alcolico: "",
    volume_vinho: "",
    temperatura_servir: "",
    pais: "",
    safra_vinho: "",
    preco_vinho: 0.0,
    descricao: "",
    quantidade_disponivel: 0,
    status_estoque: "",
  });

  const limparCampoImagem = () => {
    if (temImagemCampo) {
      setImagemCampo("");
      setVinho({ ...vinho, imagem_vinho: "", nome_imagem: "" });
      setNomeImagem("");
      setTemImagemCampo(false);
    }
  };

  const colocarImagemNoCampo = (e) => {
    limparCampoImagem();
    const arquivo = e.target.files[0];

    if (arquivo) {
      const imagemUrl = URL.createObjectURL(arquivo);
      setImagemCampo(imagemUrl);
      setNomeImagem(arquivo.name);
      setVinho({ ...vinho, imagem_vinho: arquivo, nome_imagem: arquivo.name });
      setTemImagemCampo(true);
    }
  };

  useEffect(() => {
    if (vinho && vinho.imagem_vinho) {
      setImagemCampo(vinho.imagem_vinho);
      setNomeImagem(vinho.nome_imagem);
    }
  }, [vinho]);

  const cadastrar = async () => {
    try {
      const formData = new FormData();
      formData.append("imagem_vinho", vinho.imagem_vinho);
      formData.append("nome_imagem", vinho.nome_imagem);
      formData.append("nome", vinho.nome_vinho);
      formData.append("uva", vinho.uva_vinho);
      formData.append("teor_alcolico", vinho.teor_alcolico);
      formData.append("classificacao", vinho.classificacao_vinho);
      formData.append("volume", vinho.volume_vinho);
      formData.append("safra", vinho.safra_vinho);
      formData.append("temperatura_servir", vinho.temperatura_servir);
      formData.append("preco", vinho.preco_vinho);
      formData.append("descricao", vinho.descricao);
      formData.append("quantidade", vinho.quantidade_disponivel);
      formData.append("status_estoque", vinho.status_estoque);
      formData.append("vinicola", vinho.vinicola);
      formData.append("pais", vinho.pais);

      const resp = await axios.post("http://localhost:5001/vinho", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTemImagemCampo(true);
      alert(`(${resp.data.resposta})`);
      limparTodosCampos();
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao inserir o vinho");
    }
  };

  const alterar = async () => {
    try {
      const formData = new FormData();
      formData.append("imagem_vinho", vinho.imagem_vinho);
      formData.append("nome_imagem", vinho.nome_imagem);
      formData.append("nome", vinho.nome_vinho);
      formData.append("uva", vinho.uva_vinho);
      formData.append("teor_alcolico", vinho.teor_alcolico);
      formData.append("classificacao", vinho.classificacao_vinho);
      formData.append("volume", vinho.volume_vinho);
      formData.append("safra", vinho.safra_vinho);
      formData.append("temperatura_servir", vinho.temperatura_servir);
      formData.append("preco", vinho.preco_vinho);
      formData.append("descricao", vinho.descricao);
      formData.append("quantidade", vinho.quantidade_disponivel);
      formData.append("status_estoque", vinho.status_estoque);
      formData.append("vinicola", vinho.vinicola);
      formData.append("pais", vinho.pais);

      await axios.put(
        `http://localhost:5001/vinho/${vinho.id_vinho}`,
        formData,
        {}
      );

      setTemImagemCampo(true);
      alert(`Alteração realizada com sucesso no vinho`);
      limparTodosCampos();
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao inserir o vinho");
    }
  };

  async function Excluir() {
    try {
      await axios.delete(`http://localhost:5001/vinho/${vinho.id_vinho}`);
      alert(`O produto (${vinho.nome_vinho}) foi excluido com sucesso! `);

      limparTodosCampos();
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro para excluir o vinho");
    }
  }

  async function Buscar() {
    try {
      const resp = await axios.get(`http://localhost:5001/vinho/${id}`);
      const vinhoBuscado = resp.data;

      limparCampoImagem();

      setVinho(vinhoBuscado);
      setImagemCampo(vinho.imagem_vinho);
      setNomeImagem(vinho.nome_imagem);
      setTemImagemCampo(true);

      alert(
        `Produto com nome "${vinhoBuscado.nome_vinho}" buscado com sucesso! `
      );
    } catch (error) {
      alert(error.response?.data?.erro ?? `Erro ao Buscar o vinho de ID ${id}`);
    }
  }

  const limparCampos = () => {
    setVinho((prevState) => ({
      ...prevState,
      id_vinho: 0,
      imagem_vinho: "",
      nome_imagem: "",
      extensao: "",
      nome_vinho: "",
      classificacao_vinho: "",
      vinicola: "",
      uva_vinho: "",
      teor_alcolico: "",
      volume_vinho: "",
      temperatura_servir: "",
      pais: "",
      safra_vinho: "",
      preco_vinho: 0.0,
      descricao: "",
      quantidade_disponivel: 0,
      status_estoque: "",
    }));
  };

  const limparTodosCampos = () => {
    limparCampoImagem();
    limparCampos();
  };

  const listarVinicolas = useCallback(async () => {
    try {
      const resp = await axios.get(`http://localhost:5001/vinicola`);
      setListaVinicolas([...resp.data]);
    } catch (error) {
      alert(
        error.response?.data?.erro ?? `Erro ao buscar as vinícolas salvas!`
      );
    }
  }, []);

  const listarPaises = useCallback(async () => {
    try {
      const resp = await axios.get(`http://localhost:5001/pais`);
      setListaPaises([...resp.data]);
    } catch (error) {
      alert(error.response?.data?.erro ?? `Erro ao buscar os países salvos!`);
    }
  }, []);

  useEffect(() => {
    listarVinicolas();
    listarPaises();
  }, [listarVinicolas, listarPaises]);

  return (
    <main className="pagina-crud-produtos pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />
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
            <AbaNavegacao
              nome="Modificar Vinicola/Pais"
              navegacao="/crudvinicolapais"
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
            <div className="secao-informacoes">
              <div className="lado-esquerdo">
                Identificação do Vinho (ID):
                <br />
                <input
                  type="text"
                  style={{ background: "#d0d0d0" }}
                  value={vinho.id_vinho}
                  onChange={(e) =>
                    setVinho({ ...vinho, id_vinho: e.target.value })
                  }
                  placeholder="ID do vinho"
                  readOnly
                />
              </div>
              <div className="lado-direito">
                Nome :<br />
                <input
                  type="text"
                  value={vinho.nome_vinho}
                  onChange={(e) =>
                    setVinho({ ...vinho, nome_vinho: e.target.value })
                  }
                  placeholder="Digite o nome do vinho"
                />
              </div>
              <div className="lado-esquerdo">
                Classificação :<br />
                <select
                  name="lista-classificacao-vinho"
                  value={vinho.classificacao_vinho}
                  onChange={(e) =>
                    setVinho({ ...vinho, classificacao_vinho: e.target.value })
                  }
                >
                  <option className="option-padrao" value="" selected disabled>
                    Selecione a classificação do vinho
                  </option>

                  <option value="Suave">Suave</option>
                  <option value="Seco">Seco</option>
                  <option value="Demi-Sec">Demi-Sec</option>
                  <option value="Espumante">Espumante</option>
                  <option value="Frisante">Frisante</option>
                  <option value="Rosé">Rosé</option>
                  <option value="Sem Classificação">Sem Classificação</option>
                </select>
              </div>
              <div className="lado-direito">
                Vinicola :<br />
                <select
                  name="lista-vinicolas"
                  value={vinho.vinicola}
                  onChange={(e) =>
                    setVinho({ ...vinho, vinicola: e.target.value })
                  }
                >
                  <option className="option-padrao" value="" selected disabled>
                    Selecione a vinícola do vinho
                  </option>

                  {listaVinicolas.length > 0 ? (
                    listaVinicolas.map((item) => (
                      <option value={item.vinicola}>{item.vinicola}</option>
                    ))
                  ) : (
                    <option value={undefined}>Vinícolas não encontradas</option>
                  )}
                </select>
              </div>
              <div className="lado-esquerdo">
                Pais :
                <select
                  name="lista-paises"
                  value={vinho.pais}
                  onChange={(e) => setVinho({ ...vinho, pais: e.target.value })}
                >
                  <option className="option-padrao" value="" selected disabled>
                    Selecione o pais do vinho
                  </option>
                  {listaPaises.length > 0 ? (
                    listaPaises.map((item) => (
                      <option value={item.vinicola}>{item.pais}</option>
                    ))
                  ) : (
                    <option value={undefined}>Paises não encontrados</option>
                  )}
                </select>
              </div>
              <div className="lado-direito">
                Uva :
                <input
                  type="text"
                  value={vinho.uva_vinho}
                  onChange={(e) =>
                    setVinho({ ...vinho, uva_vinho: e.target.value })
                  }
                  placeholder="Digite o nome da Uva do vinho"
                />
              </div>
            </div>
          </div>

          <div className="campos-descricao-botao">
            <div>
              Safra :
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={vinho.safra_vinho}
                onChange={(e) =>
                  setVinho({ ...vinho, safra_vinho: e.target.value })
                }
                placeholder="Digite o ano da safra do vinho"
              />
            </div>
            <div>
              Volume :
              <input
                type="text"
                value={vinho.volume_vinho}
                onChange={(e) =>
                  setVinho({ ...vinho, volume_vinho: e.target.value })
                }
                placeholder="Digite o volume em litros"
              />
            </div>
            <div>
              Qtd. em Estoque :
              <input
                type="number"
                min={0}
                value={vinho.quantidade_disponivel}
                onChange={(e) =>
                  setVinho({ ...vinho, quantidade_disponivel: e.target.value })
                }
                placeholder="Digite a quantidade do vinho"
              />
            </div>
            <div className="select-status-estoque">
              Status do Estoque :
              <select
                name="lista-status-estoque"
                value={vinho.status_estoque}
                onChange={(e) =>
                  setVinho({ ...vinho, status_estoque: e.target.value })
                }
              >
                <option className="option-padrao" value="" selected disabled>
                  Selecione a classificação do vinho
                </option>

                <option value="Sem Informação">Sem Informação</option>
                <option value="Vazio">Vazio</option>
                <option value="Baixo">Baixo</option>
                <option value="Normal">Normal</option>
                <option value="Cheio">Cheio</option>
              </select>
            </div>
            <div>
              Teor Alcoólico :
              <input
                type="text"
                value={vinho.teor_alcolico}
                onChange={(e) =>
                  setVinho({ ...vinho, teor_alcolico: e.target.value })
                }
                placeholder="Digite o qtd. do teor alcoólco"
              />
            </div>
            <div>
              Temperatura p/ Servir :
              <input
                type="text"
                value={vinho.temperatura_servir}
                onChange={(e) =>
                  setVinho({ ...vinho, temperatura_servir: e.target.value })
                }
                placeholder="Digite a temperatura que o vinho tem que ser servido"
              />
            </div>
            <div>
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

            <div className="botoes-crud-produto">
              <input type="button" value="Cadastrar" onClick={cadastrar} />
              <input type="button" value="Alterar" onClick={alterar} />
              <input type="button" value="Excluir" onClick={Excluir} />
              <input
                type="button"
                value="LimparCampos"
                onClick={() => limparTodosCampos()}
              />
            </div>
          </div>
        </section>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </main>
  );
}
