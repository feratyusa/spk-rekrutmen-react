import React from "react";
import TableDetails from "../../components/TableDetails";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import DataExample from "../../global/DataExample";

const data = DataExample

const DataDetails = () =>{
    const {id} = useParams()

    const d = data.find(d => d.id === parseInt(id))

    return(
        <Paper elevation={1} square={false} >
            <TableDetails data={d} type={'data'} />
        </Paper>
    );
}

export default DataDetails;