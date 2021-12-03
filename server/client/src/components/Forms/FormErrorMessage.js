import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import './style.css';
function FormErrorMessage({message}) {
    return (
        <span className="errorMessage">
            <ErrorIcon />{" "}{message}
        </span>
    )
}

export default FormErrorMessage
