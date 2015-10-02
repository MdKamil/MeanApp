app.controller("viewPostCtrl",['PostRESTServices','$scope','$routeParams','$location'
	,function (PostRESTServices,$scope,$routeParams,$location){
	var GetPostById = PostRESTServices.getPostById;
	GetPostById.get({postId:$routeParams._id},function (success){
		console.log("Successfully retrieved the user by id..");
		$scope.post = success;
	},function (error){
		console.log("Error while retrieving particular user...");
	});

	$scope.deletePost = function (id){
		var DeletePost = PostRESTServices.deletePost;
		DeletePost.delete({postId:id},function (success){
			$location.path("/");
			console.log("Successfully deleted");
		},function (error){
			console.log("Error occured while deleting post...");
		});
	}
}]); 