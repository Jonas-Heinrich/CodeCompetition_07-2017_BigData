//
//	General
//

var ChartIDs =																						// Contains the ids of all charts that shall be animated; associated with each solution section
[
	[],																								// Raw Data
	["ActivityChart"],																				// General Data
	["TrackTimeDevelopmentChart", "TrackCountChart"],												// Track Data
	["WeatherDistributionChart"],																	// Weather Data
	["PlayerAcceptanceRateChart", "PlayerChallengerWinRateChart"]									// Player Data
];

function AnimateCharts(index)																		// Animate all charts that are in a solution section with that index
{
	if(index < 0 || index > ChartIDs.length)														// If index is not valid; return
		return;
	
	for(var i = 0; i < ChartIDs[index].length; i++)
		AnimateChart(ChartIDs[index][i]);															// Animate each chart in the section that is registered in ChartIDs
}

//
//	Section Animation
//

function Expand(el, onGrow, scrollTo)																// Expand a section
{
	var height = el.offsetHeight;																	// Get offset height
	var heightDelta = 50;																			// Set the amount by which the section increases its size each tick
	
	el.style.display = "block";																		// Make the element visible
	
	var intervalIndex = setInterval																	// Repeat function every 10ms
	(
		function()
		{
			if(el.scrollHeight <= el.offsetHeight)													// If element does not need to grow anymore
			{
				el.style.height = 'auto';																// Set height to auto
				clearInterval(intervalIndex);															// Cancel the repeat of the function
				if(onGrow != undefined)																	// If onGrow is defined; call it
					onGrow(el.clientWidth, el.clientHeight);
			}																						// If it still needs to grow
			else
			{
				height += heightDelta;																	// Increase the height
				el.style.height = height + "px";														// Update the height of the element
				if(onGrow != undefined)																	// If onGrow is defined, call it
					onGrow(el.clientWidth, el.clientHeight);
			}
			
			/*
			if(scrollTo)
			{
				ScrollTo(el, true);
				scrollTo = false;
			}
			*/
		},
		10
	);
}

function Collapse(el, onShrink)																		// Collapse a section
{                                                                                                   
	var height = el.offsetHeight;                                                                   // Get offset height
	var heightDelta = 100;                                                                          // Set the amount by which the section decreases its size each tic
	
	var intervalIndex = setInterval                                                                 // Repeat function every 10ms
	(                                                                                               
		function()                                                                                  
		{                                                                                           
			if(height <= 0)                                                                         // If element does not need to shrink anymore
			{                                                                                       
				el.style.display = "none";                                                          	// Make the element invisible
				el.style.height = "0px";                                                            	// Set the height to 0
				clearInterval(intervalIndex);                                                       	// Cancel the repeat of the function
				if(onShrink != undefined)                                                           	// If onShrink is defined; call it
					onShrink(el.clientWidth, el.clientHeight);                                      	
			}                                                                                       
			else                                                                                    // If it still needs to shrink
			{                                                                                       
				height -= heightDelta;                                                              
				el.style.height = height + "px";                                                    	// Increase the height
				if(onShrink != undefined)                                                           	// Update the height of the element
					onShrink(el.clientWidth, el.clientHeight);                                      	// If onShrink is defined, call it
			}
		},
		10
	);
}

//
//	Arrow Animation
//

function Rotate(el, deg, time, neutral)																// Rotate the arrow
{
	var counter = 0;																				// Keep track of how often the function ran
	
	var intervalIndex = setInterval																	// Set function to repeat every time/50 ms
	(
		function()
		{
			if(counter == 50)																		// If function ran 50 times
			{
				if(!neutral)																		// If neutral is not set
					el.style.transform = "rotate(" + deg + "deg)";										// Change transform to final string
				else
					el.style.transform = "";														// Else; Remove transform
				clearInterval(intervalIndex);														// Stop the repeat of the function
				return;																				// Quit
			}
			el.style.transform += "rotate(" + deg / 50 + "deg)";									// Increase the Rotation
			counter++;																				// Increase the counter
		},
		time / 50
	);
}

//
//	Smooth Scrolling - Source: StackOverflow Link, https://gist.github.com/rskwiat/2975219
//

function ScrollTo(arg1, element) 
{
    var startY = GetCurrentYPosition();
    var stopY = GetElementYPosition(arg1, element);
	
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) 
	{
        ScrollTo(0, stopY); return;
    }
	
    var speed = Math.round(distance / 100);
    if (speed >= 20) 
		speed = 20;
	
    var step = Math.round(distance / 25);
	
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) 
	{
        for (var i = startY; i < stopY; i += step) 
		{
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i -= step ) 
	{
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

function GetCurrentYPosition() 
{
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) 
		return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) 
		return document.body.scrollTop;
    return 0;
}

function GetElementYPosition(arg1, element) 
{
	if(element == undefined)
		var elm = document.getElementById(arg1);
	else
		var elm = arg1;
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) 
	{
        node = node.offsetParent;
        y += node.offsetTop;
    } 
	
	return y;
}