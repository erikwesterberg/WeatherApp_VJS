

window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezon = document.querySelector(".location-timezon");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/4de3d15b9c5d7a289ea5245786a8c1ba/${lat},${long}`;
            
    fetch(api)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error);
          })

        .then(data => {
            console.log(data);
            const { temperature, summary } = data.currently;
            //set DOM Elements from the API
            temperatureDegree.textContent = temperature;
        })
     });
    }
});