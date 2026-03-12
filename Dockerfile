# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for sharp and other native modules
RUN apk add --no-cache python3 make g++

# Increase Node.js memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package*.json ./
RUN npm ci && npm install sharp

COPY . .
RUN npm run build 2>&1 || (echo "=== BUILD FAILED ===" && cat /app/.next/error.log 2>/dev/null || echo "No error log found" && exit 1)

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy standalone output - handle monorepo subdirectory structure
COPY --from=builder /app/.next/standalone ./

# If server.js is in a subdirectory (monorepo), move files up
RUN if [ ! -f ./server.js ] && [ -f ./riverstone-website/server.js ]; then \
      mv ./riverstone-website/* ./ && \
      rm -rf ./riverstone-website; \
    fi

# Verify server.js exists
RUN if [ ! -f ./server.js ]; then \
      echo "ERROR: server.js not found. Directory contents:" && \
      ls -la && \
      exit 1; \
    fi

# Copy static files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Copy startup script
COPY docker-start.sh ./docker-start.sh
RUN chmod +x ./docker-start.sh

# Ensure public directory exists
RUN mkdir -p ./public

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Health check using 0.0.0.0 (matches HOSTNAME)
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://0.0.0.0:3000/api/health || exit 1

CMD ["./docker-start.sh"]