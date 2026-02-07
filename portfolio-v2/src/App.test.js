/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock child components to keep the test focused
jest.mock('./components/AIBot', () => () => <div>Mock AI Bot</div>);

test('renders portfolio navigation links', () => {
  render(<App />);
  
  // FIX: Use strict regex (^...$) to match EXACTLY "About"
  // This avoids matching the "About Me" header
  const aboutLink = screen.getByText(/^About$/i);
  expect(aboutLink).toBeInTheDocument();

  // FIX: Use strict regex to match EXACTLY "Projects"
  // This avoids matching the "Featured Projects" header
  const projectsLink = screen.getByText(/^Projects$/i);
  expect(projectsLink).toBeInTheDocument();
});