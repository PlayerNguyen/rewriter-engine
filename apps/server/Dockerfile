FROM oven/bun:latest AS base
WORKDIR /app

# Copy root package files and workspace config
COPY package.json bun.lock ./
COPY packages/ ./packages/

# Copy server app
COPY apps/server/ ./apps/server/

# Install dependencies
RUN bun install --frozen-lockfile

# Generate Prisma client
COPY prisma/ ./prisma/
RUN bunx prisma generate

WORKDIR /app/apps/server
EXPOSE 3001
CMD ["bun", "run", "src/index.ts"]
