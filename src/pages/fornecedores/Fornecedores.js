import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import perfil from '../../img/perfil.svg';
import fornecedorPdf from '../../relatorio/PdfFornecedores';

function Fornecedor() {

    const fornecedor = {
        id: 0,
        nome: '',
        endereco: '',
        telefone: '',
        cep: '',
        cnpj: '',
    };

    const [fornecedores, setFornecedores] = useState([]);
    const [objFornecedor, setObjFornecedor] = useState(fornecedor);
    const navigate = useNavigate();

    const adicionar = () => {
        navigate("/cadastroFornecedor");
    };

    const ordenarFornecedores = (campo) => {
        let ordenacaoAtual = ordenacao.tipo === 'asc' ? 'desc' : 'asc';
        const fornecedoresOrdenados = [...fornecedores].sort((a, b) => {
            if (campo === 'id') {
                // Ordenar por ID como número, não como string
                return ordenacaoAtual === 'asc' ? a[campo] - b[campo] : b[campo] - a[campo];
            } else {
                return ordenacaoAtual === 'asc' ? a[campo] > b[campo] ? 1 : -1 : a[campo] < b[campo] ? 1 : -1;
            }
        });
        setFornecedores(fornecedoresOrdenados);
        setOrdenacao({ campo, tipo: ordenacaoAtual });
    };

    useEffect(() => {
        fetch('http://localhost:8080/fornecedores')
            .then(retorno => retorno.json())
            .then(convertido => setFornecedores(convertido))
            .catch(error => console.error('Erro ao buscar fornecedores:', error));
    }, []);

    const handleExcluirFornecedor = async (fornecedorId) => {
        const confirmacao = window.confirm('Tem certeza que deseja excluir este fornecedor?');

        if (confirmacao) {
            try {
                const response = await fetch(`http://localhost:8080/fornecedores/delete/${fornecedorId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Atualize a lista de fornecedores após a exclusão
                    const novosFornecedores = fornecedores.filter(f => f.id !== fornecedorId);
                    setFornecedores(novosFornecedores);
                    console.log('Fornecedor excluído com sucesso!');
                } else {
                    console.error('Erro ao excluir fornecedor:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao excluir fornecedor:', error);
            }
        }
    };

    const [ordenacao, setOrdenacao] = useState({
        campo: null,
        tipo: 'asc'
    });

    //barra pesquisa 
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const filtrarFornecedores = (termo) => {
        const termoLowerCase = termo.toLowerCase();
        const fornecedoresFiltrados = fornecedores.filter((fornecedor) => {
            return (
                fornecedor.id.toString().includes(termoLowerCase) ||
                fornecedor.nome.toLowerCase().includes(termoLowerCase) ||
                fornecedor.endereco.toString().includes(termoLowerCase) ||
                fornecedor.telefone.toString().includes(termoLowerCase) ||
                fornecedor.cep.toString().includes(termoLowerCase) ||
                fornecedor.cnpj.toString().includes(termoLowerCase)
            );
        });
        return fornecedoresFiltrados;
    };

    const handlePesquisa = (event) => {
        const termo = event.target.value;
        setTermoPesquisa(termo);
    };

    const fornecedoresFiltrados = filtrarFornecedores(termoPesquisa);

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
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil" /></a>
                </div>
            </header>

            <div className="content">

                <div className="menu">
                    <a href="/funcionarios">Funcionários</a>
                    <a href="/produtos">Produtos</a>
                    <a href="/fornecedores" className="menu_escolhido">Fornecedores</a>
                    <a href="/estoques">Entrada estoques</a>
                    <a href="/transportadoras">Transportadoras</a>
                    <a href="/clientes">Clientes</a>
                </div>

                <div className="main">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Pesquisar fornecedor..."
                            value={termoPesquisa}
                            onChange={handlePesquisa}
                        />
                    </div>
                    <div className="table-container">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th onClick={() => ordenarFornecedores('id')}>ID</th>
                                    <th onClick={() => ordenarFornecedores('nome')}>Nome</th>
                                    <th onClick={() => ordenarFornecedores('endereco')}>Endereço</th>
                                    <th onClick={() => ordenarFornecedores('telefone')}>Telefone</th>
                                    <th onClick={() => ordenarFornecedores('cep')}>CEP</th>
                                    <th onClick={() => ordenarFornecedores('cnpj')}>CNPJ</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fornecedoresFiltrados.map((fornecedor, indice) => (
                                    <tr key={fornecedor.id}>
                                        <td>{fornecedor.id}</td>
                                        <td>{fornecedor.nome}</td>
                                        <td>{fornecedor.endereco}</td>
                                        <td>{fornecedor.telefone}</td>
                                        <td>{fornecedor.cep}</td>
                                        <td>{fornecedor.cnpj}</td>
                                        <td>
                                            <a href={`/fornecedores/edit/${fornecedor.id}`} className="btn btn-primary">Editar</a>
                                            <span style={{ margin: '0 5px' }}></span>
                                            <button className="btn btn-danger" onClick={() => handleExcluirFornecedor(fornecedor.id)}>Deletar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button onClick={adicionar}>Adicionar</button>
                        <button className="right_btn" onClick={(e) => fornecedorPdf(fornecedores)}>Relatório</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Fornecedor;
