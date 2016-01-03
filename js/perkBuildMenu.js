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

    //Speed Perks

    //Intelligence Perks

    //Libido Perks

    //Corruption Perks

    return perksAvailable;
};

PerkMenuBuilder.addPerkToDropdown = function(perk) {
    if (player.findPerk(perk) >= 0) return; //Already have perk? Don't add.
    perksAvailable.push(perk);
};