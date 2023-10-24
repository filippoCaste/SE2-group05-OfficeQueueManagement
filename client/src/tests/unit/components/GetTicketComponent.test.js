import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import GetTicketComponent from '../../../components/GetTicketComponent';
import API from '../API';

jest.mock('../API');

describe('GetTicketComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockListServices = [
    { id: 1, serviceName: 'Service 1', id_counter: 1 },
    { id: 2, serviceName: 'Service 2', id_counter: 2 },
  ];

  test('Renders the list of services and displays the selected service', () => {
    render(<GetTicketComponent listServices={mockListServices} />);
    const service1 = screen.getByText('Service 1');
    const service2 = screen.getByText('Service 2');

    expect(service1).toBeInTheDocument();
    expect(service2).toBeInTheDocument();

    fireEvent.click(service1);
    const selectedService = screen.getByText('You are in the queue now. Your ticket is number xx');
    expect(selectedService).toBeInTheDocument();
  });

  test('Calls the API and updates the ticket number when a service is clicked', async () => {
    const printTicketByServiceId = jest.fn().mockResolvedValue({ ticketNumber: '123' });
    API.printTicketByServiceId = printTicketByServiceId;

    render(<GetTicketComponent listServices={mockListServices} />);
    const service1 = screen.getByText('Service 1');

    fireEvent.click(service1);

    expect(printTicketByServiceId).toHaveBeenCalledWith(1);

    await act(async () => {
      const selectedService = await screen.findByText('You are in the queue now. Your ticket is number 123');
      expect(selectedService).toBeInTheDocument();
    });
  });
});
