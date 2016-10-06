var Inventory = [];

//var keyItemList = [];

const inventorySlotName = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
var currentItemSlot;
var callNext;

// Call the inventory menu
Inventory.inventoryMenu = function() {
    hideMenus();
	clearOutput();
    outputText("<b><u>Equipment:</u></b><br>");
	outputText("<b>Weapon:</b> " + player.weapon.equipmentName + " (Attack: " + player.weapon.attack + ")<br>");
	//outputText("<b>Shield:</b> " + player.shield.name + " (Block Rating: " + player.shieldBlock + ")<br>");
	outputText("<b>Armour:</b> " + player.armor.equipmentName + " (Defense: " + player.armor.defense + ")<br><br>");
	//outputText("<b>Upper underwear:</b> " + player.upperGarment.name + "<br>");
	//outputText("<b>Lower underwear:</b> " + player.lowerGarment.name + "<br>");
	//outputText("<b>Accessory:</b> " + player.jewelryName + "<br>");
    
    if (player.keyItems.length > 0) outputText("<b><u>Key Items:</u></b><br>");
    for (x = 0; x < player.keyItems.length; x++) outputText(player.keyItems[x].ktype.id + "<br>");
    outputText("<br>To discard unwanted items, hold Shift then click any of the items.");
    if (inCombat()) {
        callNext = Inventory.inventoryCombatHandler;
    }
    else {
        callNext = Inventory.inventoryMenu;
    }
	menu();
	for (var i = 0; i < 10; i++) { //Supports up to 10 items. You begin with 3 slots.
		if (player.itemSlots[i].quantity > 0 && i < player.getMaxSlots()) {
			addButton(i, player.itemSlots[i].itype.shortName + " x" + player.itemSlots[i].quantity, Inventory.useItemInInventory, i, null, null, player.itemSlots[i].itype.getTooltipDescription(), capitalize(player.itemSlots[i].itype.longName));
		}
	}
	addButton(10, "Unequip", Inventory.unequipMenu);
	addButton(14, "Back", playerMenu);
}

// Call the unequip menu
Inventory.unequipMenu = function() {
	clearOutput();
	outputText("Which would you like to unequip?<br><br>");
	menu();
	if (player.weapon.id != "Nothing") {
		addButton(0, "Weapon", Inventory.unequipWeapon, null, null, null, player.weapon.getTooltipDescription(), capitalizeFirstLetter(player.weapon.equipmentName));
	}
	/*if (player.shield != ShieldLib.NOTHING) {
		addButton(1, "Shield", unequipShield, null, null, null, player.shield.description, capitalizeFirstLetter(player.shield.name));
	}
	if (player.jewelry != JewelryLib.NOTHING) {
		addButton(2, "Accessory", unequipJewel, null, null, null, player.jewelry.description, capitalizeFirstLetter(player.jewelry.name));
	}*/
	if (player.armor.id != "Nothing") {
		addButton(5, "Armour", Inventory.unequipArmor, null, null, null, player.armor.getTooltipDescription(), capitalizeFirstLetter(player.armor.equipmentName));
	}
	/*if (player.upperGarment != UndergarmentLib.NOTHING) {
		addButton(6, "Upperwear", unequipUpperwear, null, null, null, player.upperGarment.description, capitalizeFirstLetter(player.upperGarment.name));
	}
	if (player.lowerGarment != UndergarmentLib.NOTHING) {
		addButton(7, "Lowerwear", unequipLowerwear, null, null, null, player.lowerGarment.description, capitalizeFirstLetter(player.lowerGarment.name));
	}*/			
	addButton(14, "Back", Inventory.inventoryMenu);
}

// Performs unequipping of the relevant item type
Inventory.unequipWeapon = function() {
	clearOutput();
	var oldWeapon = lookupItem(player.weapon.id);
	player.weapon = Items.NOTHING;
	Inventory.takeItem(oldWeapon, Inventory.unequipMenu);
}
Inventory.unequipArmor = function() {
	clearOutput();
	var oldArmor = lookupItem(player.armor.id);
	player.armor = Items.NOTHING;
	Inventory.takeItem(oldArmor, Inventory.unequipMenu);
}

