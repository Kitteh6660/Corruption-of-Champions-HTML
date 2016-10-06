Items.Consumables = {};

//------------
// STANDARD
//------------
Items.Consumables.BeeHoney = new Item("BeeHony", "Bee Honey", "a small vial filled with giant-bee honey", ITEM_TYPE_CONSUMABLE);
Items.Consumables.BeeHoney.description = "This fine crystal vial is filled with a thick amber liquid that glitters dully in the light. You can smell a sweet scent, even though it is tightly corked.";
Items.Consumables.BeeHoney.consumeEffect = ConsumableEffects.beeTFs(0);

Items.Consumables.CaninePepper = new Item("CanineP", "Canine Pp", "a canine pepper", ITEM_TYPE_CONSUMABLE);
Items.Consumables.CaninePepper.description = "The pepper is shiny and red, bulbous at the base but long and narrow at the tip. It smells spicy.";
Items.Consumables.CaninePepper.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 0);

Items.Consumables.CaninePepperLarge = new Item("Large P", "Large Pp", "an overly large canine pepper", ITEM_TYPE_CONSUMABLE);
Items.Consumables.CaninePepperLarge.description = "This large canine pepper is much bigger than any normal peppers you've seen.";
Items.Consumables.CaninePepperLarge.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 1);
Items.Consumables.CaninePepperLarge.value = 10;

Items.Consumables.CaninePepperDouble = new Item("DoubleP", "Double Pp", "a double canine pepper", ITEM_TYPE_CONSUMABLE);
Items.Consumables.CaninePepperDouble.description = "This canine pepper is actually two that have grown together due to some freak coincidence.";
Items.Consumables.CaninePepperDouble.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 2);
Items.Consumables.CaninePepperDouble.value = 10;

Items.Consumables.CaninePepperBlack = new Item("Black P", "Black Pp", "a solid black canine pepper", ITEM_TYPE_CONSUMABLE);
Items.Consumables.CaninePepperBlack.description = "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right...";
Items.Consumables.CaninePepperBlack.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 3);
Items.Consumables.CaninePepperBlack.value = 10;

Items.Consumables.CaninePepperKnotty = new Item("KnottyP", "Knotty Pp", "a knotty canine pepper", ITEM_TYPE_CONSUMABLE);
Items.Consumables.CaninePepperKnotty.description = "This knotted pepper is very swollen, with a massive, distended knot near the base.";
Items.Consumables.CaninePepperKnotty.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 4);
Items.Consumables.CaninePepperKnotty.value = 10;

Items.Consumables.CaninePepperBulby = new Item("Bulby P", "Bulby Pp", "a bulbous canine pepper", ITEM_TYPE_CONSUMABLE);
Items.Consumables.CaninePepperBulby.description = "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base.";
Items.Consumables.CaninePepperBulby.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 5);
Items.Consumables.CaninePepperBulby.value = 10;

Items.Consumables.Equinum = new Item("Equinum", "Equinum", "a vial of Equinum", ITEM_TYPE_CONSUMABLE);
Items.Consumables.Equinum.description = "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\". It is likely this potion is tied to horses in some way.";
Items.Consumables.Equinum.consumeEffect = ConsumableEffects.equineTFs;

Items.Consumables.GoblinAle = new Item("Gob.Ale", "Goblin Ale", "a flagon of potent goblin ale", ITEM_TYPE_CONSUMABLE);
Items.Consumables.GoblinAle.description = "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew. Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with.";
Items.Consumables.GoblinAle.consumeEffect = ConsumableEffects.goblinTFs;

Items.Consumables.GoldenSeed = new Item("G.Seed", "Golden Seed", "a golden seed", ITEM_TYPE_CONSUMABLE);
Items.Consumables.GoldenSeed.description = "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations.";
Items.Consumables.GoldenSeed.consumeEffect = ConsumableEffects.harpyTFs(0);

Items.Consumables.Hummanus = new Item("Hummus ", "Hummanus", "a small jar of hummus", ITEM_TYPE_CONSUMABLE);
Items.Consumables.Hummanus.description = "This is a small jar with label that reads, \"<i>Hummanus</i>\". If the name clues you in, this might be how humanity is regained.";
Items.Consumables.Hummanus.consumeEffect = ConsumableEffects.humanTFs;

Items.Consumables.ImpFood = new Item("ImpFood", "Imp Food", "a parcel of imp food", ITEM_TYPE_CONSUMABLE);
Items.Consumables.ImpFood.description = "This is a small parcel of reddish-brown bread stuffed with some kind of meat. It smells delicious.";
Items.Consumables.ImpFood.consumeEffect = ConsumableEffects.impTFs;

