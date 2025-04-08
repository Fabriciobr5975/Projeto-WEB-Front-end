import { BrowserRouter, Router, Route } from "react-router-dom";

import App from './App';
import NotFound from './pages/notfound'

export default function Navegacao() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<App />}/>
        <Route path="*" element={<NotFound />}/>
      </Router>
    </BrowserRouter>
  );
}
