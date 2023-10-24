import React, { useState, useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import ErrorContext from '../errorContext';

function LoginForm(props) {
  const navigate = useNavigate();
  const { handleErrors } = useContext(ErrorContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    props
      .login(credentials)
      .then(() => {
        navigate('/');
      })
      .catch((err) => handleErrors(err));
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
      maxWidth="xl"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '100vh',
          minWidth: '100vh',
        }}
      >
        <Box sx={{ mt: 5 }}>
          <TextField
            id="username"
            label="Email"
            type="email"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            required
          />
        </Box>
        <Box sx={{ mt: 5, mb: 5 }}>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
            minLength={6}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button type="submit" variant="contained" sx={{ px: 4 }}>
            Login
          </Button>
          <Link to="../" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="error" sx={{ px: 4 }}>
              Cancel
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export { LoginForm };
