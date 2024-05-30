import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import SignInForm from '../components/auth/SignInForm';

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
