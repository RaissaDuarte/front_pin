//import React from 'react';
import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import { isIndexSignatureDeclaration } from 'typescript';



function Cliente() {

    const cliente = {
        id_cliente: 0,
        nome: '',
        cpf_cnpj: '',
        telefone: '',
        endereco: '',
        cep: '',
    }

    const [clientes, setclientes] = useState([]);
    const [objcliente, setObjcliente] = useState(cliente);
    const navigate = useNavigate();

    const adicionar = () => {
        navigate("/cadcliente");
    }


    useEffect(() => {
        fetch('http://localhost:8080/clientes')
            .then(retorno => retorno.json())
            .then(convertido => setclientes(convertido))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }, []);

    const alterar = (indice) => {
        const clienteAlterar = clientes[indice];
        navigate('/editcliente/'+clienteAlterar.id_cliente);
    }


    //excluir 
    const excluir = (indice) => {

        const clienteExcluir = clientes[indice];

        fetch('http://localhost:8080/delcliente/'+clienteExcluir.id_cliente, {
            method:'delete',
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
            const vetorTemp = [...clientes];
            vetorTemp.splice(indice, 1);
            setclientes(vetorTemp);
        })
        .catch(error => console.error('Erro ao excluir cliente:', error));
    }

    const cancelar =() => {
        navigate("/clientes");
    }

    const [ordenacao, setOrdenacao] = useState({
        campo: null,
        tipo: 'asc' 
    });
    const ordenarclientes = (campo) => {
        let ordenacaoAtual = ordenacao.tipo === 'asc' ? 'desc' : 'asc';
        const clientesOrdenados = [...clientes].sort((a, b) => {
            if (ordenacaoAtual === 'asc') {
                    return a[campo] > b[campo] ? 1 : -1;
                } else {
                    return a[campo] < b[campo] ? 1 : -1;
                }
        });
        setclientes(clientesOrdenados);
    setOrdenacao({ campo, tipo: ordenacaoAtual });
    };


    //barra pesquisa 
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const filtrarClientes = (termo) => {
        const termoLowerCase = termo.toLowerCase();
        const clientesFiltrados = clientes.filter((cliente) => {
            return (
                cliente.nome.toLowerCase().includes(termoLowerCase) ||
                cliente.id_cliente.toString().includes(termoLowerCase) ||
                cliente.cpf_cnpj.toLowerCase().includes(termoLowerCase) ||
                cliente.telefone.toLowerCase().includes(termoLowerCase) ||
                cliente.endereco.toLowerCase().includes(termoLowerCase) ||
                cliente.cep.toLowerCase().includes(termoLowerCase) 
            );
        });
        return clientesFiltrados;
    };

    const handlePesquisa = (event) => {
        const termo = event.target.value;
        setTermoPesquisa(termo);
    };

    const clientesFiltrados = filtrarClientes(termoPesquisa);



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
                    <a href="/funcionarios" style={{ textDecoration: 'underline' }} >Gerência</a>
                    <a href="/vendas">Venda</a>
                    <a href="/perfil">Perfil</a>

                </div>
            </header>

            <div className="content">

                <div className="menu">
                    <a href="/funcionarios">Funcionários</a>
                    <a href="/produtos">Produtos</a>
                    <a href="/fornecedores">Fornecedores</a>
                    <a href="/estoques">Entrada estoques</a>
                    <a href="/transportadoras">Transportadoras</a>
                    <a href="/clientes" className="menu_escolhido">Clientes</a>
                </div>

                <div className="main">

                {/* barra pesquisa  */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Pesquisar produto..."
                        value={termoPesquisa}
                        onChange={handlePesquisa}
                    />
                </div>

                    <div className="table-container">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th onClick={() => ordenarclientes('id_cliente')}>Id</th>
                                    <th onClick={() => ordenarclientes('nome')}>Nome</th>
                                    <th onClick={() => ordenarclientes('endereco')}>Endereço</th>
                                    <th onClick={() => ordenarclientes('telefone')}>Telefone</th>
                                    <th onClick={() => ordenarclientes('cep')}>CEP</th>
                                    <th onClick={() => ordenarclientes('cpf_cnpj')}>CPF</th>
                                    <th>Açoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesFiltrados.map((cliente, indice) => (
                                    <tr key={cliente.id_cliente}>
                                        <td>{cliente.id_cliente}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.cep}</td>
                                        <td>{cliente.cpf_cnpj}</td>
                                        <td> 
                                            <button className="btn btn-primary"  onClick={() => alterar(indice)} >Editar</button>
                                            <button className="btn btn-danger"  onClick={() => excluir(indice)} >Deletar</button>
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
