window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degrees");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span")
  
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `${proxy}https://api.darksky.net/forecast/408d470ddfe68cb2a46839ba47791580/${lat},${long}`;
       
        console.log(api)
      
        fetch(api)
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          })
          .then(data => {
            console.log(data);
            const { temperature, summary, icon } = data.currently;
            // Set DOM Elements from API
            
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            // Formula to conver farenheit to celsius
            let celsius = (temperature - 32) * (5 / 9);
            temperatureDegree.textContent = `${Math.floor(celsius)}°`;
            temperatureSpan.textContent = "C";
            // Set Icon
            setIcons(icon, document.querySelector(".icon"));
  
            // Change temperature between celsius/farenheit
            temperatureDegree.addEventListener("click", () =>{
              if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = `${Math.floor(celsius)}°`;
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = `${Math.floor(temperature)}°`;
              }
            });
          });
      });
    } else {
      h1.textContent = "Please enable your location to view the weather!"
    }
  
    function setIcons(icon, iconID){
      const skycons = new Skycons({ color: "white" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
  
  });