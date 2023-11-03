import { useState, useEffect, useRef } from "react";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import TableDetails from "../../../components/TableDetails";
import getAHPID from "../../../utils/handler/ahp/getAHPID";

const AHPDetails = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const ahp = useRef(null)

    useEffect(() => {
        Promise.all([getAHPID(id)])
            .then(function([response]){
                console.log(response.data)
                ahp.current = response.data
            }).catch(function([error]){
                console.log(error.config)
            }).finally(function(){
                setLoading(false)
            })
    }, [])
    

    return(
        loading ? '' :
        <Paper>
            <TableDetails data={ahp.current} type={'ahp'} />
        </Paper>
    );
}

export default AHPDetails;
