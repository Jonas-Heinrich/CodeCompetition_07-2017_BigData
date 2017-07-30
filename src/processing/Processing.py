import DataItem, Output, PlayerItem

TRACKRANGE = 15																			# The maximum id a track can have

#
#	Helper Method
#

def CalculateAverages(data, count):														# Calculate the averages of a data list
	res = []
	for i in range(0, len(data)):														# Go through every item
		if(count[i] != 0):
			res.append(data[i] / count[i])												# If possible calculate its average
		else:
			res.append(0)																# Else set to 0
	return res
	
def CalculateAverage(data, countData):													# Calculate the average of a weighted data list
	sum = 0
	count = 0
	for i in range(0, len(data)):														# Iterate the list
		sum += data[i]																	# Add to sum
		count += countData[i]															# Add to count
		
	if(count > 0):
		return sum / count
	return 0

#
#	Raw Data
#

def ProcessRawData(data):																# Generate the JSON needed for the Raw Data Section
	jsonString = "["
	for i in range(0, 100):
		jsonString += Output.GenerateJSONArray(data[i].GetAsArray()) + ","				# Add 100 example items to the json string
	jsonString += "]"
	return jsonString

#
#	General Data
#

def ProcessGeneralData(data):															# Generate the JSON needed for the General Data Section
	entries = len(data)																	# The number of entries
	races = 0																			# The number of races
	drivers = []																		# All drivers; The number of drivers
	fuel = 0																			# The total fuel
	money = 0																			# The total money
	
	activityCount = 0																	# The activity count in a given month
	labels = []																			# The identifiers of those months
	activity = []																		# The activities for all months
	prevDate = ""																		# The previous date identifier
	
	for i in range(0, len(data)):														# Iterate every entry
		if(data[i].IsFinished()):														# If entry is finished race
			# Races
			races = races + 1															# Increase races count
			# Drivers
			if(not data[i].Challenger in drivers):										# If driver is not in drivers list
				drivers.append(data[i].Challenger)											# append
			if(not data[i].Opponent in drivers):										# If driver is not in drivers list
				drivers.append(data[i].Opponent)											# append
			# Fuel Used
			try:
				fuel += data[i].FuelConsumption											# Add fuel
			except TypeError:
				pass																	# Error in DB
			# Money
			money += data[i].Money														# Add the money
		# Activity
		currDate = data[i].GetDateString()												# Get date string of item
		
		if(currDate != prevDate):														# If new date
			if(i != 0):																	# Not first entry
				labels.append(prevDate)													# Add month to labels
				activity.append(activityCount)											# Push activity count to list
			
			prevDate = currDate															# Reset previous date
			activityCount = 0															# Reset activity count
		activityCount += 1																# Increase Activity count
	
	labels.append(prevDate)																# Push last date to labels
	activity.append(activityCount)														# Push last activities to list
	
	drivers = len(drivers)																# Get the number of unique drivers
	jsonString = "{"																	# Build the JSON string
	jsonString += "Entries: " + str(entries)
	jsonString += ", Races: " + str(races) 
	jsonString += ", Drivers:" + str(drivers)
	jsonString += ", Fuel:" + str(round(fuel, 2))
	jsonString += ", Money:" + str(round(money, 2))
	jsonString += ",Activity:{Labels:" + Output.GenerateJSONArray(labels, date=True) + ", ActivityCount:" + Output.GenerateJSONArray(activity) + "}"
	jsonString += "}"
	return jsonString
	
#
#	Track Data
#

