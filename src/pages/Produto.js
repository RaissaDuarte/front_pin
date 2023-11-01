//import React from 'react';
import React, { useState, useEffect } from 'react';
import '../components/css/gerencia.css';


function Produto (){

    const produto = {
        id_produto: 0,
        nome: '',
        peso: 0.0,
        dimensao: 0.0,
        quantidade: 0.0,
        valor: 0.0,
        imagem:'',
    }

    const [produtos, setProdutos] = useState([]);
    const [objProduto, setObjProduto] = useState(produto);


    useEffect(() => {
        fetch('http://localhost:8080/produtos')
        .then(retorno => retorno.json())
        .then(convertido => setProdutos(convertido))
        .catch(error => console.error('Erro ao buscar produtos:', error));
    }, []);

    //obtendo dados 
    const aoDigitar = (e) => {
        console.log(e.target);
    }


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
                    <a href="/perfil"><img src="src/components/img/user.svg" alt="Icone Perfil Abstrato" /></a>
                </div>
            </header>

            <div className="content">

                <div className="menu">
                    <a href="/funcionarios">Funcionários</a>
                    <a href="/gerenciaProd" className="menu_escolhido">Produtos</a>
                    <a href="/gerenciaFornec">Fornecedores</a>
                    <a href="/gerenciaEstoq">Estoque</a>
                    <a href="/transportadoras">Transportadora</a>
                    <a href="/gerenciaCliente">Cliente</a>
                </div>

                <div className="main">
                    <div className="table-container">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Imagem</th>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                    <th>Peso</th>
                                    <th>Dimensao</th>
                                    <th>Açoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map(produto => (
                                    <tr key={produto.id_produto}>
                                        <td>{produto.id_produto}</td>
                                        <td><img src={`data:image/jpeg;base64,${produto.imagem}`} alt="Imagem do Produto" /></td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.quantidade}</td>
                                        <td>{produto.valor}</td>
                                        <td>{produto.peso}</td>
                                        <td>{produto.dimensao}</td>
                                        <td> 
                                            <a href={`/produtos/edit/${produto.Fragmentid_produto}`} className="btn btn-primary">Atualizar</a>
                                            <a href={`/produtos/${produto.id_produto}`} className="btn btn-danger">Deletar</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <a href="/funcionarios/new">Adicionar</a>
                        <button className="right_btn">Relatório</button>
                    </div>
                </div>
            </div>
        </> 
);
}


export default Produto;
