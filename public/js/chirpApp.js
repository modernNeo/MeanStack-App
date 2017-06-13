var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($http,$rootScope){
	$rootScope.authenticated = false;
	$rootScope.badUsername = false;
	$rootScope.current_username = "";
	$rootScope.logout = function(){
		$http.get("/auth/signout");

		$rootScope.authenticated = false;
		$rootScope.current_user = "";
	};
});

app.config(function($routeProvider){
 $routeProvider
   //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
	//the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('mainController', function($scope, postService, $rootScope){
	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', text: '', create_at: '' };


	$scope.post = function(){
		$scope.newPost.created_by = $rootScope.current_user;
		$scope.newPost.created_at = Date.now();
		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = {created_by : " ", text: " ", created_at: " "};
	
		
	  	});
	}

});
app.controller('authController', function($scope, $rootScope,$http, $location){
	console.log('authController');
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
//	$scope.error_message = "login request for " + $scope.user.username;
		$http.post('/auth/login', $scope.user).success(function(data){
			console.log('data.state == ' + data.state);
			if (data.state == 'success'){
				console.log('[authController] validated');
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$rootScope.badUsername = true;
				console.log('[authController] rejected!');
				$scope.error_message = data.message;
			}
		})

    //placeholder until authentication is implemented
//    $scope.error_message = 'login request for ' + $scope.user.username;
	};




	$scope.register = function(){
//      $scope.error_message = "login request for " + $scope.user.username;
                $http.post('/auth/signup', $scope.user).success(function(data){
                        if (data.state == 'success'){
				$rootScope.authenticated = true;
	                        $rootScope.current_user = data.user.username;
	                        $location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
                });

    //placeholder until authentication is implemented
//    $scope.error_message = 'login request for ' + $scope.user.username;
        };

});
