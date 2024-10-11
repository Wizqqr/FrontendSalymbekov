import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import './Loader.module.scss';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);


    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null; 
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fff"
    >
      <img src="https://projects.iq.harvard.edu/sites/projects.iq.harvard.edu/files/francisclooney/files/blog-icon.png?m=1524083417" alt="Site Logo" className="logo" />
      <Typography variant="h4" component="h1" gutterBottom>
        SalymbekovCollege
      </Typography>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;