var perksAvailable = [];
PerkMenuBuilder = [];

PerkMenuBuilder.buildPerkList = function() {
    perksAvailable = [];
    //Strength Perks
    if (player.str >= 25)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.StrongBack);
    if (player.str >= 50 && player.findPerk(PerkLib.StrongBack) >= 0)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.StrongBack2);
    //Toughness Perks
    if (player.tou >= 25)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.Tank);
    if (player.tou >= 50 && player.findPerk(PerkLib.Tank) >= 0)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.Tank2);
    //Speed Perks
    if (player.spe >= 25)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.Evade);
    if (player.spe >= 25)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.Runner);
    //Intelligence Perks
    if (player.inte >= 25)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.Precision);
    if (player.inte >= 25)
        PerkMenuBuilder.addPerkToDropdown(PerkLib.Spellpower);
    //Libido Perks

    //Corruption Perks

    return perksAvailable;
};

PerkMenuBuilder.addPerkToDropdown = function(perk) {
    if (player.findPerk(perk) >= 0) return; //Already have perk? Don't add.
    perksAvailable.push(perk);
};