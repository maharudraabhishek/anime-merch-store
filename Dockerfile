FROM node:18-alpine

WORKDIR /app

COPY anime-portfolio-new.zip .

# Install unzip and extract the zip
RUN apk add --no-cache unzip && \
    unzip -o anime-portfolio-new.zip -d extracted && \
    mv extracted/* . && \
    rm -rf anime-portfolio-new.zip extracted
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
