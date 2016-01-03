function Creature() {
	this.a = "";
	this.name = "";
	this.refName = name;
	this.isAre = "is";
	this.heShe = "";
	this.himHer = "";
	this.hisHer = "";
	this.battleDesc = "";
	//Core stats
	this.str = 15;
	this.tou = 15;
	this.spe = 15;
	this.inte = 15;
	this.lib = 15;
	this.sen = 15;
	this.cor = 15;
	//Combat stats
	this.HP = 0;
	this.lust = 0;
	this.fatigue = 0;
	//Advancement
	this.level = 1;
	this.XP = 0;
	this.gems = 0;
	//Battle variables
	this.weapon = Items.Weapons.Fists;
	this.armor = Items.Armor.Naked;
	this.additionalHP = 0;
	
	//Appearance
	this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
	this.tallness = 36; //Height in inches
	this.skinTone = "";
	this.skinType = "";
	this.skinAdj = "";
	this.hairType = "";
	this.hairColor = "";
	this.hairLength = "";
	this.furColor = "";
	
	this.earType = "";
	this.tailType = "";
	this.tailVenom = 0;
	this.tailRecharge = 0;
	this.lowerBody = "";
	
	this.femininity = 50;
	this.tone = 0;
	this.thickness = 0;
	this.hipRating = 0;
	
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
	this.ass = new Ass();
	//Breasts
	this.breastRows = [];
	this.lactationMultiplier = 0;

    this.keyItems = [];
	this.statusEffects = [];
	this.perks = [];
	
	this.combatAI = this.doAI;
	//Victory/defeat
	this.victory = cleanupAfterCombat;
	this.defeat = cleanupAfterCombat;
}
//------------
// COMBAT
//------------
Creature.prototype.doAI = function() {
	switch(rand(4)) {
		default:
			this.attack();
	}
	combatRoundOver();
}
Creature.prototype.attack = function() {
	var enemy = player;
	var baseDamage = this.str + this.weapon.attack + 2;
	var damage = baseDamage *= 1 - ((Math.random() * (enemy.tou * 0.25)) / 100);
	if (damage < 1) damage = 1;
	//Round things off
	damage = Math.round(damage);
	//Apply damage
	enemy.changeHP(-damage, true);
}
Creature.prototype.victoryScene = function() {
	clearOutput();
	cleanupAfterCombat();
}
Creature.prototype.defeatScene = function() {
	clearOutput();
	cleanupAfterCombat();
}
Creature.prototype.maxHP = function() {
	var temp = 50;
	temp += this.tou * 2;
	temp += this.additionalHP;
	if (this == player) temp += this.level * 15;
	if (this.HP > temp) this.HP = temp;
	return temp;
}
Creature.prototype.maxLust = function() {
	var temp = 100;
	return temp;
}
Creature.prototype.maxFatigue = function() {
	var temp = 100;
	return temp;
}

//Combat
Creature.prototype.baseDamage = function() {
	var baseDmg = this.str + this.weapon.attack + 2;
	if (baseDmg < 10) baseDmg = 10; //Clamp minimum damage to 10 if under.
	if (baseDmg > 9999) baseDmg = 9999; //Clamp maximum damage to 9999 if over.
	return baseDmg;
}

//Stats Change
Creature.prototype.modStat = function(attribute, mod) {
	this[attribute] += mod;
	//Constrain values to max
	if (this[attribute] > 100) this[attribute] = 100;
	if (this[attribute] < 0) this[attribute] = 0;
	if (this == player) {
        if (mod > 0)
            showUpDown(attribute + "Arrow", "up");
        else if (mod < 0)
            showUpDown(attribute + "Arrow", "down");
		refreshStats();
	}
}
Creature.prototype.changeHP = function(amount, display) {
    //Defaulting
    if (display == undefined) display = false;
    //Main function
	this.HP += amount;
	if (this.HP > this.maxHP) this.HP = this.maxHP;
	if (this.HP < 0) this.HP = 0;
	if (display) {
		if (amount < 0) outputText(capitalizeFirstLetter(this.a) + " " + this.refName + " take" + (this.isAre == "is" ? "s" : "") + " <font color=\"#800000\"><b>" + Math.abs(amount) + "</b></font> damage!<br><br>");
		else if (amount > 0) outputText(capitalizeFirstLetter(this.a) + " " + this.refName + " " + this.isAre + " healed for <font color=\"#008000\"><b>" + Math.abs(amount) + "</b></font> HP!<br><br>");
	}
	if (this == player) {
        if (amount < 0)
            showUpDown("hpArrow", "down");
        else if (amount > 0)
            showUpDown("hpArrow", "up");
		refreshStats();
	}
}
Creature.prototype.changeLust = function(amount, display) {
    //Defaulting
    if (display == undefined) display = false;
    //Main function
	this.lust += amount;
	if (this.lust > this.maxLust) this.lust = this.maxLust;
	if (this.lust < 0) this.lust = 0;
	if (display) {
		if (amount < 0) outputText(capitalizeFirstLetter(this.a) + " " + this.refName + " " + this.isAre + " calmed for reduction of <font color=\"#A05050\"><b>" + Math.abs(amount) + "</b></font> lust!<br><br>");
		else if (amount > 0) outputText(capitalizeFirstLetter(this.a) + " " + this.refName + " " + this.isAre + " aroused for <font color=\"#A05050\"><b>" + Math.abs(amount) + "</b></font> points of lust!<br><br>");
	}
	if (this == player) {
        if (amount < 0)
            showUpDown("lustArrow", "down");
        else if (amount > 0)
            showUpDown("lustArrow", "up");
		refreshStats();
	}
}
Creature.prototype.changeFatigue = function(amount, display) {
    //Defaulting
    if (display == undefined) display = false;
    //Main function
	this.fatigue += amount;
	if (this.fatigue > this.maxFatigue) this.fatigue = this.maxFatigue;
	if (this.fatigue < 0) this.fatigue = 0;
	if (display) {
		if (amount < 0) outputText(capitalizeFirstLetter(this.a) + " " + this.refName + " " + this.isAre + " rejuvenated for <font color=\"#000080\"><b>" + Math.abs(amount) + "</b></font> points of fatigue!");
		else if (amount > 0) outputText(capitalizeFirstLetter(this.a) + " " + this.refName + " " + this.isAre + " fatigued for <font color=\"#000080\"><b>" + Math.abs(amount) + "</b></font> points of fatigue!");
	}
	if (this == player) {
		if (amount < 0)
            showUpDown("fatigueArrow", "down");
        else if (amount > 0)
            showUpDown("fatigueArrow", "up");
		refreshStats();
	}
}
//ORGASMS!!!!
Creature.prototype.orgasm = function() {
	this.changeLust(-this.lust);
	this.hoursSinceCum = 0;
	if (this == player) {
		refreshStats();
	}
}

