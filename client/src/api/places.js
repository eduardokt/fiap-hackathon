import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000";
let ApiPlaces = {}

ApiPlaces.get = (async () => {
  return await axios.get(`${API_HOST}/places`);
})

ApiPlaces.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/places`, insert);
})

ApiPlaces.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/places/${id}`, update);
})

ApiPlaces.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/places/${id}`);
})

export default ApiPlaces;