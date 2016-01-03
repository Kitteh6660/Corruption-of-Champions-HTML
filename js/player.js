function Player() {
	this.a = "";
	this.name = "";
	this.refName = "You";
	this.isAre = "are";
	this.heShe = "you";
	this.himHer = "you";
	this.hisHer = "your";
	
	//Appearance
	this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
	this.tallness = 60; //Height in inches
	this.skinTone = "light";
	this.skinType = SKIN_TYPE_PLAIN;
	this.skinAdj = "";
	this.hairType = HAIR_NORMAL;
	this.hairColor = "brown";
	this.hairLength = 1;
	this.beardType = BEARD_NORMAL;
	this.beardLength = 0;
	this.furColor = "none";
	
	this.earType = EARS_HUMAN;
	this.tailType = TAIL_TYPE_NONE;
	this.tailVenom = 0;
	this.tailRecharge = 0;
	this.lowerBody = LOWER_BODY_TYPE_HUMAN;
	
	this.tone = 50;
	this.thickness = 50;
	this.hipRating = HIP_RATING_BOYISH;
	this.buttRating = BUTT_RATING_AVERAGE;

	//Sexual Characteristics
	//Cocks
	this.cocks = [];
	this.balls = 0;
	this.ballSize = 0;
	this.hoursSinceCum = 0;
	this.cumMultiplier = 0;
	//Vaginas
	this.vaginas = [];
	//Ass
	this.ass = new Ass(1, 0, true);
	//Breasts
	this.breastRows = [];
	this.lactationMultiplier = 0;

    //Equipment
	this.weapon = Items.Weapons.Fists;
	this.armor = Items.Armor.ComfortableClothes;

    this.teaseLevel = 0;
    this.teaseXP = 0;

	this.itemSlots = [];
    for (var i = 0; i < 10; i++) {
        this.itemSlots.push(new ItemSlot());
    }
	this.keyItems = [];
	this.statusEffects = [];
	this.perks = [];
	
	//Stats points
	this.statPoints = 0;
	this.perkPoints = 0;
	
	//Race
	this.originalGender = 0;
	this.originalRace = "human";
	this.race = "human";
}
Player.prototype = new Creature();

var tempStr = 0;
var tempTou = 0;
var tempSpe = 0;
var tempInt = 0;

