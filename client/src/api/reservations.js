import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000";
let ApiReservations = {}

ApiReservations.get = (async () => {
  return await axios.get(`${API_HOST}/reservations`);
})

ApiReservations.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/reservations`, insert);
})

ApiReservations.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/reservations/${id}`, update);
})

ApiReservations.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/reservations/${id}`);
})

export default ApiReservations;