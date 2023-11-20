import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const produto = {
        id: 0,
        nome: '',
        peso: 0.0,
        dimensao: 0.0,
        quantidade: 0.0,
        valor: 0.0,
        imagem: '',
    }

    const cancelar =() => {
        navigate('/produtos');
    }

    //alterar 
    const alterar = () => {
        fetch('http://localhost:8080/alterarprod', {
            method:'put',
            body:JSON.stringify(objProduto),
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {

            let vetorTemp = [...produtos];
            let indice = vetorTemp.findIndex((p)=> {
                return p.id_produto === objProduto.id_produto;
            });
            vetorTemp[indice] = objProduto;
            setProdutos(vetorTemp);

            setTimeout(()=> {window.location.reload();},2000);         
        })
        .catch(error => console.error('Erro ao alterar produto:', error));
        navigate("/produtos");
        
    }

    useEffect(() => {
        fetch(`http://localhost:8080/produtos/edit/${id}`)
            .then((retorno) => retorno.json())
            .then((convertido) => {
                console.log('Dados do produto:', convertido);
                setObjProduto(convertido);
            })
            .catch((error) => {
                console.error('Erro ao buscar produto:', error);
            });
    }, [id]);

    const aoDigitar = (e) => {
        setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
    };

    const salvarEdicao = () => {
        // Aqui você faz a requisição para salvar as alterações do cliente
        fetch(`http://localhost:8080/produtos/edit/${id}`, {
            method: 'put',
            body: JSON.stringify(objProduto),
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((retorno) => retorno.json())
            .then((retornoConvertido) => {
                // Atualiza os campos com os dados inseridos após salvar
                setObjProduto(retornoConvertido);
    
                // Lógica de atualização da lista de clientes, se necessário
                console.log('produto editado com sucesso:', retornoConvertido);
                navigate('/produtos'); // Redireciona de volta para a lista de clientes após a edição
            })
            .catch((error) => console.error('Erro ao editar produto:', error));
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
                        <h1 className="text-center">Editar Produto</h1>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nome:</label>
                                    <input name="nome" type="text" onChange={aoDigitar} className="form-control" value={objProduto.nome} placeholder="Nome" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Peso:</label>
                                    <input name="peso" type="text" onChange={aoDigitar} value={objProduto.peso}  className="form-control" placeholder="Peso(kgs)" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Dimensão:</label>
                                    <input name="dimensao" type="text" onChange={aoDigitar} value={objProduto.dimensao} className="form-control" placeholder="Dimensão(mt3)" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Quantidade:</label>
                                    <input name="quantidade" type="text" onChange={aoDigitar} value={objProduto.quantidade} className="form-control" placeholder="Quantidade" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Valor:</label>
                                    <input name="valor" type="text" onChange={aoDigitar} value={objProduto.valor}  className="form-control" placeholder="Valor" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Imagem:</label>
                                    <input name="imagem" type="text" onChange={aoDigitar} value={objProduto.imagem}  className="form-control" placeholder="Imagem" />
                                </div>
                            </div>


                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/produtos" className="btn btn-danger">Cancelar</a>
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

export default EditarProduto;
