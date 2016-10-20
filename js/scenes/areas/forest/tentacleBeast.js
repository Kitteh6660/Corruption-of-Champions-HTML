/**
 * Created by Sylvain on 4/2/2016.
 */

// Merging TentacleBeast.as and TentacleBeastScene.as

    // Including note from TentacleBeastScene.as

/*
 LICENSE

 This license grants Fenoxo, creator of this game usage of the works of
 Dxasmodeus in this product. Dxasmodeus grants Fenoxo and the coders assigned by him
 to this project permission to alter the text to conform with current and new game
 private functions, only. Dxasmodeus grants exclusive rights to Fenoxo to add upon events to meet with
 suggestions made by consumers as to new content. Dxasmodeus retains exclusive rights to alter
 or change the core contents of the events and no other developer may alter, change or use the events without
 permission from dxasmodeus except where otherwise specified in this license. Fenoxo agrees to
 include Dxasmodeus' name in the credits with indications to the specific contribution made to the licensor.
 This license must appear either at the beginning or the end of the primary file in the source code and cannot be deleted
 by a third party. This license is also retroactive to include all versions of the game code
 including events created by dxasmodeus.

 DECLARATION OF OWNERSHIP

 The following events are the creative works of dxasmodeus and are covered under this license.

 Tentacle Plant Event
 Giacomo the Travelling Merchant
 All item events relating to purchases from Giacomo the Travelling Merchant
 Worm Colony Infestation Events

 Tentacle Plant Event and Giacomo sub-events are copyright 2010 by Dxasmodeus.
 Worm Colony Events are copyright 2011 by dxasmodeus.

 THIRD PARTY USAGE

 As Fenoxo has made his game code open source, this license DOES NOT transfer to a
 third party developer. The events created by Dxasmodeus may not be used in whole or in part
 without permission and license from Dxasmodeus. Dxasmodeus reserves the sole and exclusive right to
 grant third party licenses of copyrighted scenarios.

 For further information and license requests, dxasmodeus may be contacted through private
 message at the Futanari Palace. http://www.futanaripalace.com/forum.php.

 ENFORCEMENT

 This license supercedes all previous licenses and remains in force.
 */


var TentacleBeastScene = [];

addToGameFlags(TENTACLE_COOL_DOWN, TENTACLE_BIND, TENTACLE_BAD_END, TENTACLE_GENDERLESS_CENTAUR);

//Monster definition
//Name and references
function TentacleBeast() {
    this.a = "the ";
    this.name = "tentacle beast";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "it";
    this.himHer = "its";
    this.hisHer = "it";
    this.plural = false;
    this.battleDesc = "You see the massive, shambling form of the tentacle beast before you.  Appearing as a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs.";
//Core stats
    this.str = 58;
    this.tou = 25;
    this.spe = 35;
    this.inte = 45;
    this.lib = 90;
    this.sens = 20;
    this.cor = 100;
//Combat stats
    this.HP = this.maxHP();
    this.lust = 10;
    this.fatigue = 0;
//Advancement
    this.level = 6;
    this.XP = 0;
    this.gems = rand(15) + 5;
//Battle variables
    this.weapon = Items.NOTHING;
    this.weapon.equipmentName = "whip-tendril";
    this.weapon.verb = "thorny tendril";
    this.weapon.attack = 1;
    this.shield = Items.NOTHING;
    this.armor = Items.NOTHING;
    this.armor.equipmentName = "rubbery skin";
    this.armor.defense = 1;
    this.upperGarment = Items.NOTHING;
    this.lowerGarment = Items.NOTHING;
    this.accessory1 = Items.NOTHING;
    this.accessory2 = Items.NOTHING;
    this.bonusHP = 250;
    this.additionalXP = 0;
    this.lustVuln = 0.8;
    //this.temperment = LOVE GRAPPLES TODO Temperment System

    this.drops = [];
    this.dropThresholds = [];

//Appearance
    this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
    this.tallness = rand(9) + 70; //Height in inches
    this.skinTone = "green";
    this.skinType = SKIN_TYPE_PLAIN;
    this.skinAdj = "";
    this.skinDesc = "bark";
    this.hairType = 0;
    this.hairColor = "green";
    this.hairLength = 1;
    this.beardStyle = 0;
    this.beardLength = 0;
    this.furColor = "";

//Head
    this.earType = 0;
    this.eyeType = 0;
    this.faceType = 0;
    this.tongueType = 0;
//Body (This code section may be removed)
    this.lowerBody = 0;
    this.legCount = 2;
    this.armType = 0;
//Extra parts (This code section may be removed)
    this.antennae = 0;
    this.hornType = 0;
    this.horns = 0;
    this.gills = false;
    this.tailType = TAIL_TYPE_DEMONIC;
    this.tailVenom = 0;
    this.tailRecharge = 0;
    this.wingType = 0;

    this.femininity = 50;
    this.tone = 0;
    this.thickness = 0;
    this.hipRating = HIP_RATING_BOYISH;
    this.buttRating = BUTT_RATING_BUTTLESS;

//Sexual Characteristics
//Cocks
    this.createCock(40, 1.5);
    this.createCock(60, 1.5);
    this.createCock(50, 1.5);
    this.createCock(20, 1.5);
    this.balls = 0;
    this.ballSize = 0;
    this.cumMultiplier = 3;
//Vaginas
    this.createVagina(false, VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL);
//Ass
    this.ass = new Ass();
    this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
    this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
//Breasts
    this.createBreastRow(0, 0);

//Drops
    this.clearDrops(); //Need to be called before populating the item arrays.

//Victory/defeat
    this.victory = TentacleBeastScene.tentacleBeastWin;
    this.defeat = TentacleBeastScene.tentacleBeastLoss;
}
TentacleBeast.prototype = new Creature();
TentacleBeast.constructor = TentacleBeast;


//Tentacle Beast AI

TentacleBeast.prototype.doAI = function() {
    if (rand(2) == 0 || gameFlags[TENTACLE_COOL_DOWN] == 1)
        TentacleBeast.tentaclePhysicalAttack();
    else
        TentacleBeast.tentacleEntwine();
    combatRoundOver();
};


// Tentacle Beast Attacks

TentacleBeast.tentaclePhysicalAttack = function() {
    outputText("The shambling horror throws its tentacles at you with a murderous force.<br>", false);
    var temp = ((monster.str + monster.weapon.attack) - Math.random() * (player.tou) - player.armor.defense);
    if (temp < 0) temp = 0;
//Miss
    if (temp == 0 || (player.spe - monster.spe > 0 && (Math.random() * (((player.spe - monster.spe) / 4) + 80)) > 80)) {
        outputText("However, you quickly evade the clumsy efforts of the abomination to strike you.", false);
    }
//Hit
    else {
        outputText("The tentacles crash upon your body mercilessly. ", false);
        player.changeHP(-temp, true);
    }

};

TentacleBeast.tentacleEntwine = function() {
    outputText("The beast lunges its tentacles at you from all directions in an attempt to immobilize you.<br>", false);
//Not Trapped yet
    if (gameFlags[TENTACLE_BIND] == 0) {
        //Success
        if ((Math.random() * (((player.spe) / 2))) > 15 || (player.findPerk(PerkLib.Evade) >= 0 && (Math.random() * (((player.spe) / 2))) > 15)) {
            outputText("In an impressive display of gymnastics, you dodge, duck, dip, dive, and roll away from the shower of grab-happy arms trying to hold you. Your instincts tell you that this was a GOOD thing.<br>", false);
        }
        //Fail
        else {
            outputText("While you attempt to avoid the onslaught of pseudopods, one catches you around your " + player.foot() + " and drags you to the ground. You attempt to reach for it to pull it off only to have all of the other tentacles grab you in various places and immobilize you in the air. You are trapped and helpless!!!<br><br>", false);
            //Male/Herm Version:
            if (player.hasCock()) outputText("The creature, having immobilized you, coils a long tendril about your penis. You shudder as the creature begins stroking your cock like a maid at a dairy farm in an attempt to provoke a response from you. Unable to resist, your " + player.cockDescript(0) + " easily becomes erect, signaling to the creature that you are responsive to harsher stimulation.<br>", false);
            //Female Version:
            else if (player.hasVagina()) outputText("The creature quickly positions a long tentacle with a single sucker over your clitoris. You feel the power of the suction on you, and your body quickly heats up.  Your clit engorges, prompting the beast to latch the sucker onto your " + player.clitDescript() + ".<br>", false);
            //Genderless
            else outputText("The creature quickly positions a long tentacle against your " + player.assholeDescript() + ". It circles your pucker with slow, delicate strokes that bring unexpected warmth to your body.<br>", false);
            player.changeLust(8 + player.sens / 20);
            gameFlags[TENTACLE_BIND] = 1;

        }
    }

};

//Tentacle Beast Win/Loss Scenes

// Win against the beast
TentacleBeastScene.tentacleBeastWin = function() {
    if (monster.HP <= 0) {
        outputText("The creature lets out an ear-piercing screech as it collapses upon itself. Its green coloring quickly fades to brown as the life drains from it, leaving you victorious.", true);
        //TODO Achievements game.awardAchievement("Tentacle Beast Slayer", kACHIEVEMENTS.GENERAL_TENTACLE_BEAST_SLAYER);
    } else {
        outputText("The tentacle beast's mass begins quivering and sighing, the tentacles wrapping around each other and feverishly caressing each other.  It seems the beast has given up on fighting.", false);
    }
// TODO Phylla Scene
    /*
     if (findStatusEffect(StatusEffects.PhyllaFight) >= 0) {
     removeStatusEffect(StatusEffects.PhyllaFight);
     game.desert.antsScene.phyllaTentacleDefeat();
     }
     else { */
    if (monster.lust >= 100 && player.gender > 0) {
        outputText("  Perhaps you could use it to sate yourself?", true);
        doYesNo(TentacleBeastScene.tentacleVictoryRape, cleanupAfterCombat);
    } else {
        cleanupAfterCombat();
    }
};

