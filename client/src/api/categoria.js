import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/categoria";
let ApiCategoria = {}

ApiCategoria.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiCategoria.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiCategoria.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiCategoria.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiCategoria;