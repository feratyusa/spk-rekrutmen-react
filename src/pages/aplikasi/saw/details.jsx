import { Paper } from "@mui/material"
import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import TableDetails from "../../../components/TableDetails"
import SAWDataExample from "../../../global/SAWDataExample"
import { useState } from "react"
import { useEffect } from "react"
import getSAWID from "../../../utils/handler/getSAWID"

const SAWDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      Promise.all([getSAWID(id)])
        .then(function([saw]){
            console.log(saw.data)
            setData(saw.data)
            setLoading(false)
        })
    }, [loading])
    
    return(
        loading ? '' :
        <Paper>
            <TableDetails data={data} type={'saw'}/>
        </Paper>
    );
}

export default SAWDetails;