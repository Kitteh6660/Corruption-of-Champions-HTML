var monster = null;
var currentTurn = 0;
var currentRound = 0;

//------------
// ACTIONS
//------------
battleMenu = function() {
	clearOutput();
    outputText("<b>You are fighting " + monster.a + monster.refName + ".</b><br>");
	outputText(monster.battleDesc);
	outputText("<br><br><b><u>" + capitalizeFirstLetter(monster.name) + "'s Stats</u></b>");
	outputText("<br>Level: " + monster.level);
	outputText("<br>HP: " + monster.HP + " / " + monster.maxHP() + " (" + (Math.floor(monster.HP / monster.maxHP() * 1000) / 10) + "%)");
	outputText("<br>Lust: " + monster.lust + " / " + monster.maxLust());
	outputText("<br>Fatigue: " + monster.fatigue + " / " + monster.maxFatigue());
	refreshStats();
    //DEBUGGING code to check wins
    //player.HP = 100;
	hideUpDown();
	menu();
	addButton(0, "Attack", attack);
	addButton(1, "Tease", tease);
	addButton(2, "Spells", magicMenu);
    addButton(3, "Items", Inventory.inventoryMenu);
	addButton(4, "Run", flee);
    addButton(5, "P. Specials", physicalSpecials);
    addButton(6, "M. Specials", mentalSpecials);
    if (monster.refName == "sandtrap") addButton(7, "Climb", wait);
    else addButton(7, "Wait", wait);
    addButton(8, "Fantasize", fantasize);
    if (player.findStatusEffect(StatusEffects.Bind) >= 0) {
        menu();
        addButton(0, "Struggle", struggle);
        addButton(1, "Wait", wait);
    }
}

attack = function() {
	clearOutput();
	player.attack();
    combatRoundOver();
}

tease = function(justText) {
    //Default to false
    if (justText == undefined) justText = false;
    //Go on!
	if (!justText) clearOutput();
    //You can't tease a blind guy!
    if (monster.findStatusEffect(StatusEffects.Blind) >= 0) {
        outputText("You do your best to tease " + monster.a + monster.refName + " with your body. It doesn't work - you blinded " + monster.himHer + ", remember?<br><br>", true);
        return;
    }
    if (player.findStatusEffect(StatusEffects.Sealed) >= 0 && player.statusEffectValue(StatusEffects.Sealed, 2) == 1) {
        outputText("You do your best to tease " + monster.a + monster.refName + " with your body. Your artless twirls have no effect, as <b>your ability to tease is sealed.</b><br><br>", true);
        return;
    }
    if (monster.name == "Sirius, a naga hypnotist") {
        outputText("He is too focused on your eyes to pay any attention to your teasing moves, <b>looks like you'll have to beat him up.</b><br><br>");
        return;
    }
    //Proceed!
    teaseMain(justText);
    combatRoundOver();
}

