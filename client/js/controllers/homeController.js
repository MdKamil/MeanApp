app.controller("homeCtrl",['PostAppService','PostRESTServices','$scope',
	function (PostAppService,PostRESTServices,$scope){
	var AllPosts = PostRESTServices.queryPosts;
	AllPosts.query(function (allPosts){
		console.log("Allposts: ",allPosts);
		$scope.postsArray = allPosts;
	},function (error){
		console.log("Error while retrieving posts....");
	});
}]);