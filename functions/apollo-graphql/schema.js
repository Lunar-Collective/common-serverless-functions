const { gql } = require('apollo-server-lambda')

module.exports = gql`
  type Query {
    hello: String
    allLocations: [Location!]
    allPlaces: [Place]
    allRegions: [Region]
    allImageTags: [ImageTag]
    allImages: [Image]
    allPlaceTags: [PlaceTag]
    imagesByTag(tag: String!): [Image]
    feed(location: String!): [FeedItem]
    images(sort: String, limit: Int): [Image]
    places(city: String, region_shortname: String, postal_code: String, limit: Int): [Place]
    placesByLatLong(lat: Float!, long: Float!, meters: Int!): [Place]
    placesByTagAndLatLong(lat: Float!, long: Float!, meters: Int!, tag: String!): [Place]
    image: Image!
  }
  type Mutation {
    onPaymentIntentReceived(amountInCents: Int!): String
  }

  type Region {
    name: String
    abbreviation: String
    locations: [Location]
    placeCount: Int
    slug: String
  }

  type Location {
    _key: ID!
    city_shortname: String!
    city_longname: String!
    region_shortname: String!
    region_longname: String!
    country_shortname: String!
    country_longname: String!
    postal_codes: [String!]
    latlong: [Float]
    slug: String!
    placeCount: Int
    places(limit: Int): [Place]
  }

  type Place {
    _key: ID
    address: String
    dateAdded: String!
    name: String!
    description: String
    city: String
    region: String
    tags: [Tag]
    facebook: String
    url: String
    distance: Float
    latlong: [Float]
  }

  type Image {
    _key: ID!
    description: String
    file: String!
    tags: [Tag]
    score: Int
    dateAdded: String
  }

  type PlaceTag {
    _key: ID!
    name: String!
    slug: String
    places: [Place]
  }

  type Tag {
    _key: ID!
    name: String!
    slug: String
  }

  type ImageTag {
    _key: String!
    name: String!
    file: String!
    images: [Image]
    slug: String
  }

  type FeedItem {
    _key: ID!
    contentType: String
    page: String
    title: String
    location: String
    link: String
    linkText: String
    file: String
  }

`