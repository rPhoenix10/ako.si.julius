import { jest } from '@jest/globals';
import { describe, it, expect, beforeAll } from '@jest/globals';

// Mock the libraries BEFORE importing the app
jest.unstable_mockModule('@google/generative-ai', () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
        getGenerativeModel: jest.fn().mockReturnValue({
            generateContent: jest.fn().mockResolvedValue({
                response: {
                    text: () => "I am a Test Robot. The system is functioning."
                }
            }),
        }),
    }))
}));

jest.unstable_mockModule('pdf-parse-fork', () => ({
    default: jest.fn().mockResolvedValue({ text: "Mocked Resume Text" })
}));

describe('Chatbot API Integration Tests', () => {
    let app;
    let request;

    beforeAll(async () => {
        // 2. Dynamic Import of Supertest and App
        const supertest = await import('supertest');
        request = supertest.default;

        const module = await import('./index.js');
        app = module.default;
    });

    // Test Case 1: Standard Operation
    it('POST /api/chat should accept valid string input', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: "Hello, this is a test." });

        expect(response.statusCode).toBe(200);
        
        // Verify the JSON structure matches our new format
        expect(response.body).toHaveProperty('reply');
        expect(response.body.reply).toBe("I am a Test Robot. The system is functioning.");
    });

    // Test Case 2: Edge Case - Empty String
    it('POST /api/chat should reject empty strings', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: "" });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    // Test Case 3: Edge Case - Whitespace Only
    it('POST /api/chat should reject whitespace-only strings', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: "   " });

        expect(response.statusCode).toBe(400);
    });

    // Test Case 4: Edge Case - Invalid Data Type
    it('POST /api/chat should reject non-string inputs', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: 12345 });

        expect(response.statusCode).toBe(400);
    });

    // Test Case 5: Route Handling
    it('GET /api/unknown-route should return 404 Not Found', async () => {
        const response = await request(app)
            .get('/api/does-not-exist');

        expect(response.statusCode).toBe(404);
    });
});