flee = function(callHook) { //There are 4 states. Undefined means proceed to escape probability, null means return to battle menu, true if success, false if failure.
	clearOutput();
    //------------
    // PREEMPTIVE
    //------------
    var success = undefined;
    /*if (callHook && monster.onPcRunAttempt != null){
        monster.onPcRunAttempt();
        return;
    }*/
    if (inCombat() && player.findStatusEffect(StatusEffects.Sealed) >= 0 && player.statusEffectValue(StatusEffects.Sealed, 2) == 4) {
        outputText("You try to run, but you just can't seem to escape. <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b><br><br>");
        success = false;
    }
    //Rut doesnt let you run from dicks.
    if (player.inRut && monster.totalCocks() > 0 && player.HPRatio() > 0.25) {
        outputText("The thought of another male in your area competing for all the pussy infuriates you! No way will you run!", true);
        success = null;
    }
    if (monster.trap >= 0 && player.canFly()) {
        clearOutput();
        outputText("You flex the muscles in your back and, shaking clear of the sand, burst into the air! Wasting no time you fly free of the sandtrap and its treacherous pit. \"<i>One day your wings will fall off, little ant,</i>\" the snarling voice of the thwarted androgyne carries up to you as you make your escape. \"<i>And I will be waiting for you when they do!</i>\"");
        success = true;
    }
    if (monster.findStatusEffect(StatusEffects.GenericRunDisabled) >= 0/* || urtaQuest.isUrta()*/) {
        outputText("You can't escape from this fight!");
        success = null;
    }
    if (monster.findStatusEffect(StatusEffects.Level) >= 0 && monster.statusEffectv1(StatusEffects.Level) < 4) {
        outputText("You're too deeply mired to escape! You'll have to <b>climb</b> some first!");
        success = null;
    }
    if (monster.findStatusEffect(StatusEffects.RunDisabled) >= 0) {
        outputText("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
        success = null;
    }
    if (flags[UNKNOWN_FLAG_NUMBER_00329] == 1 && (monster.refName == "minotaur gang" || monster.refName == "minotaur tribe")) {
        flags[UNKNOWN_FLAG_NUMBER_00329] = 0;
        //(Free run away)
        outputText("You slink away while the pack of brutes is arguing. Once they finish that argument, they'll be sorely disappointed!");
        success = true;
    }
    else if (monster.refName == "minotaur tribe" && monster.HPRatio() >= 0.75) {
        outputText("There's too many of them surrounding you to run!");
        success = null;
    }
    /*if (inDungeon || inRoomedDungeon) {
        outputText("You're trapped in your foe's home turf - there is nowhere to run!<br><br>");
        success = false;
        return;
    }
    if (prison.inPrison && !prison.prisonCanEscapeRun()) {
        success = false;
        return;
    }*/
    //Attempt texts!
    if (monster.refName == "Marae") {
        outputText("Your boat is blocked by tentacles! ");
        if (!player.canFly())
            outputText("You may not be able to swim fast enough. ");
        else
            outputText("You grit your teeth with effort as you try to fly away but the tentacles grab your " + player.legs() + " and pull you down. ");
        outputText("It looks like you cannot escape. ");
        success = false;
    }
    if (monster.refName == "Ember") {
        outputText("You take off");
        if (!player.canFly()) outputText(" running");
        else outputText(", flapping as hard as you can");
        outputText(", and Ember, caught up in the moment, gives chase. ");
        success = undefined;
    }
    if (monster.refName == "lizan rogue") {
        outputText("As you retreat the lizan doesn't even attempt to stop you. When you look back to see if he's still there you find nothing but the empty bog around you.");
        success = true;
    }
    else if (player.canFly())
        outputText("Gritting your teeth with effort, you beat your wings quickly and lift off! ");
    //Nonflying PCs
    else {
        //In prison!
        /*if (prison.inPrison) {
            outputText("You make a quick dash for the door and attempt to escape! ");
        }*/
        //Stuck!
        /*else */if (player.findStatusEffect(StatusEffects.NoFlee) >= 0) {
            if (monster.refName == "goblin")
                outputText("You try to flee but get stuck in the sticky white goop surrounding you.<br><br>");
            else
                outputText("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!<br><br>");
            success = false;
        }
        //Nonstuck!
        else
            outputText("You turn tail and attempt to flee! ");
    }
    //Determine if escape is successful. If not, roll to determine if you'll escape.
    if (success === null) { //3 equal signs to ensure it doesn't pick up if undefined.
        doNext(battleMenu);
        return;
    }
    else if (success == false) {
        combatRoundOver();
        return;
    }
    else if (success == true) {
        player.clearStatuses();
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    //------------
    // ESCAPE ROLL
    //------------
    success = false; //Move on to escape probability
    //Calculations
    var escapeMod = 20 + monster.level * 3;
    //Clamp initial values, capping difference at 10 levels.
    if (escapeMod < -10) escapeMod = -10;
    if (escapeMod > 50) escapeMod = 50;
    //Modifier based on conditions
    if (player.canFly()) escapeMod -= 20;
    if (player.tailType == TAIL_TYPE_RACCOON && player.earType == EARS_RACCOON && player.findPerk(PerkLib.Runner) >= 0) escapeMod -= 25;
    if (monster.findStatusEffect(StatusEffects.Stunned) >= 0)
        escapeMod -= 50;
    else { //Big tits doesn't matter as much if ya can fly!
        if (player.biggestTitSize() >= 35) escapeMod += 5;
        if (player.biggestTitSize() >= 66) escapeMod += 10;
        if (player.hipRating >= 20) escapeMod += 5;
        if (player.buttRating >= 20) escapeMod += 5;
        if (player.ballSize >= 24 && player.balls > 0) escapeMod += 5;
        if (player.ballSize >= 48 && player.balls > 0) escapeMod += 10;
        if (player.ballSize >= 72 && player.balls > 0) escapeMod += 10;
    }
    //ANEMONE OVERRULES NORMAL RUN
    if (monster.name == "anemone") {
        //Autosuccess - less than 60 lust
        if (player.lust < 60) {
            outputText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach. After twenty paces inshore you turn back to look at her again. The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
            success = true;
        }
        //Speed dependent
        else {
            //Success
            if (player.spe > rand(monster.spe + escapeMod)) {
                outputText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach. After twenty paces inshore you turn back to look at her again. The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                success = true;
                return;
            }
            //Run failed:
            else {
                outputText("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist. <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + player.armorName + " and down to your nethers. The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.", false);
                //(gain lust, temp lose spd/str)
                monster.applyVenom((4+player.sen/20));
                success = false;
            }
        }
    }
    //Ember is SPUCIAL
    /*if (monster.name == "Ember") {
        //GET AWAY
        if (player.spe > rand(monster.spe + escapeMod) || (player.findPerk(PerkLib.Runner) >= 0 && rand(100) < 50)) {
            if (player.findPerk(PerkLib.Runner) >= 0) 
                outputText("Using your skill at running, y");
            else 
                outputText("Y");
            outputText("ou easily outpace the dragon, who begins hurling imprecations at you. \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
            outputText("<br><br>Not to be outdone, you call back, \"Sucks to you! If even the mighty Last Ember of Hope can't catch me, why do I need to train? Later, little bird!\"");
            success = true;
        }
        //Fail:
        else {
            outputText("Despite some impressive jinking, " + EmberScene.emberMF("he","she") + " catches you, tackling you to the ground.<br><br>");
            success = false;
        }
    }*/
    //SUCCESSFUL FLEE
    if (success !== undefined && player.spe > rand(monster.spe + escapeMod)) {
        //Escape prison
        /*if (prison.inPrison) {
            outputText("You quickly bolt out of the main entrance and after hiding for a good while, there's no sign of " + monster.a + " " + monster.refName + ". You sneak back inside to retrieve whatever you had before you were captured. ");
            inCombat = false;
            clearStatuses(false);
            prison.prisonEscapeSuccessText();
            doNext(prison.prisonEscapeFinalePart1);
            return;
        }*/
        /*else */if (player.canFly()) //Fliers flee!
            outputText(capitalize(monster.a) + monster.refName + " can't catch you.");
        else if (player.tailType == TAIL_TYPE_RACCOON && player.earType == EARS_RACCOON && player.findPerk(PerkLib.Runner) >= 0) //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            outputText("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + monster.heShe + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air! You leave " + monster.himHer + " behind with your clumsy, jerky, short-range flight.");
        else //Non-fliers flee
            outputText(capitalize(monster.a) + monster.refName + " rapidly disappears into the shifting landscape behind you.");
        if (monster.name == "Izma") {
            outputText("<br><br>As you leave the tigershark behind, her taunting voice rings out after you. \"<i>Oooh, look at that fine backside! Are you running or trying to entice me? Haha, looks like we know who's the superior specimen now! Remember: next time we meet, you owe me that ass!</i>\" Your cheek tingles in shame at her catcalls.");
        }
        success = true;
    }
    //Runner perk chance
    else if (player.findPerk(PerkLib.Runner) >= 0 && rand(100) < 50) {
        inCombat = false;        outputText("Thanks to your talent for running, you manage to escape.");

        if (monster.name == "Izma") {
            outputText("<br><br>As you leave the tigershark behind, her taunting voice rings out after you. \"<i>Oooh, look at that fine backside! Are you running or trying to entice me? Haha, looks like we know who's the superior specimen now! Remember: next time we meet, you owe me that ass!</i>\" Your cheek tingles in shame at her catcalls.", false);
        }
        success = true;
    }
    //FAIL FLEE
    else {
        if (monster.name == "Holli") {
            monster.escapeFailWithHolli();
            return;
        }
        if (player.canFly()) { //Flyers get special failure message.
            if (monster.plural)
                outputText(capitalize(monster.a) + monster.refName + " manage to grab your " + player.legs() + " and drag you back to the ground before you can fly away!");
            else
                outputText(capitalize(monster.a) + monster.refName + " manages to grab your " + player.legs() + " and drag you back to the ground before you can fly away!");
        }
        else if (player.tailType == TAIL_TYPE_RACCOON && player.earType == EARS_RACCOON && player.findPerk(PerkLib.Runner) >= 0) // >>>>>>[P] FAIL
            outputText("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
        else { //Nonflyer messages
            //Huge balls messages
            if (player.balls > 0 && player.ballSize >= 24) {
                if (player.ballSize < 48)
                    outputText("With your " + player.ballsDescriptLight() + " swinging ponderously beneath you, getting away is far harder than it should be. ");
                else
                    outputText("With your " + player.ballsDescriptLight() + " dragging along the ground, getting away is far harder than it should be. ");
            }
            //FATASS BODY MESSAGES
            if (player.biggestTitSize() >= 35 || player.buttRating >= 20 || player.hipRating >= 20)
            {
                //FOR PLAYERS WITH GIANT BREASTS
                if (player.biggestTitSize() >= 35 && player.biggestTitSize() < 66)
                {
                    if (player.hipRating >= 20) {
                        outputText("Your " + player.hipDescript() + " forces your gait to lurch slightly side to side, which causes the fat of your " + player.skinTone + " ");
                        if (player.buttRating >= 20) outputText(player.buttDescript() + " and ");
                        outputText(player.chestDesc() + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
                    }
                    else if (player.buttRating >= 20)
                        outputText("Your " + player.skinTone + player.buttDescript() + " and " + player.chestDesc() + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
                    else
                        outputText("Your " + player.chestDesc() + " jiggle and wobble side to side like the " + player.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
                }
                //FOR PLAYERS WITH MASSIVE BREASTS
                else if (player.biggestTitSize() >= 66) {
                    if (player.hipRating >= 20) {
                        outputText("Your " + player.chestDesc() + " nearly drag along the ground while your " + player.hipDescript() + " swing side to side ");
                        if (player.buttRating >= 20) outputText("causing the fat of your " + player.skinTone + player.buttDescript() + " to wobble heavily, ");
                        outputText("forcing your body off balance and preventing you from moving quick enough to get escape.");
                    }
                    else if (player.buttRating >= 20)
                        outputText("Your " + player.chestDesc() + " nearly drag along the ground while the fat of your " + player.skinTone + player.buttDescript() + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
                    else
                        outputText("Your " + player.chestDesc() + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
                }
                //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                else if (player.hipRating >= 20) {
                    outputText("Your " + player.hipDescript() + " swing heavily from side to side ");
                    if (player.buttRating >= 20) outputText("causing your " + player.skinTone + player.buttDescript() + " to wobble obscenely ");
                    outputText("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
                }
                //JUST DA BOOTAH
                else if (player.buttRating >= 20) outputText("Your " + player.skinTone + player.buttDescript() + " wobbles so heavily that you're unable to move quick enough to escape.");
            }
            //NORMAL RUN FAIL MESSAGES
            else if (monster.plural) outputText(capitalize(monster.a) + monster.refName + " stay hot on your heels, denying you a chance at escape!");
            else outputText(capitalize(monster.a) + monster.refName + " stays hot on your heels, denying you a chance at escape!");
        }
    }
    outputText("<br><br>");
    if (success == true) {
        player.clearStatuses();
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    else {
        combatRoundOver();
        return;
    }
}

wait = function() {
    clearOutput();
    if (monster.refName == "sandtrap") {
        SandTrap.sandTrapWait();
        return;
    }
    else if (player.findStatusEffect(StatusEffects.Bind)) {
        switch(player.statusEffectValue(StatusEffects.Bind, 1)) {
            case BIND_TYPE_GOO:
                outputText("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
                player.changeHP(-0.2 * player.maxHP(), true);
                break;
            case BIND_TYPE_NAGA:
                outputText("The naga's grip on you tightens as you relax into the stimulating pressure. ");
                player.changeHP(-(5 + rand(5)), true, false);
                player.changeLust(player.sen / 5 + 5, true, false);
                break;
            default:
        }
    }
    else outputText("You decide not to take any action this round.<br><br>");
    /*if (monster.findStatusEffect(StatusEffects.PCTailTangle) >= 0) {
        monster.kitsuneWait();
    }

    }
    else if (monster.findStatusEffect(StatusEffects.MinotaurEntangled) >= 0) {
        clearOutput();
        outputText("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give. His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs. You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them. Why did you ever try to struggle against this fate?<br><br>");
        player.changeLust(30 + rand(5), true);
        combatRoundOver();
    }
    else if (player.findStatusEffect(StatusEffects.Whispered) >= 0) {
        clearOutput();
        outputText("You shake off the mental compulsions and ready yourself to fight!<br><br>");
        player.removeStatusEffect(StatusEffects.Whispered);
        combatRoundOver();
    }
    else if (player.findStatusEffect(StatusEffects.HarpyBind) >= 0) {
        clearOutput();
        outputText("The brood continues to hammer away at your defenseless self. ");
        player.changeHP(-(80 + rand(40)), true);
        combatRoundOver();
    }
    else if (monster.findStatusEffect(StatusEffects.QueenBind) >= 0) {
        monster.ropeStruggles(true);
    }
    /*else if (player.findStatusEffect(StatusEffects.GooArmorBind) >= 0) {
        clearOutput();
        outputText("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
        player.addStatusValue(StatusEffects.GooArmorBind, 1, 1);
        if (player.statusEffectValue(StatusEffects.GooArmorBind, 1) >= 5) {
            if (monster.findStatusEffect(StatusEffects.Spar) >= 0)
                Valeria.pcWinsValeriaSparDefeat();
            else
                Valeria.gooArmorBeatsUpPC();
            return;
        }
        combatRoundOver();
    }
    else if (player.findStatusEffect(StatusEffects.HolliConstrict) >= 0) {
        monster.waitForHolliConstrict(true);
    }
    else if (player.findStatusEffect(StatusEffects.TentacleBind) >= 0) {
        clearOutput();
        if (player.cocks.length > 0)
            outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
        else if (player.hasVagina())
            outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
        else outputText("The creature continues probing at your asshole and has now latched " + num2Text(player.totalNipples()) + " more suckers onto your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
        player.changeLust((8 + player.sen / 10), true);
        combatRoundOver();
    }
    else if (player.findStatusEffect(StatusEffects.IsabellaStunned) >= 0) {
        clearOutput();
        outputText("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.<br><br>");
        player.removeStatusEffect(StatusEffects.IsabellaStunned);
    }
    else if (player.findStatusEffect(StatusEffects.Stunned) >= 0) {
        clearOutput();
        outputText("You wobble about, stunned for a moment. After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.<br><br>");
        player.removeStatusEffect(StatusEffects.Stunned);
    }
    else if (player.findStatusEffect(StatusEffects.Confusion) >= 0) {
        clearOutput();
        outputText("You shake your head and file your memories in the past, where they belong. It's time to fight!<br><br>n");
        player.removeStatusEffect(StatusEffects.Confusion);
    }*/
    //else {

    //}

    player.changeFatigue(-5, false);
    combatRoundOver();
};

fantasize = function() {
    clearOutput();
    var lustGain = 0;
    if (player.armor == Items.Armor.GooArmor) {
        outputText("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
        if (player.gender > 0) outputText(" and genitals");
        outputText(", arousing you even further.<br>");
        lustGain = 25 + rand(player.lib / 8 + player.cor / 8);
    }
    else if (player.balls > 0 && player.ballSize >= 10 && rand(2) == 0) {
        outputText("You daydream about fucking " + monster.a + monster.refName + ", feeling your balls swell with seed as you prepare to fuck " + monster.himHer + " full of cum.<br>");
        lustGain = 5 + rand(player.lib / 8 + player.cor / 8);
        outputText("You aren't sure if it's just the fantasy, but your " + player.ballsDescriptLight() + " do feel fuller than before...<br>");
        player.hoursSinceCum += 50;
    }
    else if (player.biggestTitSize() >= 6 && rand(2) == 0) {
        outputText("You fantasize about grabbing " + monster.a + monster.refName + " and shoving " + monster.himHer + " in between your jiggling mammaries, nearly suffocating " + monster.himHer + " as you have your way.<br>");
        lustGain = 5 + rand(player.lib / 5 + player.cor / 8);
    }
    else if (player.biggestLactation() >= 6 && rand(2) == 0) {
        outputText("You fantasize about grabbing " + monster.a + monster.refName + " and forcing " + monster.himHer + " against a " + player.nippleDescript(0) + ", and feeling your milk let down. The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.<br>");
        lustGain = 5 + rand(player.lib / 5 + player.cor / 8);
    }
    else {
        outputText("You fill your mind with perverted thoughts about " + monster.a + monster.refName + ", picturing " + monster.himHer + " in all kinds of perverse situations with you.<br>");
        lustGain = 10 + rand(player.lib / 5 + player.cor / 8);
    }
    if (lustGain >= 20)
        outputText("The fantasy is so vivid and pleasurable you wish it was happening now. You wonder if " + monster.a + monster.refName + " can tell what you were thinking.<br><br>");
    else
        outputText("<br>");
    player.changeLust(lustGain, true);
    combatRoundOver();
}

struggle = function() {
    clearOutput();
    var damage = 0;
    switch(player.statusEffectValue(StatusEffects.Bind, 1)) {
        case BIND_TYPE_GOO:
            if (rand(80) < 33 + (player.str)) { //33% chance to break free + up to 100% chance for strength
                outputText("You claw your fingers wildly within the slime and manage to brush against her heart-shaped nucleus. The girl silently gasps and loses cohesion, allowing you to pull yourself free while she attempts to solidify.");
                player.removeStatusEffect(StatusEffects.Bind);
            }
            else {
                outputText("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours. ");
                damage = player.maxHP() * 0.15;
                player.changeHP(-damage, true, false);
            }
            break;
        case BIND_TYPE_NAGA:
            if (rand(80) < 33 + (player.str / 1.5)) { //33% chance to break free + up to 66% chance for strength
                outputText("You wriggle and squirm violently, tearing yourself out from within the naga's coils.");
                player.removeStatusEffect(StatusEffects.Bind);
            }
            else {
                outputText("The naga's grip on you tightens as you struggle to break free from the stimulating pressure. ");
                damage += 7 + rand(5);
                player.changeHP(-damage, true, false);
                player.changeLust((player.sens / 10) + 2, true, false);
            }
            break;
        case BIND_TYPE_TENTACLE:
            outputText("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.<br>");
            if (rand(80) < 33 + (player.str / 2)) { //33% chance to break free + up to 50% chance for strength
                outputText("As the creature attempts to adjust your position in its grip, you free one of your " + player.legs() + " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.<br><br>");
                player.removeStatusEffect(StatusEffects.Bind);
                monster.createStatusEffect(StatusEffects.TentacleCoolDown, 3, 0, 0, 0);
            }
            else { //Fail to break free
                outputText("Despite trying to escape, the creature only tightens its grip, making it difficult to breathe. ");
                damage += 5;
                player.changeHP(-damage, true, false);
                if (player.cocks.length > 0)
                    outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you! ");
                else if (player.hasVagina())
                    outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
                else
                    outputText("The creature continues probing at your asshole and has now latched " + num2Text(player.totalNipples()) + " more suckers onto your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing! ");
                player.changeLust((3 + player.sens / 10 + player.lib / 20), true, false);
            }
            break;
        default:
    }
    combatRoundOver(true);
}

//------------
// CORE STUFF
//------------
function inCombat() {
    return playerMenu == battleMenu;
}

function startCombat(enemy, immediate) {
    currentTurn = 0;
    currentRound = 0;
    playerMenu = battleMenu;
    monster = enemy;
    monster.HP = monster.maxHP();
    if (immediate) battleMenu();
    else doNext(battleMenu);
}

function fatigueRecovery() {
    player.changeFatigue(-1, false);
    if (player.findPerk(PerkLib.SpeedyRecovery) >= 0) player.changeFatigue(-1, false);
    if (player.findPerk(PerkLib.EnlightenedNinetails) >= 0 || player.findPerk(PerkLib.CorruptedNinetails) >= 0) player.changeFatigue(-(1+rand(3)), false);
}
function teaseXP(XP) {
    while(XP > 0) {
        XP--;
        player.teaseXP++;
        //Level dat shit up!
        if (player.teaseLevel < 5 && player.teaseXP >= 10 + (player.teaseLevel + 1) * 5 * (player.teaseLevel + 1)) {
            outputText("<br><b>Tease skill leveled up to " + (player.teaseLevel + 1) + "!</b>", false);
            player.teaseLevel++;
            player.teaseXP = 0;
        }
    }
}

function combatRoundOver(skipEnemy) {
    if (skipEnemy == undefined) skipEnemy = false;
    //Is combat over? Check if it is.
    if (checkCombatOver()) {
        return true;
    }
    //Else... If it changes to 0, it's player's turn, else it's enemy's turn.
    if (currentTurn == 0 && !skipEnemy) {
        currentTurn = 1;
        monster.doAI();
    }
    else {
        currentTurn = 0;
        currentRound++;
        doNext(battleMenu);
    }
    return false;
}

function checkCombatOver() {
	if (monster.HP <= 0 || monster.lust >= monster.maxLust()) {
		doNext(monster.victory);
		return true;
	}
	else if (player.HP <= 0 || player.lust >= player.maxLust()) {
		doNext(monster.defeat);
		return true;
	}
	return false;
}

function cleanupAfterCombat(nextFunc) {
	if (monster.HP <= 0 || monster.lust >= monster.maxLust()) {
        if (nextFunc == undefined) nextFunc = Camp.returnToCampUseOneHour;
        awardPlayer(nextFunc);
	}
	else if (player.HP <= 0 || player.lust >= player.maxLust()) {
        if (nextFunc == undefined) nextFunc = Camp.returnToCampUseEightHours;
		var gemsLost = Math.floor(monster.level + rand(5));
		if (gemsLost > player.gems) gemsLost = player.gems;
		outputText("<br><br>You'll probably come to your senses in eight hours or so, missing " + gemsLost + " gems.");
		player.changeGems(-gemsLost);
        doNext(nextFunc);
	}
    player.clearStatuses();
    monster.drops = [];
    monster.dropThreshold = [];
}

function awardPlayer(nextFunc) {
    //console.log("Awarded player.");
    var xpGain = Math.floor(monster.getAwardableXP());
    //Scale down XP gain if 1 level below the cap so you don't hit the level cap too quickly. This will be removed once level cap is ever raised to 20.
    if (player.level >= levelCap - 1) {
        xpGain *= 0.2;
        xpGain = Math.floor(xpGain);
    }
    var gemGain = Math.floor(monster.gems);
    outputText("<br><br>You grab " + gemGain + " gems and " + xpGain + " XP from your victory. ");
    player.changeXP(xpGain);
    player.changeGems(gemGain);
    var item = monster.dropItem();
    if (item != undefined) {
        outputText("There is " + item.longName + " on your defeated opponent. ");
        Inventory.takeItem(item, nextFunc);
    }
    else doNext(nextFunc);
}

function gameOver() {
    hideMenus();
    showMenuButton("buttonMain");
    showMenuButton("buttonData");
    menu();
    var gameOverTexts = ["GAME OVER", "Game over, man! Game over!", "You just got Bad-Ended!", "Your adventures have came to an end..."];
    if (silly) gameOverTexts[4] = "You cannot give up just yet. " + player.name + "! Stay determined..."; //You are still filled with DETERMINATION.
    outputText("<br><br><font color=\"#800000\"><b>" + randomChoice(gameOverTexts) + "</b></font>");
    addButton(0, "Game Over", null, null, null, null, "Your game has ended. Please load a game or start a new game.");
    //addButton(1, "Quick Load", null, null, null, null, "Load your most recent save file.");
    //addButton(2, "Retry", null, null, null, null, "Retry from your last checkpoint.");
}
