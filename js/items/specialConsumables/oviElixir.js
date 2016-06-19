ConsumableEffects.oviElixir = function() {
    outputText("As you're about to pop the cork open, you are reminded that pregnancy system is not in the game yet. You put it back in your inventory. ");
    Inventory.takeItem(Items.Consumables.OviElixir);
    return false;
}

