function Player() {
	this.a = "";
	this.name = "";
	this.refName = "You";
	this.isAre = "are";
	this.heShe = "you";
	this.himHer = "you";
	this.hisHer = "your";
	this.plural = true;
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
	this.weapon = Items.NOTHING;
	this.armor = Items.Armor.ComfortableClothes;

    this.teaseLevel = 0;
    this.teaseXP = 0;

	this.itemSlots = [];
    //Slots 0-9 are player inventory. Slots 10-55 are for gear storage options. See inventory.js for details
    // Initializing it here makes things easier.
    for (var i = 0; i < 56; i++) {
        this.itemSlots.push(new ItemSlot());
    }
	this.keyItems = [];
	this.statusEffects = [];
	this.perks = [];

    //Spells
    this.spells = [];
    this.spells.blind = false;
    this.spells.chargeWeapon = false;
    this.spells.whitefire = false;
    this.spells.arouse = false;
    this.spells.heal = false;
    this.spells.might = false;

	//Stats points
	this.statPoints = 0;
	this.perkPoints = 0;

    this.hunger = 80;

    this.location = "Camp";

	//Race
	this.originalGender = 0;
	this.originalRace = "human";
}
Player.prototype = new Creature();

var tempStr = 0;
var tempTou = 0;
var tempSpe = 0;
var tempInt = 0;

/*Player.prototype.lustVuln = {
    get lustVuln() {
        var percent = 100;
        //Level-based
        if (this.level < 10)
            percent -= (this.level - 1) * 3;
        else
            percent -= 27;
        //Perk-based
        if (this.findPerk(PerkLib.Resistance) >= 0)
            percent -= 10;
        //Apply cap
        if (percent < 25)
            percent = 25;
        return percent / 100;
    }
}*/

Player.prototype.minLust = function() {
    return 0;
}

//RACIAL SCORE
Player.prototype.race = function() {
    //Determine race type:
    var race = "human";
    if (this.catScore() >= 4) {
        if (this.isTaur() && this.lowerBody == LOWER_BODY_TYPE_CAT) {
            race = "cat-taur";
            if (this.faceType == 0)
                race = "sphinx-morph"; // no way to be fully feral anyway
        }
        else {
            race = "cat-morph";
            if (this.faceType == 0)
                race = "cat-" + this.mf("boy", "girl");
        }
    }
    if (this.lizardScore() >= 4)
        race = "lizan";
    if (this.dragonScore() >= 4) {
        race = "dragon-morph";
        if (this.faceType == 0)
            race = "dragon-" + this.mf("man", "girl");
    }
    if (this.raccoonScore() >= 4) {
        race = "raccoon-morph";
        if (this.balls > 0 && this.ballSize > 5)
            race = "tanuki-morph";
    }
    if (this.dogScore() >= 4) {
        if (this.isTaur() && this.lowerBody == LOWER_BODY_TYPE_DOG)
            race = "dog-taur";
        else {
            race = "dog-morph";
            if (this.faceType == 0)
                race = "dog-" + this.mf("man", "girl");
        }
    }
    if (this.foxScore() >= 4) {
        if (this.isTaur() && this.lowerBody == LOWER_BODY_TYPE_FOX)
            race = "fox-taur";
        else if (this.skinType == 1)
            race = "fox-morph";
        else
            race = "fox-" + this.mf("morph", "girl");
    }
    if (this.ferretScore() >= 4) {
        if (this.skinType == 1)
            race = "ferret-morph";
        else
            race = "ferret-" + this.mf("morph", "girl");
    }
    if (this.kitsuneScore() >= 4) {
        race = "kitsune";
    }
    if (this.horseScore() >= 3) {
        if (this.isTaur())
            race = "centaur-morph";
        else
        if (this.hornType == HORNS_UNICORN)
            race = "unicorn-morph";
        else
            race = "equine-morph";
    }
    if (this.mutantScore() >= 5 && race == "human")
        race = "corrupted mutant";
    if (this.minoScore() >= 4)
        race = "minotaur-morph";
    if (this.cowScore() > 5) {
        race = "cow-";
        race += this.mf("morph", "girl");
    }
    if (this.beeScore() >= 5)
        race = "bee-morph";
    if (this.goblinScore() >= 5)
        race = "goblin";
    if (this.humanScore() >= 5 && race == "corrupted mutant")
        race = "somewhat human mutant";
    if (this.demonScore() > 4)
        race = "demon-morph";
    if (this.sharkScore() >= 3)
        race = "shark-morph";
    if (this.bunnyScore() >= 4)
        race = "bunny-" + this.mf("boy", "girl");
    if (this.harpyScore() >= 4)
    {
        if (this.gender >= 2)
            race = "harpy";
        else
            race = "avian";
    }
    if (this.spiderScore() >= 4)
    {
        race = "spider-morph";
        if (this.mf("no", "yes") == "yes")
            race = "spider-girl";
        if (this.isDrider())
            race = "drider";
    }
    if (this.kangaScore() >= 4)
        race = "kangaroo-morph";
    if (this.mouseScore() >= 3) {
        if (this.faceType != 16)
            race = "mouse-" + this.mf("boy", "girl");
        else
            race = "mouse-morph";
    }
    //<mod>
    if (this.pigScore() >= 4) {
        race = "pig-morph";
        if (this.faceType == 0)
            race = "pig-" + this.mf("boy", "girl");
        if (this.faceType == 20)
            race = "boar-morph";
    }
    if (this.satyrScore() >= 4) {
        race = "satyr";
    }
    if (this.rhinoScore() >= 4) {
        race = "rhino-morph";
        if (this.faceType == 0) race = "rhino-" + this.mf("man", "girl");
    }
    if (this.echidnaScore() >= 4) {
        race = "echidna-morph";
        if (this.faceType == 0) race = "echidna-" + this.mf("boy", "girl");
    }
    if (this.deerScore() >= 4) {
        if (this.isTaur()) race = "deer-taur";
        else {
            race = "deer-morph";
            if (this.faceType == 0) race = "deer-" + this.mf("morph", "girl");
        }
    }
    //Special, bizarre races
    if (this.dragonneScore() >= 6) {
        if (this.isTaur()) race = "dragonne-taur";
        else {
            race  = "dragonne-morph";
            if (this.faceType == 0)
                race = "dragonne-" + this.mf("man", "girl");
        }
    }
    if (this.manticoreScore() >= 6) {
        race = "manticore-morph"
        if (this.faceType == 0)
            race = "manticore-" + this.mf("man", "girl");
    }
    if (this.sirenScore() >= 4) {
        race = "siren";
    }
    //</mod>
    if (this.lowerBody == 3)
        race = "naga";
    if (this.lowerBody == LOWER_BODY_TYPE_HOOFED && this.isTaur()) {
        if (this.wingType == WING_TYPE_FEATHERED_LARGE) race = "pegataur";
        else race = "centaur";
    }
    if (this.lowerBody == LOWER_BODY_TYPE_PONY)
        race = "pony-kin";
    if (this.gooScore() >= 3) {
        race = "goo-";
        race += this.mf("boi", "girl");
    }

    return race;
}

