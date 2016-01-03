function mainMenu() {
    Data.loadSettings();
	clearOutput();
	if(typeof(Storage) !== "undefined") {
		// All good to go!
	} else {
		errorOldBrowser();
        return;
	}
	outputText("Corruption of Champions: HTML Edition (Test 1)<br><br>");
	outputText("Original CoC by Fenoxo. Rewritten by Kitteh6660.");
	menu();
	hideStats();
	hideUpDown();
	hideMenus();
    setMenuButton("buttonMain", "New Game", CharCreation.initializeNewGame);
    showMenuButton("buttonMain");
    showMenuButton("buttonData");
	playerMenu = mainMenu;
    if (gameStarted) addButton(0, "Resume", Camp.doCamp);
	addButton(1, "Settings", settingsScreenMain);
}

function errorOldBrowser() {
	clearOutput();
	outputText("<b><u>ERROR</u></b><br>Sorry, your browser is too old to be able to use local storage. Please use a modern browser.");
	menu();
    hideMenus();
}
function errorInternetExplorerEwwww() {
    clearOutput();
    menu();
    hideMenus();
}

//------------
// SETTINGS
//------------
function settingsScreenMain() {
    Data.saveSettings();
    clearOutput();
    //Silly Mode
    if (silly)
        outputText("Silly Mode: <b><font color=\"#008000\">ON</font></b><br>&nbsp; Crazy, nonsensical, and possibly hilarious things may occur.<br><br>");
    else
        outputText("Silly Mode: <b><font color=\"#800000\">OFF</font></b><br>&nbsp; You're an incorrigable stick-in-the-mud with no sense of humour.<br><br>");
    //Time Format
    if (use12Hours)
        outputText("Time Format: <b>12 hours</b><br>&nbsp; 12-hour format will be used. Time will use AM/PM.<br><br>");
    else
        outputText("Time Format: <b>24 hours</b><br>&nbsp; 24-hour format will be used.<br><br>");
    //Set buttons
    menu();
    addButton(0, "Silly Mode", toggleSilly);
    addButton(1, "Time Format", toggleTimeFormat);
    addButton(14, "Back", mainMenu);
}
function toggleSilly() {
    if (silly)
        silly = false;
    else
        silly = true;
    settingsScreenMain();
}
function toggleTimeFormat() {
    if (use12Hours)
        use12Hours = false;
    else
        use12Hours = true;
    settingsScreenMain();
}