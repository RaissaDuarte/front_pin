import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        fetch('http://localhost:8080/cadtransp', {
            method: 'post',
            body: JSON.stringify(objTransportadora),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retornoConvertido => {

            })
        navigate("/transportadoras")
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
                    <a href="{{url('buscaFunc')}}">Busca</a>
                    <a href="">Venda</a>
                    <a href="{{url('perfil')}}"><img src="/img/user.svg" alt="Icone Perfil Abstrato" /></a>
                </div>
            </header>

            <div className="container">
                <div className="row">
                    <h1 className="text-center">Cadastrar Transportadora</h1>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Nome:</label>
                                <input name="nome" type="text" onChange={aoDigitar} className="form-control" placeholder="Nome" />
                            </div>

                            <div className="form-group">
                                <label>Cidade:</label>
                                <input name="cidade" type="text" onChange={aoDigitar} className="form-control" placeholder="Cidade" />
                            </div>

                            <div className="form-group">
                                <label>Preço por KM:</label>
                                <input name="precoKM" type="text" onChange={aoDigitar} className="form-control" placeholder="Preço por KM" />
                            </div>

                            <div className="box-footer">
                                <a href="/transportadoras" className="btn btn-danger">Cancelar</a>
                                <button type="button" id="btn-cadastrar" className="btn btn-primary" onClick={cadastrar}>Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastrarTransportadora;
