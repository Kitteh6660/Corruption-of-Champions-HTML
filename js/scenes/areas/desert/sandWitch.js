SandWitchScene = [];

addToGameFlags(SAND_WITCH_RAPED);

function SandWitch() {
    //Name and references
    this.a = "the ";
    this.name = "sand witch";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "she";
    this.himHer = "her";
    this.hisHer = "her";
    this.battleDesc = "A sand witch appears to be totally human, an oddity in this strange land. She has dirty blonde hair and a very tanned complexion, choosing to cover most of her body with robes of the same color as the desert sands, making her impossible to spot from afar.";

    //Stats
    this.str = 25;
    this.tou = 25;
    this.spe = 35;
    this.inte = 45;
    this.lib = 55;
    this.sens = 40;
    this.cor = 30;
    //Combat stats
    this.HP = this.maxHP();
    this.bonusHP = 20;
    this.lust = 20 + rand(40);
    this.fatigue = 0;
    //Advancement
    this.level = 3;
    this.gems = 5 + rand(15);
    //Battle variables
    this.weapon.equipmentName = "feet";
    this.weapon.verb = "kick";
    this.armor.equipmentName = "robes";
    this.lustVuln = 1;

    //Appearance
    this.tallness = rand(12) + 55;
    this.hipRating = HIP_RATING_CURVY;
    this.buttRating = BUTT_RATING_LARGE;
    this.skinTone = "bronzed";
    this.hairColor = "sandy-blonde";
    this.hairLength = 15;
    //Sexual characteristics
    this.createVagina(false, VAGINA_WETNESS_WET, VAGINA_LOOSENESS_LOOSE);
    this.createBreastRow(Appearance.breastCupInverse("DD"));
    this.createBreastRow(Appearance.breastCupInverse("DD"));
    this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
    this.ass.analWetness = ANAL_WETNESS_NORMAL;

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    //this.addDrop(Items.Consumables.WhiteBook, 10);
    //this.addDrop(Items.Consumables.WhiteBook, 10);
    //this.addDrop(Items.Consumables.LaBova, 15);
    //this.addDrop(Items.Consumables.TatteredScroll, 15);
    //this.addDrop(Items.Consumables.Lactaid, 15);
    //this.addDrop(Items.Weapons.WizardStaff, 5);

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = cleanupAfterCombat;
}
SandWitch.prototype = new Creature();
SandWitch.constructor = SandWitch;

//------------
// COMBAT
//------------
SandWitch.prototype.doAI = function() {
    switch(rand(4)) {
        case 0:
            SandWitch.lustAttack();
            break;
        default:
            this.attack();
    }
    combatRoundOver();
}

SandWitch.lustAttack = function() {
    outputText("The sand witch points at you, drawing a circle in the air and mouthing strange words.<br><br>");
    if (player.findStatusEffect(StatusEffects.StoneLust) >= 0) {
        outputText("The orb inside you grows warm, almost hot, suffusing your body with heat and arousal. ");
        player.changeLust(8 + (player.sens) / 10, true);
    }
    else {
        outputText("You feel the sands shift by your " + player.feet() + ", and look down to see something slip out of the sands and " + player.clothedOrNakedLower("into your clothes!", "onto your " + player.legs()) + " It feels incredibly smooth and circular as it glides upward along your " + player.leg() + ", its progress unaffected by your frantic effort to dislodge it. ");
        if (player.hasVagina() > 0) {
            outputText("It glides up your thighs to the entrance of your sex, and its intentions dawn on you!<br><br>");
            outputText("Too late! You reach to stop it, but it pushes against your lips and slips inside your " + player.vaginaDescript(0) + " in an instant. You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size. ");
        }
        else {
            outputText("It glides up your thighs, curving around your buttocks, and its intentions dawn on you.<br><br>");
            outputText("You desperately grab for it, but are too late!  It pushes firmly against your rectum and slips inside instantaneously. You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size. ");
        }
        player.createStatusEffect(StatusEffects.StoneLust, 0, 0, 0, 0);
        player.changeLust(4 + (player.sens / 10), true);
    }
}