// Puts item into inventory
Inventory.takeItem = function(itype, nextAction, overrideAbandon, source) {
	if (overrideAbandon == undefined) {
		overrideAbandon = nextAction;
	}
	/*if (itype == null) {
		CoC_Settings.error("takeItem(null)");
		return;
	}*/
	if (itype == Items.NOTHING) return;
	if (nextAction != null)
		callNext = nextAction;
	else callNext = playerMenu;
	//Check for an existing stack with room in the inventory and return the value for it.
	var temp = player.roomInExistingStack(itype);
	if (temp >= 0) { //First slot go!
		player.itemSlots[temp].quantity++;
		outputText("You place " + itype.longName + " in your " + inventorySlotName[temp] + " pouch, giving you " + player.itemSlots[temp].quantity + " of them.");
		Inventory.itemGoNext();
		return;
	}
	//If not done, then put it in an empty spot!
	//Throw in slot 1 if there is room
	temp = player.emptySlot();
	if (temp >= 0) {
		player.itemSlots[temp].setItemAndQty(itype, 1);
		outputText("You place " + itype.longName + " in your " + inventorySlotName[temp] + " pouch.");
        Inventory.itemGoNext();
		return;
	}
	if (overrideAbandon != null) //callOnAbandon only becomes important if the inventory is full
		callOnAbandon = overrideAbandon;
	else callOnAbandon = callNext;
	//OH NOES! No room! Call replacer functions!
	Inventory.takeItemFull(itype, true, source);
}

// Uses an item from the inventory
Inventory.useItemInInventory = function(slotNum) {
    clearOutput();
    //if (player.itemSlots[slotNum].itype.type == ITEM_TYPE_CONSUMABLE) {
        var item = player.itemSlots[slotNum].itype;
        if (shiftKeyDown) {
            Inventory.deleteItemPrompt(item, slotNum);
            return;
        }
        if (item.canUse()) { //If an item cannot be used then canUse should provide a description of why the item cannot be used
            player.itemSlots[slotNum].removeOneItem();
            Inventory.useItem(item, player.itemSlots[slotNum]);
            return;
        }
    //}
    //else {
    //    outputText("You cannot use " + player.itemSlots[slotNum].itype.longName + "!\n\n");
    //}
    Inventory.itemGoNext(); //Normally returns to the inventory menu. In combat it goes to the inventoryCombatHandler function
}

// Handles a bit of inventory cleanup from combat
Inventory.inventoryCombatHandler = function() {
    outputText("<br><br>");
    combatRoundOver();
}

// Prompts to destroys an item
Inventory.deleteItemPrompt = function(item, slotNum) {
    clearOutput();
    outputText("Are you sure you want to destroy " + player.itemSlots[slotNum].quantity + "x " + item.shortName + "?  You won't be able to retrieve " + (player.itemSlots[slotNum].quantity == 1 ? "it": "them") + "!");
    menu();
    addButton(0, "Yes", Inventory.deleteItem, item, slotNum);
    addButton(1, "No", Inventory.inventoryMenu);
    //doYesNo(deleteItem, inventoryMenu);
}

// Deletes an item
Inventory.deleteItem = function(item, slotNum) {
    clearOutput();
    outputText(player.itemSlots[slotNum].quantity + "x " + item.shortName + " " + (player.itemSlots[slotNum].quantity == 1 ? "has": "have") + " been destroyed.");
    player.destroyItems(item, player.itemSlots[slotNum].quantity);
    doNext(Inventory.inventoryMenu);
}

