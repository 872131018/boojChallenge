$( document ).ready(function() 
{
	console.log( "ready!" );
	$('#subStringSearchStart').on('click', 
		function()
		{
			findSubstring();
		});
});