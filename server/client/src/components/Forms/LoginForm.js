import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ErrorIcon from '@mui/icons-material/Error';
import {useNavigate} from 'react-router'
import {login} from '../../redux/action/auth.actions'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormErrorMessage from './FormErrorMessage';
import './style.css';


function LoginForm({navigateHome}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state) => state.user);
    const validationSchema = Yup.object().shape({
        Email: Yup.string()
            .required("Please enter email")
            .email("Please enter a valid email"),
        Password: Yup.string()
            .required("Please enter password")
            .min(6, "Password should be at least 6 characters")
            .max(40, "Password should not exceed 40 characters")
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


    const onSubmit = data => {
        console.log({ data });
        dispatch(login(data.Email, data.Password));
    };

    return (
        <form>
            <div className="formField">
                <input 
                    {...register("Email")}
                    placeholder="Email"
                />
                <span>{errors.Email && <FormErrorMessage message={errors.Email.message} /> }</span>
            </div>

            <div className="formField">
                <input 
                    {...register("Password")}
                    placeholder="Password"
                    type="password"
                />
                <span>{errors.Password && <FormErrorMessage message={errors.Password.message} /> }</span>
            </div>
            {error ? (
                <div className="responseError">
                    <ErrorIcon /><span >{error}</span>
                </div>
            ): null}
            
            
            <button type="button" onClick={(e) => {
                e.preventDefault()
                handleSubmit(onSubmit)();
            }}
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm
