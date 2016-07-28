GooGirlScene = [];

function GooGirl() {
    //Name and references
    this.a = "the ";
    this.name = "goo-girl";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "she";
    this.himHer = "her";
    this.hisHer = "her";
    this.battleDesc = "The goo-girl has a curious expression on her youthful, shimmering face. Her body is slender and globs of slime regularly drip from her limbs, splattering into the goo puddle pooling beneath her hips. A small, heart-shaped nucleus pulses in her chest with a red glow." + (player.biggestTitSize() >= 12 ? ("  She has apparently made herself a bit more like you, as her chest appears to be a perfect copy of your " + player.chestDesc() + ".") : "");

    //Stats
    this.str = 25;
    this.tou = 25;
    this.spe = 20;
    this.inte = 30;
    this.lib = 50;
    this.sens = 40;
    this.cor = 10;
    //Combat stats
    this.bonusHP = 40;
    this.HP = this.maxHP();
    this.lust = 45;
    this.fatigue = 0;
    //Advancement
    this.level = 3;
    this.gems = 1 + rand(5);
    //Battle variables
    this.weapon.equipmentName = "hands";
    this.weapon.verb = "slap";
    this.armor.equipmentName = "gelatinous skin";
    this.lustVuln = 0.75;

    //Appearance
    this.tallness = rand(8) + 80;
    this.hipRating = HIP_RATING_AMPLE;
    this.buttRating = BUTT_RATING_LARGE;
    this.lowerBody = LOWER_BODY_TYPE_GOO;
    this.skinTone = "blue";
    this.skinAdj = "goopey";
    this.hairColor = this.skinTone;
    this.hairLength = 12 + rand(10);
    //Sexual characteristics
    this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_NORMAL);
    this.createStatusEffect(StatusEffects.BonusVCapacity, 9001, 0, 0, 0);
    this.createBreastRow(player.biggestTitSize() > 3 ? player.biggestTitSize() : 3);
    this.createBreastRow(0);
    this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
    this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    this.addDrop(Items.Weapons.Pipe, 10);
    //this.addDrop(Items.Consumables.WetCloth, 45);
    this.addDrop(Items.Materials.GreenGel, 45);

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = cleanupAfterCombat;
}
GooGirl.prototype = new Creature();
GooGirl.prototype.constructor = GooGirl;

//------------
// COMBAT
//------------
GooGirl.prototype.doAI = function() {
    var chooser;
    if (monster.findStatusEffect(StatusEffects.Acid) >= 0 && rand(3) == 0 || rand(3) == 0) chooser = 0; //Extra chance if acidic.
    else if (rand(5) == 0) chooser = 1;
    else if (rand(3) == 0) chooser = 2;
    else chooser = 3;
    //Goo Girl chooses what to use!
    switch(chooser) {
        case 0:
            GooGirl.gooGalAttack();
            break;
        case 1:
            if (this.fatigue <= this.maxFatigue() - 25 && player.findStatusEffect(StatusEffects.Bind) < 0)
                GooGirl.gooEngulph();
            else
                GooGirl.gooGalAttack();
            break;
        case 2:
            GooGirl.gooPlay();
            break;
        case 3:
            GooGirl.gooThrow();
            break;
        default:
            this.attack();
    }
    combatRoundOver();
}

