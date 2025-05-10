import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Vinho() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};

  const navigate = useNavigate();
  
  const { id } = useParams();
  const [vinho, setVinhos] = useState({});
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    if (quantidade < 1 || quantidade > 100) {
      setQuantidade(1);
      alert("A quantidade informada é inválida!");
    }
  }, [quantidade]);

  const pegarVinho = useCallback(async () => {
    try {
      const url = `http://localhost:5001/vinho/${id}`;

      const resp = await axios.get(url);
      const vinhoBuscado = resp.data;

      setVinhos(vinhoBuscado);
    } catch (error) {
      navigate("/notfound");
    }
  }, [id, navigate]);
  
  useEffect(() => {
    pegarVinho();
  }, [pegarVinho, navigate]);


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
                <img src={vinho.imagem_vinho} alt="Vinho" />
              </picture>
            </div>

            <div className="caracteristicas">
              <h2>{vinho.nome_vinho}</h2>

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
                    <li>{vinho.uva_vinho}</li>
                    <li>{vinho.safra_vinho}</li>
                    <li>{vinho.vinicola}</li>
                    <li>{vinho.teor_alcolico}</li>
                    <li>{vinho.temperatura_servir}</li>
                  </ul>
                </div>
              </div>

              <div className="preco">
                <span>
                  R$
                  {vinho.preco_vinho}
                </span>
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
                <p>{vinho.quantidade}</p>
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
