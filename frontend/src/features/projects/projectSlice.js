import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new project
export const createProject = createAsyncThunk(
  "project/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.createProject(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all projects created by the user
export const getProjectList = createAsyncThunk(
  "project/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.getAllProjects(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get project details
export const getProjectDetails = createAsyncThunk(
  "project/getDetails",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.getProjectDetails(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit project details
export const editProject = createAsyncThunk(
  "project/update",
  async (data, thunkAPI) => {
    try {
      const [id, projectData] = data;
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.updateProject(id, projectData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete the project
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.deleteProject(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Generate the project report
export const generateProjectReport = createAsyncThunk(
  "project/generateReport",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.generateProjectReport(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "project/createProduct",
  async (data, thunkAPI) => {
    try {
      const [projectId, productData] = data;

      const token = thunkAPI.getState().auth.user.token;
      return await projectService.createProduct(projectId, productData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "project/updateProduct",
  async (data, thunkAPI) => {
    try {
      const [projectId, productData] = data;
      const productId = productData._id;
      const prodData = {
        name: productData.name,
        lat: productData.lat,
        lon: productData.lon,
        tilt: productData.tilt,
        orientation: productData.orientation,
      };

      const token = thunkAPI.getState().auth.user.token;
      return await projectService.updateProduct(
        projectId,
        productId,
        prodData,
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const uProj = action.payload;
        const uProjList = state.projects.map((project) =>
          project._id === uProj._id ? uProj : project
        );
        state.projects = uProjList;
      })
      .addCase(editProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.formMessage = action.payload;
      })
      .addCase(getProjectList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjectList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjectDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedProj = action.payload;
        const updatedList = state.projects.filter(
          (project) => project._id !== deletedProj._id
        );
        state.projects = updatedList;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.formMessage = action.payload;
      })
      .addCase(generateProjectReport.pending, (state) => {
        state.isFormLoading = true;
      })
      .addCase(generateProjectReport.fulfilled, (state, action) => {
        state.isFormLoading = false;
        state.isFormSuccess = true;
        const updatedProj = action.payload;
        const updatedList = state.projects.map((project) =>
          project._id === updatedProj._id ? updatedProj : project
        );
        state.project = updatedList;
      })
      .addCase(generateProjectReport.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isFormError = true;
        state.formMessage = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isFormLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isFormLoading = false;
        state.isFormSuccess = true;
        state.project.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isFormError = true;
        state.formMessage = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isFormLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isFormLoading = false;
        state.isFormSuccess = true;

        const updatedProduct = action.payload;
        const newProductList = state.project.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        state.project.products = newProductList;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isFormError = true;
        state.formMessage = action.payload;
      });
  },
});

export const { reset, resetForm } = projectSlice.actions;
export default projectSlice.reducer;
