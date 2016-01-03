Items.Armor = {};

Items.Armor.Naked = new Item("Naked", "Naked", "naked", ITEM_TYPE_ARMOR);
Items.Armor.Naked.description = "You know you're not supposed to have this in your inventory.";
Items.Armor.Naked.equipmentName = "nothing";
Items.Armor.Naked.value = -1;
Items.Armor.Naked.defense = 0;

Items.Armor.ComfortableClothes = new Item("C.Cloth", "C.Cloth", "a set of comfortable clothes", ITEM_TYPE_ARMOR);
Items.Armor.ComfortableClothes.description = "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.";
Items.Armor.ComfortableClothes.equipmentName = "comfortable clothes";
Items.Armor.ComfortableClothes.value = 6;
Items.Armor.ComfortableClothes.defense = 0;

Items.Armor.GelArmor = new Item("GelArmr", "Gel Armor", "a suit of gel armour", ITEM_TYPE_ARMOR);
Items.Armor.GelArmor.description = "This suit of interlocking plates is made from a strange green material. It feels spongy to the touch but is amazingly resiliant.";
Items.Armor.GelArmor.equipmentName = "glistening gel-armor plates";
Items.Armor.GelArmor.value = 150;
Items.Armor.GelArmor.defense = 10;

Items.Armor.BeeArmor = new Item("BeeArmr", "Bee Armor", "a set of chitinous armour", ITEM_TYPE_ARMOR);
Items.Armor.BeeArmor.description = "A suit of armour cleverly fashioned from giant bee chitin. It comes with a silken loincloth to protect your modesty.";
Items.Armor.BeeArmor.equipmentName = "sexy black chitin armour-plating";
Items.Armor.BeeArmor.value = 200;
Items.Armor.BeeArmor.defense = 18;
Items.Armor.BeeArmor.sexiness = 3;
