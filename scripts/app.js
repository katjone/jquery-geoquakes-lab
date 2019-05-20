// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


// earthquake picture icon
const icon = {
  url: ('./images/earthquake.png'),
  scaledSize: new google.maps.Size(50,50),
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0)
} ;





$(document).ready(function() {
  console.log("Let's get coding!");

  // data object containing earthquake info
  const weekEarthquakes = {
    method: 'GET',
    url: weekly_quakes_endpoint,
    success: handleSuccess,
    error: handleError,
  };

  $.ajax(weekEarthquakes);

  function handleSuccess(json) {
    //========== Create map

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 1
    });
    const locSF = {lat: 37.78, lng: -122.44};

    // Drop pin on San Francisco
    var marker = new google.maps.Marker({position: locSF, map: map});

    // json is the object containing all the data. It is structured as an array.
    // Using a for loop to iterate through each element in array, picking out
    // its title and adding it to the html file

    for (let i = 0; i < 10; i++) {
      $('#info').append(`<p>${json.features[i].properties.title}</p>`);      
      console.log(json.features[i].geometry.coordinates);
      // const longitude = json.features[i].geometry.coordinates[0];
      // const latitude = json.features[i].geometry.coordinates[1];
      // const locEq = {lat:latitude, lng: longitude};
      const locEq = {lng: json.features[i].geometry.coordinates[0], lat: json.features[i].geometry.coordinates[1]};
      const eqPin = new google.maps.Marker({position: locEq, map: map, icon: icon});
      console.log(locEq);
    };
  };
  function handleError(error) {
    console.log(error);
  };

  
});
