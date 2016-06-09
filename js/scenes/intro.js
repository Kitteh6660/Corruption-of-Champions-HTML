Intro = [];
CharCreation = [];

//------------
// CREATION
//------------
CharCreation.initializeNewGame = function() {
    //Initialize player
    player = new Player();
    player.HP = player.maxHP();
    player.weapon = Items.NOTHING;
    player.armor = Items.Armor.ComfortableClothes;
    //Clear Flags
    //flags = [0] * 3000;
    //Route to character naming
    CharCreation.chooseName();
}
CharCreation.chooseName = function() {
	clearOutput();
	outputText("You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.<br><br>What is your name?<br>");
    outputText("<input type=\"text\" name=\"inputname\" id=\"inputname\">");
	doNext(CharCreation.chooseGender);
}
CharCreation.chooseGender = function() {
    if (document.getElementById("inputname").value.length < 1) {
        clearOutput();
        outputText("You must input a name. Off you go!");
        doNext(CharCreation.chooseName);
        return;
    }
	player.name = document.getElementById("inputname").value; //Apply name
    clearOutput();
    outputText("You are " + player.name + ". Are you a man or a woman?");
    menu();
    addButton(0, "Man", CharCreation.setGender, GENDER_MALE);
    addButton(1, "Woman", CharCreation.setGender, GENDER_FEMALE);
    addButton(2, "Hermaphrodite", CharCreation.setGender, GENDER_HERM);
}
CharCreation.setGender = function(gender) {
    switch(gender) {
        case GENDER_NONE:
            break;
        case GENDER_MALE: //Male
            //Attribute changes
            player.str += 3;
            player.tou += 2;
            //Body changes
            player.fertility = 5;
            player.hairLength = 1;
            player.tallness = 71;
            player.tone = 60;
            //Genetalia
            player.balls = 2;
            player.ballSize = 1;
            player.clitLength = 0;
            player.createCock(5.5, 1, CockTypesEnum.HUMAN);
            player.cocks[0].knotMultiplier = 1;
            //Breasts
            player.createBreastRow();
            break;
        case GENDER_FEMALE: //Female
            //Attribute changes
            player.spe += 3;
            player.inte += 2;
            //Body changes
            player.fertility = 10;
            player.hairLength = 10;
            player.tallness = 67;
            player.tone = 30;
            //Genetalia
            player.balls = 0;
            player.ballSize = 0;
            player.createVagina(true, 0, 0);
            player.clitLength = 0.5;
            //Breasts
            player.createBreastRow();
            break;
        case GENDER_HERM: //Hermaphrodite
            //Attribute changes
            player.str += 1;
            player.tou += 1;
            player.spe += 1;
            player.inte += 1;
            //Body changes
            player.fertility = 10;
            player.hairLength = 10;
            player.tallness = 69;
            player.tone = 45;
            //Genetalia
            player.createVagina();
            player.clitLength = .5;
            player.createCock(5.5, 1, CockTypesEnum.HUMAN);
            player.cocks[0].knotMultiplier = 1;
            //Breasts
            player.createBreastRow();
            break;
        default:
    }
    CharCreation.chooseBuild();
}
CharCreation.chooseBuild = function() {
    clearOutput();
    menu();
    switch(player.gender) {
        case GENDER_NONE:
            outputText("This isn't supposed to happen. Off you go!");
            doNext(CharCreation.chooseGender);
            break;
        case GENDER_MALE:
            outputText("You are a man. Your upbringing has provided you an advantage in strength and toughness.");
            addButton(0, "Lean", CharCreation.setBuild, "MaleLean");
            addButton(1, "Average", CharCreation.setBuild, "MaleAverage");
            addButton(2, "Thick", CharCreation.setBuild, "MaleThick");
            addButton(3, "Girly", CharCreation.setBuild, "MaleGirly");
            break;
        case GENDER_FEMALE:
            outputText("You are a woman. Your upbringing has provided you an advantage in speed and intellect.");
            addButton(0, "Slender", CharCreation.setBuild, "FemaleSlender");
            addButton(1, "Average", CharCreation.setBuild, "FemaleAverage");
            addButton(2, "Curvy", CharCreation.setBuild, "FemaleCurvy");
            addButton(3, "Tomboyish", CharCreation.setBuild, "FemaleTomboyish");
            break;
        case GENDER_HERM:
            outputText("You are a hermaphrodite. Your upbringing has provided you with the best of both worlds.");
            addButton(0, "Mas. Lean", CharCreation.setBuild, "MaleLean");
            addButton(1, "Mas. Average", CharCreation.setBuild, "MaleAverage");
            addButton(2, "Mas. Thick", CharCreation.setBuild, "MaleThick");
            addButton(5, "Fem. Slender", CharCreation.setBuild, "FemaleSlender");
            addButton(6, "Fem. Average", CharCreation.setBuild, "FemaleAverage");
            addButton(7, "Fem. Curvy", CharCreation.setBuild, "FemaleCurvy");
            break;
        default:
            //This line shouldn't be reached.
    }
    outputText("<br><br>What type of build do you have?");
}
CharCreation.setBuild = function(build) {
    switch(build) {
        //Male builds (Hermaphrodites choosing these builds will be a maleherm)
        case "MaleLean":
            player.str -= 1;
            player.spe += 1;

            player.femininity = 34;
            player.thickness = 30;
            player.tone += 5;

            player.breastRows[0].breastRating = BREAST_CUP_FLAT;
            player.buttRating = BUTT_RATING_TIGHT;
            player.hipRating = HIP_RATING_SLENDER;
            break;
        case "MaleAverage":
            player.femininity = 30;
            player.thickness = 50;

            player.breastRows[0].breastRating = BREAST_CUP_FLAT;
            player.buttRating = BUTT_RATING_AVERAGE;
            player.hipRating = HIP_RATING_AVERAGE;
            break;
        case "MaleThick":
            player.spe -= 4;
            player.str += 2;
            player.tou += 2;

            player.femininity = 29;
            player.thickness = 70;
            player.tone -= 5;

            player.breastRows[0].breastRating = BREAST_CUP_FLAT;
            player.buttRating = BUTT_RATING_NOTICEABLE;
            player.hipRating = HIP_RATING_AVERAGE;
            break;
        case "MaleGirly":
            player.str -= 2;
            player.spe += 2;

            player.femininity = 50;
            player.thickness = 50;
            player.tone = 26;

            player.breastRows[0].breastRating = BREAST_CUP_A;
            player.buttRating = BUTT_RATING_NOTICEABLE;
            player.hipRating = HIP_RATING_SLENDER;
            break;
        //Female builds (Hermaphrodites choosing these builds will be a futanari)
        case "FemaleSlender":
            player.str -= 1;
            player.spe += 1;

            player.femininity = 66;
            player.thickness = 30;
            player.tone += 5;

            player.breastRows[0].breastRating = BREAST_CUP_B;
            player.buttRating = BUTT_RATING_TIGHT;
            player.hipRating = HIP_RATING_AMPLE;
            break;
        case "FemaleAverage":
            player.femininity = 70;
            player.thickness = 50;

            player.breastRows[0].breastRating = BREAST_CUP_C;
            player.buttRating = BUTT_RATING_NOTICEABLE;
            player.hipRating = HIP_RATING_AMPLE;
            break;
        case "FemaleCurvy":
            player.spe -= 2;
            player.str += 1;
            player.tou += 1;

            player.femininity = 71;
            player.thickness = 70;

            player.breastRows[0].breastRating = BREAST_CUP_D;
            player.buttRating = BUTT_RATING_LARGE;
            player.hipRating = HIP_RATING_CURVY;
            break;
        case "FemaleTomboyish":
            player.str += 1;
            player.spe -= 1;

            player.femininity = 56;
            player.thickness = 50;
            player.tone = 50;

            player.breastRows[0].breastRating = BREAST_CUP_A;
            player.buttRating = BUTT_RATING_TIGHT;
            player.hipRating = HIP_RATING_SLENDER;
            break;
        default:
    }
    CharCreation.customizeCharacterMenu();
}
//Customization menu
CharCreation.customizeCharacterMenu = function() {
    clearOutput();
    outputText("You can customize your character here. You will be able to alter your appearance through the usage of certain items.<br><br>");
    outputText("Height: " + Math.floor(player.tallness / 12) + "'" + player.tallness % 12 + "\"<br>");
    outputText("Skin tone: " + player.skinTone + "<br>");
    outputText("Hair color: " + player.hairColor + "<br>");
    if (player.hasCock()) outputText("Cock size: " + player.cocks[0].cockLength + "\" long, " + player.cocks[0].cockThickness + "\" thick<br>");
    outputText("Breast size: " + player.breastCup(0) + "<br>");
    menu();
    addButton(0, "Complexion", CharCreation.menuSkinComplexion);
    addButton(1, "Hair Color", CharCreation.menuHairColor);
    /*if (player.mf("m", "f") == "m") {
        if (player.hasBeard()) {
            outputText("Beard: " + player.beardDescript() + "<br>");
        }
        addButton(2, "Beard Style", menuBeardSettings);
    }*/
    //addButton(3, "Set Height", setHeight);
    //if (player.hasCock()) addButton(5, "Cock Size", menuCockLength);
    //addButton(6, "Breast Size", menuBreastSize);
    addButton(9, "Done", Intro.arrivalPartOne, true);
}
//Skin Colours
CharCreation.menuSkinComplexion = function() {
    clearOutput();
    outputText("What is your complexion?");
    menu();
    addButton(0, "Light", CharCreation.confirmComplexion, "light");
    addButton(1, "Fair", CharCreation.confirmComplexion, "fair");
    addButton(2, "Olive", CharCreation.confirmComplexion, "olive");
    addButton(3, "Dark", CharCreation.confirmComplexion, "dark");
    addButton(4, "Ebony", CharCreation.confirmComplexion, "ebony");
    addButton(5, "Mahogany", CharCreation.confirmComplexion, "mahogany");
    addButton(6, "Russet", CharCreation.confirmComplexion, "russet");
    addButton(14, "Back", CharCreation.customizeCharacterMenu);
}
CharCreation.confirmComplexion = function(complexion) {
    player.skinTone = complexion;
    CharCreation.customizeCharacterMenu();
}
//Hair Colours
CharCreation.menuHairColor = function() {
    clearOutput();
    outputText("What is your hair color?");
    menu();
    addButton(0, "Blonde", CharCreation.confirmHairColor, "blonde");
    addButton(1, "Brown", CharCreation.confirmHairColor, "brown");
    addButton(2, "Black", CharCreation.confirmHairColor, "black");
    addButton(3, "Red", CharCreation.confirmHairColor, "red");
    addButton(4, "Gray", CharCreation.confirmHairColor, "gray");
    addButton(5, "White", CharCreation.confirmHairColor, "white");
    addButton(6, "Auburn", CharCreation.confirmHairColor, "auburn");
    addButton(14, "Back", CharCreation.customizeCharacterMenu);
}
CharCreation.confirmHairColor = function(color) {
    player.hairColor = color;
    CharCreation.customizeCharacterMenu();
}

