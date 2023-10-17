import React from "react";
import TableDetails from "../../components/TableDetails";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";

const data = 
[{
    "id": 1,
    "name": "Mini Dummy",
    "description": "Example Data",
    "created_at": "2023-04-01",
    "updated_at": "2023-08-05"
},
{
    "id": 2,
    "name": "Data Perusahaan Kecantikan",
    "description": "400 Calon Karyawan",
    "created_at": "2023-04-10",
    "updated_at": "2023-05-06"
}]

const DataDetails = () =>{
    const {id} = useParams()
    return(
        <Paper elevation={1} square={false} >
            <TableDetails data={data[id-1]} type={'data'} />
        </Paper>
    );
}

export default DataDetails;