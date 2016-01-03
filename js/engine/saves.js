Data = [];
Data.totalSlots = 14;

//Main Data Menu
function dataScreen() {
	clearOutput();
	outputText("Here, you can save or load data.");
	menu();
	if (gameStarted) addButton(0, "Save", Data.saveScreen);
	addButton(1, "Load", Data.loadScreen);
	addButton(2, "Delete", Data.deleteScreen);
	
	addButton(14, "Back", playerMenu);
}

//Save/Load Menu
Data.saveScreen = function() {
	clearOutput();
	outputText("Please make sure to use a modern browser capable of local storage to be able to save.<br><br>");
	menu();
	for (i = 0; i < Data.totalSlots; i++) {
        outputText("Slot " + (i + 1) + ": " + Data.loadSaveDisplay("CoC_" + (i+1)) + "<br>");
		addButton(i, "Slot " + (i+1), Data.saveGame, "CoC_" + (i+1));
	}
	addButton(14, "Back", dataScreen);
}

Data.loadScreen = function() {
	clearOutput();
	menu();
	for (i = 0; i < Data.totalSlots; i++) {
		outputText("Slot " + (i + 1) + ": " + Data.loadSaveDisplay("CoC_" + (i+1)) + "<br>");
		if (localStorage["CoC_" + (i+1)] != undefined) {
			addButton(i, "Slot " + (i+1), Data.loadGame, "CoC_" + (i+1));
		}
	}
	addButton(14, "Back", dataScreen);
}

Data.deleteScreen = function() {
	clearOutput();
    outputText("Once you delete a save file, it's gone forever. So please be sure if you REALLY want to do it.<br><br>");
	menu();
	for (i = 0; i < Data.totalSlots; i++) {
        outputText("Slot " + (i + 1) + ": " + Data.loadSaveDisplay("CoC_" + (i+1)) + "<br>");
		if (localStorage["CoC_" + (i+1)] != undefined) {
			addButton(i, "Slot " + (i+1), Data.deletePrompt, "CoC_" + (i+1));
		}
	}
	addButton(14, "Back", dataScreen);
}

