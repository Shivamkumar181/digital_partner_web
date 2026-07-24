# Stage 1: Build the frontend
FROM node:20-alpine as frontend-builder

# Copy frontend code
COPY ./frontend /app/frontend
WORKDIR /app/frontend

# Install dependencies and build
RUN npm install
RUN npm run build

# Stage 2: Build the backend
FROM node:20-alpine

# Copy backend code
COPY ./backend /app/backend
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Copy built frontend files to backend's public folder
COPY --from=frontend-builder /app/frontend/dist /app/backend/public

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