//APPEARANCE
Player.prototype.bodyType = function() {
	var desc = "";
	//OLD STUFF
	//SUPAH THIN
	if (this.thickness < 10)
	{
		//SUPAH BUFF
		if (this.tone > 90)
			desc += "a lithe body covered in highly visible muscles";
		else if (this.tone > 75)
			desc += "an incredibly thin, well-muscled frame";
		else if (this.tone > 50)
			desc += "a very thin body that has a good bit of muscle definition";
		else if (this.tone > 25)
			desc += "a lithe body and only a little bit of muscle definition";
		else
			desc += "a waif-thin body, and soft, forgiving flesh";
	}
	//Pretty thin
	else if (this.thickness < 25)
	{
		if (this.tone > 90)
			desc += "a thin body and incredible muscle definition";
		else if (this.tone > 75)
			desc += "a narrow frame that shows off your muscles";
		else if (this.tone > 50)
			desc += "a somewhat lithe body and a fair amount of definition";
		else if (this.tone > 25)
			desc += "a narrow, soft body that still manages to show off a few muscles";
		else
			desc += "a thin, soft body";
	}
	//Somewhat thin
	else if (this.thickness < 40)
	{
		if (this.tone > 90)
			desc += "a fit, somewhat thin body and rippling muscles all over";
		else if (this.tone > 75)
			desc += "a thinner-than-average frame and great muscle definition";
		else if (this.tone > 50)
			desc += "a somewhat narrow body and a decent amount of visible muscle";
		else if (this.tone > 25)
			desc += "a moderately thin body, soft curves, and only a little bit of muscle";
		else
			desc += "a fairly thin form and soft, cuddle-able flesh";
	}
	//average
	else if (this.thickness < 60)
	{
		if (this.tone > 90)
			desc += "average thickness and a bevy of perfectly defined muscles";
		else if (this.tone > 75)
			desc += "an average-sized frame and great musculature";
		else if (this.tone > 50)
			desc += "a normal waistline and decently visible muscles";
		else if (this.tone > 25)
			desc += "an average body and soft, unremarkable flesh";
		else
			desc += "an average frame and soft, untoned flesh with a tendency for jiggle";
	}
	else if (this.thickness < 75)
	{
		if (this.tone > 90)
			desc += "a somewhat thick body that's covered in slabs of muscle";
		else if (this.tone > 75)
			desc += "a body that's a little bit wide and has some highly-visible muscles";
		else if (this.tone > 50)
			desc += "a solid build that displays a decent amount of muscle";
		else if (this.tone > 25)
			desc += "a slightly wide frame that displays your curves and has hints of muscle underneath";
		else
			desc += "a soft, plush body with plenty of jiggle";
	}
	else if (this.thickness < 90)
	{
		if (this.tone > 90)
			desc += "a thickset frame that gives you the appearance of a wall of muscle";
		else if (this.tone > 75)
			desc += "a burly form and plenty of muscle definition";
		else if (this.tone > 50)
			desc += "a solid, thick frame and a decent amount of muscles";
		else if (this.tone > 25)
			desc += "a wide-set body, some soft, forgiving flesh, and a hint of muscle underneath it";
		else
		{
			desc += "a wide, cushiony body";
			if (this.gender >= 2 || this.biggestTitSize() > 3 || this.hipRating > 7 || this.buttRating > 7)
				desc += " and plenty of jiggle on your curves";
		}
	}
	//Chunky monkey
	else
	{
		if (this.tone > 90)
			desc += "an extremely thickset frame and so much muscle others would find you harder to move than a huge boulder";
		else if (this.tone > 75)
			desc += "a very wide body and enough muscle to make you look like a tank";
		else if (this.tone > 50)
			desc += "an extremely substantial frame packing a decent amount of muscle";
		else if (this.tone > 25)
		{
			desc += "a very wide body";
			if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
				desc += ", lots of curvy jiggles,";
			desc += " and hints of muscle underneath";
		}
		else
		{
			desc += "a thick";
			if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
				desc += ", voluptuous";
			desc += " body and plush, ";
			if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
				desc += " jiggly curves";
			else
				desc += " soft flesh";
		}
	}
	return desc;
}

Player.prototype.getMaxSlots = function() {
	var slots = 3;
	if (this.findPerk(PerkLib.StrongBack) >= 0)
        slots++;
	if (this.findPerk(PerkLib.StrongBack2) >= 0)
        slots++;
	return slots;
}

Player.prototype.hasItem = function(itype, minQuantity) {
	if (minQuantity == undefined) minQuantity = 1;
	return itemCount(itype) >= minQuantity;
}

Player.prototype.itemCount = function(itype) {
	var count = 0;
	for (itemSlot in this.itemSlots) {
		if (itemSlot.itype == itype) count += itemSlot.quantity;
	}
	return count;
}

Player.prototype.roomInExistingStack = function(itype) {
	for (i = 0; i < this.itemSlots.length; i++) {
		if (this.itemSlot(i).itype == itype && this.itemSlot(i).quantity != 0 && this.itemSlot(i).quantity < 5)
			return i;
	}
	return -1;
}

Player.prototype.itemSlot = function(idx) {
	return this.itemSlots[idx];
}

Player.prototype.emptySlot = function() {
	for (i = 0; i < this.itemSlots.length; i++) {
		if ((this.itemSlots[i].itype == undefined || this.itemSlots[i].itype == Items.NOTHING) && i < this.getMaxSlots()) return i;
	}
	return -1;
}

Player.prototype.destroyItems = function(itype, numOfItemToRemove) {
	for (slotNum = 0; slotNum < itemSlots.length; slotNum += 1) {
		if (this.itemSlot(slotNum).itype == itype) {
			while (this.itemSlot(slotNum).quantity > 0 && numOfItemToRemove > 0) {
				this.itemSlot(slotNum).removeOneItem();
				numOfItemToRemove--;
			}
		}
	}
	return numOfItemToRemove <= 0;
}