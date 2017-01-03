Areas.Forest = [];

Areas.Forest.explore = function() {
    clearOutput();
    exploration.exploredForest++; //Increment counter
    var choice = [];
    choice[choice.length] = 0; //Goblin/imp encounter
    if ((player.cor >= 25 || player.level >= 4 || gameFlags[JOJO_CORRUPTION_STAGE] != 0) && gameFlags[JOJO_CAMP] == 0/* && flags[JOJO_DEAD_OR_GONE] == 0*/) choice[choice.length] = 1; //Jojo
    if (player.level >= 2) choice[choice.length] = 2; //Tentacle beast
    //choice[choice.length] = 3; //Corrupted Glade
    choice[choice.length] = 4; //Root
    choice[choice.length] = 5; //Bee-girl
    choice[choice.length] = 8; //Peaceful walk
    var select = choice[rand(choice.length)];
    switch(select) {
        case 0: //25% chance of Tamani/Daughter's. Otherwise, goblin and imp encounters. Trying a tweak of the encounter rate...
            if (rand(100) <= 25 && gameFlags[TAMANI_TIME_OUT] == 0 && player.gender > 0 && gameFlags[TAMANI_BAD_ENDED] == 0 && (player.totalCocks() > 0 || player.hasKeyItem("Deluxe Dildo") < 0)) {
                if (player.totalCocks() > 0 && gameFlags[TAMANI_DAUGHTER_PREGGO_COUNTDOWN] == 0 && gameFlags[TAMANI_NUMBER_OF_DAUGHTERS] >= 24) {
                    outputText("You've reached Tamani Daughter's Scene. Placeholder. Will come in a later version!")
                    //tamaniDaughtersScene.encounterTamanisDaughters();
                }
                else
                    TamaniScene.encounterTamani();
                return;
            }
            Areas.GenericExploration.genericGobImpEncounters();
            break;
        case 1: //Jojo
            JojoScene.routeJojoEncounter();
            break;
        case 2: //Tentacle Beasts (Not yet implemented)
            // TODO Track down this legacy flag if (player.gender > 0) flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00247] = 0;
            //Tentacle avoidance chance due to dangerous plants
            if (player.hasKeyItem("Dangerous Plants") >= 0 && player.inte / 2 > rand(50)) {
                //trace("TENTACLE'S AVOIDED DUE TO BOOK!");
                outputText("Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n", true);
                menu();
                addButton(0, "Continue", TentacleBeastScene.encounter);
                addButton(1, "Leave", Camp.returnToCampUseOneHour);
                return;
            }
            else {
                TentacleBeastScene.encounter();
                return;
            }
            break;
        case 3: //Corrupted Glade (Not yet implemented)
            break;
        case 4: //Trip on a Root
            outputText("You trip on an exposed root, scraping yourself somewhat, but otherwise the hour is uneventful. ");
            player.changeHP(-10, true);
            doNext(Camp.returnToCampUseOneHour);
            break;
        case 5: //Bee-girl
            BeeGirlScene.beeEncounter();
            break;
        default:
            if (player.cor < 80) {
                outputText("You enjoy a peaceful walk in the woods, it gives you time to think.");
                //Mod toughness
                if (player.tou < 50)
                    player.modStats("tou", 0.5);
                //Mod intelligence
                if (player.inte < 50)
                    player.modStats("int", 1);
                else if (player.inte < 75)
                    player.modStats("int", 0.5);
            }
            else {
                outputText("As you wander in the forest, you keep ", false);
                if (player.gender == 1) outputText("stroking your half-erect " + player.multiCockDescriptLight() + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes.");
                if (player.gender == 2) outputText("idly toying with your " + player.vaginaDescript(0) + " as you daydream about getting fucked by all kinds of monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
                if (player.gender == 3) outputText("stroking alternatively your " + player.multiCockDescriptLight() + " and your " + player.vaginaDescript(0) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes, before, or while, getting fucked by various monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
                if (player.gender == 0) outputText("daydreaming about sex-demons with huge sexual attributes, and how you could please them.");
                outputText(" ");
                if (player.tou < 50)
                    player.modStats("tou", 0.5);
                if (player.lib < 60)
                    player.modStats("lib", 0.25);
                player.changeLust(player.lib / 5, true);
            }
            doNext(Camp.returnToCampUseOneHour);
    }
}