// Use an item
Inventory.useItem = function(item, fromSlot) {
    item.useText();
    /*if (item) {
        player.armor.removeText();
        item = player.setArmor(item as Armor); //Item is now the player's old armor
        if (item == null)
            itemGoNext();
        else takeItem(item, callNext);
    }
    else if (item is Weapon) {
        player.weapon.removeText();
        item = player.setWeapon(item as Weapon); //Item is now the player's old weapon
        if (item == null)
            itemGoNext();
        else takeItem(item, callNext);
    }
    else if (item is Jewelry) {
        player.jewelry.removeText();
        item = player.setJewelry(item as Jewelry); //Item is now the player's old jewelry
        if (item == null)
            itemGoNext();
        else takeItem(item, callNext);
    }
    else if (item is Shield) {
        player.shield.removeText();
        item = player.setShield(item as Shield); //Item is now the player's old shield
        if (item == null)
            itemGoNext();
        else takeItem(item, callNext);
    }
    else if (item is Undergarment) {
        if (item["type"] == 0) player.upperGarment.removeText();
        else player.lowerGarment.removeText();
        item = player.setUndergarment(item as Undergarment, item["type"]); //Item is now the player's old shield
        if (item == null)
            itemGoNext();
        else takeItem(item, callNext);
    }
    else {*/
        currentItemSlot = fromSlot;
        if (!item.useItem()) Inventory.itemGoNext(); //Items should return true if they have provided some form of sub-menu.
        //This is used for Reducto and GroPlus (which always present the player with a sub-menu)
        //and for the Kitsune Gift (which may show a sub-menu if the player has a full inventory)
    //				if (!item.hasSubMenu()) itemGoNext(); //Don't call itemGoNext if there's a sub menu, otherwise it would never be displayed
    //}
}

// Try to take an item when the slot is full
Inventory.takeItemFull = function(itype, showUseNow, source) {
	outputText("There is no room for " + itype.longName + " in your inventory.  You may replace the contents of a pouch with " + itype.longName + " or abandon it.");
	menu();
	for (x = 0; x < 10; x++) {
		if (player.itemSlots[x].itype != Items.NOTHING && x < player.getMaxSlots())
			addButton(x, (player.itemSlots[x].itype.shortName + " x" + player.itemSlots[x].quantity), Inventory.replaceItem, itype, x);
	}
	if (source != null) {
		var currentItemSlot = source;
		addButton(12, "Put Back", createCallBackFunction(Inventory.returnItemToInventory, itype, false));
	}
	if (showUseNow) addButton(13, "Use Now", Inventory.useItemNow, itype, source);
	addButton(14, "Abandon", callOnAbandon); //Does not doNext - immediately executes the callOnAbandon function
}


// Returns an item to the inventory if necessary
Inventory.returnItemToInventory = function(item, showNext) { //Used only by items that have a sub menu if the player cancels
    //Return item to inventory
    if (currentItemSlot == null) {
        Inventory.takeItem(item, callNext, callNext, null); //Give player another chance to put item in inventory
    }
    else if (currentItemSlot.quantity > 0) { //Add it back to the existing stack
        currentItemSlot.quantity++;
    }
    else { //Put it back in the slot it came from
        currentItemSlot.setItemAndQty(item, 1);
    }
    //Post-process
	if (inCombat()) {
        outputText("<br><br>");
		combatRoundOver();
		return;
	}
	if (showNext)
		doNext(callNext); //Items with sub menus should return to the inventory screen if the player decides not to use them
	else callNext(); //When putting items back in your stash we should skip to the take from stash menu
}

// Using items before they go into the inventory, like after combat.
Inventory.useItemNow = function(item, source) {
	clearOutput();
	if (item.canUse()) { //If an item cannot be used then canUse should provide a description of why the item cannot be used
		Inventory.useItem(item, source);
	}
	else {
		Inventory.takeItemFull(item, false, source); //Give the player another chance to take this item
	}
}


// Replacing one item with another
Inventory.replaceItem = function(itype, slotNum) {
	clearOutput();
	if (player.itemSlots[slotNum].itype == itype) //If it is the same as what's in the slot...just throw away the new item
		outputText("You discard " + itype.longName + " from the stack to make room for the new one.");
	else { //If they are different...
		if (player.itemSlots[slotNum].quantity == 1) outputText("You throw away " + player.itemSlots[slotNum].itype.longName + " and replace it with " + itype.longName + ".");
		else outputText("You throw away " + player.itemSlots[slotNum].itype.longName + "(x" + player.itemSlots[slotNum].quantity + ") and replace it with " + itype.longName + ".");
		player.itemSlots[slotNum].setItemAndQty(itype, 1);
	}
	Inventory.itemGoNext();
}

