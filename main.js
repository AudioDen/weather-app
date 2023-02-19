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
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
                //datatype: "json",
                success: function (data) {
                    console.log(data);
                    $("#tp-tday").text(data["main"]["temp"]);
                    $("#hm-tday").text(data["main"]["humidity"]);
                    $("#fwind-tday").text(data["wind"]["speed"]);
                    var lon = data.coord.lon;
                    var lat = data.coord.lat;
                    searchCityUv(lon,lat);
                }
            })
        }
        

        function searchCityUv(lon,lat) {
            $.ajax({
                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}` ,
                
                success: function (data) {
                    console.log(data); 
                    
                    $("#uv-tday").text(data["value"]);
                }
            })
        }
        searchCityForcast(city);

        function searchCityForcast(city) {
            $.ajax({
                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,

                
                success: function (data) {
                    console.log(data);
                    let count = 1
                    for (let i = 0; i < data.list.length; i++){
                        if (data.list[i].dt_txt.indexOf('12:00:00')!== -1){
                            console.log(data.list[i])
                            let tempId = "#ftd" + count
                            let humId = "#fhmd" + count
                            let windId = "#fwind" + count
                            count++
                            $(tempId).text(data.list[i]["main"]["temp"]);
                            $(humId).text(data.list[i]["main"]["humidity"]);
                            $(windId).text(data.list[i]["wind"] ["speed"]); 
                          
                        }
                        //stops the loop if bigger than 5
                        if (count > 5){
                            break
                        }
                    }

                }
            })

        }
       // searchCityWeather()
       // searchCityForcast()
       // searchCityUv()
    });

})
