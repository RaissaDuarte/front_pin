import React, { useState, useEffect } from 'react';
import '../../components/css/home.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import perfil from '../../img/perfil.svg';

const Home = () => {
    const { idFuncionario } = useParams();
    const navigate = useNavigate();
    const { funcionario } = useAuth();

    const [quadroAvisos, setQuadroAvisos] = useState({
        funcionario: { nome: '' },
        mensagem: '',
    });

    const [quadroPlantao, setQuadroPlantao] = useState({
        funcionario: { nome: '' },
        mensagem: '',
    });

    useEffect(() => {
        const fetchQuadro = async (url, setStateFunction) => {
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

        fetchQuadro('http://localhost:8080/quadroAvisos', setQuadroAvisos);
        fetchQuadro('http://localhost:8080/quadroPlantao', setQuadroPlantao);
    }, []);

    const handleUpdate = (type) => {
        if (type === 'avisos') {
            navigate(`/atualizarQuadroAvisos/${idFuncionario}`);
        } else if (type === 'plantao') {
            navigate(`/atualizarQuadroPlantao/${idFuncionario}`);
        }
    };


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
                    <Link to={`/home/${idFuncionario}`} style={{ textDecoration: 'underline' }}>Home</Link>
                    <Link to={`/funcionarios`}>Gerência</Link>
                    <Link to="">Venda</Link>
                    <Link to={`/perfil`}><img src={perfil} alt="Icone Perfil" /></Link>
                </div>
            </header>

            <div className="box-quadro-avisos">
                <div className='label-qa'>
                    <p>Editado por: {quadroAvisos.funcionario.nome}</p>
                    <button onClick={() => handleUpdate('avisos')}>Atualizar</button>
                </div>
                <textarea className='ta-qa' value={quadroAvisos.mensagem} readOnly></textarea>
            </div>
            <div className="box-grade-horaria">
                <p>Grade Horária</p>
            </div>
            <div className="box-quadro-plantao">
                <div className='label-qp'>
                    <p>Editado por: {quadroPlantao.funcionario.nome}</p>
                    <button onClick={() => handleUpdate('plantao')}>Atualizar</button>
                </div>
                <textarea className='ta-qp' value={quadroPlantao.mensagem} readOnly></textarea>
            </div>
        </>
    );
}

export default Home;