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

    $("div.delete").click(function(){
        $(this).parent().parent().remove();
        console.log("Blablabla");

        
    })
         $("div.minimized").click(function(){
           var thisDiv = $(this).attr("id");
           var thisDivClass = $(this).parent().attr("class");
           var divI = $(this).children().attr("class");
           console.log(divI);
            if (divI == "fas fa-minus"){
                
                $("div#"+thisDiv+" i.fa-minus").attr("class","fas fa-chevron-down");
                $("div#body-"+ thisDiv).slideUp();
                console.log("Test");
            }
            else {
                $("div#"+thisDiv+" i.fa-chevron-down").attr("class","fas fa-minus");
                $("div#body-"+ thisDiv).slideDown();
                console.log("Test");
            }

            });
        });

        
});

function printData(val){
            countries.forEach(function (country) {

                if (country.Country.toLowerCase() == val) {
                    console.log(country);

                    var html = $(`<div class="country-maximized">
                    <div class="country-header" id="${country.CountryCode}">
                <div class="delete"><i class="fas fa-trash"></i></div>
                <div class="flag"><img src="../flags/${country.CountryCode.toLowerCase()}.svg"></div>
                <h1>${country.Country}</h1>
                <div class="minimized" id="${country.CountryCode}"><i class="fas fa-minus"></i></div>
                    </div>
                    <div class="country-body" id="body-${country.CountryCode}">
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
                };
            });

};
