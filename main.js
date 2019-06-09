var input = document.getElementById("searchThisPokemon");
var search = document.getElementById("search");
var displayName = document.getElementById("name");
var displayPicture = document.getElementById("picture");
var displayEvolutionName = document.getElementById("evolutionName");
var displayEvolutionPicture = document.getElementById("evolutionPicture");
var displayID = document.getElementById("idNumber");
var displayMoves = document.getElementById("moves");
search.addEventListener("click", loadAjax);
search.addEventListener("click", evolution);

function loadAjax() {
  var pokeName = input.value;
  console.log(pokeName);
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = JSON.parse(ajax.responseText);
      displayName.innerHTML = "<p>" + data.name + "</p>";
      displayPicture.innerHTML = "<img" + " " + "src=" + data.sprites.front_default + ">";
      displayID.innerHTML = data.id;
      displayMoves.innerHTML = data.moves[Math.floor(Math.random() * data.moves.length)].move.name + "<br>" + " " + data.moves[Math.floor(Math.random() * data.moves.length)].move.name + " " + "<br>"  + data.moves[Math.floor(Math.random() * data.moves.length)].move.name + " " + "<br>"  + data.moves[Math.floor(Math.random() * data.moves.length)].move.name;
    }
  }


  ajax.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokeName}`, true)
  ajax.send();

// WAIT TO CHECK THE NAME OF PREVIOUS EVOLTION AND THEN GET THE PICTURE
  setTimeout(function () {
    var pokeName = displayEvolutionName.innerHTML;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = JSON.parse(ajax.responseText);
        console.log(data);

        displayEvolutionPicture.innerHTML = "<img" + " " + "src=" + data.sprites.front_default + ">";

      }
    }

    ajax.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokeName}`, true)
    ajax.send();
  }, 20);
}

// GET THE NAME OF THE PREVIOUS EVOLUTION
function evolution() {
  var pokeName = input.value;
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = JSON.parse(ajax.responseText);

      displayEvolutionName.innerHTML = data.evolves_from_species.name;

    }
  }

  ajax.open("GET", `https://pokeapi.co/api/v2/pokemon-species/${pokeName}`, true)
  ajax.send();
}
