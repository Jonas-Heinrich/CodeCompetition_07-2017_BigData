#
#	JSON Output
#

def GenerateJSONArray(list, startIndex=0, endIndex=None, date=False):					# Generate a json array string from a list
																						# ASSUMPTION: All items are of the same type / if one is list all are list
	if(len(list) > 0 and type(list[0]) == type([])):									# If the list has entries and the type of the list items is list as well
		acc = "["																		# Accumulate the data
		
		for i in range(0, len(list)):													# Recursively add the json strings of each list to the accumulator
			acc += GenerateJSONArray(list[i])
			if(not i == len(list) - 1):
				acc += "," 
		
		return acc + "]"																# Return the accumulator
	else:																				# If the list contains non list items
		acc = "["
	
		if(endIndex == None):
			endIndex = len(list)														# Set a default endIndex if None is provided
		
		for i in range(startIndex, endIndex):											# Iterate the list
			value = ""																	# Get value as string
			number = False																# False if item is not a number
			
			try:																		# Try to parse the string to a number
				value = int(list[i])
				number = True
			except ValueError:
				try:
					value = round(float(list[i]), 2)
					number = True
				except ValueError:
					value = list[i]
				
			if(not number or date):														# If the item is not a number add "
				acc +=  "\"" + list[i].replace("\"", "\\\"") + "\""
			else:																		# Else add it just as string
				acc += str(value).replace('.0', '')										# Replace unnecessary 0s
			
			if(not i == len(list) - 1):
				acc += "," 
			
		return acc + "]"
	
def GenerateJSONArrayFromDict(dict, endIndex):											# Generate json string from dictionary
																						# ASSUMPTION: Dict only has number keys
	acc = "["
	
	for i in range(0, endIndex):														# Go through all possible keys starting from 0
		if(not i in dict):																# If the key is not in the dictionary
			val = 0																			# Its value is 0
		else:
			val = dict[i]																	# Else get value
			
		acc += str(val)																	# Add value to accumulator
		
		if(not i == endIndex - 1):
			acc += "," 
		
	return acc + "]"