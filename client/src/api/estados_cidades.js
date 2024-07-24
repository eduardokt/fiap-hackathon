import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/estados_cidades";
let ApiEstadosCidades = {}

ApiEstadosCidades.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiEstadosCidades.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiEstadosCidades.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiEstadosCidades.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiEstadosCidades;