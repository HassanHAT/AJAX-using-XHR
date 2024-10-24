let btnXHR = document.getElementById('btn');
let searchText = document.getElementById('city');
let searchResults = document.querySelector('.weatherResult');

btnXHR.addEventListener("click", function() {
  searchResults.innerHTML = "";
  weatherAPI_UsingXHR(searchText.value);
});


function weatherAPI_UsingXHR(keyword) {
  if (!keyword) {
    return;
  }
  var url = "https://api.weatherapi.com/v1/forecast.json";
  const apiKey = "6b9c4fe34e6941aba81175919242010";
  var params = "key=" + apiKey + "&q=" + encodeURIComponent(keyword);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      processResponse(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", url + "?" + params);
  xhr.send();
}

function processResponse(resp) {
    searchResults.innerHTML = '';

    const high = document.createElement('p');
    high.textContent = 'High: ' + resp.forecast.forecastday[0].day.maxtemp_c + '°C';
    
    searchResults.appendChild(high);


    const low = document.createElement('p');
    low.textContent = 'Low: ' + resp.forecast.forecastday[0].day.mintemp_c + '°C';

    searchResults.appendChild(low);


    const wind = document.createElement('p');
    wind.textContent = 'Wind Speed: ' + resp.current.wind_kph + 'kph';

    searchResults.appendChild(wind);
  
}