GoblinScene = [];

function Goblin() {
    //Name and references
	this.a = "the ";
	this.name = "goblin";
	this.refName = this.name;
	this.isAre = "is";
	this.heShe = "she";
	this.himHer = "her";
	this.hisHer = "her";
	this.battleDesc = "The goblin before you is a typical example of her species, with dark green skin, pointed ears, and purple hair that would look more at home on a punk-rocker. She's only about three feet tall, but makes up for it with her curvy body, sporting hips and breasts that would entice any of the men in your village were she full-size.  There isn't a single scrap of clothing on her, just lewd leather straps and a few clinking pouches. She does sport quite a lot of piercings – the most noticeable being large studs hanging from her purple nipples. Her eyes are fiery red, and practically glow with lust. This one isn't going to be satisfied until she has her way with you. It shouldn't be too hard to subdue such a little creature, right?";
	
	//Stats
	this.str = 12;
	this.tou = 13;
	this.spe = 35;
	this.inte = 42;
	this.lib = 45;
	this.sens = 45;
	this.cor = 60;
	//Combat stats
	this.HP = this.maxHP();
	this.lust = 0;
	this.fatigue = 0;
	//Advancement
	this.level = 1;
	this.gems = 5 + rand(5);
    //Battle variables
    this.weapon.equipmentName = "fists";
    this.weapon.verb = "tiny punch";
    this.armor.equipmentName = "leather straps";
    this.lustVuln = 1;

    //Appearance
    this.tallness = 35 + rand(4);
    this.hipRating = HIP_RATING_AMPLE + 2;
    this.buttRating = BUTT_RATING_LARGE;
    this.skinTone = "dark green";
    this.hairColor = "purple";
    this.hairLength = 4;
	//Sexual characteristics
    this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_NORMAL);
    this.createStatusEffect(StatusEffects.BonusVCapacity, 40, 0, 0, 0);
    this.createBreastRow(Appearance.breastCupInverse("E"));
    this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
    this.ass.analWetness = ANAL_WETNESS_DRY;
    this.createStatusEffect(StatusEffects.BonusACapacity,30,0,0,0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    this.addDrop(Items.Consumables.HairDyeRed, 5);
    this.addDrop(Items.Consumables.HairDyeOrange, 5);
    this.addDrop(Items.Consumables.HairDyePurple, 5);
    this.addDrop(Items.Consumables.HairDyeBlue, 5);
    this.addDrop(Items.Consumables.HairDyePink, 5);
    this.addDrop(Items.Consumables.GoblinAle, 25);

	//Victory/defeat
	this.victory = GoblinScene.victoryAgainstGoblin;
	this.defeat = cleanupAfterCombat;
}
Goblin.prototype = new Creature();
Goblin.prototype.constructor = Goblin;

//------------
// COMBAT
//------------
Goblin.prototype.doAI = function() {
	switch(rand(4)) {
		case 0:
			Goblin.goblinTeaseAttack();
			break;
		default:
			this.attack();
	}
	combatRoundOver();
}

