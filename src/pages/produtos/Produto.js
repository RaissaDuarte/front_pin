//import React from 'react';
import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';
import { isIndexSignatureDeclaration } from 'typescript';
import produtoPdf from '../../relatorio/PdfProduto';


function Produto() {

    const produto = {
        id_produto: 0,
        nome: '',
        peso: 0.0,
        dimensao: 0.0,
        quantidade: 0.0,
        valor: 0.0,
        imagem: '',
    }

    const [produtos, setProdutos] = useState([]);
    const [objProduto, setObjProduto] = useState(produto);
    const navigate = useNavigate();

    const adicionar = () => {
        navigate("/cadprod");
    }


    useEffect(() => {
        fetch('http://localhost:8080/produtos')
            .then(retorno => retorno.json())
            .then(convertido => setProdutos(convertido))
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }, []);

    const alterar = (indice) => {
        const produtoAlterar = produtos[indice];
        navigate('/editprod/' + produtoAlterar.id_produto);
    }


    //excluir 
    const excluir = (indice) => {

        const produtoExcluir = produtos[indice];

        const confirmacao = window.confirm('Tem certeza que deseja excluir este produto?');
        if (confirmacao){
        fetch('http://localhost:8080/delprod/' + produtoExcluir.id_produto, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
            const vetorTemp = [...produtos];
            vetorTemp.splice(indice, 1);
            setProdutos(vetorTemp);
        })
        .catch(error => console.error('Erro ao excluir produto:', error));
    }
    }

    const [ordenacao, setOrdenacao] = useState({
        campo: null,
        tipo: 'asc'
    });
    const ordenarProdutos = (campo) => {
        let ordenacaoAtual = ordenacao.tipo === 'asc' ? 'desc' : 'asc';
        const produtosOrdenados = [...produtos].sort((a, b) => {
            if (ordenacaoAtual === 'asc') {
                return a[campo] > b[campo] ? 1 : -1;
            } else {
                return a[campo] < b[campo] ? 1 : -1;
            }
        });
        setProdutos(produtosOrdenados);
        setOrdenacao({ campo, tipo: ordenacaoAtual });
    };


    //barra pesquisa 
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const filtrarProdutos = (termo) => {
        const termoLowerCase = termo.toLowerCase();
        const produtosFiltrados = produtos.filter((produto) => {
            return (
                produto.nome.toLowerCase().includes(termoLowerCase) ||
                produto.id_produto.toString().includes(termoLowerCase) ||
                produto.dimensao.toString().includes(termoLowerCase) ||
                produto.peso.toString().includes(termoLowerCase) ||
                produto.quantidade.toString().includes(termoLowerCase) ||
                produto.valor.toString().includes(termoLowerCase)
            );
        });
        return produtosFiltrados;
    };

    const handlePesquisa = (event) => {
        const termo = event.target.value;
        setTermoPesquisa(termo);
    };

    const produtosFiltrados = filtrarProdutos(termoPesquisa);


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
                    <a href="/vendas">Venda</a>
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil"/></a>

                </div>
            </header>

            <div className="content">

                <div className="menu">
                    <a href="/funcionarios">Funcionários</a>
                    <a href="/produtos" className="menu_escolhido">Produtos</a>
                    <a href="/fornecedores">Fornecedores</a>
                    <a href="/estoques">Entrada estoques</a>
                    <a href="/transportadoras">Transportadoras</a>
                    <a href="/clientes">Clientes</a>
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
                                    <th onClick={() => ordenarProdutos('id_produto')}>ID</th>
                                    <th>Imagem</th>
                                    <th onClick={() => ordenarProdutos('nome')}>Nome</th>
                                    <th onClick={() => ordenarProdutos('quantidade')}>Quantidade</th>
                                    <th onClick={() => ordenarProdutos('valor')}>Valor</th>
                                    <th onClick={() => ordenarProdutos('peso')}>Peso</th>
                                    <th onClick={() => ordenarProdutos('dimensao')}>Dimensão</th>
                                    <th>Açoes</th>
                                </tr>
                            </thead>
                            <tbody>
                            {produtosFiltrados.map((produto, indice) => (
                                    <tr key={produto.id_produto}>
                                        <td>{produto.id_produto}</td>
                                        <td><img src={`data:image/jpeg;base64,${produto.imagem}`} alt="Imagem do Produto" /></td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.quantidade}</td>
                                        <td>{produto.valor}</td>
                                        <td>{produto.peso}</td>
                                        <td>{produto.dimensao}</td>
                                        <td> 
                                            <button className="btn btn-primary"  onClick={() => alterar(indice)} >Editar</button>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <button className="btn btn-danger"  onClick={() => excluir(indice)} >Deletar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button onClick={adicionar}>Adicionar</button>
                        <button className="right_btn" onClick = {(e) => produtoPdf(produtos)} >Relatório</button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Produto;
