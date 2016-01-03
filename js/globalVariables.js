//Variables that can be set as development progresses.
var saveVersion = 1; //If this value is increased, the saves will be upgraded to accommodate the new changes.
var levelCap = 5; //Determines the maximum level a player can attain.

//Core variables
var player;// = new Player();
var playerMenu = null;
var flags = [0] * 3000;
var gameStarted = false; //Determine if game has already started

//Game settings
var silly = false;
var use12Hours = false;
