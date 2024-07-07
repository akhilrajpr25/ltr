import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TablePagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addAPI,
  deletePostAPI,
  editAPI,
  getPostsAPI,
} from "../../api/services";
import SnackBarComponent from "../../ui-components/SnackBarComponent";
import AddPost from "../AddPost";
import useDebounce from "../../hooks/useDebounce";
import BasicTableCard from "../../ui-components/BasicTableCard";

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: "calc(100vh - 250px)",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  headerCell: {
    fontWeight: "bold",
    color: "red",
  },
  bodyCell: {
    fontSize: "14px",
  },
  addButton: {
    width: "100px",
  },
});

const columns = [
  { column: "Title", field: "title" },
  { column: "Body", field: "body" },
];

const Posts = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [notification, setNotification] = useState({});
  const [loader, setLoader] = useState(false);
  const [editId, setEditId] = useState(0);
  const [popup, setPopup] = useState({
    open: false,
  });
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleError = () => {
    setNotification({
      open: true,
      message: "Something went wrong",
      type: "error",
    });
  };

  const getData = useCallback(async () => {
    try {
      const response = await getPostsAPI();
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch {
      setLoading(false);
      handleError();
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (debouncedKeyword) {
      const filterData = data;

      setFilteredData(
        filterData.filter((item) => item?.title.includes(debouncedKeyword))
      );
    } else {
      setFilteredData(data);
    }
  }, [data, debouncedKeyword]);

  const handleNotificationClose = () => setNotification({});

  const handleDelete = async (id) => {
    setEditId(id);
    setLoader(true);
    try {
      const response = await deletePostAPI(id);
      if (response.data) {
        const filteredData = data.filter((item) => item.id !== id);
        setData([...filteredData]);
        setNotification({
          open: true,
          message: "Post deleted successfully.",
          type: "success",
        });
      }
    } catch (error) {
      handleError();
    }
    setEditId(0);
    setLoader(false);
  };

  const handlePopupCancel = () => setPopup({});

  const handleAdd = async (values) => {
    try {
      const response = await addAPI(values);
      if (response.data) {
        data.splice(0, 0, response.data);
        const updatedList = [...data];
        setData(updatedList);
        setNotification({
          open: true,
          message: "Post added successfully",
          color: "success",
        });
      }
    } catch (error) {
      handleError();
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await editAPI(values);
      if (response.data) {
        const dataIndex = data.findIndex(
          (item) => item.id === response.data.id
        );
        data[dataIndex] = response.data;
        const updatedList = [...data];
        setData(updatedList);
        setNotification({
          open: true,
          message: "Post updated successfully",
          color: "success",
        });
      }
    } catch (error) {
      handleError();
    }
  };

  const handlePopupConfirm = (values) => {
    switch (popup.type) {
      case "new":
        handleAdd(values);
        break;
      case "edit":
        handleUpdate(values);
        break;

      default:
        break;
    }
    handlePopupCancel();
  };

  return (
    <Box sx={{ width: "100%", m: "50px 50px 0px" }}>
      {loading ? (
        <BasicTableCard />
      ) : (
        <Paper sx={{ width: "100%" }} elevation={3}>
          <Toolbar>
            <Typography
              sx={{ flex: "1 1 100%", fontWeight: "bold" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Posts
            </Typography>
            <TextField
              label="Filter Title"
              size="small"
              sx={{ mr: "10px" }}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={() => setPopup({ open: true, type: "new" })}
            >
              New
            </Button>
          </Toolbar>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table" stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns.map((item) => (
                    <TableCell sx={{ fontWeight: "bold" }} key={item.field}>
                      {item.column}
                    </TableCell>
                  ))}
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <TableRow
                        key={`${index}-${item?.id}`}
                        sx={{
                          backgroundColor: index % 2 === 0 && "#e0e0e0",
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {columns.map((column, index) => (
                          <TableCell key={`${index}-${item?.id}`}>
                            {item[column.field]}
                          </TableCell>
                        ))}
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() =>
                                setPopup({
                                  open: true,
                                  type: "edit",
                                  details: item,
                                })
                              }
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(item?.id)}>
                              {editId === item?.id && loader ? (
                                <CircularProgress size={20} />
                              ) : (
                                <DeleteIcon color="primary" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography align="center">No Data</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {filteredData.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowsPerPage={rowsPerPage}
              component="div"
              page={page}
              count={filteredData.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
      {notification.open && (
        <SnackBarComponent
          {...notification}
          handleClose={handleNotificationClose}
        />
      )}
      {popup.open && (
        <AddPost
          {...popup}
          onCancel={handlePopupCancel}
          onConfirm={handlePopupConfirm}
        />
      )}
    </Box>
  );
};

export default Posts;
