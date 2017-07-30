//
//	Helper
//

function ProcessData()																					// Gets called by main.js when DataCollection.js was loaded
{
	if(DataLoaded)
	{
		setTimeout(ProcessRawData, 100);																// Call the Raw Data Processing asyncally
		setTimeout(ProcessGeneralData, 100);                                                            // Call the General Data Processing asyncally
		setTimeout(ProcessTrackData, 100);                                                              // Call the Track Data Processing asyncally
		setTimeout(ProcessWeatherData, 100);                                                            // Call the Weather Data Processing asyncally
	}
}

function ProcessPlayerDataWrapper()																		// Gets called by main.js when PlayerDataCollection.js was loaded
{
	if(PlayerDataLoaded)
		setTimeout(ProcessPlayerData, 0);																// Call the Player Data Processing asyncally
}


//
//	Raw Data
//

function ProcessRawData()																				// Displays all the data in the raw data section
{
	var table = document.getElementById("Table_RawData");												// Get Data
	var html = "";																						// Accumulate the html
	for(var i = 0; i < DataCollection.RawDataSection.length; i++)										// Iterate each data item
	{	
		html += "<tr>";																					// Build the html of the table
		for(var y = 0; y < DataCollection.RawDataSection[i].length; y++)
			html += "<th>" + DataCollection.RawDataSection[i][y] + "</th>";
		html += "</tr>";
	}
	table.innerHTML += html;																			// Add html to table
}

//
//	General Data
//

function ProcessGeneralData()																			// Distributes all General Data functions
{	
	ProcessGDTotalEntries();
	ProcessGDTotalRaces();
	ProcessGDTotalUniqueDrivers();
	ProcessGDTotalFuel();
	ProcessGDTotalMoney();
	ProcessGDActivity();
}

function ProcessGDTotalEntries()																		// Displays the total entries count as an image collection
{
	var image = "DocumentImage";
	var string = DataCollection.GeneralDataSection.Entries.toLocaleString() + Language.GetRepo("GD_ImageCollection_Entries");
	OutputImageCollection(0, DataCollection.GeneralDataSection.Entries, string, image, 1000);	
}

function ProcessGDTotalRaces()																			// Displays the total races count as an image collection
{	
	var image = "FlagImage";
	var string = DataCollection.GeneralDataSection.Races.toLocaleString() + Language.GetRepo("GD_ImageCollection_Races");
	OutputImageCollection(1, DataCollection.GeneralDataSection.Races, string, image, 1000);
}

function ProcessGDTotalUniqueDrivers()																	// Displays the unique drivers count as an image collection
{
	var image = "DriverImage";
	var string = DataCollection.GeneralDataSection.Drivers.toLocaleString() + Language.GetRepo("GD_ImageCollection_Driver");
	OutputImageCollection(2, DataCollection.GeneralDataSection.Drivers, string, image, 100);
}

function ProcessGDTotalFuel()																			// Displays the total fuel consumption as an image collection
{	
	var image = "FuelImage";
	var string = DataCollection.GeneralDataSection.Fuel.toLocaleString() + Language.GetRepo("GD_ImageCollection_Fuel");
	OutputImageCollection(3, DataCollection.GeneralDataSection.Fuel, string, image, 10000);
}

function ProcessGDTotalMoney()																			// Displays the total money as an image collection
{
	var image = "MoneyImage";
	var string = DataCollection.GeneralDataSection.Money.toLocaleString() + Language.GetRepo("GD_ImageCollection_Money");	
	OutputImageCollection(4, DataCollection.GeneralDataSection.Money, string, image, 10000000);
}

function ProcessGDActivity()																			// Displays the overall activity as a chart
{	
	GenerateLineChart																					//  Build Chart
	(
		"ActivityChart", 
		[DataCollection.GeneralDataSection.Activity.ActivityCount,], 
		DataCollection.GeneralDataSection.Activity.Labels, 
		[Language.GetRepo("GD_ImageCollection_Activity"),], 
		['rgba(76,175,80,0.2)'], 
		['rgba(76,175,80,1)']
	);
}

//
//	Track Data
//

