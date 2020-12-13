# Mapnimity

Mapnimity is an application for users to find restaurants in closest proximity to their friends! Enter as many addresses as you like and find the maptimal location!
[Check out Mapnimity here.](http://www.mapnimity.com)

## Running Locally

In order to run the application locally, follow the steps below after cloning the repo:

### API

1. From the `src/api/src` directory run `npm install`
2. Create a `.env` file with the following environment variables:

```bash
API_KEY=<api_key_google>
```

3. Run `npm run start:reload` to spin up the API

### Frontend

1. From the `src/app` directory run `npm install`
2. Create a `.env` file with the following environment variables:

```bash
REACT_APP_PORT=<backend_base_url>
REACT_APP_PLACES_API_KEY=<api_key_google>
```

3. Run `npm start` to serve the React web app

### Testing

1. From the `src/api/src` directory run `npm test`

This will run the Jest test suite to enforce that our API endpoints are working correctly and serving up the correct data

### Postman Collection

In order to make requests to our API easily, we have added a Postman collection. Just import it into postman and make requests to our endpoints easily!

## Planning, Scope & Architecture

Prior to development, we planned out the basic application scope, architecture and design. The designs can be found [here.](./documentation)

## Deployment

Our application server and our react web server were both containerized using Docker. We established a Continuous Deployment strategy using Google Cloud builds with cloud build triggers deploying to separate Compute Engine VM Instances. The web server is served using Nginx and communicates with the application server using a reverse proxy.

For more reference, [refer to this article.](https://mickeyabhi1999.medium.com/using-nginx-reverse-proxy-to-set-cross-site-cookies-for-your-web-app-7c9e5e502091)
