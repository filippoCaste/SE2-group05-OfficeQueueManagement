import React, { useState, useEffect, useContext } from 'react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import API from '../API';
import ErrorContext from '../errorContext';

function BackOfficeLayout(props) {
  const { user } = props;
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [tickets, setTickets] = useState([]);
  const { handleErrors } = useContext(ErrorContext);

  const getTickets = async () => {
    try {
      setLoadingTickets(true);
      const fetchedTickets = await API.getTickets();
      const sortedTickets = [...fetchedTickets].sort(sortByCreationDate);
      setTickets(sortedTickets);
    } catch (error) {
      setTickets([]);
      handleErrors(error);
    } finally {
      setLoadingTickets(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await API.deleteTicket(ticketId);
      await getTickets();
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    getTickets();
  }, [user]);

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" flexDirection="column">
        <h1>Welcome to BackOfficeLayout!</h1>
        <p className="lead">We have {tickets.length} tickets.</p>
        {!loadingTickets ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Closed Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TicketRow ticket={ticket} key={ticket.id} user={user} handleDeleteTicket={handleDeleteTicket} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh">
            <CircularProgress />
          </Box>
        )}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Link to="./add">
            <Button variant="contained" color="primary">
              Add Ticket
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

function TicketRow(props) {
  const { ticket, handleDeleteTicket, user } = props;
  const status = getTicketStatus(ticket.closedDate);

  return (
    <TableRow>
      <TableCell>{ticket.title}</TableCell>
      <TableCell>{ticket.author}</TableCell>
      <TableCell>{ticket.creationDate}</TableCell>
      <TableCell>{ticket.closedDate}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
}

const sortByCreationDate = (ticketA, ticketB) => {
  // Your sorting logic here
};

const getTicketStatus = (closedDate) => {
  if (!closedDate) {
    return 'Open';
  }
  return 'Closed';
};

export default BackOfficeLayout;