function ProcessTrackData()																				// Distributes all Track Data functions
{
	ProcessTDMostPlayedTrack();
	ProcessTDTrackComposition();
	ProcessTDFuelConsumption();
	ProcessTDMoneyPlacement()
}

function ProcessTDMostPlayedTrack()																		// Output the placement of the most played tracks
{
	var values = [];
	for(var i = 0; i < DataCollection.TrackDataSection.MostPlayedTracks.length; i++)					// Iterate every track
		values.push(Language.GetRepo("TD_Placement") + 													// Add it to the values
		DataCollection.TrackDataSection.MostPlayedTracks[i]);
	
	OutputPlacement(0, values);																			// Build the placement
}

function ProcessTDTrackComposition()																	// Outputs the track composition with different charts
{	
	labels = [];																						// Will contain all the labels
	
	for(var i = 3; i < DataCollection.TrackDataSection.TrackData.length; i++)							// Go through every track
		labels.push(Language.GetRepo("TD_Track") + " " + i);											// Add its identifier
	
	GenerateLineChart																					// Build the chart
	(
		"TrackTimeDevelopmentChart", 
		DataCollection.TrackDataSection.TimedTrackData.slice(3, DataCollection.TrackDataSection.TimedTrackData.length), 
		DataCollection.TrackDataSection.TimedTrackLabels, 
		labels
	);	
	
	var dataset =  																						// Construct the dataset from the DataCollection
	[{
		label: "",
		data: DataCollection.TrackDataSection.TrackData.slice(3, DataCollection.TrackDataSection.TrackData.length),
		backgroundColor: BorderColor,
		borderWidth: 1
	}];
		
	GenerateBarChart("TrackCountChart", dataset, labels);												// Build a Bar Chart from that data
	GeneratePieChart("TrackCompositionChart", dataset, labels);											// Build a Pie Chart from that data
}

function ProcessTDFuelConsumption()																		// Outputs the fuel consumption by track
{	
	var labels = [];
	
	for(var i = 3; i < DataCollection.TrackDataSection.FuelData.Averages.length; i++)					// Iterate the tracks and build their identifiers
		labels.push(Language.GetRepo("TD_Track") + " " + i);
	
	var average = Math.round(DataCollection.TrackDataSection.FuelData.Average * 100) / 100;				// Calculate the average to 2 decimal places accuracy

	var averageDataset = [];
	for(var i = 0; i < DataCollection.TrackDataSection.FuelData.Averages.length - 3; i++)				// Calculate the average for every track
		averageDataset.push(average);
	
	var dataset =  																						// Build the dataset with both subdatasets
	[{
		label: Language.GetRepo("TD_FuelConsumption"),
		data: DataCollection.TrackDataSection.FuelData.Averages.slice(3, DataCollection.TrackDataSection.FuelData.Averages.length),
		backgroundColor: BorderColor,
		borderWidth: 1
	}, {
          label: Language.GetRepo("TD_Average"),
          data: averageDataset,

          type: 'line'
    }];
	
	GenerateBarChart("TrackFuelChart", dataset, labels);												// Build the Bar Chart
}

function ProcessTDMoneyPlacement()																		// Outputs the average money placed for every track
{	
	for(var i = 0; i < DataCollection.TrackDataSection.MoneyData.Average.length; i++)					// Build the labels
		labels.push(Language.GetRepo("TD_Track") + " " + i);
	
	var average = Math.round(DataCollection.TrackDataSection.MoneyData.Average * 100) / 100;			// Calculate the total average

	var averageDataset = [];
	for(var i = 0; i < DataCollection.TrackDataSection.MoneyData.Averages.length - 3; i++)				// Iterate the tracks
		averageDataset.push(average);																	// Push the average several times to get a line
	
	var dataset =  																						// Build the dataset
	[{
		label: Language.GetRepo("TD_MoneyPlacement"),
		data: DataCollection.TrackDataSection.MoneyData.Averages.slice(3, DataCollection.TrackDataSection.MoneyData.Averages.length),
		backgroundColor: BorderColor,
		borderWidth: 1
	}, 
	{
        label: Language.GetRepo("TD_Average"),
        data: averageDataset,
        type: 'line'
    }];
	
	GenerateBarChart("TrackMoneyChart", dataset, labels);												// Build a bar chart from it
}

