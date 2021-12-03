import React,{useState, useEffect} from 'react'
import { useForm, Controller } from "react-hook-form";
import {useNavigate} from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Button
} from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './style.css';
import LoginForm from '../../components/Forms/LoginForm'
import SignUpForm from '../../components/Forms/SignUpForm';
import {CLEAR_ERROR} from '../../redux/actiontypes';



function Auth() {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin") ? sessionStorage.getItem("isLogin") : false );
    const {isAuthenticated} = useSelector(state => state.user);
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("Please enter name"),
        Email: Yup.string()
            .required("Please enter email")
            .email("Please enter a valid email"),
        Password: Yup.string()
            .required("Please enter password")
            .min(6, "Password should be at least 6 characters")
            .max(40, "Password should not exceed 40 characters"),
        ConfirmPassword: Yup.string()
            .required("Please confirm the password")
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    });
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    useEffect(() => {
        sessionStorage.setItem("isLogin", isLogin);
    },[isLogin])
    useEffect(() => {
        if(isAuthenticated){
            navigate("/");
        }
    },[isAuthenticated]);

    const navigateHome = () => {
        navigate('/');
    }

    const toggleForm = data => {
        dispatch({type:CLEAR_ERROR});
        setIsLogin(!isLogin);
    }

    return (
        <div className="authPage">
            <div className="authForm">
                
                <div className="authForm__left"> <span>Gallero</span></div>
                
                <div className="authForm__right">
                    <span>{isLogin ? ("Login") :("SignUp") }</span>
                    {isLogin ? <LoginForm navigateHome={navigateHome} /> :<SignUpForm /> }
                    <button type="button" onClick={toggleForm}>{isLogin ? "SignUp" : "Login"}</button>
                </div>
            </div>
        </div>
    )
}

export default Auth
