import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver';
import {Box, Button, Collapse, IconButton, Paper, Stack, 
    Table, TableBody, TableCell, TableContainer, TableRow, 
    Typography, TableHead, Alert, Grid, Dialog, DialogActions} from '@mui/material'
import DeleteDialogContent from "./DeleteDialogContent";
import LoadingButton from '@mui/lab/LoadingButton'
import AddIcon from '@mui/icons-material/Add';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "./Header";
import runSAWMethod from "../utils/handler/saw/runSAWMethod";
import getDataFile from "../utils/handler/data/getDataFile";
import getSAWFile from "../utils/handler/saw/getSAWFile";
import deleteSAWCrisps from "../utils/handler/saw/deleteSAWCrisps";
import deleteSAWCriteria from "../utils/handler/saw/deleteSAWCriteria";

function SAWCrisp({criteria}) {
    const {id} = useParams()
    const [openCrisp, setOpenCrisp] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)

    const handleCloseDialog = () => {
        setOpenDialog(false)
    };

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    function handleDeleteData(){
        setLoadingDelete(true)
        Promise.all([deleteSAWCrisps(id, criteria.id)])
            .then(function([response]){
                console.log(response)
            }).catch(function([error]){
                console.log(error.config)
            }).finally(function(){
                setLoadingDelete(false)
                setOpenDialog(false)
                window.location.reload()
            })
    }
    
    return(
        <React.Fragment>
            <TableRow key={criteria.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {criteria.name}
                </TableCell>
                <TableCell>{criteria.weight}</TableCell>
                <TableCell>
                    {
                        criteria.atribute === 0 ? 'Benefit'
                        : 'Cost'
                    }
                </TableCell>
                <TableCell>
                    {
                        criteria.crisp_type === 0 ? 'Number'
                        : criteria.crisp_type === 1 ? 'String'
                        : 'Sub String'
                    }
                </TableCell>
                <TableCell>
                    <IconButton 
                        variant="contained"
                        color="info"
                        aria-label="expand row" 
                        size="small" 
                        disabled={ criteria.saw_crisp.length === 0 ? true : false}
                        onClick={() => setOpenCrisp(!openCrisp)}
                    >
                        {openCrisp ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {
                        criteria.saw_crisp.length === 0 ?
                        <Button 
                            variant="contained"
                            aria-label="expand row" 
                            size="small" 
                            endIcon={<AddIcon />}
                            href={'/saw/'+ id + '/criterias/'+ criteria.id +'/crisps/form'}
                        >
                            Buat Crisps
                        </Button> :
                        <Stack direction={'row'} spacing={2}>
                            <Button 
                                variant="contained"
                                aria-label="edit criteria" 
                                size="small" 
                                color="warning"
                                endIcon={<EditIcon />}
                                href={'/saw/'+id+'/criterias/'+criteria.id+'/crisps/edit'}
                            >
                                Edit
                            </Button>
                            <LoadingButton 
                                variant="contained"
                                aria-label="delete criteria" 
                                size="small" 
                                color="error"
                                endIcon={<DeleteIcon />}
                                loading={loadingDelete} 
                                onClick={handleOpenDialog}
                            >
                                Hapus
                            </LoadingButton>
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DeleteDialogContent 
                                content={"Crisp"} 
                                description={
                                    "Semua Crisp dari kriteria akan dihapus"
                                } />
                                <DialogActions>
                                <Button onClick={handleCloseDialog}>Batalkan</Button>
                                <LoadingButton loading={loadingDelete} onClick={(event) => handleDeleteData()}>
                                    Hapus
                                </LoadingButton>
                                </DialogActions>
                            </Dialog>
                        </Stack>                      
                    }
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
                                    <TableCell>Details</TableCell>
                                    <TableCell>Weight</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {criteria.saw_crisp.map((crisp) => (
                                    <TableRow key={crisp.id}>
                                        <TableCell component="th" scope="row">
                                            {crisp.name}
                                        </TableCell>
                                        <TableCell>{crisp.detail}</TableCell>
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
    return(
        <Table size="medium" aria-label="criteria-list">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Atribute</TableCell>
                <TableCell>Criteria Type</TableCell>
                <TableCell>Crisps</TableCell>
                <TableCell></TableCell>
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
    const {id} = useParams()
    const [openCriteria, setOpenCriteria] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)

    const handleCloseDialog = () => {
        setOpenDialog(false)
    };

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    function handleDeleteData(){
        setLoadingDelete(true)
        Promise.all([deleteSAWCriteria(id)])
            .then(function([response]){
                console.log(response)
            }).catch(function([error]){
                console.log(error.config)
            }).finally(function(){
                setLoadingDelete(false)
                setOpenDialog(false)
                window.location.reload()
            })
    }

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
                        props.saw_criteria.length !== 0 ?
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
                                href={"/saw/"+props.id+"/criterias/edit"}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="contained"
                                aria-label="delete criteria" 
                                size="small" 
                                color="error"
                                endIcon={<DeleteIcon />}
                                onClick={handleOpenDialog}
                            >
                                Hapus
                            </Button>
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DeleteDialogContent
                                    content={"Kriteria"}
                                    description={
                                        "Semua Kriteria pada SAW akan dihapus"
                                    }
                                />
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Batalkan</Button>
                                    <LoadingButton loading={loadingDelete} onClick={(event) => handleDeleteData()}>
                                        Hapus
                                    </LoadingButton>
                                </DialogActions>
                            </Dialog>
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
                        <SAWCriteria props={props.saw_criteria}/>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function AHPCrisp({criteria}){
    const {id} = useParams()
    const [openCrisp, setOpenCrisp] = useState(false);
    
    return(
        <React.Fragment>
            <TableRow key={criteria.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {criteria.name}
                </TableCell>
                <TableCell>
                    {
                        criteria.crisp_type === 0 ? 'Number'
                        : 'String'
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
                <TableCell>
                    {
                        criteria.crisps.length === 0 ?
                        <Button 
                            variant="contained"
                            aria-label="expand row" 
                            size="small" 
                            endIcon={<AddIcon />}
                            href={'/ahp/'+ id + '/criterias/'+ criteria.id +'/crisps/form'}
                        >
                            Buat Crisps
                        </Button> :
                        <Stack direction={'row'} spacing={2}>
                            <Button 
                                variant="contained"
                                aria-label="edit criteria" 
                                size="small" 
                                color="warning"
                                endIcon={<EditIcon />}
                                href={''}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="contained"
                                aria-label="delete criteria" 
                                size="small" 
                                color="error"
                                endIcon={<DeleteIcon />}
                                href={''}
                            >
                                Hapus
                            </Button>
                        </Stack>                      
                    }
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
                                    <TableCell>Details</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {criteria.crisps.map((crisp) => (
                                    <TableRow key={crisp.id}>
                                    <TableCell component="th" scope="row">
                                        {crisp.name}
                                    </TableCell>
                                    <TableCell>{crisp.details}</TableCell>
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

function AHPCrispsImportance({criteria}){
    const {id} = useParams()
    const [openCriteria, setOpenCriteria] = React.useState(false);

    let crisps = []
    let status = 0
    for (let index = 0; index < criteria.crisps.length; index++) {
        if(criteria.crisps[index].importance.length === 0){
            status = -1
            break
        }    
    }

    if(status === 0){
        for (let i = 0; i < criteria.crisps.length-1; i++) {
            for (let j = 0; j < criteria.crisps.length-1-i; j++) {
                crisps.push(
                    {
                        ca:criteria.crisps[i].name, 
                        cb:criteria.crisps[i+j+1].name, 
                        imp:criteria.crisps[i].importance[i+j].importance
                    }
                )
            }
        }
    }

    return(
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Typography>
                        {criteria.name}
                    </Typography>
                </TableCell>     
                <TableCell>
                    {
                        criteria.crisps_type === 0 ? 'Number'
                        : 'String'
                    }
                </TableCell>           
                <TableCell>
                    {
                        status === 0 ?
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
                            href={'/ahp/'+ id + '/criterias/'+criteria.id+'/crisps/importance/form'}
                        >
                            Buat Skala Crisps
                        </Button>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openCriteria} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>                        
                        <Table size="medium" aria-label="criteria-list">
                            <TableHead>
                            <TableRow>
                                <TableCell>Crisp A</TableCell>
                                <TableCell>Crisp B</TableCell>
                                <TableCell>Skala</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {crisps.map((crisp, index) => (
                                <TableRow key={index}>
                                    <TableCell>{crisp.ca}</TableCell>
                                    <TableCell>{crisp.cb}</TableCell>
                                    <TableCell>{crisp.imp}</TableCell>
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

function AHPCriteria({props, type}) {
    return(
        <Table size="medium" aria-label="criteria-list">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Criteria Type</TableCell>
                {
                    type === 'crisps_importance' ?
                    <TableCell>Crisps Importance</TableCell> 
                    :
                    <TableCell>Crisps</TableCell>                       
                }
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            {
                type === 'crisps_importance' ?
                <TableBody>
                {props.map((criteria) => (                    
                    <AHPCrispsImportance criteria={criteria} />             
                ))}
                </TableBody>
                :
                <TableBody>
                {props.map((criteria) => (                    
                    <AHPCrisp criteria={criteria} />             
                ))}
                </TableBody>
            }
        </Table>
    );
}

function AHPComponents({props, type}){
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
                            href={'/ahp/'+ props.id + '/criterias/form'}
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
                        <AHPCriteria props={props.criterias}/>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function AHPImportance({props, type}){
    const {id} = useParams()
    const [openCriteria, setOpenCriteria] = React.useState(false);

    let criterias = []
    let status = (props.length === 0 ? -1 : 0)
    for (let index = 0; index < props.length; index++) {
        if(props[index].importance.length === 0){
            status = -1
            break
        }    
    }

    if(type === 'criteria' && status === 0){
        for (let i = 0; i < props.length-1; i++) {
            for (let j = 0; j < props.length-1-i; j++) {
                criterias.push({ca:props[i].name, cb:props[i+j+1].name, imp:props[i].importance[i+j].importance})
            }
        }
    }

    return(
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Typography fontWeight={'bold'}>
                        {
                            type === 'criteria' ?
                            'Skala Kriteria'
                            :
                            'Skala Crisps'
                        }
                    </Typography>
                </TableCell>                
                <TableCell>
                    {
                        type === 'crisps' ?
                        <Button 
                            variant="contained"
                            aria-label="expand row" 
                            size="small" 
                            onClick={() => setOpenCriteria(!openCriteria)}
                            color="info"
                            endIcon={openCriteria ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            disabled={status === -1 ? true : false}
                        >
                            Tampil
                        </Button>
                        : status === 0 ?
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
                            href={'/ahp/'+ id + '/criterias/importance/form'}
                            disabled={props.length === 0 ? true : false}
                        >
                            Buat Skala Kriteria
                        </Button>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openCriteria} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                    {
                        type === 'criteria' ?
                        <Table size="medium" aria-label="criteria-list">
                            <TableHead>
                            <TableRow>
                                <TableCell>Kriteria A</TableCell>
                                <TableCell>Kriteria B</TableCell>
                                <TableCell>Skala</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {criterias.map((criteria, index) => (
                                <TableRow key={index}>
                                    <TableCell>{criteria.ca}</TableCell>
                                    <TableCell>{criteria.cb}</TableCell>
                                    <TableCell>{criteria.imp}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table> :
                        <AHPCriteria props={props} type={'crisps_importance'}/>
                    }
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
    const csvfile = useRef(null)
    const [loadingRun, setLoadingRun] = useState(false)
    const [loadingDownload, setLoadingDownload] = useState(false)

    function check_data(){
        if(type==='data') return 1
        if(type==='saw'){
            if(data.saw_criteria.length === 0) return -2
            for (let index = 0; index < data.saw_criteria.length; index++) {
                if(data.saw_criteria[index].saw_crisp.length === 0) return -1
            }            
            return 0
        }
        if(type==='ahp'){
            if(data.criterias.length === 0) return -4
            for (let index = 0; index < data.criterias.length; index++) {
                if(data.criterias[index].crisps.length === 0) return -3
            }
            for (let index = 0; index < data.criterias.length; index++) {
                console.log(data.criterias[index].importance.length)
                if(data.criterias[index].importance.length === 0) return -2
                for (let j = 0; j < data.criterias[index].crisps.length; j++) {
                    if(data.criterias[index].crisps[j].importance.length === 0) return -1
                }
            }
            return 0
        }
    }

    function downloadFile(){
        setLoadingDownload(true)
        if(type==='data'){
            Promise.all([getDataFile(data.id)])
                .then(function([response]){
                    csvfile.current = new File([response.data], data.file_path, {
                        type:'text/csv'
                    })
                    console.log(csvfile.current)
                    saveAs(csvfile.current)
                    setLoadingDownload(false)
                }).catch(function(error){
                    console.log(error.response)
                    setLoadingDownload(false)
                })
        }
        else if (type==='saw') {
            if(data.result_path){
                Promise.all([getSAWFile(data.id)])
                .then(function([response]){
                    csvfile.current = new File([response.data], data.result_path, {
                        type:'text/csv'
                    })
                    console.log(response)
                    saveAs(csvfile.current)
                    setLoadingDownload(false)
                }).catch(function(error){
                    console.log(error.response)
                    setLoadingDownload(false)
                })
            }
        }
    }
    
    function handleRunMethod(){
        setLoadingRun(true)
        if(type==='saw'){
            Promise.all([runSAWMethod(data.id)])
            .then(function(response){
                console.log(response)
                setLoadingRun(false)
                window.location.reload();
            }).catch(function(error){
                console.log(error.config)
            })
        }
    }

    return(
        <Paper sx={{width:'100%', overflow:'hidden'}}>
            <Grid container justifyContent={'space-between'}>
                <Grid item>
                    <Header title={title} />
                </Grid>
                <Grid item>
                    {
                        check_data() === 1? '' :
                        <LoadingButton variant="contained" 
                            endIcon={<AddIcon />}
                            sx={{m:2}}
                            disabled={check_data() !== 0 ? true : false}
                            onClick={handleRunMethod}
                            loading={loadingRun}
                        >
                            Jalankan
                        </LoadingButton>           
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
                                    {data.data.name}
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
                            type==='data'? '' :
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Result
                                    </Typography>
                                </TableCell>
                                <TableCell id="result">
                                        {
                                            data.result_path === null ?
                                            <Alert severity="warning">Metode belum dijalankan</Alert> :
                                            <LoadingButton 
                                                startIcon={<CloudDownloadIcon />} 
                                                color='info' 
                                                variant="contained"
                                                loading={loadingDownload}
                                                onClick={downloadFile}
                                            >
                                                Download
                                            </LoadingButton> 
                                        }
                                </TableCell>
                            </TableRow>
                        }
                        {
                            type === 'data' ? '' 
                            : type=== 'saw' ?
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell id="status">
                                        {
                                            check_data() === -2 ?
                                            <Stack direction={'row'} spacing={2}>
                                                <Alert severity="warning">Belum ada Kriteria</Alert>
                                                <Alert severity="warning">Crisps Belum Lengkap</Alert>
                                            </Stack>
                                            : check_data() === -1 ?
                                            <Alert severity="warning">Crisps Belum Lengkap</Alert>
                                            : <Alert severity="success">Ready!</Alert>
                                        }
                                </TableCell>
                            </TableRow> :
                                <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell id="updated_at">
                                        {
                                            check_data() === -4 ?
                                            <Stack direction={'row'} spacing={2}>
                                                <Alert severity="warning">Belum ada Kriteria dan Crisps</Alert>
                                                <Alert severity="warning">Belum ada Skala Kriteria dan Crisps</Alert>
                                            </Stack>
                                            : check_data() === -3 ?
                                            <Stack direction={'row'} spacing={2}>
                                                <Alert severity="warning">Crisps Belum Lengkap</Alert>
                                                <Alert severity="warning">Belum ada Skala Kriteria dan Crisps</Alert>
                                            </Stack>
                                            : check_data() === -2 ?
                                            <Alert severity="warning">Belum ada Skala Kriteria dan Crisps</Alert>
                                            : check_data() === -1 ?
                                            <Alert severity="warning">Skala Crisps Belum Lengkap</Alert>
                                            : <Alert severity="success">Ready!</Alert>
                                        }
                                </TableCell>
                            </TableRow>
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
                                    <LoadingButton 
                                        startIcon={<CloudDownloadIcon />} 
                                        color='info'
                                        variant="contained"
                                        loading={loadingDownload}
                                        onClick={downloadFile}
                                    >
                                        Download
                                    </LoadingButton> 
                                </TableCell>
                            </TableRow>
                            : type === 'saw' ?
                                <SAWComponents props={data}/>
                            :
                            <React.Fragment>
                                <AHPComponents props={data}/>
                                <AHPImportance props={data.criterias} type={'criteria'}/>
                                <AHPImportance props={data.criterias} type={'crisps'} />
                            </React.Fragment>
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