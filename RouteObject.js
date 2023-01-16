class RouteObject {
  constructor(origin, departTime, dest, arrTime, legList, totalDuration) {
    this.origin = origin;
    this.departTime = departTime.slice(0, -3);
    this.dest = dest;
    this.arrTime = arrTime.slice(0, -3);
    this.legList = legList;
    this.totalDuration = totalDuration;
  }

  render() {
    let el = $(`
    <details class="main-details">
      <summary>
        <div class="summary-title">
          <h3>${this.departTime} &#10140; ${this.arrTime} 
          <span style="float:right; margin-right: 25px;font-size:smaller;font-weight:lighter;">${this._reformatDuration(
            this.totalDuration
          )}</span>
          </h3>
          <p>${this.origin} &#10140; ${this.dest}</p>
          <p class="leg-list" ></p>
        </div>
        <div class="summary-chevron-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </summary>
      <div class="summary-content">


      </div>
      <div class="summary-chevron-down">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </div>
  </details>
  `);
    this._renderLegList(el);
    return el;
  }

  _renderNotes(el, leg) {
    // let el = [];
    leg.Notes
      ? leg.Notes.Note.forEach((note) => {
          //   : { Note: [{ value: "no services listed" }] };
          el.find(".content-list").append(`<li>${note.value}</li>`);
        })
      : el.find(".leg-list-info").hide();
    // return el;
  }

  _renderLegList(el) {
    // let legs = el.find(".leg-list");
    this.legList.Leg.forEach((leg) => {
      el.find(".leg-list").append(`
      <span class="leg-name">${this._handleLegName(leg.name)}</span>`);
      let legElement = $(` 
      <div>
      <p class="leg-origin">
        <span class="origin-depart">${leg.Origin.time.slice(0, -3)}</span> 
        <span class="origin-name">${leg.Origin.name}</span> 
        
      </p>
      <span class="duration">${this._reformatDuration(leg.duration)}</span>
      <p class="inline"><span class="arrow">&#8675;</span> ${this._handleLegName(
        leg.name
      )} </p>
      
      <div class="leg-list-info dropdown inline">
        <p>&#8505;</p>
        <div class="dropdown-content">
          <strong>Information och Service ombord</strong>
          <ul class="content-list"></ul>
        </div>
      </div>

      <p class="leg-destination">
        <span class="destination-arrival">${leg.Destination.time.slice(
          0,
          -3
        )}</span
        > <span class="destination-name">${leg.Destination.name}</span>
      </p>
    </div>
    `);
      this._renderNotes(legElement, leg);
      el.find(".summary-content").append(legElement);
    });
    // this.renderNotes(el);
  }

  _handleLegName(legName) {
    if (legName == "Byten") {
      legName = "&#128694;";
    }
    if (legName.includes("Länstrafik -")) {
      legName = legName.replace("Länstrafik -", "");
    }
    return legName;
  }

  _reformatDuration(duration) {
    duration = duration.replace(/PT(\d+)H(\d+)M/, "$1:$2 tim");
    duration = duration.replace(/PT(\d+)M/, "$1 min");
    // let indexOfT = duration.indexOf("T");
    // console.log("index of T: " + indexOfT);
    // duration = duration.slice(indexOfT + 1);
    // let indexOfH = duration.indexOf("H");
    // let hours = indexOfH ? duration.slice(0, indexOfH) : 0;
    console.log(duration);
    return duration;
  }
}
