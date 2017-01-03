Areas.Desert = [];

Areas.Desert.explore = function() {
    clearOutput();
    exploration.exploredDesert++; //Increment counter
    var choice = [];
    choice[choice.length] = 0; //Sand Witch
    choice[choice.length] = 1; //Naga
    choice[choice.length] = 2; //Marcus and Lucia
    if (rand(2) == 0) choice[choice.length] = 3; //Sand Trap
    choice[choice.length] = 4; // Oasis Demons or Mirage
    choice[choice.length] = 99; //Nothing out of the ordinary, possibly find mirage
    var select = choice[rand(choice.length)];
    switch(select) {
        case 0: //Sand Witch
            // Check for birthing scene. Sand Witch must be in second half of pregnancy and hit a 1/4 chance.

            if (SandWitch.pregnancyEventNum == 2 && rand(4) == 0) {
                if (SandWitch.pregnancyType = "Drider_Eggs") SandWitchScene.sammitchBirthsDriders();
                else SandWitchScene.witchBirfsSomeBees();
                break;
            }
            // Otherwise, do normal encounter
            else {
            SandWitchScene.encounter();
            break;
            }
        case 1: //Naga and Sand Trap
           NagaScene.nagaEncounter();
            break;
        case 2: //Marcus and Lucia
            WandererScene.wandererRouter();
            break;
        case 3: // Sandtrap
            SandTrapScene.encounterASandTrap();
            break;
        case 4: // Oasis Demons or Mirage
            if (rand(4) == 0 && player.level >= 2) {
                OasisScene.oasisEncounter();
                break;
            }
            else {
                outputText("While exploring the desert, you see a shimmering tower in the distance. As you rush towards it, it vanishes completely. It was a mirage!  You sigh, depressed at wasting your time.");
                player.changeLust(-15, false);
                doNext(Camp.returnToCampUseOneHour);
                break;
                }
        default:
            if (rand(4) > 0) { //Find nothing.
                outputText("You walk through the shifting sands for an hour, finding nothing.<br><br>");
                //Chance of boost == 50%
                if (rand(2) == 0) {
                    //50/50 strength/toughness
                    if (rand(2) == 0 && player.str < 50) {
                        outputText("The effort of struggling with the uncertain footing has made you stronger.");
                        player.modStats("str", .5);
                    }
                    //Toughness
                    else if (player.tou < 50) {
                        outputText("The effort of struggling with the uncertain footing has made you tougher.");
                        player.modStats("tou", .5);
                    }
                }
            }
            else { //Mirage in the desert.
                outputText("While exploring the desert, you see a shimmering tower in the distance. As you rush towards it, it vanishes completely. It was a mirage!  You sigh, depressed at wasting your time.");
            }
            player.changeLust(-15, false);
            doNext(Camp.returnToCampUseOneHour);
    }
}