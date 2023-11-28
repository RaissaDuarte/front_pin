import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/login.css';
import eyeOpen from '../../img/eyeOpen.svg';
import eyeClose from '../../img/eyeClose.svg';
import { useAuth } from '../../context/AuthContext';


function Login() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const { login, funcionario } = useAuth(); // Obtém a função de login e informações do funcionário do contexto
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf, senha }),
            });

            if (response.ok) {
                const funcionarioAutenticado = await response.json();

                if (funcionarioAutenticado) {
                    login(funcionarioAutenticado); // Define o funcionário no contexto
                    navigate('/home');
                } else {
                    console.error('Resposta de login inválida:', response);
                    alert('Erro ao fazer login. Tente novamente.');
                }
            } else {
                alert('CPF e/ou Senha incorretos. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const formatarCPF = (input) => {
        // Remova caracteres não numéricos
        const numericValue = input.replace(/\D/g, '');
        // Limite o número de caracteres a 11
        const truncatedValue = numericValue.slice(0, 11);
        // Aplique a máscara
        const maskedValue = truncatedValue.replace(
            /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
            (_, g1, g2, g3, g4) => {
                let result = '';
                if (g1) result += g1 + (g2 ? '.' : '');
                if (g2) result += g2 + (g3 ? '.' : '');
                if (g3) result += g3;
                if (g4) result += '-' + g4;
                return result;
            }
        );
        // Atualize o estado do CPF
        setCpf(maskedValue);
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'senha') {
            setSenha(e.target.value);
        } else {
            formatarCPF(e.target.value);
        }
    };

    const handleToggleVisibility = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cpf);
        console.log(senha);
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
            <link rel="stylesheet" href="/css/login.css" />
        </React.Fragment>

            <header className="headerGeneric_login">
                <div className="logo_name_login">
                    <p>TemDTudo</p>
                </div>
            </header>

            <div className="container">
                <div className='titulo'>
                    <p>Login</p>
                </div>
                <form onSubmit={handleSubmit} className='teste'>
                    <div className="campos">
                        <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={handleInputChange}
                        />
                        <input
                            type={mostrarSenha ? 'text' : 'password'}
                            placeholder="Senha"
                            name="senha"
                            value={senha}
                            onChange={handleInputChange}
                        />
                        <img
                            src={mostrarSenha ? eyeClose : eyeOpen}
                            alt={mostrarSenha ? 'Visibilidade Desligada' : 'Visibilidade Ligada'}
                            onClick={handleToggleVisibility}
                        />
                    </div>
                    <div className="botao">
                        <div className="gerencia_btns_login">
                            <button type="submit" onClick={handleLogin}>
                                Entrar
                            </button>
                        </div>
                    </div>
                    {funcionario && (
                        <div>
                            <p>Funcionário autenticado:</p>
                            <p>ID: {funcionario.id}</p>
                            <p>Nome: {funcionario.nome}</p>
                            <p>CPF: {funcionario.cpf}</p>
                            <p>Telefone: {funcionario.telefone}</p>
                            <p>Endereco: {funcionario.endereco}</p>
                            <p>CEP: {funcionario.cep}</p>
                            <p>Senha: {funcionario.senha}</p>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default Login;
