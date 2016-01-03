//------------
// LEVEL UP
//------------
function levelScreen() {
	clearOutput();
	//Increment
	player.XP -= (player.level * 100);
	player.level++;
	player.statPoints += 5;
	player.perkPoints += 1;
    outputText("<b>You are now level " + num2Text(player.level) + "!</b><br><br>You have gained five attribute points and one perk point!");
	doNext(attributeMenu);
}
function attributeMenu() {
	clearOutput();
	outputText("You have " + player.statPoints + " points to spend.<br><br>");
	outputText("<b></b>Strength:</b> " + player.str + " + <b>" + tempStr + "</b> → " + (player.str + tempStr) + "<br>");
	outputText("<b>Toughness:</b> " + player.tou + " + <b>" + tempTou + "</b> → " + (player.tou + tempTou) + "<br>");
	outputText("<b>Speed:</b> " + player.spe + " + <b>" + tempSpe + "</b> → " + (player.spe + tempSpe) + "<br>");
	outputText("<b>Intelligence:</b> " + player.inte + " + <b>" + tempInt + "</b> → " + (player.inte + tempInt) + "<br>");
	menu();
	//Add attributes
	if (player.statPoints > 0) {
		if (player.str < 100) addButton(0, "STR +", addAttribute, "str");
		if (player.tou < 100) addButton(1, "TOU +", addAttribute, "tou");
		if (player.spe < 100) addButton(2, "SPE +", addAttribute, "spe");
		if (player.inte < 100) addButton(3, "INTE +", addAttribute, "int");
	}
	//Subtract attributes
	if (tempStr > 0) addButton(5, "STR -", subtractAttribute, "str");
	if (tempTou > 0) addButton(6, "TOU +", subtractAttribute, "tou");
	if (tempSpe > 0) addButton(7, "SPE +", subtractAttribute, "spe");
	if (tempInt > 0) addButton(8, "INTE +", subtractAttribute, "int");
	//Reset & Done
	addButton(4, "Reset", resetAttributes);
	addButton(9, "Done", finishAttributes);
}
function addAttribute(attribute) {
	switch(attribute) {
		case "str":
			tempStr++;
			break;
		case "tou":
			tempTou++;
			break;
		case "spe":
			tempSpe++;
			break;
		case "int":
			tempInt++;
			break;
		default:
			statPoints++; //Failsafe
	}
	player.statPoints--;
	attributeMenu();
}
function subtractAttribute(attribute) {
	switch(attribute) {
		case "str":
			tempStr--;
			break;
		case "tou":
			tempTou--;
			break;
		case "spe":
			tempSpe--;
			break;
		case "int":
			tempInt--;
			break;
		default:
			statPoints--; //Failsafe
	}
	player.statPoints++;
	attributeMenu();
}
function resetAttributes() {
	//Increment unspent attribute points.
	player.statPoints += tempStr;
	player.statPoints += tempTou;
	player.statPoints += tempSpe;
	player.statPoints += tempInt;
	//Reset temporary attributes to 0.
	tempStr = 0;
	tempTou = 0;
	tempSpe = 0;
	tempInt = 0;
	//DONE!
	attributeMenu();
}
function finishAttributes() {
	clearOutput();
	if (tempStr > 0) {
		if (tempStr >= 3) outputText("Your muscles feel significantly stronger from your time adventuring.<br>");
		else outputText("Your muscles feel slightly stronger from your time adventuring.<br>");
	}
	if (tempTou > 0) {
		if (tempTou >= 3) outputText("You feel tougher from all the fights you have endured.<br>");
		else outputText("You feel slightly tougher from all the fights you have endured.<br>");
	}
	if (tempSpe > 0) {
		if (tempSpe >= 3) outputText("Your time in combat has driven you to move faster.<br>");
		else outputText("Your time in combat has driven you to move slightly faster.<br>");
	}
	if (tempInt > 0) {
		if (tempInt >= 3) outputText("Your time spent fighting the creatures of this realm has sharpened your wit.<br>");
		else outputText("Your time spent fighting the creatures of this realm has sharpened your wit slightly.<br>");
	}
	if (tempStr + tempTou + tempSpe + tempInt <= 0 || player.statPoints > 0) {
		outputText("<br>You may allocate your remaining stat points later.");
	}
	player.modStat("str", tempStr);
	player.modStat("tou", tempTou);
	player.modStat("spe", tempSpe);
	player.modStat("int", tempInt);
	tempStr = 0;
	tempTou = 0;
	tempSpe = 0;
	tempInt = 0;
	if (player.perkPoints > 0) doNext(perkBuyMenu);
	else doNext(playerMenu);
}
function perkBuyMenu() {
    clearOutput();
    var perksAvailable = PerkMenuBuilder.buildPerkList();
    menu();
    if (perksAvailable.length > 0) {
        outputText("Please select a perk from the drop-down list, then click 'Okay'. You can press 'Skip' to save your perk point for later.<br>");
        var perkDropdownString = ""; //Will be used to be output for dropdown.
        perkDropdownString += "<select id=\"perkselect\">";
        perkDropdownString += "<option value=\"null\"></option>";
        for (var i = 0; i < perksAvailable.length; i++) {
            perkDropdownString += "<option value=\"" + perksAvailable[i].id + "\">" + perksAvailable[i].name + "</option>";
        }
        perkDropdownString += "</select><br><br>";
        outputText(perkDropdownString);
        addButton(0, "Confirm", perkConfirmation);
        addButton(1, "Skip", playerMenu);
    }
    else {
        outputText("You do not currently qualify for any perks. You still retain your perk points.");
        doNext(playerMenu);
    }
}
function perkConfirmation() {
    if (document.getElementById("perkselect").value == "null") {
        perkBuyMenu();
        return;
    }
    var perkGet = PerkLib[document.getElementById("perkselect").value];
    clearOutput();
    outputText("<b>" + perkGet.name + "</b> gained!");
    player.createPerk(perkGet, 0, 0, 0, 0);
    player.perkPoints--;
    doNext(playerMenu);
}

