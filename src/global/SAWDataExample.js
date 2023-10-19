const SAWDataExample =
[
{
    "id": 1,
    "name": "SAW Example",
    "description": "Example SAW",
    "data": "Data Perusahaan Kecantikan",
    "created_at": "2023-04-01",
    "updated_at": "2023-08-05",
    "result_path": "/result/saw/result_saw.csv",
    "criterias": [
        {
            "id": 1,
            "name": "Skillset",
            "atribute": 0,
            "crisps_type": 1,
            "weight": 40,
            "crisps":[
                {
                    "name": "Kecantikan",
                    "details": "Kecantikan",
                    "weight": 3,
                },
                {
                    "name": "Multimedia",
                    "details": "Multimedia",
                    "weight": 2,
                },
                {
                    "name": "Tata Busana",
                    "details": "Tata Busana",
                    "weight": 1,
                }
            ]
        },
        {
            "id": 2,
            "name": "Mindset",
            "atribute": 1,
            "crisps_type": 0,
            "weight": 30,
            "crisps":[
                {
                    "name": "Lebih dari 80",
                    "details": "1,80",
                    "weight": 3,
                },
                {
                    "name": "Di antara 40 dan 80",
                    "details": "5,40,80",
                    "weight": 2,
                },
                {
                    "name": "Di bawah 40",
                    "details": "5,40",
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
    "data": "Data Perusahaan Kecantikan",
    "created_at": "2023-04-10",
    "updated_at": "2023-05-06",
    "result_path": "",
    "criterias": []
},
{
    "id": 5,
    "name": "SAW Example",
    "description": "Example SAW",
    "data": "Data Perusahaan Kecantikan",
    "created_at": "2023-04-01",
    "updated_at": "2023-08-05",
    "result_path": "",
    "criterias": [
        {
            "id": 11,
            "name": "Skillset",
            "atribute": 1,
            "weight": 40,
            "crisps_type": 2,
            "crisps":[]
        },
        {
            "id": 12,
            "name": "Mindset",
            "atribute": 0,
            "weight": 30,
            "crisps_type": 0,
            "crisps":[]
        }
    ]
}
]

export default SAWDataExample;