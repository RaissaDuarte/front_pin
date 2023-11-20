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

    const handleExcluirCliente = async (clienteId) => {
        try {
            const response = await fetch(`http://localhost:8080/clientes/delete/${clienteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Atualize a lista de clientes após a exclusão
                const novosClientes = clientes.filter(c => c.id !== clienteId);
                setClientes(novosClientes);
                console.log('Cliente excluído com sucesso!');
            } else {
                console.error('Erro ao excluir cliente:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    };

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
                                            <button className="btn btn-primary" onClick={() => navigate(`/clientes/edit/${cliente.id}`)}>Editar</button>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <button className="btn btn-danger" onClick={() => handleExcluirCliente(cliente.id)}>Deletar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button onClick={adicionar}>Adicionar</button>
                        <button className="right_btn">Relatório</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cliente;
