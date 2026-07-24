FROM node:20-alpine as frontend-builder

COPY ./frontend /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM node:20-alpine

COPY ./backend /app
WORKDIR /app

RUN npm install

EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
