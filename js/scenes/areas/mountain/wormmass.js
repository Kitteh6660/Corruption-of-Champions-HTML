/**
 * Ported by matraia on 10/7/16.
 */

var WormsScene = [];
addToGameFlags(WORM_INFEST_ATTEMPTED);

function WormMass() {
    //Name and references
    this.a = "the ";
    this.name = "worms";
    this.refName = this.name;
    this.isAre = "are";
    this.heShe = "they";
    this.himHer = "them";
    this.hisHer = "their";
    this.plural = true;
    this.battleDesc = "Before you stands the horrid mass of worms. It has shifted itself and now takes the shape of a humanoid composed completely of the worms in the colony. Its vaguely human shape lumbers towards you in a clearly aggressive manner.";
    //Core stats
    this.str = 35;
    this.tou = 5;
    this.spe = 10;
    this.inte = 1;
    this.lib = 90;
    this.sens = 60;
    this.cor = 90;
    //Combat stats
    this.HP = 40; // Special maxHP function
    this.lust = 30;
    this.fatigue = 0;
    //Advancement
    this.level = 3;
    this.XP = 0;
    this.gems = 0;
    //Battle variables
    this.weapon = Items.NOTHING;
    this.weapon.equipmentName = "worm";
    this.weapon.verb = "slap";
    this.armor.equipmentName = "skin";
    this.bonusHP = 0;
    this.additionalXP = 0;
    this.lustVuln = 0;
    //this.temperment = TEMPERMENT_LOVE_GRAPPLES; TODO Add Temperment System

    this.drops = []; // No drops
    this.dropThresholds = [];

    //Appearance
    this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
    this.tallness = 36; //Height in inches
    this.skinTone = "white";
    this.skinType = 0;
    this.skinAdj = "";
    this.skinDesc = "skin";
    this.hairType = 0;
    this.hairColor = "";
    this.hairLength = 0;
    this.beardStyle = 0;
    this.beardLength = 0;
    this.furColor = "";

    //Head
    this.earType = 0;
    this.eyeType = 0;
    this.faceType = 0;
    this.tongueType = 0;


    this.femininity = 50;
    this.tone = 0;
    this.thickness = 0;
    this.hipRating = HIP_RATING_SLENDER;
    this.buttRating = BUTT_RATING_BUTTLESS;

    //Sexual Characteristics
    //Cocks

    //Ass
    this.ass = new Ass();
    this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
    this.ass.analWetness = ANAL_WETNESS_DRY;
    //Breasts
    this.createBreastRow(0,0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = WormsScene.lose;
};
WormMass.prototype = new Creature();
WormMass.prototype.constructor = WormMass;

WormMass.prototype.doAI = function() {
    switch (rand(2)) {
        case 0:
            WormMass.wormAttack(); // Special worm attack
            break;
        case 1:
            WormMass.wormEntice();
            break;
        default:
            WormMass.wormAttack(); // Shouldn't reach here, but leaving it in as a failsafe.
    }
    combatRoundOver();
};

WormMass.prototype.maxHP = function() {
    return 40 + (player.newGamePlusMod() * 20);
}

//Worms Attack
WormMass.wormAttack = function() {
    //Dodged!
    if (player.spe - monster.spe > 0 && (Math.random() * (((player.spe - monster.spe) / 4) + 80)) > 80) {
        outputText("The worm colony flails at you with its simulated arms, but its lack of coordination allows you to easily dodge its attack.<br>", false);
        return;
    }
//Evade
    if (player.findPerk(PerkLib.Evade) >= 0 && rand(100) < 10) {
        outputText("Using your skills at evading attacks, you anticipate and sidestep " + this.a + this.name + "' attacks.<br>", false);
        return;
    }
    var temp = ((monster.str + monster.weapon.attack) - Math.random() * (player.tou + player.armor.defense));
    if (temp <= 0) temp = 1;
    temp = Math.round(temp);
    if (temp > 0) player.changeHP(-temp, true); 
    outputText("The worm colony strikes at you with its makeshift limbs. It strikes you for ", false);
    outputText(String(temp), false);
    outputText(" damage and the limb splatters, dispersing the worms comprising the false arm.", false);
    outputText("<br>", false);
    return;
};

//Worms Entice
WormMass.wormEntice = function () {
    //FAIL
    if (rand(2) == 0) {
        if (player.lust < 50) outputText("The worm colony stands before you and begins secreting a significant amount of slime. You are perplexed as to why the worms have done this. You shrug your shoulders and remain on guard.<br>", false);
        else outputText("The worm colony shambles over to you and attempts to grapple you. Quickly sidestepping the clumsy movements of the creature, you avoid what could have been a horrible fate as the mass falls over and splatters in its failed attempt to engulf you.<br>", false);
        return;
    }
    //SUCCESS
    if (player.lust < 50) {
        outputText("The worm colony stands before you and begins secreting a significant amount of slime. Inexplicably, you find that your " + player.cockDescript(0) + " is already erect and is throbbing. The erection is quite meddlesome and you find yourself distracted by the unwanted arousal.<br>", false);
        player.changeLust((10+player.lib/20) + (player.cor/20));
    }
    else {
        outputText("The worm colony shambles over to you and attempts to grapple you. Attempting to dodge, you fail to get away fast enough and fall to the ground engulfed by the mass. You are completely covered in the slimy worms!!! Incapable of avoiding any of their movements, you feel their slime coat every inch of your body and you feel the struggle and strain of each individual worm as they crawl all over you. You immediately begin flailing wildly as you cannot even breathe!", false);
        //Chance of insta-loss if infested twice
        if (gameFlags[WORM_INFEST_ATTEMPTED] >= 1) {
            outputText("  Struggle as you might, the creatures overwhelm your body and prevent you from any conceivable opportunity to get them off you, Your head quickly becomes visible, allowing you to breathe as you stare helplessly at the cocoon of worms trapping you.<br><br>", false);
            WormsScene.infest1();
            return;
        }
        //Escaped!
        else {
            outputText("<br><br>You struggle wildly as you fight the worm colony for both air and to get the things off you. The sticky slime secreted by the individual worms greatly increases your task. After freeing one of your arms, you uncover your face, allowing you to breathe, and begin sweeping the beasts from your body. Stunned by your renewed vigor, the mass loses its cohesion, allowing your to quickly clear the worms from your body. The disbanded colony retreats a distance from you and begins reforming itself as you purge your body of the annelids.", false);
            gameFlags[WORM_INFEST_ATTEMPTED]++;
        }
    }
};

WormsScene.lose = function() {
    outputText("<br>Overcome by your "+((player.HP <= 0) ? "wounds":"lust") +", you sink to your knees as the colony of worms swarms all over your body...<br><br>", true);
    WormsScene.infest1();
};

WormsScene.infest1 = function() {
    outputText("You've reached the Worm Infestation Scene. To be added.");

};