import React from "react";
import { useState } from "react";
import {TableHead , Table, TableRow, TableCell, 
    Stack, Paper, TableContainer, TablePagination, 
    TableBody, Typography, IconButton, Alert, 
    Button} from "@mui/material";
import {LoadingButton} from '@mui/lab'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from "react";
import { useRef } from "react";
import getData from "../utils/handler/data/getData";
import deleteData from "../utils/handler/data/deleteData";
import deleteSAW from "../utils/handler/saw/deleteSAW";
import DeleteDialogContent from "./DeleteDialogContent";

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
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)
    const counter = useRef(0)

    useEffect(() => {
      Promise.all([getData()])
        .then(function([data]){
          console.log(data.data)
          counter.current = data.data.length ? data.data.length : 0
          setLoading(false)
        })
    }, [loading])
    
    
    const handleCloseDialog = () => {
      setOpenDialog(false)
    };

    const handleOpenDialog = () => {
      setOpenDialog(true)
    }

    function handleDeleteData(id){
      setLoadingDelete(true)
      if(type==='data'){
        Promise.all([deleteData(id)])
          .then(function([response]){
            console.log(response)
            setLoadingDelete(false)
            setOpenDialog(false)
            window.location.reload()
          }).catch(function(error){
            console.log(error.config)
          })
      }
      else if(type==='saw'){
        Promise.all([deleteSAW(id)])
          .then(function([response]){
            console.log(response)
            setLoadingDelete(false)
            setOpenDialog(false)
            window.location.reload()
          }).catch(function([error]){
            console.log(error.config)
          })
      }
    }
  
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
              <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((d) => {
                  return (
                    <TableRow key={d.id}>
                        <TableCell>  
                            <Typography>
                                {d.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {d.created_at}
                        </TableCell>
                        <TableCell>
                            <Stack direction={'row'} spacing={2}>
                                <IconButton color="error" onClick={handleOpenDialog}>
                                  <DeleteIcon />
                                </IconButton>
                                <Dialog
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                  <DeleteDialogContent 
                                    content={type==='data' ? "Data" : type==='saw' ? "SAW" : "AHP"} 
                                    description={
                                      type==='data' ?
                                      "Semua hasil yang terkait dengan Data ini juga akan ikut terhapus. Pastikan tidak \
                                      ada metode SAW maupun AHP atau anda sudah menyimpan hasil SAW maupun AHP yang \
                                      menggunakan data ini"
                                      : type === 'saw' ?
                                      "Semua hasil dari metode SAW juga akan ikut terhapus. Pastikan anda sudah menyimpan \
                                      hasil SAW yang telah dibuat." 
                                      :
                                      "Semua hasil dari metode AHP juga akan ikut terhapus. Pastikan anda sudah menyimpan \
                                      hasil AHP yang telah dibuat."
                                    } />
                                    <DialogActions>
                                    <Button onClick={handleCloseDialog}>Batalkan</Button>
                                    <LoadingButton loading={loadingDelete} onClick={(event) => handleDeleteData(d.id)}>
                                        Hapus
                                    </LoadingButton>
                                    </DialogActions>
                                </Dialog>
                                <IconButton color="warning" 
                                  href={type==='data' ? '/data/'+d.id+'/edit'
                                        : type==='saw' ? '/saw/'+d.id+'/edit'
                                        : '/ahp/'+d.id+'/edit'}
                                >
                                  <EditIcon/>
                                </IconButton>
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
                );
              })}
              </TableBody>
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