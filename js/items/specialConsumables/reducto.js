/**
 * Originally Created by aimozg on 11.01.14.
 */

var Reducto = [];

ConsumableEffects.reductoMenu = function() {
    menu();
    if (player.balls > 0 && player.ballSize > 1) addButton(0, "Balls", Reducto.reductoBalls);
    if (player.breastRows.length > 0 && player.biggestTitSize() > 0) addButton(1, "Breasts", Reducto.reductoBreasts);
    if (player.buttRating > 1) addButton(2, "Butt", Reducto.reductoButt);
    if (player.vaginas.length > 0 && player.clitLength > 0.25) addButton(3, "Clit", Reducto.reductoClit);
    if (player.cockTotal() > 0 && player.biggestCockArea() > 6) addButton(4, "Cock", Reducto.reductoCock);
    if (player.hipRating > 2) addButton(5, "Hips", Reducto.reductoHips);
    if (player.nippleLength > 0.25) addButton(6, "Nipples", Reducto.reductoNipples);
    if (player.horns > 2) addButton(7, "Horns", Reducto.shrinkHorns);
    addButton(14, "Nevermind", cancelReducto);
    clearOutput();
    outputText("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
};

function cancelReducto() {
    clearOutput();
    outputText("You put the salve away.<br><br>");
    Inventory.takeItem();
};

Reducto.reductoBalls = function() {
    clearOutput();
    outputText("You smear the foul-smelling paste onto your " + player.sackDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
    player.ballSize -= rand(4) + 2;
    if (player.ballSize < 1) player.ballSize = 1;
    outputText("You feel your scrotum shift, shrinking down along with your " + player.ballsDescriptLight() + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
    player.dynStats("lib", -2);
    player.changeLust(-10);
    Inventory.itemGoNext();
};

Reducto.reductoBreasts = function() {
    clearOutput();
    outputText("You smear the foul-smelling ointment all over your " + player.allBreastsDescript() + ", covering them entirely as the paste begins to get absorbed into your " + player.skinDesc + ".\n");
    player.shrinkTits(true);
    if (rand(2) == 0 && player.biggestTitSize() >= 1) {
        outputText("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
        player.shrinkTits(true);
    }
    outputText("\nThe last of it wicks away into your skin, completing the changes.");
    player.dynStats("sen", -2);
    player.changeLust(-5);
    Inventory.itemGoNext();
};

Reducto.reductoButt = function() {
    clearOutput();
    outputText("You smear the foul-smelling paste onto your " + player.buttDescript() + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
    if (player.buttRating >= 15) {
        player.buttRating -= (3 + (player.buttRating / 3));
        outputText("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
    }
    else if (player.buttRating >= 10) {
        player.buttRating -= 3;
        outputText("You feel much lighter as your " + player.buttDescript() + " jiggles slightly, adjusting to its smaller size.");
    }
    else {
        player.buttRating -= rand(3) + 1;
        if (player.buttRating < 1) player.buttRating = 1;
        outputText("After a few seconds your " + player.buttDescript() + " has shrunk to a much smaller size!");
    }
    player.dynStats("lib", -2);
    player.changeLust(-10);
    Inventory.itemGoNext();
};

Reducto.reductoClit = function() {
    clearOutput();
    outputText("You carefully apply the paste to your " + player.clitDescript() + ", being very careful to avoid getting it on your " + player.vaginaDescript(0) + ".  It burns with heat as it begins to make its effects known...\n\n");
    player.clitLength /= 1.7;
//Set clit length down to 2 digits in length
    player.clitLength = (player.clitLength * 100) / 100;
    outputText("Your " + player.clitDescript() + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
    player.dynStats("sen", 2);
    player.changeLust(10);
    Inventory.itemGoNext();
};

Reducto.reductoCock = function() {
    clearOutput();
    if (player.cocks[0].cockType == CockTypesEnum.BEE) {
        outputText("The gel produces an odd effect when you rub it into your " + player.cockDescript(0) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + player.cockDescript(0) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
        player.cocks[0].cockType = CockTypesEnum.HUMAN;
    }
    else {
        outputText("You smear the repulsive smelling paste over your " + player.multiCockDescriptLight() + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + player.multiCockDescriptLight() + " begins to shrink.\n\n");
        if (player.cocks.length == 1) {
            outputText("Your " + player.cockDescript(0) + " twitches as it shrinks, disappearing steadily into your " + (player.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
            player.cocks[0].cockLength *= 2 / 3;
            player.cocks[0].cockThickness *= 2 / 3;
        }
        else { //MULTI
            outputText("Your " + player.multiCockDescriptLight() + " twitch and shrink, each member steadily disappearing into your " + (player.hasSheath() ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
            for (var i = 0; i < player.cocks.length; i++)
            {
                player.cocks[i].cockLength *= 2 / 3;
                player.cocks[i].cockThickness *= 2 / 3;
            }
        }
    }
    player.dynStats("sen", -2);
    player.changeLust(-10);
    Inventory.itemGoNext();
};

Reducto.reductoHips = function() {
    clearOutput();
    outputText("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
    if (player.hipRating >= 15) {
        player.hipRating -= (3 + (player.hipRating / 3));
        outputText("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
    }
    else if (player.hipRating >= 10) {
        player.hipRating -= 3;
        outputText("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
    }
    else {
        player.hipRating -= rand(3) + 1;
        if (player.hipRating < 1) player.hipRating = 1;
        outputText("After a few seconds your [hips] have shrunk to a much smaller size!");
    }
    player.dynStats("lib", -2);
    player.changeLust(-10);
    Inventory.itemGoNext();
};

Reducto.reductoNipples = function() {
    clearOutput();
    outputText("You rub the paste evenly over your " + player.nippleDescript(0) + "s, being sure to cover them completely.\n\n");
//Shrink
    if (player.nippleLength / 2 < 0.25) {
        outputText("Your nipples continue to shrink down until they stop at 1/4\" long.");
        player.nippleLength = 0.25;
    }
    else {
        outputText("Your " + player.nippleDescript(0) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
        player.nippleLength /= 2;
    }
    player.dynStats("sen", -5);
    player.changeLust(-5);
    Inventory.itemGoNext();
};

Reducto.shrinkHorns = function() {
    outputText("You doubt if the reducto is going to work but you apply the foul-smelling paste all over your horns anyways.\n\n");
    outputText("Incredibly, it works and you can feel your horns receding by an inch.")
    player.horns -= 1;
    Inventory.itemGoNext();
};