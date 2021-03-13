var apiKey = "d048243cf2b78c95a538448ad9305181"
$(document).ready(function() {
    var timeDisplayEl = $('#time-display');
    var todayEl = $('#currentDay');
    //shows date and time
    function displayTime() {
        var rightNow = moment().format(' MMM DD, YYYY [  ] hh:mm:ss a');
        timeDisplayEl.text(rightNow);
    };
    //show the day
    function dayDisplay() {
        var todayNow = moment().format('dddd');
        todayEl.text(todayNow);

    };
    //calling the two function to operate
    setInterval(displayTime, 1000);
    setInterval(dayDisplay, 1000);
    
    $("#search-btn").on("click",function(){
       // alert("hello!!!")
var city = $("#city-input").val();
console.log(city);
//localStorage.setItem(city,date);

searchCityWeather(city,);

function searchCityWeather(city){
    $.ajax({
        type:"GET",
        //url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
        datatype: "json",
        success: function(data) {
            console.log(data)
        }
    })
}
searchCityForcast(city);

function searchCityForcast(city){
    $.ajax({
        type:"GET",
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
        //url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
        datatype: "json",
        success: function(data) {
            console.log(data)
        }
    })
}
searchCityWeather()
});


/* <div class="input-group mb-3">
                <input id="city-input" type="text" class="form-control" placeholder="ENTER CITY" aria-label="city input"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary " id="search-btn" type="button"
                    id="button-addon2">SEARCH</button>
            </div>*/




});