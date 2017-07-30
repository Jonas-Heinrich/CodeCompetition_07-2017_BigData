var _PlayerDataInterpreter = function()
{
	this.GetPlayerDataCount = function()															// Get the number of players in the player array
	{
		return DataCollection.PlayerDataSection.PlayerStats.length;
	}
	
	this.GetPlayerID = function(index)																// Get the playerID at the index
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][0];
	}
	
	this.GetRacesAccepted = function(index)															// Get the number of races the player at the index accepted
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][1];
	}
	
	this.GetRacesDeclined = function(index)															// Get the number of races the player at the index declined
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][2];
	}
	
	this.GetChallengerCount = function(index)														// Get the number of races the player at the index was a challenger
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][3];
	}
	
	this.GetOpponentCount = function(index)															// Get number of races the player at the index was an opponent
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][4];
	}
	
	this.GetEnemys = function(index)																// Get all enemies  the player at the index had
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][5];
	}
	
	this.GetEnemyEncounters = function(index)														// Get the numbers of times he encountered them
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][6];
	}
	
	this.GetEnemyTimeEncounters = function(index)													// Get the times it happened
	{
		var values = DataCollection.PlayerDataSection.PlayerStats[index][7];						// Get the actual data from the array
		var result = [];																			// Accumulate the result strings
		
		for(var i = 0; i < values.length; i++)														// Iterate each entry
		{
			var str = "";																			// Accumulate the string
			
			for(var x = 0; x < values[i].length; x++)												// Iterate each sub entry
			{
				str += DataCollection.PlayerDataSection.StringRepo[values[i][x]];					// Build the string from the string repo
				if(x < values[i].length - 1)														// If it is not the last component add a space
					str += " ";
			}
			result.push(str);																		// Add the string to the result
		}
		
		return result;
	}
	
	this.GetWeather = function(index)																// Get the weather type counts the player at the index experienced
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][8];
	}
	
	this.GetRacesWon = function(index)																// Get the number of races the player at the index won
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][9];
	}
	
	this.GetRacesLost = function(index)																// Get the number of races the player at the index lost
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][10];
	}
	
	this.GetELO = function(index)																	// Get his ELO
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][11];
	}
	
	this.GetTotalFuel = function(index)																// Get his total fuel
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][12];
	}
	
	this.GetTotalMoney = function(index)															// Get the total money
	{
		return DataCollection.PlayerDataSection.PlayerStats[index][13];
	}
	
	this.FindRealPlayerIndex = function(realID)														// Find the real player index based on the id
	{
		for(var i = 0; i < DataCollection.PlayerDataSection.PlayerStats.length; i++)				// Iterate each player
			if(DataCollection.PlayerDataSection.PlayerStats[i][0] == realID)						// If the id matches return the index
				return i;
		return undefined;																			// Return not found
	}
	
	this.GetNextPlayerIndex = function(realID)														// Get the next player based on the id
	{
		for(var i = 0; i < DataCollection.PlayerDataSection.PlayerStats.length; i++)				// Iterate each player
			if(DataCollection.PlayerDataSection.PlayerStats[i][0] > realID)							// If the id of the player is bigger than the given id return it
				return i;
		return DataCollection.PlayerDataSection.PlayerStats.length - 1;								// Return the last index to avoid overflow of index
	}
	
	this.GetPreviousPlayerIndex = function(realID)													// Get the previous player based on the id
	{
		for(var i = DataCollection.PlayerDataSection.PlayerStats.length - 1; i > 0; i--)			// Iterate each player
			if(DataCollection.PlayerDataSection.PlayerStats[i][0] < realID)                         // If the id of the player is smaller than the given id return it
				return i;                                                                           
		return 0;                                                                                   // Return 0 to avoid overflow of index
	}
}

var PlayerDataInterpreter = new _PlayerDataInterpreter();