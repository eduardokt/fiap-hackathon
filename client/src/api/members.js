import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/members";
let ApiMembers = {}

ApiMembers.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiMembers.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiMembers.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiMembers.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiMembers;