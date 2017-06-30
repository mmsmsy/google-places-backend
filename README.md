## Google Places Backend Application
### Frontend application can be found here https://github.com/mmsmsy/google-places-frontend

### App developed on Windows using Unix CLI emulator (usually work done on Ubuntu)
### To create a local copy
##### Copy the repository except for node_modules folder
##### yarn install
##### nodemon app.js
#### The development server will start on localhost:3001

### Description
The application uses Google Places API Web Services (https://developers.google.com/places/web-service/) to fetch data about nearby places based on their 'prominence' as specified by the documentation.

#### Main features
- specifies routes in the backend API for the Frontend Application, since the key requires cors() to be used. Also, this way we can hide our Google API keys from being displayed publicly.

#### Technologies used
node.js, yarn, axios, express, express-router, ES6

#### Difficulties encountered
- processing responses from some requests made to Google API, f.e. Photo reference, where google responses with an actual photo. To resolve that and send only a link to the picture I digged a little deeper to retrieve the link, similiar in other cases where I wanted to send specific data to the frontend,