//determine demon rating
Player.prototype.demonScore = function() {
    var demonCounter = 0;
    if (this.hornType == 1 && this.horns > 0)
        demonCounter++;
    if (this.hornType == 1 && this.horns > 4)
        demonCounter++;
    if (this.tailType == 3)
        demonCounter++;
    if (this.wingType == 6 || this.wingType == 7)
        demonCounter++;
    if (this.skinType == 0 && this.cor > 50)
        demonCounter++;
    if (this.faceType == 0 && this.cor > 50)
        demonCounter++;
    if (this.lowerBody == 5 || this.lowerBody == 6)
        demonCounter++;
    if (this.countCocksOfType(CockTypesEnum.DEMON) > 0)
        demonCounter++;
    return demonCounter;
}

//Determine Human Rating
Player.prototype.humanScore = function() {
    var humanCounter = 0;
    if (this.faceType == 0)
        humanCounter++;
    if (this.skinType == 0)
        humanCounter++;
    if (this.horns == 0)
        humanCounter++;
    if (this.tailType == 0)
        humanCounter++;
    if (this.wingType == 0)
        humanCounter++;
    if (this.lowerBody == 0)
        humanCounter++;
    if (this.countCocksOfType(CockTypesEnum.HUMAN) == 1 && this.totalCocks() == 1)
        humanCounter++;
    if (this.breastRows.length == 1 && this.skinType == 0)
        humanCounter++;
    return humanCounter;
}

//Determine minotaur rating
Player.prototype.minoScore = function() {
    var minoCounter = 0;
    if (this.faceType == 3)
        minoCounter++;
    if (this.earType == 3)
        minoCounter++;
    if (this.tailType == 4)
        minoCounter++;
    if (this.hornType == 2)
        minoCounter++;
    if (this.lowerBody == 1 && minoCounter > 0)
        minoCounter++;
    if (this.tallness > 80 && minoCounter > 0)
        minoCounter++;
    if (this.cocks.length > 0 && minoCounter > 0)
    {
        if (this.countCocksOfType(CockTypesEnum.HORSE) > 0)
            minoCounter++;
    }
    if (this.vaginas.length > 0)
        minoCounter--;
    return minoCounter;
}

Player.prototype.minotaurScore = function() {
    return this.minoScore();
}

//Determine cow rating
Player.prototype.cowScore = function() {
    var minoCounter = 0;
    if (this.faceType == 0)
        minoCounter++;
    if (this.faceType == 3)
        minoCounter--;
    if (this.earType == 3)
        minoCounter++;
    if (this.tailType == 4)
        minoCounter++;
    if (this.hornType == 2)
        minoCounter++;
    if (this.lowerBody == 1 && minoCounter > 0)
        minoCounter++;
    if (this.tallness >= 73 && minoCounter > 0)
        minoCounter++;
    if (this.vaginas.length > 0)
        minoCounter++;
    if (this.biggestTitSize() > 4 && minoCounter > 0)
        minoCounter++;
    if (this.biggestLactation() > 2 && minoCounter > 0)
        minoCounter++;
    return minoCounter;
}

Player.prototype.sandTrapScore = function() {
    var counter = 0;
    if (this.findStatusEffect(StatusEffects.BlackNipples) >= 0)
        counter++;
    if (this.findStatusEffect(StatusEffects.Uniball) >= 0)
        counter++;
    if (this.hasVagina() && this.vaginaType() == 5)
        counter++;
    if (this.eyeType == EYES_BLACK_EYES_SAND_TRAP)
        counter++;
    if (this.wingType == WING_TYPE_GIANT_DRAGONFLY)
        counter++;
    if (this.findStatusEffect(StatusEffects.Uniball) >= 0)
        counter++;
    return counter;
}

//Determine Bee Rating
Player.prototype.beeScore = function() {
    var beeCounter = 0;
    if (this.hairColor == "shiny black")
        beeCounter++;
    if (this.hairColor == "black and yellow")
        beeCounter += 2;
    if (this.antennae > 0)
    {
        beeCounter++;
        if (this.faceType == 0)
            beeCounter++;
    }
    if (this.lowerBody == 7)
    {
        beeCounter++;
        if (this.vaginas.length == 1)
            beeCounter++;
    }
    if (this.tailType == 6)
        beeCounter++;
    if (this.wingType == 1)
        beeCounter++;
    if (this.wingType == 2)
        beeCounter++;
    return beeCounter;
}
//Determine Ferret Rating!
Player.prototype.ferretScore = function() {
    var counter = 0;
    if (this.faceType == FACE_FERRET_MASK) counter++;
    if (this.faceType == FACE_FERRET) counter+=2;
    if (this.earType == EARS_FERRET) counter++;
    if (this.tailType == TAIL_TYPE_FERRET) counter++;
    if (this.lowerBody == LOWER_BODY_TYPE_FERRET) counter++;
    if (this.skinType == SKIN_TYPE_FUR && counter > 0) counter++;
    return counter;
}
//Determine Dog Rating
Player.prototype.dogScore = function() {
    var dogCounter = 0;
    if (this.faceType == 2)
        dogCounter++;
    if (this.earType == 2)
        dogCounter++;
    if (this.tailType == 2)
        dogCounter++;
    if (this.lowerBody == 2)
        dogCounter++;
    if (this.countCocksOfType(CockTypesEnum.DOG) > 0)
        dogCounter++;
    if (this.breastRows.length > 1)
        dogCounter++;
    if (this.breastRows.length == 3)
        dogCounter++;
    if (this.breastRows.length > 3)
        dogCounter--;
    //Fur only counts if some canine features are present
    if (this.skinType == 1 && dogCounter > 0)
        dogCounter++;
    return dogCounter;
}

Player.prototype.mouseScore = function() {
    var coonCounter = 0;
    if (this.earType == 12)
        coonCounter++;
    if (this.tailType == 16)
        coonCounter++;
    if (this.faceType == 15)
        coonCounter++;
    if (this.faceType == 16)
        coonCounter += 2;
    //Fur only counts if some canine features are present
    if (this.skinType == 1 && coonCounter > 0)
        coonCounter++;
    if (this.tallness < 55 && coonCounter > 0)
        coonCounter++;
    if (this.tallness < 45 && coonCounter > 0)
        coonCounter++;
    return coonCounter;
}

Player.prototype.raccoonScore = function() {
    var coonCounter = 0;
    if (this.faceType == 13)
        coonCounter++;
    if (this.faceType == 14)
        coonCounter += 2;
    if (this.earType == 11)
        coonCounter++;
    if (this.tailType == 15)
        coonCounter++;
    if (this.lowerBody == 19)
        coonCounter++;
    if (coonCounter > 0 && this.balls > 0)
        coonCounter++;
    //Fur only counts if some canine features are present
    if (this.skinType == 1 && coonCounter > 0)
        coonCounter++;
    return coonCounter;
}