//
//	Weather Data
//

function ProcessWeatherData()																			// Distributes all Weather data functions
{
	ProcessWDDistribution();
	ProcessWDTracks();
	ProcessWDPredictionCorrectness();
}

function ProcessWDDistribution()																		// Outputs the overall distribution
{
	var dataset =  																						// Build the dataset
	[{
		label: "",
		data: DataCollection.WeatherDataSection.WeatherDistribution,
		backgroundColor: 
		[
			"rgba(255,		235,	59 ,	1)",
			"rgba(3,		169,	244,	1)",
			"rgba(48,		63,		159,	1)",
			"rgba(238,		238,	238,	1)",
		],
		borderWidth: 1
	}];
	
	GeneratePieChart("WeatherDistributionChart", dataset, ["Sunny", "Rainy", "Thundery", "Snowy"]);		// Generate a bar chart from it
}

function ProcessWDTracks()																				// Outputs the weather data for every track
{
	var html = 	'<tr><td class="WeatherTrackTableTD">TrackID</td><td class="WeatherTrackTableTD">Sunny'+// Set the html for the table head
				'</td><td class="WeatherTrackTableTD">Rainy</td><td class="WeatherTrackTableTD">' + 
				'Thundery</td><td class="WeatherTrackTableTD">Snowy</td></tr>';
	
	for(var i = 3; i < DataCollection.WeatherDataSection.TrackWeather.length; i++)						// Iterate each track, build the html for the table
	{
		html += "<tr>"
		html += "<td>" + i + "</td>";																	// Include the index
		
		var sum = 0;
		for(var x = 0; x < DataCollection.WeatherDataSection.TrackWeather[i].length; x++)				// Sum up the occurences of each type of weather
			sum  += DataCollection.WeatherDataSection.TrackWeather[i][x];
		
		for(var x = 0; x < DataCollection.WeatherDataSection.TrackWeather[i].length; x++)				// Calculate the percent for every weather type
			html += "<td>" + Math.round(DataCollection.WeatherDataSection.TrackWeather[i][x] / sum * 10000) / 100 + "%</td>";
		html += "</tr>"
	}
	
	document.getElementById("WeatherTrackTable").innerHTML = html;										// Set the table
}

function ProcessWDPredictionCorrectness()																// Outputs the Weather Prediction correctness
{
	document.getElementById("WeatherDataAverageDeviation").innerHTML =									// Set average deviation to the value from DataCollection
	DataCollection.WeatherDataSection.WeatherAverageDeviation + "%";
	
	var html = 	'<tr><td class="WeatherTrackTableTD">TrackID</td><td class="WeatherTrackTableTD">Sunny'+// Set the html for the table head
				'</td><td class="WeatherTrackTableTD">Rainy</td><td class="WeatherTrackTableTD">' + 
				'Thundery</td><td class="WeatherTrackTableTD">Snowy</td></tr>';
	
	
	for(var x = 0; x < DataCollection.WeatherDataSection.WeatherTypeAverageDeviation.length; x++)		// Iterate every weather type deviation
		html += "<td>" +  DataCollection.WeatherDataSection.WeatherTypeAverageDeviation[x] + "%</td>";	// Build the html
	html += "<tr>"
	
	document.getElementById("WeatherTypeAverageDeviation").innerHTML = html;							// Update the table
}

//
//	Player Data
//

function ProcessPlayerData()																			// Distributes all Player Data functions
{
	ProcessPDGeneralPlayerStatistics();
	ProcessPDTopPlayers();
	ProcessPDMostExperienced();
	ProcessPDMostEconomic();
	ProcessPDDetailedPlayerAnalysisPlayerData(0);
	ProcessPDRacePrediction();
}

