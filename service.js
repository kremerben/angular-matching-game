team.factory('PokemonService', function($http) {
    return {
        team: [],
        startingPokemon: 'You have no Pokemon!',
        getRandomPokemon: function(callback) {
            var num = Math.floor((Math.random() * 719) + 1);
            $http.jsonp('http://pokeapi.co/api/v1/pokemon/' + num + '/?callback=JSON_CALLBACK').success(function(data) {
                    callback(data);
                    console.log(data);
            });
        }
    }
});
