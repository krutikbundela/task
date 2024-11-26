import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useState } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";

export default function TableComponent() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { products, isLoading, isError } = useSelector(
    (state) => state.product
  );

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "title", label: "Title", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "category", label: "Category", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
  ];

  const rows = products.map((product) => ({
    ...product,
    action: (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => navigate(`/productdetails/${product.id}`)}
      >
        Show
      </Button>
    ),
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <>
      <Box m={2}>
        <Typography
          align="center"
          variant="h3"
          components="h3"
          sx={{
            color: "#1976d3",
            fontWeight: "500",
          }}
        >
          {`Products`}
        </Typography>
        <Divider
          sx={{ width: "20%", borderBottomWidth: 10, margin: "1rem auto" }}
        />
      </Box>
      <Paper sx={{ width: "80%", overflow: "hidden", margin:"auto" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
