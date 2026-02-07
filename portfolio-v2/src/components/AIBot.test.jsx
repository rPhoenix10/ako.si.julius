import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIBot from './AIBot';

// Mock global fetch to prevent actual network requests during testing
global.fetch = jest.fn();

describe('AIBot Component Integration Tests', () => {
  
  // Reset mocks before each test to ensure test isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the chat trigger button initially', () => {
    render(<AIBot />);
    const toggleButton = screen.getByText(/Ask AI/i);
    expect(toggleButton).toBeInTheDocument();
  });

  test('opens the chat interface when trigger button is clicked', () => {
    render(<AIBot />);
    
    // Interact: Click the trigger button
    const toggleButton = screen.getByText(/Ask AI/i);
    fireEvent.click(toggleButton);

    // Assert: Chat window header is visible
    const chatHeader = screen.getByText(/Ask about Julius/i);
    expect(chatHeader).toBeInTheDocument();
  });

  test('simulates sending a message and receiving an AI response', async () => {
    // Mock a successful backend response
    const mockResponse = { reply: "Confirmed. Julius is proficient in React." };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<AIBot />);

    // 1. Open Chat
    fireEvent.click(screen.getByText(/Ask AI/i));

    // 2. Simulate User Typing
    const inputField = screen.getByPlaceholderText(/Ask about skills/i);
    fireEvent.change(inputField, { target: { value: 'What is his tech stack?' } });

    // 3. Simulate Send Click
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    // 4. Assert: Loading state appears
    expect(screen.getByText(/Thinking/i)).toBeInTheDocument();

    // 5. Assert: AI response appears asynchronously
    await waitFor(() => {
      expect(screen.getByText("Confirmed. Julius is proficient in React.")).toBeInTheDocument();
    });
  });

  test('handles network errors gracefully', async () => {
    // Mock a network failure
    fetch.mockRejectedValueOnce(new Error('API Down'));

    render(<AIBot />);
    fireEvent.click(screen.getByText(/Ask AI/i));

    // Send a message
    const inputField = screen.getByPlaceholderText(/Ask about skills/i);
    fireEvent.change(inputField, { target: { value: 'Hello?' } });
    fireEvent.click(screen.getByText('Send'));

    // Assert: Error message is displayed to user
    await waitFor(() => {
      expect(screen.getByText(/trouble connecting/i)).toBeInTheDocument();
    });
  });

});