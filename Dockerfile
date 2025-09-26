# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # rspress build outputs to doc_build

# ---- Runtime stage ----
FROM nginx:alpine
COPY --from=builder /app/doc_build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
