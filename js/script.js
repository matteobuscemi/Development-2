var countries;

$(document).ready(function(){
    getData();

    function getData(){
        var url = "https://api.covid19api.com/summary";
        fetch(url).then(Response => {
        
            return Response.json();
        
        }).then(user => {
            countries = user.Countries;
            console.log(countries);
        });
        };

    $("i#addcountry").click(function(){
        var valcountry = $("input.search-txt").val().toLowerCase();
        console.log(valcountry);
        printData(valcountry);
        });

});

function printData(val){
            countries.forEach(function (country) {

                if (country.Country.toLowerCase() == val) {
                    console.log(country);

                    var html = $(`<div class="country-maximized">
                    <div class="country-header">
                <div class="delete"><i class="fas fa-trash"></i></div>
                <div class="flag"><img src="../flags/${country.CountryCode.toLowerCase()}.svg"></div>
                <h1>${country.Country}</h1>
                <div class="minimized"><i class="fas fa-minus"></i></div>
                    </div>
                    <div class="country-body">
                <table>
                    <tr>
                        <th class="title">New confirmed</th>
                        <th class="title">New deaths</th>
                        <th class="title">New recovered</th>
                    </tr>
                    <tr>
                        <th>${country.NewConfirmed}</th>
                        <th>${country.NewDeaths}</th>
                        <th>${country.NewRecovered}</th>
                    </tr>
                    <tr>
                        <th class="title">Total confirmed</th>
                        <th class="title">Total deaths</th>
                        <th class="title">Total recovered</th>
                    </tr>
                    <tr>
                        <th>${country.TotalConfirmed}</th>
                        <th>${country.TotalDeaths}</th>
                        <th>${country.TotalRecovered}</th>
                    </tr>
                </table>
                </div>
                </div>`).appendTo("body");
                }
            });

};