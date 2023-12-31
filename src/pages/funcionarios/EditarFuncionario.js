import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useParams, useNavigate } from 'react-router-dom';
import perfil from '../../img/perfil.svg';

function EditarFuncionario() {
    const { codigoFuncionario } = useParams();
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState([]);

    const [objFuncionario, setObjFuncionario] = useState({
        id: codigoFuncionario,
        nome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        cep: '',
        senha: '',
    });

    const aoDigitar = (e) => {
        setObjFuncionario({ ...objFuncionario, [e.target.name]: e.target.value });
    }

    const alterar = () => {
        // Check if any field is empty
        const isAnyFieldEmpty = Object.values(objFuncionario).some(value => value === '');
    
        if (isAnyFieldEmpty) {
            return;
        }
    
        fetch('http://localhost:8080/alterarFuncionario', {
            method: 'put',
            body: JSON.stringify(objFuncionario),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {
                // Atualizar o estado local com os dados do funcionário editado
                setFuncionarios(funcionarios.map(f => (f.id === objFuncionario.id ? objFuncionario : f)));
            })
            .catch(error => console.error('Erro ao alterar funcionário:', error));
    
        navigate("/funcionarios");
    };

    useEffect(() => {
        fetch(`http://localhost:8080/funcionarios/edit/${codigoFuncionario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                setObjFuncionario(data);
            })
            .catch((error) => console.error('Erro ao buscar funcionario:', error));
    }, [codigoFuncionario]);


    return (

        <><React.Fragment>

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

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
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil" /></a>
                </div>
            </header>


            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center">Editar Perfil</h1>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome:</label>
                                    <input name="nome" type="text" onChange={aoDigitar}
                                        value={objFuncionario.nome || ''}
                                        className="form-control" placeholder="Nome" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CPF:</label>
                                    <input name="cpf" type="text" onChange={aoDigitar}
                                        value={objFuncionario.cpf || ''} className="form-control" placeholder="CPF" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Telefone:</label>
                                    <input name="telefone" type="text" onChange={aoDigitar}
                                        value={objFuncionario.telefone || ''} className="form-control" placeholder="Telefone" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Endereço:</label>
                                    <input name="endereco" type="text" onChange={aoDigitar}
                                        value={objFuncionario.endereco || ''} className="form-control" placeholder="Endereço" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CEP:</label>
                                    <input name="cep" type="text" onChange={aoDigitar} value={objFuncionario.cep || ''} className="form-control" placeholder="CEP" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Senha:</label>
                                    <input name="senha" type="password" onChange={aoDigitar} value={objFuncionario.senha || ''} className="form-control" placeholder="Senha" required/>
                                </div>
                            </div>

                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/funcionarios" className="btn btn-danger">Cancelar</a>
                                    <span style={{ margin: '0 5px' }}></span>
                                    <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={alterar} required>Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarFuncionario;