def ProcessTrackData(data):																# Generate the Data needed for the track data section
	timedTrackData = []																	# Contains the time specific track activity count
	timedTrackLabels = []																# Contains all activity months
	
	trackData = []																		# Counts the total number of activities on that track
	
	fuelData = []																		# Fuel Data for each track
	fuelCount = []																		# Fuel Races count for each track
	
	moneyData = []
	moneyCount = []
			
	for i in range(0, TRACKRANGE):														# Init the lists
		timedTrackData.append([])
		trackData.append(0)
		
		fuelData.append(0)
		fuelCount.append(0)
		
		moneyData.append(0)
		moneyCount.append(0)
	
	prevDate = 0																		# The previous date
	writePointer = 0																	# The pointer at which to write
	
	for i in range(0, len(data)):														# Iterate every race
		if(data[i].IsFinished()):														# If race was finished
			# Development over time	
			currDate = data[i].GetDateString()											# Get date from this race
			
			if(currDate != prevDate):													# If new date
				for x in range(0, TRACKRANGE):												# For each track
					timedTrackData[x].append(0)												# Push new default TrackCount for each month
				if(i != 0):																	# If not first entry
					timedTrackLabels.append(prevDate)											# Push previous date to labels
					writePointer += 1															# Increase the pointer at which to coun
				prevDate = currDate															# Reset the previous date
			
			timedTrackData[data[i].TrackID][writePointer] += 1							# Increase the time specific race count for track
			
			# Track Data
			trackData[data[i].TrackID] += 1												# Increase the total race count for track
			
			# Fuel consumption
			try:
				fuelData[data[i].TrackID] += data[i].FuelConsumption					# Add fuel consumption
				fuelCount[data[i].TrackID] += 1											# Add fuel events recorded
			except TypeError:
				pass																	# Error in DB
				
			# Money placement
			moneyData[data[i].TrackID] += data[i].Money									# Add money
			moneyCount[data[i].TrackID] += 1											# Add money count
		
	timedTrackLabels.append(prevDate)													# Append last date in accumulator
	
	# Most played track
	mpTracks = [0,0,0]																	# Compile a list of the most played tracks
	
	for i in range(0, len(trackData)):													# Iterate all tracks
		if(trackData[i] > trackData[mpTracks[0]]):
			mpTracks[2] = mpTracks[1]
			mpTracks[1] = mpTracks[0]
			mpTracks[0] = i
		elif(trackData[i] > trackData[mpTracks[1]]):
			mpTracks[2] = mpTracks[1]
			mpTracks[1] = i
		elif(trackData[i] > trackData[mpTracks[2]]):
			mpTracks[2] = i	
	
	jsonString = "{"																	# Build the JSON string
	jsonString += "MostPlayedTracks: " + Output.GenerateJSONArray(mpTracks) + ","
	jsonString += "TimedTrackLabels: " + Output.GenerateJSONArray(timedTrackLabels) + ","
	jsonString += "TimedTrackData: " + Output.GenerateJSONArray(timedTrackData) + ","
	jsonString += "TrackData: " + Output.GenerateJSONArray(trackData) + ","
	jsonString += "FuelData: {Average: " + str(CalculateAverage(fuelData, fuelCount)) + ", Averages: " + Output.GenerateJSONArray(CalculateAverages(fuelData, fuelCount)) + "},"
	jsonString += "MoneyData: {Average: " + str(CalculateAverage(moneyData, moneyCount)) + ", Averages: " + Output.GenerateJSONArray(CalculateAverages(moneyData, moneyCount)) + "}"
	jsonString += "}"
	return jsonString
	
#
#	Weather Data
#

def ProcessWeatherData(data):															# Generate the Data needed for the weather data section
	weatherCount = [0, 0, 0, 0]															# Init list for storing all counts of each weather type
	trackWeatherCount = []																# Contains the weather count for each track
	
	weatherForecast = {}																# Contains the count of each weather forecast
	actualWeather = {}																	# Contains the actual weather that came from forecast
	
	for i in range(0, TRACKRANGE):
		trackWeatherCount.append([0, 0, 0, 0])											# Init the weather count for each track

	for i in range(0, len(data)):														# Iterate all races
		if(data[i].IsFinished()):														# If it was finished
			weatherIndex = data[i].GetWeatherIndex()									# Get weather index for each race
			# WeatherDistribution
			weatherCount[weatherIndex] += 1												# Increase the weather count for that type
			# Weather on Track
			trackWeatherCount[data[i].TrackID][weatherIndex] += 1						# Increase the weather count for that track
			# Weather Prediction Correctness
			if(data[i].Forecast in weatherForecast):									# If forecast already exists
				weatherForecast[data[i].Forecast] += + 1									# Increase the count of the forecast
				actualWeather[data[i].Forecast][weatherIndex] += 1							# Increase the count of the actual weather
			else:																		# Else
				weatherForecast[data[i].Forecast] = 1										# Create new forecast entry and set it to default values
				actualWeather[data[i].Forecast] = [0, 0, 0, 0]
				actualWeather[data[i].Forecast][weatherIndex] += 1
	
	# Weather Deviation
	valueAccumulator = 0																# Accumulates the overall weather difference
	weatherEntryCount = 0																# Accumulates the overall weather entry count 
	
	weatherTypeValueAccumulator = [0, 0, 0, 0]											# Accumulates the type specific weather difference
	weatherTypeEntryCount = [0, 0, 0, 0]												# Accumulates the type specific weather entry count
	
	for key in weatherForecast:															# Iterate all forecasts
		forecast = key.split(',')														# Split the forecast into its weather type components
		for i in range(0, len(actualWeather[key])):
			# Overall
			percent = actualWeather[key][i] / weatherForecast[key] * 100				# Calculate the percent of times the weather event happened
			difference = abs(int(forecast[i]) - percent)								# Calculate the difference between forecast and actual percent
			valueAccumulator += difference * actualWeather[key][i]						# Weight the difference
			# Type Specific
			weatherTypeValueAccumulator[i] += difference * actualWeather[key][i]
			weatherTypeEntryCount[i] += actualWeather[key][i]
			
		weatherEntryCount += weatherForecast[key]										# Count the number of entries
	
	weatherTypeDeviation = []															# Calculate and build the deviation for every weather type
	for i in range(0, len(weatherTypeValueAccumulator)):
		weatherTypeDeviation.append(str(round(weatherTypeValueAccumulator[i] / weatherTypeEntryCount[i], 2)))
	
	jsonString = "{"																	# Build the JSON string
	jsonString += "WeatherDistribution: " + Output.GenerateJSONArray(weatherCount) + ","
	jsonString += "TrackWeather: " + Output.GenerateJSONArray(trackWeatherCount) + ","
	jsonString += "WeatherAverageDeviation: " + str(round(valueAccumulator / weatherEntryCount, 2)) + ","
	jsonString += "WeatherTypeAverageDeviation: " + Output.GenerateJSONArray(weatherTypeDeviation)
	jsonString += "}"
	return jsonString
	
