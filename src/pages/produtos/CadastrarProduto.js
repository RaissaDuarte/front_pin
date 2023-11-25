import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';

function CadastroProduto() {

    const produto = {
        id: 0,
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


    const aoDigitar = (e) => {
        console.log(e.target);
        setObjProduto({ ...objProduto, [e.target.name]: e.target.value });

    }

    //cadastrar 
    const cadastrar = () => {
        fetch('http://localhost:8080/cadprod', {
            method: 'post',
            body: JSON.stringify(objProduto),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {

            })
        navigate("/produtos");
    }

    const cancelar = () => {
        navigate("/produtos");
    }



    return (

        <><React.Fragment>

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Gerência Produtos</title>

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
                    <a href="">Venda</a>
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil"/></a>
                </div>
            </header>

            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center">Cadastrar Novo Produto</h1>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome:</label>
                                    <input name="nome" type="text" onChange={aoDigitar} className="form-control" placeholder="Nome" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Peso:</label>
                                    <input name="peso" type="text" onChange={aoDigitar} className="form-control" placeholder="Peso(kgs)" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Dimensão:</label>
                                    <input name="dimensao" type="text" onChange={aoDigitar} className="form-control" placeholder="Dimensão(mt3)" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Quantidade:</label>
                                    <input name="quantidade" type="text" onChange={aoDigitar} className="form-control" placeholder="Quantidade" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Valor:</label>
                                    <input name="valor" type="text" onChange={aoDigitar} className="form-control" placeholder="Valor" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Imagem:</label>
                                    <input name="imagem" type="text" onChange={aoDigitar} className="form-control" placeholder="Imagem" />
                                </div>
                            </div>


                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/produtos" className="btn btn-danger">Cancelar</a>
                                    <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={cadastrar}>Cadastrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroProduto;