//Determine Fox Rating
Player.prototype.foxScore = function() {
    var foxCounter = 0;
    if (this.faceType == 11)
        foxCounter++;
    if (this.earType == 9)
        foxCounter++;
    if (this.tailType == 13)
        foxCounter++;
    if (this.lowerBody == 17)
        foxCounter++;
    if (this.countCocksOfType(CockTypesEnum.DOG) && foxCounter > 0)
        foxCounter++;
    if (this.breastRows.length > 1 && foxCounter > 0)
        foxCounter++;
    if (this.breastRows.length == 3 && foxCounter > 0)
        foxCounter++;
    if (this.breastRows.length == 4 && foxCounter > 0)
        foxCounter++;
    //Fur only counts if some canine features are present
    if (this.skinType == 1 && foxCounter > 0)
        foxCounter++;
    return foxCounter;
}

//Determine cat Rating
Player.prototype.catScore = function() {
    var catCounter = 0;
    if (this.faceType == 6)
        catCounter++;
    if (this.earType == 5)
        catCounter++;
    if (this.tailType == 8)
        catCounter++;
    if (this.lowerBody == 9)
        catCounter++;
    if (this.countCocksOfType(CockTypesEnum.CAT) > 0)
        catCounter++;
    if (this.breastRows.length > 1 && catCounter > 0)
        catCounter++;
    if (this.breastRows.length == 3 && catCounter > 0)
        catCounter++;
    if (this.breastRows.length > 3)
        catCounter -= 2;
    //Fur only counts if some canine features are present
    if (this.skinType == 1 && catCounter > 0)
        catCounter++;
    return catCounter;
}

//Determine lizard rating
Player.prototype.lizardScore = function() {
    var lizardCounter = 0;
    if (this.faceType == 7)
        lizardCounter++;
    if (this.earType == 6)
        lizardCounter++;
    if (this.tailType == 9)
        lizardCounter++;
    if (this.lowerBody == 10)
        lizardCounter++;
    if (this.countCocksOfType(CockTypesEnum.LIZARD) > 0)
        lizardCounter++;
    if (this.horns > 0 && (this.hornType == 3 || this.hornType == 4))
        lizardCounter++;
    if (this.skinType == 2)
        lizardCounter++;
    return lizardCounter;
}

Player.prototype.spiderScore = function() {
    var score = 0;
    if (this.eyeType == 1)
        score += 2;
    if (this.faceType == 10)
        score++;
    if (this.armType == 2)
        score++;
    if (this.lowerBody == 15 || this.lowerBody == 16)
        score += 2;
    else if (score > 0)
        score--;
    if (this.tailType == 5)
        score += 2;
    if (this.skinType > 0 && score > 0)
        score--;
    return score;
}

//Determine Horse Rating
Player.prototype.horseScore = function() {
    var horseCounter = 0;
    if (this.faceType == 1)
        horseCounter++;
    if (this.earType == 1)
        horseCounter++;
    if (this.tailType == 1)
        horseCounter++;
    if (this.countCocksOfType(CockTypesEnum.HORSE) > 0)
        horseCounter++;
    if (this.lowerBody == 1 || this.lowerBody == 4)
        horseCounter++;
    //Fur only counts if some equine features are present
    if (this.skinType == 1 && horseCounter > 0)
        horseCounter++;
    return horseCounter;
}

//Determine kitsune Rating
Player.prototype.kitsuneScore = function() {
    var kitsuneCounter = 0;
    //If the character has fox ears, +1
    if (this.earType == EARS_FOX)
        kitsuneCounter++;
    //If the character has a fox tail, +1
    if (this.tailType == TAIL_TYPE_FOX)
        kitsuneCounter++;
    //If the character has two or more fox tails, +2
    if (this.tailType == TAIL_TYPE_FOX && this.tailVenom >= 2)
        kitsuneCounter += 2;
    //If the character has tattooed skin, +1
    //9999
    //If the character has a 'vag of holding', +1
    if (this.vaginalCapacity() >= 8000)
        kitsuneCounter++;
    //If the character's kitsune score is greater than 0 and:
    //If the character has a normal face, +1
    if (kitsuneCounter > 0 && (this.faceType == FACE_HUMAN || this.faceType == FACE_FOX))
        kitsuneCounter++;
    //If the character's kitsune score is greater than 1 and:
    //If the character has "blonde","black","red","white", or "silver" hair, +1
    //if (kitsuneCounter > 0 && (InCollection(furColor, KitsuneScene.basicKitsuneHair) || InCollection(furColor, KitsuneScene.elderKitsuneColors)))
    //    kitsuneCounter++;
    //If the character's femininity is 40 or higher, +1
    if (kitsuneCounter > 0 && this.femininity >= 40)
        kitsuneCounter++;
    //If the character has fur, scales, or gooey skin, -1
    //if (this.skinType == SKIN_TYPE_FUR && !InCollection(furColor, KitsuneScene.basicKitsuneFur) && !InCollection(furColor, KitsuneScene.elderKitsuneColors))
    //    kitsuneCounter--;
    if (this.skinType > SKIN_TYPE_FUR)
        kitsuneCounter -= this.skinType; // -2 sor scales, -3 for goo
    //If the character has abnormal legs, -1
    if (this.lowerBody != LOWER_BODY_TYPE_HUMAN && this.lowerBody != LOWER_BODY_TYPE_FOX)
        kitsuneCounter--;
    //If the character has a nonhuman face, -1
    if (this.faceType != FACE_HUMAN && this.faceType != FACE_FOX)
        kitsuneCounter--;
    //If the character has ears other than fox ears, -1
    if (this.earType != EARS_FOX)
        kitsuneCounter--;
    //If the character has tail(s) other than fox tails, -1
    if (this.tailType != TAIL_TYPE_FOX)
        kitsuneCounter--;

    return kitsuneCounter;

}

//Determine Dragon Rating
Player.prototype.dragonScore = function() {
    var dragonCounter = 0;
    if (this.faceType == FACE_DRAGON)
        dragonCounter++;
    if (this.earType == EARS_DRAGON)
        dragonCounter++;
    if (this.tailType == TAIL_TYPE_DRACONIC)
        dragonCounter++;
    if (this.tongueType == TONGUE_DRACONIC)
        dragonCounter++;
    if (this.countCocksOfType(CockTypesEnum.DRAGON) > 0)
        dragonCounter++;
    if (this.wingType == WING_TYPE_DRACONIC_SMALL || this.wingType == WING_TYPE_DRACONIC_LARGE)
        dragonCounter++;
    if (this.lowerBody == LOWER_BODY_TYPE_DRAGON)
        dragonCounter++;
    if (this.horns > 0 && (this.hornType == HORNS_DRACONIC_X2 || this.hornType == HORNS_DRACONIC_X4_12_INCH_LONG))
        dragonCounter++;
    if (this.skinType == SKIN_TYPE_SCALES && dragonCounter > 0)
        dragonCounter++;
    if (this.hornType == HORNS_DRACONIC_X4_12_INCH_LONG || this.hornType == HORNS_DRACONIC_X2)
        dragonCounter++;
    if (this.findPerk(PerkLib.Dragonfire) >= 0)
        dragonCounter++;
    return dragonCounter;
}