function ProcessPDGeneralPlayerStatistics()																// Outputs General Player statistics
{
	// Average Number of Races
	var image = "FlagImage";																			// Create image collection of the average number of races a driver drove
	var string = DataCollection.PlayerDataSection.GeneralStatistics.AvgNumberRaces + " Races"
		OutputImageCollection(5, DataCollection.PlayerDataSection.GeneralStatistics.AvgNumberRaces, string, image, 1);
	
	// Average ELO
	document.getElementById("PlayerDataContentELO").innerHTML = 										// Output the average ELO (should be 0)
		DataCollection.PlayerDataSection.GeneralStatistics.AvgELO + " ELO";
	
	// Acceptence Rate
	var dataset =  																						// Build the dataset for the acceptance rate
	[{
		label: "",
		data: [100 - DataCollection.PlayerDataSection.GeneralStatistics.AvgAcceptanceRate, DataCollection.PlayerDataSection.GeneralStatistics.AvgAcceptanceRate],
		backgroundColor: 
		[
			"rgba(244,	67,		54,		1)",
			"rgba(76,	175,	80 ,	1)",
		],
		borderWidth: 1
	}];
	
	GeneratePieChart("PlayerAcceptanceRateChart",														// Build a Pie chart from it
		dataset, [Language.GetRepo("PD_NotAccepted"), Language.GetRepo("PD_Accepted")]);
	
	// Challenger Win Rate
	var dataset =  																						// Build the dataset for the challenger win rate
	[{
		label: "",
		data: [DataCollection.PlayerDataSection.GeneralStatistics.ChallengerWinRate[0], DataCollection.PlayerDataSection.GeneralStatistics.ChallengerWinRate[1]],
		backgroundColor: 
		[
			"rgba(3,	169,	244,	1)",
			"rgba(244,	67,		54,		1)",
		],
		borderWidth: 1
	}];
	
	GeneratePieChart("PlayerChallengerWinRateChart", dataset, [Language.GetRepo("PD_Challenger"), 		// Build a Pie Chart from it
		Language.GetRepo("PD_Opponent")]);	
}

function ProcessPDTopPlayers()																			// Output the top players
{
	var playerIndexes = [];																				// Accumulates the 10 top players
	
	for(var i = 0; i < PlayerDataInterpreter.GetPlayerDataCount(); i++)									// Iterate all players
	{		
		var insertIndex = 0;																			// Get the insert index -> to sort
		for(var insertIndex = 0; insertIndex < playerIndexes.length; insertIndex++)
			if(PlayerDataInterpreter.GetELO(i) > PlayerDataInterpreter.GetELO(playerIndexes[insertIndex]))
				break;
		
		if(insertIndex < 10)																			// If index is smaller 10, does fit in list
		{
			if(playerIndexes.length != 10)																// If lost is not full, insert it
				playerIndexes.splice(insertIndex, 0, i);
			else																						// Else insert it and remove last index
			{	
				playerIndexes.splice(insertIndex, 0, i);
				playerIndexes = playerIndexes.slice(0, 10);
			}
		}
	}
	
	var values = [];																					// Get the top 3 players
	
	for(var i = 0; i < 3; i++)	
		values.push(Language.GetRepo("PD_Player") + " " + 												// Build their identifier
		PlayerDataInterpreter.GetPlayerID(playerIndexes[i]) + " | " + 
		PlayerDataInterpreter.GetELO(playerIndexes[i]) + " ELO");
	
	OutputPlacement(1, values);																			// Output the placement of the best 3 players
	document.getElementById("PlayerDataTable_TopPlayers").innerHTML = 									// Generate a table for a overview of the best 10 players
	GeneratePlayerDataTable(playerIndexes);
}

function ProcessPDMostExperienced()																		// Output the most experienced players (by number of races)
{
	var playerIndexes = [];																				// Accumulates the 10 top players
	
	for(var i = 0; i < PlayerDataInterpreter.GetPlayerDataCount(); i++)                                 // Iterate all players
	{		                                                                                            
		var insertIndex = 0;                                                                            // Get the insert index -> to sort
		for(var insertIndex = 0; insertIndex < playerIndexes.length; insertIndex++)
			if(PlayerDataInterpreter.GetRacesAccepted(i) > PlayerDataInterpreter.GetRacesAccepted(playerIndexes[insertIndex]))
				break;
		
		if(insertIndex < 10)																			// If index is smaller 10, does fit in list
		{                                                                                               
			if(playerIndexes.length != 10)                                                              // If lost is not full, insert it
				playerIndexes.splice(insertIndex, 0, i);                                                
			else                                                                                        // Else insert it and remove last index
			{
				playerIndexes.splice(insertIndex, 0, i);
				playerIndexes = playerIndexes.slice(0, 10);
			}
		}
	}
	
	var values = [];																					// Get the top 3 players
	
	for(var i = 0; i < 3; i++)                                                                          
		values.push(Language.GetRepo("PD_Player") + " " +                                               // Build their identifier
		PlayerDataInterpreter.GetPlayerID(playerIndexes[i]) + " | " +
		PlayerDataInterpreter.GetRacesAccepted(playerIndexes[i]) + " Races");
		
	OutputPlacement(2, values);                                                                         // Output the placement of the best 3 players
	document.getElementById("PlayerDataTable_ExperiencedPlayers").innerHTML =                           // Generate a table for a overview of the best 10 players
	GeneratePlayerDataTable(playerIndexes);
}