//SAVE GAME!
Data.saveGame = function(slot) {
	clearOutput();
	if (Data.saveGameObject(slot)) {
		outputText("Successfully saved!");
	}
	else {
		outputText("Failed to save!");
	}
	doNext(playerMenu);
}
Data.saveGameObject = function(slot) {
	//Let's try to save! Beginning with initial variables.
	var success = false;
	var saveData = {};
    try {
        //Player Data
        saveData.player = {};
        saveData.player.name = player.name;
        saveData.player.gender = player.gender;
        saveData.player.tallness = player.tallness;

        saveData.player.str = player.str;
        saveData.player.tou = player.tou;
        saveData.player.spe = player.spe;
        saveData.player.inte = player.inte;
        saveData.player.lib = player.lib;
        saveData.player.sen = player.sen;
        saveData.player.cor = player.cor;

        saveData.player.HP = player.HP;
        saveData.player.lust = player.lust;
        saveData.player.fatigue = player.fatigue;

        saveData.player.level = player.level;
        saveData.player.XP = player.XP;
        saveData.player.gems = player.gems;

        saveData.player.skinTone = player.skinTone;
        saveData.player.skinType = player.skinType;
        saveData.player.skinAdj = player.skinAdj;
        saveData.player.hairType = player.hairType;
        saveData.player.hairColor = player.hairColor;
        saveData.player.hairLength = player.hairLength;
        saveData.player.furColor = player.furColor;

        saveData.player.earType = player.earType;
        saveData.player.tailType = player.tailType;
        saveData.player.tailVenom = player.tailVenom;
        saveData.player.tailRecharge = player.tailRecharge;
        saveData.player.lowerBody = player.lowerBody;

        saveData.player.tone = player.tone;
        saveData.player.thickness = player.thickness;
        saveData.player.hipRating = player.hipRating;

        saveData.player.cocks = [];
        if (player.cocks.length > 0) {
            for (var i = 0; i < player.cocks.length; i++) {
                saveData.player.cocks[i] = player.cocks[i];
            }
        }
        saveData.player.balls = player.balls;
        saveData.player.ballSize = player.ballSize;
        saveData.player.hoursSinceCum = player.hoursSinceCum = 0;
        saveData.player.cumMultiplier = player.cumMultiplier = 0;
        //Vaginas
        saveData.player.vaginas = [];
        if (player.vaginas.length > 0) {
            for (i = 0; i < player.vaginas.length; i++) {
                saveData.player.vaginas[i] = player.vaginas[i];
            }
        }
        //Ass
        saveData.player.ass = player.ass;
        //Breasts
        saveData.player.breastRows = [];
        if (player.breastRows.length > 0) {
            for (i = 0; i < player.breastRows.length; i++) {
                saveData.player.breastRows[i] = player.breastRows[i];
            }
        }
        saveData.player.lactationMultiplier = player.lactationMultiplier;

        saveData.player.weapon = player.weapon;
        saveData.player.armor = player.armor;

        //Inventory
        saveData.player.itemSlots = [];
        for (i = 0; i < player.itemSlots.length; i++) {
            saveData.player.itemSlots.push(new ItemSlot());
            if (player.itemSlots[i].itype != undefined)
                saveData.player.itemSlots[i].id = player.itemSlots[i].itype.id;
            else
                saveData.player.itemSlots[i].id = "Nothing";
            saveData.player.itemSlots[i].quantity = player.itemSlots[i].quantity;
        }
        //Perks
        saveData.player.perks = [];
        if (player.perks.length > 0) {
            for (i = 0; i < player.perks.length; i++) {
                saveData.player.perks.push(new Perk());
                saveData.player.perks[i].id = player.perks[i].ptype.id;
                saveData.player.perks[i].value1 = player.perks[i].value1;
                saveData.player.perks[i].value2 = player.perks[i].value2;
                saveData.player.perks[i].value3 = player.perks[i].value3;
                saveData.player.perks[i].value4 = player.perks[i].value4;
            }
        }
        //Status Effects
        saveData.player.statusEffects = [];
        if (player.statusEffects.length > 0) {
            for (i = 0; i < player.statusEffects.length; i++) {
                saveData.player.statusEffects.push(new StatusEffect());
                saveData.player.statusEffects[i].id = player.statusEffects[i].stype.id;
                saveData.player.statusEffects[i].value1 = player.statusEffects[i].value1;
                saveData.player.statusEffects[i].value2 = player.statusEffects[i].value2;
                saveData.player.statusEffects[i].value3 = player.statusEffects[i].value3;
                saveData.player.statusEffects[i].value4 = player.statusEffects[i].value4;
            }
        }
        //Key Items
        saveData.player.keyItems = [];
        if (player.keyItems.length > 0) {
            for (i = 0; i < player.keyItems.length; i++) {
                saveData.player.keyItems.push(new KeyItem());
                saveData.player.keyItems[i].ktype = player.keyItems[i].ktype.id;
                saveData.player.keyItems[i].value1 = player.keyItems[i].value1;
                saveData.player.keyItems[i].value2 = player.keyItems[i].value2;
                saveData.player.keyItems[i].value3 = player.keyItems[i].value3;
                saveData.player.keyItems[i].value4 = player.keyItems[i].value4;
            }
        }

        saveData.player.statPoints = player.statPoints;
        saveData.player.perkPoints = player.perkPoints;

        //Other Data
        saveData.time = {};
        saveData.time.days = time.days;
        saveData.time.hours = time.hours;
        saveData.time.minutes = time.minutes;

        //Assign Save Version
        saveData.saveVersion = saveVersion;
        localStorage[slot] = JSON.stringify(saveData);
        //Set to successful and return
        success = true;
    }
    catch(error) {
        //Set to failed
        outputText(error + "<br><br>");
        console.error(error);
        success = false;
    }
	return success;
}
//LOAD GAME!
Data.loadGame = function(slot) {
	clearOutput();
	if (Data.loadGameObject(slot)) {
		outputText("Successfully loaded!");
		doNext(playerMenu);
	}
	else {
		outputText("Failed to load!");
		doNext(Data.loadScreen);
	}
}
Data.loadGameObject = function(slot) {
	//Let's try to load!
	var success = false;
	var saveData = JSON.parse(localStorage[slot]);
    var i;
	try {
        player = new Player();
		//Iterate through player data
		for (i in saveData.player) {
            player[i] = saveData.player[i];
		}
        //Set items
        player.itemSlots = [];
        for (var i = 0; i < 10; i++) {
            player.itemSlots.push(new ItemSlot());
        }
        for (i = 0; i < saveData.player.itemSlots.length; i++) {
            player.itemSlots[i].setItemAndQty(lookupItem(saveData.player.itemSlots[i].id), saveData.player.itemSlots[i].quantity);
        }
        //Perks
        player.perks = [];
        for (i = 0; i < saveData.player.perks.length; i++) {
            if (lookupPerk(saveData.player.perks[i].id) == undefined) continue;
            player.createPerk(lookupPerk(saveData.player.perks[i].id), saveData.player.perks[i].value1, saveData.player.perks[i].value2, saveData.player.perks[i].value3, saveData.player.perks[i].value4);
        }
        //Status Effects
        player.statusEffects = [];
        for (i = 0; i < saveData.player.statusEffects.length; i++) {
            player.createStatusEffect(lookupPerk(saveData.player.perks[i].id), saveData.player.perks[i].value1, saveData.player.perks[i].value2, saveData.player.perks[i].value3, saveData.player.perks[i].value4);
        }
        //Key Items

		//Other data
		playerMenu = Camp.doCamp;
		if (saveData.time != undefined) {
			time.days = saveData.time.days;
			time.hours = saveData.time.hours;
			time.minutes = saveData.time.minutes;
		}
		//Set to successful and return
		success = true;
	}
	catch(error) {
		//If something's wrong, tell failure.
        outputText(error + "<br><br>");
        console.error(error);
		success = false;
	}
	return success;
}
Data.loadSaveDisplay = function(slot) {
	if (localStorage[slot] == undefined) {
		return "EMPTY<br>";
	}
	var saveData = JSON.parse(localStorage[slot]);
	var holding = "";
	holding += saveData.player.name + ", Level " + saveData.player.level + "<br>"; //Get player name and level
    holding += "&nbsp;Day: " + saveData.time.days + ", Gender: "; //Get day and gender
    if (saveData.player.gender == 0)
        holding += "U";
    if (saveData.player.gender == 1)
        holding += "M";
    if (saveData.player.gender == 2)
        holding += "F";
    if (saveData.player.gender == 3)
        holding += "H";
	return holding;
}
//DELETE SAVE
Data.deletePrompt = function(slot) {
	clearOutput();
	outputText("Are you sure you want to delete this save file? You won't be able to retrieve it!");
    menu();
    addButton(0, "Yes, I'm sure!", Data.deleteSave, slot);
	addButton(1, "No, wait!", Data.deleteScreen);
}
Data.deleteSave = function(slot) {
	clearOutput();
	outputText(slot + " has been deleted.");
	delete localStorage[slot];
	doNext(Data.deleteScreen);
}
//SETTINGS DATA SAVE/LOAD
Data.saveSettings = function() {
    var success = false;
    var saveData = {};
    try {
        saveData.silly = silly;
        saveData.use12Hours = use12Hours;
        localStorage["CoC_Main"] = JSON.stringify(saveData);
        success = true;
    }
    catch(error) {
        console.error(error);
        success = false;
    }
    return success;
}
Data.loadSettings = function() {
    var success = false;
    if (localStorage["CoC_Main"] == undefined)
        return success;
    var saveData = JSON.parse(localStorage["CoC_Main"]);
    try {
        silly = saveData.silly;
        use12Hours = saveData.use12Hours;
        success = true;
    }
    catch(error) {
        console.error(error);
        success = false;
    }
    return success;
}