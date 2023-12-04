import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';



function Entrada() {


    //popula produtos 
    const [produtos, setProdutos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

useEffect(() => {
    fetch('http://localhost:8080/produtos')
        .then(retorno => retorno.json())
        .then(convertido => setProdutos(convertido))
        .catch(error => console.error('Erro ao buscar produtos:', error));
}, []);
    
const aoSelecionarProduto = event => {
    setSelectedProduct(event.target.value);
};

const aoDigitarQuantidade = event => {
    setQuantidade(event.target.value);
};

const aoDigitarValor = event => {
    setValor(event.target.value);
};

const criarEntradaEstoque = event => {
    event.preventDefault();

    if (selectedProduct && quantidade && valor) {
        fetch('http://localhost:8080/entradaestoque', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // id_produto: selectedProduct,
                quantidade: parseInt(quantidade),
                valor: parseFloat(valor),
            }),
        })
            .then(response => {
                console.log('URL utilizada na requisição:', response.url);

                if (response.ok) {
                        setSelectedProduct('');
                        setQuantidade('');
                        setValor('');
                    console.log('Entrada de estoque registrada com sucesso!');
                } else {
                    console.error('Erro ao registrar entrada de estoque.');
                }
            })
            .catch(error => console.error('Erro ao registrar entrada de estoque:', error));
    } else {
        console.error('Por favor, preencha todos os campos.');
    }
};


    return (

        <><React.Fragment>

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Nova Venda</title>

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
                    <div className="card-body">
                        <h1 className="text-center">Entrada de produtos</h1>
                        <form>
                            <div className="row justify-content-between">
                                
                                    <select name="produto" onChange={aoSelecionarProduto} className="form-control">
                                        <option key="default" value="">Selecione o produto</option>
                                        {produtos.map(produto => (
                                            <option key={produto.id_produto} value={produto.id_produto}>{produto.nome}</option>
                                        ))}
                                    </select>

                                    <div className="form-group col-md-6">
                                        <label>Quantidade:</label>
                                        <input name="quantidade" type="text" onChange={aoDigitarQuantidade} className="form-control" placeholder="R$" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Valor Unitário:</label>
                                        <input name="valor" type="text" onChange={aoDigitarValor} className="form-control" placeholder="Valor" />
                                    </div>

                                    <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={criarEntradaEstoque}>Salvar</button>
                                    
                            </div>
                            
                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/vendas" className="btn btn-danger">Cancelar</a>
                                    {/* <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={cadastrar}>mudar</button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Entrada;
