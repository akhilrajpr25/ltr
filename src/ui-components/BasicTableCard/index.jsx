import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: "calc(100vh - 250px)",
  },
});

const BasicTableCard = () => {
  const classes = useStyles();
  return (
    <Paper sx={{ width: "100%" }} elevation={3}>
      <Toolbar>
        <Skeleton variant="rectangular" sx={{ width: "100%" }} />
      </Toolbar>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="rectangular" sx={{ width: "100%" }} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton variant="rectangular" sx={{ width: "100%" }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BasicTableCard;
