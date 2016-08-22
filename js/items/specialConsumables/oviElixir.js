ConsumableEffects.oviElixir = function() {
    if (player.hasVagina() == false) {
        outputText("You pop the cork and prepare to drink the stuff, but the smell nearly makes you gag.  You cork it hastily.<br><br>");
        Inventory.takeItem(Items.Consumables.OviElixir);
        return false;
    }
    //Oviposition Elixir!
    /* Notes on StatusEffects.Eggs
     v1 = egg type.
     v2 = size - 0 for normal, 1 for large
     v3 = quantity
     EGG TYPES-
     0 - brown - ass expansion
     1 - purple - hip expansion
     2 - blue - vaginal removal and/or growth of existing maleness
     3 - pink - dick removal and/or fertility increase.
     4 - white - breast growth.  If lactating increases lactation.
     5 - rubbery black
     */
    player.slimeFeed();
    outputText("You pop the cork and gulp down the thick greenish fluid.  The taste is unusual and unlike anything you've tasted before.");
    if (player.pregnancyType == PREGNANCY_GOO_STUFFED) {
        outputText("<br><br>For a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with Valeria's goo filling your womb the ovielixir is unable to work its magic on you.");
        return (false);
    }
    if (player.pregnancyType == PREGNANCY_WORM_STUFFED) {
        outputText("<br><br>For a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with the worms filling your womb the ovielixir is unable to work its magic on you.");
        return (false);
    }
    if (player.pregnancyIncubation == 0) { //If the player is not pregnant, get preggers with eggs!
        outputText("<br><br>The elixir has an immediate effect on your belly, causing it to swell out slightly as if pregnant.  You guess you'll be laying eggs sometime soon!");
        player.knockUp(PREGNANCY_OVIELIXIR_EGGS, INCUBATION_OVIELIXIR_EGGS, 1, 1);
        player.createStatusEffect(StatusEffects.Eggs, rand(6), 0, rand(3) + 5, 0);
        return (false);
    }
    //Drinking multiple elixirs
    var changeOccurred = false;
    if (player.pregnancyType == PREGNANCY_OVIELIXIR_EGGS) { //If player already has eggs, chance of size increase!
        if (player.findStatusEffect(StatusEffects.Eggs) >= 0) {
            //If eggs are small, chance of increase!
            if (player.statusEffectValue(StatusEffects.Eggs,2) == 0) { 
                //1 in 2 chance!
                if (rand(3) == 0) {
                    player.addStatusValue(StatusEffects.Eggs, 2, 1);
                    outputText("<br><br>Your pregnant belly suddenly feels heavier and more bloated than before.  You wonder what the elixir just did.");
                    changeOccurred = true;
                }
            }
            //Chance of quantity increase!
            if (rand(2) == 0) {
                outputText("<br><br>A rumble radiates from your uterus as it shifts uncomfortably and your belly gets a bit larger.");
                player.addStatusValue(StatusEffects.Eggs, 3, rand(4) + 1);
                changeOccurred = true;
            }
        }
    }
    if (!changeOccurred && player.pregnancyIncubation > 20 && player.pregnancyType != PREGNANCY_BUNNY) { //If no changes, speed up pregnancy.
        outputText("<br><br>You gasp as your pregnancy suddenly leaps forwards, your belly bulging outward a few inches as it gets closer to time for birthing.");
        var newIncubation = player.pregnancyIncubation - (player.pregnancyIncubation * 0.3 + 10);
        if (newIncubation < 2) newIncubation = 2;
        player.knockUpForce(player.pregnancyType, newIncubation);
        //trace("Pregger Count New total:" + game.player.pregnancyIncubation);
    }
    return (false);
};