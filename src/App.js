import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';

// Importe seus componentes
import Home from './pages/home/Home.js';
import Produto from './pages/produtos/Produto.js';
import CadastrarProduto from './pages/produtos/CadastrarProduto.js';
import EditarProduto from './pages/produtos/EditarProduto.js';
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
import Login from './pages/login/Login.js';
import EditarQuadroAvisos from './pages/home/EditarQuadroAvisos.js';
import EditarQuadroPlantao from './pages/home/EditarQuadroPlantao.js';
import Perfil from './pages/perfil/Perfil.js';

function App() {

    return (

        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="" element={<Login />} />

                    {/* funcionarios */}
                    {/* <Route path="/funcionarios" element={<Navigate to="/login" replace />} /> */}
                    <Route path="/funcionarios" element={<Funcionario />} />
                    <Route path="/cadastroFuncionario" element={<CadastrarFuncionario />} />
                    <Route path="/funcionarios/edit/:codigoFuncionario" element={<EditarFuncionario />} />

                    {/* Home */}
                    <Route path="/home/:idFuncionario" element={<Home />} />
                    <Route path="/atualizarQuadroAvisos/:idFuncionario" element={<EditarQuadroAvisos />} />
                    <Route path="/atualizarQuadroPlantao/:idFuncionario" element={<EditarQuadroPlantao />} />

                    {/* Perfil */}
                    <Route path="/perfil" element={<Perfil />} />

<<<<<<< HEAD
        {/* vendas */}
        <Route path="/vendas" element={<Venda />}/>
        <Route path="/cadvenda" element={<CadastrarVenda />}/>
=======
                    {/* cliente */}
                    <Route path="/clientes" element={<Cliente />} />
                    <Route path="/cadcliente" element={<CadastrarCliente />} />
                    <Route path="/editcliente/:codigocliente" element={<EditarCliente />} />
>>>>>>> ef2b3eeaa838429102f29a4643d9d39d48647d5d

                    {/* produtos */}
                    <Route path="/produtos" element={<Produto />} />
                    <Route path="/cadprod" element={<CadastrarProduto />} />
                    <Route path="/editprod/:codigoProduto" element={<EditarProduto />} />

                    {/* vendas */}
                    <Route path="/vendas" element={<Venda />} />
                    {/*<Route path="/cadvendas" element={<CadastrarVenda />}/>*/}

                    {/* fornecedores */}
                    <Route path="/fornecedores" element={<Fornecedor />} />
                    <Route path="/cadastroFornecedor" element={<CadastrarFornecedor />} />
                    <Route path="/fornecedores/edit/:codigoFornecedor" element={<EditarFornecedor />} />

                    {/* transportadora */}
                    <Route path="/transportadoras" element={<Transportadora />} />
                    <Route path="/cadastroTransportadora" element={<CadastrarTransportadora />} />
                    <Route path="/transportadoras/edit/:codigoTransportadora" element={<EditarTransportadora />} />


                </Routes>
            </Router>
        </AuthProvider >
    );
}

export default App;

//https://www.youtube.com/watch?v=AC5ryzYPXLQ&list=PLvGbhQIuFefYF9WxDLnv3cxeGqnkE1WXs&index=9