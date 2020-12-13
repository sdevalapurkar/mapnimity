# Documentation

## Inspiration

Living in a large cities and having friends living in different areas of the city made it tough to find an optimal location to grab a bite or hangout. Although using Google Maps as is to find restaurants was a possibility, it was difficult to optimize for everyone's preferences and locations. That is where the need for an application like Mapnimity arose, as we needed an app to find the optimal location to grab a bite within a specific proximity - and now we can't wait to use Mapnimity to meet up at the best location once COVID is over!

## What it does

Mapnimity allows the user to find restaurants in the closest proximity to their friends. You can add many locations and Mapnimity shows you all the closest restaurants around a certain radius along the midpoint of those locations. The locations are highlighted using a pin on the map and their details are presented as a concise tooltip textbox to learn more about the restaurant hovered over.

<img width="1232" alt="xauceeee" src="https://user-images.githubusercontent.com/28017034/102005158-9887db00-3ccb-11eb-98ea-7d534fc483be.png">

## How we built it

### Architecture

Our app has an isolated architecture consisting of a React frontend web-server served with Nginx that makes requests via reverse-proxy to our backend Express application server. We consumed data from the Google Places and Geocode APIs to process address coordinates and render auto-complete dropdown options and render locations on the map container. Our frontend employed material-ui, react-leaflet as well as latest react standards such as hooks and memos. 

### Workflow

We used the Github workflow for this project. GitHub flow is a lightweight, branch-based workflow that supports teams and projects where deployments are made regularly. Branching is a core concept in Git, and the entire GitHub flow is based upon it. There's only one rule: anything in the main branch is always deployable. Because of this, it's extremely important that your new branch is created off of main when working on a feature or a fix. Feature branches were made off main and merged back into main after peer review using pull requests.

### Deployment

To support incoming feature deployments through the weekend, we established a continuous deployment procedure via Google Cloud Build's (GCP) Build Triggers. The triggers detect code pushes to the main branch of our GitHub repository and based on the steps specified within a yaml file, separately containerize the web and application servers. Then these images are pushed to the GCP Container Registry and finally redeployed to two separate Compute Engine VM Instances communicating via the nginx reverse-proxy. 

### Testing

We added testing for our backend endpoints using Jest. We made calls to the backend server and received the responses from it. Mocks are used and the returned responses from the server are compared to them using assertions.

## Challenges we ran into
- Janhavi - After working on some intense school projects for the last few weeks, it was definitely a challenge to keep the productivity up, but the learning outcome kept me going.

- Jigyasa - Being the first Hackathon I participated in, it was a challenge learning and implementing a lot of new things at once. Being an analytical person, it was a challenge to decide on things so quickly and start implementing before going deep into the reasons. 

- Shreyas - There were many issues with getting react-leaflet to work properly due to component state and events not being handled properly. Also, although it doesn't seem like it on first glance, there is a lot of data travelling within the various parts of our application and managing it and ensuring all the data is correct and handling edge cases was a challenge.

- Abhishek - I faced some issues in trying to hide away sensitive information from our public repo whilst enabling our continuous deployment process which required that info. Ultimately achieved a way through environment variables in the Build Triggers. 

## Accomplishments that we're proud of

We are all very proud of our teamwork and ability to bring our skillsets together to create something we really feel like we need and many others need as well. Despite having some team members remote, we were able to align, assign, and accomplish.

We are also very proud of the fact that we not only developed an app, but were also able to deploy it successfully in the given timeframe; enabling users to actually use it and benefit from our solution.

## What we learned

- Jigyasa (Backend Dev) - I was introduced to a full web development environment for the first time. Testing using Jest was something new and exciting as well. Learning about nearby search on google maps platform was another learning achievement as I had previously not exposed myself to the google developers.

- Rajath (Testing and Backend Dev) - Learned about Google Places and Geocode APIs and about backend server- nodejs and express along with Jest package for testing using mock objects.

- Janhavi (Design and Full Stack Development) - Learnt about the front-end and back-end integration and react front end

- Abhishek (DevOps) - I learned about the amazing effects of material-ui as well as about development with react hooks and memos. 

- Shreyas (Full Stack Dev and Architecture) - Learnt how to create map containers using react-leaflet, interacting with and consuming the Google Places and Geocode APIs

## What's next for Mapnimity

The subsequent versions of the app would allow the user to find more than just restaurants. The user would be able to search for rec centres, bowling alleys, movie theatres, night clubs, etc. Additional features include sorting and filtering by ratings, price levels, popularity, opening and closing times, and more. Going forward, we would like to take a more test driven development approach for the backend and component driven development with storybook for the frontend. To support continuous integration of features, our cloud deployment pipeline would be expanded to include Build Triggers on each PR that are specifically meant to build and run tests through Dockerfile.dev containers. 
