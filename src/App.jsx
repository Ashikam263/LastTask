// import React from 'react';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NextPage from './pages/NextPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
// import PrivateRoute from './utils/PrivateRoute';

 
// const PrivateRoute = ({ children }) => {
//     const { user } = useContext(AuthContext);
  
//     return user ? children : <Navigate to="/signin" />;
//   };

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/nextpage" element={<NextPage />} />
                </Routes>
            </Router>
            <ToastContainer autoClose={1000}/>
        </AuthProvider>
    );
};

export default App;
