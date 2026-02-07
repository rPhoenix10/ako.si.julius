# Base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Cache package.json and Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Port
EXPOSE 5273

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]
