Areas = [];
Places = [];

Areas.GenericExploration = [];

Areas.GenericExploration.exploreMenu = function() {
    hideMenus();
    clearOutput();
    if (exploration.explored < 2) {
        Areas.GenericExploration.tryDiscover();
        return;
    }
    outputText("You can continue to search for new locations, or explore your previously discovered locations.");
    menu();
    addButton(0, "Explore", Areas.GenericExploration.tryDiscover);
    if (exploration.exploredForest > 0) addButton(1, "Forest", Areas.Forest.explore, null, null, null, "Visit the lush forest. <br><br>Recommended level: 1" + (player.level < 5 ? "<br><br>Beware of Tentacle Beasts!" : ""));
    if (exploration.exploredLake > 0) addButton(2, "Lake", Areas.Lake.explore, null, null, null, "Visit the lake and explore the beach. <br><br>Recommended level: 2");
    if (exploration.exploredDesert > 0) addButton(3, "Desert", Areas.Desert.explore, null, null, null, "Visit the dry desert. <br><br>Recommended level: 3");
    if (exploration.exploredMountain > 0) addButton(4, "Mountain", Areas.Mountain.explore, null, null, null, "Visit the mountain. <br><br>Recommended level: 5");
    addButton(14, "Back", Camp.doCamp);
}

Areas.GenericExploration.tryDiscover = function() {
    clearOutput();
    doNext(Camp.returnToCampUseOneHour);
    if (exploration.explored <= 0) {
        outputText("You tentatively step away from your campsite, alert and scanning the ground and sky for danger. You walk for the better part of an hour, marking the rocks you pass for a return trip to your camp. It worries you that the portal has an opening on this side, and it was totally unguarded...<br><br>...Wait a second, why is your campsite in front of you? The portal's glow is clearly visible from inside the tall rock formation.  Looking carefully you see your footprints leaving the opposite side of your camp, then disappearing. You look back the way you came and see your markings vanish before your eyes. The implications boggle your mind as you do your best to mull over them. Distance, direction, and geography seem to have little meaning here, yet your campsite remains exactly as you left it. A few things click into place as you realize you found your way back just as you were mentally picturing the portal! Perhaps memory influences travel here, just like time, distance, and speed would in the real world!<br><br>This won't help at all with finding new places, but at least you can get back to camp quickly. You are determined to stay focused the next time you explore and learn how to traverse this gods-forsaken realm.");
        exploration.explored++;
    }
    else {
        exploration.explored++;
        //Find zones
        if (exploration.exploredForest <= 0) {
            outputText("You walk for quite some time, roaming the hard-packed and pink-tinged earth of the demon-realm. Rust-red rocks speckle the wasteland, as barren and lifeless as anywhere else you've been. A cool breeze suddenly brushes against your face, as if gracing you with its presence. You turn towards it and are confronted by the lush foliage of a very old looking forest. You smile as the plants look fairly familiar and non-threatening. Unbidden, you remember your decision to test the properties of this place, and think of your campsite as you walk forward. Reality seems to shift and blur, making you dizzy, but after a few minutes you're back, and sure you'll be able to return to the forest with similar speed.<br><br><b>You've discovered the Forest!</b>");
            exploration.exploredForest = 1;
            return;
        }
        if (exploration.exploredLake <= 0) {
            outputText("Your wanderings take you far and wide across the barren wasteland that surrounds the portal, until the smell of humidity and fresh water alerts you to the nearby lake. With a few quick strides you find a lake so massive the distant shore cannot be seen. Grass and a few sparse trees grow all around it.<br><br><b>You've discovered the Lake!</b>");
            exploration.exploredLake = 1;
            return;
        }
        if (exploration.exploredDesert <= 0 && rand(3) == 0 && exploration.exploredLake > 0) {
            outputText("You stumble as the ground shifts a bit underneath you. Groaning in frustration, you straighten up and discover the rough feeling of sand ");
            if (player.lowerBody == LOWER_BODY_TYPE_HUMAN) outputText("inside your footwear, between your toes");
            if (player.lowerBody == LOWER_BODY_TYPE_HOOFED) outputText("in your hooves");
            if (player.lowerBody == LOWER_BODY_TYPE_DOG) outputText("in your paws");
            if (player.lowerBody == LOWER_BODY_TYPE_NAGA) outputText("in your scales");
            outputText(".<br><br><b>You've discovered the Desert!</b>");
            exploration.exploredDesert = 1;
            return;
        }
        if (exploration.exploredMountain <= 0 && rand(3) == 0 && exploration.exploredDesert > 0) {
            outputText("Thunder booms overhead, shaking you out of your thoughts. High above, dark clouds encircle a distant mountain peak. You get an ominous feeling in your gut as you gaze up at it.<br><br><b>You've discovered the Mountain!</b>");
            exploration.exploredMountain = 1;
            return;
        }
        //Find encounters
        if (rand(100) > 0) {
            switch(rand(4)) {
                case 0:
                    Areas.GenericExploration.genericGobImpEncounters();
                    break;
                case 1:
                    GiacomoScene.giacomoEncounter();
                    break;
                case 2:
                case 3:
            }
        }
        else {
            //Easter egg
            outputText("You wander around, fruitlessly searching for new places.");
        }
    }
}


Areas.GenericExploration.genericGobImpEncounters = function() {
    var impGob = 5; //Determines whether goblin or imp should be encountered.
    if (player.totalCocks() > 0) impGob--;
    if (player.hasVagina()) impGob++;
    //Decide whether to encounter imp or goblin.
    if (rand(10) < impGob) { //A wild imp appears!
        displaySprite("imp");
        outputText("An imp wings out of the sky and attacks!");
        if (gameFlags[CODEX_ENTRY_IMPS] <= 0) {
            gameFlags[CODEX_ENTRY_IMPS] = 1;
            outputText("<br><br><b>New codex entry unlocked: Imps!</b>")
        }
        startCombat(new Imp());
    }
    else { //A wild goblin appears!
        displaySprite("goblin");
        if (player.gender > 0)
            outputText("A goblin saunters out of the bushes with a dangerous glint in her eyes.<br><br>She says, \"<i>Time to get fucked, " + player.mf("stud", "slut") + ".</i>\"");
        else
            outputText("A goblin saunters out of the bushes with a dangerous glint in her eyes.<br><br>She says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with! This is for wasting my time!</i>\"");
        if (gameFlags[CODEX_ENTRY_GOBLINS] <= 0) {
            gameFlags[CODEX_ENTRY_GOBLINS] = 1;
            outputText("<br><br><b>New codex entry unlocked: Goblins!</b>")
        }
        startCombat(new Goblin());
    }
}