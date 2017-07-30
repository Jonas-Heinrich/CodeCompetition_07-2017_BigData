var LanguageEntry = function(id, arg1, arg2, arg3)													// Language entry can be called with different arguments
{
	this.IDEntry = id;																				// Save the id to the object
	
	if(id)																							// If id is true, the arguments are to be interpreted to save a html element by id
	{
		this.HTMLID = arg1;
		this.Language = arg2;
	}
	else																							// Else, the arguments are to be interpreted to save an element by classname and index
	{	
		this.ClassName = arg1;
		this.ElementIndex = arg2;
		this.Language = arg3;
	}
}

var _Language = function()
{
	this.LanguageIndex = 1;																			// 0 = German, 1 = English
	this.LanguageEntrys = [];																		// Contains all Language Entries
	this.LanguageRepository = {};																	// Contains the Language Repository
	
	function InitLanguageEntries()
	{
		var entrys = [];																			// Accumulates all language entries and will be returned
		
		/*
			Pattern:
			
			-> For html element by id
				entrys.push(new LanguageEntry(true, <elementid>, ["<GermanVersion>","EnglishVersion"]));
			-> for html element by class
				entrys.push(new LanguageEntry(false,<element class name>, <element index>, ["<GermanVersion>","EnglishVersion"]));
		*/
		
		//
		//	Section Titles
		//
		
		entrys.push(new LanguageEntry(false, "SectionTitle", 0, 					[	"&Uuml;ber die Competition", 				"About the Competition"]));
		entrys.push(new LanguageEntry(false, "SectionTitle", 1, 					[	"Meine L&ouml;sung", 						"My Solution"]));
		entrys.push(new LanguageEntry(false, "SectionTitle", 2, 					[	"&Uuml;ber meine L&ouml;sung", 				"About my Solution"]));
			
		//	
		//	About the Competition	
		//	
			
		// Context			
		entrys.push(new LanguageEntry(true, "AboutCompetition_Context", 			[	"Kontext", 									"Context"]));
		entrys.push(new LanguageEntry(true, "AboutCompetition_Context_P1", 			[	'Dieser Wettbewerb ist von einer deutschen Seite (<a href="https://www.it-talents.de/" target="_blank">it-talents.de</a>), die sich der F&ouml;rderung von jungem IT-Talent widmet. Der Wettbewerb fand im Juli 2017 statt und wurde von einer IT Firma gesponsert.', 							
																						'This competition is from a German website (<a href="https://www.it-talents.de/" target="_blank">it-talents.de</a>) dedicated to encouraging young IT talent. It took place in July 2017 and was sponsored by an IT company.']));
		entrys.push(new LanguageEntry(true, "AboutCompetition_Context_P2", 			[	'Die folgenden Inhalte in diesem Abschnitt sind nicht mein geistiges Eigentum, ich habe sie nur &uuml;bertragen um Kontext zu liefern und meine L&ouml;sung in einem sinnvollen Rahmen für mein Portfolio aufzubereiten.', 							
																						'The following content is not my intellectual property, I just mediated it to give some context and present it in a portfolio worthy way.']));
		// Introduction	
		entrys.push(new LanguageEntry(true, "AboutCompetition_Introduction", 		[	"Einf&uuml;hrung",							"Introduction"]));
		entrys.push(new LanguageEntry(true, "AboutCompetition_Introduction_D1",		[	'<p>Big Data ist in aller Munde. Daten sind Wissen und Wissen ist Macht. Aber was ist dran an diesem Spruch und dem gehypten Begriff der &quot;Big Data&quot;?<br />Damit wollen wir uns in dieser Code Competition auseinandersetzen. Bei &quot;Big Data&quot; geht es um die Auswertung von gro&szlig;en Datenmengen. Die Auswertung besteht darin, die Datenmenge zun&auml;chst aufzubereiten, sodass sie von Software mit entsprechenden Algorithmen automatisch analysiert werden kann. Dann geht es um die Erkennung von Mustern und Zusammenh&auml;ngen innerhalb der Daten und schlie&szlig;lich um die Herleitung von Erkenntnissen aus entdeckten Mustern und die Visualisierung dieser Erkenntnisse.<br />Folgende Schritte sind also wichtig:</p><ul><li>Aufbereiten</li><li>Muster erkennen</li><li>Erkenntnisse aus Mustern herleiten</li><li>Erkenntnisse visualisieren</li></ul>',
																						'<p>Big Data is on everyone&#39;s lips. Data is knowledge and knowledge is power. But what is the point behind this saying and the buzzword &quot;Big Data&quot;?<br>That is what we want to deal with in this Code Competition. &quot;Big Data&quot; is about the evaluation of large amounts of data. The evaluation firstly consists of processing, so that it can be automatically analyzed by appropriate algorithms. Then it is about the recognition of patterns and connections within the data to ultimately derive knowledge and visualize it.<br>The following steps are therefore important:</p><ul><li>Processing</li><li>Pattern Recognition</li><li>Knowledge derivation</li><li>Visualize the results</li></ul>']));
			
		// Input	
		entrys.push(new LanguageEntry(true, "AboutCompetition_Input",				[	'Eingabe',									'Input']));
		entrys.push(new LanguageEntry(true, "AboutCompetition_Input_P1",			[	'Wir stellen Dir einen Datensatz eines Rennspiels zur Verf&uuml;gung. In diesem Datensatz findest Du &uuml;ber 160.000 eingetragene Rennen.<br />Aus diesen (Meta)-Daten lassen sich bereits viele spannende Aussagen treffen (Wer f&auml;hrt pr&auml;feriert wann und gegen wen Rennen? Gewonnen oder Verloren?) und Vorhersagen ableiten.<br />Tipp: Filtere die Eintr&auml;ge je nachdem, mit welcher Fragestellung Du die Daten untersuchst.',
																						'We provide you with data from a racing game. In this record you will find 160,000 races.<br>Out of this (meta)data you can already make interesting statements (Who drives when preferably and against whom races? Won or lost?) and derive predictions.<br>Tip: Filter the entries based on the questions you ask it.']));
			
		// About the data	
		entrys.push(new LanguageEntry(true, "AboutCompetition_AboutData",			[	'&Uuml;ber die Daten',						'About the Data']));
		entrys.push(new LanguageEntry(true, "AboutCompetition_Input_D1",			[	'<p>Der Datensatz beinhaltet folgende Informationen/Spalten:</p><ul><li>ID: Die ID des Eintrages</li><li>race_created: Wann wurde das Rennen angesetzt/geplant?</li><li>race_driven: Wann wurde das Rennen ausgetragen?</li><li>track_id: ID der Rennstrecke, auf der das Rennen ausgetragen wurde.</li><li>challenger:  userID des Herausforderers</li><li>opponent:  userID des Gegners (Herausgeforderter)</li><li>money: Einsatz des Rennens (in EUR)</li><li>fuel_consumption: Spritverbrauch der Teilnehmer w&auml;hrend des Rennens (in l)</li><li>winner: Gewinner des Rennens (userID)</li><li>status: Der Status des Rennens. M&ouml;glich sind: waiting, finished, retired, declined</li><li><p>forecast: Wettervorhersage f&uuml;r das Rennen.<br />a:4:{s:5:&quot;sunny&quot;;i:10;s:5:&quot;rainy&quot;;i:70;s:8:&quot;thundery&quot;;i:0;s:5:&quot;snowy&quot;;i:20;}<br />Das a:4 bedeutet, dass es sich um ein serialisiertes Array mit 4 Datenpaaren handelt. Der Inhalt des Arrays steht dann in den geschweiften Klammern. Jedes Datenpaar repräsentiert eine Wetterart und die Wahrscheinlichkeit ihres Auftretens. Die Wetterarten (Eintr&auml;ge im Array) werden durch Semikolons getrennt. Es gibt vier Wetterarten (sunny, rainy, thundery, snowy). Jeweils davor steht „s:“ und eine Zahl. Die Zahl beschreibt lediglich die L&auml;nge des folgenden Strings (bei sunny 5 Zeichen, bei thundery 8 usw.). Hinter der Wetterart steht jeweils noch ein „i:“ und eine Zahl. Die Zahl hinter dem i (für Integer) beschreibt die prozentuale Wahrscheinlichkeit f&uuml;r das Auftreten des jeweiligen Wetters.<br /></p></li><li>weather: Tats&auml;chliches Wetter</li></ul>',
																						'<p>The data contains the following information/columns:</p><ul><li>ID: The ID of the Entry</li><li>race_created: When was the race planned?</li><li>race_driven: When did the race take place?</li><li>track_id: ID of the racetrack where the race took place.</li><li>challenger: userID of the challenger</li><li>opponent: userID of the enemy (challenged)</li><li>money: Bet on the race (in EUR)</li><li>fuel_consumption: Fuel consumption of the participants during the race (in l)</li><li>winner: Winner of the race (userID)</li><li>status: The status of the race. Possible are: waiting, finished, retired, declined</li><li><p>forecast: Weather forecast for the race.<br>a:4:{s:5:&quot;sunny&quot;;i:10;s:5:&quot;rainy&quot;;i:70;s:8:&quot;thundery&quot;;i:0;s:5:&quot;snowy&quot;;i:20;}<br> The a:4 indicates a serialized array with 4 data pairs. The content of the array is between the curly braces. Every data pair represents a kind of weather and the probability of its occurrence. The kinds of weather (entries in the array) are separated by semi colons. There are 4 types of weather (sunny rainy, thundery, snowy). In front of every kind there is an „s:“ and an integer. The integer describes the length of the following string (e.g. sunny 5 characters, thundery 8 and so on). Behind the type of weather there is also an „i:“ and another integer. The number behind the i (i for integer) describes the likelihood of the weather happening in percent.<br></p></li><li>weather: Actual weather</li></ul>']));
			
		// Task	
			
		entrys.push(new LanguageEntry(true, "AboutCompetition_Task",				[	'Aufgabe',									'Task']));
		entrys.push(new LanguageEntry(true, "AboutCompetition_Task_D1",				[	'<ul><li>Spannende Fragestellungen an den Datensatz formulieren</li><li>Die Daten anhand der Fragestellungen auswerten</li><li>Die Aussagen/Ergebnisse visualisieren</li><li>Optional: Voraussagen &uuml;ber weitere Rennen und Rennergebnisse zu verschiedenen Fahrer-IDs ausgeben.</li></ul><p>Selbstverständlich kannst Du weitere Zusatzfeatures implementieren ;)</p>',
																						'<ul><li>Put exciting questions to the data</li><li>Evaluate the data based on the questions</li><li>Visualize the insights/results</li><li>Optional: Output predictions about future races and race results for different driver-ids.</li></ul><p>Of course you can implement additional features ;)</p>']));
	
		// Review	
		entrys.push(new LanguageEntry(true, "AboutCompetition_Review",				[	'Bewertung',								'Review']));
		entrys.push(new LanguageEntry(true, "AboutCompetition_Review_D1",			[	'<p>Worauf achten wir bei der Bewertung Deiner Abgabe?</p><ul><li>Funktionalit&auml;t: L&auml;sst sich das Programm bedienen? Tut die Anwendung oder die Funktion, was sie soll? Wie umfangreich sind die Funktionen?</li><li>Code-Qualit&auml;t: Ist der Code sinnvoll strukturiert und effizient?</li><li>Code-Lesbarkeit / Dokumentation: L&auml;sst sich der Quellcode nachvollziehen? Ist der Code kommentiert?</li><li>Setup: Ist das System einfach einzurichten / aufzusetzen? (z.B. mittels guter Dokumentation, Docker, Vagrant, Skripte, o.&auml;.)</li><li>README: Wird eine README mitgeliefert, die zeigt, wie das Programm aufgerufen werden kann?</li><li>Welche Zusatzfeatures wurden eingebaut?</li></ul>',								
																						'<p>What do we pay attention to while evaluation your solution?</p><ul><li>Functionality: Is you program easily operable? Does the application or the function what it should? How extensive are the functions?</li><li>Code Quality: Is the code rationally structured and efficient?</li><li>Code Readability / Documentation: Is the code retracable? Is the code commented?</li><li>Setup: Is the system easily set up? (e.g. via good documentation, a Docker, Vagrant, Script, or similar)</li><li>README: Is a README file included, that shows, how the application can be executed?</li><li>Which additional features were implemented?</li></ul>']));
			
		//	
		//	My solution	
		//	
		
		//
		// Example Raw Data	
		entrys.push(new LanguageEntry(false,"SolutionSectionTitle", 0,				[	'Die rohen Daten',							'The Raw Data']));
		entrys.push(new LanguageEntry(true, "SolutionContent_RawData_P1",			[	'Die folgende Tabelle zeigt einen Ausschnitt aus den Daten, die in dieser Anwendung benutzt werden.',								
																						'The following table displays an example of the data that is used in this application.']));
		entrys.push(new LanguageEntry(true, "SolutionContent_RawData_P2",			[	'Zeige 100 von ~160.000 Zeilen an',								
																						'Displaying 100 of ~160,000 rows']));
		
		//	
		// General Data
		
		entrys.push(new LanguageEntry(false,"SolutionSectionTitle", 1,				[	'Allgemeine Daten',							'General Data']));
		
		// Entries - Money
		entrys.push(new LanguageEntry(false,"ImageCollectionScaleItemDescription",0,[	' = 1000 Eintr&auml;ge',					' = 1000 entries']));
		entrys.push(new LanguageEntry(false,"ImageCollectionScaleItemDescription",1,[	' = 1000 Rennen',							' = 1000 races']));
		entrys.push(new LanguageEntry(false,"ImageCollectionScaleItemDescription",2,[	' = 1000 Fahrer',							' = 1000 drivers']));
		entrys.push(new LanguageEntry(false,"ImageCollectionScaleItemDescription",3,[	' = 10000 l Kraftstoff',					' = 10000 l of fuel']));
		entrys.push(new LanguageEntry(false,"ImageCollectionScaleItemDescription",4,[	' = 10,000,000 &euro;',						' = 10,000,000 &euro;']));
		
		// Activity
		entrys.push(new LanguageEntry(false,"SolutionSubSectionTitle", 0,			[	'Aktivit&auml;t',							'Activity']));
		entrys.push(new LanguageEntry(true,"SolutionSubSectionTitle_Activity_P1", 	[	'Dieser Graph zeigt anschaulich den typischen Lebenszyklus eines Videospiels. Bei der Ver&ouml;ffentlichung geht es stark los, doch mit fortschreitender Zeit verliert es an Popularit&auml;t.<br>Mit der Einf&uuml;hrung von neuen Inhalten (wie DLC, etc.) oder Vergünstigungen steigen die Spielerzahlen kurzfristig, was zu Spitzen in der Aktivit&auml;t f&uuml;hrt. Da mehr und mehr Spieler das Spiel jedoch hinter sich lassen, kommt es langfristig zu einer Knappheit an Inhalten (besonders in Mehrspielerspielen wo andere Menschen essentiell sind), was den Abw&auml;rtstrend weiter beschleunigt.',
																						'This graph illustrates the typical lifecycle of a video game. At release it starts off very strong, but as time goes on it loses popularity.<br>With the introduction of new content (such as DLC, add-ons, etc.) or a sale, player numbers climb in the short term, leading to spikes in activity. As more and more players leave the game however, there is a lack of player engagement (especially in a multiplayer game) which accelerates the downward trend.']));
		entrys.push(new LanguageEntry(true,"SolutionSubSectionTitle_Activity_P2", 	[	'Nach gut einem Jahr geht das Spiel durch die Ver&ouml;ffentlichung neuer Spiele und die Abwanderung von Entwicklern als auch Spielern in die Irrelevanz &uuml;ber.',
																						'After a year the game fades into irrelevance as new titles are released and developers as well as players move on to the next title.']));
		
		//
		// Track Data	
		entrys.push(new LanguageEntry(false,"SolutionSectionTitle", 2,				[	'Rennstreckendaten',						'Track Data']));
		
		// Most Played Track
		entrys.push(new LanguageEntry(false,"SolutionSubSectionTitle", 1,			[	'Meistgespielte Strecke',					'Most Played Track']));
		
		entrys.push(new LanguageEntry(false,"TrackDataTitle", 0,					[	'Popularit&auml;t im Laufe der Zeit',		'Popularity over Time']));
		entrys.push(new LanguageEntry(false,"TrackDataTitle", 1,					[	'Absolute Popularit&auml;t | Balkendiagramm','Total Popularity | Bar  Chart']));
		entrys.push(new LanguageEntry(false,"TrackDataTitle", 2,					[	'Absolute Popularit&auml;t | Kreisdiagramm','Total Popularity | Pie Chart']));
		
		// Track Composition
		entrys.push(new LanguageEntry(false,"SolutionSubSectionTitle", 2,			[	'Streckenzusammensetzung',					'Track Composition']));
		entrys.push(new LanguageEntry(false,"TrackConclusionTitle", 0,				[	'Schlussfolgerung',							'Conclusion']));
		entrys.push(new LanguageEntry(false,"TrackDataConclusion", 0,				[	'Die Strecke Nummer 12 schl&auml;gt alle anderen Strecken im Bezug auf Popularit&auml;t, mehr als die H&auml;lfte aller gefahrenen Rennen fanden auf dieser Strecke statt.<br>Als Spieleentwickler w&uuml;rde ich den Erfolg der Strecke (bzw. die Schw&auml;che der anderen Strecken) weiter analysieren. Beeinflussende Faktoren sind wohl wahrscheinlich Schwierigkeit, Wetter, L&auml;nge, Belohnung und Risiko.<br>Aufgrund der eingeschr&auml;nkten Einsichten in das Spiel durch den Datensatz kann das nicht voll gekl&auml;rt werden. Es ist aber m&ouml;glich gebildete Schl&uuml;sse zu ziehen.',							
																						'Track Number 12 trumps all other tracks in terms of popularity, it makes up more than half of all races played and this is reflected in the popularity over time as well.<br>As a game developer, I would further examine the success of the race track as well as the failure of the other tracks. Influencing factors that come to mind are difficulty, weather, length, reward in terms of money and risk.<br>Because of the limited nature of the data set, this can not be deducted clearly, however, it is possible to make educated guesses.']));
		
		// Fuel Consumption
		entrys.push(new LanguageEntry(false,"SolutionSubSectionTitle", 3,			[	'Durchschnittlicher Kraftstoffverbrauch',	'Average Fuel Consumption']));
		entrys.push(new LanguageEntry(false,"TrackConclusionTitle", 1,				[	'Schlussfolgerung',							'Conclusion']));
		entrys.push(new LanguageEntry(false,"TrackDataConclusion", 1,				[	'Der ben&ouml;tigte Kraftstoff zum Beenden des Rennens schwankt stark. Wenn man annimmt das Kraftstoffverbrauch grob proportional zur zur&uuml;ckgelegten Strecke ist, kann man feststellen, das die Rennstrecke 12 nicht besonders lang oder kurz ist. Das mag einen der Gr&uuml;nde f&uuml;r die Popularit&auml;t darstellen (Sweetspot).<br>Die anderen beiden popul&auml;ren Strecken (3 und 5) sind jeweils ein wenig l&auml;nger bzw. k&uuml;rzer als die Strecke 12.<br>Nat&uuml;rlich k&ouml;nnten Spielmechaniken existieren (verschiedene Autos, verschiedene Siegestypen), die hier nicht ersichtlich sind und die Schlussfolgerungen beeinflussen.',							
																						'The range of the amount of fuel that is needed to complete the race varies significantly. Given that distance is roughly proportional to the distance travelled, one can deduct that track number 12 is neither very long nor short. This might be a factor that increases its popularity.<br>The other two most popular tracks (Nr. 3 and 5) are on the slightly longer and shorter side of Track 12.<br>Of course there can be game mechanics (different cars, different victory conditions with non-fixed lengths) that are not visible in this dataset and therefore lead to false conclusions..']));
		
		
		// Money Placement
		entrys.push(new LanguageEntry(false,"SolutionSubSectionTitle", 4,			[	'Durchschnittliche Geldplatzierung',		'Average Money Placement']));
		entrys.push(new LanguageEntry(false,"TrackConclusionTitle", 2,				[	'Schlussfolgerung',							'Conclusion']));
		entrys.push(new LanguageEntry(false,"TrackDataConclusion", 2,				[	'Strecke Nummer 6 und 7 ziehen tats&auml;chlich mehr Geldplatzierungen auf sich als der Spielerfavorit Strecke 12. Ein klarer Grund ist aus diesem Kontext nicht ersichtlich, man sollte wohl daf&uuml;r den Kontext erweitern und das Spiel konkret betrachten.',							
																						'Track number 6 and 7 actually attract more money placements than Track 12. A clear reason is not easily deductable in this context, one should review the game in depth and conclude from that.']));
		
		//
		// Weather Data	
		entrys.push(new LanguageEntry(false,"SolutionSectionTitle", 3,				[	'Wetterdaten',								'Weather Data']));
		
		// Weather Distribution
		entrys.push(new LanguageEntry(false,"WeatherDataTitle", 0,					[	'Wetterdistribution',						'Weather Distribution']));
		entrys.push(new LanguageEntry(false,"WeatherConclusionTitle", 0,			[	'Schlussfolgerung',							'Conclusion']));
		entrys.push(new LanguageEntry(false,"WeatherDataConclusion", 0,				[	'Die Distribution des Wetters kann ungef&auml;hr mit diesen Prozenten beschrieben werden:<br>50% sunny, 25% rainy, 12.5% thundery, 12.5% snowy.<br>Die Entwickler des Spieles habe diese Werte wahrscheinlich gew&auml;hlt um einen &auml;sthetischen und mood orientierten Aspekt zu erf&uuml;llen. Die meisten Menschen bevorzugen sonniges Wetter, aber um die Rennen interessant zu halten wird mit Regen, Gewitter oder Schnee Abwechslung geschaffen.',							
																						'The distribution of the overall weather can be roughly described by these percentages:<br>50% sunny, 25% rainy, 12.5% thundery, 12.5% snowy.<br>The developers of the game probably chose these values to fulfill an aesthetic aspect as well as a mood oriented one. Most humans prefer sunny weather but in order to keep it interesting occasional rain, thunder or snow is added.']));
		
		
		// Weather on Tracks
		entrys.push(new LanguageEntry(false,"WeatherDataTitle", 1,					[	'Wetter auf den Strecken',					'Weather on Tracks']));
		entrys.push(new LanguageEntry(false,"WeatherConclusionTitle", 1,			[	'Schlussfolgerung',							'Conclusion']));
		entrys.push(new LanguageEntry(false,"WeatherDataConclusion", 1,				[	'Man kann klar erkennen, das sich das Muster von oben f&uuml;r jede Strecke wiederholt. Ich bin ein bisschen &uuml;berrascht das es keine Unterschiede, z.B. basierend auf der Region der Strecke (W&uuml;ste vs Subpolar), gibt.<br>Die leichte Varianz kann der kleinen Zahl der getrackten Rennen zugeschrieben werden.',							
																						'One can clearly see that the pattern above is repeated for each track. I am a bit surprised to see no big difference, e.g. based on the region where the track might be placed (desert vs subpolar).<br>The slight variance of some tracks can be attributed to the small number of times that they have been tracked.']));
		
		
		// Weather Prediction Correctness
		entrys.push(new LanguageEntry(false,"WeatherDataTitle", 2,					[	'Wettervorhersagenkorrektness',				'Weather Prediction Correctness']));
		entrys.push(new LanguageEntry(false,"WeatherConclusionTitle", 2,			[	'Schlussfolgerung',							'Conclusion']));
		entrys.push(new LanguageEntry(false,"WeatherDataConclusion", 2,				[	'Die durchschnittliche Abweichung des Wetters von der Vorhersage ist minimal. Obwohl die Varianz mit dem Wettertyp zunimmt, bleibt es &auml;u&szlig;erst genau.<br>Mit gr&ouml;&szligeren und gr&ouml;&szligeren Datenmengen bzw. einem tats&auml;chlichem RNG (nicht pseudo random) strebt die Varianz wohl gegen 0.',							
																						'The Average Deviation of the weather from the forecast is miniscule. Altough the variance increases with the weather type it is pretty accurate.<br>With larger and larger data amounts and an actual random number generator (not pseudo random) the deviation will approach 0.']));
		
			
		//
		// Player Data	
		entrys.push(new LanguageEntry(true,"WhatIsELO", 							[	'Was ist ELO? <a href="https://de.wikipedia.org/wiki/Elo-Zahl" target="_blank">Es ist ein Konzept aus Schach.</a>',
																						'What is ELO? <a href="https://en.wikipedia.org/wiki/Elo_rating_system" target="_blank">It is a concept from chess.</a>']));
		
		entrys.push(new LanguageEntry(false,"SolutionSectionTitle", 4,				[	'Spielerdaten',								'Player Data']));
		entrys.push(new LanguageEntry(false,"SolutionSectionTitle", 4,				[	'Spielerdaten',								'Player Data']));
		
		// General Player Statistics
		entrys.push(new LanguageEntry(false,"PlayerDataTitle", 0,					[	'Allgemeine Spielerstatistiken',			'General Player Statistics']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 0,				[	'Durchschnittliche Rennanzahl',				'Average Number of Races']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 1,				[	'Durchschnittliche ELO',					'Average ELO']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 2,				[	'Durchschnittliche Annahmequote',			'Average Acceptance Rate']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 3,				[	'Durchschnittliche Challengergewinnrate',	'Challenger Win Rate']));
		
		// The Top Players
		entrys.push(new LanguageEntry(false,"PlayerDataTitle", 1,					[	'Die Top Spieler',							'The Top Players']));
		
		// The Most Experienced Players
		entrys.push(new LanguageEntry(false,"PlayerDataTitle", 2,					[	'Die Spieler mit der meisten Erfahrung',	'The Most Experienced Players']));
		
		// The Most Economic Players
		entrys.push(new LanguageEntry(false,"PlayerDataTitle", 3,					[	'Die Umweltfreundlichsten Spieler',			'The Most Economic Players']));
		entrys.push(new LanguageEntry(false,"PlayerConclusionTitle", 0,				[	'Schlussfolgerung',							'Conclusion']));
		entrys.push(new LanguageEntry(false,"PlayerDataConclusion", 0,				[	'Die Spieler, die hier aufgelistet sind, benutzen so wenig Kraftstoff aus zwei wesentlichen Gr&uuml;nden, die nicht unbedingt mit ihrer F&auml;higkeit des Fahrens korreliert.<br>Die erste Gruppe verliert fast alle der Spiele; entweder beenden sie das Spiel vorzeitig, haben Verbindungsprobleme, trollen die Gegner oder sind sehr schlechte Fahrer.<br>Zus&auml;tzlich gibt es Fehler in der Datenbank. Nicht alle Zeilen mit Kraftstoffverbrauch beinhalten echte Zahlen, manche haben Werte wie &apos;Jan 17&apos;, &apos;Apr 35&apos; or &apos;Feb 61&apos; in sich. Das hat nichts mit Kraftstoff zu tun (eher Datum?) und muss daher ignoriert werden (mit 0l pro Rennen eingehen).',							
																						'The players that are listed here do use so little fuel per game for two reasons that do not necessarily correlate with skill.<br>First, they lose a lot of their games; either they quit, have connection problems, are trolling or are just really bad drivers.<br>Additionally there are errors in the fuel data set. Not all the rows have actual numbers in them, some contain information like &apos;Jan 17&apos;, &apos;Apr 35&apos; or &apos;Feb 61&apos;. These have nothing to do with fuel (rather date?) and therefore have to be ignored, with no extra fuel added.']));

		
		// Detailed Player Analysis
		entrys.push(new LanguageEntry(false,"PlayerDataTitle", 4,					[	'Detaillierte Spieleranalyse',				'Detailed Player Analysis']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 4,				[	'&Uuml;bersicht',							'Overview']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 5,				[	'Gewinn Quote',								'Win Rate']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 6,				[	'Langzeitaktivit&auml;t',					'Activity over long time']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 7,				[	'T&auml;gliche Aktivit&auml;t',				'Daily Activity']));
		entrys.push(new LanguageEntry(false,"PlayerDataSubTitle", 8,				[	'Gegner',									'Enemies']));
		
		// Race Prediction
		entrys.push(new LanguageEntry(false,"PlayerDataTitle", 5,					[	'Spielvorhersagen',							'Race Prediction']));
		
		//
		//	About my solution
		//
		
		entrys.push(new LanguageEntry(false,"FAQQuestion", 0,						[	'Warum hast du teilgenommen?',				'Why did you take part in this competition?']));
		entrys.push(new LanguageEntry(false,"FAQAnswer", 0,							[	'I habe aus mehreren Gr&uuml;nden teilgenommen.<br>An erster Stelle wollte ich Erfahrung gewinnen. Zus&auml;tzlich wollte ich Kontakte in der Industrie, eine Chance auf eine Belohnung und nat&uuml;rlich Spa&szlig; w&auml;hrend des Programmierens haben!',							
																						'I did take part in this competition because of several reasons.<br>First and most importantly I want to gain experience. Additionally I want to make contacts in the industry, have a chance of winning a price and of course have fun while programming!']));
		entrys.push(new LanguageEntry(false,"FAQQuestion", 1,						[	'Warum hast du das Web f&uuml;r die Aufgabe ge&auml;t?','Why did you choose the web for this task?']));
		entrys.push(new LanguageEntry(false,"FAQAnswer", 1,							[	'Ich habe das Web gew&auml;hlt, da es Plattform unabh&auml;ngig, einfach und sehr gut zug&auml;nglich ist. F&uuml;r manche meiner zuk&uuml;nftigen Projekte brauche ich wohl zudem eine Webseite, und da vorher Erfahrungen mit zu haben ist sehr gut.',							
																						'I chose the web because it is platform independent, easy to use and very accessible. For many of my future projects I will need a website, so therefore having had experience with it previously is very beneficial.']));
		entrys.push(new LanguageEntry(false,"FAQQuestion", 2,						[	'Warum Python / JavaScript?',				'Why did you choose Python / JavaScript for this task?']));
		entrys.push(new LanguageEntry(false,"FAQAnswer", 2,							[	'Python habe ich ge&auml;hlt, da man schnell zu einer L&ouml;sung kommt. Die Daten wurden zudem von Python permanent umgewandelt, sodass die geringere Geschwindigkeit von Python nicht relevant is.<br>Und JavaScript habe ich gew&auml;hlt, da es keine wirkliche Alternative gibt.',							
																						'I chose Python because it is fast to program in. The data is converted by Python to a permanent output, therefore the greater execution time does not matter.<br>And I had to pick JavaScript because of the way the web works.']));
		entrys.push(new LanguageEntry(false,"FAQQuestion", 3,						[	'Wie lange hat es gedauert?',				'How long did it take to develop this solution?']));
		entrys.push(new LanguageEntry(false,"FAQAnswer", 3,							[	'Es ist schwer eine genaue Zahl festzulegen, aber so um die 20-30 Stunden. Der Gro&szlig;teil der Zeit wurde dabei aber vom Frontend verschlungen. W&auml;re ich nicht zwischendurch im Urlaub gewesen h&auml;tte ich noch mehr machen k&ouml;nnen.',							
																						'It is hard to come up with an exact number but I would put it around 20-30 hours. The majority of the time was actually not taken up by the back end, but rather the front end.']));
		entrys.push(new LanguageEntry(false,"FAQQuestion", 4,						[	'Welche Tools hast du benutzt?',			'What tools did you use?']));
		entrys.push(new LanguageEntry(false,"FAQQuestion", 5,						[	'Was hast du gelernt?',						'What did you learn?']));
		entrys.push(new LanguageEntry(false,"FAQAnswer", 5,							[	'Die wichtigste Lektion war, das ich mehr Zeit gebraucht habe als ich dachte. Es hat mir auch etwas &uuml;ber Geduld und das Dranbleiben beigebracht.<br>Die grundlegenden Technologien kannte ich bereits, au&szlig;er ChartJS, sodass ich nicht an Wissen, aber <b>Erfahrung</b> hinzugewonnen habe.',							
																						'The most important lesson to me is that I take more time to actually implement a project than I thought. It also taught me a valuable lesson about patience and just doing it.<br>I have already used the basic technologies that are involved here, except ChartJS, so I gained not much new knowledge but <b>experience</b>.']));
		entrys.push(new LanguageEntry(false,"FAQQuestion", 6,						[	'Was w&uuml;rdest du jetzt anders machen?',	'What would you have done differently?']));
		entrys.push(new LanguageEntry(false,"FAQAnswer", 6,							[	'Das Sprachsystem. Normalerweise w&uuml;rde man sowas ja auf dem Server machen, aber ich wollte es hier aus gewissen Gr&uuml;nden nicht anwenden.<br>Diese Implementation des Systems war l&auml;stig, obwohl das Konzept nicht generell schlecht ist (z.B. Android Files).<br>Deshalb ist die Dokumentation auch nur auf Englisch.',	
																						'The language system. Normally you would do this on the server side but I did not want to do it here for reasons that I do not want to clarify (I have done it successfully before).<br>But having this implementation of the system (see documentation) was just a pain, altough the concept is not bad in general (e.g. Android language files).']));
		
		return entrys;
	}
	
	function InitLanguageRepository()
	{
		var repo = {};																				// Accumulates the entries of the language repository
		
		/*
			Pattern:
				
				repo["<EntryIdentifier>"] = ["<GermanVersion>", "<EnglishVersion>"];
		*/
		
		//
		//	My solution
		//
		
		// General Data												
		repo["GD_ImageCollection_Entries"] = 		[	" Eintr&auml;ge in der Datenbank", 
														" entries in the database"];
		repo["GD_ImageCollection_Races"] = 			[	" gefahrene Rennen", 
														" driven races"];
		repo["GD_ImageCollection_Driver"] = 		[	" unterschiedliche Fahrer", 
														" unique drivers"];
		repo["GD_ImageCollection_Fuel"] = 			[	" l verbrauchter Kraftstoff", 
														" l of fuel used"];
		repo["GD_ImageCollection_Money"] = 			[	" &euro; an Eins&auml;tzen platziert", 
														" &euro; placed"];
														
		repo["GD_ImageCollection_Activity"] = 		[	" Eintr&auml;ge pro Monat", 
														" Entries per Month"];
														
		// Track Data
		
		repo["TD_Track"] = 							[	"Strecke", 
														"Track"];
		repo["TD_Average"] = 						[	"Gesamter Durchschnitt", 
														"Overall Average"];
		
		repo["TD_Placement"] = 						[	"Die Strecke mit der ID ", 
														"The Track with the ID "];
		repo["TD_TrackComposition_TrackCount"] = 	[	"Gefahrene Rennen", 
														"Driven Races"];
		repo["TD_FuelConsumption"] = 				[	"Durchschnittlicher Kraftstoffverbrauch in l", 
														"Average Fuel Consumption in l"];
		repo["TD_MoneyPlacement"] = 				[	"Durchschnittlicher Einsatz in Euro", 
														"Average bet in Euro"];
														
		// Player Data
		
		repo["PD_TableHead"] = 						[	"<tr><td>ID</td><td>Angenommene Rennen</td><td>Abgelehnte Rennen</td><td>Gewonnene Rennen</td><td>Anzahl der Gegner</td><td>ELO</td><td>Gesamter Verbrauch</td><td>Gesamte Wettsumme</td></tr>", 
														"<tr><td>ID</td><td>Accepted Races</td><td>Declined Races</td><td>Races Won</td><td>Number of Opponents</td><td>ELO</td><td>Total Consumption</td><td>Total Bets</td></tr>"];
		repo["PD_Player"] = 						[	"Spieler", 
														"Player"];
		repo["PD_DoesNotExist"] = 					[	"Existiert nicht in der Datenbank.", 
														"Does not exist in the data set."];
		repo["PD_Accepted"] = 						[	"Angenommen", 
														"Accepted"];
		repo["PD_NotAccepted"] = 					[	"Abgelehnt", 
														"NotAccepted"];
		repo["PD_Won"] = 							[	"Gewonnen", 
														"Won"];
		repo["PD_Lost"] = 							[	"Verloren", 
														"Lost"];
		repo["PD_Equal"] = 							[	"Gleiche Chancen", 
														"Equal Chances"];
		repo["PD_Challenger"] = 					[	"Herausforderer", 
														"Challenger"];
		repo["PD_Opponent"] = 						[	"Herausgeforderter", 
														"Opponent"];
		repo["PD_ActivityLong"] = 					[	"Rennen", 
														"Races"];
		repo["PD_ActivityDaily"] = 					[	"Rennen", 
														"Races"];
		repo["PD_Enemy"] = 							[	"Gefahrene Rennen mit Gegner", 
														"Driven Races with Opponent"];
														
		return repo;
	}
	
	this.LanguageEntrys = InitLanguageEntries();													// Init the language entries
	this.LanguageRepository = InitLanguageRepository();												// Init the language repository
	
	this.SetLanguage = function(index)																// Change the language
	{
		this.LanguageIndex = index;
	}
	
	this.UpdateLanguage = function()																// Automatically Update the language on the page
	{
		for(var i = 0; i < this.LanguageEntrys.length; i++)											// Go through every entry
		{
			if(this.LanguageEntrys[i].IDEntry)														// If entry is meant for elementById
				document.getElementById(this.LanguageEntrys[i].HTMLID).innerHTML = 
				this.LanguageEntrys[i].Language[this.LanguageIndex];
			else
				document.getElementsByClassName(this.LanguageEntrys[i].ClassName)[this.LanguageEntrys[i].ElementIndex].innerHTML = 
				this.LanguageEntrys[i].Language[this.LanguageIndex];
		}
	}
	
	this.GetRepo = function(identifier)																// Get Repository Entry by a string identifier
	{
		return this.LanguageRepository[identifier][this.LanguageIndex];
	}
}

var Language = new _Language();																		// Init the Language object