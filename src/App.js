
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home.js';

import Produto from './pages/produtos/Produto.js';
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
import Venda from './pages/venda/Venda.js';
import CadastrarVenda from './pages/venda/CadastrarVenda.js';



function App() {

    return (

<Router>
    <Routes>
        {/* funcionarios */}
        <Route path="/funcionarios" element={<Funcionario />}/>
        <Route path="/cadastroFuncionario" element={<CadastrarFuncionario />}/>
        <Route path="/funcionarios/edit/:codigoFuncionario" element={<EditarFuncionario />}/>

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* cliente */}
        <Route path="/clientes" element={<Cliente />}/>
        <Route path="/cadcliente" element={<CadastrarCliente />}/>
        <Route path="/editcliente/:codigocliente" element={<EditarCliente />}/>

        {/* produtos */}
        <Route path="/produtos" element={<Produto />}/>
        <Route path="/cadprod" element={<CadastrarProduto />}/>
        <Route path="/editprod/:codigoProduto" element={<EditarProduto />}/>

        {/* vendas */}
        <Route path="/vendas" element={<Venda />}/>
        <Route path="/cadvenda" element={<CadastrarVenda />}/>

         {/* fornecedores */}
        <Route path="/fornecedores" element={<Fornecedor />}/>
        <Route path="/cadastroFornecedor" element={<CadastrarFornecedor />}/>
        <Route path="/fornecedores/edit/:codigoFornecedor" element={<EditarFornecedor />}/>

        {/* transportadora */}
        <Route path="/transportadoras" element={<Transportadora />}/>
        <Route path="/cadastroTransportadora" element={<CadastrarTransportadora />}/>
        <Route path="/transportadoras/edit/:codigoTransportadora" element={<EditarTransportadora />}/>


            </Routes>
        </Router>
    );
}

export default App;

//https://www.youtube.com/watch?v=AC5ryzYPXLQ&list=PLvGbhQIuFefYF9WxDLnv3cxeGqnkE1WXs&index=9