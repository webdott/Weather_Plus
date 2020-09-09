// const getDateFromTimeStamp = (timeStamp, day, month, dateNumber, year) => {

//     // Create a new JavaScript Date object based on the timestamp
//     // multiplied by 1000 so that the argument is in milliseconds, not seconds.
//     let date = new Date(timeStamp * 1000);

//     let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//     day = days[date.getDay()];
//     month = months[date.getMonth()];
//     year = date.getFullYear();
//     dateNumber = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

//     console.log(day, month, dateNumber, year);
//     return(day, month, dateNumber, year);
// }

//====================Weather Forecast from Coordinates==============//
const weatherForecast = async(coord) => {

    let futureWeatherForecast = document.querySelector('.future__weather__forecast');
    futureWeatherForecast.innerHTML = '';

    try{
        const responseCoord = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely,current&APPID=14bc53e6922ea2590b89900c74db5df3&units=metric`);
        const weatherFromCoord = await responseCoord.json();
        
        const {daily} = weatherFromCoord;
        daily.filter((date, idx) => idx > 0)
        .map(date => {

            //get Day from Timestamp
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let time = new Date(date.dt * 1000);


            //create A div with classname of card and set inner content based on data gotten from API call
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <p class="day">${days[time.getDay()]}</p>
                <div class="weather__preview__card">
                        <img src="https://openweathermap.org/img/wn/${date.weather[0].icon}@2x.png" alt="weather-icon">
                        <p>${Math.round(date.temp.day)}<sup>o</sup>C</p>
                </div>
            `;

            //append card to futureWeatherForecast and set display to flex
            futureWeatherForecast.appendChild(card);
            futureWeatherForecast.style.display = 'flex';

        })
    } catch (error) {
        console.log(error);
    }
}


//====================Weather Query from Search Value==============//
const weatherQuery = async(lat, lon) => {
    let search = document.querySelector('#search');

    let weatherPreview = document.querySelector('.weather__preview');

    let weatherDetails = document.querySelector('.weather__details');

    let weatherDescription = document.querySelector('.weather__description');

    let futureWeatherForecast = document.querySelector('.future__weather__forecast');
    
    //clear all content
    weatherDetails.innerHTML = '';
    weatherDescription.innerHTML = '';
    weatherPreview.innerHTML = '';
    futureWeatherForecast.innerHTML = '';

    let response

    try {
        if (lat && lon) {
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=14bc53e6922ea2590b89900c74db5df3&units=metric`);
        } else {
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&APPID=14bc53e6922ea2590b89900c74db5df3&units=metric`);
        }
        const weatherReport = await response.json();
        
        const {name, coord, sys, weather, main, id, dt, visibility, wind} = weatherReport;
        

        switch(true) {
            case weatherReport.cod==='404':
                weatherDetails.style.display = 'block'
                weatherDetails.innerHTML = "Please search for a valid city 😩";
                break;
            default:
                weatherForecast(coord);

                let day, month, dateNumber, year;

                // Create a new JavaScript Date object based on the timestamp
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                let date = new Date(dt * 1000);

                let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

                day = days[date.getDay()];
                month = months[date.getMonth()];
                year = date.getFullYear();
                dateNumber = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

                // getDateFromTimeStamp(dt, day, month, dateNumber, year);


                //modify weatherPreview with API content
                weatherPreview.style.display = 'block';

                weatherPreview.innerHTML = `
                    <div class="right">
                        <p class="city__name">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${name}</span>
                            <sup class="country__name">${sys.country}</sup>
                        </p>
                        <div>
                            <p class="date">${day}, ${month} ${dateNumber} ${year}</p>
                        </div>
                    </div>
                `;
        

                //modify weatherDescription with API content
                weatherDescription.style.display = 'block';
        
                weatherDescription.innerHTML = `
                    <div class="left">
                        <div>
                            <p class="temp">${Math.round(main.temp)}<sup>o</sup>C</p>
                            <p class="max__min__temp">${Math.round(main['temp_max'])}<sup>o</sup>C/${Math.round(main['temp_min'])}<sup>o</sup>C</p>
                        </div>
                        <figure>
                            <img class="weather__description__image"  src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}icon" height="150" width="150">
                            <figcaption>
                                <p class="weather__description__text">${weather[0].description}</p>
                            </figcaption>
                        </figure>
                    </div>
                `;
                
                //modify weatherDetails with API content
                weatherDetails.style.display = 'block'
        
                weatherDetails.innerHTML= `
                    <div class="weather__detail">
                        <p>
                        <i class='wi wi-thermometer'></i>
                            Feels like
                        </p>
                        <p>${Math.round(main['feels_like'])}<sup>o</sup>C</p>
                    </div>
        
                    <div class="weather__detail">
                        <p>
                            <i class='wi wi-humidity'></i>                      
                            Humidity
                        </p>
                        <p>${main['humidity']}%</p>
                    </div>
        
                    <div class="weather__detail">
                        <p>
                        <i class='wi wi-barometer'></i>
                            Pressure
                        </p>
                        <p>${main['pressure']} hPa</p>
                    </div>
        
                    <div class="weather__detail">
                        <p>
                        <i class='wi wi-strong-wind'></i>
                            Wind Speed
                        </p>
                        <p>${wind.speed}m/s</p>
                    </div>
        
                    <div class="weather__detail">
                        <p>Visibility</p>
                        <p>${visibility}</p>
                    </div>
                `;

                search.value = '';
        }

        
    } catch (error) {

        console.log(error);

    }
}

search.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        weatherQuery();
    }
});

let searchIcon = document.querySelector('.search__icon');

searchIcon.addEventListener('click', weatherQuery);


//====================Weather From User Location==============/
let useLocation = document.querySelector('#location');

useLocation.addEventListener('click', () => {
    let lon;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            weatherQuery(lat, lon);
        });
    }
});

