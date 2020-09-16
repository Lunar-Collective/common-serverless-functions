const hello = require('./queries/hello');
const allImageTags = require('./queries/allImageTags');
const feed = require('./queries/feed');
const images = require('./queries/images');
const image = require('./queries/image');
const allLocations = require('./queries/allLocations');
const placesByLatLong = require('./queries/placesByLatLong');
const allRegions = require('./queries/allRegions');
const allPlaceTags = require('./queries/allPlaceTags');
const allPlaces = require('./queries/allPlaces');
const placesByTagAndLatLong = require('./queries/placesByTagAndLatLong');
const allImages = require('./queries/allImages');

module.exports = {
    hello,
    allImageTags,
    feed,
    images,
    image,
    allLocations,
    placesByLatLong,
    placesByTagAndLatLong,
    allRegions,
    allPlaceTags,
    allPlaces,
    allImages
}