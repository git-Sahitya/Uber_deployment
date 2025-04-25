const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GO_MAPS_API;
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: location.lat,
        lon: location.lon,
      };
    } else {
      throw new Error("No results found for the given address");
    }
  } catch (error) {
    console.error("Error in getAddressCoordinate:", error.message);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GO_MAPS_API;

  try {
    const originCoords = await module.exports.getAddressCoordinate(origin);
    const destinationCoords =
      await module.exports.getAddressCoordinate(destination);

    if (
      !originCoords.lat ||
      !originCoords.lon ||
      !destinationCoords.lat ||
      !destinationCoords.lon
    ) {
      throw new Error("Invalid coordinates for origin or destination");
    }

    const url = `https://us1.locationiq.com/v1/directions/driving/${originCoords.lon},${originCoords.lat};${destinationCoords.lon},${destinationCoords.lat}?key=${apiKey}&overview=full&steps=true`;

    const response = await axios.get(url);

    if (
      response.data &&
      response.data.routes &&
      response.data.routes.length > 0
    ) {
      const route = response.data.routes[0];
      return {
        distance: route.distance,
        duration: route.duration,
      };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    throw new Error(`Error in getDistanceTime: ${err.message}`);
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input query is required");
  }

  const apiKey = process.env.GO_MAPS_API;
  const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(input)}&format=json`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      return response.data.map((suggestion) => ({
        description: suggestion.display_name,
        term: suggestion.display_name.split(",")[0],
      }));
    } else {
      throw new Error("No autocomplete suggestions found");
    }
  } catch (err) {
    console.error("Error in getAutoCompleteSuggestions:", err.message);
    throw err;
  }
};

  module.exports.getCaptainsInTheRadius = async (lat, lon, radius) => {
    console.log("Lat:", lat, "Lon:", lon, "Radius:", radius);
 
    try {
      const captains = await captainModel.find({
        location: {
          $geoWithin: {
            $centerSphere: [[lon, lat], radius / 6371],
          },
        },
      });

      return captains;
    } catch (error) {
      console.error("Error in getCaptainsInTheRadius:", error.message);
      throw error;
    }
  };
