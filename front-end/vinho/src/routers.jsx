import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/homepage";
import NotFound from "./pages/notfound";
import CrudProdutos from "./pages/crudProdutos";
import ListagemProdutos from "./pages/listagemProdutos";
import AnaliseClientes from "./pages/analiseCliente";
import ListaPedidosClientes from "./pages/listaPedidosClientes";
import Login from "./pages/login";
import SobreNos from "./pages/sobreNos";
import RecuperacaoSenha from "./pages/recuperacaoSenha";
import RecuperarSenha from "./pages/recuperarSenha";
import CadastroCliente from "./pages/cadastroCliente";
import PerfilCliente from "./pages/dadosCliente";
import EnderecosCliente from "./pages/enderecosCliente";
import PedidosCliente from "./pages/pedidos";
import CarrinhoCliente from "./pages/carrinho";
import ConfirmacaoPedido from "./pages/confirmacaoPedido";
import Produtos from "./pages/produto";
import Vinho from "./pages/vinho";
import CheckOut from "./pages/checkOut";
import Vinicola from "./pages/vinicola";
import Privacidade from "./pages/privacidade";
import PerguntasFrequentes from "./pages/perguntasFrequentes";
import PoliticaDevolucao from "./pages/politicaDevolucao";
import CrudVinicolaPais from "./pages/crudVinicolaPais";

export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/crudprodutos" element={<CrudProdutos />} />
        <Route path="/crudvinicolapais" element={<CrudVinicolaPais />} />
        <Route path="/listagemprodutos" element={<ListagemProdutos />} />
        <Route path="/analiseclientes" element={<AnaliseClientes />} />
        <Route path="/listapedidos" element={<ListaPedidosClientes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperacaosenha" element={<RecuperacaoSenha />} />
        <Route path="/alterarsenha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<CadastroCliente />} />
        <Route path="/perfil" element={<PerfilCliente />} />
        <Route path="/enderecoCliente" element={<EnderecosCliente />} />
        <Route path="/meuspedidos" element={<PedidosCliente />} />
        <Route path="/meucarrinho" element={<CarrinhoCliente />} />
        <Route path="/sobrenos" element={<SobreNos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/vinho/:id" element={<Vinho />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/vinicolas" element={<Vinicola />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/perguntas-frequentes" element={<PerguntasFrequentes />} />
        <Route path="/politica-devolucao" element={<PoliticaDevolucao />} />
        <Route path="/confirmacaopedido" element={<ConfirmacaoPedido />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
