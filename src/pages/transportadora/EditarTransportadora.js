import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarTransportadora() {
    const { id } = useParams();
    const navigate = useNavigate();

    const transportadora = {
        id: 0,
        nome: '',
        cidade: '',
        precoKM: 0.0,
    };

    const [objTransportadora, setObjTransportadora] = useState(transportadora);

    useEffect(() => {
        fetch(`http://localhost:8080/transportadoras/edit/${id}`)
            .then((retorno) => retorno.json())
            .then((convertido) => {
                console.log('Dados da transportadora:', convertido);
                setObjTransportadora(convertido);
            })
            .catch((error) => {
                console.error('Erro ao buscar transportadora:', error);
            });
    }, [id]);

    const aoDigitar = (e) => {
        setObjTransportadora({ ...objTransportadora, [e.target.name]: e.target.value });
    };

    if (objTransportadora.id === 0) {
        console.log('Dados ainda estão sendo carregados...');
        return <p>Carregando...</p>;
    }

    const salvarEdicao = () => {
        // Aqui você faz a requisição para salvar as alterações do cliente
        fetch(`http://localhost:8080/transportadoras/edit/${id}`, {
            method: 'put',
            body: JSON.stringify(objTransportadora),
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((retorno) => retorno.json())
            .then((retornoConvertido) => {
                // Atualiza os campos com os dados inseridos após salvar
                setObjTransportadora(retornoConvertido);
    
                // Lógica de atualização da lista de clientes, se necessário
                console.log('Transportadora editado com sucesso:', retornoConvertido);
                navigate('/transportadoras'); // Redireciona de volta para a lista de clientes após a edição
            })
            .catch((error) => console.error('Erro ao editar transportadora:', error));
    };

    return (
        <><React.Fragment>

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Editar Transportadora</title>

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
                        <h1 className="text-center">Editar Transportadora</h1>
                        <form>
                            <div className="form-group">
                                <label>Nome:</label>
                                <input name="nome" type="text" onChange={aoDigitar}
                                value={objTransportadora.nome} className="form-control" placeholder="Nome" />
                            </div>

                            <div className="form-group">
                                <label>Cidade:</label>
                                <input name="cidade" type="text" onChange={aoDigitar} value={objTransportadora.cidade} className="form-control" placeholder="Cidade" />
                            </div>

                            <div className="form-group">
                                <label>Preço por KM:</label>
                                <input name="precoKM" type="text" onChange={aoDigitar} value={objTransportadora.precoKM} className="form-control" placeholder="Preço por KM" />
                            </div>
                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/transportadoras" className="btn btn-danger" style={{ fontSize: '1em', width: '150px' }}>Cancelar</a>
                                    <span style={{ margin: '0 5px' }}></span>
                                    <button type="button" id="btn-cadastrar" className="right_btn btn btn-primary" style={{ fontSize: '1em', width: '150px' }} onClick={salvarEdicao}>Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarTransportadora;
