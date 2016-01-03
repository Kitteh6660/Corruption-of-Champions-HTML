ItemLib = []; //Hold item IDs for purpose of looking up or for save data.
Items = [];

ITEM_TYPE_WEAPON = "Weapons";
ITEM_TYPE_ARMOR = "Armors";
ITEM_TYPE_CONSUMABLE = "Consumables";
ITEM_TYPE_MATERIAL = "Materials";

function Item(itemId, itemShortName, itemLongName, itemType) {
	//Required values, will be declared by parameters
	this.id = itemId;
	this.shortName = itemShortName;
	this.longName = itemLongName;
	this.type = itemType;
	
	//Optional
	this.description = ""; //This will appear on tooltip.
	this.value = 6; //The value in gems. Defaults at 6.
	
	//Consumable values that can be set
	this.consumeEffect = null;
	
	//Equipment values that can be set
	this.equipmentName = "";
	this.attack = 0;
	this.defense = 0;
	this.sexiness = 0;
	this.verb = "";
	//Add to library for lookup.
	ItemLib[this.id] = this;
}

Item.prototype.canUse = function() {
	return true;
}

Item.prototype.useItem = function() {
	if (this.type == ITEM_TYPE_CONSUMABLE) {
		if (this.consumeEffect != null) {
			this.consumeEffect();
		}
		return true;
	}
    if (this.type == ITEM_TYPE_WEAPON || this.type == ITEM_TYPE_ARMOR) {
        this.equipItem();
        return true;
    }
	return false;
}

Item.prototype.useText = function() {};

Item.prototype.equipItem = function() {
    clearOutput();
    outputText("You equip your " + this.equipmentName + ".");
    var oldItem = null;
    //Determine if it's weapon or armour.
    if (this.type == ITEM_TYPE_WEAPON) {
        if (player.weapon.id != Items.Weapons.Fists.id) oldItem = lookupItem(player.weapon.id);
        player.weapon = this;
    }
    if (this.type == ITEM_TYPE_ARMOR) {
        if (player.armor.id != Items.Armor.Naked.id) oldItem = lookupItem(player.armor.id);
        player.armor = this;
    }
    //Check if you aren't previously using fists or naked.
    if (oldItem != null) {
        outputText(" You still have your old " + oldItem.equipmentName + " left over. ");
        Inventory.takeItem(oldItem, Inventory.inventoryMenu);
    }
    else
        doNext(Inventory.inventoryMenu);
}

Item.prototype.unequipItem = function() { //TODO

}

Items.NOTHING = new Item("Nothing", "NOTHING!", "nothing", ITEM_TYPE_CONSUMABLE);
Items.NOTHING.value = 0;