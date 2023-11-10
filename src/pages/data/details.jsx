import TableDetails from "../../components/TableDetails";
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
        <TableDetails data={data} type={'data'} />        
    );
}

export default DataDetails;