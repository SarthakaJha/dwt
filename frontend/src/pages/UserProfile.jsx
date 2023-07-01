import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { deleteUser, reset, updateUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import AlertDialog from "../components/AlertDialog";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Enter a valid email").required("Required"),
});

const UserFormDialog = ({ open, onClose, user }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.name || "",
      email: user.email || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
    },
  });

  const handleClose = () => {
    formik.setErrors({});
    onClose();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User updated successfully");
      handleClose();
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth
      aria-labelledby="user-edit"
      onClose={handleClose}
    >
      <DialogTitle>
        Edit user details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 14,
            color: (theme) => theme.palette.grey[500],
            display: fullScreen ? "block" : "none",
          }}
          disabled={isLoading}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
            autoFocus
          />

          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Save changes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Delete alert state
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User account deleted successfully");
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, isSuccess, message, navigate]);

  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary" gutterBottom>
              Personal Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleOpen}>
              Edit
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="gray">
              Name
            </Typography>
            <Typography variant="body">{user.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="gray">
              Email
            </Typography>
            <Typography variant="body">{user.email}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button variant="contained" color="error" onClick={handleOpenDel}>
              Delete Account/ Remove the Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <UserFormDialog open={open} onClose={handleClose} user={user} />
      {/* <AlertDialog
        open={openDel}
        onClose={handleCloseDel}
        title="Delete Account/ Remove the Profile"
        description=". Do you really want to delete your account"
        btnPositiveProps={{
          text: "Delete Account/ Remove the Profile",
          color: "error",
          onClick: handleDeleteUser,
          disabled: isLoading,
        }}
        btnNegativeProps={{
          text: "Go Back",
          onClick: handleCloseDel,
          disabled: isLoading,
        }}
      /> */}
    </>
  );
};

export default UserProfile;
