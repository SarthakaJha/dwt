import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProjectTable from "../components/ProjectTable";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createProject,
  deleteProject,
  editProject,
  getProjectList,
  reset,
} from "../features/projects/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
});

const ProjectForm = ({ project, onSubmit }) => {
  const formik = useFormik({
    initialValues: project ? { name: project.name } : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.setErrors({});
      formik.setValues(initialValues);
    },
    enableReinitialize: true,
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Typography variant="h5">New Project</Typography>
      <TextField
        required
        fullWidth
        id="name"
        name="name"
        label="Project Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
      />

      <Button type="submit" variant="contained">
        Create Project
      </Button>
    </Box>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);

  const handleView = (projId) => {
    navigate(`project/${projId}`);
  };

  const [sProject, setSProject] = useState(null);
  const handleFormEdit = (projId) => {
    const proj = projects.find((p) => p._id === projId);
    setSProject(proj);
  };

  const handleFormSubmit = (pData) => {
    if (sProject) {
      dispatch(editProject(pData));
    } else {
      dispatch(createProject(pData));
    }
  };

  const handleDelete = (projId) => {
    dispatch(deleteProject(projId));
  };

  useEffect(() => {
    dispatch(getProjectList());

    dispatch(reset());
  }, [dispatch]);

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <ProjectForm onSubmit={handleFormSubmit} project={sProject} />
      <Divider sx={{ my: 2 }} />
      <ProjectTable
        projects={projects}
        handleView={handleView}
        handleEdit={handleFormEdit}
        handleDelete={handleDelete}
      />
    </Paper>
  );
};

export default Dashboard;
