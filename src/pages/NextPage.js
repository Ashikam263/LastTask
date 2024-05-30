// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const NextPage = () => {
//     // Check if the user is logged in
//     const isLoggedIn = !!localStorage.getItem('token');
//     console.log('IsLoggedIn:', isLoggedIn);

//     // If the user is not logged in, redirect to the sign-in page
//     if (!isLoggedIn) {
//         console.log('Redirecting to signin page...');
//         return <Navigate to="/signin" />;
//     }

//     // If the user is logged in, render the NextPage content
//     return (
//         <div>
//             <h1>This is the Next Page</h1>
//             <p>Welcome to the Next Page!</p>
//         </div>
//     );
// };

// export default NextPage;


import * as React from 'react';
// import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


const NextPage = () => {
  const navigate = useNavigate();

  const baseURL = 'http://localhost:8000/api/';
  const axiosInstance = axios.create({ baseURL });

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      
      if (response.status === 200) {
        navigate('/');
        toast.success('Logout successful');
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred during logout. Please try again later.');
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Solutions Table
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" onClick={handleLogout}>
          Log Out
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
      </Toolbar>
      <ToastContainer />
    </React.Fragment>
  );
}

// NextPage.propTypes = {
//   sections: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default NextPage;