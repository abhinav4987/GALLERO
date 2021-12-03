import React, {useEffect} from 'react'
import DashBoardNav from '../../components/DashBoardNav';
import PageHeader from '../../components/PageHeader';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
function Private() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    useEffect(() => {
        if(!isAuthenticated)
        navigate('auth');
    },[isAuthenticated]);
    return (
        <div className="collectionPage">
            <DashBoardNav />
            <PageHeader value={"Private"}/>
            <span className="privateDemo">This is Demo Page, not visible to non admin users</span>
        </div>
    )
}

export default Private
