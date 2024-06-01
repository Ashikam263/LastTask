// import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import SignInForm from '../components/auth/SignInForm';
// import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
// import { useNavigate } from 'react-router-dom'; 


// const SignInPage = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     if (user) {
//       navigate('/nextpage');
//     }
//   }, [user, navigate]); 

//   const handleSignInSuccess = () => {
//     navigate('/nextpage');
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" align="center" gutterBottom>
//         Sign In
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <SignInForm onSignInSuccess={handleSignInSuccess}/>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default SignInPage;

const SignInPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SignInForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;