function ProcessPDMostEconomic()																		// Output the most economic players (by amount of fuel per race)
{                                                                                                       
	var playerIndexes = [];                                                                             // Accumulates the 10 top players
	
	for(var i = 0; i < PlayerDataInterpreter.GetPlayerDataCount(); i++)                                 // Iterate all players
	{                                                                                                   
		if(PlayerDataInterpreter.GetRacesAccepted(i) < 25)												// Limit the  players to "regular" players, not one timers
			continue;

		var insertIndex = 0;                                              								// Get the insert index -> to sort
		for(var insertIndex = 0; insertIndex < playerIndexes.length; insertIndex++)
			if(	PlayerDataInterpreter.GetTotalFuel(i) / PlayerDataInterpreter.GetRacesAccepted(i) <
				PlayerDataInterpreter.GetTotalFuel(playerIndexes[insertIndex]) / PlayerDataInterpreter.GetRacesAccepted(playerIndexes[insertIndex]))
				break;
		
		if(insertIndex < 10)																			// If index is smaller 10, does fit in list
		{                                                                                               
			if(playerIndexes.length != 10)                                                              // If lost is not full, insert it
				playerIndexes.splice(insertIndex, 0, i);                                                
			else                                                                                        // Else insert it and remove last index
			{
				playerIndexes.splice(insertIndex, 0, i);
				playerIndexes = playerIndexes.slice(0, 10);
			}
		}
	}
	
	var values = [];																					// Get the top 3 players
	
	for(var i = 0; i < 3; i++)                                                                          
		values.push                                                                                     // Build their identifier
		(                                                                                               
			Language.GetRepo("PD_Player") + " " + PlayerDataInterpreter.GetPlayerID(playerIndexes[i])   
			+ " | " + Math.round(PlayerDataInterpreter.GetTotalFuel(playerIndexes[i]) /                 
			PlayerDataInterpreter.GetRacesAccepted(playerIndexes[i]) * 100) / 100 + " l/race"
		);         																						
		
	OutputPlacement(3, values);																			// Output the placement of the best 3 players
	document.getElementById("PlayerDataTable_EconomicPlayers").innerHTML =                              // Generate a table for a overview of the best 10 players
	GeneratePlayerDataTable(playerIndexes);
}

