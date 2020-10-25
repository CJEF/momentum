// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  weatherCity = document.querySelector('.weather__city'),
  weatherTemp = document.querySelector('.weather__temp'),
  weatherIcon = document.querySelector('.weather-icon'),
  humidity = document.querySelector('.weather__humidity'),
  weatherWind = document.querySelector('.weather__wind'),
  date = document.querySelector('.date'),
  quotes = document.querySelector('.quotes'),
  quotesAuthor = document.querySelector('.quotes__author'),
  btn = document.querySelector('.btn'); 

// Options
const showAmPm = true;

const quotesApi = 'https://type.fit/api/quotes';
fetch(quotesApi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    quotes.innerText = data[0].text
    quotesAuthor.innerText = '"' + data[0].author + '"'
  });

const base = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

function getImage() {
  const index = i % images.length;
  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 

async function getWeather(e) { 
  if (weatherCity.value == null || '' || false) {  
    weatherCity.value = '[Enter City]';
  } else {
    weatherCity.value = localStorage.getItem('weatherCity');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=ru&appid=3621479f4da8cb360f3d58134d8d5321&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherTemp.innerText = `${data.main.temp.toFixed(0)}°C`;
    humidity.innerText = data.main.humidity + '%';
    weatherWind.innerText = data.wind.speed + 'm/s'
  }
}

function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('weatherCity', e.target.value);
      getWeather();
      weatherCity.blur();
    }
  }
}

function showDate() {
  let today = new Date(),
  todayDate = today.getDate(),
  month = today.getMonth(),
  year = today.getFullYear(),
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  date.innerText = todayDate + ' of ' + months[month] + ', ' + year;
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (name.textContent == null || '' || false) {  
    name.textContent = '[Enter Name]';
  } else {
    name.value = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('name', e.target.value);
        name.blur();
    } 
  }
}

// function getCity() {
//   if (weatherCity.textContent == null || '' || false) {  
//     weatherCity.textContent = '[Enter City]';
//   } else {
//     weatherCity.textContent = localStorage.getItem('weather');
//   }
// }

// // Set City
// function setCity(e) {
//   if (e.type === 'keypress') {
//     // Make sure enter is pressed
//     if (e.which == 13 || e.keyCode == 13 || 9) {
//       if(!weatherCity.textContent) {
//         weatherCity.textContent = '[Enter city]';
//       } 
//       localStorage.setItem('weather', e.target.innerText);
//       weatherCity.blur();
//     }
//   } else {
//     localStorage.setItem('weather', e.target.innerText);
//   }
// }

// Get Focus
function getFocus() {
  if (focus.textContent == null || '' || false) {  
    focus.textContent = '[Enter Focus]';
  } else {
    focus.value = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('focus', e.target.value);
        focus.blur();
    } 
  } 
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
weatherCity.addEventListener('keypress', setCity);
btn.addEventListener('click', getImage);
window.addEventListener('load', function() {
  weatherCity.value = localStorage.getItem('weatherCity');
})

// Run
showTime();
setBgGreet();
getName();
getFocus();
showDate()