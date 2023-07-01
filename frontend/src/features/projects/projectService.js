import axios from "axios";

const API_URL = "/api/projects/";

const createProject = async (data, token) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getAllProjects = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getProjectDetails = async (projectId, token) => {
  const response = await axios.get(API_URL + projectId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateProject = async (projectId, data, token) => {
  const response = await axios.post(API_URL + projectId, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteProject = async (projectId, token) => {
  const response = await axios.delete(API_URL + projectId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const generateProjectReport = async (projectId, token) => {
  const response = await axios.get(API_URL + projectId + "/generate-report", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createProduct = async (projectId, data, token) => {
  const response = await axios.post(API_URL + projectId + "/products/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateProduct = async (projectId, productId, data, token) => {
  const response = await axios.post(
    API_URL + projectId + "/products/" + productId,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const projectService = {
  createProject,
  getAllProjects,
  getProjectDetails,
  updateProject,
  deleteProject,
  generateProjectReport,
  createProduct,
  updateProduct,
};

export default projectService;