//------------
// PROLOGUE
//------------
Intro.arrivalPartOne = function() {
	clearOutput();
	outputText("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.<br><br>");
	outputText("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.<br><br>");
	outputText("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.<br><br>");
	outputText("The cave is unusually warm and damp, ");
	if (player.gender == GENDER_FEMALE)
		outputText("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
	else outputText("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
	outputText("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
	showStats();
	player.changeLust(15, false);
	doNext(Intro.arrivalPartTwo);
}
Intro.arrivalPartTwo = function() {
	clearOutput();
	hideUpDown();
	time.hours = 18;
	outputText("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
	if (player.gender == GENDER_FEMALE)
		outputText("the urge to chase down his rod and impale yourself on it.<br><br>");
	else
		outputText("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.<br><br>");
	outputText("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
	player.modStats("cor", 2);
	player.changeLust(40, false);
	doNext(Intro.arrivalPartThree);
}
Intro.arrivalPartThree = function() {
	clearOutput();
	hideUpDown();
	player.changeLust(-30, false);
	outputText("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.<br><br>In desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.<br><br>");
	outputText("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"<br><br>");
	outputText("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
	doNext(Intro.arrivalPartFour);
}
Intro.arrivalPartFour = function() {
	clearOutput();
	outputText("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.<br><br>It does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
	doNext(Camp.doCamp);
}