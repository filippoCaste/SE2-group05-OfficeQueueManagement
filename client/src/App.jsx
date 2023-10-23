import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import  NotFoundPage  from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import { LoginForm } from './components/AuthComponents';
import BackOfficeLayout from './pages/BackOfficeLayout';
import GetTicketComponent from './components/GetTicketComponent';
import API from './API';
import { Row, Alert } from 'react-bootstrap';
import ErrorContext from './errorContext';
import AppNavBar from "./components/AppBar.jsx";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Sample from './pages/Sample';
function App() {
  const [userLogged, setUserLogged] = useState({});            //used to store infos of the logged user
  const [loggedin, setLoggedin] = useState(false); 
  const [message, setMessage] = useState('');

  ///////////////////////
  const [listServices, setListServices] = useState({});


    // If an error occurs, the error message will be shown
  const handleErrors = (err) => {
      let msg = '';
      if (err.error) msg = err.error;
      else if (String(err) === "string") msg = String(err);
      else msg = "Unknown Error";
      if(!(msg ==="Not authenticated" && !loggedin))   //exclude the case I am in FrontOffice
                setMessage({msg:msg, type:"danger"});
  }
  
    const handleLogin = async (credentials) => {
      try {
        const user = await API.login(credentials);
        setUserLogged(user);
        setLoggedin(true);
        if ( user?.role === 'admin') {
          const usersInfo = await API.getUsers();
          setUsers(usersInfo);
        }
        setMessage({ msg: `Welcome, ${user.username}!`, type: 'success' });
      } catch (err) {
        setUserLogged({});
        setUsers([]);
        setLoggedin(false);
        handleErrors(err);
        throw err;
      }
    };
    const handleLogout = async () => {
      try{ 
      await API.logout();
      setUserLogged({});
      setLoggedin(false);
      setUsers([]);
      setMessage({ msg: `Successfully loggedout`, type: 'success' });
      return true;
      } catch (err) {
        handleErrors(err);
        return false;
      }
    };
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const userObject = await API.getUserInfo();
          setUserLogged(userObject);
          setLoggedin(true);
          if ( userObject?.role === 'admin') {
            const usersInfo = await API.getUsers();
            setUsers(usersInfo);
          }
          setMessage({msg:"You are logged in", type: 'success'})
        } catch (err) {
          handleErrors(err);
          setUserLogged({});
        }
      };
    
      checkAuth();
      },[]);


  /////////////////////////////////////////////

  useEffect(()=>{

    //GET ALL SERVICES
     API.getAllServices()
    .then((q)=>setListServices(q))
    .catch((err) => handleErrors(err));


  },[]);


  return (
    <Container
        sx={{ padding: 0, margin: 0 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
       <BrowserRouter>
      <ErrorContext.Provider value={{ handleErrors }}>
        <Routes>
          <Route
            element={
              <>
               <Container fluid maxWidth="xl" >
                <AppNavBar handleLogout={handleLogout} loggedin={loggedin} />
                  {message && (
                    <Box>
                      <Alert variant={message.type} onClose={() => setMessage('')} dismissible>
                        {message.msg}
                      </Alert>
                    </Box>
                  )}
                  <Container
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                  >
                    <Outlet />
                  </Container>
                </Container>
              </>
            }
          >
            <Route path="/login" element={<LoginForm login={handleLogin} />} />
            <Route
              index
              path="/"
              element={
                loggedin ? (
                  <Sample user={userLogged} />
                ) : (
                  <MainPage />
                )
              }
            />

            <Route path="/getTicket" 
                element={<GetTicketComponent listServices={listServices} />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ErrorContext.Provider>
    </BrowserRouter>
    </Container>
  );
}
export default App;