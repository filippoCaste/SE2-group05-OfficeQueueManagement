import React from 'react';
import {
  Box,
  Button,
  Container,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function MainPage(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    navigate("/getTicket");
  }

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        {!isLoading ? 
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClick}
            >
              <ConfirmationNumberIcon/>
            </Button>:
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="20vh"
                      >
                       <CircularProgress />
                    </Box>
            }
      </Box>
    </Container>
  );
}
export default MainPage;