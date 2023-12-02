import React, { useState, useEffect } from 'react';
import '../../components/css/perfil.css';
import { useParams, useNavigate } from 'react-router-dom';
import perfil from '../../img/perfil.svg';
import { useAuth } from '../../context/AuthContext';

function Perfil() {
    const { codigoFuncionario } = useParams();
    const navigate = useNavigate();
    const { funcionarioLogado } = useAuth();

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
    };

    const carregarDetalhesFuncionario = (id) => {
        fetch(`http://localhost:8080/obterFuncionarioPorId/${codigoFuncionario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                setObjFuncionario({
                    id: data.id,
                    nome: data.nome || '',
                    cpf: data.cpf || '',
                    telefone: data.telefone || '',
                    endereco: data.endereco || '',
                    cep: data.cep || '',
                    senha: data.senha || '',
                });
            })
            .catch((error) => console.error('Erro ao buscar funcionario:', error));
    };

    const alterar = () => {
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
                setObjFuncionario(retorno_convertido);
                setTimeout(() => { window.location.reload(); }, 2000);
            })
            .catch(error => console.error('Erro ao alterar funcionário:', error));
        navigate("/funcionarios");
    };

    useEffect(() => {
        if (funcionarioLogado) {
            setObjFuncionario((prevFuncionario) => ({
                ...prevFuncionario,
                nome: funcionarioLogado.nome || '',
                cpf: funcionarioLogado.cpf || '',
                telefone: funcionarioLogado.telefone || '',
                endereco: funcionarioLogado.endereco || '',
                cep: funcionarioLogado.cep || '',
                senha: funcionarioLogado.senha || '',
            }));
        } else {
            // Assuming `codigoFuncionario` is available in the component
            carregarDetalhesFuncionario(codigoFuncionario);
        }
    }, [codigoFuncionario, funcionarioLogado]);
    


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
            <link rel="stylesheet" href="/css/perfil.css" />

        </React.Fragment>

            <header className="headerGeneric">
                <div className="logo_name">
                    <p>TemDTudo</p>
                </div>
                <div className="link_pages">
                    <a href="/home">Home</a>
                    <a href="/funcionarios">Gerência</a>
                    <a href="">Venda</a>
                    <a href="/perfil" style={{ textDecoration: 'underline' }}><img src={perfil} alt="Icone Perfil" /></a>
                </div>
            </header>

            <div className="content">

                <div className="menu">
                    <a className="menu_escolhido">Perfil</a>
                    <a href="/home">Grade Horária</a>
                    <a href="/" className='sair'>Sair</a>
                </div>

                <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">Editar Funcionário</h1>
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nome:</label>
                                        <input
                                            name="nome"
                                            type="text"
                                            onChange={aoDigitar}
                                            value={objFuncionario.nome || ''}
                                            className="form-control"
                                            placeholder="Nome"
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>CPF:</label>
                                        <input name="cpf" type="text" onChange={aoDigitar}
                                            value={objFuncionario.cpf || ''} className="form-control" placeholder="CPF" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Telefone:</label>
                                        <input name="telefone" type="text" onChange={aoDigitar}
                                            value={objFuncionario.telefone} className="form-control" placeholder="Telefone" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Endereço:</label>
                                        <input name="endereco" type="text" onChange={aoDigitar}
                                            value={objFuncionario.endereco} className="form-control" placeholder="Endereço" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>CEP:</label>
                                        <input name="cep" type="text" onChange={aoDigitar} value={objFuncionario.cep || ''} className="form-control" placeholder="CEP" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Senha:</label>
                                        <input name="senha" type="password" onChange={aoDigitar} value={objFuncionario.senha || ''} className="form-control" placeholder="Senha" />
                                    </div>
                                </div>

                                <div className="box-footer">
                                    <div className="gerencia_btns">
                                        <a href="/funcionarios" className="btn btn-danger">Cancelar</a>
                                        <span style={{ margin: '0 5px' }}></span>
                                        <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={alterar}>Salvar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Perfil;
