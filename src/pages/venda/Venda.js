import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate } from 'react-router-dom';
import { isIndexSignatureDeclaration } from 'typescript';



function Vendas() {
    const venda = {
        id_venda: 0,
        cliente: 0,
        itensVenda: 0,
        desconto: 0,
        valorTotal: 0,
    }

    const [vendas, setVendas] = useState([]);
    const [objVenda, setObjVenda] = useState(venda);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/vendas')
            .then(retorno => retorno.json())
            .then(convertido => setVendas(convertido))
            .catch(error => console.error('Erro ao buscar vendas:', error));
    }, []); 

    const [ordenacao, setOrdenacao] = useState({
        campo: null,
        tipo: 'asc'
    });
    const ordenarVendas = (campo) => {
        let ordenacaoAtual = ordenacao.tipo === 'asc' ? 'desc' : 'asc';
        const vendasOrdenados = [...vendas].sort((a, b) => {
            if (ordenacaoAtual === 'asc') {
                return a[campo] > b[campo] ? 1 : -1;
            } else {
                return a[campo] < b[campo] ? 1 : -1;
            }
        });
        setVendas(vendasOrdenados);
        setOrdenacao({ campo, tipo: ordenacaoAtual });
    };

    const excluir = () => {}

    const adicionar = () => {navigate("/cadvenda");
}

    //barra pesquisa 
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const filtrarvendas = (termo) => {
        const termoLowerCase = termo.toLowerCase();
        const vendasFiltrados = vendas.filter((venda) => {
            return (
                venda.id_venda.toString().includes(termoLowerCase) ||
                venda.cliente.nome.toLowerCase().includes(termoLowerCase) ||
                venda.valorTotal.toString().includes(termoLowerCase) ||
                venda.desconto.toString().includes(termoLowerCase)
            );
        });
        return vendasFiltrados;
    };

    const handlePesquisa = (event) => {
        const termo = event.target.value;
        setTermoPesquisa(termo);
    };

    const vendasFiltrados = filtrarvendas(termoPesquisa);


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
                    <a href="/funcionarios">Gerência</a>
                    <a href="/vendas" style={{ textDecoration: 'underline' }}>Venda</a>
                    <a href="/perfil">Perfil</a>

                </div>
            </header>

            <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Pesquisar venda..."
                        value={termoPesquisa}
                        onChange={handlePesquisa}
                    />
                </div>

                <div className="table-container">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th onClick={() => ordenarVendas('id_venda')}>ID </th>
                                    <th onClick={() => ordenarVendas('cliente.nome')}>Cliente</th>
                                    <th onClick={() => ordenarVendas('valorTotal')}>Valor Total</th>
                                    <th onClick={() => ordenarVendas('desconto')}>Desconto</th>
                                    <th>Açoes</th>
                                </tr>
                            </thead>
                            <tbody>
                            {vendasFiltrados.map((venda, indice) => (
                                    <tr key={venda.id_venda}>
                                        <td>{venda.id_venda}</td>
                                        <td>{venda.cliente.nome}</td>
                                        <td>{venda.valorTotal}</td>
                                        <td>{venda.desconto}</td>
                                        <td> 
                                            <button className="btn btn-danger"  onClick={() => excluir(indice)} >Deletar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button onClick={adicionar}>Nova Venda</button>
                    </div>

        </>
    );
};

export default Vendas;
