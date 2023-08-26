"use strict"
//? <===============HOLD TODAY ELEMENTS================>
const todayDay = document.getElementById('todayDay');
const todayDate = document.getElementById('todayDate');
const month = document.getElementById('month');
const country = document.getElementById('country');
const todayTemp = document.getElementById('todayTemp');
const todayTempIcon = document.getElementById('todayTempIcon');
const todayCondition = document.getElementById('todayCondition');
const humidity = document.getElementById('humidity');
const WindSpeed = document.getElementById('WindSpeed');
const WindDirection = document.getElementById('WindDirection');


//? <===============HOLD DAY1 ELEMENTS===================>
const tomorrowDay = document.getElementById('tomorrowDay');
const tomorrowIcon = document.getElementById('tomorrowIcon');
const tomorrowBoneTemp = document.getElementById('tomorrowBoneTemp');
const tomorrowLowTemp = document.getElementById('tomorrowLowTemp');
const tomorrowCondition = document.getElementById('tomorrowCondition');

//? <===================HOLD DAY2 ELEMENTS============>
const afterTomorrowDay = document.getElementById('afterTomorrowDay');
const afterTomorrowIcon = document.getElementById('afterTomorrowIcon');
const afterTomorrowBoneTemp = document.getElementById('afterTomorrowBoneTemp');
const afterTomorrowLowTemp = document.getElementById('afterTomorrowLowTemp');
const afterTomorrowCondition = document.getElementById('afterTomorrowCondition');


const searchCountry = document.getElementById('searchCountry');
const empty = document.getElementById('empty')
const subscribButton = document.getElementById('subscribButton');
let weatherData;


//* <================FETCH DATA FROM API=============>
async function getWeatherData(country="cairo"){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a5b87d54d63147e5816100425232108&q=${country}&days=3`);
    weatherData =await response.json();
    console.log(weatherData);
}

//! <================DISPLAY TODAY DATA FUNCTION=============>
function displayTodayWeather(){
  const date = new Date();
  
  todayDay.innerHTML = date.toLocaleDateString('en-us',{weekday:"long"});
  todayDate.innerHTML = date.getDate()
  month.innerHTML = date.toLocaleDateString('en-us',{month:"long"})
  country.innerHTML = weatherData.location.name;
  todayTemp.innerHTML = weatherData.current.temp_c;
  todayTemp.innerHTML = weatherData.current.temp_c;
  todayTempIcon.setAttribute("src",weatherData.current.condition.icon );
  todayCondition.innerHTML = weatherData.current.condition.text;
  humidity.innerHTML = weatherData.current.humidity;
  WindSpeed.innerHTML = weatherData.current.wind_kph;
  WindDirection.innerHTML = weatherData.current.wind_dir;
}

//! <================DISPLAY TOMORROW DATA FUNCTION=============>
function dispalyTomorrow(){
  const forecastday =weatherData.forecast.forecastday[1] ;
  const tomorrow =new Date(forecastday.date);

  tomorrowDay.innerHTML = tomorrow.toLocaleDateString('en-us', {weekday:"long"});
  tomorrowIcon.setAttribute('src',forecastday.day.condition.icon);
  tomorrowBoneTemp.innerHTML = forecastday.day.maxtemp_c;
  tomorrowLowTemp.innerHTML = forecastday.day.mintemp_c;
  tomorrowCondition.innerHTML = forecastday.day.condition.text;
}

//! <================DISPLAY AFTER TOMORROW DATA FUNCTION=============>
function dispalyAfterTomorrow(){
  const forecastday =weatherData.forecast.forecastday[2] ;
  const afterTomorrow =new Date(forecastday.date);

  afterTomorrowDay.innerHTML = afterTomorrow.toLocaleDateString("en-us" , {weekday:"long"});
  afterTomorrowIcon.setAttribute('src',forecastday.day.condition.icon);
  afterTomorrowBoneTemp.innerHTML = forecastday.day.maxtemp_c;
  afterTomorrowLowTemp.innerHTML = forecastday.day.mintemp_c;
  afterTomorrowCondition.innerHTML = forecastday.day.condition.text;
}

  searchCountry.addEventListener('input' , function(){
    getStartAPP(searchCountry.value);
  })

  subscribButton.addEventListener('click' , function(){
    empty.value = "";
  })  

//todo:<===============START APP FUNCTION===========>
async function getStartAPP(country){
  await getWeatherData(country);
  displayTodayWeather();
  dispalyTomorrow();
  dispalyAfterTomorrow();
}

getStartAPP();