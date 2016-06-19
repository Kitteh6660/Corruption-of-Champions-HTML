ImpScene = [];

function Imp() {
    //Name and references
	this.a = "an ";
	this.name = "imp";
	this.refName = this.name;
	this.isAre = "is";
	this.heShe = "he";
	this.himHer = "him";
	this.hisHer = "his";
	this.battleDesc = "An imp is short, only a few feet tall. An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns. His eyes are solid black, save for tiny red irises which glow with evil intent. His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt. His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws. A pair of tiny but functional wings occasionally flap from his back.";
	
	//Stats
	this.str = 20;
	this.tou = 10;
	this.spe = 25;
	this.inte = 12;
	this.lib = 45;
	this.sens = 45;
	this.cor = 100;
	//Combat stats
	this.HP = this.maxHP();
	this.lust = 0;
	this.fatigue = 0;
	//Advancement
	this.level = 1;
	this.gems = 5 + rand(5);
    //Battle variables
    this.weapon.equipmentName = "claws";
    this.weapon.verb = "claw-slash";
    this.armor.equipmentName = "leathery skin";
    this.lustVuln = 1;

    //Appearance
    this.tallness = rand(24) + 25;
    this.hipRating = HIP_RATING_BOYISH;
    this.buttRating = BUTT_RATING_TIGHT;
    this.skinTone = "red";
    this.hairColor = "black";
    this.hairLength = 5;
	//Sexual characteristics
    this.createCock(rand(2) + 11, 2.5, CockTypesEnum.DEMON);
    this.balls = 2;
    this.ballSize = 1;
    this.createBreastRow(0);
    this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
    this.ass.analWetness = ANAL_WETNESS_NORMAL;

    //Drops
    this.clearDrops();
    this.addDrop(Items.Consumables.IncubiDraft, 30);
    this.addDrop(Items.Consumables.SuccubiMilk, 30);
    this.addDrop(Items.Consumables.ImpFood, 30);
    this.addDrop(Items.Consumables.CaninePepper, 10);

	//Victory/defeat
	this.victory = ImpScene.victoryAgainstImp;
	this.defeat = cleanupAfterCombat;
}
Imp.prototype = new Creature();
Imp.prototype.constructor = Imp;

//------------
// COMBAT
//------------
Imp.prototype.doAI = function() {
	switch(rand(4)) {
		case 0:
			Imp.lustMagicAttack();
			break;
		default:
			this.attack();
	}
	combatRoundOver();
}

Imp.lustMagicAttack = function() {
    outputText("You see " + monster.a + monster.refName + " make sudden arcane gestures at you! ");
    player.changeLust(player.lib / 10 + player.cor / 10 + 10, true);
    //Lust check
    if (player.lust < 30) outputText("You feel strangely warm. ");
    if (player.lust >= 30 && player.lust < 60) outputText("Blood rushes to your groin as a surge of arousal hits you, making your knees weak. ");
    if (player.lust >= 60) outputText("Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you. ");
    //Genitals check
    if (player.cocks.length > 0) {
        if (player.lust >= 60)
            outputText("You feel your " + player.multiCockDescriptLight() + " dribble pre-cum.");
        else if (player.lust >= 30 && player.cocks.length == 1)
            outputText("Your " + player.cockDescript(0) + " hardens, distracting you further.");
        else if (player.lust >= 30 && player.cocks.length > 1)
            outputText("Your " + player.multiCockDescriptLight() + " harden uncomfortably.");
        if (player.hasVagina()) outputText(" ");
    }
    if (player.lust >= 60 && player.hasVagina()) {
        switch (player.vaginas[0].vaginalWetness) {
            case VAGINA_WETNESS_NORMAL:
                outputText("Your " + player.allVaginaDescript() + " dampen" + (player.vaginas.length > 1 ? "" : "s") + " perceptibly.");
                break;
            case VAGINA_WETNESS_WET:
                outputText("Your crotch becomes sticky with girl-lust.");
                break;
            case VAGINA_WETNESS_SLICK:
                outputText("Your " + player.allVaginaDescript() + " become" + (player.vaginas.length > 1 ? "" : "s") + " sloppy and wet.");
                break;
            case VAGINA_WETNESS_DROOLING:
                outputText("Thick runners of girl-lube stream down the insides of your thighs.");
                break;
            case VAGINA_WETNESS_SLAVERING:
                outputText("Your " + player.allVaginaDescript() + " instantly soak" + (player.vaginas.length > 1 ? "" : "s") + " your groin.");
            default: //Dry vaginas are unaffected

        }
    }
    outputText("<br>");
}

