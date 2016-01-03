function Imp() {
	this.a = "an ";
	this.name = "imp";
	this.refName = this.name;
	this.isAre = "is";
	this.heShe = "he";
	this.himHer = "him";
	this.hisHer = "his";
	this.battleDesc = "An imp is short, only a few feet tall.  An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns.  His eyes are solid black, save for tiny red irises which glow with evil intent.  His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt.  His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws.  A pair of tiny but functional wings occasionally flap from his back.";
	
	//Stats
	this.str = 20;
	this.tou = 10;
	this.spe = 25;
	this.inte = 12;
	this.lib = 45;
	this.sen = 45;
	this.cor = 100;
	//Combat stats
	this.HP = this.maxHP();
	this.lust = 0;
	this.fatigue = 0;
	//Advancement
	this.level = 1;
	this.XP = 11;
	this.gems = 6 + rand(5);
	
	//Sexual characteristics
	this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
	this.ass.analWetness = ANAL_WETNESS_DRY;
	
	this.combatAI = Imp.doAI;
	//Victory/defeat
	this.victory = Imp.victoryAgainstImp;
	this.defeat = cleanupAfterCombat;
}
Imp.prototype = new Creature();
Imp.prototype.constructor = Imp;
ImpScene = [];

//COMBAT
Imp.doAI = function() {
	switch(rand(4)) {
		//case 0:
		//	Imp.goblinTeaseAttack();
		//	break;
		default:
			this.attack();
	}
	combatRoundOver();
}

//SCENES
Imp.victoryAgainstImp = function() {
	clearOutput();
	//var canFeed:Boolean = (player.findStatusAffect(StatusAffects.Feeder) >= 0);
	//var canBikiniTits:Boolean = (player.hasVagina() && player.biggestTitSize() >= 4 && player.armor is LustyMaidensArmor);
	outputText("You smile in satisfaction as " + monster.a + monster.short + " collapses and begins masturbating feverishly.");
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
	}
	if (player.lust > 33) {
		var maleRape:Function = null;
		if (player.hasCock()) {
			if (player.cockThatFits(monster.analCapacity()) == -1)
				outputText("<br><br><b>You're too big to rape an imp with " + oMultiCockDesc() + ".</b>");
			else maleRape = (player.isTaur() ? centaurOnImpStart : rapeImpWithDick);
		}
		if (player.hasVagina()) {
			if (player.isTaur()) {
				maleRape = centaurOnImpStart;
				addButton(1, "Group Vaginal", centaurGirlOnImps);
			}
			else addButton(1, "Female Rape", rapeImpWithPussy);
		}
		else if (maleRape == null && !player.hasFuckableNipples() && !canFeed && !canBikiniTits && !player.canOvipositBee()) {
			cleanupAfterCombat(); //Only happens when there's no way to fuck the imp
			return;
		}
		addButton(0, (player.isTaur() ? "Centaur Rape" : "Male Rape"), maleRape);
		if (player.hasFuckableNipples()) addButton(2, "NippleFuck", noogaisNippleRape);
	}
	if (canFeed) addButton(3, "Breastfeed", areImpsLactoseIntolerant);
	if (canBikiniTits) addButton(4, "B.Titfuck", (player.armor as LustyMaidensArmor).lustyMaidenPaizuri);
	if (maleRape == rapeImpWithDick && player.hasItem(useables.CONDOM)) addButton(5, "Use Condom", rapeImpWithDick, 1);
	addButton(6, "Kill Him", killImp);
	if (player.canOvipositBee()) addButton(8, "Oviposit", putBeeEggsInAnImpYouMonster);*/
	if (player.hasCock()) addButton(0, "Male Rape", ImpScene.rapeImpWithDick);
	addButton(14, "Leave", cleanupAfterCombat);
}

