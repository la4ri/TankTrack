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

const MotoristaModal = ({ open, handleClose, motorista, isEditing, fetchMotoristas }) => {
  const [formData, setFormData] = useState({
    nome_motorista: '',
    cnh_motorista: '',
    validade_cnh: '',
    status_saude_motorista: 'apto',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && motorista) {
      setFormData({
        nome_motorista: motorista.nome_motorista,
        cnh_motorista: motorista.cnh_motorista,
        validade_cnh: motorista.validade_cnh.split('T')[0],
        status_saude_motorista: motorista.status_saude_motorista,
      });
    } else {
      setFormData({
        nome_motorista: '',
        cnh_motorista: '',
        validade_cnh: '',
        status_saude_motorista: 'apto',
      });
    }
  }, [isEditing, motorista]);

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
    const apiUrl = 'https://node-deploy-api-d20r.onrender.com/motoristas';

    if (isEditing) {
      axios.put(`${apiUrl}/${motorista.id_motorista}`, formData)
        .then(() => {
          fetchMotoristas();
          handleClose();
        })
        .catch((error) => console.error('Erro ao editar motorista:', error))
        .finally(() => setLoading(false));
    } else {
      axios.post(apiUrl, formData)
        .then(() => {
          fetchMotoristas();
          handleClose();
        })
        .catch((error) => console.error('Erro ao adicionar motorista:', error))
        .finally(() => setLoading(false));
    }
  };

  const handleCloseModal = () => {
    handleClose();
    fetchMotoristas();
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
          {isEditing ? 'Editar Motorista' : 'Adicionar Motorista'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="nome_motorista"
            label="Nome Motorista"
            name="nome_motorista"
            value={formData.nome_motorista}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="cnh_motorista"
            label="CNH"
            name="cnh_motorista"
            value={formData.cnh_motorista}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="validade_cnh"
            label="Validade CNH"
            name="validade_cnh"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.validade_cnh}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-saude-label">Status de Saúde</InputLabel>
            <Select
              labelId="status-saude-label"
              id="status_saude_motorista"
              name="status_saude_motorista"
              value={formData.status_saude_motorista}
              onChange={handleChange}
              required
            >
              <MenuItem value="apto">Apto</MenuItem>
              <MenuItem value="não apto">Não Apto</MenuItem>
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

export default MotoristaModal;
