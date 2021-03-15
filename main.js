var apiKey = "d048243cf2b78c95a538448ad9305181"
var todayNow = moment().format('dddd');
//var lon = data.coord.lon;
//var lat = data.coord.lat;
//var storageCity = localstorage.getItem(value)

$(document).ready(function () {
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



    $("#search-btn").on("click", function () {
        // alert("hello!!!")
        var city = $("#city-input").val();
        var todayNow = moment().format('dddd');
        console.log(city);
        localStorage.setItem(todayNow,city);
        //var storageCity = localstorage.getItem(city)
        

        searchCityWeather(city,);

        function searchCityWeather(city) {
            $.ajax({
                type: "GET",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
                //datatype: "json",
                success: function (data) {
                    console.log(data);
                    $("#tp-tday").text(data["main"]["temp"]);
                    $("#hm-tday").text(data["main"]["humidity"]);
                    var lon = data.coord.lon;
                    var lat = data.coord.lat;
                }
            })
        }
        searchCityUv(city);

        function searchCityUv(city) {
            $.ajax({
                type: "GET",
                url: `http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=${apiKey}` ,
                //datatype: "json",
                success: function (data) {
                    console.log(data);
                    
                    
                    
                }
            })
        }
        searchCityForcast(city);

        function searchCityForcast(city) {
            $.ajax({
                type: "GET",
                url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,

                // datatype: "json",
                success: function (data) {
                    console.log(data);
                    for (let i = 0; i < data.list.length; i++){
                        if (data.list[i].dt_txt.indexOf('12:00:00')!== -1){
                            console.log(data.list[i])
                            $("#ftd1").text(data.list[i]["main"]["temp"]);
                            $("#fhmd1").text(data.list[i]["main"]["humidity"]); 
                          //  $("#ftd2").text(data.list[i]["main"]["temp"]);
                          //  $("#fhmd2").text(data.list[i]["main"]["humidity"]); 
                          //  $("#ftd3").text(data.list[i]["main"]["temp"]);
                           // $("#fhmd3").text(data.list[i]["main"]["humidity"]); 
                          //  $("#ftd4").text(data.list[i]["main"]["temp"]);
                          //  $("#fhmd4").text(data.list[i]["main"]["humidity"]); 
                          //  $("#ftd5").text(data.list[i]["main"]["temp"]);
                          //  $("#fhmd5").text(data.list[i]["main"]["humidity"]); 
                          
                        }
                    }

                }
            })

        }
        searchCityWeather()
        searchCityForcast()
        searchCityUv()
    });

})
