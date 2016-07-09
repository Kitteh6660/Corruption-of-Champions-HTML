// DEBUGGING MENU

var Debug = [];

Debug.doDebug = function() {
    clearOutput();
    outputText("CoC HTML Debug Menu.<br><br>");
    outputText("Be warned that using this can cause very strange behavior. Saving while using this menu can cause a corrupted save. Back up your saves and use at your own risk.<br><br>");
    outputText("<b>Player Variables</b><br>");
    outputText("Player Gender: " + player.gender);
    menu();
    addButton(0, "Gender", Debug.genderChange, null, null, null, "Change the Player's Gender.");
    addButton(1, "Fight", Debug.fightCreature, null, null, null, "Fight a creature.");
    addButton(14, "Leave", Camp.doCamp, null, null, null, "Return to Camp.");
};

//----------
// CHANGE THE GENDER OF THE PLAYER
//----------

Debug.genderChange = function() {
    clearOutput();
    outputText("Change the player's gender to...");
    addButton(0, "Male", Debug.genderChangeMale, null, null, null, "Change to Male.");
    addButton(1, "Female", Debug.genderChangeFemale, null, null, null, "Change to Female.");
    addButton(2, "Herm", Debug.genderChangeHerm, null, null, null, "Change to Herm.");
    addButton(3, "Genderless", Debug.genderChangeNone, null, null, null, "Change to Genderless.");
    addButton(14, "Back", Debug.doDebug, null, null, null, "Go Back to Debug Menu.")
};

Debug.genderChangeMale = function() {
    clearOutput();
    outputText("Player gender changed to MALE.");
    player.gender = 1;
    doNext(Debug.doDebug);
};

Debug.genderChangeFemale = function() {
    clearOutput();
    outputText("Player gender changed to FEMALE.");
    player.gender = 2;
    doNext(Debug.doDebug);
};

Debug.genderChangeHerm = function() {
    clearOutput();
    outputText("Player gender changed to HERM.");
    player.gender = 3;
    doNext(Debug.doDebug);
};

Debug.genderChangeNone = function() {
    clearOutput();
    outputText("Player gender changed to GENDERLESS.");
    player.gender = 0;
    doNext(Debug.doDebug);
};

//----------
// Fight a creature
//----------

Debug.fightCreature = function() {
    clearOutput();
    startCombat(new Goblin());
}