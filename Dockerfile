FROM node:18-alpine

WORKDIR /

COPY anime-portfolio.zip .

# Install unzip and extract the zip
RUN apk add --no-cache unzip && \
    unzip -q anime-portfolio.zip -d extracted -x "__MACOSX/*" "*/.DS_Store" && \
    sh -c 'set -e; \
      cnt=$(ls -1 extracted | wc -l); \
      if [ "$cnt" = "1" ]; then \
        dir=$(ls -1 extracted); \
        mv "extracted/$dir"/* .; \
      else \
        mv extracted/* .; \
      fi' && \
    rm -rf anime-portfolio.zip extracted

# Disable database connection for demo purposes
ENV DATABASE_URL=

# Install dependencies
RUN npm install
RUN npm install cors

# Build the client
RUN npm run build

# Expose the port your server will run on
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
