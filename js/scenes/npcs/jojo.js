JojoScene = [];

addToGameFlags(JOJO_MET, JOJO_CAMP, JOJO_CORRUPTION_STAGE, JOJO_RAPE_COUNTER, JOJO_MEDITATION_COUNTER, JOJO_TRAINING_COUNTER, JOJO_TRAINING_UNLOCKED, JOJO_NIGHT_WATCH);

function Jojo() {
    //Name and references
    this.a = "";
    this.name = "Jojo";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "he";
    this.himHer = "him";
    this.hisHer = "his";
    this.plural = false;
    this.battleDesc = "Jojo is an anthropomorphic mouse with immaculate white fur. Though he stands only four feet tall, he is covered in lean muscle and moves with incredible speed. ";
    if (gameFlags[JOJO_CORRUPTION_STAGE] >= 5)
        this.battleDesc = "He's naked, with a large tainted throbbing member bouncing at attention. A fuzzy sack with painfully large looking balls dangles between his legs.";
    else
        this.battleDesc = "He wears loose white clothes wrapped in prayer beads and tattered prayer papers.";
    //Core stats
    this.str = 35;
    this.tou = 40;
    this.spe = 65;
    this.inte = 55;
    this.lib = 15;
    this.sens = 40;
    this.cor = 15 * gameFlags[JOJO_CORRUPTION_STAGE];
    if (this.cor < 0) this.cor = 0; //Ensure it doesn't goes into negative if you proceed to unlock sex scenes.
    //Advancement
    this.level = 4;
    this.gems = rand(5) + 2;
    //Battle variables
    this.weapon.equipmentName = "fists";
    this.weapon.verb = "punch";
    this.armor.equipmentName = "robes";
    this.lustVuln = 0.9;

    //Sexual Characteristics
    this.createCock(7.5, 1.8);
    this.balls = 2;
    this.ballSize = 1;
    this.cumMultiplier = 1;
    this.hoursSinceCum = 1000;
    this.createBreastRow(0);
    this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
    this.ass.analWetness = ANAL_WETNESS_NORMAL;
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 3) {
        this.lust += 30;
        this.cocks[0].cockThickness += .2;
        this.cocks[0].cockLength += 1.5;
        if (player.gender == 1 || player.gender == 3) this.ass.analLooseness = 2;
    }
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 4) {
        this.lust += 40;
        this.cocks[0].cockThickness += .5;
        this.cocks[0].cockLength += 3.5;
        if(player.gender == 1 || player.gender == 3) this.ass.analLooseness = 3;
    }
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 5) {
        this.lust += 50;
        this.cocks[0].cockThickness += 1;
        this.cocks[0].cockLength += 5.5;
        this.str -= 20;
        this.tou += 30;
        this.cor += 10;
        this.HP += 60;
        if(player.gender == 1 || player.gender == 3) this.ass.analLooseness = 4;
        this.long = "Jojo is an anthropomorphic mouse with immaculate white fur. Though he stands only four feet tall, he is covered in lean muscle and moves with incredible speed. He's naked, with a large tainted throbbing member bouncing at attention. A fuzzy sack with painfully large looking balls dangles between his legs.";
    }

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = cleanupAfterCombat;
}
Jojo.prototype = new Creature();
Jojo.prototype.constructor = Jojo;

//------------
// COMBAT
//------------
Jojo.doAI = function() {
    switch(rand(4)) {
        case 0:
            if (gameFlags[JOJO_CORRUPTION_STAGE] >= 2) {
                Jojo.selfCorruption();
                break;
            }
        default:
            this.attack();
    }
    combatRoundOver();
}

Jojo.selfCorruption = function() {
    switch(gameFlags[JOJO_CORRUPTION_STAGE]) {
        case 2:
            outputText("Jojo looks lost in thought for a moment, and fails to attack. ");
            break;
        case 3:
            outputText("Jojo blushes as he fights you, distracted by a stray thought. You think you see a bulge in the loose cloth of his pants. ");
            break;
        case 4:
            outputText("Jojo stumbles, shakes his head, and pulls one of his hands away from the stiff tent in his pants. ");
            break;
        default:
            outputText("Jojo frantically jerks his " + monster.cockDescriptShort(0) + ", stroking the " + monster.cockDescriptShort(0) + " as it leaks pre-cum at the sight of you. ");
    }
    monster.changeLust(4 * (gameFlags[JOJO_CORRUPTION_STAGE] - 1));
    if (monster.lust >= monster.maxLust()) {
        return;
    }
    else if (monster.lust >= 85)
        outputText("The mouse is panting and softly whining, each movement seeming to make his bulge more pronounced. You don't think he can hold out much longer. ");
    else if (monster.lust >= 70)
        outputText("The mouse is having trouble moving due to the rigid protrusion from his groin. ");
    else if (monster.lust >= 60)
        outputText("The mouse's eyes constantly dart over your most sexual parts, betraying his lust. ");
    else if (monster.lust >= 50)
        outputText("The mouse's skin remains flushed with the beginnings of arousal. ");
}

//------------
// UTILS
//------------
JojoScene.jojoSprite = function() {
    displaySprite("jojo"); //Currently, no tentacle variant.
}

JojoScene.jojoCumQ = function() {
    return 25;
}

//------------
// SCENES
//------------
JojoScene.routeJojoEncounter = function() {
    //If Jojo is not encounterable.
    if (gameFlags[JOJO_CAMP] > 0 || flags[JOJO_DEAD_OR_GONE] > 0) {
        outputText("You enjoy a peaceful walk in the woods. It gives you time to think over the recent, disturbing events.");
        //Mod toughness
        if (player.tou < 50)
            player.modStats("tou", 0.5);
        //Mod intelligence
        if (player.inte < 50)
            player.modStats("int", 1);
        else if (player.inte < 75)
            player.modStats("int", 0.5);
        return;
    }
    //If Jojo is encounterable.
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 0) {
        gameFlags[JOJO_CORRUPTION_STAGE] = 1;
        if (player.cor < 25)
            JojoScene.lowCorruptionJojoEncounter();
        else
            JojoScene.highCorruptionJojoEncounter();
    }
    else if (gameFlags[JOJO_CORRUPTION_STAGE] == 1 || gameFlags[JOJO_CORRUPTION_STAGE] < 0) {
        JojoScene.repeatJojoEncounter();
    }
    else if (gameFlags[JOJO_CORRUPTION_STAGE] >= 2) {
        JojoScene.corruptJojoEncounter();
    }
}

JojoScene.lowCorruptionJojoEncounter = function() {
    clearOutput();
    JojoScene.jojoSprite();
    outputText("Tired of exploring the forest for the moment, you decide to head back to camp. Not feeling like taking the scenic route, you move to step through some bushes, but immediately your mind registers a yelp. The instant you move to look at the source of the noise, a white blur smacks you right on your head.");
    //Variant checks
    if (player.tou >= 50 && player.isBiped())
        outputText(" You take a few steps back, momentarily dazed. Shaking it off, you ready your [weapon] and assume a fighting stance.<br><br>");
    else if (player.tou < 50 && player.isBiped())
        outputText("The force of the blow knocks you flat on your [ass]. Shaking it off, you immediately climb to your feet and take on a fighting stance.<br><br>");
    else if (player.isTaur())
        outputText("The blow does little more than leave you momentarily dazed but isn’t enough to knock you over. You shake it off and ready your [weapon] as you assume a fighting stance.<br><br>");
    else // Was originally isNaga() only, but this will also cover Drider just as well
        outputText("You recoil as you are struck, but the force of the blow does little more than leave you momentarily dazed. You assume a fighting stance, ready to defend yourself.<br><br>");
    outputText("To your surprise you are greeted with the visage of a rather surprised mouse.<br><br>");
    outputText("“<i>Oh... erm... I’m sorry. You spooked me,</i>” he says apologetically, rubbing the back of his neck in embarrassment.<br><br>");
    outputText("Do you accept his apology?<br><br>");
    menu();
    doYesNo(JojoScene.acceptJojosApology, JojoScene.refuseJojosApology);
}
//Apology Choices
JojoScene.acceptJojosApology = function() {
    clearOutput();
    outputText("You forgive him for hitting you and apologize for spooking him yourself, prompting a relieved sigh.<br><br>");
    outputText("“<i>Thanks, it’s a relief to meet a friendly face,</i>” he says, his mouth breaking into a smile. “<i>Oh, where are my manners!</i>”<br><br>");
    JojoScene.lowCorruptionIntro();
}
JojoScene.refuseJojosApology = function() {
    clearOutput();
    outputText("With a smile you curl up a fist and knock the unsuspecting mouse morph upside the head, causing him drop his staff and rub the spot where you slugged him. As he looks up at you you give his angry expression a shrug, telling him that now the two of you are even.<br><br>");
    outputText("“<i>O-Kay</i>” The mouse says slowly, suddenly watching your movements very closely with those quick little eyes of his, “<i>But I guess it’s fair, no harm done right?</i>”<br><br>");
    outputText("It’s all water under the bridge to you now; after all you did slug him real good. The two of you agree to start over.<br><br>");
    JojoScene.lowCorruptionIntro();
}

//Intro
JojoScene.lowCorruptionIntro = function() {
    clearOutput();
    outputText("He extends a hand, which you gladly shake. “<i>My name is Jojo, pleased to meet you.</i>” You introduce yourself in kind.<br><br>");
    outputText("Now that you have the opportunity to take a good look at him, you notice that he is dressed in simple garbs reminiscent of a monk. A light-blue robe covers his flat chest, tied with a simple sash around his waist. His pants, similar to his robes, fit him snugly as well.<br><br>");
    outputText("His build is lithe, though you detect he isn’t weak by any means. His handshake is firm and transmits confidence; it’s clear that this mouse has trained well, though you can’t see any hint of muscles with his robes covering him. His hair is short and as white as his fur, you’d guess he’s an albino if not for his brown eyes. Surprisingly, he doesn’t seem to be carrying anything on his person, save for a necklace made of beads.<br><br>"); // Can't really presume that they're holy without knowing much more about him, rite?
    outputText("He smiles knowingly, “<i>Yes I am a monk, and yes this is a strange place for one such as I... this world was not always this way. Long ago this world was home to many villages, including my own. But then the demons came. I'm not sure if they were summoned, created, or simply a perversion of magic or breeding, but they came swarming out of the mountains to destroy everything in their path.</i>”<br><br>");
    outputText("Jojo sighs sadly, “<i>Enough of my woes. Though I " + (player.cor <= 5 ? "don't" : "barely") + " feel any corruption within you, it’s always best to be prepared. Would you care to join me in meditation?</i>”<br><br>");
    //Choices time!
    menu();
    addButton(0, "Meditate", JojoScene.meditateInForest); // OH GOD NO SEND HELP
    addButton(1, "Leave", Camp.returnToCampUseOneHour);
    if (player.cor > 10 && player.lust >= 33 && player.gender > 0 && flags[DISABLED_JOJO_RAPE] <= 0 && gameFlags[JOJO_CORRUPTION_STAGE] >= 0) addButton(4, "Rape", JojoScene.jojoRape, null, null, null, "Rape the poor monk mouse-morph." + (player.cor < 50 ? " Why would you do that?": ""));
}

JojoScene.highCorruptionJojoEncounter = function() {
    JojoScene.jojoSprite();
    outputText("While marvelling at the strange trees and vegetation of the forest, the bushes ruffle ominously. A bush seems to explode into a flurry of swirling leaves and movement. Before you can react you feel your " + player.feet() + " being swept out from under you, and land hard on your back.");
    outputText("<br><br>The angry visage of a lithe white mouse gazes down on your prone form with a look of confusion.");
    outputText("<br><br>\"<i>I'm sorry, I sensed a great deal of corruption, and thought a demon or monster had come to my woods,</i>\" says the mouse, \"<i>Oh, where are my manners!</i>\"");
    outputText("<br><br>He helps you to your feet and introduces himself as Jojo. Now that you have a good look at him, it is obvious this mouse is some kind of monk, dressed in robes, holy symbols, and draped with prayer beads.<br><br>He smiles knowingly, \"<i>Yes I am a monk, and yes this is a strange place for one such as I... this world was not always this way. Long ago this world was home to many villages, including my own. But then the demons came. I'm not sure if they were summoned, created, or simply a perversion of magic or breeding, but they came swarming out of the mountains to destroy everything in their path.</i>\"");
    outputText("<br><br>Jojo sighs sadly, \"<i>Enough of my woes. You are very corrupted. If you cannot be sufficiently purified you WILL become one of them in time. Will you let me help you?");
    //Choices time!
    menu();
    addButton(0, "Accept", JojoScene.meditateInForest);
    addButton(1, "Decline", Camp.returnToCampUseOneHour);
    if (player.cor > 10 && player.lust >= 33 && player.gender > 0 && flags[DISABLED_JOJO_RAPE] <= 0 && gameFlags[JOJO_CORRUPTION_STAGE] >= 0) addButton(2, "Rape", JojoScene.jojoRape, null, null, null, "Rape the poor monk mouse-morph." + (player.cor < 50 ? " Why would you do that?": ""));
}

