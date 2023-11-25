import React, { useState, useEffect } from 'react';
import '../../components/css/home.css';
import { useNavigate } from 'react-router-dom';
import Funcionario from '../funcionarios/Funcionario';

function Home() {
    const [quadroAvisos, setQuadroAvisos] = useState({
        funcionario: { nome: '' }, // ajuste conforme a estrutura real do objeto
        mensagem: '',
    });

    const navigate = useNavigate();

    const editarQuadroAvisos = () => {
        navigate("/editQuadroAvisos");
    }

    useEffect(() => {
        fetch('http://localhost:8080/home')
            .then(retorno => retorno.json())
            .then(convertido => setQuadroAvisos(convertido))
            .catch(error => console.error('Erro ao buscar home:', error));
    }, []);

    return (
        <><React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Gerência Funcionário</title>

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
            <link rel="stylesheet" href="/css/home.css" />

        </React.Fragment>

            <header className="headerGeneric">
                <div className="logo_name">
                    <p>TemDTudo</p>
                </div>
                <div className="link_pages">
                    <a href="/home" style={{ textDecoration: 'underline' }}>Home</a>
                    <a href="/funcionarios">Gerência</a>
                    <a href="">Venda</a>
                    <a href="/perfil">Perfil</a>

                </div>
            </header>

            <div className="box-quadro-avisos">
                <div className="d-flex justify-content-between align-items-end">
                    <div className="box-mensagem-avisos">
                        <p>Editado por:
                        <span className="funcionario-nome">{quadroAvisos.funcionario.nome}</span>

                        </p>

                        <textarea
                            name="quadroAvisos"
                            id="quadroAvisos"
                            value={quadroAvisos.mensagem}
                            placeholder="Deixe aqui um Aviso"
                            readOnly
                        ></textarea>
                    </div>
                    <a onClick={editarQuadroAvisos}>Atualizar</a>
                </div>
            </div>
        </>
    );
}

export default Home;