//Goblinscore
Player.prototype.goblinScore = function() {
    var horseCounter = 0;
    if (this.earType == EARS_ELFIN)
        horseCounter++;
    if (this.skinTone == "pale yellow" || this.skinTone == "grayish-blue" || this.skinTone == "green" || this.skinTone == "dark green")
        horseCounter++;
    if (horseCounter > 0)
    {
        if (this.faceType == FACE_HUMAN)
            horseCounter++;
        if (this.tallness < 48)
            horseCounter++;
        if (this.hasVagina())
            horseCounter++;
        if (this.lowerBody == LOWER_BODY_TYPE_HUMAN)
            horseCounter++;
    }
    return horseCounter;
}

//Gooscore
Player.prototype.gooScore = function() {
    var gooCounter = 0;
    if (this.hairType == HAIR_GOO)
        gooCounter++;
    if (this.skinAdj == "slimy")
        gooCounter++;
    if (this.lowerBody == 8)
        gooCounter++;
    if (this.vaginalCapacity() > 9000)
        gooCounter++;
    if (this.findStatusEffect(StatusEffects.SlimeCraving) >= 0)
        gooCounter++;
    return gooCounter;
}

//Nagascore
Player.prototype.nagaScore = function() {
    var nagaCounter = 0;
    if (this.faceType == FACE_SNAKE_FANGS)
        nagaCounter++;
    if (this.tongueType == TONGUE_SNAKE)
        nagaCounter++;
    if (nagaCounter > 0 && this.antennae == 0)
        nagaCounter++;
    if (nagaCounter > 0 && this.wingType == 0)
        nagaCounter++;
    return nagaCounter;
}

//Bunnyscore
Player.prototype.bunnyScore = function() {
    var bunnyCounter = 0;
    if (this.faceType == FACE_BUNNY)
        bunnyCounter++;
    if (this.tailType == TAIL_TYPE_RABBIT)
        bunnyCounter++;
    if (this.earType == EARS_BUNNY)
        bunnyCounter++;
    if (this.lowerBody == LOWER_BODY_TYPE_BUNNY)
        bunnyCounter++;
    //More than 2 balls reduces bunny score
    if (this.balls > 2 && bunnyCounter > 0)
        bunnyCounter--;
    //Human skin on bunmorph adds
    if (this.skinType == SKIN_TYPE_PLAIN && bunnyCounter > 1)
        bunnyCounter++;
    //No wings and antennae a plus
    if (bunnyCounter > 0 && this.antennae == 0)
        bunnyCounter++;
    if (bunnyCounter > 0 && this.wingType == 0)
        bunnyCounter++;
    return bunnyCounter;
}

//Harpyscore
Player.prototype.harpyScore = function() {
    var harpy = 0;
    if (this.armType == ARM_TYPE_HARPY)
        harpy++;
    if (this.hairType == HAIR_FEATHER)
        harpy++;
    if (this.wingType == WING_TYPE_FEATHERED_LARGE)
        harpy++;
    if (this.tailType == TAIL_TYPE_HARPY)
        harpy++;
    if (this.lowerBody == LOWER_BODY_TYPE_HARPY)
        harpy++;
    if (harpy >= 2 && this.faceType == FACE_HUMAN)
        harpy++;
    if (harpy >= 2 && (this.earType == EARS_HUMAN || this.earType == EARS_ELFIN))
        harpy++;
    return harpy;
}

//Kangascore
Player.prototype.kangaScore = function() {
    var kanga = 0;
    if (this.countCocksOfType(CockTypesEnum.KANGAROO) > 0)
        kanga++;
    if (this.earType == EARS_KANGAROO)
        kanga++;
    if (this.tailType == TAIL_TYPE_KANGAROO)
        kanga++;
    if (this.lowerBody == LOWER_BODY_TYPE_KANGAROO)
        kanga++;
    if (this.faceType == FACE_KANGAROO)
        kanga++;
    if (kanga >= 2 && this.skinType == SKIN_TYPE_FUR)
        kanga++;
    return kanga;
}

//sharkscore
Player.prototype.sharkScore = function() {
    var sharkCounter = 0;
    if (this.faceType == FACE_SHARK_TEETH)
        sharkCounter++;
    if (this.wingType == WING_TYPE_SHARK_FIN)
        sharkCounter++;
    if (this.tailType == TAIL_TYPE_SHARK)
        sharkCounter++;
    if (this.skinType == SKIN_TYPE_PLAIN && (this.skinTone == "rough gray" || player.skinTone == "orange and black striped"))
        sharkCounter++;
    return sharkCounter;
}

//Determine Mutant Rating
Player.prototype.mutantScore = function() {
    var mutantCounter = 0;
    if (this.faceType > FACE_HUMAN)
        mutantCounter++;
    if (this.skinType > SKIN_TYPE_PLAIN)
        mutantCounter++;
    if (this.tailType > TAIL_TYPE_NONE)
        mutantCounter++;
    if (this.cockTotal() > 1)
        mutantCounter++;
    if (this.hasCock() && this.hasVagina())
        mutantCounter++;
    if (this.hasFuckableNipples())
        mutantCounter++;
    if (this.breastRows.length > 1)
        mutantCounter++;
    if (this.faceType == FACE_HORSE)
    {
        if (this.skinType == SKIN_TYPE_FUR)
            mutantCounter--;
        if (this.tailType == TAIL_TYPE_HORSE)
            mutantCounter--;
    }
    if (this.faceType == FACE_DOG)
    {
        if (this.skinType == SKIN_TYPE_FUR)
            mutantCounter--;
        if (this.tailType == TAIL_TYPE_DOG)
            mutantCounter--;
    }
    if (this.faceType == FACE_CAT)
    {
        if (this.skinType == SKIN_TYPE_FUR)
            mutantCounter--;
        if (this.tailType == TAIL_TYPE_CAT)
            mutantCounter--;
    }
    return mutantCounter--;
}

//Mod-added
Player.prototype.sirenScore = function()
{
    var sirenCounter = 0;
    if (this.faceType == FACE_SHARK_TEETH && this.tailType == TAIL_TYPE_SHARK && this.wingType == WING_TYPE_FEATHERED_LARGE && this.armType == ARM_TYPE_HARPY)
        sirenCounter+= 4;
    if (this.hasVagina() && sirenCounter > 0)
        sirenCounter++;
    if (this.hasCock() && this.countCocksOfType(CockTypesEnum.ANEMONE) > 0 && sirenCounter > 0)
    	sirenCounter++;
    return sirenCounter++;
}

