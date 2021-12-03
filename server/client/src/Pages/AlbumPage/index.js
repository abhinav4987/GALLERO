import React, {useState, useEffect, Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DashBoardNav from '../../components/DashBoardNav';
import PageHeader from '../../components/PageHeader';
import Fab from '@mui/material/Fab';
import { getAlbumDetails, addReview, deleteAlbum } from '../../redux/action/album.actions';
import AddImageModal from '../../components/AddImageModal';
import ReviewCard from '../../components/ReviewCard/index';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';




function AlbumPage() {
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addPhotoModal, setAddAlbumModal] = useState(false);
    const [review, setReview] = useState("");
    const { loading, album } = useSelector(state => state.albumDetail);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { loading : newcommentLoading, success } = useSelector(state => state.albumDetail);
    const openAddPhotoModal = () => setAddAlbumModal(true);
    const closeAddPhotoModal = () => setAddAlbumModal(false);
    useEffect(() => {
        dispatch(getAlbumDetails(id));
    },[]);
    useEffect(() => {
        if(!isAuthenticated)
        navigate('auth');
    },[isAuthenticated]);

    useEffect(() => {
        console.log(success);
        if(success === true)
        dispatch(getAlbumDetails(id));
    },[success]);

    const submitReview = () => {
        console.log("submititng review")
        const myForm = new FormData();

        myForm.set("comment", review);
        myForm.set("albumId", id);

        dispatch(addReview({
            comment: review,
            albumId: id,
        }));
        setReview("");
    }

    const deleteAlbumClick = () => {
        dispatch(deleteAlbum(id));
        navigate("/albums")
    }
    
    return (
        <div className="AlbumPage">
            <AddImageModal open={addPhotoModal} handleClose={closeAddPhotoModal} id={id}/>
            <DashBoardNav />
            <div className="photosDisplay">
                <PageHeader value={"Album"}/>
                {user.role === "admin" ? (
                    <Fragment>
                    <Fab color="primary" aria-label="add" className="deleteAlbum" onClick={() => deleteAlbumClick()}>
                        <DeleteIcon />
                    </Fab>
                    <Fab color="primary" aria-label="add" className="addPhoto" onClick={openAddPhotoModal}>
                        <AddIcon />
                    </Fab>
                    </Fragment>
                ) : null}
                {loading && <CircularProgress />}
                    {!loading && (
                        <div className="albumDetails">
                            <span>{album.title}</span>
                            <span>{album.description}</span>
                        </div>
                    )}
                
            </div>
            <div className="reviewsDisplay">
                  
                <span className="reviewsHeader">Reviews</span>
                <TextField
                    placeholder="add your review"
                    multiline
                    rows={2}
                    rowsMax={4}
                    className="addReviewText"
                    value={review}
                    onChange={(e) => {setReview(e.target.value)}}
                />
                <Button variant="contained" endIcon={<AddIcon />} className="addReviewButton" onClick={() => submitReview()}>
                    Add Review
                </Button>

                <div className="allReviewsDisplay">
                    
                    {album && album.reviews && album.reviews.map((review, index) => (
                        <ReviewCard user={review.name} comment={review.comment}/>
                    ))}
                </div>
            </div>
            
            
        </div>
    )
}

export default AlbumPage;
