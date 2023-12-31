import React, { useState, useEffect } from 'react';
import '../../components/css/gerencia.css';
import { useNavigate, useParams } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';


function EditarProduto() {
    const { codigoProduto } = useParams();
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);

    const [objProduto, setObjProduto] = useState({
        id_produto: codigoProduto,
        nome: null,
        peso: null,
        dimensao: null,
        quantidade: null,
        valor: null,
        imagem: null,
    });

    const aoDigitar = (e) => {
        setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
    }

    const cancelar = () => {
        navigate('/produtos');
    }

    const alterar = () => {
        if (!objProduto.nome || !objProduto.peso || !objProduto.dimensao || !objProduto.quantidade || !objProduto.valor) {
            return;
        }
    
        fetch('http://localhost:8080/alterarprod', {
            method: 'put',
            body: JSON.stringify(objProduto),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {
    
                let vetorTemp = [...produtos];
                let indice = vetorTemp.findIndex((p) => {
                    return p.id_produto === objProduto.id_produto;
                });
                vetorTemp[indice] = objProduto;
                setProdutos(vetorTemp);
    
                setTimeout(() => { window.location.reload(); }, 2000);
            })
            .catch(error => console.error('Erro ao alterar produto:', error));
        navigate("/produtos");
    };

    useEffect(() => {
        fetch('http://localhost:8080/produtos/' + codigoProduto, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
        })
            .then((response) => response.json())
            .then((data) => {
                setObjProduto(data);
            })
            .catch((error) => console.error('Erro ao buscar produto:', error));
    }, [codigoProduto]);



    return (
        <> <React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Gerência Produtos</title>

            {/* Fontes do google */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet" />

            {/* CSS Bootstrap */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
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
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil"/></a>
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
                                    <input name="nome" type="text" onChange={aoDigitar} value={objProduto.nome || ''} className="form-control" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Peso:</label>
                                    <input name="peso" type="text" onChange={aoDigitar} value={objProduto.peso || ''} className="form-control" placeholder="Peso(kgs)" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Dimensão:</label>
                                    <input name="dimensao" type="text" onChange={aoDigitar} value={objProduto.dimensao || ''} className="form-control" placeholder="Dimensão(mt3)" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Quantidade:</label>
                                    <input name="quantidade" type="text" onChange={aoDigitar} value={objProduto.quantidade || ''} className="form-control" placeholder="Quantidade" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Valor:</label>
                                    <input name="valor" type="text" onChange={aoDigitar} value={objProduto.valor || ''} className="form-control" placeholder="Valor" required/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Imagem:</label>
                                    <input name="imagem" type="text" onChange={aoDigitar} value={objProduto.imagem || ''} className="form-control" placeholder="Imagem" />
                                </div>
                            </div>

                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <button type="submit" id="btn-cancelar" className="btn btn-danger" onClick={cancelar}>Cancelar</button>
                                    <button type="submit" id="btn-alterar" className="right_btn btn btn-primary" onClick={alterar} required>Atualizar</button>
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