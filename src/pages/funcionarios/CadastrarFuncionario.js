import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import perfil from '../../img/perfil.svg';

function CadastroFuncionario() {
    const funcionarioInicial = {
        id: 0,
        nome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        cep: '',
        senha: '',
    };

    const [objFuncionario, setObjFuncionario] = useState(funcionarioInicial);
    const [funcionarios, setFuncionarios] = useState([]);
    const navigate = useNavigate();

    const aoDigitar = (e) => {
        if (e.target.name === 'cpf') {
            formatarCPF(e.target.value);
        } else {
            setObjFuncionario({ ...objFuncionario, [e.target.name]: e.target.value });
        }
    }

    const formatarCPF = (input) => {
        const numericValue = input.replace(/\D/g, '');
        const truncatedValue = numericValue.slice(0, 11);
        const maskedValue = truncatedValue.replace(
            /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
            (_, g1, g2, g3, g4) => {
                let result = '';
                if (g1) result += g1 + (g2 ? '.' : '');
                if (g2) result += g2 + (g3 ? '.' : '');
                if (g3) result += g3;
                if (g4) result += '-' + g4;
                return result;
            }
        );
        setObjFuncionario({ ...objFuncionario, cpf: maskedValue });
    };

    const listarTodosFuncionarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/funcionarios');
            if (!response.ok) {
                throw new Error('Error fetching funcionarios');
            }
            const data = await response.json();
            setFuncionarios(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Fetch data when the component mounts
        listarTodosFuncionarios();
    }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

    const cadastrar = () => {
        fetch('http://localhost:8080/cadastroFuncionario', {
            method: 'post',
            body: JSON.stringify(objFuncionario),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(async retorno => {
                if (retorno.ok) {
                    const retornoConvertido = await retorno.json();
                    // Atualizar o estado local com o novo funcionário
                    setFuncionarios([...funcionarios, retornoConvertido]);
                    navigate("/funcionarios");
                } else {
                    const mensagemErro = await retorno.text();
                    alert(mensagemErro);
                }
            })
            .catch(error => console.error('Erro ao cadastrar funcionário:', error));
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
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil" /></a>
                </div>
            </header>


            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center">Cadastrar Novo Funcionário</h1>
                        <form onSubmit={(e) => { e.preventDefault(); cadastrar(); }}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome:</label>
                                    <input name="nome" type="text" onChange={aoDigitar} className="form-control" placeholder="Nome" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CPF:</label>
                                    <input name="cpf" type="text" onChange={aoDigitar} value={objFuncionario.cpf} className="form-control" placeholder="CPF" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Telefone:</label>
                                    <input name="telefone" type="text" onChange={aoDigitar} className="form-control" placeholder="Telefone" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Endereço:</label>
                                    <input name="endereco" type="text" onChange={aoDigitar} className="form-control" placeholder="Endereço" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CEP:</label>
                                    <input name="cep" type="text" onChange={aoDigitar} className="form-control" placeholder="CEP" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Senha:</label>
                                    <input name="senha" type="password" onChange={aoDigitar} className="form-control" placeholder="Senha" required />
                                </div>
                            </div>

                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/funcionarios" className="btn btn-danger">Cancelar</a>
                                    <span style={{ margin: '0 5px' }}></span>
                                    <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary">Cadastrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroFuncionario;
