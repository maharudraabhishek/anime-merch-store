FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache unzip

# NOTE: change the zip name to the ACTUAL file in your repo root
COPY anime-portfolio.zip /app/

# unzip; handle nested folder inside the zip
RUN set -eux; \
    unzip -o /app/anime-portfolio.zip -d /app/extracted; \
    if [ -f /app/extracted/package.json ]; then \
      mv /app/extracted/* /app/; \
    else \
      inner="$(find /app/extracted -mindepth 1 -maxdepth 1 -type d | head -n1)"; \
      mv "$inner"/* /app/; \
    fi; \
    rm -rf /app/extracted /app/anime-portfolio.zip

# sanity: prove package.json is really in /app now
RUN echo "== after unzip ==" && ls -la /app | sed -n '1,200p' && test -f /app/package.json

RUN npm ci
# optional:
# RUN npm run fetch:assets || true
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app /app
RUN echo "== runtime check ==" && ls -la /app | sed -n '1,200p' && ls -la /app/dist || true
EXPOSE 8080
CMD ["npm", "start"]
