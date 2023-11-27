import React, { useState, useEffect } from 'react';
import '../../components/css/home.css';
import { useNavigate } from 'react-router-dom';
import Funcionario from '../funcionarios/Funcionario';
import perfil from '../../img/perfil.svg';

function Home() {

    const [quadroAvisos, setQuadroAvisos] = useState({
        funcionario: { nome: '' },
        mensagem: '',
    });

    const [quadroPlantao, setQuadroPlantao] = useState({
        funcionario: { nome: '' },
        mensagem: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuadroAvisos = async (url, setStateFunction) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erro ao obter dados da URL: ${url}`);
                }

                const quadroData = await response.json();
                setStateFunction(quadroData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuadroAvisos('http://localhost:8080/quadroAvisos', setQuadroAvisos);
        fetchQuadroAvisos('http://localhost:8080/quadroPlantao', setQuadroPlantao);
    }, []);

    const atualizarQuadroPlantao = () => {
        navigate(`/atualizarQuadroPlantao`);
    }

    const atualizarQuadroAvisos = () => {
        navigate(`/atualizarQuadroAvisos`);
    }

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
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil" /></a>

                </div>
            </header>

            <div className="box-quadro-avisos">
                <div className='label-qa'>
                    <p>Editado por: {quadroAvisos.funcionario.nome}</p>
                    <button onClick={atualizarQuadroAvisos}>Atualizar</button>
                </div>
                <textarea className='ta-qa' value={quadroAvisos.mensagem} readOnly></textarea>
            </div>
            <div className="box-quadro-plantao">
                <div className='label-qp'>
                    <p>Editado por: {quadroPlantao.funcionario.nome}</p>
                    <button onClick={atualizarQuadroPlantao}>Atualizar</button>
                </div>
                <textarea className='ta-qp' value={quadroPlantao.mensagem} readOnly></textarea>
            </div>
        </>
    );
}

export default Home;