//Repeat encounter
JojoScene.repeatJojoEncounter = function() {
    clearOutput();
    JojoScene.jojoSprite();
    menu();
    if (player.findStatusEffect(StatusEffects.Infested) >= 0) {
        outputText("As you approach the serene monk, you see his nose twitch, disturbing his meditation.<br><br>");
        outputText("\"<i>It seems that the agents of corruption have taken residence within the temple that is your body.</i>\", Jojo says flatly. \"<i>This is a most unfortunate development. There is no reason to despair as there are always ways to fight the corruption. However, great effort will be needed to combat this form of corruption and may leave lasting impressions upon you. If you are ready, we can purge your being of the rogue creatures of lust.</i>\"<br><br>");
        addButton(0, "Meditate", JojoScene.meditateInForest);
        addButton(1, "Purge", JojoScene.wormRemoval, null, null, null, "Request him to purge the worms from your body.");
        addButton(4, "Leave", Camp.returnToCampUseOneHour);
    }
    else {
        outputText("Jojo the monk appears before you, robes and soft white fur fluttering in the breeze. He asks, \"<i>Are you ready for a meditation session?</i>\"", false);
        doYesNo(JojoScene.meditateInForest, Camp.returnToCampUseOneHour);
    }
    if (player.gender > 0 && player.lust >= 33 && flags[DISABLED_JOJO_RAPE] == 0) addButton(2, "Rape", JojoScene.jojoRape, null, null, null, "Rape the poor monk mouse-morph." + (player.cor < 25 ? " Why would you do that?": ""));
}

JojoScene.corruptJojoEncounter = function() {
    JojoScene.jojoSprite();
    outputText("You are enjoying a peaceful walk through the woods when Jojo drops out of the trees ahead, ");
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 2) outputText("his mousey visage twisted into a ferocious snarl. \"YOU!\" he screams, launching himself towards you, claws extended.");
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 3) outputText("unsteady on his feet, but looking for a fight!");
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 4) outputText("visibly tenting his robes, but intent on fighting you.");
    if (gameFlags[JOJO_CORRUPTION_STAGE] == 5) outputText("panting and nude, his fur rustling in the breeze, a twitching behemoth of a cock pulsing between his legs.");
    startCombat(new Jojo());
}

JojoScene.meditateInForest = function() {
   displaySprite("jojo");
    clearOutput();
    outputText("Jojo smiles and leads you off the path to a small peaceful clearing. There is a stump in the center, polished smooth and curved in a way to be comfortable. He gestures for you to sit, and instructs you to meditate.<br><br>An indeterminate amount of time passes, but you feel more in control of yourself. Jojo congratulates you, but offers a warning as well. \"<i>Be ever mindful of your current state, and seek me out before you lose yourself to the taints of this world. Perhaps someday this tainted world can be made right again.</i>\"");
    player.modStats("str", 0.5, "tou", 0.5, "int", 0.5, "lib", -1, "cor", (-1 - player.countCockSocks("alabaster")));
    gameFlags[JOJO_MEDITATION_COUNTER]++;
    if (gameFlags[JOJO_MEDITATION_COUNTER] >= 5) {
        outputText("<br><br>Jojo nods respectfully at you when the meditation session is over and smiles. ");
        //Forest Jojo Eligible for Invite After Meditation but There's Trash in Camp -Z
        if (flags[FUCK_FLOWER_LEVEL] >= 4 && flags[FUCK_FLOWER_KILLED] == 0 && gameFlags[JOJO_MEDITATION_COUNTER] % 5 == 0) {
            //replaces 'Jojo nods respectfully at you [...] "It seems you have quite a talent for this. [...]"' invite paragraphs while Treefingers is getting slut all over your campsite
            //gives Small Talisman if PC never had follower Jojo or used it and ran from the fight
            if (player.hasKeyItem("Jojo's Talisman") >= 0) { //[(if PC has Small Talisman)
                outputText("Jojo smiles at you. \"<i>[name], well done. Your talent at focusing is undiminished. Regarding the other issue... you still have the item I gave you?</i>\"");
                outputText("<br><br>You hold up the talisman, and he nods. \"<i>Good. Stay safe and signal me with it if you need help.</i>\"");
            }
            else { //(else no Small Talisman)
                outputText("Jojo nods at you respectfully. \"<i>Well done today; your dedication is impressive. We could meditate together more often.</i>\"");
                outputText("<br><br>As much as you'd like to, you can't stay in the forest, and you can't invite him back with you right now. Reluctantly, you mention the stubborn, demonic godseed's presence on the borders of your camp. Jojo's eyebrows furrow in concentration.");
                outputText("<br><br>\"<i>Yes, that's a problem. Oh, that we did not have to resist the very spirit of the land! [name], take this. Use it to call me if the demon gives you trouble; I will come and render what aid I can.</i>\" The monk fishes in his robe and places a small talisman into your hand.<br><br>(Gained Key Item: Jojo's Talisman)");
                //get a small talisman if not have one
                player.createKeyItem("Jojo's Talisman", 0, 0, 0, 0);
            }
            doNext(Camp.returnToCampUseTwoHours);
            return;
        }
        else
            outputText("\"<i>It seems you have quite a talent for this. We should meditate together more often.</i>\"");
    }
    player.changeLust(-10, false);
    if (gameFlags[JOJO_MEDITATION_COUNTER] % 5 == 0) {
        outputText("<br><br>You ponder and get an idea - the mouse could stay at your camp. There's safety in numbers, and it would be easier for the two of you to get together for meditation sessions. Do you want Jojo's company at camp?");
        doYesNo(JojoScene.acceptJojoIntoYourCamp, Camp.returnToCampUseTwoHours);
        return;
    }
    else
        outputText("<br><br>He bows his head sadly and dismisses you.");
    doNext(Camp.returnToCampUseTwoHours);
}

JojoScene.acceptJojoIntoYourCamp = function() {
    JojoScene.jojoSprite();
    if (gameFlags[JOJO_RAPE_COUNTER] > 0 || flags[JOJO_MOVE_IN_DISABLED] == 1) {
        outputText("You offer Jojo the chance to stay at your camp, but before you can finish your sentence he shakes his head 'no' and stalks off into the woods, remembering.");
    }
    else {
        clearOutput();
        outputText("You offer Jojo the chance to stay at your camp. He cocks his head to the side and thinks, stroking his mousey whiskers.<br><br>\"<i>Yes, it would be wise.  We would be safer together, and if you like I could keep watch at night to keep some of the creatures away. I'll gather my things and be right there!</i>\"<br><br>Jojo scurries into the bushes, disappearing in a flash. Knowing him, he'll be at camp before you!");
        gameFlags[JOJO_CAMP] = 1;
    }
    doNext(Camp.returnToCampUseOneHour);
}

//Camp ahoy!
JojoScene.jojoCamp = function() {
    clearOutput();
    JojoScene.jojoSprite();
    /*if (flags[AMILY_MET_PURE_JOJO] == 0 && flags[AMILY_FOLLOWER] == 1 && amilyScene.amilyFollower()) {
        getGame().followerInteractions.amilyMeetsPureJojo();
        return;
    }
    if (flags[JOJO_RATHAZUL_INTERACTION_COUNTER] == 1 && rand(2) == 0) {
        getGame().followerInteractions.catchRathazulNapping();
        return;
    }*/
    if (player.findStatusEffect(StatusEffects.Infested) >= 0) { // Worms overrides everything else
        outputText("As you approach the serene monk, you see his nose twitch.<br><br>");
        outputText("\"<i>It seems that the agents of corruption have taken residence within the temple that is your body,</i>\" Jojo says flatly, \"<i>This is a most unfortunate development. There is no reason to despair as there are always ways to fight the corruption. However, great effort will be needed to combat this form of corruption and may have a lasting impact upon you. If you are ready, we can purge your being of the rogue creatures of lust.</i>\"<br><br>");
        JojoScene.jojoCampMenu();
        return;
    }
    if (player.cor > 10 && flags[JOJO_LAST_MEDITATION] != time.days) { //New "offer of help" menu
        if (player.cor >= 40)
            outputText("You walk toward the boulder where Jojo usually sits, and as soon as you're close Jojo approaches you with urgency. \"<i>By Marae! [name], we must do something! I feel the corruption surrounding you like a dense fog. We need to meditate or I’m going to lose you!</i>\" Jojo pleads.<br><br>");
        else
            outputText("You walk up to the boulder where Jojo usually sits, and see him sitting cross legged with his eyes closed. He seems to be deep in meditation, but when you approach his eyes open suddenly and he gets up appearing slightly distressed, “<i>Uh... [name], I can feel a bit of corruption within you. It is not much, but I think you should be concerned about it before it gets out of hand and you do something you might regret. If you want to I'd be happy to meditate with you as you rid yourself of it.</i>” he offers with a concerned look on his face.<br><br>");
        outputText("Do you accept Jojo's help?<br><br>");
        doYesNo(JojoScene.acceptOfferOfHelp, JojoScene.refuseOfferOfHelp);
        if (player.lust >= 33 && player.gender > 0 && gameFlags[JOJO_CORRUPTION_STAGE] >= 0) addButton(4, "Rape", JojoScene.jojoAtCampRape);
    }
    else { //Normal shit
        if (player.cor > 10)
            outputText("You walk up to the boulder where Jojo usually sits, and see him sitting cross legged with his eyes closed. He seems to be deep in meditation, but when you approach his eyes open suddenly and he gets up appearing slightly distressed, “<i>Uh... [name], " + (player.cor >= 40 ? "I feel the corruption surrounding you like a dense fog. We need to meditate more or I’m going to lose you!" : "I still can feel a bit of corruption within you. It is not much, but I think you should be concerned about it before it gets out of hand and you do something you might regret.") + " If you want to I'd be happy to meditate with you as you rid yourself of it.</i>” he offers with a concerned look on his face. <br><br>");
        else {
            switch (rand(3)) {
                case 0: outputText("You walk toward the boulder where Jojo usually sits, and see him cross legged with his eyes closed. At first he seems to be deep in meditation, but when you approach his mouth curls into a smile; he gets up and opens his eyes regarding you with a welcoming expression. “<i>Greetings [name], is there anything I can assist you with?</i>”<br><br>");
                    break;
                case 1: outputText("You walk up to the boulder where Jojo usually sits and find him a few paces behind it. He is standing and practicing his form, gracefully moving from one pose to the next. As you approach him you see his ears visibly perk and he turns his head towards you without breaking his stance, saying, “<i>Greetings [name], is there anything I can assist you with?</i>”<br><br>");
                    break;
                default: outputText("You find Jojo sitting cross-legged on a flat rock with his staff leaning against his shoulder, thinking. He looks to you and nods, \"<i>Greetings, " + player.short + ". Is there something I could do to assist you?</i>\"<br><br>");
            }
        }
        JojoScene.jojoCampMenu();
    }
}

JojoScene.jojoCampMenu = function() {
    //Normal Follower Choices
    if (gameFlags[JOJO_NIGHT_WATCH] > 0) {
        outputText("(Jojo is currently watching for enemies at night.)<br><br>");
    }
    menu();
    addButton(0, "Appearance", JojoScene.jojoAppearance, null, null, null, "Examine Jojo's appearance.");
    addButton(1, "Talk", JojoScene.talkMenu, null, null, null, "Discuss with him about topics.");
    if (flags[UNLOCKED_JOJO_TRAINING] > 0) addButton(2, "Train", JojoScene.apparantlyJojoDOESlift, null, null, null, "Join him in a training session.");
    addButton(3, "Meditate", JojoScene.jojoFollowerMeditate);
    addButton(4, "N.Watch: " + (gameFlags[JOJO_NIGHT_WATCH] > 0 ? "On" : "Off"), JojoScene.jojoDefenseToggle, null, null, null, (gameFlags[JOJO_NIGHT_WATCH] > 0 ? "Request him to stop guarding the camp.": "Request him to guard the camp at night."));
    if (player.findStatusEffect(StatusEffects.Infested) >= 0) addButton(5, "Purge", JojoScene.wormRemoval, null, null, null, "Request him to purge the worms from your body.");
    if (player.cor > 10 && player.lust >= 33 && player.gender > 0 && flags[DISABLED_JOJO_RAPE] <= 0) addButton(8, "Rape", JojoScene.jojoAtCampRape, null, null, null, "Rape the poor monk mouse-morph." + (player.cor < 40 ? " Why would you do that?": ""));
    if (player.lust >= 33 && gameFlags[JOJO_CORRUPTION_STAGE] <= -3) addButton(8, "Sex", JojoScene.pureJojoSexMenu, null, null, null, "Initiate sexy time with the mouse-morph.");
    addButton(14, "Leave", Camp.campFollowersMenu);
}

JojoScene.acceptOfferOfHelp = function() { //[Yes]
    clearOutput();
    outputText("<i>“Thank Marae. You’re much stronger than I, my friend... to hold so much corruption and still retain your will. But let us not tempt fate,”</i> he says before the two of you get to it.<br><br>");
    JojoScene.jojoFollowerMeditate();
}
JojoScene.refuseOfferOfHelp = function() { //[No]
    clearOutput();
    outputText("You assure Jojo you're fine, and that you'll consider his offer. “<i>But... I... we...</i>” he stammers. “<i>Alright, but please do not let the corruption get the better of you. You’re my friend and I couldn't bear to lose you to its vile influence.</i>” He recomposes himself and asks, “<i>So... is there anything I can assist you with?</i>”<br><br>");
    JojoScene.jojoCampMenu();
}

