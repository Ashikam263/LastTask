// import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import SignUpForm from '../components/auth/SignUpForm';

const SignUpPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SignUpForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpPage;
