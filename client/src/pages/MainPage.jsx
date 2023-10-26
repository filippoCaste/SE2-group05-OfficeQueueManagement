import React from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CountersBord from '../components/CountersBord';

function MainPage(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    navigate('/getTicket');
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          minHeight="80vh"
        >
          {!isLoading ? (
            <Button
              variant="contained"
              color="primary"
              size="lg"
              style={{ width: '30vw', height: '30vw' }}
              onClick={handleClick}
            >
              <ConfirmationNumberIcon
                style={{
                  width: '50%', // Make the image fill the container
                  height: '50%', // Make the image fill the container
                }}
              />
            </Button>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="20vh"
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item md={9}>
        <CountersBord />
      </Grid>
    </Grid>
  );
}
export default MainPage;
