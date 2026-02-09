# Use Node.js 22 slim image for better compatibility with native modules
FROM node:22-slim AS builder

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:22-slim

WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.output ./.output

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
