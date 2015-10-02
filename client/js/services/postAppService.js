app.service('PostAppService',function () {
	var postArray = [];
	this.getPostArray = function (){
		return postArray;
	};
	this.setPostArray = function (){
		postArray.length = 0;
	}
})