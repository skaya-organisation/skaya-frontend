# ---- Build stage ----
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files and build
COPY . .
RUN npm run build   # outputs to doc_build

# ---- Production stage ----
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/doc_build /usr/share/nginx/html

# Copy custom Nginx config for HTTPS
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose HTTP and HTTPS
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
