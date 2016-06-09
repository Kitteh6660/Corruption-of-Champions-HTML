ConsumableEffects = [];

addToGameFlags(TIMES_TRANSFORMED, HAIR_GROWTH_STOPPED_BECAUSE_LIZARD);



//Fish Fillet
ConsumableEffects.fishFillet = function() {
    clearOutput();
    if (!inCombat) outputText("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
    //(In combat?)
    else outputText("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.  ");
    //Increase HP by quite a bit!)
    //if (gameFlags[FACTORY_SHUTDOWN] == 2) player.modStats("cor", 0.5);
    //if (gameFlags[FACTORY_SHUTDOWN] == 1) player.modStats("cor", -0.1);
    player.modStats("cor", 0.1);
    player.changeHP(Math.round(player.maxHP() * .25), true);
    player.refillHunger(30);
}

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
        outputText("\n\nThe arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your " + player.armorName + " and look down as your ", false);
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
    outputText("\n\n", false);
    player.refillHunger(5);
}

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
}

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
}

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
}

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
}

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
}

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