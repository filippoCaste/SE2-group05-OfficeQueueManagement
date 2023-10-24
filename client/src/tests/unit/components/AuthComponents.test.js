import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LoginForm from '../../../components/AuthComponents';

describe('LoginForm Component', () => {
  test('Renders the login form correctly', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');
    const cancelButton = screen.getByText('Cancel');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  
  test('Submits the form with the correct data', async () => {
    const mockLogin = jest.fn().mockResolvedValue({});
    
    render(<LoginForm login={mockLogin} />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    await act(async () => {
      expect(mockLogin).toHaveBeenCalledWith({ username: 'test@example.com', password: 'password123' });
    });
  });
  
  test('Handles the "Cancel" button click correctly', () => {
    const mockNavigate = jest.fn();
    render(<LoginForm login={() => {}} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
