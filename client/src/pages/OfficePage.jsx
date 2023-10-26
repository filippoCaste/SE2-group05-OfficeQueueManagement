import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useNavigate } from "react-router-dom";
import { useState , useEffect,useContext} from "react";
import CurrentTimeDisplay from '../components/CurrentTimeDisplay';
import CounterMenu from '../components/CounterMenuComponents';
import dayjs from 'dayjs'; // Import dayjs
import ErrorContext from '../errorContext';
import API from '../API';

function OfficePage(props) {
  const {user} = props;
  const navigate = useNavigate();
   const {handleErrors} = useContext(ErrorContext);
  const [isLoading, setIsLoading] = useState(false);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [startDate, setStartDate] = useState(null); // State to store the start date
  const [closedDate, setClosedDate] = useState(null);     // State to store the closed date
  const [counter,setCounter] = useState(null);
  const [ticket,setTicket] = useState(null);
  const [counters,setCounters] = useState([]);

  const getAvailableCounters = async () => {
    try {
      const fetchedCounters = await API.getAvailableCounters();
      setCounters(fetchedCounters);
    } catch (error) {
      setCounters([]);
      handleErrors(error);
    } finally {
    }
  };


  const handleStartClick = () => {
    if(counter != undefined && counter?.hasOwnProperty("id_counter") && ticket != undefined || ticket?.hasOwnProperty("id")){
      setStartButtonDisabled(true);
      setStartDate(dayjs()); // Save the start date
    API.setOperatingTicket(counter,ticket);
    }
  };
  const handleNextClick = () => {
    setClosedDate(dayjs());
    //must send both start,closed date, service and counter

    //must get next ticket if any available
    //refresh
    setStartDate();
    setClosedDate();
    setStartButtonDisabled(false);
  };

  const getTicketByCounter = async (counterid) => {
    try {

      const fetchedTicket = await API.getTicketByCounterId(counterid);
      setTicket(fetchedTicket);
    } catch (error) {
      setTicket();
      handleErrors(error);
    }
  };
    useEffect(() => {
      getAvailableCounters();
    },[user])

    useEffect(() => {
      getTicketByCounter(counter?.id);
      
      console.log(ticket)
    },[counter])

  return (
    <Container>
      <Grid container alignItems="center"  minHeight="80vh" sx={{ flexDirection: 'column' }}>
        <Grid item>
          <Typography variant="h4">Welcome to Officer Desktop!</Typography>
        </Grid>
        <Grid container alignItems="center" justifyContent="flex-start">
          <Grid item>
            <Typography variant="h6">Counter #</Typography>
          </Grid>
          <Grid item>
            <CounterMenu disable={startButtonDisabled} counters={counters} counter={counter} setCounter={setCounter}/>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="body1">Currently serving ticket #{ticket?.id}</Typography>
        </Grid>
        <Grid item>
          <CurrentTimeDisplay />
        </Grid>
        <Grid item>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartClick}
              disabled={startButtonDisabled}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OfficePage;