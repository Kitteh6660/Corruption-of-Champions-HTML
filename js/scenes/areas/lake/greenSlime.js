GreenSlimeScene = [];

function GreenSlime() {
    //Name and references
    this.a = "a ";
    this.name = "green slime";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "it";
    this.himHer = "it";
    this.hisHer = "its";
    this.battleDesc = "The green slime has a normally featureless face that sits on top of wide shoulders that sprout into thick, strong arms. Its torso fades into an indistinct column that melds into the lump of ooze on the ground that serves as a makeshift form of locomotion.";

    //Stats
    this.str = 12;
    this.tou = 13;
    this.spe = 35;
    this.inte = 42;
    this.lib = 45;
    this.sens = 45;
    this.cor = 60;
    //Combat stats
    this.bonusHP = 30;
    this.HP = this.maxHP();
    this.lust = 30;
    this.fatigue = 0;
    //Advancement
    this.level = 2;
    this.gems = 1 + rand(5);
    //Battle variables
    this.weapon.equipmentName = "hands";
    this.weapon.verb = "slap";
    this.armor.equipmentName = "gelatinous skin";
    this.lustVuln = 1;

    //Appearance
    this.tallness = rand(8) + 80;
    this.hipRating = HIP_RATING_AMPLE;
    this.buttRating = BUTT_RATING_LARGE;
    this.lowerBody = LOWER_BODY_TYPE_GOO;
    this.skinTone = "green";
    //Sexual characteristics
    this.createCock(18, 2, CockTypesEnum.HUMAN);
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
GreenSlime.prototype = new Creature();
GreenSlime.prototype.constructor = GreenSlime;

//------------
// COMBAT
//------------
GreenSlime.prototype.doAI = function() {
    switch(rand(4)) {
        case 0:
            GreenSlime.lustAttack();
            break;
        case 1:
            if (this.lust >= 40) {
                GreenSlime.lustReduction();
                break;
            }
        default:
            this.attack();
    }
    combatRoundOver();
}

GreenSlime.lustAttack = function() {
    outputText("The creature surges forward slowly with a swing that you easily manage to avoid.  You notice traces of green liquid spurt from the creature as it does, forming a thin mist that makes your skin tingle with excitement when you inhale it. ");
    player.changeLust(player.lib / 10 + 8, true);
}
GreenSlime.lustReduction = function() {
    outputText("The creature collapses backwards as its cohesion begins to give out, and the faint outline of eyes and a mouth form on its face.  Its chest heaves as if it were gasping, and the bolt upright erection it sports visibly quivers and pulses before relaxing slightly. ");
    GreenSlime.changeLust(-13, true);
}

//------------
// SCENES TODO
//------------
GreenSlimeScene.encounterSlime = function() {
    clearOutput();
    flags[TIMES_MET_OOZE]++;
    displaySprite("greenslime");
    //High int starts on even footing.
    if (player.inte >= 25) {
        outputText("A soft shuffling sound catches your attention and you turn around, spotting an amorphous green mass sliding towards you!  Realizing it's been spotted, the ooze's mass surges upwards into a humanoid form with thick arms and wide shoulders.  The beast surges forward to attack!");
        startCombat(new GreenSlime());
        return;
    }
    //High speed starts on even footing.
    else if (player.spe >= 30) {
        outputText("You feel something moist brush the back of your ankle and instinctively jump forward and roll, coming up to face whatever it is behind you.  The nearly silent, amorphous green slime that was at your feet surges vertically, its upper body taking the form of a humanoid with thick arms and wide shoulders, which attacks!");
        startCombat(new GreenSlime());
        if (flags[FACTORY_SHUTDOWN] == 1) outputText("\n\n<b>You are amazed to encounter a slime creature with the factory shut down - most of them have disappeared.</b>");
        return;
    }
    //High strength gets stunned first round.
    else if (player.str >= 40) {
        outputText("Without warning, you feel something moist and spongy wrap around your ankle, nearly pulling you off balance.  With a ferocious tug, you pull yourself free and turn to face your assailant.  It is a large green ooze that surges upwards to take the form of humanoid with wide shoulders and massive arms.  It shudders for a moment, and its featureless face shifts into a green version of your own! The sight gives you pause for a moment, and the creature strikes!");
        if (flags[FACTORY_SHUTDOWN] == 1) outputText("\n\n<b>You are amazed to encounter a slime creature with the factory shut down - most of them have disappeared.</b>");
        startCombat(new GreenSlime());
        outputText("\n\n");
        monster.attack();
        return;
    }
    else {
        outputText("Without warning, you feel something moist and spongy wrap around your ankle, pulling you off balance!  You turn and try to pull your leg away, struggling against a large green ooze for a moment before your foot comes away with a *schlorp* and a thin coating of green fluid.  The rest of the ooze rises to tower over you, forming a massive green humanoid torso with hugely muscled arms and wide shoulders.  Adrenaline rushes into your body as you prepare for combat, and you feel your heart skip a beat as your libido begins to kick up as well!");
        player.modStats("lib", 1);
        player.changeLust(10, true);
        startCombat(new GreenSlime());
    }
    //Player's stats suck and you should feel bad.
    if (flags[FACTORY_SHUTDOWN] == 1) outputText("\n\n<b>You are amazed to encounter a slime creature with the factory shut down - most of them have disappeared.</b>");

}