Player.prototype.pigScore = function() {
    var pigCounter = 0;
    if (this.earType == EARS_PIG)
        pigCounter++;
    if (this.tailType == TAIL_TYPE_PIG)
        pigCounter++;
    if (this.faceType == FACE_PIG || FACE_BOAR)
        pigCounter++;
    if (this.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED)
        pigCounter += 2;
    if (this.countCocksOfType(CockTypesEnum.PIG) > 0)
        pigCounter++;
    return pigCounter;
}

Player.prototype.satyrScore = function() {
    var satyrCounter = 0;
    if (this.lowerBody == LOWER_BODY_TYPE_HOOFED)
        satyrCounter++;
    if (this.tailType == TAIL_TYPE_GOAT)
        satyrCounter++;
    if (satyrCounter >= 2) {
        if (this.earType == EARS_ELFIN)
            satyrCounter++;
        if (this.faceType == FACE_HUMAN)
            satyrCounter++;
        if (this.countCocksOfType(CockTypesEnum.HUMAN) > 0)
            satyrCounter++;
        if (this.balls > 0 && this.ballSize >= 3)
            satyrCounter++;
    }
    return satyrCounter;
}

Player.prototype.rhinoScore = function() {
    var rhinoCounter = 0;
    if (this.earType == EARS_RHINO)
        rhinoCounter++;
    if (this.tailType == TAIL_TYPE_RHINO)
        rhinoCounter++;
    if (this.faceType == FACE_RHINO)
        rhinoCounter++;
    if (this.hornType == HORNS_RHINO)
        rhinoCounter++;
    if (rhinoCounter >= 2 && this.skinTone == "gray")
        rhinoCounter++;
    if (rhinoCounter >= 2 && this.hasCock() && this.countCocksOfType(CockTypesEnum.RHINO) > 0)
        rhinoCounter++;
    return rhinoCounter;
}

Player.prototype.echidnaScore = function() {
    var echidnaCounter = 0;
    if (this.earType == EARS_ECHIDNA)
        echidnaCounter++;
    if (this.tailType == TAIL_TYPE_ECHIDNA)
        echidnaCounter++;
    if (this.faceType == FACE_ECHIDNA)
        echidnaCounter++;
    if (this.tongueType == TONGUE_ECHIDNA)
        echidnaCounter++;
    if (this.lowerBody == LOWER_BODY_TYPE_ECHIDNA)
        echidnaCounter++;
    if (echidnaCounter >= 2 && this.skinType == SKIN_TYPE_FUR)
        echidnaCounter++;
    if (echidnaCounter >= 2 && this.hasCock() && this.countCocksOfType(CockTypesEnum.ECHIDNA) > 0)
        echidnaCounter++;
    return echidnaCounter;
}

Player.prototype.deerScore = function() {
    var deerCounter = 0;
    if (this.earType == EARS_DEER)
        deerCounter++;
    if (this.tailType == TAIL_TYPE_DEER)
        deerCounter++;
    if (this.faceType == FACE_DEER)
        deerCounter++;
    if (this.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED || this.lowerBody == LOWER_BODY_TYPE_DEERTAUR)
        deerCounter++;
    if (this.hornType == HORNS_ANTLERS && this.horns >= 4)
        deerCounter++;
    if (deerCounter >= 2 && this.skinType == SKIN_TYPE_FUR)
        deerCounter++;
    if (deerCounter >= 3 && this.countCocksOfType(CockTypesEnum.HORSE) > 0)
        deerCounter++;
    return deerCounter;
}

//Dragonne
Player.prototype.dragonneScore = function() {
    var dragonneCounter = 0;
    if (this.faceType == FACE_CAT)
        dragonneCounter++;
    if (this.earType == EARS_CAT)
        dragonneCounter++;
    if (this.tailType == TAIL_TYPE_CAT)
        dragonneCounter++;
    if (this.tongueType == TONGUE_DRACONIC)
        dragonneCounter++;
    if (this.wingType == WING_TYPE_DRACONIC_LARGE || this.wingType == WING_TYPE_DRACONIC_SMALL)
        dragonneCounter++;
    if (this.lowerBody == LOWER_BODY_TYPE_CAT)
        dragonneCounter++;
    if (this.skinType == 2 && dragonneCounter > 0)
        dragonneCounter++;
    return dragonneCounter;
}

//Manticore
Player.prototype.manticoreScore = function() {
    var catCounter = 0;
    if (this.faceType == FACE_CAT)
        catCounter++;
    if (this.earType == EARS_CAT)
        catCounter++;
    if (this.tailType == TAIL_TYPE_SCORPION)
        catCounter += 2;
    if (this.lowerBody == LOWER_BODY_TYPE_CAT)
        catCounter++;
    if (catCounter >= 4) {
        if (this.hornType == HORNS_DEMON || this.hornType == HORNS_DRACONIC_X2 || this.hornType == HORNS_DRACONIC_X4_12_INCH_LONG)
            catCounter++;
        if (this.wingType == WING_TYPE_BAT_LIKE_TINY || this.wingType == WING_TYPE_DRACONIC_SMALL)
            catCounter++;
        if (this.wingType == WING_TYPE_BAT_LIKE_LARGE || this.wingType == WING_TYPE_DRACONIC_LARGE)
            catCounter += 2;
    }
    //Fur only counts if some canine features are present
    if (this.skinType == 1 && catCounter >= 6)
        catCounter++;
    return catCounter;
}

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