//------------
// SCENES
//------------
SandWitchScene.encounter = function() {
    displaySprite("sandwitch");
    clearOutput();
    outputText("A strange woman seems to appear from the dunes themselves.  She identifies herself as a sand witch, and politely asks if she can cast a spell on you.");
    if (gameFlags[CODEX_ENTRY_SANDWITCHES] <= 0) {
        gameFlags[CODEX_ENTRY_SANDWITCHES] = 1;
        outputText("\n\n<b>New codex entry unlocked: Sand Witches!</b><br><br>");
    }
    /*if (player.statusEffectValue(StatusEffects.Exgartuan, 1) == 1 && player.cockArea(0) > 100 && player.statusAffectv2(StatusAffects.Exgartuan) == 0) {
        outputText("\n\nThe " + player.armorName + " covering your lower half hits the ground, as if yanked down by magic.  Your " + cockDescript(0) + " pulsates darkly, growing rigid in seconds as the demon within you takes over.  It barks, \"<i>Fuck, how about I cast my spell on you baby?</i>\"\n\n");
        outputText("The sandwitch ");
        if (player.cor < 50)
            outputText("and you both turn crimson", false);
        else outputText("turns crimson", false);
        outputText(" as you yank your " + player.armorName + " back into place.  You're in charge here, not some possessed appendage!   Exgartuan yells something snide, but it's muffled too much to understand.  You look up in time to sidestep an attack from the Sand Witch.  It looks like you'll have to fight her!");
        startCombat(new SandWitch());
    }*/
    /*else*/ doYesNo(SandWitchScene.allowSandWitchMagic, SandWitchScene.refuseSandWitchMagic);
}

SandWitchScene.allowSandWitchMagic = function() {
    clearOutput();
    if (player.hairColor == "sandy blonde") {
        outputText("She smiles wickedly and intones, \"<i>Tresed eht retaw llahs klim ruoy.</i>\"<br><br>");
        if (player.breastRows.length == 0 || player.biggestTitSize() == 0) {
            outputText("You grow a perfectly rounded pair of C-cup breasts! ");
            if (player.breastRows.length == 0) player.createBreastRow();
            player.breastRows[0].breasts = 2;
            player.breastRows[0].breastRating = 3;
            if (player.breastRows[0].nipplesPerBreast < 1) player.breastRows[0].nipplesPerBreast = 1;
            player.modStats("sen", 2, "lus", 1);
        }
        if (player.biggestTitSize() >= 1 && player.biggestTitSize() <= 2) {
            outputText("Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup. ");
            player.breastRows[0].breastRating = 3;
            player.modStats("sen", 1, "lus", 1);
        }
        if (player.breastRows[0].nipplesPerBreast < 1) {
            outputText("Two dark spots appear on your chest, rapidly forming into sensitive nipples. ");
            player.breastRows[0].nipplesPerBreast = 1;
            player.modStats("sen", 2, "lus", 1);
        }
        if (player.biggestLactation() > 0) {
            outputText("A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ");
            if (player.biggestLactation() < 2)
                outputText("powerful jets of milk spray from your nipples, spraying thick streams over the desert sands.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ");
            if (player.biggestLactation() >= 2 && player.biggestLactation() <= 2.6)
                outputText("eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ");
            if (player.biggestLactation() > 2.6 && player.biggestLactation() < 3)
                outputText("thick hoses of milk erupt from  your aching nipples, forming puddles in the sand.  You smile at how well you're feeding the desert, your milk coating the sand faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, totally outside of your control.  In time you realize the milk has stopped, and even had time to soak into the sands.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ");
            if (player.biggestLactation() >= 3)
                outputText("you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down the dune in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the desert of all your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ");
            if (player.biggestLactation() < 3) {
                player.boostLactation(.75);
                outputText("Your breasts feel fuller... riper... like your next milking could be even bigger.  ");
            }
            player.modStats("lib", 1, "sen", 4, "lus", 15);
        }
        if (player.biggestLactation() == 0) {
            outputText("A pleasurable release suddenly erupts from your nipples!  Streams of milk are spraying from your breasts, soaking into the sand immediately.  It stops all too soon, though the witch assures you that you can lactate quite often now.  ");
            player.boostLactation(1);
            player.modStats("lib", .5, "sen", 1, "lus", 10);
        }
        outputText("The sand-witch smiles and thanks you for your offering.  You notice her dress is damp in four spots on the front.  ");
        if (gameFlags[SAND_WITCH_RAPED] == 0)
            outputText("You wonder at what her robes conceal as she vanishes into the dunes.");
        if (gameFlags[SAND_WITCH_RAPED] > 0) {
            if (player.cor <= 33)
                outputText("You are glad to avoid servicing her again as she vanishes into the dunes.");
            else if (player.cor <= 66)
                outputText("You wonder if you should've resisted and tried for some sex as she departs.");
            else
                outputText("You wish you had said no, so you could fuck with her and her magnificent quartet of breasts some more.");
        }
    }
    else {
        outputText("She smiles wickedly and intones, \"<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>\"\n\nYou feel a tingling in your scalp, and realize your hair has become a sandy blonde!");
        player.hairColor = "sandy blonde";
    }
    doNext(Camp.returnToCampUseOneHour);
}

SandWitchScene.refuseSandWitchMagic = function() {
    clearOutput();
    outputText("With an inarticulate scream of rage, the Sand Witch attacks!");
    startCombat(new SandWitch());
}