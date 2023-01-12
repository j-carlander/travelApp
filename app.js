let renderTrainTable;

if (window.matchMedia("(max-width: 600px)").matches) {
  // The viewport is less than 440 pixels wide
  console.log("This is a mobile device.");
} else {
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

  // renders the input data to an HTML element
  renderTrainTable = function (data) {
    data.forEach((trainObject) => {
      let element = $(`
    <tr>
        <td>${trainObject.name}</td>
        <td>${trainObject.origin}</td>
        <td>${trainObject.departTime}</td>
        <td>${trainObject.dest}</td>
        <td>${trainObject.arrTime}</td>
        <td>
          <div class="dropdown">
            <p>&#8505;</p>
            <div class="dropdown-content">
              <strong>Information och Service ombord</strong>
              <ul class="content-list"></ul>
            </div>
          </div>
        </td>
    </tr>
    `);
      // push all notes in to the content-list
      trainObject.notes.Note.forEach((note) => {
        element.find(".content-list").append(`<li>${note.value}</li>`);
      });

      $("main tbody").append(element);
    });
  };
} //end mobile-else

$(".city-input-field").on("keydown", (event) => {
  if (event.key == "Enter") {
    if ($("#originField")[0].value == "") return $("#originField").focus();
    if ($("#destinationField")[0].value == "")
      return $("#destinationField").focus();
    searchTrain(
      $("#originField")[0].value, // Origin cityname
      $("#destinationField")[0].value, // Destination cityname
      renderTrainTable //callback
    );
    console.log("searched");
  }
});