function ProcessPDDetailedPlayerAnalysisPlayerData(groupIndex)											// Output a detailed player analysis
{	
	if(INPUT_CHANGING | !PlayerDataLoaded | groupIndex == undefined)									// Do not fire when input is changed by code
		return;
	var playerID = document.getElementsByClassName("DPA_PlayerSelector")[groupIndex].value;				// Get the current playerID
	var index = PlayerDataInterpreter.FindRealPlayerIndex(playerID);									// Get the index of that player
	
	document.getElementById("DPAPlayerID").innerHTML = Language.GetRepo("PD_Player") + " " + playerID;	// Set the title (Player + playerID)
	
	// Player Win Rate
	var winDataset = [];																				// Accumulate the player win rate
	
	var longActivityDataset = [];																		// Accumulate the activity of the player over a long period of time
	var longActivityLabels = DataCollection.GeneralDataSection.Activity.Labels;							// Get the labels for the time span
	
	var dailyActivityDataset = [];																		// Accumulate the daily activity of the player 
	var dailyActivityLabels = [];																		// Accumulate the identifiers for the time
	
	var enemyDataset = [];																				// Accumulate the enemys he played against
	var enemyLabels = [];																				// Accumulate the identifiers of those enemys
	
	if(index == undefined)																				// If Player does not exist
	{
		document.getElementById("DPAExists").innerHTML = Language.GetRepo("PD_DoesNotExist");			// Indicate that Player does not exist
		
		winDataset = 																					// Set default (empty) datasets for the charts
		[{
			label: "",
			data: [0, 0],
			backgroundColor: 
			[
				"rgba(255,255,255,1)",
				"rgba(255,255,255,1)",
			],
			borderWidth: 1
		}];
		
		longActivityDataset = 
		[{
			label: "",
			data: [0],
			backgroundColor: 
			[
				"rgba(255,255,255,1)",
				"rgba(255,255,255,1)",
			],
			borderWidth: 1
		}];
		
		dailyActivityDataset = 
		[{
			label: "",
			data: [0],
			backgroundColor: 
			[
				"rgba(255,255,255,1)",
				"rgba(255,255,255,1)",
			],
			borderWidth: 1
		}];
		
		dailyActivityLabels = [""];
		
		enemyDataset = 
		[{
			label: "",
			data: [0],
			backgroundColor: 
			[
				"rgba(255,255,255,1)",
				"rgba(255,255,255,1)",
			],
			borderWidth: 1
		}];
		
		enemyLabels = [""];
		document.getElementById("PlayerDataTableDetail").innerHTML = "";
	}
	else
	{
		document.getElementById("DPAExists").innerHTML = "";											// Delete the text (Does not exist)
		
		winDataset = 																					// Build the win rate dataset
		[{
			label: "",
			data: [PlayerDataInterpreter.GetRacesWon(index), PlayerDataInterpreter.GetRacesLost(index)],
			backgroundColor: 
			[
				"rgba(3,	169,	244,	1)",
				"rgba(244,	67,		54,		1)",
			],
			borderWidth: 1
		}];
	
		//
		//	Long Term Activity
		//
	
		for(var i = 0; i < longActivityLabels.length; i++)												// Init the activity dataset
			longActivityDataset.push(0);
		
		var data = PlayerDataInterpreter.GetEnemyTimeEncounters(index);									// Get the time encounters with the enemys
		for(var i = 0; i < longActivityLabels.length; i++)												// Iterate each enemy
		{			
			for(var y = 0; y < data.length; y++)														// Iterate each encounter with that enemy
				if(longActivityLabels[i] == (data[y].split(' ')[0].split('.').splice(1, 3)).join('.'))	// If the time matches long term activity label (e.g. 06.2012)
					longActivityDataset[i]++;																// Increase the activity
		}
		
		longActivityDataset = 																			// Build the complete dataset
		[{
			label: Language.GetRepo("PD_ActivityLong"),
			data: longActivityDataset,
			backgroundColor: BorderColor[0],
			borderWidth: 1
		}];
		
		//
		//	Daily Activity
		//
		
		for(var i = 0; i < 24; i++)																		// Iterate all 24h
		{
			dailyActivityLabels.push(i + ":00 - " + (i + 1) + ":00");									// Build the identifier for each hour
			dailyActivityDataset.push(0);																// Init the daily activity dataset
			for(var y = 0; y < data.length; y++)														// Iterate each enemy encounter
				if(i == parseInt(data[y].split(' ')[1].split(':')[0]))									// If times match up (e.g. 5 == 5)
					dailyActivityDataset[i]++;																// Increase the activity count
		}
		dailyActivityDataset = 																			// Build the complete dataset
		[{
			label: Language.GetRepo("PD_ActivityDaily"),
			data: dailyActivityDataset,
			backgroundColor: BorderColor[1],
			borderWidth: 1
		}];
		
		//
		//	Enemy Player
		//
		
		enemyDataset = PlayerDataInterpreter.GetEnemyEncounters(index);									// Get all enemy encounters
		var enemys = PlayerDataInterpreter.GetEnemys(index);											// Get the enemys of the player
		for(var i = 0; i < enemys.length; i++)															// Iterate each enemy
			enemyLabels.push(Language.GetRepo("PD_Player") + " " + enemys[i]);							// Build the identifier
		
		var list = [];																					// Contains both dataset and labels
		for (var j = 0; j < enemyDataset.length; j++) 
			list.push([enemyDataset[j], enemyLabels[j]]);
		list.sort(function(a, b) 																		// Sort the data so that the enemy with the highest encounters is first
		{
			return b[0] - a[0];
		});
		
		enemyDataset = [];
		enemyLabels = [];
		
		for(var i = 0; i < list.length && i < 100; i++)													// Separate the now sorted list into its origins
		{
			enemyDataset.push(list[i][0]);
			enemyLabels.push(list[i][1]);
		}
		
		enemyDataset = 																					// Build the dataset
		[{
			label: Language.GetRepo("PD_Enemy"),
			data: enemyDataset,
			backgroundColor: BorderColor[2],
			borderWidth: 1
		}];
		
		document.getElementById("PlayerDataTableDetail").innerHTML = GeneratePlayerDataTable([index]);	// Generate the datatable for the player
	}
	
	GeneratePieChart("PlayerWinRate", winDataset, [Language.GetRepo("PD_Won"), 							// Generate Charts based on the datasets and labels
	Language.GetRepo("PD_Lost")]);	
	
	GenerateBarChart("PlayerActivityLong", longActivityDataset, longActivityLabels);
	GenerateBarChart("PlayerActivityDaily", dailyActivityDataset, dailyActivityLabels);
	GenerateBarChart("PlayerEnemys", enemyDataset, enemyLabels);
}

