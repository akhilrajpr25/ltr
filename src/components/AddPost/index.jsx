import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import _ from "lodash";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiPaper-root.MuiPaper-elevation": {
      width: "500px",
      padding: "15px 20px",
    },
  },
  title: {
    fontWeight: 900,
    padding: "0px",
  },
  actions: {
    gap: "17px",
    padding: "30px 0 0",
    "& button": {
      fontSize: "13px",
      textTransform: "none",
    },
  },
  textField: {
    width: "100%",
  },
}));

const AddPost = ({ open, type, details, onConfirm, onCancel }) => {
  const classes = useStyles();

  const isDetailView = type === "edit" && !_.isEmpty(details);

  const initialValues = {
    title: isDetailView ? details?.title : "",
    body: isDetailView ? details?.body : "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("This field is required"),
    body: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = type === "edit" ? { ...details, ...values } : values;
      onConfirm(data);
    },
  });

  const { getFieldProps, touched, errors, handleSubmit } = formik;

  return (
    <Dialog open={open} className={classes.root}>
      <DialogTitle sx={{ pb: "0px" }}>
        {type === "new" ? "Add" : "Edit"} Post
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: "10px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Title*"
              {...getFieldProps("title")}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Body*"
              {...getFieldProps("body")}
              error={touched.body && Boolean(errors.body)}
              helperText={touched.body && errors.body}
              multiline
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPost;
