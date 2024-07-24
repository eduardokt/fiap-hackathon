import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/inscricoes";
let ApiInscricao = {}

ApiInscricao.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiInscricao.getUid = (async (uid) => {
  return await axios.post(`${API_HOST}/uid`, {'uid': uid});
})

ApiInscricao.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiInscricao.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiInscricao.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiInscricao;