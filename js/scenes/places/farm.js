Places.Farm = [];

addToGameFlags(FARM_DISABLED, FARM_CORRUPTION_STARTED, MET_WHITNEY, WHITNEY_FLIPPED_OUT_OVER_KELLY);

Places.Farm.farmExploreEncounter = function() {
    clearOutput();
    displaySprite("whitney");
    /*if (flags[kFLAGS.FARM_CORRUPTION_STARTED] > 0)
    {
        farmCorruption.rootScene();
        return;
    }
    if (farmCorruption.takeoverPrompt() == true) return;*/
    /*if (gameFlags[FARM_DISABLED] == 1)
    {
        outputText("Whitney marches up to you as soon as you approach the farm, a stoic expression plastered across her face.");
        outputText("<br><br>\"<i>What the fuck do you think you're doing here [name]? After what you did to Marble you still think you're welcome here? Leave. <b>Now</b>.</i>\"");
        doNext(Camp.returnToCampUseOneHour);
        //addButton(1, "FIGHT!", fightWhitney);
        return;
    }
    if (gameFlags[FARM_DISABLED] == 2)
    {
        outputText("Whitney marches up to you as soon as you approach the farm, a stoic expression plastered across her face.");
        outputText("<br><br>\"<i>What the fuck do you think you're doing here [name]? After what you did to Kelt you still think you're welcome here? Leave. <b>Now</b>.</i>\"");
        doNext(Camp.returnToCampUseOneHour);
        //addButton(1, "FIGHT!", fightWhitney);
        return;
    }*/

    var temporary = 0;
    //Farm not yet discovered
    if (gameFlags[MET_WHITNEY] < 2) {
        if (gameFlags[MET_WHITNEY] == 0) {
            outputText("You find a quaint farmhouse on the far shores of the lake. Around the homestead are a range of gardens, filled with delicious fruits and vegetables. Your belly rumbles, aching with hunger, as you approach the dwelling. A figure in a pepper patch rises up to greet you, waving you over.<br><br>You do your best to conceal your surprise as you realize the farmer is a woman... with fur and canine-like features! She giggles happily and beckons you over, \"<i>Welcome stranger, it sure is pleasant to see a new face 'round here. My name's Whitney, and it's mighty fine I don't have to pitchfork you like most guests!</i>\" She fills you in about the lake and her farm, telling you how the demons can't seem to stay close for long, and monsters always seem weaker the few times they have approached her farm. Whitney flushes and rapidly changes subject, \"<i>I've got to get back to work, but you help yourself to the peppers, hun!</i>\"<br><br>");
        }
        else {
            outputText("You stumble across Whitney's farm again. The anthropomorphic canine woman gives you a friendly wave and tosses you another Canine pepper.<br><br>");
            if (gameFlags[MET_WHITNEY] == 2) outputText("<b>You've been to the farm enough to easily find it. You can return by selecting it from the places menu (and will no longer encounter it during random lake exploration)</b>.<br><br>");
        }
        gameFlags[MET_WHITNEY]++;
        Inventory.takeItem(Items.Consumables.CaninePepper, Camp.returnToCampUseOneHour);
    }
    //Repeat Offender
    else {
        clearOutput();
        gameFlags[MET_WHITNEY]++; //Used for progress towards achievement.
        if (gameFlags[KELT_KILLED] >= 1) {
            outputText("As soon as you approach the farm, Whitney comes storming up to meet you. \"<i>What the fuck have you done?!</i>\"");
            outputText("<br><br>You hold your hands up, knowing full-well what the angry bitch is on about. She angrily says \"<i>You've fucking killed Kelt the centaur! He may be rude and I don't like him but still, what you've done is wrong. You're not welcome on my farm anymore! Leave. <b>Now.</b></i>\"");
            gameFlags[FARM_DISABLED] = 2;
            doNext(Camp.returnToCampUseOneHour);
            return;
        }
        if (gameFlags[KELT_BREAK_LEVEL] >= 4 && gameFlags[WHITNEY_FLIPPED_OUT_OVER_KELLY] == 0) {
            outputText("As soon as you head to the farm, Whitney comes storming up to meet you. \"<i>What in tarnation do you think you're pulling?!</i>\"");
            outputText("<br><br>You hold your hands up, knowing full-well what the angry bitch is on about. \"<i>I didn't do anything he wouldn't have done to me.</i>\"");
            outputText("<br><br>Whitney fumes, \"<i>You might be right on that count, but the difference is that Kelt didn't keep coming to you to do it. I don't much like him.</i>\" Whitney spits for emphasis before continuing, \"<i>But I felt bad enough for him to let him stick around, so long as he left me an' everybody else well enough alone. The boy's got... an aura or something, and sure, you likely would've wound up like he is.</i>\" She glares back at the farm for emphasis. \"<i>But only if you enjoyed it enough to keep hanging around the dipstick. You... you just kept hounding him... drugging him with them demon fluids over and over. The poor thing can barely sleep without whimpering after your dick.</i>\"");
            outputText("<br><br>Whitney starts to growl before catching herself and folding her arms across her chest. \"<i>I reckon you don't need to be nosing around my farm anymore, but since 'Kelly' seems to need you, I'll let her go out to visit you when you come calling. Just stay away from the rest of us.</i>\"");
            outputText("<br><br>She spins about and trots back to her farm, picking up a pitchfork as she goes. It looks like you won't have access to the farm any more, at least until you come up with a way to deal with Whitney.");
            gameFlags[WHITNEY_FLIPPED_OUT_OVER_KELLY] = 1;
        }
        else if (gameFlags[WHITNEY_FLIPPED_OUT_OVER_KELLY] > 0) outputText("You aren't welcome on the farm proper, but you can see Kelly cantering about the fields, looking for you.");
        else outputText("Whitney's farm is remarkably large for such a humble operation. What do you want to do?");
        menu();
        /*if (gameFlags[KELT_MET] >= 0 && gameFlags[KELT_DISABLED] < 0 && gameFlags[KELT_KILLED] <= 0) {
            if (gameFlags[KELT_BREAK_LEVEL] >= 4) addButton(4,"Kelly",kelly.breakingKeltOptions);
            else addButton(4,"Kelt",kelly.breakingKeltOptions);
        }*/
        //choices("Explore",exploreFarm,"Kelt",keltEvent,"Get Milked",milkYou,"Marble",marble,"Milk Jojo",milkJojo,"Milk Cock",cockMilk,"Talk",talkWhitney,"Work",workFarm,"",0,"Leave",13);
        if (gameFlags[WHITNEY_FLIPPED_OUT_OVER_KELLY] == 0) {
            addButton(0, "Explore", Places.Farm.exploreFarm);
            addButton(1, "Talk", WhitneyScene.talkWhitney);
            addButton(2, "Work", Places.Farm.workFarm);
            /*if (gameFlags[MARBLE_RAPE_ATTEMPTED] == 0 && gameFlags[NO_MORE_MARBLE] == 0 && gameFlags[MARBLE_MET] > 0 && gameFlags[MARBLE_WARNING] == 0) {
                addButton(3,"Marble", MarbleScene.meetMarble);
            }
            if (player.hasKeyItem("Breast Milker - Installed At Whitney's Farm") >= 0) {
                if (player.findStatusEffect(StatusEffects.Milked) >= 0) {
                    outputText("<br><br><b>Your " + player.nippleDescript(0) + "s are currently too sore to be milked. You'll have to wait a while.</b>");
                }
                else addButton(5, "Get Milked", getMilked);
            }
            if (player.hasKeyItem("Cock Milker - Installed At Whitney's Farm") >= 0 && player.cockTotal() > 0) {
                addButton(6, "Milk Cock", cockPumping);
            }*/
        }
        addButton(14, "Leave", Camp.returnToCampUseOneHour);
    }
}

