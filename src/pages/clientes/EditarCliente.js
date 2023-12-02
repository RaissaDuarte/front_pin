import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate, useParams, Link  } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';


function Editarcliente() {
    const { idFuncionario } = useParams();
    const { codigocliente } = useParams();
    const navigate = useNavigate();
    const [clientes, setclientes] = useState([]);

    const [objcliente, setObjcliente] = useState({
        id_cliente: codigocliente,
        id_cliente: codigocliente,
        nome: null,
        cpf_cnpj: null,
        telefone: null,
        endereco: null,
        cep: null,
    });

    const aoDigitar = (e) => {
        setObjcliente({ ...objcliente, [e.target.name]: e.target.value });
    }

    const cancelar = () => {
        navigate('/clientes');
    }

    //alterar 
    const alterar = () => {
        fetch('http://localhost:8080/alterarcliente', {
            method: 'put',
            body: JSON.stringify(objcliente),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {

                let vetorTemp = [...clientes];
                let indice = vetorTemp.findIndex((p) => {
                    return p.id_cliente === objcliente.id_cliente;
                });
                vetorTemp[indice] = objcliente;
                setclientes(vetorTemp);

                setTimeout(() => { window.location.reload(); }, 2000);
            })
            .catch(error => console.error('Erro ao alterar cliente:', error));
        navigate("/clientes");

    }

    useEffect(() => {
        fetch('http://localhost:8080/clientes/' + codigocliente, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
        })
            .then((response) => response.json())
            .then((data) => {
                setObjcliente(data);
            })
            .catch((error) => console.error('Erro ao buscar cliente:', error));
    }, [codigocliente]);



    return (
        <> <React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Gerência Clientes</title>

            {/* Fontes do google */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet" />

            {/* CSS Bootstrap */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <link rel="stylesheet" href="/css/gerencia.css" />
        </React.Fragment>


        <header className="headerGeneric">
                <div className="logo_name">
                    <p>TemDTudo</p>
                </div>
                <div className="link_pages">
                    <Link to={`/home/${idFuncionario}`}>Home</Link>
                    <Link to={`/funcionarios`} style={{ textDecoration: 'underline' }}>Gerência</Link>
                    <Link to="">Venda</Link>
                    <Link to={`/perfil`}><img src={perfil} alt="Icone Perfil" /></Link>
                </div>
            </header>

            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="card">
                    <div className="card-body">                        
                    <h1 className="text-center">Editar Clientes</h1>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome:</label>
                                    <input name="nome" type="text" onChange={aoDigitar} value={objcliente.nome || ''} className="form-control" placeholder="Nome" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CPF/CNPJ:</label>
                                    <input name="cpf_cnpj" type="text" onChange={aoDigitar} value={objcliente.cpf_cnpj || ''} className="form-control" placeholder="CPF/CNPJ" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Telefone:</label>
                                    <input name="telefone" type="text" onChange={aoDigitar} value={objcliente.telefone || ''} className="form-control" placeholder="Telefone" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Endereço:</label>
                                    <input name="endereco" type="text" onChange={aoDigitar} value={objcliente.endereco || ''} className="form-control" placeholder="Endereço" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CEP:</label>
                                    <input name="cep" type="text" onChange={aoDigitar} value={objcliente.cep || ''} className="form-control" placeholder="CEP" />
                                </div>
                            </div>

                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <button type="submit" id="btn-cancelar" className="btn btn-danger" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" id="btn-alterar" className="right_btn btn btn-primary" onClick={alterar}>Atualizar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Editarcliente;