//------------
// STATS/PERKS
//------------
//Perks
Creature.prototype.createPerk = function(ptype, value1, value2, value3, value4) {
    var newKeyItem = new Perk(ptype);
    //used to denote that the array has already had its new spot pushed on.
    var arrayed = false;
    //used to store where the array goes
    var keySlot = 0;
    var counter = 0;
    //Start the array if its the first bit
    if (this.perks.length == 0)
    {
        //trace("New Perk Started Array! " + keyName);
        this.perks.push(newKeyItem);
        arrayed = true;
        keySlot = 0;
    }
    //If it belongs at the end, push it on
    if (this.perks[this.perks.length - 1].perkName < ptype.name && !arrayed)
    {
        //trace("New Perk Belongs at the end!! " + keyName);
        this.perks.push(newKeyItem);
        arrayed = true;
        keySlot = perks.length - 1;
    }
    //If it belongs in the beginning, splice it in
    if (this.perks[0].perkName > ptype.name && !arrayed)
    {
        //trace("New Perk Belongs at the beginning! " + keyName);
        this.perks.splice(0, 0, newKeyItem);
        arrayed = true;
        keySlot = 0;
    }
    //Find the spot it needs to go in and splice it in.
    if (!arrayed)
    {
        //trace("New Perk using alphabetizer! " + keyName);
        counter = this.perks.length;
        while (counter > 0 && !arrayed)
        {
            counter--;
            //If the current slot is later than new key
            if (this.perks[counter].perkName > ptype.name)
            {
                //If the earlier slot is earlier than new key && a real spot
                if (counter - 1 >= 0)
                {
                    //If the earlier slot is earlier slot in!
                    if (this.perks[counter - 1].perkName <= ptype.name)
                    {
                        arrayed = true;
                        this.perks.splice(counter, 0, newKeyItem);
                        keySlot = counter;
                    }
                }
                //If the item after 0 slot is later put here!
                else
                {
                    //If the next slot is later we are go
                    if(this.perks[counter].perkName <= ptype.name) {
                        arrayed = true;
                        this.perks.splice(counter, 0, newKeyItem);
                        keySlot = counter;
                    }
                }
            }
        }
    }
    //Fallback
    if (!arrayed)
    {
        //trace("New Perk Belongs at the end!! " + keyName);
        this.perks.push(newKeyItem);
        keySlot = this.perks.length - 1;
    }

    this.perks[keySlot].value1 = value1;
    this.perks[keySlot].value2 = value2;
    this.perks[keySlot].value3 = value3;
    this.perks[keySlot].value4 = value4;
}
Creature.prototype.removePerk = function(ptype) {
    var counter = this.perks.length;
    //Various Errors preventing action
    if (perks.length <= 0)
    {
        return false;
    }
    while (counter > 0)
    {
        counter--;
        if (this.perks[counter].ptype == ptype)
        {
            this.perks.splice(counter, 1);
            return true;
        }
    }
    return false;
}
Creature.prototype.findPerk = function(ptype) {
    for (var counter = 0; counter < this.perks.length; counter++)
    {
        if (this.perks[counter].ptype.id == ptype.id)
            return counter;
    }
	return -1;
}
Creature.prototype.perkValue = function(ptype, value) {
    var counter = this.findPerk(ptype);
    if (counter < 0) {
        return 0;
    }
    if (value == 1)
        return this.perks[counter].value1;
    else if (value == 2)
        return this.perks[counter].value2;
    else if (value == 3)
        return this.perks[counter].value3;
    else if (value == 4)
        return this.perks[counter].value4;
    else
        return 0;
}
Creature.prototype.addPerkValue = function(ptype, valueIdx, bonus) {
    var counter = this.findPerk(ptype);
    if (counter < 0) return;
    if (valueIdx < 1 || valueIdx > 4) return;
    if (valueIdx == 1)
        this.perks[i].value1 += bonus;
    if (valueIdx == 2)
        this.perks[i].value2 += bonus;
    if (valueIdx == 3)
        this.perks[i].value3 += bonus;
    if (valueIdx == 4)
        this.perks[i].value4 += bonus;
}
Creature.prototype.setPerkValue = function(ptype, valueIdx, newNum) {
    var counter = this.findPerk(ptype);
    //Various Errors preventing action
    if (counter < 0) return;
    if (valueIdx < 1 || valueIdx > 4) return;
    if (valueIdx == 1)
        this.perks[i].value1 = newNum;
    if (valueIdx == 2)
        this.perks[i].value2 = newNum;
    if (valueIdx == 3)
        this.perks[i].value3 = newNum;
    if (valueIdx == 4)
        this.perks[i].value4 = newNum;
}
//Status Effects
Creature.prototype.createStatusEffect = function(stype, value1, value2, value3, value4) {
    this.statusEffects.push(new StatusEffect(stype, value1, value2, value3, value4));
}
Creature.prototype.findStatusEffect = function(stype) {
    for (var counter = 0; counter < this.statusEffects.length; counter++)
    {
        if (this.statusEffects[counter].stype == stype)
            return counter;
    }
    return -1;
}
Creature.prototype.statusEffectValue = function(stype, value) {
	var counter = this.findStatusEffect(stype);
	if (counter < 0) {
		return 0;
	}
	if (value == 1)
		return this.statusEffects[counter].value1;
	else if (value == 2)
		return this.statusEffects[counter].value2;
	else if (value == 3)
		return this.statusEffects[counter].value3;
	else if (value == 4)
		return this.statusEffects[counter].value4;
	else
		return 0;
}
Creature.prototype.addStatusValue = function(stype, valueIdx, bonus) {
    var counter = this.findStatusEffect(stype);
    if (counter < 0) return;
    if (valueIdx < 1 || valueIdx > 4) return;
    if (valueIdx == 1)
        this.statusEffects[i].value1 += bonus;
    if (valueIdx == 2)
        this.statusEffects[i].value2 += bonus;
    if (valueIdx == 3)
        this.statusEffects[i].value3 += bonus;
    if (valueIdx == 4)
        this.statusEffects[i].value4 += bonus;
}
Creature.prototype.setStatusValue = function(stype, valueIdx, newNum) {
    var counter = this.findStatusEffect(stype);
    //Various Errors preventing action
    if (counter < 0) return;
    if (valueIdx < 1 || valueIdx > 4) return;
    if (valueIdx == 1)
        this.statusEffects[i].value1 = newNum;
    if (valueIdx == 2)
        this.statusEffects[i].value2 = newNum;
    if (valueIdx == 3)
        this.statusEffects[i].value3 = newNum;
    if (valueIdx == 4)
        this.statusEffects[i].value4 = newNum;
}
//Key Items
Creature.prototype.createKeyItem = function(keyName, value1, value2, value3, value4) {
    var newKeyItem = new KeyItem();
    //used to denote that the array has already had its new spot pushed on.
    var arrayed = false;
    //used to store where the array goes
    var keySlot = 0;
    var counter = 0;
    //Start the array if its the first bit
    if (this.keyItems.length == 0)
    {
        //trace("New Key Item Started Array! " + keyName);
        this.keyItems.push(newKeyItem);
        arrayed = true;
        keySlot = 0;
    }
    //If it belongs at the end, push it on
    if (this.keyItems[keyItems.length - 1].keyName < keyName && !arrayed)
    {
        //trace("New Key Item Belongs at the end!! " + keyName);
        this.keyItems.push(newKeyItem);
        arrayed = true;
        keySlot = keyItems.length - 1;
    }
    //If it belongs in the beginning, splice it in
    if (this.keyItems[0].keyName > keyName && !arrayed)
    {
        //trace("New Key Item Belongs at the beginning! " + keyName);
        this.keyItems.splice(0, 0, newKeyItem);
        arrayed = true;
        keySlot = 0;
    }
    //Find the spot it needs to go in and splice it in.
    if (!arrayed)
    {
        //trace("New Key Item using alphabetizer! " + keyName);
        counter = this.keyItems.length;
        while (counter > 0 && !arrayed)
        {
            counter--;
            //If the current slot is later than new key
            if (this.keyItems[counter].keyName > keyName)
            {
                //If the earlier slot is earlier than new key && a real spot
                if (counter - 1 >= 0)
                {
                    //If the earlier slot is earlier slot in!
                    if (this.keyItems[counter - 1].keyName <= keyName)
                    {
                        arrayed = true;
                        this.keyItems.splice(counter, 0, newKeyItem);
                        keySlot = counter;
                    }
                }
                //If the item after 0 slot is later put here!
                else
                {
                    //If the next slot is later we are go
                    if (this.keyItems[counter].keyName <= keyName)
                    {
                        arrayed = true;
                        this.keyItems.splice(counter, 0, newKeyItem);
                        keySlot = counter;
                    }
                }
            }
        }
    }
    //Fallback
    if (!arrayed)
    {
        //trace("New Key Item Belongs at the end!! " + keyName);
        this.keyItems.push(newKeyItem);
        keySlot = this.keyItems.length - 1;
    }

    this.keyItems[keySlot].keyName = keyName;
    this.keyItems[keySlot].value1 = value1;
    this.keyItems[keySlot].value2 = value2;
    this.keyItems[keySlot].value3 = value3;
    this.keyItems[keySlot].value4 = value4;
    //trace("NEW KEYITEM FOR PLAYER in slot " + keySlot + ": " + keyItems[keySlot].keyName);
}
//------------
// SEXUAL UTIL
//------------
Creature.prototype.hasCock = function() {
	if (this.cocks.length > 0) return true;
	else return false;
}
Creature.prototype.cockTotal = function() {
	return this.cocks.length;
}
Creature.prototype.totalCocks = function() { //Alternate
	return this.cockTotal();
}
Creature.prototype.hasVagina = function() {
	if (this.vaginas.length > 0) return true;
	else return false;
}
Creature.prototype.vaginaTotal = function() {
	return this.vaginas.length;
}
Creature.prototype.vaginalCapacity = function() {
	//If the player has no vaginas
	if (this.vaginas.length == 0)
		return 0;
	var total;
	var bonus = 0;
	//Centaurs = +50 capacity
	if (this.lowerBody == 4)
		bonus = 50;
	//Naga = +20 capacity
	else if (this.lowerBody == 3)
		bonus = 20;
	//Wet pussy provides 20 point boost
	if (this.findPerk(PerkLib.WetPussy) >= 0)
		bonus += 20;
	if (this.findPerk(PerkLib.HistorySlut) >= 0)
		bonus += 20;
	if (this.findPerk(PerkLib.OneTrackMind) >= 0)
		bonus += 10;
	if (this.findPerk(PerkLib.Cornucopia) >= 0)
		bonus += 30;
	if (this.findPerk(PerkLib.FerasBoonWideOpen) >= 0)
		bonus += 25;
	if (this.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0)
		bonus += 40;
	total = (bonus + this.statusEffectValue(StatusEffects.BonusVCapacity, 1) + 8 * this.vaginas[0].vaginalLooseness * this.vaginas[0].vaginalLooseness) * (1 + this.vaginas[0].vaginalWetness / 10);
	return total;
}
Creature.prototype.analCapacity = function() {
	bonus = 0;
	//Centaurs = +30 capacity
	if (this.lowerBody == LOWER_BODY_TYPE_CENTAUR)
		bonus = 30;
	/*if (this.findPerk(PerkLib.HistorySlut) >= 0)
		bonus += 20;
	if (this.findPerk(PerkLib.Cornucopia) >= 0)
		bonus += 30;
	if (this.findPerk(PerkLib.OneTrackMind) >= 0)
		bonus += 10;
	if (this.ass.analWetness > 0)
		bonus += 15;*/
	return ((bonus + 6 * this.ass.analLooseness * this.ass.analLooseness) * (1 + this.ass.analWetness / 10))//((bonus + statusAffectv1(StatusEffects.BonusACapacity) + 6 * ass.analLooseness * ass.analLooseness) * (1 + ass.analWetness / 10));

}
Creature.prototype.cumQ = function() {
	if (!this.hasCock())
		return 0;
	var quantity = 0;

	//Base value is ballsize*ballQ*cumefficiency by a factor of 2.
	//Other things that affect it: 
	//lust - 50% = normal output.  0 = half output. 100 = +50% output.
	//trace("CUM ESTIMATE: " + int(1.25*2*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(no balls), " + int(ballSize*balls*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(withballs)");
	var lustCoefficient = (this.lust + 50) / 10;
	//If realistic mode is enabled, limits cum to capacity.
	/*if (flags[kFLAGS.HUNGER_ENABLED] >= 1) {
		lustCoefficient = (this.lust + 50) / 5;
		if (findPerk(PerkLib.PilgrimsBounty) >= 0) lustCoefficient = 30;
		var percent = 0;
		percent = lustCoefficient + (hoursSinceCum + 10);
		if (percent > 100)
			percent = 100;
		if (quantity > this.cumCapacity())
			quantity = this.cumCapacity();
		return (percent / 100) * cumCapacity();
	}*/
	//Pilgrim's bounty maxes lust coefficient
	if (this.findPerk(PerkLib.PilgrimsBounty) >= 0)
		lustCoefficient = 150 / 10;
	if (this.balls == 0)
		quantity = Math.floor(1.25 * 2 * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
	else
		quantity = Math.floor(this.ballSize * this.balls * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
	if (this.findPerk(PerkLib.BroBody) >= 0)
		quantity *= 1.3;
	if (this.findPerk(PerkLib.FertilityPlus) >= 0)
		quantity *= 1.5;
	if (this.findPerk(PerkLib.FertilityMinus) >= 0 && lib < 25)
		quantity *= 0.7;
	if (this.findPerk(PerkLib.MessyOrgasms) >= 0)
		quantity *= 1.5;
	if (this.findPerk(PerkLib.OneTrackMind) >= 0)
		quantity *= 1.1;
	if (this.findPerk(PerkLib.MaraesGiftStud) >= 0)
		quantity += 350;
	if (this.findPerk(PerkLib.FerasBoonAlpha) >= 0)
		quantity += 200;
	if (this.findPerk(PerkLib.MagicalVirility) >= 0)
		quantity += 200;
	if (this.findPerk(PerkLib.FerasBoonSeeder) >= 0)
		quantity += 1000;
	if (this.findPerk("Elven Bounty") >= 0) quantity += 250;;
	    quantity += this.perkValue(PerkLib.ElvenBounty, 1);
	if (this.findPerk(PerkLib.BroBody) >= 0)
		quantity += 200;
	if (this.findPerk(PerkLib.SatyrSexuality) >= 0)
		quantity += 50;
	quantity += this.statusEffectValue(StatusEffects.Rut, 1);
	quantity *= (1 + (2 * this.perkValue(PerkLib.PiercedFertite, 1)) / 100);
	//if (jewelryEffectId == JewelryLib.MODIFIER_FERTILITY)
	//	quantity *= (1 + (jewelryEffectMagnitude / 100));
	//trace("Final Cum Volume: " + int(quantity) + "mLs.");
	//if (quantity < 0) trace("SOMETHING HORRIBLY WRONG WITH CUM CALCULATIONS");
	if (quantity < 2)
		quantity = 2;
	if (quantity > 999999999) //Cum production is capped at 999,999,999mL.
		quantity = 999999999;
	return quantity;
}
Creature.prototype.countCocksOfType = function(type) {
    if (this.cocks.length == 0) return 0;
    var counter = 0;
    for (var x = 0; x < cocks.length; x++) {
        if (cocks[x].cockType == type) counter++;
    }
    return counter;
}

//Breasts Getter functions
Creature.prototype.biggestTitSize = function() {
	if (this.breastRows.length == 0)
		return -1;
	var counter = this.breastRows.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
			index = counter;
	}
	return this.breastRows[index].breastRating;
}

//Cock Getter functions
Creature.prototype.cockThatFits = function(capacity) {
	firstCockFit = -1;
	for (i = 0; i < this.cocks.length; i++) {
		if (this.cocks[i].cockArea() <= capacity) {
			firstCockFit = i;
			break;
		}
	}
	return firstCockFit;
}

Creature.prototype.cockArea = function(i_cockIndex) {
	if (i_cockIndex >= this.cocks.length || i_cockIndex < 0)
		return 0;
	return (this.cocks[i_cockIndex].cockThickness * this.cocks[i_cockIndex].cockLength);
}

Creature.prototype.biggestCockLength = function() {
	if (cocks.length == 0)
		return 0;
	return this.cocks[biggestCockIndex()].cockLength;
}

Creature.prototype.biggestCockArea = function() {
	if (cocks.length == 0)
		return 0;
	var counter = cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cockArea(index) < this.cockArea(counter))
			index = counter;
	}
	return this.cockArea(index);
}

