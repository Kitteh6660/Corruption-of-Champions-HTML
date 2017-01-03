/*
 This file contains the detailed code for handling player pregnancy, heat, and other things. pregnancy.js will still count down the pregnancy, but this holds everything else. Check time.js for how it is called.

 */

var pregnancyProgression = [];
var statControl = 0; // This prevents huge stat freakouts while pregnant
var buttStatControl = 0; // This prevents huge stat freakouts while anal pregnant

pregnancyProgression.updatePregnancy = function() {
    var displayedUpdate = false;

    //outputText("Reached Pregnancy Loop.<br><br>");
    // Player is pregnant with mice messages and transformations.
    if (player.pregnancyType == PREGNANCY_AMILY) {
        switch (player.pregnancyEventNum) {
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
        if (player.pregnancyEventNum >= 5 && player.pregnancyEventNum <= 8) {
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

        if (player.pregnancyIncubation == 0 && player.pregnancyType == PREGNANCY_AMILY)
        {
            statControl = 0; // Reset stat controller
            if (gameFlags[AMILY_FOLLOWER] == 2 || gameFlags[AMILY_CORRUPTION_PATH] > 0) player.knockUpForce(PREGNANCY_MOUSE, player.pregnancyIncubationFlag);
            if (gameFlags[AMILY_VISITING_URTA] == 1 || gameFlags[AMILY_VISITING_URTA] == 2) player.knockUpForce(PREGNANCY_MOUSE, player.pregnancyIncubationFlag);
            //if (prison.inPrison) player.knockUpForce(PregnancyStore.PREGNANCY_MOUSE, player.pregnancyIncubation);
        }

        //Give birth to pure Amily's kids
        if (player.pregnancyIncubation == 0 && player.pregnancyType == PREGNANCY_AMILY) {
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
            player.knockUpForce(0,0); //Clear Pregnancy
            displayedUpdate = true;
        }

        //Give birth to generic mice and Jojo's / Joy's babies
        /*
        if (player.pregnancyIncubation == 1 && (player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE || player.pregnancyType == PregnancyStore.PREGNANCY_JOJO)) {
            player.boostLactation(.01);
            outputText("<br>You wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it is pushed out in many places, roiling and squirming in disturbing ways. The feelings you get from inside are just as disconcerting. You count not one, but many little things moving around inside you. There are so many, you can't keep track of them.<br><br>", false);
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
         outputText("Pain shoots through you as they pull open your cervix forcefully. You grip the ground and pant and push as the pains of labor overwhelm you. You feel your hips being forceably widened by the collective mass of the creatures moving down your birth canal. You spread your legs wide, laying your head back with groans and cries of agony as little white figures begin to emerge from between the lips of your abused pussy. Large innocent eyes, even larger ears, cute little muzzles, long slender pink tails all appear as the figures emerge. Each could be no larger than six inches tall, but they seem as active and curious as if they were already developed children. <br><br>", false);
         outputText("Two emerge, then four, eight... you lose track. They swarm your body, scrambling for your chest, and take turns suckling at your nipples. Milk does their bodies good, making them grow rapidly, defining their genders as the girls grow cute little breasts and get broader hips and the boys develop their little mouse cocks and feel their balls swell. Each stops suckling when they reach two feet tall, and once every last one of them has departed your sore, abused cunt and drunk their fill of your milk, they give you a few grateful nuzzles, then run off towards the forest, leaving you alone to recover.<br>", false);
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
         outputText("<br><br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
         }
         //Big butts grow slower!
         else if (player.buttRating < 14 && rand(2) == 0) {
         player.buttRating++;
         outputText("<br><br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
         }
         }
         outputText("<br>", false);
         }*/

     }

    //Imp Pregnancy!
    if (player.pregnancyType == PREGNANCY_IMP) {
        var impStat1;
        var impStat2;
        if (player.pregnancyIncubation <= 336 * 60 && player.pregnancyIncubation >= 280 * 60) {
            outputText("<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b><br><br>");
            displayedUpdate = true;
        }
        if (player.pregnancyIncubation <= 280 * 60 && player.pregnancyIncubation >= 216 * 60) {
            outputText("<b>Your belly is getting more noticeably distended.   You are probably pregnant.</b><br><br>");
            displayedUpdate = true;
        }
        if (player.pregnancyIncubation <= 216 * 60 && player.pregnancyIncubation >= 180 * 60) {
            outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy.  ");
            if (player.cor < 40) outputText("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b><br><br>");
            if (player.cor >= 40 && player.cor < 75) outputText("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b><br><br>");
            if (player.cor >= 75) outputText("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b><br><br>");
            if (statControl == 0) {
                statControl = 1;
                player.modStats("spe", -1, "lib", 1, "sen", 1);
                player.changeLust(2);
                displayedUpdate = true;
            }
        }
        if (player.pregnancyIncubation <= 180 * 60 && player.pregnancyIncubation >= 120 * 60) {
            outputText("<b>The sudden impact of a kick from inside your womb startles you.</b><br><br>");
            displayedUpdate = true;
        }
        if (player.pregnancyIncubation <= 120 * 60 && player.pregnancyIncubation >= 72 * 60) {
            outputText("<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b><br><br>");
            displayedUpdate = true;
        }
        if (player.pregnancyIncubation <= 72 * 60 && player.pregnancyIncubation >= 48 * 60) {
            outputText("<b>Your belly is painfully distended, ");
            if (player.cor < 40) outputText("making it difficult to function.</b>");
            if (player.cor >= 40 && player.cor < 75) outputText("and you wonder how much longer you have to wait.</b>");
            if (player.cor >= 75) outputText("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>");
            outputText("<br><br>");
            if (statControl == 1) {
                statControl = 2;
                player.modStats("spe", -3, "lib", 1, "sen", 1);
                player.changeLust(4);
                displayedUpdate = true;
            }
        }
        if (player.pregnancyIncubation <= 48 * 60) {
            outputText("<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ");
            if (player.cor < 40) outputText("Afterwards you feel somewhat disgusted with yourself.</b>");
            if (player.cor >= 40 && player.cor < 75) outputText("You estimate you'll give birth in the next few days.</b>");
            if (player.cor >= 75) outputText("You find yourself daydreaming about birthing demons repeatedly, each time being re-impregnated by your hordes of lusty adolescent children.</b>");
            outputText("<br><br>");
            displayedUpdate = true;
        }
    }

    //---------------
    // IMP PREGNANCY
    //--------------

    if (player.pregnancyIncubation == 0 && player.pregnancyType == PREGNANCY_IMP) {
        statControl = 0;
        outputText("<br>");
        //Add imp birth status - used to control frequency of night imp gangbag
        //if (player.findStatusEffect(StatusEffects.BirthedImps) >= 0) player.addStatusValue(StatusEffects.BirthedImps,1,1);
        //else player.createStatusEffect(StatusEffects.BirthedImps,1,0,0,0);
        if (player.vaginas.length == 0) {
            outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            player.createVagina();
            player.genderCheck();
        }
        outputText("A sudden gush of fluids erupts from your vagina - your water just broke.  You grunt painfully as you feel wriggling and squirming inside your belly, muscle contractions forcing it downwards.  ");
        if (player.cor < 50) outputText("You rue the day you encountered that hateful imp.  ");
        outputText("The pain begins to subside as your delivery continues... replaced with a building sensation of pleasure.  Arousal spikes through you as the contractions intensify, and as you feel something pass you have a tiny orgasm.<br><br>Yet you feel more within you, and the contractions spike again, pushing you to orgasm as you pass something else.  It repeats, over and over, nearly a dozen times you birth and orgasm.  After an eternity of procreation and pleasure, you sense your ordeal is over and collapse, unconscious.");


        if (player.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_TIGHT) player.vaginas[0].vaginalLooseness++;
        //50% chance
        if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_GAPING_WIDE && rand(2) == 0) {
            player.vaginas[0].vaginalLooseness++;
            outputText("<br><br><b>Your cunt is painfully stretched from the ordeal, permanently enlarged.</b>");
        }

        player.knockUpForce(0,0); //Clear Pregnancy
        outputText("<br><br>When you wake you find a large number of tiny imp tracks... and a spattering of cum on your clothes and body.  They must be born fully-formed.");
        if (player.averageLactation() > 0 && player.averageLactation() < 5) {
            outputText("  Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
            player.boostLactation(.5);
        }
        //Lactate if large && not lactating
        if (player.biggestTitSize() >= 3 && player.mostBreastsPerRow() > 1 && player.averageLactation() == 0) {
            outputText("  As you ponder the implications, <b>you realize your breasts have been slowly lactating</b>.  You wonder how much longer it will be before they stop.");
            player.boostLactation(1);
        }
        player.boostLactation(.01);
        //Enlarge if too small for lactation
        if (player.biggestTitSize() == 2 && player.mostBreastsPerRow() > 1) {
            outputText("  <b>Your breasts have grown to C-cups!</b>");
            player.growTits(1, 1, false, 3);
        }
        //Enlarge if really small!
        if (player.biggestTitSize() == 1 && player.mostBreastsPerRow() > 1) {
            outputText("  <b>Your breasts have grown to B-cups!</b>");
            player.growTits(1, 1, false, 3);
        }
        if (player.vaginas[0].vaginalWetness == VAGINA_WETNESS_DRY) player.vaginas[0].vaginalWetness++;
        if (player.gender == 1) player.gender = 3;
        if (player.gender == 0) player.gender = 2;
        player.orgasm();
        player.modStats("tou", -2, "spe", 2, "lib", 1, "sen", .5, "cor", 7);
        if (player.buttRating < 10 && rand(2) == 0) {
            player.buttRating++;
            outputText("<br><br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.");
        }
        else if (player.hipRating < 10) {
            player.hipRating++;
            outputText("<br><br>After the birth your " + player.armorName + " fits a bit more snugly about your " + player.hipDescript() + ".");
        }
        outputText("<br>", false);
        displayedUpdate = true;
    }

    //-------------------
    // BEE PREGNANCY
    //-------------------
    if (player.buttPregnancyType == PREGNANCY_BEE_EGGS) {
        if (player.buttPregnancyIncubation <= 36 * 60 && player.buttPregnancyIncubation >= 20 * 60) {
            outputText("<b><br>You feel bloated, your bowels shifting uncomfortably from time to time.</b><br><br>", false);
            displayedUpdate = true;
        }
        if (player.buttPregnancyIncubation <= 20 * 60) {
            outputText("<b><br>A honey-scented fluid drips from your rectum.</b>  At first it worries you, but as the smell fills the air around you, you realize anything with such a beautiful scent must be good.  ", false);
            if (player.cockTotal() > 0) outputText("The aroma seems to permeate your very being, slowly congregating in your ", false);
            if (player.cockTotal() == 1) {
                outputText(player.cockDescript(0), false);
                if (player.countCocksOfType(CockTypesEnum.HORSE) == 1) outputText(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + player.cockDescript(0) + " is twitching and dripping, the flare swollen and purple.  ", false);
                if (player.dogCocks() == 1) outputText(", each inhalation making it thicker, harder, and firmer.  You suck in huge lungfuls of air, desperate for more, until your " + player.cockDescript(0) + " is twitching and dripping, its knot swollen to the max.  ", false);
                if (player.countCocksOfType(CockTypesEnum.HUMAN) == 1) outputText(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + player.cockDescript(0) + " is twitching and dripping, the head swollen and purple.  ", false);
                //FAILSAFE FOR NEW COCKS
                if (player.countCocksOfType(CockTypesEnum.HUMAN) == 0 && player.dogCocks() == 0 && player.countCocksOfType(CockTypesEnum.HORSE) == 0) outputText(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air until your " + player.cockDescript(0) + " is twitching and dripping.  ", false);
            }
            if (player.cockTotal() > 1) outputText("groin.  Your " + player.multiCockDescriptLight() + " fill and grow with every lungful of the stuff you breathe in.  You suck in great lungfuls of the tainted air, desperate for more, your cocks twitching and dripping with need.  ", false);
            outputText("You smile knowing you couldn't stop from masturbating if you wanted to.<br><br>", false);
            if (buttStatControl == 0) {
                buttStatControl = 1;
                player.dynStats("int", -.5);
                player.changeLust(500);
            };
            displayedUpdate = true;
        }
    }

    if (player.buttPregnancyIncubation == 0 && player.buttPregnancyType == PREGNANCY_BEE_EGGS) {
        outputText("<br>", false);
        outputText("There is a sudden gush of honey-colored fluids from your ass.  Before panic can set in, a wonderful scent overtakes you, making everything ok.  ", false);
        if (player.cockTotal() > 0) outputText("The muzzy feeling that fills your head seems to seep downwards, making your equipment hard and tight.  ", false);
        if (player.vaginas.length > 0) outputText("Your " + player.vaginaDescript(0) + " becomes engorged and sensitive.  ", false);
        outputText("Your hand darts down to the amber, scooping up a handful of the sticky stuff.  You wonder what your hand is doing as it brings it up to your mouth, which instinctively opens.  You shudder in revulsion as you swallow the sweet-tasting stuff, your mind briefly wondering why it would do that.  The stuff seems to radiate warmth, quickly pushing those nagging thoughts away as you scoop up more.<br><br>", false);
        outputText("A sudden slip from below surprises you; a white sphere escapes from your anus along with another squirt of honey.  Your drugged brain tries to understand what's happening, but it gives up, your hands idly slathering honey over your loins.  The next orb pops out moments later, forcing a startled moan from your mouth.  That felt GOOD.  You begin masturbating to the thought of laying more eggs... yes, that's what those are.  You nearly cum as egg number three squeezes out.  ", false);
        if (player.averageLactation() >= 1 && player.biggestTitSize() > 2) outputText("Seeking even greater sensation, your hands gather the honey and massage it into your " + player.breastDescript(0) + ", slowly working up to your nipples.  Milk immediately begins pouring out from the attention, flooding your chest with warmth.  ", false);
        outputText("Each egg seems to come out closer on the heels of the one before, and each time your conscious mind loses more of its ability to do anything but masturbate and wallow in honey.<br><br>", false);
        outputText("Some time later, your mind begins to return, brought to wakefulness by an incredibly loud buzzing...  You sit up and see a pile of dozens of eggs resting in a puddle of sticky honey.  Most are empty, but a few have hundreds of honey-bees emptying from them, joining the massive swarms above you.  ", false);
        if (player.cor < 35) outputText("You are disgusted, but glad you were not stung during the ordeal.  You stagger away and find a brook to wash out your mouth with.", false);
        if (player.cor >= 35 && player.cor < 65) outputText("You are amazed you could lay so many eggs, and while the act was strange there was something definitely arousing about it.", false);
        if (player.cor >= 65 && player.cor < 90) outputText("You stretch languidly, noting that most of the drugged honey is gone.  Maybe you can find the Bee again and remember to bottle it next time.", false);
        if (player.cor >= 90) outputText("You lick your lips, savoring the honeyed residue on them as you admire your thousands of children.  If only every night could be like this...<br>", false);
        buttStatControl = 0;
        player.buttKnockUpForce(); //Clear Butt Pregnancy
        player.orgasm();
        player.dynStats("int", 1, "lib", 4, "sen", 3);
        if (player.buttChange(20, true)) outputText("<br>", false);
        if (player.buttRating < 17) {
            //Guaranteed increase up to level 10
            if (player.buttRating < 13) {
                player.buttRating++;
                outputText("<br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
            }
            //Big butts only increase 50% of the time.
            else if (rand(2) == 0){
                player.buttRating++;
                outputText("<br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.", false);
            }
        }
        outputText("<br>", false);
        displayedUpdate = true;
    }


    //---------------
    // GOO PREGNANCY
    // --------------
    if (player.pregnancyType == PREGNANCY_GOO_GIRL && player.pregnancyIncubation == 0) {
        gameFlags[GOOGIRL_BIRTHS]++;
        outputText("<br>", false);
        if (player.vaginas.length == 0) {
            outputText("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ", false);
            player.createVagina();
            player.genderCheck();
        }
        outputText("There is a lurching in your belly that steals the breath from you. As seconds pass, the quivering kicks increase and you're forced to the ground as your womb feels like it's been set aflame by the heat pouring from your stowaway goo-girl. You pant and spread your labia with two fingers, the chill of your hands on your inflamed sex so sweet that you almost cum from the mere touch. Your cervix clenches involuntarily and you try to relax as much as possible, but the slime inside of you hardly needs the help. Squishing and slurping in gouts of syrupy fluid, she trickles from your uterus, sliding out of your tunnel in spurting gouts. You sigh and let her force her seething warmth from within you, the small puddle of ooze growing larger as it pools together. Finally, the small, red heart pops out of your tunnel and you allow yourself a big gulp of chill air to resuscitate your seared lungs.<br><br>", false);
        monster = new GooGirl();//because if we don't, the gooColor4() goes crazy.
        outputText("The small " + monster.gooColor4() + " sludge quivers, but seems unable to take a human shape. Extending pseudopods, it experimentally prods at your skin, trying to gets its bearings. You shiver as the goo slides over your flesh, poking you wetly from time to time. When it finds your breasts, the goo works up your mounds and slurps at your teats, milk filling the blob with a creamy tint that makes it larger and gives its membrane a firmer texture. It takes about ten minutes to flop its way across your entire body before sliding off of you and wriggling at your feet. It shifts again, but this time, manages to form a featureless head. Slowly, gradually, it adds more, morphing shoulders, arms, a waist, and even hips. Her body ripples and the blank slime morphs into a perfect miniature copy of you! It stares up at its mother with a happy expression before lurching away, toward the lake. Even though you were just her incubator and template, you can't help but feel a little pride at your goo child entering the wild world with a fearless sense of exploration.", false);
        player.changeLust(50);
        player.knockUpForce(0,0);
    };

    //---------------
    // SANDTRAP PREGNANCY
    //-------------

    if (player.buttPregnancyIncubation <= 1 && player.buttPregnancyType == PREGNANCY_SANDTRAP_FERTILE) {
        SandTrapScene.birfSandTarps();
        player.buttKnockUpForce(); //Clear Butt Pregnancy
        if (player.buttRating < 17) {
            //Guaranteed increase up to level 10
            if (player.buttRating < 13) {
                player.buttRating++;
                outputText("<br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.<br>", false);
            }
            //Big butts only increase 50% of the time.
            else if (rand(2) == 0){
                player.buttRating++;
                outputText("<br>You notice your " + player.buttDescript() + " feeling larger and plumper after the ordeal.<br>", false);
            }
        }
        //displayedUpdate = true;
    }

    doNext(playerMenu);
    //doNext(Camp.doCamp);
};