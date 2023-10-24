import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import MainPage from '../../../pages/MainPage';

describe('MainPage Component', () => {
  test('Renders the button to get a ticket', () => {
    render(<MainPage />);
    
    const getTicketButton = screen.getByText('Get Ticket');
    expect(getTicketButton).toBeInTheDocument();
  });

  test('Navigates to the Get Ticket page when the button is clicked', () => {
    const navigate = jest.fn();
    const originalUseNavigate = require('react-router-dom').useNavigate;
    require('react-router-dom').useNavigate = () => navigate;

    render(<MainPage />);
    
    const getTicketButton = screen.getByText('Get Ticket');
    fireEvent.click(getTicketButton);
    
    expect(navigate).toHaveBeenCalledWith('/getTicket');
    
    // Restore the original useNavigate
    require('react-router-dom').useNavigate = originalUseNavigate;
  });

  test('Displays a loading spinner when isLoading is true', () => {
    render(<MainPage />);
    
    const loadingSpinner = screen.queryByRole('progressbar');
    expect(loadingSpinner).toBeNull();

    act(() => {
      // Set isLoading to true
      render(<MainPage />);
    });
    
    const updatedLoadingSpinner = screen.getByRole('progressbar');
    expect(updatedLoadingSpinner).toBeInTheDocument();
  });
});
