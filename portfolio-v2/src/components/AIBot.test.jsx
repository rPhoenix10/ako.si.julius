import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIBot from './AIBot';

// Mock the global fetch function
global.fetch = jest.fn();

describe('AIBot Terminal Integration Tests', () => {
  
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the terminal interface initially', () => {
    render(<AIBot />);
    
    // Check for the Terminal Header
    expect(screen.getByText(/Julius_Sale_Bot -- -bash/i)).toBeInTheDocument();
    
    // Check for the "System Ready" initial message
    expect(screen.getByText(/SYSTEM_READY/i)).toBeInTheDocument();
    
    // Check for the Input area
    expect(screen.getByPlaceholderText(/Enter command.../i)).toBeInTheDocument();
  });

  test('simulates sending a message and receiving an AI response', async () => {
    // Mock a successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: 'STATUS: CONFIRMED. Candidate has Docker skills.' }),
    });

    render(<AIBot />);

    const inputField = screen.getByPlaceholderText(/Enter command.../i);
    
    // 1. User types a command
    fireEvent.change(inputField, { target: { value: 'Does he know Docker?' } });
    
    // 2. User presses Enter (submits form)
    fireEvent.submit(inputField.closest('form'));

    // 3. Verify user's message appears in the terminal history
    expect(screen.getByText('Does he know Docker?')).toBeInTheDocument();

    // 4. Wait for the AI to reply (handles the async fetch + setTimeout)
    await waitFor(() => {
      expect(screen.getByText(/STATUS: CONFIRMED/i)).toBeInTheDocument();
    });
  });

  test('handles network errors gracefully', async () => {
    // Mock a failed network request
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    render(<AIBot />);

    const inputField = screen.getByPlaceholderText(/Enter command.../i);
    
    fireEvent.change(inputField, { target: { value: 'Crash test' } });
    fireEvent.submit(inputField.closest('form'));

    // Expect the specific error message defined in your component
    await waitFor(() => {
      expect(screen.getByText(/ERR_CONNECTION_REFUSED/i)).toBeInTheDocument();
    });
  });
});