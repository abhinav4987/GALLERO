import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Box';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import FormErrorMessage from './FormErrorMessage';
import * as Yup from 'yup';
import { createAlbum } from '../../redux/action/album.actions';
import './style.css';
import './modal.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#000',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

function AddAlbum({open, handleClose}) {
    
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        Title: Yup.string()
            .required("Please enter Title"),
        Description: Yup.string()
            .required("Please provide album description")
            .min(30, "Description should be at least 30 characters")
            .max(300, "Description should not exceed 300 characters")
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
        dispatch(createAlbum({
            title: data.Title,
            description: data.Description,
        }))
        reset();
        handleClose();
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >   
            <Box sx={style}>
                <span className="modalHead">Add Album</span>
                <div className="modal-formField">
                    <input 
                        {...register("Title")}
                        placeholder="Album Title"
                    />
                    <span>{errors.Title && <FormErrorMessage message={errors.Title.message} /> }</span>
                </div>

                <div className="modal-formField">
                    <textarea 
                        {...register("Description")}
                        placeholder="AlbumDescription"
                    />
                    <span>{errors.Description && <FormErrorMessage message={errors.Description.message} /> }</span>
                </div>
                <button className="modalButton" type="button" onClick={handleSubmit(onSubmit)}>
                    Submit
                </button>
            </Box>
        </Modal>
    )
}

export default AddAlbum
