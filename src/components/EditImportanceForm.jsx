import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Paper, Box, Stack, TextField, Button, Typography, Alert } from "@mui/material";
import Header from "./Header";
import getAHPID from "../utils/handler/ahp/getAHPID";
import axios, {getCookie} from "../utils/axios";
import { validImportance } from "../utils/regex";

const EditImportanceForm = ({type}) => {
    const {id, c_id} = useParams()
    const criterias = useRef(null)
    const criterias_name = useRef([])
    const [impError, setImpError] = useState([false])
    const [formError, setFormError] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const [inputFields, setInputFields] = useState([])

    function handleChangeInput(index, event){
        const values = inputFields
        values[index] = event.target.value
        const error = [...impError]
        error[index] = !validImportance.test(values[index])
        setFormError(false)
        setImpError(error)
        setInputFields(values)
    }

    function check_valid(){
        for (let index = 0; index < inputFields.length; index++) {
            if(impError[index] || inputFields[index] === "") return false
        }
        return true
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!check_valid()){
            setFormError(true)
            return
        }
        const outputs = []
        for (let index = 0; index < inputFields.length; index++) {
            outputs.push(inputFields[index])
        }
        console.log(outputs);
        if(type!=='crisps'){
            axios.put('/api/ahp/'+id+'/criterias/importance/update', outputs,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie("csrf_access_token")
                },
                withCredentials: true
            }).then(function(response){
                console.log(response.data)
                navigate('/ahp/'+id)
            })
        }
        else if(type==='crisps'){
            console.log('Edit Crisps Importance')
            axios.put('/api/ahp/'+id+'/criterias/'+c_id+'/crisps/importance/update', outputs,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie("csrf_access_token")
                },
                withCredentials: true
            }).then(function(response){
                console.log(response.data)
                navigate('/ahp/'+id)
            })
        }
    }

    useEffect(() => {
        Promise.all([getAHPID(id)])
            .then(function([response]){
                criterias.current = []
                criterias_name.current = []
                const imp = []
                const error = []
                const ahp = response.data
                const c = (type==='crisps' ? ahp.ahp_criteria.find(c => c.id === parseInt(c_id)) : ahp.ahp_criteria)
                criterias.current = (type==='crisps' ? c.ahp_crisp : c)
                let inc = 0
                for (let index = 0; index < criterias.current.length-1; index++) {
                    for (let j = 0; j < criterias.current.length-1-index; j++) {
                        criterias_name.current.push({ca: criterias.current[index].name, 
                                                    cb: criterias.current[index+j+1].name, 
                                                    importance: criterias.current[index].importance[j+inc].importance})                                                                         
                        imp.push(criterias.current[index].importance[j+inc].importance+"")
                        error.push(false)
                    }
                    inc += 1
                }
                setInputFields(imp)
                setImpError(error)
            }).catch(function([error]){
                console.log(error.config)
            }).finally(function(){
                setLoading(false)
            })
    }, [])
    console.log(inputFields)
    
    return(
        loading ? '' :
        <Box>
            <Header title={type==='crisps' ? 'AHP Crisps Importance Edit' : 'AHP Criterias Importance Edit'}/>
            <Paper sx={{p:3}}>
                {
                    formError ? <Alert severity="error" sx={{mb:2}}>Harap isi semua bagian form</Alert> : ""
                }
                <form onSubmit={handleSubmit}>
                    {criterias_name.current.map((criteria, index) => (
                        <Stack direction={'row'} spacing={2} sx={{mb:2}} key={index}>
                            <TextField 
                                name="no"
                                label="No."
                                variant="filled"
                                value={index+1}
                                sx={{
                                    maxWidth:50
                                }}
                            />
                            <TextField
                                name="id"
                                label={ type === 'crisps' ? 'Crisp A x Crisp B' : "Kriteria A x Kriteria B"}
                                variant="filled"
                                value={criteria.ca+" x "+criteria.cb}
                            />
                            <TextField
                                name="importance"
                                label="Skala"
                                variant="filled"
                                defaultValue={criteria.importance}
                                onChange={(event) => handleChangeInput(parseInt(index), event)}
                                error={impError[index]}
                                helperText={impError[index] ? "Angka 1 - 9 atau inversenya (cth: 1/3, 1/5, dst.)" : ""}
                                sx={{maxWidth:"200px"}}
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

export default EditImportanceForm