import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Paper } from "@mui/material"
import TableDetails from "../../../components/TableDetails"
import getSAWID from "../../../utils/handler/saw/getSAWID"

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