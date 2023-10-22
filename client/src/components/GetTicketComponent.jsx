import React from 'react';
import { useState, useEffect } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function GetTicketComponent(props)
{
    const [selectedService, setSelectedService] = useState(null);
    const services = ['Service 1: shipping', 'Service 2: accounts management', 'Service 3: something']; //servizi di prova

    const [selectedTicket, setSelectedTicket] = useState(false);
    const [numberTicket, setNumberTicket] = useState(0);  
    
    const handleItemClick = (service) => 
    {
       setSelectedService(service);
       
       //LOGICAL FLOW
       //Tramite service.id ricavare(join) quale counter è associato ad esso,
       //quindi poi dal counter corrispondente ricavare il valore (numero) del ticket corrente.
       //inviare tramite valore al lato client.
       //tale valore verrà mostrato qui

       //Using service.id to obtain (join) which counter is associated with it,
       //then from the corresponding counter obtain the value (number) of the current ticket.
       //send via value to client side.
       //that value will be shown here

       setNumberTicket(()=>numberTicket+1); //PROVA FALSA LOCALE 
       setSelectedTicket(()=>true)
    };
  
    return (
      <>
     
      <h2> Choose Your Service </h2>
      
      <List>
        {services.map((item, index) => (
          <ListItem
            button
            key={index}
            selected={selectedService === item}
            onClick={() => handleItemClick(item)}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      {selectedTicket?  
           <h2> {numberTicket} is your number ticket for the service {selectedService} </h2>  :  <></>  }

    </> 
    );
}

export default GetTicketComponent;
