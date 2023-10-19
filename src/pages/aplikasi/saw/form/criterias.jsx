import { Paper, Box, Stack, TextField, Select, MenuItem, Button, FormControl, InputLabel, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const SAWCriteriasForm = () => {
    const {id} = useParams()

    const [inputFields, setInputFields] = useState([
        {name: "", atribute: "", criteria_type:"", weight: ""},
        {name: "", atribute: "", criteria_type:"", weight: ""}
    ])

    function handleChangeInput(index, event) {
        const values = [...inputFields]
        values[index][event.target.name] = event.target.value
        setInputFields(values)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(inputFields);
    }

    function handleAddFields(){
        setInputFields([...inputFields, {name:"", atribute: "", criteria_type:"", weight:""}])
    }

    function handleRemoveFields(index){
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values)
    }
    
    return(
        <Box>
            <Header title={'SAW Criterias Form'}/>
            <Paper sx={{p:3}}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{mb:2}}>
                    {inputFields.map((inputField, index) => (
                        <Stack direction={'row'} spacing={2} sx={{mb:2}} key={index}>
                            <TextField
                                name="id"
                                label="Urutan"
                                variant="filled"
                                disabled
                                value={index+1}
                                sx={{maxWidth:80}}
                            />
                            <TextField
                                name="name"
                                label="Nama"
                                variant="filled"
                                value={inputField.name}
                                onChange={(event) => handleChangeInput(index, event)}
                            />
                            <FormControl variant="filled" sx={{ minWidth: 200 }}>
                                <InputLabel id="atribute">Atribut</InputLabel>
                                <Select 
                                    labelId="atribute"
                                    name="atribute"
                                    label="Atribute"
                                    value={inputField.atribute}
                                    onChange={(event) => handleChangeInput(index, event)}
                                >
                                    <MenuItem value={0}>Benefit</MenuItem>
                                    <MenuItem value={1}>Cost</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" sx={{ minWidth: 200 }}>
                                <InputLabel id="type">Tipe Kriteria</InputLabel>
                                <Select 
                                    labelId="type"
                                    name="criteria_type"
                                    label="Criteria Type"
                                    value={inputField.criteria_type}
                                    onChange={(event) => handleChangeInput(index, event)}
                                >
                                    <MenuItem value={0}>Number</MenuItem>
                                    <MenuItem value={1}>String</MenuItem>
                                    <MenuItem value={2}>Sub String</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="weight"
                                label="Bobot"
                                variant="filled"
                                value={inputField.weight}
                                onChange={(event) => handleChangeInput(index, event)}
                            />
                            <IconButton size="medium" variant="contained" color="error" onClick={() => handleRemoveFields(index)}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    ))}
                        <Button 
                            size="medium" 
                            variant="contained" 
                            color="info" 
                            onClick={handleAddFields}
                            sx={{maxWidth:300, textAlign:"center"}}
                            endIcon={<AddIcon />}
                        >
                                Tambah Kriteria
                        </Button>
                    </Stack>
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
                            href={'/saw/'+id}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
        
    );
}

export default SAWCriteriasForm;