//
//	Banner
//

// Start Buttons
function Start()																					// Called when "Start" Button is pressed in Banner
{
	document.getElementById("MainContent").style.display = "block";									// Make content visible
	setTimeout(function(){ScrollTo("MainContent");}, 200);											// Scroll to Page Start
	
	if(document.getElementsByClassName("SectionContent")[1].style.display != "block")				// If My Solution is not expanded
		ExpandMainSection(1, false);																	// Expand it
}

//	Set Language Buttons
function SetLanguage(languageIndex)																	// Set language of the website; Called by top left German | English
{
	Language.SetLanguage(languageIndex);															// Update Language for repository
	Language.UpdateLanguage();																		// Update titles
	ProcessData();																					// Reprocess data
	ProcessPlayerDataWrapper();																		// Reprocess player data
}

//
//	Main Content
//

function ExpandSection(sectionClassName, arrowClassName, index, animate, scrollTo)					// Expand a section with the given id; Called by Section Title
{
	if(scrollTo == undefined)																		// Set default scroll
		scrollTo = true;
	
	var element = document.getElementsByClassName(sectionClassName)[index];							// Get Element
	
	if(element == undefined)																		// If Element does not exist; return
		return;																						
	
	var func = undefined;
	if(element.id == "PlayerSection")																// If element is PlayerSection
	{
		function func(clientWidth, clientHeight)
		{
			var element = document.getElementById("PlayerDataLoadingOverlayWrapper");				// Get loading overlay
			
			element.style.width = clientWidth + "px";												// Update width and height of overlay
			element.style.height = clientHeight + "px";
		}
	}
	
	if(element.style.display == "block")															// If it is visible
	{
		Collapse(element, func);																		// Collapse it
		Rotate(document.getElementsByClassName(arrowClassName)[index], -90, 250, true);					// Rotate the arrow
	}
	else																							// Else
	{
		Expand(element, func, scrollTo);																// Expand it
		Rotate(document.getElementsByClassName(arrowClassName)[index], 90, 250);						// Rotate the arrow
		
		if(sectionClassName == "SolutionSectionContent")											// If it is a SolutionSection; Animate its charts
			AnimateCharts(index);
	}
}

function ExpandMainSection(index, scrollTo)															// Called by MainSection Title onclick
{
	ExpandSection("SectionContent", "Arrow", index, scrollTo);
}

function ExpandSolutionSection(index)																// Called by SolutionSection Title onclick
{
	ExpandSection("SolutionSectionContent", "SolutionSectionArrow", index);
}

function ExpandFAQSection(index)																	// Called by FAQ question onclick
{
	ExpandSection("FAQAnswer", "FAQArrow", index);
}

var INPUT_CHANGING = false;																			// Save if input is being set to stop events from firing

function DecreaseID(index)																			// Decrease the PlayerID to the next entry that exists; Called by <<
{
	var element = document.getElementsByClassName("DPA_PlayerSelector")[index];						// Get element that saves the playerid
	
	var playerID = element.value;																	// Get the current value
	var result = PlayerDataInterpreter.FindRealPlayerIndex(playerID);								// Find the index in the array of players
	
	if(!result)																						// If no result
		result = PlayerDataInterpreter.GetPreviousPlayerIndex(playerID);								// Get previous PlayerIndex
	else																							// Else change the next index in the array
		if(result > 0)
			result = result - 1;
		else
			result = 0;
	
	INPUT_CHANGING = true;																			// Set input to changing to block oninput event from firing
	playerID = PlayerDataInterpreter.GetPlayerID(result);											// Get the id associated with the index
	element.value= playerID;																		// Set the value
	INPUT_CHANGING = false;
	
	if(index == 0)
		ProcessPDDetailedPlayerAnalysisPlayerData(index);											// If index of group (as in which << arrow group) is 0, update player analysis
	else
		ProcessPDRacePrediction();
}

function IncreaseID(index)																			// Increase the PlayerID to the next entry that exists; Called by >>
{                                                                                                   
	var element = document.getElementsByClassName("DPA_PlayerSelector")[index];                     // Get element that saves the playerid
	
	var playerID = element.value;                                                                   // Get the current value
	var result = PlayerDataInterpreter.FindRealPlayerIndex(playerID);                               // Find the index in the array of players
	
	if(!result)                                                                                     // If no result
		result = PlayerDataInterpreter.GetNextPlayerIndex(playerID);                                	// Get next PlayerIndex
	else                                                                                            // Else change to the next index in the array
		if(result < PlayerDataInterpreter.GetPlayerDataCount() - 1)                                 
			result = result + 1;                                                                    
		else                                                                                        
			result = PlayerDataInterpreter.GetPlayerDataCount() - 1;                                
		
	INPUT_CHANGING = true;                                                                          // Set input to changing to block oninput event from firing
	playerID = PlayerDataInterpreter.GetPlayerID(result);                                           // Get the id associated with the index
	element.value= playerID;                                                                        // Set the value
	INPUT_CHANGING = false;                                                                         
	
	if(index == 0)                                                                                  
		ProcessPDDetailedPlayerAnalysisPlayerData(index);                                           // If index of group (as in which >> arrow group) is 0, update player analysis
	else
		ProcessPDRacePrediction();
}