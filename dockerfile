# Build frontend
FROM node:20-alpine as frontend-builder

# Copy frontend code
COPY ./frontend /app
WORKDIR /app

RUN npm install
RUN npm run build

# Build backend
FROM node:20-alpine

# Copy backend code
COPY ./backend /app
WORKDIR /app

RUN npm install

# Copy built frontend from stage 1 to backend's public folder
COPY --from=frontend-builder /app/dist /app/public

# Expose port (Render uses PORT env variable)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
