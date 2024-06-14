import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const data = {
      email_usuario: username,
      senha_usuario: password,
    };

    setLoading(true); // Mostrar o ícone de carregamento

    fetch('https://node-deploy-api-d20r.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao efetuar login');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Dados recebidos:', data); // Log para depuração
        if (data.nome_usuario) {
          localStorage.setItem('nome_usuario', data.nome_usuario);
          window.location.href = 'menu.html';
        } else {
          throw new Error('Nome do usuário não encontrado na resposta');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao efetuar login. Por favor, verifique suas credenciais.');
      })
      .finally(() => {
        setLoading(false); // Ocultar o ícone de carregamento
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 300,
        margin: '0 auto',
        padding: 4,
        boxShadow: 3,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Login;
