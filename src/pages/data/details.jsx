import TableDetails from "../../components/TableDetails";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import getDataID from "../../utils/handler/data/getDataID";

const DataDetails = () =>{
    const {id} = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      Promise.all([getDataID(id)])
        .then(function([data]){
            console.log(data)
            setData(data.data)
            setLoading(false)
        })
    }, [loading])

    return(
        loading ? '' :
        <Paper elevation={1} square={false} >
            <TableDetails data={data} type={'data'} />
        </Paper>
    );
}

export default DataDetails;