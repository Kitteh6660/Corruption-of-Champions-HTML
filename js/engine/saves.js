// This code handles saving and loading of games.

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

//Save Menu
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

//Load Menu
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

//Delete Save Menu
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

//Starts save process and shows whether it succeeded or not.
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

// Starts the actual save process
Data.saveGameObject = function(slot) {
	//Let's try to save! Beginning with initial variables.
	var success = false;
	var saveData = {};
    try {
        //Player Data
        saveData.player = {};
        for (i in player) {
            if (player[i] != undefined && (typeof player[i] == "string" || typeof player[i] == "number" || typeof player[i] == "boolean")) {
                saveData.player[i] = player[i];
            }
        }

        //Cocks
        saveData.player.cocks = [];
        if (player.cocks.length > 0) {
            for (var i = 0; i < player.cocks.length; i++) {
                saveData.player.cocks[i] = player.cocks[i];
            }
        }
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
        for (i = 0; i < player.breastRows.length; i++) {
            saveData.player.breastRows[i] = player.breastRows[i];
            /*player.breastRows[i] = unfuckBreastRow(player.breastRows[i]);
            saveData.player.breastRows[i].breasts = player.breastRows[i].breasts;
            saveData.player.breastRows[i].breastSize = player.breastRows[i].breastSize;
            saveData.player.breastRows[i].lactationMultiplier = player.breastRows[i].lactationMultiplier;
            saveData.player.breastRows[i].milkFullness = player.breastRows[i].milkFullness;
            saveData.player.breastRows[i].fuckable = player.breastRows[i].fuckable;
            saveData.player.breastRows[i].nipplesPerBreast = player.breastRows[i].nipplesPerBreast;
            saveData.player.breastRows[i].nippleLength = player.breastRows[i].nippleLength;*/
        }

        // Equipped weapons and armor
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
                saveData.player.keyItems[i].id = player.keyItems[i].ktype;
                saveData.player.keyItems[i].value1 = player.keyItems[i].value1;
                saveData.player.keyItems[i].value2 = player.keyItems[i].value2;
                saveData.player.keyItems[i].value3 = player.keyItems[i].value3;
                saveData.player.keyItems[i].value4 = player.keyItems[i].value4;
            }
        }

        //Player Pregnancy
        saveData.player.pregnancyIncubation = player.pregnancyIncubation;
        saveData.player.pregnancyType = player.pregnancyType;
        saveData.player.pregnancyEventArr = player.pregnancyEventArr;
        saveData.buttPregnancyIncubation = player.buttPregnancyIncubation;
        saveData.buttPregnancyType = player.buttPregnancyType;
        saveData.player.pregnancyEventNum = player.pregnancyEventNum;

        //Amily Pregnancy - This may need to go into an array for better saving?
        saveData.amilypregnancyIncubation = amily.pregnancyIncubation;
        saveData.amilypregnancyType = amily.pregnancyType;
        saveData.amilypregnancyEventArr = amily.pregnancyEventArr;
        saveData.amilybuttPregnancyIncubation = amily.buttPregnancyIncubation;
        saveData.amilybuttPregnancyType = amily.buttPregnancyType;
        saveData.amilypregnancyEventNum = amily.pregnancyEventNum;


        //Spells
        saveData.player.spells = {};
        saveData.player.spells.chargeWeapon = player.spells.chargeWeapon;
        saveData.player.spells.blind = player.spells.blind;
        saveData.player.spells.whitefire = player.spells.whitefire;
        saveData.player.spells.arouse = player.spells.arouse;
        saveData.player.spells.heal = player.spells.heal;
        saveData.player.spells.might = player.spells.might;

        //Exploration
        saveData.exploration = {};
        saveData.exploration.explored = exploration.explored;
        saveData.exploration.exploredForest = exploration.exploredForest;
        saveData.exploration.exploredLake = exploration.exploredLake;
        saveData.exploration.exploredDesert = exploration.exploredDesert;
        saveData.exploration.exploredMountain = exploration.exploredMountain;

        //Other Data
        saveData.time = {};
        saveData.time.days = time.days;
        saveData.time.hours = time.hours;
        saveData.time.minutes = time.minutes;

        //Game Flags
        saveData.gameFlags = {};
        for (i in gameFlags) {
            saveData.gameFlags[i] = gameFlags[i];
        }

        //Amily Save Test
        //if (AmilyScene.pregnancy.pregnancyTypeFlag != 0) {
        //    saveData.gameFlags[AMILY_PREGNANCY_TYPE] = AmilyScene.pregnancy.pregnancyTypeFlag;
        //    saveData.gameFlags[AMILY_INCUBATION] = AmilyScene.pregnancy.pregnancyIncubationFlag;
        //}


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

//Attempt to load a game and show if it fails or not.
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

