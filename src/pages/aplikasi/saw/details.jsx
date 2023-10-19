import { Paper } from "@mui/material"
import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import TableDetails from "../../../components/TableDetails"
import SAWDataExample from "../../../global/SAWDataExample"

const data = SAWDataExample

const SAWDetails = () => {
    const { id } = useParams()

    const da = data.find(d => d.id === parseInt(id))

    return(
        <Paper>
            <TableDetails data={da} type={'saw'}/>
        </Paper>
    );
}

export default SAWDetails;