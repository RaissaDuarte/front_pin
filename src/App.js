
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from './pages/produtos/Produto.js' ;
import CadastrarProduto from './pages/produtos/CadastrarProduto.js';
import EditarProduto from './pages/produtos/EditarProduto.js'
import Funcionario from './pages/funcionarios/Funcionario.js';
import CadastrarFuncionario from './pages/funcionarios/CadastrarFuncionario.js';
import EditarFuncionario from './pages/funcionarios/EditarFuncionario.js';
import Transportadora from './pages/transportadora/Transportadora.js';
import CadastrarTransportadora from './pages/transportadora/CadastrarTransportadora.js';
import EditarTransportadora from './pages/transportadora/EditarTransportadora.js';
import Fornecedor from './pages/fornecedores/Fornecedores.js';
import CadastrarFornecedor from './pages/fornecedores/CadastrarFornecedores.js';
import EditarFornecedor from './pages/fornecedores/EditarFornecedores.js';
import Cliente from './pages/clientes/Cliente.js';
import CadastrarCliente from './pages/clientes/CadastrarCliente.js';
import EditarCliente from './pages/clientes/EditarCliente.js';

function App() {

return (

<Router>
    <Routes>
        {/* funcionarios */}
        <Route path="/funcionarios" element={<Funcionario />}/>
        <Route path="/cadfunc" element={<CadastrarFuncionario />}/>
        <Route path="/editfunc" element={<EditarFuncionario />}/>

        {/* produtos */}
        <Route path="/produtos" element={<Produto />}/>
        <Route path="/cadprod" element={<CadastrarProduto />}/>
        <Route path="/editprod" element={<EditarProduto />}/>

         {/* fornecedores */}
         <Route path="/fornecedores" element={<Fornecedor />}/>
        <Route path="/cadfornec" element={<CadastrarFornecedor />}/>
        <Route path="/editfornec" element={<EditarFornecedor />}/>

        {/* transportadora */}
        <Route path="/transportadoras" element={<Transportadora />}/>
        <Route path="/cadtransp" element={<CadastrarTransportadora />}/>
        <Route path="/edittransp" element={<EditarTransportadora />}/>

        {/* cliente */}
        <Route path="/clientes" element={<Cliente />}/>
        <Route path="/cadcliente" element={<CadastrarCliente />}/>
        <Route path="/editcliente" element={<EditarCliente />}/>

    </Routes>
</Router>
);
}

export default App;

//https://www.youtube.com/watch?v=AC5ryzYPXLQ&list=PLvGbhQIuFefYF9WxDLnv3cxeGqnkE1WXs&index=9