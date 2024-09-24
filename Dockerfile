# Use the latest Node.js image with Alpine Linux
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code (if necessary)
RUN npm run codegen

# Expose the port that the application will run on (change if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]