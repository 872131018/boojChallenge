function findSubstring()
{
	console.log('about to start the search!');

	var stringToSearch = $('#stringToSearch').val();
	var subString = $('#subString').val();

	if(stringToSearch == '' || subString == '')
	{
		$('#messageCenter').html('You must enter a string in both inputs!');
		return false;
	}

	//break the string into atomic peaces to deal with
	var splitStringToSearch = stringToSearch.split('');
	var splitSubString = subString.split('');

	//find the minimum window and set up search
	for(i = 0; i <= stringToSearch.length - subString.length; i++)
	{
		//build a substring to check
		var subArray = splitStringToSearch.slice(i, i + subString.length);

		//look for each character in the substring
		var foundCharacters = 0;
		for(currentCharacter in splitSubString)
		{
			if(subArray.indexOf(splitSubString[currentCharacter]) != -1)
			{
				//found a character
				foundCharacters++;
			}
			if(foundCharacters == subString.length)
			{
				//found all the characters in this window!
				console.log(subArray.join(''));
			}
		}
	}
}