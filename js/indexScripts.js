function findSubstring()
{
	/*
	//first get the input from the user and quick error check
	var stringToSearch = $('#stringToSearch').val();
	var subString = $('#subString').val();

	if(stringToSearch == '' || subString == '')
	{
		$('#messageCenter').html('Hold Up! You must enter a string in both inputs!');
		return false;
	}

	//break the string into atomic peaces to deal with
	var splitStringToSearch = stringToSearch.split('');
	var splitSubString = subString.split('');

	//create a table of what is needed
	var toFind = [];
	var hasFound = [];
	for(i = 0; i < 256; i++)
	{
		toFind[i] = 0;
		hasFound[i] = 0;
	}
	for(index = 0; index < splitStringToSearch.length; index++)
	{
		toFind[splitStringToSearch[i]]++;
	}

	console.log(toFind);
	//start to look for the window
	var count = 0;
	var minWindowLen = Number.MAX_VALUE;
	var windowCorners = {};
	for(windowStart = 0, windowEnd = 0; windowEnd < splitSubString.length; windowEnd++)
	{
		if(toFind[splitSubString[windowEnd]] == 0)
		{
			continue;
		}
		hasFound[splitSubString[windowEnd]]++;
		if(hasFound[splitSubString[windowEnd]] <= toFind[splitSubString[windowEnd]])
		{
			count++;
		}

		if(count == splitStringToSearch.length)
		{
			while(toFind[splitSubString[windowStart]] == 0 || hasFound[splitSubString[windowStart]] > toFind[splitSubString[windowStart]]) 
			{
        		if(hasFound[splitSubString[windowStart]] > toFind[splitSubString[windowStart]])
        		{
        			hasFound[splitSubString[windowStart]]--;
        		}
        		windowStart++;
      		}

      		// update minWindow if a minimum length is met
      		var windowLen = windowEnd - windowStart + 1;
      		if(windowLen < minWindowLen)
      		{
				windowCorners['begin'] = windowStart;
				windowCorners['end'] = windowEnd;
				console.log(windowCorners);
				minWindowLen = windowLen;
			}
		}
	}

	var finalWindow = splitStringToSearch.slice(windowCorners['begin'], windowCorners['end']);
	//console.log(finalWindow);
	$('#messageCenter').html('Sweet! Window found! The window is ' + finalWindow.join(''));
	*/
	/*
	var stringToSearch = $('#stringToSearch').val();
	var subString = $('#subString').val();

	if(stringToSearch == '' || subString == '')
	{
		$('#messageCenter').html('Hold Up! You must enter a string in both inputs!');
		return false;
	}

	//break the string into atomic peaces to deal with
	var splitStringToSearch = stringToSearch.split('');
	var splitSubString = subString.split('');

	//use an array of indexes to store the window
	var windowArray = [];
	for(currentIndex in splitStringToSearch)
	{
		for(currentJndex in splitSubString)
		{
			if(splitSubString[currentJndex] == splitStringToSearch[currentIndex])
			{
				//make sure matches get pushed as index ints
				windowArray.push(parseInt(currentIndex));
				break;
			}
		}
	}
	console.log(windowArray);
	console.log(splitSubString);

	//find the smallest window
	//if all characters were found then there is a window
	if(windowArray.length == splitSubString.length)
	{
		console.log('here');
		//special case, only 1 string in substring
		if(windowArray.length == 1)
		{
			var finalWindow = splitStringToSearch[windowArray[0]];
			$('#messageCenter').html('Sweet! Window found! The window is ' + finalWindow);
		}
		else
		{
			var finalWindow = splitStringToSearch.slice(windowArray[0], windowArray[windowArray.length - 1] + 1);
			$('#messageCenter').html('Sweet! Window found! The window is ' + finalWindow.join(''));

		}
		return true;
	}
	*/

	//first get the input from the user and quick error check
	var stringToSearch = $('#stringToSearch').val();
	var subString = $('#subString').val();

	if(stringToSearch == '' || subString == '')
	{
		$('#messageCenter').html('Hold Up! You must enter a string in both inputs!');
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
			$('#messageCenter').html('Sweet! Window found! The window is ' + subArray.join(''));
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
		$('#messageCenter').html('Prepare for doom!  No window found!');
	}
	else
	{
		$('#messageCenter').html('Sweet! Window found! The window is ' + currentSmallestWindow);
	}
}

