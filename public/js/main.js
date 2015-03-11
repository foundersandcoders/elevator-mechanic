$(document).ready(function(){

	$(document).on('click', ".save-button" ,function(){
		postBlog();
	});

	function postBlog(){
		$.ajax({
        	type: "POST",
        	url: "http://localhost:4000/",
        	async: false,
		 	success: function(text) {
        		console.log("res" + text);
        	}
    	});
	}





//end of jQuery
}