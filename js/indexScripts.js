function findSubstring()
{
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
	for(i = 0; i <= stringToSearch.length; i++)
	{
		//build a substring to check
		var subArray = splitStringToSearch.slice(i, i + subString.length);

		//skip the last few checks because they are too small
		if(subArray.length < subString.length)
		{
			continue;
		}

		//look for each character in the substring
		//console.log(subArray);
		var foundCharacters = 0;
		for(currentCharacter in splitSubString)
		{
			if(subArray.indexOf(splitSubString[currentCharacter]) != -1)
			{
				//found a character
				foundCharacters++;
			}
		}
		if(foundCharacters == subString.length)
		{
			//found all the characters in this window!
			$('#messageCenter').html('Sweet! I found the string! The window is ' + subArray.join(''));
			return true;
		}
		foundCharacters = 0;
	}

	//if it gets this far the letters aren't together and the window needs to grow
	var windowLengthModifier = 1;
	var currentSmallestWindow = '';
	for(i = 0; i <= stringToSearch.length; i++)
	{
		for(j = 0; j < stringToSearch.length; j++)
		{
			//build a substring to check
			var subArray = splitStringToSearch.slice(i, j + subString.length + windowLengthModifier);
			
			//skip the last few checks because they are too small
			if(subArray.length < subString.length + windowLengthModifier)
			{
				continue;
			}

			console.log(subArray);
			//look for each character in the substring
			var foundCharacters = 0;
			for(currentCharacter in splitSubString)
			{
				if(subArray.indexOf(splitSubString[currentCharacter]) != -1)
				{
					//found a character
					foundCharacters++;
				}
			}
			if(foundCharacters == subString.length)
			{
				//found all the characters in this window!
				if(currentSmallestWindow == '')
				{
					currentSmallestWindow = subArray.join('');
				}
				else if(currentSmallestWindow.length > subArray.join('').length)
				{
					currentSmallestWindow = subArray.join('');
				}
				//return true;
			}
			foundCharacters = 0;
			windowLengthModifier++;
		}
		windowLengthModifier = 0;
	}
	//finished the search so post the result
	if(currentSmallestWindow == '')
	{
		$('#messageCenter').html('Prepare for doom!  I didn\'t find the string!');
	}
	else
	{
		$('#messageCenter').html('Sweet! I found the string! The window is ' + currentSmallestWindow);
	}
}