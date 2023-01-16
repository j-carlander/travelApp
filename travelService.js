const cityIdLookUpURL = (cityName) => {
  return `https://api.resrobot.se/v2.1/location.name?input=${cityName}?&format=json&accessId=${apiKey}`;
};

const trainLookUpURL = (originId, destinationId) => {
  return ` https://api.resrobot.se/v2.1/trip?format=json&originId=${originId}&destId=${destinationId}&passlist=true&showPassingPoints=true&accessId=${apiKey}`;
};

// Takes an object with 2 key:values as first parameter
function findTrain(travel, callback) {
  $.get(trainLookUpURL(travel.originId, travel.destinationId), callback);
}

// Takes 2 strings with citynames as first and second parameters
function findCityIds(origin, destination, callback) {
  $.when(
    // makes two ajax calls, one for each city
    $.get(cityIdLookUpURL(origin)),
    $.get(cityIdLookUpURL(destination))
  ).then(callback); //returns the result data
}

// Takes 2 strings with citynames as first and second parameters
function searchTrain(origin, destination, callback) {
  //uses those parameters to fint the IDs of those cities
  findCityIds(origin, destination, (originData, destinationData) => {
    let travel = {
      // store the returned IDs in the travel object
      originId: originData[0].stopLocationOrCoordLocation[0].StopLocation.extId,
      destinationId:
        destinationData[0].stopLocationOrCoordLocation[0].StopLocation.extId,
    };
    // Use the IDs to find trains
    findTrain(travel, (data) => {
      // and handle the result
      let trainData = [];
      data.Trip.forEach((train) => {
        let trainObject = new RouteObject(
          train.Origin.name,
          train.Origin.time,
          train.Destination.name,
          train.Destination.time,
          train.LegList,
          train.duration
        );
        trainData.push(trainObject);
      });

      callback(trainData); // return the result
    });
  });
}
