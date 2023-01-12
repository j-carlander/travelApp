$(".traffic-table thead").append(`
    <tr>
        <th>Train/Bus</th>
        <th>From</th>
        <th>Departure</th>
        <th>To</th>
        <th>Arrives</th>
    </tr>
`);

function renderTrainTable(data) {
  data.forEach((trainObject) => {
    $(".traffic-table tbody").append(`
    <tr>
        <td>${trainObject.name}</td>
        <td>${trainObject.origin}</td>
        <td>${trainObject.departTime}</td>
        <td>${trainObject.dest}</td>
        <td>${trainObject.arrTime}</td>
    </tr>
    `);
  });
}

$(".city-input-field").on("keydown", (event) => {
  if (event.key == "Enter") {
    if ($("#originField")[0].value == "") return $("#originField").focus();
    if ($("#destinationField")[0].value == "")
      return $("#destinationField").focus();
    searchTrain(
      $("#originField")[0].value,
      $("#destinationField")[0].value,
      renderTrainTable
    );
  }
});
