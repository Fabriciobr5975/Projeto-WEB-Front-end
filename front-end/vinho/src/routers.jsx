import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from './pages/homepage';
import NotFound from './pages/notfound';
import CrudProdutos from "./pages/crudProdutos";
import ListagemProdutos from "./pages/listagemProdutos";
import Login from "./pages/login"
import SobreNos from "./pages/sobreNos";
import RecuperacaoSenha from "./pages/recuperacaoSenha";
import CadastroCliente from "./pages/cadastroCliente";
import ConfirmacaoPedido from "./pages/confirmacaoPedido";
import Vinho from "./pages/vinho";


export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to = "/homepage" replace />}/>
        <Route path='/homepage' element={<HomePage />}/>
        <Route path='/crudprodutos' element={<CrudProdutos />}/>
        <Route path='/listagemprodutos' element={<ListagemProdutos />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/recuperacaosenha' element={<RecuperacaoSenha />}/>
        <Route path='/cadastro' element={<CadastroCliente />}/>        
        <Route path='/sobrenos' element={<SobreNos />}/>       
        <Route path='/vinho' element={<Vinho />}/>        
        <Route path='/confirmacaopedido' element={<ConfirmacaoPedido />}/>        
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

