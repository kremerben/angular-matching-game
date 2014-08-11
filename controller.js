
//////////////////////////////////////////////




myApp.controller('movieRequest', function($scope, $http) {
	$scope.getMovies = function () {

		$http.jsonp(
		 'http://api.rottentomatoes.com/api/public/v1.0/movies', {
		 params: {
		     apikey: '88a8qpv9kwg657jxb97ma5nn',
		     q: $scope.searchTerms,
		     page_limit: '10',
		     callback: 'JSON_CALLBACK'
		 }
		}).then(function(promise) {
		    $scope.movies;
		     for (var i = 0; i < promise.data.movies.length; i++) {
		     	$scope.movies = promise.data.movies;
		         
		     }
		     $scope.showResults = true;
		 });	
/* 		 console.log($scope.movies); */
	}
	$scope.moreInfo = function(index) {
		$scope.movies[index].showImage = true;
	};
	$scope.hideInfo = function(index) {
		$scope.movies[index].showImage = false;
	};
});

//////////////////////////////////////////////



myApp.controller('myCtrl', function($scope) {
    $scope.clickMe = function() {
        $scope.clicked = true;
    };
});


myApp.controller("myCtrl3", function($scope) {
    $scope.list = ['Learn Angular'];
	$scope.addToList = function() {
        if ($scope.todo !== '') {
            $scope.list.push($scope.todo);
            $scope.todo = '';
        }
	};
});




myApp.controller("faveBooks", function($scope) {
    $scope.booklist = [{
  "title": "James and the Giant Peach",
  "author": "James",
  "description": "the giant peach",
  "genre": "children"
},{
  "title": "Into the Wild",
  "author": "I Forgot",
  "description": "Going out for a walk",
  "genre": "travel"
}  ];
	$scope.addBookToList = function() {
        if ($scope.book !== '') {
            $scope.booklist.push($scope.book);
            $scope.book = '';
			if ($scope.booklist.length > 5) {
				$scope.showBookMessage = true;
			}
        }
	};
	$scope.moreInfo = function(index) {
		$scope.booklist[index].showDesc = true;
	};
	$scope.hideInfo = function(index) {
		$scope.booklist[index].showDesc = false;
	};
});





myApp.controller("registration", function($scope) {
	$scope.users = [];
	$scope.register = function() {
		$scope.regComplete = true;
		$scope.users.push($scope.user);
		
	};	
	$scope.newReg = function() {
		$scope.regComplete = false;
		$scope.user = {};
	};
});