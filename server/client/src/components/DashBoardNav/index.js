import React from 'react'
import BusinessIcon from '@mui/icons-material/Business';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {logout} from '../../redux/action/auth.actions'
import './style.css'

function DashBoardNav() {
    
    const dispatch = useDispatch()
    const logoutButton = () => {
        console.log("hello");
        dispatch(logout());
    }
    return (
        <div className="DashBoardNav">
            <div className="brandRow">
                <div>
                    <BusinessIcon />
                    <span className="brandName">Gallero</span>
                </div>
                <Fab size="medium" onClick={logoutButton}>
                    <LogoutIcon />
                </Fab>
            </div>
            <div className="dashNav_body">
                <span>Navigate</span>
                <ul>
                    <Link to="/"><li><PersonIcon />Home</li></Link>
                    <Link to="/albums" className="selected"><li><CollectionsIcon />Allbums</li></Link>
                    <Link to="/private"><li><PersonIcon />Private</li></Link>
                </ul>
            </div>
            
        </div>
    )
}

export default DashBoardNav
