var BackgroundColor = 																				// Contains material design colors to be used
[
	"rgba(0,	150,	136,	0.2)",
	"rgba(255,	87,		34,		0.2)",
	"rgba(103,	58,		183,	0.2)",
	"rgba(255,	193,	7,		0.2)",
	"rgba(76,	175,	80,		0.2)",
	"rgba(255,	235,	59,		0.2)",
	"rgba(121,	85,		72,		0.2)",
	"rgba(33,	150,	243,	0.2)",
	"rgba(244,	67,		54,		0.2)",
	"rgba(139,	195,	74,		0.2)",
	"rgba(96,	125,	139,	0.2)",
	"rgba(156,	39,		176,	0.2)",
];

var BorderColor =  																					// Contains material design colors to be used /with different alpha)
[
	"rgba(0,	150,	136,	1)",
	"rgba(255,	87,		34,		1)",
	"rgba(103,	58,		183,	1)",
	"rgba(255,	193,	7,		1)",
	"rgba(76,	175,	80,		1)",
	"rgba(255,	235,	59,		1)",
	"rgba(121,	85,		72,		1)",
	"rgba(33,	150,	243,	1)",
	"rgba(244,	67,		54,		1)",
	"rgba(139,	195,	74,		1)",
	"rgba(96,	125,	139,	1)",
	"rgba(156,	39,		176,	1)",
];

var ChartReference = {};																			// Saves all the charts
var ChartData = {};																					// Saves all the data of the charts

//
//	General Data
//

function OutputImageCollection(index, value, string, imgClass, divisor)								// Output an image collection (number of images)
{
	var element = document.getElementsByClassName("ImageCollection")[index];						// Get the element that will be the target
	element.innerHTML = "";																			// Reset its html
	
	for(var i = 0; i < Math.round(value / divisor); i++)											// Iterate for the number of times wanted by the caller
		element.innerHTML += "<img class=\"ImageCollectionItem " + imgClass + "\">";				// Place an image
	
	if(string != undefined)																			// If the description string exists, display it
		document.getElementsByClassName("ImageCollectionDescription")[index].innerHTML = string;
}

//
//	Track Data
//

function OutputPlacement(index, values)																// Label a placement
{
	if(values.length != 3)																			// If values is not of the right length
		return;
	var realIndex = 3 * index;																		// Calculate the real index of the element index (each placement has 3 elements)
	
	for(var i = realIndex; i < realIndex + 3; i++)													// Iterate all indicies
		document.getElementsByClassName("PlacementTitle")[i].innerHTML = values[i - realIndex];		// Output the placement
}

//
//	Player Data
//

function GeneratePlayerDataTable(indexes)															// Generate a table with the table indicies
{
	var html = Language.GetRepo("PD_TableHead");													// Get the table head
	
	for(var i = 0; i < indexes.length; i++)															// Iterate all indicies
	{
		html += "<tr>";																				// Build the html
		
		html += "<td>" + PlayerDataInterpreter.GetPlayerID(indexes[i]) + "</td>";
		html += "<td>" + PlayerDataInterpreter.GetRacesAccepted(indexes[i]) + "</td>";
		html += "<td>" + PlayerDataInterpreter.GetRacesDeclined(indexes[i]) + "</td>";
		html += "<td>" + PlayerDataInterpreter.GetRacesWon(indexes[i]) + "</td>";
		html += "<td>" + PlayerDataInterpreter.GetEnemys(indexes[i]).length + "</td>";
		html += "<td>" + PlayerDataInterpreter.GetELO(indexes[i]) + "</td>";
		html += "<td>" + Math.round(PlayerDataInterpreter.GetTotalFuel(indexes[i])).toLocaleString() + " l</td>";
		html += "<td>" + PlayerDataInterpreter.GetTotalMoney(indexes[i]).toLocaleString() + " Euro</td>";
		
		html += "</tr>";
	}
	
	return html;
}

//
//	Charts
//

function DestroyChart(id)
{
	if(ChartReference[id] != undefined)																// Destroy the chart associated with the html element id
		ChartReference[id].destroy();
}

function SaveChartData(id, type, args)																// Save the chart data in association with the element id
{
	ChartData[id] = {};
	ChartData[id].Type = type;
	ChartData[id].Args = args;
}

function AnimateChart(id)																			// Animate the chart by rebuilding the chart to trigger the animation
{
	if(ChartData[id] != undefined)																	// If chart does exist
	{
		switch(ChartData[id].Type)																	// Differentiate the different types and rebuild them
		{
			case 0:
				GenerateLineChart(ChartData[id].Args[0], ChartData[id].Args[1], ChartData[id].Args[2], ChartData[id].Args[3], ChartData[id].Args[4], ChartData[id].Args[5]);
				break;
			case 1:
				GenerateBarChart(ChartData[id].Args[0], ChartData[id].Args[1], ChartData[id].Args[2]);
				break;
			case 2:
				GeneratePieChart(ChartData[id].Args[0], ChartData[id].Args[1], ChartData[id].Args[2]);
				break;
		}
	}
}

//
//	Line Chart

function GenerateLineChart(id, dataset, labels, label, backgroundColor, borderColor)				// Generate a line chart
{
	if(backgroundColor == undefined)																// Set the default background colors
		backgroundColor = BackgroundColor;
	if(borderColor == undefined)																	// Set the default border colors
		borderColor = BorderColor;
	
	var datasets = [];																				// Contains all datasets
	for(var i = 0; i < dataset.length; i++)
		datasets.push(																				// Build the dataset
		{
			label: label[i],
			data: dataset[i],
			backgroundColor: backgroundColor[i],
			borderColor: borderColor[i],
			borderWidth: 1
		});
	
	DestroyChart(id);																				// Destroy the previous chart
	SaveChartData(id, 0, [id, dataset, labels, label, backgroundColor, borderColor]);				// Save the new chart data
	
	ChartReference[id] = new Chart(document.getElementById(id), 									// Generate a new chart
	{
		type: 	'line',
		data: 
		{
			labels: labels,
			datasets: datasets
		},
		options: 
		{
			scales: 
			{
				yAxes: 
				[{
					ticks: 
					{
						beginAtZero:true
					}
				}]
			}
		}
	});
}

//
//	Bar Chart

function GenerateBarChart(id, dataset, labels)
{
	DestroyChart(id);																				// Destroy the previous chart
	SaveChartData(id, 1, [id, dataset, labels]);                                                    // Save the new chart data
	
	ChartReference[id] = new Chart(document.getElementById(id),                                     // Generate a new chart
	{
		type: 'bar',
		data: 
		{
			labels: labels,
			datasets: dataset
		},
		options: 
		{
			scales: 
			{
				yAxes: 
				[{
					ticks: 
					{
						beginAtZero: true
					}
				}]
			},
			options: 
			{
				legend: 
				{
					display: false
				}
			}
		}
	});
}


//
//	Pie

function GeneratePieChart(id, dataset, labels)
{	
	DestroyChart(id);																				// Destroy the previous chart
	SaveChartData(id, 2, [id, dataset, labels]);                                                    // Save the new chart data
	
	var ref = document.getElementById(id).getContext('2d');                                         // Generate a new chart
	ChartReference[id] = new Chart(ref, 
	{
		type: 'pie',
		data: 
		{
			datasets: dataset,
			labels: labels,
		},
		options: 
		{
			legend: 
			{
				display: false
			}
		}
	});
}