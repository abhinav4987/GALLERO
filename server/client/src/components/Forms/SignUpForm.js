import React from 'react'
import {useNavigate} from 'react-router'
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from '../../redux/action/auth.actions';
import ErrorIcon from '@mui/icons-material/Error';
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
import FormErrorMessage from './FormErrorMessage';
import './style.css';

function SignUpForm() {
    const dispatch = useDispatch();
    const {error} = useSelector((state) => state.user);
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
            .oneOf([Yup.ref('Password'), null], 'Confirm Password does not match'),
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
        dispatch(registerUser(
            data.Name,
            data.Email,
            data.Password,
        ));
        reset();
    };
    
    return (
        <form >
            <div className="formField">
                <input 
                    {...register("Name")}
                    placeholder="Name"
                />
                <span>{errors.Name && <FormErrorMessage message={errors.Name.message} />}</span>
            </div>
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

            <div className="formField">
                <input 
                    {...register("ConfirmPassword")}
                    placeholder="ConfirmPassword"
                    type="password"
                />
                <span>{errors.ConfirmPassword && <FormErrorMessage message={errors.ConfirmPassword.message} /> }</span>
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

export default SignUpForm