// Rape the beast
TentacleBeastScene.tentacleVictoryRape = function() {
    clearOutput();
    //TODO Sprite spriteSelect(100);
    //Male/Herm
    if (player.gender == 1 || player.gender == 3) {
        outputText("Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest hollow tentacle you can find and summarily shit-kick the beast onto the ground. Holding the creature down with one foot, you take the hollow tentacle and poise it in front of your raging erection.<br><br>", false);
        outputText("\"<i>You want dick milk, you freak?!</i>\" you bellow in triumph. \"<i>HERE YOU GO!</i>\"<br><br>", false);
        outputText("You impale the tentacle on your penis and begin humping wildly, treating the creature's armature as your own personal onahole. The creature squirms wildly, trying to escape your lust-driven strength. Replying with a swift kick with your free foot, the creature's resolve to escape wavers.<br><br>", false);
        outputText("\"<i>Quit fuckin' squirming and take your MEDICINE!</i>\" you thunder as you cheap-shot the beast for good measure.<br><br>", false);
        outputText("Feeling your peak approach, you allow your muscles into their rhythmic contractions as you unload your cum into the creature like a howitzer attacking a fort. Laughing like a maniac with each shot, you see your jizz leak out as the creature struggles to assimilate your 'donation'.<br><br>", false);
        outputText("Withdrawing your prick, you cast the beast aside and begin walking away both amused and satisfied. The beast stumbles weakly back into the wood it came from, clearly worse-off from the encounter.", false);
    }
    //Female:
    else {
        player.slimeFeed();
        //High Corruption
        if (player.cor >= 66) {
            outputText("Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest phallic tentacle you can find and summarily shit-kick the beast onto the ground. Holding the creature down with one foot, you take the tentacle-cock and poise it in front of your dripping cunt.<br><br>", false);
            outputText("Laughing like a true psychotic, you stuff the tentacle into your womb.", false);
            player.cuntChange(20, true, true, false);
            outputText("  Your vaginal muscles quickly go to work stroking, squeezing and kneading the appendage. The creature, more intent with escape than hammering your box, begins struggling. You summarily slug the beast as well as any professional pugilist to stop its throes.<br><br>", false);
            outputText("\"<i>STOP STRUGGLING AND FUCK MY LITTLE PUSSY!</i>\", you screech.<br><br>", false);
            outputText("The sensation of the beast ejaculating immediately gets your attention. As your womb fills with its warm load, a brutal idea takes you. The beast responded after you hit it. Smirking like a devil, you turn the beast into a punching bag. With each strike, the beast sprays a batch of goo deep inside your body. The sheer force of the spray is working your hole into an ecstatic frenzy. As you orgasm, you slug the creature again, forcing another batch of semen to flush your womanhood. After an hour of this, you reach a multi-orgasmic peak and release. The creature twitches weakly as you pull the limp tentacle from your body. The excess spunk flows out like an overturned bucket, leaving one hell of a mess. You walk away satisfied. It is unclear whether the tentacled horror survived your lust... but who cares. Your satisfaction is all you cared about, anyway.", false);
        }
        //Rape Win Female-Low Corruption:: 
        else {
            outputText("Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest phallic tentacle you can find and summarily push the beast onto the ground. Holding the creature down with your body weight, you take the tentacle-cock and poise it in front of your dripping cunt.<br><br>", false);
            outputText("You sit on the creature and begin using the tentacle as a living dildo. With your mass atop it, the creature cannot move or struggle, despite its lack of any attempts to do so. You push the limb deeper and deeper until you feel it bottom out against your cervix.", false);
            player.cuntChange(20, true, true, false);
            outputText("<br><br>Sensing your needs, the tamed beast extends a tendril from the main tentacle that easily pushes past your cervical opening and breeches the deepest parts of your womb. The feeler penetrates past your uterus and lodges itself as deeply as possible. The beast begins rapidly vibrating and undulating its member, stimulating the deepest parts of your sex.<br><br>", false);
            outputText("You quickly reach a cunt-cramping orgasm, which forces the creature to unload a torrent of hot, musky fluids inside you. You feel bloated and stuffed as the beast reflexively sprays the entire contents of its seminal sacs... or whatever it stores its cum in... inside you. With a quick squeeze, you start expelling the tentacle, which prompts the creature to withdraw its tendril and leave your body. You walk away well satisfied while the abomination is too exhausted to move.", false);
        }
    }

    cleanupAfterCombat();
    player.orgasm();
};

// Lose against the beast
TentacleBeastScene.tentacleBeastLoss = function() {
    if (player.HP <= 0) {
        outputText("Overcome by your wounds, you turn to make a last desperate attempt to run...<br><br>");
        //TODO Phylla Scenes
        /*
         if (findStatusEffect(StatusEffects.PhyllaFight) >= 0) {
         removeStatusEffect(StatusEffects.PhyllaFight);
         outputText("...and make it into the nearby tunnel.  ");
         game.desert.antsScene.phyllaTentaclePCLoss();
         } else
         game.forest.tentacleBeastScene.tentacleLossRape();
         } else { */
    }
    else {
        outputText("You give up on fighting, too aroused to resist any longer.  Shrugging, you walk into the writhing mass...<br><br>");
//TODO Phylla Scenes
        /* if (findStatusEffect(StatusEffects.PhyllaFight) >= 0) {
         removeStatusEffect(StatusEffects.PhyllaFight);
         outputText("...but an insistent voice rouses you from your stupor.  You manage to run into a nearby tunnel.  ");
         game.desert.antsScene.phyllaTentaclePCLoss();
         } else */
        doNext(TentacleBeastScene.tentacleLossRape);
    }
};

