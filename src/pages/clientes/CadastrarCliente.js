
import React, { useState } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';

function CadastroCliente() {
    const cliente = {
        id_cliente: 0,
        nome: '',
        cpf_cnpj: '',
        telefone: '',
        endereco: '',
        cep: '',
    };

    const [clientes, setClientes] = useState([]);
    const [objcliente, setObjcliente] = useState(cliente);
    const navigate = useNavigate();

    const aoDigitar = (e) => {
        setObjcliente({ ...objcliente, [e.target.name]: e.target.value });
    }

    const cadastrar = () => {
        // Check if any required field is empty
        if (!objcliente.nome || !objcliente.cpf_cnpj || !objcliente.telefone || !objcliente.endereco || !objcliente.cep) {
            alert('Por favor, preencha todos os campos antes de cadastrar o cliente.');
            return;
        }
    
        fetch('http://localhost:8080/cadcliente', {
            method: 'post',
            body: JSON.stringify(objcliente),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {
                setTimeout(() => { window.location.reload(); }, 2000);
            })
            .catch(error => console.error('Erro ao cadastrar cliente:', error));
    
        navigate("/clientes");
    };

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
                        <h1 className="text-center">Cadastrar Novo Cliente</h1>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome:</label>
                                    <input name="nome" type="text" onChange={aoDigitar} className="form-control" placeholder="Nome" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CPF/CNPJ:</label>
                                    <input name="cpf_cnpj" type="text" onChange={aoDigitar} className="form-control" placeholder="CPF/CNPJ" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Telefone:</label>
                                    <input name="telefone" type="text" onChange={aoDigitar} className="form-control" placeholder="Telefone" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Endereço:</label>
                                    <input name="endereco" type="text" onChange={aoDigitar} className="form-control" placeholder="Endereço" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CEP:</label>
                                    <input name="cep" type="text" onChange={aoDigitar} className="form-control" placeholder="CEP" required/>
                                </div>
                            </div>

                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/clientes" className="btn btn-danger">Cancelar</a>
                                    <button type="button" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={cadastrar} required>Cadastrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroCliente;