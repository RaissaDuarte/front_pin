import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';

function CadastrarTransportadora() {

    const transportadora = {
        id: 0,
        nome: '',
        cidade: '',
        precoKM: 0.0,
    };

    const [transportadoras, setTransportadoras] = useState([]);
    const [objTransportadora, setObjTransportadora] = useState(transportadora);
    const navigate = useNavigate();

    const aoDigitar = (e) => {
        setObjTransportadora({ ...objTransportadora, [e.target.name]: e.target.value });
    };

    const cadastrar = () => {
        // Check if any required field is empty
        if (!objTransportadora.nome || !objTransportadora.cidade || !objTransportadora.precoKM) {
            alert('Por favor, preencha todos os campos antes de cadastrar a transportadora.');
            return;
        }
    
        fetch('http://localhost:8080/cadastroTransportadora', {
            method: 'post',
            body: JSON.stringify(objTransportadora),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retornoConvertido => {
                // Handle the response if needed
            })
        navigate("/transportadoras");
    };

    return (
        <><React.Fragment>

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Cadastrar Transportadora</title>

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
                        <h1 className="text-center">Cadastrar Nova Transportadora</h1>
                        <form>
                            <div className="form-group">
                                <label>Nome:</label>
                                <input name="nome" type="text" onChange={aoDigitar} className="form-control" placeholder="Nome" required/>
                            </div>

                            <div className="form-group">
                                <label>Cidade:</label>
                                <input name="cidade" type="text" onChange={aoDigitar} className="form-control" placeholder="Cidade" required/>
                            </div>

                            <div className="form-group">
                                <label>Preço por KM:</label>
                                <input name="precoKM" type="text" onChange={aoDigitar} className="form-control" placeholder="Preço por KM" required/>
                            </div>
                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/transportadoras" className="btn btn-danger" style={{ fontSize: '1em', width: '150px' }}>Cancelar</a>
                                    <span style={{ margin: '0 5px' }}></span>
                                    <button type="button" id="btn-cadastrar" className="right_btn btn btn-primary" style={{ fontSize: '1em', width: '150px' }} onClick={cadastrar} required >Cadastrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastrarTransportadora;
