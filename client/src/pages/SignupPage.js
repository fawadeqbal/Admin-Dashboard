import React from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { SignUp } from '@clerk/clerk-react'; // Import Clerk's SignUp component

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title>Sign Up | SpotTroop</title>
      </Helmet>
      <Container maxWidth="sm">
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            Create an Account
          </Typography>
          <SignUp />
        </StyledContent>
      </Container>
    </>
  );
}
