import sys

class DataItem:
	def __init__(self, line):
		data = self.ParseLine(line)														# Get the line as an array
		
		if(len(data) != 12):															# Check if line was correct
			print("Unexpected Input Width")
			sys.exit()
		
		self.Weathers = ["sunny", "rainy", "thundery", "snowy"]							# All weather types to get a global index
		
		self.ID 				= data[ 0]
		self.RaceCreated 		= data[ 1]
		self.RaceDriven 		= data[ 2]
		self.TrackID 			= data[ 3]
		self.Challenger 		= data[ 4]
		self.Opponent 			= data[ 5]
		self.Money 				= data[ 6]
		self.FuelConsumption 	= data[ 7]
		self.Winner 			= data[ 8]
		self.Status 			= data[ 9]
		self.Forecast 			= data[10]
		self.Weather 			= data[11]
		
	def ParseLine(self, line):
		columns = []																	# Contains the columns of the line, separated by ;
		acc = ""																		# Accumulates the characters on a line
		complex = False																	# Checks if the column is a complex serialized array
		complexRuns = []																# Accumulates all complex items indicies
		
		for character in line:															# Go through every character on that line
			if(not complex and character == ';'):										# If column was not serialized and the column is marked by ;
				columns.append(acc)															# Add the accumulator to the columns
				acc = ""																	# Reset the accumulator
			elif(acc == "\"a:"):														# If this is a complex column (string contains indicator)
				complex = True																# Mark column as complex
				complexRuns.append(len(columns))											# Save the index
				acc += character															# Add another character
			elif(character == "}"):														# If the character is }
				complex = False																# Demark the column as complex
				acc += character															# Add another character
			else:
				acc += character															# Add another character
			
		columns.append(acc.replace('\n', ''))											# Add last Accumulator and remove newline
		
																						# Assumption: Weather Structure as in races.csv
		for i in range(0, len(complexRuns)):											# Iterate every complex run
			run = columns[complexRuns[i]]												# Get the complex item associated with the index
			percentages = run.split(';i:')												# Split the percentages based on the limiter
			
			data = ""																	# Data accumulates the items
			for y in range(1, len(percentages)):
				data += percentages[y].split(";")[0]									# Add the data
				if(y < len(percentages) - 1):
					data = data + ","
			columns[complexRuns[i]] = data												# Asign the now parsed data to the original index
			
		for i in range(0, len(columns)):												# Try to turn every value into an integer or float
			try:
				columns[i] = int(columns[i])
			except ValueError:
				try:
					columns[i] = float(columns[i])
				except ValueError:
					pass
		return columns
		
	def GetAsArray(self):
		data = []
		
		data.append(self.ID)
		data.append(self.RaceCreated)
		data.append(self.RaceDriven)
		data.append(self.TrackID)
		data.append(self.Challenger)
		data.append(self.Opponent)
		data.append(self.Money)
		data.append(self.FuelConsumption) 
		data.append(self.Winner)
		data.append(self.Status)
		data.append(self.Forecast)
		data.append(self.Weather)
		
		return data
		
	def GetWeatherIndex(self):															# Get Weather string as index
		if(not self.Weather in self.Weathers):
			return None
		return self.Weathers.index(self.Weather)
		
	def IsFinished(self):																# Check if race was finished
		return self.Status == "finished"
		
	def IsDeclined(self):																# Check if race was declined
		return self.Status == "declined"
		
	def GetDateString(self):															# Get Date as month and year string
		return '.'.join(self.RaceCreated.split('.')[1:3])