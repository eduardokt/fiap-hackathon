import * as React from 'react';
import axios from "axios";
const API_HOST = "http://localhost:3000/api/member-task";
let ApiMembersTask = {}

ApiMembersTask.get = (async () => {
  return await axios.get(`${API_HOST}`);
})

ApiMembersTask.insert = (async (insert) => {
  return await axios.post(`${API_HOST}/new`, insert);
})

ApiMembersTask.update = (async (id, update) => {
  return await axios.put(`${API_HOST}/update/${id}`, update);
})

ApiMembersTask.delete = (async (id) => {
  return await axios.delete(`${API_HOST}/delete/${id}`);
})

export default ApiMembersTask;