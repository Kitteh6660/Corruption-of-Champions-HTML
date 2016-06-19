//Variables that can be set as development progresses.
var gameVersion = "0.1.2 alpha";
var saveVersion = 1; //If this value is increased, the saves will be upgraded to accommodate the new changes.
var levelCap = 5; //Determines the maximum level a player can attain. This will be raised as dungeons are added.

//Game settings
var debug = false;
var silly = false;
var hyperHappy = false;
var lowStandards = false;
var hungerEnabled = false;
var SFWMode = false;

//Interface settings
var use12Hours = false;
var useMetrics = false;

//Store data for fonts
var buttonFont = "Papyrus";
var mainFont = "Times New Roman";
var mainFontSizeArray = ["0.6em", "0.7em", "0.8em", "0.9em", "1em", "1.1em", "1.2em", "1.3em", "1.4em"];
var mainFontSizeIndex = 4; //Goes from 0 to 8. Will be used to pick font size from array.

//Core variables
var player;// = new Player();
var playerMenu = null;
var gameStarted = false; //Determine if game has already started
var shiftKeyDown = false;

//Time
var time = [];
time.days = 0;
time.hours = 0;
time.minutes = 0;

//Exploration
var exploration = [];
exploration.explored = 0;
exploration.exploredForest = 0;
exploration.exploredLake = 0;
exploration.exploredDesert = 0;
exploration.exploredMountain = 0;

//NPC variables
//var flags = [0] * 3000; //For legacy purposes only.
var gameFlags = [];
