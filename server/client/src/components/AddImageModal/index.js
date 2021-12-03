import React, { useState }  from 'react'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from "react-redux";
import { DropzoneArea } from 'material-ui-dropzone';
import { addImages } from '../../redux/action/album.actions'

import './style.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#000',
    color: '#fff',
    display: "flex",
    // border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};


function AddImageModal({open, handleClose,id}) {
    
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, file]);
                }
            };
    
            reader.readAsDataURL(file);
        });
    };

    const submitHnadler = () => {
        
        console.log("hello");
        console.log(imagesPreview);
        const myForm = new FormData();
        imagesPreview.forEach((image) => {
            console.log(image)
            myForm.append("images", image);
        });
        console.log(myForm);
        dispatch(addImages(id, myForm));
    }
    
    return (
        <Modal open={open} onClose={handleClose}>
        <div className="imageUpload">
            <span>Upload Image</span>
            <div id="createProduct_form_file">
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                />
            </div>

            <div id="createProduct_form_image">
                {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                ))}
            </div>
            <Button variant="contained" endIcon={<UploadIcon />} className="uploadButton"  onClick={() => submitHnadler()}>
                Upload
            </Button>
        </div>
        </Modal>
    )
}

export default AddImageModal
