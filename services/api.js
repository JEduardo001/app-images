import axios from 'axios';
//http://192.168.1.55:3000/api/user/eduardo@gmail.com/upload
const API = axios.create({
  baseURL: 'http://192.168.1.55:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const getUser = (email) => API.get(`/user/${email}`);
export const updateUser = (email,username) => API.put(`/user/${email}`,{username});
export const uploadProfilePic = (email, formData) => API.post(`/user/${email}/upload`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const deleteUser = (email) => API.delete(`/user/${email}`);
export const deleteProfilePic = (email) => API.delete(`/user/${email}/photo`)


//-----------------Categorías-------------------

export const getCategories = () => API.get('/categories');
export const getCategoryById = (id) => API.get(`/categories/${id}`);
export const createCategory = (name) => API.post('/categories', { name });
export const updateCategory = (id, name) => API.put(`/categories/${id}`, { name });
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
//-----------------Wallpapers-------------------

export const createWallpaper = (formData) => API.post('/wallpapers', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const getAllWallpapers = () => API.get('/wallpapers');
export const getWallpaperById = (id) => API.get(`/wallpapers/${id}`);
export const getWallpapersByUser = (userId) => API.get(`/wallpapers/user/${userId}`);
export const getWallpapersByCategory = (categoryId) => API.get(`/wallpapers/category/${categoryId}`);
export const updateWallpaperDescription = (id, description) => API.put(`/wallpapers/${id}`, { description });
export const toggleWallpaperLike = (id, userId) => API.post(`/wallpapers/${id}/like`, { userId });
export const deleteWallpaper = (id) => API.delete(`/wallpapers/${id}`);

/* 

{
    "email": "asdas",
    "password": "123",
    "username": "asdas"

}*/