GooGirl.gooGalAttack = function() {
    var damage = 0;
    if (this.findStatusEffect(StatusEffects.Acid) >= 0)
        outputText("Her body quivering from your flames, the goo-girl ");
    else
        outputText("The goo-girl holds her hands up and they morph into a replica of your " + player.weapon.equipmentName + ". Happily, she swings at you");
    //Determine if dodged!
    if (player.spe - monster.spe > 0 && rand(((player.spe - monster.spe) / 4) + 80) > 80) {
        if (this.findStatusEffect(StatusEffects.Acid) >= 0)
            outputText("tries to slap you, but you dodge her attack.");
        else
            outputText(", missing as you dodge aside.");
        return;
    }
    //Determine if evaded
    if (player.findPerk(PerkLib.Evade) >= 0 && rand(100) < 10) {
        if (this.findStatusEffect(StatusEffects.Acid) >= 0)
            outputText("tries to slap you, but you evade her attack.");
        else
            outputText(", but you evade the clumsy attack.");
        return;
    }
    //Misdirection
    if (player.findPerk(PerkLib.Misdirection) >= 0 && rand(100) < 10 && player.armor.equipmentName == "red, high-society bodysuit") {
        if (this.findStatusEffect(StatusEffects.Acid) >= 0)
            outputText("tries to slap you. You misdirect her, avoiding the hit.");
        else
            outputText(", missing as you misdirect her attentions.");
        return;
    }
    //Determine if cat'ed
    if (player.findPerk(PerkLib.Flexibility) >= 0 && rand(100) < 6) {
        if (this.findStatusEffect(StatusEffects.Acid) >= 0)
            outputText("tries to slap you, but misses due to your cat-like evasion.");
        else
            outputText(", missing due to your cat-like evasion.");
        return;
    }
    //Determine damage - str modified by enemy toughness!
    if (this.findStatusEffect(StatusEffects.Acid) >= 0)
        damage = ((monster.str + monster.weapon.attack) - rand(player.tou) - player.armor.defense);

    if (damage <= 0) {
        damage = 0;
        if (this.findStatusEffect(StatusEffects.Acid) >= 0) {
            if (rand(player.armor.defense + player.tou) < player.armor.defense) outputText("tries to slap you, but the acid-bearing slap spatters weakly off your " + player.armor.equipmentName + ". ");
            else outputText("tries to slap you with an acid-loaded hand, but it splatters off you ineffectually. ");
        }
        else {
            //Due to toughness or amor...
            if (rand(player.armor.defense + player.tou) < player.armor.defense) outputText(", her attack slapping fruitlessly against your " + player.armor.equipmentName + ". ");
            else outputText(", her attack splattering ineffectually against you. ");
        }
    }
    //everyone else
    else {
        if (this.findStatusEffect(StatusEffects.Acid) >= 0) {
            outputText("delivers a painful slap across your cheek.  You gasp when the light stinging becomes a searing burn that seems to get worse as time goes on! ");
            if (player.findStatusEffect(StatusEffects.Acid) < 0) player.createStatusEffect(StatusEffects.Acid, 0, 0, 0, 0);
        }
        else
            outputText(", painfully smacking her gooey limbs against your head. You shake your " + player.hairDescript() + ", clearing your head of the dazing slap. ");
    }
    if (damage > 0) {
        if (monster.lustVuln > 0 && (player.armor.equipmentName == "barely-decent bondage straps" || player.armor.equipmentName == "naked")) {
            if (!monster.plural)
                outputText("<br>" + capitalize(monster.a) + monster.refName + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed. ");
            else
                outputText("<br>" + capitalize(monster.a) + monster.refName + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed. ");
            monster.changeLust(5 * monster.lustVuln);
        }
    }
    if (damage > 0) player.changeHP(-damage, true);
    outputText("<br>", false);
}

//Play –
GooGirl.gooPlay = function() {
    outputText("The goo-girl lunges, wrapping her slimy arms around your waist in a happy hug, hot muck quivering excitedly against you. She looks up, empty eyes confused by your lack of enthusiasm and forms her mouth into a petulant pout before letting go.  You shiver in the cold air, regretting the loss of her embrace. ");
    player.changeLust(3 + rand(3) + player.sens / 10, true);
}

//Throw –
GooGirl.gooThrow = function() {
    outputText("The girl reaches into her torso, pulls a large clump of goo out, and chucks it at you like a child throwing mud. The slime splatters on your chest and creeps " + player.clothedOrNaked("under your " + player.armor.equipmentName, "down your " + player.skinFurScales()) + ", tickling your skin like fingers dancing across your body. ");
    var damage = 1;
    player.changeHP(-damage, true);
    player.changeLust(5 + rand(3) + player.sens / 10, true);
}

//Engulf –
GooGirl.gooEngulph = function() {
    outputText("The goo-girl gleefully throws her entire body at you and, before you can get out of the way, she has engulfed you in her oozing form! Tendrils of " + monster.skinTone + " slime slide up your nostrils and through your lips, filling your lungs with the girl's muck. You begin suffocating!");
    if (player.findStatusEffect(StatusEffects.Bind) < 0) player.createStatusEffect(StatusEffects.Bind, BIND_TYPE_GOO, 0, 0, 0);
    monster.fatigue += 25;
    combatRoundOver();
}

//------------
// SCENES TODO
//------------
GooGirlScene.encounterGooGirl = function() {
    clearOutput();
    displaySprite("googirl");
    outputText("As you walk around the lake, you notice a pale red light pulsing in the " + (gameFlags[FACTORY_SHUTDOWN] == 2 ? "murky" : "sapphire"));
    outputText("waters. You pause, trying to figure out what the shape might be. Just under the surface of the water, there appears to be a fist-sized heart shedding a crimson glow. Leaning closer, you gaze down into your reflection only to find your face rising up with pursed lips, trying to kiss you! You jerk backwards and the pseudo-head quivers, resolving its face into a gooey-looking girl, her ");
    startCombat(new GooGirl());
    outputText(monster.skinTone + " slime body sculpting itself into a humanoid shape. The girl curiously tilts her head to one side, as if trying to figure out why you're backing away, before she happily surges forward!");
    if (gameFlags[CODEX_ENTRY_GOOGIRLS] <= 0) {
        gameFlags[CODEX_ENTRY_GOOGIRLS] = 1;
        outputText("<br><br><b>New codex entry unlocked: Goo Girls!</b>");
    }
    doNext(playerMenu);
}