FROM node:18-alpine

WORKDIR /

COPY anime-portfolio.zip .

# Install unzip and extract the zip
RUN apk add --no-cache unzip && \
    unzip -o anime-portfolio.zip -d extracted && \
    mv extracted/* . && \
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
