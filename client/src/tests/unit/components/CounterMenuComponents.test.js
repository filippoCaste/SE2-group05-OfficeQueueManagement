import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CounterMenu from '../../../components/CounterMenuComponents';


describe('CounterMenuComponents', () => {
  test('CounterMenu opens and selects a counter', () => {
    const counters = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const setCounter = jest.fn();
  
    render(<CounterMenu counters={counters} setCounter={setCounter} counter={1} />);
  
    const button = screen.getByRole('button');
    fireEvent.click(button);
  
    const menuItems = screen.getAllByRole('menuitem');
  
    expect(menuItems).toHaveLength(counters.length);
    counters.forEach((counter, index) => {
      expect(menuItems[index]).toHaveTextContent(counter.id.toString());
    });
  
    fireEvent.click(menuItems[1]);
  
    expect(setCounter).toHaveBeenCalledWith({"id": 2});
  });
  
  test('CounterMenu displays the correct label', () => {
    const counters = [{ id: 1 }];
    const setCounter = jest.fn();
    render(<CounterMenu counters={counters} setCounter={setCounter} counter={1} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  
  test('CounterMenu displays menu items', () => {
    const counters = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const setCounter = jest.fn();
    render(<CounterMenu counters={counters} setCounter={setCounter} counter={1} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(counters.length);
  });
  
  test('CounterMenu calls setCounter when a menu item is clicked', () => {
    const counters = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const setCounter = jest.fn();
    render(<CounterMenu counters={counters} setCounter={setCounter} counter={1} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
  
    const menuItems = screen.getAllByRole('menuitem');
    fireEvent.click(menuItems[1]);
  
    expect(setCounter).toHaveBeenCalledWith({"id": 2});
  });
  
  test('CounterMenu does not call setCounter when the same counter is clicked', () => {
    const counters = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const setCounter = jest.fn();
    render(<CounterMenu counters={counters} setCounter={setCounter} counter={2} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
  
    const menuItems = screen.getAllByRole('menuitem');
  
    fireEvent.click(menuItems[1]);
  
    expect(setCounter).not.toHaveBeenCalledWith({ id: 1 });
  });
});
