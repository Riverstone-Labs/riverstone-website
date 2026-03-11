# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm install sharp

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy standalone output (handle monorepo subdirectory structure)
COPY --from=builder /app/.next/standalone ./tmp-standalone/
RUN ls -la ./tmp-standalone/ && \
    if [ -f ./tmp-standalone/server.js ]; then \
      echo "Found server.js in tmp-standalone root" && \
      cp -a ./tmp-standalone/. ./; \
    elif [ -f ./tmp-standalone/riverstone-website/server.js ]; then \
      echo "Found server.js in riverstone-website subdirectory" && \
      cp -a ./tmp-standalone/riverstone-website/. ./; \
    else \
      echo "ERROR: server.js not found" && \
      find ./tmp-standalone -name "server.js" && \
      exit 1; \
    fi && \
    rm -rf ./tmp-standalone

# Copy static files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Copy startup script
COPY docker-start.sh ./docker-start.sh
RUN chmod +x ./docker-start.sh

# Verify server.js exists and show directory contents for debugging
RUN ls -la && \
    if [ ! -f ./server.js ]; then \
      echo "ERROR: server.js not found. Standalone build failed." && \
      exit 1; \
    fi && \
    echo "✓ Build verification passed - server.js exists"

# Ensure public directory exists
RUN mkdir -p ./public

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["./docker-start.sh"]
