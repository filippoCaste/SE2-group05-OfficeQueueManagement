import React, { useState } from 'react'; // Import useState from React
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

export default function CounterMenu(props) 
{
  const {counters,setCounter,counter} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

    const handleClick = (counter) => {
  
    setCounter( counter);
    setAnchorEl(null);
  }


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        >
        {counter?.id ? counter?.id : "CounterID"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >{counters.map((e, index) => (
        <MenuItem key={index} onClick={() =>handleClick(e)}>
          {e.id}
          </MenuItem>
        ))}
        
      </Menu>
    </div>
  );
}