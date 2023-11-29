import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Paper, Box, Stack, TextField, Button, Typography, Alert } from "@mui/material";
import Header from "./Header";
import getAHPID from "../utils/handler/ahp/getAHPID";
import axios, {getCookie} from "../utils/axios";
import { validImportance } from "../utils/regex";

const ImportanceForm = ({type}) => {
    const {id, c_id} = useParams()
    const criterias = useRef(null)
    const criterias_name = useRef([])
    const [cr, setCR] = useState(0)
    const [impError, setImpError] = useState([false])
    const [formError, setFormError] = useState(false)
    const [consistencyError, setConsistencyError] = useState(false)
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
        setConsistencyError(false)
        if(!check_valid()){
            setFormError(true)
            return
        }
        const outputs = []
        for (let index = 0; index < inputFields.length; index++) {
            outputs.push(inputFields[index])
        }
        console.log(outputs);
        if(type !=='crisps'){
            axios.post('/api/ahp/'+id+'/criterias/importance/create',outputs,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie("csrf_access_token")
                },
                withCredentials: true
            }).then(function(response){
                console.log(response.data)
                
                navigate('/ahp/'+id)
            }).catch(function(error){
                if(error.response){
                    if(error.response.status === 412){
                        setCR(error.response.data.CR)
                        setConsistencyError(true)
                    }
                    console.log(error.response)
                }
                console.log(error.config)
            })
        }
        else if(type==='crisps'){
            axios.post('/api/ahp/'+id+'/criterias/'+c_id+'/crisps/importance/create',outputs,{
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCookie("csrf_access_token")
                },
                withCredentials: true
            }).then(function(response){
                console.log(response.data)
                navigate('/ahp/'+id)
            }).catch(function(error){
                if(error.response){
                    if(error.response.status === 412){
                        setCR(error.response.data.message)
                        setConsistencyError(true)
                    }
                    console.log(error.response)
                }
                console.log(error.config)
            })
        }
    }

    useEffect(() => {
        Promise.all([getAHPID(id)])
            .then(function([response]){
                criterias.current = []
                criterias_name.current = []
                const ahp = response.data
                const c = (type==='crisps' ? ahp.ahp_criteria.find(c => c.id === parseInt(c_id)) : ahp.ahp_criteria)
                criterias.current = (type==='crisps' ? c.ahp_crisp : c)
                const imp = []
                const error = []
                for (let index = 0; index < criterias.current.length-1; index++) {
                    for (let j = 0; j < criterias.current.length-1-index; j++) {
                        criterias_name.current.push({ca: criterias.current[index].name, cb: criterias.current[index+j+1].name, importance: ""})
                        imp.push("")
                        error.push(false)
                    }
                }
                setInputFields(imp)
                setImpError(error)
                setLoading(false)
            }).catch(function([error]){
                console.log(error.config)
            })
    }, [])
    
    
    return(
        loading ? '' :
        <Box>
            <Header title={type==='criteria' ? 'Skala Kriteria AHP Form' : 'Skala Subkriteria AHP Form'}/>
            <Paper sx={{p:3}}>
                {
                    consistencyError ? <Alert severity="error" sx={{mb:2}}>Consistency Ratio Error (CR = {cr})</Alert> :
                    formError ? <Alert severity="error" sx={{mb:2}}>Harap isi semua bagian form dengan benar</Alert> : ""
                }
                <form onSubmit={handleSubmit}>
                    {criterias_name.current.map((criteria, index) => (
                        <Stack 
                            direction={'row'} 
                            spacing={2} 
                            sx={{mb:2}}
                            key={index}
                        >
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
                                label={ type === 'crisps' ? 'Subkriteria A' : "Kriteria A"}
                                variant="filled"
                                value={criteria.ca}
                            />
                            <TextField
                                name="id"
                                label={ type === 'crisps' ? 'Subkriteria B' : "Kriteria B"}
                                variant="filled"
                                value={criteria.cb}
                            />
                            <TextField
                                name="importance"
                                label="Skala"
                                variant="filled"
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

export default ImportanceForm