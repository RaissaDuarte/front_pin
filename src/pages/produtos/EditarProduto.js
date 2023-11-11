import React from 'react';

function EditarProduto () {



  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Gerência Produtos</title>

        {/* Fontes do google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet" />

        {/* CSS Bootstrap */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        <link rel="stylesheet" href="/css/gerencia.css" />
      </head>

      <body>
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

        <div className="container">
          <div className="row">
            <h1 className="text-center">Atualizar produtos</h1>
            <div className="card-body">
              <form>
                <div className="form-row">
                    

                    <div className="form-group col-md-6">
                    <label>Nome:</label>
                    <input name="nome" type="text" onChange={aoDigitar} className="form-control" placeholder="Nome" />
                    </div>
    
                    <div className="form-group col-md-6">
                    <label>Peso:</label>
                    <input name="peso" type="text" onChange={aoDigitar} className="form-control" placeholder="Peso(kgs)" />
                    </div>
    
                    <div className="form-group col-md-6">
                    <label>Dimensão:</label>
                    <input name="dimensao" type="text" onChange={aoDigitar} className="form-control" placeholder="Dimensão(mt3)" />
                    </div>
    
                    <div className="form-group col-md-6">
                    <label>Quantidade:</label>
                    <input name="quantidade" type="text" onChange={aoDigitar} className="form-control" placeholder="Quantidade" />
                    </div>
    
                    <div className="form-group col-md-6">
                    <label>Valor:</label>
                    <input name="valor" type="text" onChange={aoDigitar} className="form-control" placeholder="Valor" />
                    </div>
    
                    <div className="form-group col-md-6">
                    <label>Imagem:</label>
                    <input name="imagem" type="text" onChange={aoDigitar} className="form-control" placeholder="Imagem" />
                    </div>  
                </div>

                <div className="box-footer">
                  <a href="/produtoses" className="btn btn-danger">Cancelar</a>
                  <button type="submit" id="btn-cadastrar" className="btn btn-primary">Atualizar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default EditarProduto;