//Find the second biggest dick and it's area.
Creature.prototype.biggestCockArea2 = function() {
	if (this.cocks.length <= 1)
		return 0;
	var counter = cocks.length;
	var index = 0;
	var index2 = -1;
	//Find the biggest
	while (counter > 0)
	{
		counter--;
		if (this.cockArea(index) < this.cockArea(counter))
			index = counter;
	}
	//Reset counter and find the next biggest
	counter = this.cocks.length;
	while (counter > 0)
	{
		counter--;
		//Is this spot claimed by the biggest?
		if (counter != index)
		{
			//Not set yet?
			if (index2 == -1)
				index2 = counter;
			//Is the stored value less than the current one?
			if (this.cockArea(index2) < this.cockArea(counter))
			{
				index2 = counter;
			}
		}
	}
	//If it couldn't find a second biggest...
	if (index == index2)
		return 0;
	return this.cockArea(index2);
}

Creature.prototype.longestCock = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
			index = counter;
	}
	return index;
}

Creature.prototype.longestCockLength = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
			index = counter;
	}
	return this.cocks[index].cockLength;
}

Creature.prototype.twoDickRadarSpecial = function(width) {
	//No two dicks?  FUCK OFF
	if (this.cockTotal() < 2)
		return false;
	
	//Set up vars
	//Get thinnest, work done already
	var thinnest = this.thinnestCockIndex();
	var thinnest2 = 0;
	//For ze loop
	var temp = 0;
	//Make sure they arent the same at initialization
	if (thinnest2 == thinnest)
		thinnest2 = 1;
	//Loop through to find 2nd thinnest
	while (temp < this.cocks.length)
	{
		if (cocks[thinnest2].cockThickness > cocks[temp].cockThickness && temp != thinnest)
			thinnest2 = temp;
		temp++;
	}
	//If the two thicknesses added together are less than the arg, true, else false
	return cocks[thinnest].cockThickness + cocks[thinnest2].cockThickness < width;
}