Items.Consumables.LaBova = new Item("LaBova", "La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", ITEM_TYPE_CONSUMABLE);
Items.Consumables.LaBova.description = "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.";
Items.Consumables.LaBova.consumeEffect = ConsumableEffects.cowTFs(true, false);

Items.Consumables.Lactaid = new Item("Lactaid", "Lactaid", "a pink bottle labelled \"Lactaid\"", ITEM_TYPE_CONSUMABLE);
Items.Consumables.Lactaid.description = "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction.";
Items.Consumables.Lactaid.consumeEffect = ConsumableEffects.lactaid;

Items.Consumables.MinotaurBlood = new Item("M.Blood", "MinoBlood", "a vial of Minotaur blood", ITEM_TYPE_CONSUMABLE);
Items.Consumables.MinotaurBlood.description = "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape.";
Items.Consumables.MinotaurBlood.consumeEffect = ConsumableEffects.minotaurTFs;

Items.Consumables.MinotaurCum = new Item("M.Cum", "MinoCum", "a sealed bottle of minotaur cum", ITEM_TYPE_CONSUMABLE);
Items.Consumables.MinotaurCum.description = "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown.";
Items.Consumables.MinotaurCum.consumeEffect = ConsumableEffects.minotaurCum(false);
Items.Consumables.MinotaurCum.value = 60;

Items.Consumables.PigTruffle = new Item("PigTruf", "Pig Truffle", "a pigtail truffle", ITEM_TYPE_CONSUMABLE);
Items.Consumables.PigTruffle.description = "It's clear where this fungus gets its name. A small, curly sprig resembling a pig's tail can be seen jutting out of it.";
Items.Consumables.PigTruffle.consumeEffect = ConsumableEffects.pigTFs;

Items.Consumables.PureHoney = new Item("PurHon", "Pure Honey", "a crystal vial filled with glittering honey", ITEM_TYPE_CONSUMABLE);
Items.Consumables.PureHoney.description = "This fine crystal vial is filled with a thick amber liquid that glitters in the light.  You can smell a sweet scent, even though it is tightly corked.";
Items.Consumables.PureHoney.consumeEffect = ConsumableEffects.beeTFs(1);
Items.Consumables.PureHoney.value = 40;

Items.Consumables.Reptilum = new Item("Reptilum", "Reptilum", "a vial of Reptilum", ITEM_TYPE_CONSUMABLE);
Items.Consumables.Reptilum.description = "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way.";
Items.Consumables.Reptilum.consumeEffect = ConsumableEffects.lizardTFs;

Items.Consumables.SnakeOil = new Item("SnakeOil", "Snake Oil", "a vial of snake oil", ITEM_TYPE_CONSUMABLE);
Items.Consumables.SnakeOil.description = "A vial the size of your fist made of dark brown glass. It contains what appears to be an oily, yellowish liquid. The odor is abominable.";
Items.Consumables.SnakeOil.consumeEffect = ConsumableEffects.snakeTFs;

Items.Consumables.SpecialHoney = new Item("SPHoney", "Special Honey", "a bottle of special bee honey", ITEM_TYPE_CONSUMABLE);
Items.Consumables.SpecialHoney.description = "A clear crystal bottle of a dark brown fluid that you got from the bee handmaiden.  It gives off a strong sweet smell even though the bottle is still corked.";
Items.Consumables.SpecialHoney.consumeEffect = ConsumableEffects.beeTFs(2);
Items.Consumables.SpecialHoney.value = 20;

Items.Consumables.TrapOil = new Item("TrapOil", "TrapOil", "a vial of trap oil.", ITEM_TYPE_CONSUMABLE);
Items.Consumables.TrapOil.description = "A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous.";
//Items.Consumables.TrapOil.consumeEffect = ConsumableEffects.trapOil;

Items.Consumables.WetCloth = new Item("W.Cloth", "Wet Cloth", "a wet cloth dripping with slippery slime", ITEM_TYPE_CONSUMABLE);
Items.Consumables.WetCloth.description = "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect.";
Items.Consumables.WetCloth.consumeEffect = ConsumableEffects.slimeTFs; //TODO

Items.Consumables.WhiskerFruit = new Item("W.Fruit", "W.Fruit", "a piece of whisker-fruit", ITEM_TYPE_CONSUMABLE);
Items.Consumables.WhiskerFruit.description = "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides.";
Items.Consumables.WhiskerFruit.consumeEffect = ConsumableEffects.felineTFs;


//------------
// DEMONIC
//------------
Items.Consumables.IncubiDraft = new Item("I.Draft", "I.Draft", "a flask of Incubi draft", ITEM_TYPE_CONSUMABLE);
Items.Consumables.IncubiDraft.description = "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass.";
Items.Consumables.IncubiDraft.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 0, false);