// Uncertain
Inventory.itemGoNext = function() {
    if (callNext != null) {
        /*if (inCombat())
            callNext();
        else*/
            doNext(callNext);
    }
}


// Probably don't need this code anymore with new keyItems methods
/*
Inventory.newKeyItemAdd = function (name, var1, var2, var3, var4) {
    keyItemList.push({keyName: name, 
                      value1: var1, 
                      value2: var2, 
                      value3: var3, 
                      value4: var4});
    var keySlot = keyItemList.length;
    //outputText("<br><br> DEBUGGING CODE: NEW KEYITEM FOR PLAYER is " + keyItemList[keySlot-1].keyName);
};

// New function to replace bad code. This goes through the Key Items array and returns the index if there's a match.

Inventory.hasKeyItem = function(name) {
    if (name == undefined)
        return -1;
    for (var counter = 0; counter < keyItemList.length; counter++)
        {
            outputText(counter);
            if (keyItemList[counter].keyName == ktype.value)
                return counter;
        }
    return -1;
};
*/

//-----------
// Stash Code
//-----------

/* An explanation of the inventory storage array.

Player storage array is defined and initialized in player.js. Currently, it has 55 slots (0-54). The slots are divided up as follows:

0-9 - Normal player inventory (10 slots)
10-18 - Weapon rack inventory (9 slots)
19-27 - Armor rack inventory (9 slots)
28-36 - Shield rack inventory (9 slots)

Additional slots are for extra inventory spaces that will be added once items are equipped. If you want to create more
space for inventory slots, go into player.js and increase the number. 

Adding things this way could make it possible to use the standard take/put inventory functions, but that's a job for
a later refactoring.
 */


// Used to decide whether to show the stash button or not.
Inventory.showStash = function(bool) {
    // Code in Anemone Barrel, Jewelry Box, Storage Chests, and Dresser when we get that far. full code from original is:
    // return player.hasKeyItem("Equipment Rack - Weapons") >= 0 || player.hasKeyItem("Equipment Rack - Armor") >= 0 || itemStorage.length > 0 || flags[kFLAGS.ANEMONE_KID] > 0 || player.hasKeyItem("Equipment Storage - Jewelry Box") >= 0 || flags[kFLAGS.CAMP_CABIN_FURNITURE_DRESSER] > 0;
    if (gameFlags[HAS_ARMOR_RACK] == 1 || gameFlags[HAS_WEAPON_RACK] == 1 || gameFlags[HAS_EQUIPMENT_RACK] == 1) {
        return true;
    }
    else
        {
            return false;
        }
};

