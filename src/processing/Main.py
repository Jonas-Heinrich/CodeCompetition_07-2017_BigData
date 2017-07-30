import DataItem, Parse, Processing, Output

#
#	Main
#
	
def main():
	json = "DataCollection = {"															# json accumulates data to be saved to the script files
    
	# Parse Input
	print("--Parsing Input--")
	data = Parse.GetInput()																# Get the processed data from the races.csv file
	
	# Process data
	print("--Processing Data--")
	
		# Process Raw Data
	print(" -Raw Data Section-")
	json += "RawDataSection : " + Processing.ProcessRawData(data) + ","					# Process the Raw Data Section and add it to json
	
		# Process General Data
	print(" -General Data Section-")
	json += "GeneralDataSection : " + Processing.ProcessGeneralData(data) + ","			# Process the General Data Section and add it to json
	
		# Process Track Data
	print(" -Track Data Section-")
	json += "TrackDataSection : " + Processing.ProcessTrackData(data) + ","				# Process the Track Data Section and add it to json
	
		# Process Weather Data
	print(" -Weather Data Section-")
	json += "WeatherDataSection : " + Processing.ProcessWeatherData(data) + ","			# Process the Weather Data Section and add it to json
	
	# Output	
	print("--Outputting Result--")
	json += "};"																		# Finish the wrapping of JSON to be interpreted as javascript object
	json += "DataLoaded = true; DataLoadedCallback();"									# Add information to tell that the data has arrived once the file has loaded
	
	with open("../output/js/solution/DataCollection.js", 'w') as f:
		f.write(json)																	# Write the first file to the javscript solution directory
	
	json = "DataCollection.PlayerDataSection = "										# Reset json to accumulate data for the next file
	
		# Process Player Data
	print(" -Player Data Section-")
	json +=  Processing.ProcessPlayerData(data)											# Process the Player Data Section and add it to json
	print("--Outputting Result--")
	
	json += "; PlayerDataLoaded = true; PlayerDataLoadedCallback();"					# Finish the wrapping of JSON to be interpreted as javascript object
	
	with open("../output/js/solution/PlayerDataCollection.js", 'w') as f:
		f.write(json)																	# Write the second file to the javscript solution directory
	
	print("\n\n--Done--")
	
main()