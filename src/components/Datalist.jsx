import React from "react";
import { useState } from "react";
import {TableHead , Table, TableRow, TableCell, 
    Stack, Paper, TableContainer, TablePagination, TableBody, Typography, IconButton, Alert} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from "react";
import { useRef } from "react";
import getData from "../utils/handler/getData";

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
    const [loading, setLoading] = useState(true)
    const counter = useRef(0)

    useEffect(() => {
      Promise.all([getData()])
        .then(function([data]){
          console.log(data.data)
          counter.current = data.data.length ? data.data.length : 0
          setLoading(false)
        })
    }, [loading])
    
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      Array.isArray(data) === false ?
      <Paper sx={{ width: '100%', p:3}}>
        <Stack spacing={2} alignItems={'center'}>
          {
            type === 'data' ?
            <React.Fragment>
              <Typography variant="h6">
                Data Kosong
              </Typography>
            </React.Fragment> :
            <React.Fragment>
              <Typography variant="h6">
                {
                  type === 'saw' ? 'SAW Kosong' : 'AHP Kosong'
                }
              </Typography>
              {
                counter.current === 0 ?
                <Alert severity="error">Tambah Data baru terlebih dahulu sebelum menambahkan SAW</Alert> :    
                ''
              }
            </React.Fragment> 
          }
        </Stack>
      </Paper>
      
      :
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