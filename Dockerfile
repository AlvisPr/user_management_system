FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install all dependencies (including devDependencies)
RUN npm install --silent

# Copy the rest of the application code
COPY . .

RUN npm run obfuscate

# Copy obfuscated files to the server directory
RUN cp dist/createUsers.js public/JS/createUsers.js && cp dist/showUsers.js public/JS/showUsers.js && cp dist/navbar.js public/JS/navbar.js


# Expose the application port
EXPOSE 3001

# Change ownership of the application files to the node user
RUN chown -R node /app

# Switch to the node user
USER node

CMD ["npm", "start"]