//CREATE A TEAM
team.controller("firstController", function($scope, $http, PokemonService) {
    $scope.team = [];
    var team = [];
    var counter = 0;
	var poke;
	
    $scope.getTeam = function() {
        if (counter < 6) {
            var num = Math.floor((Math.random() * 719) + 1);
            $http.jsonp('http://pokeapi.co/api/v1/pokemon/' + num + '/?callback=JSON_CALLBACK').
                success(function(data) {
                    team.push(data);
                    console.log(data);
                }).
                error(function(data) {
                    console.log('Error');
                }).
                then(function(promise) {
                    counter++;
                    $scope.getTeam();
            });
        }
        else {
            $scope.team = team;
            PokemonService.team = team;
            PokemonService.startingPokemon = team[0].name;
            team = [];
            counter = 0;
        }
    };
});

//PLAY THE GAME
team.controller("secondController", function($scope, PokemonService) {
	var countActive = 0;
	var pair = [];
	var matches = 0;
	var totalClicks = 0;

    $scope.loadTeam = function() {
        $scope.noTeam = false;
        $scope.team = PokemonService.team;
        if ($scope.team.length == 0) {
            $scope.noTeam = true;
        }
    };
	
	$scope.playMatchGame = function() { 
		if (totalClicks) {
			for (var i = 0; i < 12; i++) {
				$scope.gameTeam[i].found = false;
				$scope.gameTeam[i].showActive = false;
			}
		}
		$scope.gameTeam = [];
		matches = 0;
		totalClicks = 0;
		$scope.winner = false;
		$scope.loadTeam();
		var gameCards = [];
		//CREATE CARDS
		angular.copy(PokemonService.team, gameCards);
		var gameCardsAll = gameCards.concat(PokemonService.team);
		shuffleArray(gameCardsAll);
		$scope.gameTeam = gameCardsAll;
	};

	$scope.makeActive = function(index) {
		totalClicks++;
		if (countActive == 2) {
			pair[0].showActive = false;
			pair[1].showActive = false;
			pair[0] = $scope.gameTeam[index];
			$scope.gameTeam[index].showActive = true;
			countActive = 0;
		}
		if (countActive == 1) {
			pair[1] = $scope.gameTeam[index];
			pair[1].showActive = true;
			if (pair[0].name == pair[1].name) {
				matches++;
				pair[0].found = true;
				pair[1].found = true;
				pair = [];
				countActive = -1;
			} 
		}
		if (countActive == 0) {
			pair[0] = $scope.gameTeam[index];
			$scope.gameTeam[index].showActive = true;
		}
		countActive++;
		if (matches == 6) {
			$scope.winner = true;
			$scope.totalClicks = totalClicks;
		}
	};
});



var shuffleArray = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining elementÉ
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
