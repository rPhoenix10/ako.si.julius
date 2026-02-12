// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder
Object.assign(global, { TextEncoder, TextDecoder });

// MOCK: window.matchMedia
// This fixes the "TypeError: window.matchMedia is not a function" error
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock HTMLElement.prototype.scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// MOCK: global.fetch
// This fixes "ReferenceError: fetch is not defined" in App.test.js
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}), // Return empty JSON if asked
  })
);