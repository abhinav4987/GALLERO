import React from 'react'
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './style.css';

function Header() {
    return (
        <div className="header">
            <span>BRAND</span>
            <Button variant="outlined" endIcon={<LogoutIcon />}>
                Logout
            </Button>
        </div>
    )
}

export default Header
