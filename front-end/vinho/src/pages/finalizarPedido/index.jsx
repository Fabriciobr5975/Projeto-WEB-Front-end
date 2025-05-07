import "./index.scss";

import TelaCarregamento from "../../components/telaCarregamento";
import Header from "../../components/header";
import Footer from "../../components/footer";

//import { useCallback, useEffect, useState } from "react";
//import axios from "axios";
import { useLocation } from "react-router-dom";

export default function FinalizarPedido() {
  const location = useLocation();
  const { cliente } = location.state || {};

  return (
    <div className="pagina-finalizacao-pedido pagina">
      <TelaCarregamento tempo={250}>
        <Header cliente={cliente} />

        <section className="banner-perfil">
          <div className="titulo-banner">
            <h1>CHECK-OUT</h1>
          </div>
        </section>

        <section className="conteudo-finalizacao-pedido">
          <section className="revisao-itens">
            <h2>1. Revisão dos Itens</h2>

            <div className="conteudo-revisao-itens">
              <div className="imagem">
                <picture>
                  <img
                    src="/assets/images/vinho-exemplo.svg"
                    alt="imagem vinho"
                  />
                </picture>
              </div>
              <div className="informacoes-vinho">
                <h3>Nome: Carbenet Sauvignon</h3>
                <p>Marca: Salton</p>

                <div className="manipulacao-quantidade">
                  <div className="input-reservar-vinho">
                    <p class="manipulacao-valores-input">-</p>
                    <input id="input" type="number" min={1} max={10} />
                    <p class="manipulacao-valores-input">+</p>
                  </div>
                </div>
              </div>

              <div className="preco-vinho">
                <i class="fa-regular fa-circle-xmark"></i>
                <span>R$ 59,90</span>
              </div>
            </div>
          </section>

          <section className="endereco-entrega">
            <h2>2. Endereço de Entrega</h2>
            <div className="listagem-enderecos-salvos">
              <select name="lista-enderecos">
                <option value="" disabled selected>
                  Lista de Endereços
                </option>
                <option value="endereco01">
                  Via Transversal Sul, nº130, 06045420
                </option>
              </select>

              <button className="botao-adicionar-novo">Adicionar Novo</button>
            </div>

            <div className="entrada-dados">
              <div className="entrada">
                <label>Apelido do Endereço:</label>
                <input
                  type="text"
                  placeholder="Digite o apelido que você dar ao endereço"
                />
              </div>

              <div className="entrada">
                <label>Estado:</label>
                <input type="text" placeholder="Estado" />
              </div>

              <div className="entrada">
                <label>Logradouro:</label>
                <input type="text" placeholder="Logradouro" />
              </div>

              <div className="entrada">
                <label>Cidade:</label>
                <input type="text" placeholder="Cidade" />
              </div>

              <div className="entrada">
                <label>Bairro:</label>
                <input type="text" placeholder="Bairro" />
              </div>

              <div className="ultima-linha ">
                <div className="entrada">
                  <label>Complemento:</label>
                  <input type="text" placeholder="Complemento" />
                </div>

                <div className="entrada">
                  <label>Número:</label>
                  <input type="text" placeholder="Número" />
                </div>

                <div className="entrada">
                  <label>CEP:</label>
                  <input type="text" placeholder="CEP" />
                </div>
                <div className="entrada">
                  <label>E-mail:</label>
                  <input type="email" placeholder="CEP" />
                </div>
                <div className="entrada">
                  <label>Contato:</label>
                  <input type="text" placeholder="CEP" />
                </div>
              </div>
            </div>
          </section>

          <section className="finalizacao-pedido">
            <section className="metodo-pagamento">
              <h2>3. Revisão dos Itens</h2>
              <div className="campo-forma-pagamento">
                <input type="checkbox" />
                <p>Cartão de Débito</p>
              </div>
              <div className="campo-forma-pagamento">
                <input type="checkbox" />
                <p>Cartão de Crédito</p>
              </div>
              <div className="campo-forma-pagamento">
                <input type="checkbox" />
                <p>PIX</p>
              </div>
            </section>

            <section className="metodo-pagamento">
              <h2>4. Sumário do Pedido</h2>
              <div className="sumario-pedido">
                <div className="campo-forma-pagamento">
                  <input type="checkbox" />
                  <p>Cartão de Débito</p>
                </div>
                <div className="campo-forma-pagamento">
                  <input type="checkbox" />
                  <p>Cartão de Crédito</p>
                </div>
                <div className="campo-forma-pagamento">
                  <input type="checkbox" />
                  <p>PIX</p>
                </div>

                <div className="pedido-a-ser-realizado">
                  <span>1</span>
                  <p>Nome: Carbenet Sauvignon</p>
                  <span>R$ 59,90</span>
                </div>

                <div className="valor-total-pedido">
                  <span>
                    Valor total: <strong>R$ 59,90</strong>
                  </span>
                </div>

                <div className="concluir-pedido">
                  <button>Realizar Pagamento</button>
                </div>
              </div>
            </section>
          </section>
        </section>

        <Footer />
      </TelaCarregamento>
    </div>
  );
}
