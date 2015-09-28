$( document ).ready(function() 
{
	console.log( "ready!" );
	$('#subStringSearchStart').on('click', 
		function()
		{
			findSubstring();
		});
	$('#equalizeStart').on('click', 
		function()
		{
			findEquilibriumIndices();
		});
	$('#distinctValuesStart').on('click', 
		function()
		{
			findDistinctValues();
		});
});