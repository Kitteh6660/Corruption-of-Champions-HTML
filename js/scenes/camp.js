Camp = [];

Camp.doCamp = function() {
	//Set some stuff
	gameStarted = true;
	showStats();
    showMenus();
	hideUpDown();
    setMenuButton("buttonMain", "Main Menu", mainMenu);
	if (player.XP >= player.level * 100 && player.level < levelCap)
		showMenuButton("buttonLevel");
	else
		hideMenuButton("buttonLevel");
	playerMenu = Camp.doCamp;
	//Display texts
	clearOutput();
	/*if(isabellaFollower()) {
		outputText("Your campsite got a lot more comfortable once Isabella moved in.  Carpets cover up much of the barren ground, simple awnings tied to the rocks provide shade, and hand-made wooden furniture provides comfortable places to sit and sleep.  ", false);
	}
	else {*/
		if (time.days < 10) outputText("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.  ");
		if (time.days >= 10 && time.days < 20) outputText("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.  ");
		if (time.days >= 20) {
			//if (!isabellaFollower()) outputText("Your new home is as comfy as a camp site can be.  ", false);
			outputText("The fire-pit ");
			//if (flags[kFLAGS.CAMP_BUILT_CABIN] > 0 && flags[kFLAGS.CAMP_CABIN_FURNITURE_BED] > 0) outputText("is ", false);
			/*else */outputText("and tent are both ");
			outputText("set up perfectly, and in good repair.  ");
		}
	//}
	if (time.days >= 20) outputText("You've even managed to carve some artwork into the rocks around the camp's perimeter.\n\n", false);
	//Display available options
	menu();
	addButton(0, "Fight", Camp.fightMenu);
	addButton(1, "DEBUG", Camp.debugMenu);
	addButton(8, "Masturbate", Camp.doMasturbate);
	addButton(9, "Sleep", Camp.doSleep);
	addButton(13, "Inventory", Inventory.inventoryMenu);
}

Camp.returnToCampUseOneHour = function() {
	Time.advanceHours(1);
	Camp.doCamp();
}
Camp.returnToCampUseTwoHours = function() {
	Time.advanceHours(2);
	Camp.doCamp();
}
Camp.returnToCampUseFourHours = function() {
	Time.advanceHours(4);
	Camp.doCamp();
}
Camp.returnToCampUseTwoHours = function() {
	Time.advanceHours(8);
	Camp.doCamp();
}
Camp.returnToCampUseCustomMinutes = function(minutes) {
	Time.advanceMinutes(minutes);
	Camp.doCamp();
}

Camp.doSleep = function() {
	//For now
	clearOutput();
	outputText("You lie down and sleep for eight hours.");
	Time.advanceHours(8);
	player.changeHP(15 * 8, true);
	player.changeLust(player.lib * 0.04 * 8, false);
	doNext(Camp.doCamp);
}

//Placeholder function
Camp.fightMenu = function() {
    hideMenus();
	menu();
	addButton(0, "Goblin", startCombat, new Goblin);
	addButton(1, "Imp", startCombat, new Imp);
	addButton(14, "Back", Camp.doCamp);
}

Camp.debugMenu = function() {
	clearOutput();
	outputText("<b><u>DEBUG INFO</u></b><br>");
	outputText("<b>Breast Rows:</b> " + player.breastRows.length + "<br>");
	outputText("<b>Cocks:</b> " + player.cockTotal() + "<br>");
	outputText("<b>Vaginas:</b> " + player.vaginaTotal() + "<br>");
	menu();
	//Cocks
	if (player.cockTotal() < 5) addButton(0, "Add Cock", addCock);
	if (player.cockTotal() > 0) addButton(5, "Remove Cock", removeCock);
	//Pussies
	if (player.vaginaTotal() < 2) addButton(1, "Add Vagina", addVagina);
	if (player.vaginaTotal() > 0) addButton(6, "Remove Vagina", removeVagina);
    //Breast Rows
    if (player.breastRows.length < 5) addButton(2, "Add Breast Row", addBreastRow);
    if (player.breastRows.length > 1) addButton(7, "Remove Breast Row", removeBreastRow);
	//GAINZ
	addButton(4, "+100 XP", giveXP);
	addButton(14, "Back", Camp.doCamp);
}

function addCock() {
	clearOutput();
	outputText("Cock added!");
	player.createCock(5.5, 1, CockTypesEnum.HUMAN);
	doNext(Camp.debugMenu);
}
function removeCock() {
	clearOutput();
	outputText("Cock removed!");
	player.removeCock();
	doNext(Camp.debugMenu);
}
function addVagina() {
	clearOutput();
	outputText("Vagina added!");
	player.createVagina(true, 1, 0);
	doNext(Camp.debugMenu);
}
function removeVagina() {
	clearOutput();
	outputText("Vagina removed!");
	player.removeVagina();
	doNext(Camp.debugMenu);
}
function addBreastRow() {
    clearOutput();
    outputText("Breast row added!");
    player.createBreastRow(0, 1);
    doNext(Camp.debugMenu);
}
function removeBreastRow() {
    clearOutput();
    outputText("Breast row removed!");
    player.removeBreastRow();
    doNext(Camp.debugMenu);
}
function giveXP() {
    clearOutput();
    player.XP += 100;
    Camp.debugMenu();
}

Camp.doMasturbate = function() {
	clearOutput();
	outputText("(Placeholder) You masturbate furiously, cumming buckets.");
	player.orgasm();
	Time.advanceMinutes(30 - Math.floor(player.sen / 4));
	doNext(Camp.doCamp);
}