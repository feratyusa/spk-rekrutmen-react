import React from "react"
import { DialogTitle, DialogContent, DialogContentText } from "@mui/material"

const DeleteDialogContent = ({content, description}) => {
    return(
        <React.Fragment>
            <DialogTitle id="alert-dialog-title">
                {"Hapus "+content+"?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {description}
            </DialogContentText>
            </DialogContent>
        </React.Fragment>
    )
}

export default DeleteDialogContent