
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from './pages/produtos/Produto.js' ;
import CadastrarProduto from './pages/produtos/CadastrarProduto.js';

function App() {

return (

<Router>
    <Routes>/*OPA */
        <Route path="/produtos" element={<Produto />}/>
        <Route path="/cadprod" element={<CadastrarProduto />}/>
    </Routes>
</Router>
);
}

export default App;

//https://www.youtube.com/watch?v=AC5ryzYPXLQ&list=PLvGbhQIuFefYF9WxDLnv3cxeGqnkE1WXs&index=9