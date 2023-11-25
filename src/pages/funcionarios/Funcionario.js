import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';

function Funcionario() {

    const funcionario = {
        id: 0,
        nome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        cep: '',
        senha: '',
    };

    const [funcionarios, setFuncionarios] = useState([]);
    const [objFuncionario, setObjFuncionario] = useState(funcionario);
    const navigate = useNavigate();

    const adicionar = () => {
        navigate("/cadastroFuncionario");
    };

    useEffect(() => {
        fetch('http://localhost:8080/funcionarios')
            .then(retorno => retorno.json())
            .then(convertido => setFuncionarios(convertido))
            .catch(error => console.error('Erro ao buscar funcionarios:', error));
    }, []);

    const handleExcluirFuncionario = async (funcionarioId) => {
        try {
            const response = await fetch(`http://localhost:8080/funcionarios/delete/${funcionarioId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const novosFuncionarios = funcionarios.filter(f => f.id !== funcionarioId);
                setFuncionarios(novosFuncionarios);
                console.log('Fornecedor excluído com sucesso!');
            } else {
                console.error('Erro ao excluir funcionario:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir funcionario:', error);
        }
    };

    const [ordenacao, setOrdenacao] = useState({
        campo: null,
        tipo: 'asc'
    });
    const ordenarFuncionarios = (campo) => {
        let ordenacaoAtual = ordenacao.tipo === 'asc' ? 'desc' : 'asc';
        const funcionariosOrdenados = [...funcionarios].sort((a, b) => {
            if (ordenacaoAtual === 'asc') {
                return a[campo] > b[campo] ? 1 : -1;
            } else {
                return a[campo] < b[campo] ? 1 : -1;
            }
        });
        setFuncionarios(funcionariosOrdenados);
        setOrdenacao({ campo, tipo: ordenacaoAtual });
    };


    //barra pesquisa 
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const filtrarFuncionarios = (termo) => {
        const termoLowerCase = termo.toLowerCase();
        const funcionariosFiltrados = funcionarios.filter((funcionario) => {
            return (
                funcionario.nome.toLowerCase().includes(termoLowerCase) ||
                funcionario.id.toString().includes(termoLowerCase) ||
                funcionario.cpf.toString().includes(termoLowerCase) ||
                funcionario.telefone.toString().includes(termoLowerCase) ||
                funcionario.cep.toString().includes(termoLowerCase) ||
                funcionario.senha.toString().includes(termoLowerCase)
            );
        });
        return funcionariosFiltrados;
    };

    const handlePesquisa = (event) => {
        const termo = event.target.value;
        setTermoPesquisa(termo);
    };

    const funcionariosFiltrados = filtrarFuncionarios(termoPesquisa);

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
                    <a href="/funcionarios" className="menu_escolhido">Funcionários</a>
                    <a href="/produtos">Produtos</a>
                    <a href="/fornecedores">Fornecedores</a>
                    <a href="/estoques">Estoques</a>
                    <a href="/transportadoras">Transportadoras</a>
                    <a href="/clientes">Clientes</a>
                </div>

                <div className="main">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Pesquisar funcionário..."
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
                                    <th>CPF</th>
                                    <th>Telefone</th>
                                    <th>Endereço</th>
                                    <th>CEP</th>
                                    <th>Senha</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {funcionariosFiltrados.map(funcionario => (
                                    <tr key={funcionario.id_funcionario}>
                                        <td>{funcionario.id}</td>
                                        <td>{funcionario.nome}</td>
                                        <td>{funcionario.cpf}</td>
                                        <td>{funcionario.telefone}</td>
                                        <td>{funcionario.endereco}</td>
                                        <td>{funcionario.cep}</td>
                                        <td>{funcionario.senha}</td>
                                        <td>
                                            <a href={`/funcionarios/edit/${funcionario.id}`} className="btn btn-primary">Editar</a>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <button className="btn btn-danger" onClick={() => handleExcluirFuncionario(funcionario.id)}>Deletar</button>
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

export default Funcionario;
