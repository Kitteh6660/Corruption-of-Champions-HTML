Inventory = [];

const inventorySlotName = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
var currentItemSlot;
var callNext;

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
    for (x = 0; x < player.keyItems.length; x++) outputText(player.keyItems[x].keyName + "<br>");
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

Inventory.inventoryCombatHandler = function() {
    outputText("<br><br>");
    combatRoundOver();
}

Inventory.deleteItemPrompt = function(item, slotNum) {
    clearOutput();
    outputText("Are you sure you want to destroy " + player.itemSlots[slotNum].quantity + "x " + item.shortName + "?  You won't be able to retrieve " + (player.itemSlots[slotNum].quantity == 1 ? "it": "them") + "!");
    menu();
    addButton(0, "Yes", Inventory.deleteItem, item, slotNum);
    addButton(1, "No", Inventory.inventoryMenu);
    //doYesNo(deleteItem, inventoryMenu);
}
Inventory.deleteItem = function(item, slotNum) {
    clearOutput();
    outputText(player.itemSlots[slotNum].quantity + "x " + item.shortName + " " + (player.itemSlots[slotNum].quantity == 1 ? "has": "have") + " been destroyed.");
    player.destroyItems(item, player.itemSlots[slotNum].quantity);
    doNext(Inventory.inventoryMenu);
}

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

Inventory.useItemNow = function(item, source) {
	clearOutput();
	if (item.canUse()) { //If an item cannot be used then canUse should provide a description of why the item cannot be used
		Inventory.useItem(item, source);
	}
	else {
		Inventory.takeItemFull(item, false, source); //Give the player another chance to take this item
	}
}

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

Inventory.itemGoNext = function() {
    if (callNext != null) {
        /*if (inCombat())
            callNext();
        else*/
            doNext(callNext);
    }
}