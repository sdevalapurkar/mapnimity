# first building react project, using node base image
FROM node:10 as build-stage

WORKDIR /react-app

# required to install packages
COPY ./package.json /react-app/

# installing npm packages
RUN npm install

ARG REACT_APP_PORT

ENV REACT_APP_PORT $REACT_APP_PORT

ARG REACT_APP_PLACES_API_KEY

ENV REACT_APP_PLACES_API_KEY $REACT_APP_PLACES_API_KEY

ARG NGINX_PROXY_IP

ENV NGINX_PROXY_IP $NGINX_PROXY_IP

COPY ./ /react-app/

# creating production build to serve through nginx
RUN env &&\
    npm run build

# starting second, nginx build-stage
FROM nginx:1.19

# copying our nginx config
COPY --from=build-stage /react-app/mapnificent_nginx_config_container.conf /etc/nginx/conf.d/default.conf

# copying production build from last stage to serve through nginx
COPY --from=build-stage /react-app/build/ /usr/share/nginx/html

# exposing port 8080 on container
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]