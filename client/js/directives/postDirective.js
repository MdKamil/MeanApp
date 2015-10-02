app.directive('create',['PostRESTServices','$resource','$location',
	function (PostRESTServices,$resource,$location) {
	return {
		replace	:true,
		restrict :'E',
		template:'<div class="remove">\
					<h3 style="position:relative;padding-top:15px;">{{posts.postTitle}}</h3>\
					<a class="options" href="#/viewPost/{{posts._id}}">View</a>\
					<a class="options" href="#/editPost/{{posts._id}}">Edit</a>\
					<button class="btn btn-primary" ng-click="deletePost(posts._id,$event)">Delete</button></div>',
		link : function (scope,element,attrs,ctrl){
			element.css({
				'background-color' : '#D8DCDC',
				'height' : '170px',
				'text-align' : 'center',
				'border-radius' : '2px'
			});

			scope.deletePost = function (id){
				var target = angular.element(event.target).parent().parent();
				target.remove();
				var DeletePost = PostRESTServices.deletePost;
				DeletePost.delete({postId:id},function (success){
					console.log("Successfully deleted");
				},function (error){
					console.log("Error occured while deleting post...");
				});
			};
		}
	}
}]);