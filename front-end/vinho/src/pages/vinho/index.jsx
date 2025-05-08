import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Vinho() {
  const location = useLocation();
  const { cliente } = location.state || {};

  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    if (quantidade < 1 || quantidade > 100) {
      setQuantidade(1);
      alert("A quantidade informada é inválida!");
    }
  }, [quantidade]);

  const aumentarQuantidade = () => {
    if (quantidade < 100) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  return (
    <div className="pagina-vinho pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />

        <main className="informacoes-vinho">
          <div className="caracteristicas-vinho">
            <div className="imagem-vinho">
              <picture>
                <img src="/assets/images/vinho-exemplo.svg" alt="Vinho" />
              </picture>
            </div>

            <div className="caracteristicas">
              <h2>VINOSIA LE SORBOLE - MALBEC RESERVA 2019</h2>

              <div className="lista-caracteristicas">
                <div className="tipo-caracteristicas">
                  <ul>
                    <li>Uva</li>
                    <li>Safra</li>
                    <li>Vinícola</li>
                    <li>Teor Alcoólico</li>
                    <li>Temp. de Serviço</li>
                  </ul>
                </div>

                <div className="dados-caracteristicas">
                  <ul>
                    <li>Chandonnay</li>
                    <li>2020</li>
                    <li>Vinã Cobos</li>
                    <li>15,00%</li>
                    <li>10ºC</li>
                  </ul>
                </div>
              </div>

              <div className="preco">
                <span>R$ 3.000,00</span>
              </div>

              <div className="reserva-vinho">
                <div className="input-reservar-vinho">
                  <p
                    class="manipulacao-valores-input"
                    onClick={diminuirQuantidade}
                  >
                    -
                  </p>
                  <input
                    id="input"
                    type="number"
                    min={1}
                    max={10}
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                  <p
                    class="manipulacao-valores-input"
                    onClick={aumentarQuantidade}
                  >
                    +
                  </p>
                </div>
                <button>Reservar</button>
              </div>
            </div>
          </div>

          <div className="descricao-caracteristicas-vinho">
            <hr />
            <div className="titulo-texto-caracteristicas">
              <h2>Características</h2>
              <hr />
            </div>

            <div className="informacoes-adicionais-vinho">
              <div className="descricao">
                <p>
                  A versão Chardonnay da linha Bramare foi elaborada a partir de
                  uvas cultivadas no Valle de Uco, uma das principais regiões
                  vitivinícolas de Mendoza. Amadurecido por 10 meses em barris
                  de carvalho, o vinho adquiriu caráter aromático, com boa
                  acidez e frescor no paladar, além de notas de frutas brancas e
                  amarelas frescas, com leve toque mineral no nariz.
                </p>
              </div>

              <div className="informacoes-adicionais">
                <p>
                  <strong>Gustativo:</strong> Ótima acidez, com corpo médio e
                  final persistente
                </p>
                <p>
                  <strong>Potencial de Guarda:</strong> Pronto para beber
                </p>
                <p>
                  <strong>Olfativo:</strong> Aromas de frutas brancas e amarelas
                  frescas, com leve toque mineral
                </p>
                <p>
                  <strong>Harmonização:</strong> Carne de aves ao forno, peixes
                  grelhados, risoto de cogumelos
                </p>
                <p>
                  <strong>Visual:</strong> Amarelo-palha
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
