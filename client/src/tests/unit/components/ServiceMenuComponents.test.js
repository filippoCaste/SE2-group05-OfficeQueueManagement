import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceMenu from '../../../components/ServiceMenuComponents';

describe('ServiceMenu Component', () => {
  test('Renders the list of services and selects the default service', () => {
    const services = ['Service 1', 'Service 2', 'Service 3'];
    render(<ServiceMenu services={services} disable={false} />);
    
    const defaultService = screen.getByText('Service 1');
    expect(defaultService).toBeInTheDocument();
  });
  
  test('Opens the menu when clicking on the list item', () => {
    const services = ['Service 1', 'Service 2', 'Service 3'];
    render(<ServiceMenu services={services} disable={false} />);
    
    const listButton = screen.getByText('Service 1');
    fireEvent.click(listButton);
    
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });
  
  test('Selects a different service when a menu item is clicked', () => {
    const services = ['Service 1', 'Service 2', 'Service 3'];
    render(<ServiceMenu services={services} disable={false} />);
    
    const listButton = screen.getByText('Service 1');
    fireEvent.click(listButton);
    
    const menuItems = screen.getAllByRole('menuitem');
    fireEvent.click(menuItems[1]); // Click on 'Service 2'
    
    const selectedService = screen.getByText('Service 2');
    expect(selectedService).toBeInTheDocument();
  });
  
  test('Does not open the menu when disabled', () => {
    const services = ['Service 1', 'Service 2', 'Service 3'];
    render(<ServiceMenu services={services} disable={true} />);
    
    const listButton = screen.getByText('Service 1');
    fireEvent.click(listButton);
    
    const menu = screen.queryByRole('menu');
    expect(menu).toBeNull();
  });
});
