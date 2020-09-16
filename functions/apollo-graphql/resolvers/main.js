const Query = require('./queries');
const Mutation = require('./mutations');
const imagesByTag = require('./queries/imagesByTag');
const locationsByRegion = require('./queries/locationsByRegion');
const placeCountByRegion = require('./queries/placeCountByRegion');
const placeCountByLatLong = require('./queries/placeCountByLatLong');
const placesByLatLong = require('./queries/placesByLatLong');

module.exports = {
    Query,
    Mutation,
    Region: {
        locations: locationsByRegion,
        placeCount: placeCountByRegion
    },
    ImageTag: {
        images: imagesByTag
    },
    Location: {
        places: placesByLatLong,
        placeCount: placeCountByLatLong
    }
};