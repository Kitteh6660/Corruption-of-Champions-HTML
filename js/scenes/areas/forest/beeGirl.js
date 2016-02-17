BeeGirlScene = [];

function BeeGirl() {
    //Name and references
    this.a = "a ";
    this.name = "bee-girl";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "she";
    this.himHer = "her";
    this.hisHer = "her";
    this.battleDesc = "A bee-girl buzzes around you, filling the air with intoxicatingly sweet scents and a buzz that gets inside your head. She has a humanoid face with small antennae, black chitin on her arms and legs that looks like shiny gloves and boots, sizable breasts, and a swollen abdomen tipped with a gleaming stinger.";

    //Stats
    this.str = 30;
    this.tou = 30;
    this.spe = 30;
    this.inte = 20;
    this.lib = 60;
    this.sens = 55;
    this.cor = 0;
    //Combat stats
    this.HP = this.maxHP();
    this.lust = 20 + rand(40);
    this.fatigue = 0;
    //Advancement
    this.level = 4;
    this.gems = 1 + rand(15);
    //Battle variables
    this.weapon.equipmentName = "chitin-plated fist";
    this.weapon.verb = "armored punch";
    this.armor.equipmentName = "chitin";
    this.lustVuln = 0.9;

    //Appearance
    this.tallness = rand(14) + 59;
    this.hipRating = HIP_RATING_CURVY + 3;
    this.buttRating = BUTT_RATING_EXPANSIVE;
    this.lowerBody = LOWER_BODY_TYPE_BEE;
    this.skinTone = "yellow";
    this.hairColor = randomChoice("black","black and yellow");
    //Sexual characteristics
    this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_GAPING);
    this.createBreastRow(Appearance.breastCupInverse("DD"));
    this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
    this.ass.analWetness = ANAL_WETNESS_NORMAL;

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    //this.addDrop(Items.Consumables.WhiteBook, 5);
    this.addDrop(Items.Consumables.BeeHoney, 50);
    this.addDrop(Items.Consumables.BeeChitin, 30);

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = cleanupAfterCombat;
}
BeeGirl.prototype = new Creature();
BeeGirl.constructor = BeeGirl;

//------------
// COMBAT
//------------
BeeGirl.prototype.doAI = function() {
    switch(rand(4)) {
        case 0:
            BeeGirl.stingAttack();
            break;
        default:
            this.attack();
    }
    combatRoundOver();
}

BeeGirl.stingAttack = function() {
    if (monster.findStatusEffect(StatusEffects.Blind) >= 0) {
        outputText(capitalize(monster.a) + monster.refName + " completely misses you with a blind sting!!");
        combatRoundOver();
        return;
    }
    //Determine if dodged!
    if (player.spe - monster.spe > 0 && rand(((player.spe - monster.spe) / 4) + 80) > 80) {
        if (player.spe - monster.spe < 8) outputText("You narrowly avoid " + monster.a + monster.refName + "'s stinger!");
        if (player.spe - monster.spe >= 8 && player.spe - monster.spe < 20) outputText("You dodge " + monster.a + monster.refName + "'s stinger with superior quickness!");
        if (player.spe - monster.spe >= 20) outputText("You deftly avoid " + monster.a + monster.refName + "'s slow attempts to sting you.");
        combatRoundOver();
        return;
    }
    //determine if avoided with armor.
    if (player.armor.defense >= 10 && rand(4) > 0) {
        outputText("Despite her best efforts, " + monster.a + monster.refName + "'s sting attack can't penetrate your armor.");
        combatRoundOver();
        return;
    }
    //Sting successful!  Paralize or lust?
    //Lust 50% of the time
    if (rand(2) == 0) {
        outputText("Searing pain lances through you as " + monster.a + monster.refName + " manages to sting you! You stagger back a step and nearly trip, flushing hotly. ");
        outputText("Oh no! You've been injected with some kind of aphrodisiac. You've got to keep focused, you can't think about... fucking... ");
        if (player.gender == 1) outputText("or dripping honey-slicked cunts beckoning you. ");
        if (player.gender == 2) outputText("planting your aching sex over her face while you lick her sweet honeypot. ");
        if (player.gender == 3) outputText("or cocks, tits, and puffy nipples. ");
        player.changeLust(25, true, false);
        if (player.lust > 60) {
            outputText(" You shake your head and struggle to stay focused,");
            if (player.gender == 1 || player.gender == 3) outputText(" but it's difficult with the sensitive bulge in your groin.");
            if (player.gender == 2) outputText(" but can't ignore the soaking wetness in your groin.");
            if (player.sens > 50) outputText(" The sensitive nubs of your nipples rub tightly under your " + player.armor.equipmentName + ".");
        }
        else outputText(" You shake your head and clear the thoughts from your head, focusing on the task at hand.");
        if (player.findStatusEffect(StatusEffects.Venom) < 0) player.createStatusEffect(StatusEffects.Venom, VENOM_TYPE_BEE, 0, 1, 0);
    }
    //Paralise the other 50%!
    else {
        outputText("Searing pain lances through you as " + monster.a + monster.refName + " manages to sting you! You stagger back a step and nearly trip, finding it hard to move yourself.");
        var paralyzeIndex = player.findStatusEffect(StatusEffects.Venom);
        if (paralyzeIndex >= 0) {
            player.addStatusValue(StatusEffects.Venom, 2, 2.9); //Loss to strength
            player.addStatusValue(StatusEffects.Venom, 3, 2.9); //Loss to speed
            player.modStats("str", -3, "spe", -3);
            outputText(" It's getting much harder to move, you're not sure how many more stings like that you can take!");
        }
        else {
            player.createStatusEffect(StatusEffects.Venom, VENOM_TYPE_BEE, 2, 2, 0);
            player.modStats("str", -2, "spe", -2);
            outputText(" You've fallen prey to paralyzation venom! Better end this quick!");
        }
    }
}

