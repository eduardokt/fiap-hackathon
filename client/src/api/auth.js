import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/auth";
let ApiAuth = {}

ApiAuth.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiAuth.login = (async (login) => {
  return await axios.post(`${API_HOST}/login`, login);
})

ApiAuth.logout = (async () => {
  return await axios.get(`${API_HOST}/logout`);
})

export default ApiAuth;