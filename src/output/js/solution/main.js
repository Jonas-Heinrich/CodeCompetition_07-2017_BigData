var DataLoaded = false;																				// Indicate that data is not loaded, will be overwritten by DataCollection.js
var PlayerDataLoaded = false;																		// Indicate that player data is not loaded, will be overwritten by DataCollection.js
var DataCollection = {};


function FinishDataLoadingAnimation()																// Finish the loading animation on the banner
{
	document.getElementById("LoadingAnimationContainer").style.display = "none";					// Hide the overlay
}

function FinishPlayerDataLoadingAnimation()															// Finish the loading animation on the player data section
{
	document.getElementById("PlayerDataLoadingOverlayWrapper").style.display = "none";				// Hide the overlay
}

function DataLoadedCallback()																		// Will be called by DataCollection.js
{
	console.log("Data Loaded!");
	FinishDataLoadingAnimation();																	// Finish loading animation
	ProcessData();																					// Start the processing of the data
}

function PlayerDataLoadedCallback()																	// Will be called by PlayerDataCollection.js
{
	console.log("Player Data Loaded!");
	FinishPlayerDataLoadingAnimation();																// Finish loading animation
	ProcessPlayerDataWrapper();																		// Start the processing of the player data
}