Creature.prototype.totalCockThickness = function() {
	var thick = 0;
	var counter = this.cocks.length;
	while (counter > 0)
	{
		counter--;
		thick += this.cocks[counter].cockThickness;
	}
	return thick;
}

Creature.prototype.thickestCock = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
			index = counter;
	}
	return index;
}

Creature.prototype.thickestCockThickness = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
			index = counter;
	}
	return this.cocks[index].cockThickness;
}

Creature.prototype.thinnestCockIndex = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cocks[index].cockThickness > this.cocks[counter].cockThickness)
			index = counter;
	}
	return index;
}

Creature.prototype.smallestCockIndex = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cockArea(index) > this.cockArea(counter))
		{
			index = counter;
		}
	}
	return index;
}

Creature.prototype.smallestCockLength = function() {
	if (this.cocks.length == 0)
		return 0;
	return this.cocks[smallestCockIndex()].cockLength;
}

Creature.prototype.shortestCockIndex = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
			index = counter;
	}
	return index;
}

Creature.prototype.shortestCockLength = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
			index = counter;
	}
	return this.cocks[index].cockLength;
}

//Find the biggest cock that fits inside a given value
Creature.prototype.cockThatFits = function(i_fits, type) {
    //Defaulting
    if (i_fits == undefined) i_fits = 0;
    if (type == undefined) type = "area";
    //Main function
	if (this.cocks.length <= 0)
		return -1;
	var cockIdxPtr = this.cocks.length;
	//Current largest fitter
	var cockIndex = -1;
	while (cockIdxPtr > 0)
	{
		cockIdxPtr--;
		if (type == "area")
		{
			if (this.cockArea(cockIdxPtr) <= i_fits)
			{
				//If one already fits
				if (cockIndex >= 0)
				{
					//See if the newcomer beats the saved small guy
					if (this.cockArea(cockIdxPtr) > this.cockArea(cockIndex))
						cockIndex = cockIdxPtr;
				}
				//Store the index of fitting dick
				else
					cockIndex = cockIdxPtr;
			}
		}
		else if (type == "length")
		{
			if (this.cocks[cockIdxPtr].cockLength <= i_fits)
			{
				//If one already fits
				if (cockIndex >= 0)
				{
					//See if the newcomer beats the saved small guy
					if (this.cocks[cockIdxPtr].cockLength > this.cocks[cockIndex].cockLength)
						cockIndex = cockIdxPtr;
				}
				//Store the index of fitting dick
				else
					cockIndex = cockIdxPtr;
			}
		}
	}
	return cockIndex;
}