Items.Consumables.IncubiDraftPurified = new Item("P.Draft", "P.Draft", "an untainted flask of purified Incubi draft", ITEM_TYPE_CONSUMABLE);
Items.Consumables.IncubiDraftPurified.description = "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use.";
Items.Consumables.IncubiDraftPurified.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 0, true);
Items.Consumables.IncubiDraftPurified.value = 20;

Items.Consumables.SuccubiMilk = new Item("SucMilk", "SucMilk", "a bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
Items.Consumables.SuccubiMilk.description = "This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as \"<i>Succubi Milk</i>\". In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"";
Items.Consumables.SuccubiMilk.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 1, false);


// There are two definitions for SuccubiMilkPurified. Which one is the correct one?
Items.Consumables.SuccubiMilkPurified = new Item("P.S.Mlk", "P.S.Milk", "an untainted bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
Items.Consumables.SuccubiMilkPurified.description = "This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as \"<i>Succubi Milk</i>\". In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\" Rathazul has purified this to prevent corruption upon use.";
Items.Consumables.SuccubiMilkPurified.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 1, true);
Items.Consumables.SuccubiMilkPurified.value = 20;

Items.Consumables.SuccubiDelight = new Item("SDelite", "S.Delite", "a bottle of 'Succubi's Delight'", ITEM_TYPE_CONSUMABLE);
Items.Consumables.SuccubiDelight.description = "This precious fluid is often given to men a succubus intends to play with for a long time.";
Items.Consumables.SuccubiDelight.consumeEffect = createCallBackFunction(ConsumableEffects.succubiDelight, false);

Items.Consumables.SuccubiMilkPurified = new Item("PSDelit", "PSDelit", "an untainted bottle of \"Succubi's Delight\"", ITEM_TYPE_CONSUMABLE);
Items.Consumables.SuccubiMilkPurified.description = "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption.";
Items.Consumables.SuccubiMilkPurified.consumeEffect = createCallBackFunction(ConsumableEffects.succubiDelight, true);
Items.Consumables.SuccubiMilkPurified.value = 20;


//------------
// NON-TFs
//------------
Items.Consumables.BlackBook = new Item("B.Book", "Black Book", "a small book with a midnight-black cover", ITEM_TYPE_CONSUMABLE);
Items.Consumables.BlackBook.description = "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home.";
Items.Consumables.BlackBook.consumeEffect = ConsumableEffects.blackSpellbook;
Items.Consumables.BlackBook.value = 40;

Items.Consumables.Condom = new Item("Condom", "Condom", "a condom packet", ITEM_TYPE_CONSUMABLE);
Items.Consumables.Condom.description = "This wrapper contains a latex condom that can be worn over penis. It's designed to prevent pregnancy most of the time. Can be used in certain sex scenes.";
Items.Consumables.Condom.consumeEffect = outputText("You look at the unopened packet of condom.  If applicable, you can use the condom to prevent pregnancy most of the time.");
Items.Consumables.Condom.value = 6;

Items.Consumables.FishFillet = new Item("FishFil", "F. Fillet", "a fish fillet", ITEM_TYPE_CONSUMABLE);
Items.Consumables.FishFillet.description = "A perfectly cooked piece of fish. You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species.";
Items.Consumables.FishFillet.consumeEffect = ConsumableEffects.fishFillet;

Items.Consumables.LustDraft = new Item("L.Draft", "Lust Draft", "a vial of roiling bubble-gum pink fluid", ITEM_TYPE_CONSUMABLE);
Items.Consumables.LustDraft.description = "This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape. It smells very sweet, and has \"Lust\" inscribed on the side of the vial.";
Items.Consumables.LustDraft.consumeEffect = ConsumableEffects.lustDraft;
Items.Consumables.LustDraft.value = 20;

Items.Consumables.FuckDraft = new Item("F.Draft", "Fuck Draft", "a vial of roiling red fluid labeled \"Fuck Draft\".", ITEM_TYPE_CONSUMABLE);
Items.Consumables.FuckDraft.description = "This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word \"Fuck\" is inscribed on the side of the vial.";
Items.Consumables.FuckDraft.consumeEffect = createCallBackFunction(ConsumableEffects.lustDraft, true);
Items.Consumables.FuckDraft.value = 20;

Items.Consumables.OviElixir = new Item("OviElix", "Ovi Elixir", "a salve marked as 'Ovulation Exlixir'", ITEM_TYPE_CONSUMABLE);
Items.Consumables.OviElixir.description = "This hexagonal container with an egg-shaped label can help you or others lay eggs.";
Items.Consumables.OviElixir.consumeEffect = ConsumableEffects.oviElixir;
Items.Consumables.OviElixir.value = 30;