// Loads a game
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
        //Manually set equipment
        if (saveData.player.weapon != undefined)
            player.weapon = lookupItem(saveData.player.weapon.id);
        if (saveData.player.armor != undefined)
            player.armor = lookupItem(saveData.player.armor.id);

        //Set items
        player.itemSlots = [];
        for (var i = 0; i < 56; i++) {
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
            player.createStatusEffect(lookupStatusEffects(saveData.player.statusEffects[i].id), saveData.player.statusEffects[i].value1, saveData.player.statusEffects[i].value2, saveData.player.statusEffects[i].value3, saveData.player.statusEffects[i].value4);
        }

        //Key Items
        player.keyItems = [];
        for (i = 0; i < saveData.player.keyItems.length; i++) {
            player.createKeyItem(saveData.player.keyItems[i].id
                , saveData.player.keyItems[i].value1, saveData.player.keyItems[i].value2, saveData.player.keyItems[i].value3, saveData.player.keyItems[i].value4);
            //player.createKeyItem(lookupKeyItem(saveData.player.keyItems[i].id), saveData.player.keyItems[i].value1, saveData.player.keyItems[i].value2, saveData.player.keyItems[i].value3, saveData.player.keyItems[i].value4);
        }

        //Player Pregnancy Load
        player.pregnancyIncubation = saveData.player.pregnancyIncubation;
        player.pregnancyType = saveData.player.pregnancyType;
        player.pregnancyEventArr = saveData.player.pregnancyEventArr;
        player.buttPregnancyIncubation = saveData.player.buttPregnancyIncubation;
        player.buttPregnancyType = saveData.player.buttPregnancyType;
        player.pregnancyEventNum = saveData.player.pregnancyEventNum;

        //Amily Pregnancy Load
        if (saveData.amilypregnancyIncubation == undefined) {
            amily.pregnancyIncubation = 0;
        }
        else amily.pregnancyIncubation = saveData.amilypregnancyIncubation;

        if (saveData.amilypregnancyType == undefined) {
            amily.pregnancyType = 0;
        }
        else amily.pregnancyType = saveData.amilypregnancyType;

        if (saveData.amilypregnancyEventArr == undefined) {
            amily.pregnancyEventArr = [];
        }
        else amily.pregnancyEventArr = saveData.amilypregnancyEventArr;

        if (saveData.amilybuttPregnancyIncubation == undefined) {
            amily.buttPregnancyIncubation = 0;
        }
        else amily.buttPregnancyIncubation = saveData.amilybuttPregnancyIncubation;

        if (saveData.amilybuttPregnancyType == undefined) {
            amily.buttPregnancyType = 0;
        }
        else amily.buttPregnancyType = saveData.amilybuttPregnancyType;

        if (saveData.amilypregnancyEventNum == undefined) {
            amily.pregnancyEventNum = 0;
        }
        else amily.pregnancyEventNum = saveData.amilypregnancyEventNum;




        //Spells
        if (saveData.player.spells != undefined) {
            player.spells = [];
            player.spells.chargeWeapon = saveData.player.spells.chargeWeapon;
            player.spells.blind = saveData.player.spells.blind;
            player.spells.whitefire = saveData.player.spells.whitefire;
            player.spells.arouse = saveData.player.spells.arouse;
            player.spells.heal = saveData.player.spells.heal;
            player.spells.might = saveData.player.spells.might;
        }

        //Exploration
        if (saveData.exploration != undefined) {
            exploration = [];
            exploration.explored = saveData.exploration.explored;
            exploration.exploredForest = saveData.exploration.exploredForest;
            exploration.exploredLake = saveData.exploration.exploredLake;
            exploration.exploredDesert = saveData.exploration.exploredDesert;
            exploration.exploredMountain = saveData.exploration.exploredMountain;
        }

        //Other data
		playerMenu = Camp.doCamp;
		if (saveData.time != undefined) {
			time.days = saveData.time.days;
			time.hours = saveData.time.hours;
			time.minutes = saveData.time.minutes;
		}
        if (saveData.gameFlags != undefined) {
            for (i in saveData.gameFlags) {
                if (saveData.gameFlags[i] == undefined || saveData.gameFlags[i] == null)
                    gameFlags[i] = 0;
                else
                    gameFlags[i] = saveData.gameFlags[i];
            }
        }

        /*
        //Amily Test Load
        if (saveData.amilyPregType != 0) {
            AmilyScene.pregnancy.pregnancyTypeFlag = gameFlags[saveData.amilyPregType];
            AmilyScene.pregnancy.pregnancyIncubationFlag = gameFlags[saveData.amilyPregDur];
        };
        */

        Data.fixSave();

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

Data.fixSave = function() {
    var i;
    //Fix body parts
    if (player.race != undefined)
        delete player.race; //Reset variable
    if (player.weapon.getTooltipDescription == undefined)
        delete player.weapon.getTooltipDescription;
    if (player.armor.getTooltipDescription == undefined)
        delete player.armor.getTooltipDescription;
    for (i in player.cocks) {
        fixCock(player.cocks[i]);
    }
    for (i in player.vaginas) {
        fixVagina(player.vaginas[i]);
    }
    for (i in player.breastRows) {
        unfuckBreastRow(player.breastRows[i]);
    }
    
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

        //saveData.buttonFont = buttonFont;
        saveData.mainFont = mainFont;
        saveData.mainFontSizeIndex = mainFontSizeIndex;

        //Set save to successful
        localStorage["CoC_Main"] = JSON.stringify(saveData);
        success = true;
    }
    catch(error) {
        //If errors occur, set save to failed
        console.error(error);
        success = false;
    }
    return success;
}
Data.loadSettings = function() {
    var success = false;
    if (GetIEVersion == 0) {
        if (localStorage["CoC_Main"] == undefined)
            return success;
    }
    else {
        return false;
    }
    var saveData = JSON.parse(localStorage["CoC_Main"]);
    try {
        silly = saveData.silly;
        use12Hours = saveData.use12Hours;

        mainFont = saveData.mainFont;
        mainFontSizeIndex = saveData.mainFontSizeIndex;
        applyFontSettings();
        //Set load to successful
        success = true;
    }
    catch(error) {
        console.error(error);
        success = false;
    }
    return success;
}

//Add to Data Flags
function addToGameFlags() {
    for (var i in arguments) {
        gameFlags[arguments[i]] = 0;
    }
}