//Find the 2nd biggest cock that fits inside a given value
Creature.prototype.cockThatFits2 = function(fits) {
    //Defaulting
    if (fits == undefined) fits = 0;
    //Main function
	if (this.cockTotal() == 1)
		return -1;
	var counter = cocks.length;
	//Current largest fitter
	var index = -1;
	var index2 = -1;
	while (counter > 0)
	{
		counter--;
		//Does this one fit?
		if (this.cockArea(counter) <= fits)
		{
			//If one already fits
			if (index >= 0)
			{
				//See if the newcomer beats the saved small guy
				if (this.cockArea(counter) > this.cockArea(index))
				{
					//Save old wang
					if (index != -1)
						index2 = index;
					index = counter;
				}
				//If this one fits and is smaller than the other great
				else
				{
					if ((this.cockArea(index2) < this.cockArea(counter)) && counter != index)
					{
						index2 = counter;
					}
				}
				if (index >= 0 && index == index2)
					trace("FUCK ERROR COCKTHATFITS2 SHIT IS BROKED!");
			}
			//Store the index of fitting dick
			else
				index = counter;
		}
	}
	return index2;
}

Creature.prototype.smallestCockArea = function() {
	if (this.cockTotal() == 0)
		return -1;
	return this.cockArea(smallestCockIndex());
}

Creature.prototype.smallestCock = function() {
	return this.cockArea(smallestCockIndex());
}

Creature.prototype.biggestCockIndex = function() {
	if (this.cocks.length == 0)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	while (counter > 0)
	{
		counter--;
		if (this.cockArea(index) < this.cockArea(counter))
			index = counter;
	}
	return index;
}

//Find the second biggest dick's index.
Creature.prototype.biggestCockIndex2 = function() {
	if (this.cocks.length <= 1)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	var index2 = 0;
	//Find the biggest
	while (counter > 0)
	{
		counter--;
		if (this.cockArea(index) < this.cockArea(counter))
			index = counter;
	}
	//Reset counter and find the next biggest
	counter = this.cocks.length;
	while (counter > 0)
	{
		counter--;
		//Make sure index2 doesn't get stuck
		//at the same value as index1 if the
		//initial location is biggest.
		if (index == index2 && counter != index)
			index2 = counter;
		//Is the stored value less than the current one?
		if (cockArea(index2) < cockArea(counter))
		{
			//Make sure we don't set index2 to be the same
			//as the biggest dick.
			if (counter != index)
				index2 = counter;
		}
	}
	//If it couldn't find a second biggest...
	if (index == index2)
		return 0;
	return index2;
}