// Loss Scene selector (Split up from original to make it easier to read
TentacleBeastScene.tentacleLossRape = function() {
    clearOutput();
    //TODO spriteSelect(100);
    //TODO if (doSFWloss()) return; //Disables rape in SFW mode.
//Check for special scenes for genderless types
    if (player.gender == 0)
        TentacleBeastScene.tentacleLossGenderless();
    // Check for Bad End
    if (player.lust >= player.maxLust()) {
        gameFlags[TENTACLE_BAD_END]++;
        if (gameFlags[TENTACLE_BAD_END] >= 3 && player.cor > 50 && player.gender == 3) {
            TentacleBeastScene.futaTentacleBadEnd();
        }
    }
// check for Horsecock surprise!
    if (player.countCocksOfType(CockTypesEnum.HORSE) > 0 && player.cocks[0].cockLength > 15 && player.cocks[0].cockThickness >= 3) {
        if (player.cor < 75 && player.lust < 100) outputText("It grabs you before you can get away!<br><br>While you attempt to resist the abomination, its raw muscle mass is too much. ", false);
        outputText("It pins you to the ground easily. You immediately feel a sharp, horrible pain at the base of your cock. You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, your monstrous equine member immediately becomes fully erect and pre-cum flows freely from your flare.<br><br>", false);
        outputText("You see a large hollow tentacle attempt to descend upon your stiff cock. Much to your surprise and the creature's frustration, it barely opens wide enough to cover the tip of your impressive member. The creature mindlessly continues attempting to entrap your penis. It only succeeds in sending pangs of pleasure down your shaft as the thumping on the end of your cock shoots down to your roots.<br><br>", false);
        outputText("Amused as well as aroused, you choose to lull the creature into reticence as it keeps trying to suck your horsecock in. Each wave of pleasure makes your prick bob about", false);
        if (player.balls > 0) outputText(", and you feel your " + player.ballsDescript() + " rise and drop in unison to the muscular contractions pumping freshly made cum into position for release", false);
        outputText(".<br><br>", false);
        outputText("You bask in the glow of pleasure as the creature still fumbles around your dong, not realizing that you are just too big. An evil thought crosses your mind. Since this thing wants you bad enough, why not oblige it? Not expecting your increased strength due to your equine features, you wrench yourself free of the creature's restraints and summarily grasp the tentacle trying to cover your cock. With a great buck and heave, you force your dick into the tentacle, stretching it immensely. The creature lets out an inhuman howl as it reacts painfully to your newfound zeal.<br><br>", false);
        outputText("You begin pumping and thrusting like mad, working yourself to an orgasm. The creature tries to pull away, but finds that it is the one that cannot escape. Feeling your ", false);
        if (player.balls > 0) outputText("balls ", false);
        else outputText("cock ", false);
        outputText("rise up, you thrust as deep as you can go before you begin hosing a massive, steady stream of cum into the creature. For several minutes, you continuously empty yourself into the beast as it flops about, trying to escape. After a few minutes, the creature struggles more and you feel the wet warmth of your own cum around your tip. Cum begins leaking liberally from the tentacle. ", false);
        if (player.balls > 0) outputText("Your balls have overfilled the creature!<br><br>", false);
        else outputText("Your cum has overfilled the creature!<br><br>", false);
        outputText("One last jerk from the creature breaks your hold and it pulls itself away from your member, excess cum spilling everywhere and flying through the air as it flops about. Clearly overwhelmed, the beast lumbers clumsily back into the bush. You laugh to yourself as you made the creature taste its own proverbial medicine as its efforts to overwhelm you completely backfired.", false);

        player.dynStats("str", 0.5, "spe", -.5, "int", -1, "lib", 5, "sen", 1, "cor", 1);
        monster.HP = 0;
        if (player.HP == 0) player.HP++;
        if (inCombat()) {
            cleanupAfterCombat();
            player.orgasm();
        }
        else {
            player.orgasm();
            doNext(Camp.returnToCampUseOneHour);
        }
        return;
    }

//Centaur madness!
    else if (player.isTaur()) {
        TentacleBeastScene.centaurLossGendered();
    }
    // Now to cascade through normal loss scenes. The order may need to be rejiggered...
    // Has a cock
        if (player.hasCock()) {
            player.cumMultiplier += .5;
            outputText("The creature's desires are soon fulfilled as your " + player.cockDescript(0) + " starts to swell.  ", false);
            //[has testicles:
            if (player.balls > 0) outputText("Your " + player.ballsDescriptLight() + " tighten up against you in preparation for their inevitable release, ready to spray their boiling load into the beast.  ", false);
            outputText("You rear up as a surge of euphoria races through you; your equine strength manages to overpower the tentacles holding your forelegs down for the briefest of moments needed to release your spunk into the suction of the tentacle, and you feel it get whisked out and down toward the writhing mass.<br><br>", false);
        }
    // Has a vagina:
        if (player.hasVagina()) {
            outputText("Your " + player.vaginaDescript(0) + " ripples about the coiled intruder as you climax; fem-cum drips down the tentacle and fills the area with your musky scent.  You rear up as a surge of euphoria races through you, managing to overpower the tentacles holding your forelegs down for the briefest of moments.  But even with your forelegs free, the tentacle in your " + player.vaginaDescript(0) + " remains, rippling with waves of seed that spray inside you in massive, hot globules.  The sticky substance flooding your love canal pushes you over the edge and you orgasm again, spraying more as you cry out in pleasure.<br><br>", false);
        }
    // has cock, normal cum amount, anus < gaping: (ends scene)
        if (player.hasCock() && player.cumQ() < 1500 && player.ass.analLooseness < 4) {
            outputText("Just as you think it's over, another tentacle rams into your " + player.assholeDescript() + " and begins roughly massaging your prostate as it swells massively, causing another surge of cum to leave you, and another, and another.", false);
            player.buttChange(40, true, true, false);
            outputText("  It continues to violate your ass until you black out from exhaustion, the number of loads you've released no longer countable.", false);
            //end (loss)

            player.dynStats("tou", 1, "int", -.5, "lib", 2, "sen", 1, "cor", .5);
            if (inCombat()) {
                cleanupAfterCombat();
                player.orgasm();
            }
            else {
                player.orgasm();
                doNext(Camp.returnToCampUseTwoHours);
            }
            return;
        }
        // has cock, normal cum amount, anus == gaping: (ends scene)
        if (player.hasCock() && player.cumQ() < 1500 && player.ass.analLooseness >= 0) {
            outputText("Just as you think it's over, the tentacle inside your " + player.assholeDescript() + " begins to swell massively, causing another surge of cum to leave you, and another, and another.  It continues to violate your ass until you black out from exhaustion, the number of loads you've released no longer countable.", false);
            //end (loss)

            player.dynStats("tou", 1, "int", -.5, "lib", 2, "sen", 1, "cor", .5);
            if (inCombat()) {
                cleanupAfterCombat();
                player.orgasm();
            }
            else {
                player.orgasm();
                doNext(Camp.returnToCampUseTwoHours);
            }
            return;
        }
        //{ has vagina, anus < gaping: (ends scene)
        if (player.hasVagina()) {
            outputText("Just as you think it's over, a tentacle rams into your " + player.assholeDescript() + " and begins to swell massively, causing another surge of girlcum to leave you, and another, and another.", false);
            player.buttChange(40, true, true, false);
            outputText("  It continues to violate your ass until you black out from exhaustion, the number of times you've orgasmed no longer countable.", false);
            //end (loss)
            player.dynStats("tou", 1, "int", -.5, "lib", 2, "sen", 1, "cor", .5);
            if (inCombat()) {
                cleanupAfterCombat();
                player.orgasm();
            }
            else {
                player.orgasm();
                doNext(Camp.returnToCampUseTwoHours);
            }
            return;
        }
        //{ has cock, huge cum amount: (ends scene)
        if (player.hasCock() && player.cumQ >= 1500) {
            outputText("You continue to pump more and more baby batter into the monster until, much to your surprise, it overwhelms the beast and comes surging back out to coat your ", false);
            if (player.balls > 0) outputText(player.sackDescript() + " and ", false);
            outputText("hind legs.  When the creature tries to pull away you step forward awkwardly, forelegs still raised, and continue spraying your copious amount of seed directly into the main mass.  It writhes about beneath you, incapable of doing anything as its soggy, heavily-laden tentacles are now no match for your strength.<br><br>", false);

            outputText("Eventually you", false);
            if (player.balls > 0) outputText("r " + player.ballsDescriptLight(), false);
            outputText(" empty and you turn around to leave, giving the spunk covered mass a swift kick as a reminder of your superiority.", false);
            //end (victory)
            player.dynStats("tou", .5, "spe", -.5, "int", -.5, "lib", 1, "sen", 1, "cor", 1);
            monster.HP = 0;
            if (player.HP == 0) player.HP++;
            if (inCombat()) {
                cleanupAfterCombat();
                player.orgasm();
            }
            else {
                player.orgasm();
                doNext(Camp.returnToCampUseTwoHours);
            }
            return;

        }
    // Lactation possible:
        if (player.biggestLactation() >= 3.5 && player.gender > 0) {
        player.slimeFeed();
        outputText("Before you can react the creature has wrapped a long, sinewy tendril around each of your legs.  A third tendril quickly circles your waist.  You can feel the creature's strength immediately and wince as it tightens its grip.  The constricting pain is followed by a tingling, almost burning sensation, which you quickly recognize means the beast has injected you with some kind of poison.  A warm sensation floods your body and you realize with a start the poison is actually an aphrodisiac.<br><br>", false);
        player.dynStats("lib", 2);
        outputText("You feel light-headed as the drug spreads through your body quickly.  Your ", false);
        //Just dicks
        if (player.gender == 1) {
            outputText(player.multiCockDescriptLight(), false);
            if (player.cockTotal() > 1) outputText(" begin ", false);
            else outputText(" begins ", false);
        }
        //Pussy
        else {
            //AND dick(s)
            if (player.cockTotal() > 0) {
                outputText(player.vaginaDescript(0) + " and " + player.multiCockDescriptLight(), false);
                outputText(" begin ", false);
            }
            //Nope just pussy
            else {
                outputText(player.vaginaDescript(0), false);
                outputText(" begins ", false);
            }
        }
        outputText("to throb urgently.  You are scarcely aware of the creature's approach; the strong tentacles lay you back gently, almost tenderly as your drug-clouded mind attempts to count their number.  It's impossible for an accurate count with them moving so quickly, but you can see there are two kinds.  The thicker, stronger tentacles are covered in dome-like protrusions of varying sizes and each ends with a very anus-like pucker.  The smaller tentacles are smooth and translucent, letting some light pass through them.  They also end in a tight, anus-like orifice.<br><br>", false);
        outputText("You shudder as your " + player.allBreastsDescript() + " are quickly encircled and molested by the smaller tentacles.  Your swollen mammaries ache as the tentacles attach their orifices to your oozing nipples.  The tentacles begin a distinct milking pattern, alternating which nipple is milked first; you moan in delight and watch as your milk travels through the tentacle shaft and down to the shambling beast's body.<br><br>", false);
        //(Optional Paragraphs)
        if (player.gender == 2) {
            //[Female/Virgin-Tight Cunt]
            if (player.vaginalCapacity() < 30) outputText("The beast senses your excitement and with beguiling speed swiftly impales your " + player.vaginaDescript(0) + " with one of its massive, knobbly tentacles.  You squeal in pain and pleasure as you feel every bumpy inch pound into you, your cunt being stretched to unbelievable proportions.  The tentacle quickly bottoms out in your shallow hole, pressing urgently against your cervix as it begins to rhythmically pound your " + player.vaginaDescript(0) + ".<br>", false);
            //[Female/Loose-Moist Cunt]
            else outputText("The beast senses your excitement and with beguiling speed swiftly impales your " + player.vaginaDescript(0) + " with one of its massive, knobbly tentacles.  You moan like a whore as the beast's knobbly cock slides into with ease, every bump sending shivers through your spine as it finally bottoms out deep in your cunt, pressing into your cervix urgently.  The monster begins to pound heartily at your " + player.vaginaDescript(0) + ", filling the air with lewd squishing sounds.<br>", false);
            if (player.cuntChange(20, true)) outputText("<br>", false);
            outputText("<br>", false);
        }//HERMS
        if (player.gender == 3) {
            //[Herm/Virgin-Tight Cunt]
            if (player.vaginalCapacity() < 30) outputText("The beast senses your excitement and with beguiling speed swiftly impales your " + player.vaginaDescript(0) + " with one of its massive, knobbly tentacles.  You wail in excitement and pain, but before you can even digest the invasion, another tentacle impales itself on your " + player.cockDescript(0) + ".  The anus-like opening gapes to envelope you, slowly devouring your member.  The double assault drives your body wild, and you begin pumping back against the invader and thrusting your " + player.cockDescript(0) + " deeper into its tight fuck hole.<br><br>", false);
            //[Herm/Loose-Wet Cunt]
            else outputText("The beast senses your excitement and with beguiling speed swiftly impales your " + player.vaginaDescript(0) + " with one of its massive, knobbly tentacles but before you can even digest the invasion another tentacle impales itself on your " + player.cockDescript(0) + ", the anus like opening gaping to envelope you.  The double assault drives your body wild, and you begin pumping back against the invader and thrusting your " + player.cockDescript(0) + " deeper into its tight fuck hole.<br><br>", false);
            if (player.cuntChange(20, true)) outputText("<br>", false);
            outputText("<br>", false);
        }
        outputText("You slowly become aware that the beast has slowed its assault on your genitals and soon stops altogether, withdrawing entirely.  The beast lets out an audible gurgle and you smile as you feel the tentacles re-double their assault on your " + player.nippleDescript(0) + "s.  The beast slowly lifts you off the ground with its strong tentacles, suspending you about three feet off the ground before flipping you over.  You hang suspended in the air, your " + player.allBreastsDescript() + " dangling lewdly under you.  Suddenly you feel the desire to \"<i>moo</i>\" as the attack on your aching " + player.nippleDescript(0) + "s continues.  The tentacles continue their assault for what seems like hours, but then you gradually sense the tentacles beginning to slow.  Another gurgling sound confirms your suspicions - the beast wants your milk, but it's obvious you have far too much to offer!  You grin wickedly when the beast's tentacles begin to sag, quickly reaching up to fondle and massage your " + player.breastDescript(0) + ".  The stimulation causes even more milk to gush down the tentacles length.  After a few moments of the increased assault the beast groans and releases you, the tentacles popping off your nipples audibly, spraying your milk about as they release you.<br><br>", false);
        //[Female/Herm]
        if (player.gender >= 2) outputText("Your " + player.allBreastsDescript() + " ache, but you can tell immediately they are not depleted.  More milk dribbles as the tentacles try to retreat, and you grin, hardly satisfied with the beast's attack.  You reach between your thighs, seizing the nearest knobbly tentacle.  The beast is so sated it offers no resistance as you begin to pound your " + player.vaginaDescript(0) + " with the living dildo.  The idea of turning the tables on the raping beast spurs you on to new heights and you cum quickly around the knobbly shaft, your cunt spasming and milking the bumpy tentacle hard.  As you finish with the tentacle the beast gives a final gurgle and retreats into the forest.", false);
        //[Male]
        else outputText("You feel your " + player.nippleDescript(0) + "s dribbling milk as the tentacles attempt their retreat.  You realize the beast has nowhere near drained you and you grin eagerly as your " + player.cockDescript(0) + " throbs mightily.  You reach back and seize the nearest knobby tentacle, the beast offering no resistance as you shove your " + player.cockDescript(0) + " into the tight, puckered orifice.  You moan in delight, grunting happily as you fuck the tight hole wildly.  The thought of turning the tables on the raping beast drives you closer to the edge; soon you bury all of your cock into the tight fuck tool and unload your massive torrent of cum into the tentacle.  Your hot cum gushes into the beast and you can feel the tentacle throb and squirm in protest as you fill the beast even more.  After your " + player.cockDescript(0) + " slips free the beast lets out a final gurgle of defeat and slithers away into the forest.", false);

        player.dynStats("tou", .5, "spe", -.5, "int", -.5, "lib", 1, "sen", 1, "cor", 1);
        player.boostLactation(.5);
        monster.HP = 0;
        if (player.HP == 0) player.HP++;
            if (inCombat()) {
                cleanupAfterCombat();
                player.orgasm();
            }
            else {
                player.orgasm();
                doNext(Camp.returnToCampUseTwoHours);
            }
            return;

    }
    // Generic loss scenes that catch the rest and send to rape continuation scene.
    if (player.gender == 1) {
        player.dynStats("str", -1, "int", -1, "lib", 5, "sen", 2, "lus", 25, "cor", 1);
        if (player.cor < 75) outputText("It grabs you before you can get away!<br><br>While you attempt to resist the abomination, its raw muscle mass is too much. ", false);
        outputText("It pins you to the ground easily. You immediately feel a sharp, horrible pain ", false);
        if (player.cockTotal() > 1) outputText("at the base of your " + player.multiCockDescriptLight() + ".", false);
        outputText("  You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, ", false);
        if (player.cockTotal() == 1) outputText("your member immediately becomes fully erect and pre-cum leaks liberally from your tip.", false);
        else outputText("your members immediately become fully erect, pre-cum drizzling from the tips.", false);
        outputText("<br><br>Realizing what is about to happen, you try to struggle. The beast responds by slamming you to the ground a few times, stunning you.  ", false);
        if (player.cockTotal() == 1) outputText("In your daze you see a monstrous, hollow tentacle poised over your furious cock. You scream in shock and protest, but your cries fall upon deaf ears. The tentacle descends upon your penis, now begging for release, and clamps down upon your pubic mound, fully encapsulating your member.", false);
        else outputText("In your daze you see " + player.cockTotal() + " monstrous, hollow tentacles poised over your furious cocks.  You scream in shock and protest, but your cries fall upon deaf ears.  The tentacles descend upon your " + player.multiCockDescriptLight() + ", all begging for release, and clamps down upon your pubic mound, fully encapsulating your dicks.", false);
    }
    if (player.gender == 2) {
        player.slimeFeed();
        player.dynStats("spe", -1, "int", -1, "lib", 5, "sen", 3, "lus", 20, "cor", 1);
        if (player.cor < 75) outputText("It grabs you before you can get away!<br><br>While you struggle valiantly, the beast's raw might is more than a match for you. ", false);
        outputText("Tentacles burst from the mass and bind your arms, legs, and midriff. ", false);
        if (player.cor < 75) outputText("You struggle to break free, but the creature only constricts you further, ensuring your immobility. ", false);
        outputText("A quick flex of the tentacles securing your legs leaves you spreadeagled before the maw of the horror.  ", false);
        if (player.cor < 75) outputText("Fearing for your life, you scream and struggle for help, but only the apathetic sounds of nature respond.", false);
        outputText("<br><br>" + (player.totalBreasts() + 1) + " thorny tendrils appear and pierce your breasts and groin. A sharp pain and a burning sensation tear through you, overriding the previous wave of pleasure. You feel fluids being injected into you and a distinctive, agonizing misery flows into your veins.  Your breasts and ", false);
        if (player.vaginas.length == 1) outputText("clit ", false);
        else outputText("clits ", false);
        outputText("heat up and begin to swell. The pressure in your breasts is maddening and to your shock, you feel yourself leaking milk.", false);
    }
    if (player.gender == 3) {
        player.slimeFeed();
        player.dynStats("spe", -1, "int", -1, "lib", 5, "sen", 4, "lus", 35, "cor", 2);
        if (player.cor < 75) outputText("While you attempt to resist the abomination, its raw muscle mass is too much. ", false);
        outputText("It pins you to the ground easily. You immediately feel a sharp, horrible pain at the base of your ", false);
        if (player.cockTotal() > 1) outputText("cocks", false);
        else outputText(player.cockDescript(0), false);
        outputText(".  You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, your ", false);
        if (player.cockTotal() > 1) outputText(player.multiCockDescriptLight() + " immediately become fully erect and leak pre-cum liberally from their tips.  ", false);
        else outputText("member immediately becomes fully erect and pre-cum leaks liberally from your tip.  ", false);
        outputText("  " + Num2Text((player.totalNipples())) + " thorny tentacles pierce your nipples, and you feel as if someone shot acid into your tits, which immediately begin to swell.", false);
        player.growTits(1, player.breastRows.length, false, 2);
        outputText("<br><br>Realizing what is about to happen, you try to struggle. The beast responds by slamming you to the ground a few times, stunning you. In your daze you see a monstrous, hollow tentacle poised over your ", false);
        if (player.cockTotal() > 1) outputText("furious cocks.  ", false);
        else outputText("furious cock.  ", false);
        outputText("You scream in shock and protest, but your cries fall upon deaf ears. The tentacle descends upon your ", false);
        if (player.cockTotal() > 1) outputText(player.multiCockDescriptLight() + ", now begging for release, and clamps down around your pubic mound, fully encapsulating your members.  ", false);
        else outputText(player.cockDescript(0) + ", now begging for release, and clamps down upon your pubic mound, fully encapsulating your member.", false);
    }
//Call page 2!
    doNext(TentacleBeastScene.tentacleRapeContinuation);
};

