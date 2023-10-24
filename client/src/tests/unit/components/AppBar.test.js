import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppNavBar from '../../../components/AppBar';
import '@testing-library/jest-dom/extend-expect';

describe('AppNavBar component', () => {
    test('Render AppNavBar with the correct text', () => {
        render(<MemoryRouter>
                <AppNavBar loggedin={true} handleLogout={() => {}} />
               </MemoryRouter>);
        const linkElement = screen.getByText('Queue Management');
        expect(linkElement).toBeInTheDocument();
    });
    
    test('Render AppNavBar with login button', () => {
        render(<AppNavBar loggedin={false} />);
        const loginButton = screen.getByText('Login');
        expect(loginButton).toBeInTheDocument();
    });
    
    test('Render AppNavBar with logout button', () => {
        render(<AppNavBar loggedin={true} />);
        const logoutButton = screen.getByText('Logout');
        expect(logoutButton).toBeInTheDocument();
    });
    
    test('Clicking on "Login" must call the navigate function', () => {
        const mockNavigate = jest.fn();
        render(<AppNavBar loggedin={false} />);
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
    
    test('Clicking on "Logout" must call the handleLogout function and navigate', () => {
        const mockNavigate = jest.fn(() => Promise.resolve());
        const mockLogout = jest.fn();
        render(<AppNavBar loggedin={true} handleLogout={mockLogout} />);
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    }); 
});