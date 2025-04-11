import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from './pages/homepage';
import NotFound from './pages/notfound'

export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to = "/homepage" replace />}/>
        <Route path='/homepage' element={<HomePage />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