// Continue scene for losing to beast
TentacleBeastScene.tentacleRapeContinuation = function() {
    player.dynStats("tou", 1, "int", -.5, "lib", 2, "sen", 1, "cor", .5);
    clearOutput();
    // TODO spriteSelect(100);
    // Male
    if (player.gender == 1) {
        outputText("You next feel the wretched sensation of another tentacle pushing its way past your anus and into your rectum. You cry more out of frustration and anger than pain as the foreign body settles a few inches inside your body. With a furious, coordinated rhythm, the monstrosity begins swelling the tentacle in your ass and ");
        if (player.cockTotal() == 1)
            outputText("using a sucking-stroking motion on your helpless " + player.multiCockDescriptLight() + ". The swelling of the ass tentacle pressures your prostate in a paradoxically pleasurable and painful manner. You realize, much to your terror, that this beast is MILKING you of your semen!", false);
        else
            outputText("using a sucking-stroking motion on your " + player.multiCockDescriptLight() + ".  The swelling of the ass tentacle pressures your prostate in a paradoxical pleasurable and painful manner.  You realize, much to your terror, that this beast is MILKING you of your semen!", false);
        player.buttChange(50, true);
        outputText("<br><br>Helpless and overwhelmed by the pleasure of such rough and primal stimulation, all you can do is give the creature what it wants; your hot cum. Your body only responds to the sensations from your ", false);
        if (player.cockTotal() == 1)
            outputText(player.multiCockDescriptLight() + " and ass and in a very short time, your phallus explodes, launching stream upon stream of hot, thick cum into the horror. Your hips and pelvis buck violently with each thrust as the creature masterfully strokes your " + player.multiCockDescriptLight() + "  and milks your prostate of your fluids. You cry with each orgasm, prompting the thing to milk you harder. After an eternity of successive ejaculations, the creature withdraws its unholy arms and leaves you in a bruised, lacerated, overfucked heap on the ground, discarded like a person throws away a corn cob after a meal.", false);
        else
            outputText(player.multiCockDescriptLight() + " and ass and in a very short time, your dicks explode, launching stream upon stream upon stream of hot, thick cum into the horror.  Your hips and pelvis buck violently with each thrust as the creature masterfully strokes your " + player.multiCockDescriptLight() + " and milks your prostate of your fluids.  You cry with each orgasm, prompting the thing to milk you harder. After an eternity of successive ejaculations, the creature withdraws its unholy arms and leaves you in a bruised, lacerated, overfucked heap on the ground, discarded like a person throws away a corn cob after a meal.", false);
    }
    // Female (Kicks to special scene)
    else if (player.gender == 2) {
        outputText("The beast rears up to reveal a beak-like maw. It opens its massive jaws to reveal ");
        if (player.vaginas.length == 1)
            outputText("a tongue shaped like a large cock while its tongue, like any tentacle, immediately seeks out your defenseless pussy. It prods itself mockingly around your labia as you attempt to contract to keep it from violating you and depriving you of what dignity you have left. The creature flexes its appendage and easily forces its way into your vagina", false);
        else
            outputText(player.vaginas.length + " tongues shaped like large cocks while its tongues, like any other tentacles, seeks out your defenseless pussies.  It prods itself mockingly around your labias as you attempt to contract to keep them from violating you and depriving you of what dignity you have left.  The creature flexes its appendages and easily forces its way into your " + player.vaginaDescript(0) + "s", false);
        if (player.vaginas.length > 1)
            outputText("s", false);
        outputText(". As you cry out in shock, another dick-shaped appendage forces its way into your throat. The beast takes care to prevent you from choking on its limb.", false);
        outputText("<br><br>In a coordination that can only signify higher intelligence, the monster fucks your " + player.vaginaDescript(0), false);
        if (player.vaginas.length > 1)
            outputText("s", false);
        outputText(" and mouth and begins milking your swollen breasts and sucks your throbbing ", false);
        if (player.vaginas.length > 1)
            outputText("clits. ", false);
        else
            outputText("clit. ", false);
        player.cuntChange(player.vaginalCapacity() * .76, true);
        outputText(" Your body betrays your resistance as pleasure hammers you from crotch to head. After some time, you begin bucking your hips in tandem to the creature's thrusts, drunk with pleasure. As you peak for your orgasm, you feel the creature bottom out inside your womb. Oceans of hot cum flood your " + player.vaginaDescript(0), false);
        if (player.vaginas.length > 1)
            outputText("s", false);
        outputText(" and your mouth. You are being inseminated by the abomination, but you do not care. The fucking is too good. The hot, musky fluids pour into your mouth. The taste crushes your last bit of resistance and you NEED MORE, not just to swallow, but to devour with your womb. You manage to free one hand, only to grasp the tentacle in your mouth to coax more semen inside you. You feel your stomach distend from the amount of cum you greedily swallow. The beast floods you with more cum than you can handle and proceeds to soak you from head to toe in its fluids as it runs from your overwhelmed orifices.", false);

        player.slimeFeed();
        //lactate more from the encounter.
        player.boostLactation(.3);
        doNext(TentacleBeastScene.tentacleRapeContinuationForFemales);
        return;
    }
    // Herm
    else if (player.gender == 3) {
        if (player.cockTotal() == 1)
        {
            outputText("A sharp tug tells you that the creature has sealed itself upon your " + player.cockDescript(0) + ". You see " + player.totalBreasts() + " smaller tentacles latch onto your erect nipples. You feel milk begin to leak out as the creature makes a perfect seal around your areola. A thick, phallic tentacle probes underneath your trapped " + player.cockDescript(0) + " until it finds your vaginal opening. You cry out as the member punches past your opening and bottoms out in your womb. The tentacle swells up until it completely fills your " + player.vaginaDescript(0) + ".  ");
            player.cuntChange(player.vaginalCapacity() * .76, true, false, true);
            outputText("With freakish coordination, the beast sucks your " + player.cockDescript(0) + " and tits while hammering away at your " + player.vaginaDescript(0) + ". The overwhelming pleasure courses through your body and triggers an immediate orgasm, sending gouts of cum into the tentacle sealed around your " + player.cockDescript(0) + ". The sensation of your fluids entering the creature prompts it to suck your " + player.cockDescript(0) + " harder as well as hammer your " + player.vaginaDescript(0) + " faster, leading to a chain of orgasms.<br><br>", false);
            outputText("Drunk with pleasure, you revel in the sensation of cumming into the creature while it breast feeds from you. All you can do is drown in the experience of being milked from top to bottom. The creature begins piledriving your box faster and you feel like the creature is going to impale you with its phallic tentacle.<br><br>", false);
            outputText("The creature's milking tentacles stop moving and you feel the dick-tentacle press sharply against your womb. You feel the thunderous force of hot fluid lance into your body as the creature cums repeatedly inside you, triggering yet another orgasm. The creature cums in surges and shoots repeatedly inside you. Within moments, excess cum spews out of your " + player.vaginaDescript(0) + " as it cannot hold anymore, but the creature keeps cumming.<br><br>", false);
            outputText("After a while the creature withdraws its tentacles from you. It poises the tentacle-cock over your face and lets out one last load, covering your face in hot, thick sperm. You reflexively open your mouth and allow loads of the salty juice down your throat. Once spent, the creature shambles off, leaving you well milked and cum-soaked.", false);
        }
        else
        {
            outputText("A sharp tug tells you that the creature has sealed itself upon your " + player.multiCockDescriptLight() + ". You see " + player.totalBreasts() + " smaller tentacles latch onto your erect nipples. You feel milk begin to leak out as the creature makes a perfect seal around your areola. A thick, phallic tentacle probes underneath your trapped cocks until it finds your vaginal opening. You cry out as the member punches past your opening and bottoms out in your womb. The tentacle swells up until it completely fills your " + player.vaginaDescript(0) + ".");
            player.cuntChange(player.vaginalCapacity() * .76, true, true, false);
            outputText("  With freakish coordination, the beast sucks your " + player.multiCockDescriptLight() + " and tits while hammering away at your " + player.vaginaDescript(0) + ". The overwhelming pleasure courses through your body and triggers an immediate orgasm, sending gouts of cum into the tentacles sealed around your pricks. The sensation of your fluids entering the creature prompts it to suck your throbbing cocks harder as well as hammer your " + player.vaginaDescript(0) + " faster, leading to a chain of orgasms.<br><br>", false);
            outputText("Drunk with pleasure, you revel in the sensation of cumming into the creature while it breast feeds from you. All you can do is drown in the experience of being milked from top to bottom. The creature begins piledriving your box faster and you feel like the creature is going to impale you with its phallic tentacle.<br><br>", false);
            outputText("The creature's milking tentacles stop moving and you feel the dick-tentacle press sharply against your womb. You feel the thunderous force of hot fluid lance into your body as the creature cums repeatedly inside you, triggering yet another orgasm. The creature cums in surges and shoots repeatedly inside you. Within moments, excess cum spews out of your " + player.vaginaDescript(0) + " as it cannot hold anymore, but the creature keeps cumming.<br><br>", false);
            outputText("After a while the creature withdraws its tentacles from you. It poises the tentacle-cock over your face and lets out one last load, covering your face in hot, thick sperm. You reflexively open your mouth and allow loads of the salty juice down your throat. Once spent, the creature shambles off, leaving you well milked and cum-soaked.", false);
        }
        player.slimeFeed();
        //lactate more from the encounter.
        player.boostLactation(.3);
    }
    if (inCombat()) {
        cleanupAfterCombat();
        player.orgasm();
    }
    else {
        player.orgasm();
        doNext(Camp.returnToCampUseTwoHours);
    }
};