//Appearance
JojoScene.jojoAppearance = function() {
    clearOutput();
    //outputText(images.showImage("jojo-appearance"));
    outputText("Jojo is a white furred mouse-morph with dish-like ears and a small muzzle below a sometimes twitchy nose. He watches you with striking blue eyes.<br><br>");
    outputText("He's wearing pale blue monk robes that are form fitting yet loose enough to allow him to move freely if the need arises. He also wears prayer beads, a cloth sash that holds his robe close and baggy pants cover his legs all the way to his mouse-like footpaws; on the back of his pants a small hole is cut to allow his ropy pink tail freedom.<br><br>");
    outputText("It's hard to estimate due to his clothing, but you can tell he is pretty lean and doesn't have much in the way of muscle; which makes sense since his martials arts rely more on speed than strength anyways.<br><br>");
    outputText("His weapons of choice are his fists and a polished wooden staff he wields with practiced hands, right now it is tucked away in his bed roll.<br><br>");
    menu();
    doNext(JojoScene.jojoCamp);
}

//Talk
JojoScene.talkMenu = function() {
    menu();
    addButton(0, "Village", JojoScene.jojoTalkVillage, null, null, null, "Ask him about the village he was raised in.");
    addButton(1, "Monks", JojoScene.jojoTalkJoiningTheMonks, null, null, null, "Ask him about how and why he became a monk.");
    addButton(2, "MonksFall", JojoScene.jojoTalkFallOfTheMonks, null, null, null, "Ask him about the demise of the monks.");
    addButton(3, "Forest", JojoScene.jojoTalkForestConvo, null, null, null, "Ask him about how he ended up in the forest.");
    if (flags[TIMES_TALKED_WITH_JOJO] >= 4) addButton(4, "You", JojoScene.jojoTalkYourOrigin, null, null, null, "Tell him about Ingnam and your history.");
    if (flags[FACTORY_SHUTDOWN] > 0) addButton(5, "Factory", JojoScene.jojoTalkFactory, null, null, null, "Tell him about how you've shut down the factory.");
    if (flags[SAND_WITCHES_COWED] == 1 || flags[SAND_WITCHES_FRIENDLY] == 1 || flags[SAND_MOTHER_DEFEATED] == 1) addButton(6, "SandCave", JojoScene.jojoTalkSandCave, null, null, null, "Tell him about your encounter in the Sand Cave in the desert.");
    if (flags[UNLOCKED_JOJO_TRAINING] == 0 && flags[TIMES_TALKED_WITH_JOJO] >= 4) addButton(7, "Training", JojoScene.apparantlyJojoDOESlift, null, null, null, "Ask him if he's willing to train you.");
    //if (flags[MINERVA_PURIFICATION_JOJO_TALKED] == 1 && flags[MINERVA_PURIFICATION_PROGRESS] < 10) addButton(8, "Purification", minervaScene.minervaPurification.purificationByJojoPart1, null, null, null, "Ask him if he can exorcise the demonic parasite infesting Minerva.");
    //Sex button
    if (player.cor <= 10 && player.lust >= 33) {
        addButton(9, "Sex?", JojoScene.offerSexFirstTime, null, null, null, "Ask him if he's willing to have sex with you.");
        if (flags[TIMES_TALKED_WITH_JOJO] < 4) addButtonDisabled(9, "Sex?", "You should socialize with Jojo a bit more.");
        if (gameFlags[JOJO_RAPE_COUNTER] > 0) addButtonDisabled(9, "Sex?", "You've raped Jojo in the past, now you can't ask him out. Ya dun goofed.");
    }
    if (player.cor <= 10 && player.lust >= 33 && gameFlags[JOJO_CORRUPTION_STAGE] == -1) addButtonDisabled(9, "Sex?", "You need to spend more time with Jojo. <br><br>Talk sessions: " + flags[TIMES_TALKED_WITH_JOJO] + "/6 <br>Training sessions: " + flags[TIMES_TRAINED_WITH_JOJO] + "/10 <br>Meditation sessions: " + gameFlags[JOJO_MEDITATION_COUNTER] + "/10 <br>You must be pure enough and have sufficient lust as well.");
    if (player.cor <= 10 && player.lust >= 33 && flags[TIMES_TALKED_WITH_JOJO] >= 6 && flags[TIMES_TRAINED_WITH_JOJO] >= 10 && flags[TIMES_TALKED_WITH_JOJO] >= 10 && gameFlags[JOJO_CORRUPTION_STAGE] > -3) addButton(9, "Sex?", JojoScene.offerSexFirstTimeHighAffection, null, null, null, "You've spent quite the time with Jojo, maybe you can offer him if he's willing to have sex with you?"); //Will unlock consensual sex scenes.
    if (gameFlags[JOJO_CORRUPTION_STAGE] <= -3) removeButton(9);
    addButton(14, "Back", JojoScene.jojoCamp);
}

//Jojo’s Past, Village Convo
JojoScene.jojoTalkVillage = function() {
    clearOutput();
    flags[TIMES_TALKED_WITH_JOJO]++;
    outputText("You decide to ask Jojo about his village.<br><br>");
    outputText("He speaks softly with a smile on his face and in his voice, “<i>It was a small village near a large beautiful lake. We were peaceful people who laughed and trusted one another, just good simple folk you know?”<br><br>");
    outputText("“Most of the people of Belridge were either fishers or farmers with huge families that stayed near the village. There were a few hunters and a few craftsmen. We made enemies of no one and sought to do no harm to others,</i>” Jojo says, his smile fading.<br><br>");
    outputText("Before you can muster a reaction to his sadness, his fuzzy cheeks spread again as he looks up at you with bright eyes.<br><br>");
    outputText("“<i>My father was a fisherman. He was this calm, strong man with a lot of silver whiskers that always smelled like fish. I remember I used to go out on the boat with him and a few of my brothers and he’d always make sure to pick me up and put me on his shoulders... that is until I got too big. He always made everything look so easy, like the world was just there to shake his hand and make him smile. No one could cook seafood like he did, no one.</i>”<br><br>");
    outputText("“<i>Then there was my mother who was a little high strung, but no one could hug you more fiercely or love you more dearly. She was a small woman with a big soul who loved her family more than anything. She was a seamstress before she met my dad and was always the brightest one in the room, which is hard when you have seventeen loud children clamoring for your attention.</i>”<br><br>");
    outputText("“<i>Even with 19 people living under one roof my family wasn’t the biggest family in town, but there was always plenty work and plenty food. It was a nice simple existence and I am thankful for the time I had with everyone in that village,</i>” he finishes with a serene smile.<br><br>");
    if (player.cor < 40)
        outputText("Looks like Jojo's childhood wasn't so bad... you thank the mouse morph monk for sharing his treasured memories with you now that the conversation is over.<br><br>");
    else
        outputText("Looks like Jojo’s childhood wasn’t so bad. A little sickly sweet and void of wet pussies and drooling dicks but not bad. You tell him you’re happy to have him near you and he smiles for ear to ear, ignorant of your thoughts.<br><br>");
    doNext(Camp.returnToCampUseOneHour); // Dunno where exactly to kick back to, fuck it, back to camp yo!
}

//Joining the Monks convo
JojoScene.jojoTalkJoiningTheMonks = function() {
    clearOutput();
    flags[TIMES_TALKED_WITH_JOJO]++;
    outputText("You decide to ask Jojo why he decided to become a monk in the first place.<br><br>");
    outputText("He gives you a warm smile as he speaks, “<i>Well I grew up in a big family of 19 so when I was younger I was always the quiet one. I guess I was just introverted but being quiet meant that I didn’t always get a lot of attention. It didn’t bother me, quite the opposite actually, I enjoyed quiet introspection but with so many brothers and sisters it was next to impossible to get a quiet moment at home.</i>”<br><br>");
    outputText("“<i>So I would sneak out. My father understood but it drove my mother crazy. Whenever she noticed I had slipped away she would stop everything in the house and take my two oldest brothers to come find me. I never understood why it was such a big deal. We were in a small village near a prestigious monastery, we were safe. Parents let their kids go out and play and run and explore because everyone knew everyone but not my mom. She had to know where you were going, what you were doing and how long until you got back. I would’ve told her but saying I wanted to explore wasn’t a satisfactory answer.</i>”<br><br>");
    outputText("“<i>Whenever she found me she would yell for a bit and then hold me close like she’d just watched me dodge a charging rhinoceros. Whenever she asked why I did it I just told her the truth, it was too loud and crowded at home. After a few weeks of this she suggested a compromise. She said I could leave if I had one of my older brothers walk me to the temple and I stayed there where the clergy could see me and keep me safe and fed. Honestly I think my dad came up with the idea, he was always good at compromising and keeping the peace.</i>”<br><br>");
    outputText("“<i>The temple became very important to me. I read about the world, I spoke to the clergy and I sat and thought. I was enraptured with learning but I didn’t want to be a priest, I don’t know why... I guess it just didn’t appeal to me. When I first saw the monks visiting the temple, it was like dawn breaking. After that I waited until I was old enough to join and made the short pilgrimage to the Monastery of the Celestial Lotus.</i>”<br><br>");
    outputText("Jojo wears this quiet little smile as he finishes. Then he chuckles and says, “<i>Thank you for the memories, [name]. I enjoy our talks.</i>”<br><br>");
    doNext(Camp.returnToCampUseOneHour);
}

//Fall of the Monks convo
JojoScene.jojoTalkFallOfTheMonks = function() {
    clearOutput();
    flags[TIMES_TALKED_WITH_JOJO]++;
    outputText("You decide to ask Jojo if he'd be willing to tell you exactly what happened to the monks of his order.<br><br>");
    outputText("Jojo speaks with eyes downcast and a voice soft as feathers landing on fallen soldiers, “<i>Truthfully?... I don’t know exactly how it happened... or why... but my order was wiped out. Though I've looked for my brothers and sisters of the Celestial Lotus ever since then, I'm the only survivor, as far as I can tell. You see the demons attacked the monastery while I was away with one of the senior brothers. I was a mere novice and he was one of the more fun teachers so we lost track of time. The sun was setting and we were halfway back to the monastery when we saw what we thought was a huge column of smoke rising from the central building. When we got closer we saw the cloud for what it truly was, a billowing tower of those imps. We were spotted and several of them came flying at us - they crossed the distance far faster than we could have.</i>”<br><br>");
    outputText("“<i>Senior Brother Logray didn't hesitate - he leapt in front of me, staff twirling, shattering skulls and breaking limbs with each sweep. As he barred their path, he cried out to me to flee, to run for the safety of the village... and I did. Overwhelmed by the bitter-sweet stink of corruption wafting off the demons, I ran like a frightened little field mouse. I was a coward and I left my masters and all my friends to face the horde one mouse short.</i>”<br><br>");
    outputText("You watch as Jojo bows his head in shame for a moment. Yet when he looks back up there’s fire in his eyes.<br><br>");
    outputText("“<i>Never again....</i>”<br><br>");
    outputText("You try to comfort Jojo, telling him he couldn’t have made a difference being but a single mouse, but he waves you off. He tells you he is fine and thanks you for your concern.<br><br>");
    outputText("You can tell the story has affected him, but you’re surprised to hear the resolve in his voice and see the defiant strength in his eyes. Excusing yourself, you rise and leave him to do as he will.<br><br>");
    doNext(Camp.returnToCampUseOneHour);
}