#
#	Player Data
#

def ProcessPlayerData(data):															# Generate the data needed for the Player Data Section
	winCount = [0,0]																	# Saves the number of times the challenger,opponent won
	
	players = {}																		# Keeps track of all the players
	
	for i in range(0, len(data)):
		Challenger = data[i].Challenger													# Get Challenger Player ID
		Opponent = data[i].Opponent														# Get Opponent Player ID
	
		# Player Data
		if(not Challenger in players):													# If Challenger not tracked as player
			players[Challenger] = PlayerItem.PlayerItem(Challenger)							# Add new entry
		if(not Opponent in players):													# If Opponent not tracked as player
			players[Opponent] = PlayerItem.PlayerItem(Opponent)								# Add new entry
				
		if(data[i].IsFinished()):														# If Race was finished
			players[Challenger].RaceAccepted()											# Challenger accepted
			players[Opponent].RaceAccepted()											# Opponent accepted
			
			players[Challenger].IsChallenger()											# Challenger was Challenger -> increase challenger count
			players[Opponent].IsOpponent()												# Opponent was Opponent -> increase opponent count
			
			players[Challenger].AddRaceEnemy(Opponent)									# Add other player as enemy
			players[Opponent].AddRaceEnemy(Challenger)
			
			players[Challenger].AddRaceTime(Opponent, data[i].RaceDriven)				# Add race time
			players[Opponent].AddRaceTime(Challenger, data[i].RaceDriven)
			
			players[Challenger].AddWeather(data[i].Weather)								# Track Weather
			players[Opponent].AddWeather(data[i].Weather)

			players[Challenger].RaceWon(data[i].Winner == Challenger)					# Track Winner
			players[Opponent].RaceWon(data[i].Winner == Opponent)
			try:
				players[Challenger].AddFuel(data[i].FuelConsumption / 2)				# Track Fuel consumption (/2 because 2 players)
				players[Opponent].AddFuel(data[i].FuelConsumption / 2)
			except TypeError:
				pass																	# Error in DB
			
			players[Challenger].AddMoney(data[i].Money)									# Track Money
			players[Opponent].AddMoney(data[i].Money)
			
			challengerPreELO = players[Challenger].ELO									# Get ELO before change is applied
			players[Challenger].UpdateELO(players[Opponent].ELO, data[i].Winner == Challenger)
			players[Opponent].UpdateELO(challengerPreELO, data[i].Winner == Opponent)	# Update ELO
			
			if(Challenger == data[i].Winner):											# If Challenger won
				winCount[0] += 1															# Increase Challenger Win count
			else:																		# Else
				winCount[1] += 1															# Increase Opponent Win count
		elif(data[i].IsDeclined()):														# If Race is declined
			players[Opponent].RaceDeclined()												# Only Opponent declines
	
	playerList = list(players.keys())													# Get all players
	playerList.sort()																	# Sort all players by ID, increasing
	
	stringRepo = []																		# Contains time strings to reduce duplication
	playerStatsString = "["																# Accumulates all player statistics
	raceCount = 0																		# Counts the number of races
	declinedRaces = 0																	# Counts the number of declined races
	ELO = 0																				# Accumulates ELO -> should be 0 if all works
	for i in range(0, len(playerList)):													# Iterate all players
		playerStatsString += players[playerList[i]].ToJSONString(stringRepo) + ","		# Get string from player
		raceCount += players[playerList[i]].RacesAccepted								# Accumulate accepted races
		ELO += players[playerList[i]].ELO												# Accumulate ELO
		declinedRaces += players[playerList[i]].RacesDeclined * 2						# Accumulate declined races (*2 to not distort the percentages of races declined)
	playerStatsString += "]"
	playerCount = len(players.keys())													# Get Player Count
	
	
	jsonString = "{"																	# Build JSON string
	jsonString += "GeneralStatistics: {"
	jsonString +=	"AvgNumberRaces: " + str(round(raceCount / playerCount, 2)) + ","
	jsonString +=	"AvgELO: " + str(round(ELO / playerCount, 2)) + ","
	jsonString +=	"AvgAcceptanceRate: " + str(round(raceCount / (raceCount + declinedRaces) * 100, 2)) + ","
	jsonString += 	"ChallengerWinRate: " + Output.GenerateJSONArray(winCount) + ","
	jsonString += "},"
	jsonString += "StringRepo: " + Output.GenerateJSONArray(stringRepo) + ","
	jsonString += "PlayerStats: " + playerStatsString + ","
	jsonString += "}"
	return jsonString