// Continue scene for losing to beast as female
TentacleBeastScene.tentacleRapeContinuationForFemales = function() {
    clearOutput();
// TODO spriteSelect(100);
    if (player.vaginas.length == 1) { //single coochie
        outputText("Satisfied, the creature drops you smartly, withdraws its limbs from you, and lumbers away.  Covered completely in cum, you see that your clitoris has swollen up to ");
        //Big clit girls get huge clits
        if ((player.findPerk(PerkLib.BigClit) >= 0 && player.clitLength > 2) || player.clitLength > 3)
            outputText("almost " + num2Text(Math.floor(player.clitLength * 1.75)) + " inches in length. ");
        //normal girls get big clits
        else
            outputText("almost four inches in length.  Bruised and sore, you pass into unconsciousness ");
    }
    else {
        outputText("Satisfied, the creature drops you smartly and withdraws its limbs from you and lumbers away.  Covered completely in cum, you see that your " + player.vaginas.length + " clits have swollen up to almost four inches in length.  Bruised and sore, you pass into unconsciousness, ");
    }
//Not too corrupt
    if (player.cor < 75)
        outputText("too intoxicated with lust to fume over your violation. ");
//Very corrupt
    else outputText("too intoxicated with lust to continue the pleasure. ");
//If has big-clit grow to max of 6"
    if (player.clitLength < 7 && player.clitLength >= 3.5 && player.findPerk(PerkLib.BigClit) >= 0) {
        player.clitLength += .1 + player.cor / 100;
        outputText("Your massive clitty eventually diminishes, retaining a fair portion of its former glory.  It is now " + (player.clitLength * 10) / 10 + " inches long when aroused, ");
        if (player.clitLength < 5)
            outputText("like a tiny cock.");
        if (player.clitLength >= 5 && player.clitLength < 7)
            outputText("like a slick throbbing cock.");
        if (player.clitLength >= 7)
            outputText("like a big thick cock.");
    }
//Grow clit if smaller than 3.5"
    else if (player.clitLength < 3.5) {
        outputText("In time your clit returns to a more normal size, but retains a bit of extra volume.");
        player.clitLength += .2;
    }
//Mention that clit doesn't grow if your big enough.
    else outputText("In time it returns to its normal size, losing all the extra volume.");
    if (player.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_TIGHT) player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_NORMAL;
    player.slimeFeed();
    if (inCombat()) {
        cleanupAfterCombat();
        player.orgasm();
    }
    else {
        player.orgasm();
        doNext(Camp.returnToCampUseTwoHours);
    }

};

