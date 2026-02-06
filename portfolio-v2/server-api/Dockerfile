# Base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Port
EXPOSE 3001

# Start Server
CMD ["node", "index.js"]