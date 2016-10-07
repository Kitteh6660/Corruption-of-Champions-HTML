Areas.Mountain = [];

Areas.Mountain.explore = function() {
    clearOutput();
    exploration.exploredMountain++; //Increment counter
    var choice = [];
    choice[choice.length] = 0; //Goblin/imp encounter
    choice[choice.length] = 1; //Minotaur
    choice[choice.length] = 2; //Hellhound
    choice[choice.length] = 3; //Worms
    choice[choice.length] = 99; //Nothing out of the ordinary
    var select = choice[rand(choice.length)];
    switch(select) {
        case 0:
            Areas.GenericExploration.genericGobImpEncounters();
            break;
        case 1:
            MinotaurScene.encounterMinotaur();
            break;
        case 2:
            HellhoundScene.hellhoundEncounter();
            break;
        case 3:
            // If you haven't met worms yet, have the sign encounter.
            if (gameFlags[MET_WORMS] == 0) {
                WormsScene.wormToggle(); // Only get this scene once
                break;
            }
            // If you're infested right now or you've marked that you hate worms, go for a walk
            if (gameFlags[INFESTED] == 1 || gameFlags[WORMS_FETISH] == 3) {
                if (player.cor < 90) {
                    outputText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.");
                    player.modStats("tou", .25, "spe", .5, "lus", player.lib / 10 - 15);
                }
                else {
                    outputText("During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.<br><br>It is a miracle no predator picked up on the strong sexual scent you are emitting.");
                    player.modStats("tou", .25, "spe", .5, "lib", .25, "lus", player.lib / 10);
                }
                doNext(Camp.returnToCampUseOneHour);
                break;
            }
            // If you do want to meet the worms always
            if (gameFlags[WORMS_FETISH] == 2) WormsScene.wormEncounter();
            // If you only want to meet the worms sometimes
            if (gameFlags[WORMS_FETISH] == 1 && rand(2) == 0) {
                    if (player.cor < 90) {
                        outputText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.", true);
                        player.dynStats("tou", .25, "spe", .5);
                        player.changeLust((player.lib / 10) - 15);
                    }
                    else {
                        outputText("During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.\n\nIt is a miracle no predator picked up on the strong sexual scent you are emitting.", true);
                        player.dynStats("tou", .25, "spe", .5, "lib", .25)
                        player.changeLust(player.lib / 10);
                    }
                    doNext(Camp.returnToCampUseOneHour);
                    break;
                }
                else {
                    WormsScene.wormEncounter();
                    break;
                }
        default:
            if (player.cor < 90) {
                outputText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.");
                player.modStats("tou", .25, "spe", .5, "lus", player.lib / 10 - 15);
            }
            else {
                outputText("During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.<br><br>It is a miracle no predator picked up on the strong sexual scent you are emitting.");
                player.modStats("tou", .25, "spe", .5, "lib", .25, "lus", player.lib / 10);
            }
            doNext(Camp.returnToCampUseOneHour);
    }
    exploration.exploredMountain++;
}