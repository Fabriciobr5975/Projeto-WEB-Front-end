import "./index.scss";

import InputPadrao from "../../../componentesPrincipais/inputs/inputPadrao";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
  tratarNumeroComVirgula,
  imprimirNumeroComVirgula,
} from "../../../../utils/conversaoUtil";

export default function ModalAlterarProduto(props) {
  const [idVinho] = useState(props.vinho); 
  const [vinho, setVinho] = useState({});

  const buscar = useCallback(async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5001/vinho/busca/semimagem/${idVinho}`
      );
      const vinhoBuscado = resp.data;

      setVinho(vinhoBuscado);
    } catch (error) {
      alert(error.response?.data?.erro ?? `Erro ao Buscar o vinho`);
      props.fecharModal();
    }
  }, [props, idVinho]);

  useEffect(() => {
    buscar();
  }, [buscar]);

  const [listaVinicolas, setListaVinicolas] = useState([]);
  const [listaPaises, setListaPaises] = useState([]);

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

  const alterar = async () => {
    try {
      const ulr = `http://localhost:5001/vinho/semimagem/${idVinho}`;

      await axios.put(ulr, {
        nome: vinho.nome_vinho,
        uva: vinho.uva_vinho,
        teor_alcolico: vinho.teor_alcolico,
        classificacao: vinho.classificacao_vinho,
        volume: vinho.volume_vinho,
        safra: vinho.safra_vinho,
        temperatura_servir: vinho.temperatura_servir,
        preco: tratarNumeroComVirgula(vinho.preco_vinho),
        descricao: vinho.descricao,
        quantidade: vinho.quantidade_disponivel,
        status_estoque: vinho.status_estoque,
        vinicola: vinho.vinicola,
        pais: vinho.pais,
      });

      alert(`Alteração realizada com sucesso no vinho`);
      props.fecharModal();
    } catch (error) {
      alert(error.response?.data?.erro ?? "Erro ao inserir o vinho");
    }
  };

  const removervinho = async () => {
    const resultado = window.confirm(
      "Essa operação pode ser bloqueada pelo banco de dados, se quiser continuar aperte no ok!"
    );

    if (resultado) {
      try {
        await axios.delete(`http://localhost:5001/vinho/${idVinho}`);
        alert(`O produto (${vinho.nome_vinho}) foi excluido com sucesso! `);
        props.fecharModal();
      } catch (error) {
        alert(error.response?.data?.erro ?? "Erro para excluir o vinho");
      }
    }
  };

  return (
    <section className="modal-alterar-produtos">
      <div className="conteudo-modal">
        <div className="cabecalho-modal-alteracao-produtos">
          <h2>Alteração de Produtos</h2>
          <i class="fa-regular fa-circle-xmark" onClick={props.fecharModal}></i>
        </div>
        <div className="conteudo-alteracao-produtos">
          <div className="entrada-dados">
            <InputPadrao
              tipoCampo="number"
              labelCampo="Identificação do Vinho (ID):"
              placeholder="Identificação do vinho"
              valor={vinho.id_vinho}
              setValor={(novoId) =>
                setVinho((prev) => ({
                  ...prev,
                  id_vinho: novoId,
                }))
              }
              apenasLeitura={true}
            />
          </div>
          <div className="entrada-dados">
            <InputPadrao
              labelCampo="Nome do Vinho:"
              placeholder="Digite o nome do vinho"
              valor={vinho.nome_vinho}
              setValor={(novoNome) =>
                setVinho((prev) => ({
                  ...prev,
                  nome_vinho: novoNome,
                }))
              }
              tamanhoMaximo={100}
              requerido={true}
            />
          </div>

          <div className="entrada-dados formatacao-select">
            <label>Classificação:</label>
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

          <div className="entrada-dados formatacao-select">
            <label>Vinícola:</label>
            <select
              name="lista-vinicolas"
              value={vinho.vinicola}
              onChange={(e) => setVinho({ ...vinho, vinicola: e.target.value })}
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

          <div className="entrada-dados formatacao-select">
            <label>Pais:</label>
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

          <div className="entrada-dados">
            <InputPadrao
              labelCampo="Uva:"
              placeholder="Digite o nome da Uva do vinho"
              valor={vinho.uva_vinho}
              setValor={(novaUva) =>
                setVinho((prev) => ({
                  ...prev,
                  uva_vinho: novaUva,
                }))
              }
              tamanhoMaximo={100}
              requerido={true}
            />
          </div>

          <div className="entrada-dados">
            <InputPadrao
              tipoCampo="number"
              labelCampo="Safra:"
              placeholder="Digite o ano da safra do vinho"
              valor={vinho.safra_vinho}
              setValor={(novaSafra) =>
                setVinho((prev) => ({
                  ...prev,
                  safra_vinho: novaSafra,
                }))
              }
              valorMinimo={1900}
              valorMaximo={new Date().getFullYear()}
              requerido={true}
            />
          </div>

          <div className="entrada-dados">
            <InputPadrao
              labelCampo="Volume:"
              placeholder="Digite o volume em litros"
              valor={vinho.volume_vinho}
              setValor={(novoVolume) =>
                setVinho((prev) => ({
                  ...prev,
                  volume_vinho: novoVolume,
                }))
              }
              tamanhoMaximo={50}
              requerido={true}
            />
          </div>

          <div className="entrada-dados">
            <InputPadrao
              tipoCampo="number"
              labelCampo="Qtd. em Estoque:"
              placeholder="Digite a quantidade do vinho"
              valor={vinho.quantidade_disponivel}
              setValor={(novaQuantidade) =>
                setVinho((prev) => ({
                  ...prev,
                  quantidade_disponivel: novaQuantidade,
                }))
              }
              valorMinimo={0}
              tamanhoMaximo={50}
              requerido={true}
            />
          </div>
          <div className="entrada-dados formatacao-select">
            <label>Status do Estoque:</label>
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

          <div className="entrada-dados">
            <InputPadrao
              labelCampo="Teor Alcoólico:"
              placeholder="Digite o qtd. do teor alcoólco"
              valor={vinho.teor_alcolico}
              setValor={(novoTeorAlcoolico) =>
                setVinho((prev) => ({
                  ...prev,
                  teor_alcolico: novoTeorAlcoolico,
                }))
              }
              tamanhoMaximo={10}
              requerido={true}
            />
          </div>

          <div className="entrada-dados">
            <InputPadrao
              labelCampo="Temperatura p/ Servir:"
              placeholder="Digite a temperatura que o vinho tem que ser servido"
              valor={vinho.temperatura_servir}
              setValor={(novaTemperaturaServir) =>
                setVinho((prev) => ({
                  ...prev,
                  temperatura_servir: novaTemperaturaServir,
                }))
              }
              tamanhoMaximo={10}
            />
          </div>

          <div className="entrada-dados">
            <InputPadrao
              labelCampo="Preço (Un):"
              placeholder="Digite o preço unitário do vinho"
              valor={imprimirNumeroComVirgula(vinho.preco_vinho)}
              setValor={(novoPreco) =>
                setVinho((prev) => ({
                  ...prev,
                  preco_vinho: novoPreco,
                }))
              }
              tamanhoMaximo={100}
              requerido={true}
            />
          </div>

          <div className="entrada-dados descricao">
            <label>Descrição:</label>
            <textarea
              className="area-descricao"
              value={vinho.descricao}
              onChange={(e) =>
                setVinho({ ...vinho, descricao: e.target.value })
              }
              placeholder="Coloque aqui caracteristicas adicionais para o vinho..."
              rows={5}
            />
          </div>
          <div className="botoes-modal-alterar-produto">
            <button onClick={alterar}>Alterar Produto</button>
            <button onClick={removervinho}>Remover Produto</button>
          </div>
        </div>
      </div>
    </section>
  );
}
