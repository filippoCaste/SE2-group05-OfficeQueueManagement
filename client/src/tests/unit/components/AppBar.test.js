import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {AppNavBar} from '../../../components/AppBar';

describe('AppNavBar component', () => {
    test('Render AppNavBar with the correct text', () => {
        render(<AppNavBar loggedin={false} />);
        const linkElement = screen.getByText(/Queue Management/i);
        expect(linkElement).toBeInTheDocument();
    });
    
    test('Render AppNavBar with login button', () => {
        render(<AppNavBar loggedin={false} />);
        const loginButton = screen.getByText(/Login/i);
        expect(loginButton).toBeInTheDocument();
    });
    
    test('Render AppNavBar with logout button', () => {
        render(<AppNavBar loggedin={true} />);
        const logoutButton = screen.getByText(/Logout/i);
        expect(logoutButton).toBeInTheDocument();
    });
    
    test('Clicking on "Login" must call the navigate function', () => {
        const mockNavigate = jest.fn();
        render(<AppNavBar loggedin={false} />);
        const loginButton = screen.getByText(/Login/i);
        fireEvent.click(loginButton);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
    
    test('Clicking on "Logout" must call the handleLogout function and navigate', () => {
        const mockNavigate = jest.fn(() => Promise.resolve());
        const mockLogout = jest.fn();
        render(<AppNavBar loggedin={true} handleLogout={mockLogout} />);
        const logoutButton = screen.getByText(/Logout/i);
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    }); 
});