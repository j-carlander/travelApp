function renderTrainTable(data) {
  data.forEach((trainObject) => {
    let element = $(trainObject.render());

    $("main").append(element);
  });
}

// eventhandler for searching

$(".search-fields").on("submit", (event) => {
  if ($("#originField")[0].value == "") return $("#originField").focus();
  if ($("#destinationField")[0].value == "")
    return $("#destinationField").focus();
  // If both fields contains info then search
  $("main").html("");
  searchTrain(
    $("#originField")[0].value, // Origin cityname
    $("#destinationField")[0].value, // Destination cityname
    renderTrainTable //callback
  );

  console.log("searched");

  event.preventDefault();
});
