import React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const AppNavBar = (props) => {
  const { loggedin, handleLogout} = props;
  const navigate = useNavigate();

  return (
    <Box sx={{ zIndex: 1, mt: "80px" }}>
      <AppBar component="nav" sx={{ zIndex: 2 }}>
        <Toolbar>
          <Link
            href=""
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            component="div"
            sx={{
              color: "#fff",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            Queue Management
          </Link>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            {loggedin ? (
              <Button onClick={(() => {handleLogout().then(() =>navigate("/"))})}  
               sx={{ color: "#fff" }}
               >
                Logout
              </Button>
            ) : (
               <Button onClick={() =>navigate("/login")} 
               sx={{ color: "#fff" }}
               >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppNavBar;
