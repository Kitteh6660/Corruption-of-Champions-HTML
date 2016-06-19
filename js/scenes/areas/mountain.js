Areas.Mountain = [];

Areas.Mountain.explore = function() {
    clearOutput();
    exploration.exploredMountain++; //Increment counter
    var choice = [];
    choice[choice.length] = 0; //Goblin/imp encounter
    choice[choice.length] = 1; //Minotaur
    choice[choice.length] = 2; //Hellhound
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