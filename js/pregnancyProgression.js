/*
 This file contains the detailed code for handling player pregnancy, heat, and other things. pregnancy.js will still count down the pregnancy, but this holds everything else. Check time.js for how it is called.

 */

var pregnancyProgression = [];
var statControl = 0; // This prevents huge stat freakouts while pregnant

pregnancyProgression.updatePregnancy = function() {
    var displayedUpdate = false;
    //outputText("Reached Pregnancy Loop.<br><br>");
    // Player is pregnant with mice messages and transformations.
    if (playerPregnancy.pregnancyTypeFlag == PREGNANCY_AMILY) {
        switch (playerPregnancy.pregnancyEventCounter) {
            case 1:
                outputText("<b>You wake up feeling bloated, and your belly is actually looking a little puffy. At the same time, though, you have the oddest cravings... you could really go for some mixed nuts. And maybe a little cheese, too.</b><br><br>");
                displayedUpdate = true;
                break;
            case 2:
                outputText("<b>Your belly is getting more noticeably distended and squirming around.  You are probably pregnant.</b><br><br>", false);
                displayedUpdate = true;
                break;
            case 3:
                outputText("<b>There is no question you're pregnant; your belly is already as big as that of any pregnant woman back home. ");
                if (gameFlags[AMILY_FOLLOWER] == 1) outputText("  Amily smiles at you reassuringly. \"<i>We do have litters, dear, this is normal.</i>\"");
                outputText("</b><br><br>");
                if (statControl == 0) {
                    player.modStats("spe", -1);
                    player.modStats("lib", 1);
                    player.modStats("sen", 1);
                    player.changeLust(2);
                    statControl++;
                }
                displayedUpdate = true;
                break;
            case 4:
                outputText("<b>The sudden impact of a tiny kick from inside your distended womb startles you.  Moments later it happens again, making you gasp.</b><br><br>");
                displayedUpdate = true;
                break;
            case 5:
                outputText("<b>You feel (and look) hugely pregnant, now, but you feel content. You know the, ah, 'father' of these children loves you, and they will love you in turn.</b><br><br>");
                displayedUpdate = true;
                break;
            case 6:
                outputText("<b>You jolt from the sensation of squirming inside your swollen stomach. Fortunately, it dies down quickly, but you know for a fact that you felt more than one baby kicking inside you.</b><br><br>");
                    if (statControl == 1) {
                        player.modStats("spe", -3);
                        player.modStats("lib", 1);
                        player.modStats("sen", 1);
                        player.changeLust(4);
                        statControl++;
                    }
                displayedUpdate = true;
                break;
            case 7:
                outputText("<b>The children kick and squirm frequently. Your bladder, stomach and lungs all feel very squished. You're glad that they'll be coming out of you soon.</b><br><br>");
                break;
            default:

            }

        // Fill player's breasts with milk when knocked up by Amily.
        if (playerPregnancy.pregnancyEventCounter >= 5 && playerPregnancy.pregnancyEventCounter <= 8) {
            // outputText("<b>Reached Tit Growth Amily Loop</b><br><br>");
            if (player.biggestTitSize() >= 3 && player.mostBreastsPerRow() > 1 && player.biggestLactation() >= 1 && player.biggestLactation() < 2) {
                outputText("Your breasts feel swollen with all the extra milk they're accumulating.<br><br>");
                player.boostLactation(.5);
            }
            if (player.biggestTitSize() >= 3 && player.mostBreastsPerRow() > 1 && player.biggestLactation() > 0 && player.biggestLactation() < 1) {
                outputText("Drops of breastmilk escape your nipples as your body prepares for the coming birth.<br><br>");
                player.boostLactation(.5);
            }
            if (player.biggestTitSize() >= 3 && player.mostBreastsPerRow() > 1 && player.biggestLactation() == 0) {
                outputText("<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.<br><br>");
                player.boostLactation(1);
            }
            if (player.biggestTitSize() == 2 && player.mostBreastsPerRow() > 1) {
                outputText("<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.<br><br>");
                player.growTits(1, 1, false, 3);
            }
            if (player.biggestTitSize() == 1 && player.mostBreastsPerRow() > 1) {
                outputText("<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.<br>");
                player.growTits(1, 1, false, 3);
            }
        }

        // Player giving birth to Amily's babies
        //Amily failsafes to convert pure Amily babies to mouse babies under certain circumstances.

        if (playerPregnancy.pregnancyIncubationFlag == 0 && playerPregnancy.pregnancyTypeFlag == PREGNANCY_AMILY)
        {
            statControl = 0; // Reset stat controller
            if (gameFlags[AMILY_FOLLOWER] == 2 || gameFlags[AMILY_CORRUPTION_PATH] > 0) playerPregnancy.knockUpForce(PREGNANCY_MOUSE, playerPregnancy.pregnancyIncubationFlag);
            if (gameFlags[AMILY_VISITING_URTA] == 1 || gameFlags[AMILY_VISITING_URTA] == 2) playerPregnancy.knockUpForce(PREGNANCY_MOUSE, playerPregnancy.pregnancyIncubationFlag);
            //if (prison.inPrison) player.knockUpForce(PregnancyStore.PREGNANCY_MOUSE, player.pregnancyIncubation);
        }

        //Give birth to pure Amily's kids
        if (playerPregnancy.pregnancyIncubationFlag == 0 && playerPregnancy.pregnancyTypeFlag == PREGNANCY_AMILY) {
            player.boostLactation(.01);
            outputText("<br>");
            if (player.vaginas.length == 0) {
                outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ");
                player.createVagina();
                player.genderCheck();
            }

            AmilyScene.pcBirthsAmilysKidsQuestVersion();
            player.cuntChange(60, true, true, false);
            if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS_DRY) player.vaginas[0].vaginalWetness++;
            player.orgasm();
            player.modStats("str", -1,"tou", -2, "spe", 3, "lib", 1, "sen", .5);
            displayedUpdate = true;
            outputText("<br><br>");
            playerPregnancy.knockUpForce(0,0); //Clear Pregnancy
        }

        //Give birth to generic mice and Jojo's / Joy's babies
        /*
        if (player.pregnancyIncubation == 1 && (player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE || player.pregnancyType == PregnancyStore.PREGNANCY_JOJO)) {
            player.boostLactation(.01);
            outputText("\nYou wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it is pushed out in many places, roiling and squirming in disturbing ways. The feelings you get from inside are just as disconcerting. You count not one, but many little things moving around inside you. There are so many, you can't keep track of them.\n\n", false);
            if (player.vaginas.length == 0) {
                outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ", false);
                player.createVagina();
                player.genderCheck();
            }

         //Main Text here
         if (player.pregnancyType == PregnancyStore.PREGNANCY_JOJO && (getGame().monk < 0 || flags[kFLAGS.JOJO_BIMBO_STATE] >= 3) && !prison.inPrison) {
         if (flags[kFLAGS.JOJO_BIMBO_STATE] >= 3) {
         kGAMECLASS.joyScene.playerGivesBirthToJoyBabies();
         return true;
         }
         else kGAMECLASS.jojoScene.giveBirthToPureJojoBabies();
         }
         else {
         outputText("Pain shoots through you as they pull open your cervix forcefully. You grip the ground and pant and push as the pains of labor overwhelm you. You feel your hips being forceably widened by the collective mass of the creatures moving down your birth canal. You spread your legs wide, laying your head back with groans and cries of agony as little white figures begin to emerge from between the lips of your abused pussy. Large innocent eyes, even larger ears, cute little muzzles, long slender pink tails all appear as the figures emerge. Each could be no larger than six inches tall, but they seem as active and curious as if they were already developed children. \n\n", false);
         outputText("Two emerge, then four, eight... you lose track. They swarm your body, scrambling for your chest, and take turns suckling at your nipples. Milk does their bodies good, making them grow rapidly, defining their genders as the girls grow cute little breasts and get broader hips and the boys develop their little mouse cocks and feel their balls swell. Each stops suckling when they reach two feet tall, and once every last one of them has departed your sore, abused cunt and drunk their fill of your milk, they give you a few grateful nuzzles, then run off towards the forest, leaving you alone to recover.\n", false);
         }
         player.knockUpForce(); //Clear Pregnancy
         if (player.averageLactation() > 0 && player.averageLactation() < 5) {
         outputText("Your [chest] won't seem to stop dribbling milk, lactating more heavily than before.", false);
         player.boostLactation(.5);
         }
         player.cuntChange(60, true,true,false);
         if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS_DRY) player.vaginas[0].vaginalWetness++;
         if (player.gender == 1) player.gender = 3;
         if (player.gender == 0) player.gender = 2;
         player.orgasm();
         dynStats("str", -1,"tou", -2, "spe", 3, "lib", 1, "sen", .5);
         displayedUpdate = true;
         //Butt increase
         if (player.buttRating < 14 && rand(2) == 0) {
         if (player.buttRating < 10) {
         player.buttRating++;
         outputText("\n\nYou notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
         }
         //Big butts grow slower!
         else if (player.buttRating < 14 && rand(2) == 0) {
         player.buttRating++;
         outputText("\n\nYou notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
         }
         }
         outputText("\n", false);
         }*/

     }
    doNext(playerMenu);
};