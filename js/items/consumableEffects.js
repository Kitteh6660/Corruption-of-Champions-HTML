ConsumableEffects = [];

addToGameFlags(TIMES_TRANSFORMED, HAIR_GROWTH_STOPPED_BECAUSE_LIZARD);



//Fish Fillet
ConsumableEffects.fishFillet = function() {
    clearOutput();
    if (!inCombat) outputText("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
    //(In combat?)
    else outputText("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.  ");
    //Blew up factory
    if (gameFlags[FACTORY_SHUTDOWN] == 2) player.modStats("cor", 0.5);
    //Turned off factory
    else if (gameFlags[FACTORY_SHUTDOWN] == 1) player.modStats("cor", -0.1);
    //Normal
    else player.modStats("cor", 0.1);
    //Increase HP by quite a bit!)
    player.changeHP(Math.round(player.maxHP() * .25), true);
    player.refillHunger(30);
};

//Lactaid
ConsumableEffects.lactaid = function() {
    player.slimeFeed();
    var i = 0;
    outputText("You gulp down the bottle of lactaid, easily swallowing the creamy liquid.", true);
    //Bump up size!
    if (player.averageBreastSize() < 8) {
        outputText("<br><br>", false);
        if (player.breastRows.length == 1) player.growTits((1 + rand(5)), 1, true, 1);
        else player.growTits(1 + rand(2), player.breastRows.length, true, 1);
    }
    //Player doesn't lactate
    if (player.biggestLactation() < 1) {
        outputText("<br><br>", false);
        outputText("You feel your " + player.nippleDescript(0) + "s become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>", false);
        for (i = 0; i < player.breastRows.length; i++) {
            player.breastRows[i].lactationMultiplier += 2;
        }
    }
    //Boost lactation
    else {
        outputText("<br><br>", false);
        outputText("Milk leaks from your " + player.nippleDescript(0) + "s in thick streams.  You're lactating even more!", false);
        for (i = 0; i < player.breastRows.length; i++) {
            player.breastRows[i].lactationMultiplier += 1 + rand(10) / 10;
        }
    }
    player.changeLust(10);
    if (rand(3) == 0) {
        outputText(player.modFem(95, 1), false);
    }
};

//Lust Draft
ConsumableEffects.lustDraft = function(fuck) {
    player.slimeFeed();
    outputText("You drink the ", true);
    if (fuck) outputText("red", false);
    else outputText("pink", false);
    outputText(" potion, and its unnatural warmth immediately flows to your groin. ", false);
    player.changeLust((30 + rand(player.lib / 10)), true, false, false);

    //Heat/Rut for those that can have them if "fuck draft"
    if (fuck) {
        //Try to go into intense heat.
        player.goIntoHeat(true, 2);
        //Males go into rut
        player.goIntoRut(true);
    }
    //ORGAZMO
    if (player.lust >= player.maxLust() && !inCombat) {
        outputText("<br><br>The arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your " + player.armor.equipmentName + " and look down as your ", false);
        if (player.cocks.length > 0) {
            outputText(player.multiCockDescriptLight() + " erupts in front of you, liberally spraying the ground around you.  ", false);
        }
        if (player.cocks.length > 0 && player.vaginas.length > 0) {
            outputText("At the same time your ", false);
        }
        if (player.vaginas.length > 0) {
            outputText(player.vaginaDescript(0) + " soaks your thighs.  ", false);
        }
        if (player.gender == 0) outputText("body begins to quiver with orgasmic bliss.  ", false);
        outputText("Once you've had a chance to calm down, you notice that the explosion of pleasure you just experienced has rocked you to your core.  You are a little hornier than you were before.", false);
        //increase player libido, and maybe sensitivity too?
        player.orgasm();
        player.modStats("lib", 2, "sen", 1);
    }
    if (player.lust > player.maxLust()) player.lust = player.maxLust();
    outputText("<br><br>", false);
    player.refillHunger(5);
};

//Vitality Tincture
ConsumableEffects.vitalityTincture = function() {
    player.slimeFeed();
    outputText("You down the contents of the bottle. The liquid is thick and tastes remarkably like cherries. Within moments, you feel much more fit and healthy.", true);
    //Strength changes
    var temp = rand(3);
    player.modStats("str", temp);
    //Guaranteed toughness if no str
    if (temp == 0) {
        temp = rand(3);
        if (temp == 0) temp = 1;
    }
    else temp = rand(3);
    //tou change
    player.modStats("tou", temp);
    //Chance of fitness change
    if (player.HP < player.maxHP()) {
        player.changeHP(50, true);
        outputText(" Any aches, pains and bruises you have suffered no longer hurt and you feel much better.");
    }
    if (rand(3) == 0) outputText(player.modTone(95, 3), false);
    player.refillHunger(10);
};

//Scholar's Tea
ConsumableEffects.scholarsTea = function() {
    player.slimeFeed();
    outputText("Following the merchant's instructions, you steep and drink the tea. Its sharp taste fires up your palate and in moments, you find yourself more alert and insightful. As your mind wanders, a creative, if somewhat sordid, story comes to mind. It is a shame that you do not have writing implements as you feel you could make a coin or two off what you have conceived. The strange seller was not lying about the power of the tea.");
    if (rand(3) == 0) outputText(player.modTone(15, 1), false);
    //Now NERFED!
    if (player.inte < 40) player.modStats("int", 1.5 + rand(4));
    else if (player.inte < 60) player.modStats("int", 1 + rand(3));
    else if (player.inte < 80) player.modStats("int", 0.5 + rand(2));
    else player.modStats("int", 0.2 + rand(2));
    player.refillHunger(10);
};

//Hair Dyes
ConsumableEffects.hairDye = function(newColor) {
    if (player.hairLength == 0) {
        outputText("You rub the dye into your bald head, but it has no effect.");
    }
    else if (player.hairColor.indexOf("rubbery") != -1 || player.hairColor.indexOf("latex-textured") != -1) {
        outputText("You massage the dye into your " + player.hairDescript() + " but the dye cannot penetrate the impermeable material your hair is composed of.");
    }
    else {
        outputText("You rub the dye into your " + player.hairDescript() + ", then use a bucket of cool lakewater to rinse clean a few minutes later. ");
        player.hairColor = newColor;
        outputText("You now have " + player.hairDescript() + ".");
        if (player.lust > 50) {
            outputText("<br><br>The cool water calms your urges somewhat, letting you think more clearly. ");
            player.changeLust(-15, true);
        }
    }
};

//Skin Oils
ConsumableEffects.skinOil = function(newColor) {
    if (player.skinTone == newColor) {
        outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the bottle of oil and rubbing", "uncork the bottle of oil and rub") + " the smooth liquid across your body. Once you’ve finished you feel rejuvenated. ");
        player.changeFatigue(-10, true);
    }
    else {
        if (player.skinType != 3)
            player.skinTone = newColor;
        switch(player.skinType) {
            case 0: //Plain
                outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the bottle of oil and rubbing", "uncork the bottle of oil and rub") + " the smooth liquid across your body. Even before you’ve covered your arms and [chest] your skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " + newColor + " skin.");
                break;
            case 1: //Fur
                outputText("" + player.clothedOrNaked("Once you’ve disrobed you take the oil and", "You take the oil and") + " begin massaging it into your skin despite yourself being covered with fur. Once you’ve finished... nothing happens. Then your skin begins to tingle and soon you part your fur to reveal " + newColor + " skin.");
                break;
            case 2: //Scales
                outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the bottle of oil and rubbing", "uncork the bottle of oil and rub") + " the smooth liquid across your body. Even before you’ve covered your arms and [chest] your scaly skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " + newColor + " skin.");
                break;
            case 3: //Goo
                outputText("You take the oil and pour the contents into your skin. The clear liquid dissolves, leaving your gooey skin unchanged. You do feel a little less thirsty though.");
                player.slimeFeed();
                break;
            default:
                outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the bottle of oil and rubbing", "uncork the bottle of oil and rub") + " the smooth liquid across your body. Even before you’ve covered your arms and [chest] your skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " + newColor + " skin.");
        }
    }
};

//Body Lotions
ConsumableEffects.bodyLotion = function(newAdj) {
    if (player.skinTone == newAdj) {
        outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the flask of lotion and rubbing", "uncork the flask of lotion and rub") + " the " + liquidDesc(newAdj) + " across your body. Once you’ve finished you feel reinvigorated. ");
        player.changeHP(10, true);
    }
    else {
        if (player.skinType != 3) { //If skin is goo, don't change.
            if (newAdj != "clear")
                player.skinAdj = newAdj;
            else
                player.skinAdj = "";
        }
        switch(player.skinType) {
            case 0: //Plain
                outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the flask of lotion and rubbing", "uncork the flask of lotion and rub") + " the " + liquidDesc(newAdj) + " across your body. As you rub the mixture into your arms and [chest], your whole body begins to tingle pleasantly. ");
                switch(newAdj) {
                    case "smooth":
                        outputText("Soon your skin is smoother but in a natural healthy way.");
                        break;
                    case "rough":
                        outputText("Soon your skin is rougher as if you’ve just finished a long day’s work.");
                        break;
                    case "sexy":
                        outputText("Soon your skin is so sexy you find it hard to keep your hands off yourself.");
                        break;
                    case "clear":
                        outputText("Soon the natural beauty of your " + player.skinFurScales() + " is revealed without anything extra or unnecessary.");
                        break;
                    default: //Failsafe
                        outputText("<b>This text should not happen. Please let Kitteh6660 know.</b>");
                }
                break;
            case 1: //Fur
                outputText("" + player.clothedOrNaked("Once you’ve disrobed you take the lotion and", "You take the lotion and") + " begin massaging it into your skin despite yourself being covered with fur. It takes little effort but once you’ve finished... nothing happens. A few moments pass and then your skin begins to tingle. ");
                switch(newAdj) {
                    case "smooth":
                        outputText("Soon you part your fur to reveal smooth skin that still appears natural.");
                        break;
                    case "rough":
                        outputText("Soon you part your fur to reveal rough skin that still appears natural.");
                        break;
                    case "sexy":
                        outputText("Soon you part your fur to reveal sexy skin that makes you want to kiss yourself.");
                        break;
                    case "clear":
                        outputText("Soon you part your fur to reveal the natural beauty of your " + player.skinFurScales() + " skin.");
                        break;
                    default: //Failsafe
                        outputText("<b>This text should not happen. Please let Kitteh6660 know.</b>");
                }
                break;
            case 2: //Scales
                outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the flask of lotion and rubbing", "uncork the flask of lotion and rub") + " the " + liquidDesc(newAdj) + " across your body. As you rub the mixture into your arms and [chest], your whole body begins to tingle pleasantly.");
                switch(newAdj) {
                    case "smooth":
                        outputText("Soon you part your fur to reveal smooth skin that still appears natural.");
                        break;
                    case "rough":
                        outputText("Soon you part your fur to reveal rough skin that still appears natural.");
                        break;
                    case "sexy":
                        outputText("Soon you part your fur to reveal sexy skin that makes you want to kiss yourself.");
                        break;
                    case "clear":
                        outputText("Soon you part your fur to reveal the natural beauty of your " + player.skinFurScales() + " skin.");
                        break;
                    default: //Failsafe
                        outputText("<b>This text should not happen. Please let Kitteh6660 know.</b>");
                }
                break;
            case 3: //Goo
                outputText("You take the lotion and pour the " + liquidDesc(newAdj) + " into yourself. The concoction dissolves, leaving your gooey epidermis unchanged. As a matter of fact nothing happens at all. Except that you do feel a bit reinvigorated. ");
                player.changeHP(10, true);
                break;
            default:
                outputText("You " + player.clothedOrNaked("take a second to disrobe before uncorking the bottle of oil and rubbing", "uncork the bottle of oil and rub") + " the smooth liquid across your body. Even before you’ve covered your arms and [chest] your skin begins to tingle pleasantly all over. After your skin darkens a little, it begins to change until you have " + newAdj + " skin.");
        }
    }
};

//TODO: Move to a better place.
function liquidDesc(_adj) {
    var liquidDesc = "";
    var liquidArrays = [];
    switch(_adj) {
        case "smooth":
            liquidArrays = ["smooth liquid", "thick cream"];
            break;
        case "rough":
            liquidArrays = ["abrasive goop", "rough textured goop"];
            break;
        case "sexy":
            liquidArrays = ["smooth liquid", "attractive cream", "beautiful cream"];
            break;
        case "clear":
            liquidArrays = ["smooth liquid", "thick cream"];
            break;
        default: //Failsafe
            liquidArrays = ["liquid", "cream"];
    }
    liquidDesc = liquidArrays[rand(liquidArrays.length)];
    return liquidDesc;
}

//Tattered Scroll
ConsumableEffects.tatteredScroll = function() {
    outputText("Your wobbly " + player.legs() + " give out underneath you as your body's willpower seems to evaporate, your mouth reading the words on the scroll with a backwards sounding sing-song voice.<br><br>");

    if (player.hairColor == "sandy blonde") {
        outputText("Your mouth forms a smile of its own volition, reading, \"<i>Tresed eht retaw llahs klim ruoy.</i>\"<br><br>", false);
        if (player.breastRows.length == 0 || player.biggestTitSize() == 0) {
            outputText("You grow a perfectly rounded pair of C-cup breasts!  ", false);
            if (player.breastRows.length == 0) player.createBreastRow();
            player.breastRows[0].breasts = 2;
            player.breastRows[0].breastRating = 3;
            if (player.breastRows[0].nipplesPerBreast < 1) player.breastRows[0].nipplesPerBreast = 1;
            player.dynStats("sen", 2);
            player.changeLust(1);
        }
        if (player.biggestTitSize() > 0 && player.biggestTitSize() < 3) {
            outputText("Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.  ", false);
            player.breastRows[0].breastRating = 3;
            player.dynStats("sen", 1);
            player.changeLust(1);
        }
        if (player.averageNipplesPerBreast() < 1) {
            outputText("A dark spot appears on each breast, rapidly forming into a sensitive nipple.  ", false);
            var temp = player.breastRows.length;
            while (temp > 0) {
                temp--;
                //If that breast didnt have nipples reset length
                if (player.breastRows[0].nipplesPerBreast < 1) player.breastRows[0].nippleLength = .2;
                player.breastRows[0].nipplesPerBreast = 1;
            }
            player.dynStats("sen", 2);
            player.changeLust(1);
        }
        if (player.biggestLactation() > 0) {
            outputText("A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ", false);
            if (player.biggestLactation() < 2) outputText("powerful jets of milk spray from your nipples, spraying thick streams over the ground.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ", false);
            if (player.biggestLactation() >= 2 && player.biggestLactation() <= 2.6) outputText("eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ", false);
            if (player.biggestLactation() > 2.6 && player.biggestLactation() < 3) outputText("thick hoses of milk erupt from your aching nipples, forming puddles on the ground.  You smile at how well you're feeding the earth, your milk coating the ground faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, your hands completely out of control.  In time you realize the milk has stopped, and even had time to soak into the dirt.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ", false);

            if (player.biggestLactation() >= 3) outputText("you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down a hill in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the ground all of your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ", false);
            if (player.biggestLactation() < 3) {
                player.boostLactation(.7);
                outputText("Your breasts feel fuller... riper... like your next milking could be even bigger.  ", false);
            }
            player.dynStats("lib", 1, "sen", 4);
            player.changeLust(15);
        }
        if (player.biggestLactation() == 0) {
            outputText("A pleasurable release suddenly erupts from your nipples!  Twin streams of milk are spraying from your breasts, soaking into the ground immediately.  It stops all too soon, though a voice in your head assures you that you can lactate quite often now.  ", false);
            player.boostLactation(1);
            player.dynStats("lib", .5, "sen", 1);
            player.changeLust(10);

        }
        outputText("<br><br>Your mouth curls into a sick smile and, with a voice that isn't your own, speaks, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
        doNext(Camp.returnToCampUseOneHour);
    }
    else {
        outputText("Your mouth forms a smile of its own volition, reading, \"<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>\"<br><br>You feel a tingling in your scalp, and realize your hair has become a sandy blonde!", false);
        player.hairColor = "sandy blonde";
        outputText("<br><br>Your mouth curls with a sick smile, speaking with a voice that isn't your own, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
        doNext(Camp.returnToCampUseOneHour);
    }
    // Using Tattered Scroll in Combat
    /*
     if (!kGAMECLASS.inCombat) {
     //RAEP
     spriteSelect(50);
     outputText("<br><br>You hear the soft impact of clothes hitting the ground behind you, and turn to see that the sand witch has found you! You cannot resist a peek at your uninvited guest, beholding a curvy dark-skinned beauty, her form dominated by a quartet of lactating breasts.  Somewhere in your lust-fogged mind you register the top two as something close to double-Ds, and her lower pair to be about Cs.  She smiles and leans over you, pushing you to the ground violently.<br><br>She turns around and drops, planting her slick honey-pot firmly against your mouth.  Her scent is strong, overpowering in its intensity.  Your tongue darts out for a taste and finds a treasure trove of sticky sweetness.  Instinctively you tongue-fuck her, greedily devouring her cunny-juice, shoving your tongue in as far as possible while suckling her clit.  Dimly you feel the milk spattering over you, splashing off you and into the cracked earth.  Everywhere the milk touches feels silky smooth and sensitive, and your hands begin stroking your body, rubbing it in as the witch sprays more and more of it.  You lose track of time, orgasming many times, slick and sticky with sexual fluids.", false);
     player.orgasm();
     dynStats("lib", 1, "sen", 5);
     player.slimeFeed();
     }*/
};

// Black Book
ConsumableEffects.blackSpellbook = function() {
    outputText("You open the small black book, and discover it to be an instructional book on the use of black magic.  Most of it is filled with generic information about black magic - how it is drawn from emotions (typically lust), and how it has the power to affect bodies and emotions.  It also warns against using it on oneself, as it is difficult to draw on your emotions while meddling with your own body.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.", true);
    if (player.inte < 30) {
        outputText("<br><br>You feel greatly enlightened by your time spent reading.", false);
        player.dynStats("int", 4);
    }
    else if (player.inte < 60) {
        outputText("<br><br>Spending some time reading was probably good for you, and you definitely feel smarter for it.", false);
        player.dynStats("int", 2);
    }
    else if (player.inte < 80) {
        outputText("<br><br>After reading the small tome your already quick mind feels invigorated.", false);
        player.dynStats("int", 1);
    }
    else {
        outputText("<br><br>The contents of the book did little for your already considerable intellect.", false);
        player.dynStats("int", .6);
    }
//Smart enough for arouse and doesnt have it
    if (player.inte >= 25 && player.spells.arouse == 0) {
        outputText("<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Arouse.</b>", false);
        player.spells.arouse = true;
        return;
    }
//Smart enough for arouse and doesnt have it
    if (player.inte >= 30 && player.spells.heal == 0) {
        outputText("<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Heal.</b>", false);
        player.spells.heal = true;
        return;
    }
//Smart enough for arouse and doesnt have it
    if (player.inte >= 40 && player.spells.might == 0) {
        outputText("<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Might.</b>", false);
        player.spells.might = true;
    }
};

// White Book
ConsumableEffects.whiteSpellBook = function() {
    outputText("You open the white tome, and discover it to be an instructional book on the use of white magic.  Most of it is filled with generic information about white magic - how it is drawn for mental focus, is difficult to use when tired or aroused, and can be used to create and control energy.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.", true);
    if (player.inte < 30) {
        outputText("<br><br>You feel greatly enlightened by your time spent reading.", false);
        player.dynStats("int", 4);
    }
    else if (player.inte < 60) {
        outputText("<br><br>Spending some time reading was probably good for you, and you definitely feel smarter for it.", false);
        player.dynStats("int", 2);
    }
    else if (player.inte < 80) {
        outputText("<br><br>After reading the small tome your already quick mind feels invigorated.", false);
        player.dynStats("int", 1);
    }
    else {
        outputText("<br><br>The contents of the book did little for your already considerable intellect.", false);
        player.dynStats("int", .6);
    }
    //Smart enough for arouse and doesnt have it
    if (player.inte >= 25 && player.spells.chargeWeapon == 0) {
        outputText("<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Charge Weapon.</b>", false);
        player.spells.chargeWeapon = true;
        return;
    }
    //Smart enough for arouse and doesnt have it
    if (player.inte >= 30 && player.spells.chargeWeapon == 0) {
        outputText("<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Blind.</b>", false);
        player.spells.blind = true;
        return;
    }
    //Smart enough for arouse and doesnt have it
    if (player.inte >= 40 && player.spells.whitefire == 0) {
        outputText("<br><br>You blink in surprise, assaulted by the knowledge of a <b>new spell: Whitefire.</b>", false);
        player.spells.whitefire = true;
    }
};

// Minotaur Cum
ConsumableEffects.minotaurCum = function(purified) {
    player.slimeFeed();
    clearOutput();
    //Minotaur cum addiction
    if (!purified) player.minoCumAddiction(7);
    else player.minoCumAddiction(-2);
    outputText("As soon as you crack the seal on the bottled white fluid, a ", false);
    if (gameFlags[MINOTAUR_CUM_ADDICTION_STATE] == 0 && player.findPerk(PerkLib.MinotaurCumResistance) < 0) outputText("potent musk washes over you.", false);
    else outputText("heavenly scent fills your nostrils.", false);
    if (!purified) {
        if (gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] < 50) outputText("  It makes you feel dizzy, ditzy, and placid.", false);
        else outputText("  It makes you feel euphoric, happy, and willing to do ANYTHING to keep feeling this way.", false);
    }
    else outputText("  You know that the bottle is purified and you're positive you won't get any addiction from this bottle.");
    outputText("  Unbidden, your hand brings the bottle to your lips, and the heady taste fills your mouth as you convulsively swallow the entire bottle.", false);
    //-Raises lust by 10.
    //-Raises sensitivity
    player.dynStats("sen", 1);
    player.changeLust(10);
    //-Raises corruption by 1 to 50, then by .5 to 75, then by .25 to 100.
    if (!purified) {
        if (player.cor < 50) player.dynStats("cor", 1);
        else if (player.cor < 75) player.dynStats("cor", .5);
        else player.dynStats("cor", .25);
    }
    outputText("<br><br>Intermittent waves of numbness wash through your body, turning into a warm tingling that makes you feel sensitive all over.  The warmth flows through you, converging in your loins and bubbling up into lust.", false);
    if (player.cocks.length > 0) {
        outputText("  ", false);
        if (player.cockTotal() == 1) outputText("Y", false);
        else outputText("Each of y", false);
        outputText("our " + player.multiCockDescriptLight() + " aches, flooding with blood until it's bloating and trembling.", false);
    }
    if (player.hasVagina()) {
        outputText("  Your " + player.clitDescript() + " engorges, ", false);
        if (player.clitLength < 3) outputText("parting your lips.", false);
        else outputText("bursting free of your lips and bobbing under its own weight.", false);
        if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_NORMAL) outputText("  Wetness builds inside you as your " + player.vaginaDescript(0) + " tingles and aches to be filled.", false);
        else if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_SLICK) outputText("  A trickle of wetness escapes your " + player.vaginaDescript(0) + " as your body reacts to the desire burning inside you.", false);
        else if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_DROOLING) outputText("  Wet fluids leak down your thighs as your body reacts to this new stimulus.", false);
        else outputText("  Slick fluids soak your thighs as your body reacts to this new stimulus.", false);
    }
    //(Minotaur fantasy)
    if (!inCombat() == true && rand(10) == 1 && (!purified && player.findPerk(PerkLib.MinotaurCumResistance) < 0)) {
        outputText("<br><br>Your eyes flutter closed for a second as a fantasy violates your mind.  You're on your knees, prostrate before a minotaur.  Its narcotic scent fills the air around you, and you're swaying back and forth with your belly already sloshing and full of spunk.  Its equine-like member is rubbing over your face, and you submit to the beast, stretching your jaw wide to take its sweaty, glistening girth inside you.  Your tongue quivers happily as you begin sucking and slurping, swallowing each drop of pre-cum you entice from the beastly erection.  Gurgling happily, you give yourself to your inhuman master for a chance to swallow into unthinking bliss.", false);
        player.dynStats("lib", 1);
        player.changeLust(rand(5) + player.cor / 20 + gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] / 5);
    }
    //(Healing – if hurt and uber-addicted (hasperk))
    if (player.HP < player.maxHP() && player.findPerk(PerkLib.MinotaurCumAddict) >= 0) {
        outputText("<br><br>The fire of your arousal consumes your body, leaving vitality in its wake.  You feel much better!", false);
        player.changeHP(player.maxHP() / 4, false);
    }
    //Uber-addicted status!
    if (player.findPerk(PerkLib.MinotaurCumAddict) >= 0 && gameFlags[MINOTAUR_CUM_REALLY_ADDICTED_STATE] <= 0 && !purified) {
        gameFlags[MINOTAUR_CUM_REALLY_ADDICTED_STATE] = 3 + rand(2);
        outputText("<br><br><b>Your body feels so amazing and sensitive.  Experimentally you pinch yourself and discover that even pain is turning you on!</b>", false);
    }
    //Clear mind a bit
    if (purified && (player.findPerk(PerkLib.MinotaurCumAddict) >= 0 || gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] >= 40)) {
        outputText("<br><br>Your mind feels a bit clearer just from drinking the purified minotaur cum. Maybe if you drink more of these, you'll be able to rid yourself of your addiction?");
        if (player.findPerk(PerkLib.MinotaurCumAddict) >= 0 && gameFlags[MINOTAUR_CUM_ADDICTION_TRACKER] <= 50) {
            outputText("  Suddenly, you black out and images flash in your mind about getting abducted by minotaurs and the abandonment of your quest that eventually leads to Lethice's success in taking over Mareth. No, it cannot be! You wake up and recover from the blackout, horrified to find out what would really happen if you spend the rest of your life with the Minotaurs! You shake your head and realize that you're no longer dependent on the cum.  ");
            outputText("<br><b>(Lost Perk: Minotaur Cum Addict!)</b>");
            player.removePerk(PerkLib.MinotaurCumAddict);
        }

    }
    player.refillHunger(25);
};