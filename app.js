const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const googleApiKey = 'AIzaSyCFjM8-3mMQB-z8ZjmhOiQEsJdbBoTcBwg';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1', router);

router.get('/listplaces', (req, res) => {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    + '?location=' + req.query.location
    + '&radius=' + req.query.radius
    + '&type=' + req.query.type
    + '&keyword=' + req.query.keyword
    + '&key=' + googleApiKey;
  axios.get(url)
    .then(places => {
      let placesData = {};
      places.data.next_page_token ?
      placesData = {results: places.data.results, nextPageToken: places.data.next_page_token} :
      placesData = {results: places.data.results};
      res.send(placesData);
      console.log('GET, /listplaces');
    });
});

router.get('/nextpage', (req, res) => {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    + '?pagetoken=' + req.query.nextPageToken
    + '&key=' + googleApiKey;

  axios.get(url)
    .then(places => {
      let placesData = {};
      places.data.next_page_token ?
      placesData = {results: places.data.results, nextPageToken: places.data.next_page_token} :
      placesData = {results: places.data.results};
      res.send(placesData);
      console.log('GET, /nextplaces');
    });
});

router.get('/getphoto', (req, res) => {
  const url = 'https://maps.googleapis.com/maps/api/place/photo'
    + '?maxwidth=' + req.query.maxwidth
    + '&photoreference=' + req.query.reference
    + '&key=' + googleApiKey;

  axios.get(url)
    .then(photo => {
      res.send(photo.request.res.responseUrl);
      console.log('GET, /getphoto');
    });
});

router.get('/placedetails/:id', (req, res) => {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json'
    + '?placeid=' + req.params.id
    + '&key=' + googleApiKey;

  axios.get(url)
    .then(place => {
      res.send(place.data.result);
      console.log('GET, /placedetails/');
    });
});

app.listen(3001, () => console.log("Server running at 3001"));