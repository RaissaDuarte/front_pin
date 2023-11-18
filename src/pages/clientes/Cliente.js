import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';

function Cliente() {
    const clienteInicial = {
        id: 0,
        nome: '',
        cpf_cnpj: '',
        telefone: '',
        endereco: '',
        cep: '',
    };

    const [clientes, setClientes] = useState([]);
    const [objCliente, setObjCliente] = useState(clienteInicial);
    const navigate = useNavigate();

    const adicionar = () => {
        navigate("/cadcliente");
    };

    useEffect(() => {
        fetch('http://localhost:8080/clientes')
            .then(retorno => retorno.json())
            .then(convertido => setClientes(convertido))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }, []);

    return (
        <><React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Gerência Funcionário</title>

            <link
                rel="preconnect"
                href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="true" />
            <link
                href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap"
                rel="stylesheet" />
            <link
                href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap"
                rel="stylesheet" />

            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous" />
            <link rel="stylesheet" href="/css/gerencia.css" />

        </React.Fragment>

            <header className="headerGeneric">
                <div className="logo_name">
                    <p>TemDTudo</p>
                </div>
                <div className="link_pages">
                    <a href="/home">Home</a>
                    <a href="/funcionarios" style={{ textDecoration: 'underline' }}>Gerência</a>
                    <a href="/buscaFunc">Busca</a>
                    <a href="">Venda</a>
                    <a href="/perfil">Perfil</a>
                </div>
            </header>

            <div className="content">
                <div className="menu">
                    <a href="/funcionarios">Funcionários</a>
                    <a href="/produtos">Produtos</a>
                    <a href="/fornecedores">Fornecedores</a>
                    <a href="/estoques">Estoques</a>
                    <a href="/transportadoras">Transportadoras</a>
                    <a href="/clientes" className="menu_escolhido">Clientes</a>
                </div>

                <div className="main">
                    <div className="table-container">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF/CNPJ</th>
                                    <th>Telefone</th>
                                    <th>Endereço</th>
                                    <th>CEP</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf_cnpj}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>{cliente.cep}</td>
                                        <td>
                                            <a href={`/clientes/edit/${cliente.id}`} className="btn btn-primary">Atualizar</a>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <a href={`/clientes/${cliente.id}`} className="btn btn-danger">Deletar</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button className="right_btn" onClick={adicionar}>Adicionar</button>
                        <button className="right_btn">Relatório</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cliente;
