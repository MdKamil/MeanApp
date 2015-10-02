app.directive('login',['$http',function (){
	return {
		replace:true,
		restrict:'E',
		templateUrl:'/partials/logindirective.html',
		link : function (scope,element,attrs){
			scope.signUpVisible = true;
			scope.loginVisible = false;
			scope.loginErrorVisible = true;
			scope.sameEmailErrorVisible = true;

			scope.showLoginForm = function (){
				scope.signUpVisible = true;
				scope.loginVisible =false;
			}

			scope.showSignUpForm = function () {
				scope.loginVisible = true;
				scope.signUpVisible = false;
			}

			scope.validateLogin = function (login){
				scope.loginErrorVisible = true;
				$http.post('/login',{username:$scope.login.userEmail,
				password:$scope.login.passWord}).
				success(function (data, status, headers, config){
					console.log("The validation comes here too....");
					$window.localStorage.setItem("token",data.token);
					$window.localStorage.setItem("userName",data.data);
					$window.location.href = '/home';
				}).error(function (data, status, headers, config){
					console.log("Not a valid user...");
					scope.loginErrorVisible = false;
					scope.myStyle = {'height':'270px'};
				});
			};

			scope.validateSignUp = function (){
				scope.sameEmailErrorVisible = true;
				$http.post('/signUp',{username:$scope.signup.userName,
				email:$scope.signup.userEmail,password:$scope.signup.passWord}).
				success(function (data,status,headers,config){
					console.log("signup was successfull");
					$window.location.href = '/home';
				}).error(function (data,status,headers,config){
					console.log("Signup was not successfull");
					scope.sameEmailErrorVisible = false;
					scope.signupStyle = {'height':'300px'};
				});
			};
		}
	}
}]);