// Stash menu, crazy crazy stash menu
Inventory.stashMenu = function () {
    hideMenus();
	clearOutput();
	//spriteSelect(-1);
	menu();
	/* Anemone Kid stuff
    if (flags[kFLAGS.ANEMONE_KID] > 0) {
        kGAMECLASS.anemoneScene.anemoneBarrelDescription();
		if (model.time.hours >= 6) addButton(4, "Anemone", kGAMECLASS.anemoneScene.approachAnemoneBarrel);
	}
    */
    /* Camp Chest Stuff
    if (player.hasKeyItem("Camp - Chest") >= 0 || player.hasKeyItem("Camp - Murky Chest") >= 0 || player.hasKeyItem("Camp - Ornate Chest") >= 0) {
        var chestArray:Array = [];
		if (player.hasKeyItem("Camp - Chest") >= 0) chestArray.push("a large wood and iron chest");
		if (player.hasKeyItem("Camp - Murky Chest") >= 0) chestArray.push("a medium damp chest");
		if (player.hasKeyItem("Camp - Ornate Chest") >= 0) chestArray.push("a medium gilded chest");
		outputText("You have " + formatStringArray(chestArray) + " to help store excess items located ");
		if (camp.homeDesc() == "cabin") outputText("inside your cabin");
		else outputText("near the portal entrance");
		outputText(".\n\n");
		addButton(0, "Chest Store", pickItemToPlaceInCampStorage);
		if (hasItemsInStorage()) addButton(1, "Chest Take", pickItemToTakeFromCampStorage);
    }
    */
	// Weapon Rack
    if (gameFlags[HAS_WEAPON_RACK] == 1) {
        outputText("There's a weapon rack set up here, set up to hold up to nine various weapons.<br><br>");
		addButton(2, "W.Rack Put", Inventory.pickItemWeaponRack);
		if (Inventory.weaponRackFilled()) addButton(3, "W.Rack Take", Inventory.takeFromWeaponRack);
    }
    //Armor Rack

	if (gameFlags[HAS_ARMOR_RACK] == 1) {
        outputText("Your camp has an armor rack set up to hold your various sets of gear.  It appears to be able to hold nine different types of armor.<br><br>");
        addButton(5, "A.Rack Put", Inventory.pickItemArmorRack);
		if (Inventory.armorRackFilled()) addButton(6, "A.Rack Take", Inventory.takeFromArmorRack);
    }

	//Shield Rack
    if (gameFlags[HAS_EQUIPMENT_RACK] == 1) {
        outputText("There's a shield rack set up here, set up to hold up to nine various shields.<br><br>");
		addButton(7, "S.Rack Put", Inventory.pickItemShieldRack);
		if (Inventory.shieldRackFilled()) addButton(8, "S.Rack Take", Inventory.takeFromShieldRack);
    }
    
    /* Jewelry Box Code
			if (player.hasKeyItem("Equipment Storage - Jewelry Box") >= 0) {
				outputText("Your jewelry box is located ");
				if (flags[kFLAGS.CAMP_BUILT_CABIN] > 0 && flags[kFLAGS.CAMP_CABIN_FURNITURE_BED])
				{
					if (flags[kFLAGS.CAMP_CABIN_FURNITURE_DRESSER]) outputText("on your dresser inside your cabin.");
					else
					{
						if (flags[kFLAGS.CAMP_CABIN_FURNITURE_NIGHTSTAND]) outputText("on your nightstand inside your cabin.");
						else  outputText("under your bed inside your cabin.");
					}
				}
				else outputText("next to your bedroll.");	
				addButton(10, "J.Box Put", inventory.pickItemToPlaceInJewelryBox);
				if (inventory.jewelryBoxDescription()) addButton(11, "J.Box Take", inventory.pickItemToTakeFromJewelryBox);
				outputText("\n\n", false);
			}*/
    
    /* Dresser Code
			if (flags[kFLAGS.CAMP_CABIN_FURNITURE_DRESSER] > 0) {
				outputText("You have a dresser inside your cabin to store nine different types of undergarments.");
				addButton(12, "Dresser Put", inventory.pickItemToPlaceInDresser);
				if (inventory.dresserDescription()) addButton(13, "Dresser Take", inventory.pickItemToTakeFromDresser);
				outputText("\n\n");
			}*/
    addButton(14, "Back", Camp.doCamp); //check out playerMenu too
};

// These next functions are used to check if things are in the stash already to make the removal buttons appear in the menu.
// Eventually will need to add in functions for chest, jewelry box, etc.
// TODO Test these once put code is complete
Inventory.weaponRackFilled = function() {
	if (Inventory.itemAnyInStorage(player.itemSlots, 10, 18)) {
		var itemList = [];
		for (x = 10; x < 19; x++) {
			if (player.itemSlots[x].quantity > 0) itemList[itemList.length] = player.Itemslots[x].itype.longName;
			outputText("  It currently holds " + formatStringArray(itemList) + ".");
			return true;
		}
		return false;
	}
};

Inventory.armorRackFilled = function() {
    if (Inventory.itemAnyInStorage(19, 27)) {
        var itemList = [];
        for (x = 19; x < 28; x++) {
            if (player.itemSlots[x].quantity > 0) itemList[itemList.length] = player.itemSlots[x].itype.longName;
			outputText("  It currently holds " + formatStringArray(itemList) + ".");
			return true;
			}
        return false;
    }
};