// Lose to beast as a gendered centaur
TentacleBeastScene.centaurLossGendered = function() {
    outputText("Tentacles wrap around your legs before you can stop them.  They continue to coil up your legs, spreading an uncomfortable warmth through your equine half.  Another tentacle wraps around your torso, spreading that same warmth and fuzzing your mind.  You grab one you can reach and attempt to tear it off of you, but two thinner, translucent feelers immobilize your arms, pulling them up behind your head.<br><br>", false);
    player.slimeFeed();
    outputText("They test your body, slipping about over your form.  A small tentacle finds its way into your mouth, coiling about your tongue and down your throat.  It's careful not to make you choke, seemingly as curious about your innards as it is about your shell.  You're given little time to think though, as a surge of fluid is deposited into your stomach, making your desire to cum grow even more.  The sharp spines coiled about you act similarly, spreading warmth about them wherever they touch your " + player.skin() + ".<br><br>", false);
    // has at least 1 cock, engulfable:
    if (player.hasCock()) {
        if (player.cockArea(player.smallestCockIndex()) <= 50) {
            outputText("More aphrodisiac-toxin pours into you, causing " + player.sMultiCockDesc() + " to expand.  ", false);
            if (player.cockTotal() > 1) outputText("  The creature seems surprised at first to discover such a large brace of cocks, testing their texture and wrapping around each individually.  Your " + player.multiCockDescriptLight() + " responds by wriggling about and tempting the beast to continue its exploration, but the gesture is futile and they're abandoned, though not for long.", false);
            outputText("<br><br>", false);

            outputText("A peculiar sensation rolls over it as an unseen tentacle engulfs you, rippling and milking your " + player.cockDescript(0) + ".  Your body naturally tries to drive into it but the tentacle isn't strong enough to provide resistance.  Your wild humping causes it to bump up and down against your underbelly, a surprisingly pleasurable feeling.  The tentacle pays no heed, continuing to ripple and constrict around you;  a suckling noise accompanies the sensation of your pre-cum being suctioned out.<br><br>", false);

        }
        // has cock, not engulfable:
        else {
            outputText("More aphrodisiac-toxin pours into you, causing " + player.sMultiCockDesc() + " to expand. Something bumps up against the tip but can't seem to fit around your " + player.cockDescript(0) + ".  It continues trying for a while, sending pangs of pleasure down the length.  The tentacle eventually gives up and latches onto the tip, positioned right at the opening to your urethra.  It sucks up your pre-cum as it drips from you, accompanied by a loud suckling noise.", false);
            //[With testicles:
            if (player.balls > 0) outputText("The sucking reaches all the way to your " + player.ballsDescriptLight() + ", a spectacularly strange sensation that nevertheless feels wonderful.", false);
            outputText("<br><br>", false);
        }
    }
    // has vagina:
    if (player.hasVagina()) {
        outputText("A squirming tentacle forces its way inside your " + player.vaginaDescript(0) + ", undulating and squirming as it works its way deeper and deeper.  Your body responds by pumping out more fluid, making the passage of the monstrous thing easier.", false);
        player.cuntChange(32, true, true, false);
        if (player.hasCock()) {
            if (player.cockArea(player.smallestCockIndex()) <= 50) outputText("  Your humping appears to not affect the creatures continuing efforts, despite the force of your body.", false);
        }
        outputText("  You feel the beast bottom out against your uterus and cry out in pleasure, gyrating yourself about as fluid sprays behind you.<br><br>", false);
    }
    // Breasts > Manly, non-lactating:
    if (player.biggestTitSize() >= 1 && player.lactationQ() <= 0) {
        outputText("Roving tentacles latch onto your " + player.allBreastsDescript() + "; tiny spikes jabbing into each " + player.nippleDescript(0) + " and injecting some sort of hot fluid.", false);
        if (player.totalBreasts() == 2) outputText("  The anus-like tips affix to them.", false);
        else outputText("  The anus-like tips attach to one pair as more appear in order to take the others.", false);
        outputText("  You feel a gush of liquid leave your body as the translucent lengths of the tentacles turn stark white.  The fluid they inject has caused you to lactate!  They suckle at you incessantly and before long your nipples ache from overuse and your breasts have run completely dry.<br><br>", false);
        player.boostLactation(1.5);
    }
    // Anus == gaping:
    if (player.ass.analLooseness >= 4) {
        outputText("Your " + player.assholeDescript() + " makes an inviting target for the squirming mass and it's quick to capitalize.  A particularly bulbous appendage slides deep inside, roiling about in a way that not even your well-trained hole has been treated to.", false);
        if (player.hasCock()) outputText("  A series of undulating lumps pass over your prostate, pushing out a splash of pre-cum.", false);
        outputText("  You moan into the tentacle in your mouth appreciatevely at the beast's spectacular skill.<br><br>", false);
    }
    // Breasts > Manly, lactating, not enough to overfill:
    if (player.biggestTitSize() >= 1 && player.lactationQ() > 0 && player.lactationQ() < 1000) {
        outputText("Roving tentacles latch onto your " + player.allBreastsDescript() + ", tiny spikes jabbing into your " + player.nippleDescript(0) + "s and injecting some sort of hot fluid.  The pressure inside grows nearly unbearable as you feel your milk production increase.  To your relief, an anus-like tip attaches to each nipple.  They suckle at you incessantly and before long your nipples ache from overuse and your breasts have run completely dry.<br><br>", false);
        player.boostLactation(1);
    }
    // Breasts > Manly, lactating, enough to overfill:
    else if (player.biggestTitSize() >= 1 && player.lactationQ() >= 1000) {
        outputText("Roving tentacles latch onto your " + player.allBreastsDescript() + ", tiny spikes jabbing into your " + player.nippleDescript(0) + " and injecting some sort of hot fluid.  The pressure inside grows nearly unbearable as you feel your milk production increase.  To your relief, an anus-like tip attaches to each nipple.  They suckle at you incessantly and before long your nipples ache from overuse, but your breasts are still prepared to provide more milk!  The suction decreases as the beast before you becomes overfilled and eventually is forced to give up.<br><br>", false);
    }
    // Wrap this up...
    if (player.hasCock()) {
        outputText("Your " + player.cockDescript(0) + " explodes inside the creature, ", false);
        if (player.cumQ() <= 500) outputText("pushing the creature to the edge of its fluid-containing abilities.", false);
        else outputText("quickly overfilling the tentacle attached to it; it explodes off of you, freeing your spunk to spray from both you and the retreating beast.  ", false);
    }
    outputText("The tentacles holding you release, leaking fluids everywhere.  You delight in giving one of the larger ones a hard stomp, as a reminder not to trifle with you.", false);
    //end (victory)
    player.dynStats("tou", .5, "spe", -.5, "int", -.5, "lib", 1, "sen", 1, "cor", 1);
    player.boostLactation(.5);
    monster.HP = 0;
    if (player.HP == 0) player.HP++;
    if (inCombat()) {
        cleanupAfterCombat();
        player.orgasm();
    }
    else {
        player.orgasm();
        doNext(Camp.returnToCampUseOneHour);
    }

};


//Tentacle Beast Encounters

