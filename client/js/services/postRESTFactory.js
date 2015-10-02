app.factory('PostRESTServices',['$resource',function ($resource) {
	return {
		queryPosts		: $resource('api/posts'),
		createPost		: $resource('api/posts'),
		getPostById		: $resource('api/posts/:postId',{postId:'@id'}),
		deletePost		: $resource('api/posts/:postId',{postId:'@id'}),
		updatePost		: $resource('api/posts/:postId',{postId:'@id'},
			{'update': { method:'PUT' }})
	};
}]);