//------------
// STATS
//------------
function statsScreen() {
	clearOutput();
	//Combat Stats
	var combatStats = "";
	combatStats += "<b>Lust Resistance:</b> " + 0 + "% (Higher is better)<br>";
	if (combatStats.length > 0)
		outputText("<b><u>Combat Stats</u></b><br>" + combatStats + "<br>");
	//Body Stats
	var bodyStats = "";
	bodyStats += "<b>Anal Capacity:</b> " + player.analCapacity() + "<br>";
	bodyStats += "<b>Anal Looseness:</b> " + player.ass.analLooseness + "<br>";
	if (player.hasCock()) {
		bodyStats += "<b>Cum Production:</b> " + player.cumQ() + "mL<br>";
	}
	if (player.hasVagina()) {
		bodyStats += "<b>Vaginal Capacity:</b> " + player.vaginalCapacity() + "<br>";
		bodyStats += "<b>Vaginal Looseness:</b> " + player.vaginas[0].vaginalLooseness + "<br>";
	}
	if (bodyStats.length > 0)
		outputText("<b><u>Body Stats</u></b><br>" + bodyStats + "<br>");
	doNext(playerMenu);
}
//------------
// PERKS
//------------
function perksScreen() {
	clearOutput();
	for (var i = 0; i < player.perks.length; i++) {
		outputText("<b>" + player.perks[i].ptype.name + "</b> - " + player.perks[i].ptype.desc + "<br>");
	}
    doNext(playerMenu);
    //Additional buttons
    var button = 1;
    if(player.perkPoints > 0) {
        outputText("<br><b>You have " + num2Text(player.perkPoints) + " perk point");
        if (player.perkPoints > 1) outputText("s");
        outputText(" to spend.</b>");
        addButton(button++, "Perk Up", perkBuyMenu);
    }
}
//------------
// APPEARANCE
//------------
function appearanceScreen() {
	clearOutput();
	if (player.race != "human")
		outputText("You began your journey as a human, but gave that up as you explored the dangers of this realm.  ");
	outputText("You are a " + Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall " + player.maleFemaleHerm() + " " + player.race + ", with " + player.bodyType() + ".", false);
	//outputText("  <b>You are currently " + (player.armorDescript() != "gear" ? "wearing your " + player.armorDescript() : "naked") + "" + " and using your " + player.weaponName + " as a weapon.</b>", false);
	outputText("  <b>You are currently " + (player.armor.id == "Naked" ? "naked" : "wearing your " + player.armor.equipmentName) + " and using your " + player.weapon.equipmentName + " as a weapon.</b>");

	doNext(playerMenu);
}