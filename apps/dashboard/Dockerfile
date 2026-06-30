FROM oven/bun:1.3.14-alpine AS base
WORKDIR /app

# Copy root package files and workspace config
COPY package.json bun.lock ./
COPY packages/ ./packages/

# Copy dashboard app
COPY apps/dashboard/ ./apps/dashboard/

# Install dependencies and build
RUN bun install --frozen-lockfile
RUN bun run --filter @rewriter/dashboard build

# Serve with nginx
FROM nginx:alpine
COPY --from=base /app/apps/dashboard/dist /usr/share/nginx/html
COPY apps/dashboard/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
