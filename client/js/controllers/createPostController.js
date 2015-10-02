app.controller("createPostCtrl",['PostAppService','PostRESTServices','$scope','$rootScope','$resource','$location',
	function (PostAppService,PostRESTServices,$scope,$rootScope,$resource,$location){
		var Create = PostRESTServices.createPost;
		$scope.createPostError = true;
		$scope.createPost = function (){
			console.log($rootScope.currentUser);
			$scope.post.postAuthor = $rootScope.currentUser.useremail;
			Create.save($scope.post,function (success){
				PostAppService.getPostArray().push(success);
				console.log(PostAppService.getPostArray());
				console.log("Saved successfully...");
			},function (error){
				console.log("Problem occured while saving...");
			});
			$scope.post = "";
			$location.path("/");
		}
}]);