import React from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { SignIn } from '@clerk/clerk-react'; // Import Clerk's SignIn component

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login | Admin Dashboard</title>
      </Helmet>
      <Container maxWidth="sm">
        <StyledContent>
          
          <SignIn afterSignInUrl='/dashboard/app'/>
        </StyledContent>
      </Container>
    </>
  );
}