//------------
// SCENES
//------------
ImpScene.victoryAgainstImp = function() {
	clearOutput();
	//var canFeed:Boolean = (player.findStatusAffect(StatusAffects.Feeder) >= 0);
	//var canBikiniTits:Boolean = (player.hasVagina() && player.biggestTitSize() >= 4 && player.armor is LustyMaidensArmor);
	outputText("You smile in satisfaction as " + monster.a + monster.refName + " collapses and begins masturbating feverishly.");
	menu();
	/*if (canFeed) {
		if (player.lust >= 33)
			outputText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing, but it might be more fun to force it to guzzle your breast-milk.<br><br>What do you do?");
		else outputText("  You're not really turned on enough to rape it, but it might be fun to force it to guzzle your breast-milk.<br><br>Do you breastfeed it?");
	}
	else if (player.lust >= 33 || canBikiniTits || player.canOvipositBee()) {
		outputText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing...<br><br>Do you rape him?");
	}
	else {
		outputText("You smile in satisfaction as " + monster.a + monster.short + " collapses and begins masturbating feverishly.", true);
		if (monster.HP <= 0) {
			addButton(0, "Kill Him", killImp);
			addButton(4, "Leave", cleanupAfterCombat);
		}
		else cleanupAfterCombat();
		return;
	}*/
	if (player.lust >= 33) {
		if (player.hasCock()) {
			if (player.cockThatFits(monster.analCapacity()) == -1)
				outputText("<br><br><b>You're too big to rape an imp with " + player.oMultiCockDesc() + ".</b>");
			else {
                addButton(0, (player.isTaur() ? "Centaur Rape" : "Male Rape"), (player.isTaur() ? ImpScene.centaurOnImpStart : ImpScene.rapeImpWithDick));
                //if (player.hasItem(Items.Consumables.Condom) && !player.isTaur()) addButton(5, "Use Condom", ImpScene.rapeImpWithDick, true);
            }
 		}
		if (player.hasVagina()) {
			//if (player.isTaur())
			//	addButton(1, "Group Vaginal", ImpScene.centaurGirlOnImps);
			//else
                addButton(1, "Female Rape", ImpScene.rapeImpWithPussy);
		}
		/*if (player.hasFuckableNipples()) {
            addButton(2, "NippleFuck", ImpScene.noogaisNippleRape);
        }*/
	}
    else {
        cleanupAfterCombat();
        return;
    }
	//if (canFeed) addButton(3, "Breastfeed", ImpScene.areImpsLactoseIntolerant);
	//if (canBikiniTits) addButton(4, "B.Titfuck", (player.armor as LustyMaidensArmor).lustyMaidenPaizuri);
	//if (player.canOvipositBee()) addButton(8, "Oviposit", ImpScene.putBeeEggsInAnImpYouMonster);
    //addButton(10, "Kill Him", ImpScene.killImp);
	addButton(14, "Leave", cleanupAfterCombat);
}