//------------
// SCENES
//------------
BeeGirlScene.beeEncounter = function() {
    clearOutput();
    displaySprite("beegirl");
    //Intro text...
    outputText("As you approach the edge of the forest, a sweet scent wafts into your nose. Tantalizing, teasing, alluring. As you sniff the air, you find yourself following it, as if an invisible hand is pulling you toward its origin. Little do you know, that is essentially what's happening. The further and further you go, the more heavy the scent grows, as well as a sound. A sound of a buzz, but not in a maddening tone, as if someone is humming. It's a lovely tune, one that would stick in the back of the mind, but not in a bad way.");
    //Bee appears!
    if (gameFlags[CODEX_ENTRY_GIANTBEES] <= 0) {
        gameFlags[CODEX_ENTRY_GIANTBEES] = 1;
        outputText("<br><br><b>New codex entry unlocked: Giant Bees!</b>")
    }
    //Chance to avoid the bee or not if smart enough...
    if (player.hasKeyItem("Traveler's Guide") >= 0 && player.inte / 2 > rand(40)) {
        outputText("<br><br>You suddenly remember a passage from the Traveler's Guide about monstrous bees that lay eggs in unmentionable places. Of course, a brave champion would face any danger.<br><br><b>Do you proceed?</b>");
        //Yes goes to beeEncounterLevel2(), no goes to camp
        doYesNo(BeeGirlScene.beeEncounterSelect, Camp.returnToCampUseOneHour);
    }
    //If not smart enough, proceed.
    else BeeGirlScene.beeEncounterSelect(false);
}
BeeGirlScene.beeEncounterSelect = function(clearScreen) {
    if (clearScreen) clearOutput();
    outputText("That's when she comes into view. A great woman, yellow and black, a Bee-like handmaiden would be the best comparison. She sits atop a great flower while humming her tune, happily picking the petals off of another flower. Her body is thin, save her abdomen. Her head is more humanoid than bee, with black eyes, antennae, and luscious black lips that glimmer wetly");
    /*if (player.statusAffectv1(StatusAffects.Exgartuan) == 1 && player.cockArea(0) > 100 && player.statusAffectv2(StatusAffects.Exgartuan) == 0) { //Exgartuan messes with things!
        beeEncounterWithExgartuan();
        return;
    }
    if (player.findStatusAffect(StatusAffects.Infested) >= 0 || player.findStatusAffect(StatusAffects.WormPlugged) >= 0) { //Worms now mess with things too!
        beeEncounterWithWorms();
        return;
    }
    var isBeeMorph:Boolean = player.race() == "bee-morph";
    if (player.hasCock() && (player.cockArea(0) >= 50 || player.cocks[0].cockType == CockTypesEnum.BEE || isBeeMorph)) {
        outputText(" in the light.\n\n");
        beeEncounterAsBeeMorphMaleOrGiantCock(isBeeMorph);
    }
    else if (isBeeMorph) {
        outputText(" in the light.\n\n");
        beeEncounterAsBeeMorphFemale();
    }
    else if (flags[kFLAGS.BEE_GIRL_COMBAT_LOSSES] + flags[kFLAGS.BEE_GIRL_COMBAT_WINS_WITH_RAPE] + flags[kFLAGS.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE] >= 5) {
        if (flags[kFLAGS.BEE_GIRL_COMBAT_LOSSES] > flags[kFLAGS.BEE_GIRL_COMBAT_WINS_WITH_RAPE] + flags[kFLAGS.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE])
            beeEncounterSheBeatsYouRegularly();
        else if (flags[kFLAGS.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE] >= flags[kFLAGS.BEE_GIRL_COMBAT_WINS_WITH_RAPE])
            beeEncounterSheFearsYou();
        else beeEncounterSheDesiresYou();
    }
    else {
        switch (attitude) {
            case BEE_GIRL_PLAYER_AFRAID:
                beeEncounterAfraid();
                break;
            case BEE_GIRL_PLAYER_VOLUNTARY_EGGING:
                beeEncounterAfraidRepeat();
                break;
            case BEE_GIRL_PLAYER_DISGUSTED:
                beeEncounterDisgusted();
                break;
            case BEE_GIRL_PLAYER_DUTY:
                beeEncounterDuty();
                break;
            default: //Any other attitude options lead to the classic bee encounter*/
                outputText(", bending into a smile as she sees you approach. Standing, she welcomes you in, her wings giving a small buzz as her arms spread open for a welcoming embrace.<br><br>");
                //Chance to avoid raaaaeeeeep
                //if ((player.lib + player.cor < 140) || rand(2) == 0) {
                    outputText("You barely stop yourself from gleefully throwing yourself into her arms. You realize the harmonic buzzing of her wings and the unearthly scent of her honey briefly robbed you of your reason. Feeling momentarily more clear-headed, what do you do?");
                    menu();
                    addButton(0, "Fight", BeeGirlScene.fightTheBeeGirl, null, null, null, "Fight the bee-girl.");
                    //addButton(1, "Talk", BeeGirlScene.beeTalk, null, null, null, "Try to talk to the bee-girl.");
                    //addButton(2, "Seduce", null, null, null, null, "Why is this never even finished? WHYYYYYYYYYY?");
                    addButton(4, "Leave", Camp.returnToCampUseOneHour);
                //}
    //            else beeEncounterClassic(false);
    //    }
    //}
}

BeeGirlScene.fightTheBeeGirl = function() {
    clearOutput();
    outputText("You clear your head and resolve to defeat the monstrous bee-woman.");
    startCombat(new BeeGirl());
}