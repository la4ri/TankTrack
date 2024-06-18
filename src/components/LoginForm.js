import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import logogrande from '../img/logogrande.png';
import logopequena from '../img/logopequena.png';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const data = {
            email_usuario: username,
            senha_usuario: password
        };

        try {
            const response = await fetch('https://node-deploy-api-d20r.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao efetuar login');
            }

            const responseData = await response.json();
            localStorage.setItem('nome_usuario', responseData.nome_usuario); // Salva o nome de usuário
            navigate('/menu'); // Navega para o menu após o login bem-sucedido
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao efetuar login. Por favor, verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="background-login">
            <div className="container">
                <img src={logogrande} alt="Logo" className="logogrande" />
                <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Login:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="botaologin" disabled={loading}>
                            {loading ? (
                                <>
                                    Carregando...
                                    <div className="loading-spinner"></div>
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </div>
                    <p className="esquecersenha">Esqueceu sua senha? Clique Aqui</p>
                </form>
                <img src={logopequena} alt="Logo" className="logopequena" />
            </div>
        </div>
    );
};

export default LoginForm;