Creature.prototype.smallestCockIndex2 = function() {
	if (this.cocks.length <= 1)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	var index2 = 0;
	//Find the smallest
	while (counter > 0)
	{
		counter--;
		if (this.cockArea(index) > this.cockArea(counter))
			index = counter;
	}
	//Reset counter and find the next biggest
	counter = this.cocks.length;
	while (counter > 0)
	{
		counter--;
		//Make sure index2 doesn't get stuck
		//at the same value as index1 if the
		//initial location is biggest.
		if (index == index2 && counter != index)
			index2 = counter;
		//Is the stored value less than the current one?
		if (this.cockArea(index2) > this.cockArea(counter))
		{
			//Make sure we don't set index2 to be the same
			//as the biggest dick.
			if (counter != index)
				index2 = counter;
		}
	}
	//If it couldn't find a second biggest...
	if (index == index2)
		return 0;
	return index2;
}

//Find the third biggest dick index.
Creature.prototype.biggestCockIndex3 = function() {
	if (this.cocks.length <= 2)
		return 0;
	var counter = this.cocks.length;
	var index = 0;
	var index2 = -1;
	var index3 = -1;
	//Find the biggest
	while (counter > 0)
	{
		counter--;
		if (this.cockArea(index) < this.cockArea(counter))
			index = counter;
	}
	//Reset counter and find the next biggest
	counter = this.cocks.length;
	while (counter > 0)
	{
		counter--;
		//If this index isn't used already
		if (counter != index)
		{
			//Has index been set to anything yet?
			if (index2 == -1)
				index2 = counter;
			//Is the stored value less than the current one?
			else if (this.cockArea(index2) < this.cockArea(counter))
			{
				index2 = counter;
			}
		}
	}
	//If it couldn't find a second biggest...
	if (index == index2 || index2 == -1)
		index2 = 0;
	//Reset counter and find the next biggest
	counter = this.cocks.length;
	while (counter > 0)
	{
		counter--;
		//If this index isn't used already
		if (counter != index && counter != index2)
		{
			//Has index been set to anything yet?
			if (index3 == -1)
				index3 = counter;
			//Is the stored value less than the current one?
			else if (this.cockArea(index3) < this.cockArea(counter))
			{
				index3 = counter;
			}
		}
	}
	//If it fails for some reason.
	if (index3 == -1)
		index3 = 0;
	return index3;
}

//------------
// ALTERATIONS
//------------
//Addition of parts
Creature.prototype.createCock = function(clength, cthickness, ctype) {
    if (this.cocks.length >= 11) return; //This one goes to eleven.
    //Defaulting parameters
    if (clength == undefined) clength = 5.5;
    if (cthickness == undefined) cthickness = 1;
    if (ctype == undefined) ctype = CockTypesEnum.HUMAN;
    //New cock
    var newCock = new Cock(clength, cthickness, ctype)
    this.cocks.push(newCock);
    this.genderCheck();
}
Creature.prototype.createVagina = function(virgin, vagwetness, vaglooseness) {
    if (this.vaginas.length >= 3) return; //Limit of 3 vaginas
    //Defaulting parameters
    if (virgin == undefined) virgin = true;
    if (vagwetness == undefined) vagwetness = 1;
    if (vaglooseness == undefined) vaglooseness = 0;
    //New vagina
    var newVagina = new Vagina(vagwetness, vaglooseness, virgin, 0);
    this.vaginas.push(newVagina);
    this.genderCheck();
}
Creature.prototype.createBreastRow = function(size, nipplesPerBreast) {
    if (this.breastRows.length >= 10) return; //Limit of 10 breast rows
    //Defaulting parameters
    if (size == undefined) size = 0;
    if (nipplesPerBreast == undefined) nipplesPerBreast = 1;
    //New breast row
    var newBreastRow = new BreastRow(size, nipplesPerBreast);
    this.breastRows.push(newBreastRow);
    this.genderCheck();
}
//Removal of parts
Creature.prototype.removeCock = function(arraySpot, totalRemoved) {
    //Defaulting
    if (arraySpot == undefined) arraySpot = 0;
    if (totalRemoved == undefined) totalRemoved = 1;
    //Various Errors preventing action
    if (arraySpot < 0 || totalRemoved <= 0)
    {
        //trace("ERROR: removeCock called but arraySpot is negative or totalRemoved is 0.");
        return;
    }
    if (this.cocks.length == 0)
    {
        //trace("ERROR: removeCock called but cocks do not exist.");
    }
    else
    {
        if (arraySpot > this.cocks.length - 1)
        {
            //trace("ERROR: removeCock failed - array location is beyond the bounds of the array.");
        }
        else
        {
            try
            {
                var cock = this.cocks[arraySpot];
                if (cock.sock == "viridian")
                {
                    this.removePerk(PerkLib.LustyRegeneration);
                }
                else if (cock.sock == "cockring")
                {
                    var numRings = 0;
                    for (var i = 0; i < this.cocks.length; i++)
                    {
                        if (this.cocks[i].sock == "cockring") numRings++;
                    }

                    if (numRings == 0) this.removePerk(PerkLib.PentUp);
                    else this.setPerkValue(PerkLib.PentUp, 1, 5 + (numRings * 5));
                }
                cocks.splice(arraySpot, totalRemoved);
            }
            catch (e)
            {
                trace("Argument error in Creature[" + this._short + "]: " + e.message);
            }
            //trace("Attempted to remove " + totalRemoved + " cocks.");
        }
    }
    this.genderCheck();
}
Creature.prototype.removeVagina = function(arraySpot, totalRemoved) {
    //Defaulting
    if (arraySpot == undefined) arraySpot = 0;
    if (totalRemoved == undefined) totalRemoved = 1;
    //Various Errors preventing action
    if (arraySpot < -1 || totalRemoved <= 0)
    {
        //trace("ERROR: removeVagina called but arraySpot is negative or totalRemoved is 0.");
        return;
    }
    if (this.vaginas.length == 0)
    {
        //trace("ERROR: removeVagina called but cocks do not exist.");
    }
    else
    {
        if (arraySpot > this.vaginas.length - 1)
        {
            //trace("ERROR: removeVagina failed - array location is beyond the bounds of the array.");
        }
        else
        {
            this.vaginas.splice(arraySpot, totalRemoved);
            //trace("Attempted to remove " + totalRemoved + " vaginas.");
        }
    }
    this.genderCheck();
}
Creature.prototype.removeBreastRow = function(arraySpot, totalRemoved) {
    //Defaulting
    if (arraySpot == undefined) arraySpot = 0;
    if (totalRemoved == undefined) totalRemoved = 1;
    //Various Errors preventing action
    if (arraySpot < -1 || totalRemoved <= 0)
    {
        //trace("ERROR: removeBreastRow called but arraySpot is negative or totalRemoved is 0.");
        return;
    }
    if (this.breastRows.length == 0)
    {
        //trace("ERROR: removeBreastRow called but cocks do not exist.");
    }
    else if (this.breastRows.length == 1 || this.breastRows.length - totalRemoved < 1)
    {
        //trace("ERROR: Removing the current breast row would break the Creature classes assumptions about breastRow contents.");
    }
    else
    {
        if (arraySpot > this.breastRows.length - 1)
        {
            //trace("ERROR: removeBreastRow failed - array location is beyond the bounds of the array.");
        }
        else
        {
            this.breastRows.splice(arraySpot, totalRemoved);
            //trace("Attempted to remove " + totalRemoved + " breastRows.");
        }
    }
}

