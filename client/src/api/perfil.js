import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/perfil";
let ApiPerfil = {}

ApiPerfil.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiPerfil.getUid = (async (uid) => {
  return await axios.post(`${API_HOST}/uid`, {'uid': uid});
})

ApiPerfil.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiPerfil.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiPerfil.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiPerfil;