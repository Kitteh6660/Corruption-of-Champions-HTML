MarbleScene = [];

addToGameFlags(MARBLE_MET, MARBLE_ADDICTION, MARBLE_AFFECTION, MARBLE_WARNING, NO_MORE_MARBLE, MARBLE_RAPE_ATTEMPTED, MURBLE_FARM_TALK_LEVELS);

MarbleScene.marbleStatusChange = function(affection, addiction, isAddicted) {
    if (isAddicted == undefined) isAddicted = -1;
    //Values only change if not brought to conclusion
    if (player.findPerk(PerkLib.MarblesMilk) < 0 && player.findPerk(PerkLib.MarbleResistant) < 0) {
        gameFlags[MARBLE_AFFECTION] += affection;
        gameFlags[MARBLE_ADDICTION] += addiction;
    }
    //if (isAddicted != -1) player.changeStatusValue(StatusEffects.Marble, 3, isAddicted);
}

MarbleScene.applyMarblesMilk = function() {
    player.slimeFeed();
    /*var str = 5;
    var tou = 10;
    //Marble's milk - effect
    //Increases player toughness by 10 and strength by 5 for several hours (suggest 12).
    if (player.findStatusEffect(StatusEffects.MarblesMilk) < 0) {
        player.createStatusEffect(StatusEffects.MarblesMilk,12,0,0,0);
        if (player.str + 5 > 100) {
            str = 100 - player.str;
            if (str < 0) str = 0;
        }
        if (player.tou + 10 > 100) {
            tou = 100 - player.tou;
            if (tou < 0) tou = 0;
        }
        dynStats("str", str,"tou", tou);
        player.changeStatusValue(StatusEffects.MarblesMilk,2,str);
        player.changeStatusValue(StatusEffects.MarblesMilk,3,tou);
    }
    else {
        player.addStatusValue(StatusEffects.MarblesMilk,1,12);
    }
    //Prevent duration from going to high.
    if (player.statusEffectv1(StatusEffects.MarblesMilk) > 36) player.changeStatusValue(StatusEffects.MarblesMilk,1,36);
    //Remove withdrawl if applicable
    if (player.findStatusEffect(StatusEffects.MarbleWithdrawl) >= 0) {
        player.removeStatusEffect(StatusEffects.MarbleWithdrawl);
        dynStats("tou", 5, "int", 5);
    }*/
    //The message for the effect wearing off varies depends on your addiction level.
    //If the player is addicted to her milk, they gain the withdrawal effect when it wears off, reducing player's inte and tou by 5
    //Gaining the effect while they are in withdrawal removes the effect.
    //The player becomes addicted when the addiction score crosses over 50 and they drink directly from Marble's teat, they remain addicted until it drops under 25.
}

/*MarbleScene.encounterMarbleInitially = function() {
    clearOutput();
    displaySprite("marble");
    gameFlags[MARBLE_MET] = 0.5;
    
    outputText("While exploring at Whitney's farm, you run across the furry southern belle almost immediately. She looks like she has a job for you.<br><br>");
    outputText("Whitney tells you that one of her barn's residents, a cow-girl named Marble, is sore from overusing the milk machines.  She asks you to go and give the cow-girl a gentler touch from a living being.<br><br>");
    //(description of barn may need to be edited, I don't know what it's supposed to look like)
    outputText("You walk in to Whitney's barn and head over to a series of small rooms for the cow-girls. You find Marble's room and knock on the door. A friendly earthy female voice calls out in response and invites you in. Inside is a rather pleasant little room. There are several shelves on the walls and a small sitting table in the corner with seating for two.  A large portion of the room is dominated by a large bed, the owner filling most of it. Lastly, you notice a mini-dresser next to the bed.  The room's owner looks over at you and starts, \"<i>Oh, I've never met you before.</i>\"\n\nAs she gets up, you are given a chance to get a good look at her.  She is over six feet tall, with long brown hair tipped with two cow horns and a pair of cow ears in place of normal human ones.  Rounding out her relatively unchanged face are a pair of deep, brown eyes.  She is wearing only a short plain skirt, so you get a full frontal view of her two HH-cup assets. They look rather sore right now, with big red circles around her puffy nipples.  Her hands and arms appear mostly human save for thick-looking nails. A soft 'clop' brings your eyes down to see that she is covered in thick, dark blond fur going from at least mid-way down her thighs to where a human's feet normally would be, in place of which are hooves.  A cow tail with a bow tied on it swings between her legs.<br><br>");
    if (gameFlags[CODEX_ENTRY_LABOVINES] <= 0) {
        gameFlags[CODEX_ENTRY_LABOVINES] = 1;
        outputText("<b>New codex entry unlocked: Lacta Bovines/Cowgirl!</b>\n\n")
    }
    //(if player height is under 5 feet)
    if (player.tallness < 60) {
        outputText("She looks down at you with a smile and says \"<i>Aww, you're so cute!  Did you come for my milk?  I'm always happy to give it, but since I'm kinda sore right now, you'll have to be gentle. Okay little one?</i>\"  She moves towards you and tries to pick you up.");
        //- player chooses resist or don't resist
        menu();
        addButton(0, "Let Her", MarbleScene.marblePicksYouUpInitially);
        addButton(1, "Don't", MarbleScene.resistMarbleInitially);
        return;
    }
    outputText("\"<i>My name's Marble, what's yours?</i>\" she asks you.  You introduce yourself and exchange a few pleasantries before she asks how she can help you.  You tell her that you actually came to help her, explaining that Whitney said she could use a gentle touch.  \"<i>Oh that would be nice</i>\", she says \"<i>Spending the night connected to the milking machine was a mistake, and now I need something gentle.</i>\"  How will you help her?", false);
    outputText("\n\n(Of course, you could always turn around and resolve to avoid her from this point on, if you wanted.)");
    //- player chooses caress, suckle, or rape
    simpleChoices("Caress", caressMarble, "Suckle", suckleMarble, "Rape", rapeDAHMARBLEZ, "", null, "Leave", turnOffMarbleForever);
}

//Marble Picks You Up Choices
MarbleScene.marblePicksYouUpInitially = function() {
    clearOutput();
    //(player chose don't resist)
    clearOutput();
    outputText("She gently lifts you up and carries you over to her bed. Laying you down on her lap, she lifts your head to one of her nipples and pushes your lips against it.  She smiles and holds you there firmly as you feel a warm and delicious fluid start to fill your mouth.  Once you've had a taste of her milk, you can't help yourself and eagerly start to gulp it down.  After a little while you hear Marble sigh, \"<i>Oh sweetie, that's just what I needed.  I know it's annoying to stop for a moment, but could you do the other teat too?</i>\"  She pulls her hand back and flips you around on her lap before lifting you to her other nipple.  You don't need any encouragement this time, and start drinking eagerly without hesitation.  \"<i>Drink your fill sweetie, I know we're both enjoying this.</i>\"\n\n", false);
    player.refillHunger(30);
    //new paragraph
    outputText("Once you'd had enough, you take your mouth off her teat and lean against her chest.  Marble puts her hands around you and ", false);
    if (player.earType > EARS_HUMAN) outputText("gently scratches behind your ears.  ", false);
    else outputText("lightly caresses your head.  ", false);
    outputText("\"<i>Thanks for your gentle mouth, sweetie,</i>\"  she says, \"<i>Do you think you could tell me your name?  I'm Marble.</i>\"  You let out a soft sigh and tell her who you are and why you came to visit.  She giggles, \"<i>Don't worry sweetie, I feel much better now thanks to you.  I'm really glad I got to meet you in such a pleasant way.</i>\"  You decide that it is probably time to leave now and say your farewells to this cow-girl.  \"<i>Come back to visit me anytime; I'll look forward to seeing you again soon!</i>\" she says beaming at you.  With that, you leave the farm, feeling a strange sense of euphoria passing over you.", false);
    //(increase affection by 30)
    //(increase addiction by 10)
    marbleStatusChange(30,10);
    //(apply the stat effect 'Marble's Milk' to the player)
    applyMarblesMilk();
    doNext(camp.returnToCampUseOneHour);
}

MarbleScene.resistMarbleInitially = function() {
    clearOutput();
    //(player chose resist)
    clearOutput();
    outputText("Surprised by your resistance, she pulls back and apologizes for being presumptuous.  ", false);
    //- continue to the next part
    outputText("\"<i>My name's Marble, what's yours?</i>\" she asks you.  You introduce yourself and exchange a few pleasantries before she asks how she can help you.  You tell her that you actually came to help her, explaining that Whitney said she could use a gentle touch.  \"<i>Oh that would be nice</i>\", she says \"<i>Spending the night connected to the milking machine was a mistake, and now I need something gentle.</i>\"  How will you help her?", false);
    //- player chooses caress, suckle, or rape
    simpleChoices("Caress", caressMarble, "Suckle", suckleMarble, "Rape", rapeDAHMARBLEZ, "", null, "", null);
}*/

//Intro Choices
