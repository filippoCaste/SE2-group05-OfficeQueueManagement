import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import { LoginForm } from './components/AuthComponents';
import BackOfficeLayout from './pages/BackOfficeLayout';
import GetTicketComponent from './components/GetTicketComponent';
import API from './API';
import AppNavBar from './components/AppBar.jsx';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import OfficePage from './pages/OfficePage';
import CustomSnackBar from './components/CustomSnackbar';

function App() {
  const [userLogged, setUserLogged] = useState({}); //used to store infos of the logged user
  const [loggedin, setLoggedin] = useState(false);
  const [message, setMessage] = useState('');

  ///////////////////////
  const [listServices, setListServices] = useState({});

  const handleLogin = async (credentials) => {
    try {
      const user = await API.login(credentials);
      setUserLogged(user);
      setLoggedin(true);
      if (user?.role === 'admin') {
        const usersInfo = await API.getUsers();
        setUsers(usersInfo);
      }
      setMessage({ text: `Welcome, ${user.username}!`, type: 'success' });
    } catch (err) {
      setUserLogged({});
      setUsers([]);
      setLoggedin(false);
      throw err;
    }
  };
  const handleLogout = async () => {
    try {
      await API.logout();
      setUserLogged({});
      setLoggedin(false);
      setUsers([]);
      console.log('Successfully loggedout');
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userObject = await API.getUserInfo();
        setUserLogged(userObject);
        setLoggedin(true);
        if (userObject?.role === 'admin') {
          const usersInfo = await API.getUsers();
          setUsers(usersInfo);
        }
        console.log('You are logged in');
      } catch (err) {
        setUserLogged({});
      }
    };

    checkAuth();
  }, []);

  /////////////////////////////////////////////

  useEffect(() => {
    //GET ALL SERVICES
    API.getAllServices()
      .then((q) => setListServices(q))
      .catch((err) => handleErrors(err));
  }, []);

  return (
    <Container
      sx={{ padding: 0, margin: 0 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <BrowserRouter>
        <AppNavBar handleLogout={handleLogout} loggedin={loggedin}></AppNavBar>
        <CustomSnackBar message={message}></CustomSnackBar>
        <Routes>
          <Route path="/login" element={<LoginForm login={handleLogin} />} />
          <Route
            index
            path="/"
            element={loggedin ? <OfficePage user={userLogged} /> : <MainPage />}
          />

          <Route
            path="/getTicket"
            element={<GetTicketComponent listServices={listServices} />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
export default App;
