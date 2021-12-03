import React, {useEffect} from 'react'
import DashBoardNav from '../../components/DashBoardNav';
import PageHeader from '../../components/PageHeader';
import PublicIcon from '@mui/icons-material/Public';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.css'
function NotFound() {
    
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    useEffect(() => {
        if(!isAuthenticated)
        navigate('auth');
    },[isAuthenticated]);
    
    return (
        <div className="notFound">
            <DashBoardNav />
            <PublicIcon />
            <span>Not Found</span>
        </div>
    )
}

export default NotFound
