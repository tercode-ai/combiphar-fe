# Stage 1: Build the React app with Vite
FROM node:18-alpine as builder

WORKDIR /app
COPY . .

COPY .env.example .env

RUN npm install
RUN npm run build

# Stage 2: Set up Nginx to serve the static files
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
