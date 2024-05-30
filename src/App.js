import React from 'react';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NextPage from './pages/NextPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import AuthProvider, { AuthContext } from './context/AuthContext';

 
const PrivateRoute = ({ element }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? element : <Navigate to="/signin" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/nextpage" element={<PrivateRoute element={<NextPage />} />} />
                </Routes>
            </Router>
            <ToastContainer autoClose={1000}/>
        </AuthProvider>
    );
};

export default App;
