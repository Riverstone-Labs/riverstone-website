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

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Copy standalone output — handle both monorepo and standard layouts
COPY --from=builder /app/.next/standalone/. ./tmp-standalone/
RUN if [ -f ./tmp-standalone/server.js ]; then \
      cp -a ./tmp-standalone/. ./; \
    elif [ -d ./tmp-standalone/app ]; then \
      cp -a ./tmp-standalone/app/. ./; \
    fi && \
    rm -rf ./tmp-standalone

RUN mkdir -p ./public

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
