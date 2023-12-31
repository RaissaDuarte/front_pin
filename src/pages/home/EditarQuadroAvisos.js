import React, { useState, useEffect } from 'react';
import '../../components/css/home.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import perfil from '../../img/perfil.svg';

function EditarQuadroAvisos({ location }) {
  const { idFuncionario } = useParams();
    const navigate = useNavigate();
    const { editor } = location?.state || {};
    const { funcionario } = useAuth();

    const [objFuncionario, setObjFuncionario] = useState({
        id: '',
        nome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        cep: '',
        senha: '',
    });

    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const fetchQuadroAvisos = async () => {
          try {
            const response = await fetch(`http://localhost:8080/quadroAvisos`);
            if (!response.ok) {
              throw new Error('Erro ao obter quadro de avisos');
            }
      
            const quadroAvisosData = await response.json();
            // Configurar o estado com base no funcionário logado
            setObjFuncionario(funcionario);  // Usei o estado do funcionário diretamente
            setMensagem(quadroAvisosData.mensagem);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchQuadroAvisos();
      }, [funcionario]);  // Adicionei o funcionário como dependência ao useEffect

    const salvarQuadroAvisos = () => {
        const quadroAvisosAtualizado = {
            id: 1,
            funcionario: objFuncionario,
            mensagem: mensagem,
            editor: editor,
          };
      
          console.log(quadroAvisosAtualizado);
      
          fetch(`http://localhost:8080/atualizarQuadroAvisos/${idFuncionario}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(quadroAvisosAtualizado),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`Erro ao atualizar quadro de avisos: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Quadro de avisos atualizado com sucesso', data);
            })
            .catch(error => {
              console.error(error);
            });
      
            navigate(`/home/${funcionario.id}`);
        };

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
                                <textarea
                                    className='edit-ta-qa'
                                    value={mensagem}
                                    onChange={(e) => setMensagem(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="box-footer">
                                <div className="gerencia_btns">
                                    <a href="/home" className="btn btn-danger" style={{ fontSize: '1em', width: '150px' }}>Cancelar</a>
                                    <span style={{ margin: '0 5px' }}></span>
                                    <button type="button" id="btn-cadastrar" className="right_btn btn btn-primary" style={{ fontSize: '1em', width: '150px' }} onClick={salvarQuadroAvisos}>Salvar</button>
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