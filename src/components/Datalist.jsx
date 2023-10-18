import React from "react";
import { useState } from "react";
import {TableHead , Table, TableRow, TableCell, 
    Stack, Paper, TableContainer, TablePagination, TableBody, Typography, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const TableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell key={'name'}>
                    Nama
                </TableCell>
                <TableCell key={'created_at'}>
                    Tanggal dibuat
                </TableCell>
                <TableCell key={'settings'}>
                    Pengaturan
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const Datalist = ({data, type}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader />
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((d) => {
                  return (
                    <TableBody>
                        <TableRow>
                            <TableCell key='name'>  
                                <Typography>
                                    {d.name}
                                </Typography>
                            </TableCell>
                            <TableCell key='created-at'>
                                {d.created_at}
                            </TableCell>
                            <TableCell key='settings'>
                                <Stack direction={'row'} spacing={2}>
                                    <IconButton color="error"><DeleteIcon /></IconButton>
                                    <IconButton color="warning"><EditIcon/></IconButton>
                                    <IconButton color="info" 
                                      href={ ( type === 'saw' ? '/saw/'+d.id 
                                              : type === 'ahp' ? '/ahp/'+ d.id 
                                              : '/data/'+d.id )}
                                      >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                  );
                })}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}

export default Datalist;