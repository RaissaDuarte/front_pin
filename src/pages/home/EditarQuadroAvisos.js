import React, { useState, useEffect } from 'react';
import '../../components/css/home.css';
import { useNavigate } from 'react-router-dom';
import Funcionario from '../funcionarios/Funcionario';
import perfil from '../../img/perfil.svg';

function EditarQuadroAvisos() {

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
            <link rel="stylesheet" href="/css/home.css" />

        </React.Fragment>

            <header className="headerGeneric">
                <div className="logo_name">
                    <p>TemDTudo</p>
                </div>
                <div className="link_pages">
                    <a href="/home" style={{ textDecoration: 'underline' }}>Home</a>
                    <a href="/funcionarios">Gerência</a>
                    <a href="">Venda</a>
                    <a href="/perfil"><img src={perfil} alt="Icone Perfil" /></a>

                </div>
            </header>

            <div className="container-fluid d-flex align-items-center justify-content-center">
                <div className="card">
                    <div className="editQA-card-body">
                        <h1 className="text-center">Atualizar Quadro Avisos </h1>
                        <form>
                            <div className="edit-quadro-avisos">
                                <textarea className='edit-ta-qa'></textarea>
                            </div>
                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/home" className="btn btn-danger" style={{ fontSize: '1em', width: '150px' }}>Cancelar</a>
                                    <span style={{ margin: '0 5px' }}></span>
                                    <button type="button" id="btn-cadastrar" className="right_btn btn btn-primary" style={{ fontSize: '1em', width: '150px' }}>Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarQuadroAvisos;
