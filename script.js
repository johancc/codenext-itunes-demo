let searchTerm = "";
let trackOutput = document.querySelector("#track-output");
async function getData() {
  console.log("Getting Data for...")
  searchTerm = document.querySelector("#input-search").value;
  searchTermFormatted = searchTerm.replaceAll(" ", "+");
  console.log(searchTermFormatted);
  let response = await fetch(`https://itunes.apple.com/search?term=${searchTermFormatted}&media=music`, {
    method: "GET", mode: "no-cors",
  });
  console.log(response);
  console.log(response.status);
  let data = await response.json();
  console.log("Received: " + data);
  displayData(data);
}

function displayData(data) {
  //empty the container first
  trackOutput.innerHTML = "";
  //loop through the data, top level is object:
  let results = data['results'];
  for (let result of results) {
    console.log(result["artistName"] + " vs " + searchTerm);
    artist = result["artistName"].toLowerCase();
    if (artist.includes(searchTerm.toLowerCase())) {
      appendTrackData(result);
    }
  }
}


function appendTrackData(apiResponse) {
  let artist = apiResponse.artistName;
  let imgSrc = apiResponse.artworkUrl100;
  let track = apiResponse.trackCensoredName;

  let newTrack = `<p class"track-data">
                      <img  class="" src="${imgSrc}"/>
                      <span class="artist"> ${artist}: </span>
                      <span class="track"> ${track}</span>
                      </p>`
  trackOutput = document.querySelector("#track-output");
  trackOutput.insertAdjacentHTML("beforeend", newTrack);
}