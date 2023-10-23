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

import API from '../API'

function GetTicketComponent(props)
{
    const [selectedService, setSelectedService] = useState(null);

    // eslint-disable-next-line react/prop-types
    let services=Array.from(props.listServices);

    const [selectedTicket, setSelectedTicket] = useState(false);
    const [numberTicket, setNumberTicket] = useState(null);  

         
    const handleItemClick = async(service) => 
    {
       setSelectedService(service.serviceName);
       setSelectedTicket(()=>true)

       //service.id_counter
       await API.getCounterById(service.id_counter)
       .then((q)=>setNumberTicket(q.value_number+" is your number ticket at the counter "+q.id_counter+" for the service "+service.serviceName))
    
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
            <ListItemText primary={item.serviceName} />
          </ListItem>
        ))}
      </List>

      {selectedTicket?  <h2> {numberTicket}  </h2>  :  <></>  }

    </> 
    );
}

export default GetTicketComponent;