Places.Farm.exploreFarm = function() {
    clearOutput();
    //Marble after-rape
    /*if (gameFlags[MARBLE_RAPE_ATTEMPTED] > 0 && gameFlags[NO_MORE_MARBLE] <= 0) {
        MarbleScene.marbleAfterRapeBattle();
        gameFlags[NO_MORE_MARBLE] = 1;
        return;
    }*/
    //FIND CARROT!
    /*if (kGAMECLASS.xmas.xmasMisc.nieveHoliday() && flags[kFLAGS.NIEVE_STAGE] == 3 && player.hasKeyItem("Carrot") < 0) {
        kGAMECLASS.xmas.xmasMisc.findACarrot();
        return;
    }*/
    //Free Isabella Milkings!
    /*if (player.hasCock() && flags[kFLAGS.FOUND_ISABELLA_AT_FARM_TODAY] == 0 && flags[kFLAGS.ISABELLA_MILKED_YET] < 0 && kGAMECLASS.isabellaFollowerScene.isabellaFollower() && flags[kFLAGS.ISABELLA_MILK_COOLDOWN] == 0 && rand(2) == 0) {
        kGAMECLASS.isabellaFollowerScene.findIzzyMilking();
        return;
    }*/
    //Meet Marble First Time
    /*if (gameFlags[MARBLE_MET] <= 0 && gameFlags[NO_MORE_MARBLE] <= 0) {
        MarbleScene.encounterMarbleInitially();
        doNext(Camp.returnToCampUseOneHour);
        return;
    }*/
    //Meet kelt 1st time
    if (rand(2) == 0 && gameFlags[KELT_MET] <= 0 && gameFlags[KELT_DISABLED] <= 0) {
        KeltScene.keltEncounter();
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    //In withdrawl odds are higher.
    /*if (player.findStatusEffect(StatusEffects.NoMoreMarble) < 0 && player.findStatusEffect(StatusEffects.MarbleWithdrawl) >= 0) {
        if (player.statusEffectValue(StatusEffects.Marble, 3) == 1) MarbleScene.addictedEncounterHappy();
        else MarbleScene.encounterMarbleAshamedAddiction();
        return;
    }*/
    var explore = rand(3);
    //[JOG]
    if (explore == 0) {
        displaySprite("whitney");
        outputText("You run around the farm, keeping an eye for any monsters or oddities around Whitney's property. Eventually the she-dog joins you, and the two of you have a good time pushing your speed to its limits. ");
        //Less than 30 speed (+2 speed)
        if (player.spe < 30) {
            player.modStats("spe", 2);
            outputText("Whitney easily outpaces you, leaving you so far behind that she laps around the farm twice for each pass you make.");
        }
        //Less than 50 speed (+1 speed)
        else if (player.spe < 50) {
            player.modStats("spe", 1);
            outputText("Whitney is still faster than you, and manages to get far enough ahead of you to disappear from time to time.");
        }
        //Less than 70 speed (+.75 speed)
        else if (player.spe < 70) {
            player.modStats("spe", .75);
            outputText("Whitney and you are evenly matched, and the two of you run together for a while, each pushing yourself harder in an effort to best the other.");
        }
        //Else (+.5 speed)
        else {
            player.modStats("spe", .5);
            outputText("Whitney falls behind, unable to cope with your speed as you tear around the farm.");
        }
        outputText("<br><br>Afterwards, the both of you lie back against a tree, panting heavily and exchanging pleasantries. Once you've both had a chance to rest, she bids you farewell and returns to her labors, leaving you to journey home to camp.");
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    //Other stuff
    if (explore == 1) {
        outputText("After wandering around for a while, you find yourself atop a slight rise looking out over the farm and the distant lake. Despite the corruption you know is slowly consuming this land, being here now makes you feel so at peace you wish it could go on forever.");
        player.modStats("cor", -rand(3));
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    //Cows
    if (explore == 2) {
        outputText("Your explorations take you to the cow pasture. There's no bull here, so the cows are all placidly grazing, building up milk for Whitney to gather. One turns to face you, and you get the odd feeling that it's trying to tell you something.<br><br>");
        //[if have a horse dick and rape-high Lust]
        if (player.horseCocks() > 0) {
            outputText("Unbidden, the notion that a cow-slit would probably feel pretty good wrapped around your horse-prick flickers through your mind. ");
            //[if high corruption]
            if (player.cor > 60) outputText("It makes you smile.");
            if (player.cor < 30) outputText("It disgusts you.");
            //[else/mid-corruption]
            else if (player.cor <= 60) outputText("You aren't sure how you feel about that.");
            //[continue paragraph condition]
            outputText(" It for certain would get Whitney chasing you off with a pitchfork.<br><br>");
            player.changeLust(10);
        }
        //[if no horse dick, a deep cow or horse vag, and in heat]
        else if (player.inHeat) {
            outputText("Maybe it wants a bull? You do, one with long, thick dick-meat to satisfy your starving fuck-hole...<br><br>");
            player.changeLust(15);
        }
        //- [if no dick, not in heat, but overfull with milk]
        else if (player.biggestLactation() >= 2) {
            outputText("\"<i>Maybe she wants to be milked?</i>\" you think. You certainly do.<br><br>");
            player.changeLust(3);
        }
        outputText("Shaking your head, you clear your thoughts and turn away from the pasture. Cows don't have your problems.");
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    //[NOTHING]
    else {
        outputText("You wander around, unable to find anything entertaining on this patch of rural bliss.");
        doNext(Camp.returnToCampUseOneHour);
    }
}

Places.Farm.workFarm = function() {
    clearOutput();
    //In withdrawl odds are higher.
    /*if (player.findStatusEffect(StatusEffects.NoMoreMarble) < 0 && player.findStatusEffect(StatusEffects.MarbleWithdrawl) >= 0) {
        if (player.statusEffectv3(StatusEffects.Marble) == 1) MarbleScene.addictedEncounterHappy();
        else MarbleScene.encounterMarbleAshamedAddiction();
        return;
    }*/
    //1/3 chance of marblez
    /*if (rand(3) == 0 && gameFlags[NO_MORE_MARBLE] == 0 && gameFlags[MARBLE_MET] > 0) {
        //Rapez Override normal
        if (gameFlags[MARBLE_RAPE_ATTEMPTED] >= 0 || gameFlags[MARBLE_WARNING] == 3) {
            MarbleScene.marbleAfterRapeBattle();
            gameFlags[NO_MORE_MARBLE] = 1;
            return;
        }
        //Angry meeting
        if (gameFlags[MARBLE_WARNING] == 1) {
            MarbleScene.marbleWarningStateMeeting();
            return;
        }
        if (gameFlags[MARBLE_MET] > 0) {
            //Pre-addiction events(explore events take 1 hour, working ones take 3)
            if (player.statusEffectv3(StatusEffects.Marble) == 0) {
                marbling = rand(2);
                //Help out Marble, version 1 (can occur anytime before the player becomes addicted):
                if (marbling == 0) MarbleScene.helpMarble1();
                //Help out Marble, version 2 (can occur anytime before Marble knows about her milk):
                if (marbling == 1) MarbleScene.helpMarble2();
                return;
            }
            else {
                if (player.findPerk(PerkLib.MarbleResistant) >= 0) {
                    //(work with Marble when helping)
                    MarbleScene.postAddictionFarmHelpings();
                    return;
                }
                if (player.statusEffectv3(StatusEffects.Marble) == 1) {
                    if (player.findStatusEffect(StatusEffects.MarbleWithdrawl) >= 0)
                        marbling = 0;
                    else
                        marbling = 1;
                    //While Addicted Events type 1 (Marble likes her addictive milk):
                    if (marbling == 0) MarbleScene.addictedEncounterHappy();
                    //Exploration event while addicted (event triggered while addicted, but not suffering withdrawal):
                    else MarbleScene.marbleEncounterAddictedNonWithdrawl();
                    return;
                }
                else {
                    if (player.findStatusEffect(StatusEffects.MarbleWithdrawl) >= 0) marbling = 0;
                    else marbling = 1;
                    //While Addicted Events type 2 (Marble is ashamed):
                    if (marbling == 0) MarbleScene.encounterMarbleAshamedAddiction();
                    //Exploration event while addicted (event triggered while addicted, but not suffering withdrawal):
                    else MarbleScene.marbleEncounterAddictedNonWithdrawlAshamed();
                    return;
                }
            }
        }
    }*/
    //25% chance of stable mucking
    if (rand(4) == 0) {
        displaySprite("whitney");
        outputText("You find Whitney getting a scythe out of her tool shed. \"<i>Do you know how to muck out a stable?</i>\" she asks when you offer to help. You admit that you did a lot of that while growing up in your village. After passing you a rake, shovel, and pitchfork, she leads you to the milking barn.");
        outputText("  The first thing that hits you is the smell, a mingling of sweat, milk, droppings, and rotting hay. There are also probably some cows in Whitney's herd ready for breeding.\n\n");
        outputText("Opening the door to one of the empty stalls, Whitney says, \"<i>I don't get to them as often as I should. Anything you can do would help.</i>\"\n\n");
        outputText("You steel yourself, ignore your ");
        if (player.faceType == FACE_DOG) outputText("sensitive ");
        outputText("nose, and set to work.");
        //[Lust increase based on libido, degree of cow/mino features]
        player.changeLust("lus", player.cowScore() + player.minoScore());
        outputText("\n\nAn hour later you can stand it no more and exit the milking barn. Gulping down the fresher air and dragging the tools back to their shed, you admit to yourself that Whitney is a much harder worker and has a stronger constitution than you thought. You promise yourself you'll come back and help her out some more -- as soon as your nose recovers.");
        //always +1 str till 50, then 50% chance.
        if (player.str <= 50)
            player.modStats("str", 1);
        else
            player.modStats("str", rand(2));
        doNext(Camp.returnToCampUseOneHour);
    }
    else {
        displaySprite("whitney");
        outputText("You ask Whitney if she could use help with anything and she points towards the pepper fields, \"<i>Ya mind gathering up some peppers for an hour or two?  I'm gonna need a few for supper tonight.  I'll even let you keep the best one!</i>\"\n\n");
        outputText("You nod and borrow a basket, and set off towards the fields.  The next two hours are a blur of sweat and hard work as you prowl between the rows of plants, picking as many ripe red peppers as you can find.  When you finish, you drop the basket by Whitney's door, but not before taking your pepper.\n");
        //(75% chance normal pepper, 25% chance \"<i>rare</i>\" pepper)
        var pepper = rand(4);
        var itype;
        if (pepper <= 2) {
            itype = Items.Consumables.CaninePepper;
        }
        else {
            switch(rand(5)) {
                case 0:
                    itype = Items.Consumables.CaninePepperLarge;
                    break;
                case 1:
                    itype = Items.Consumables.CaninePepperDouble;
                    break;
                case 2:
                    itype = Items.Consumables.CaninePepperBlack;
                    break;
                case 3:
                    itype = Items.Consumables.CaninePepperKnotty;
                    break;
                case 4:
                    itype = Items.Consumables.CaninePepperBulby;
                    break;
            }
        }
        Inventory.takeItem(itype, Camp.returnToCampUseTwoHours);
    }
}