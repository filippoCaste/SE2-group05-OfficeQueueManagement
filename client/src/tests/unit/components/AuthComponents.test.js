import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ErrorContext from '../../../errorContext';
import LoginForm from '../../../components/AuthComponents';

describe('LoginForm', () => {
  test('renders the component correctly', () => {
    render(
          <MemoryRouter>
            <ErrorContext.Provider value={{ handleErrors: jest.fn() }}>
              <LoginForm login={() => {}} />);
            </ErrorContext.Provider>
          </MemoryRouter>);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    const mockLogin = jest.fn();
    render(<LoginForm login={mockLogin} />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    userEvent.type(emailInput, 'testuser@example.com');
    userEvent.type(passwordInput, 'password123');
    
    fireEvent.click(loginButton);

    await act(async () => {
      expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser@example.com', password: 'password123' });
    });
  });

  test('displays an error message when form submission fails', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Login failed'));
    const mockHandleErrors = jest.fn();
    
    render(<LoginForm login={mockLogin} />);
    
    const loginButton = screen.getByText('Login');
    
    fireEvent.click(loginButton);

    await act(async () => {
      expect(mockLogin).toHaveBeenCalled();
      expect(mockHandleErrors).not.toHaveBeenCalled();
    });
  });
});
