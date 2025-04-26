import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from './pages/homepage';
import NotFound from './pages/notfound';
import CrudProdutos from "./pages/crudprodutos";
import ListagemProdutos from "./pages/listagemprodutos";
import Login from "./pages/login"
import SobreNos from "./pages/sobrenos";
import RecuperacaoSenha from "./pages/recuperacaosenha";


export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to = "/homepage" replace />}/>
        <Route path='/homepage' element={<HomePage />}/>
        <Route path='/crudprodutos' element={<CrudProdutos />}/>
        <Route path='/listagemprodutos' element={<ListagemProdutos />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/sobrenos' element={<SobreNos />}/>        
        <Route path='/recuperacaosenha' element={<RecuperacaoSenha />}/>        
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