Player.prototype.lengthChange = function(amount, ncocks) {
    if (amount < 0 && hyperHappy)  // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
    {
        return;
    }
    //Display the degree of length change.
    if (amount <= 1 && amount > 0) {
        if (this.cocks.length == 1) outputText("Your " + player.cockDescript(0) + " has grown slightly longer.", false);
        if (this.cocks.length > 1) {
            if (ncocks == 1) outputText("One of your " + player.multiCockDescriptLight() + " grows slightly longer.", false);
            if (ncocks > 1 && ncocks < this.cocks.length) outputText("Some of your " + player.multiCockDescriptLight() + " grow slightly longer.", false);
            if (ncocks == this.cocks.length) outputText("Your " + player.multiCockDescriptLight() + " seem to fill up... growing a little bit larger.", false);
        }
    }
    if (amount > 1 && amount < 3) {
        if (this.cocks.length == 1) outputText("A very pleasurable feeling spreads from your groin as your " + player.cockDescript(0) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.", false);
        if (this.cocks.length > 1) {
            if (ncocks == this.cocks.length) outputText("A very pleasurable feeling spreads from your groin as your " + player.multiCockDescriptLight() + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.", false);
            if (ncocks == 1) outputText("A very pleasurable feeling spreads from your groin as one of your " + player.multiCockDescriptLight() + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.", false);
            if (ncocks > 1 && ncocks < this.cocks.length) outputText("A very pleasurable feeling spreads from your groin as " + num2Text(cocks) + " of your " + player.multiCockDescriptLight() + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.", false);
        }
    }
    if (amount >=3){
        if (this.cocks.length == 1) outputText("Your " + this.cockDescript(0) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.", false);
        if (this.cocks.length > 1) {
            if (ncocks == 1) outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as one of their number begins to grow inch after inch of length.", false);
            if (ncocks > 1 && ncocks < this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " feel incredibly number as " + num2Text(ncocks) + " of them begin to grow inch after inch of added length.", false);
            if (ncocks == this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as inch after inch of length pour out from your groin.", false);
        }
    }
    //Display LengthChange
    if (amount > 0) {
        if (this.cocks[0].cockLength >= 8 && this.cocks[0].cockLength-amount < 8){
            if (this.cocks.length == 1) outputText("  <b>Most men would be overly proud to have a tool as long as yours.</b>", false);
            if (this.cocks.length > 1) outputText("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + this.multiCockDescript() + ".</b>", false);
        }
        if (this.cocks[0].cockLength >= 12 && this.cocks[0].cockLength-amount < 12) {
            if (this.cocks.length == 1) outputText("  <b>Your " + this.cockDescript(0) + " is so long it nearly swings to your knee at its full length.</b>", false);
            if (this.cocks.length > 1) outputText("  <b>Your " + this.multiCockDescriptLight() + " are so long they nearly reach your knees when at full length.</b>", false);
        }
        if (this.cocks[0].cockLength >= 16 && this.cocks[0].cockLength-amount < 16) {
            if (this.cocks.length == 1) outputText("  <b>Your " + this.cockDescript(0) + " would look more at home on a large horse than you.</b>", false);
            if (this.cocks.length > 1) outputText("  <b>Your " + this.multiCockDescriptLight() + " would look more at home on a large horse than on your body.</b>", false);
            if (this.biggestTitSize() >= BREAST_CUP_C) {
                if (this.cocks.length == 1) outputText("  You could easily stuff your " + this.cockDescript(0) + " between your breasts and give yourself the titty-fuck of a lifetime.", false);
                if (this.cocks.length > 1) outputText("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.", false);
            }
            else {
                if (this.cocks.length == 1) outputText("  Your " + this.cockDescript(0) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.", false);
                if (this.cocks.length > 1) outputText("  Your " + this.multiCockDescriptLight() + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.", false);
            }
        }
        if (this.cocks[0].cockLength >= 20 && this.cocks[0].cockLength-amount < 20) {
            if (this.cocks.length == 1) outputText("  <b>As if the pulsing heat of your " + this.cockDescript(0) + " wasn't enough, the tip of your " + this.cockDescript(0) + " keeps poking its way into your view every time you get hard.</b>", false);
            if (this.cocks.length > 1) outputText("  <b>As if the pulsing heat of your " + this.multiCockDescriptLight() + " wasn't bad enough, every time you get hard, the tips of your " + this.multiCockDescriptLight() + " wave before you, obscuring the lower portions of your vision.</b>", false);
            if (this.cor > 40 && this.cor <= 60) {
                if (this.cocks.length > 1) outputText("  You wonder if there is a demon or beast out there that could take the full length of one of your " + this.multiCockDescriptLight() + "?", false);
                if (this.cocks.length ==1) outputText("  You wonder if there is a demon or beast out there that could handle your full length.", false);
            }
            if (this.cor > 60 && this.cor <= 80) {
                if (this.cocks.length > 1) outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.multiCockDescriptLight() + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.", false);
                if (this.cocks.length ==1) outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.cockDescript(0) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.", false);
            }
            if (this.cor > 80) {
                if (this.cocks.length > 1) outputText("  You find yourself fantasizing about impaling nubile young champions on your " + this.multiCockDescriptLight() + " in a year's time.", false);
            }
        }
    }
    //Display the degree of length loss.
    if (amount < 0 && amount >= -1) {
        if (this.cocks.length == 1) outputText("Your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.", false);
        if (this.cocks.length > 1) {
            if (ncocks == this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.", false);
            if (ncocks > 1 && ncocks < this.cocks.length) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.", false);
            if (ncocks == 1) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.", false);
        }
    }
    if (amount < -1 && amount > -3) {
        if (this.cocks.length == 1) outputText("Your " + this.multiCockDescriptLight() + " shrinks smaller, flesh vanishing into your groin.", false);
        if (this.cocks.length > 1) {
            if (ncocks == this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.", false);
            if (ncocks == 1) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.", false);
            if (ncocks > 1 && ncocks < this.cocks.length) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.", false);
        }
    }
    if (amount <= -3) {
        if (this.cocks.length == 1) outputText("A large portion of your " + this.multiCockDescriptLight() + "'s length shrinks and vanishes.", false);
        if (this.cocks.length > 1) {
            if (ncocks == this.cocks.length) outputText("A large portion of your " + this.multiCockDescriptLight() + " receeds towards your groin, receding rapidly in length.", false);
            if (ncocks == 1) outputText("A single member of your " + this.multiCockDescriptLight() + " vanishes into your groin, receding rapidly in length.", false);
            if (ncocks > 1 && this.cocks.length > ncocks) outputText("Your " + this.multiCockDescriptLight() + " tingles as " + num2Text(ncocks) + " of your members vanish into your groin, receding rapidly in length.", false);
        }
    }
}

//Armour Descript & Clothed or Naked!
Player.prototype.armorDescript = function(nakedText) {
    //Default
    if (nakedText == undefined) nakedText = "gear";
    //Main Function
    var textArray = [];
    var text = "";
    //if (armor != ArmorLib.NOTHING) text += armorName;
    //Join text.
    if (this.armor.equipmentName != "naked") textArray.push(this.armor.name);
    //if (upperGarment != UndergarmentLib.NOTHING) textArray.push(upperGarmentName);
    //if (lowerGarment != UndergarmentLib.NOTHING) textArray.push(lowerGarmentName);
    if (textArray.length > 0) text = formatStringArray(textArray);
    //Naked?
    if (this.armor.equipmentName == "naked") text = nakedText;
    //if (upperGarment == UndergarmentLib.NOTHING && lowerGarment == UndergarmentLib.NOTHING && armor == ArmorLib.NOTHING) text = nakedText;
    return text;
}

Player.prototype.clothedOrNaked = function(clothedText, nakedText) {
    if (nakedText == undefined) nakedText = "";
    return (this.armorDescript() != "nothing" ? clothedText : nakedText);
}

Player.prototype.clothedOrNakedUpper = function(clothedText, nakedText) {
    if (nakedText == undefined) nakedText = "";
    return (this.armor.equipmentName != "nothing" && this.upperGarment.equipmentName == "nothing" ? clothedText : nakedText);
}

Player.prototype.clothedOrNakedLower = function(clothedText, nakedText) {
    if (nakedText == undefined) nakedText = "";
    return (this.armor.equipmentName != "nothing" && (this.armor.equipmentName != "lethicite armor" && this.lowerGarment.equipmentName == "nothing") && !this.isTaur() ? clothedText : nakedText);
}

//CLEAR STATUSES
Player.prototype.clearStatuses = function() {
    while (this.findStatusEffect(StatusEffects.Web) >= 0) {
        this.modStats("spe", this.statusEffectValue(StatusEffects.Web, 1));
        this.removeStatusEffect(StatusEffects.Web);
    }
    if (this.findStatusEffect(StatusEffects.Shielding) >= 0) this.removeStatusEffect(StatusEffects.Shielding);
    if (this.findStatusEffect(StatusEffects.HolliConstrict) >= 0) this.removeStatusEffect(StatusEffects.HolliConstrict);
    if (this.findStatusEffect(StatusEffects.LustStones) >= 0) this.removeStatusEffect(StatusEffects.LustStones);
    if (monster.findStatusEffect(StatusEffects.Sandstorm) >= 0) monster.removeStatusEffect(StatusEffects.Sandstorm);
    if (this.findStatusEffect(StatusEffects.Sealed) >= 0) this.removeStatusEffect(StatusEffects.Sealed);
    if (this.findStatusEffect(StatusEffects.Berzerking) >= 0) this.removeStatusEffect(StatusEffects.Berzerking);
    if (monster.findStatusEffect(StatusEffects.TailWhip) >= 0) monster.removeStatusEffect(StatusEffects.TailWhip);
    if (this.findStatusEffect(StatusEffects.UBERWEB) >= 0) this.removeStatusEffect(StatusEffects.UBERWEB);
    if (this.findStatusEffect(StatusEffects.DriderKiss) >= 0) this.removeStatusEffect(StatusEffects.DriderKiss);
    if (this.findStatusEffect(StatusEffects.WebSilence) >= 0) this.removeStatusEffect(StatusEffects.WebSilence);
    if (this.findStatusEffect(StatusEffects.GooArmorSilence) >= 0) this.removeStatusEffect(StatusEffects.GooArmorSilence);

    if (this.findStatusEffect(StatusEffects.Whispered) >= 0) this.removeStatusEffect(StatusEffects.Whispered);
    if (this.findStatusEffect(StatusEffects.AkbalSpeed) >= 0) {
        this.modStats("spe", -this.statusEffectValue(StatusEffects.AkbalSpeed, 1));
        this.removeStatusEffect(StatusEffects.AkbalSpeed);
    }
    if (this.findStatusEffect(StatusEffects.AmilyVenom) >= 0) {
        this.modStats("str", this.statusEffectValue(StatusEffects.AmilyVenom, 1));
        this.modStats("spe", this.statusEffectValue(StatusEffects.AmilyVenom, 2));
        this.removeStatusEffect(StatusEffects.AmilyVenom);
    }
    while (this.findStatusEffect(StatusEffects.Blind) >= 0) this.removeStatusEffect(StatusEffects.Blind);
    if (this.findStatusEffect(StatusEffects.SheilaOil) >= 0) this.removeStatusEffect(StatusEffects.SheilaOil);
    if (this.findStatusEffect(StatusEffects.TwuWuv) >= 0) {
        this.modStats("int", this.statusEffectValue(StatusEffects.TwuWuv, 1));
        this.removeStatusEffect(StatusEffects.TuvWuv);
    }
    if (this.findStatusEffect(StatusEffects.Bind) >= 0) this.removeStatusEffect(StatusEffects.Bind);
    if (this.findStatusEffect(StatusEffects.Venom) >= 0) {
        if (this.statusEffectValue(StatusEffects.Venom, 1) == VENOM_TYPE_BEE) {
            this.modStats("str", this.statusEffectValue(StatusEffects.Venom, 2));
            this.modStats("spe", this.statusEffectValue(StatusEffects.Venom, 3));
        }
        this.removeStatusEffect(StatusEffects.Venom);
    }
    if (this.findStatusEffect(StatusEffects.Silence) >= 0) this.removeStatusEffect(StatusEffects.Silence);

    if (this.findStatusEffect(StatusEffects.StoneLust) >= 0) this.removeStatusEffect(StatusEffects.StoneLust);
    this.removeStatusEffect(StatusEffects.FirstAttack);
    if (this.findStatusEffect(StatusEffects.TemporaryHeat) >= 0) this.removeStatusEffect(StatusEffects.TemporaryHeat);
    if (this.findStatusEffect(StatusEffects.NoFlee) >= 0) this.removeStatusEffect(StatusEffects.NoFlee);
    if (this.findStatusEffect(StatusEffects.Poison) >= 0) this.removeStatusEffect(StatusEffects.Poison);
    if (this.findStatusEffect(StatusEffects.IsabellaStunned) >= 0) this.removeStatusEffect(StatusEffects.IsabellaStunned);
    if (this.findStatusEffect(StatusEffects.Stunned) >= 0) this.removeStatusEffect(StatusEffects.Stunned);
    if (this.findStatusEffect(StatusEffects.Confusion) >= 0) this.removeStatusEffect(StatusEffects.Confusion);
    if (this.findStatusEffect(StatusEffects.ThroatPunch) >= 0) this.removeStatusEffect(StatusEffects.ThroatPunch);
    if (this.findStatusEffect(StatusEffects.KissOfDeath) >= 0) this.removeStatusEffect(StatusEffects.KissOfDeath);
    if (this.findStatusEffect(StatusEffects.AcidSlap) >= 0) this.removeStatusEffect(StatusEffects.AcidSlap);
    if (this.findStatusEffect(StatusEffects.CalledShot) >= 0) {
        this.modStats("spe", this.statusEffectValue(StatusEffects.CalledShot, 1));
        this.removeStatusEffect(StatusEffects.CalledShot);
    }
    if (this.findStatusEffect(StatusEffects.DemonSeed) >= 0) this.removeStatusEffect(StatusEffects.DemonSeed);
    if (this.findStatusEffect(StatusEffects.InfestAttempted) >= 0) this.removeStatusEffect(StatusEffects.InfestAttempted);
    if (this.findStatusEffect(StatusEffects.Might) >= 0) {
        this.modStats("str", -this.statusEffectValue(StatusEffects.Might, 1));
        this.modStats("tou", -this.statusEffectValue(StatusEffects.Might, 2));
        this.removeStatusEffect(StatusEffects.Might);
    }
    if (this.findStatusEffect(StatusEffects.ChargeWeapon) >= 0) this.removeStatusEffect(StatusEffects.ChargeWeapon);
    if (this.findStatusEffect(StatusEffects.Disarmed) >= 0) {
        this.removeStatusEffect(StatusEffects.Disarmed);
    }
    if (this.findStatusEffect(StatusEffects.AnemoneVenom) >= 0) {
        this.modStats("str", this.statusEffectValue(StatusEffects.AnemoneVenom, 1));
        this.modStats("spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 2));
        this.removeStatusEffect(StatusEffects.AnemoneVenom);
    }
    if (this.findStatusEffect(StatusEffects.GnollSpear) >= 0) {
        this.modStats("spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 1));
        this.removeStatusEffect(StatusEffects.GnollSpear);
    }
    if (this.findStatusEffect(StatusEffects.BasiliskCompulsion) >= 0) this.removeStatusEffect(StatusEffects.BasiliskCompulsion);
    if (this.findStatusEffect(StatusEffects.BasiliskSlow) >= 0) {
        this.modStats("spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 1));
        this.removeStatusEffect(StatusEffects.BasiliskSlow);
    }
    if (this.findStatusEffect(StatusEffects.GiantGrabbed) >= 0) this.removeStatusEffect(StatusEffects.GiantGrabbed);
    if (this.findStatusEffect(StatusEffects.GiantBoulder) >= 0) this.removeStatusEffect(StatusEffects.GiantBoulder);
    if (this.findStatusEffect(StatusEffects.GiantStrLoss) >= 0) {
        this.modStats("str", this.statusEffectValue(StatusEffects.GiantStrLoss, 1));
        this.removeStatusEffect(StatusEffects.GiantStrLoss);
    }
    if (this.findStatusEffect(StatusEffects.LizanBlowpipe) >= 0) {
        this.modStats("str", this.statusEffectValue(StatusEffects.LizanBlowpipe, 1));
        this.modStats("tou", this.statusEffectValue(StatusEffects.LizanBlowpipe, 2));
        this.modStats("spe", this.statusEffectValue(StatusEffects.LizanBlowpipe, 3));
        this.modStats("sen", -this.statusEffectValue(StatusEffects.LizanBlowpipe, 4));
        this.removeStatusEffect(StatusEffects.LizanBlowpipe);
    }
    while (this.findStatusEffect(StatusEffects.IzmaBleed) >= 0) this.removeStatusEffect(StatusEffects.IzmaBleed);
    if (this.findStatusEffect(StatusEffects.GardenerSapSpeed) >= 0) {
        this.modStats("spe", this.statusEffectValue(StatusEffects.GardenerSapSpeed, 1));
        this.removeStatusEffect(StatusEffects.GardenerSapSpeed);
    }
    if (this.findStatusEffect(StatusEffects.KnockedBack) >= 0) this.removeStatusEffect(StatusEffects.KnockedBack);
    if (this.findStatusEffect(StatusEffects.RemovedArmor) >= 0) this.removeStatusEffect(StatusEffects.RemovedArmor);
    if (this.findStatusEffect(StatusEffects.JCLustLevel) >= 0) this.removeStatusEffect(StatusEffects.JCLustLevel);
    if (this.findStatusEffect(StatusEffects.MirroredAttack) >= 0) this.removeStatusEffect(StatusEffects.MirroredAttack);
    if (this.findStatusEffect(StatusEffects.Tentagrappled) >= 0) this.removeStatusEffect(StatusEffects.Tentagrappled);
    if (this.findStatusEffect(StatusEffects.TentagrappleCooldown) >= 0) this.removeStatusEffect(StatusEffects.TentagrappleCooldown);
    if (this.findStatusEffect(StatusEffects.ShowerDotEffect) >= 0) this.removeStatusEffect(StatusEffects.ShowerDotEffect);
    if (this.findStatusEffect(StatusEffects.VineHealUsed) >= 0) this.removeStatusEffect(StatusEffects.VineHealUsed);
}

Player.prototype.setFurColor = function(colorArray) {
    if (this.skinType == SKIN_TYPE_FUR) {
        this.furColor = colorArray[rand(colorArray.length)];
    }
}

//RUT/HEAT (NYI)
Player.prototype.goIntoRut = function() {
    return false;
}

Player.prototype.goIntoHeat = function() {
    return false;
}

//NUTRIENTS (NYI)
Player.prototype.slimeFeed = function() {

}

Player.prototype.refillHunger = function(amount) {
    this.hunger += amount;
    if (this.hunger > 100) this.hunger = 100;
}

Player.prototype.damageHunger = function(amount) {
    outputText("You take <b><font color='#daa520'>" + amount + "</font></b> hunger damage.");
    this.hunger -= amount;
    if (this.hunger < 0) this.hunger = 0;
}

//ITEMS
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
	return this.itemCount(itype) >= minQuantity;
}

Player.prototype.itemCount = function(itype) {
	var count = 0;
	for (var i = 0; i < this.itemSlots.length; i++) {
		if (this.itemSlots[i].itype == itype) count += this.itemSlots[i].quantity;
	}
	return count;
}

Player.prototype.roomInExistingStack = function(itype) {
	for (var i = 0; i < 10; i++) {
		if (this.itemSlots[i].itype == itype && this.itemSlots[i].quantity != 0 && this.itemSlots[i].quantity < 5)
			return i;
	}
	return -1;
}

Player.prototype.emptySlot = function() {
	for (var i = 0; i < this.itemSlots.length; i++) {
		if ((this.itemSlots[i].itype == undefined || this.itemSlots[i].itype == Items.NOTHING) && i < this.getMaxSlots()) return i;
	}
	return -1;
}

Player.prototype.destroyItems = function(itype, numOfItemToRemove) {
	for (var slotNum = 0; slotNum < this.itemSlots.length; slotNum += 1) {
		if (this.itemSlots[slotNum].itype == itype) {
			while (this.itemSlots[slotNum].quantity > 0 && numOfItemToRemove > 0) {
				this.itemSlots[slotNum].removeOneItem();
				numOfItemToRemove--;
			}
		}
	}
	return numOfItemToRemove <= 0;
}

//OTHERS
Player.prototype.corruptionTolerance = function() {
    return 0; //Currently returns 0.
}

Player.prototype.countCockSocks = function(colour) {
    return 0; //Currently returns 0.
}

Player.prototype.changeXP = function(amount) {
    player.XP += amount;
    if (player.XP < 0) player.XP = 0; //Keep from going into negative.
    if (player.XP > 9999) player.XP = 9999;
    refreshStats();
}

Player.prototype.changeGems = function(amount) {
    player.gems += amount;
    if (player.gems < 0) player.gems = 0; //Keep from going into negative.
    if (player.gems > Number.MAX_VALUE) player.gems = Number.MAX_VALUE;
    refreshStats();
}

//-----------
// NEW GAME PLUS
//-----------

Player.prototype.newGamePlusMod = function () {
    return 0;
};