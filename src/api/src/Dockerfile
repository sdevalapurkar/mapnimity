# using node base image
FROM node:alpine

# setting working dir inside container
WORKDIR /api

# required to install packages
COPY package.json ./

# installing npm packages
RUN npm install

COPY ./ ./api/

# exposing port 5000 on container
EXPOSE 8000

CMD ["npm", "run", "start"]