//Forest Convo
JojoScene.jojoTalkForestConvo = function() {
    clearOutput();
    flags[TIMES_TALKED_WITH_JOJO]++;
    outputText("You think for a while and decide to ask Jojo how he ended up in the forest.<br><br>");
    outputText("He looks at you with suddenly tired eyes as he says, “<i>Well, I was training in the fields with one of the senior brothers when we saw the monastery was under attack. He sent me to the village to save me since I was a novice. I decided to rally the people there. I figured that I had ran like a coward, I wasn’t going to hide like one. It was the village where I was born and a home to many of my brothers and sisters, both figuratively and literally. I ran towards the village with everything I had, hoping to redeem my cowardice by returning with a militia of mice to aid the members of my order.</i>” His voice catches and he looks away, obviously struggling to form words.<br><br>");
    outputText("When you open your mouth to speak he raises his hand, asking for a moment with a single furry finger.<br><br>");
    outputText("“<i>I was too late. The demons had struck there first, then moved on to my monastery once they were finished. I spent hours searching the streets; every basement, every alley, every attic, every place I could think of where somebody might have hidden. Nothing but ruined buildings, smears of assorted tainted bodily fluids, and the occasional corpse - some demons, many more mice.</i>”<br><br>");
    if (player.cor < 35) {
        outputText("That's terrible... you can only imagine what you'd feel like if you returned to Ignam and saw it destroyed... your family, your friends... You put a hand on the monk's shoulder, intent on comforting him for the moment.<br><br>");
    }
    else if (player.cor >= 35 && player.cor <= 75) {
        outputText("Tough luck... thankfully your village still stands and you doubt any demons would dare attack on your watch... You feel like you should do something for the monk though, so you put a hand on his shoulder, comforting him for the moment.<br><br>");
    }
    else {
        outputText("Mice... must've been a village of wimps if a few demons could take them out... The monk is obviously distressed... maybe you should comfort him for the moment, if only to make him stop. You put a hand on his silent shoulder...<br><br>");
    }
    outputText("“<i>Thank you [name]. I was born there and seeing that...</i>” The monk falls silent again.<br><br>");
    if (player.cor < 35) {
        outputText("You slide an arm around Jojo’s shoulders in an attempt to reassure the monk. He manages a smile in response as he looks up at you. A single tear manages to slide down his muzzle as he says, “<i>Thank you, my friend.</i>”<br><br>");
    }
    else if (player.cor >= 35 && player.cor <= 75) {
        outputText("You try to further console the distressed monk by moving your hand to his back and giving him a few friendly taps. Jojo visibly pulls himself together. “Thank you, I’m alright now,” he tells you as he looks up and gives you a weak smile.<br><br>");
    }
    else {
        outputText("Seeing an opportunity, you wrap your arms around the monk as he silently tries to reign in his emotions. Holding him close you can feel the mouse morph’s lean muscles as you rub his back ‘accidentally’ going too low and feeling the base of his tail and the top of his tight little pert ass. As you ‘hug’ the mouse you make sure he doesn’t notice your true intentions and when you release him he actually thanks you.<br><br>");
        player.changeLust("lus", 10);
    }
    outputText("After you’ve comforted the monk you ask him what he did next.<br><br>");
    outputText("When he answers you his shoulders are squared and his voice has regained some of its former volume, “<i>I did what anyone looking at the shattered remains of their life would. I buried them. For the next few hours I took the time to lay each and every villager to rest before praying over them all. Then I went back to my monastery, praying with all my heart that they had managed to hold out, at least long enough to escape rather than to be captured and twisted into perverse shells of their former selves. Yet the monastery was another graveyard. I found many bodies there. Some were of the order but there were also countless imps and more than a few demons. The place was defiled with semen and milk reeking of corruption.</i>”<br><br>");
    outputText("You see anger in the monk’s eyes as he clenches his fists, “<i>They had utterly defiled the monastery and there was nothing I could do about it but honor its memory. I labored for what felt like days; burying the fallen; seeking out survivors; gathering what few items of my faith had escaped demonic desecration.</i>” He touches the large beads around his neck meaningfully.<br><br>");
    outputText("“<i>Then, I burned the monastery to the ground and set fire to all the fields... Since that day, I have eked out a meager existence in the wilderness; I study the texts I can, train my body as best I can, and seek to fortify my soul against demonic blandishments. Though I have technically progressed far along my path, with no master and only a pale echo of a fraction of my order’s texts at my disposal, I may never be a true master in my own right.</i>”<br><br>");
    outputText("He gives you an appraising look before looking away, “<i>Until I met you, [name], my only purpose had been to find the demons who destroyed my order and make them pay for the lives they took. That is why I was in the forest, I was in the middle of a harsh training regimen to increase my power and skill so that I may seek out those evil brutes who took everything I loved away from me... but vengeance is not the way of the Celestial Lotus. The Celestial doesn’t train bullies or assassins. Finding you and aiding in your quest to protect your village from these demonic creatures of perversion gave me new purpose and would make my departed brothers and sisters proud. I can’t honestly say I’ve given up on having my vengeance but... I will aid you in your quest first if for nothing more than to honor our friendship and honor the memory of the order and its teachings.</i><br><br>");
    outputText("Looking renewed and at peace despite the emotional storm you know must be raging within his tiny frame Jojo returns to what he was doing after thanking you for giving him new purpose.<br><br>");
    doNext(Camp.returnToCampUseOneHour);
}

