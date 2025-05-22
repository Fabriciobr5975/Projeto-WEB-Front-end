import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Vinho from "../../components/vinho";

export default function Produtos() {
    const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
    const [listaVinhos, setListaVinhos] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classificacaoInicial = queryParams.get("classificacao");
    const [filtros, setFiltros] = useState({
        classificacao: classificacaoInicial ? [classificacaoInicial] : [],
        pais: []
    });

    useEffect(() => {
        listarVinhos();
    }, []);

    const listarVinhos = async () => {
        try {
            const url = `http://localhost:5001/vinho`;
            const resp = await axios.get(url);
            setListaVinhos(resp.data);
        } catch (error) {
            alert(
                error.response?.data?.erro ??
                "Erro ao buscar as informações dos vinhos"
            );
        }
    };

    function handleFiltro(tipo, valor, checked) {
        setFiltros((prevFiltros) => {
            const novosFiltros = { ...prevFiltros };
            if (checked) {
                novosFiltros[tipo] = [...novosFiltros[tipo], valor];
            } else {
                novosFiltros[tipo] = novosFiltros[tipo].filter((item) => item !== valor);
            }
            return novosFiltros;
        });
    }

    const vinhosFiltrados = useMemo(() => {
        return listaVinhos.filter((vinho) => {
            const matchClassificacao =
                filtros.classificacao.length === 0 ||
                (vinho.classificacao_vinho &&
                    filtros.classificacao.includes(vinho.classificacao_vinho));
            const matchPais =
                filtros.pais.length === 0 ||
                (vinho.pais && filtros.pais.includes(vinho.pais));
            return matchClassificacao && matchPais;
        });
    }, [listaVinhos, filtros]);

    return (
        <div className="pagina-produtos pagina">
            <TelaCarregamento tempo={250}>
                <Header cliente={cliente} />

                <section className="banner-perfil"></section>
                <section className="titulo-banner">
                    <h1>Vinhos</h1>
                    <hr className="barra-banner-produtos" />
                    <p className="paginas">
                        {listaVinhos.length >= 1 ? 1 : 0}-{listaVinhos.length ?? 0} de{" "}
                        {listaVinhos.length ?? 0} resultados
                    </p>
                </section>

                <section className="conteudo-produtos">
                    <div className="filtros-produto">
                        <div className="classificacao">
                            <h4>Classificacao</h4>
                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Espumante"
                                    checked={filtros.classificacao.includes("Espumante")}
                                    onChange={(e) =>
                                        handleFiltro("classificacao", "Espumante", e.target.checked)
                                    }
                                />
                                <span>Espumante</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Frisante"
                                    checked={filtros.classificacao.includes("Frisante")}
                                    onChange={(e) =>
                                        handleFiltro("classificacao", "Frisante", e.target.checked)
                                    }
                                />
                                <span>Frisante</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Rosé"
                                    checked={filtros.classificacao.includes("Rosé")}
                                    onChange={(e) =>
                                        handleFiltro("classificacao", "Rosé", e.target.checked)
                                    }
                                />
                                <span>Rosé</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Fortificado"
                                    checked={filtros.classificacao.includes("Fortificado")}
                                    onChange={(e) =>
                                        handleFiltro("classificacao", "Fortificado", e.target.checked)
                                    }
                                />
                                <span>Fortificado</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Seco"
                                    checked={filtros.classificacao.includes("Seco")}
                                    onChange={(e) =>
                                        handleFiltro("classificacao", "Seco", e.target.checked)
                                    }
                                />
                                <span>Seco</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Demi-Sec"
                                    checked={filtros.classificacao.includes("Demi-Sec")}
                                    onChange={(e) =>
                                        handleFiltro("classificacao", "Demi-Sec", e.target.checked)
                                    }
                                />
                                <span>Demi-Sec</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Suave"
                                    checked={filtros.classificacao.includes("Suave")}
                                    onChange={(e) =>
                                        handleFiltro("classificacao", "Suave", e.target.checked)
                                    }
                                />
                                <span>Suave</span>
                            </div>
                        </div>
                        <div className="pais">
                            <h4>Pais</h4>
                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Brasil"
                                    checked={filtros.pais.includes("Brasil")}
                                    onChange={(e) =>
                                        handleFiltro("pais", "Brasil", e.target.checked)
                                    }
                                />
                                <span>Brasil</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Argentina"
                                    checked={filtros.pais.includes("Argentina")}
                                    onChange={(e) =>
                                        handleFiltro("pais", "Argentina", e.target.checked)
                                    }
                                />
                                <span>Argentina</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Japão"
                                    checked={filtros.pais.includes("Japão")}
                                    onChange={(e) =>
                                        handleFiltro("pais", "Japão", e.target.checked)
                                    }
                                />
                                <span>Japão</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Chile"
                                    checked={filtros.pais.includes("Chile")}
                                    onChange={(e) =>
                                        handleFiltro("pais", "Chile", e.target.checked)
                                    }
                                />
                                <span>Chile</span>
                            </div>

                            <div className="filtro">
                                <input
                                    type="checkbox"
                                    value="Itália"
                                    checked={filtros.pais.includes("Itália")}
                                    onChange={(e) =>
                                        handleFiltro("pais", "Itália", e.target.checked)
                                    }
                                />
                                <span>Itália</span>
                            </div>
                        </div>
                    </div>

                    <div className="produtos">
                        {vinhosFiltrados.map((item) => (
                            <Vinho vinhos={item} key={item.id_vinho} />
                        ))}
                    </div>

                    <section className="manipulacao-paginas-produtos">
                        <div className="icones">
                            <div className="icone-voltar">
                                <i className="fa-solid fa-circle-chevron-left"></i>
                                <p>PÁGINA ANTERIOR</p>
                            </div>

                            <div className="icone-avancar">
                                <p>PRÓXIMA PÁGINA</p>
                                <i className="fa-solid fa-circle-chevron-right"></i>
                            </div>
                        </div>
                    </section>
                </section>

                <section className="disclaimer-produto">
                    <div className="imagem-entrega">
                        <picture className="imagem-disclaimer">
                            <img
                                src="/assets/images/imagem-disclaimer-produto.svg"
                                alt="imagem disclaimer"
                            />
                        </picture>
                    </div>

                    <div className="informacacao-disclaimer">
                        <h2>Entrega Rápida e Segura, Direto na Sua Porta</h2>
                        <p>
                            Receba seus vinhos favoritos no conforto de casa, com todo o
                            cuidado que eles e você merecem.
                        </p>
                    </div>
                </section>

                <Footer cliente={cliente} />
            </TelaCarregamento>
        </div>
    );
}
