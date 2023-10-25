import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sample from '../../../pages/Sample';
import { MemoryRouter } from 'react-router-dom';
import API from '../../../API';

jest.mock('../../../API', () => ({
  getTicketbyService: jest.fn(),
  getAllServices: jest.fn(),
  getAllCounters: jest.fn(),
}));

const mockUser = 'testUser';

describe('Sample Component', () => {
  const mockServices = [{ id: 1, name: 'Service 1' }, { id: 2, name: 'Service 2' }];
  const mockCounters = [1, 2];
  const mockTicket = { id: 1 };

  beforeEach(() => {
    API.getTicketbyService.mockResolvedValue(mockTicket);
    API.getAllServices.mockResolvedValue(mockServices);
    API.getAllCounters.mockResolvedValue(mockCounters);
  });

  test('Renders the Sample page with the appropriate content', async () => {
    render(
      <MemoryRouter>
        <Sample user={mockUser} />
      </MemoryRouter>
    );

    const welcomeText = screen.getByText('Welcome to Officer Desktop!');
    const counterText = screen.getByText('Counter #');
    const servingText = screen.getByText('Currently serving ticket #1');
    const startTimeButton = screen.getByText('Start');
    const nextButton = screen.getByText('Next');

    expect(welcomeText).toBeInTheDocument();
    expect(counterText).toBeInTheDocument();
    expect(servingText).toBeInTheDocument();
    expect(startTimeButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('Simulates clicking the "Start" button', () => {
    render(
      <MemoryRouter>
        <Sample user={mockUser} />
      </MemoryRouter>
    );

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    expect(startButton).toBeDisabled();
  });

  test('Simulates clicking the "Next" button', async () => {
    render(
      <MemoryRouter>
        <Sample user={mockUser} />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    const startButton = screen.getByText('Start');
    expect(startButton).not.toBeDisabled();

    const servingText = await screen.findByText('Currently serving ticket #1');
    expect(servingText).toBeInTheDocument();
  });
});