//Yourself - Origin
JojoScene.jojoTalkYourOrigin = function() {
    clearOutput();
    flags[TIMES_TALKED_WITH_JOJO]++;
    outputText("As you start up a conversation with Jojo, the two of you speak at length about nothing really important or noteworthy, just small talk. That is until the monk brings up the subject of your background. You tell him about Ingnam and your family there, and the tradition of sending a champion through the portal. When he asks why anyone would choose to come here, you tell him how legends say that in years a champion wasn’t sent through the portal, terrible things happened to the village.<br><br>");
    outputText("“<i>That portal?</i>” Jojo asks, pointing to the very portal you stumbled through. You nod and he asks, “<i>So... what were you like in Ingnam?</i>”<br><br>");
    if (player.findPerk(PerkLib.HistoryAlchemist) >= 0) {
        outputText("You tell Jojo that you were the assistant to Riku, an alchemist residing in your village. He asks questions about your time with the alchemist and how you family felt about you taking up alchemy. You tell him that you were just about to go into advanced studies when it was announced that you were the next champion and all you really learned was how to increase the potency of certain types of items.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistoryFighter) >= 0) {
        outputText("You tell Jojo about how, growing up, you got into fights a lot. You name names and tell him why and how each of those little brats had got what was coming to them. You tell him how you had planned to join the village guard, but that became a pipe dream when it was announced that you were the next champion.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistoryHealer) >= 0) {
        outputText("You tell Jojo about how you spent a lot of your time at the side of Dende, the village healer. You talk about why you wanted to spend time with the older man as he looked after the sick and infirm and the skills you learned there. You let him know how you had just decided to train to become an official healer when you were announced to be the next champion.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistoryReligious) >= 0) {
        outputText("You tell Jojo about how you spent most of your time in the temple. He seems to really like hearing about the differences in religious practices between the Celestial Lotus and your village. You tell him about the various clergy of your hometown and how Sister Esther took time to teach you about meditation.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistoryScholar) >= 0) {
        outputText("You tell Jojo about your insatiable thirst for knowledge and how you spent a lot of time in school. You tell him the story about how you ‘convinced’ Mr. ");
        if (silly) outputText("Savin");
        else outputText("Sellet");
        outputText(" to let you read some of the rare books in his collection, skipping over how much begging and pleading was actually involved.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistorySlut) >= 0) {
        outputText("You tell Jojo about how you spent time... making friends. Jojo looks at you weirdly and when you tell him you had a lot of friends....<br><br>");
        outputText("“<i>That’s nice I guess [name] but didn’t you have aspirations beyond being, erm... popular?</i>” he questions.<br><br>");
        outputText("You laugh and tell him that you were just really good and making friends, instead of the truth about how much of a slut you actually were.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistorySlacker) >= 0) {
        outputText("You tell Jojo about how you spent your time basically relaxing with your fiends. You gloss over how big of a lazy bum you were with stories of the times you generally made a nuisance of yourself. You don’t tell him that you’re pretty sure you were chosen as the next champion in order to be gotten rid of.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistorySmith) >= 0) {
        outputText("You tell Jojo about how you spent your time training to become a blacksmith. Not knowing much about smithing he asks questions about the things you learned and you answer them to the best of your ability. To finish you describe the process of fitting armor in great detail and how you were going to start learning advanced techniques but were announced to be the next champion.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistoryWhore) >= 0) {
        outputText("You tell Jojo about how you spent a lot of your time... making money. When the naive little monk asks how, you just smile as you fondly remember the older whore, Poison, showing you the ropes and teaching the tricks of the trade. Regardless of how it made people think of you, it was certainly good money. In an attempt to hide some of the messier details of your past from the monk, you explain how you accepted... odd jobs for people, important work that not many others in the village would be willing to accept. He seems confused but shrugs it off.<br><br>");
    }
    else if (player.findPerk(PerkLib.HistoryFortune) >= 0) {
        outputText("You tell Jojo about how you're lucky and you've made quite a bit of money. When the monk asks how, you shrug and tell him it's just plain luck.<br><br>");
    }
    else {
        outputText("Somehow, you don’t seem to have a defined history perk... <b>Please report a bug!</b><br><br>");
    }
    outputText("Jojo smiles now that he has gotten to know you a little better. After a little bit more small talk, the two of you decide the conversation is over and part ways.<br><br>");
    doNext(Camp.returnToCampUseOneHour);
}

//Dungeon Convo: Factory
//Requirements: Completed Demon Factory -- flags[FACTORY_SHUTDOWN] > 0
JojoScene.jojoTalkFactory = function() {
    clearOutput();
    flags[TIMES_TALKED_WITH_JOJO]++;
    outputText("You tell Jojo about your having successfully found and stopped the demonic factory. You tell him how you found out the factory was there and how you defeated the demons inside. He seems impressed.<br><br>");
    if (flags[FACTORY_SHUTDOWN] == 2) {
        outputText("His ears perk at the news as you continue, telling him that you destroyed the factory controls, which permanently shut down the factory - but released an enormous quantity of corrupted fluids into the environment.<br><br>");
        outputText("Jojo cocks his head to the side as he considers his words carefully before speaking, “<i>I guess it seems like the right move. Permanently disabling the factory would not only deal a heavy blow to the demons, but also give the rest of us time to reclaim the forest... but I don’t know. If the release of fluids was as much as you say it was then there’s a chance that it’ll do more harm than good. I’ve seen what corruption does to this world and that much corrupted fluid flooding out all at once could really hurt our cause. I’m not saying it was the wrong thing to do, or lessening your accomplishment, but you have to be careful. The demons aren’t just powerful, they’re deceptive.</i>”<br><br>");
        outputText("You listen to the monk’s council and despite his concerns he seems genuinely happy to hear you’ve struck a blow against the demonic regime.<br><br>");
    }
    else {
        outputText("His ears perk at the news as you continue, telling him that you shut down the factory and destroyed the controls, for the sake of the surrounding environment.<br><br>");
        outputText("Jojo’s chest swells with pride as he looks at you with new eyes before saying, “<i>Wow [name], I don’t know what to say. I know it uprooted your life and took you away from the ones you love but I sincerely believe that the day you came through that portal was a good day for all of Mareth. I am proud of you and humbled by the fact that I can call you my friend.</i>” He rises and gives you a hug of fierce devotion and friendly affection before pulling away and saying, “<i>We’ll have to watch the factory though... the demons can’t be allowed to reopen that evil place.</i>”<br><br>");
    }
    outputText("Once the two of you are done discussing the demonic factory Jojo excuses himself to think on what you’ve told him.<br><br>");
    doNext(Camp.returnToCampUseOneHour);
}

//Dungeon Convo: Sand Cave
//Requirements: Completed Sand Witch Dungeon
JojoScene.jojoTalkSandCave = function() {
    clearOutput();
    flags[TIMES_TALKED_WITH_JOJO]++;
    outputText("You tell Jojo about your discovery of a cave that served as a base for the sand witches of the desert. You tell him about the whole ordeal, and he listens with wide eyes and jaw agape. When you tell him about meeting the Sand Mother Jojo gasps.<br><br>");
    outputText("“<i>Wait... so you mean to tell me that these sand witches a-are... allies of Marae? But they’re s-so... sexual.</i>” He seems genuinely confused, but you tell him that sex is part of nature after all, and that there is nothing wrong or shameful about it. He agrees with you, but decries the way the sand witches use their power.<br><br>");
    //if PC raped Sand Mother
    if (flags[SAND_WITCHES_COWED] == 1) {
        outputText("You describe your battle with the Sand Mother in an animated blow by blow and when you get to the end where you raped the Sand Mother you look at Jojo and... lie. You completely gloss over the fact that you sexually assaulted the Sand Mother because despite his interest he is a little naive and offended by the world of sexual conquest. He appraises your actions, ignorant of what actually occurred.<br><br>");
    }
    //if PC spoke to Sand Mother after Fighting her, FRIENDLY is the overall victory flag (theres a separate flag used to indicate you dun wanna be attacked by sandbitches in the desert anymore)
    else if (flags[SAND_WITCHES_FRIENDLY] == 1 && flags[SAND_MOTHER_DEFEATED] == 1) {
        outputText("You describe your battle with the Sand Mother in an animated blow by blow. When you get to the end you tell him about how reasonable the Sand Mother actually was after you beat her.<br><br>");
        outputText("Jojo’s head tils to the side as he says, “<i>Maybe the whole thing didn’t need to come to an altercation in the first place, a little diplomacy on both sides....</i>” He gives you a pointed look, “<i>Might have gone a long way.</i>”<br><br>");
    }
    //if PC just spoke to the Sand Mother
    else if (flags[SAND_WITCHES_FRIENDLY] == 1 && flags[SAND_MOTHER_DEFEATED] == 0) {
        outputText("You tell Jojo about how the Sand Mother spoke with you once you had battled your way to her. You tell him she was reasonable and how the whole thing was, in the end, a simple misunderstanding.<br><br>");
        outputText("He marvels at the way you handled the situation, “<i>Many would have expected her trying to talk to them to be a trap [name] and hurried to attack her but not you... that is... wow [name], you are truly a great individual.</i>”<br><br>");
    }
    //if PC met bath slut
    if (flags[MET_MILK_SLAVE] == 1) {
        outputText("You tell Jojo about the poor mind addled thing you found sitting in a tub of milk acting as a slave to the sand witch coven.<br><br>");
        outputText("He shudders like a child being told a scary story and asks, “<i>What did you do?</i>”<br><br>");
        //[if {PC hasn’t spoken to Sand Mother about Bath Slut yet}
        // Can't differentiate this
        // All I have is HAS_MET and HAS_RECRUITED effectively
        if (flags[MILK_NAME] == undefined) {
            outputText("You tell Jojo about how the Sand Mother told you the bath girl was unfit to be free and how they care for her because she can’t care for herself.<br><br>");
            outputText("Jojo reacts by putting his chin in his hands and thinking, “<i>Well... I guess that’s the human thing to do, especially since she doesn’t seem to be corrupted. Maybe these sand witch covens aren’t all bad, still hard to believe that they’re on our side though....” He looks up and shrugs, “<i>Any act of charity though is a good thing. I do hope the poor girl will be alright.</i>”<br><br>");
        }
        // [if {PC has bath slut in camp}
        else {
            outputText("As the question leaves his lips you give Jojo a confused look and, with a glance, direct his gaze toward " + flags[MILK_NAME] + ".<br><br>");
            outputText("He slaps his own forehead and says, “<i>Oh... yeah... right.</i>” Obviously embarrassed by not putting two and two together. He smiles good naturedly though, “<i>I don’t know I guess I just assumed you found some poor mind addled soul and decided to save her.</i>” Jojo says as he looks over at " + flags[MILK_NAME] + ".<br><br>");
            if (flags[MILK_SIZE] == 0) { //[if (bathSlutStage1 - unaltered)
                outputText("“<i>She’ll fare much better in our care than in the coven’s,</i>” he states with conviction.<br><br>");
            }
            else if (flags[MILK_SIZE] == 1) { //[if (bathSlutStage2 - HHH)
                outputText("“<i>She’s already much better than she was when she got here,</i>” he says with a grin.<br><br>");
            }
            else { //[if (bathSlutStage3 - DD)
                outputText("“<i>The coven wouldn’t have done what you’ve done for her. You’ve given her a much, much better life and even aided in fixing her condition, you truly are a champion, [name],</i>” he says, giving you a fond smile and a pat on the back.<br><br>");
            }
        }
    }
    // There's an untracked gap here, where the player doesn't accept a blessing from the Cum Witch, but there's no other existing tracking for this shit.
    //[if {PC met Cum Witch}
    if (flags[CUM_WITCH_DEFEATED] == 1 || flags[BEEN_BLESSED_BY_CUM_WITCH] == 1) {
        outputText("You tell Jojo about the cum witch, the herm witch responsible for inseminating the witches there, acting as a father to the others. When you do he scratches his ear, “<i>Like I said, I don’t get why sex is so overly important to these creatures but whatever, continue.</i>”<br><br>");
        //[if {PC allowed Cum Witches to increase their numbers}
        if (flags[MORE_CUM_WITCHES] == 1) {
            outputText("You tell him how you tried to remedy the current cum witch’s situation by asking the Sand Mother to make more cum witches.<br><br>");
            outputText("He whistles low, “<i>That’s a bold move [name]. It seems like they would want that though, it’d allow them to, er, you know... more often, and make more sand witches in the long run wouldn’t it?</i>” As the question sound rhetorical you plow on ahead.<br><br>");
        }
        //[if {PC allowed Cum Witches to rome}
        else if (flags[CUM_WITCHES_FIGHTABLE] == 1) {
            outputText("You describe to him how you convinced the Sand Mother to allow her cum witches to rome the desert along with the sand witches and he looks at you with astonishment, “<i>You are a generous spirit [name] and this Sand Mother doesn’t seem entirely unreasonable.</i>”<br><br>");
        }
        //[if {PC did nothing to help Cum Witch}
        else {
            outputText("“You tell Jojo that you’re actually done. He says, “<i>Oh... well that’s weird.</i>” and after an awkward silence, the two of you burst out laughing.<br><br>");
        }
    }
    outputText("Having concluded the conversation the two of you stand and Jojo gives you an appreciative pat on the shoulder, seeming more fond of you.<br><br>");
    doNext(Camp.returnToCampUseOneHour);
}

//Training
// Initiate first time as a talk option, and then display as a "base menu" option?
JojoScene.apparantlyJojoDOESlift = function() {
    clearOutput();
    //{First Session only}
    if (flags[UNLOCKED_JOJO_TRAINING] == 0) {
        flags[UNLOCKED_JOJO_TRAINING] = 1;
        outputText("You ask Jojo if he can teach you how to fight like a monk.<br><br>");
        outputText("Jojo considers you for a moment before saying, “<i>Yes I can teach you the forms, skills and techniques I was taught by my order. Plus...</i>” Jojo gazes off into the distance, his attention drifing for a moment before he continues, “<i>since I am all that is left, it is up to me to bestow this knowledge upon a worthy soul.</i>”<br><br>");
        if (player.cor >= (25 + player.corruptionTolerance())) {
            outputText("Jojo frowns, “<i>I am willing to teach you [name], when I can. However I am no master, therefore I am unworthy of taking a disciple. But as your friend, I will teach you what I know so that you may protect yourself. I believe our time would be better spent meditating. There is very little you can do with these techniques without first finding your center.</i>”<br><br>");
            // Kick back to previous menu
            menu();
            doNext(JojoScene.jojoCamp);
            return;
        }
        else {
            outputText("Jojo smiles, “<i>I am not a master, therefore I am unworthy of taking you on as a disciple... but as a friend I can teach you all I know. Whenever you are ready, just ask.</i>.”<br><br>");
            // Sounds like this should kick back to menu
            menu();
            doNext(JojoScene.jojoCamp);
            return;
        }
    }
    // {Repeatable Generic Training Session Stuffs}
    else {
        if (player.fatigue >= player.maxFatigue() - 60) {
            outputText("You ask the monk to continue your training; but he shakes his head.<br><br>");
            outputText("“<i>Not yet [name]. Your body must be fit and rested before our training sessions. Rest first, and come back to me later.</i>”<br><br>");

            menu();
            doNext(JojoScene.jojoCamp);
            return;
        }
        if (player.cor >= (25 + player.corruptionTolerance())) {
            outputText("You ask the monk to continue your training; but he shakes his head.<br><br>");
            outputText("“<i>I fear that your time would be better spend meditating before we continue your training. Would you like to do so now?</i>”<br><br>");

            menu();
            doYesNo(JojoScene.jojoFollowerMeditate, JojoScene.jojoCamp);
            return;
        }
    }
    flags[TIMES_TRAINED_WITH_JOJO]++;
    // {If everything is cool}
    if (player.findPerk(PerkLib.ControlledBreath) < 0 && player.findPerk(PerkLib.CleansingPalm) < 0 && player.findPerk(PerkLib.Enlightened) < 0) {
        outputText("Jojo gives you a bright cheerful smile, “<i>Alright [name]... let’s begin.</i>”<br><br>");
        outputText("Jojo’s teaching style periodically switches between lecture and sparring. When he explains a concept or a strike, he guides you through it before asking you to try it on him. He is patient but firm. He doesn’t punish you when you make a mistake, instead, corrects you and asks you to try again. He doesn’t allow you to give up, and his teaching style stops you from feeling frustrated.<br><br>");
        outputText("The entire session is intense, and each brief lecture or demonstration serves as a quick break to stop your body from giving out, and help you build endurance.<br><br>");
        outputText("By the end of the training session you are covered in sweat, your lungs heaving for breath.<br><br>");
        outputText("As you bow to Jojo he bows back and says, “<i>Go get some rest [name], you’ve earned it.</i>”<br><br>");
        player.changeFatigue(60, true);
        if (flags[TIMES_TRAINED_WITH_JOJO] == 5) {
            outputText("“<i>Breathing is key.</i>”<br><br>");
            outputText("Jojo’s constantly repeated words resonate within you as you realize you’ve learned to control your breathing. It takes you less time to rest than normal and you feel as though you are bursting with energy because of it. Your [fullChest]");
            if (player.biggestTitSize() == 0) outputText(" rises and falls");
            else outputText(" rise and fall");
            outputText(" smoothly even in the heat of battle. From now on you know you’ll recover more quickly.<br><br>");
            outputText("<b>(Perk Gained: Controlled Breath -</b> Increases rate of fatigue regeneration by 10%<b>)</b>");
            player.createPerk(PerkLib.ControlledBreath, 0, 0, 0, 0);
        }
    }
    //{after the PC has gained the controlled breath perk}
    else if (player.findPerk(PerkLib.ControlledBreath) >= 0 && player.findPerk(PerkLib.CleansingPalm) < 0 && player.findPerk(PerkLib.Enlightened) < 0) {
        outputText("Jojo gives you a big toothy grin, “<i>Alright [name]... let’s begin.</i>”<br><br>");
        outputText("Jojo switches up the way he is instructing you. Largely due to your increased endurance, the two of you spend more time moving through forms together and practicing strikes and maneuvers. When it comes time for a brief lecture, he breaks out one of the few scrolls he has from his order and tells you what he knows about the contents.<br><br>");
        outputText("Before too long, the two of you are up again and practicing forms and mock strikes, even sparring briefly from time to time. By the end of the intense training session you are covered in sweat... but so is Jojo, and neither of you are out of breath. As you bow to Jojo he returns the gesture and says, “<i>Go get some rest [name], you’ve earned it.</i>”<br><br>");
        player.changeFatigue(60, true);
        if (flags[TIMES_TRAINED_WITH_JOJO] == 10) {
            outputText("The repeated movements are slowly starting to sink in, your muscles becoming accustomed to Jojo’s training.<br><br>");
            outputText("By the end of the training session with the mouse, you think that you may have picked up something that might help against the denizens of this world.<br><br>");
            outputText("<b>(Ability Gained: Cleansing Palm -</b> A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.<b>)</b>")
            player.createPerk(PerkLib.CleansingPalm, 0, 0, 0, 0);
        }
    }
    //{after the PC has gained the Cleansing Palm attack}
    else if (player.findPerk(PerkLib.ControlledBreath) >= 0 && player.findPerk(PerkLib.CleansingPalm) >= 0 && player.findPerk(PerkLib.Enlightened) < 0) {
        outputText("Jojo gives you a big smile brimming with pride, “<i>Alright [Name]... let’s begin.</i>”<br><br>");
        outputText("Largely due to your increased endurance and improved technique the two of you spend more time sparring and dancing through the forms Jojo knows. When it comes time for a brief lecture, Jojo pants as he sits with you, taking a minute to regain his breath. Jojo’s lectures, instead of dealing with how to strike and defend oneself, deal with the nature of the soul. You learn much about individuality, willpower and determination and after the lecture the two of you meditate on what you’ve learned for a few silent moments.<br><br>");
        outputText("Then the two of you are back up, sweeping gracefully through forms and striking invisible enemies with fierce blows. By the end of the intense training session both you and Jojo are tired, having trained to both of your limits.<br><br>");
        outputText("As the two of you give each other decidedly shaky bows, Jojo says, “<i>Great effort [name], you are... wow... I need a rest. I’ve earned it.</i>” The two of you share a laugh and end you training.<br><br>");
        player.changeFatigue(60, true);
        if (flags[TIMES_TRAINED_WITH_JOJO] >= 16 && player.inte >= 70) {
            //{text shows after generic 16th technique training session}
            outputText("As you finish training you decide to meditate alone; returning to your " + Camp.bedDesc() + ", you close your eyes and begin to breathe. Then the world around you begins to sing.<br><br>");
            outputText("The camp is alive with the sounds of voices on the wind, of the ominous sizzling of the great scar between worlds that is the portal that brought you here. You feel open to the universe as if it were a lady in a dress sitting next to you, that you could easily reach out and touch. You feel liberated and free despite the fact that you are not moving a muscle. You are ready for anything but expecting nothing. You are neither thinking nor dreaming, you simply are.<br><br>");
            outputText("<b>(Perk Gained: Enlightened -</b> White magic threshold reduced. Meditation restores health. Grants the ability to meditate alone. You can still masturbate though.<b>)</b>");
            player.createPerk(PerkLib.Enlightened, 0, 0, 0, 0);
        }
    }
    //{after PC has gained the Enlightened Perk}
    else {
        outputText("Jojo smiles, “<i>In all honesty [name], I should be asking you to teach me, but I’ll do my best.</i>”<br><br>");
        outputText("There are no lectures. Neither you nor Jojo are masters, but as of right now, the two of you have exhausted the small store of knowledge available to you from the Celestial Lotus. You and Jojo instead practice to exhaustion, heaving and panting for breath, whilst still finding time to enjoy each others company.<br><br>");
        player.changeFatigue(60, true);
        //{each scene only shows if the follower is there}
        var enlightenedBlurbs = [];
        enlightenedBlurbs.push("You can hear Jojo’s feet move through the campsite as he heads toward his rock, seeking rest after your training session.")
        // Lookit all these different ways followers are tracked! fml. (Not if I refactor the shit outta CoC!)
        if (gameFlags[MARBLE_CAMP] > 0) enlightenedBlurbs.push("You can hear Marble humming a song to herself you can’t place.");
        //if (flags[AMILY_FOLLOWER] > 0) enlightenedBlurbs.push("You can hear Amily changing the bedding to her nest.");
        //if (emberScene.followerEmber()) enlightenedBlurbs.push("You can hear Ember cleaning" + emberScene.emberMF("his", "her") + "scales.");
        if (gameFlags[RATHAZUL_CAMP] > 0) enlightenedBlurbs.push("You can hear Rathazul experimenting with surprisingly nimble fingers.");
        //if (sophieFollower()) enlightenedBlurbs.push("You can hear Sophie breathing as she sleeps.");
        //if (flags[UNKNOWN_FLAG_NUMBER_00238] > 0) enlightenedBlurbs.push("You can hear Izma flipping through the pages of a book."); // TODO: (if Izmael gets put in) you can hear Izmael doing push ups to stay fit.
        //if (helScene.followerHel()) enlightenedBlurbs.push("You can hear Helia throwing her fists at nothing.");
        outputText(enlightenedBlurbs[rand(enlightenedBlurbs.length)] + "<br><br>");
    }
    //Boost attributes!
    if (player.str < 50) player.modStats("str", 0.5);
    if (player.str < 80) player.modStats("str", 0.5);
    if (player.inte < 50) player.modStats("inte", 0.5);
    if (player.inte < 80) player.modStats("inte", 0.5);
    menu();
    doNext(Camp.returnToCampUseOneHour);
}

JojoScene.jojoFollowerMeditate = function(doClear) {
    if (doClear) clearOutput();
    if (flags[JOJO_LAST_MEDITATION] == time.days) {
        outputText("Jojo smiles and meditates with you. The experience is calming, but it's so soon after your last session that you don't get much benefit from it.");
        player.changeLust(-30, true);
    }
    else {
        outputText("The mouse monk leads you to a quiet spot away from the portal and the two of you sit down, him cross-legged and you mimicking to the best of your ability, back to back. You close your eyes and meditate for half-an hour, centering your body and mind. Afterwards, he guides you through stretches and exercises to help keep your bodies fit and healthy.<br><br>When you are done, Jojo nods to you, and climbs back onto his rock, still thinking.");
        //Reduces lust
        player.changeLust(-30, false);
        var cleanse = -2; //Corruption reduction - faster at high corruption
        if (player.cor > 80)
            cleanse -= 3;
        else if (player.cor > 60)
            cleanse -= 2;
        else if (player.cor > 40)
            cleanse -= 1;
        player.modStats("cor", cleanse - player.countCockSocks("alabaster"));
        if (player.str < 45) player.modStats("str", 1); //Str boost to 45
        if (player.tou < 45) player.modStats("tou", 1); //Tou boost to 45
        if (player.spe < 75) player.modStats("spe", 1); //Speed boost to 75
        if (player.inte < 80) player.modStats("int", 1); //Int boost to 80
        if (player.lib > 0) player.modStats("lib", -1); //Libido lower to 15
        flags[JOJO_LAST_MEDITATION] = time.days;
        gameFlags[JOJO_MEDITATION_COUNTER]++;
    }
    doNext(Camp.returnToCampUseOneHour);
}

JojoScene.jojoDefenseToggle = function() {
    clearOutput();
    if (gameFlags[JOJO_NIGHT_WATCH] > 0) {
        gameFlags[JOJO_NIGHT_WATCH] = 0;
        outputText("You tell Jojo that you no longer need him to watch the camp at night. He nods, then speaks. \"<i>Alright. Please let me know if you require my help again.</i>\"");
    }
    else {
        gameFlags[JOJO_NIGHT_WATCH] = 1;
        outputText("You ask the monk if he could guard the camp for you at night. He smiles politely. \"<i>Certainly, [name].</i>\"");
    }
    doNext(JojoScene.jojoCamp);
}

JojoScene.wormRemoval = function() {
    clearOutput();
    outputText("\"<i>Excellent, young one,</i>\" Jojo continues. \"<i>Your dedication to purification is admirable. Relax and know that the parasites will leave you soon.</i>\"<br><br>");
    outputText("Jojo gets up and walks over to a backpack hidden in the bushes. He removes a lacquered box. He removes and combines a rather noxious combination of herbs, oils and other concoctions into a mortar and grinds it with a pestle. After a few minutes, he ignites the mixture and uses a feathered fan to blow the fumes over you. The smell of the mix is nauseating and repugnant. Your stomach turns and you fight the urge to vomit. Eventually, you are no longer able to resist and you purge yourself onto the ground. Cramping from your vomiting fits, you wrack with discomfort, which slowly builds to genuine pain. As the pain sets in, you feel a stirring deep in your crotch. The worms inside you are stirring and thus are compelling another unwanted orgasm. Unable to control your body, your cock explodes, launching cum and worms everywhere. Jojo begins fanning faster as he sees the worms leave your body.<br><br>");
    outputText("\"<i>Further endurance is needed, young one,</i>\" Jojo says. \"<i>The root of your problem must leave before you may pursue further purification. Healing is always twice as uncomfortable as the illness requiring attention.</i>\"<br><br>");
    outputText("Your body cramps up as you feel the fat worm struggle. You feel it pushing up your urethra, fighting to escape your fumigated body. The worm rapidly peeks from the end of your penis. With expedience, Jojo quickly grabs the worm and pulls it out of you, triggering one last orgasm. The monk casts the fat worm to the ground and strikes it dead with his staff.<br><br>");
    outputText("\"<i>The culprit has been exorcised and will no longer trouble you. Rest here for a while and join me in some meditation to heal your exhausted body and soul.</i>\"<br><br>");
    outputText("Being too tired for anything else, you join Jojo in meditation, which does much to relive you of your former woes.");
    //Infestation removed. HP reduced to 50% of MAX. Sensitivity reduced by -25 or reduced to 10, which ever is the smaller reduction.
    //Infestation purged. Hit Points reduced to 10% of MAX. Corruption -20.
    if (player.HP > (player.maxHP() * .5)) player.HP = Math.floor(player.maxHP() * .5);
    player.damageHunger(30);
    player.sens = 11;
    player.removeStatusEffect(StatusEffects.Infested);
    player.modStats("sen", -1, "cor", -15);
    player.orgasm();
    doNext(Camp.returnToCampUseOneHour);
}

//Consensual Jojo sex scenes!
JojoScene.offerSexFirstTime = function() {
    clearOutput();
    outputText("You ask Jojo if he would be willing to help you with a... personal problem.");
    outputText("<br><br>\"<i>Yes, of course! What is it, [name]?</i>\"");
    outputText("<br><br>You tell him that it has to do with certain... needs of yours. Desires that need slaking. You would much rather something consensual, with a friendly face, than to go out and offer yourself to the depraved interests of whatever corrupted being you find, or to engage in the uncomfortably demonic act of beating down and then raping one of the degenerates that roam this corrupted land.");
    outputText("<br><br>Jojo's eyes open wide in realization and he blushes so hard you can even see it through his white fur. \"<i>I... I'm flattered you would consider me for this... and I think you're really " + (player.femininity >= 50 ? "beautiful" : "handsome") + ", " + ((player.thickness >= 60 && player.tone < 60) ? "although you should work harder to keep yourself in shape." : "and you obviously keep yourself in good shape.") + " You're also nice to me and I do find you attractive but...</i>\"");
    outputText("<br><br>But...? You press. After all, isn't it better for the both of you to turn to each other to slake your lusts then to bottle things up or go to the monsters who roam this land?");
    outputText("<br><br>\"<i>I-I can't... I made a vow of chastity... I can't simply break my vows... please understand, [name]...</i>\" he says gazing at you apologetically, though you detect just the slightest hint of desire in his eyes before he averts his gaze and shakes his head of whatever thoughts could be plaguing it.");
    outputText("<br><br>You acknowledge his position and excuse yourself, but before you can leave he calls out to you. \"<i>Wait, [name]!</i>\" he says getting up and moving towards you. \"<i>While I can't really have sex with you, that doesn't mean I can't help you. If you want we could meditate to help you... umm... restrain your needs?</i>\" he suggests.");
    gameFlags[JOJO_CORRUPTION_STAGE] = -1;
    doYesNo(JojoScene.agreeToMeditate, JojoScene.noThanksToMeditate);
}
JojoScene.agreeToMeditate = function() {
    clearOutput();
    outputText("You decide that it would help you clear your head, and accept his offer. He motions for you to sit down beside him.");
    doNext(JojoScene.jojoFollowerMeditate);
}
JojoScene.noThanksToMeditate = function() {
    clearOutput();
    outputText("You shake your head, telling him that it'll be fine, and leave.");
    doNext(playerMenu);
    Time.advanceMinutes(25);
}

JojoScene.offerSexFirstTimeHighAffection = function() {
    clearOutput();
    outputText("You've been spending great time with Jojo. You've meditated with him, you've discussed with him and you've even trained with him! Now's the time to ask him out.");
    outputText("<br><br>You approach Jojo. \"Yes, [name]? What is it you need?\" Jojo asks. You ask him if he would like to have sex.");
    outputText("<br><br>\"<i>I'm sorry. I still can't break my vows of chastity,</i>\" he says apologetically.");
    gameFlags[JOJO_CORRUPTION_STAGE] = -2;
    menu();
    addButton(0, "Meditate", JojoScene.jojoFollowerMeditate);
    addButton(1, "Drop It", JojoScene.noThanksToMeditate);
    if (player.inte >= 60 && player.cor <= 10) addButton(2, "Confront", JojoScene.confrontChastity);
}

JojoScene.confrontChastity = function() {
    clearOutput();
    outputText("He cannot keep his vows forever. After all, he's missing out on the pleasure! He probably never knew how he would feel if he has a perfect cock that fits perfectly in his butthole or his cock that fits perfectly in a vagina or an anus. He should be fine as long as he stays faithful to you.");
    outputText("<br><br>\"<i>What about pleasure? " + (player.hasVagina() ? "How about potential mate like me? " : "") +"You're missing out!</i>\" you say. Jojo stares deeply into your eyes for a good moment.");
    outputText("<br><br>\"<i>Well... young one, you're right. You did spend time together with me. We've meditated, I've taught you some important lessons and now we're here,</i>\" Jojo says hesitantly but he starts to smile, \"<i>Let's have sex; I want to experience.</i>\"");
    outputText("<br><br>You smile back at Jojo, knowing that you can have sex with him.");
    outputText("<br><br><b>You have unlocked Jojo sex menu!</b>");
    if (silly) outputText("<b> Jojo can only learn four moves. Delete a move to learn a new one? Yes. 1... 2... 3... Poof! Jojo has forgot Chastity and learned Sex!</b>");
    flags[DISABLED_JOJO_RAPE] = 1;
    gameFlags[JOJO_CORRUPTION_STAGE] = -3;
    doNext(JojoScene.pureJojoSexMenu);
}

JojoScene.pureJojoSexMenu = function() {
    //Capacity
    var capacity = 40;
    if (flags[JOJO_ANAL_XP] < 10) capacity += (flags[JOJO_ANAL_XP] * 3);
    else capacity += 30; //Caps at 70.
    //Call for the purpose of cock size.
    startCombat(new Jojo());
    inCombat = false;
    //Begin
    clearOutput();
    outputText("You ask Jojo if he's in the mood for sex right now. ");
    if (flags[JOJO_SEX_COUNTER] < 3) outputText("Jojo looks into your eyes and says, \"<i>Only if you're going to be gentle.</i>\"");
    else outputText("Jojo looks into your eyes and says, \"<i>Yes, young one. Let's go.</i>\"");
    outputText("<br><br>Jojo escorts you to the forest and chooses the area with the most privacy.");
    outputText("<br><br>(What way should you have with Jojo?)");
    /*if (debug) {
        outputText("\n\n<b><u>Jojo's Debug Stats</u></b>");
        outputText("\n<b>Anal Capacity:</b> " + capacity);
        outputText("\n<b>Cum Production:</b> " + jojoCumQ() + "mL");
    }*/
    menu();
    if (player.hasCock() && player.cockThatFits(capacity) >= 0) addButton(0, "Anal Pitch", JojoScene.anallyFuckTheMouseButtSlut, null, null, null, "Fuck the monk mouse-morph's butt.");
    addButton(1, "Anal Catch", JojoScene.getAnallyFuckedByMouseYouSlut, null, null, null, "Have Jojo penetrate you anally.");
    if (player.hasVagina()) addButton(2, "Vaginal Catch", JojoScene.getVagFuckedByMouse, null, null, null, "Have Jojo penetrate you vaginally.");
    addButton(3, "Blow Him", JojoScene.suckJojosCock, null, null, null, "Suck Jojo's cock and get a taste of mouse cum!");
    addButton(14, "Nevermind", JojoScene.jojoCampMenu);
}

JojoScene.anallyFuckTheMouseButtSlut = function() {
    //Capacity
    var capacity = 40;
    if (flags[JOJO_ANAL_XP] < 10)
        capacity += (flags[JOJO_ANAL_XP] * 3);
    else
        capacity += 30; //Caps at 70.
    var x = player.cockThatFits(capacity);
    //Begin
    clearOutput();
    if (flags[JOJO_ANAL_XP] == 0) outputText("You finally make up your mind; you want to stuff your cock into that tight ass of his. " + player.clothedOrNaked("You remove your [armor] and ") + "Jojo hesitantly strips out of his robe, revealing his naked form.");
    else if (flags[JOJO_ANAL_XP] == 1) outputText("You decide that you want to stuff your cock into that tight ass of his again. " + player.clothedOrNaked("You remove your [armor] and ") + "Jojo hesitantly strips out of his robe, revealing his naked form.");
    else if (flags[JOJO_ANAL_XP] >= 2) outputText("You decide that you want to stuff your cock into that tight ass of his again. " + player.clothedOrNaked("You remove your [armor] and ") + "Jojo without hesitation strips out of his robe, revealing his naked form.");
    //First and second time
    if (flags[JOJO_ANAL_XP] < 3) {
        //Intro
        if (flags[JOJO_ANAL_XP] < 1) outputText("<br><br>\"<i>Just go gentle,</i>\" Jojo says with a whimpered look on his face as he gets down on all fours.");
        else outputText("<br><br>\"<i>Even though we've done it before, still, just go gentle please,</i>\" Jojo says with a whimpered look on his face as he gets down on all fours.");
        //Check anal tightness
        outputText("<br><br>You gently caress Jojo’s toned, quivering butt-cheeks and get a good glance at his anus. ");
        if (flags[JOJO_ANAL_XP] < 1) outputText("It’s a bit too tight to suddenly insert your " + player.cockDescript(x) + " into. You’ll have to stretch it out a little. You warn Jojo that you’ll be inserting your hand in first. Jojo feels like he was almost regretting this, but nods. You slick your fingers up with some saliva, and then gently start to probe Jojo’s pucker, trying to stretch it out a little. ");
        else outputText("You decide to test it out again. You warn Jojo that you’ll be inserting your hand in first. Jojo says, \"<i>If you have to.</i>\" You slick your fingers up with some saliva, and then gently start to probe Jojo’s pucker, testing out the looseness.");
        //Anal fingering and stretching
        outputText("<br><br>The second your digits invade Jojo’s bowels, his cock starts leaking precum. Jojo’s face kept flickering between pain and arousal. Jojo must really be sensitive. ");
        if (flags[JOJO_ANAL_XP] < 1) outputText("You stretch out Jojo’s bowels as much as you can and it should be just enough for insertion. ");
        else outputText("Hmm... his ass seems more stretched out compared to last time; you should be able to insert without worry. ");
        //Get lubed up and get your cock into Jojo's anus.
        outputText("<br><br>You spit on your hands and apply saliva evenly all over your " + player.cockDescript(x) + " to get it all lubed up. Deeming the lubrication sufficient, you let Jojo know that you’re going to start and you slowly slide your " + player.cockDescript(x) + " into Jojo’s butthole. " + (flags[JOJO_ANAL_XP] > 0 ? "His sphincter closes around you tightly. By Marae, he’s tight as ever!" : "By Marae, he's tight!") + " ");
        if (flags[JOJO_ANAL_XP] < 1) {
            outputText("<b>Jojo has lost his anal virginity!</b>");
            outputText("<br><br>You ask him if he’s all right. \"<i>Yes. It feels strange and it hurt a little... but it’s not bad! Keep going,</i>\" Jojo says. ");
        }
        else {
            outputText("<br><br>Jojo starts panting in arousal. You ask him is he’s ok. Jojo gives you a thumbs-up. \"<i>I’m... fine. Keep going.</i>\" ");
        }
        outputText("His cock reaches full erection, ready to cum at any time. You smile at him and start to pick up the pace while keeping it at comfortable level. As you feel his loosening up, you decide to go faster and harder. Jojo starts moaning in both ecstasy and pain, releasing a shrill squeak with every thrust.");
        //ORGASM!
        outputText("<br><br>Eventually, you can’t hold back any more and you unleash your seed right into his bowels. ");
        if (flags[JOJO_ANAL_XP] < 1) {
            outputText("Jojo orgasms as well, cumming all over the grass.");
            outputText("<br><br>Now spent, you lay next to Jojo. There’s small trail of cum leaking out of Jojo’s ass. \"<i>It’s a new experience. I’m willing to try it again,</i>\" Jojo says smilingly. You smile knowingly; you knew the two of you will do this often.");
        }
        else {
            outputText("Jojo starts pumping his hips in order to suck all the cum into his bowels. He, soon, orgasms as well, cumming all over the grass.");
            outputText("<br><br>Now spent, you lay next to Jojo. There’s small trail of cum leaking out of Jojo’s ass. You tell Jojo that he’s seems to really like anal. Jojo blushes. You laugh, telling your little butt slut that there more in store for him.");
        }
    }
    //Third+ time
    else {
        outputText("<br><br>Jojo gets on all fours in a hurry, sticking his firm ass in the air for you to see. Jojo is such an anal slut. Jojo starts stretching his butt cheeks apart, looking at you with an eager face.");
        //Check anal tightness
        outputText("<br><br>His eagerness makes your " + player.multiCockDescriptLight() + " hard. You gently caress Jojo’s toned, quivering butt-cheeks and get a good glance at his anus. You decide to test it out again. You warn Jojo that you’ll be inserting your hand in first. Jojo says, “Hurry up.” You smile at his response. You slick your fingers up with some saliva, and then gently start to probe Jojo’s pucker, testing out the looseness.");
        //Anal fingering and stretching
        outputText("<br><br>The second your digits invade Jojo’s bowels, his cock starts leaking precum. Jojo’s face kept flickering between pain and arousal. Jojo must really be sensitive. ");
        outputText("Hmm... his ass seems more stretched out compared to the second time; you should be able to insert without worry. ");
        //Get lubed up and get your cock into Jojo's anus.
        outputText("<br><br>You spit on your hands and apply saliva evenly all over your " + player.cockDescript(x) + " to get it all lubed up. Deeming the lubrication sufficient, you let Jojo know that you’re going to start and you slowly slide your " + player.cockDescript(x) + " into Jojo’s butthole. His sphincter closes around you tightly. By Marae, he’s tight as ever! ");
        outputText("<br><br>Jojo starts panting in arousal. You ask him is he’s ok. Jojo gives you a thumbs-up. \"<i>I’m... fine. Keep going.</i>\" His cock reaches full erection, ready to cum at any time. You smile at him and start to pick up the pace while keeping it at comfortable level. As you feel his loosening up, you decide to go faster and harder. Jojo starts moaning in both ecstasy and pain, releasing a shrill squeak with every thrust. ");
        //ORGASM!
        outputText("<br><br>Eventually, you can’t hold back any more and you unleash your seed right into his bowels. ");
        outputText("Jojo starts pumping his hips in order to suck all the cum into his bowels and he wraps his long tail around you to pull you closer. He, soon, orgasms as well, cumming all over the grass.");
        outputText("<br><br>Now spent, you lay next to Jojo. There’s small trail of cum leaking out of Jojo’s ass. You laugh, telling your little butt slut that there more in store for him.");
    }
    //The End
    if (flags[JOJO_SEX_COUNTER] >= 4) outputText("He plants a kiss on your lips.");
    outputText("<br><br>\After a good while of rest, " + player.clothedOrNaked("the two of you get redressed and", "Jojo gets redressed and the two of you") + " return to your camp.");
    player.modStats("cor", -1);
    flags[JOJO_ANAL_XP]++;
    flags[JOJO_SEX_COUNTER]++;
    player.orgasm();
    doNext(Camp.returnToCampUseOneHour);
}

JojoScene.getAnallyFuckedByMouseYouSlut = function() {
    var isVirgin = (player.looseness(false) == 0);
    clearOutput();
    outputText("You finally make up your mind; you want his mouse-cock in your [ass]. " + player.clothedOrNaked("You remove your [armor] and ") + "Jojo " + (flags[JOJO_SEX_COUNTER] < 4 ? "hesitantly " : "") + "strips out of his robe, revealing his naked form.");
    outputText("<br><br>\"<i>Get down on all fours and I can begin,</i>\" Jojo instructs. You nod and get down on all fours, presenting your [butt] to Jojo. His cock grows to full erection. \"<i>I'm going to need to get this lubricated first,</i>\" Jojo says. He spits on his hands and applies the saliva evenly across his cock.");
    outputText("<br><br>Jojo gently massages your [butt] to assure you that he's going to go gentle. \"<i>Here I come,</i>\" Jojo announces as he slowly slides his cock right into your [ass].");
    player.buttChange(monster.cocks[0].cockThickness, true);
    if (isVirgin) outputText(" \"<i>That's really tight; I'm going to enjoy your tightness while it lasts,</i>\" Jojo remarks. ");
    else if (player.looseness(false) < 2) outputText(" \"<i>That's tight,</i>\" Jojo says. ");
    else outputText(" \"<i>That's nice,</i>\" Jojo remarks. ");
    outputText("Slowly, he begins to rock his hips back and forth, placing his hands on your [hips] for support. ");
    outputText("<br><br>\"<i>Does it feel good, [name]?</i>\" Jojo asks. You reply that you wish he would go a little faster. Wanting to please you, Jojo start thrusting his erect cock into you farther and faster than before. You start moaning in pleasure as his penis hollows out your insides.");
    outputText("<br><br>\As the tension builds, Jojo keeps thrusting faster and faster. Not wanting him to be left out, you start moving in time with him and taking his cock up to the hilt. Jojo moans louder and shouts, \"<i>I’m going to cum!</i>\" Jojo rams you one last time hitting your prostate with all he’s got. He starts dumping his massive load into you" + (JojoScene.jojoCumQ() >= 750 ? ", filling your bowels" + (JojoScene.jojoCumQ() >= 1000 ? " and distending your belly" : ""): "") + ". With a tremendous shudder, you orgasm, your [asshole] clenching around his member, trying to wring it of all its delicious load. ");
    if (player.hasCock()) outputText("[EachCock] twitches with pleasure, soaking the ground beneath you with a small lake of cum. ");
    if (player.hasVagina()) outputText("Your [pussy] spontaneously " + (player.averageVaginalWetness() >= 4 ? "sprays" : "leaks") + " juices all over the ground. ");
    if (player.gender == 0) outputText("Your body rocks with ecstasy. ");
    outputText("<br><br>His cock slides out of your [ass] with a pop. Cum start dripping out of your [ass]. \"<i>That was... You were amazing, [name].</i>\" You smile at him while rubbing your inflated belly and tell him he wasn’t too bad himself. " + (flags[JOJO_SEX_COUNTER] >= 4 ? "You give Jojo a lingering kiss." : ""));
    outputText("<br><br>\After a good while of rest, " + player.clothedOrNaked("the two of you get redressed and", "Jojo gets redressed and the two of you") + " return to your camp.");
    player.modStats("sens", 1, "cor", -1);
    flags[JOJO_ANAL_CATCH_COUNTER]++;
    flags[JOJO_SEX_COUNTER]++;
    player.orgasm();
    player.slimeFeed();
    doNext(Camp.returnToCampUseOneHour);
}

JojoScene.getVagFuckedByMouse = function() {
    var isVirgin = (player.looseness(true) == 0);
    clearOutput();
    outputText("You finally make up your mind; you want his mouse-cock in your [vagina]. " + player.clothedOrNaked("You remove your [armor] and ") + "and Jojo " + (flags[JOJO_SEX_COUNTER] < 4 ? "hesitantly " : "") + " strips out of his robe, revealing his naked form.");
    if (flags[JOJO_VAGINAL_CATCH_COUNTER] == 0) {
        outputText("<br><br>You see that Jojo’s uncomfortable, so you lean back on your legs and pull open the lips of your [vagina], showing him your wet, hot insides. Jojo’s jaw drops and his cock gets fully erect. You tease Jojo by telling him to hurry up or you’ll go find some imps. Jojo’s snaps his jaws shut and says, \"<i>No. I promised to help you deal with your lust, so you can avoid corrupted creature. It’s just... well this is my first time.</i>\" You’re surprised, considering that virginity was impossible in a land like Mareth. You tell him you’d be honored if he gave you his virginity. Jojo looks at you for a second and nods. \"<i>You’re the only one who I can trust it with... I’m ready now.</i>\"");
        outputText("<br><br>Jojo hesitates at the entrance of your [vagina] and suddenly with a single stroke jams his dick deep into you. ");
        player.cuntChange(monster.cocks[0].cockThickness, true);
        outputText("Taken aback with his suddenness, you clench your muscles so tight that Jojo’s dick becomes stuck inside you. Jojo howls in pain and pleasure. You scold Jojo for his reckless action, but secretly you’re pleased that he took the initiative. You instruct Jojo to start slow and to go faster over time. Jojo nods and smiles nervously. You say don’t worry, you’ll guide him.");
        outputText("<br><br>You relax and let Jojo gently work his pace. His erect cock slides in and out out of your [vagina] smoothly. So far, so good. Jojo starts picking up the pace. You can’t stop the moans of ecstasy from coming out of your mouth and that seemed to encourage Jojo to further exertions. He started ramming your cervix as if he wanted to invade your womb. You didn’t bother trying anymore, you let loose screams of pleasure. Jojo seemed to be near the end of his stamina because he started to slow down. He shouts, \"<i>I’m going to cum!</i>\" You hook your legs behind Jojo’s back to lock him in place. Jojo’s cock was right next to the entrance of your womb. When Jojo cummed, the force of his ejaculation pierces your womb and stuffs it full of hot mouse cum. " + (JojoScene.jojoCumQ() >= 750 ? "His orgasm seems to never end and he continues to stuff your womb. " + (JojoScene.jojoCumQ() >= 900 ? "Excessive mouse-spunk spills out of your [pussy]. Gods, that was intense!" : "") : ""));
        outputText("<br><br>You orgasm at the same time, spraying girlcum all over Jojo" + (player.hasCock() ? "; [eachCock] let loose a cum shower, drenching your belly and thighs" : "") + ". Losing strength in your limbs, you release Jojo. Jojo falls back on the grass, panting. \"<i>That was… That was amazing… We are going to do this again, aren’t we?</i>\" You smile at him and nod, thinking privately that if he’s this good as a virgin, how good he’ll be when you’re through with him.");
    }
    else if (flags[JOJO_VAGINAL_CATCH_COUNTER] == 1) {
        outputText("<br><br>You see that Jojo’s still a little uncomfortable, so you lean back on your legs and pull open the lips of your [vagina], showing him your wet, hot insides. Jojo’s cock gets fully erect. With just a little hesitation, he gets into position in front of you. You’re impressed by Jojo’s growth. Soon he’ll be able to fuck you with no hesitation whatsoever. While you were musing the change in Jojo, he had dipped his head down and started licking your [clit] with his warm, soft tongue. You shiver, brought almost to the edge of orgasming. ");
        outputText("<br><br>Embarrassed, you ask him where he learned that. He replies \"<i>I heard about something called foreplay. Apparently I have to make you wet enough before I stick it in you or it will hurt you.</i>\" Impressed, you relax and let him continue his ministrations. After a while Jojo says \"<i>I think it’s wet enough now, so there shouldn’t be any pain this time.</i>\" and with that, he penetrates your [vagina] with a single stroke. ");
        player.cuntChange(monster.cocks[0].cockThickness, true);
        outputText("<br><br>Jojo starts out slow, rocking his hips and gyrating to simulate you as much as possible. It’s hard to imagine that he was a virgin not too long ago. Gradually he speeds up, reaching further and further into you. You can’t stop the moans of ecstasy from coming out of your mouth and that seemed to encourage Jojo to further exertions. He started ramming your cervix as if he wanted to break your womb. You didn’t bother trying anymore, you let loose screams of pleasure. Jojo seemed to be near the end of his stamina because he started to slow down. He shouts, \"<i>I’m going to cum!</i>\" You hook your legs behind Jojo’s back to lock him in place. Jojo’s cock was right next to the entrance of your womb. When Jojo cummed, the force of his ejaculation pierces your womb and stuffs it full of hot mouse cum. " + (JojoScene.jojoCumQ() >= 750 ? "His orgasm seems to never end and he continues to stuff your womb. " + (JojoScene.jojoCumQ() >= 900 ? "Excessive mouse-spunk spills out of your [pussy]. Gods, that was intense!" : "") : ""));
        outputText("<br><br>You orgasm at the same time, spraying girlcum all over Jojo" + (player.hasCock() ? "; [eachCock] let loose a cum shower, drenching your belly and thighs" : "") + ". Losing strength in your limbs, you release Jojo. Jojo falls back on the grass, panting. \"<i>How’d I do?</i>\" You smile at him and say that if he kept fucking you like that, you might just avoid imps all together. He smiles, obviously happy to hear that.");
    }
    else if (flags[JOJO_VAGINAL_CATCH_COUNTER] >= 2) {
        outputText("<br><br>There was no need to excite him now; Jojo’s cock was already fully erect. With no hesitation, he gets into position in front of you. You’re impressed by Jojo’s growth. While you were musing the change in Jojo, he had dipped his head down and started licking your [clit] with his warm, soft tongue. You shiver, brought almost to the edge of orgasming. Jojo’s gotten pretty good with using that tongue of his. You’ll have to be careful or you’ll end up cumming before he does. After a while Jojo sticks his hand into your [vagina] and finding it wet enough says, \"<i>I’m sticking it in now,</i>\" and with a single stroke, penetrates your vagina. ");
        player.cuntChange(monster.cocks[0].cockThickness, true);
        outputText("<br><br>Jojo starts out slow, rocking his hips and gyrating to simulate you as much as possible. It’s hard to imagine that he was a virgin not too long ago. Gradually he speeds up, reaching further and further into you. You can’t stop the moans of ecstasy from coming out of your mouth and that seemed to encourage Jojo to further exertions. He started ramming your cervix as if he wanted to breach open. You didn’t bother trying anymore, you let loose screams of pleasure. Jojo just kept pounding you as if in a rut. His meager stamina was gone; he was a fucking machine now. Just when you were about to orgasm, he shouts, \"<i>I’m going to cum!</i>\" You hook your legs behind Jojo’s back to lock him in place. Jojo’s cock was right next to the entrance of your womb. When Jojo cummed, the force of his ejaculation pierces your womb and stuffs it full of hot mouse cum. ");
        outputText("<br><br>You orgasm at the same time, spraying girlcum all over Jojo" + (player.hasCock() ? "; [eachCock] let loose a cum shower, drenching your belly and thighs" : "") + ". Losing strength in your limbs, you release Jojo. Jojo falls back on the grass, panting. \"<i>I can’t wait to do that again.</i>\" You laugh and tease him by saying that this was supposed to be about satiating your lust, not his. Jojo blushes. You smile and tell him that you would let him fuck you anytime. He smiles, obviously happy to hear that. " + (flags[JOJO_SEX_COUNTER] >= 4 ? "You give Jojo a lingering kiss." : ""));
    }
    outputText("<br><br>\After recovering, " + player.clothedOrNaked("the two of you get redressed and", "Jojo gets redressed and the two of you") + " return to your camp.");
    player.modStats("sens", 1, "cor", -1);
    flags[JOJO_VAGINAL_CATCH_COUNTER]++;
    flags[JOJO_SEX_COUNTER]++;
    //player.knockUp(PregnancyStore.PREGNANCY_JOJO, PregnancyStore.INCUBATION_MOUSE + 82, (jojoCumQ() < 2000 ? 100 - (jojoCumQ() / 50) : 60));
    player.orgasm();
    player.slimeFeed();
    doNext(Camp.returnToCampUseOneHour);
}

JojoScene.giveBirthToPureJojoBabies = function() {
    outputText("Pain shoots through you as they pull open your cervix forcefully, causing you to cry out involuntarily. Jojo comes running to you and says, \"<i>I sense something happening, is it time?</i>\" You scream, \"<i>No, I just like screaming in pain. YES, IT'S TIME!\" You grip the ground and pant and push as the pains of labor overwhelm you. Jojo grips your hand tightly and seemed to be saying some prayers. You feel comforted for a second by the prayers before the pain brings you back to reality. You feel your hips being forcibly widened by the collective mass of the creatures moving down your birth canal. You spread your legs wide, laying your head back with groans and cries of agony as the first child moves out of your womb, through your cervix, down and into your twat. Your lips part and, with a grunt, you expel the first child into Jojo’s waiting hand. Jojo looks at it was if it the most beautiful thing he’s ever seen. He holds it up to you so you can see your firstborn; it’s a little mouselet with large innocent eyes, even larger ears, a cute, sniffling nose, and a long slender pink tail. Jojo helps hold it to your [chest], where it eagerly takes hold of your [nipples] and starts to suckle. As it drinks, it starts to grow larger, and fur the same color as your own hair starts to cover its body. It quickly drinks its fill and then detaches, its father putting it aside, which is good, because by this time there’s another baby waiting for its turn... and another... and another...<br><br>");
    outputText("Soon, you are back to your old self again, lying down in exhaustion with Jojo sitting nearby, your many rambunctious offspring already starting to walk and play around you.<br><br>");
    if (flags[AMILY_FOLLOWER] == 1) {
        if (flags[JOJO_LITTERS_AMILY_REACTION_COUNTER] == 0) {
            outputText("Amily comes running to you and shouts \"<i>What happened, why were you screaming?</i>\" then looks at the litter of mice in awe and says, \"<i>[name], those aren't mine...who's are they.</i>\" Jojo bites his lips and says, \"<i>They're mine.</i>\" Amily just stares at Jojo for a second. Jojo trys to placate her \"<i>I was..I was just trying to help [name] and it just happened and...</i>\" He stops and Amily starts to laugh. \"<i>I haven't seen you so worried since we were mouselets... I'm fine with it. I'm glad you found someone as great as [name]. If you want, I can takes these kids to a secret settlement my kids have erected.</i>\" Jojo seemed surprised at Amily's lack of anger, but quickly joy transforms his face. \"<i>Thanks Amily. We been worried about where we can send them, and you have solved all our problems. Thank you.</i>\" Amily smiles and says, \"<i>It's the least I can do.</i>\"<br><br>");
            outputText("Exhausted, you start slipping into slumber. As your eyes close, you get a glimpse of Amily taking your litter away.<br><br>");
        }
        else {
            outputText("Soon, you are back to your old self again, lying down in exhaustion with Jojo sitting nearby, your many rambunctious offspring already starting to walk and play around you.<br><br>");
            outputText("As you lie resting from your exertions, you notice some of your kids from Jojo and Amily arrive and take away your newborns. They come by to say hi and catch up. As it got late, they had to say goodbye and leave. You watch them leave with a tiny bit worry gnawing inside. Your kids are so young, will they be ok? Jojo seems to sense our feeling and reassures you by squeezing your hand. You look up at him and slowly nod. They'll be fine; afterall, they're your kids.<br><br>");
        }
        flags[JOJO_LITTERS_AMILY_REACTION_COUNTER]++;
    }
    else
        outputText("\"<i>Look at them all. You... I never I would be able to have kids when my village was destroyed, but you made it happen. Thank you,</i>\" Jojo tells you sincerely. You ask him how they were going to raise them. Jojo frowned thoughtfully and says, \"<i>Hmm, you’re right...we can’t raise them here... I know of a place we can send them. It’s safe from corruption and it should do till we find better arrangements.</i>\" As sad as you were about sending your kids away, you agree with Jojo; it’s was for the best. You're too exhausted to keep your eyes open for long, but he promises watch them and even as you fall asleep, he’s gathering up your children and taking them away.<br><br>");
    flags[JOJO_LITTERS]++;
}

JojoScene.suckJojosCock = function() {
    clearOutput();
    if (flags[JOJO_BLOWJOB_XP] <= 0) outputText("You tell Jojo that you feel like it’s his turn to be pleasured. " + player.clothedOrNaked("You remove your [armor] and ") + "Jojo hesitantly drops his pants, revealing his sheathed cock.");
    else outputText("You tell Jojo that you want to have a taste of his dick today. " + player.clothedOrNaked("You remove your [armor] and ") + "Jojo drops his pants, revealing his flaccid, sheathed cock.");
    outputText("<br><br>You approach him and position yourself before him, contemplating how to begin. You decide to tease Jojo as much as possible. You wrap your tongue around the head of his cock and start tugging at his sheathe. Instead of pulling his sheath back with your hands, you tug at it with your mouth. The second the sheath gets pulled back, the heady scent of Jojo’s animal musk almost overwhelms you. You feel yourself getting warmer" + (player.gender > 0 ? ", " : "") + (player.hasCock() ? "your [cocks] leaking pre" : "") + (player.gender == 3 ? " and " : "") + (player.hasVagina() ? "your [pussy] leaking juices" : "") + ". Your hot breath excites Jojo’s cock into full erection.");
    outputText("<br><br>You lick your lips in anticipation. \"<i>Thank you for the meal,</i>\" you say as you start licking his shaft from the cock head all the way to the balls. The first thing that hits you is the taste. Jojo’s cock tasted like sweat and old cheese which, surprisingly, tasted arousing. Combined with the heady scent of musk, it took all your self-control not to pounce on him. ");
    outputText("<br><br>Jojo starts moaning around the time you got to his balls. When you look up, you notice some pre coming out. You let go of his wet balls and started lapping up his precum. It tasted salty, making a great appetizer. You start massaging Jojo’s balls to keep the precum coming. Unnoticed to you, Jojo had been slowly moving his hands behind you. He suddenly grabs hold of your [hair] and forces your head back all the way to his hilt. Surprised and almost choking, you try to force your head back, but Jojo holds you firmly. You look up at Jojo see him panting in arousal, his eyes unfocused. Damn, you pushed him too far. Oh well, you kind of like it rough anyway.");
    outputText("<br><br>Instead of resisting him, you start moving in time with him, deep-throating his tasty cock. Jojo start moaning louder and started rocking his hips back and forth rapidly. It felt like he was raping your throat. Jojo didn’t seem to be cumming anytime soon and you were getting impatient. You suddenly jab your finger into Jojo’s ass and stimulate his prostate. Panting, Jojo shouts, \"<i>I’m gonna cum!</i>\" and pull your head forward as much as possible. Hot cum came gushing out like a hose, instantly " + (JojoScene.jojoCumQ() >= 600 ? "distending" : "stuffing") + " your stomach. Jojo falls back, his cock spraying cum all over your [face] and running down your [fullchest]. " + (JojoScene.jojoCumQ() >= 900 ? "His orgasm seems to never end and he continues to cum for a good while." : ""));
    if (flags[JOJO_BLOWJOB_XP] <= 0)
        outputText("<br><br>Jojo collapses on his back, winded. When he comes up, he says, \"<i>I can’t feel my legs... I don’t know what came over me, sorry [name].</i>\" You rub your full belly and smile and tell him he’ll have to make it up to you. He asks “How, I’ll do anything.” You tell him that the next time they eat it’s his treat. You lean in close and tell him that you prefer mouse-spunk. Jojo blushes and you lean back and says with a smile, \"<i>Um... sure. Since I made a promise, I’ll have to fulfill it.</i>\"");
    else
        outputText("<br><br>Jojo collapses on his back, winded. When he comes up, you say that was delicious and to treat you next time as well. Jojo’s too tired to say anything, but smiles in response.");
    outputText("<br><br>\After a good while of rest, " + player.clothedOrNaked("the two of you get redressed and", "Jojo gets redressed and the two of you") + " return to your camp.");
    if (JojoScene.jojoCumQ() < 2500) player.refillHunger(JojoScene.jojoCumQ() / 25);
    else player.refillHunger(100);
    flags[JOJO_BLOWJOB_XP]++;
    flags[JOJO_SEX_COUNTER]++;
    player.modStats("lus", 20, "cor", -1);
    player.slimeFeed();
    doNext(Camp.returnToCampUseOneHour);
}