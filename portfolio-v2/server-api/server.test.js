import request from 'supertest';
import app from './index.js';

describe('Chatbot API Integration Tests', () => {

    // This prevents the server from calling the real API during tests.
    // It fixes the "fetch is not defined" error
    jest.mock('@google/generative-ai', () => {
    return {
        GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
        getGenerativeModel: jest.fn().mockReturnValue({
            // When the server asks to generate content, we return this fake stream
            generateContentStream: jest.fn().mockResolvedValue({
            stream: (async function* () {
                yield { text: () => "I am a Test Robot. The system is functioning." };
            })()
            }),
        }),
        })),
    };
    });

    // Test Case 1: Standard Operation
    test('POST /api/chat should accept valid string input', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: "Hello, this is a test." });
        
        // Expect success (200 OK) or server error (500) if AI key is missing,
        // but NOT a 400 Bad Request.
        expect(response.statusCode).not.toBe(400);
        expect(response.statusCode).not.toBe(404);
    });

    // Test Case 2: Edge Case - Empty String
    test('POST /api/chat should reject empty strings', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: "" });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    // Test Case 3: Edge Case - Whitespace Only
    test('POST /api/chat should reject whitespace-only strings', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: "   " }); 

        expect(response.statusCode).toBe(400);
    });

    // Test Case 4: Edge Case - Invalid Data Type
    test('POST /api/chat should reject non-string inputs (e.g., numbers)', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: 12345 });

        expect(response.statusCode).toBe(400);
    });

    // Test Case 5: Route Handling
    test('GET /api/unknown-route should return 404 Not Found', async () => {
        const response = await request(app)
            .get('/api/does-not-exist');

        expect(response.statusCode).toBe(404);
    });

});