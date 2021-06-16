function getSprat() {
  var uiSprat = document.getElementsByName("uiSprat");
  for (var i in uiSprat) {
    if (uiSprat[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getbrojSoba() {
  var brojSoba = document.getElementsByName("brojSoba");
  for (var i in brojSoba) {
    if (brojSoba[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}


function getStanje() {
  var uiStanje = document.getElementsByName("uiStanje");
  for (var i in uiStanje) {
    if (uiStanje[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}


function getNamjesten() {
  var uiPozicija = document.getElementsByName("uiPozicija");
  for (var i in uiPozicija) {
    if (uiPozicija[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}


function getGrijanje() {
  var uiGrijanje = document.getElementsByName("uiGrijanje");
  for (var i in uiGrijanje) {
    if (uiGrijanje[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var broj_kvadrata = document.getElementById("uiSqft");
  var broj_soba = getbrojSoba();
  var sprat = getSprat();
  var stanje = getStanje();
  var namjesten = getNamjesten();
  var grijanje = getGrijanje();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(
    url,
    {
      location: location.value,
      stanje: stanje,
      sprat: sprat,
      namjesten: namjesten,
      broj_soba: broj_soba,
      grijanje: grijanje,
      broj_kvadrata: parseFloat(broj_kvadrata.value),
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML =
        "<h2>" + data.estimated_price.toString() + " KM</h2>";
      console.log(status);
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url, function (data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $("#uiLocations").empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $("#uiLocations").append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
