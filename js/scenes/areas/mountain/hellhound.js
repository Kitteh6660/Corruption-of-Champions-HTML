HellhoundScene = [];

function Hellhound() {
    //Name and references
    this.a = "the ";
    this.name = "hellhound";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "he";
    this.himHer = "him";
    this.hisHer = "his";
    this.battleDesc = "It looks like a large demon on all fours with two heads placed side-by-side. The heads are shaped almost like human heads, but they have dog ears on the top and have a long dog snout coming out where their mouths and noses would be. Its eyes and mouth are filled with flames and its hind legs capped with dog paws, but its front ones almost look like human hands. Its limbs end in large, menacing claws. A thick layer of dark fur covers his entire body like armor. Both heads look at you hungrily as the hellhound circles around you. You get the feeling that reasoning with this beast will be impossible.";

    //Stats
    this.str = 55;
    this.tou = 60;
    this.spe = 40;
    this.inte = 1;
    this.lib = 95;
    this.sens = 20;
    this.cor = 100;
    //Combat stats
    this.HP = this.maxHP();
    this.bonusHP = 20 + rand(this.ballSize * 2);
    this.lust = 25;
    this.fatigue = 0;
    //Advancement
    this.level = 5;
    this.gems = 10 + rand(10);
    //Battle variables
    this.weapon.equipmentName = "claws";
    this.weapon.verb = "claw";
    this.weapon.attack = 10;
    this.armor.equipmentName = "thick fur";
    this.lustVuln = 1;

    //Appearance
    this.tallness = rand(37) + 84;
    this.hipRating = HIP_RATING_AVERAGE;
    this.buttRating = BUTT_RATING_AVERAGE + 1;
    this.lowerBody = LOWER_BODY_TYPE_DOG;
    this.skinTone = "black";
    this.skinType = SKIN_TYPE_FUR;
    this.hairColor = "red";
    this.hairLength = 3;
    //Sexual characteristics
    this.createBreastRow();
    this.createBreastRow();
    this.createBreastRow();
    this.createCock(8,2,CockTypesEnum.DOG);
    this.createCock(8,2,CockTypesEnum.DOG);
    this.balls = 2;
    this.ballSize = 4;
    this.cumMultiplier = 5;
    this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
    this.ass.analWetness = ANAL_WETNESS_NORMAL;
    this.createStatusEffect(StatusEffects.BonusACapacity, 30, 0, 0, 0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    this.addDrop(Items.Consumables.CaninePepper, 30);
    this.addDrop(Items.Consumables.CaninePepperBulby, 12);
    this.addDrop(Items.Consumables.CaninePepperKnotty, 12);
    this.addDrop(Items.Consumables.CaninePepperBlack, 12);
    this.addDrop(Items.Consumables.CaninePepperDouble, 12);
    this.addDrop(Items.Consumables.CaninePepperLarge, 12);

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = cleanupAfterCombat;
}
Hellhound.prototype = new Creature();
Hellhound.constructor = Hellhound;

//------------
// COMBAT
//------------
Hellhound.prototype.doAI = function() {
    switch(rand(4)) {
        case 0:
            Hellhound.hellhoundFire();
            break;
        case 1:
            Hellhound.hellhoundScent();
            break;
        default:
            this.attack();
    }
    combatRoundOver();
}

Hellhound.hellhoundFire = function() {
    //Blind dodge change
    if (monster.findStatusEffect(StatusEffects.Blind) >= 0) {
        outputText(capitalize(monster.a) + monster.refName + " completely misses you with a wave of dark fire! Thank the gods it's blind!");
        combatRoundOver();
        return;
    }
    /*if (player.hasStatusAffect(StatusAffects.Web_dash_Silence) >= 0) {
     outputText("You reach inside yourself to breathe flames, but as you ready to release a torrent of fire, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n", false);
     changeFatigue(10);
     takeDamage(10+rand(20));
     enemyAI();
     return;
     }*/
    if (player.findPerk(PerkLib.Evade) >= 0 && player.spe >= 35 && rand(3) != 0) {
        outputText("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You easily avoid the wave, diving to the side and making the most of your talents at evasion.", false);
    }
    else if (player.findPerk(PerkLib.Misdirection) >= 0 && rand(100) < 20 && player.armor.equipmentName == "red, high-society bodysuit") {
        outputText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + monster.a + monster.refName + "'s fire.\n", false);
    }
    else if (player.findPerk(PerkLib.Flexibility) >= 0 && player.spe > 30 && rand(10) != 0) {
        outputText("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You twist and drop with incredible flexibility, watching the fire blow harmlessly overhead.", false);
    }
    else {
        //Determine the damage to be taken
        var temp = 15 + rand(10);
        outputText("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you. While the flames don't burn much, the unnatural heat fills your body with arousal. ");
        player.changeHP(-temp, true, false);
        player.changeLust(20 + (player.sens/10), true, false);
    }
}

Hellhound.hellhoundScent = function() {
    if (player.findStatusEffect(StatusEffects.NoFlee) >= 0) {
        if (monster.spe == 100) {
            Hellhound.hellhoundFire();
            return;
        }
        else {
            outputText("The hellhound sniffs your scent again, seemingly gaining more and more energy as he circles faster around you.", false);
            monster.spe = 100;
        }
    }
    else {
        monster.spe += 40;
        outputText("The hellhound keeps his four eyes on you as he sniffs the ground where you were moments ago. He raises his heads back up and gives you a fiery grin - he seems to have acquired your scent!  It'll be hard to get away now...", false);
        player.createStatusEffect(StatusEffects.NoFlee, 0, 0, 0, 0);
    }
    combatRoundOver();
}

//------------
// SCENES
//------------
HellhoundScene.hellhoundEncounter = function() {
    clearOutput();
    displaySprite("hellhound");
    outputText("You hear a fiery howl as a demonic, two-headed beast-man leaps out in front of you!");
    if (gameFlags[CODEX_ENTRY_HELLHOUNDS] <= 0) {
        gameFlags[CODEX_ENTRY_HELLHOUNDS] = 1;
        outputText("<br><br><b>New codex entry unlocked: Hellhounds!</b>")
    }
    startCombat(new Hellhound());
}