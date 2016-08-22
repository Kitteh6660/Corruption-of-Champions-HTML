//------------
// SPELLS
//------------
magicMenu = function() { //Spells are housed within combatSpecial.js file.
    menu();
    //White Spells
    if (player.spells.blind) addButton(0, "Blind", spellBlind);
    if (player.spells.chargeWeapon) addButton(1, "Charge Weapon", spellChargeWeapon);
    if (player.spells.whitefire) addButton(2, "Whitefire", spellWhitefire);
    //Black Spells
    if (player.spells.arouse) addButton(5, "Arouse", spellArouse);
    if (player.spells.heal) addButton(6, "Heal", spellHeal);
    if (player.spells.might) addButton(7, "Might", spellMight);
    //Special
    if (player.findPerk(PerkLib.CleansingPalm) >= 0) addButton(10, "CleansingPalm", spellCleansingPalm);
    addButton(14, "Back", battleMenu);
}

//White Spells
function spellBlind() {

}
function spellChargeWeapon(silent) {
    if (silent) {
        player.createStatusEffect(StatusEffects.ChargeWeapon, 10 * spellMod(), 0, 0, 0);
        return;
    }
    if (player.findPerk(PerkLib.BloodMage) < 0 && player.fatigue + spellCost(15) > player.maxFatigue()) {
        outputText("You are too tired to cast this spell.");
        doNext(magicMenu);
        return;
    }
    player.changeFatigue(spellCost(15), false);
    outputText("You utter words of power, summoning an electrical charge around your " + player.weapon.equipmentName + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.<br><br>");
    player.createStatusEffect(StatusEffects.ChargeWeapon, 10 * spellMod(),0,0,0);
    gameFlags[SPELLS_CAST]++;
    spellPerkUnlock();
    monster.combatAI();
}
function spellWhitefire() {

}
//Black Spells
function spellArouse() {

}
function spellHeal() {

}
function spellMight(silent) {

}
//Special Spells
function spellCleansingPalm() {

}

//------------
// P. SPECIAL
//------------
physicalSpecials = function() {
    menu();
    addButton(14, "Back", battleMenu);
}

//------------
// M. SPECIAL
//------------
mentalSpecials = function() {
    menu();
    addButton(14, "Back", battleMenu);
}

//------------
// SPEC UTILS
//------------
function spellCost(cost) {
    var temp = cost;
    return temp;
}
function physicalCost(cost) {
    var temp = cost;
    return temp;
}
function spellMod() {
    return player.spellMod();
}

function spellPerkUnlock() {
    if (gameFlags[SPELLS_CAST] >= 5 && player.findPerk(PerkLib.SpellcastingAffinity) < 0) {
        outputText("<b>You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!</b><br><br>");
        player.createPerk(PerkLib.SpellcastingAffinity, 20, 0, 0, 0);
    }
    if (gameFlags[SPELLS_CAST] >= 15 && player.perkValue(PerkLib.SpellcastingAffinity, 1) < 35) {
        outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b><br><br>");
        player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 35);
    }
    if (gameFlags[SPELLS_CAST] >= 45 && player.perkValue(PerkLib.SpellcastingAffinity, 1) < 50) {
        outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b><br><br>");
        player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 50);
    }
}