Inventory.shieldRackFilled = function() {
    if (Inventory.itemAnyInStorage(player.itemSlots, 28, 36)) {
        var itemList = [];
        for (x = 28; x < 37; x++) {
            if (player.itemSlots[x].quantity > 0) itemList[itemList.length] = player.itemSlots[x].itype.longName;
			outputText("  It currently holds " + formatStringArray(itemList) + ".");
			return true;
			}
        return false;
    }
};

// These are used to pick an item from storage to put back into inventory

Inventory.takeFromWeaponRack = function() {
	callNext = Inventory.takeFromWeaponRack;
	Inventory.takeFromStorage(player.itemSlots, 9, 18, "rack");
};

Inventory.takeFromArmorRack = function() {
	callNext = Inventory.takeFromArmorRack;
	Inventory.takeFromStorage(player.itemSlots, 19, 27, "rack");
};

Inventory.takeFromShieldRack = function() {
    callNext = Inventory.takeFromShieldRack;
	Inventory.takeFromStorage(player.itemSlots, 28, 36, "rack");
};
		

// The following functions pass necessary information to Inventory.placeInStorage for menu display.
Inventory.pickItemWeaponRack = function() {
    Inventory.placeInStorage(Inventory.placeInWeaponRack, Inventory.weaponAcceptable, "weapon rack", true);
};

Inventory.pickItemShieldRack = function() {
 Inventory.placeInStorage(Inventory.placeInShieldRack, Inventory.shieldAcceptable, "shield rack", true);
};

Inventory.pickItemArmorRack = function() {
    Inventory.placeInStorage(Inventory.placeInArmorRack, Inventory.armorAcceptable, "armor rack", true);
};
//function pickItemToPlaceInCampStorage() { pickItemToPlaceInStorage(placeInCampStorage, allAcceptable, "storage containers", false); };
//function pickItemToPlaceInJewelryBox() { pickItemToPlaceInStorage(placeInJewelryBox, jewelryAcceptable, "jewelry box", true); };
//function pickItemToPlaceInDresser() { pickItemToPlaceInStorage(placeInDresser, undergarmentAcceptable, "dresser", true); };


// These functions test to see if the right item type is being put into the right stash.
Inventory.allAcceptable = function(itype) { return true; };

Inventory.armorAcceptable = function(type) {
    if (type == ITEM_TYPE_ARMOUR) return true;
    return false; };

Inventory.weaponAcceptable = function(type) {
    if (type == ITEM_TYPE_WEAPON) return true;
    return false; };

Inventory.shieldAcceptable = function(type) {
    if (type == ITEM_TYPE_SHIELD) return true;
    return false; };
//function jewelryAcceptable(itype) { return itype is Jewelry; };
//function undergarmentAcceptable(itype) { return itype is Undergarment; };


// This function displays the menu for placing items into storage and checks player item types for storage type compatibilty.
Inventory.placeInStorage = function(placeInStorageFunction, typeAcceptableFunction, text, showEmptyWarning) {
    clearOutput(); 
    hideUpDown();
	outputText("Which item slot do you wish to empty into your " + text + "?<br><br>");
	menu();
    var foundItem = false;
    for (x = 0; x < 10; x++) {
    	if (typeAcceptableFunction(player.itemSlots[x].itype.type) == true) {
    		addButton(x, (player.itemSlots[x].itype.shortName + " x" + player.itemSlots[x].quantity), placeInStorageFunction, x);
            foundItem = true;
        }
    }
    if (showEmptyWarning && !foundItem) outputText("\n<b>You have no appropriate items to put in your " + text + ".</b>");
    addButton(14, "Back", Inventory.stashMenu);
};
    

/* For storage chests
function placeInCampStorage(slotNum) {
    placeIn(itemStorage, 0, itemStorage.length, slotNum);
	doNext(pickItemToPlaceInCampStorage);
};
*/

// For weapon rack
Inventory.placeInWeaponRack = function(slotNum) {
	Inventory.placeIn(10, 18, slotNum);
	doNext(Inventory.pickItemWeaponRack);
};

