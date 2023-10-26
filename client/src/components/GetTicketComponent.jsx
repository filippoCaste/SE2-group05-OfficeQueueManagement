import React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import API from '../API';
import CountersBord from './CountersBord';

function GetTicketComponent(props) {
  const [selectedService, setSelectedService] = useState('');

  // eslint-disable-next-line react/prop-types
  let services = Array.from(props.listServices);

  const [selectedTicket, setSelectedTicket] = useState(false);
  const [numberTicket, setNumberTicket] = useState('');
  const [noPeopleBefore, setNoPeopleBefore] = useState(0);

  const handleItemClick = async (service) => {
    setSelectedService(service.serviceName);

    //service.id_counter
    //  await API.getCounterById(service.id_counter)
    //  .then((q)=>setNumberTicket(q.value_number+" is your number ticket at the counter "+q.id_counter+" for the service "+service.serviceName))

    // Add the ticket to the DB
    API.printTicketByServiceId(service.id).then(() => {
      API.getAllTickets().then((tks) => {
        setNumberTicket(tks.length);
        const ts = tks.filter(
          (t) =>
            t.serviceid === service.id &&
            t.closeddate == null &&
            t.counterid == 0
        );
        setNoPeopleBefore(ts.length - 1);
        setSelectedTicket(true);
      });
    });
  };

  return (
    <>
      <h2> Choose Your Service </h2>

      <List>
        {services.map((item, index) => (
          <ListItem button key={index} onClick={() => handleItemClick(item)}>
            <ListItemText primary={item.serviceName} />
          </ListItem>
        ))}
      </List>

      {selectedTicket ? (
        <>
          <h2>
            {' '}
            You ticket number is <b>{numberTicket}</b>{' '}
          </h2>{' '}
          <p>There are {noPeopleBefore} people before you turn.</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default GetTicketComponent;