ImpScene.rapeImpWithDick = function(condomed = false) {
	var x = player.cockThatFits(monster.analCapacity());
	if (x < 0) x = 0;
	if (condomed) {
		player.destroyItems(useables.CONDOM, 1);
		outputText("You first unwrap the condom wrapper and slide the latex all evenly all over your " + player.cockDescript(x) + " until it's fully covered.");
	}
	// " + (condomed ? "": "") + "
	//Single cock
	//outputText(images.showImage("imp-win-male-fuck"), false);
	if (player.cocks.length == 1) {
		outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.", true);
		//if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
			outputText("  You casually unclasp your " + player.armorName + " and reveal your " + player.cockDescript(x) + ", ", false);
			if (player.breastRows.length > 0 && player.breastRows[0].breastRating > 2) outputText("smashing him against your " + player.breastDescript(0) + " while you jerk hard on your " + player.cockDescript(x) + ", bringing it to a full, throbbing erection.", false);
			else outputText("stroking it to full hardness languidly.", false);
		//}
		outputText("<br><br>With no foreplay, you press your " + player.cockDescript(x) + " against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + monster.cockDescriptShort(0) + ".  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.", false);
		if (player.cocks[0].cockType == CockTypesEnum.CAT) outputText("  The tiny creature's claws dig into your sides at the feeling of soft, hooked barbs stroking his sensitive insides.", false);
		if (player.cocks[0].cockLength >= 7 && player.cocks[0].cockLength <= 12) outputText("  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.", false);
		if (player.cocks[0].cockLength > 12) outputText("  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.", false);
		outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.", false);
		if (player.balls == 0 && player.vaginas.length > 0) outputText("  The cum seems to boil out from inside you as your " + player.vaginaDescript(0) + " soaks itself.  With delicious slowness you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "", false);
		if (player.balls == 0 && player.vaginas.length == 0) outputText("  The cum seems to boil out from inside you, flowing up your " + player.cockDescript(x) + ".  With delicious slowness, you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "", false);
		if (player.cumQ() >= 14 && player.cumQ() <= 30) outputText("  Your orgasm drags on and on, until your slick jism is dripping out around your " + player.cockDescript(x) + ".", false);
		if (player.cumQ() > 30 && player.cumQ() <= 100) outputText("  Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom": "the imp's asshole") + " around your " + player.cockDescript(x) + " as you plunder him relentlessly.", false);
		if (player.cumQ() > 100) outputText("  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  " + (condomed ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.": "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.") + "", false);
		outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping " + (condomed ? "semen": "mixed fluids") + " that seem to be absorbed by the dry earth as fast as they leak out.", false);
	}
	//Multicock
	if (player.cocks.length >= 2) {
		outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.", true);
		//if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
			outputText("  You casually unclasp your " + player.armorName + " and reveal your " + player.multiCockDescriptLight() + ", ", false);
			if (player.breastRows.length > 0 && player.breastRows[0].breastRating > 2) outputText("smashing him against your " + player.breastDescript(0) + " while you jerk hard on one of your " + cockDescript(x) + "s, bringing it to a full, throbbing erection.", false);
			else outputText("stroking one of your members to full hardness languidly.", false);
		//}
		outputText("<br><br>With no foreplay, you press a " + cockDescript(x) + " against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + monster.cockDescriptShort(0) + ".  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.", false);
		if (player.cocks[0].cockLength >= 7 && player.cocks[0].cockLength <= 12) outputText("  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.", false);
		if (player.cocks[0].cockLength > 12 && player.cocks[0].cockLength <= 18) outputText("  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.", false);
		outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.", false);
		if (player.balls > 0) outputText("The cum seems to boil in your balls, sending heat spreading through your " + player.cockDescript(x) + " as your muscles clench reflexively, propelling hot spurts of jism deep into the imp's rectum.  Your other equipment pulses and dripples steady streams of its own cum.", false);
		if (player.balls == 0 && player.vaginas.length > 0) outputText("The cum seems to boil out from inside you as your " + player.vaginaDescript(0) + " soaks itself.  With delicious slowness you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "  Your other equipment drizzles small streams of jizz in sympathy.", false);
		if (player.balls == 0 && player.vaginas.length == 0) outputText("The cum seems to boil out from inside you, flowing up your " + cockDescript(x) + ".  With delicious slowness, you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "  Your other equipment drizzles small streams of jizz in sympathy.", false);
		if (player.cumQ() >= 14 && player.cumQ() <= 30) outputText("  Your orgasm drags on and on, until your slick jism is dripping out around your " + player.cockDescript(x) + ".", false);
		if (player.cumQ() > 30 && player.cumQ() <= 100) outputText("  Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom": "the imp's asshole") + " around your " + player.cockDescript(x) + " as you plunder him relentlessly.", false);
		if (player.cumQ() > 100) outputText("  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  T" + (condomed ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.": "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.") + "", false);
		outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.", false);
	}
	player.orgasm();
	if (!condomed) player.modStat("cor", 1);
	cleanupAfterCombat();
}