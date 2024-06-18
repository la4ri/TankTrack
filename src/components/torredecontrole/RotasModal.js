import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh', // Define a altura máxima para 80% da altura da tela
  overflow: 'hidden', // Esconde o overflow
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const innerStyle = {
  overflowY: 'auto', // Adiciona o scroll vertical
  maxHeight: '100%', // Define a altura máxima para preencher o Box externo
  padding: '16px', // Adiciona um padding interno
};

const RotasModal = ({ open, handleClose, rota, isEditing, fetchControleRotas }) => {
  const [formData, setFormData] = useState({
    id_viagem: '',
    id_motorista: '',
    id_veiculo: '',
    quantidade_combustivel: '',
    primeira_parada: '',
    data_prevista_primeira_parada: '',
    data_real_primeira_parada: '',
    volume_primeira_parada_m3: '',
    segunda_parada: '',
    data_prevista_segunda_parada: '',
    data_real_segunda_parada: '',
    volume_segunda_parada_m3: '',
    terceira_parada: '',
    data_prevista_terceira_parada: '',
    data_real_terceira_parada: '',
    volume_terceira_parada_m3: '',
    parada_final: '',
    data_prevista_parada_final: '',
    data_real_parada_final: '',
    volume_parada_final_m3: '',
    historico_alteracoes: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && rota) {
      setFormData({
        id_viagem: rota.id_viagem,
        id_motorista: rota.id_motorista,
        id_veiculo: rota.id_veiculo,
        quantidade_combustivel: rota.quantidade_combustivel,
        primeira_parada: rota.primeira_parada,
        data_prevista_primeira_parada: rota.data_prevista_primeira_parada,
        data_real_primeira_parada: rota.data_real_primeira_parada,
        volume_primeira_parada_m3: rota.volume_primeira_parada_m3,
        segunda_parada: rota.segunda_parada,
        data_prevista_segunda_parada: rota.data_prevista_segunda_parada,
        data_real_segunda_parada: rota.data_real_segunda_parada,
        volume_segunda_parada_m3: rota.volume_segunda_parada_m3,
        terceira_parada: rota.terceira_parada,
        data_prevista_terceira_parada: rota.data_prevista_terceira_parada,
        data_real_terceira_parada: rota.data_real_terceira_parada,
        volume_terceira_parada_m3: rota.volume_terceira_parada_m3,
        parada_final: rota.parada_final,
        data_prevista_parada_final: rota.data_prevista_parada_final,
        data_real_parada_final: rota.data_real_parada_final,
        volume_parada_final_m3: rota.volume_parada_final_m3,
        historico_alteracoes: rota.historico_alteracoes,
      });
    } else {
      setFormData({
        id_viagem: '',
        id_motorista: '',
        id_veiculo: '',
        quantidade_combustivel: '',
        primeira_parada: '',
        data_prevista_primeira_parada: '',
        data_real_primeira_parada: '',
        volume_primeira_parada_m3: '',
        segunda_parada: '',
        data_prevista_segunda_parada: '',
        data_real_segunda_parada: '',
        volume_segunda_parada_m3: '',
        terceira_parada: '',
        data_prevista_terceira_parada: '',
        data_real_terceira_parada: '',
        volume_terceira_parada_m3: '',
        parada_final: '',
        data_prevista_parada_final: '',
        data_real_parada_final: '',
        volume_parada_final_m3: '',
        historico_alteracoes: '',
      });
    }
  }, [isEditing, rota]);

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
    const apiUrl = 'https://node-deploy-api-d20r.onrender.com/controle-rotas';

    if (isEditing) {
      axios.put(`${apiUrl}/${rota.id_viagem}`, formData)
        .then(() => {
          fetchControleRotas();
          handleClose();
        })
        .catch((error) => console.error('Erro ao editar rota:', error))
        .finally(() => setLoading(false));
    } else {
      axios.post(apiUrl, formData)
        .then(() => {
          fetchControleRotas();
          handleClose();
        })
        .catch((error) => console.error('Erro ao adicionar rota:', error))
        .finally(() => setLoading(false));
    }
  };

  const handleCloseModal = () => {
    handleClose();
    fetchControleRotas();
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
          {isEditing ? 'Editar Rota' : 'Adicionar Rota'}
        </Typography>
        <div style={innerStyle}>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="id_viagem"
              label="ID Viagem"
              name="id_viagem"
              value={formData.id_viagem}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="id_motorista"
              label="ID Motorista"
              name="id_motorista"
              value={formData.id_motorista}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="id_veiculo"
              label="ID Veículo"
              name="id_veiculo"
              value={formData.id_veiculo}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="quantidade_combustivel"
              label="Quantidade de Combustível"
              name="quantidade_combustivel"
              value={formData.quantidade_combustivel}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="primeira_parada"
              label="Primeira Parada"
              name="primeira_parada"
              value={formData.primeira_parada}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_prevista_primeira_parada"
              label="Data Prevista Primeira Parada"
              name="data_prevista_primeira_parada"
              type="datetime-local"
              value={formData.data_prevista_primeira_parada}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_real_primeira_parada"
              label="Data Real Primeira Parada"
              name="data_real_primeira_parada"
              type="datetime-local"
              value={formData.data_real_primeira_parada}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="volume_primeira_parada_m3"
              label="Volume Primeira Parada (m³)"
              name="volume_primeira_parada_m3"
              value={formData.volume_primeira_parada_m3}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="segunda_parada"
              label="Segunda Parada"
              name="segunda_parada"
              value={formData.segunda_parada}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_prevista_segunda_parada"
              label="Data Prevista Segunda Parada"
              name="data_prevista_segunda_parada"
              type="datetime-local"
              value={formData.data_prevista_segunda_parada}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_real_segunda_parada"
              label="Data Real Segunda Parada"
              name="data_real_segunda_parada"
              type="datetime-local"
              value={formData.data_real_segunda_parada}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="volume_segunda_parada_m3"
              label="Volume Segunda Parada (m³)"
              name="volume_segunda_parada_m3"
              value={formData.volume_segunda_parada_m3}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="terceira_parada"
              label="Terceira Parada"
              name="terceira_parada"
              value={formData.terceira_parada}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_prevista_terceira_parada"
              label="Data Prevista Terceira Parada"
              name="data_prevista_terceira_parada"
              type="datetime-local"
              value={formData.data_prevista_terceira_parada}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_real_terceira_parada"
              label="Data Real Terceira Parada"
              name="data_real_terceira_parada"
              type="datetime-local"
              value={formData.data_real_terceira_parada}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="volume_terceira_parada_m3"
              label="Volume Terceira Parada (m³)"
              name="volume_terceira_parada_m3"
              value={formData.volume_terceira_parada_m3}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="parada_final"
              label="Parada Final"
              name="parada_final"
              value={formData.parada_final}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_prevista_parada_final"
              label="Data Prevista Parada Final"
              name="data_prevista_parada_final"
              type="datetime-local"
              value={formData.data_prevista_parada_final}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="data_real_parada_final"
              label="Data Real Parada Final"
              name="data_real_parada_final"
              type="datetime-local"
              value={formData.data_real_parada_final}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="volume_parada_final_m3"
              label="Volume Parada Final (m³)"
              name="volume_parada_final_m3"
              value={formData.volume_parada_final_m3}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="historico_alteracoes"
              label="Histórico de Alterações"
              name="historico_alteracoes"
              value={formData.historico_alteracoes}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : isEditing ? 'Salvar Alterações' : 'Adicionar Rota'}
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default RotasModal;
