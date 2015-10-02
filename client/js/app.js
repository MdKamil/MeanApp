var app = angular.module('Post',['ngRoute','ngResource']);

app.controller('mainController',['$scope','$rootScope','$window',function ($scope,$rootScope,$window){
	var info = $window.localStorage.getItem('userAuthInfo');
	var loggedInUser = JSON.parse(info);
	console.log(loggedInUser);
	$rootScope.currentUser = loggedInUser;
	$rootScope.username = loggedInUser.username;
	$scope.username = loggedInUser.username;
	$scope.logout = function (){
		$window.localStorage.clear();
		console.log($window.localStorage);
		$window.location.href = '/home';
	}
}]);

app.config(['$httpProvider','$routeProvider',function ($httpProvider,$routeProvider){
	$httpProvider.interceptors.push('myInterceptor');
	$routeProvider
		.when('/',{
			templateUrl : "../partials/home.html",
			controller  : "homeCtrl"
		})
		.when('/home',{
			templateUrl : "../partials/home.html",
			controller  : "homeCtrl"
		})
		.when('/createPost',{
	        templateUrl : '../partials/createPost.html',
	        controller  : 'createPostCtrl'
	    })
	    .when('/editPost/:_id',{
	    	templateUrl : '../partials/editPost.html',
	        controller  : 'editPostCtrl'
	    })
	    .when('/viewPost/:_id',{
	        templateUrl : '../partials/viewPost.html',
	        controller  : 'viewPostCtrl'
	    })
	    .when('/accountSettings',{
	        templateUrl : '../partials/accountSettings.html',
	        controller  : 'accountSettingsCtrl'
	    });
}]);

app.run(function ($rootScope,$location,$window){
	$rootScope.$on('$routeChangeStart',function (event, next, current,rejected){
		if($rootScope.currentUser){
			console.log("User is logged in");	
		}else if(!$rootScope.currentUser){
			console.log("Log in is required to use ....");
			$window.location.href="/";
		}
	});
});