Creature.prototype.genderCheck = function() {
    if (this.cocks.length > 0) { //Got dicks? Either male or herm.
        if (this.vaginas.length > 0)
            this.gender = 3;
        else
            this.gender = 1;
    }
    else if (this.vaginas.length > 0) //No dicks but have a vagina? Female.
        this.gender = 2;
    else //Got neither? Genderless.
        this.gender = 0;
}

//------------
// GENDER UTIL
//------------
Creature.prototype.genderText = function(male, female, futa, eunuch) {
    //Defaulting
    if (male == undefined) male = "man";
    if (female == undefined) female = "woman";
    if (futa == undefined) futa = "herm";
    if (eunuch == undefined) eunuch = "eunuch";
    //Main function
	if (this.vaginas.length > 0) {
		if (this.cocks.length > 0) return futa;
		return female;
	}
	else if (this.cocks.length > 0) {
		return male;
	}
	return eunuch;
}

Creature.prototype.manWoman = function(caps) {
	//Dicks?
	if (this.totalCocks() > 0) {
		if (this.hasVagina()) {
			if (caps)
				return "Futa";
			else
				return "futa";
		}
		else {
			if (caps)
				return "Man";
			else
				return "man";
		}
	}
	else {
		if (this.hasVagina()) {
			if (caps)
				return "Woman";
			else
				return "woman";
		}
		else {
			if (caps)
				return "Eunuch";
			else
				return "eunuch";
		}
	}
}

Creature.prototype.mfn = function(male, female, neuter) {
	if (gender == 0)
		return neuter;
	else
		return mf(male, female);
}

//Rewritten!
Creature.prototype.mf = function(male, female) {
	//if (femWeight()) return female;
	//else return male;
	//Dicks?
	if (this.totalCocks() > 0) {
		if (this.hasVagina()) {
			if (this.biggestTitSize() >= 2) return female;
			else if (this.biggestTitSize() == 1) {
				if (this.femininity > 50) return female;
				else return male;
			}
			else return male;
		}
		else return male;
	}
	else
	{
		if (this.hasVagina())
			if (this.biggestTitSize() == 0 && this.femininity < 45) return male;
			else return female;
		else
		{
			if (this.biggestTitSize() >= 3)
				return female;
			else
				return male;
		}
	}
}

Creature.prototype.maleFemaleHerm = function(caps) {
	if (this.gender == 0) {
		if (caps) return this.mf("Genderless", "Fem-genderless");
		else return this.mf("genderless", "fem-genderless");
	}
	else if (this.gender == 1) {
		if (caps) return this.mf("Male", "Dickgirl");
		else return this.mf("male", "dickgirl");
	}
	else if (this.gender == 2) {
		if (caps) return this.mf("Cuntboy", "Female");
		else return this.mf("cuntboy", "female");
	}
	else if (this.gender == 3) {
		if (caps) return this.mf("Maleherm", "Hermaphrodite");
		else return this.mf("maleherm", "hermaphrodite");
	}
	else return "<b>Gender error!</b>";
}

Creature.prototype.breastCup = function(rowNum) {
    return Appearance.breastCup(this.breastRows[rowNum].breastRating);
}

Creature.prototype.bRows = function() {
    return this.breastRows.length;
}

Creature.prototype.totalBreasts = function() {
    var counter = this.breastRows.length;
    var total = 0;
    while (counter > 0) {
        counter--;
        total += this.breastRows[counter].breasts;
    }
    return total;
}

Creature.prototype.totalNipples = function() {
    var counter = this.breastRows.length;
    var total = 0;
    while (counter > 0) {
        counter--;
        total += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
    }
    return total;
}

Creature.prototype.smallestTitSize = function() {
    if (this.breastRows.length == 0)
        return -1;
    var counter = this.breastRows.length;
    var index = 0;
    while (counter > 0) {
        counter--;
        if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
            index = counter;
    }
    return this.breastRows[index].breastRating;
}

Creature.prototype.smallestTitRow = function() {
    if (this.breastRows.length == 0)
        return -1;
    var counter = breastRows.length;
    var index = 0;
    while (counter > 0) {
        counter--;
        if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
            index = counter;
    }
    return index;
}

Creature.prototype.biggestTitRow = function() {
    var counter = this.breastRows.length;
    var index = 0;
    while (counter > 0) {
        counter--;
        if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
            index = counter;
    }
    return index;
}

Creature.prototype.averageBreastSize = function() {
    var counter = this.breastRows.length;
    var average = 0;
    while (counter > 0) {
        counter--;
        average += this.breastRows[counter].breastRating;
    }
    if (this.breastRows.length == 0)
        return 0;
    return (average / this.breastRows.length);
}

