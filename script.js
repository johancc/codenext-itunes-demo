let searchTerm = "";
let trackOutput = document.querySelector("#track-output");
async function getData() {
  console.log("Getting Data for...")
  searchTerm = document.querySelector("#input-search").value;
  searchTermFormatted = searchTerm.replaceAll(" ", "+");
  console.log(searchTermFormatted);
  let response = await fetch(`http://itunes.apple.com/search?term=${searchTermFormatted}&media=music&entity=musicTrack&country=US`);
  let data = await response.json();
  displayData(data);
}

function displayData(data) {
  //empty the container first
  trackOutput.innerHTML = "";
  //loop through the data, top level is object:
  let results = data['results'];
  for (let result of results) {
    appendTrackData(result);
  }
}


function appendTrackData(apiResponse) {
  let artist = apiResponse.artistName;
  let imgSrc = apiResponse.artworkUrl100;
  let track = apiResponse.trackCensoredName;

  let newTrack = `<p class="track-data">
                      <img src="${imgSrc}"/>
                      <span class="artist"> ${artist}: </span>
                      <span class="track"> ${track}</span>
                  </p>`
  trackOutput = document.querySelector("#track-output");
  trackOutput.insertAdjacentHTML("beforeend", newTrack);
}