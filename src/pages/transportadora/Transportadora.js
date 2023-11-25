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
        navigate("/cadastroTransportadora");
    };

    useEffect(() => {
        fetch('http://localhost:8080/transportadoras')
            .then(retorno => retorno.json())
            .then(convertido => setTransportadoras(convertido))
            .catch(error => console.error('Erro ao buscar transportadoras:', error));
    }, []);

    const handleExcluirTransportadora = async (transportadoraId) => {
        try {
            const response = await fetch(`http://localhost:8080/transportadoras/delete/${transportadoraId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const novasTransportadoras = transportadoras.filter(f => f.id !== transportadoraId);
                setTransportadoras(novasTransportadoras);
                console.log('Transportadora excluído com sucesso!');
            } else {
                console.error('Erro ao excluir transportadora:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir transportadora:', error);
        }
    };

    const [ordenacao, setOrdenacao] = useState({
        campo: null,
        tipo: 'asc'
    });
    const ordenarTransportadoras = (campo) => {
        let ordenacaoAtual = ordenacao.tipo === 'asc' ? 'desc' : 'asc';
        const transportadorasOrdenadas = [...transportadoras].sort((a, b) => {
            if (ordenacaoAtual === 'asc') {
                return a[campo] > b[campo] ? 1 : -1;
            } else {
                return a[campo] < b[campo] ? 1 : -1;
            }
        });
        setTransportadoras(transportadorasOrdenadas);
        setOrdenacao({ campo, tipo: ordenacaoAtual });
    };


    //barra pesquisa 
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const filtrarTransportadoras = (termo) => {
        const termoLowerCase = termo.toLowerCase();
        const transportadorasFiltradas = transportadoras.filter((transportadora) => {
            return (
                transportadora.id.toString().includes(termoLowerCase) ||
                transportadora.nome.toLowerCase().includes(termoLowerCase) ||
                transportadora.cidade.toString().includes(termoLowerCase) ||
                transportadora.precoKM.toString().includes(termoLowerCase)
            );
        });
        return transportadorasFiltradas;
    };

    const handlePesquisa = (event) => {
        const termo = event.target.value;
        setTermoPesquisa(termo);
    };

    const transportadorasFiltradas = filtrarTransportadoras(termoPesquisa);

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
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Pesquisar transportadora..."
                            value={termoPesquisa}
                            onChange={handlePesquisa}
                        />
                    </div>
                    <div className="table-container">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Cidade</th>
                                    <th>precoKM</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transportadorasFiltradas.map(transportadora => (
                                    <tr key={transportadora.id}>
                                        <td>{transportadora.id}</td>
                                        <td>{transportadora.nome}</td>
                                        <td>{transportadora.cidade}</td>
                                        <td>{transportadora.precoKM}</td>
                                        <td>
                                            <a href={`/transportadoras/edit/${transportadora.id}`} className="btn btn-primary">Editar</a>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <button className="btn btn-danger" onClick={() => handleExcluirTransportadora(transportadora.id)}>Deletar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button onClick={adicionar}>Adicionar</button>
                        <button className="right_btn">Relatório</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Transportadora;
