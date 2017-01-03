ConsumableEffects.beeTFs = function(type) {
    var pure = type == 1;
    var special = type == 2;
    var changes = 0;
    var changeLimit = 1;
    //Chances of boosting the change limit.
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Drink text
    if (special) {
        outputText("You uncork the bottle and pour the incredibly strong smelling concentrated honey down your throat. Its taste is also mighty intense. All at once you feel the effects of the substance start to course through your body.");
    }
    else { //Text for normal or pure
        outputText("Opening the crystal vial, you are greeted by a super-concentrated wave of sweet honey-scent. It makes you feel lightheaded. You giggle and lick the honey from your lips, having drank down the syrupy elixir without a thought.");
    }
    player.slimeFeed();
    player.refillHunger(15);
    if ((pure || special) && player.pregnancyType == PREGNANCY_FAERIE) { //Pure or special honey can reduce the corruption of a phouka baby
     if (gameFlags[PREGNANCY_CORRUPTION] > 1) { //Child is phouka, hates pure honey
     outputText("<br><br>You feel queasy and want to throw up.  There's a pain in your belly and you realize the baby you're carrying didn't like that at all.  Then again, maybe pure honey is good for it.");
     }
     else if (gameFlags[PREGNANCY_CORRUPTION] < 1) { //Child is faerie, loves pure honey
     outputText("<br><br>A warm sensation starts in your belly and runs all through your body.  It's almost as if you're feeling music and you guess your passenger enjoyed the meal.");
     }
     else { //Child is on the line, will become a faerie with this drink
     outputText("<br><br>At first you feel your baby struggle against the honey, then it seems to grow content and enjoy it.");
     }
     gameFlags[PREGNANCY_CORRUPTION]--;
     if (pure) return(false); //No transformative effects for the player because the pure honey was absorbed by the baby - Special honey will keep on giving
     }
    //Corruption reduction
    if (changes < changeLimit && pure) { //Special honey will also reduce corruption, but uses different text and is handled separately
        outputText("<br><br>");
        changes++;
        if (player.cor > 80) outputText("Your head aches, as if thunder was echoing around your skull. ");
        else if (player.cor > 60) outputText("You feel a headache forming just behind your eyes. In no time flat it reaches full strength. ");
        else if (player.cor > 40) outputText("A wave of stinging pain slices through your skull. ");
        else if (player.cor > 20) outputText("A prickling pain spreads throughout your skull. ");
        else outputText("You feel a mildly unpleasant tingling inside your skull. ");
        if (player.cor > 0) outputText("It quickly passes, leaving you more clearheaded");
        player.modStats("cor", -(1 + (player.cor / 20)));
        //Libido Reduction
        if (player.cor > 0 && changes < changeLimit && rand(1.5) == 0 && player.lib > 40) {
            outputText(" and settling your overcharged sex-drive a bit.");
            player.modStats("lib", -3, "lus", -20);
            changes++;
        }
        else if (player.cor > 0) outputText(".");
    }
    //bee item corollary:
    if (changes < changeLimit && player.hairType == 4 && rand(2) == 0) {
        //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
        outputText("<br><br>As you down the sticky-sweet honey, your head begins to feel heavier. Reaching up, you notice your tentacles becoming soft and somewhat fibrous. Pulling one down reveals that it feels and smells like the honey you just ate; you watch as it dissolves into many thin strands coated in the sugary syrup. <b>Your hair is back to normal (well, once you wash the honey out)!</b>");
        player.hairType = 0;
        changes++;
    }
    //(removes tentacle hair status, restarts hair growth if not prevented by reptile status)
    //Intelligence Boost
    if (changes < changeLimit && rand(2) == 0 && player.inte < 80) {
        player.modStats("int", 0.1 * (80 - player.inte));
        outputText("<br><br>You spend a few moments analyzing the taste and texture of the honey's residue, feeling awfully smart.");
        changes++;
    }
    //Sexual Stuff
    //No idears
    //Appearance Stuff
    //Hair Color
    if (changes < changeLimit && (player.hairColor != "shiny black" && player.hairColor != "black and yellow") && player.hairLength > 10 && rand(5) == 0) {
        outputText("<br><br>You feel your scalp tingling, and you grab your hair in a panic, pulling a strand forward. ");
        if (rand(9) == 0) player.hairColor = "black and yellow";
        else player.hairColor = "shiny black";
        outputText("Your hair is now " + player.hairColor + ", just like a bee-girl's!");
        changes++;
    }
    //Hair Length
    if (changes < changeLimit && player.hairLength < 25 && rand(3) == 0) {
        outputText("<br><br>Feeling a bit off-balance, you discover your hair has lengthened, ");
        player.hairLength += rand(4) + 1;
        outputText("becoming " + player.hairDescript() + ".");
        changes++;
    }
    //-Remove extra breast rows
    if (changes < changeLimit && player.bRows() > 2 && rand(3) == 0 && !hyperHappy) {
        changes++;
        outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ");
        if (player.bRows() >= 3) outputText("abdomen");
        else outputText("chest");
        outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ");
        if (player.skinType == SKIN_TYPE_FUR) outputText(player.hairColor + " " + player.skinDesc);
        else outputText(player.skinTone + " " + player.skinDesc);
        outputText(" remains. <b>You've lost a row of breasts!</b>");
        player.modStats("sen", -5);
        player.removeBreastRow(player.breastRows.length - 1, 1);
    }
    //Antennae
    if (changes < changeLimit && player.antennae == ANTENNAE_NONE && player.horns == 0 && rand(3) == 0) {
        outputText("<br><br>Your head itches momentarily as two floppy antennae sprout from your " + player.hairDescript() + ".");
        player.antennae = ANTENNAE_BEE;
        changes++;
    }
    //Horns
    if (changes < changeLimit && player.horns > 0 && rand(3) == 0) {
        player.horns = 0;
        player.hornType = HORNS_NONE;
        outputText("<br><br>Your horns crumble, falling apart in large chunks until they flake away to nothing.");
        changes++;
    }
    //Bee Legs
    if (changes < changeLimit && player.lowerBody != LOWER_BODY_TYPE_BEE && rand(4) == 0) {
        outputText("<br><br>Your legs tremble with sudden unbearable pain, as if they're being ripped apart from the inside out and being stitched together again all at once. You scream in agony as you hear bones snapping and cracking. A moment later the pain fades and you are able to turn your gaze down to your beautiful new legs, covered in shining black chitin from the thigh down, and downy yellow fuzz along your upper thighs.");
        player.lowerBody = LOWER_BODY_TYPE_BEE;
        player.legCount = 2;
        changes++;
    }
    //-Nipples reduction to 1 per tit.
    if (player.averageNipplesPerBreast() > 1 && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>A chill runs over your " + player.allBreastsDescript() + " and vanishes. You stick a hand under your " + player.clothedOrNakedUpper(player.armorDescript()) + " and discover that your extra nipples are missing! You're down to just one per ");
        if (player.biggestTitSize() < 1) outputText("'breast'.");
        else outputText("breast.");
        changes++;
        //Loop through and reset nipples
        for (var temp = 0; temp < player.breastRows.length; temp++) {
            player.breastRows[temp].nipplesPerBreast = 1;
        }
    }
    //Gain oviposition!
    if (changes < changeLimit && player.findPerk(PerkLib.BeeOvipositor) < 0 && player.tailType == TAIL_TYPE_BEE_ABDOMEN && rand(2) == 0) {
        outputText("<br><br>An odd swelling starts in your insectile abdomen, somewhere along the underside. Curling around, you reach back to your extended, bulbous bee part and run your fingers along the underside. You gasp when you feel a tender, yielding slit near the stinger. As you probe this new orifice, a shock of pleasure runs through you, and a tubular, black, semi-hard appendage drops out, pulsating as heavily as any sexual organ. <b>The new organ is clearly an ovipositor!</b> A few gentle prods confirm that it's just as sensitive; you can already feel your internals changing, adjusting to begin the production of unfertilized eggs. You idly wonder what laying them with your new bee ovipositor will feel like...");
        outputText("<br><br>(<b>Perk Gained: Bee Ovipositor - Allows you to lay eggs in your foes!</b>)");
        player.createPerk(PerkLib.BeeOvipositor, 0, 0, 0, 0);
        changes++;
    }
    //Bee butt - 66% lower chance if already has a tail
    if (changes < changeLimit && player.tailType != TAIL_TYPE_BEE_ABDOMEN && (player.tailType == TAIL_TYPE_NONE || rand(1.5) == 0) && rand(4) == 0) {
        if (player.tailType > TAIL_TYPE_NONE) outputText("<br><br>Painful swelling just above your " + player.buttDescript() + " doubles you over, and you hear the sound of your tail dropping off onto the ground! Before you can consider the implications, the pain gets worse, and you feel your backside bulge outward sickeningly, cracking and popping as a rounded bee-like abdomen grows in place of your old tail. It grows large enough to be impossible to hide, and with a note of finality, your stinger slides free with an audible 'snick'.");
        else outputText("<br><br>Painful swelling just above your " + player.buttDescript() + " doubles you over. It gets worse and worse as the swollen lump begins to protrude from your backside, swelling and rounding with a series of pops until you have a bulbous abdomen hanging just above your butt. The whole thing is covered in a hard chitinous material, and large enough to be impossible to hide. You sigh as your stinger slides into place with a 'snick', finishing the transformation. <b>You have a bee's abdomen.</b>");
        player.tailType = TAIL_TYPE_BEE_ABDOMEN;
        player.tailVenom = 10;
        player.tailRecharge = 2;
        changes++;
    }
    //Venom Increase
    if (changes < changeLimit && player.tailType == TAIL_TYPE_BEE_ABDOMEN && player.tailRecharge < 15 && rand(2)) {
        if (player.tailRecharge < 5) player.tailRecharge += 1;
        if (player.tailRecharge < 10) player.tailRecharge += 1;
        if (player.tailRecharge < 15) player.tailRecharge += 1;
        player.tailVenom += 50;
        if (player.tailVenom > 100) player.tailVenom = 100;
        outputText("<br><br>Your abdomen swells with vitality and a drop of venom escapes your stinger as it begins producing it in slightly larger quantities.");
        changes++;
    }
    //Wings
    //Grow bigger bee wings!
    if (changes < changeLimit && player.wingType == WING_TYPE_BEE_LIKE_SMALL && rand(4)) {
        changes++;
        player.wingType = WING_TYPE_BEE_LIKE_LARGE;
        player.wingDesc = "large bee-like";
        outputText("<br><br>Your wings tingle as they grow, filling out until they are large enough to lift you from the ground and allow you to fly! <b>You now have large bee wings!</b> You give a few experimental flaps and begin hovering in place, a giddy smile plastered on your face by the thrill of flight.");
    }

    //Grow new bee wings if player has none.
    if (changes < changeLimit && (player.wingType == WING_TYPE_NONE || player.wingType == WING_TYPE_SHARK_FIN) && rand(4)) {
        changes++;
        if (player.wingType == WING_TYPE_SHARK_FIN) outputText("<br><br>You feel an itching on your large back-fin as something begins growing there. You twist and contort yourself, trying to scratch and bring yourself relief, and failing miserably. A sense of relief erupts from you as you feel something new grow out from your fin. You hastily remove the top portion of your " + player.armor.equipmentName + " and marvel as a pair of small bee-like wings sprout from your back, replacing the fin that once grew there. Tenderly flexing your new muscles, you find you can flap them quite fast. Unfortunately you can't seem to flap your little wings fast enough to fly, but they would certainly slow a fall. A few quick modifications to your " + player.armor.equipmentName + " later and you are ready to continue your journey with <b>your new bee wings</b>.");
        else outputText("<br><br>You feel an itching between your shoulder-blades as something begins growing there. You twist and contort yourself, trying to scratch and bring yourself relief, and failing miserably. A sense of relief erupts from you as you feel something new grow out from your body. You hastily remove the top portion of your " + player.armor.equipmentName + " and marvel as a pair of small bee-like wings sprout from your back. Tenderly flexing your new muscles, you find you can flap them quite fast. Unfortunately you can't seem to flap your little wings fast enough to fly, but they would certainly slow a fall. A few quick modifications to your " + player.armor.equipmentName + " later and you are ready to continue your journey with <b>your new bee wings</b>.");
        player.wingType = WING_TYPE_BEE_LIKE_SMALL;
        player.wingDesc = "small bee-like";
    }
    //Melt demon wings!
    if (changes < changeLimit && (player.wingType == WING_TYPE_BAT_LIKE_TINY || player.wingType == WING_TYPE_BAT_LIKE_LARGE)) {
        changes++;
        outputText("<br><br>Your demonic wings ripple, jelly-like. Worried, you crane back to look, and to your horror, they're melting away! Runnels of amber honey trail down the wings' edges, building into a steady flow. <b>In a moment, the only remnant of your wings is a puddle of honey in the dirt</b>. Even that is gone in seconds, wicked into the dry soil.");
        player.wingType = WING_TYPE_NONE;
        player.wingDesc = "";
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
        player.gills = false;
        changes++;
    }
    if (special) { //All the speical honey effects occur after any normal bee transformations (if the player wasn't a full bee morph)
        //Cock growth multiplier.
        var mult = 1.0;
        if (player.cocks[0].cArea() >= 140) mult -= 0.2;
        if (player.cocks[0].cArea() >= 180) mult -= 0.2;
        if (player.cocks[0].cArea() >= 220) mult -= 0.2;
        if (player.cocks[0].cArea() >= 260) mult -= 0.2;
        if (player.cocks[0].cArea() >= 300) mult -= 0.1;
        if (player.cocks[0].cArea() >= 400) mult -= 0.1; //Cock stops growing at that point.
        //Begin TF
        if (!player.hasCock()) {
            outputText("<br><br>You double over in pain as the effects start to concentrate into your groin. You need to get release, but what you’ve got just isn’t cutting it. You fall to the ground and grab at your crotch, trying desperately to get the release you need. Finally, it happens. With a sudden burst of intense relief and sexual satisfaction, a new human looking penis bursts from your skin and sprays your seed all over the ground in front of you. When you’re able to recover and take a look at your new possession. <b>You now have an eight inch long human cock that is very sensitive to stimulation.</b>");
            player.createCock();
            player.cocks[0].cockLength = rand(3) + 8;
            player.cocks[0].cockThickness = 2;
            player.orgasm();
            player.modStats("sen", 10);
        }
        else if (player.cocks.length > 1) {
            var biggest = player.biggestCockIndex();
            outputText("<br><br>The effects of the honey move towards your groin, and into your " + player.multiCockDescriptLight() + ", causing them to stand at attention. They quiver for a moment, and feel rather itchy. Suddenly you are overwhelmed with pleasure as <b>your " + player.cockDescript(biggest) + " is absorbed into your " + player.cockDescript(0) + "!</b> You grab onto the merging cock and pump it with your hands as it increases in size and you cum in pleasure. Your " + player.cockDescript(0) + " seems a lot more sensitive now...");
            player.cocks[0].cockLength		+= 5 * Math.sqrt(0.2 * player.cocks[biggest].cArea());
            player.cocks[0].cockThickness	+= Math.sqrt(0.2 * player.cocks[biggest].cArea());
            player.removeCock(biggest, 1);
            player.orgasm();
            player.modStats("sen", 5);
        }
        else if (player.cocks[0].cArea() < 100) {
            outputText("<br><br>Your " + player.cockDescript(0) + " suddenly becomes rock hard and incredibly sensitive to the touch. You pull away your " + player.armor.equipmentName + ", and start to masturbate furiously as it rapidly swells in size. When the change finally finishes, you realize that your " + player.cockDescript(0) + " has both grown much longer and wider! <b>");
            if (player.cocks[0].cArea() <= 20)
                outputText("It now swings as low as your knees!");
            else if (player.cocks[0].cArea() <= 50)
                outputText("While erect, your massive member fills the lower half of your vision.");
            else outputText("Your member is now simply huge, you wonder what in the world could actually take your massive size now?");
            outputText("</b>");
            player.cocks[0].cockLength += (rand(3) + 4) * mult; //4 to 6 inches in length
            player.cocks[0].cockThickness += (0.1 * rand(5) + 0.5) * mult; //0.5 to 1 inches in thickness
            player.modStats("sen", 5);
        }
        else if (player.cocks[0].cockType != CockTypesEnum.BEE && player.race() == "bee-morph") {
            outputText("<br><br>Your huge member suddenly starts to hurt, especially the tip of the thing. At the same time, you feel your length start to get incredibly sensitive and the base of your shaft starts to itch. You tear off your " + player.armor.equipmentName + " and watch in fascination as your " + player.cockDescript(0) + " starts to change. The shaft turns black, while becoming hard and smooth to the touch, while the base develops a mane of four inch long yellow bee hair. As the transformation continues, your member grows even larger than before. However, it is the tip that keeps your attention the most, as a much finer layer of short yellow hairs grow around it. Its appearance isn’t the thing that you care about right now, it is the pain that is filling it.<br><br>");
            outputText("It is entirely different from the usual feeling you get when you’re cock grows larger from imbibing transformative substances. When the changes stop, the tip is shaped like a typical human mushroom cap covered in fine bee hair, but it feels nothing like what you’d expect a human dick to feel like. Your whole length is incredibly sensitive, and touching it gives you incredible stimulation, but you’re sure that no matter how much you rub it, you aren’t going to cum by yourself. You want cool honey covering it, you want tight walls surrounding it, you want to fertilize hundreds of eggs with it. These desires are almost overwhelming, and it takes a lot of will not to just run off in search of the bee girl that gave you that special honey right now. This isn’t good.<br><br>");
            outputText("<b>You now have a bee cock!</b>");
            player.cocks[0].cockType = CockTypesEnum.BEE;
            player.cocks[0].cockLength += 5 * mult;
            player.cocks[0].cockThickness += mult;
            player.modStats("sen", 15);
        }
        else {
            if (mult > 0) {
                outputText("<br><br>The effects of the honey don’t seem to focus on your groin this time, but you still feel your "  + player.cockDescript(0) + " grow slightly under your " + player.armor.equipmentName + ".");
                player.cocks[0].cockLength += (0.1 * rand(10) + 1) * mult;
                player.cocks[0].cockThickness += (0.1 * rand(2) + 0.1) * mult;
            }
            else {
                outputText("<br><br>The effects of the honey don’t seem to focus on your groin this time and you have a feeling that your " + player.cockDescript(0) + " hasn't grown at all! Perhaps you've reached the upper limit of cock growth from special honey?");
            }
            player.modStats("sen", 3);
        }
        if (player.cor >= 5) {
            outputText("<br><br>Your mind feels surprisingly clear of the twisted thoughts that have plagued it as of late, but you find yourself feeling more and more aroused than usual.");
            var corLoss = Math.min(0.1 * player.cor + 5, player.cor);
            player.modStats("cor", -corLoss, "lib", corLoss); //Lose corruption and gains that much libido
        }
        else {
            outputText("<br><br>You find your mind is drifting to the thought of using your member to fertilize hundreds and hundreds of eggs every day. You shake your head, the bizarre fantasy catching you completely off guard.");
            player.modStats("cor=", 0, "lib", 5);
        }
        if (player.femininity >= 60 || player.femininity <= 40) {
            outputText("<br><br>Your face shifts in shape, becoming more androgynous.");
            if (player.femininity >= 60)
                player.femininity -= 3;
            else player.femininity += 3;
        }
        player.modStats("lust", 0.2 * player.lib + 5);
    }
    gameFlags[TIMES_TRANSFORMED] += changes;
};