function CalculateExpectedOutcome(playerIndexA, playerIndexB)											// Calculate the expected outcome of a match
{
	var res = 1 / (1 + Math.pow(10, (PlayerDataInterpreter.GetELO(playerIndexB) - PlayerDataInterpreter.GetELO(playerIndexA)) / 400))
	return [res * 100, 100 - res * 100];
}

function ProcessPDRacePrediction()																		// Outputs the predicted outcome of a race between two players
{
	if(INPUT_CHANGING | !PlayerDataLoaded)																// Block execution when data is entered by code
		return;
		
	var playerIDA = document.getElementsByClassName("DPA_PlayerSelector")[1].value;						// Get the id of player A			
	var playerIndexA = PlayerDataInterpreter.FindRealPlayerIndex(playerIDA);							// Get the index of player A
	
	var playerIDB = document.getElementsByClassName("DPA_PlayerSelector")[2].value;						// Get the id of player B	
	var playerIndexB = PlayerDataInterpreter.FindRealPlayerIndex(playerIDB);                            // Get the index of player B
	
	var dataset = [];																					// Accumulate the data
	
	if(playerIndexA == undefined || playerIndexB == undefined)											// If a players does not exist
	{
		document.getElementById("RacePredictionTable").innerHTML = "";
		document.getElementById("Winner").innerHTML = "";
			
		dataset = 																						// Enter a default data set
		[{
			label: "",
			data: [0],
			backgroundColor: 
			[
				"rgba(255,255,255,1)",
				"rgba(255,255,255,1)",
			],
			borderWidth: 1
		}];
	}
	else
	{
		document.getElementById("RacePredictionTable").innerHTML = 										// Generate an overview table for the two players
		GeneratePlayerDataTable([playerIndexA, playerIndexB]);
		
		var vals = CalculateExpectedOutcome(playerIndexA, playerIndexB);								// Calculate the expected outcome
		
		if(vals[0] > 50)
			document.getElementById("Winner").innerHTML = "Winner: " + 									// Display the winner
			Language.GetRepo("PD_Player") + "  #1";
		else if(vals[1] > 50)
			document.getElementById("Winner").innerHTML = "Winner: "  + 								// Display the winner
			Language.GetRepo("PD_Player") + " #2";
		else
			document.getElementById("Winner").innerHTML = Language.GetRepo("PD_Equal");					// Display equality
		
		dataset = 																						// Build the dataset
		[{
			label: "",
			data: vals,
			backgroundColor: 
			[
				"rgba(3,	169,	244,	1)",
				"rgba(244,	67,		54,		1)",
			],
			borderWidth: 1
		}];
	}
	GeneratePieChart("PlayerChances", dataset, [Language.GetRepo("PD_Player") + " #1", 					// Build a pie chart
	Language.GetRepo("PD_Player") + " #2"]);	
}