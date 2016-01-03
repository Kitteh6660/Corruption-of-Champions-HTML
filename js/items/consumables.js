Items.Consumables = {};

Items.Consumables.CaninePepper = new Item("CanineP", "CanineP", "a Canine pepper", ITEM_TYPE_CONSUMABLE);
Items.Consumables.CaninePepper.description = "The pepper is shiny and red, bulbous at the base but long and narrow at the tip.  It smells spicy.";
Items.Consumables.CaninePepper.consumeEffect = ConsumableEffects.canineTFs;

Items.Consumables.Equinum = new Item("Equinum", "Equinum", "a vial of Equinum", ITEM_TYPE_CONSUMABLE);
Items.Consumables.Equinum.description = "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\".  It is likely this potion is tied to horses in some way.";
Items.Consumables.Equinum.consumeEffect = ConsumableEffects.equineTFs;

