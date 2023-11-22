import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditarFornecedor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const fornecedorInicial = {
        id: 0,
        nome: '',
        endereco: '',
        telefone: '',
        cep: '',
        cnpj: '',
    };

    useEffect(() => {
        fetch(`http://localhost:8080/fornecedores/edit/${id}`)
            .then((retorno) => retorno.json())
            .then((convertido) => {
                console.log('Dados do fornecedor:', convertido);
                setObjFornecedor(convertido);
            })
            .catch((error) => {
                console.error('Erro ao buscar fornecedores:', error);
            });
    }, [id]);

    const [objFornecedor, setObjFornecedor] = useState(fornecedorInicial);

    const aoDigitar = (e) => {
        setObjFornecedor({ ...objFornecedor, [e.target.name]: e.target.value });
    }

    if (objFornecedor.id === 0) {
        console.log('Dados ainda estão sendo carregados...');
        return <p>Carregando...</p>;
    }

    const salvarEdicao = () => {
        // Aqui você faz a requisição para salvar as alterações do cliente
        fetch(`http://localhost:8080/fornecedores/edit/${id}`, {
            method: 'put',
            body: JSON.stringify(objFornecedor),
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((retorno) => retorno.json())
            .then((retornoConvertido) => {
                setObjFornecedor(retornoConvertido);
    
                console.log('Fornecedor editado com sucesso:', retornoConvertido);
                navigate('/fornecedores');
            })
            .catch((error) => console.error('Erro ao editar Fornecedor:', error));
    };

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
                    <a href="{{url('buscaFunc')}}">Busca</a>
                    <a href="">Venda</a>
                    <a href="{{url('perfil')}}"><img src="/img/user.svg" alt="Icone Perfil Abstrato" /></a>
                </div>
            </header>

            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center">Editar Fornecedor</h1>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome:</label>
                                    <input name="nome" type="text" onChange={aoDigitar} value={objFornecedor.nome} className="form-control" placeholder="Nome" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Endereço:</label>
                                    <input name="endereco" type="text" onChange={aoDigitar} value={objFornecedor.endereco} className="form-control" placeholder="Endereço" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Telefone:</label>
                                    <input name="telefone" type="text" onChange={aoDigitar} value={objFornecedor.telefone}  className="form-control" placeholder="Telefone" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CEP:</label>
                                    <input name="cep" type="text" onChange={aoDigitar} value={objFornecedor.cep}  className="form-control" placeholder="CEP" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>CNPJ:</label>
                                    <input name="cnpj" type="text" onChange={aoDigitar} value={objFornecedor.cnpj}  className="form-control" placeholder="CNPJ" />
                                </div>
                            </div>

                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/fornecedores" className="btn btn-danger">Cancelar</a>
                                    <span style={{ margin: '0 5px' }}></span>
                                    <button type="submit" id="btn-cadastrar" className="right_btn btn btn-primary" onClick={salvarEdicao}>Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarFornecedor;