Goblin.goblinTeaseAttack = function() {
	var det = rand(3);
	if (monster.refName == "goblin" || monster.refName == "goblin assassin") {
		if (det == 0) outputText(capitalize(monster.a) + monster.refName + " runs her hands along her leather-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
		if (det == 1) outputText(capitalize(monster.a) + monster.refName + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She caresses her snatch and gives you a come hither look.");
		if (det == 2) outputText(capitalize(monster.a) + monster.refName + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
	}
	else if (monster.refName == "goblin warrior") {
		if (det == 0) outputText(capitalize(monster.a) + monster.refName + " runs her hands along her metal-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
		if (det == 1) outputText(capitalize(monster.a) + monster.refName + " grabs her heel and lifts it to her head in an amazing display of flexibility despite the armor she's wearing.  She caresses her snatch and gives you a come hither look.");
		if (det == 2) outputText(capitalize(monster.a) + monster.refName + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
	}
	else if (monster.refName == "goblin shaman") {
		if (det == 0) outputText(capitalize(monster.a) + monster.refName + " runs her hands along her leather-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
		if (det == 1) outputText(capitalize(monster.a) + monster.refName + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She lifts her loincloth and caresses her snatch and gives you a come hither look.");
		if (det == 2) outputText(capitalize(monster.a) + monster.refName + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
	}
	else if (monster.refName == "goblin elder") {
		if (det == 0) outputText(capitalize(monster.a) + monster.refName + " runs her hands along her bone-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
		if (det == 1) outputText(capitalize(monster.a) + monster.refName + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She lifts her loincloth and caresses her snatch and gives you a come hither look.");
		if (det == 2) outputText(capitalize(monster.a) + monster.refName + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
	}
	var lustDmg = rand(player.lib / 10) + 8;
	if (monster.refName == "goblin assassin") lustDmg *= 1.4;
	if (monster.refName == "goblin warrior") lustDmg *= 1.6;
	if (monster.refName == "goblin shaman") lustDmg *= 1.6;
	if (monster.refName == "goblin elder") lustDmg *= 2;
	lustDmg = Math.round(lustDmg);
	outputText("  The display distracts you long enough to prevent you from taking advantage of her awkward pose, leaving you more than a little flushed.  ");
	player.changeLust(lustDmg, true);
}

//------------
// SCENES
//------------
GoblinScene.victoryAgainstGoblin = function() {
    clearOutput();
    if (monster.HP <= 0)
	    outputText("The goblin falls down and smashes her titties against the ground. She looks up at you and sniffles.");
    else {
        outputText("The goblin groans and drops onto her back.  Her legs spread wide, displaying amazing flexibility as one hand dives into her cunt and the other begins twisting her pierced nipples, one at a time.  The display manages to stir your loins.");
        player.changeLust(20, false);
    }
	menu();
	if (player.hasCock()) {
        addButton(0, "Dick Fuck", GoblinScene.gatsGoblinBoners);
        addButton(1, "Jog Fuck", GoblinScene.gobboGetsRapedMaleFits);
    }
	addButton(14, "Leave", cleanupAfterCombat);
}

GoblinScene.gatsGoblinBoners = function() {
	clearOutput();
	var x = player.cockThatFits(monster.analCapacity());
	if (x < 0) x = player.smallestCockIndex();
	//outputText(images.showImage("goblin-win-male-goblinboners"));
	outputText("The goblin lies strewn across the ground upon her stomach, exhausted from the battle. Her plump legs are unintentionally spread open while her ass pokes up into the air, giving you a clear view of her wet pussy as she tries to get herself off.  It seems as if the green-skinned slut has already forgotten about you - too many fruitless encounters might've caused her to give up hope on finding a virile specimen to pump her full of cum.<br><br>");

	outputText("Luckily for her, you have every intention of changing that.<br><br>");

	outputText("You begin to fondle your cock");
	if (player.cockTotal() > 1) outputText("s");
	outputText(" as you walk towards the unsuspecting goblin girl, taking in the sight of her perfectly round cheeks as they jiggle against her hurried movements, her soft thighs clenched against the eager hand between them.  Bending down, you quickly grab the goblin's ample hips, causing the girl to squeak in surprise as she turns around to catch the sight of your erect length");
	if (player.cockTotal() > 1) outputText("s");
	outputText(".<br><br>");

	outputText("\"<i>W-woah!  Hey stud, whaddya think you're doing back there?</i>\" she yelps, more surprised than scared at your sudden appearance.  Instead of answering, you decide to grab your cock");
	if (player.cockTotal() > 1) outputText("s");
	outputText(" and slap ");
	if (player.cockTotal() == 1) outputText("it");
	else outputText("them");
	outputText(" against the bare flesh of her ass, whilst your victim anxiously awaits your next move.  You take your time massaging the goblin's slutty ass with your bare hands before sliding your " + player.cockDescript(x) + " in between her soft cheeks.  Your horny victim appears impatient, attempting to grind against you as she spreads her moist lips open, enthusiastic that she's found someone willing to mate with her.  You slap her ass firmly as you quicken your thrusting - seconds before finally plunging ");
	if (player.cockTotal() == 1) outputText("your dick inside of the panting whore, pushing her forwards violently as you enter her tight snatch");
	else if (player.cockTotal() == 2) outputText("both of your dicks inside of the panting whore, pushing her forwards violently as you enter her tight snatch and asshole");
	else {
		outputText("two of your dicks inside of the panting whore, pushing her forwards violently as you enter her tight snatch and asshole - your other cock");
		if (player.cockTotal() >= 4) outputText("s");
		outputText(" remaining sandwiched in between her asscheeks");
	}
	outputText(".<br><br>");

	outputText("You roughly pound against the goblin girl, maintaining a firm grip on her hips while she squeals with delight.  The sound of your groin slapping against her echoes throughout the area, followed by your grunting and the goblin's moans of ecstasy.  Your victim struggles to lift herself up by her arms, only to collapse back down from the feeling of you invading her insides.<br><br>");

	outputText("Eventually you begin to feel yourself coming to a climax, your movements getting faster and faster as you build up to your release.  The goblin below you has already lost herself to the pleasure of your " + player.cockDescript(x) + ", her eyes rolled upwards and her tongue drooling out of her mouth while her slutty face rubs against the ground you're currently pounding her on.  With a final thrust, your hips lurch forward as you paint her insides with your thick spunk, relishing in the feeling of your ejaculate filling her up to the brim and plugging her entrance");
	if (player.cockTotal() == 2) outputText("s");
	outputText(".  You slowly release yourself from her tight body, finishing off by covering her curved back and pert rump with the rest of your seed.<br><br>");

	outputText("You pick yourself back up, jerking yourself slowly as cum dribbles from your " + player.cockDescript(x) + " onto the collapsed body of the goblin.  It'll be awhile before she comes back to consciousness, but you're certain she'll have a better appreciation for sex when she does.");

	player.orgasm();
	cleanupAfterCombat();
}

GoblinScene.gobboGetsRapedMaleFits = function() {
	var x = player.cockThatFits(monster.vaginalCapacity());
	if (x < 0) x = player.biggestCockIndex();
	clearOutput();
	//outputText(images.showImage("goblin-win-male-getridden"));
	//(FITS( barley) – Get ridden)
	if (player.cockArea(x) > monster.vaginalCapacity() * .8) {
		outputText("You pick up the defeated goblin, looking her over. She crosses her arms across her chest pitifully and asks, \"<i>What now?</i>\" with her eyes darting down when she thinks you won't notice. A grimace temporarily crossing her face at the size of your " + player.cockDescript(x) + ". You get the idea of giving her more cock than she can handle, and lower her down towards your " + player.cockDescript(x) + ". The tip slips between her moist and folds, stretching her and taking some of her weight off your arms. She winces slightly, wrapping her legs as far around your " + player.hipDescript() + " as possible.<br><br>");
		outputText("You start walking, letting your movements work with gravity, allowing you to penetrate her with little difficulty. Those puffy wet walls clench you tightly as she slides down, ");
		if (player.cocks[0].cockType == CockTypesEnum.DEMON) outputText("rubbing painfully against your demonic nubs");
		else if (player.hasKnot(0)) outputText("stretching painfully around your knot");
		else if (player.cocks[0].cockType == CockTypesEnum.HORSE || player.cocks[0].cockType > 3) outputText("feeling painfully tight around you");
		outputText(". With each and every step she slides down further, stretching her to capacity, until she sits almost completely impaled on you, grabbing your ");
		if (player.biggestTitSize() >= 1) outputText(player.allBreastsDescript());
		else outputText("torso");
		outputText(" to help support herself.  A steady pulse of motion massages you in time with the green girl's breathing.  You realize just how much of her body must be devoted to accommodating monstrous members, no wonder goblins are so fragile in a fight!<br><br>");
		outputText("She pants happily, her tongue rolling free from her mouth as she comments, \"<i>So full. . .</i>\"  Still wincing from the monster inside her she begins to cheer you on, \"<i>oooh go-ah-faster! I wanna bounce!</i>\"<br><br>");
		outputText("It's all the encouragement you need, and you break into a run, feeling her lithe form bounce on your " + player.cockDescript(x) + ", drawing out a cacophony of cries ranging from happy wails and moans to slight yelps of pain. Her tiny fists dig into your ");
		if (player.biggestTitSize() >= 1) outputText("tits");
		else outputText("skin");
		outputText(" as she hangs on, clenching and smashing her ample tits against you. You run hard, feeling her bounce and wriggle as her cunt and rapid breathing squeezing and milking you like you never before. You're sure if you could feel like this every time you took a jog, you'd be in great shape.<br><br>");
		outputText("\"<i>Ooh fuck stud, bounce me! Yeah just like that,</i>\" she moans, \"<i>Are you gonna cum? Omigod please cum, I need you to fill me up just like this!</i>\"<br><br>");
		outputText("The familiar tightness of a coming orgasm grows in your groin, tightening as you near release. You pick up the pace, full out sprinting, letting the girl bounce and jiggle as she clings to you, supported entirely by your " + player.cockDescript(x) + ". ");
		if (player.balls > 0) outputText("Your " + player.ballsDescriptLight() + " tighten, releasing the seed of your orgasm.  ");
		outputText("The howl of a powerful orgasm fills your ears as your cumming sets off the little green cock-sleeve. One of her hands lets go, and starts rubbing her belly while she kisses and licks your belly-button.");
		if (player.cumQ() >= 100) outputText("  Your enhanced body easily stuffs her full of cream, pudging her belly out slightly, your seed staying embedded in her womb with nowhere to escape, her cunt plugged tightly with your " + player.cockDescript(x) + ".");
		if (player.cumQ() >= 500) outputText("  The orgasm is so potent that by the time you wind down, she looks to be sporting a pregnancy the size of a medicine ball.  Your cum is trapped inside her, unable to find any gap between her walls and your " + player.cockDescript(x) + ".");
		else if (player.cumQ() >= 250) outputText("  The orgasm is so potent that by the time you wind down, she looks heavily pregnant.  Your cum is unable to find any gap between her walls and your " + player.cockDescript(x) + ".");
		outputText("<br><br>");
		outputText("You pant and stop, pulling the stuffed goblin off you and setting her on the ground, smiling in satisfaction as your cum ");
		if (player.cumQ() >= 250) outputText("pours out in a river");
		else outputText("leaks");
		outputText(" from her now-gaping twat. She rubs her belly and blows you a kiss, still trying to catch her breath. You smirk and begin redressing. Once finished, you start walking away, but she calls out one last time to you, \"<i>MMMmm I hope you don't mind if I find you again. I need more of your baby batter so I can give you lots of beautiful sluts to fuck!</i>\"<br><br>");
		if (player.cor > 50) outputText("Chuckling");
		else outputText("Shuddering");
		outputText(", you make your way back to camp, satisfied.");
	}
	//(FITS – Get ridden)
	else {
		outputText("You pick up the defeated goblin, looking her over.  She crosses her arms across her chest pitifully and asks, \"<i>What now?</i>\" with her eyes darting down when she thinks you won't notice.  You muse to yourself 'great minds think alike' and lower her down towards your " + player.cockDescript(x) + ".  The tip slips between her moist and parted folds, brushing against her entrance and taking some of her weight for you.  She goes cross-eyed and smiles happily, wrapping her legs as far around your " + player.hipDescript() + " as possible.<br><br>");
		outputText("You start walking, letting the movements work with gravity to allow you to effortlessly penetrate her.  Those puffy wet walls clench you tightly as she slides down ");
		if (player.cocks[0].cockType == CockTypesEnum.DEMON) outputText("rubbing perfectly against your demonic nubs");
		else if (player.hasKnot(0)) outputText("stretching tightly around your knot");
		else if (player.cocks[0].cockType == CockTypesEnum.HORSE || player.cocks[0].cockType > 3) outputText("feeling absolutely perfect around you");
		outputText(".  With each and every step you take, she slides down further, until she sits fully impaled on you, grabbing your ");
		if (player.biggestTitSize() >= 1) outputText(player.allBreastsDescript(), false);
		else outputText("torso");
		outputText(" to help support herself.   A steady pulse of motion massages you in time with the green girl's breathing, making you realize just how much of her body must be devoted to accommodating monstrous members.<br><br>");
		outputText("She pants happily, her tongue rolling free from her mouth as she cheers you on, \"<i>oooh go-ah-faster!  I wanna bounce!</i>\"<br><br>");
		outputText("It's all the encouragement you need, and you break into a run, feeling her lithe form bounce on your " + player.cockDescript(x) + ", drawing out a cacophony of happy wails and moans.  Her tiny fists dig into your ");
		if (player.biggestTitSize() >= 1) outputText("tits");
		else outputText("skin");
		outputText(" as she hangs on, clenching and smashing her ample tits against you.  You run hard, feeling her bounce and wriggle as her cunt and rapid breathing begin squeezing and milking you like never before.  You're sure if you could feel like this every time you took a jog, you'd be in great shape.<br><br>");
		outputText("\"<i>Ooh fuck stud, bounce me! Yeah just like that,</i>\" she moans, \"<i>Are you gonna cum? Omigod please cum, I need you to fill me like this!</i>\"<br><br>");
		outputText("The familiar tightness of a coming orgasm grows in your groin, tightening as you near release.  You pick the pace, full out sprinting, letting the girl bounce and jiggle as she clings to you, supported entirely by your " + player.cockDescript(x) + ".  ");
		if (player.balls > 0) outputText("Your " + player.ballsDescriptLight() + " tighten, releasing the seed of your orgasm.  ");
		outputText("The howl of a powerful orgasm fills your ears as your cumming sets off the little green cock-sleeve.  One of her hands lets go, and starts rubbing her belly while she kisses and licks your belly-button.");
		if (player.cumQ() >= 250) {
			outputText("  Your enhanced body easily stuffs her full of cream, pudging her belly out slightly and dripping down your ");
			if (player.balls > 0) outputText(player.ballsDescriptLight(), false);
			else outputText("legs");
			outputText(".");
		}
		if (player.cumQ() >= 500) outputText("  The orgasm is so potent that by the time you wind down, she looks heavily pregnant and your cum squirts out of any gap it can find between her walls and your " + player.cockDescript(x) + ".");
		outputText("<br><br>");
		outputText("You pant and stop, pulling the stuffed goblin off you and setting her on the ground, smiling in satisfaction as your cum ");
		if (player.cumQ() >= 250) outputText("pours out in a river");
		else outputText("leaks");
		outputText(" from her now-gaping twat.  She rubs her belly and blows you a kiss, still trying to catch her breath.  You smirk and begin redressing.  Once finished, you start walking away, but she calls out one last time to you, \"<i>Ummm I hope you don't mind if I find you again.  I need more of your baby batter so I can give you lots of beautiful sluts to fuck!</i>\"<br><br>");
		if (player.cor > 50) outputText("Chuckling");
		else outputText("Shuddering");
		outputText(", you make your way back to camp, satisfied.");
	}
	cleanupAfterCombat();
	player.orgasm();
}