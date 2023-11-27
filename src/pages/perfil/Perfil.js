import React, { useState, useEffect } from 'react';
import '../../components/css/perfil.css';
import { useNavigate } from 'react-router-dom';
import perfil from  '../../img/perfil.svg';

function Perfil() {

    const sair = () => {
        navigate(``);
    }

    const navigate = useNavigate();

    return (
        <><React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

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
            <link rel="stylesheet" href="/css/perfil.css" />

        </React.Fragment>

            <header className="headerGeneric">
                <div className="logo_name">
                    <p>TemDTudo</p>
                </div>
                <div className="link_pages">
                    <a href="/home">Home</a>
                    <a href="/funcionarios">Gerência</a>
                    <a href="">Venda</a>
                    <a href="/perfil" style={{ textDecoration: 'underline' }}><img src={perfil} alt="Icone Perfil"/></a>
                </div>
            </header>

            <div className="content">

                <div className="menu">
                    <a className="menu_escolhido">Perfil</a>
                    <a href="/home">Grade Horária</a>
                    <a href="/" className='sair'>Sair</a>
                </div>

                <div className="main">
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
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <div className="gerencia_btns">
                        <button>Adicionar</button>
                        <button className="right_btn">Relatório</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Perfil;
