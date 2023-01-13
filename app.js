let renderTrainTable; // declaring, will have a function asigned in the if(mobile)else(desktop)

if (window.matchMedia("(max-width: 600px)").matches) {
  // The viewport is less than 440 pixels wide
  console.log("This is a mobile device.");

  renderTrainTable = function (data) {
    data.forEach((trainObject) => {
      let element = $(`
      <details class="main-details">
        <summary>
          <div class="summary-title">
            <h3>${trainObject.departTime} &#10140; ${trainObject.arrTime}</h3>
            <p>${trainObject.name}</p>
          </div>
          <div class="summary-chevron-up">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </summary>
        <div class="summary-content">
          <p>${trainObject.origin} &#10140; ${trainObject.dest}</p>
          <details class="sub-details">
            <summary>
              <span class="summary-title">Information och Service ombord</span>
              <div class="summary-chevron-up">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </summary>
            <ul class="content-list"></ul>
            <div class="summary-chevron-down">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </div>
          </details>
        </div>
        <div class="summary-chevron-down">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </div>
    </details>
    `);
      // push all notes in to the content-list
      trainObject.notes.Note.forEach((note) => {
        element.find(".content-list").append(`<li>${note.value}</li>`);
      });

      $("main").append(element);
    });
  };
} else {
  // ending if(mobile) starting else (desktop version)
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

$(".search-fields").on("submit", (event) => {
  // if (event.key == "Enter") {
  if ($("#originField")[0].value == "") return $("#originField").focus();
  if ($("#destinationField")[0].value == "")
    return $("#destinationField").focus();
  searchTrain(
    $("#originField")[0].value, // Origin cityname
    $("#destinationField")[0].value, // Destination cityname
    renderTrainTable //callback
  );
  console.log("searched");
  // }
  event.preventDefault();
});
