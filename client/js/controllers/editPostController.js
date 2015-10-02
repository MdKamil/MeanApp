app.controller('editPostCtrl',['PostRESTServices','$scope','$rootScope','$routeParams','$location',
	function function_name (PostRESTServices,$scope,$rootScope,$routeParams,$location) {
		var GetPostById = PostRESTServices.getPostById;
		var EditPost = PostRESTServices.updatePost;
		GetPostById.get({postId:$routeParams._id},function (success){
			console.log("Successfully retrieved the user by id..");
			$scope.post = success;
		},function (error){
			console.log("Error while retrieving particular user...");
		});
		$scope.updatePost = function (){
			$scope.post.postAuthor = $rootScope.currentUser.useremail;
			console.log("update called....");
			EditPost.update({postId:$routeParams._id},$scope.post,function (success){
				console.log("Update was successfull...")
			},function (error){
				console.log("Update was not successful...")
			});
			$location.path("/");
		};
}]);