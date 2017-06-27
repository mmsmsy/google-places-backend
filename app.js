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
  let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key='
    + googleApiKey;
  axios.get(url)
    .then(places => res.send(places.data.results))
    .then(console.log('GET, /listplaces'));
});

router.get('/getphoto/:reference', (req, res) => {
  let url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
    + req.params.reference
    + '&key='
    + googleApiKey;

  axios.get(url)
    .then(photo => res.send(photo.request.res.responseUrl))
    .then(photo => console.log(`GET, /getphoto/${req.params.reference}`));
});

app.listen(3001, () => console.log("Server running at 3001"));