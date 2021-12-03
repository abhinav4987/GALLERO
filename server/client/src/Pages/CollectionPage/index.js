import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import ImageList from '@mui/material/ImageList';
import {useNavigate} from 'react-router-dom';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import AddAlbum from '../../components/Forms/AddAlbum';
import DashBoardNav from '../../components/DashBoardNav';
import PageHeader from '../../components/PageHeader';
import { getAllAlbums } from '../../redux/action/album.actions';
import dummy from '../../images/dummy.jpg';
import dummy2 from '../../images/dummy2.jpg';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

const dummyData = [
    {
        title: "title 1",
        description: "",
    },
    {
        title: "title 2",
        description: "",
    },
    {
        title: "title 3",
        description: "",
    },
    {
        title: "title 1",
        description: "",
    },
    {
        title: "title 2",
        description: "",
    },
    {
        title: "title 3",
        description: "",
    },
    {
        title: "title 1",
        description: "",
    },
    {
        title: "title 2",
        description: "",
    },
    {
        title: "title 3",
        description: "",
    },
    {
        title: "title 1",
        description: "",
    },
    {
        title: "title 2",
        description: "",
    },
    {
        title: "title 3",
        description: "",
    },
]


function CollectionPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, albums} = useSelector(state => state.albums);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [addAlbumModal, setAddAlbumModal] = useState(false);
    const [keyword, setKeyWord] = useState("");
    
    useEffect(() => {
        dispatch(getAllAlbums());
    },[]);
    useEffect(() => {
        if(!isAuthenticated)
        navigate('auth');
    },[isAuthenticated]);

    const navigateToAlbum = (id) => {
        navigate(`/album/${id}`);
    }
    const openAddAlbumModal = () => setAddAlbumModal(true);
    const closeAddAlbumModal = () => setAddAlbumModal(false);
    return (
        <div className="collectionPage">
            <DashBoardNav />
            <PageHeader value={"Albums"}/>
            <TextField 
                id="input-with-sx" 
                placeholder="Search Albums.."
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
                className="albumSearch"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />{user.role === "admin" ? (
                <Fab color="primary" aria-label="add" className="addAlbum" onClick={openAddAlbumModal}>
                    <AddIcon />
                </Fab>
            ): null}
            
            <AddAlbum open={addAlbumModal} handleClose={closeAddAlbumModal} />
            <div className="albumDisplay">
                {loading && <CircularProgress className="loader" />}
                <ImageList variant="masonry" cols={3} gap={16} sx={{ width: "100%", height: "auto" }}>
                    {!loading && albums && albums.filter(data => data["title"].toLowerCase().includes(keyword))
                    .map((data, index) => (
                        <div 
                            className="imageItem" 
                            key={index}
                            onClick={() => navigateToAlbum(data._id)}
                        >
                            <ImageListItem key={index}>
                                <img 
                                    src={index%2 ? dummy : dummy2}
                                    loading="lazy"
                                    alt={data.title}
                                />
                                <ImageListItemBar
                                    title={data.title}
                                />
                            </ImageListItem>
                        </div>
                    ))}
                </ImageList>
            </div>
        </div>
    )
}

export default CollectionPage