Creature.prototype.averageCockThickness = function() {
    var counter = this.cocks.length;
    var average = 0;
    while (counter > 0) {
        counter--;
        average += this.cocks[counter].cockThickness;
    }
    if (cocks.length == 0)
        return 0;
    return (average / this.cocks.length);
}

Creature.prototype.averageNippleLength = function() {
    var counter = this.breastRows.length;
    var average = 0;
    while (counter > 0) {
        counter--;
        average += (this.breastRows[counter].breastRating / 10 + .2);
    }
    return (average / this.breastRows.length);
}

Creature.prototype.averageVaginalLooseness = function() {
    var counter = this.vaginas.length;
    var average = 0;
    //If the player has no vaginas
    if (this.vaginas.length == 0)
        return 2;
    while (counter > 0) {
        counter--;
        average += this.vaginas[counter].vaginalLooseness;
    }
    return (average / this.vaginas.length);
}

Creature.prototype.averageVaginalWetness = function() {
    //If the player has no vaginas
    if (this.vaginas.length == 0)
        return 2;
    var counter = this.vaginas.length;
    var average = 0;
    while (counter > 0) {
        counter--;
        average += this.vaginas[counter].vaginalWetness;
    }
    return (average / this.vaginas.length);
}

Creature.prototype.averageCockLength = function() {
    var counter = this.cocks.length;
    var average = 0;
    while (counter > 0) {
        counter--;
        average += this.cocks[counter].cockLength;
    }
    if (this.cocks.length == 0)
        return 0;
    return (average / this.cocks.length);
}

Creature.prototype.canTitFuck = function() {
    if (this.breastRows.length == 0) return false;

    var counter = this.breastRows.length;
    var index = 0;
    while (counter > 0) {
        counter--;
        if (this.breastRows[index].breasts < this.breastRows[counter].breasts && this.breastRows[counter].breastRating > 3)
            index = counter;
    }
    if (this.breastRows[index].breasts >= 2 && this.breastRows[index].breastRating > 3)
        return true;
    return false;
}

Creature.prototype.mostBreastsPerRow = function() {
    if (this.breastRows.length == 0) return 2;

    var counter = this.breastRows.length;
    var index = 0;
    while (counter > 0) {
        counter--;
        if (this.breastRows[index].breasts < this.breastRows[counter].breasts)
            index = counter;
    }
    return this.breastRows[index].breasts;
}

Creature.prototype.averageNipplesPerBreast = function() {
    var counter = this.breastRows.length;
    var breasts = 0;
    var nipples = 0;
    while (counter > 0) {
        counter--;
        breasts += this.breastRows[counter].breasts;
        nipples += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
    }
    if (breasts == 0)
        return 0;
    return Math.floor(nipples / breasts);
}

Creature.prototype.allBreastsDescript = function() {
    return Appearance.allBreastsDescript(this);
}

//Simplified these cock descriptors and brought them into the creature class
Creature.prototype.sMultiCockDesc = function() {
    return (this.cocks.length > 1 ? "one of your " : "your ") + this.cockMultiLDescriptionShort();
}

Creature.prototype.SMultiCockDesc = function() {
    return (this.cocks.length > 1 ? "One of your " : "Your ") + this.cockMultiLDescriptionShort();
}

Creature.prototype.oMultiCockDesc = function() {
    return (this.cocks.length > 1 ? "each of your " : "your ") + this.cockMultiLDescriptionShort();
}

Creature.prototype.OMultiCockDesc = function() {
    return (this.cocks.length > 1 ? "Each of your " : "Your ") + this.cockMultiLDescriptionShort();
}

Creature.prototype.cockMultiLDescriptionShort = function() {
    if (cocks.length < 1) {
        return "<b>ERROR: NO WANGS DETECTED for cockMultiLightDesc()</b>";
    }
    if (cocks.length == 1) { //For a songle cock return the default description
        return Appearance.cockDescript(this, 0);
    }
    switch (cocks[0].cockType) { //With multiple cocks only use the descriptions for specific cock types if all cocks are of a single type
        case CockTypesEnum.ANEMONE:
        case CockTypesEnum.CAT:
        case CockTypesEnum.DEMON:
        case CockTypesEnum.DISPLACER:
        case CockTypesEnum.DRAGON:
        case CockTypesEnum.HORSE:
        case CockTypesEnum.KANGAROO:
        case CockTypesEnum.LIZARD:
        case CockTypesEnum.PIG:
        case CockTypesEnum.TENTACLE:
            if (this.countCocksOfType(cocks[0].cockType) == cocks.length) return Appearance.cockNoun(cocks[0].cockType) + "s";
            break;
        case CockTypesEnum.DOG:
        case CockTypesEnum.FOX:
            if (dogCocks() == cocks.length) return Appearance.cockNoun(CockTypesEnum.DOG) + "s";
        default:
    }
    return Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
}

Creature.prototype.hasSheath = function() {
    if (cocks.length == 0) return false;
    for (var x = 0; x < cocks.length; x++) {
        switch (cocks[x].cockType) {
            case CockTypesEnum.CAT:
            case CockTypesEnum.DISPLACER:
            case CockTypesEnum.DOG:
            case CockTypesEnum.FOX:
            case CockTypesEnum.HORSE:
            case CockTypesEnum.KANGAROO:
            case CockTypesEnum.AVIAN:
            case CockTypesEnum.ECHIDNA:
                return true; //If there's even one cock of any of these types then return true
            default:
        }
    }
    return false;
}

//------------
// DESCRIPTORS
//------------
Creature.prototype.cockDescript = function(x) {
	return "cock"; //For now
}
Creature.prototype.cockDescriptShort = function(x) {
	return "cock"; //For now
}
Creature.prototype.multiCockDescriptLight = function() {
	if (this.cocks.length == 1) return "cock"; //For now
	else return "cocks";
}

Creature.prototype.vaginaDescript = function(x) {
	return "vagina"; //For now
}
Creature.prototype.breastDescript = function(x) {
	if (this.biggestTitSize() > 0) return "vagina"; //For now
	else return "chest";
}