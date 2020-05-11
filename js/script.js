firebase.initializeApp({
    apiKey: 'AIzaSyDGORK3IhV3odKm4x2b_ZFcGaeNbARGWvg',
    projectId: 'werkstuk-matteo-buscemi-dev-2'
  });
  
  var selectedCountries;
  const database = firebase.firestore();
  const countryCollection = database.collection("Countries");
  
  
  const convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  
  const sortByTimeStamp = (a, b) => {
    if (a.timeStamp < b.timeStamp) {
      return 1;
    }
    if (a.timeStamp > b.timeStamp) {
      return -1;
    }

  };

  async function addCountry(countryName) {
    await countryCollection.add({
      countryName,
      timeStamp: new Date(),
    });
  };

  async function renderCountries() {
    countryCollection.onSnapshot((querySnapshot) => {
  
      const updatedCountries = convertQuerySnapshotToRegularArray(querySnapshot);
  
  
      updatedCountries.sort(sortByTimeStamp);
  
      $("div.country-maximized").remove();
      selectedCountries = updatedCountries;
      updatedCountries.forEach(function(updateCountry)
      {
      printData(updateCountry.countryName.toLowerCase(),updateCountry.id);
      });
      
      $("div.delete").click(function(){
          var deletedCountryID = $(this).parent().parent().attr("id");
          database.collection("Countries").doc(deletedCountryID).delete();
        $(this).parent().parent().remove();


        
    })
         $("div.minimized").click(function(){
           var thisDiv = $(this).attr("id");
           var thisDivClass = $(this).parent().attr("class");
           var divI = $(this).children().attr("class");
           console.log(divI);
            if (divI == "fas fa-minus"){
                
                $("div#"+thisDiv+" i.fa-minus").attr("class","fas fa-chevron-down");
                $("div#body-"+ thisDiv).slideUp();
                $(this).parent().attr("class","country-minimized");
                console.log("Test");
            }
            else {
                $("div#"+thisDiv+" i.fa-chevron-down").attr("class","fas fa-minus");
                $("div#body-"+ thisDiv).slideDown();
                $(this).parent().attr("class","country-header");
                console.log("Test");
            }

            });
      });
      
    };

    renderCountries();

var countries;


$(document).ready(function(){
    getData();


    function getData(){
        var url = "https://api.covid19api.com/summary";
        fetch(url).then(Response => {
        
            return Response.json();
        
        }).then(user => {
            countries = user.Countries;
        });
        };

        $("i#addcountry").click(function () {
            $("div.intro").remove();
            var valcountry = $("input.search-txt").val().toLowerCase();
    
            selectedCountries.forEach(function (selectedCountry) {
    
                if (valcountry == selectedCountry.countryName.toLowerCase()) {
                    console.log("Already exists!");
                    var toDeleteId = selectedCountry.id;
                    database.collection("Countries").doc(toDeleteId).delete();
                }
    
            });
    
            countries.forEach(function (country) {
                if (country.Country.toLowerCase() == valcountry) {
                    addCountry(country.Country);
                };
            });
        });
    });
        

function printData(val,id){
    countries.forEach(function (country) {

        if (country.Country.toLowerCase() == val) {
            console.log(country);

                    var html = $(`<div class="country-maximized" id="${id}">
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

