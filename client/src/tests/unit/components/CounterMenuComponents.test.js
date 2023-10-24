import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CounterMenu from '../../../components/CounterMenuComponents';

describe('CounterMenu Component', () => {
  test('Renders the initial selected counter', () => {
    const counters = ['Counter 1', 'Counter 2', 'Counter 3'];
    render(<CounterMenu counters={counters} disable={false} />);
    
    const selectedCounter = screen.getByText('Counter 1');
    expect(selectedCounter).toBeInTheDocument();
  });
  
  test('Opens the menu when clicking on the list item', () => {
    const counters = ['Counter 1', 'Counter 2', 'Counter 3'];
    render(<CounterMenu counters={counters} disable={false} />);
    
    const listButton = screen.getByText('Counter 1');
    fireEvent.click(listButton);
    
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });
  
  test('Selects a different counter when a menu item is clicked', () => {
    const counters = ['Counter 1', 'Counter 2', 'Counter 3'];
    render(<CounterMenu counters={counters} disable={false} />);
    
    const listButton = screen.getByText('Counter 1');
    fireEvent.click(listButton);
    
    const menuItems = screen.getAllByRole('menuitem');
    fireEvent.click(menuItems[1]); // Click on 'Counter 2'
    
    const selectedCounter = screen.getByText('Counter 2');
    expect(selectedCounter).toBeInTheDocument();
  });
  
  test('Does not open the menu when disabled', () => {
    const counters = ['Counter 1', 'Counter 2', 'Counter 3'];
    render(<CounterMenu counters={counters} disable={true} />);
    
    const listButton = screen.getByText('Counter 1');
    fireEvent.click(listButton);
    
    const menu = screen.queryByRole('menu');
    expect(menu).toBeNull();
  });
});
