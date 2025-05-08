import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Vinho from "../../components/vinho";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Produtos() {
  const location = useLocation();
  const { cliente } = location.state || {};

  const [listaVinhos, setListaVinhos] = useState([]);

  useEffect(() => {
    listarVinhos();
  }, []);

  const listarVinhos = async () => {
    try {
      const url = `http://localhost:5001/vinho`;

      const resp = await axios.get(url);
      const vinhos = resp.data;

      setListaVinhos(vinhos);
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao buscar as informações dos vinhos"
      );
    }
  };

  return (
    <div className="pagina-produtos pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />

        <section className="banner-perfil"></section>
        <section className="titulo-banner">
          <h1>Vinhos</h1>
          <hr className="barra-banner-produtos" />
          <p className="paginas">1-12 de 40 resultados</p>
        </section>

        <section className="conteudo-produtos">
          <div className="filtros-produto">
            <div className="categoria">
              <h4>Categoria</h4>
              <div className="filtro">
                <input type="checkbox" /> <span>Tinto</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Branco</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Rosé</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Espumante</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Fortificado</span>
              </div>
            </div>

            <div className="classificacao">
              <h4>Classificacao</h4>
              <div className="filtro">
                <input type="checkbox" /> <span>Seco</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Meio-Seco</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Suave</span>
              </div>
            </div>

            <div className="pais">
              <h4>Pais</h4>
              <div className="filtro">
                <input type="checkbox" /> <span>Brasil</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Argentina</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Uruguai</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Chile</span>
              </div>

              <div className="filtro">
                <input type="checkbox" /> <span>Itália</span>
              </div>
            </div>
          </div>

          <div className="produtos">
            {listaVinhos.map((item) => (
              <Vinho vinhos={item} key={item.id_vinho} /> 
            ))}
          </div>

          <section className="manipulacao-paginas-produtos">
            <div className="icones">
              <div className="icone-voltar">
                <i class="fa-solid fa-circle-chevron-left"></i>
                <p>PÁGINA ANTERIOR</p>
              </div>

              <div className="icone-avancar">
                <p>PRÓXIMA PÁGINA</p>
                <i class="fa-solid fa-circle-chevron-right"></i>
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