ConsumableEffects.canineTFs = function(type) {
    var temp2 = 0;
    var temp3 = 0;
    var crit = (rand(10) / 10) + 0.5;
    //Set up changes and changeLimit
    var changes = 0;
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Initial outputs & crit level
    switch(type) {
        case 0: //Normal
            if (crit)
                outputText("The pepper tastes particularly potent, searingly hot and spicy.");
            else
                outputText("The pepper is strangely spicy but very tasty.");
            break;
        case 1: //Oversized
            outputText("The pepper is so large and thick that you have to eat it in several large bites. It is not as spicy as the normal ones, but is delicious and flavorful.");
            break;
        case 2: //Double
            outputText("The double-pepper is strange, looking like it was formed when two peppers grew together near their bases.");
            break;
        case 3: //Black (Corruptive)
            outputText("This black pepper tastes sweet, but has a bit of a tangy aftertaste.");
            break;
        case 4: //Knotty
            outputText("The pepper is a bit tough to eat due to the swollen bulge near the base, but you manage to cram it down and munch on it. It's extra spicy!");
            break;
        case 5: //Bulbous
            outputText("You eat the pepper, even the two orb-like growths that have grown out from the base. It's delicious!");
            break;
    }
    player.refillHunger(15);
    //------------
    // BAD END
    //------------
    /*if (type <= 0 && crit > 1 && player.skinType == SKIN_TYPE_FUR && player.faceType == FACE_DOG && player.earType == EARS_DOG && player.lowerBody == LOWER_BODY_TYPE_DOG && player.tailType == TAIL_TYPE_DOG && rand(2) == 0 && player.findStatusAffect(StatusAffects.DogWarning) >= 0 && player.findPerk(PerkLib.TransformationResistance) < 0) {
     temp = rand(2);
     if (temp == 0) {
     outputText("<br><br>As you swallow the pepper, you note that the spicy hotness on your tongue seems to be spreading. Your entire body seems to tingle and burn, making you feel far warmer than normal, feverish even. Unable to stand it any longer you tear away your clothes, hoping to cool down a little. Sadly, this does nothing to aid you with your problem. On the bright side, the sudden feeling of vertigo you've developed is more than enough to take your mind off your temperature issues. You fall forward onto your hands and knees, well not really hands and knees to be honest. More like paws and knees. That can't be good, you think for a moment, before the sensation of your bones shifting into a quadrupedal configuration robs you of your concentration. After that, it is only a short time before your form is remade completely into that of a large dog, or perhaps a wolf. The distinction would mean little to you now, even if you were capable of comprehending it. ");
     if (player.findPerk(PerkLib.MarblesMilk) >= 0) outputText("All you know is that there is a scent on the wind, it is time to hunt, and at the end of the day you need to come home for your milk.");
     else outputText("All you know is that there is a scent on the wind, and it is time to hunt.");
     }
     if (temp == 1) outputText("<br><br>You devour the sweet pepper, carefully licking your fingers for all the succulent juices of the fruit, and are about to go on your way when suddenly a tightness begins to build in your chest and stomach, horrid cramps working their way first through your chest, then slowly flowing out to your extremities, the feeling soon joined by horrible, blood-curdling cracks as your bones begin to reform, twisting and shifting, your mind exploding with pain. You fall to the ground, reaching one hand forward. No... A paw, you realize in horror, as you try to push yourself back up. You watch in horror, looking down your foreleg as thicker fur erupts from your skin, a " + player.hairColor + " coat slowly creeping from your bare flesh to cover your body. Suddenly, you feel yourself slipping away, as if into a dream, your mind warping and twisting, your body finally settling into its new form. With one last crack of bone you let out a yelp, kicking free of the cloth that binds you, wresting yourself from its grasp and fleeing into the now setting sun, eager to find prey to dine on tonight.");
     gameOver();
     return;
     }
     //WARNING, overdose VERY close!
     if (type <= 0 && player.skinType == SKIN_TYPE_FUR && player.faceType == FACE_DOG && player.tailType == TAIL_TYPE_DOG && player.earType == EARS_DOG && player.lowerBody == LOWER_BODY_TYPE_DOG && player.findStatusAffect(StatusAffects.DogWarning) >= 0 && rand(3) == 0) {
     outputText("<b><br><br>Eating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
     }
     //WARNING, overdose is close!
     if (type <= 0 && player.skinType == SKIN_TYPE_FUR && player.faceType == FACE_DOG && player.tailType == TAIL_TYPE_DOG && player.earType == EARS_DOG && player.lowerBody == LOWER_BODY_TYPE_DOG && player.findStatusAffect(StatusAffects.DogWarning) < 0) {
     player.createStatusAffect(StatusAffects.DogWarning, 0, 0, 0, 0);
     outputText("<b><br><br>Eating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
     }*/
    //------------
    // STATS CHANGES
    //------------
    if (type == 3) {
        player.modStats("lib", 2 + rand(4), "lus", 5 + rand(5), "cor", 2 + rand(4));
        outputText("<br><br>You feel yourself relaxing as gentle warmth spreads through your body. Honestly you don't think you'd mind running into a demon or monster right now, they'd make for good entertainment.");
        if (player.cor < 50) outputText(" You shake your head, blushing hotly. Where did that thought come from?");
    }
    if (player.str < 50 && rand(3) == 0) {
        player.modStats("str", (crit));
        if (crit > 1) outputText("<br><br>Your muscles ripple and grow, bulging outwards.");
        else outputText("<br><br>Your muscles feel more toned.");
        changes++;
    }
    if (player.spe < 30 && rand(3) == 0 && changes < changeLimit) {
        player.modStats("spe", (crit));
        if (crit > 1) outputText("<br><br>You find your muscles responding quicker, faster, and you feel an odd desire to go for a walk.");
        else outputText("<br><br>You feel quicker.");
        changes++;
    }
    if (player.inte > 30 && rand(3) == 0 && changes < changeLimit && type != 3) {
        player.modStats("int", (-1 * crit));
        outputText("<br><br>You feel ");
        if (crit > 1) outputText("MUCH ");
        outputText("dumber.");
        changes++;
    }
    //------------
    // NORMALIZATION
    //------------
    //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_HARPY && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating. The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_SPIDER && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your arms' chitinous covering is flaking away. The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //-Remove feathery hair (copy for equinum, canine peppers, Labova)
    if (changes < changeLimit && player.hairType == 1 && rand(4) == 0) {
        //(long):
        if (player.hairLength >= 6) outputText("<br><br>A lock of your downy-soft feather-hair droops over your eye. Before you can blow the offending down away, you realize the feather is collapsing in on itself. It continues to curl inward until all that remains is a normal strand of hair. <b>Your hair is no longer feathery!</b>");
        //(short)
        else outputText("<br><br>You run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested. While your hand is up there, it detects a change in the texture of your feathers. They're completely disappearing, merging down into strands of regular hair. <b>Your hair is no longer feathery!</b>");
        changes++;
        player.hairType = HAIR_NORMAL;
    }
    //Remove odd eyes
    if (changes < changeLimit && rand(5) == 0 && player.eyeType > EYES_HUMAN) {
        if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP) {
            outputText("<br><br>You feel a twinge in your eyes and you blink. It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
        }
        else {
            outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you. As you steady and open your eyes, you realize something seems different. Your vision is changed somehow.");
            if (player.eyeType == EYES_FOUR_SPIDER_EYES) outputText(" Your multiple, arachnid eyes are gone!</b>");
            outputText(" <b>You have normal, humanoid eyes again.</b>");
        }
        player.eyeType = EYES_HUMAN;
        changes++;
    }
    //------------
    // SEXUAL TFs
    //------------
    //Double Pepper!
    //Xforms/grows dicks to make you have two dogcocks
    if (type == 2) {
        //If already doubled up, GROWTH
        if (player.countCocksOfType(CockTypesEnum.DOG) >= 2) {
            type = 1;
        }
        //If player doesnt have 2 dogdicks
        else {
            //If player has NO dogdicks
            if (player.countCocksOfType(CockTypesEnum.DOG) == 0) {
                //Dickless - grow two dogpeckers
                if (player.cockTotal() == 0) {
                    player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
                    player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
                    outputText("<br><br>" + player.clothedOrNakedLower("A painful lump forms on your groin, nearly doubling you over as it presses against your " + player.armor.equipmentName + ". You rip open your gear and", "An erecting sensation forms in your groin. You") + " watch, horrified as the discolored skin splits apart, revealing a pair of red-tipped points. A feeling of relief, and surprising lust grows as they push forward, glistening red and thickening. The skin bunches up into an animal-like sheath, while a pair of fat bulges pop free. You now have two nice thick dog-cocks, with decent sized knots. Both pulse and dribble animal-pre, arousing you in spite of your attempts at self-control. ");
                    player.cocks[0].knotMultiplier = 1.7;
                    player.cocks[0].cockType = CockTypesEnum.DOG;
                    player.cocks[1].knotMultiplier = 1.7;
                    player.cocks[1].cockType = CockTypesEnum.DOG;
                    player.changeLust(50, true);
                }
                //1 dick - grow 1 and convert 1
                else if (player.cockTotal() == 1) {
                    outputText("<br><br>Your " + player.cockDescript(0) + " vibrates, the veins clearly visible as it reddens and distorts. The head narrows into a pointed tip while a gradually widening bulge forms around the base. Where it meets your crotch, the skin bunches up around it, forming a canine-like sheath. ");
                    player.cocks[0].cockType = CockTypesEnum.DOG;
                    player.cocks[0].knotMultiplier = 1.5;
                    outputText("You feel something slippery wiggling inside the new sheath, and another red point peeks out. In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free. The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal. ");
                    player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
                    player.cocks[1].knotMultiplier = 1.7;
                    player.cocks[1].cockType = CockTypesEnum.DOG;
                    player.modStats("lib", 2);
                    player.changeLust(50, true);
                }
                //2 dicks+ - convert first 2 to doggie-dom
                else {
                    outputText("<br><br>Your crotch twitches, and you pull open your " + player.armor.equipmentName + " to get a better look. You watch in horror and arousal as your " + player.cockDescript(0) + " and " + player.cockDescript(1) + " both warp and twist, becoming red and pointed, growing thick bulges near the base. When it stops you have two dog-cocks and an animal-like sheath. The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed. ");
                    player.cocks[0].cockType = CockTypesEnum.DOG;
                    player.cocks[1].cockType = CockTypesEnum.DOG;
                    player.cocks[0].knotMultiplier = 1.4;
                    player.cocks[1].knotMultiplier = 1.4;
                    player.modStats("lib", 2);
                    player.changeLust(50, true);
                }
            }
            //If player has 1 dogdicks
            else {
                //if player has 1 total
                if (player.cockTotal() == 1) {
                    outputText("<br><br>You feel something slippery wiggling inside your sheath, and another red point peeks out. In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free. The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal. ");
                    player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
                    player.cocks[1].cockType = CockTypesEnum.DOG;
                    player.cocks[1].knotMultiplier = 1.4;
                    player.modStats("lib", 2);
                    player.changeLust(50, true);
                }
                //if player has more
                if (player.cockTotal() >= 1) {
                    //if first dick is already doggi'ed
                    if (player.cocks[0].cockType == CockTypesEnum.DOG) {
                        outputText("<br><br>Your crotch twitches, and you pull open your " + player.armor.equipmentName + " to get a better look. You watch in horror and arousal as your " + player.cockDescript(1) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base. When it stops you have two dog-cocks and an animal-like sheath. The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed. ");
                        player.cocks[1].cockType = CockTypesEnum.DOG;
                        player.cocks[1].knotMultiplier = 1.4;
                    }
                    //first dick is not dog
                    else {
                        outputText("<br><br>Your crotch twitches, and you pull open your " + player.armor.equipmentName + " to get a better look. You watch in horror and arousal as your " + player.cockDescript(0) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base. When it stops you have two dog-cocks and an animal-like sheath. The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed. ");
                        player.cocks[0].cockType = CockTypesEnum.DOG;
                        player.cocks[0].knotMultiplier = 1.4;
                    }
                    player.modStats("lib", 2);
                    player.changeLust(50, true);
                }
            }
        }
        player.genderCheck();
    }
    //Knotty knot pepper!
    if (type == 4) {
        //Cocks only!
        if (player.cockTotal() > 0) {
            //biggify knots
            if (player.countCocksOfType(CockTypesEnum.DOG) > 0) {
                var temp = 0;
                //set temp2 to first dogdick for initialization
                while (temp < player.cocks.length) {
                    if (player.cocks[temp].cockType == CockTypesEnum.DOG) {
                        temp2 = temp;
                        break;
                    }
                    else temp++;
                }
                //Reset temp for nex tcheck
                temp = player.cocks.length;
                //Find smallest knot
                while (temp > 0) {
                    temp--;
                    if (player.cocks[temp].cockType == CockTypesEnum.DOG && player.cocks[temp].knotMultiplier < player.cocks[temp2].knotMultiplier) temp2 = temp;
                }
                //Have smallest knotted cock selected.
                temp3 = (rand(2) + 5) / 20 * crit;
                if (player.cocks[temp2].knotMultiplier >= 1.5) temp3 /= 2;
                if (player.cocks[temp2].knotMultiplier >= 1.75) temp3 /= 2;
                if (player.cocks[temp2].knotMultiplier >= 2) temp3 /= 5;
                player.cocks[temp2].knotMultiplier += (temp3);
                outputText("<br><br>");
                if (temp3 < .06) outputText("Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " feels unusually tight in your sheath as your knot grows.");
                if (temp3 >= .06 && temp3 <= .12) outputText("Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " pops free of your sheath, thickening nicely into a bigger knot.");
                if (temp3 > .12) outputText("Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " surges free of your sheath, swelling thicker with each passing second. Your knot bulges out at the base, growing far beyond normal.");
                player.modStats("sen", .5, "lus", 5 * crit);
            }
            //Grow dogdick with big knot
            else {
                outputText("<br><br>Your " + player.cockDescript(0) + " twitches, reshaping itself. The crown tapers down to a point while the base begins swelling. It isn't painful in the slightest, actually kind of pleasant. Your dog-like knot slowly fills up like a balloon, eventually stopping when it's nearly twice as thick as the rest. You touch and shiver with pleasure, oozing pre-cum.");
                player.cocks[0].cockType = CockTypesEnum.DOG;
                player.cocks[0].knotMultiplier = 2.1;
            }
        }
        //You wasted knot pepper!
        else outputText("<br><br>A slight wave of nausea passes through you. It seems this pepper does not quite agree with your body.");
    }
    //GROW BALLS
    if (type == 5) {
        if (player.balls <= 1) {
            outputText("<br><br>A spike of pain doubles you up, nearly making you vomit. You stay like that, nearly crying, as a palpable sense of relief suddenly washes over you. You look down and realize you now have a small sack, complete with two relatively small balls.");
            player.balls = 2;
            player.ballSize = 1;
            player.modStats("lib", 2, "lus", -10);
        }
        else {
            //Makes your balls biggah!
            player.ballSize++;
            //They grow slower as they get bigger...
            if (player.ballSize > 10) player.ballSize -= .5;
            //Texts
            if (player.ballSize <= 2) outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin. You pause to examine the changes and your roving fingers discover your " + player.ballsDescriptLight() + " have grown larger than a human's.");
            if (player.ballSize > 2) outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your " + player.sackDescript() + ". Walking becomes difficult as you discover your " + player.ballsDescriptLight() + " have enlarged again.");
            player.modStats("lib", 1, "lus", 3);
        }
    }
    //Sexual Stuff Now
    //------------------
    //Man-Parts
    //3 Changes,
    //1. Cock Xform
    //2. Knot Size++
    //3. cumMultiplier++ (to max of 1.5)
    if (player.cocks.length > 0) {
        //Grow knot on smallest knotted dog cock
        if (type != 4 && player.countCocksOfType(CockTypesEnum.DOG) > 0 && ((changes < changeLimit && rand(1.4) == 0) || type == 1)) {
            temp = 0;
            //set temp2 to first dogdick for initialization
            while (temp < player.cocks.length) {
                if (player.cocks[temp].cockType == CockTypesEnum.DOG) {
                    temp2 = temp;
                    break;
                }
                else temp++;
            }
            //Reset temp for nex tcheck
            temp = player.cocks.length;
            //Find smallest knot
            while (temp > 0) {
                temp--;
                if (player.cocks[temp].cockType == CockTypesEnum.DOG && player.cocks[temp].knotMultiplier < player.cocks[temp2].knotMultiplier) temp2 = temp;
            }
            //Have smallest knotted cock selected.
            temp3 = (rand(2) + 1) / 20 * crit;
            if (player.cocks[temp2].knotMultiplier >= 1.5) temp3 /= 2;
            if (player.cocks[temp2].knotMultiplier >= 1.75) temp3 /= 2;
            if (player.cocks[temp2].knotMultiplier >= 2) temp3 /= 5;
            player.cocks[temp2].knotMultiplier += (temp3);
            if (temp3 < .06) outputText("<br><br>Your " + player.cockDescript(temp2) + " feels unusually tight in your sheath as your knot grows.");
            if (temp3 >= .06 && temp3 <= .12) outputText("<br><br>Your " + player.cockDescript(temp2) + " pops free of your sheath, thickening nicely into a bigger knot.");
            if (temp3 > .12) outputText("<br><br>Your " + player.cockDescript(temp2) + " surges free of your sheath, swelling thicker with each passing second. Your knot bulges out at the base, growing far beyond normal.");
            player.modStats("sen", .5, "lus", 5 * crit);
            changes++;
        }
        //Cock Xform if player has free cocks.
        if (player.countCocksOfType(CockTypesEnum.DOG) < player.cocks.length && ((changes < changeLimit && rand(1.6)) || type == 1) == 0) {
            //Select first human cock
            temp = player.cocks.length;
            temp2 = 0;
            while (temp > 0 && temp2 == 0) {
                temp--;
                //Store cock index if not a dogCock and exit loop.
                if (player.cocks[temp].cockType != CockTypesEnum.DOG) {
                    temp3 = temp;
                    //kicking out of tah loop!
                    temp2 = 1000;
                }
            }
            //Talk about it
            //Hooooman
            if (player.cocks[temp3].cockType == CockTypesEnum.HUMAN) {
                outputText("<br><br>Your " + player.cockDescript(temp3) + " clenches painfully, becoming achingly, throbbingly erect. A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath. You shudder as the crown of your " + player.cockDescript(temp3) + " reshapes into a point, the sensations nearly too much for you. You throw back your head as the transformation completes, your " + Appearance.cockNoun(CockTypesEnum.DOG) + " much thicker than it ever was before. <b>You now have a dog-cock.</b>");
                player.modStats("sen", 10, "lus", 5 * crit);
            }
            //Horse
            if (player.cocks[temp3].cockType == CockTypesEnum.HORSE) {
                outputText("<br><br>Your " + Appearance.cockNoun(CockTypesEnum.HORSE) + " shrinks, the extra equine length seeming to shift into girth. The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath. <b>You now have a dog-cock.</b>");
                //Tweak length/thickness.
                if (player.cocks[temp3].cockLength > 6) player.cocks[temp3].cockLength -= 2;
                else player.cocks[temp3].cockLength -= .5;
                player.cocks[temp3].cockThickness += .5;

                player.modStats("sen", 4, "lus", 5 * crit);
            }
            //Tentacular Tuesday!
            if (player.cocks[temp3].cockType == CockTypesEnum.TENTACLE) {
                outputText("<br><br>Your " + player.cockDescript(temp3) + " coils in on itself, reshaping and losing its plant-like coloration as it thickens near the base, bulging out in a very canine-looking knot. Your skin bunches painfully around the base, forming into a sheath. <b>You now have a dog-cock.</b>");
                player.modStats("sen", 4, "lus", 5 * crit);
            }
            //Misc
            if (player.cocks[temp3].cockType > 4) { //TODO Was cockType.Index. Forgot what replaces that.
                outputText("<br><br>Your " + player.cockDescript(temp3) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base. <b>You now have a dog-cock.</b>");
                player.modStats("sen", 4, "lus", 5 * crit);
            }
            temp = 0;
            //Demon
            if (player.cocks[temp3].cockType == CockTypesEnum.DEMON) {
                outputText("<br><br>Your " + player.cockDescript(temp3) + " color shifts red for a moment and begins to swell at the base, but within moments it smooths out, retaining its distinctive demonic shape, only perhaps a bit thicker.");
                player.modStats("sen", 1, "lus", 2 * crit);
                temp = 1;
            }
            //Xform it!
            player.cocks[temp3].cockType = CockTypesEnum.DOG;
            player.cocks[temp3].knotMultiplier = 1.1;
            player.cocks[temp3].thickenCock(2);
            if (temp == 1) {
                player.cocks[temp3].cockType = CockTypesEnum.DEMON;
            }
            changes++;

        }
        //Cum Multiplier Xform
        if (player.cumMultiplier < 2 && rand(2) == 0 && changes < changeLimit) {
            temp = 1.5;
            //Lots of cum raises cum multiplier cap to 2 instead of 1.5
            if (player.findPerk(PerkLib.MessyOrgasms) >= 0) temp = 2;
            if (temp < player.cumMultiplier + .05 * crit) {
                changes--;
            }
            else {
                player.cumMultiplier += .05 * crit;
                //Flavor text
                if (player.balls == 0) outputText("<br><br>You feel a churning inside your gut as something inside you changes.");
                if (player.balls > 0) outputText("<br><br>You feel a churning in your " + player.ballsDescriptLight() + ". It quickly settles, leaving them feeling somewhat more dense.");
                if (crit > 1) outputText(" A bit of milky pre dribbles from your " + player.multiCockDescriptLight() + ", pushed out by the change.");
            }
            changes++;
        }
        //Oversized pepper
        if (type == 1) {
            //GET LONGER
            //single cock
            if (player.cocks.length == 1) {
                temp2 = player.increaseCock(0, rand(4) + 3);
                temp = 0;
                player.modStats("sen", 1, "lus", 10);
            }
            //Multicock
            else {
                //Find smallest cock
                //Temp2 = smallness size
                //temp = current smallest
                temp3 = player.cocks.length;
                temp = 0;
                while (temp3 > 0) {
                    temp3--;
                    //If current cock is smaller than saved, switch values.
                    if (player.cocks[temp].cockLength > player.cocks[temp3].cockLength) {
                        temp2 = player.cocks[temp3].cockLength;
                        temp = temp3;
                    }
                }
                //Grow smallest cock!
                //temp2 changes to growth amount
                temp2 = player.increaseCock(temp, rand(4) + 3);
                player.modStats("sen", 1, "lus", 10);
                if (player.cocks[temp].cockThickness <= 2) player.cocks[temp].thickenCock(1);
            }
            if (temp2 > 2) outputText("<br><br>Your " + player.cockDescript(temp) + " tightens painfully, inches of bulging dick-flesh pouring out from your crotch as it grows longer. Thick pre forms at the pointed tip, drawn out from the pleasure of the change.");
            if (temp2 > 1 && temp2 <= 2) outputText("<br><br>Aching pressure builds within your crotch, suddenly releasing as an inch or more of extra dick-flesh spills out. A dollop of pre beads on the head of your enlarged " + player.cockDescript(temp) + " from the pleasure of the growth.");
            if (temp2 <= 1) outputText("<br><br>A slight pressure builds and releases as your " + player.cockDescript(temp) + " pushes a bit further out of your crotch.");
        }
    }
    //Female Stuff
    //Multiboobages
    if (player.breastRows.length > 0) {
        //if bigger than A cup
        if (player.breastRows[0].breastRating > 0 && player.vaginas.length > 0) {
            //Doggies only get 3 rows of tits! FENOXO HAS SPOKEN
            if (player.breastRows.length < 3 && rand(2) == 0 && changes < changeLimit) {
                player.createBreastRow();
                //Store temp to the index of the newest row
                temp = player.breastRows.length - 1;
                //Breasts are too small to grow a new row, so they get bigger first
                //But ONLY if player has a vagina (dont want dudes weirded out)
                if (player.vaginas.length > 0 && player.breastRows[0].breastRating <= player.breastRows.length) {
                    outputText("<br><br>Your " + player.breastDescript(0) + " feel constrained and painful against your top as they grow larger by the moment, finally stopping as they reach ");
                    player.breastRows[0].breastRating += 2;
                    outputText(player.breastCup(0) + " size. But it doesn't stop there, you feel a tightness beginning lower on your torso...");
                    changes++;
                }
                //Had 1 row to start
                if (player.breastRows.length == 2) {
                    //1 size below primary breast row!
                    player.breastRows[temp].breastRating = player.breastRows[0].breastRating - 1;
                    if (player.breastRows[0].breastRating - 1 == 0) outputText("<br><br>A second set of breasts forms under your current pair, stopping while they are still fairly flat and masculine looking.");
                    else outputText("<br><br>A second set of breasts bulges forth under your current pair, stopping as they reach " + player.breastCup(temp) + "s.");
                    outputText(" A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
                    player.modStats("sen", 6, "lus", 5);
                    changes++;
                }
                //Many breast Rows - requires larger primary tits...
                if (player.breastRows.length > 2 && player.breastRows[0].breastRating > player.breastRows.length) {
                    player.modStats("sen", 6, "lus", 5);
                    //New row's size = the size of the row above -1
                    player.breastRows[temp].breastRating = player.breastRows[temp - 1].breastRating - 1;
                    //If second row are super small but primary row is huge it could go negative.
                    //This corrects that problem.
                    if (player.breastRows[temp].breastRating < 0) player.breastRows[temp].breastRating = 0;
                    if (player.breastRows[temp - 1].breastRating < 0) player.breastRows[temp - 1].breastRating = 0;
                    if (player.breastRows[temp].breastRating == 0) outputText("<br><br>Your abdomen tingles and twitches as a new row of breasts sprouts below the others. Your new breasts stay flat and masculine, not growing any larger.");
                    else outputText("<br><br>Your abdomen tingles and twitches as a new row of " + player.breastCup(temp) + " " + player.breastDescript(temp) + " sprouts below your others.");
                    outputText(" A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
                    changes++;
                }
                //Extra sensitive if crit
                if (crit > 1) {
                    if (crit > 2) {
                        outputText(" You heft your new chest experimentally, exploring the new flesh with tender touches. Your eyes nearly roll back in your head from the intense feelings.");
                        player.modStats("sen", 6, "lus", 15, "cor", 0)
                    }
                    else {
                        outputText(" You touch your new nipples with a mixture of awe and desire, the experience arousing beyond measure. You squeal in delight, nearly orgasming, but in time finding the willpower to stop yourself.");
                        player.modStats("sen", 3, "lus", 10);
                    }
                }

            }
            //If already has max doggie breasts!
            else if (rand(2) == 0) {
                //Check for size mismatches, and move closer to spec!
                temp = player.breastRows.length;
                temp2 = 0;
                var evened = false;
                //Check each row, and if the row above or below it is
                while (temp > 1 && temp2 == 0) {
                    temp--;
                    //Gimme a sec
                    if (player.breastRows[temp].breastRating + 1 < player.breastRows[temp - 1].breastRating) {
                        if (!evened) {
                            evened = true;
                            outputText("<br>");
                        }
                        outputText("<br>Your ");
                        if (temp == 0) outputText("first ");
                        if (temp == 1) outputText("second ");
                        if (temp == 2) outputText("third ");
                        if (temp == 3) outputText("fourth ");
                        if (temp == 4) outputText("fifth ");
                        if (temp > 4) outputText("");
                        outputText("row of " + player.breastDescript(temp) + " grows larger, as if jealous of the jiggling flesh above.");
                        temp2 = (player.breastRows[temp - 1].breastRating) - player.breastRows[temp].breastRating - 1;
                        if (temp2 > 5) temp2 = 5;
                        if (temp2 < 1) temp2 = 1;
                        player.breastRows[temp].breastRating += temp2;
                    }
                }
            }
        }
    }
    //Grow tits if have NO breasts/nipples AT ALL
    else if (rand(2) == 0 && changes < changeLimit) {
        outputText("<br><br>Your chest tingles uncomfortably as your center of balance shifts. <b>You now have a pair of B-cup breasts.</b>");
        outputText(" A sensitive nub grows on the summit of each tit, becoming a new nipple.");
        player.createBreastRow();
        player.breastRows[0].breastRating = 2;
        player.breastRows[0].breasts = 2;
        player.modStats("sen", 4, "lus", 6);
        changes++;
    }
    //Go into heat
    if (rand(2) == 0 && changes < changeLimit) {
        if (player.goIntoHeat(true)) {
            changes++;
        }
    }
    //------------
    // BODY TFs
    //------------
    if (changes < changeLimit && player.dogScore() >= 3 && rand(4) == 0) {
        changes++;
        outputText("<br><br>Images and thoughts come unbidden to your mind, overwhelming your control as you rapidly lose yourself in them, daydreaming of... ");
        //cawk fantasies
        if (player.gender <= 1 || (player.gender == 3 && rand(2) == 0)) {
            outputText("bounding through the woods, hunting with your master. Feeling the wind in your fur and the thrill of the hunt coursing through your veins intoxicates you. You have your nose to the ground, tracking your quarry as you run, until a heavenly scent stops you in your tracks.");
            player.modStats("lus", 5 + player.lib / 20);
            //break1
            if (player.cor < 33 || !player.hasCock()) outputText("<br>You shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
            else {
                outputText(" Heart pounding, your shaft pops free of its sheath on instinct, as you take off after the new scent. Caught firmly in the grip of a female's heat, you ignore your master's cry as you disappear into the wild, " + Appearance.cockNoun(CockTypesEnum.DOG) + " growing harder as you near your quarry. You burst through a bush, spotting a white-furred female. She drops, exposing her dripping fem-sex to you, the musky scent of her sex channeling straight through your nose and sliding into your " + Appearance.cockNoun(CockTypesEnum.DOG) + ".");
                player.modStats("lus", 5 + player.lib / 20);
                //Break 2
                if (player.cor < 66) outputText("<br>You blink a few times, the fantasy fading as you master yourself. That daydream was so strange, yet so hot.");
                else {
                    outputText(" Unable to wait any longer, you mount her, pressing your bulging knot against her vulva as she yips in pleasure. The heat of her sex is unreal, the tight passage gripping you like a vice as you jackhammer against her, biting her neck gently in spite of the violent pounding.");
                    player.modStats("lus", 5 + player.lib / 20);
                    //break3
                    if (player.cor < 80) {
                        if (player.vaginas.length > 0) outputText("<br>You reluctantly pry your hand from your aching " + player.vaginaDescript(0) + " as you drag yourself out of your fantasy.");
                        else outputText("<br>You reluctantly pry your hand from your aching " + player.cockDescript(0) + " as you drag yourself out of your fantasy.");
                    }
                    else {
                        outputText(" At last your knot pops into her juicy snatch, splattering her groin with a smattering of her arousal. The scents of your mating reach a peak as the velvet vice around your " + Appearance.cockNoun(CockTypesEnum.DOG) + " quivers in the most indescribably pleasant way. You clamp down on her hide as your whole body tenses, unleashing a torrent of cum into her sex. Each blast is accompanied by a squeeze of her hot passage, milking you of the last of your spooge. Your " + player.legs() + " give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                        player.modStats("lus", 5 + player.lib / 20);
                    }
                }
            }
        }
        //Pure female fantasies
        else if (player.hasVagina()) {
            outputText("wagging your dripping " + player.vaginaDescript(0) + " before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at your fertile scent.");
            player.modStats("lus", 5 + player.lib / 20);
            //BREAK 1
            if (player.cor < 33) {
                outputText("<br>You shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
            }
            else {
                outputText(" In moments they begin their advance, plunging their pointed beast-dicks into you, one after another. You yip and howl with pleasure as each one takes his turn knotting you.");
                player.modStats("lus", 5 + player.lib / 20);
                //BREAK 2
                if (player.cor <= 66) {
                    outputText("<br>You blink a few times, the fantasy fading as you master yourself. That daydream was so strange, yet so hot.");
                }
                else {
                    outputText(" The feeling of all that hot wolf-spooge spilling from your overfilled snatch and running down your thighs is heavenly, nearly making you orgasm on the spot. You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to breed you.");
                    player.modStats("lus", 5 + player.lib / 20);
                    //break3
                    if (player.cor < 80) {
                        outputText("<br>You reluctantly pry your hand from your aching " + player.vaginaDescript(0) + " as you drag yourself out of your fantasy.");
                    }
                    else {
                        outputText(" You growl with discomfort as he pushes into your abused wetness, stretching you tightly, every beat of his heart vibrating through your nethers. With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                        player.modStats("lus", 5 + player.lib / 20);
                    }
                }
            }
        }
        else {
            outputText("wagging your [asshole] before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at you after going so long without a female in the pack.");
            player.modStats("lus", 5 + player.lib / 20);
            //BREAK 1
            if (player.cor < 33) {
                outputText("<br>You shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
            }
            else {
                outputText(" In moments they begin their advance, plunging their pointed beast-dicks into you, one after another. You yip and howl with pleasure as each one takes his turn knotting you.");
                player.modStats("lus", 5 + player.lib / 20);
                //BREAK 2
                if (player.cor <= 66) {
                    outputText("<br>You blink a few times, the fantasy fading as you master yourself. That daydream was so strange, yet so hot.");
                }
                else {
                    outputText(" The feeling of all that hot wolf-spooge spilling from your overfilled ass and running down your thighs is heavenly, nearly making you orgasm on the spot. You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to spend his lust on you.");
                    player.modStats("lus", 5 + player.lib / 20);
                    //break3
                    if (player.cor < 80) {
                        outputText("<br>You reluctantly pry your hand from your aching asshole as you drag yourself out of your fantasy.");
                    }
                    else {
                        outputText(" You growl with discomfort as he pushes into your abused, wet hole, stretching you tightly, every beat of his heart vibrating through your hindquarters. With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                        player.modStats("lus", 5 + player.lib / 20);
                    }
                }
            }
        }
    }
    //------------
    // BODY TFs
    //------------
    //Master Furry Appearance Order:
    //Tail -> Ears -> Paws -> Fur -> Face
    //Dog-face requires fur & paws  Should be last morph to take place
    if (rand(5) == 0 && changes < changeLimit &&
        player.faceType != FACE_DOG && player.skinType == SKIN_TYPE_FUR &&
        player.lowerBody == LOWER_BODY_TYPE_DOG) {
        if (player.faceType == FACE_HORSE) outputText("<br><br>Your face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your horse-like features rearrange to take on many canine aspects.</b>");
        else outputText("<br><br>Your face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection...<b>your face is now a cross between human and canine features.</b>");
        player.faceType = FACE_DOG;
        changes++;
    }
    if (type == 3 && player.hairColor != "midnight black") {
        if (player.skinType == SKIN_TYPE_FUR) outputText("<b><br><br>Your fur and hair tingles, growing in thicker than ever as darkness begins to spread from the roots, turning it midnight black.</b>");
        else outputText("<b><br><br>Your " + player.skinDesc + " itches like crazy as fur grows out from it, coating your body. It's incredibly dense and black as the middle of a moonless night.</b>");
        player.skinType = SKIN_TYPE_FUR;
        player.skinAdj = "thick";
        player.skinDesc = "fur";
        player.hairColor = "midnight black";
        player.furColor = player.hairColor;
    }
    //Become furred - requires paws and tail
    if (rand(4) == 0 && changes < changeLimit && player.lowerBody == LOWER_BODY_TYPE_DOG && player.tailType == TAIL_TYPE_DOG && player.skinType != SKIN_TYPE_FUR) {
        if (player.skinType == SKIN_TYPE_PLAIN) outputText("<br><br>Your skin itches intensely. You gaze down as more and more hairs break forth from your skin, quickly transforming into a soft coat of fur. <b>You are now covered in " + player.furColor + " fur from head to toe.</b>");
        if (player.skinType == SKIN_TYPE_SCALES) outputText("<br><br>Your scales itch incessantly. You scratch, feeling them flake off to reveal a coat of " + player.furColor + " fur growing out from below! <b>You are now covered in " + player.furColor + " fur from head to toe.</b>");
        player.skinType = SKIN_TYPE_FUR;
        player.skinDesc = "fur";
        player.setFurColor(["brown", "chocolate", "auburn", "caramel", "orange", "black", "dark gray", "gray", "light gray", "silver", "white", "orange and white", "brown and white", "black and white"]);
        changes++;
    }
    //Change to paws - requires tail and ears
    if (rand(3) == 0 && player.lowerBody != LOWER_BODY_TYPE_DOG && player.tailType == TAIL_TYPE_DOG && player.earType == EARS_DOG && changes < changeLimit) {
        //Feet -> paws
        if (player.lowerBody == LOWER_BODY_TYPE_HUMAN) outputText("<br><br>You scream in agony as you feel the bones in your feet break and begin to rearrange. <b>You now have paws</b>.");
        //Hooves -> Paws
        else if (player.lowerBody == LOWER_BODY_TYPE_HOOFED) outputText("<br><br>You feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred paws.");
        else outputText("<br><br>Your lower body is wracked by pain! Once it passes, you discover that you're standing on fur-covered paws! <b>You now have paws</b>.");
        player.lowerBody = LOWER_BODY_TYPE_DOG;
        player.legCount = 2;
        changes++;
    }
    //Change to dog-ears!  Requires dog-tail
    if (rand(2) == 0 && player.earType != EARS_DOG && player.tailType == TAIL_TYPE_DOG && changes < changeLimit) {
        if (player.earType == -1) outputText("<br><br>Two painful nubs begin sprouting from your head, growing and opening into canine ears. ");
        if (player.earType == EARS_HUMAN) outputText("<br><br>The skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate, becoming canine in nature. ");
        if (player.earType == EARS_HORSE) outputText("<br><br>Your equine ears twist as they transform into canine versions. ");
        if (player.earType > EARS_DOG) outputText("<br><br>Your ears transform, becoming more canine in appearance. ");
        player.earType = EARS_DOG;
        player.earValue = 2;
        outputText("<b>You now have dog ears.</b>");
        changes++;
    }
    //Grow tail if not dog-tailed
    if (rand(3) == 0 && changes < changeLimit && player.tailType != TAIL_TYPE_DOG) {
        if (player.tailType == TAIL_TYPE_NONE) outputText("<br><br>A pressure builds on your backside. You feel under your clothes and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes, and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. ");
        if (player.tailType == TAIL_TYPE_HORSE) outputText("<br><br>You feel a tightness in your rump, matched by the tightness with which the strands of your tail clump together. In seconds they fuse into a single tail, rapidly sprouting thick fur. ");
        if (player.tailType == TAIL_TYPE_DEMONIC) outputText("<br><br>The tip of your tail feels strange. As you pull it around to check on it, the spaded tip disappears, quickly replaced by a thick coat of fur over the entire surface of your tail. ");
        //Generic message for now
        if (player.tailType >= TAIL_TYPE_COW) outputText("<br><br>You feel your backside shift and change, flesh molding and displacing into a long puffy tail! ");
        changes++;
        player.tailType = TAIL_TYPE_DOG;
        outputText("<b>You now have a dog-tail.</b>");
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
        player.gills = false;
        changes++;
    }
    if (player.skinType == SKIN_TYPE_FUR && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>You become more... solid. Sinewy. A memory comes unbidden from your youth of a grizzled wolf you encountered while hunting, covered in scars, yet still moving with an easy grace. You imagine that must have felt something like this.");
        player.modStats("tou", 4, "sen", -3);
        changes++;
    }
    //If no changes yay
    if (changes == 0) {
        outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>");
        player.changeHP(20, true);
        player.modStats("lus", 3);
    }
    gameFlags[TIMES_TRANSFORMED]++;
};

// Contains both LaBova and ProBova
ConsumableEffects.cowTFs = function(tainted, enhanced) {
    player.slimeFeed();
    //Changes done
    var changes = 0;
    //Change limit
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    if (enhanced) changeLimit += 2;
    //Temporary storage
    var temp = 0;
    var temp2 = 0;
    var temp3 = 0;

    //ItemUseText:
    outputText("You drink the ", true);
    if (enhanced) outputText("Pro Bova", false);
    else outputText("La Bova", false);
    outputText(".  The drink has an odd texture, but is very sweet.  It has a slight aftertaste of milk.", false);
    //Possible Item Effects:
    //STATS
    //Increase player str:
    if (changes < changeLimit && rand(3) == 0) {
        temp = 60 - player.str;
        if (temp <= 0) temp = 0;
        else {
            if (rand(2) == 0) outputText("<br><br>There is a slight pain as you feel your muscles shift somewhat.  Their appearance does not change much, but you feel much stronger.", false);
            else outputText("<br><br>You feel your muscles tighten and clench as they become slightly more pronounced.", false);
            player.dynStats("str", temp / 10);
            changes++;
        }
    }
    //Increase player tou:
    if (changes < changeLimit && rand(3) == 0) {
        temp = 60 - player.tou;
        if (temp <= 0) temp = 0;
        else {
            if (rand(2) == 0) outputText("<br><br>You feel your insides toughening up; it feels like you could stand up to almost any blow.", false);
            else outputText("<br><br>Your bones and joints feel sore for a moment, and before long you realize they've gotten more durable.", false);
            player.dynStats("tou", temp / 10);
            changes++;

        }
    }
    //Decrease player spd if it is over 30:
    if (changes < changeLimit && rand(3) == 0) {
        if (player.spe > 30) {
            outputText("<br><br>The body mass you've gained is making your movements more sluggish.", false);
            changes++;
            temp = (player.spe - 30) / 10;
            player.dynStats("spe", -temp);
        }
    }
    //Increase Corr, up to a max of 50.
    if (tainted) {
        temp = 50 - player.cor;
        if (temp < 0) temp = 0;
        player.dynStats("cor", temp / 10);
    }
    //Sex bits - Duderiffic
    if (player.cocks.length > 0 && rand(2) == 0 && !gameFlags[HYPER_HAPPY]) {
        //If the player has at least one dick, decrease the size of each slightly,
        outputText("<br><br>", false);
        temp = 0;
        temp2 = player.cocks.length;
        temp3 = 0;
        //Find biggest cock
        while (temp2 > 0) {
            temp2--;
            if (player.cocks[temp].cockLength <= player.cocks[temp2].cockLength) temp = temp2;
        }
        //Shrink said cock
        if (player.cocks[temp].cockLength < 6 && player.cocks[temp].cockLength >= 2.9) {
            player.cocks[temp].cockLength -= .5;
            temp3 -= .5;
        }
        temp3 += player.increaseCock(temp, (rand(3) + 1) * -1);
        player.lengthChange(temp3, 1);
        if (player.cocks[temp].cockLength < 2) {
            outputText("  ", false);
            if (player.cockTotal() == 1 && !player.hasVagina()) {
                outputText("Your " + player.cockDescript(0) + " suddenly starts tingling.  It's a familiar feeling, similar to an orgasm.  However, this one seems to start from the top down, instead of gushing up from your loins.  You spend a few seconds frozen to the odd sensation, when it suddenly feels as though your own body starts sucking on the base of your shaft.  Almost instantly, your cock sinks into your crotch with a wet slurp.  The tip gets stuck on the front of your body on the way down, but your glans soon loses all volume to turn into a shiny new clit.", false);
                if (player.balls > 0) outputText("  At the same time, your " + player.ballsDescriptLight() + " fall victim to the same sensation; eagerly swallowed whole by your crotch.", false);
                outputText("  Curious, you touch around down there, to find you don't have any exterior organs left.  All of it got swallowed into the gash you now have running between two fleshy folds, like sensitive lips.  It suddenly occurs to you; <b>you now have a vagina!</b>", false);
                player.balls = 0;
                player.ballSize = 1;
                player.createVagina();
                player.clitLength = .25;
                player.removeCock(0, 1);
            }
            else {
                player.removeCock(1);
                player.genderCheck();
            }
        }
        //if the last of the player's dicks are eliminated this way, they gain a virgin vagina;
        if (player.cocks.length == 0 && !player.hasVagina()) {
            player.createVagina();
            player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_TIGHT;
            player.vaginas[0].vaginalWetness = VAGINA_WETNESS_NORMAL;
            player.vaginas[0].virgin = true;
            player.clitLength = .25;
            outputText("<br><br>An itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + player.vaginaDescript(0) + "</b>!", false);

            changes++;
            player.genderCheck();
            player.changeLust(10);
        }
    }
    //Sex bits - girly
    var boobsGrew = false;
    //Increase player's breast size, if they are HH or bigger
    //do not increase size, but do the other actions:
    if (((tainted && player.biggestTitSize() <= 11) || (!tainted && player.biggestTitSize() <= 5)) && changes < changeLimit && (rand(3) == 0 || enhanced)) {
        if (rand(2) == 0) outputText("<br><br>Your " + player.breastDescript(0) + " tingle for a moment before becoming larger.", false);
        else outputText("<br><br>You feel a little weight added to your chest as your " + player.breastDescript(0) + " seem to inflate and settle in a larger size.", false);
        player.growTits(1 + rand(3), 1, false, 3);
        changes++;
        player.dynStats("sen", .5);
        boobsGrew = true;
    }
    //Remove feathery hair
    if (changes < changeLimit && player.hairType == HAIR_FEATHER && rand(4) == 0) {
        //(long):
        if (player.hairLength >= 6) outputText("<br><br>A lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal strand of hair.  <b>Your hair is no longer feathery!</b>", false);
        //(short)
        else outputText("<br><br>You run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into strands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
        player.hairType = HAIR_NORMAL;
        changes++;
    }
    //If breasts are D or bigger and are not lactating, they also start lactating:
    if (player.biggestTitSize() >= 4 && player.breastRows[0].lactationMultiplier < 1 && changes < changeLimit && (rand(3) == 0 || boobsGrew || enhanced)) {
        outputText("<br><br>You gasp as your " + player.breastDescript(0) + " feel like they are filling up with something.  Within moments, a drop of milk leaks from your " + player.breastDescript(0) + "; <b> you are now lactating</b>.", false);
        player.breastRows[0].lactationMultiplier = 1.25;
        changes++;
        player.dynStats("sen", .5);
    }
    //Quad nipples and other 'special enhanced things.
    if (enhanced) {
        //QUAD DAMAGE!
        if (player.breastRows[0].nipplesPerBreast == 1) {
            changes++;
            player.breastRows[0].nipplesPerBreast = 4;
            outputText("<br><br>Your " + player.nippleDescript(0) + "s tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as they split into four distinct nipples!  <b>You now have four nipples on each side of your chest!</b>", false);
            if (player.breastRows.length >= 2 && player.breastRows[1].nipplesPerBreast == 1) {
                outputText("A moment later your second row of " + player.breastDescript(1) + " does the same.  <b>You have sixteen nipples now!</b>", false);
                player.breastRows[1].nipplesPerBreast = 4;
            }
            if (player.breastRows.length >= 3 && player.breastRows[2].nipplesPerBreast == 1) {
                outputText("Finally, your ");
                if (player.bRows() == 3) outputText("third row of " + player.breastDescript(2) + " mutates along with its sisters, sprouting into a wonderland of nipples.", false);
                else if (player.bRows() >= 4) {
                    outputText("everything from the third row down mutates, sprouting into a wonderland of nipples.", false);
                    player.breastRows[3].nipplesPerBreast = 4;
                    if (player.bRows() >= 5) player.breastRows[4].nipplesPerBreast = 4;
                    if (player.bRows() >= 6) player.breastRows[5].nipplesPerBreast = 4;
                    if (player.bRows() >= 7) player.breastRows[6].nipplesPerBreast = 4;
                    if (player.bRows() >= 8) player.breastRows[7].nipplesPerBreast = 4;
                    if (player.bRows() >= 9) player.breastRows[8].nipplesPerBreast = 4;
                }
                player.breastRows[2].nipplesPerBreast = 4;
                outputText("  <b>You have a total of " + num2Text(player.totalNipples()) + " nipples.</b>");
            }
        }
        //QUAD DAMAGE IF WEIRD SHIT BROKE BEFORE
        else if (player.breastRows.length > 1 && player.breastRows[1].nipplesPerBreast == 1) {
            if (player.breastRows[1].nipplesPerBreast == 1) {
                outputText("<br><br>Your second row of " + player.breastDescript(1) + " tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as your " + player.nippleDescript(1) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your second row of breasts</b>.", false);
                player.breastRows[1].nipplesPerBreast = 4;
            }
        }
        else if (player.breastRows.length > 2 && player.breastRows[2].nipplesPerBreast == 1) {
            if (player.breastRows[2].nipplesPerBreast == 1) {
                outputText("<br><br>Your third row of " + player.breastDescript(2) + " tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as your " + player.nippleDescript(2) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your third row of breasts</b>.", false);
                player.breastRows[2].nipplesPerBreast = 4;
            }
        }
        else if (player.breastRows.length > 3 && player.breastRows[3].nipplesPerBreast == 1) {
            if (player.breastRows[3].nipplesPerBreast == 1) {
                outputText("<br><br>Your fourth row of " + player.breastDescript(3) + " tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as your " + player.nippleDescript(3) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your fourth row of breasts</b>.", false);
                player.breastRows[3].nipplesPerBreast = 4;
            }
        }
        else if (player.biggestLactation() > 1) {
            if (rand(2) == 0) outputText("<br><br>A wave of pleasure passes through your chest as your " + player.breastDescript(0) + " start leaking milk from a massive jump in production.", false);
            else outputText("<br><br>Something shifts inside your " + player.breastDescript(0) + " and they feel MUCH fuller and riper.  You know that you've started producing much more milk.", false);
            player.boostLactation(2.5);
            if ((player.nippleLength < 1.5 && tainted) || (!tainted && player.nippleLength < 1)) {
                outputText("  Your " + player.nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.", false);
                player.nippleLength += .25;
                player.dynStats("sen", .5);
            }
            changes++;
        }
    }
    //If breasts are already lactating and the player is not lactating beyond a reasonable level, they start lactating more:
    else {
        if (tainted && player.breastRows[0].lactationMultiplier > 1 && player.breastRows[0].lactationMultiplier < 5 && changes < changeLimit && (rand(3) == 0 || enhanced)) {
            if (rand(2) == 0) outputText("<br><br>A wave of pleasure passes through your chest as your " + player.breastDescript(0) + " start producing more milk.", false);
            else outputText("<br><br>Something shifts inside your " + player.breastDescript(0) + " and they feel fuller and riper.  You know that you've started producing more milk.", false);
            player.boostLactation(0.75);
            if ((player.nippleLength < 1.5 && tainted) || (!tainted && player.nippleLength < 1)) {
                outputText("  Your " + player.nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.", false);
                player.nippleLength += .25;
                player.dynStats("sen", .5);
            }
            changes++;
        }
        if (!tainted) {
            if (player.breastRows[0].lactationMultiplier > 1 && player.breastRows[0].lactationMultiplier < 3.2 && changes < changeLimit && rand(3) == 0) {
                if (rand(2) == 0) outputText("<br><br>A wave of pleasure passes through your chest as your " + player.breastDescript(0) + " start producing more milk.", false);
                else outputText("<br><br>Something shifts inside your " + player.breastDescript(0) + " and they feel fuller and riper.  You know that you've started producing more milk.", false);
                player.boostLactation(0.75);
                if ((player.nippleLength < 1.5 && tainted) || (!tainted && player.nippleLength < 1)) {
                    outputText("  Your " + player.nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.", false);
                    player.nippleLength += .25;
                    player.dynStats("sen", .5);
                }
                changes++;
            }
            if ((player.breastRows[0].lactationMultiplier > 2 && player.findStatusEffect(StatusEffects.Feeder) >= 0) || player.breastRows[0].lactationMultiplier > 5) {
                if (rand(2) == 0) outputText("<br><br>Your breasts suddenly feel less full, it seems you aren't lactating at quite the level you were.", false);
                else outputText("<br><br>The insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.", false);
                changes++;
                player.dynStats("sen", .5);
                player.boostLactation(-1);
            }
        }
    }
    //If breasts are lactating at a fair level
    //and the player has not received this status,
    //apply an effect where the player really wants
    //to give their milk to other creatures
    //(capable of getting them addicted):
    if (player.findStatusEffect(StatusEffects.Feeder) < 0 && player.biggestLactation() >= 3 && rand(2) == 0 && player.biggestTitSize() >= 5 && player.cor >= 35) {
        outputText("<br><br>You start to feel a strange desire to give your milk to other creatures.  For some reason, you know it will be very satisfying.<br><br><b>(You have gained the 'Feeder' perk!)</b>", false);
        player.createStatusEffect(StatusEffects.Feeder, 0, 0, 0, 0);
        player.createPerk(PerkLib.Feeder, 0, 0, 0, 0);
        changes++;
    }
    //UNFINISHED
    //If player has addictive quality and drinks pure version, removes addictive quality.
    //if the player has a vagina and it is tight, it loosens.
    if (player.hasVagina()) {
        if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE && changes < changeLimit && rand(2) == 0) {
            outputText("<br><br>You feel a relaxing sensation in your groin.  On further inspection you discover your " + player.vaginaDescript(0) + " has somehow relaxed, permanently loosening.", false);
            player.vaginas[0].vaginalLooseness++;
            //Cunt Stretched used to determine how long since last enlargement
            if (player.findStatusEffect(StatusEffects.CuntStretched) < 0) player.createStatusEffect(StatusEffects.CuntStretched, 0, 0, 0, 0);
            //Reset the timer on it to 0 when restretched.
            else player.changeStatusValue(StatusEffects.CuntStretched, 1, 0);
            player.vaginas[0].vaginalLooseness++;
            changes++;
            player.changeLust(10);
        }
    }
    // Folding in Oviposition perk update code
    if (tainted && rand(5) == 0) {
        if (player.findPerk(PerkLib.Oviposition) == 1 && player.lizardScore() < 8) {
            outputText("<br><br>Another change in your uterus ripples through your reproductive systems."
                +"  Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
            outputText("(<b>Perk Lost: Oviposition</b>)<br>");
            player.removePerk(PerkLib.Oviposition);
        }
    }
    //General Appearance (Tail -> Ears -> Paws(fur stripper) -> Face -> Horns
    //Give the player a bovine tail, same as the minotaur
    if (tainted && player.tailType != TAIL_TYPE_COW && changes < changeLimit && rand(3) == 0) {
        if (player.tailType == TAIL_TYPE_NONE) outputText("<br><br>You feel the flesh above your " + player.buttDescript() + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
        else {
            if (player.tailType < TAIL_TYPE_SPIDER_ADBOMEN || player.tailType > TAIL_TYPE_BEE_ABDOMEN) {
                outputText("<br><br>Your tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
            }
            //insect
            if (player.tailType == TAIL_TYPE_SPIDER_ADBOMEN || player.tailType == TAIL_TYPE_BEE_ABDOMEN) {
                outputText("<br><br>Your insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.", false);
            }
        }
        player.tailType = TAIL_TYPE_COW;
        changes++;
    }
    //Give the player bovine ears, same as the minotaur
    if (tainted && player.earType != EARS_COW && changes < changeLimit && rand(4) == 0 && player.tailType == TAIL_TYPE_COW) {
        outputText("<br><br>You feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>", false);
        player.earType = EARS_COW;
        changes++;
    }
    //If the player is under 7 feet in height, increase their height, similar to the minotaur
    if (((enhanced && player.tallness < 96) || player.tallness < 84) && changes < changeLimit && rand(2) == 0) {
        temp = rand(5) + 3;
        //Slow rate of growth near ceiling
        if (player.tallness > 74) temp = Math.floor(temp / 2);
        //Never 0
        if (temp == 0) temp = 1;
        //Flavor texts.  Flavored like 1950's cigarettes. Yum.
        if (temp < 5) outputText("<br><br>You shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.", false);
        if (temp >= 5 && temp < 7) outputText("<br><br>You feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.", false);
        if (temp == 7) outputText("<br><br>Staggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.", false);
        player.tallness += temp;
        changes++;
    }
    //Give the player hoofs, if the player already has hoofs STRIP FUR
    if (tainted && player.lowerBody != LOWER_BODY_TYPE_HOOFED && player.earType == EARS_COW) {
        if (changes < changeLimit && rand(3) == 0) {
            changes++;
            if (player.lowerBody == LOWER_BODY_TYPE_HUMAN) outputText("<br><br>You stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
            if (player.lowerBody == LOWER_BODY_TYPE_DOG) outputText("<br><br>You stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
            if (player.lowerBody == LOWER_BODY_TYPE_NAGA) outputText("<br><br>You collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!", false);
            //Catch-all
            if (player.lowerBody > LOWER_BODY_TYPE_NAGA) outputText("<br><br>You stagger as your " + player.feet() + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
            outputText("  A coat of beastial fur springs up below your waist, itching as it fills in.<b>  You now have hooves in place of your feet!</b>", false);
            player.lowerBody = LOWER_BODY_TYPE_HOOFED;
            player.legCount = 2;
            player.dynStats("cor", 0); // Why is this even here?
            changes++;
        }
    }
    //If the player's face is non-human, they gain a human face
    if (!enhanced && player.lowerBody == LOWER_BODY_TYPE_HOOFED && player.faceType != FACE_HUMAN && changes < changeLimit && rand(4) == 0) {
        //Remove face before fur!
        outputText("<br><br>Your visage twists painfully, returning to a normal human shape.  <b>Your face is human again!</b>", false);
        player.faceType = FACE_HUMAN;
        changes++;
    }
    //enhanced get shitty fur
    if (enhanced && (player.skinDesc != "fur" || player.furColor != "black and white spotted")) {
        if (player.skinDesc != "fur") outputText("<br><br>Your " + player.skinDesc + " itches intensely.  You scratch and scratch, but it doesn't bring any relief.  Fur erupts between your fingers, and you watch open-mouthed as it fills in over your whole body.  The fur is patterned in black and white, like that of a cow.  The color of it even spreads to your hair!  <b>You have cow fur!</b>", false);
        else outputText("<br><br>A ripple spreads through your fur as some patches darken and others lighten.  After a few moments you're left with a black and white spotted pattern that goes the whole way up to the hair on your head!  <b>You've got cow fur!</b>", false);
        player.skinDesc = "fur";
        player.skinAdj = "";
        player.skinType = SKIN_TYPE_FUR;
        player.hairColor = "black and white spotted";
        player.furColor = player.hairColor;
    }
    //if enhanced to probova give a shitty cow face
    else if (enhanced && player.faceType != FACE_COW_MINOTAUR) {
        outputText("<br><br>Your visage twists painfully, warping and crackling as your bones are molded into a new shape.  Once it finishes, you reach up to touch it, and you discover that <b>your face is like that of a cow!</b>", false);
        player.faceType = FACE_COW_MINOTAUR;
        changes++;
    }
    //Give the player bovine horns, or increase their size, same as the minotaur
    //New horns or expanding mino horns
    if (tainted && changes < changeLimit && rand(3) == 0 && player.faceType == FACE_HUMAN) {
        //Get bigger or change horns
        if (player.hornType == HORNS_COW_MINOTAUR || player.hornType == HORNS_NONE) {
            //Get bigger if player has horns
            if (player.hornType == HORNS_COW_MINOTAUR) {
                if (player.horns < 5) {
                    //Fems horns don't get bigger.
                    outputText("<br><br>Your small horns get a bit bigger, stopping as medium sized nubs.", false);
                    player.horns += 1 + rand(2);
                    changes++;
                }
            }
            //If no horns yet..
            if (player.hornType == HORNS_NONE || player.horns == 0) {
                outputText("<br><br>With painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.", false);
                player.hornType = HORNS_COW_MINOTAUR;
                player.horns = 1;
                changes++;
            }
            //TF other horns
            if (player.hornType != HORNS_NONE && player.hornType != HORNS_COW_MINOTAUR && player.horns > 0) {
                outputText("<br><br>Your horns twist, filling your skull with agonizing pain for a moment as they transform into cow-horns.", false);
                player.hornType = HORNS_COW_MINOTAUR;
            }
        }
        //Not mino horns, change to cow-horns
        if (player.hornType == HORNS_DEMON || player.hornType > HORNS_COW_MINOTAUR) {
            outputText("<br><br>Your horns vibrate and shift as if made of clay, reforming into two small bovine nubs.", false);
            player.hornType = HORNS_COW_MINOTAUR;
            player.horns = 2;
            changes++;
        }
    }
    //Increase the size of the player's hips, if they are not already childbearing or larger
    if (rand(2) == 0 && player.hipRating < 15 && changes < changeLimit) {
        if (!tainted && player.hipRating < 8 || tainted) {
            outputText("<br><br>You stumble as you feel the bones in your hips grinding, expanding your hips noticeably.", false);
            player.hipRating += 1 + rand(4);
            changes++;
        }
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
        player.gills = false;
        changes++;
    }
    //Increase the size of the player's ass (less likely then hips), if it is not already somewhat big
    if (rand(2) == 0 && player.buttRating < 13 && changes < changeLimit) {
        if (!tainted && player.buttRating < 8 || tainted) {
            outputText("<br><br>A sensation of being unbalanced makes it difficult to walk.  You pause, paying careful attention to your new center of gravity before understanding dawns on you - your ass has grown!", false);
            player.buttRating += 1 + rand(2);
            changes++;
        }
    }
    //Nipples Turn Back:
    if (gameFlags[HAS_BLACK_NIPPLES] == 1 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>Something invisible brushes against your " + player.nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
        changes++;
        gameFlags[HAS_BLACK_NIPPLES] = 0;
    }
    //Debugcunt
    if (changes < changeLimit && rand(3) == 0 && player.vaginaType() == 5 && player.hasVagina()) {
        outputText("<br><br>Something invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
        player.vaginaType(0);
        changes++;
    }
    if (rand(3) == 0) outputText(player.modFem(79, 3), false);
    if (rand(3) == 0) outputText(player.modThickness(70, 4), false);
    if (rand(5) == 0) outputText(player.modTone(10, 5), false);
    player.refillHunger(20);
};

ConsumableEffects.demonTFs = function(type, purified) {
    if (type == 1) { //Incubi Draft

    }
    if (type == 2) { //Succubi Milk

    }
    outputText("(Placeholder) You drink the draft.");
};

ConsumableEffects.succubiDelight = function(tainted) {
    player.slimeFeed();
    var changes = 0;
    var crit = 1;
    //Determine crit multiplier (x2 or x3)
    if (rand(4) == 0) crit += rand(2) + 1;
    var changeLimit = 1;
    //Chances to up the max number of changes
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Generic drinking text
    outputText("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.");
    //low corruption thoughts
    if (player.cor < 33) outputText(" This stuff is gross, why are you drinking it?");
    //high corruption
    if (player.cor >= 66) outputText(" You lick your lips, marvelling at how thick and sticky it is.");
    //Corruption increase
    if ((player.cor < 50 || rand(2)) && tainted) {
        outputText("<br><br>The drink makes you feel... dirty.");
        var temp = 1;
        //Corrupts the uncorrupted faster
        if (player.cor < 50) temp++;
        if (player.cor < 40) temp++;
        if (player.cor < 30) temp++;
        //Corrupts the very corrupt slower
        if (player.cor >= 90) temp = .5;
        player.modStats("cor", temp);
        changes++;
    }
    //Makes your balls biggah! (Or cummultiplier higher if futa!)
    if (rand(1.5) == 0 && changes < changeLimit && player.balls > 0) {
        player.ballSize++;
        //They grow slower as they get bigger...
        if (player.ballSize > 10) player.ballSize -= .5;
        //And MUCH slower
        if (player.ballSize > 24) player.ballSize -= .3;
        //Texts
        if (player.ballSize <= 2) outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin. You pause to examine the changes and your roving fingers discover your " + player.ballsDescriptLight() + " have grown larger than a human's.", false);
        if (player.ballSize > 2) outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your " + player.sackDescript() + ". Walking becomes difficult as you discover your " + player.ballsDescriptLight() + " have enlarged again.", false);
        player.modStats("lib", 1);
        player.changeLust(3);
        changes++;
    }
    //Grow new balls!
    if (player.balls < 2 && changes < changeLimit && rand(4) == 0) {
        if (player.balls == 0) {
            player.balls = 2;
            outputText("<br><br>Incredible pain scythes through your crotch, doubling you over. You stagger around, struggling to pull open your " + player.armor.equipmentName.equipmentName + ". In shock, you barely register the sight before your eyes: <b>You have balls!</b>", false);
            player.ballSize = 1;
        }
        changes++;
    }
    //Boost cum multiplier
    if (changes < changeLimit && rand(2) == 0 && player.cocks.length > 0) {
        if (player.cumMultiplier < 6 && rand(2) == 0 && changes < changeLimit) {
            //Temp is the max it can be raised to
            temp = 3;
            //Lots of cum raises cum multiplier cap to 6 instead of 3
            if (player.findPerk(PerkLib.MessyOrgasms) >= 0) temp = 6;
            if (temp < player.cumMultiplier + .4 * crit) {
                changes--;
            }
            else {
                player.cumMultiplier += .4 * crit;
                //Flavor text
                if (player.balls == 0) outputText("<br><br>You feel a churning inside your body as something inside you changes.", false);
                if (player.balls > 0) outputText("<br><br>You feel a churning in your " + player.ballsDescriptLight() + ". It quickly settles, leaving them feeling somewhat more dense.", false);
                if (crit > 1) outputText(" A bit of milky pre dribbles from your " + player.multiCockDescriptLight() + ", pushed out by the change.", false);
                player.modStats("lib", 1);
            }
            changes++;
        }
    }
    //Fail-safe
    if (changes == 0) {
        outputText("<br><br>Your groin tingles, making it feel as if you haven't cum in a long time.", false);
        player.hoursSinceCum += 100;
        changes++;
    }
    if (player.balls > 0 && rand(3) == 0) {
        outputText(player.modFem(12, 3), false);
    }
    player.refillHunger(10);
};

ConsumableEffects.equineTFs = function() {
    player.slimeFeed();
    //Changes and change limit
    var changes = 0;
    var changeLimit = 1;
    //Temporary storage
    var temp = 0;
    var temp2 = 0;
    var temp3 = 0;
    //Store location of cock to be changed
    var old = 0;
    //Chance to raise limit
    if (rand(2) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Used for random chances
    //Set up output
    outputText("You down the potion, grimacing at the strong taste.");
    //CHANCE OF BAD END - 20% if face/tail/skin/cock are appropriate.
    //If hooved bad end doesn't appear till centaured
    if (player.skinType == SKIN_TYPE_FUR && player.faceType == FACE_HORSE && player.tailType == TAIL_TYPE_HORSE && (player.lowerBody != LOWER_BODY_TYPE_HOOFED)) {
        //WARNINGS
        //Repeat warnings
        /*if (player.findStatusEffect(StatusEffects.HorseWarning) >= 0 && rand(3) == 0) {
         if (player.statusEffectValue(StatusEffects.HorseWarning, 1) == 0) outputText("<br><br><b>You feel a creeping chill down your back as your entire body shivers, as if rejecting something foreign.  Maybe you ought to cut back on the horse potions.</b>");
         if (player.statusEffectValue(StatusEffects.HorseWarning, 1) > 0) outputText("<br><br><b>You wonder how many more of these you can drink before you become a horse...</b>");
         player.addStatusValue(StatusEffects.HorseWarning, 1, 1);
         }
         //First warning
         if (player.findStatusEffect(StatusEffects.HorseWarning) < 0) {
         outputText("<b><br><br>While you drink the tasty potion, you realize how horse-like you already are, and wonder what else the potion could possibly change...</b>");
         player.createStatusEffect(StatusEffects.HorseWarning, 0, 0, 0, 0);
         }*/
        //Bad End
        if (rand(4) == 0 && gameFlags[HORSE_WARNING] == 1 && player.findPerk(PerkLib.TransformationResistance) < 0) {
            //Must have been warned first...
                //If player has dicks check for horsedicks
                if (player.cockTotal() > 0) {
                    //If player has horsedicks
                    if (player.countCocksOfType(CockTypesEnum.HORSE) > 0) {
                        outputText("<br><br>Soon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the potion, and the overdose starts to provoke dramatic changes in your body. You collapse suddenly, twitching in pain as all the bones and muscles in your body break and reform. Eventually, you pass out from the strain you are put through.<br><br>You wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                        if (player.gender == 0 || player.gender == 3) outputText("horse ");
                        if (player.gender == 1) outputText("stallion ");
                        if (player.gender == 2) outputText("mare ");
                        outputText(" with beautiful " + player.hairColor + " " + player.skinDesc + " covering its body gazes back up at you. That's you, and yet the doubt in your mind remains. Strange images fill your mind, and you feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. Your equine mind rapidly dismisses that doubt as a daydream however, and you trot away, oblivious to who you once were.<br><br>");
                        outputText("<b>One year later...</b><br><br>As you graze upon the small plants that coat the open plains of your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on its two feet, its furless pink skin appearing beneath its clothes. With a start, you realize you can identify the strange creatures gender. ");
                        if (player.gender == 0 || player.gender == 1) outputText("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.<br><br>");
                        if (player.gender == 2) outputText("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.<br><br>");
                        if (player.gender == 3) outputText("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.<br><br>");
                        outputText("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.<br><br>\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here. Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.<br><br>You answer with an interrogative whinny.<br><br>\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me complete my quest. What do you say?</i>\"<br><br>Instinctively, you utter a happy and approving whinny.<br><br>You failed in your quest, losing your focus and more importantly, losing yourself. But, even so, you found a new meaning to your life, and have a new chance to succeed where you once failed.");
                        gameOver();
                        return;
                    }
                }
                //If player has no cocks
                else {
                    outputText("<br><br>Soon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the drink, and the overdose starts to provoke dramatic changes in your body. You collapse suddenly, twitching in pain as all the bones and all the muscles in your body break and reform. Eventually, you pass out from the strain you are put through.<br><br>You wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                    if (player.gender == 0 || player.gender == 3) outputText("horse ");
                    if (player.gender == 1) outputText("stallion ");
                    if (player.gender == 2) outputText("mare ");
                    outputText("with beautiful " + player.hairColor + " " + player.skinDesc + " covering its body looks back at you. That's you, and yet the doubt in your mind remains. Strange mental images fill your mind. You feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. But your equine mind rapidly dismisses that doubt as a daydream, and you trot away, oblivious to who you once were.<br><br>");
                    outputText("<b>One year after...</b><br><br>As you graze small plants in the open plains that became your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on two feet, its furless pink skin appearing beneath its clothes. ");
                    if (player.gender == 0 || player.gender == 1) outputText("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.<br><br>");
                    if (player.gender == 2) outputText("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.<br><br>");
                    if (player.gender == 3) outputText("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.<br><br>");
                    outputText("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.<br><br>\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here. Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.<br><br>You answer with an interrogative whinny.<br><br>\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me to complete my quest. What do you say?</i>\"<br><br>Instictively, you utter a happy and approving whinny.<br><br>You failed in your quest, losing you focus and more importantly, losing yourself. But, even so, you found a new meaning to your life, and have a new chance to achieve what you once failed.");
                    gameOver();
                    return;
                }
            }
        }


    //------------
    // STATS CHANGES
    //------------
    //STRENGTH
    if (rand(2) == 0) {
        //Maxxed
        if (player.str >= 60) {
            outputText("<br><br>You feel strong enough to single-handedly pull a fully-loaded wagon.");
        }
        //NOT MAXXED
        else {
            player.modStats("str", 1);
            outputText("<br><br>Your muscles clench and surge, making you feel as strong as a horse.");
            changes++;
        }
    }
    //TOUGHNESS
    if (rand(2) == 0) {
        //MAXXED ALREADY
        if (player.tou >= 75) {
            outputText("<br><br>Your body is as tough and solid as a " + player.mf("stallion's", "mare's") + ".");
        }
        //NOT MAXXED
        else {
            player.modStats("tou", 1.25);
            outputText("<br><br>Your body suddenly feels tougher and more resilient.");
            changes++;
        }
    }
    //INTELLECT
    if (rand(3) == 0) {
        if (player.inte <= 5) {
            outputText("<br><br>You let out a throaty \"Neiiiigh\" as your animalistic instincts take over.");
        }
        if (player.inte < 10 && player.inte > 5) {
            player.modStats("int", -1);
            outputText("<br><br>You smile vacantly as you drink the potion, knowing you're just a big dumb animal who loves to fuck.");
            changes++;
        }
        if (player.inte <= 20 && player.inte >= 10) {
            player.modStats("int", -2);
            outputText("<br><br>You find yourself looking down at the empty bottle in your hand and realize you haven't thought ANYTHING since your first sip.");
            changes++;
        }
        if (player.inte <= 30 && player.inte > 20) {
            player.modStats("int", -3);
            outputText("<br><br>You smile broadly as your cares seem to melt away. A small part of you worries that you're getting dumber.");
            changes++;
        }
        if (player.inte <= 50 && player.inte > 30) {
            player.modStats("int", -4);
            outputText("<br><br>It becomes harder to keep your mind focused as your intellect diminishes.");
            changes++;
        }
        if (player.inte > 50) {
            player.modStats("int", -5);
            outputText("<br><br>Your usually intelligent mind feels much more sluggish.");
            changes++;
        }
    }
    //------------
    // NORMALIZE
    //------------
    //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_HARPY && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating. The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_SPIDER && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your arms' chitinous covering is flaking away. The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //-Remove feathery hair (copy for equinum, canine peppers, Labova)
    if (changes < changeLimit && player.hairType == 1 && rand(4) == 0) {
        //(long):
        if (player.hairLength >= 6) outputText("<br><br>A lock of your downy-soft feather-hair droops over your eye. Before you can blow the offending down away, you realize the feather is collapsing in on itself. It continues to curl inward until all that remains is a normal strand of hair. <b>Your hair is no longer feathery!</b>");
        //(short)
        else outputText("<br><br>You run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested. While your hand is up there, it detects a change in the texture of your feathers. They're completely disappearing, merging down into strands of regular hair. <b>Your hair is no longer feathery!</b>");
        changes++;
        player.hairType = HAIR_NORMAL;
    }
    //------------
    // SEXUAL TFs
    //------------
    //MALENESS.
    if ((player.gender == 1 || player.gender == 3) && rand(1.5) == 0 && changes < changeLimit) {
        //If cocks that aren't horsified!
        if ((player.countCocksOfType(CockTypesEnum.HORSE) + player.countCocksOfType(CockTypesEnum.DEMON)) < player.cocks.length) {
            //Transform a cock and store it's index value to talk about it.
            //Single cock
            if (player.cocks.length == 1) {
                temp = 0;
                //Use temp3 to track whether or not anything is changed.
                temp3 = 0;
                if (player.cocks[0].cockType == CockTypesEnum.HUMAN) {
                    outputText("<br><br>Your " + player.cockDescript(0) + " begins to feel strange... " + player.clothedOrNakedLower("you pull down your clothes to take a look", "you look down") + " and see it darkening as you feel a tightness near the base where your skin seems to be bunching up. A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths. A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size. The skin is mottled brown and black and feels more sensitive than normal. Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
                }
                if (player.cocks[0].cockType == CockTypesEnum.DOG) {
                    outputText("<br><br>Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " begins to feel odd... " + player.clothedOrNakedLower("you pull down your clothes to take a look", "you look down") + " and see it darkening. You feel a growing tightness in the tip of your " + Appearance.cockNoun(CockTypesEnum.DOG) + " as it flattens, flaring outwards. Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond it's traditional size. You notice your knot vanishing, the extra flesh pushing more horsecock out from your sheath. Your hands are drawn to the strange new " + Appearance.cockNoun(CockTypesEnum.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                }
                if (player.cocks[0].cockType == CockTypesEnum.TENTACLE) {
                    outputText("<br><br>Your " + player.cockDescript(0) + " begins to feel odd... " + player.clothedOrNakedLower("you pull down your clothes to take a look", "you look down") + " and see it darkening. You feel a growing tightness in the tip of your " + player.cockDescript(0) + " as it flattens, flaring outwards. Your skin folds and bunches around the base, forming an animalistic sheath. The slick inhuman texture you recently had fades, taking on a more leathery texture. Your hands are drawn to the strange new " + Appearance.cockNoun(CockTypesEnum.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                }
                if (player.cocks[0].cockType > 4) {
                    outputText("<br><br>Your " + player.cockDescript(0) + " begins to feel odd... " + player.clothedOrNakedLower("you pull down your clothes to take a look", "you look down") + " and see it darkening. You feel a growing tightness in the tip of your " + player.cockDescript(0) + " as it flattens, flaring outwards. Your skin folds and bunches around the base, forming an animalistic sheath. The slick inhuman texture you recently had fades, taking on a more leathery texture. Your hands are drawn to the strange new " + Appearance.cockNoun(CockTypesEnum.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                }
                temp = player.changeCockType(CockTypesEnum.HORSE);
                temp2 = player.increaseCock(temp, rand(4) + 4);
                temp3 = 1;
                player.modStats("lib", 5, "sen", 4);
                player.orgasm();
                if (temp3 == 1) outputText(" <b>Your penis has transformed into a horse's!</b>");
            }
            //MULTICOCK
            else {
                outputText("<br><br>One of your penises begins to feel strange. You pull down your clothes to take a look and see the skin of your " + player.cockDescript(temp) + " darkening to a mottled brown and black pattern.");
                temp = player.changeCockType(CockTypesEnum.HORSE);
                player.modStats("lib", 5, "sen", 4, "lus", 35);
                player.orgasm();
                //Already have a sheath
                if (player.hasSheath())
                    outputText(" Your sheath tingles and begins growing larger as the cock's base shifts to lie inside it.");
                else
                    outputText(" You feel a tightness near the base where your skin seems to be bunching up. A sheath begins forming around your " + player.cockDescript(temp) + "'s root, tightening and pulling your " + player.cockDescript(temp) + " inside its depths.");
                temp2 = player.increaseCock(temp, rand(4) + 4);
                outputText(" The shaft suddenly explodes with movement, growing longer and developing a thick flared head leaking steady stream of animal-cum.");
                outputText(" <b>You now have a horse-cock.</b>");
            }
            //Make cock thicker if not thick already!
            if (player.cocks[temp].cockThickness <= 2) player.cocks[temp].thickenCock(1);
            changes++;
        }
        //Players cocks are all horse-type - increase size!
        else {
            //single cock
            if (player.cocks.length == 1) {
                temp2 = player.increaseCock(0, rand(3) + 1);
                temp = 0;
                player.modStats("sen", 1, "lus", 10);
            }
            //Multicock
            else {
                //Find smallest cock
                //Temp2 = smallness size
                //temp = current smallest
                temp3 = player.cocks.length;
                temp = 0;
                while (temp3 > 0) {
                    temp3--;
                    //If current cock is smaller than saved, switch values.
                    if (player.cocks[temp].cockLength > player.cocks[temp3].cockLength) {
                        temp2 = player.cocks[temp3].cockLength;
                        temp = temp3;
                    }
                }
                //Grow smallest cock!
                //temp2 changes to growth amount
                temp2 = player.increaseCock(temp, rand(4) + 1);
                player.modStats("sen", 1, "lus", 10);
            }
            outputText("<br><br>");
            if (temp2 > 2) outputText("Your " + player.cockDescript(temp) + " tightens painfully, inches of taut horse-flesh pouring out from your sheath as it grows longer. Thick animal-pre forms at the flared tip, drawn out from the pleasure of the change.");
            if (temp2 > 1 && temp2 <= 2) outputText("Aching pressure builds within your sheath, suddenly releasing as an inch or more of extra dick flesh spills out. A dollop of pre beads on the head of your enlarged " + player.cockDescript(temp) + " from the pleasure of the growth.");
            if (temp2 <= 1) outputText("A slight pressure builds and releases as your " + player.cockDescript(temp) + " pushes a bit further out of your sheath.");
            changes++;
        }
        //Chance of thickness + daydream
        if (rand(2) == 0 && changes < changeLimit && player.countCocksOfType(CockTypesEnum.HORSE) > 0) {
            temp3 = 0;
            temp2 = player.cocks.length;
            while (temp2 > 0) {
                temp2--;
                if (player.cocks[temp2].cockThickness <= player.cocks[temp3].cockThickness) {
                    temp3 = temp2;
                }
            }
            temp = temp3;
            player.cocks[temp].thickenCock(.5);
            outputText("<br><br>Your " + Appearance.cockNoun(CockTypesEnum.HORSE) + " thickens inside its sheath, growing larger and fatter as your veins thicken, becoming more noticeable. It feels right");
            if (player.cor + player.lib < 50) outputText(" to have such a splendid tool. You idly daydream about cunts and pussies, your " + Appearance.cockNoun(CockTypesEnum.HORSE) + " plowing them relentlessly, stuffing them pregnant with cum");
            if (player.cor + player.lib >= 50 && player.cor + player.lib < 80) outputText(" to be this way... You breath the powerful animalistic scent and fantasize about fucking centaurs night and day until their bellies slosh with your cum");
            if (player.cor + player.lib >= 75 && player.cor + player.lib <= 125) outputText(" to be a rutting stud. You ache to find a mare or centaur to breed with. Longing to spend your evenings plunging a " + Appearance.cockNoun(CockTypesEnum.HORSE) + " deep into their musky passages, dumping load after load of your thick animal-cum into them. You'd be happy just fucking horsecunts morning, noon, and night. Maybe somewhere there is a farm needing a breeder..");
            if (player.cor + player.lib > 125) outputText(" to whinny loudly like a rutting stallion. Your " + Appearance.cockNoun(CockTypesEnum.HORSE) + " is perfect for fucking centaurs and mares. You imagine the feel of plowing an equine pussy deeply, bottoming out and unloading sticky jets of horse-jizz into its fertile womb. Your hand strokes your horsecock of its own accord, musky pre dripping from the flared tip with each stroke. Your mind wanders to the thought of you with a harem of pregnant centaurs.");
            outputText(".");
            if (player.cor < 30) outputText(" You shudder in revulsion at the strange thoughts and vow to control yourself better.");
            if (player.cor >= 30 && player.cor < 60) outputText(" You wonder why you thought such odd things, but they have a certain appeal.");
            if (player.cor >= 60 && player.cor < 90) outputText(" You relish your twisted fantasies, hoping to dream of them again.");
            if (player.cor >= 90) outputText(" You flush hotly and give a twisted smile, resolving to find a fitting subject to rape and relive your fantasies.");
            player.modStats("lib", .5, "lus", 10);
        }
        //Chance of ball growth if not 3" yet
        if (rand(2) == 0 && changes < changeLimit && player.ballSize <= 3 && player.countCocksOfType(CockTypesEnum.HORSE) > 0) {
            if (player.balls == 0) {
                player.balls = 2;
                player.ballSize = 1;
                outputText("<br><br>A nauseating pressure forms just under the base of your maleness. With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle! A moment later relief overwhelms you as the second drops into your newly formed sack.");
                player.modStats("lib", 2, "lus", 5);
            }
            else {
                player.ballSize++;
                if (player.ballSize <= 2) outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin. You pause to examine the changes and your roving fingers discover your " + player.ballsDescriptLight() + " have grown larger than a human's.");
                if (player.ballSize > 2) outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your " + player.sackDescript() + ". Walking becomes difficult as you discover your " + player.ballsDescriptLight() + " have enlarged again.");
                player.modStats("lib", 1, "lus", 3);
            }
            changes++;
        }
    }
    //FEMALE
    if (player.gender == 2 || player.gender == 3) {
        //Single vag
        if (player.vaginas.length == 1) {
            if (player.vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS_GAPING && changes < changeLimit && rand(2) == 0) {
                outputText("<br><br>You grip your gut in pain as you feel your organs shift slightly. When the pressure passes, you realize your " + player.vaginaDescript(0) + " has grown larger, in depth AND size.");
                player.vaginas[0].vaginalLooseness++;
                changes++;
            }
            if (player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_NORMAL && changes < changeLimit && rand(2) == 0) {
                outputText("<br><br>Your " + player.vaginaDescript(0) + " moistens perceptably, giving off an animalistic scent.");
                player.vaginas[0].vaginalWetness++;
                changes++;
            }
        }
        //Multicooch
        else {
            //determine least wet
            //temp - least wet
            //temp2 - saved wetness
            //temp3 - counter
            temp = 0;
            temp2 = player.vaginas[temp].vaginalWetness;
            temp3 = player.vaginas.length;
            while (temp3 > 0) {
                temp3--;
                if (temp2 > player.vaginas[temp3].vaginalWetness) {
                    temp = temp3;
                    temp2 = player.vaginas[temp].vaginalWetness;
                }
            }
            if (player.vaginas[temp].vaginalWetness <= VAGINA_WETNESS_NORMAL && changes < changeLimit && rand(2) == 0) {
                outputText("<br><br>One of your " + player.vaginaDescript(temp) + " moistens perceptably, giving off an animalistic scent.");
                player.vaginas[temp].vaginalWetness++;
                changes++;
            }
            //determine smallest
            //temp - least big
            //temp2 - saved looseness
            //temp3 - counter
            temp = 0;
            temp2 = player.vaginas[temp].vaginalLooseness;
            temp3 = player.vaginas.length;
            while (temp3 > 0) {
                temp3--;
                if (temp2 > player.vaginas[temp3].vaginalLooseness) {
                    temp = temp3;
                    temp2 = player.vaginas[temp].vaginalLooseness;
                }
            }
            if (player.vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS_GAPING && changes < changeLimit && rand(2) == 0) {
                outputText("<br><br>You grip your gut in pain as you feel your organs shift slightly. When the pressure passes, you realize one of your " + player.vaginaDescript(temp) + " has grown larger, in depth AND size.");
                player.vaginas[temp].vaginalLooseness++;
                changes++;
            }
        }
        if (player.statusEffectValue(StatusEffects.Heat, 2) < 30 && rand(2) == 0 && changes < changeLimit) {
            if (player.goIntoHeat(true)) {
                changes++;
            }
        }

        if (!hyperHappy) {
            if (rand(2) == 0 && changes < changeLimit) {
                //Shrink B's!
                //Single row
                if (player.breastRows.length == 1) {
                    //Shrink if bigger than B cups
                    if (player.breastRows[0].breastRating > 3) {
                        temp = 1;
                        player.breastRows[0].breastRating--;
                        //Shrink again if huuuuge
                        if (player.breastRows[0].breastRating > 8) {
                            temp++;
                            player.breastRows[0].breastRating--;
                        }
                        //Talk about shrinkage
                        if (temp == 1) outputText("<br><br>You feel a weight lifted from you, and realize your " + player.breastDescript(0) + " have shrunk to a " + player.breastCup(0) + ".");
                        if (temp == 2) outputText("<br><br>You feel significantly lighter. Looking down, you realize your breasts are MUCH smaller, down to " + player.breastCup(0) + "s.");
                        changes++;
                    }

                }
                //multiple
                else {
                    //temp2 = amount changed
                    //temp3 = counter
                    temp2 = 0;
                    temp3 = player.breastRows.length;
                    if (player.biggestTitSize() > 3) outputText("<br>");
                    while (temp3 > 0) {
                        temp3--;
                        if (player.breastRows[temp3].breastRating > 3) {
                            player.breastRows[temp3].breastRating--;
                            temp2++;
                            outputText("<br>");
                            if (temp3 < player.breastRows.length - 1) outputText("...and y");
                            else outputText("Y");
                            outputText("our " + player.breastDescript(temp3) + " shrink, dropping to " + player.breastCup(temp3) + "s.");
                        }
                    }
                    if (temp2 == 2) outputText("<br>You feel so much lighter after the change.");
                    if (temp2 == 3) outputText("<br>Without the extra weight you feel particularly limber.");
                    if (temp2 >= 4) outputText("<br>It feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
                    if (temp2 > 0) changes++;
                }
            }
        }
    }
    //NON - GENDER SPECIFIC CHANGES
    //Tail -> Ears -> Fur -> Face
    //Centaur if hooved
    if (changes < changeLimit && rand(6) == 0 && player.lowerBody == LOWER_BODY_TYPE_HOOFED && !player.isTaur()) {
        outputText("<br><br>Immense pain overtakes you as you feel your backbone snap. The agony doesn't stop, blacking you out as your spine lengthens, growing with new flesh from your backside as the bones of your legs flex and twist. Muscle groups shift and rearrange themselves as the change completes, the pain dying away as your consciousness returns. <b>You now have the lower body of a centaur</b>.");
        if (player.gender > 0) {
            outputText(" After taking a moment to get used to your new body, you notice that your genitals now reside between the back legs on your centaur body.");
        }
        player.modStats("spe", 3);
        player.legCount = 4;
        changes++;
    }
    //Remove odd eyes
    if (changes < changeLimit && rand(5) == 0 && player.eyeType > EYES_HUMAN) {
        if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP) {
            outputText("<br><br>You feel a twinge in your eyes and you blink. It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
        }
        else {
            outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you. As you steady and open your eyes, you realize something seems different. Your vision is changed somehow.");
            if (player.eyeType == EYES_FOUR_SPIDER_EYES) outputText(" Your multiple, arachnid eyes are gone!</b>");
            outputText(" <b>You have normal, humanoid eyes again.</b>");
        }
        player.eyeType = EYES_HUMAN;
        changes++;
    }
    //HorseFace - Req's Fur && Ears
    if (player.faceType != FACE_HORSE && player.skinType == SKIN_TYPE_FUR && changes < changeLimit && rand(5) == 0 && player.earType == EARS_HORSE) {
        if (player.faceType == FACE_DOG)
            outputText("<br><br>Mind-numbing pain shatters through you as you feel your facial bones rearranging. You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your dog-like characteristics with those of a horse. <b>You now have a horse's face.</b>");
        else
            outputText("<br><br>Mind-numbing pain shatters through you as you feel your facial bones breaking and shifting. You clutch at yourself in agony as you feel your skin crawl and elongate under your fingers. Eventually the pain subsides, leaving you with a face that seamlessly blends human and equine features. <b>You have a very equine-looking face.</b>");
        player.faceType = FACE_HORSE;
        changes++;
    }
    //Fur - if has horsetail && ears and not at changelimit
    if (player.skinType != SKIN_TYPE_FUR && changes < changeLimit && rand(4) == 0 && player.tailType == TAIL_TYPE_HORSE) {
        if (player.skinType == SKIN_TYPE_PLAIN) outputText("<br><br>An itchy feeling springs up over every inch of your skin. As you scratch yourself madly, you feel fur grow out of your skin until <b>you have a fine coat of " + player.hairColor + "-colored fur.</b>");
        if (player.skinType == SKIN_TYPE_SCALES) {
            player.skinDesc = "fur";
            outputText("<br><br>Your " + player.skinTone + " scales begin to itch insufferably. You reflexively scratch yourself, setting off an avalanche of discarded scales. The itching intensifies as you madly scratch and tear at yourself, revealing a coat of " + player.hairColor + " " + player.skinDesc + ". At last the itching stops as <b>you brush a few more loose scales from your new coat of fur.</b>");
        }
        changes++;
        player.skinType = SKIN_TYPE_FUR;
        player.skinDesc = "fur";
        player.setFurColor(["brown", "chocolate", "auburn", "sandy brown", "caramel", "peach", "black", "midnight black", "dark gray", "gray", "light gray", "silver", "white", "brown and white", "black and white"]);
    }
    //Ears - requires tail
    if (player.earType != EARS_HORSE && player.tailType == TAIL_TYPE_HORSE && changes < changeLimit && rand(3) == 0) {
        if (player.earType == -1) outputText("<br><br>Two painful lumps sprout on the top of your head, forming into tear-drop shaped ears, covered with short fur. ");
        if (player.earType == EARS_HUMAN) outputText("<br><br>Your ears tug painfully on your face as they begin shifting, moving upwards to the top of your head and transforming into a upright animalistic ears. ");
        if (player.earType == EARS_DOG) outputText("<br><br>Your ears change shape, morphing into from their doglike shape into equine-like ears! ");
        if (player.earType > EARS_DOG) outputText("<br><br>Your ears change shape, morphing into teardrop-shaped horse ears! ");
        player.earType = EARS_HORSE;
        player.earValue = 0;
        outputText("<b>You now have horse ears.</b>");
        changes++;
    }
    //Tail - no-prereq
    if (player.tailType != TAIL_TYPE_HORSE && rand(2) == 0 && changes < changeLimit) {
        //no tail
        if (player.tailType == 0) {
            outputText("<br><br>There is a sudden tickling on your ass, and you notice you have sprouted a long shiny horsetail of the same " + player.hairColor + " color as your hair.");
        }
        //if other animal tail
        if (player.tailType > TAIL_TYPE_HORSE && player.tailType <= TAIL_TYPE_COW) {
            outputText("<br><br>Pain lances up your " + player.assholeDescript() + " as your tail shifts and morphs disgustingly. With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
        }
        //if bee/spider-butt.
        if ((player.tailType > TAIL_TYPE_COW && player.tailType < TAIL_TYPE_SHARK)) {
            outputText("<br><br>Your insect-like abdomen bunches up as it begins shrinking, exoskeleton flaking off like a snake sheds its skin. It bunches up until it is as small as a tennis ball, then explodes outwards, growing into an animalistic tail shape. Moments later, it explodes into filaments of pain, dividing into hundreds of strands and turning into a shiny horsetail.");
        }
        if (player.tailType >= TAIL_TYPE_SHARK) {
            outputText("<br><br>Pain lances up your " + player.assholeDescript() + " as your tail shifts and morphs disgustingly. With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
        }
        outputText(" <b>You now have a horse-tail.</b>");
        player.tailType = TAIL_TYPE_HORSE;
        player.tailVenom = 0;
        player.tailRecharge = 0;
        changes++;
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
        player.gills = false;
        changes++;
    }
    if (rand(3) == 0) outputText(player.modTone(60, 1), false);
    //FAILSAFE CHANGE
    if (changes == 0) {
        outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>");
        player.changeHP(20, true);
        player.modStats("lus", 3);
    }
    player.refillHunger(15);
};

ConsumableEffects.felineTFs = function() {
    var changes = 0;
    var changeLimit = 1;
    var temp = 0;
    var temp2 = 0;
    var temp3 = 0;
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Text go!
    clearOutput();
    outputText("You take a bite of the fruit and gulp it down. It's thick and juicy and has an almost overpowering sweetness. Nevertheless, it is delicious and you certainly could use a meal. You devour the fruit, stopping only when the hard, nubby pit is left; which you toss aside.");
    //------------
    // STATS CHANGES
    //------------
    //STRENGTH
    if (player.str < 40 && rand(3) == 0 && changes < changeLimit) { //Strength raises to 40
        if (rand(2) == 0) outputText("<br><br>Your muscles feel taut, like a coiled spring, and a bit more on edge.");
        else outputText("<br><br>You arch your back as your muscles clench painfully. The cramp passes swiftly, leaving you feeling like you've gotten a bit stronger.");
        player.modStats("str", 1);
        changes++;
    }
    else if (player.str > 60 && rand(2) == 0) { //Strength drops if over 60, does not add to change total
        outputText("<br><br>Shivers run from your head to your toes, leaving you feeling weak. Looking yourself over, your muscles seemed to have lost some bulk.");
        player.modStats("str", -2);
    }
    //TOUGHNESS
    if (player.tou > 50 && rand(2) == 0) { //Toughness drops if over 50, does not add to change total
        outputText("<br><br>Your body seems to compress momentarily, becoming leaner and noticeably less tough.");
        player.modStats("tou", -2);
    }
    //SPEED
    if (player.spe < 75 && rand(3) == 0 && changes < changeLimit) {
        //low speed
        if (player.spe <= 30) {
            outputText("<br><br>You feel... more balanced, sure of step. You're certain that you've become just a little bit faster.");
            player.modStats("spe", 2);
        }
        //medium speed
        else if (player.spe <= 60) {
            outputText("<br><br>You stumble as you shift position, surprised by how quickly you move. After a moment or two of disorientation, you adjust. You're certain that you can run faster now.");
            player.modStats("spe", 1);
        }
        //high speed
        else {
            outputText("<br><br>You pause mid-step and crouch. Your leg muscles have cramped up like crazy. After a few moments, the pain passes and you feel like you could chase anything down.");
            player.modStats("spe", .5);
        }
        changes++;
    }
    //INTELLECT
    if (rand(4) == 0 && changes < changeLimit) { //Intelliloss
        if (player.inte < 15) //low intelligence
            outputText("<br><br>You feel like something is slipping away from you but can't figure out exactly what's happening. You scrunch up your " + player.face() + ", trying to understand the situation. Before you can reach any kind of conclusion, something glitters in the distance, distracting your feeble mind long enough for you to forget the problem entirely.");
        else if (player.inte < 50) { //medium intelligence
            outputText("<br><br>Your mind feels somewhat sluggish, and you wonder if you should just lie down ");
            if (rand(2) == 0) {
                outputText("somewhere and ");
                temp = rand(3);
                if (temp == 0)
                    outputText("toss a ball around or something");
                else if (temp == 1)
                    outputText("play with some yarn");
                else if (temp == 2)
                    outputText("take a nap and stop worrying");
            }
            else
                outputText("in the sun and let your troubles slip away");
            outputText(".");
        }
        else //High intelligence
            outputText("<br><br>You start to feel a bit dizzy, but the sensation quickly passes. Thinking hard on it, you mentally brush away the fuzziness that seems to permeate your brain and determine that this fruit may have actually made you dumber. It would be best not to eat too much of it.");
        player.modStats("int", -1);
        changes++;
    }
    //LIBIDO
    if (player.lib < 80 && changes < changeLimit && rand(4) == 0) { //Libido gain
        //Cat dicked folks
        if (player.countCocksOfType(CockTypesEnum.CAT) > 0) {
            temp = player.findFirstCockType(CockTypesEnum.CAT);
            outputText("<br><br>You feel your " + player.cockDescript(temp) + " growing hard, the barbs becoming more sensitive. You gently run your hands down them and imagine the feeling of raking the insides of a cunt as you pull. The fantasy continues, and after ejaculating and hearing the female yowl with pleasure, you shake your head and try to drive off the image. ");
            if (player.cor < 33)
                outputText("You need to control yourself better.");
            else if (player.cor < 66)
                outputText("You're not sure how you feel about the fantasy.");
            else
                outputText("You hope to find a willing partner to make this a reality.");
        }
        //Else –
        else {
            outputText("<br><br>A rush of tingling warmth spreads through your body as it digests the fruit. You can feel your blood pumping through your extremities, making them feel sensitive and surprisingly sensual. It's going to be hard to resist getting ");
            if (player.lust > 60) outputText("even more ");
            outputText("turned on.");
        }
        player.modStats("lib", 1, "sen", .25);
        changes++;
    }
    //------------
    // SEXUAL TFs
    //------------
    //Sexual changes would go here if I wasn't a tard.
    if (rand(4) == 0 && changes < changeLimit) { //Heat
        var intensified = player.inHeat;
        if (player.goIntoHeat(false)) {
            if (intensified) {
                if (rand(2) == 0)
                    outputText("<br><br>The itch inside your " + player.vaginaDescript(0) + " is growing stronger, and you desperately want to find a nice cock to massage the inside.");
                else
                    outputText("<br><br>The need inside your " + player.vaginaDescript(0) + " grows even stronger. You desperately need to find a mate to 'scratch your itch' and fill your womb with kittens. It's difficult NOT to think about a cock slipping inside your moist fuck-tunnel, and at this point you'll have a hard time resisting ANY male who approaches.");
            }
            else {
                outputText("<br><br>The interior of your " + player.vaginaDescript(0) + " clenches tightly, squeezing with reflexive, aching need. Your skin flushes hot ");
                if (player.skinType == SKIN_TYPE_FUR) outputText("underneath your fur ");
                outputText("as images and fantasies ");
                if (player.cor < 50)
                    outputText("assault ");
                else
                    outputText("fill ");
                outputText(" your mind. Lithe cat-boys with their perfect, spine-covered cocks line up behind you, and you bend over to present your needy pussy to them. You tremble with the desire to feel the exotic texture of their soft barbs rubbing your inner walls, smearing your " + player.vaginaDescript(0) + " with their cum as you're impregnated. Shivering, you recover from the fantasy and pull your fingers from your aroused sex. <b>It would seem you've gone into heat!</b>");
            }
            changes++;
        }
    }
    //Shrink the boobalies down to A for men or C for girls.
    if (changes < changeLimit && rand(4) == 0 && !hyperHappy) {
        temp2 = 0;
        temp3 = 0;
        //Determine if shrinkage is required
        //and set temp2 to threshold
        if (!player.hasVagina() && player.biggestTitSize() > 2)
            temp2 = 2;
        else if
        (player.biggestTitSize() > 4) temp2 = 4;
        //IT IS!
        if (temp2 > 0) {
            //temp3 stores how many rows are changed
            temp3 = 0;
            for (var k = 0; k < player.breastRows.length; k++) {
                //If this row is over threshhold
                if (player.breastRows[k].breastRating > temp2) {
                    //Big change
                    if (player.breastRows[k].breastRating > 10) {
                        player.breastRows[k].breastRating -= 2 + rand(3);
                        if (temp3 == 0) outputText("<br><br>The " + player.breastDescript(0) + " on your chest wobble for a second, then tighten up, losing several cup-sizes in the process!");
                        else outputText(" The change moves down to your " + num2Text2(k + 1) + " row of " + player.breastDescript(0) + ". They shrink greatly, losing a couple cup-sizes.");
                    }
                    //Small change
                    else {
                        player.breastRows[k].breastRating -= 1;
                        if (temp3 == 0) outputText("<br><br>All at once, your sense of gravity shifts. Your back feels a sense of relief, and it takes you a moment to realize your " + player.breastDescript(k) + " have shrunk!");
                        else outputText(" Your " + num2Text2(k + 1) + " row of " + player.breastDescript(k) + " gives a tiny jiggle as it shrinks, losing some off its mass.");
                    }
                    //Increment changed rows
                    temp3++;
                }
            }
        }
        //Count that tits were shrunk
        if (temp3 > 0) changes++;
    }
    //Cat dangly-doo.
    if (player.cockTotal() > 0 && player.countCocksOfType(CockTypesEnum.CAT) < player.cockTotal() && (player.earType == EARS_CAT || rand(3) > 0) && (player.tailType == TAIL_TYPE_CAT || rand(3) > 0) && changes < changeLimit && rand(4) == 0) {
        //loop through and find a non-cat wang.
        for (var i = 0; i < (player.cockTotal()) && player.cocks[i].cockType == CockTypesEnum.CAT; i++) { }
        outputText("<br><br>Your " + player.cockDescript(i) + " swells up with near-painful arousal and begins to transform. It turns pink and begins to narrow until the tip is barely wide enough to accommodate your urethra. Barbs begin to sprout from its flesh, if you can call the small, fleshy nubs barbs. They start out thick around the base of your " + Appearance.cockNoun(CockTypesEnum.HUMAN) + " and shrink towards the tip. The smallest are barely visible. <b>Your new feline dong throbs powerfully</b> and spurts a few droplets of cum. ");
        if (!player.hasSheath()) {
            outputText("Then, it begins to shrink and sucks itself inside your body. Within a few moments, a fleshy sheath is formed.");
            if (player.balls > 0) outputText(" Thankfully, your balls appear untouched.");
        }
        else outputText("Then, it disappears back into your sheath.");
        player.cocks[i].cockType = CockTypesEnum.CAT;
        player.cocks[i].knotMultiplier = 1;
        changes++;
    }
    //Cat penorz shrink
    if (player.countCocksOfType(CockTypesEnum.CAT) > 0 && rand(3) == 0 && changes < changeLimit && !hyperHappy) {
        //loop through and find a cat wang.
        temp = 0;
        for (var j = 0; j < (player.cockTotal()); j++) {
            if (player.cocks[j].cockType == CockTypesEnum.CAT && player.cocks[j].cockLength > 6) {
                temp = 1;
                break;
            }
        }
        if (temp == 1) {
            //lose 33% size until under 10, then lose 2" at a time
            if (player.cocks[j].cockLength > 16) {
                outputText("<br><br>Your " + player.cockDescript(j) + " tingles, making your sheath feel a little less tight. It dwindles in size, losing a full third of its length and a bit of girth before the change finally stops.");
                player.cocks[j].cockLength *= .66;
            }
            else if (player.cocks[j].cockLength > 6) {
                outputText("<br><br>Your " + player.cockDescript(j) + " tingles and withdraws further into your sheath. If you had to guess, you'd say you've lost about two inches of total length and perhaps some girth.");
                player.cocks[j].cockLength -= 2;
            }
            if (player.cocks[j].cockLength / 5 < player.cocks[j].cockThickness && player.cocks[j].cockThickness > 1.25) player.cocks[j].cockThickness = player.cocks[j].cockLength / 6;
            //Check for any more!
            temp2 = 0;
            j++;
            for (j; j < player.cocks.length; j++) {
                //Found another cat wang!
                if (player.cocks[j].cockType == CockTypesEnum.CAT) {
                    //Long enough - change it
                    if (player.cocks[j].cockLength > 6) {
                        if (player.cocks[j].cockLength > 16)
                            player.cocks[j].cockLength *= .66;
                        else if (player.cocks[j].cockLength > 6)
                            player.cocks[j].cockLength -= 2;
                        //Thickness adjustments
                        if (player.cocks[j].cockLength / 5 < player.cocks[j].cockThickness && player.cocks[j].cockThickness > 1.25) player.cocks[j].cockThickness = player.cocks[j].cockLength / 6;
                        temp2 = 1;
                    }
                }
            }
            //(big sensitivity boost)
            outputText(" Although the package is smaller, it feels even more sensitive – as if it retained all sensation of its larger size in its smaller form.");
            player.modStats("sen", 5);
            //Make note of other dicks changing
            if (temp2 == 1) outputText(" Upon further inspection, all your " + Appearance.cockNoun(CockTypesEnum.CAT) + "s have shrunk!");
            changes++;
        }
    }
    //------------
    // BODY TFs
    //------------
    //Body type changes.  Teh rarest of the rare.
    //DA EARZ
    if (player.earType != EARS_CAT && rand(5) == 0 && changes < changeLimit) {
        //human to cat:
        if (player.earType == EARS_HUMAN) {
            if (rand(2) == 0)
                outputText("<br><br>The skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate a little, fur growing on them as they become feline in nature. <b>You now have cat ears.</b>");
            else
                outputText("<br><br>Your ears begin to tingle. You reach up with one hand and gently rub them. They appear to be growing fur. Within a few moments, they've migrated up to the top of your head and increased in size. The tingling stops and you find yourself hearing noises in a whole new way. <b>You now have cat ears.</b>");
        }
        //non human to cat:
        else {
            if (rand(2) == 0)
                outputText("<br><br>Your ears change shape, morphing into pointed, feline ears! They swivel about reflexively as you adjust to them. <b>You now have cat ears.</b>");
            else
                outputText("<br><br>Your ears tingle and begin to change shape. Within a few moments, they've become long and feline. Thanks to the new fuzzy organs, you find yourself able to hear things that eluded your notice up until now. <b>You now have cat ears.</b>");
        }
        player.earType = EARS_CAT;
        changes++;
    }
    //DA TAIL (IF ALREADY HAZ URZ)
    if (player.tailType != TAIL_TYPE_CAT && player.earType == EARS_CAT && rand(5) == 0 && changes < changeLimit) {
        if (player.tailType == TAIL_TYPE_NONE) {
            temp = rand(3);
            if (temp == 0) outputText("<br><br>A pressure builds in your backside. You feel under your " + player.armor.equipmentName + " and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. You instinctively keep adjusting it to improve your balance. <b>You now have a cat-tail.</b>");
            if (temp == 1) outputText("<br><br>You feel your backside shift and change, flesh molding and displacing into a long, flexible tail! <b>You now have a cat tail.</b>");
            if (temp == 2) outputText("<br><br>You feel an odd tingling in your spine and your tail bone starts to throb and then swell. Within a few moments it begins to grow, adding new bones to your spine. Before you know it, you have a tail. Just before you think it's over, the tail begins to sprout soft, glossy " + player.furColor + " fur. <b>You now have a cat tail.</b>");
        }
        else outputText("<br><br>You pause and tilt your head... something feels different. Ah, that's what it is; you turn around and look down at your tail as it starts to change shape, narrowing and sprouting glossy fur. <b>You now have a cat tail.</b>");
        player.tailType = TAIL_TYPE_CAT;
        changes++;
    }
    //Da paws (if already haz ears & tail)
    if (player.tailType == TAIL_TYPE_CAT && player.earType == EARS_CAT && rand(5) == 0 && changes < changeLimit && player.lowerBody != LOWER_BODY_TYPE_CAT) {
        //hoof to cat:
        if (player.lowerBody == LOWER_BODY_TYPE_HOOFED) {
            outputText("<br><br>You feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred cat paws. <b>You now have cat paws.</b>");
            if (player.isTaur()) outputText(" You feel woozy and collapse on your side. When you wake, you're no longer a centaur and your body has returned to a humanoid shape.");
        }
        //Goo to cat
        else if (player.lowerBody == LOWER_BODY_TYPE_GOO) {
            outputText("<br><br>Your lower body rushes inward, molding into two leg-like shapes that gradually stiffen up. In moments they solidify into digitigrade legs, complete with soft, padded cat-paws. <b>You now have cat-paws!</b>");
        }
        //non hoof to cat:
        else
            outputText("<br><br>You scream in agony as you feel the bones in your " + player.feet() + " break and begin to rearrange. When the pain fades, you feel surprisingly well-balanced. <b>You now have cat paws.</b>");
        player.lowerBody = LOWER_BODY_TYPE_CAT;
        player.legCount = 2;
        changes++;
    }
    //TURN INTO A FURRAH!  OH SHIT
    if (player.tailType == TAIL_TYPE_CAT && player.earType == EARS_CAT && rand(5) == 0 && changes < changeLimit && player.lowerBody == LOWER_BODY_TYPE_CAT && player.skinType != SKIN_TYPE_FUR) {
        outputText("<br><br>Your " + player.skinDesc + " begins to tingle, then itch. ");
        player.skinType = SKIN_TYPE_FUR;
        player.skinDesc = "fur";
        player.setFurColor(["brown", "chocolate", "auburn", "caramel", "orange", "sandy brown", "golden", "black", "midnight black", "dark gray", "gray", "light gray", "silver", "white", "orange and white", "brown and white", "black and white", "gray and white"]);
        outputText("You reach down to scratch your arm absent-mindedly and pull your fingers away to find strands of " + player.furColor + " fur. Wait, fur? What just happened?! You spend a moment examining yourself and discover that <b>you are now covered in glossy, soft fur.</b>");
        changes++;
    }
    //CAT-FACE!  FULL ON FURRY!  RAGE AWAY NEKOZ
    if (player.tailType == TAIL_TYPE_CAT && player.earType == EARS_CAT && rand(5) == 0 && changes < changeLimit && player.lowerBody == LOWER_BODY_TYPE_CAT && (player.skinType == SKIN_TYPE_FUR || (player.skinType == SKIN_TYPE_SCALES && player.dragonneScore() >= 4)) && player.faceType != FACE_CAT) {
        //Gain cat face, replace old face
        temp = rand(3);
        if (temp == 0) outputText("<br><br>Your face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection and discover <b>your face is now a cross between human and feline features.</b>");
        else if (temp == 1) outputText("<br><br>Mind-numbing pain courses through you as you feel your facial bones rearranging. You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your facial characteristics with those of a feline. <b>You now have an anthropomorphic cat-face.</b>");
        else outputText("<br><br>Your face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your facial features rearrange to take on many feline aspects.</b>");
        player.faceType = FACE_CAT;
        changes++;
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
        player.gills = false;
        changes++;
    }
    //FAILSAFE CHANGE
    if (changes == 0) {
        outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>");
        player.changeHP(50, true);
        player.modStats("lus", 3);
    }
    if (changes < changeLimit) {
        if (rand(2) == 0) outputText(player.modThickness(5, 2), false);
        if (rand(2) == 0) outputText(player.modTone(76, 2), false);
        if (player.gender < 2) {
            if (rand(2) == 0)
                outputText(player.modFem(65, 1), false);
            else
                outputText(player.modFem(85, 2), false);
        }
    }
    gameFlags[TIMES_TRANSFORMED] += changes;
};

ConsumableEffects.goblinTFs = function() {
    var changes = 0;
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (rand(4) == 0) changeLimit++;
    if (rand(5) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    outputText("You drink the ale, finding it to have a remarkably smooth yet potent taste. You lick your lips and sneeze, feeling slightly tipsy.", true);
    player.slimeFeed();
    player.changeLust("lus", 15);
    //------------
    // STATS CHANGES
    //------------
    //Weaker
    if (player.str > 50) {
        player.modStats("str", -1);
        if (player.str > 70) player.modStats("str", -1);
        if (player.str > 90) player.modStats("str", -2);
        outputText("<br><br>You feel a little weaker, but maybe it's just the alcohol.");
    }
    //Less tough
    if (player.tou > 50) {
        outputText("<br><br>Giggling, you poke yourself, which only makes you giggle harder when you realize how much softer you feel.");
        player.modStats("tou", -1);
        if (player.tou > 70) player.modStats("tou", -1);
        if (player.tou > 90) player.modStats("tou", -2);
    }
    //Speed boost
    if (rand(3) == 0 && player.spe < 50 && changes < changeLimit) {
        player.modStats("spe", 1 + rand(2));
        outputText("<br><br>You feel like dancing, and stumble as your legs react more quickly than you'd think. Is the alcohol slowing you down or are you really faster? You take a step and nearly faceplant as you go off balance. It's definitely both.");
        changes++;
    }
    //------------
    // SEXUAL TFs
    //------------
    //Multidick killa!
    if (player.cocks.length > 1 && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>");
        player.removeCock(player.cocks.length-1);
        changes++;
    }
    //Boost vaginal capacity without gaping
    if (changes < changeLimit && rand(3) == 0 && player.hasVagina() && player.statusEffectValue(StatusEffects.BonusVCapacity, 1) < 40) {
        if (player.findStatusEffect(StatusEffects.BonusVCapacity) < 0) player.createStatusEffect(StatusEffects.BonusVCapacity, 0, 0, 0, 0);
        player.addStatusValue(StatusEffects.BonusVCapacity, 1, 5);
        outputText("<br><br>There is a sudden... emptiness within your " + player.vaginaDescript(0) + ". Somehow you know you could accommodate even larger... insertions.");
        changes++;
    }
    //Boost fertility
    if (changes < changeLimit && rand(4) == 0 && player.fertility < 40 && player.hasVagina()) {
        player.fertility += 2 + rand(5);
        changes++;
        outputText("<br><br>You feel strange. Fertile... somehow. You don't know how else to think of it, but you're ready to be a mother.");
    }
    //Shrink primary dick to no longer than 12 inches
    else if (player.cocks.length == 1 && rand(2) == 0 && changes < changeLimit && !hyperHappy) {
        if (player.cocks[0].cockLength > 12) {
            changes++;
            var temp3 = 0;
            outputText("<br><br>");
            //Shrink said cock
            if (player.cocks[0].cockLength < 6 && player.cocks[0].cockLength >= 2.9) {
                player.cocks[0].cockLength -= .5;
                temp3 -= .5;
            }
            temp3 += player.increaseCock(0, (rand(3) + 1) * -1);
            player.cocks[0].lengthChange(temp3, 1);
        }
    }
    //------------
    // BODY TFs
    //------------
    //antianemone corollary:
    if (changes < changeLimit && player.hairType == 4 && rand(2) == 0) {
        //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
        outputText("<br><br>As you down the potent ale, your head begins to feel heavier - and not just from the alcohol! Reaching up, you notice your tentacles becoming soft and somewhat fibrous. Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like strands. <b>Your hair is now back to normal!</b>");
        player.hairType = HAIR_NORMAL;
        changes++;
    }
    //Shrink
    if (rand(2) == 0 && player.tallness > 48) {
        changes++;
        outputText("<br><br>The world spins, and not just from the strength of the drink! Your viewpoint is closer to the ground. How fun!");
        player.tallness -= (1 + rand(5));
    }

    //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_HARPY && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating. The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_SPIDER && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your arms' chitinous covering is flaking away. The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //REMOVAL STUFF
    //Removes wings and antennaes!
    if (changes < changeLimit && rand(4) == 0 && (player.wingType == WING_TYPE_BEE_LIKE_SMALL || player.wingType == WING_TYPE_BEE_LIKE_LARGE || player.wingType >= WING_TYPE_HARPY)) {
        if (player.wingType == WING_TYPE_SHARK_FIN) outputText("<br><br>Your back tingles, feeling lighter. Something lands behind you with a 'thump', and when you turn to look, you see your fin has fallen off. This might be the best (and worst) booze you've ever had! <b>You no longer have a fin!</b>");
        else outputText("<br><br>Your shoulders tingle, feeling lighter. Something lands behind you with a 'thump', and when you turn to look you see your wings have fallen off. This might be the best (and worst) booze you've ever had! <b>You no longer have wings!</b>");
        player.wingType = WING_TYPE_NONE;
        changes++;
    }
    //Removes wings and antennaes!
    if (changes < changeLimit && rand(3) == 0 && player.antennae > ANTENNAE_NONE) {
        outputText("<br><br>Your " + player.hairDescript() + " itches so you give it a scratch, only to have your antennae fall to the ground. What a relief. <b>You've lost your antennae!</b>");
        changes++;
        player.antennae = ANTENNAE_NONE;
    }
    //Remove odd eyes
    if (changes < changeLimit && rand(5) == 0 && player.eyeType > EYES_HUMAN) {
        if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP) {
            outputText("<br><br>You feel a twinge in your eyes and you blink. It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
        }
        else {
            outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you. As you steady and open your eyes, you realize something seems different. Your vision is changed somehow.");
            if (player.eyeType == EYES_FOUR_SPIDER_EYES) outputText(" Your multiple, arachnid eyes are gone!</b>");
            outputText(" <b>You have normal, humanoid eyes again.</b>");
        }
        player.eyeType = EYES_HUMAN;
        changes++;
    }
    //-Remove extra breast rows
    if (changes < changeLimit && player.bRows() > 1 && rand(3) == 0) {
        changes++;
        outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ");
        if (player.bRows() >= 3) outputText("abdomen");
        else outputText("chest");
        outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ");
        if (player.skinType == SKIN_TYPE_FUR) outputText(player.hairColor + " " + player.skinDesc, false);
        else outputText(player.skinTone + " " + player.skinDesc, false);
        outputText(" remains. <b>You've lost a row of breasts!</b>");
        player.modStats("sen", -5);
        player.removeBreastRow(player.breastRows.length - 1, 1);
    }
    //Skin/fur
    if (player.skinType != SKIN_TYPE_PLAIN && changes < changeLimit && rand(4) == 0 && player.faceType == FACE_HUMAN) {
        if (player.skinType == SKIN_TYPE_FUR) outputText("<br><br>Your fur itches incessantly, so you start scratching it. It starts coming off in big clumps before the whole mess begins sloughing off your body. In seconds, your skin is nude. <b>You've lost your fur!</b>");
        if (player.skinType == SKIN_TYPE_SCALES) outputText("<br><br>Your scales itch incessantly, so you scratch at them. They start falling off wholesale, leaving you standing in a pile of scales after only a few moments. <b>You've lost your scales!</b>");
        if (player.skinType > SKIN_TYPE_SCALES) outputText("<br><br>Your " + player.skinDesc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin. <b>Your skin is once again normal!</b>");
        player.skinAdj = "";
        player.skinDesc = "skin";
        player.skinType = SKIN_TYPE_PLAIN;
        changes++;
    }
    //skinTone
    if (player.skinTone != "green" && player.skinTone != "grayish-blue" && player.skinTone != "dark green" && player.skinTone != "pale yellow" && changes < changeLimit && rand(2) == 0) {
        if (rand(10) != 0) player.skinTone = "dark green";
        else {
            if (rand(2) == 0) player.skinTone = "pale yellow";
            else player.skinTone = "grayish-blue";
        }
        changes++;
        outputText("<br><br>Whoah, that was weird. You just hallucinated that your ");
        if (player.skinType == SKIN_TYPE_FUR) outputText("skin");
        else outputText(player.skinDesc, false);
        outputText(" turned " + player.skinTone + ". No way! It's staying, it really changed color!");
    }
    //Face!
    if (player.faceType != FACE_HUMAN && changes < changeLimit && rand(4) == 0 && player.earType == EARS_ELFIN) {
        changes++;
        player.faceType = FACE_HUMAN;
        outputText("<br><br>Another violent sneeze escapes you. It hurt! You feel your nose and discover your face has changed back into a more normal look. <b>You have a human looking face again!</b>");
    }
    //Ears!
    if (player.earType != EARS_ELFIN && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>A weird tingling runs through your scalp as your " + player.hairDescript() + " shifts slightly. You reach up to touch and bump <b>your new pointed elfin ears</b>. You bet they look cute!");
        changes++;
        player.earType = EARS_ELFIN;
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
        player.gills = false;
        changes++;
    }
    //Nipples Turn Back:
    if (gameFlags[HAS_BLACK_NIPPLES] >= 0 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>Something invisible brushes against your " + player.nippleDescript(0) + ", making you twitch. Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
        changes++;
        gameFlags[HAS_BLACK_NIPPLES] = 0;
    }
    //Debugcunt
    if (changes < changeLimit && rand(3) == 0 && player.vaginaType() == 5 && player.hasVagina()) {
        outputText("<br><br>Something invisible brushes against your sex, making you twinge. Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
        player.vaginaType(0);
        changes++;
    }
    if (changes < changeLimit && rand(4) == 0 && ((player.ass.analWetness > 0 && player.findPerk(PerkLib.MaraesGiftButtslut) < 0) || player.ass.analWetness > 1)) {
        outputText("<br><br>You feel a tightening up in your colon and your [asshole] sucks into itself. You feel sharp pain at first but that thankfully fades. Your ass seems to have dried and tightened up.");
        player.ass.analWetness--;
        if (player.ass.analLooseness > 1) player.ass.analLooseness--;
        changes++;
    }
    if (changes < changeLimit && rand(3) == 0) {
        if (rand(2) == 0) player.modFem(85, 3);
        if (rand(2) == 0) player.modThickness(20, 3);
        if (rand(2) == 0) player.modTone(15, 5);
    }
    player.refillHunger(15);
};

ConsumableEffects.humanTFs = function() {
    var changes = 0;
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Text go!
    clearOutput();
    outputText("You crack open the small clay jar to reveal a lightly colored paste that smells surprisingly delicious. You begin eating it with your fingers, wishing all the while for some crackers... ");
    player.slimeFeed();
    player.refillHunger(20);
    if (player.humanScore() > 4) {
        outputText("<br><br>You blink and the world twists around you. You feel more like yourself than you have in a while, but exactly how isn't immediately apparent. Maybe you should take a look at yourself?");
    }
    else {
        outputText("<br><br>You cry out as the world spins around you. You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing. You nearly black out, and then it's over. Maybe you had best have a look at yourself and see what changed?");
    }
    //------------
    // MAJOR TFs
    //------------
    //1st priority: Change lower body to bipedal.
    //(Centaurs -> Normal Human Legs) (copy from elsewhere)
    if (player.isTaur() && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>Your quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side. Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow. When it finally stops, <b>you look down to behold your new pair of human legs</b>!");
        player.lowerBody = LOWER_BODY_TYPE_HUMAN;
        player.legCount = 2;
        changes++;
    }
    //(Goo -> Normal Human Legs) (copy from elsewhere)
    if (player.isGoo() && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>Your lower body rushes inward, molding into two leg-like shapes that gradually stiffen up. In moments they solidify into normal-looking legs, complete with regular, human feet. <b>You now have normal feet!</b>");
        player.lowerBody = LOWER_BODY_TYPE_HUMAN;
        player.legCount = 2;
        changes++;
    }
    //(Naga -> Normal Human Legs) (copy from elsewhere)
    if (player.isNaga() && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>You collapse as your sinuous snake-tail tears in half, shifting into legs. The pain is immense, particularly where your new feet are forming. <b>You have human legs again.</b>");
        player.lowerBody = LOWER_BODY_TYPE_HUMAN;
        player.legCount = 2;
        changes++;
    }
    //(Non-human -> Normal Human Legs)
    if (player.isBiped() && player.lowerBody != LOWER_BODY_TYPE_HUMAN && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>You collapse as your legs shift and twist. By the time the pain subsides, you notice that you have normal legs and normal feet. <b>You now have normal feet!</b>");
        player.lowerBody = LOWER_BODY_TYPE_HUMAN;
        player.legCount = 2;
        changes++;
    }
    //Remove Incorporeality Perk
    if (player.findPerk(PerkLib.Incorporeality) >= 0 && changes < changeLimit && rand(10) == 0) {
        outputText("<br><br>You feel a strange sensation in your [legs] as they start to feel more solid. They become more opaque until finally, you can no longer see through your [legs]. <br><b>(Perk Lost: Incorporeality!)</b>");
        player.removePerk(PerkLib.Incorporeality);
        changes++;
    }
    //-Skin color change – tan, olive, dark, light
    if ((player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "dark" && player.skinTone != "light") && changes < changeLimit && rand(5) == 0) {
        changes++;
        outputText("<br><br>It takes a while for you to notice, but <b>");
        if (player.skinType == SKIN_TYPE_FUR) outputText("the skin under your " + player.furColor + " " + player.skinDesc, false);
        else outputText("your " + player.skinDesc, false);
        outputText(" has changed to become ");
        temp = rand(4);
        if (temp == 0) player.skinTone = "tan";
        else if (temp == 1) player.skinTone = "olive";
        else if (temp == 2) player.skinTone = "dark";
        else if (temp == 3) player.skinTone = "light";
        outputText(player.skinTone + " colored.</b>");
    }
    //Change skin to normal
    if (player.skinType != SKIN_TYPE_PLAIN && (player.earType == EARS_HUMAN || player.earType == EARS_ELFIN) && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>A slowly-building itch spreads over your whole body, and as you idly scratch yourself, you find that your " + player.skinFurScales() + " ");
        if (player.skinType == SKIN_TYPE_SCALES) outputText("are");
        else outputText("is");
        outputText(" falling to the ground, revealing flawless skin below. <b>You now have normal skin.</b>");

        player.skinType = SKIN_TYPE_PLAIN;
        player.skinDesc = "skin";
        changes++;
    }
    //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_HARPY && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating. The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
    if (changes < changeLimit && player.armType == ARM_TYPE_SPIDER && rand(4) == 0) {
        outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your arms' chitinous covering is flaking away. The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.");
        player.armType = ARM_TYPE_HUMAN;
        changes++;
    }
    //------------
    // MINOR TFs
    //------------
    //-Human face
    if (player.faceType != FACE_HUMAN && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>Sudden agony sweeps over your " + player.face() + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.");
        player.faceType = FACE_HUMAN;
        changes++;
    }
    //-Human tongue
    if (player.tongueType != TONGUE_HUMAN && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>You feel something strange inside your face as your tongue shrinks and recedes until it feels smooth and rounded. <b>You realize your tongue has changed back into human tongue!</b>");
        player.tongueType = TONGUE_HUMAN;
        changes++;
    }
    //Remove odd eyes
    if (changes < changeLimit && rand(5) == 0 && player.eyeType > EYES_HUMAN) {
        if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP) {
            outputText("<br><br>You feel a twinge in your eyes and you blink. It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
        }
        else {
            outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you. As you steady and open your eyes, you realize something seems different. Your vision is changed somehow.");
            if (player.eyeType == EYES_FOUR_SPIDER_EYES) outputText(" Your multiple, arachnid eyes are gone!</b>");
            outputText(" <b>You have normal, humanoid eyes again.</b>");
        }
        player.eyeType = EYES_HUMAN;
        changes++;
    }
    //-Gain human ears (If you have human face)
    if ((player.earType != EARS_HUMAN && player.faceType == FACE_HUMAN) && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>Ouch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!");
        player.earType = EARS_HUMAN;
        changes++;
    }
    //Removes gills
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
        player.gills = false;
        changes++;
    }
    //Nipples Turn Back:
    if (gameFlags[HAS_BLACK_NIPPLES] >= 0 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>Something invisible brushes against your " + player.nippleDescript(0) + ", making you twitch. Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
        changes++;
        gameFlags[HAS_BLACK_NIPPLES] = 0;
    }
    //Remove feathery hair (copy for equinum, canine peppers, Labova)
    if (changes < changeLimit && player.hairType == HAIR_FEATHER && rand(4) == 0) {
        //(long):
        if (player.hairLength >= 6) outputText("<br><br>A lock of your downy-soft feather-hair droops over your eye. Before you can blow the offending down away, you realize the feather is collapsing in on itself. It continues to curl inward until all that remains is a normal strand of hair. <b>Your hair is no longer feathery!</b>");
        //(short)
        else outputText("<br><br>You run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested. While your hand is up there, it detects a change in the texture of your feathers. They're completely disappearing, merging down into strands of regular hair. <b>Your hair is no longer feathery!</b>");
        changes++;
        player.hairType = HAIR_NORMAL;
    }
    //Remove anemone hair
    if (changes < changeLimit && player.hairType == HAIR_ANEMONE && rand(3) == 0) {
        //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
        outputText("<br><br>You feel something strange going in on your head. You reach your hands up to feel your tentacle-hair, only to find out that the tentacles have vanished and replaced with normal hair. <b>Your hair is normal again!</b>");
        player.hairType = HAIR_NORMAL;
        changes++;
    }
    //Remove goo hair
    if (changes < changeLimit && player.hairType == HAIR_GOO && rand(3) == 0) {
        outputText("<br><br>Your gooey hair begins to fall out in globs, eventually leaving you with a bald head. Your head is not left bald for long, though. Within moments, a full head of hair sprouts from the skin of your scalp. <b>Your hair is normal again!</b>");
        //Turn hair growth on.
        gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
        player.hairType = HAIR_NORMAL;
        changes++;
    }
    //Restart hair growth
    if (gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] > 0 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>You feel an itching sensation in your scalp as you realize the change. <b>Your hair is growing normally again!</b>");
        //Turn hair growth on.
        gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
        player.hairType = HAIR_NORMAL;
        changes++;
    }
    //------------
    // EXTRA PARTS REMOVAL
    //------------
    //Removes antennae
    if (player.antennae > ANTENNAE_NONE && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>The muscles in your brow clench tightly, and you feel a tremendous pressure on your upper forehead. When it passes, you touch yourself and discover your antennae have vanished!");
        player.antennae = ANTENNAE_NONE;
        changes++;
    }
    //Removes horns
    if (changes < changeLimit && player.horns > 0 && rand(5) == 0) {
        player.horns = 0;
        player.hornType = HORNS_NONE;
        outputText("<br><br>Your horns crumble, falling apart in large chunks until they flake away to nothing.");
        changes++;
    }
    //Removes wings
    if (player.wingType > WING_TYPE_NONE && rand(5) == 0 && changes < changeLimit) {
        if (player.wingType == WING_TYPE_SHARK_FIN)
            outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into your spine. After a moment the pain passes, though your fin is gone!");
        else
            outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into each of your shoulder-blades. After a moment the pain passes, though your wings are gone!");
        player.wingType = WING_TYPE_NONE;
        changes++;
    }
    //Removes tail
    if (player.tailType > TAIL_TYPE_NONE && rand(5) == 0 && changes < changeLimit) {
        outputText("<br><br>You feel something shifting in your backside. Then something detaches from your backside and it falls onto the ground. <b>You no longer have a tail!</b>");
        player.tailType = TAIL_TYPE_NONE;
        player.tailVenom = 0;
        player.tailRecharge = 5;
        changes++;
    }
    //Increase height up to 5 feet.
    if (rand(2) == 0 && changes < changeLimit && player.tallness < 60) {
        var temp = rand(5) + 3;
        //Slow rate of growth near ceiling
        if (player.tallness > 90) temp = Math.floor(temp / 2);
        //Never 0
        if (temp == 0) temp = 1;
        //Flavor texts.  Flavored like 1950's cigarettes. Yum.
        if (temp < 5) outputText("<br><br>You shift uncomfortably as you realize you feel off balance. Gazing down, you realize you have grown SLIGHTLY taller.");
        if (temp >= 5 && temp < 7) outputText("<br><br>You feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
        if (temp == 7) outputText("<br><br>Staggering forwards, you clutch at your head dizzily. You spend a moment getting your balance, and stand up, feeling noticeably taller.");
        player.tallness += temp;
        changes++;
    }
    //Decrease height down to a minimum of 7 feet.
    if (rand(2) == 0 && changes < changeLimit && player.tallness > 84) {
        outputText("<br><br>Your skin crawls, making you close your eyes and shiver. When you open them again the world seems... different. After a bit of investigation, you realize you've become shorter!<br>");
        player.tallness -= 1 + rand(3);
        changes++;
    }
    //------------
    // SEXUAL TFs
    //------------
    //Remove additional cocks
    if (player.cocks.length > 1 && rand(3) == 0 && changes < changeLimit) {
        player.removeCock(1);
        outputText("<br><br>You have a strange feeling as your crotch tingles. " + player.clothedOrNakedLower("Opening your " + player.armor.equipmentName.equipmentName, "Looking down") + ", <b>you realize that one of your cocks have vanished completely!</b>");
        player.genderCheck();
        changes++;
    }
    //Remove additional balls
    if (player.balls > 2 && rand(3) == 0 && changes < changeLimit) {
        if (player.ballSize > 2) {
            if (player.ballSize > 5) player.ballSize -= 1 + rand(3);
            player.ballSize -= 1;
            outputText("<br><br>Your scrotum slowly shrinks, settling down at a smaller size. <b>Your " + player.ballsDescriptLight() + " are smaller now.</b><br><br>");
        }
        else {
            player.balls = 2;
            outputText("<br><br>Your scrotum slowly shrinks until they seem to have reached a normal size. <b>You can feel as if your extra balls fused together, leaving you with a pair of balls.</b><br><br>");
        }
        changes++;
    }
    //Change cock back to normal
    if (player.hasCock() && changes < changeLimit) {
        if (rand(3) == 0 && player.cocks[0].cockType != CockTypesEnum.HUMAN) {
            outputText("<br><br>A strange tingling begins behind your " + player.cockDescript(0) + ", slowly crawling up across its entire length. While neither particularly arousing nor uncomfortable, you do shift nervously as the feeling intensifies. You resist the urge to undo your " + player.armor.equipmentName + " to check, but by the feel of it, your penis is shifting form. Eventually the transformative sensation fades, <b>leaving you with a completely human penis.</b>");
            player.cocks[0].cockType = CockTypesEnum.HUMAN;
            changes++;
        }
    }
    //Shrink oversized cocks
    if (player.hasCock() && player.biggestCockLength() > 12 && rand(3) == 0 && changes < changeLimit) {
        var idx = player.biggestCockIndex();
        if (player.cocks.length == 1) outputText("<br><br>You feel a tingling sensation as your cock shrinks to a smaller size!");
        else outputText("<br><br>You feel a tingling sensation as the largest of your cocks shrinks to a smaller size!");
        player.cocks[idx].cockLength -= (rand(10) + 2) / 10;
        if (player.cocks[idx].cockThickness > 1.5) {
            outputText(" Your " + player.cockDescript(idx) + " definitely got a bit thinner as well.");
            player.cocks[idx].cockThickness -= (rand(4) + 1) / 10;
        }
        changes++;
    }
    //Remove additional breasts
    if (changes < changeLimit && player.breastRows.length > 1 && rand(3) == 0 && !hyperHappy) {
        changes++;
        outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ");
        if (player.breastRows.length >= 3)
            outputText("abdomen");
        else
            outputText("chest");
        outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ");
        if (player.skinType == SKIN_TYPE_FUR)
            outputText(player.hairColor + " " + player.skinDesc, false);
        else
            outputText(player.skinTone + " " + player.skinDesc, false);
        outputText(" remains. <b>You've lost a row of breasts!</b>");
        player.modStats("sen", -5);
        player.removeBreastRow(player.breastRows.length - 1, 1);
        changes++;
    }
    //Remove extra nipples
    if (player.averageNipplesPerBreast() > 1 && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>A tightness arises in your nipples as three out of four on each breast recede completely, the leftover nipples migrating to the middle of your breasts. <b>You are left with only one nipple on each breast.</b>");
        for(var x = 0; x < player.bRows(); x++)
        {
            player.breastRows[x].nipplesPerBreast = 1;
        }
        changes++;
    }
    //Shrink tits!
    if (changes < changeLimit && rand(3) == 0 && player.biggestTitSize() > 6) {
        player.shrinkTits();
        changes++;
    }
    //Change vagina back to normal
    if (changes < changeLimit && rand(3) == 0 && player.vaginaType() == 5 && player.hasVagina()) {
        outputText("<br><br>Something invisible brushes against your sex, making you twinge. Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
        player.vaginaType(0);
        changes++;
    }
    //Fertility Decrease:
    if (player.hasVagina() && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>The vague numbness in your skin sinks slowly downwards, and you put a hand on your lower stomach as the sensation centers itself there. ");
        player.modStats("sen", -2);
        //High fertility:
        if (player.fertility >= 30) outputText("It feels like your overcharged reproductive organs have simmered down a bit.");
        //Average fertility:
        else if (player.fertility >= 10) outputText("You feel like you have dried up a bit inside; you are left feeling oddly tranquil.");
        //[Low/No fertility:
        else {
            outputText("Although the numbness makes you feel serene, the hummus has no effect upon your ");
            if (player.fertility > 0) outputText("mostly ");
            outputText("sterile system.");
            if (player.cor > 70) outputText(" For some reason the fact that you cannot function as nature intended makes you feel helpless and submissive. Perhaps the only way to be a useful creature now is to find a dominant, fertile being willing to plow you full of eggs? You shake the alien, yet oddly alluring thought away.");
        }
        player.fertility -= 1 + rand(3);
        if (player.fertility < 10 && player.gender >= 2) player.fertility = 10;
        if (player.fertility < 5) player.fertility = 5;
        changes++;
    }
    //Cum Multiplier Decrease:
    if (player.hasCock() && player.cumMultiplier > 5 && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>You feel a strange tingling sensation in your ");
        if (player.balls > 0) outputText("balls");
        else outputText("groin");
        outputText(" as you can feel the density reducing. You have a feeling you're going to produce less cum now.");
        player.cumMultiplier -= (1 + (rand(20) / 10));
        if (player.cumMultiplier < 1) player.cumMultiplier = 1;
        changes++;
    }
    gameFlags[TIMES_TRANSFORMED] += changes;
};

ConsumableEffects.impTFs = function() {
    var changes = 0;
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Consumption text
    if (player.hasCock() > 0)
        outputText("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.");
    else
        outputText("The food tastes... corrupt, for lack of a better word.");
    //Refill hunger & HP restore!
    player.refillHunger(20);
    outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>");
    player.changeHP(30 + player.tou / 3, true, false);
    player.modStats("lus", 3, "cor", 1);
    //Cock growth!
    if (changes < changeLimit && player.hasCock() && player.cocks[0].cockLength < 12) {
        var temp = player.increaseCock(0, rand(2) + 2);
        outputText("<br><br>");
        player.lengthChange(temp, 1);
    }
    //Shrinkage!
    if (changes < changeLimit && rand(2) == 0 && player.tallness > 42) {
        outputText("<br><br>Your skin crawls, making you close your eyes and shiver. When you open them again the world seems... different. After a bit of investigation, you realize you've become shorter!<br>");
        player.tallness -= 1 + rand(3);
        changes++;
    }
    //Red skin!
    if (changes < changeLimit && rand(10) == 0 && player.skinTone != "red") {
        if (player.skinType == SKIN_TYPE_FUR) outputText("<br><br>Underneath your fur, your skin ");
        else outputText("<br><br>Your " + player.skinDesc + " ");
        if (rand(2) == 0) player.skinTone = "red";
        else player.skinTone = "orange";
        outputText("begins to lose its color, fading until you're as white as an albino. Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".");
        changes++;
    }
    gameFlags[TIMES_TRANSFORMED] += changes;
};

ConsumableEffects.pigTFs = function(boar) {
    var changes = 0;
    var changeLimit = 1;
    var temp = 0;
    var x = 0;
    if (rand(2) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (boar) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    outputText("You take a bite into the pigtail truffle. It oddly tastes like bacon. You eventually finish eating. ");
    player.refillHunger(20);
    //------------
    // BAD END!
    //------------
    /*if (rand(5) == 0 && player.pigScore() >= 5 && player.findPerk(PerkLib.TransformationResistance) < 0) {
     if (flags[PIG_BAD_END_WARNING] == 0) {
     outputText("<br><br>You find yourself idly daydreaming of flailing about in the mud, letting go of all of your troubles. Eventually, you shake off the thought. Why would you do something like that? Maybe you should cut back on all the truffles?");
     player.modStats("inte", -3);
     }
     else {
     outputText("<br><br>As you down the last of your truffle, your entire body begins to convulse violently. Your vision becomes blurry, and you black out.");
     outputText("<br><br>When you awaken, you are greeted by a large dog licking at your face. The dog seems oddly familiar. \"<i>Bessy, whatcha doin’ girl?</i>\" a voice calls. The voice seems familiar as well. A funny-looking pig on two legs soon appears at the dog’s side. \"<i>Now, now, what do we have here?</i>\" The pig inspects you for a moment, eventually finding a hint of pigtail truffle on your snout.");
     outputText("<br><br>\"<i>Ah no...</i>\" he says sadly, shaking his head. \"<i>Come with me little " + player.mf("guy", "gal") + ",  I’ve got a place for ya.</i>\"  He then leads you to his shack, nestled in a small clearing in a nearby forest. \"<i>You don’t need ‘ta worry about a thing.  Come ‘ta think of it...</i>\"  he taps his chin for a moment,  \"<i>I know what I could use you for. You could be my own personal truffle hog! The more truffles, the better!</i>\"");
     outputText("<br><br>You take wonderfully to your new job. Finding truffles is fun, and the funny pig takes great care of you. You couldn’t ask for better. Sure, the world is full of demons and the like, but here, you’re safe, and that’s all you care about.");
     gameOver();
     return;
     }
     }*/
    //------------
    // SIZE MOD
    //------------
    //Increase thickness
    if (rand(3) == 0 && changes < changeLimit && player.thickness < 75) {
        outputText(player.modThickness(75, 3));
        changes++;
    }
    //Decrease muscle tone
    if (rand(3) == 0 && changes < changeLimit && player.gender >= 2 && player.tone > 20) {
        outputText(player.modTone(20, 4));
        changes++;
    }
    //Increase hip rating
    if (rand(3) == 0 && changes < changeLimit && player.gender >= 2 && player.hipRating < 15) {
        outputText("<br><br>Your gait shifts slightly to accommodate your widening " + player.hipDescript() + ". The change is subtle, but they're definitely broader.");
        player.hipRating++;
        changes++;
    }
    //Increase ass rating
    if (rand(3) == 0 && changes < changeLimit && player.buttRating < 12) {
        outputText("<br><br>When you stand back, up your [ass] jiggles with a good bit of extra weight.");
        player.buttRating++;
        changes++;
    }
    //Increase ball size if you have balls.
    if (rand(3) == 0 && changes < changeLimit && player.balls > 0 && player.ballSize < 4) {
        if (player.ballSize < 3)
            outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin. You pause to examine the changes and your roving fingers discover your " + (player.balls == 4 ? "quartette" : "duo") + " of [balls] have grown larger than a human’s.");
        else
            outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your ballsack. Walking becomes difficult as you discover your " + (player.balls == 4 ? "quartette" : "duo") + " of testicles have enlarged again.");
        player.ballSize++;
        changes++;
    }
    //------------
    // MAIN TFs
    //------------
    //Gain pig cock, independent of other pig TFs.
    if (rand(4) == 0 && changes < changeLimit && player.cocks.length > 0 && player.cocks[0].cockType != CockTypesEnum.PIG) {
        if (player.cocks.length == 1) { //Single cock
            outputText("<br><br>You feel an uncomfortable pinching sensation in your [cock]. " + player.clothedOrNakedLower("You pull open your [armor]", "You look down at your exposed groin") + ", watching as it warps and changes. As the transformation completes, you’re left with a shiny, pinkish red pecker ending in a prominent corkscrew at the tip. <b>You now have a pig penis!</b>");
            player.cocks[0].cockType = CockTypesEnum.PIG;
        }
        else { //Multiple cocks
            outputText("<br><br>You feel an uncomfortable pinching sensation in one of your cocks. You pull open your [armor], watching as it warps and changes. As the transformation completes, you’re left with a shiny pinkish red pecker ending in a prominent corkscrew at the tip. <b>You now have a pig penis!</b>");
            player.cocks[rand(player.cocks.length+1)].cockType = CockTypesEnum.PIG;
        }
        changes++;
    }
    //Gain pig ears!
    if (rand(boar ? 3 : 4) == 0 && changes < changeLimit && player.earType != EARS_PIG) {
        outputText("<br><br>You feel a pressure on your ears as they begin to reshape. Once the changes finish, you flick them about experimentally, <b>and you’re left with pointed, floppy pig ears.</b>");
        player.earType = EARS_PIG;
        changes++;
    }
    //Gain pig tail if you already have pig ears!
    if (rand(boar ? 2 : 3) == 0 && changes < changeLimit && player.earType == EARS_PIG && player.tailType != TAIL_TYPE_PIG) {
        if (player.tailType > 0) //If you have non-pig tail.
            outputText("<br><br>You feel a pinching sensation in your [tail] as it begins to warp in change. When the sensation dissipates, <b>you are left with a small, curly pig tail.</b>");
        else //If you don't have a tail.
            outputText("<br><br>You feel a tug at the base of your spine as it lengthens ever so slightly. Looking over your shoulder, <b>you find that you have sprouted a small, curly pig tail.</b>");
        player.tailType = TAIL_TYPE_PIG;
        changes++;
    }
    //Gain pig tail even when centaur, needs pig ears.
    if (rand(boar ? 2 : 3) == 0 && changes < changeLimit && player.earType == EARS_PIG && player.tailType != TAIL_TYPE_PIG && player.isTaur() && (player.lowerBody == LOWER_BODY_TYPE_HOOFED || player.lowerBody == LOWER_BODY_TYPE_PONY)) {
        outputText("<br><br>There is a tingling in your [tail] as it begins to warp and change. When the sensation dissipates, <b>you are left with a small, curly pig tail.</b> This new, mismatched tail looks a bit odd on your horse lower body.");
        player.tailType = TAIL_TYPE_PIG;
        changes++;
    }
    //Turn your lower body into pig legs if you have pig ears and tail.
    if (rand(boar ? 3 : 4) == 0 && changes < changeLimit && player.earType == EARS_PIG && player.tailType == TAIL_TYPE_PIG && player.lowerBody != LOWER_BODY_TYPE_CLOVEN_HOOFED) {
        if (player.isTaur()) //Centaur
            outputText("<br><br>You scream in agony as a horrible pain racks your entire bestial lower half. Unable to take it anymore, you pass out. When you wake up, you’re shocked to find that you no longer have the animal's lower body. Instead, you only have two legs. They are digitigrade and end in cloven hooves. <b>You now have pig legs!</b>");
        else if (player.lowerBody == LOWER_BODY_TYPE_NAGA) //Naga
            outputText("<br><br>You scream in agony as a horrible pain racks the entire length of your snake-like coils. Unable to take it anymore, you pass out. When you wake up, you’re shocked to find that you no longer have the lower body of a snake. Instead, you only have two legs. They are digitigrade and end in cloven hooves. <b>You now have pig legs!</b>");
        else //Bipedal
            outputText("<br><br>You scream in agony as the bones in your legs break and rearrange. Once the pain subsides, you inspect your legs, finding that they are digitigrade and ending in cloven hooves. <b>You now have pig legs!</b>");
        player.lowerBody = LOWER_BODY_TYPE_CLOVEN_HOOFED;
        player.legCount = 2;
        changes++;
    }
    //Gain pig face when you have the first three pig TFs.
    if (rand(boar ? 2 : 3) == 0 && changes < changeLimit && player.earType == EARS_PIG && player.tailType == TAIL_TYPE_PIG && player.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED && (player.faceType != FACE_PIG && player.faceType != FACE_BOAR)) {
        outputText("<br><br>You cry out in pain as the bones in your face begin to break and rearrange. You rub your face furiously in an attempt to ease the pain, but to no avail. As the sensations pass, you examine your face in a nearby puddle. <b>You nearly gasp in shock at the sight of your new pig face!</b>");
        player.faceType = FACE_PIG;
        changes++;
    }
    //Gain boar face if you have pig face.
    if (rand(3) == 0 && changes < changeLimit && player.earType == EARS_PIG && player.tailType == TAIL_TYPE_PIG && player.lowerBody == LOWER_BODY_TYPE_CLOVEN_HOOFED && player.faceType == FACE_PIG) {
        outputText("<br><br>You cry out in pain as the bones in your face begin to break and rearrange. You rub your face furiously in an attempt to ease the pain, but to no avail. Your bottom teeth ache as well. What’s happening to you? As the sensations pass, you examine your face in a nearby puddle. <b>You nearly gasp in shock at the sight of your new tusky boar face!</b>");
        player.faceType = FACE_BOAR;
        changes++;
    }
    //Change skin colour
    if (rand(boar ? 3 : 4) == 0 && changes < changeLimit) {
        var skinChoose = rand(3);
        var skinToBeChosen = "pink";
        if (boar) {
            if (skinChoose == 0) skinToBeChosen = "dark brown";
            else skinToBeChosen = "brown";
        }
        else {
            if (skinChoose == 0) skinToBeChosen = "pink";
            else if (skinChoose == 1) skinToBeChosen = "tan";
            else skinToBeChosen = "sable";
        }
        outputText("<br><br>Your skin tingles ever so slightly as you skin’s color changes before your eyes. As the tingling diminishes, you find that your skin has turned " + skinToBeChosen + ".");
        player.skinTone = skinToBeChosen;
        changes++;
    }
    if (changes == 0) {
        outputText("<br><br>Oddly, you do not feel any changes. Perhaps you're lucky? Or not.");
    }
    gameFlags[TIMES_TRANSFORMED] += changes;
};

ConsumableEffects.lizardTFs = function() {
    player.slimeFeed();
    //init variables
    var changes = 0;
    var changeLimit = 1;
    var temp2 = 0;
    //Randomly choose affects limit
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (rand(4) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //clear screen
    clearOutput();
    outputText("You uncork the vial of fluid and drink it down.  The taste is sour, like a dry wine with an aftertaste not entirely dissimilar to alcohol.  Instead of the warmth you'd expect, it leaves your throat feeling cold and a little numb.", false);

    //Statistical changes:
    //-Reduces speed down to 50.
    if (player.spe > 50 && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>You start to feel sluggish and cold.  Lying down to bask in the sun might make you feel better.", false);
        player.dynStats("spe", -1);
        changes++;
    }
    //-Reduces sensitivity.
    if (player.sens > 20 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>The sensation of prickly pins and needles moves over your body, leaving your senses a little dulled in its wake.", false);
        player.dynStats("sen", -1);
        changes++;
    }
    //Raises libido greatly to 50, then somewhat to 75, then slowly to 100.
    if (player.lib < 100 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>A knot of fire in your gut doubles you over but passes after a few moments.  As you straighten you can feel the heat seeping into you, ", false);
        //(DICK)
        if (player.cocks.length > 0 && (player.gender != 3 || rand(2) == 0)) {
            outputText("filling ", false);
            if (player.cocks.length > 1) outputText("each of ", false);
            outputText("your " + player.multiCockDescriptLight() + " with the desire to breed.  You get a bit hornier when you realize your sex-drive has gotten a boost.", false);
        }
        //(COOCH)
        else if (player.hasVagina()) outputText("puddling in your " + player.vaginaDescript(0) + ".  An instinctive desire to mate and lay eggs spreads through you, increasing your lust and boosting your sex-drive.", false);
        //(TARDS)
        else outputText("puddling in your featureless crotch for a split-second before it slides into your " + player.assDescript() + ".  You want to be fucked, filled, and perhaps even gain a proper gender again.  Through the lust you realize your sex-drive has been permanently increased.", false);
        //+3 lib if less than 50
        if (player.lib < 50) player.dynStats("lib", 3);
        //+2 lib if less than 75
        if (player.lib < 75) player.dynStats("lib", 2);
        //+1 if above 75.
        player.dynStats("lib", 1);
        changes++;
    }
    //-Raises toughness to 70
    //(+3 to 40, +2 to 55, +1 to 70)
    if (player.tou < 70 && changes < changeLimit && rand(3) == 0) {
        //(+3)
        if (player.tou < 40) {
            outputText("<br><br>Your body and skin both thicken noticeably.  You pinch your " + player.skinDesc + " experimentally and marvel at how much tougher your hide has gotten.", false);
            player.dynStats("tou", 3);
        }
        //(+2)
        else if (player.tou < 55) {
            outputText("<br><br>You grin as you feel your form getting a little more solid.  It seems like your whole body is toughening up quite nicely, and by the time the sensation goes away, you feel ready to take a hit.", false);
            player.dynStats("tou", 2);
        }
        //(+1)
        else {
            outputText("<br><br>You snarl happily as you feel yourself getting even tougher.  It's a barely discernible difference, but you can feel your " + player.skinDesc + " getting tough enough to make you feel invincible.", false);
            player.dynStats("tou", 1);
        }
        changes++;
    }

    //Sexual Changes:
    //-Lizard dick - first one
    if (player.countCocksOfType(CockTypesEnum.LIZARD) == 0 && player.cockTotal() > 0 && changes < changeLimit && rand(4) == 0) {
        //Find the first non-lizzy dick
        for (temp2 = 0; temp2 < player.cocks.length; temp2++) {
            //Stop loopahn when dick be found
            if (player.cocks[temp2].cockType != CockTypesEnum.LIZARD) break;
        }
        outputText("<br><br>A slow tingle warms your groin.  Before it can progress any further, you yank back your " + player.armor.equipmentName + " to investigate.  Your " + player.cockDescript(temp2) + " is changing!  It ripples loosely from ", false);
        if (player.hasSheath()) outputText("sheath ", false);
        else outputText("base ", false);
        outputText("to tip, undulating and convulsing as its color lightens, darkens, and finally settles on a purplish hue.  Your " + Appearance.cockNoun(CockTypesEnum.HUMAN) + " resolves itself into a bulbous form, with a slightly pointed tip.  The 'bulbs' throughout its shape look like they would provide an interesting ride for your sexual partners, but the perverse, alien pecker ", false);
        if (player.cor < 33) outputText("horrifies you.", false);
        else if (player.cor < 66) outputText("is a little strange for your tastes.", false);
        else {
            outputText("looks like it might be more fun to receive than use on others.  ", false);
            if (player.hasVagina()) outputText("Maybe you could find someone else with one to ride?", false);
            else outputText("Maybe you should test it out on someone and ask them exactly how it feels?", false);
        }
        outputText("  <b>You now have a bulbous, lizard-like cock.</b>", false);
        //Actually xform it nau
        if (player.hasSheath()) {
            player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
            if (!player.hasSheath()) outputText("<br><br>Your sheath tightens and starts to smooth out, revealing ever greater amounts of your " + player.cockDescript(temp2) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic – the sheath is gone.</b>", false);
        }
        else player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
        changes++;
        player.dynStats("lib", 3, "lus", 10);
    }
    //(CHANGE OTHER DICK)
    //Requires 1 lizard cock, multiple cocks
    if (player.cockTotal() > 1 && player.countCocksOfType(CockTypesEnum.LIZARD) > 0 && player.cockTotal() > player.countCocksOfType(CockTypesEnum.LIZARD) && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>A familiar tingle starts in your crotch, and before you can miss the show, you pull open your " + player.armor.equipmentName + ".  As if operating on a cue, ", false);
        for (temp2 = 0; temp2 < player.cocks.length; temp2++) {
            //Stop loopahn when dick be found
            if (player.cocks[temp2].cockType != CockTypesEnum.LIZARD) break;
        }
        if (player.cockTotal() == 2) outputText("your other dick", false);
        else outputText("another one of your dicks", false);
        outputText(" starts to change into the strange reptilian shape you've grown familiar with.  It warps visibly, trembling and radiating pleasurable feelings back to you as the transformation progresses.  ", false);
        if (player.cumQ() < 50) outputText("pre-cum oozes from the tip", false);
        else if (player.cumQ() < 700) outputText("Thick pre-cum rains from the tip", false);
        else outputText("A wave of pre-cum splatters on the ground", false);
        outputText(" from the pleasure of the change.  In moments <b>you have a bulbous, lizard-like cock.</b>", false);
        //(REMOVE SHEATH IF NECESSARY)
        if (player.hasSheath()) {
            player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
            if (!player.hasSheath()) outputText("<br><br>Your sheath tightens and starts to smooth out, revealing ever greater amounts of your " + player.cockDescript(temp2) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic – the sheath is gone.</b>", false);
        }
        else player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
        changes++;
        player.dynStats("lib", 3, "lus", 10);
    }
    //-Grows second lizard dick if only 1 dick
    if (player.countCocksOfType(CockTypesEnum.LIZARD) == 1 && player.cocks.length == 1 && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>A knot of pressure forms in your groin, forcing you off your " + player.feet() + " as you try to endure it.  You examine the affected area and see a lump starting to bulge under your " + player.skinDesc + ", adjacent to your " + player.cockDescript(0) + ".  The flesh darkens, turning purple", false);
        if (player.skinType == SKIN_TYPE_FUR || player.skinType == SKIN_TYPE_SCALES)
            outputText(" and shedding " + player.skinDesc, false);
        outputText(" as the bulge lengthens, pushing out from your body.  Too surprised to react, you can only pant in pain and watch as the fleshy lump starts to take on a penis-like appearance.  <b>You're growing a second lizard-cock!</b>  It doesn't stop growing until it's just as long as its brother and the same shade of shiny purple.  A dribble of cum oozes from its tip, and you feel relief at last.", false);

        player.createCock();
        player.cocks[1].cockType = CockTypesEnum.LIZARD;
        player.cocks[1].cockLength = player.cocks[0].cockLength;
        player.cocks[1].cockThickness = player.cocks[0].cockThickness;
        changes++;
        player.dynStats("lib", 3, "lus", 10);
    }
    //--Worms leave if 100% lizard dicks?
    //Require mammals?
    if (player.countCocksOfType(CockTypesEnum.LIZARD) == player.cockTotal() && changes < changeLimit && player.findStatusEffect(StatusEffects.Infested) >= 0) {
        outputText("<br><br>Like rats from a sinking ship, worms escape from your body in a steady stream.  Surprisingly, the sensation is remarkably pleasant, similar to the pleasure of sexual release in a way.  Though they seem inexhaustible, the tiny, cum-slimed invertebrates slow to a trickle.  The larger worm-kin inside you stirs as if disturbed from a nap, coming loose from whatever moorings it had attached itself to in the interior of your form.  It slowly works its way up your urethra, stretching to an almost painful degree with every lurching motion.  Your dick bloats out around the base, stretched like the ovipositor on a bee-girl in order to handle the parasitic creature, but thankfully, the ordeal is a brief one.", false);
        if (player.balls > 1) outputText("  The remaining " + num2Text(player.balls - 1) + " slither out the pre-stretched holes with ease, though the last one hangs from your tip for a moment before dropping to the ground.", false);
        outputText("  The white creature joins its kin on the ground and slowly slithers away.  Perhaps they prefer mammals? In any event, <b>you are no longer infected with worms</b>.", false);
        player.removeStatusEffect(StatusEffects.Infested);
        changes++;
    }
    //-Breasts vanish to 0 rating if male
    if (player.biggestTitSize() >= 1 && player.gender == 1 && changes < changeLimit && rand(3) == 0) {
        //(HUEG)
        if (player.biggestTitSize() > 8) {
            outputText("<br><br>The flesh on your chest tightens up, losing nearly half its mass in the span of a few seconds.  With your center of balance shifted so suddenly, you stagger about trying not to fall on your ass.  You catch yourself and marvel at the massive change in breast size.", false);
            //Half tit size
        }
        //(NOT HUEG < 4)
        else outputText("<br><br>In an instant, your chest compacts in on itself, consuming every ounce of breast-flesh.  You're left with a  smooth, masculine torso, though your nipples remain.", false);
        //(BOTH – no new PG)
        outputText("  With the change in weight and gravity, you find it's gotten much easier to move about.", false);
        //Loop through behind the scenes and adjust all tits.
        for (temp2 = 0; temp2 < player.breastRows.length; temp2++) {
            if (player.breastRows[temp2].breastRating > 8) player.breastRows[temp2].breastRating /= 2;
            else player.breastRows[temp2].breastRating = 0;
        }
        //(+2 speed)
        player.dynStats("lib", 2);
        changes++;
    }
    //-Lactation stoppage.
    if (player.biggestLactation() >= 1 && changes < changeLimit && rand(4) == 0) {
        if (player.totalNipples() == 2) outputText("<br><br>Both of your", false);
        else outputText("<br><br>All of your many", false);
        outputText(" nipples relax.  It's a strange feeling, and you pull back your top to touch one.  It feels fine, though there doesn't seem to be any milk leaking out.  You give it a squeeze and marvel when nothing ", false);
        if (player.hasFuckableNipples()) outputText("but sexual fluid ", false);
        outputText("escapes it.  <b>You are no longer lactating.</b>  That makes sense, only mammals lactate!  Smiling, you muse at how much time this will save you when cleaning your gear.", false);
        if (player.findPerk(PerkLib.Feeder) >= 0 || player.findStatusEffect(StatusEffects.Feeder) >= 0) {
            outputText("<br><br>(<b>Feeder perk lost!</b>)", false);
            player.removePerk(PerkLib.Feeder);
            player.removeStatusEffect(StatusEffects.Feeder);
        }
        changes++;
        //Loop through and reset lactation
        for (temp2 = 0; temp2 < player.breastRows.length; temp2++) {
            player.breastRows[temp2].lactationMultiplier = 0;
        }
    }
    //-Nipples reduction to 1 per tit.
    if (player.averageNipplesPerBreast() > 1 && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>A chill runs over your " + player.allBreastsDescript() + " and vanishes.  You stick a hand under your " + player.armor.equipmentName + " and discover that your extra nipples are missing!  You're down to just one per ", false);
        if (player.biggestTitSize() < 1) outputText("'breast'.", false);
        else outputText("breast.", false);
        changes++;
        //Loop through and reset nipples
        for (temp2 = 0; temp2 < player.breastRows.length; temp2++) {
            player.breastRows[temp2].nipplesPerBreast = 1;
        }
    }
    //-VAGs
    if (player.hasVagina() && player.findPerk(PerkLib.Oviposition) < 0 && changes < changeLimit && rand(5) == 0 && player.lizardScore() > 3) {
        outputText("<br><br>Deep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.<br>", false);
        outputText("(<b>Perk Gained: Oviposition</b>)", false);
        player.createPerk(PerkLib.Oviposition, 0, 0, 0, 0);
        changes++;
    }

    //Physical changes:
    //-Existing horns become draconic, max of 4, max length of 1'
    if (player.hornType != HORNS_DRACONIC_X4_12_INCH_LONG && changes < changeLimit && rand(5) == 0) {
        //No dragon horns yet.
        if (player.hornType != HORNS_DRACONIC_X2 && player.hornType != HORNS_DRACONIC_X4_12_INCH_LONG) {
            //Already have horns
            if (player.horns > 0) {
                //High quantity demon horns
                if (player.hornType == HORNS_DEMON && player.horns > 4) {
                    outputText("<br><br>Your horns condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.", false);
                    player.horns = 12;
                    player.hornType = HORNS_DRACONIC_X4_12_INCH_LONG;
                }
                else {
                    outputText("<br><br>You feel your horns changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns the dragons in your village's legends always had.", false);
                    player.hornType = HORNS_DRACONIC_X2;
                    if (player.horns > 13) {
                        outputText("  The change seems to have shrunken the horns, they're about a foot long now.", false);
                        player.horns = 12;
                    }

                }
                changes++;
            }
            //No horns
            else {
                //-If no horns, grow a pair
                outputText("<br><br>With painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>", false);
                player.horns = 4;
                player.hornType = HORNS_DRACONIC_X2;

                changes++;
            }
        }
        //ALREADY DRAGON
        else {
            if (player.hornType == HORNS_DRACONIC_X2) {
                if (player.horns < 12) {
                    if (rand(2) == 0) {
                        outputText("<br><br>You get a headache as an inch of fresh horn escapes from your pounding skull.", false);
                        player.horns += 1;
                    }
                    else {
                        outputText("<br><br>Your head aches as your horns grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.", false);
                        player.horns += 2 + rand(4);
                    }
                    if (player.horns >= 12) outputText("  <b>Your horns settle down quickly, as if they're reached their full size.</b>", false);
                    changes++;
                }
                //maxxed out, new row
                else {
                    //--Next horn growth adds second row and brings length up to 12\"
                    outputText("<br><br>A second row of horns erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns as a lizan can grow.</b>", false);
                    player.hornType = HORNS_DRACONIC_X4_12_INCH_LONG;
                    changes++;
                }
            }
        }
    }
    //-Hair stops growing!
    if (gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] == 0 && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>Your scalp tingles oddly.  In a panic, you reach up to your " + player.hairDescript() + ", but thankfully it appears unchanged.<br><br>", false);
        outputText("(<b>Your hair has stopped growing.</b>)", false);
        changes++;
        gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD]++;
    }
    //Remove beard!
    if (player.hasBeard() && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>Your " + player.beardDescript() + " feels looser and looser until finally, your beard falls out.  ");
        outputText("(<b>You no longer have a beard!</b>)");
        player.beardLength = 0;
        player.beardStyle = 0;
    }
    //Big physical changes:
    //-Legs – Draconic, clawed feet
    if (player.lowerBody != LOWER_BODY_TYPE_LIZARD && changes < changeLimit && rand(5) == 0) {
        //Hooves -
        if (player.lowerBody == LOWER_BODY_TYPE_HOOFED) outputText("<br><br>You scream in agony as you feel your hooves crack and break apart, beginning to rearrange.  Your legs change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.", false);
        //TAURS -
        else if (player.isTaur()) outputText("<br><br>Your lower body is wracked by pain!  Once it passes, you discover that you're standing on digitigrade legs with lizard-like claws.", false);
        //feet types -
        else if (player.lowerBody == LOWER_BODY_TYPE_HUMAN || player.lowerBody == LOWER_BODY_TYPE_DOG || player.lowerBody == LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS || player.lowerBody == LOWER_BODY_TYPE_DEMONIC_CLAWS || player.lowerBody == LOWER_BODY_TYPE_BEE || player.lowerBody == LOWER_BODY_TYPE_CAT || player.lowerBody == LOWER_BODY_TYPE_LIZARD) outputText("<br><br>You scream in agony as you feel the bones in your legs break and begin to rearrange. They change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.", false);
        //Else –
        else outputText("<br><br>Pain rips through your " + player.legs() + ", morphing and twisting them until the bones rearrange into a digitigrade configuration.  The strange legs have three-toed, clawed feet, complete with a small vestigial claw-toe on the back for added grip.", false);
        outputText("  <b>You have reptilian legs and claws!</b>", false);
        player.lowerBody = LOWER_BODY_TYPE_LIZARD;
        player.legCount = 2;
        changes++;
    }
    //-Tail – sinuous lizard tail
    if (player.tailType != TAIL_TYPE_LIZARD && player.lowerBody == LOWER_BODY_TYPE_LIZARD && changes < changeLimit && rand(5) == 0) {
        //No tail
        if (player.tailType == TAIL_TYPE_NONE) outputText("<br><br>You drop onto the ground as your spine twists and grows, forcing the flesh above your " + player.assDescript() + " to bulge out.  New bones form, one after another, building a tapered, prehensile tail onto the back of your body.  <b>You now have a reptilian tail!</b>", false);
        //Yes tail
        else outputText("<br><br>You drop to the ground as your tail twists and grows, changing its shape in order to gradually taper to a point.  It flicks back and forth, prehensile and totally under your control.  <b>You now have a reptilian tail.</b>", false);
        player.tailType = TAIL_TYPE_LIZARD;
        changes++;
    }
    //Remove odd eyes
    if (changes < changeLimit && rand(5) == 0 && player.eyeType > EYES_HUMAN) {
        if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP) {
            outputText("<br><br>You feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
        }
        else {
            outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
            if (player.eyeType == EYES_FOUR_SPIDER_EYES) outputText("  Your multiple, arachnid eyes are gone!</b>", false);
            outputText("  <b>You have normal, humanoid eyes again.</b>", false);
        }
        player.eyeType = EYES_HUMAN;
        changes++;
    }
    //-Ears become smaller nub-like openings?
    if (player.earType != EARS_LIZARD && player.tailType == TAIL_TYPE_LIZARD && player.lowerBody == LOWER_BODY_TYPE_LIZARD && changes < changeLimit && rand(5) == 0) {
        outputText("<br><br>Tightness centers on your scalp, pulling your ears down from their normal, fleshy shape into small, scaley bumps with holes in their centers.  <b>You have reptilian ears!</b>", false);
        player.earType = EARS_LIZARD;
        changes++;
    }
    //-Scales – color changes to red, green, white, blue, or black.  Rarely: purple or silver.
    if (player.skinType != SKIN_TYPE_SCALES && player.earType == EARS_LIZARD && player.tailType == TAIL_TYPE_LIZARD && player.lowerBody == LOWER_BODY_TYPE_LIZARD && changes < changeLimit && rand(5) == 0) {
        //(fur)
        if (player.skinType == SKIN_TYPE_FUR) {
            //set new skinTone
            if (rand(10) == 0) {
                if (rand(2) == 0) player.skinTone = "purple";
                else player.skinTone = "silver";
            }
            //non rare skinTone
            else {
                var temp = rand(5);
                if (temp == 0) player.skinTone = "red";
                else if (temp == 1) player.skinTone = "green";
                else if (temp == 2) player.skinTone = "white";
                else if (temp == 3) player.skinTone = "blue";
                else player.skinTone = "black";
            }
            outputText("<br><br>You scratch yourself, and come away with a large clump of " + player.furColor + " fur.  Panicked, you look down and realize that your fur is falling out in huge clumps.  It itches like mad, and you scratch your body relentlessly, shedding the remaining fur with alarming speed.  Underneath the fur your skin feels incredibly smooth, and as more and more of the stuff comes off, you discover a seamless layer of " + player.skinTone + " scales covering most of your body.  The rest of the fur is easy to remove.  <b>You're now covered in scales from head to toe.</b>", false);
        }
        //(no fur)
        else {
            outputText("<br><br>You idly reach back to scratch yourself and nearly jump out of your " + player.armor.equipmentName + " when you hit something hard.  A quick glance down reveals that scales are growing out of your " + player.skinTone + " skin with alarming speed.  As you watch, the surface of your skin is covered in smooth scales.  They interlink together so well that they may as well be seamless.  You peel back your " + player.armor.equipmentName + " and the transformation has already finished on the rest of your body.  <b>You're covered from head to toe in shiny ", false);
            //set new skinTone
            if (rand(10) == 0) {
                if (rand(2) == 0) player.skinTone = "purple";
                else player.skinTone = "silver";
            }
            //non rare skinTone
            else {
                temp = rand(5);
                if (temp == 0) player.skinTone = "red";
                else if (temp == 1) player.skinTone = "green";
                else if (temp == 2) player.skinTone = "white";
                else if (temp == 3) player.skinTone = "blue";
                else player.skinTone = "black";
            }
            outputText(player.skinTone + " scales.</b>", false);
        }
        player.skinType = SKIN_TYPE_SCALES;
        player.skinDesc = "scales";
        changes++;
    }
    //-Lizard-like face.
    if (player.faceType != FACE_LIZARD && player.skinType == SKIN_TYPE_SCALES && player.earType == EARS_LIZARD && player.tailType == TAIL_TYPE_LIZARD && player.lowerBody == LOWER_BODY_TYPE_LIZARD && changes < changeLimit && rand(5) == 0) {
        outputText("<br><br>Terrible agony wracks your " + player.face() + " as bones crack and shift.  Your jawbone rearranges while your cranium shortens.  The changes seem to last forever; once they've finished, no time seems to have passed.  Your fingers brush against your toothy snout as you get used to your new face.  It seems <b>you have a toothy, reptilian visage now.</b>", false);
        player.faceType = FACE_LIZARD;
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
        player.gills = false;
        changes++;
    }
    //FAILSAFE CHANGE
    if (changes == 0) {
        outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>", false);
        player.changeHP(50, true);
        player.changeLust(3);
    }
    player.refillHunger(20);
    gameFlags[TIMES_TRANSFORMED] += changes;
};

ConsumableEffects.harpyTFs = function(type) {
    //I think these are old debugging variables
    //var tfSource = "goldenSeed";
    //if (player.findPerk(PerkLib.HarpyWomb) >= 0) tfSource += "-HarpyWomb";
    //'type' refers to the variety of seed.
    //0 == standard.
    //1 == enhanced - increase change limit and no pre-reqs for TF
    var changes = 0;
    var changeLimit = 1;
    if (type == 1) changeLimit += 2;
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //Generic eating text:
    clearOutput();
    outputText("You pop the nut into your mouth, chewing the delicious treat and swallowing it quickly.  No wonder harpies love these things so much!", false);
    //****************
    //Stats:
    //****************
    //-Speed increase to 100.
    if (player.spe < 100 && rand(3) == 0) {
        changes++;
        if (player.spe >= 75) outputText("<br><br>A familiar chill runs down your spine. Your muscles feel like well oiled machinery, ready to snap into action with lightning speed.", false);
        else outputText("<br><br>A chill runs through your spine, leaving you feeling like your reflexes are quicker and your body faster.", false);
        //Speed gains diminish as it rises.
        if (player.spe < 40) player.dynStats("spe", .5);
        if (player.spe < 75) player.dynStats("spe", .5);
        player.dynStats("spe", .5);
    }
    //-Toughness decrease to 50
    if (player.tou > 50 && rand(3) == 0 && changes < changeLimit) {
        changes++;
        if (rand(2) == 0) outputText("<br><br>A nice, slow warmth rolls from your gut out to your limbs, flowing through them before dissipating entirely. As it leaves, you note that your body feels softer and less resilient.", false);
        else outputText("<br><br>You feel somewhat lighter, but consequently more fragile.  Perhaps your bones have changed to be more harpy-like in structure?", false);
        player.dynStats("tou", -1);
    }
    //antianemone corollary:
    if (changes < changeLimit && player.hairType == 4 && rand(2) == 0) {
        //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
        outputText("<br><br>As you down the seed, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels soft and fluffy, almost feathery; you watch as it dissolves into many thin, feathery strands.  <b>Your hair is now like that of a harpy!</b>", false);
        player.hairType = 1; //TODO Is This Hairtype Correct?
        changes++;
    }
    //-Strength increase to 70
    if (player.str < 70 && rand(3) == 0 && changes < changeLimit) {
        changes++;
        //(low str)
        if (player.str < 40) outputText("<br><br>Shivering, you feel a feverish sensation that reminds you of the last time you got sick. Thankfully, it passes swiftly, leaving slightly enhanced strength in its wake.", false);
        //(hi str – 50+)
        else outputText("<br><br>Heat builds in your muscles, their already-potent mass shifting slightly as they gain even more strength.", false);
        //Faster until 40 str.
        if (player.str < 40) player.dynStats("str", .5);
        player.dynStats("str", .5);
    }
    //-Libido increase to 90
    if ((player.lib < 90 || rand(3) == 0) && rand(3) == 0 && changes < changeLimit) {
        changes++;
        if (player.lib < 90) player.dynStats("lib", 1);
        //(sub 40 lib)
        if (player.lib < 40) {
            outputText("<br><br>A passing flush colors your " + player.face() + " for a second as you daydream about sex. You blink it away, realizing the item seems to have affected your libido.", false);
            if (player.hasVagina()) outputText(" The moistness of your " + player.vaginaDescript() + " seems to agree.", false);
            else if (player.hasCock()) outputText(" The hardness of " + player.sMultiCockDesc() + " seems to agree.", false);
            player.changeLust("lus", 5);
        }
        //(sub 75 lib)
        else if (player.lib < 75) outputText("<br><br>Heat, blessed heat, works through you from head to groin, leaving you to shudder and fantasize about the sex you could be having right now.<br><br>", false);
        //(hi lib)
        else if (player.lib < 90) outputText("<br><br>Sexual need courses through you, flushing your skin with a reddish hue while you pant and daydream of the wondrous sex you should be having right now.<br><br>", false);
        //(90+)
        else outputText("<br><br>You groan, something about the seed rubbing your libido in just the right way to make you horny. Panting heavily, you sigh and fantasize about the sex you could be having.<br><br>", false);
        //(fork to fantasy)
        if (player.lib >= 40) {
            player.changeLust(player.lib / 5 + 10);

            //(herm – either or!)
            //Cocks!
            if (player.hasCock() && (player.gender != 3 || rand(2) == 0)) {
                //(male 1)
                if (rand(2) == 0) {
                    outputText("In your fantasy you're winging through the sky, " + player.sMultiCockDesc() + " already hard and drizzling with male moisture while you circle an attractive harpy's nest. Her plumage is as blue as the sky, her eyes the shining teal of the sea, and legs splayed in a way that shows you how ready she is to be bred. You fold your wings and dive, wind whipping through your " + player.hairDescript() + " as she grows larger and larger. With a hard, body-slapping impact you land on top of her, plunging your hard, ready maleness into her hungry box. ", false);
                    if (player.cockTotal() > 1) {
                        outputText("The extra penis", false);
                        if (player.cockTotal() > 2) outputText("es rub ", false);
                        else outputText("rubs ", false);
                        outputText("the skin over her taut, empty belly, drooling your need atop her.  ", false);
                        outputText("You jolt from the vision unexpectedly, finding your " + player.sMultiCockDesc() + " is as hard as it was in the dream. The inside of your " + player.armor.equipmentName + " is quite messy from all the pre-cum you've drooled. Perhaps you can find a harpy nearby to lie with.", false);
                    }
                }
                //(male 2)
                else {
                    outputText("In your fantasy you're lying back in the nest your harem built for you, stroking your dick and watching the sexy bird-girl spread her thighs to deposit another egg onto the pile. The lewd moans do nothing to sate your need, and you beckon for another submissive harpy to approach. She does, her thick thighs swaying to show her understanding of your needs. The bird-woman crawls into your lap, sinking down atop your shaft to snuggle it with her molten heat. She begins kissing you, smearing your mouth with her drugged lipstick until you release the first of many loads. You sigh, riding the bliss, secure in the knowledge that this 'wife' won't let up until she's gravid with another egg. Then it'll be her sister-wife's turn. The tightness of " + player.sMultiCockDesc() + " inside your " + player.armor.equipmentName + " rouses you from the dream, reminding you that you're just standing there, leaking your need into your gear.", false);
                }
            }
            //Cunts!
            else if (player.hasVagina()) {
                //(female 1)
                if (rand(2) == 0) {
                    outputText("In your fantasy you're a happy harpy mother, your womb stretched by the sizable egg it contains. The surging hormones in your body arouse you again, and you turn to the father of your children, planting a wet kiss on his slobbering, lipstick-gilt cock. The poor adventurer writhes, hips pumping futilely in the air. He's been much more agreeable since you started keeping his cock coated with your kisses. You mount the needy boy, fantasizing about that first time when you found him near the portal, in the ruins of your old camp. The feeling of your stiff nipples ", false);
                    if (player.hasFuckableNipples()) outputText("and pussy leaking over ", false);
                    else if (player.biggestLactation() >= 1.5) outputText("dripping milk inside ", false);
                    else outputText("rubbing inside ", false);
                    outputText("your " + player.armor.equipmentName + " shocks you from the dream, leaving you with nothing but the moistness of your loins for company. Maybe next year you'll find the mate of your dreams?", false);
                }
                //(female 2)
                else {
                    outputText("In your fantasy you're sprawled on your back, thick thighs splayed wide while you're taken by a virile male. The poor stud was wandering the desert all alone, following some map, but soon you had his bright red rod sliding between your butt-cheeks, the pointed tip releasing runnels of submission to lubricate your loins. You let him mount your pussy before you grabbed him with your powerful thighs and took off. He panicked at first, but the extra blood flow just made him bigger. He soon forgot his fear and focused on the primal needs of all males – mating with a gorgeous harpy. You look back at him and wink, feeling his knot build inside you. Your aching, tender " + player.nippleDescript(0) + "s pull you out of the fantasy as they rub inside your " + player.armor.equipmentName + ". Maybe once your quest is over you'll be able to find a shy, fertile male to mold into the perfect cum-pump.", false);
                }
            }
        }
    }
    //****************
    //   Sexual:
    //****************
    //-Grow a cunt (guaranteed if no gender)
    if (player.gender == 0 || (!player.hasVagina() && changes < changeLimit && rand(3) == 0)) {
        changes++;
        //(balls)
        if (player.balls > 0) outputText("<br><br>An itch starts behind your " + player.ballsDescriptLight() + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + player.sackDescript() + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>", false);
        //(dick)
        else if (player.hasCock()) outputText("<br><br>An itch starts on your groin, just below your " + player.multiCockDescriptLight() + ". You pull your manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>", false);
        //(neither)
        else outputText("<br><br>An itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.armor.equipmentName + " to discover your brand new vagina, complete with pussy lips and a tiny clit.</b>", false);
        player.createVagina();
        player.clitLength = .25;
        player.dynStats("sen", 10);
        player.genderCheck();
    }
    //-Remove extra breast rows
    if (changes < changeLimit && player.breastRows.length > 1 && rand(3) == 0 && !gameFlags[HYPER_HAPPY]) {
        changes++;
        outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ", false);
        if (player.breastRows.length >= 3) outputText("abdomen", false);
        else outputText("chest", false);
        outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ", false);
        if (player.skinType == SKIN_TYPE_FUR) outputText(player.hairColor + " " + player.skinDesc, false);
        else outputText(player.skinTone + " " + player.skinDesc, false);
        outputText(" remains. <b>You've lost a row of breasts!</b>", false);
        player.dynStats("sen", -5);
        player.removeBreastRow(player.breastRows.length - 1, 1);
    }
    //-Shrink tits if above DDs.
    //Cannot happen at same time as row removal
    else if (changes < changeLimit && player.breastRows.length == 1 && rand(3) == 0 && player.breastRows[0].breastRating >= 7 && !gameFlags[HYPER_HAPPY])
    {
        changes++;
        //(Use standard breast shrinking mechanism if breasts are under 'h')
        if (player.breastRows[0].breastRating < 19)
        {
            player.shrinkTits();
        }
        //(H+)
        else {
            player.breastRows[0].breastRating -= (4 + rand(4));
            outputText("<br><br>Your chest pinches tight, wobbling dangerously for a second before the huge swell of your bust begins to shrink into itself. The weighty mounds jiggle slightly as they shed cup sizes like old, discarded coats, not stopping until they're " + player.breastCup(0) + "s.", false);
        }
    }
    //-Grow tits to a B-cup if below.
    if (changes < changeLimit && player.breastRows[0].breastRating < 2 && rand(3) == 0) {
        changes++;
        outputText("<br><br>Your chest starts to tingle, the " + player.skinDesc + " warming under your " + player.armor.equipmentName + ". Reaching inside to feel the tender flesh, you're quite surprised when it puffs into your fingers, growing larger and larger until it settles into a pair of B-cup breasts.", false);
        if (player.breastRows[0].breastRating < 1) outputText("  <b>You have breasts now!</b>", false);
        player.breastRows[0].breastRating = 2;
    }
    //Change cock if you have a penis.
    if (changes < changeLimit && player.hasCock() && player.countCocksOfType(CockTypesEnum.AVIAN) < player.cockTotal() && rand(type == 1 ? 4 : 10) == 0 ) { //2.5x chance if magic seed.
        changes++;
        outputText("<br><br>You feel a strange tingling sensation in your cock as erection forms. You " + player.clothedOrNakedLower("open up your " + player.armor.equipmentName + " and", "") + " look down to see " + (player.cockTotal() == 1 ? "your cock" : "one of your cocks") + " shifting! By the time the transformation's complete, you notice it's tapered, red, and ends in a tip. When you're not aroused, your cock rests nicely in a newly-formed sheath. <b>You now have an avian penis!</b>");
        for (var i = 0; i < player.cocks.length; i++) {
            if (player.cocks[i].cockType != CockTypesEnum.AVIAN) {
                player.cocks[i].cockType = CockTypesEnum.AVIAN;
                return;
            }
        }
    }
    //if (rand(5) == 0) updateOvipositionPerk(tfSource); Shouldn't need this
    //****************
    //General Appearance:
    //****************
    //-Femininity to 85
    if (player.femininity < 85 && changes < changeLimit && rand(3) == 0) {
        changes++;
        outputText(player.modFem(85, 3 + rand(5)), false);
    }
    //-Skin color change – tan, olive, dark, light
    if ((player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "dark" && player.skinTone != "light") && changes < changeLimit && rand(5) == 0) {
        changes++;
        outputText("<br><br>It takes a while for you to notice, but <b>", false);
        if (player.skinType == SKIN_TYPE_FUR) outputText("the skin under your " + player.hairColor + " " + player.skinDesc, false);
        else outputText("your " + player.skinDesc, false);
        outputText(" has changed to become ", false);
        var temp = rand(4);
        if (temp == 0) player.skinTone = "tan";
        else if (temp == 1) player.skinTone = "olive";
        else if (temp == 2) player.skinTone = "dark";
        else if (temp == 3) player.skinTone = "light";
        outputText(player.skinTone + " colored.</b>", false);
        updateClaws(player.clawType);
    }
    //-Grow hips out if narrow.
    if (player.hipRating < 10 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>Your gait shifts slightly to accommodate your widening " + player.hipDescript() + ". The change is subtle, but they're definitely broader.", false);
        player.hipRating++;
        changes++;
    }
    //-Narrow hips if crazy wide
    if (player.hipRating >= 15 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>Your gait shifts inward, your " + player.hipDescript() + " narrowing significantly. They remain quite thick, but they're not as absurdly wide as before.", false);
        player.hipRating--;
        changes++;
    }
    //-Big booty
    if (player.buttRating < 8 && changes < changeLimit && rand(3) == 0) {
        player.buttRating++;
        changes++;
        outputText("<br><br>A slight jiggle works through your rear, but instead of stopping it starts again. You can actually feel your " + player.armor.equipmentName + " being filled out by the growing cheeks. When it stops, you find yourself the proud owner of a " + player.buttDescript() + ".", false);
    }
    //-Narrow booty if crazy huge.
    if (player.buttRating >= 14 && changes < changeLimit && rand(4) == 0) {
        changes++;
        player.buttRating--;
        outputText("<br><br>A feeling of tightness starts in your " + player.buttDescript() + ", increasing gradually. The sensation grows and grows, but as it does your center of balance shifts. You reach back to feel yourself, and sure enough your massive booty is shrinking into a more manageable size.", false);
    }
    //-Body thickness to 25ish
    if (player.thickness > 25 && changes < changeLimit && rand(3) == 0) {
        outputText(player.modThickness(25, 3 + rand(4)), false);
        changes++;
    }
    //Remove odd eyes
    if (changes < changeLimit && rand(5) == 0 && player.eyeType > EYES_HUMAN) {
        if (player.eyeType == EYES_BLACK_EYES_SAND_TRAP) {
            outputText("<br><br>You feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
        }
        else {
            outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
            if (player.eyeType == EYES_FOUR_SPIDER_EYES) outputText("  Your multiple, arachnid eyes are gone!</b>", false);
            outputText("  <b>You have normal, humanoid eyes again.</b>", false);
        }
        player.eyeType = EYES_HUMAN;
        changes++;
    }
    //****************
    //Harpy Appearance:
    //****************
    //-Harpy legs
    if (player.lowerBody != LOWER_BODY_TYPE_HARPY && changes < changeLimit && (type == 1 || player.tailType == TAIL_TYPE_HARPY) && rand(4) == 0) {
        //(biped/taur)
        if (!player.isGoo()) outputText("<br><br>Your " + player.legs() + " creak ominously a split-second before they go weak and drop you on the ground. They go completely limp, twisting and reshaping before your eyes in ways that make you wince. Your lower body eventually stops, but the form it's settled on is quite thick in the thighs. Even your " + player.feet() + " have changed.  ", false);
        //goo
        else outputText("<br><br>Your gooey undercarriage loses some of its viscosity, dumping you into the puddle that was once your legs. As you watch, the fluid pulls together into a pair of distinctly leg-like shapes, solidifying into a distinctly un-gooey form. You've even regained a pair of feet!  ", false);
        player.lowerBody = LOWER_BODY_TYPE_HARPY;
        player.legCount = 2;
        changes++;
        //(cont)
        outputText("While humanoid in shape, they have two large, taloned toes on the front and a single claw protruding from the heel. The entire ensemble is coated in " + player.hairColor + " feathers from ankle to hip, reminding you of the bird-women of the mountains. <b>You now have harpy legs!</b>", false);
    }
    //-Feathery Tail
    if (player.tailType != TAIL_TYPE_HARPY && changes < changeLimit && (type == 1 || player.wingType == WING_TYPE_FEATHERED_LARGE) && rand(4) == 0) {
        //(tail)
        if (player.tailType > TAIL_TYPE_NONE) outputText("<br><br>Your tail shortens, folding into the crack of your " + player.buttDescript() + " before it disappears. A moment later, a fan of feathers erupts in its place, fluffing up and down instinctively every time the breeze shifts. <b>You have a feathery harpy tail!</b>", false);
        //(no tail)
        else outputText("<br><br>A tingling tickles the base of your spine, making you squirm in place. A moment later, it fades, but a fan of feathers erupts from your " + player.skinDesc + " in its place. The new tail fluffs up and down instinctively with every shift of the breeze. <b>You have a feathery harpy tail!</b>", false);
        player.tailType = TAIL_TYPE_HARPY;
        changes++;
    }
    //-Propah Wings
    if (player.wingType == WING_TYPE_NONE && changes < changeLimit && (type == 1 || player.armType == ARM_TYPE_HARPY) && rand(4) == 0) {
        outputText("<br><br>Pain lances through your back, the muscles knotting oddly and pressing up to bulge your " + player.skinDesc + ". It hurts, oh gods does it hurt, but you can't get a good angle to feel at the source of your agony. A loud crack splits the air, and then your body is forcing a pair of narrow limbs through a gap in your " + player.armor.equipmentName + ". Blood pumps through the new appendages, easing the pain as they fill out and grow. Tentatively, you find yourself flexing muscles you didn't know you had, and <b>you're able to curve the new growths far enough around to behold your brand new, " + player.hairColor + " wings.</b>", false);
        player.wingType = WING_TYPE_FEATHERED_LARGE;
        player.wingDesc = "large, feathered";
        changes++;
    }
    //-Remove old wings
    if (player.wingType != WING_TYPE_FEATHERED_LARGE && player.wingType > WING_TYPE_NONE && changes < changeLimit && rand(4) == 0) {
        if (player.wingType != WING_TYPE_SHARK_FIN) outputText("<br><br>Sensation fades from your " + player.wingDesc + " wings slowly but surely, leaving them dried out husks that break off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.", false);
        else outputText("<br><br>Sensation fades from your large fin slowly but surely, leaving it a dried out husk that breaks off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.", false);
        player.wingType = WING_TYPE_NONE;
        player.wingDesc = "non-existant";
        changes++;
    }
    //-Feathery Arms
    if (player.armType != ARM_TYPE_HARPY && changes < changeLimit && (type == 1 || player.hairType == 1) && rand(4) == 0) {
        outputText("<br><br>You smile impishly as you lick the last bits of the nut from your teeth, but when you go to wipe your mouth, instead of the usual texture of your " + player.skinDesc + " on your lips, you feel feathers! You look on in horror while more of the avian plumage sprouts from your " + player.skinDesc + ", covering your forearms until <b>your arms look vaguely like wings</b>. Your hands remain unchanged thankfully. It'd be impossible to be a champion without hands! The feathery limbs might help you maneuver if you were to fly, but there's no way they'd support you alone.", false);
        changes++;
        player.armType = ARM_TYPE_HARPY;
        updateClaws();
    }
    //-Feathery Hair
    if (player.hairType != 1 && changes < changeLimit && (type == 1 || player.faceType == FACE_HUMAN) && rand(4) == 0) {
        outputText("<br><br>A tingling starts in your scalp, getting worse and worse until you're itching like mad, the feathery strands of your hair tickling your fingertips while you scratch like a dog itching a flea. When you pull back your hand, you're treated to the sight of downy fluff trailing from your fingernails. A realization dawns on you - you have feathers for hair, just like a harpy!", false);
        player.hairType = 1;
        changes++;
    }
    //-Human face
    if (player.faceType != FACE_HUMAN && changes < changeLimit && (type == 1 || (player.earType == EARS_HUMAN || player.earType == EARS_ELFIN)) && rand(4) == 0) {
        outputText("<br><br>Sudden agony sweeps over your " + player.face() + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.", false);
        player.faceType = FACE_HUMAN;
        changes++;
    }
    //-Gain human ears (keep elf ears)
    if ((player.earType != EARS_HUMAN && player.earType != EARS_ELFIN) && changes < changeLimit && rand(4) == 0) {
        outputText("<br><br>Ouch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!", false);
        player.earType = EARS_HUMAN;
        changes++;
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
        player.gills = false;
        changes++;
    }
    //SPECIAL:
    //Harpy Womb – All eggs are automatically upgraded to large, requires legs + tail to be harpy.
    if (player.findPerk(PerkLib.HarpyWomb) < 0 && player.lowerBody == LOWER_BODY_TYPE_HARPY && player.tailType == TAIL_TYPE_HARPY && rand(4) == 0 && changes < changeLimit) {
        player.createPerk(PerkLib.HarpyWomb, 0, 0, 0, 0);
        outputText("<br><br>There's a rumbling in your womb, signifying that some strange change has taken place in your most feminine area. No doubt something in it has changed to be more like a harpy. (<b>You've gained the Harpy Womb perk! All the eggs you lay will always be large so long as you have harpy legs and a harpy tail.</b>)", false);
        changes++;
    }
    if (changes < changeLimit && rand(4) == 0 && ((player.ass.analWetness > 0 && player.findPerk(PerkLib.MaraesGiftButtslut) < 0) || player.ass.analWetness > 1)) {
        outputText("<br><br>You feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
        player.ass.analWetness--;
        if (player.ass.analLooseness > 1) player.ass.analLooseness--;
        changes++;
    }
    //Nipples Turn Back:
    if (gameFlags[HAS_BLACK_NIPPLES] = 1 && changes < changeLimit && rand(3) == 0) {
        outputText("<br><br>Something invisible brushes against your " + player.nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
        changes++;
        gameFlags[HAS_BLACK_NIPPLES] = 0;
    }
    //Debugcunt
    if (changes < changeLimit && rand(3) == 0 && player.vaginaType() == 5 && player.hasVagina()) {
        outputText("<br><br>Something invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
        player.vaginaType(0);
        changes++;
    }
    if (changes == 0) outputText("<br><br>Aside from being a tasty treat, it doesn't seem to do anything to you this time.", false);
    player.refillHunger(10);
    gameFlags[TIMES_TRANSFORMED] += changes;
};

//Minoblood only. Minotaur Cum is in consumableEffects.js
ConsumableEffects.minotaurTFs = function() {
    player.slimeFeed();
    //Changes done
    var changes = 0;
    //Change limit
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    if (changeLimit == 1) changeLimit = 2;
    //Temporary storage
    var temp = 0;
    var temp2 = 0;
    var temp3 = 0;
    //Set up output
    outputText("You drink the bubbling red fluid, tasting the tangy iron after-taste.", true);
    //STATS
    //Strength h
    if (rand(3) == 0 && changes < changeLimit) {
        //weaker characters gain more
        if (player.str <= 50) {
            outputText("<br><br>Painful aches ripple through your body, flooding you with pain as your muscles flex and bulge, growing much stronger and more well-defined.", false);
            //very weak players gain more
            if (player.str <= 20) player.dynStats("str", 3);
            else player.dynStats("str", 2);
        }
        //stronger characters gain less
        else {
            //small growth if over 75
            if (player.str >= 75) player.dynStats("str", .5);
            //faster from 50-75
            else player.dynStats("str", 1);
            outputText("<br><br>Your muscles grow tighter, bulging outwards powerfully as you get even stronger!", false);
        }
        //Chance of speed drop
        if (rand(2) == 0 && player.str > 50) {
            outputText("<br><br>You begin to feel that the size of your muscles is starting to slow you down.", false);
            player.dynStats("spe", -1);
        }
        changes++;
    }
    //Toughness (chance of - sensitivity)
    if (rand(3) == 0 && changes < changeLimit) {
        //weaker characters gain more
        if (player.tou <= 50) {
            outputText("<br><br>Your hide... skin... whatever... you can feel it getting tougher as it thickens perceptibly.", false);
            //very weak players gain more
            if (player.tou <= 20) player.dynStats("tou", 3);
            else player.dynStats("tou", 2);
        }
        //stronger characters gain less
        else {
            //small growth if over 75
            if (player.tou >= 75) player.dynStats("tou", .5);
            //faster from 50-75
            else player.dynStats("tou", 1);
            outputText("<br><br>Your tough hide grows slightly thicker.", false);
        }
        //chance of less sensitivity
        if (rand(2) == 0 && player.sens > 10) {
            if (player.tou > 75) {
                outputText("<br><br>It becomes much harder to feel anything through your leathery skin.", false);
                player.dynStats("sen", -3);
            }
            if (player.tou <= 75 && player.tou > 50) {
                outputText("<br><br>The level of sensation from your skin diminishes noticeably.", false);
                player.dynStats("sen", -2);
            }
            if (player.tou <= 50) {
                outputText("<br><br>Your sense of touch diminishes due to your tougher hide.", false);
                player.dynStats("sen", -3);
            }
        }
        changes++;
    }
    //SEXUAL
    //Boosts ball size MORE than equinum :D:D:D:D:D:D:
    if (changes < changeLimit && rand(2) == 0 && player.ballSize <= 5 && player.countCocksOfType(CockTypesEnum.HORSE) > 0) {
        //Chance of ball growth if not 3" yet
        if (player.balls == 0) {
            player.balls = 2;
            player.ballSize = 1;
            outputText("<br><br>A nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.", false);
            player.dynStats("lib", 2);
            player.changeLust(5);
        }
        else {
            player.ballSize++;
            if (player.ballSize <= 2) outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + player.ballsDescriptLight() + " have grown larger than a human's.", false);
            if (player.ballSize > 2) outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your " + player.sackDescript() + ".  Walking becomes difficult as you discover your " + player.ballsDescriptLight() + " have enlarged again.", false);
            player.dynStats("lib", 1);
            player.changeLust(3);
        }
        changes++;
    }
    //Ovipositing Check
    if (rand(5) == 0 && changes >= changeLimit && player.findPerk(PerkLib.Oviposition) >= 0 && player.lizardScore() < 8) {
        outputText("<br><br>Another change in your uterus ripples through your reproductive systems. Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
        outputText("(<b>Perk Lost: Oviposition</b>)<br>");
        player.removePerk(PerkLib.Oviposition)
    }
    //Restore arms to become human arms again
    if (rand(4) == 0) restoreArms(tfSource);
    //+hooves
    if (player.lowerBody != LOWER_BODY_TYPE_HOOFED) {
        if (changes < changeLimit && rand(3) == 0) {
            changes++;
            if (player.lowerBody == LOWER_BODY_TYPE_HUMAN) outputText("<br><br>You stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
            if (player.lowerBody == LOWER_BODY_TYPE_DOG) outputText("<br><br>You stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
            if (player.lowerBody == LOWER_BODY_TYPE_NAGA) outputText("<br><br>You collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!", false);
            //Catch-all
            if (player.lowerBody > LOWER_BODY_TYPE_NAGA) outputText("<br><br>You stagger as your " + player.feet() + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!", false);
            if (player.skinType != SKIN_TYPE_FUR) outputText("  A fine coat of fur grows out below your waist, itching briefly as it fills in.");
            outputText("<b>  You now have hooves in place of your feet!</b>", false);
            player.lowerBody = LOWER_BODY_TYPE_HOOFED;
            player.legCount = 2;
            player.dynStats("spe", 1);
            changes++;
        }
    }
    if (!gameFlags[HYPER_HAPPY])
    {
        //Kills vagina size (and eventually the whole vagina)
        if (player.vaginas.length > 0) {
            if (player.vaginas[0].vaginalLooseness > VAGINA_LOOSENESS_TIGHT) {
                //tighten that bitch up!
                outputText("<br><br>Your " + player.vaginaDescript(0) + " clenches up painfully as it tightens up, becoming smaller and tighter.", false);
                player.vaginas[0].vaginalLooseness--;
            }
            else {
                outputText("<br><br>A tightness in your groin is the only warning you get before your <b>" + player.vaginaDescript(0) + " disappears forever</b>!", false);
                //Goodbye womanhood!
                player.removeVagina(0, 1);
                if (player.cocks.length == 0) {
                    outputText("  Strangely, your clit seems to have resisted the change, and is growing larger by the moment... shifting into the shape of a small ribbed minotaur-like penis!  <b>You now have a horse-cock!</b>", false);
                    player.createCock();
                    player.cocks[0].cockLength = player.clitLength + 2;
                    player.cocks[0].cockThickness = 1;
                    player.cocks[0].cockType = CockTypesEnum.HORSE;
                    player.clitLength = .25;
                }
                player.genderCheck();
            }
            changes++;
        }
        //-Remove extra breast rows
        if (changes < changeLimit && player.bRows() > 1 && rand(3) == 0) {
            changes++;
            outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ", false);
            if (player.bRows() >= 3) outputText("abdomen", false);
            else outputText("chest", false);
            outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ", false);
            if (player.skinType == SKIN_TYPE_FUR) outputText(player.hairColor + " " + player.skinDesc, false);
            else outputText(player.skinTone + " " + player.skinDesc, false);
            outputText(" remains. <b>You've lost a row of breasts!</b>", false);
            player.dynStats("sen", -5);
            player.removeBreastRow(player.breastRows.length - 1, 1);
        }
        //Shrink boobages till they are normal
        else if (rand(2) == 0 && changes < changeLimit && player.breastRows.length > 0) {
            //Single row
            if (player.breastRows.length == 1) {
                //Shrink if bigger than B cups
                if (player.breastRows[0].breastRating >= 1) {
                    temp = 1;
                    player.breastRows[0].breastRating--;
                    //Shrink again if huuuuge
                    if (player.breastRows[0].breastRating > 8) {
                        temp++;
                        player.breastRows[0].breastRating--;
                    }
                    //Talk about shrinkage
                    if (temp == 1) outputText("<br><br>You feel a weight lifted from you, and realize your " + player.breastDescript(0) + " have shrunk to " + player.breastCup(0) + "s.", false);
                    if (temp == 2) outputText("<br><br>You feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + player.breastCup(0) + "s.", false);
                    changes++;
                }

            }
            //multiple
            else {
                //temp2 = amount changed
                //temp3 = counter
                temp = 0;
                temp2 = 0;
                temp3 = 0;
                if (player.biggestTitSize() >= 1) outputText("<br>", false);
                while (temp3 < player.breastRows.length) {
                    if (player.breastRows[temp3].breastRating >= 1) {
                        player.breastRows[temp3].breastRating--;
                        temp2++;
                        outputText("<br>", false);
                        //If this isn't the first change...
                        if (temp2 > 1) outputText("...and y", false);
                        else outputText("Y", false);
                        outputText("our " + player.breastDescript(temp3) + " shrink, dropping to " + player.breastCup(temp3) + "s.", false);
                    }
                    temp3++;
                }
                if (temp2 == 2) outputText("<br>You feel so much lighter after the change.", false);
                if (temp2 == 3) outputText("<br>Without the extra weight you feel particularly limber.", false);
                if (temp2 >= 4) outputText("<br>It feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.", false);
                if (temp2 > 0) changes++;
            }
        }
    }
    //Boosts cock size up to 36"x5".
    if (changes < changeLimit && rand(2) == 0 && player.cocks.length > 0) {
        var selectedCock = -1;
        for (var i = 0; i < player.cocks.length; i++)
        {
            if (player.cocks[i].cockType == CockTypesEnum.HORSE && (player.cocks[i].cockLength < 36 || player.cocks[i].cockThickness < 5))
            {
                selectedCock = i;
                break;
            }
        }

        //Length first
        if (selectedCock != -1) {
            //Thickness too if small enough
            if (player.cocks[selectedCock].cockThickness < 5) {
                //Increase by 2 + rand(8), and store the actual amount in temp
                temp = player.increaseCock(selectedCock, 2 + rand(8));
                temp += player.cocks[selectedCock].thickenCock(1);
                //Comment on length changes
                if (temp > 6) outputText("<br><br>Gasping in sudden pleasure, your " + player.cockDescript(selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.", false);
                if (temp <= 6 && temp >= 3) outputText("<br><br>You pant in delight as a few inches of " + player.cockDescript(selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.", false);
                if (temp < 3) outputText("<br><br>Groaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.", false);
                //Add a blurb about thickness...
                outputText("  To your delight and surprise, you discover it has grown slightly thicker as well!", false);
            }
            //Just length...
            else {
                //Increase by 2 + rand(8), and store the actual amount in temp
                temp = player.increaseCock(selectedCock, 2 + rand(8));
                //Comment on length changes
                if (temp > 6) outputText("<br><br>Gasping in sudden pleasure, your " + player.cockDescript(selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.", false);
                if (temp <= 6 && temp >= 3) outputText("<br><br>You pant in delight as a few inches of " + player.cockDescript(selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.", false);
                if (temp < 3) outputText("<br><br>Groaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.", false);
            }
            changes++;
        }
    }
    //Morph dick to horsediiiiick
    if (player.cocks.length > 0 && rand(2) == 0 && changes < changeLimit) {
        var selectedCockValue = -1; //Changed as selectedCock and i caused duplicate var warnings
        for (var indexI = 0; indexI < player.cocks.length; indexI++)
        {
            if (player.cocks[indexI].cockType != CockTypesEnum.HORSE)
            {
                selectedCockValue = indexI;
                break;
            }
        }

        if (selectedCockValue != -1) {
            //Text for humandicks or others
            //TODO Figure out the Index stuff for this if statement
            if (player.cocks[selectedCockValue].cockType == CockTypesEnum.HUMAN /* || player.cocks[selectedCockValue].cockType.Index > 2 */) outputText("<br><br>Your " + player.cockDescript(selectedCockValue) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.", false);
            //Text for dogdicks
            if (player.cocks[selectedCockValue].cockType == CockTypesEnum.DOG) outputText("<br><br>Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " begins to feel odd...  You pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + Appearance.cockNoun(CockTypesEnum.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond its traditional size.  You notice your knot vanishing, the extra flesh pushing more fresh horsecock out from your sheath.  <b>Your hands are drawn to the strange new " + Appearance.cockNoun(CockTypesEnum.HORSE) + "</b>, and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
            player.cocks[selectedCockValue].cockType = CockTypesEnum.HORSE;
            player.increaseCock(selectedCockValue, 4);
            player.dynStats("lib", 5, "sen", 4);
            player.changeLust(35);
            outputText("<b>  You now have a");
            if (player.countCocksOfType(CockTypesEnum.HORSE) > 1) outputText("nother");
            outputText(" horse-penis.</b>", false);
            changes++;
        }
    }

    //Males go into rut
    if (rand(4) == 0) {
        player.goIntoRut(true);
    }

    //Anti-masturbation status
    if (rand(4) == 0 && changes < changeLimit && player.findStatusEffect(StatusEffects.Dysfunction) < 0) {
        if (player.cocks.length > 0) outputText("<br><br>Your " + player.cockDescript(0) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.", false);
        else if (player.hasVagina()) outputText("<br><br>Your " + player.vaginaDescript(0) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.", false);
        if (player.cocks.length > 0 || player.hasVagina()) {
            player.createStatusEffect(StatusEffects.Dysfunction, 96, 0, 0, 0);
            changes++;
        }
    }
    //Appearance shit:
    //Tail, Ears, Hooves, Horns, Height (no prereq), Face
    //+height up to 9 foot
    if (changes < changeLimit && rand(1.7) == 0 && player.tallness < 108) {
        temp = rand(5) + 3;
        //Slow rate of growth near ceiling
        if (player.tallness > 90) temp = Math.floor(temp / 2);
        //Never 0
        if (temp == 0) temp = 1;
        //Flavor texts.  Flavored like 1950's cigarettes. Yum.
        if (temp < 5) outputText("<br><br>You shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.", false);
        if (temp >= 5 && temp < 7) outputText("<br><br>You feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.", false);
        if (temp == 7) outputText("<br><br>Staggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.", false);
        player.tallness += temp;
        changes++;
    }
    //Face change, requires Ears + Height + Hooves
    if (player.earType == EARS_COW && player.lowerBody == LOWER_BODY_TYPE_HOOFED && player.tallness >= 90
        && changes < changeLimit && rand(3) == 0) {
        if (player.faceType != FACE_COW_MINOTAUR) {
            outputText("<br><br>Bones shift and twist painfully as your visage twists and morphs to resemble that of the beast whose blood you now drink.  <b>You now have a minotaur-like face.</b>", false);
            changes++;
            player.faceType = FACE_COW_MINOTAUR;
        }
    }
    //+mino horns require ears/tail
    if (changes < changeLimit && rand(3) == 0 && player.earType == EARS_COW && player.tailType == TAIL_TYPE_COW) {
        temp = 1;
        //New horns or expanding mino horns
        if (player.hornType == HORNS_COW_MINOTAUR || player.hornType == HORNS_NONE) {
            //Get bigger if player has horns
            if (player.hornType == HORNS_COW_MINOTAUR) {
                //Fems horns don't get bigger.
                if (player.vaginas.length > 0) {
                    if (player.horns > 4) {
                        outputText("<br><br>You feel a pressure in your head around your horns, but they don't grow any larger.  ", false);
                        outputText("Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.", false);
                        player.hoursSinceCum += 200;
                        player.changeLust(20);
                    }
                    else {
                        outputText("<br><br>Your small horns get a bit bigger, stopping as medium sized nubs.", false);
                        player.horns += 3;
                    }
                    changes++;
                }
                //Males horns get 'uge.
                else {
                    temp = 1 + rand(3);
                    player.horns += temp;
                    if (temp == 0) changes--;
                    if (temp == 1) outputText("<br><br>An aching pressure builds in your temples as you feel your horns push another inch of length from your skull.  ", false);
                    if (temp == 2) outputText("<br><br>A powerful headache momentarily doubles you over.  With painful slowness, you feel your horns push another two inches of length out from your brow, gradually thickening as they grow.  ", false);
                    if (temp == 3) outputText("<br><br>Agony overwhelms you as a headache of terrifying intensity sweeps through your skull.  You squeeze your eyes shut from the pain, but it does little to help.  The torture intensifies before finally diminishing as you feel an inch or two of new horn force its way out of your forehead.  The headache remains despite this, and desperate for relief, you grab hold of your horns and tug, pulling another inch of new horn free.  At last the pain fades, leaving you with significantly enhanced head-spikes.  ", false);
                    if (player.horns < 3) outputText("They are the size of tiny nubs.", false);
                    if (player.horns >= 3 && player.horns < 6) outputText("They are similar to what you would see on a young bull.", false);
                    if (player.horns >= 6 && player.horns < 12) outputText("They look like the horns on a grown bull, big enough and dangerous enough to do some damage.", false);
                    if (player.horns >= 12 && player.horns < 20) outputText("They are large and wicked looking.", false);
                    if (player.horns >= 20) outputText("They are huge, heavy, and tipped with dangerous points.", false);
                    //boys get a cum refill sometimes
                    if (rand(2) == 0 && changes < changeLimit) {
                        outputText("  Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.", false);
                        player.hoursSinceCum += 200;
                        player.dynStats(20);
                    }
                    changes++;
                }
            }
            //If no horns yet..
            else {
                outputText("<br><br>With painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.", false);
                player.hornType = HORNS_COW_MINOTAUR;
                player.horns = 2;
                changes++;
            }
        }
        //Not mino horns, change to cow-horns
        if (player.hornType == HORNS_DEMON || player.hornType > HORNS_COW_MINOTAUR) {
            outputText("<br><br>Your horns vibrate and shift as if made of clay, reforming into two horns with a bovine-like shape.", false);
            player.hornType = HORNS_COW_MINOTAUR;
            changes++;
        }
    }
    //+cow ears	- requires tail
    if (player.earType != EARS_COW && changes < changeLimit && player.tailType == TAIL_TYPE_COW && rand(2) == 0) {
        outputText("<br><br>You feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>", false);
        player.earType = EARS_COW;
        changes++;
    }
    //+cow tail
    if (changes < changeLimit && rand(2) == 0 && player.tailType != TAIL_TYPE_COW) {
        if (player.tailType == TAIL_TYPE_NONE) outputText("<br><br>You feel the flesh above your " + player.buttDescript() + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
        else {
            if (player.tailType < TAIL_TYPE_SPIDER_ADBOMEN || player.tailType > TAIL_TYPE_BEE_ABDOMEN) {
                outputText("<br><br>Your tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.", false);
            }
            //insect
            if (player.tailType == TAIL_TYPE_SPIDER_ADBOMEN || player.tailType == TAIL_TYPE_BEE_ABDOMEN) {
                outputText("<br><br>Your insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.", false);
            }
        }
        player.tailType = TAIL_TYPE_COW;
        changes++;
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
        player.gills = false;
        changes++;
    }
    if (changes < changeLimit && rand(4) == 0 && ((player.ass.analWetness > 0 && player.findPerk(PerkLib.MaraesGiftButtslut) < 0) || player.ass.analWetness > 1)) {
        outputText("<br><br>You feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
        player.ass.analWetness--;
        if (player.ass.analLooseness > 1) player.ass.analLooseness--;
        changes++;
    }
    //Give you that mino build!
    if (rand(4) == 0) outputText(player.modFem(5, 10), false);
    if (rand(4) == 0) outputText(player.modTone(85, 3), false);
    if (rand(4) == 0) outputText(player.modThickness(70, 4), false);
    //Default
    if (changes == 0) {
        outputText("<br><br>Minotaur-like vitality surges through your body, invigorating and arousing you!<br>", false);
        if (player.balls > 0) {
            outputText("Your balls feel as if they've grown heavier with the weight of more sperm.<br>", false);
            player.hoursSinceCum += 200;
        }
        player.changeHP(50, true);
        player.changeLust(50);
    }
    player.refillHunger(25);
};

ConsumableEffects.snakeTFs = function() {
    player.slimeFeed();
    clearOutput();
    var changes = 0;
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (rand(2) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    //b) Description while used
    outputText("Pinching your nose, you quickly uncork the vial and bring it to your mouth, determined to see what effects it might have on your body. Pouring in as much as you can take, you painfully swallow before going for another shot, emptying the bottle.", false);
    //(if outside combat)
    if (!inCombat()) outputText("  Minutes pass as you start wishing you had water with you, to get rid of the aftertaste.", false);
    //+ speed to 70!
    if (player.spe < 70 && rand(2) == 0) {
        player.dynStats("spe", (2 - (player.spe / 10 / 5)));
        outputText("<br><br>Your muscles quiver, feeling ready to strike as fast as a snake!", false);
        if (player.spe < 40) outputText("  Of course, you're nowhere near as fast as that.", false);
        changes++;
    }
    //Removed Oviposition update check. Just returns zero for this transformation.
    //Removes wings
    if (player.wingType > WING_TYPE_NONE && rand(3) == 0 && changes < changeLimit) {
        if (player.wingType == WING_TYPE_SHARK_FIN) outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into your spine.  After a moment the pain passes, though your fin is gone!", false);
        else outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into each of your shoulder-blades.  After a moment the pain passes, though your wings are gone!", false);
        player.wingType = WING_TYPE_NONE;
        changes++;
    }
    //Removes antennae
    if (player.antennae > ANTENNAE_NONE && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>The muscles in your brow clench tightly, and you feel a tremendous pressure on your upper forehead.  When it passes, you touch yourself and discover your antennae have vanished!", false);
        player.antennae = ANTENNAE_NONE;
        changes++;
    }
    //9c) II The tongue (sensitivity bonus, stored as a perk?)
    if (changes == 0 && rand(3) == 0) {
        if (player.tongueType != TONGUE_SNAKE && changes < changeLimit) {
            if (player.tongueType == TONGUE_HUMAN) {
                outputText("<br><br>Your taste-buds start aching as they swell to an uncomfortably large size. "
                    +"Trying to understand what in the world could have provoked such a reaction, you bring your hands up to your mouth, "
                    +"your tongue feeling like it's trying to push its way past your lips.");
                outputText("  The soreness stops and you stick out your tongue to try and see what would have made it feel the way it did. "
                    +"As soon as you stick your tongue out you realize that it sticks out much further than it did before, "
                    +"and now appears to have split at the end, creating a forked tip.");
                outputText("  <b>The scents in the air are much more noticeable to you with your snake-like tongue.</b>");
            } else {
                outputText("<br><br>Your inhuman tongue shortens, pulling tight in the very back of your throat.");
                outputText("  After a moment the bunched-up tongue-flesh begins to flatten out, then extend forwards.");
                outputText("  By the time the transformation has finished, <b>your tongue has changed into a long, forked snake-tongue.</b>");
            }
            player.tongueType = TONGUE_SNAKE;
            player.dynStats("sen", 5);
            changes++;
        }
    }
    //9c) III The fangs
    if (changes == 0 && player.tongueType == TONGUE_SNAKE && player.faceType != FACE_SNAKE_FANGS && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>Without warning, you feel your canine teeth jump almost an inch in size, clashing on your gums, cutting yourself quite badly. As you attempt to find a new way to close your mouth without dislocating your jaw, you notice that they are dripping with a bitter, khaki liquid.  Watch out, and <b>try not to bite your tongue with your poisonous fangs!</b>", false);
        if (player.faceType != FACE_HUMAN && player.faceType != FACE_SHARK_TEETH && player.faceType != FACE_BUNNY && player.faceType != FACE_SPIDER_FANGS) {
            outputText("  As the change progresses, your " + player.face() + " reshapes.  The sensation is far more pleasant than teeth cutting into gums, and as the tingling transformation completes, <b>you've gained with a normal-looking, human visage.</b>");
        }
        player.faceType = FACE_SNAKE_FANGS;
        changes++;
    }
    //9c) I The tail ( http://tvtropes.org/pmwiki/pmwiki.php/Main/TransformationIsAFreeAction ) (Shouldn't we try to avert this? -Ace)
    //Should the enemy "kill" you during the transformation, it skips the scene and immediately goes to tthe rape scene. (Now that I'm thinking about it, we should add some sort of appendix where the player realizes how much he's/she's changed. -Ace)
    if (changes == 0 && player.faceType == FACE_SNAKE_FANGS && player.lowerBody != LOWER_BODY_TYPE_NAGA && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>You find it increasingly harder to keep standing as your legs start feeling weak.  You swiftly collapse, unable to maintain your own weight.", false);
        //(If used in combat, you lose a turn here. Half-corrupted Jojo and the Naga won't attack you during that period, but other monsters will)
        //FUCK NO
        outputText("<br><br>Trying to get back up, you realize that the skin on the inner sides of your thighs is merging together like it was being sewn by an invisible needle.", false);
        outputText("  The process continues through the length of your " + player.legs() + ", eventually reaching your " + player.feet() + ".  Just when you think that the transformation is over, you find yourself pinned to the ground by an overwhelming sensation of pain. You hear the horrible sound of your bones snapping, fusing together and changing into something else while you contort in unthinkable agony.  Sometime later you feel the pain begin to ease and you lay on the ground, spent by the terrible experience. Once you feel you've recovered, you try to stand, but to your amazement you discover that you no longer have " + player.legs() + ": the bottom half of your body is like that of a snake's.", false);
        outputText("<br><br>Wondering what happened to your sex, you pass your hand down the front of your body until you find a large, horizontal slit around your pelvic area, which contains all of your sexual organs.", false);
        if (player.balls > 0 && player.ballSize > 10) outputText("  You're happy not to have to drag those testicles around with you anymore.", false);
        outputText("  But then, scales start to form on the surface of your skin, slowly becoming visible, recoloring all of your body from the waist down in a snake-like pattern. The feeling is... not that bad actually, kind of like callous, except on your whole lower body. The transformation complete, you get up, standing on your newly formed snake tail. You can't help feeling proud of this majestic new body of yours.", false);
        player.lowerBody = LOWER_BODY_TYPE_NAGA;
        player.legCount = 1;
        changes++;
    }
    if (rand(4) == 0 && player.gills && changes < changeLimit) {
        outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
        player.gills = false;
        changes++;
    }

    //9e) Penis
    /*
     if (player.cockTotal() > 0) {
     //(If multiple penis, insert "one of your")
     outputText("<br><br>As the liquid takes effect, ", false);
     //(if multicock)
     if (player.cockTotal() > 1) outputText("one of ", false);
     outputText("your " + player.multiCockDescriptLight() + " starts to throb painfully and swell to its full size.  With a horrifying ripping sensation, your cock splits down the middle, the pain causing you to black out momentarily.", false);
     outputText("When you awaken, you quickly look down to see that where ", false);
     //(if multicock)
     if (player.cockTotal() > 1) outputText("one of ", false);
     outputText("your " + player.multiCockDescriptLight() + " was, you now have two pointed reptilian cocks, still stiff and pulsing.", false);
     }*/
    //Default change - blah
    if (changes == 0) outputText("<br><br>Remakarbly, the snake-oil has no effect.  Should you really be surprised at snake-oil NOT doing anything?", false);
    player.refillHunger(5);
};

ConsumableEffects.slimeTFs = function () {
    //var tfSource = "gooGasmic";
    outputText("You take the wet cloth in hand and rub it over your body, smearing the strange slime over your " + player.skinDesc + " slowly.", true);
    //Stat changes
    //libido up to 80
    if (player.lib < 80) {
        player.dynStats("lib", (.5 + (90 - player.lib) / 10));
        player.changeLust(player.lib / 2);
        outputText("<br><br>Blushing and feeling horny, you make sure to rub it over your chest and erect nipples, letting the strange slimy fluid soak into you.", false);
    }
    //sensitivity moves towards 50
    if (player.sens < 50) {
        outputText("<br><br>The slippery slime soaks into your " + player.skinDesc + ", making it tingle with warmth, sensitive to every touch.", false);
        player.dynStats("sen", 1);
    }
    else if (player.sens > 50) {
        outputText("<br><br>The slippery slime numbs your " + player.skinDesc + " slightly, leaving behind only gentle warmth.", false);
        player.dynStats("sen", -1);
    }
    //Commented out in the original
    /*Calculate goopiness
     var goopiness:Number = 0;
     if (player.skinType == SKIN_TYPE_GOO) goopiness+=2;
     if (player.hair.indexOf("gooey") != -1) goopiness++;
     if (player.hasVagina()) {
     if (player.vaginalCapacity() >= 9000) goopiness++;
     }*/
    //Cosmetic changes based on 'goopyness'
    // Standard Ovipoisitor removal
    if (rand(5) == 0 && changes >= changeLimit && player.findPerk(PerkLib.Oviposition) >= 0 && player.lizardScore() < 8) {
        outputText("<br><br>Another change in your uterus ripples through your reproductive systems. Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
        outputText("(<b>Perk Lost: Oviposition</b>)<br>");
        player.removePerk(PerkLib.Oviposition)
    }
    //Remove wings
    if (player.wingType > WING_TYPE_NONE) {
        if (player.wingType == WING_TYPE_SHARK_FIN) outputText("<br><br>You sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your fin slowly turn to sludge, dripping to the ground as your body becomes more goo-like.", false);
        else outputText("<br><br>You sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your wings slowly turn to sludge, dripping to the ground as your body becomes more goo-like.", false);
        player.wingType = WING_TYPE_NONE;
    }
    //Goopy hair
    if (player.hairType != 3) {
        player.hairType = 3;
        //if bald
        if (player.hairLength <= 0) {
            outputText("<br><br>Your head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover you've grown some kind of gooey hair.  From time to time it drips, running down your back to the crack of your " + player.buttDescript() + ".", false);
            player.hairLength = 5;
        }
        else {
            //if hair isnt rubbery or latexy
            if (player.hairColor.indexOf("rubbery") == -1 && player.hairColor.indexOf("latex-textured") == -1) {
                outputText("<br><br>Your head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover your hair has become a slippery, gooey mess.  From time to time it drips, running down your back to the crack of your " + player.buttDescript() + ".", false);
            }
            //Latexy stuff
            else {
                outputText("<br><br>Your oddly inorganic hair shifts, becoming partly molten as rivulets of liquid material roll down your back.  How strange.", false);
            }
        }
        if (player.hairColor != "green" && player.hairColor != "purple" && player.hairColor != "blue" && player.hairColor != "cerulean" && player.hairColor != "emerald") {
            outputText("  Stranger still, the hue of your semi-liquid hair changes to ");
            var blah = rand(10);
            if (blah <= 2) player.hairColor = "green";
            else if (blah <= 4) player.hairColor = "purple";
            else if (blah <= 6) player.hairColor = "blue";
            else if (blah <= 8) player.hairColor = "cerulean";
            else player.hairColor = "emerald";
            outputText(player.hairColor + ".");
        }
        player.changeLust(10);
    }
    //1.Goopy skin
    if (player.hairType == 3 && (player.skinDesc != "skin" || player.skinAdj != "slimy")) {
        if (player.skinType == SKIN_TYPE_PLAIN) outputText("<br><br>You sigh, feeling your " + player.armorName + " sink into you as your skin becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!", false);
        else if (player.skinType == SKIN_TYPE_FUR) outputText("<br><br>You sigh, suddenly feeling your fur become hot and wet.  You look down as your " + player.armorName + " sinks partway into you.  With a start you realize your fur has melted away, melding into the slime-like coating that now serves as your skin.  You've become partly liquid and incredibly gooey!", false);
        else if (player.hasScales()) outputText("<br><br>You sigh, feeling slippery wetness over your scales.  You reach to scratch it and come away with a slippery wet coating.  Your scales have transformed into a slimy goop!  Looking closer, you realize your entire body has become far more liquid in nature, and is semi-solid.  Your " + player.armorName + " has even sunk partway into you.", false);
        player.skinType = SKIN_TYPE_GOO;
        player.skinDesc = "skin";
        player.skinAdj = "slimy";
        if (player.skinTone != "green" && player.skinTone != "purple" && player.skinTone != "blue" && player.skinTone != "cerulean" && player.skinTone != "emerald") {
            outputText("  Stranger still, your skintone changes to ");
            var blaht = rand(10);
            if (blaht <= 2) player.skinTone = "green";
            else if (blaht <= 4) player.skinTone = "purple";
            else if (blaht <= 6) player.skinTone = "blue";
            else if (blaht <= 8) player.skinTone = "cerulean";
            else player.skinTone = "emerald";
            outputText(player.skinTone + "!");
            if (player.armType != ARM_TYPE_HUMAN || player.clawType != CLAW_TYPE_NORMAL) restoreArms(tfSource);
        }

    }
    ////1a.Make alterations to dick/vaginal/nippular descriptors to match
    //DONE EXCEPT FOR TITS & MULTIDICKS (UNFINISHED KINDA)
    //2.Goo legs
    if (player.skinAdj == "slimy" && player.skinDesc == "skin" && player.lowerBody != LOWER_BODY_TYPE_GOO) {
        outputText("<br><br>Your viewpoint rapidly drops as everything below your " + player.buttDescript() + " and groin melts together into an amorphous blob.  Thankfully, you discover you can still roll about on your new slimey undercarriage, but it's still a whole new level of strange.", false);
        player.tallness -= 3 + rand(2);
        if (player.tallness < 36) {
            player.tallness = 36;
            outputText("  The goo firms up and you return to your previous height.  It would truly be hard to get any shorter than you already are!", false);
        }
        player.lowerBody = LOWER_BODY_TYPE_GOO;
        player.legCount = 1;

    }
    //3a. Grow vagina if none
    if (!player.hasVagina()) {
        outputText("<br><br>A wet warmth spreads through your slimey groin as a narrow gash appears on the surface of your groin.  <b>You have grown a vagina.</b>", false);
        player.createVagina();
        player.vaginas[0].vaginalWetness = VAGINA_WETNESS_DROOLING;
        player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_GAPING;
        player.clitLength = .4;
        player.genderCheck();


    }
    //3b.Infinite Vagina
    if (player.vaginalCapacity() < 9000) {
        if (player.findStatusEffect(StatusEffects.BonusVCapacity) < 0) player.createStatusEffect(StatusEffects.BonusVCapacity, 9000, 0, 0, 0);
        else player.addStatusValue(StatusEffects.BonusVCapacity, 1, 9000);
        outputText("<br><br>Your " + player.vaginaDescript(0) + "'s internal walls feel a tingly wave of strange tightness.  Experimentally, you slip a few fingers, then your hand, then most of your forearm inside yourself.  <b>It seems you're now able to accommodate just about ANYTHING inside your sex.</b>", false);

    }
    else if (player.tallness < 100 && rand(3) <= 1) {
        outputText("<br><br>Your gel-like body swells up from the intake of additional slime.  If you had to guess, you'd bet you were about two inches taller.", false);
        player.tallness += 2;
        player.dynStats("str", 1, "tou", 1);
    }
    //Big slime girl
    else {
        if (player.findStatusEffect(StatusEffects.SlimeCraving) < 0) {
            outputText("<br><br>You feel a growing gnawing in your gut.  You feel... hungry, but not for food.  No, you need something wet and goopy pumped into you.  You NEED it.  You can feel it in your bones.  <b>If you don't feed that need... you'll get weaker and maybe die.</b>", false);
            player.createStatusEffect(StatusEffects.SlimeCraving, 0, 0, 0, 1); //Value four indicates this tracks strength and speed separately
        }
        else {
            outputText("<br><br>You feel full for a moment, but you know it's just a temporary respite from your constant need to be 'injected' with fluid.", false);
            player.changeStatusValue(StatusEffects.SlimeCraving, 1, 0);
        }
    }
    if (rand(2) == 0) outputText(player.modFem(85, 3), false);
    if (rand(2) == 0) outputText(player.modThickness(20, 3), false);
    if (rand(2) == 0) outputText(player.modTone(15, 5), false);
};

ConsumableEffects.trapOil = function() {
    clearOutput();
    var changes = 0;
    var changeLimit = 1;
    if (rand(2) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (rand(3) == 0) changeLimit++;
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) changeLimit++;
    if (player.findPerk(PerkLib.TransformationResistance) >= 0) changeLimit--;
    outputText("You pour some of the oil onto your hands and ");
    if (player.cor < 30) outputText("hesitantly ");
    else if (player.cor > 70) outputText("eagerly ");
    outputText("rub it into your arms and chest.  The substance is warm, coating and ever so slightly numbing; it quickly sinks into your skin, leaving you feeling smooth and sleek.");

//Speed Increase:
    if (player.spe < 100 && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>You feel fleet and lighter on your toes; you sense you could dodge, dart or skip away from anything.");
        player.dynStats("spe", 1);
        changes++;
    }
//Strength Loss:
    else if (player.str > 40 && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>A sense of helplessness settles upon you as your limbs lose mass, leaving you feeling weaker and punier.");
        player.dynStats("str", -1);
        changes++;
    }
//Sensitivity Increase:
    if (player.sens < 70 && player.hasCock() && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>A light breeze brushes over you and your skin tingles.  You have become more sensitive to physical sensation.");
        player.dynStats("sen", 5);
        changes++;
    }
//Libido Increase:
    if (player.lib < 70 && player.hasVagina() && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>You feel your blood quicken and rise, and a desire to... hunt builds within you.");
        player.dynStats("lib", 2);
        if (player.lib < 30) player.dynStats("lib", 2);
        changes++;
    }
//Body Mass Loss:
    if (player.thickness > 40 && rand(3) == 0 && changes < changeLimit) {
        outputText("<br><br>You feel an odd tightening sensation in your midriff, as if you were becoming narrower and lither.  You frown downwards, and then turn your arms around, examining them closely.  Is it just you or have you lost weight?");
        player.modThickness(40, 3);
        changes++;
    }

//Thigh Loss: (towards “girly”)
    if (player.hipRating >= 10 && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>You touch your thighs speculatively.  It's not just your imagination; you've lost a bit of weight around your waist.");
        player.hipRating--;
        if (player.hipRating > 15) player.hipRating -= 2 + rand(3);
        changes++;
    }
//Thigh Gain: (towards “girly”)
    if (player.hipRating < 6 && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>You touch your thighs speculatively.  You think you may have gained a little weight around your waist.");
        player.hipRating++;
        changes++;
    }
//Breast Loss: (towards A cup)
    if (player.biggestTitSize() > 1 && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>You gasp as you feel a compressing sensation in your chest and around your [fullChest].  The feeling quickly fades however, leaving you feeling like you have lost a considerable amount of weight from your upper body.");
        var temp = 0;
        while (temp < player.bRows()) {
            if (player.breastRows[temp].breastRating > 70) player.breastRows[temp].breastRating -= rand(3) + 15;
            else if (player.breastRows[temp].breastRating > 50) player.breastRows[temp].breastRating -= rand(3) + 10;
            else if (player.breastRows[temp].breastRating > 30) player.breastRows[temp].breastRating -= rand(3) + 7;
            else if (player.breastRows[temp].breastRating > 15) player.breastRows[temp].breastRating -= rand(3) + 4;
            else player.breastRows[temp].breastRating -= 2 + rand(2);
            if (player.breastRows[temp].breastRating < 1) player.breastRows[temp].breastRating = 1;
            temp++;
        }
        changes++;
    }
//Breast Gain: (towards A cup)
    if (player.biggestTitSize() < 1 || player.breastRows[0].breastRating < 1 && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>You feel a vague swelling sensation in your [fullChest], and you frown downwards.  You seem to have gained a little weight on your chest.  Not enough to stand out, but- you cup yourself carefully- certainly giving you the faintest suggestion of boobs.");
        player.breastRows[0].breastRating = 1;
        if (player.bRows() > 1) {
            temp = 1;
            while (temp < player.bRows()) {
                if (player.breastRows[temp].breastRating < 1) player.breastRows[temp].breastRating = 1;
            }
        }
        changes++;
    }
//Penis Reduction towards 3.5 Inches:
    if (player.longestCockLength() >= 3.5 && player.hasCock() && rand(2) == 0 && changes < changeLimit) {
        outputText("<br><br>You flinch and gasp as your " + player.multiCockDescriptLight() + " suddenly become");
        if (player.cockTotal() == 1) outputText("s");
        outputText(" incredibly sensitive and retract into your body.  Anxiously you pull down your underclothes to examine your nether regions.  To your relief ");
        if (player.cockTotal() == 1) outputText("it is");
        else outputText("they are");
        outputText(" still present, and as you touch ");
        if (player.cockTotal() == 1) outputText("it");
        else outputText("them");
        outputText(", the sensitivity fades, however - a blush comes to your cheeks - ");
        if (player.cockTotal() == 1) outputText("it seems");
        else outputText("they seem");
        outputText(" to have become smaller.");
        temp = 0;
        while (temp < player.cockTotal()) {
            if (player.cocks[temp].cockLength >= 3.5) {
                //Shrink said cock
                if (player.cocks[temp].cockLength < 6 && player.cocks[temp].cockLength >= 2.9) {
                    player.cocks[temp].cockLength -= .5;
                    if (player.cocks[temp].cockThickness * 6 > player.cocks[temp].cockLength) player.cocks[temp].cockThickness -= .2;
                    if (player.cocks[temp].cockThickness * 8 > player.cocks[temp].cockLength) player.cocks[temp].cockThickness -= .2;
                    if (player.cocks[temp].cockThickness < .5) player.cocks[temp].cockThickness = .5;
                }
                player.cocks[temp].cockLength -= 0.5;
                player.increaseCock(temp, Math.round(player.cocks[temp].cockLength * 0.33) * -1);
            }
            temp++;
        }
        changes++;
    }
//Testicle Reduction:
    if (player.balls > 0 && player.hasCock() && (player.ballSize > 1 || player.findStatusEffect(StatusEffects.Uniball) < 0) && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>You feel a delicate tightening sensation around your [balls].  The sensation upon this most sensitive part of your anatomy isn't painful, but the feeling of your balls getting smaller is intense enough that you stifle anything more than a sharp intake of breath only with difficulty.");
        player.ballSize--;
        if (player.ballSize > 8) player.ballSize--;
        if (player.ballSize > 10) player.ballSize--;
        if (player.ballSize > 12) player.ballSize--;
        if (player.ballSize > 15) player.ballSize--;
        if (player.ballSize > 20) player.ballSize--;
        //Testicle Reduction final:
        if (player.ballSize < 1 && player.findStatusEffect(StatusEffects.Uniball) < 0) {
            outputText("  You whimper as once again, your balls tighten and shrink.  Your eyes widen when you feel the gentle weight of your testicles pushing against the top of your [hips], and a few hesitant swings of your rear confirm what you can feel - you've tightened your balls up so much they no longer hang beneath your " + player.multiCockDescriptLight() + ", but press perkily upwards.  Heat ringing your ears, you explore your new sack with a careful hand.  You are deeply grateful you apparently haven't reversed puberty, but you discover that though you still have " + num2Text(player.balls) + ", your balls now look and feel like one: one cute, tight little sissy parcel, its warm, insistent pressure upwards upon the joining of your thighs a never-ending reminder of it.");
            //[Note: Balls description should no longer say “swings heavily beneath”.  For simplicity's sake sex scenes should continue to assume two balls]
            player.ballSize = 1;
            player.createStatusEffect(StatusEffects.Uniball, 0, 0, 0, 0);
        }
        else if (player.ballSize < 1) player.ballSize = 1;
        changes++;
    }
//Anal Wetness Increase:
    if (player.ass.analWetness < 5 && rand(4) == 0 && changes < changeLimit) {
        if (player.ass.analWetness < 4) outputText("<br><br>Your eyes widen in shock as you feel oily moisture bead out of your [asshole].  Your asshole has become wetter and more pliable.");
        //Anal Wetness Increase Final (always loose):
        else outputText("<br><br>You moan as clear, odorless oil dribbles out of your [asshole], this time in enough quantity to stain your [armor].  Your back passage feels incredibly sensitive, wet and accommodating.  Your ass is ready to be plowed by anything, and always will be.");
        player.ass.analWetness++;
        //buttChange(30,false,false,false);
        if (player.ass.analLooseness < 3) player.ass.analLooseness++;
        changes++;
        player.dynStats("sen", 2);
    }
//Fertility Decrease:
    if (player.hasVagina() && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>The vague numbness in your skin sinks slowly downwards, and you put a hand on your lower stomach as the sensation centers itself there.  ");
        player.dynStats("sen", -2);
        //High fertility:
        if (player.fertility >= 30) outputText("It feels like your overcharged reproductive organs have simmered down a bit.");
        //Average fertility:
        else if (player.fertility >= 5) outputText("You feel like you have dried up a bit inside; you are left feeling oddly tranquil.");
        //[Low/No fertility:
        else {
            outputText("Although the numbness makes you feel serene, the trap oil has no effect upon your ");
            if (player.fertility > 0) outputText("mostly ");
            outputText("sterile system.");
            //[Low/No fertility + Trap/Corruption  >70:
            if (player.cor > 70) outputText("  For some reason the fact that you cannot function as nature intended makes you feel helpless and submissive.  Perhaps the only way to be a useful creature now is to find a dominant, fertile being willing to plow you full of eggs? You shake the alien, yet oddly alluring thought away.");
        }
        player.fertility -= 1 + rand(3);
        if (player.fertility < 4) player.fertility = 4;
        changes++;
    }
//Male Effects
    if (player.gender == 1) {
        //Femininity Increase Final (max femininity allowed increased by +10):
        if (rand(4) == 0 && changes < changeLimit) {
            if (player.femininity < 70 && player.femininity >= 60) {
                outputText("<br><br>You laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a girly giggle than anything else.  Feeling slightly more sober, you touch the soft flesh of your face prospectively.  The trap oil has changed you profoundly, making your innate maleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a girl now if you wanted to.");
                if (player.findPerk(PerkLib.Androgyny) < 0) {
                    player.createPerk(PerkLib.Androgyny, 0, 0, 0, 0);
                    outputText("<br><br>(<b>Perk Gained: Androgyny</b>)");
                }
                player.femininity += 10;
                if (player.femininity > 70) player.femininity = 70;
                changes++;
            }
            //Femininity Increase:
            else {
                outputText("<br><br>Your face softens as your features become more feminine.");
                player.femininity += 10;
                changes++;
            }
        }
        //Muscle tone reduction:
        if (player.tone > 20 && rand(4) == 0 && changes < changeLimit) {
            outputText("<br><br>You sink a finger into your arm inquiringly.  You seem to have lost some of your muscle definition, leaving you looking softer.");
            player.tone -= 10;
            changes++;
        }
    }
//Female Effects
    else if (player.gender == 2) {
        //Masculinity Increase:
        if (player.femininity > 30 && rand(4) == 0 && changes < changeLimit) {
            player.femininity -= 10;
            if (player.femininity < 30) {
                player.femininity = 30;
                //Masculinity Increase Final (max masculinity allowed increased by +10):
                outputText("<br><br>You laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a boyish crow than anything else.  Feeling slightly more sober, you touch the defined lines of your face prospectively.  The trap oil has changed you profoundly, making your innate femaleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a boy now if you wanted to.");
                if (player.findPerk(PerkLib.Androgyny) < 0) {
                    player.createPerk(PerkLib.Androgyny, 0, 0, 0, 0);
                    outputText("<br><br>(<b>Perk Gained: Androgyny</b>)");
                }
            }
            else {
                outputText("<br><br>Your face becomes more set and defined as your features turn more masculine.");
            }
            changes++;
        }
        //Muscle tone gain:
        if (player.tone < 80 && rand(4) == 0 && changes < changeLimit) {
            outputText("<br><br>You flex your arm in interest.  Although you have become thinner, your muscles seem to have become more defined.");
            player.tone += 10;
            changes++;
        }
    }
    //Replace oviposition code
    if (rand(5) == 0 && changes >= changeLimit && player.findPerk(PerkLib.Oviposition) >= 0 && player.lizardScore() < 8) {
        outputText("<br><br>Another change in your uterus ripples through your reproductive systems. Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
        outputText("(<b>Perk Lost: Oviposition</b>)<br>");
        player.removePerk(PerkLib.Oviposition)
    }
//Nipples Turn Black:
    if (gameFlags[HAS_BLACK_NIPPLES] == 0 && rand(6) == 0 && changes < changeLimit) {
        outputText("<br><br>A tickling sensation plucks at your nipples and you cringe, trying not to giggle.  Looking down you are in time to see the last spot of flesh tone disappear from your [nipples].  They have turned an onyx black!");
        gameFlags[HAS_BLACK_NIPPLES] = 1;
        changes++;
    }
//Remove odd eyes
    if (player.eyeType == EYES_FOUR_SPIDER_EYES && rand(2) == 0 && changes < changeLimit) {
        outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
        if (player.eyeType == EYES_FOUR_SPIDER_EYES) outputText("  Your multiple, arachnid eyes are gone!</b>", false);
        outputText("  <b>You have normal, humanoid eyes again.</b>", false);
        player.eyeType = EYES_HUMAN;
        changes++;
    }
//PC Trap Effects
    if (player.eyeType != EYES_BLACK_EYES_SAND_TRAP && rand(4) == 0 && changes < changeLimit) {
        player.eyeType = EYES_BLACK_EYES_SAND_TRAP;
        //Eyes Turn Black:
        outputText("<br><br>You blink, and then blink again.  It feels like something is irritating your eyes.  Panic sets in as black suddenly blooms in the corner of your left eye and then your right, as if drops of ink were falling into them.  You calm yourself down with the thought that rubbing at your eyes will certainly make whatever is happening to them worse; through force of will you hold your hands behind your back and wait for the strange affliction to run its course.  The strange inky substance pools over your entire vision before slowly fading, thankfully taking the irritation with it.  As soon as it goes you stride quickly over to the stream and stare at your reflection.  <b>Your pupils, your irises, your entire eye has turned a liquid black</b>, leaving you looking vaguely like the many half insect creatures which inhabit these lands.  You find you are merely grateful the change apparently hasn't affected your vision.");
        changes++;
    }
//Vagina Turns Black:
    if (player.hasVagina() && player.vaginaType() != 5 && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>Your [vagina] feels... odd.  You undo your clothes and gingerly inspect your nether regions.  The tender pink color of your sex has disappeared, replaced with smooth, marble blackness starting at your lips and working inwards.");
        //(Wet:
        if (player.wetness() >= 3) outputText("  Your natural lubrication makes it gleam invitingly.");
        //(Corruption <50:
        if (player.cor < 50) outputText("  After a few cautious touches you decide it doesn't feel any different- it does certainly look odd, though.");
        else outputText("  After a few cautious touches you decide it doesn't feel any different - the sheer bizarreness of it is a big turn on though, and you feel it beginning to shine with anticipation at the thought of using it.");
        outputText("  <b>Your vagina is now ebony in color.</b>");
        player.dynStats("sen", 2);
        player.changeLust(10);
        player.vaginaType(5);
        changes++;
    }
//Dragonfly Wings:
    if (player.wingType != WING_TYPE_GIANT_DRAGONFLY && rand(4) == 0 && changes < changeLimit) {
        outputText("<br><br>You scream and fall to your knees as incredible pain snags at your shoulders, as if needle like hooks were being sunk into your flesh just below your shoulder blades.  After about five seconds of white hot, keening agony it is with almost sexual relief that something splits out of your upper back.  You clench the dirt as you slide what feel like giant leaves of paper into the open air.  Eventually the sensation passes and you groggily get to your feet.  You can barely believe what you can see by craning your neck behind you - <b>you've grown a set of four giant dragonfly wings</b>, thinner, longer and more pointed than the ones you've seen upon the forest bee girls, but no less diaphanous and beautiful.  You cautiously flex the new muscle groups in your shoulder blades and gasp as your new wings whirr and lift you several inches off the ground.  What fun this is going to be!");
        //Wings Fall Out: You feel a sharp pinching sensation in your shoulders and you cringe slightly.  Your former dragonfly wings make soft, papery sounds as they fall into the dirt behind you.
        changes++;
        player.wingType = WING_TYPE_GIANT_DRAGONFLY;
        player.wingDesc = "giant dragonfly";
    }
    if (changes == 0) {
        outputText("<br><br>Well... that didn't amount to much.");
    }
    gameFlags[TIMES_TRANSFORMED] += changes;
};




//----------
// TRANSFORMATION HELPERS (SEE OLD MutationsHelper.as)
//----------

// Folded in removeFeatheryHair()
// Folded in updateOvipositionPerk()

/*

public function updateOvipositionPerk(tfSource:String):int

{
    trace('called updateOvipositionPerk("' + tfSource + '")');
    var tsParts:Array = tfSource.split("-");
    if (tsParts.length > 1 && ["goldenSeed", "catTransformation"].indexOf(tsParts[0]) == -1)
        tfSource = tsParts[0];

    // First things first :)
    if (player.findPerk(PerkLib.BasiliskWomb) >= 0) {
        if (player.findPerk(PerkLib.Oviposition) >= 0)
            return 0; // we already have it => no change

        // Basilisk Womb but no Oviposition? Fix, whats broken
        outputText("<br><br>Deep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly."
            +"  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your basilisk womb.<br>");
        outputText("(<b>Perk Gained: Oviposition</b>)");

        player.createPerk(PerkLib.Oviposition, 0, 0, 0, 0);
        return 1; // true => gained Oviposition Perk
    }

    if (changes >= changeLimit) return 0;

    // Note, that we don't do the score checks anymore. That was just an unly workaround and we don't want to do that again!
    switch(tfSource) {
        case "emberTFs":
        case "snakeOil":
        case "goldenSeed-HarpyWomb":
        //case "catTransformation-dragonne": // Keep it? Maybe later.
        // TFs with minor changes. Just in case, we change our mind or if we intend to upgrade them.
        case "winterPudding":
        case "rizzaRootEffect":
            return 0; // Don't change it. So we're done, yay!

        case "reptilum":
           // if (player.findPerk(PerkLib.Oviposition) >= 0) return 0;
            outputText("<br><br>Deep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly."
                +"  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.<br>");
            outputText("(<b>Perk Gained: Oviposition</b>)");

            player.createPerk(PerkLib.Oviposition, 0, 0, 0, 0);
            changes++;
            return 1; // Gained it
            break;

        default:
            if (player.findPerk(PerkLib.Oviposition) < 0) return 0;
            if (player.lizardScore() >= 8) return 0; // Still high, so don't remove Oviposition yet!
            if (tfSource != "superHummus") {
                outputText("<br><br>Another change in your uterus ripples through your reproductive systems."
                    +"  Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
                outputText("(<b>Perk Lost: Oviposition</b>)<br>");
            }
            player.removePerk(PerkLib.Oviposition);
            return -1; // Lost it
    }
}
*/


function updateClaws(clawType)  {
    if (clawType == undefined) {
        clawType = CLAW_TYPE_NORMAL
    }
    var clawTone = "";
    var oldClawTone = player.clawTone;

    switch (clawType) {
    case CLAW_TYPE_DRAGON:       clawTone = "steel-gray";   break;
    case CLAW_TYPE_SALAMANDER:   clawTone = "fiery-red";    break;
    case CLAW_TYPE_LIZARD:
 // See http://www.bergenbattingcenter.com/lizard-skins-bat-grip/ for all those NYI! lizard skin colors
 // I'm still not that happy with these claw tones. Any suggestion would be nice.
    switch (player.skinTone) {
    case "red":          clawTone = "reddish";      break;
    case "green":        clawTone = "greenish";     break;
    case "white":        clawTone = "light-gray";   break;
    case "blue":         clawTone = "bluish";       break;
    case "black":        clawTone = "dark-gray";    break;
    case "purple":       clawTone = "purplish";     break;
    case "silver":       clawTone = "silvery";      break;
    case "pink":         clawTone = "pink";         break; // NYI! Maybe only with a new Skin Oil?
    case "orange":       clawTone = "orangey";      break; // NYI!
    case "yellow":       clawTone = "yellowish";    break; // NYI!
    case "desert-camo":  clawTone = "pale-yellow";  break; // NYI!
    case "gray-camo":    clawTone = "gray";         break; // NYI!
    default:             clawTone = "gray";         break;
    }
    break;
    default:
    clawTone = "";
 }

    player.clawType = clawType;
    player.clawTone = clawTone;

    return oldClawTone;
 };

function restoreArms(tfSource) {
    //trace('called restoreArms("' + tfSource + '")');
    var message = "";

    if (tfSource == "gooGasmic") {
        // skin just turned gooey. Now lets fix unusual arms.
        var hasClaws = player.clawType != CLAW_TYPE_NORMAL;

        message = "\n\n";
        if (player.armType == ARM_TYPE_HARPY) {
            message += "The feathers on your arms melt back into your now gooey skin.";
            if (hasClaws) message += " Additionally your now gooey claws melt back into your fingers.";
        } else if (hasClaws) {
            message += "Your now gooey claws melt back into your fingers.";
        }

        if (hasClaws) message += " Well, who cares, gooey claws aren't very useful in combat to begin with.";
        if (hasClaws || player.armType == ARM_TYPE_HARPY) outputText(message + "  <b>You have normal human arms again.</b>");

        updateClaws();
        player.armType = ARM_TYPE_HUMAN;
        return 1;
    }


    if (changes < changeLimit && player.armType != ARM_TYPE_HUMAN) {
        if ([ARM_TYPE_HARPY, ARM_TYPE_SPIDER, ARM_TYPE_SALAMANDER].indexOf(player.armType) >= 0) //TODO Add Salamander Arm Type
            message += "\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.";

        switch (player.armType) {
            case ARM_TYPE_HARPY:
                message += "  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating."
                    +"  The wing-like shape your arms once had is gone in a matter of moments, leaving [skinfurscales] behind.";
                break;

            case ARM_TYPE_SPIDER:
                message += "  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away."
                    +"  The glossy black coating is soon gone, leaving [skinfurscales] behind.";
                break;

            case ARM_TYPE_SALAMANDER:
                message += "  Glancing down in irritation, you discover that your once scaly arms are shedding their scales and that"
                    +" your claws become normal human fingernails again.";
                break;

            case ARM_TYPE_PREDATOR: //TODO Add Predator Arm Type
                switch (player.skinType) {
                    case SKIN_TYPE_GOO:
                        if (player.clawType != CLAW_TYPE_NORMAL)
                            message += "\n\nYour gooey claws melt into your fingers."
                                +" Well, who cares, gooey claws aren't very useful in combat to begin with.";
                        break;

                    case SKIN_TYPE_PLAIN:
                    case SKIN_TYPE_FUR:
                    case SKIN_TYPE_SCALES:
                        message += "\n\nYou feel a sudden tingle in your [claws] and then you realize,"
                            +" that they have become normal human fingernails again.";
                        break;
                }
                break;

            default:
                message += "\n\nYour unusual arms change more and more until they are normal human arms, leaving [skinfurscales] behind.";
        }
        outputText(message + "  <b>You have normal human arms again.</b>");
        updateClaws();
        player.armType = ARM_TYPE_HUMAN;
        changes++;
        return 1;
    }

    return 0;
}
