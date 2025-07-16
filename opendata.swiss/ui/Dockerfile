FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# Serve the build using Nginx
FROM nginx:1.29-alpine
WORKDIR /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /app
EXPOSE 80
