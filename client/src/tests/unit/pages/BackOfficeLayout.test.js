import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import BackOfficeLayout from '../../../pages/BackOfficeLayout';
import ErrorContext from '../../../errorContext';
import API from '../../../API';

jest.mock('../../../API', () => ({
  getTickets: jest.fn(),
  deleteTicket: jest.fn(),
}));

describe('BackOfficeLayout Component', () => {
  const mockUser = 'testUser';
  const mockTickets = [
    { id: 1, title: 'Ticket 1', author: 'Author 1', creationDate: '2023-10-20', closedDate: null },
    { id: 2, title: 'Ticket 2', author: 'Author 2', creationDate: '2023-10-21', closedDate: '2023-10-22' },
  ];

  beforeEach(() => {
    API.getTickets.mockResolvedValue(mockTickets);
  });

  test('Renders the BackOfficeLayout with tickets', async () => {
    render(<ErrorContext.Provider value={{ handleErrors: jest.fn() }}>
              <BackOfficeLayout user={mockUser} />
            </ErrorContext.Provider>);
    const welcomeText = screen.getByText('Welcome to BackOfficeLayout!');
    expect(welcomeText).toBeInTheDocument();

    await waitFor(() => {
      const ticketRows = screen.getAllByRole('row');
      expect(ticketRows).toHaveLength(mockTickets.length + 1); // Plus one for the header row
    });
  });

  test('Handles the deletion of a ticket', async () => {
    render(<BackOfficeLayout user={mockUser} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(mockTickets.length);

    API.deleteTicket.mockResolvedValue();
    
    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    expect(API.deleteTicket).toHaveBeenCalledWith(mockTickets[0].id);

    await waitFor(() => {
      expect(API.getTickets).toHaveBeenCalled();
    });
  });
});
