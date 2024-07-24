import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/admin";
let ApiAdmin = {}

ApiAdmin.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiAdmin.getUid = (async (uid) => {
  return await axios.post(`${API_HOST}/uid`, {'uid': uid});
})

ApiAdmin.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiAdmin.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiAdmin.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiAdmin;