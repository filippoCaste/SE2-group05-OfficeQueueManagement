import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import GetTicketComponent from '../../../components/GetTicketComponent';
import API from '../../../API';

// Mock della funzione API.printTicketByServiceId
jest.mock('../../../API', () => ({
  printTicketByServiceId: jest.fn(() => Promise.resolve()),
  getAllTickets: jest.fn(() => Promise.resolve([])),
}));

describe('GetTicketComponent', () => {
  test('renders the list of services', () => {
    const listServices = [{ id: 1, serviceName: 'Service 1' }, { id: 2, serviceName: 'Service 2' }];
    render(<GetTicketComponent listServices={listServices} />);
    
    const service1 = screen.getByText('Service 1');
    const service2 = screen.getByText('Service 2');
    expect(service1).toBeInTheDocument();
    expect(service2).toBeInTheDocument();
  });
  
  test('selects a service and prints a ticket', async () => {
    const numberTicket = '1';
    const listServices = [{ id: 1, serviceName: 'Service 1' }];
    render(<GetTicketComponent listServices={listServices} numberTicket={numberTicket}/>);
    
    const service1 = screen.getByText('Service 1');
    fireEvent.click(service1);
  
    expect(API.printTicketByServiceId).toHaveBeenCalledWith(1);
  
    API.getAllTickets.mockImplementation(() => Promise.resolve([{ serviceid: 1, closeddate: null, counterid: 0 }]));
  
    await waitFor(() => {
      const ticketNumber = screen.getByText(/You ticket number is/);
      const peopleBefore = screen.getByText(/There are \d+ people before you turn/);
      expect(ticketNumber).toBeInTheDocument();
      expect(ticketNumber).toHaveTextContent(numberTicket);
      expect(peopleBefore).toBeInTheDocument();
    });
  });
  
  test('Hide the ticket element when selectedTicket is false', () => {
    const { queryByText } = render(<GetTicketComponent listServices={[]} />);
  
    const numberTicketElement = queryByText(/You ticket number is/i);
    const peopleBeforeElement = queryByText(/There are/i);
  
    expect(numberTicketElement).toBeNull();
    expect(peopleBeforeElement).toBeNull();
  });
});
