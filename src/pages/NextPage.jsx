import * as React from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';

export default function NextPage() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not logged in');
        }
        
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login page)
          // Or display a message to the user indicating they need to log in
          // Example:
          // history.push('/login');
          // Or:
          // toast.error('Please log in to access this page.');
        } else {
          // Handle other errors (e.g., network error)
          // Example:
          // toast.error('Error fetching users. Please try again later.');
        }
      }
    };
    fetchUsers();
  }, []);
  
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logout successful', { autoClose: 1000 });
      } else {
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
        <Button size="small" href="/">Home</Button>
        <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
          Users Table
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" onClick={handleLogout}>Logout</Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell>{user.updated_at}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.photo}</TableCell>
                <TableCell>{String(user.verified)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </React.Fragment>
  );
}
