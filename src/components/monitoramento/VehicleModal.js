import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, CircularProgress } from '@mui/material';
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

const statusOptions = ['Disponível', 'Indisponível'];

const VehicleModal = ({ open, handleClose, vehicle, isEditing, fetchVehicles }) => {
  const [formData, setFormData] = useState({
    modelo_veiculo: '',
    placa_veiculo: '',
    status_veiculo: '',
  });

  const [loading, setLoading] = useState(false); // Estado para controlar o indicador de carregamento

  useEffect(() => {
    if (isEditing && vehicle) {
      setFormData({
        modelo_veiculo: vehicle.modelo_veiculo,
        placa_veiculo: vehicle.placa_veiculo,
        status_veiculo: vehicle.status_veiculo,
      });
    } else {
      setFormData({
        modelo_veiculo: '',
        placa_veiculo: '',
        status_veiculo: '',
      });
    }
  }, [isEditing, vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'https://node-deploy-api-d20r.onrender.com/veiculos';

    setLoading(true); // Inicia o indicador de carregamento

    if (isEditing) {
      axios.put(`${apiUrl}/${vehicle.id_veiculo}`, formData)
        .then(() => {
          fetchVehicles();
          handleClose();
        })
        .catch((error) => console.error('Erro ao editar veículo:', error))
        .finally(() => setLoading(false)); // Finaliza o indicador de carregamento
    } else {
      axios.post(apiUrl, formData)
        .then(() => {
          fetchVehicles();
          handleClose();
        })
        .catch((error) => console.error('Erro ao adicionar veículo:', error))
        .finally(() => setLoading(false)); // Finaliza o indicador de carregamento
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEditing ? 'Editar Veículo' : 'Adicionar Veículo'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="modelo_veiculo"
            label="Marca Veículo"
            name="modelo_veiculo"
            value={formData.modelo_veiculo}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="placa_veiculo"
            label="Placa"
            name="placa_veiculo"
            value={formData.placa_veiculo}
            onChange={handleChange}
            required
          />
          <InputLabel htmlFor="status_veiculo" sx={{ mt: 2 }}>Status*</InputLabel>
          <Select
            margin="normal"
            fullWidth
            id="status_veiculo"
            label="Status"
            name="status_veiculo"
            value={formData.status_veiculo}
            onChange={handleChange}
            required
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {loading && <CircularProgress />} {/* Renderiza CircularProgress se loading for true */}
            {!loading && (
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? 'Salvar' : 'Adicionar'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default VehicleModal;
