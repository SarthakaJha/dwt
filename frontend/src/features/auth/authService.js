import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "auth", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Update user details
const updateUser = async (id, data, token) => {
  const response = await axios.post(API_URL + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const deleteUser = async (id, token) => {
  const response = await axios.delete(API_URL + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  logout();

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
};

export default authService;
