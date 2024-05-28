document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Objeto com os dados do login
    const data = {
        email_usuario: username,
        senha_usuario: password
    };

    fetch('https://node-deploy-api-d20r.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao efetuar login');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Log para depuração
            if (data.nome_usuario) {
                localStorage.setItem('nome_usuario', data.nome_usuario);
                window.location.href = 'menu.html';
            } else {
                throw new Error('Nome do usuário não encontrado na resposta');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao efetuar login. Por favor, verifique suas credenciais.');
        });
});
