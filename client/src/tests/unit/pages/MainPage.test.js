import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import MainPage from '../../../pages/MainPage';
import { MemoryRouter } from 'react-router-dom';

describe('MainPage Component', () => {
  test('Renders the button to get a ticket', () => {
    render(<MemoryRouter>
              <MainPage />
          </MemoryRouter>);
    
    const getTicketButton = screen.getByRole('button');
    expect(getTicketButton).toBeInTheDocument();
  });

  test('Navigates to the Get Ticket page when the button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<MemoryRouter>
              <MainPage navigate={mockNavigate} />
          </MemoryRouter>);
    
    const getTicketButton = screen.getByRole('button');
    fireEvent.click(getTicketButton);
    expect(window.location.pathname).toBe('/');
  });


  test('Displays a loading spinner when isLoading is true', () => {
    render(<MemoryRouter>
              <MainPage />
          </MemoryRouter>);
    
    const loadingSpinner = screen.getByRole('progressbar');
    expect(loadingSpinner).toBeNull();

    act(() => {
      // Set isLoading to true
      render(<MemoryRouter>
                  <MainPage />
              </MemoryRouter>);
    });
    
    const updatedLoadingSpinner = screen.getByRole('progressbar');
    expect(updatedLoadingSpinner).toBeInTheDocument();
  });
});
