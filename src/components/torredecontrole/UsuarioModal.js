import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UsuarioModal = ({ open, handleClose, usuario, isEditing, fetchUsuario }) => {
  const [formData, setFormData] = useState({
    nome_usuario: '',
    email_usuario: '',
    senha_usuario: '',
    cpf_usuario: '',
    permissao: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && usuario) {
      setFormData({
        nome_usuario: usuario.nome_usuario,
        email_usuario: usuario.email_usuario,
        senha_usuario: usuario.senha_usuario,
        cpf_usuario: usuario.cpf_usuario || '',
        permissao: usuario.permissao || '',
      });
    } else {
      setFormData({
        nome_usuario: '',
        email_usuario: '',
        senha_usuario: '',
        cpf_usuario: '',
        permissao: '',
      });
    }
  }, [isEditing, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = 'https://node-deploy-api-d20r.onrender.com/usuarios';

    if (isEditing) {
      axios.put(`${apiUrl}/${usuario.id_usuario}`, formData)
        .then(() => {
          fetchUsuario();
          handleClose();
        })
        .catch((error) => console.error('Erro ao editar Usuário:', error))
        .finally(() => setLoading(false));
    } else {
      axios.post(apiUrl, formData)
        .then(() => {
          fetchUsuario();
          handleClose();
        })
        .catch((error) => console.error('Erro ao adicionar Usuário:', error))
        .finally(() => setLoading(false));
    }
  };

  const handleCloseModal = () => {
    handleClose();
    fetchUsuario();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="nome_usuario"
            label="Nome Usuário"
            name="nome_usuario"
            value={formData.nome_usuario}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="email_usuario"
            label="E-mail Usuário"
            name="email_usuario"
            value={formData.email_usuario}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="senha_usuario"
            label="Senha Usuário"
            name="senha_usuario"
            type="password"
            value={formData.senha_usuario}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="cpf_usuario"
            label="CPF Usuário"
            name="cpf_usuario"
            value={formData.cpf_usuario}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="permissao">Cargo</InputLabel>
            <Select
              labelId="permissao"
              id="permissao"
              name="permissao"
              value={formData.permissao}
              onChange={handleChange}
              required
            >
              <MenuItem value="adm">Administrador</MenuItem>
              <MenuItem value="gerente">Gerente</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? 'Salvar' : 'Adicionar')}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UsuarioModal;
