import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';

function Transportadora() {

    const transportadora = {
        id: 0,
        nome: '',
        cidade: '',
        precoKM: 0.0,
    };

    const [transportadoras, setTransportadoras] = useState([]);
    const [objTransportadora, setObjTransportadora] = useState(transportadora);
    const navigate = useNavigate();

    const adicionar = () => {
        navigate("/cadtransp");
    };

    useEffect(() => {
        fetch('http://localhost:8080/transportadoras')
            .then(retorno => retorno.json())
            .then(convertido => setTransportadoras(convertido))
            .catch(error => console.error('Erro ao buscar transportadoras:', error));
    }, []);

    return (
        <><React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Gerência Transportadora</title>

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
                    <a href="/buscaFunc">Busca</a>
                    <a href="">Venda</a>
                    <a href="/perfil">Perfil</a>
                </div>
            </header>

            <div className="content">

                <div className="menu">
                    <a href="/funcionarios">Funcionários</a>
                    <a href="/produtos">Produtos</a>
                    <a href="/fornecedores">Fornecedores</a>
                    <a href="/estoques">Estoques</a>
                    <a href="/transportadoras" className="menu_escolhido">Transportadoras</a>
                    <a href="/clientes">Clientes</a>
                </div>

                <div className="main">
                    <div className="table-container">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nome</th>
                                    <th>Cidade</th>
                                    <th>precoKM</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transportadoras.map(transportadora => (
                                    <tr key={transportadora.id}>
                                        <td>{transportadora.nome}</td>
                                        <td>{transportadora.cidade}</td>
                                        <td>{transportadora.precoKM}</td>
                                        <td>
                                            <a href={`/transportadoras/edit/${transportadora.id}`} className="btn btn-primary">Atualizar</a>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <a href={`/transportadoras/${transportadora.id}`} className="btn btn-danger">Deletar</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button className="right_btn" onClick={adicionar}>Adicionar</button>
                        <button className="right_btn">Relatório</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Transportadora;
