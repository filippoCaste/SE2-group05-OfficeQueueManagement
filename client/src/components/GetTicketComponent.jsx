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

//import API from '/API'

function GetTicketComponent(props)
{
    const [selectedService, setSelectedService] = useState(null);

    // eslint-disable-next-line react/prop-types
    let services=Array.from(props.listServices);

    // eslint-disable-next-line react/prop-types
    let counters=Array.from(props.listCounters);

    const [selectedTicket, setSelectedTicket] = useState(false);
    const [numberTicket, setNumberTicket] = useState(null);  

         
    const handleItemClick = (service) => 
    {
       setSelectedService(service.serviceName);
       setSelectedTicket(()=>true)

       let i=0;
       let find=false;
       while((i < counters.length)&&(find==false))
       {
          if(counters[i].id==service.id_counter)
              find=true;
          else
              i=i+1;
       }
       setNumberTicket((q)=> counters[i].value_number);

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
            onClick={() => handleItemClick(item,counters)}
          >
            <ListItemText primary={item.serviceName} />
          </ListItem>
        ))}
      </List>

      {selectedTicket?  
           <h2> {numberTicket} is your number ticket for the service {selectedService} </h2>  :  <></>  }

    </> 
    );
}

export default GetTicketComponent;
