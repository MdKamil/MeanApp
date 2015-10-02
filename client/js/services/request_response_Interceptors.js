app.factory('myInterceptor',function ($window,$rootScope){
	console.log("Interceptor is initialized...");
	return {
		request : function (config){
			config.headers = config.headers || {};
			var userAuthInfo = $window.localStorage.getItem('userAuthInfo');
			if(userAuthInfo){
				var loggedInUser = JSON.parse(userAuthInfo);
				config.headers.Authorization = 'Bearer ' + loggedInUser.token;
				config.headers.user = $rootScope.currentUser.useremail;
			}
			return config;
		},
		'requestError': function(rejection) {
	      	console.log("Error in the request");
	    },
		'response': function(response) {
     		console.log("Man i am ready .....");
      		return response;
    	},
    	'responseError': function(rejection) {
      		console.log("There is some error in your request...");
    	}
	}
})