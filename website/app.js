/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=<APP ID Goes here>&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();
// when the generate button clicked this function runs by the event listener
const generate = () => {
  const zipCode = document.querySelector("#zip").value;
  const content = document.querySelector("#feelings").value;
  getWeatherData(baseUrl, zipCode, apiKey)
    .then((data) => {
      console.log(data);
      postData("/postProjectData", {
        temp: data.main.temp,
        date: newDate,
        userResponse: content,
      });
      getData();
    })
};
// get data from api
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  const response = await fetch(baseUrl+zipCode+apiKey);
  try {
    // convert the response to JSON format
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("There is a problem in getWeatherData function", error);
  }
};
// helper Functions
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error in the postData function", error);
  }
};
const getData = async () => {
  const request = await fetch("/getProjectData");
  try {
    const data = await request.json();
    document.querySelector("#temp").innerHTML = `Temperature: ${data.temp}`;
    document.querySelector("#date").innerHTML = `Date: ${data.date}`;
    document.querySelector("#content").innerHTML = `I feel: ${data.userResponse}`;
  } catch (error) {
    console.log("There is a problem in getData function", error);
  }
};
// Event Listeners
document.getElementById("generate").addEventListener("click", generate);
