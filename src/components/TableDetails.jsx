import React, { useState } from "react";
import {Box, Button, Collapse, IconButton, Paper, Stack, 
    Table, TableBody, TableCell, TableContainer, TableRow, Typography, TableHead} from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Header from "./Header";

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
                    <IconButton 
                        variant="contained"
                        aria-label="expand row" 
                        size="small" 
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
    return(
        <Table size="medium" aria-label="criteria-list">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Crisps</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.map((criteria) => (
                <SAWCrisp criteria={criteria}/>
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
    return(
        <Paper sx={{width:'100%', overflow:'hidden'}}>
            <Header title={title} />
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
                            type === 'data'
                            ? 
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
                                <SAWComponents props={data.criterias} />    
                            : ''
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TableDetails;