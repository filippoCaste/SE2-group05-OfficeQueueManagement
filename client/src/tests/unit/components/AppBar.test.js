import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import AppNavBar from '../../../components/AppBar';

describe('AppNavBar component', () => {
    test('Render AppNavBar with the correct text', () => {
        render(<MemoryRouter>
                    <AppNavBar loggedin={false} handleLogout={() => {}} />
               </MemoryRouter>);
        const linkElement = screen.getByText('Queue Management');
        expect(linkElement).toBeInTheDocument();
    });
    
    test('Render AppNavBar with login button', () => {
        render(<MemoryRouter>
                    <AppNavBar loggedin={false} handleLogout={() => {}} />
                </MemoryRouter>);
        const loginButton = screen.getByText('Login');
        expect(loginButton).toBeInTheDocument();
    });
    
    test('Render AppNavBar with logout button', () => {
        render(<MemoryRouter>
                    <AppNavBar loggedin={true} handleLogout={() => {}} />
                </MemoryRouter>);
        const logoutButton = screen.getByText('Logout');
        expect(logoutButton).toBeInTheDocument();
    });
    
});