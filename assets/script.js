let userInput = $('#searchInput')
let searchBtn = $('#searchBtn')
let APIkey = '41376099e7365b12a3500d97ab289f4e'
let weatherDiv = $('.weather')
let currentDate = moment().format('D/MM/YYYY')
var city = JSON.parse(localStorage.getItem('todolist')) || []

function cityAPIcall() {
    // Fetch using the open weather map city api to get user input's city coords - takes user input and the apiKey above
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.val()}&appid=${APIkey}`)
        .then(function (response) {
            // Return the response
            return response.json()
        })
        .then(function (response) {
            console.log(response)
            // Call the coords Api
            fullAPICall(response)
        })
}

function fullAPICall(response) {
    // Fetch using the previous api's city coords and displays the full weather information
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIkey}`)
        .then(function (fullResponse) {
            // Return the response
            return fullResponse.json()
        })
        .then(function (fullResponse) {
            console.log(fullResponse)
            // Call the create html functions and send response and fullResponse
            setWeatherHtml(response, fullResponse)
            setWeeklyWeather(fullResponse)
        })
}

// On click call the first api call
$('#searchBtn').on('click', function () {
    cityAPIcall()
    // previousSearches()
    // localStorage.setItem('city', JSON.stringify(city))
})

function setWeatherHtml(response, fullResponse) {
    // Get all corrisponding html tags
    let currentCity = $('#currentCity')
    let currentTemp = $('#currentTemp')
    let currentWind = $('#currentWind')
    let currentHumid = $('#currentHumid')
    let currentUV = $('#currentUV')
    let weatherIcon = $('#weatherIcon')


    // Call the response object to get individual weather pieces
    // Name
    currentCity.html(response.name + ` (${currentDate})`)
    // Icon
    weatherIcon.attr('src', `http://openweathermap.org/img/w/${fullResponse.current.weather[0].icon}.png`)
    // Temperature
    currentTemp.html(`Temp: ${fullResponse.current.temp}`)
    // Wind
    currentWind.html(`Wind: ${fullResponse.current.wind_speed} MPH`)
    // Humidity
    currentHumid.html(`Humidity: ${fullResponse.current.humidity} %`)
    // UV Index
    currentUV.html(`UV Index: ${fullResponse.current.uvi}`)
}

function setWeeklyWeather(fullResponse) {
    let weeklyWeatherContainer = $('#weeklyWeatherDiv')

    // Loop through 5 times to create the daily weather blocks
    for (i = 0; i <= 4; i++) {
        weeklyWeatherContainer.append(` <div class='col-3 dailyWeatherBlock' id='currentForecastDay${i}'>
                                            <div class='cityAndIcon'>
                                                <h3 id='currentCityDay${i}'>${currentDate}</h3>
                                                <img id='weatherIconDay${i}' src='http://openweathermap.org/img/w/${fullResponse.daily[i].weather[0].icon}.png'>
                                            </div>
                                            <p id='currentTempDay${i}'>Temp: ${fullResponse.daily[i].temp.max}</p>
                                            <p id='currentWindDay${i}'>Wind: ${fullResponse.daily[i].wind_speed}</p>
                                            <p id='currentHumidDay${i}'>Humidity: ${fullResponse.daily[i].humidity}</p>
                                            <p id='currentUVDay${i}'>UV Index: ${fullResponse.daily[i].uvi}</p>
                                        </div>`)
    }
}


// Local function that I couldnt quite get to work \\

// function previousSearches(city) {
//     localStorage.getItem('city')

//     for(i = 0; i < city.length; i++) {
//         // Creates a new variable 'toDoItem' that will hold a "<p>" tag
//           // Sets the `list` item's value as text of this <p> element
//           var prevSearch = $('<a>')
//           prevSearch.html(`${city[i]}`)

//           // Gives the button a class called 'checkbox'
//           //   toDoClose.addClass('checkbox');

//           // Adds 'toDoItem' to the To-Do List div
//           $('#previousSearches').append(prevSearch)
//     }
// }