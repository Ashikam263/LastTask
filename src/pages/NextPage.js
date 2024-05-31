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
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar
} from '@mui/material';


const NextPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);

  const baseURL = 'http://localhost:8000/api/';
  const axiosInstance = axios.create({ baseURL });

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/users', {
          headers: { Authorization: `Bearer ${token}` } // Include the token in the request headers
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [axiosInstance]);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
      
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logout successful', { autoClose: 1000 });
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
        toast.error('Logout failed. Please try again.', { autoClose: 1000 });
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred during logout. Please try again later.', { autoClose: 1000 });
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small" href='/'>Home</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Users Table
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" onClick={handleLogout}>
          Log Out
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Avatar alt={user.name} src={user.photo} />
                </TableCell>
                <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                <TableCell>{new Date(user.updated_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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