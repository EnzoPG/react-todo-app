import axios from 'axios';
const apiURL = 'http://localhost:4100';
const endpointTasks = '/api/tasks';

export function getTasks() {
  return axios.get(`${apiURL}${endpointTasks}`);
}

export function createTask(params) {
  return axios.post(`${apiURL}${endpointTasks}`, params);
}

export function updateTask(id, task) {
  return axios.put(`${apiURL}${endpointTasks}/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(`${apiURL}${endpointTasks}/${id}`);
}