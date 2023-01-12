const cityIdLookUpURL = (cityName) => {
  return `https://api.resrobot.se/v2.1/location.name?input=${cityName}?&format=json&accessId=${apiKey}`;
};

const trainLookUpURL = (originId, destinationId) => {
  return ` https://api.resrobot.se/v2.1/trip?format=json&originId=${originId}&destId=${destinationId}&passlist=true&showPassingPoints=true&accessId=${apiKey}`;
};

function findTrain(travel, callback) {
  $.get(trainLookUpURL(travel.originId, travel.destinationId), callback);
}

function findCityIds(origin, destination, callback) {
  $.when(
    $.get(cityIdLookUpURL(origin)),
    $.get(cityIdLookUpURL(destination))
  ).then(callback);
}

function searchTrain(origin, destination, callback) {
  findCityIds(origin, destination, (originData, destinationData) => {
    let travel = {
      originId: originData[0].stopLocationOrCoordLocation[0].StopLocation.extId,
      destinationId:
        destinationData[0].stopLocationOrCoordLocation[0].StopLocation.extId,
    };

    findTrain(travel, (data) => {
      let trainData = [];
      data.Trip.forEach((train) => {
        let trainObject = {};
        trainObject.origin = train.Origin.name;
        trainObject.departTime = train.Origin.time;
        trainObject.dest = train.Destination.name;
        trainObject.arrTime = train.Destination.time;
        trainObject.name = train.LegList.Leg[0].Product[0].name;

        trainData.push(trainObject);
      });
      console.log(trainData);

      callback(trainData);
    });
  });
}
