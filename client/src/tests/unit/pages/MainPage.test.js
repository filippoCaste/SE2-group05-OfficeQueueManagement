import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import MainPage from '../../../pages/MainPage';
import { MemoryRouter, Route } from 'react-router-dom';

describe('MainPage Component', () => {
  test('Renders the button to get a ticket', () => {
    render(<MemoryRouter>
              <MainPage />
          </MemoryRouter>);
    
    const getTicketButton = screen.getByRole('button');
    expect(getTicketButton).toBeInTheDocument();
  });

  test('Navigates to the GetTicket page when the button is clicked', () => {
    render(<MemoryRouter>
              <MainPage />
          </MemoryRouter>);
    
    const getTicketButton = screen.getByRole('button');
    fireEvent.click(getTicketButton);
    expect(window.location.pathname).toHaveBeenCalledWith('/getTicket');
  });

});
