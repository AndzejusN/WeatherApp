const MeteoApi = require('../services/MeteoApi');

const express = require('express');
const router = express.Router();

router.get('/places/find/:name', function(req, res, next) {
	MeteoApi.getPlaces().then(places => {
		places = places.filter(p => p.name.toLowerCase().startsWith(req.params.name.toLowerCase()));

		places = places.slice(0, 10);

		res.json(places);
	});
});

module.exports = router;