Items.Consumables.Reducto = new Item("Reducto", "Reducto", "a salve marked as 'Reducto'", ITEM_TYPE_CONSUMABLE);
Items.Consumables.Reducto.description = "This container full of paste can be used to shrink a body part down by a significant amount.";
Items.Consumables.Reducto.consumeEffect = ConsumableEffects.reductoMenu;
Items.Consumables.Reducto.value = 30;

Items.Consumables.ScholarsTea = new Item("Smart T", "Scholars T.", "a cup of scholar's tea", ITEM_TYPE_CONSUMABLE);
Items.Consumables.ScholarsTea.description = "This potent tea supposedly has mind-strengthening effects.";
Items.Consumables.ScholarsTea.consumeEffect = ConsumableEffects.scholarsTea;

Items.Consumables.TatteredScroll = new Item("T.Scroll", "Tattered Scroll", "a tattered scroll", ITEM_TYPE_CONSUMABLE);
Items.Consumables.TatteredScroll.description = "This tattered scroll is written in strange symbols, yet you have the feeling that if you tried to, you could decipher it.";
Items.Consumables.TatteredScroll.consumeEffect = ConsumableEffects.tatteredScroll;

Items.Consumables.VitalityTincture = new Item("Vital T", "Vitality T.", "a fish fillet", ITEM_TYPE_CONSUMABLE);
Items.Consumables.VitalityTincture.description = "This powerful brew is supposedly good for the strengthening the body.";
Items.Consumables.VitalityTincture.consumeEffect = ConsumableEffects.vitalityTincture;

Items.Consumables.WhiteBook = new Item("W.Book", "White Book", "a small book with a pristine white cover", ITEM_TYPE_CONSUMABLE);
Items.Consumables.WhiteBook.description = "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it.";
Items.Consumables.WhiteBook.consumeEffect = ConsumableEffects.whiteSpellBook;
Items.Consumables.WhiteBook.value = 40;


//------------
// DYES/OILS/LOTIONS
//------------
Items.Consumables.HairDyeAuburn = new HairDye("AuburnD", "Auburn");
Items.Consumables.HairDyeBlack = new HairDye("Black D", "Black");
Items.Consumables.HairDyeBlond = new HairDye("Blond D", "Blond");
Items.Consumables.HairDyeBlue = new HairDye("BlueDye", "Blue");
Items.Consumables.HairDyeBrown = new HairDye("Brown D", "Brown");
Items.Consumables.HairDyeGray = new HairDye("GrayDye", "Gray");
Items.Consumables.HairDyeGreen = new HairDye("Green D", "Green");
Items.Consumables.HairDyeOrange = new HairDye("OrangeD", "Orange");
Items.Consumables.HairDyePink = new HairDye("PinkDye", "Pink");
Items.Consumables.HairDyePurple = new HairDye("PurpleD", "Purple");
Items.Consumables.HairDyeRainbow = new HairDye("RainDye", "Rainbow");
Items.Consumables.HairDyeRed = new HairDye("Red Dye", "Red");
Items.Consumables.HairDyeWhite = new HairDye("White D", "White");

Items.Consumables.SkinOilDark = new SkinOil("DarkOil", "Dark");
Items.Consumables.SkinOilEbony = new SkinOil("EbonyOl", "Ebony");
Items.Consumables.SkinOilFair = new SkinOil("FairOil", "Fair");
Items.Consumables.SkinOilLight = new SkinOil("LightOl", "Light");
Items.Consumables.SkinOilMahogany = new SkinOil("MahogOl", "Mahogany");
Items.Consumables.SkinOilOlive = new SkinOil("OliveOl", "Olive");
Items.Consumables.SkinOilRusset = new SkinOil("RussOil", "Russet");

Items.Consumables.BodyLotionClear = new BodyLotion("ClearLn", "Clear", "smooth thick creamy liquid");
Items.Consumables.BodyLotionRough = new BodyLotion("RoughLn", "Rough", "thick abrasive cream");
Items.Consumables.BodyLotionSexy = new BodyLotion("SexyLtn", "Sexy", "pretty cream like substance");
Items.Consumables.BodyLotionSmooth = new BodyLotion("SmthLtn", "Smooth", "smooth thick creamy liquid");


//-------------
// EGGS
//-------------

// Needed for Amily transformation code to work. Flesh out when we can obtain the items.
Items.Consumables.BlackEgg = new Item("BlEgg", "Black Egg", "a black egg");

Items.Consumables.LBlackEgg = new Item("LBlEgg", "L.Black Egg", "a large black egg");