TentacleBeastScene.encounter = function() {

    clearOutput();
//TODO Sprite spriteSelect(100);

//Gender hilarity chance.
    if (player.gender == 0 && rand(3) == 0 && !player.isNaga() && !player.isTaur() && !player.isGoo()) {
        //Warm up for neuters as per the old event:
        outputText("You see a massive, shambling form emerge from the underbrush. While first appearing to be a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs. Sensing your presence, it lumbers at you, full speed, tentacles outstretched.<br><br>", false);

        if (player.cor > 50 && player.cor <= 75)
            outputText("You debate the merits of running from such a creature, and realize it's now too late to escape.  ", false);
        if (player.cor > 75)
            outputText("You smile and stride forward, welcoming the pleasure you expect from such a monster.  ", false);
        //HILARIOUS NEUTER EVENT HERE
        if (player.cor < 75)
            outputText("While you attempt to resist the abomination, its raw muscle mass is too much. ", false);
        outputText("It pins you to the ground easily. You feel slimy tentacles run up and down your groin as the creature searches for whatever gonads it expected you to have. When it realizes that you have neither penis nor vagina, it smartly casts you to the ground in apparent disgust.<br><br>\"<i>WHAT THE FUCK IS THIS SHIT?!!</i>\" The creature speaks in an unnervingly human voice.<br><br>", false);
        outputText("Completely confused, all you can do is sit there in shock.<br><br>\"<i>Where are your naughty bits, goddammit!</i>\" the creature bellows. \"<i>Us tentacle creatures need to FEED!</i>\"<br><br>", false);
        outputText("You sheepishly state that you are gender-neutral and have no genitalia.<br><br>\"<i>You gotta be shitting me!!</i>\" the monster bellows in contempt. \"<i>Of all the motherfuckers I ambush, it has to be the ONE bastard I can't feed from! What am I supposed to do now, asshole?! I gotta eat!</i>\"", false);
        outputText("At a loss for words, you meekly offer the creature some of your food you have packed for your journey. The creature slaps it out of your hand, almost breaking your wrist.<br><br>\"<i>I can't eat that shit!</i>\" roars the abomination. \"<i>Do I look like I have a fucking mouth to chew that with?! NOOOOOO! I feed off dicks and wayward women! Cum and tit milk! YOU have NEITHER!!!</i>\"  ", false);
        outputText("The beast slaps you squarely on the ass as if to push you along. \"<i>Get the fuck out of here!</i>\" it screams. \"<i>Get lost so I can hunt me a REAL meal!!!</i>\"", false);
        outputText("You walk away from the creature, which hides back in the brush. After you trek a bit, you wonder if what happened really DID happen...", false);
        player.dynStats("lus", -5);
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
//Combat starter
    outputText("You see a massive, shambling form emerge from the underbrush.  While it resembles a large shrub, a collection of thorny tendrils and cephalopodic limbs sprout from its bulbous mass.  Sensing your presence, it lumbers at you, full speed, tentacles outstretched.<br><br>", false);
    if (player.cor > 50 && player.cor <= 75)
        outputText("You debate the merits of running from such a creature.<br><br>", false);
    if (player.cor > 75)
        outputText("You smile and stride forward, welcoming the pleasure you expect from such a monster.<br><br>", false);
//Worms get nothing!
    if (gameFlags[INFESTED] == 1) {
        outputText("It stops itself completely in a moment and twitches, as if sniffing the air, before turning around and disappearing into the underbrush.", false);
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    if (player.cor > 50) {
        outputText("Do you joyfully submit or fight back?<br><br>", false);
        menu();
        addButton(0, "Fight", TentacleBeastScene.startTentacleBeastCombat);
        addButton(1, "Submit", TentacleBeastScene.tentacleLossRape);
        return;
    }
    startCombat(new TentacleBeast());
};

// If you lose against the Beast and you are Genderless...
TentacleBeastScene.tentacleLossGenderless = function() {
    //Taur madness
    if (player.isTaur()) {
        TentacleBeastScene.centaurLossGenderless();

    }
    else if (player.isNaga()) {
        TentacleBeastScene.nagaLossGenderless();

    }
    else if (player.isGoo()) {
        TentacleBeastScene.gooLossGenderless();

    }
    else {
        if (player.cor < 75) outputText("While you attempt to resist the abomination, its raw muscle mass is too much. ", false);
        outputText("It pins you to the ground easily. You feel slimy tentacles run up and down your groin as the creature searches for whatever gonads it expected you to have. When it realizes that you have neither penis nor vagina, it smartly casts you to the ground in apparent disgust.<br><br>\"<i>WHAT THE FUCK IS THIS SHIT?!!</i>\" The creature speaks in an unnervingly human voice.  Completely confused, all you can do is sit there in shock.<br><br>", false);
        outputText("\"<i>Where are your naughty bits, goddammit!</i>\" the creature bellows. \"<i>Us tentacle creatures need to FEED!</i>\"<br><br>", false);
        outputText("You sheepishly state that you are gender neutral and have no genitalia.<br><br>\"<i>You gotta be shitting me!!</i>\" the monster bellows in contempt. \"<i>Of all the motherfuckers I ambush, it has to be the ONE bastard I can't feed from! What am I supposed to do now, asshole?! I gotta eat!</i>\"", false);
        outputText("<br><br>At a loss for words, you meekly offer the creature some of your food. The creature slaps it out of your hand, almost breaking your wrist.<br><br>\"<i>I can't eat that shit!</i>\" roars the abomination. \"<i>Do I look like I have a fucking mouth to chew that with?! NOOOOOO! I feed off dicks and wayward women! Futa cum and tit milk! YOU have NEITHER!!!</i>\"", false);
        outputText("<br><br>The beast slaps you squarely on the ass as if to push you along. \"<i>Get the fuck out of here!</i>\" it screams.  \"<i>Get lost so I can hunt me a REAL meal!!!</i>\"  ", false);
        outputText("You walk away from the creature, which hides back in the brush. After you trek a bit, you wonder if what happened really DID happen...", false);
        if (inCombat()) cleanupAfterCombat();
        else doNext(Camp.returnToCampUseOneHour);

    }

};

//Genderless Centaur Loss Scenes
TentacleBeastScene.centaurLossGenderless = function() {
    clearOutput();
    //TODO spriteSelect(100);
    // First encounter or if there are no balls
    if (gameFlags[TENTACLE_GENDERLESS_CENTAUR] == 0 || player.balls == 0) {
        gameFlags[TENTACLE_GENDERLESS_CENTAUR] = 1;
        outputText("Tentacles wrap around your legs before you can make a move to stop them, binding you tightly and coiling upwards.  One slides slowly along your underside, making you shiver in ", false);
        if (player.cor < 50 && player.lust < 70) outputText("dread", false);
        else outputText("anticipation", false);
        outputText(", but stops when it reaches your haunches.  Another starts testing the same area, briefly touching your " + player.assholeDescript() + " but clearly not finding what it's looking for.<br><br>", false);

        outputText("\"<i>WHAT THE FUCK IS WRONG WITH YOUR BODY?!</i>\" yells out an unnervingly human voice.<br><br>", false);

        outputText("Startled past horror, your mouth hangs wide open.<br><br>", false);

        outputText("\"<i>Why the FUCK can't I find your juicy bits?</i>\" the creature shrills.  \"<i>I'm so hungry I could risk stealing spoo from an army of goblins in heat!</i>\"<br><br>", false);

        outputText("You stammer out something about having no genitals, not thinking clearly enough to dissemble.<br><br>", false);

        outputText("\"<i>Oh, you think this shit is FUNNY, don't you?</i>\"  The voice has switched to a mocking tone.  \"<i>I know, let's wander into the forest and fuck with the hungry creatures who want some nice, nutritious cum!  Let's make them work for my amusement!  It'll be fucking HILARIOUS!</i>\"<br><br>", false);

        outputText("A tentacle smacks your " + player.buttDescript() + " hard, and the voice returns to normal.<br><br>", false);

        outputText("\"<i>I just caught a motherfucking HORSE, just to find out you haven't got anything for me to eat!  Do you have any idea how fucking hard it is to catch a horse!?</i>\"<br><br>", false);

        outputText("Feeling kind of ashamed now, you agree that horses are probably pretty hard to catch, but point out you're not <i>really</i> a horse, you're a centaur.  This is met by a stunned silence, which you, being unable to read the mood of the creature very well, decide to fill with your own voice.  You briefly explain the main differences between horses and centaurs, then mention that you weren't exactly <i>willing</i> prey; the monster certainly never asked you if it would be okay to feed from your genitalia, and that perhaps it should reconsider its strategy.<br><br>", false);
        outputText("More silence.<br><br>", false);

        outputText("Out of nowhere a tentacle slaps you in the face.<br><br>", false);

        outputText("\"<i>FUCK you, you stupid horse!  Why don't you grow a pair?  Literally!</i>\"<br><br>", false);

        outputText("It raises its tentacles and slams them into you as one, dropping you to the ground, unconscious.  With that, the tentacles retract and the monster shambles off into the forest, mumbling something about burning.", false);

    }
    //(Followup scene, if pc has seen above at least once, is unsexed centaur and has balls: -Z)
    else {
        outputText("Tentacles wrap around your legs before you can make a move to stop them, binding you tightly and coiling upwards.  One slides slowly along your underside, making you shiver in ", false);
        if (player.cor < 50 && player.lust < 70) outputText("dread", false);
        else outputText("anticipation", false);
        outputText(", slipping forward to probe between your haunches.  It arrives at and discovers your " + player.sackDescript() + " with some little ceremony, stroking and fondling it.<br><br>", false);

        outputText("\"<i>Now THIS is what I'm talking about!</i>\" the creature's eerie voice sings out.  \"<i>Daddy needs his medicine!</i>\"<br><br>", false);

        outputText("The tentacle, now joined by a second, hunts around your " + player.ballsDescriptLight() + ", seeking any organs that might serve as a release valve for their contents.  You stare at it as it searches, quite certain you know what's coming next.<br><br>", false);

        outputText("\"<i>No, no, no. Where the FUCK is it?</i>\" the creature mumbles, frustration spiking the pitch of its voice.<br><br>", false);

        outputText("You glibly explain that though you do in fact have 'a pair', as requested, you're still very much genderless, without any sexual organs.<br><br>", false);

        outputText("The tentacles cease movement as their owner digests your words; it begins to shake visibly, shedding leaf-litter as it does.<br><br>", false);

        outputText("\"<i>You... literal-minded... PRICK!</i>\" it howls, rounding on you with furious venom and making you flinch.  \"<i>First of all, you're not GENDERLESS, you're UNSEXED!  Gender identity rolls up social and behavioral factors like masculine or feminine mannerisms, dress, and domestic roles; the only thing YOU are less is anything remotely USEFUL between your legs!  If you're going to be PEDANTIC, try at least to be right!</i>\"<br><br>", false);

        outputText("You quail, surprised at misguessing the character of its reaction.<br><br>", false);

        outputText("\"<i>SECOND of all,</i>\" it continues, \"<i>it occurs to me that, in your misguided zeal, you've forgotten that you, a: have BALLS, and b: have NO WAY to close your legs!  WHICH BRINGS ME TO C: TENTACLE TO THE GROIN!</i>\"<br><br>", false);

        outputText("Your eyes bulge out as one of the feelers which had been still during your argument pulls away from your " + player.sackDescript() + " and then returns with a sharp slap; as your vision pinks over under the wave of nausea, the creature releases your legs and you collapse into what can only be assumed is a centaur fetal position.<br><br>", false);

        outputText("\"<i>Q.E.D., MOTHERFUCKER!</i>\" it shouts, gesticulating in the air wildly with its tentacles as it turns and clumps back into the dense brush.", false);
    }
    player.changeHP(-5);
    if (inCombat()) cleanupAfterCombat();
    else doNext(Camp.returnToCampUseOneHour);
};

//Genderless Naga Loss Scenes
TentacleBeastScene.nagaLossGenderless = function() {
    clearOutput();
    // TODO spriteSelect(100);
    outputText("Out of nowhere tentacles bind your arms and tail, holding you firm in a matter of seconds.  You struggle to free yourself but can do nothing against the strength of the beast holding you in your current state.  More of the appendages start teasing around your body, as if looking for something.  A handful test the entrance to your " + player.assholeDescript() + " but evidently that's not what they're after.<br><br>", false);

    outputText("An oddly human voice comes from the undergrowth, catching you off-guard.  \"<i>Look, I'm really sorry about this, but I'm really not all that familiar with, uh, whatever it is you are.  Where do you keep the naughty bits?</i>\"<br><br>", false);

    outputText("A little stunned by the question, you tell the voice that you don't have any \"<i>naughty bits</i>\".<br><br>", false);

    outputText("\"<i>I'm sorry, maybe I just worded the question badly.  Um, where do you keep your penis... esss and or vagina... ssss.</i>\"  The words are followed up by prolonged hisses that may or may not represent the usual attempt to transmute one language to another by tacking new suffixes on.<br><br>", false);

    outputText("Sensing an opportunity to get out of this situation, you respond with your own series of hisses and hand gestures as if to say you have no idea what the beast wants.  It responds with a sigh and you're released from its grip, landing on the ground in a bit of a heap.<br><br>", false);

    outputText("\"<i>Fucking tourists.</i>\"  It slams its tentacles down in a brutal blow, knocking you out.", false);
    player.changeHP(-15);
    if (inCombat()) cleanupAfterCombat();
    else doNext(Camp.returnToCampUseOneHour);
};

//Genderless Goo Loss Scene
TentacleBeastScene.gooLossGenderless = function() {
    clearOutput();
// TODO spriteSelect(100);
    outputText("All of a sudden, tentacles come whipping out of the undergrowth to grab you.  Though, they're moving a little too fast, and manage to compress your body walls so far together that you're almost squeezed in half.<br><br>", false);

    outputText("\"<i>SHIT. SHIT. SHIT. SHIT.</i>\"  An oddly human voice is profaning loudly.  \"<i>Are you dead?</i>\"<br><br>", false);

    outputText("You respond that you are not, you're just mostly liquid and insubstantial.<br><br>", false);

    outputText("\"<i>Uh huh... that so?  Well, so long as you have some substantial naughty bits, I'll be happy.</i>\"<br><br>", false);

    outputText("There's an awkward silence.<br><br>", false);

    outputText("\"<i>You haven't got anything, have you?</i>\"<br><br>", false);

    outputText("You shake your head.<br><br>", false);

    outputText("\"<i>Well, fuck.</i>\"  A tentacle pokes you and you'd guess the beast is watching you jiggle as it chuckles.  \"<i>Maybe this isn't a total waste. I wonder, what do you taste like?</i>\"<br><br>", false);

    outputText("One of the larger tentacles extends and latches onto your base, its anus-like opening sucking gently at your gooey mass.  There follows a brief moment where you're not really afraid of the situation, but are instead mildly curious yourself what you taste like.<br><br>", false);

    outputText("\"<i>FUCK!</i>\" comes the voice again.  \"<i>You're sour apple!  I fucking HATE sour apple!</i>\"<br><br>", false);

    outputText("It slams its tentacles down in a brutal blow, knocking you out.", false);
    player.changeHP(-15);
    if (inCombat()) cleanupAfterCombat();
    else doNext(Camp.returnToCampUseOneHour);
};

//Start of Bad End
TentacleBeastScene.futaTentacleBadEnd = function() {
    clearOutput();
    // TODO spriteSelect(100);
    outputText("Having repeatedly been ravaged by the tentacle beast in your travels, you surrender yourself to yet another savage session of forced pleasure. However, the beast lunges forward with its great maw open. Utterly surprised, you do not have time to react before the creature's tentacles seize you and swallow you whole!!!<br><br>", false);
    outputText("The last rays of light fade as the creature closes its beak, trapping you inside. You begin flailing and fighting in sheer panic at the prospect of being eaten alive. As you struggle, countless tentacles wrap around your arms and legs, essentially binding you inside the creature. A thick tentacle forces its way down your mouth and you feel the familiar sensation of salty lust being emptied into your mouth. Your " + player.cockDescript(0) + " instantly becomes erect, triggering a tentacle to encapsulate your member completely. As this occurs, another limb buries itself deep within your ass.<br><br>", false);
    outputText("The beast then begins to milk your dick as fiercely as it ever has been in your entire life. You feel as if your prick will be ripped from your crotch as you immediately climax, dumping load after load of your semen into the horror. Your ejaculations only make the beast milk you harder, prompting an almost constant orgasmic cycle. After awhile, the shock and pain subside as you become utterly drunk off the sensation of the constant stream of cock milk you are producing.<br><br>", false);
    outputText("In your last moments of lucidity, you realize that you are not being eaten or technically harmed at all. The creature has bonded with you as a living producer of food.  As long as you are healthy and cumming, it has all the food it could ever possibly want... so long as your gonads hold out.<br><br>", false);
    outputText("You pass out, only to awaken briefly to the constant sensation of semen flowing out of your body.  Were it not for the tentacle force-feeding you, you would weakly moan with pleasure at the feeling of constant orgasm.  You slip in and out of consciousness countless times. When lucid, you can only enjoy the fact you are STILL blowing a load.<br><br>", false);
    outputText("However, you become lucid once and notice that you are no longer cumming. In fact, you feel a harsh warmth all over your body. Blinding light pierces you despite having your eyes closed. You also notice the absence of the tentacle from both your mouth and your ass. You also hear voices, yet you cannot make them out. A sharp, acrid smell invades your nostrils, rousing you to full wakefullness. You feel terribly weak and the light still prevents you from opening your eyes. However, for the most part, you are awake and cognizant of your environment.", false);
    //Goto rape #2
    doNext(TentacleBeastScene.futaTentacleEpilogue);
};

// End of bad end
TentacleBeastScene.futaTentacleEpilogue = function() {
    clearOutput();
    //spriteSelect(100);
    //[Met Giacomo at least once]
    if (gameFlags[GIACOMO_MET] > 0) {
        outputText("\"<i>Well, well, well. You aren't a total loss, I see.</i>\", says a sharp, masculine voice.<br><br>", false);
        outputText("While the fog of your brain has yet to lift completely, you recognize the voice to be the seedy merchant, Giacomo.<br><br>", false);
        outputText("\"<i>It is a good thing I happened to be out and about today.</i>\", Giacomo says. \"<i>I was testing out a new weapon to sell and I happened to see one of those nasty tentacle beasties. I had no idea they captured prey! Hell, you must have spent a few months inside that thing feeding it!</i>\"<br><br>", false);
        outputText("You attempt to say something, only to find yourself incapable of speaking. You feel the man's bony hands pick you up and set you down in what feels like his cart.<br><br>", false);
        outputText("\"<i>Well, I can't be a total bastard all the time.</i>\", Giacomo jingles. \"<i>I guess I can drop you off at the next village I come to so you can recover. Isn't that absolutely nice of me! Even better! I will do this for free!!!</i>\"<br><br>", false);
        outputText("Giacomo giggles to himself at his cheaply bought humanitarianism. A part of you dreads what is to happen next as nothing about the merchant ever struck you as trustworthy. However, a day or so later, true to his word, he leaves you at the clinic in the first town he comes to. Your recovery takes the better part of the year. The healers and apothecaries purge you of all of your corruptions, save your transgendered status. However, the sheer stress on your body has effectively ended your adventuring lifestyle and you resign yourself to settle down to a comparatively mundane existence, broken by the occasional tryst with a villager curious about your genitalia.", false);
    }
    //[Never met Giacomo]
    else {
        outputText("\"<i>Will " + player.mf("he", "she") + " live?</i>\", says a soft and feminine voice.<br><br>", false);
        outputText("\"<i>Yes, doctor. " + player.mf("He", "She") + " will live.</i>\", replies a gruff and clearly masculine voice.<br><br>", false);
        outputText("\"<i>Is the beast dead</i>\", queries the doctor.<br><br>", false);
        outputText("\"<i>Dead several times over, madam.</i>\", answers the man.<br><br>", false);
        outputText("\"<i>We cannot leave this unfortunate " + player.mf("man", "woman") + " out in the wild like this. Load " + player.mf("him", "her") + " onto the wagon. We will take " + player.mf("him", "her") + " back to the village. I am certain I can help this " + player.mf("man", "woman") + " recover.</i>\", the doctor states flatly.<br><br>", false);
        outputText("Strong masculine hands easily lift your atrophied body and place you on a wooden slab. You feel the shaking of a cart as its movement assaults your stunted senses. After a while you notice the cart stops as it arrives at its destination. A cacophony of voices talk over one another as you feel a half a dozen people move you to what can only be a clinic. Many of the voices talk constantly as you are examined and various medicines are applied to you exhausted body. Your vision returns in a day or so, revealing that you are in a hospital and laborious effort from the staff allowed for your revival.<br><br>", false);
        outputText("Your recovery takes the better part of the year. The healers and apothecaries purge you of all of your corruptions, save your transgendered status. However, the sheer stress on your body has effectively ended your adventuring lifestyle and you resign yourself to settle down to a comparatively mundane existence, broken by the occasional tryst with a villager curious about your genitalia, which you are more than happy to display.", false);
    }
    gameOver();
};

// Start a Tentacle Beast combat
TentacleBeastScene.startTentacleBeastCombat = function() {
    startCombat(new TentacleBeast());
    playerMenu();
};

//TODO Entice Command Special Response
/*
private function tentacleEntice():void {
    //Spoiler for Entice Attack Male/Herm: 
    if (player.gender == 1 || player.gender == 3) {
    if (rand(2) == 0) {
        outputText("In an effort to distract the creature, you begin gyrating your hips and swinging your penis in a shameless imitation of MeatSpin. The Tentacled Horror briefly pauses to observe your actions and rears similar to a posturing spider, considering your next actions.<br><br>", false);
        monster.lust += 10 + rand(5);
    }
    //Failure:
    else
        outputText("You grab your penis and shake it feverishly at the creature in order to distract it.  It swats a tentacle at you, forcing you to adroitly dodge the reprisal.  Apparently, the beast found you unimpressive.<br><br>", false);
}
//Spoiler for Entice Attack-Female: 
else {
    //Success:
    if (rand(2) == 0) {
        //GENDERLEZZ
        if (player.gender == 0) outputText("You brazenly turn your back on the creature and, glancing over your shoulder, begin bending over and presenting your " + player.buttDescript() + " to the beast. It pauses and observes while you bend over further, presenting a full view of both your back door and your " + player.assholeDescript() + ". You shift from side to side and observe the beast match your movements. You have obtained its attention to say the least.<br><br>", false);
        //CHICKS
        else outputText("You brazenly turn your back on the creature and, glancing over your shoulder, begin bending over and presenting your " + player.buttDescript() + " to the beast. It pauses and observes while you bend over further, presenting a full view of both your back door and your honey hole. You shift from side to side and observe the beast match your movements. You have obtained its attention to say the least.<br><br>", false);
        monster.lust += 10 + rand(5);
    }
    //Failure
    else {
        outputText("You begin shaking your hips and grabbing your " + player.allBreastsDescript() + " to distract the creature. However, the near-miss from the tentacle it attempted to swat you with convinces you of its desire to beat your ass, rather than fuck it.<br><br>", false);
    }
}
combat.combatRoundOver();
}
*/

