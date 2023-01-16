let renderTrainTable; // declaring variable, will have a function assigned in the if(mobile)else(desktop)

// checking if the device is a mobile or desktop
if (window.matchMedia("(max-width: 600px)").matches) {
  // The viewport is less than 600 pixels wide
  console.log("This is a mobile device.");

  renderTrainTable = function (data) {
    data.forEach((trainObject) => {
      let element = $(trainObject.render());

      $("main").append(element);
    });
  };
} else {
  // ending if(mobile) starting else (desktop version)

  // renders the input data to an HTML element
  renderTrainTable = function (data) {
    $("main").html(`
      <table class="traffic-table table table-striped mt-3">
        <thead class="table-light">
          <tr>
              <th>Tåg/buss</th>
              <th>Från</th>
              <th>Avgång</th>
              <th>Till</th>
              <th>Ankommer</th>
              <th>Info</th>
          </tr>
          </thead>
        <tbody></tbody>
    </table>
  `);
    data.forEach((trainObject) => {
      let element = $(trainObject.renderTable());

      $("main tbody").append(element);
    });
  };
} //end mobile-else

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