// For armor rack
Inventory.placeInArmorRack = function(slotNum) {
    Inventory.placeIn(19, 27, slotNum);
    doNext(Inventory.pickItemArmorRack);
};
		
// For shield rack
Inventory.placeInShieldRack = function(slotNum) {
    Inventory.placeIn(28, 36, slotNum);
	doNext(Inventory.pickItemShieldRack);
};

/* For jewelry box
function placeInJewelryBox(slotNum) {
    placeIn(player.Itemslots, 18, 27, slotNum);
	doNext(pickItemToPlaceInJewelryBox);
};
*/

/* For dresser
function placeInDresser(slotNum) {
    placeIn(player.Itemslots, 27, 36, slotNum);
	doNext(pickItemToPlaceInDresser);
}
*/

// This function put the stash item into the player.itemSlots array for later retrieval
Inventory.placeIn = function(startSlot, endSlot, slotNum) {
    clearOutput(); // Clear the output
	var x = startSlot; // Get the starting slot in the player.Itemslots array for our loop

	//player.itemSlots[slotNum].emptySlot(); // Empty the slot TODO Check this with multiple items

	//First, do we have that item already within the right range of player.itemSlots?
	for (x = startSlot; x < endSlot; x++) { //Find any slots which already hold the item that is being stored
		if (player.itemSlots[x].itype == player.itemSlots[slotNum].itype && player.itemSlots[x].quantity < 5) { // If there is an item of the same kind and there is less than five...
			player.itemSlots[x].quantity += 1; // Increase the quantity in the slot
			outputText("You add " + player.itemSlots[slotNum].itype.shortName + " into storage slot " + num2Text(x + 1 - startSlot) + ".<br>"); //TODO Take out storage slot number after stash code is complete.
			player.itemSlots[slotNum].removeOneItem();
			return;
		}
	}

	//If not, let's slap it into an empty slot
	for (x = startSlot; x < endSlot; x++) { //Find any empty slots and put the item(s) there
		if (player.itemSlots[x].quantity == 0) {
			player.itemSlots[x].setItemAndQty(player.itemSlots[slotNum].itype, 1);
			outputText("You place " + player.itemSlots[slotNum].itype.shortName + " into storage slot " + num2Text(x + 1 - startSlot) + ".<br>");  //TODO Take out storage slot number after stash code is complete.
			player.itemSlots[slotNum].removeOneItem();
			return;
		}
	}

	//Else, say that we are full
	outputText("There is no room for " + player.itemSlots[slotNum].shortName + ". You leave it in your inventory.<br>");


//var temp = 5 - storage[x].quantity; // Used for multiple quanties of the same item in the same slot

};

// This function takes an item out of storage
Inventory.takeFromStorage = function(Array, startSlot, endSlot, text) {
    clearOutput(); 
    hideUpDown();
	if (!Inventory.itemAnyInStorage(startSlot, endSlot)) { //If no items are left then return to the camp menu. Can only happen if the player removes the last item.
        playerMenu();
		return;
    }
	outputText("What " + text + " slot do you wish to take an item from?");
	var button = 0;
    menu();
	for (var x = startSlot; x < endSlot; x++, button++) {
        if (player.itemSlots[x].quantity > 0) addButton(button, (player.itemSlots[x].itype.shortName + " x" + player.itemSlots[x].quantity), Inventory.pickFrom, x);
    }
    addButton(14, "Back", Inventory.stashMenu);
};

Inventory.pickFrom = function(slotNum) {
    clearOutput();
	var itype = player.itemSlots[slotNum].itype;
	player.itemSlots[slotNum].removeOneItem();
    Inventory.takeItem(itype, callNext, callNext, player.itemSlots[slotNum]);
};


Inventory.itemAnyInStorage = function(startSlot, endSlot) {
			for (var x = startSlot; x < endSlot; x++) {
				if (player.itemSlots[x] != Item.NOTHING)
                    if (player.itemSlots[x].quantity > 0) return true;
			}
			return false;
}
    
