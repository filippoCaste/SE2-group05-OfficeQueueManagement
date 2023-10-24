import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CurrentTimeDisplay from '../../../components/CurrentTimeDisplay';

jest.mock('dayjs', () => ({
  __esModule: true,
  default: jest.requireActual('dayjs'),
}));

describe('CurrentTimeDisplay Component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-10-20T12:34:59'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('Renders the current time correctly', () => {
    render(<CurrentTimeDisplay />);
    
    const currentTimeElement = screen.getByText('Current Time: 2023-10-20 12:34');
    expect(currentTimeElement).toBeInTheDocument();
  });

  test('Updates the current time every second', () => {
    render(<CurrentTimeDisplay />);
    
    const currentTimeElement = screen.getByText('Current Time: 2023-10-20 12:34');
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    const updatedTimeElement = screen.getByText('Current Time: 2023-10-20 12:35');
    expect(updatedTimeElement).toBeInTheDocument();
  });
});
