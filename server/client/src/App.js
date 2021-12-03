import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux";
import './App.css';
import ProtectedRoute from "./Routes/ProtectedRoute";
import AuthenticatedRoute from "./Routes/AuthenticatedRoutes";
import Header from './components/Header';
import DashBoardNav from './components/DashBoardNav';
import HomePage  from './Pages/Home';
import AuthPage from './Pages/AuthPage'
import CollectionPage from './Pages/CollectionPage';
import AlbumPage from './Pages/AlbumPage/index';
import PrivatePage from './Pages/PrivatePage/index';
import NotFound from './Pages/NotFoundPage';
function App() {

  return (
    <Router>
        
        <Routes>
          <Route exact path="/auth" element={<AuthPage />} />
          <Route element={<AuthenticatedRoute />}>
            <Route exact path="/" element={<HomePage />} />
          </Route>
          <Route element={<AuthenticatedRoute />}>
            <Route exact path="/" element={<HomePage />} />
          </Route>
          <Route element={<AuthenticatedRoute />}>
            <Route exact path="/albums" element={<CollectionPage />} />
          </Route>
          <Route element={<AuthenticatedRoute />}>
            <Route exact path="/album/:id" element={<AlbumPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/private" element={<PrivatePage />} />
          </Route>
          <Route path="*" element={<NotFound />}/>
          
        </Routes>
    </Router>
  );
}

export default App; 