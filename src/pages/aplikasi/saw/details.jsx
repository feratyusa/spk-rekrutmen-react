import { Paper } from "@mui/material";
import React from "react"
import { useParams } from "react-router-dom"
import TableDetails from "../../../components/TableDetails";

const data = 
[{
    "id": 1,
    "name": "SAW Example",
    "description": "Example SAW",
    "created_at": "2023-04-01",
    "updated_at": "2023-08-05",
    "criterias": [
        {
            "name": "Skillset",
            "weight": 40,
            "crisps":[
                {
                    "name": "Kecantikan",
                    "weight": 3,
                },
                {
                    "name": "Multimedia",
                    "weight": 2,
                },
                {
                    "name": "Tata Busana",
                    "weight": 1,
                }
            ]
        },
        {
            "name": "Mindset",
            "weight": 30,
            "crisps":[
                {
                    "name": "Lebih dari 80",
                    "weight": 3,
                },
                {
                    "name": "Di antara 40 dan 80",
                    "weight": 2,
                },
                {
                    "name": "Di bawah 40",
                    "weight": 1,
                }
            ]
        }
    ]
},
{
    "id": 2,
    "name": "Data Perusahaan Kecantikan",
    "description": "400 Calon Karyawan",
    "created_at": "2023-04-10",
    "updated_at": "2023-05-06"
}]

const SAWDetails = () => {
    const { id } = useParams()

    return(
        <Paper>
            <TableDetails data={data[id-1]} type={'saw'}/>
        </Paper>
    );
}

export default SAWDetails;