# Use Node.js
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 4173

# Start the app
CMD ["npm", "run", "preview"]
