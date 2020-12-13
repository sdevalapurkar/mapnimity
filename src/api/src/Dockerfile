# using node base image
FROM node:alpine

# setting working dir inside container
WORKDIR /api

# required to install packages
COPY package.json ./

# installing npm packages
RUN npm install

ARG API_KEY

ENV API_KEY $API_KEY

COPY . /api/

# exposing port 8000 on container
EXPOSE 8000

CMD ["npm", "run", "start:reload"]
