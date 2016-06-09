ConsumableEffects.reductoMenu = function() {
    menu();
    addButton(14, "Nevermind", cancelReducto);
}

function cancelReducto() {
    Inventory.takeItem();
}