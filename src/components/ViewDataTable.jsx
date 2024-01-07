import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { Box, Paper, Stack, Tooltip, Typography, InputAdornment } from '@mui/material';
import { useEffect } from 'react';
import {TextField, Button, IconButton} from '@mui/material';
import Header from "./Header"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useParams } from 'react-router-dom';
import getSAWOutput from '../utils/handler/saw/getSAWOutput';
import { useState } from 'react';
import getAHPOutput from '../utils/handler/ahp/getAHPOutput';
import getSAWFileDetails from '../utils/handler/saw/getSAWFileDetails';
import getAHPFileDetails from '../utils/handler/ahp/getAHPFileDetails';

function get_rows(data, threshold_percentage, max_value){
    const threshold_value = (threshold_percentage/100) * max_value
    const dataRows = []
    for (let index = 0; index < data.data.length; index++) {
        const row = {}
        if(parseFloat(data.data[index][data.columns.length-2]) < threshold_value) continue
        for (let jndex = 0; jndex < data.columns.length; jndex++) {
            const col = 'col'+jndex
            row[col] = data.data[index][jndex]
        }
        dataRows.push(row)
    }
    return dataRows
}

function get_columns(data){
    const dataColumns = []
    for (let index = 0; index < data.columns.length; index++) {
        dataColumns.push(
            {
                field: 'col'+index, 
                headerName: data.columns[index], 
                width: 120, 
                headerClassName:'header-style',
            })
    }
    return dataColumns
}

const ViewDataTable = ({type}) => {
    const { id, file_id } = useParams()
    const navigate = useNavigate()
    
    const [threshold, setThreshold] = useState(70)
    const [loading, setLoading] = useState(true)

    const [table, setTable] = useState(null)
    const [result, setResult] = useState(null)
    const [rows, setRows] = useState(null)
    const [columns, setColumns] = useState(null)

    function onChangeThreshold(event){
        setThreshold(event.target.value)
    }

    function navigateBack(){
        navigate(-1)
    }

    useEffect(() => {
        if(loading){
            Promise.all(type === 'saw' ? [getSAWOutput(id, file_id, 0), getSAWFileDetails(id, file_id)] 
                            : [getAHPOutput(id, file_id, 0), getAHPFileDetails(id, file_id)])
            .then(function([data, res]){
                console.log(data, res)
                setTable(data.data)
                setResult(res.data)
                setRows(get_rows(data.data, threshold, res.data.max_value))
                setColumns(get_columns(data.data))                
                setLoading(false)
            }).catch(function([error]){
                console.log(error.config)
            })
        }
        else{
            setRows(get_rows(table, threshold, result.max_value))
        }
    }, [threshold])

    return (
        loading ? '' :
        <Box>
            <Stack direction={'row'} spacing={2} sx={{mb:4}}>
                <IconButton aria-label="back" size="medium" onClick={navigateBack}>
                    <ArrowBackIcon fontSize="inherit"/>
                </IconButton>
                <Header title={type==='saw'? 'Hasil Rekomendasi SAW ('+ result.created_at+')' 
                                : 'Hasil Rekomendasi AHP ('+result.created_at+')'}/>
            </Stack>

            <Stack direction={'row'} spacing={5} alignItems={'center'} sx={{mb: 2, ml: 2}}>
                <Typography fontWeight={'bold'} color={'primary.main'}>
                    Threshold Total (Nilai Maksimal Total = {result.max_value})
                </Typography>
                <TextField
                    required
                    name="threshold"
                    label="Threshold Percentage"
                    variant="filled"
                    value={threshold}
                    onChange={(event) => onChangeThreshold(event)}
                    sx={{
                        maxWidth:200
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <Tooltip title={'Persentase 0 sampai 100 dari nilai maksimal total (persentase threshold * nilai maksimal)'}>
                                <IconButton>
                                    <HelpOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>,
                    }}
                />
                <Button 
                    variant="contained"
                    aria-label="threshold" 
                    size="small" 
                    onClick={(event) => setThreshold(0)}
                >
                    Show All
                </Button>
            </Stack>
            <Paper 
                elevation={5} 
                sx={{
                    p: 3, 
                    height:'100vh',
                    '& .header-style': {
                        backgroundColor: 'primary.main',
                        color: '#FFFFFF',
                      },
                }}
            >
                <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    getRowId={(row) => row.col0 }
                    slots={{ toolbar: GridToolbar }}                   
                    sx={{width:'100%'}}
                />
            </Paper>        
        </Box>
        
    );
}

export default ViewDataTable