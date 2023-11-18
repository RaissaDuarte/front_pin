import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [quadroAvisos, setQuadroAvisos] = useState({});
    const [quadroPlantao, setQuadroPlantao] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Lógica para buscar os dados do quadro de avisos
        fetch('http://localhost:8080/quadroAvisos')
            .then(retorno => retorno.json())
            .then(dadosQuadroAvisos => setQuadroAvisos(dadosQuadroAvisos))
            .catch(error => console.error('Erro ao buscar quadro de avisos:', error));

        // Lógica para buscar os dados do quadro de plantão
        fetch('http://localhost:8080/quadroPlantao')
            .then(retorno => retorno.json())
            .then(dadosQuadroPlantao => setQuadroPlantao(dadosQuadroPlantao))
            .catch(error => console.error('Erro ao buscar quadro de plantão:', error));
    }, []);

    return (
        <>
            {/* Seu código HTML existente */}

            <div className="main">
                {/* Seu conteúdo existente */}

                <div className="quadro-container">
                    <div className="quadro">
                        <h2>Quadro de Avisos</h2>
                        <p>{quadroAvisos.mensagem}</p>
                        {/* Adicione qualquer outra informação do quadro de avisos que desejar */}
                    </div>

                    <div className="quadro">
                        <h2>Quadro de Plantão</h2>
                        <p>{quadroPlantao.mensagem}</p>
                        {/* Adicione qualquer outra informação do quadro de plantão que desejar */}
                    </div>
                </div>
            </div>

            {/* Seu código HTML existente */}
        </>
    );
}

export default Home;
