import Output, math

class PlayerItem:
	def __init__(self, id):
		self.PlayerID = id																# Set the player id of the entry
																						# Set default values | init the values
		# Non Direct Racing Data
		self.RacesAccepted = 0															# Number of races that were accepted
		self.RacesDeclined = 0															# Number of races that were denied
		
		# Direct Racing Data
		self.WasChallengerCount = 0														# Number of times the player was a challenger
		self.WasOpponentCount = 0														# Number of times the player was an opponent
		
		self.Enemys = []																# All enemies of the player 
		self.EnemyEncounters = []														# Number of times he encountered them
		self.EnemyTimeEncounters = []													# Track record of when he drove against them
		
		self.Weather = [0, 0, 0, 0]														# The weather he experienced
		self.RacesWon = 0																# Number of Races he won
		self.RacesLost = 0																# Number of Races he lost
		
		self.ELO = 0																	# ELO Points
		
		self.TotalFuel = 0																# Total Fuel Consumption
		self.TotalMoney = 0																# Total Money
		
	def RaceAccepted(self):
		self.RacesAccepted += 1
		
	def RaceDeclined(self):
		self.RacesDeclined += 1
		
	def IsChallenger(self):
		self.WasChallengerCount += 1
		
	def IsOpponent(self):
		self.WasOpponentCount += 1
		
	def AddRaceEnemy(self, enemy):
		if not enemy in self.Enemys:													# If new enemy
			self.Enemys.append(enemy)														# Add enemy
			self.EnemyEncounters.append(0)													# Set Count to 0
			self.EnemyTimeEncounters.append([])												# Append new time encounter
			
		self.EnemyEncounters[self.Enemys.index(enemy)] += 1								# Increase the encounter counter
		
	def AddRaceTime(self, enemy, time):
		self.EnemyTimeEncounters[self.Enemys.index(enemy)].append(time)
		
	def AddWeather(self, weather):
		self.Weather[["sunny", "rainy", "thundery", "snowy"].index(weather)] += 1
		
	def AddFuel(self, fuel):
		self.TotalFuel += fuel
		
	def AddMoney(self, money):
		self.TotalMoney += money
		
	def RaceWon(self, won):
		if(won):
			self.RacesWon += 1
		else:
			self.RacesLost += 1
		
	def UpdateELO(self, enemyELO, won):
		self.ELO = self.CalculateNewELO(enemyELO, won)									# Calculate new ELO based on enemyELO and the match outcome
			
	def CalculateNewELO(self, enemyELO, won):
		# Formulas from Chess:
		#	https://de.wikipedia.org/wiki/Elo-Zahl
		expectedOutcome = self.CalculateExpectedOutcome(enemyELO)						# Get expected outcome
		if won:
			return round(self.ELO + 10 * (1 - expectedOutcome))							# Calculate new ELO if won
		else:	
			return round(self.ELO + 10 * (0 - expectedOutcome))							# Calculate new ELO if lost
		
	def CalculateExpectedOutcome(self, enemyELO):
		return 1 / (1 + math.pow(10, (enemyELO - self.ELO) / 400))
		
	def ToJSONString(self, stringRepo):													# Build JSON String, stringRepo: Repository of strings
		json = 	"["
		json +=		str(self.PlayerID) + ","
			
		json +=		str(self.RacesAccepted) + ","
		json +=		str(self.RacesDeclined) + ","
			
		json +=		str(self.WasChallengerCount) + ","
		json +=		str(self.WasOpponentCount) + ","
			
		json +=		Output.GenerateJSONArray(self.Enemys) + ","
		json +=		Output.GenerateJSONArray(self.EnemyEncounters) + ","
		
		json +=		"["
		for i in range(0, len(self.EnemyTimeEncounters)):								# Iterate all time encounters
			for y in range(0, len(self.EnemyTimeEncounters[i])):
				item = self.EnemyTimeEncounters[i][y].split(' ')						# Split into date and time
				
				if(not item[0] in stringRepo):											# If String not in Repo insert it
					stringRepo.append(item[0])											
				if(not item[1] in stringRepo):											# If String not in Repo insert it
					stringRepo.append(item[1])
			
																						# Add JSON array from two indicies
				json +=	'[' + str(stringRepo.index(item[0])) + "," + str(stringRepo.index(item[1])) + "],"
		
		json +=		"],"
		json +=		Output.GenerateJSONArray(self.Weather) + ","
		json +=		str(self.RacesWon) + ","
		json +=		str(self.RacesLost) + ","
		
		json +=		str(round(self.ELO)) + ","
		
		json +=		str(self.TotalFuel) + ","
		json +=		str(self.TotalMoney) + ","
		json +=	"]"
		return json
		