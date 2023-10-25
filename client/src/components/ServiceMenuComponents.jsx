import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';


export default function ServiceMenu(props) {
  const {disable, services, setService, service} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(services);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (serviceSelected) => {
    setService(serviceSelected);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        SERVICE
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >{services?.map((e, index) => (
        <MenuItem key={index} onClick={(e) =>handleClose(e)}>
          {e.servicename}
          </MenuItem>
        ))}
        
      </Menu>
    </div>
  );
}