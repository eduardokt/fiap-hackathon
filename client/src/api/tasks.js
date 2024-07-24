import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/tasks";
let ApiTasks = {}

ApiTasks.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiTasks.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiTasks.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiTasks.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiTasks;