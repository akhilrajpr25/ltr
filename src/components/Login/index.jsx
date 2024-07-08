import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Grid, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../../auth/AuthWrapper";
import { useNavigate } from "react-router-dom";
import SnackBarComponent from "../../ui-components/SnackBarComponent";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: "300px",
    padding: "40px",
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
  loginIcon: {
    color: "#1976d2",
  },
}));

const Login = () => {
  const { login } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({});

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { username, password } = values;
      if (login(username, password)) {
        navigate("/");
      } else {
        setNotification({
          open: true,
          message: "Login failed",
          type: "error",
        });
      }
    },
  });

  const { getFieldProps, touched, errors, handleSubmit } = formik;

  return (
    <Grid container className={classes.root}>
      <Box className={classes.loginBox}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <LockIcon className={classes.loginIcon} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Username*"
              {...getFieldProps("username")}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Password*"
              type="password"
              {...getFieldProps("password")}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
      {notification.open && (
        <SnackBarComponent
          {...notification}
          handleClose={() => setNotification({})}
        />
      )}
    </Grid>
  );
};

export default Login;
