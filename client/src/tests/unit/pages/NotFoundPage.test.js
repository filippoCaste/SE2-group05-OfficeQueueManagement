import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../../pages/NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

test('Renders the 404 Not Found page with the appropriate content', () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  const headerText = screen.getByText('404');
  const subHeaderText = screen.getByText('Oops! Page not found');
  const bodyText = screen.getByText('The page you are looking for does not exist.');
  const linkButton = screen.getByText('Go back to Home');

  expect(headerText).toBeInTheDocument();
  expect(subHeaderText).toBeInTheDocument();
  expect(bodyText).toBeInTheDocument();
  expect(linkButton).toBeInTheDocument();
});
