const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-clouds",
  "Clear": "wi wi-day-sunny",
  "Snow": "wi wi-day snow",
  "mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet",
}

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1)
}

async function main (){

  const meteo = await fetch ('http://api.openweathermap.org/data/2.5/weather?q=tokyo,jp&units=metric&appid=0b643153a5366e46519ffca794fe3948')
  .then(resultat => resultat.json())
  .then(json => json)


  console.log(meteo);

  displayWeatherInfos(meteo)

}

function displayWeatherInfos(data){
  const name = data.name;
  const temperature = data.main.temp;
  const conditions = data.weather[0].main;
  //const conditions = "clear";
  const description = data.weather[0].description;

  const icon = data.weather[0].icon;
  var jour = icon.substr(icon.length - 1);

  console.log("INCON DATA :");
  console.log(jour);


  //document.querySelector('#ville').textContent = name;
  document.querySelector('#temperature').textContent = Math.round(temperature) + ' C°';
  //document.querySelector('#conditions').textContent = capitalize(description);
  //document.querySelector('i.wi').className = weatherIcons[conditions];



  //document.body.className = conditions.toLowerCase();
  console.log(description.toLowerCase().split(" ").join("-"));

  if(description == "broken clouds" && jour == "d") {
    document.querySelector('#myVideo').src = "./medias/cloudy_day.mp4";
  }
  else if(description == "broken clouds" && jour == "n" ) {
    document.querySelector('#myVideo').src = "./medias/clear_night.mp4";
  }
  else if(description == "clear sky" && jour == "n" ) {
    document.querySelector('#myVideo').src = "./medias/clear_night.mp4";
  }
  else if(description == "clear sky" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/scattered_clouds_day.mp4";
  }
  else if(description == "few clouds" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/scattered_clouds_day.mp4";
  }
  else if(description == "scattered clouds" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/scattered_clouds_day.mp4";
  }
  else if(description == "broken clouds" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/scattered_clouds_day.mp4";
  }
  else if(description == "overcast clouds" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/overcast_clouds_day.mp4";
  }
  else if(description == "mist" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/mist_day.mp4";
  }
  else if(description == "light snow" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/light_snow_day.mp4";
  }
  else if(description == "light snow" && jour == "n" ) {
    document.querySelector('#myVideo').src = "./medias/heavy_snow_night.mp4";
  }
  else if(description == "heavy snow" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/light_snow_day.mp4";
  }
  else if(description == "heavy snow" && jour == "n" ) {
    document.querySelector('#myVideo').src = "./medias/heavy_snow_night.mp4";
  }
  else if(description == "snow" && jour == "d" ) {
    document.querySelector('#myVideo').src = "./medias/light_snow_day.mp4";
  }
  else if(description == "snow" && jour == "n" ) {
    document.querySelector('#myVideo').src = "./medias/heavy_snow_night.mp4";
  }



  //document.querySelector('#myVideo').src = "./medias/vid-"+ description.toLowerCase().split(" ").join("-") +".mp4";



  function updateClock() {
    var now = new Date(), // current date
    months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    ajustement = now.getMonth() > 2 && now.getMonth() < 10 ? 8 : 9;
    time = ('0' + (now.getUTCHours() + ajustement)).slice(-2) + ':' + ('0' + now.getUTCMinutes()).slice(-2) + ':' + ('0' + now.getUTCSeconds()).slice(-2),
    // a cleaner way than string concatenation
    date = [now.getFullYear(),
      months[now.getMonth()],
      now.getDate(),
    ].join('/');

    // set the content of the element with the ID time to the formatted string
    document.querySelector('#date').textContent = [date, time].join(' - ');

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);


  }
  updateClock(); // initial call


  if(jour == "n"){
    document.body.className = "nuit";
  }


  var la1 = 0;
  var ln1 = 0;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    // console.log("Latitude: " + position.coords.latitude);
    // console.log("Longitude: " + position.coords.longitude);

    document.querySelector('#la').value =  position.coords.latitude;
    document.querySelector('#ln').value =  position.coords.longitude;

    document.getElementById('distance').textContent = getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,la2,ln2);


  }

  getLocation();


  //test distance

  // Les coordonnées 1 et 2
  // 1 Paris près place Vendôme -> mais on veut la localisation de l'ordi en vrai ! (->API?)
  // 2 tokyo, chez mes grands parents
  /*
  var la1 = 50.830245;
  var ln1 = 4.352489;
  */

  //var la1 = document.querySelector('#la').value;
  //var ln1 = document.querySelector('#ln').value;

  var la2 = 35.719462;
  var ln2 = 139.789341;




  // Fonction 1 - La Terre est ronde (si j'te jure)
  function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lng2-lng1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }


  // Fonction 2 - La Terre est plate - Ou presque
  function getDistanceWithPythagore(lat1,lng1,lat2,lng2) {
    /*
    Calcul de la distance en km entre les latitudes
    sachant que : 1° ~ 111,11km sur l'équateur
    */
    var dLat= (lat2-lat1) * 111.11;

    /* Calcul de la distance en km entre les longitudes
    1 Mode Terre ultra plate
    2 Ou plutôt Mode Terre plate pondéré par la latitude entre les 2 points
    */

    // 1 Mode Terre ultra plate
    // var dLon = (lng2-lng1)*111.11;

    // Ou plutôt Mode Terre plate pondéré par la latitude
    var dLon = (lng2-lng1)*( 111.11 * Math.cos((lat2-lat1)/2) );

    return Math.sqrt( Math.pow(dLat,2) + Math.pow(dLon,2) );

  }


  function deg2rad(deg) {
    return (deg * Math.PI)/180
  }





}



main();