ImpScene.rapeImpWithDick = function(condomed) {
	var x = player.cockThatFits(monster.analCapacity());
	if (x < 0) x = 0;
	if (condomed) {
		player.destroyItems(Items.Consumables.Condom, 1);
		outputText("You first unwrap the condom wrapper and slide the latex all evenly all over your " + player.cockDescript(x) + " until it's fully covered.");
	}
	// " + (condomed ? "": "") + "
	//Single cock
	//outputText(images.showImage("imp-win-male-fuck"), false);
	if (player.cocks.length == 1) {
		outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck. The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.", true);
		//if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
			outputText(" You casually unclasp your " + player.armorName + " and reveal your " + player.cockDescript(x) + ", ", false);
			if (player.breastRows.length > 0 && player.breastRows[0].breastRating > 2) outputText("smashing him against your " + player.breastDescript(0) + " while you jerk hard on your " + player.cockDescript(x) + ", bringing it to a full, throbbing erection.", false);
			else outputText("stroking it to full hardness languidly.", false);
		//}
		outputText("<br><br>With no foreplay, you press your " + player.cockDescript(x) + " against his tight little pucker and ram it in to the hilt. The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + monster.cockDescriptShort(0) + ". You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.", false);
		if (player.cocks[0].cockType == CockTypesEnum.CAT) outputText(" The tiny creature's claws dig into your sides at the feeling of soft, hooked barbs stroking his sensitive insides.", false);
		if (player.cocks[0].cockLength >= 7 && player.cocks[0].cockLength <= 12) outputText(" Each thrust obviously distorts the imp's abdomen. It amazes you that it doesn't seem to be hurting him.", false);
		if (player.cocks[0].cockLength > 12) outputText(" Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest. Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.", false);
		outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.", false);
		if (player.balls == 0 && player.vaginas.length > 0) outputText(" The cum seems to boil out from inside you as your " + player.vaginaDescript(0) + " soaks itself. With delicious slowness you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "", false);
		if (player.balls == 0 && player.vaginas.length == 0) outputText(" The cum seems to boil out from inside you, flowing up your " + player.cockDescript(x) + ". With delicious slowness, you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "", false);
		if (player.cumQ() >= 14 && player.cumQ() <= 30) outputText(" Your orgasm drags on and on, until your slick jism is dripping out around your " + player.cockDescript(x) + ".", false);
		if (player.cumQ() > 30 && player.cumQ() <= 100) outputText(" Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom": "the imp's asshole") + " around your " + player.cockDescript(x) + " as you plunder him relentlessly.", false);
		if (player.cumQ() > 100) outputText(" Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last. " + (condomed ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.": "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.") + "", false);
		outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.  You drop the imp hard and he passes out, dripping " + (condomed ? "semen": "mixed fluids") + " that seem to be absorbed by the dry earth as fast as they leak out.", false);
	}
	//Multicock
	if (player.cocks.length >= 2) {
		outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck. The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.", true);
		//if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
			outputText(" You casually unclasp your " + player.armorName + " and reveal your " + player.multiCockDescriptLight() + ", ", false);
			if (player.breastRows.length > 0 && player.breastRows[0].breastRating > 2) outputText("smashing him against your " + player.breastDescript(0) + " while you jerk hard on one of your " + player.cockDescript(x) + "s, bringing it to a full, throbbing erection.", false);
			else outputText("stroking one of your members to full hardness languidly.", false);
		//}
		outputText("<br><br>With no foreplay, you press a " + player.cockDescript(x) + " against his tight little pucker and ram it in to the hilt. The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + monster.cockDescriptShort(0) + ". You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.", false);
		if (player.cocks[0].cockLength >= 7 && player.cocks[0].cockLength <= 12) outputText(" Each thrust obviously distorts the imp's abdomen. It amazes you that it doesn't seem to be hurting him.", false);
		if (player.cocks[0].cockLength > 12 && player.cocks[0].cockLength <= 18) outputText(" Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest. Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.", false);
		outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.", false);
		if (player.balls > 0) outputText("The cum seems to boil in your balls, sending heat spreading through your " + player.cockDescript(x) + " as your muscles clench reflexively, propelling hot spurts of jism deep into the imp's rectum. Your other equipment pulses and dripples steady streams of its own cum.", false);
		if (player.balls == 0 && player.vaginas.length > 0) outputText("The cum seems to boil out from inside you as your " + player.vaginaDescript(0) + " soaks itself. With delicious slowness you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + " Your other equipment drizzles small streams of jizz in sympathy.", false);
		if (player.balls == 0 && player.vaginas.length == 0) outputText("The cum seems to boil out from inside you, flowing up your " + player.cockDescript(x) + ". With delicious slowness, you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + " Your other equipment drizzles small streams of jizz in sympathy.", false);
		if (player.cumQ() >= 14 && player.cumQ() <= 30) outputText(" Your orgasm drags on and on, until your slick jism is dripping out around your " + player.cockDescript(x) + ".", false);
		if (player.cumQ() > 30 && player.cumQ() <= 100) outputText(" Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom": "the imp's asshole") + " around your " + player.cockDescript(x) + " as you plunder him relentlessly.", false);
		if (player.cumQ() > 100) outputText(" Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last. T" + (condomed ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.": "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.") + "", false);
		outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.  You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.", false);
	}
	player.orgasm();
	if (!condomed) player.modStats("cor", 1);
	cleanupAfterCombat();
}

ImpScene.rapeImpWithPussy = function() {
    clearOutput();
    //outputText(images.showImage("imp-win-female-fuck"));
    player.slimeFeed();
    outputText("You " + player.clothedOrNakedLower("shed your " + player.armor.equipmentName + " without a thought and ") + "approach the masturbating imp, looming over him menacingly.  Your " + player.vaginaDescript(0) + " moistens in anticipation as you gaze down upon his splendid rod. With no hesitation, you lower yourself until your lips are spread wide by his demon-head, the hot pre-cum tingling deliciously.");
    //Too small!
    if (player.vaginalCapacity() < monster.cockArea(0)) {
        outputText("  You frown as you push against him, but his demonic tool is too large for your " + player.vaginaDescript(0) + ".  With a sigh, you shift position and begin grinding your " + player.vaginaDescript(0) + " against his " + monster.cockDescriptShort(0) + ", coating it with fluids of your gender.  Your clit tingles wonderfully as it bumps against every vein on his thick appendage.");
        if (player.breastRows.length > 0 && player.breastRows[0].breastRating > 1) {
            outputText("  You happily tug and pinch on your erect nipples, adding to your pleasure and nearly driving yourself to orgasm.");
        }
        outputText("\n\nYou lose track of time as you languidly pump against the imp's " + monster.cockDescriptShort(0) + ".  At long last you feel your " + player.vaginaDescript(0) + " ripple and quiver.  Your " + player.legs() + " give out as you lose your muscle control and collapse against the small demon.  You gasp as his " + monster.cockDescriptShort(0) + " erupts against you, splattering your chest with hot demonic cum that rapidly soaks into your skin.  You giggle as you rise up from the exhausted imp, feeling totally satisfied.");
    }
    //Big enough!
    else {
        outputText("  You sink down his " + monster.cockDescriptShort(0) + " slowly, delighting in the gradual penetration and the tingling feeling of his dripping hot pre-cum.  At last you bottom out on his balls.");
        player.cuntChange(monster.cockArea(0), true);
        outputText("  Your lust and desire spurs you into movement, driving you to bounce yourself up and down on the " + monster.cockDescriptShort(0) + ".  His exquisite member pushes you to the very height of pleasure, your " + player.vaginaDescript(0) + " clenching tightly of its own accord each time you bottom out.  The tensing of the little demon's hips is the only warning you get before he cums inside you, hot demonic jizz pouring into your womb.  Your " + player.legs() + " give out, pushing him deeper as he finishes filling you.");
        outputText("\n\nThe two of you lay there a moment while you recover, at last separating as you rise up off his " + monster.cockDescriptShort(0) + ".  Spunk drips down your legs, quickly wicking into your skin and disappearing.");
        //Taking it internal is more corruptive!
        player.modStats("cor", 1);
        //Preggers chance!
        //player.knockUp(PregnancyStore.PREGNANCY_IMP, PregnancyStore.INCUBATION_IMP);
        player.cuntChange(monster.cockArea(0), true, true, false);
    }
    player.orgasm();
    player.modStats("cor", 1);
    cleanupAfterCombat();
}