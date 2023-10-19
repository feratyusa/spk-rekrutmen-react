import { useParams } from "react-router-dom"
import { Paper, Box, Stack, TextField, Button, Typography } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import AHPDataExample from "../global/AHPDataExample"

const ahp = AHPDataExample

const ImportanceForm = ({type}) => {
    const {id, c_id} = useParams()

    const [inputFields, setInputFields] = useState([])

    function handleChangeInput(index, event){
        const values = [...inputFields]
        values[index] = event.target.value
        setInputFields(values)
    }

    function handleSubmit(e){
        e.preventDefault();
        const outputs = []
        for (let index = 0; index < inputFields.length; index++) {
            outputs.push(inputFields[index])
        }
        console.log(outputs);
    }

    const data = ahp.find(a => a.id === parseInt(id))
    const d = (type === 'crisps' ? data.criterias.find(c => c.id === parseInt(c_id)) : data.criterias)
    const criterias = (type === 'crisps' ? d.crisps : d)

    let criterias_name = []
    for (let index = 0; index < criterias.length-1; index++) {
        for (let j = 0; j < criterias.length-1-index; j++) {
            criterias_name.push({ca: criterias[index].name, cb: criterias[index+j+1].name, importance: ""})
        }
    }
    
    return(
        <Box>
            <Header title={type==='criteria' ? 'AHP Criterias Importance Form' : 'AHP Crisps Importance Form'}/>
            <Paper sx={{p:3}}>
                <form onSubmit={handleSubmit}>
                    {criterias_name.map((criteria, index) => (
                        <Stack direction={'row'} spacing={2} sx={{mb:2}} key={index}>
                            <TextField
                                name="id"
                                label={ type === 'crisps' ? 'Crisp A' : "Kriteria A"}
                                variant="filled"
                                disabled
                                value={criteria.ca}
                            />
                            <Typography>X</Typography>
                            <TextField
                                name="id"
                                label={ type === 'crisps' ? 'Crisp B' : "Kriteria B"}
                                variant="filled"
                                disabled
                                value={criteria.cb}
                            />
                            <TextField
                                name="importance"
                                label="Skala"
                                variant="filled"
                                onChange={(event) => handleChangeInput(parseInt(index), event)}
                            />
                        </Stack>
                    ))}
                    <Stack direction={'row'} spacing={4} justifyContent={'center'}>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="warning"
                            href={'/ahp/'+id}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    )
}

export default ImportanceForm