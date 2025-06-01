# Use an official Node.js runtime

FROM node:lts



# Create app directory

WORKDIR /app



# Copy package.json and install dependencies

COPY package*.json ./

RUN npm install



# Copy the rest of your application

COPY . .



# Expose the port your app runs on (for example: 9090 or 3000)

EXPOSE 9090



# Start your app

CMD ["npm", "start"]