function findEquilibriumIndices()
{
	//first thing is to take the input and create an array
	var arrayToEqualize = $('#arrayToEqualize').val();
	if(arrayToEqualize == '')
	{
		$('#messageCenter2').html('Stop right there! You must put in a CSV string!');
		return false;
	}
	arrayToEqualize = arrayToEqualize.split(',');

	//start by getting the sum of the array
	var arraySum = 0;
	for(currentIndex in arrayToEqualize)
	{
		//ensure that the array is treated as a number and not a char
		arrayToEqualize[currentIndex] = parseInt(arrayToEqualize[currentIndex]);

		arraySum += arrayToEqualize[currentIndex];
	}

	//iterate through the elements looking for the 0 sums
	var leftSum = 0;
	var rightSum = arraySum;
	var equilibriumIndexArray = [];
	for(currentIndex in arrayToEqualize)
	{
		//right sum is left sum without the index value
		rightSum -= arrayToEqualize[currentIndex];
		if(leftSum == rightSum)
		{
			//push the result to the final array
			equilibriumIndexArray.push(currentIndex);
		}
		//left sum takes the index value
		leftSum += arrayToEqualize[currentIndex];

	}

	if(equilibriumIndexArray.length == 0)
	{
		//nothing was found so push -1 onto the results
		equilibriumIndexArray.push(-1);
		$('#messageCenter2').html('Major Bummer! There weren\'t any indices found! Returning -1');
		return -1;
	}

	//show the indexes
	var finalMessage = 'Check it! Found ';
	for(currentIndex in equilibriumIndexArray)
	{
		if(currentIndex != equilibriumIndexArray.length - 1)
		{
			finalMessage += ' ' + equilibriumIndexArray[currentIndex] + ',';
		}
		else
		{
			finalMessage += ' and ' + equilibriumIndexArray[currentIndex];
		}
	}
	finalMessage += ' to be equilibrium indexes!';
	$('#messageCenter2').html(finalMessage);

}

function findDistinctValues()
{
	//first thing is to take the input and create an array
	var arrayToSort = $('#arrayToSort').val();
	if(arrayToSort == '')
	{
		$('#messageCenter3').html('Stop right there! You must put in a CSV string!');
		return false;
	}
	arrayToSort = arrayToSort.split(',');

	//begin the heap sort of the array
	heapSort(arrayToSort);
	console.log(arrayToSort);
	//count the distinct values
	var unique = 1;
	for(i = 0; i < arrayToSort.length - 1; i++)
	{
		if(arrayToSort[i] != arrayToSort[i + 1])
		{
			unique++;
		}
		$('#messageCenter3').html('Outrageous! There are ' + unique + ' unique values!');
	}
}

function heapSort(array)
{
	var middle = Math.floor((array.length / 2) - 1);
	while (middle >= 0)
	{
		siftDown(array, middle, array.length);
		middle--;
	}
	end = array.length - 1;
	while(end > 0) 
	{
		//quick element stop
		var t = array[0];
		array[0] = array[end];
		array[end] = t;

		siftDown(array, 0, end);
		end--;
	}
}

function siftDown(array, index, max)
{
	var largeIndex, c1, c2;
	while(index < max)
	{
		largeIndex = index;
		c1 = (2 * index) + 1;
		c2 = c1 + 1;
		if(c1 < max && array[c1] > array[largeIndex])
		{
			largeIndex = c1;
		}
		if(c2 < max && array[c2] > array[largeIndex])
		{
			largeIndex = c2;
		}
		if(largeIndex == index) 
		{
			return;
		}

		//quick element swap
		var t = array[index];
		array[index] = array[largeIndex];
		array[largeIndex] = t;
		index = largeIndex;
	}
}