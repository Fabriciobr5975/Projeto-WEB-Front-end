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
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    if (quantidade > quantidadeDisponivel) {
      setQuantidade(1);
    }
  }, [quantidade, quantidadeDisponivel]);

  const pegarVinho = useCallback(async () => {
    try {
      const url = `http://localhost:5001/vinho/${id}`;

      const resp = await axios.get(url);
      const vinhoBuscado = resp.data;

      setVinhos(vinhoBuscado);
      setQuantidadeDisponivel(vinhoBuscado.quantidade_disponivel);
    } catch (error) {
      navigate("/notfound");
    }
  }, [id, navigate]);

  useEffect(() => {
    pegarVinho();
  }, [pegarVinho, navigate]);

  const reservarVinho = async () => {
    try {
      if (
        (cliente && cliente.id_cliente) ||
        sessionStorage.getItem("cliente")
      ) {
        const itemCarrinho = {
          carrinho: cliente.id_cliente,
          vinho: vinho.id_vinho,
          quantidade: quantidade,
        };

        const url = `http://localhost:5001/itenscarrinho`;
        const resp = await axios.post(url, itemCarrinho);

        alert(resp.data.resposta);
      } else {
        alert(
          "Para adicionar esse vinho ao carrinho é necessário ter uma conta!"
        );
        navigate("/login");
      }
    } catch (error) {
      alert(
        error.response?.data?.erro ?? "Erro ao inserir o vinho no carrinho"
      );
    }
  };

  const aumentarQuantidade = () => {
    if (quantidade < 100 && quantidade < quantidadeDisponivel) {
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
                    <li>Qtd. em Estoque</li>
                  </ul>
                </div>

                <div className="dados-caracteristicas">
                  <ul>
                    <li>{vinho.uva_vinho}</li>
                    <li>{vinho.safra_vinho}</li>
                    <li>{vinho.vinicola}</li>
                    <li>{vinho.teor_alcolico}</li>
                    <li>{vinho.temperatura_servir}</li>
                    <li>{vinho.quantidade_disponivel}</li>
                  </ul>
                </div>
              </div>

              <div className="preco">
                <span>
                  R$
                  {vinho.preco_vinho}
                </span>
              </div>

              {quantidadeDisponivel !== 0 && (
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
                      max={quantidadeDisponivel}
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
                  <button onClick={reservarVinho}>Reservar</button>
                </div>
              )}
              {quantidadeDisponivel === 0 && (
                <span id="mensagem-vinho-esgotado">
                  Desculpe, {vinho.nome_vinho} não está disponível no momento!
                </span>
              )}
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
                <p className="conteudo-descricao">{vinho.descricao}</p>
              </div>
            </div>
          </div>
        </main>

        <Footer cliente={cliente} />
      </TelaCarregamento>
    </div>
  );
}
