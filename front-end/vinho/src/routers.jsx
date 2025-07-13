import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Telas dos Administradores
import CrudProdutos from "./pages/telasAdministrador/crudProdutos";
import ListagemProdutos from "./pages/telasAdministrador/listagemProdutos";
import AnaliseClientes from "./pages/telasAdministrador/analiseCliente";
import ListaPedidosClientes from "./pages/telasAdministrador/listaPedidosClientes";
import CrudVinicolaPais from "./pages/telasAdministrador/crudVinicolaPais";

// Telas Principais 
import HomePage from "./pages/telasUsuarios/telasPrincipais/homepage";
import NotFound from "./pages/telasUsuarios/telasPrincipais/notfound";
import Login from "./pages/telasUsuarios/telasPrincipais/login";
import CadastroCliente from "./pages/telasUsuarios/telasPrincipais/cadastroCliente";
import Produtos from "./pages/telasUsuarios/telasPrincipais/produto";
import Vinho from "./pages/telasUsuarios/telasPrincipais/vinho";

// Telas Informativas
import SobreNos from "./pages/telasUsuarios/telasInformacoes/sobreNos";
import ConfirmacaoPedido from "./pages/telasUsuarios/telasInformacoes/confirmacaoPedido";
import Vinicola from "./pages/telasUsuarios/telasInformacoes/vinicola";
import Privacidade from "./pages/telasUsuarios/telasInformacoes/privacidade";
import PerguntasFrequentes from "./pages/telasUsuarios/telasInformacoes/perguntasFrequentes";
import PoliticaDevolucao from "./pages/telasUsuarios/telasInformacoes/perguntasFrequentes";

// Telas de Recuperação de Senha
import RecuperacaoSenha from "./pages/telasUsuarios/telasRecuperacaoSenha/recuperacaoSenha";
import RecuperarSenha from "./pages/telasUsuarios/telasRecuperacaoSenha/recuperarSenha";

// Telas de Manipulação dos Clientes
import PerfilCliente from "./pages/telasUsuarios/telasCliente/dadosCliente";
import EnderecosCliente from "./pages/telasUsuarios/telasCliente/enderecosCliente";
import PedidosCliente from "./pages/telasUsuarios/telasCliente/pedidos";
import CarrinhoCliente from "./pages/telasUsuarios/telasCliente/carrinho";
import CheckOut from "./pages/telasUsuarios/telasCliente/checkOut";

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
