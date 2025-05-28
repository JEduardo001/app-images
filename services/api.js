import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.42:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const getUser = (email) => API.get(`/user/${email}`);
export const updateUser = (email,username) => API.put(`/user/${email}`,username);


/* 

{
    "email": "asdas",
    "password": "123",
    "username": "asdas"

}*/
