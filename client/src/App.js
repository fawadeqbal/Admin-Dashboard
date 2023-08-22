import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ClerkProvider } from '@clerk/clerk-react';
const REACT_APP_CLERK_PUBLISHABLE_KEY="pk_test_cmVsaWV2ZWQtcGVhY29jay05MS5jbGVyay5hY2NvdW50cy5kZXYk"
const clerkConfig = {
  publishableKey: REACT_APP_CLERK_PUBLISHABLE_KEY,
  // frontendApi: REACT_APP_CLERK_FRONTEND_API_URL,
};
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ClerkProvider {...clerkConfig}>
     
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
          
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    
    </ClerkProvider>
  );
}
