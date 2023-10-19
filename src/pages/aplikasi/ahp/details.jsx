import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import TableDetails from "../../../components/TableDetails";
import AHPDataExample from "../../../global/AHPDataExample";

const ahp = AHPDataExample

const AHPDetails = () => {
    const { id } = useParams()

    const data = ahp.find(a => a.id === parseInt(id))

    return(
        <Paper>
            <TableDetails data={data} type={'ahp'} />
        </Paper>
    );
}

export default AHPDetails;
