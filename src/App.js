
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from './pages/produtos/Produto.js' ;
import CadastrarProduto from './pages/produtos/CadastrarProduto.js';
import EditarProduto from './pages/produtos/EditarProduto.js'

function App() {

return (

<Router>
    <Routes>

        {/* produtos */}
        <Route path="/produtos" element={<Produto />}/>
        <Route path="/cadprod" element={<CadastrarProduto />}/>
        <Route path="/editprod" element={<EditarProduto />}/>
    </Routes>
</Router>
);
}

export default App;

//https://www.youtube.com/watch?v=AC5ryzYPXLQ&list=PLvGbhQIuFefYF9WxDLnv3cxeGqnkE1WXs&index=9