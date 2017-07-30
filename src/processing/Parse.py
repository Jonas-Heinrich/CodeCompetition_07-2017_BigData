import os.path
import DataItem

#
#	Parse CSV Line
#
	
def GetInput():
	dataFileName = "races.csv"															# Set the name of the input file
	
	if(not os.path.isfile(dataFileName)):												# If the script can not find the file
		print("ERROR: Races file not found. (It needs to be in this directory and be called \"" + dataFileName + "\".)")
		return
	
	firstLine = True	
	data = []
	
	with open(dataFileName, 'r') as dataFile:											# Open the file
		for line in dataFile:															# Read line by line
			if(firstLine):
				firstLine = False														# Ignore the first line as it contains the identifiers
			else:
				data.append(DataItem.DataItem(line))									# Generate a new DataItem and add it to the data
	return data