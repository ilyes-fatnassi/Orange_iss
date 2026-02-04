FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 4200

# Start nginx or serve the built files
# For production, use nginx. For now, we'll use a simple server
RUN npm install -g http-server
CMD ["http-server", "dist/iss-orange-frontend", "-p", "4200"]
