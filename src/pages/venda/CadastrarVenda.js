import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';

function CadastroVenda() {

    const [venda, setVenda] = useState({
        cliente: '',
        desconto: 0,
        valorTotal: 0,
        itensVenda: [],
    });
    const [itemSelecionado, setItemSelecionado] = useState({
        produto: '',
        quantidade: 0,
    });

    const itemVenda = {
        id_venda: 0,
        produto: null,
        venda: null,
        quantidade: 0,
    }

    const [objvenda, setObjvenda] = useState(venda);
    const navigate = useNavigate();

    const [itensVenda, setItensVenda] = useState([]);
    const [objitvenda, setObjitvenda] = useState(itemVenda);

    const aoDigitar = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        if (name === 'cliente') {
            setVenda({ ...venda, cliente: value });
        } else if (name === 'desconto') {
            setVenda({ ...venda, desconto: parseFloat(value) });
        } else if (name === 'valor') {
            setVenda({ ...venda, valorTotal: parseFloat(value) });
        } 
    };


    //cadastrar 
    const criarVenda = async () => {
        try {
            const dadosVenda = {
                cliente: venda.cliente.id_cliente,
                desconto: null,
                valorTotal: null,
                itensVenda: itensVenda,
            };

            const response = await fetch('http://localhost:8080/cadvenda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosVenda),
            });

            if (response.ok) {
                navigate("/vendas");
            } else {
                console.error('Erro ao criar a venda');
            }
        } catch (error) {
            console.error('Erro ao criar a venda:', error);
        }
    };

    const cancelar = () => {
        navigate("/vendas");
    }

    //popula cliente
    const [clientes, setClientes] = useState([]);

useEffect(() => {
    fetch('http://localhost:8080/clientes')
        .then(retorno => retorno.json())
        .then(convertido => setClientes(convertido))
        .catch(error => console.error('Erro ao buscar clientes:', error));
}, []);

    //popula produtos 
    const [produtos, setProdutos] = useState([]);

useEffect(() => {
    fetch('http://localhost:8080/produtos')
        .then(retorno => retorno.json())
        .then(convertido => setProdutos(convertido))
        .catch(error => console.error('Erro ao buscar produtos:', error));
}, []);

const adicionarItem = () => {
    const produtoSelecionado = produtos.find(prod => prod.id === itemSelecionado.produto);
        if (produtoSelecionado && itemSelecionado.quantidade > 0) {
            const novoItem = {
                produto: produtoSelecionado,
                quantidade: itemSelecionado.quantidade,
            };
            setItensVenda([...itensVenda, novoItem]);
            const valorTotalAtualizado = venda.valorTotal + (produtoSelecionado.valor * itemSelecionado.quantidade);
            setVenda({ ...venda, valorTotal: valorTotalAtualizado });
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

            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="card w-100">
                    <div className="card-body">
                        <h1 className="text-center">Cadastrar Nova Venda</h1>
                        <form>
                            <div className="row justify-content-between">
                                
                                <div className="col-lg-8">
                                    <select name="cliente" onChange={aoDigitar} className="form-control">
                                        <option key="default" value="">Selecione o cliente</option>
                                        {clientes.map(cliente => (
                                            <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.nome}</option>
                                        ))}
                                    </select>

                                    <div className="form-group col-md-6">
                                        <label>Desconto:</label>
                                        <input name="desconto" type="text" onChange={aoDigitar} className="form-control" placeholder="R$" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Valor Total da Venda:</label>
                                        <input name="valor" type="text" onChange={aoDigitar} className="form-control" placeholder="Valor" />
                                    </div>

                                    <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={criarVenda}>Salvar</button>
                                    
                                </div>
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

export default CadastroVenda;
