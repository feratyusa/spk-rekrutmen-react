import React, { useState } from "react";
import {Box, Button, Collapse, IconButton, Paper, Stack, 
    Table, TableBody, TableCell, TableContainer, TableRow, Typography, TableHead, Alert, Grid} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "./Header";
import { useParams } from "react-router-dom";

function SAWCrisp({criteria}) {
    const [openCrisp, setOpenCrisp] = useState(false);
    
    return(
        <React.Fragment>
            <TableRow key={criteria.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {criteria.name}
                </TableCell>
                <TableCell>{criteria.weight}</TableCell>
                <TableCell>
                    {
                        criteria.crisps_type === 0 ? 'Number'
                        : criteria.crisps_type === 1 ? 'String'
                        : 'Sub String'
                    }
                </TableCell>
                <TableCell>
                    <IconButton 
                        variant="contained"
                        color="info"
                        aria-label="expand row" 
                        size="small" 
                        disabled={ !criteria.hasOwnProperty('crisps') || criteria.crisps.length === 0 ? true : false}
                        onClick={() => setOpenCrisp(!openCrisp)}
                    >
                        {openCrisp ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openCrisp} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="criteria-list">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Weight</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {criteria.crisps.map((crisp) => (
                                    <TableRow key={crisp.id}>
                                    <TableCell component="th" scope="row">
                                        {crisp.name}
                                    </TableCell>
                                    <TableCell>{crisp.weight}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function SAWCriteria({props}) {
    const {id} = useParams()

    return(
        <Table size="medium" aria-label="criteria-list">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Criteria Type</TableCell>
                <TableCell>Crisps</TableCell>
                {
                    props[0].crisps.length === 0 ?
                    <TableCell>
                        <Button 
                            variant="contained"
                            aria-label="expand row" 
                            size="small" 
                            endIcon={<AddIcon />}
                            href={'/saw/'+ id + '/criterias/crisps/form'}
                        >
                            Buat Crisps
                        </Button>
                    </TableCell> :
                    <TableCell>
                        <Stack direction={'row'} spacing={2}>
                            <Button 
                                variant="contained"
                                aria-label="edit criteria" 
                                size="small" 
                                color="warning"
                                endIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="contained"
                                aria-label="delete criteria" 
                                size="small" 
                                color="error"
                                endIcon={<DeleteIcon />}
                            >
                                Hapus
                            </Button>
                        </Stack>
                    </TableCell>
                }
            </TableRow>
            </TableHead>
            <TableBody>
            {props.map((criteria) => (
                <SAWCrisp criteria={criteria} />
            ))}
            </TableBody>
        </Table>
    );
}

function SAWComponents({props}){
    const [openCriteria, setOpenCriteria] = React.useState(false);

    return(
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Typography fontWeight={'bold'}>
                        Criterias
                    </Typography>
                </TableCell>                
                <TableCell>
                    {
                        props.criterias.length !== 0 ?
                        <Stack direction={'row'} spacing={2}>
                            <Button 
                                variant="contained"
                                aria-label="expand row" 
                                size="small" 
                                onClick={() => setOpenCriteria(!openCriteria)}
                                color="info"
                                endIcon={openCriteria ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            >
                                Tampil
                            </Button>
                            <Button 
                                variant="contained"
                                aria-label="edit criteria" 
                                size="small" 
                                color="warning"
                                endIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="contained"
                                aria-label="delete criteria" 
                                size="small" 
                                color="error"
                                endIcon={<DeleteIcon />}
                            >
                                Hapus
                            </Button>
                        </Stack>
                        :
                        <Button 
                            variant="contained"
                            aria-label="expand row" 
                            size="small" 
                            endIcon={<AddIcon />}
                            href={'/saw/'+ props.id + '/criterias/form'}
                        >
                            Buat
                        </Button>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openCriteria} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                        <SAWCriteria props={props.criterias}/>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function AHPCriteria() {
    return ''
}

function AHPCompoenents({props, importance}){
    const [openCriteria, setOpenCriteria] = useState(false)
    const [openImportance, setOpenImportance] = useState(false)

    return(
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Typography fontWeight={'bold'}>
                        Criterias
                    </Typography>
                </TableCell>
                <TableCell>
                    <Stack direction={'row'}>
                        <Button 
                            variant="contained"
                            aria-label="expand row" 
                            size="small" 
                            onClick={() => {setOpenCriteria(!openCriteria); setOpenImportance(!openImportance)} }
                            color="info"
                            endIcon={openCriteria ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        >
                            Tampil
                        </Button>
                        <Button 
                            variant="contained"
                            aria-label="expand row" 
                            size="small" 
                            onClick={() => {setOpenImportance(!openImportance); setOpenCriteria(!openCriteria)}}
                            color="info"
                            endIcon={openImportance ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        >
                            Skala
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openCriteria} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                        <SAWCriteria props={props} />
                    </Box>
                </Collapse>
                </TableCell>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openImportance} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                        <SAWCriteria props={props} />
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const TableDetails = ({data, type}) => {
    const title = (
        type === 'data' ? 'Data Details' 
        : type === 'ahp' ? 'AHP Details'
        : 'SAW Details'
    )

    function check_data(){
        if(type==='data') return 1
        if(type==='saw'){
            if(data.criterias.length === 0) return -2
            if(data.criterias[0].crisps.length === 0) return -1
            return 0
        }
        if(type==='ahp') return 0
    }
    
    return(
        <Paper sx={{width:'100%', overflow:'hidden'}}>
            <Grid container justifyContent={'space-between'}>
                <Grid item>
                    <Header title={title} />
                </Grid>
                <Grid item>
                    {
                        check_data() === 1?
                        ''
                        :
                        <Button variant="contained" 
                            endIcon={<AddIcon />}
                            href='/saw/method/create'
                            sx={{m:2}}
                            disabled={check_data() !== 0 ? true : false}
                        >
                            Jalankan
                        </Button>   
                    }
                </Grid>
            </Grid>
            <TableContainer>
                <Table sx={{width:'100%', mb:3}}>
                    <TableBody>
                    <TableRow>
                            <TableCell>
                                <Typography fontWeight={'bold'}>
                                    Nama
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {data.name}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell id="description">
                                <Typography fontWeight={'bold'}>
                                    Deskripsi
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {data.description}
                            </TableCell>
                        </TableRow>
                        {
                            type==='data'?
                            '' :
                            <TableRow>
                                <TableCell id="description">
                                    <Typography fontWeight={'bold'}>
                                        Data
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {data.data}
                                </TableCell>
                            </TableRow>
                        }
                        <TableRow>
                            <TableCell id="created_at">
                                <Typography fontWeight={'bold'}>
                                    Tanggal Dibuat
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {data.created_at}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={'bold'}>
                                    Tanggal Update
                                </Typography>
                            </TableCell>
                            <TableCell id="updated_at">
                                {data.updated_at}
                            </TableCell>
                        </TableRow>
                        {
                            type==='saw'?
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell id="updated_at">
                                        {
                                            Object.keys(data.criterias).length === 0 ?
                                            <Stack direction={'row'}>
                                                <Alert severity="warning">Belum ada Kriteria</Alert>
                                                <Alert severity="warning">Belum ada Crisps</Alert>
                                            </Stack>
                                            : data.criterias.hasOwnProperty('crisps') || Object.keys(data.criterias[0].crisps).length === 0 ?
                                            <Alert severity="warning">Belum ada Crisps</Alert>
                                            : <Alert severity="success">Ready!</Alert>
                                        }
                                </TableCell>
                            </TableRow>
                            : ''
                        }
                        {
                            type === 'data' ? 
                            <TableRow>
                                <TableCell id="file">
                                    <Typography fontWeight={'bold'}>
                                        File
                                    </Typography>
                                </TableCell>
                                <TableCell id="file">
                                    <Button startIcon={<CloudDownloadIcon />} color='info' variant="contained">
                                        Download
                                    </Button> 
                                </TableCell>
                            </TableRow>
                            : type === 'saw' ?
                                <SAWComponents props={data}/>    
                            : ''
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button >

            </Button>
        </Paper>
    );
}

export default TableDetails;