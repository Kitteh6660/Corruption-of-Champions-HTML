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
	this.lust = 40;
	this.fatigue = 0;
	//Advancement
	this.level = 1;
	this.gems = 5 + rand(5);
    //Battle variables
    this.weapon.equipmentName = "claws";
    this.weapon.verb = "claw-slash";
    this.armor.equipmentName = "leathery skin";
    this.lustVuln = 1;
	this.temperment = 1; //TEMPERMENT_LUSTY_GRAPPLES
    //Appearance
    this.tallness = rand(24) + 25;
    this.hipRating = HIP_RATING_BOYISH;
    this.buttRating = BUTT_RATING_TIGHT;
    this.skinTone = "red";
    this.hairColor = "black";
    this.hairLength = 5;
	this.wingType = WING_TYPE_IMP;
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
	this.defeat = ImpScene.impRapesYou;
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

// FOR ANYONE WANTING TO EXPAND THIS, THESE ADDITIONAL IMP SCENES WERE UNFINISHED IN THE ORIGINAL CODE.

/*
 {{Any player: Oral Give}}
 <<Cor <30>>You look furtively at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Unable to help yourself, you trot closer and closer, leaning in to get a better look at its giant member.  A lustful part of you wonders what the dripping pre-cum would taste like against your tongue.<<else if Cor <50>>You look lustfully at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Licking your lips in anticipation you walk closer, lowering your head to better inspect it.  <<else>>Your grin betrays your lust as you watch the imp masturbate its [imp cock desc] shamelessly on the ground.  Your hands already drift over your body as you trot over and grab a hold of its [imp cock desc], bringing it to your eager lips.<</Cor>>  The Imp's eyes shoot open as its hands grab a hold of your [hair desc - if no hair, then ears] and it pulls its member against your lips.  With your guard down, images of fellating the [imp cock desc] fill your mind with overwhelming intensity.  The visions cause your jaw to fly open without any trace of your own volition, and suddenly the [imp cock desc] is forcing its way to the back of your throat.  <<Cor <40>>Your gag reflexes are trying desperately to kick in, serving only to massage the [imp cock desc] as the creature makes guttural noises and pushes its self even deeper. <<else if Cor <70>> Though it takes you a moment to get adjusted to the intrusion, soon you are able to relax your throat like an expert cock-swallower, taking it even deeper. <<else>>You moan around the creature's [imp cock desc], opening your throat as your eyes plead with it to fuck your mouth-hole even deeper.<</Cor>>

 The creature's pre-cum tastes more like brimstone than salt, and yet something about it inflames you as it pools in your mouth and pours down your throat.  <<Cor <30>>It is disgusting to let this substance inside your body, but the images keep you from resisting. <<else Cor <60>>The corrupt fluids seem unusual, but something about the lewd act makes them more than worthwhile and you take some delight in knowing they are filling your body. <<else>><<If Pussy>>Your [pussies desc] start drooling juices, <</Pussy>><<If cock and pussy>>and your<<else If Cock>>Your cock grows rock hard<</If>>as you feel the corrupt fluids flowing throughout your body.<</Cor>> Without even having to think about it you reach out and <<Str <80>>stroke its [imp cock desc], trying to milk more of it into you <<else>>pick up the imp with one hand, your other hand stroking its [imp cock desc] and trying to milk more of it into you<</Str>><<Cor 80+, Str <80>> as you shove a finger into its [imp anus desc]<<else Cor 80+, Str 80+>> then shoving a finger into its [imp anus desc] and using the new form of grip to move the creature into and out of your mouth-hole<</Cor>>.<<Goto I3 then return>>  In only a few minutes the creature begins to lose its ability to resist your <<Cor <30>>tight<<else Cor <60>> skilled <<else>> eager <</Cor>> throat and begins to pour massive amounts of corrupt cum into your stomach. <<Cor 60-79>>As much as you love having your stomach filled with sperm, you quickly pull the imp back so that some of it might land on your tongue for you to savor.  The excessive cum is soon dripping down your lips, no matter how fast you try to swallow.<<else Cor 80+>>As much as you love having your stomach filled with sperm, a perverse thought fills you and you pull the creature out, <<Str 80+>>holding the creature over your head as <</Str>>you guide its [imp cock desc] to liberally coat your face <<Breasts>>and [breasts desc]<</Breasts>>.<</Cor>>You lick your lips clean of the creamy mess as you put down the now unconscious Imp and give it a look-over for valuables.  <<Cor 80+>>As you trot back the way you have come you idly trace a finger through the dangling sperm, hoping someone might see what a [slur] you have become becomes too uncomfortable to wear.  Though if you have to clean it off, you can always get more.. perhaps from an even more copious source.<<end>>

 {{Any player: Anal Receive}}
 As you watch the imp stroking its [imp cock desc] you find it difficult to resist the urge to feel that massive member sliding into your body.  Slowly you trot closer, turning around to display your rear to the creature.  <<Pussy, Cor <30>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it.  You try to turn and stop it, but the creature pushes deep past your anal muscles before you have a chance.<<else>><<Pussy, Cor <50>>>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it. You brace yourself in anticipation and slight trepidation, delighting in the perversion you are about to take part in. <<else Pussy, Cor 50+>>Though your [largest pussy desc] is dripping at the chance at being bred, you feel like you would like somehing a lot more raw.  Breathlessly you beg it to fuck your [anus desc], debasing yourself and lowering yourself to the ground so you can be as accessile as possible. You moan like a [slur] in anticipation of feeling a cock shoved deep into your [anus desc] <<Breasts>>gripping your nipples hard<<else>>raking your body with your nails<</Breasts>>as you try to keep from biting through your lips.  <</Pussy,/Cor>><<no Pussy>><<Cock>>Your [cocks desc] harden in anticipation<<else>>You rake your nails over your sides in anticipation<</Cock>> as you feel the creature prepare to mount you, its [imp cock desc] pressing up against your [anus desc].  <</no pussy>>
 <<Cor 30+, Cor <50>> As the imp slowly pushes into your [anus desc] you moan in animalistic pleasure.<<else>>When you begin to feel your [anus desc] being distended you cry out and beg it to shove it harder, faster, to take your asshole as roughly as it can!<</Cor>><<anus smaller than dick>>The sheer size of the [imp cock desc] tears your anus open, sending streams of pain into you as you cry out in agony.[if anus smaller than dick, increase size]<</anus>>
 [if anal virgin, lose anal virginity]

 The Imp grunts as it ruts your [anus desc], and you can feel it bumping deeply against your bowels.  After a few minutes the initial pain is gone and you find yourself making bestial sounds along-side the overly-endowed creature.  You long to feel its cum filling you to overflowing, and break into a slight trot that causes the small imp to bounce around inside of your tightening asshole.  The combination of movement, grip, and its own furious thrusting seems to push it over the edge and you can feel jets of sperm shooting deeply into you, sending you into your own anal orgasm.  Used to the limit, the imp slides out of you and drops to the ground, barely conscious. <<Cor 80+>>Grinning at the perversity, you lower yourself down and take its dirty [imp cock desc] into your mouth, cleaning it thoroughly as you enjoy the mixture of your juices.  Your intense sucking and stroking causes a few last spurts of cum to fly out, and you pull the imp out lock enough to shoot the gouy mess over your face and hair while you swallow what was already in your mouth.<<end>>

 {{Player has breast-pussies and is E+ sized breasts}}
 As the imp falls to the ground, furiously masturbating its [imp cock desc] you smile in delight, your [nip-pussy desc] already beginning to grow wet <<lots of milk>>with the massive flow of milk pouring out of them<</milk>>.  You approach the little Imp at an eager trot, lowering yourself down and encasing its [imp cock desc] in your [breasts desc].  Its eyes fly open and stare in wicked delight at what it sees, quickly reaching out and beginning to fondle and finger your [nip-pussy desc].  Unable to resist any more, you press the opening of one of your [breasts desc] against the tip of the [imp cock desc].  If the creature is confused it does not show it, shoving its self hard quickly and hard into your tit.  [if virgin-nip, lose virginity]<<nip-size smaller than dick size>>Pain shoots through you as you feel the [nip-pussy desc] being forced to widen by the imp's massive tool, and you let out a slight scream [increase nip-pussy size]<</smaller>>  Without missing a beat the creature wraps its hands around your [breast desc] and begins thrusting liberally into it as if your tit was nothing more than a giant and perverted fuck-toy.  Seeing no point in arguing with the perception, you reach over and start shoving your own finger into your other [nip-pussy desc], crying out as you urge the imp to use your [breast desc].  Part of you longs to feel the imp's thick and corrupted cream filling your tit-hole, <<Cor <80>> and you begin moving your breast in circles around the thrusting member. <<else>>and you lower your breast against a rock, letting the imp squish your breast under its weight, grinding it into the rough stone as it continues to fuck it<</Cor>>.  The Imp seems to really enjoy this and after a few more minutes of intense pleasure it begins pouring its cum inside of your chest.  Without anywhere to go the cum pours back out, mixed with torrents of milk that are being stimulated out of you.  Exhausted the imp falls to the ground <<Cor <30>>leaving you frustrated. [no lust reduction] <<Cor <50>>before it can see you bringing your nipples to your mouth and sucking on the spermy mixture until you bring yourself to orgasm. <<Cor 80+>>before it can see you bringing your nipples to your mouth.  You suck hard to get to as much of its sperm as you can, shoving your tongue deep into yourself and digging around wih your fingers.  When this is not enough to bring you to orgasm you slap and bite your [nip-pussy desc], crying out as the intensity and perversion finally proves enough to push you over the edge.<</Cor>><<end>>
 */



// Initial Win Scenes

/* You can always kill the imp and take the skull no matter how you win.

To rape the imp, you need at least one of these factors:

Have the Feeder status effect
Be female, have large breasts, and wear the Lusty Maiden Armor
Have a bee ovipositor
Have a lust score equal or greater to 33

Possible results:
If you have a cock and your lust is => 33: male rape.
If you have a cock, your lust is => 33, and you're a taur: male taur rape.
If you have a vagina and your lust is => 33: female rape.
If you have a vagina, your lust is => 33, and you're a taur: group imp female rape.
If your lust is => 33 and you have fuckable nipples: nipple rape
If you have the feeder status: force imp to drain your breasts
If you have a bee ovipositor: implant eggs into imp
If you are wearing the lusty maiden armor and your breasts are big enough: paizuri. (not implemented yet)

Additional possible results are in the commented code above.

 */



ImpScene.victoryAgainstImp = function() {
	clearOutput();
	//Screen messages
	var canFeed = (player.findStatusEffect(StatusEffects.Feeder) >= 0);
	var canBikiniTits = (player.hasVagina() && player.biggestTitSize() >= 4 && player.armor == Items.Armor.LustyMaidenArmor);
	outputText("You smile in satisfaction as " + monster.a + monster.refName + " collapses and begins masturbating feverishly.");
	menu();
	if (canFeed) {
		if (player.lust >= 33)
			outputText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing, but it might be more fun to force it to guzzle your breast-milk.<br><br>What do you do?");
		else outputText("  You're not really turned on enough to rape it, but it might be fun to force it to guzzle your breast-milk.<br><br>Do you breastfeed it?");
	}
	else if (player.lust >= 33 || canBikiniTits || player.canOvipositBee()) {
		outputText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing...<br><br>Do you rape him?");
	}
	else {
		outputText("You smile in satisfaction as " + monster.a + monster.name + " collapses and begins masturbating feverishly.", true);
		if (monster.HP <= 0) {
			addButton(0, "Kill Him", ImpScene.killImp);
			addButton(4, "Leave", cleanupAfterCombat);
		}
		else cleanupAfterCombat();
		return;
	}

	// Generate buttons + additional text.
	if (player.lust >= 33) {
		if (player.hasCock()) {
			if (player.cockThatFits(monster.analCapacity()) == -1)
				outputText("<br><br><b>You're too big to rape an imp with " + player.oMultiCockDesc() + ".</b>");
			else {
                addButton(0, (player.isTaur() ? "Centaur Rape" : "Male Rape"), (player.isTaur() ? ImpScene.centaurOnImpStart : ImpScene.rapeImpWithDick));
                if (player.hasItem(Items.Consumables.Condom) && !player.isTaur()) addButton(5, "Use Condom", ImpScene.rapeImpWithDick, true);
            }
 		}
		if (player.hasVagina()) {
			if (player.isTaur())
				addButton(1, "Group Vaginal", ImpScene.centaurGirlOnImps);
			else
                addButton(1, "Female Rape", ImpScene.rapeImpWithPussy);
		}
		if (player.hasFuckableNipples()) {
            addButton(2, "NippleFuck", ImpScene.impNippleRape);
        }
	}
    else {
        cleanupAfterCombat();
        return;
    }
	if (canFeed) addButton(3, "Breastfeed", ImpScene.areImpsLactoseIntolerant);
	//lustyMaidenPaizuri requires Lusty Maiden Armor to be finished. Finish this later
	//if (canBikiniTits) addButton(4, "B.Titfuck", (player.armor as LustyMaidensArmor).lustyMaidenPaizuri);
	if (player.canOvipositBee()) addButton(8, "Oviposit", ImpScene.putBeeEggsInAnImp);
    addButton(10, "Kill Him", ImpScene.killImp);
	addButton(14, "Leave", cleanupAfterCombat);
}

// MALE RAPE

ImpScene.rapeImpWithDick = function(condomed) {
	clearOutput();
	var x = player.cockThatFits(monster.analCapacity());
	if (x < 0) x = 0;
	if (condomed) {
		player.destroyItems(Items.Consumables.Condom, 1);
		outputText("You first unwrap the condom wrapper and slide the latex all evenly all over your " + player.cockDescript(x) + " until it's fully covered.");
	}
	//Single cock
	//outputText(images.showImage("imp-win-male-fuck"), false);
	if (player.cocks.length == 1) {
		outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck. The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.", true);
		//if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
			outputText(" You casually unclasp your " + player.armorName + " and reveal your " + player.cockDescript(x) + ", ");
			if (player.breastRows.length > 0 && player.breastRows[0].breastRating > 2) outputText("smashing him against your " + player.breastDescript(0) + " while you jerk hard on your " + player.cockDescript(x) + ", bringing it to a full, throbbing erection.");
			else outputText("stroking it to full hardness languidly.");
		//}
		outputText("<br><br>With no foreplay, you press your " + player.cockDescript(x) + " against his tight little pucker and ram it in to the hilt. The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + monster.cockDescriptShort(0) + ". You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
		if (player.cocks[0].cockType == CockTypesEnum.CAT) outputText(" The tiny creature's claws dig into your sides at the feeling of soft, hooked barbs stroking his sensitive insides.");
		if (player.cocks[0].cockLength >= 7 && player.cocks[0].cockLength <= 12) outputText(" Each thrust obviously distorts the imp's abdomen. It amazes you that it doesn't seem to be hurting him.");
		if (player.cocks[0].cockLength > 12) outputText(" Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest. Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
		outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
		if (player.balls == 0 && player.vaginas.length > 0) outputText(" The cum seems to boil out from inside you as your " + player.vaginaDescript(0) + " soaks itself. With delicious slowness you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "");
		if (player.balls == 0 && player.vaginas.length == 0) outputText(" The cum seems to boil out from inside you, flowing up your " + player.cockDescript(x) + ". With delicious slowness, you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + "");
		if (player.cumQ() >= 14 && player.cumQ() <= 30) outputText(" Your orgasm drags on and on, until your slick jism is dripping out around your " + player.cockDescript(x) + ".");
		if (player.cumQ() > 30 && player.cumQ() <= 100) outputText(" Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom": "the imp's asshole") + " around your " + player.cockDescript(x) + " as you plunder him relentlessly.");
		if (player.cumQ() > 100) outputText(" Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last. " + (condomed ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.": "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.") + "");
		outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.  You drop the imp hard and he passes out, dripping " + (condomed ? "semen": "mixed fluids") + " that seem to be absorbed by the dry earth as fast as they leak out.");
	}
	//Multicock
	if (player.cocks.length >= 2) {
		outputText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck. The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.", true);
		//if (player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
			outputText(" You casually unclasp your " + player.armorName + " and reveal your " + player.multiCockDescriptLight() + ", ");
			if (player.breastRows.length > 0 && player.breastRows[0].breastRating > 2) outputText("smashing him against your " + player.breastDescript(0) + " while you jerk hard on one of your " + player.cockDescript(x) + "s, bringing it to a full, throbbing erection.");
			else outputText("stroking one of your members to full hardness languidly.");
		//}
		outputText("<br><br>With no foreplay, you press a " + player.cockDescript(x) + " against his tight little pucker and ram it in to the hilt. The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + monster.cockDescriptShort(0) + ". You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
		if (player.cocks[0].cockLength >= 7 && player.cocks[0].cockLength <= 12) outputText(" Each thrust obviously distorts the imp's abdomen. It amazes you that it doesn't seem to be hurting him.");
		if (player.cocks[0].cockLength > 12 && player.cocks[0].cockLength <= 18) outputText(" Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest. Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
		outputText("<br><br>The tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
		if (player.balls > 0) outputText("The cum seems to boil in your balls, sending heat spreading through your " + player.cockDescript(x) + " as your muscles clench reflexively, propelling hot spurts of jism deep into the imp's rectum. Your other equipment pulses and dripples steady streams of its own cum.");
		if (player.balls == 0 && player.vaginas.length > 0) outputText("The cum seems to boil out from inside you as your " + player.vaginaDescript(0) + " soaks itself. With delicious slowness you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + " Your other equipment drizzles small streams of jizz in sympathy.");
		if (player.balls == 0 && player.vaginas.length == 0) outputText("The cum seems to boil out from inside you, flowing up your " + player.cockDescript(x) + ". With delicious slowness, you fire rope after rope of cum " + (condomed ? "inside your condom.": "deep into the imp's rectum.") + " Your other equipment drizzles small streams of jizz in sympathy.");
		if (player.cumQ() >= 14 && player.cumQ() <= 30) outputText(" Your orgasm drags on and on, until your slick jism is dripping out around your " + player.cockDescript(x) + ".");
		if (player.cumQ() > 30 && player.cumQ() <= 100) outputText(" Your orgasm seems to last forever, jizz dripping out of " + (condomed ? "your condom": "the imp's asshole") + " around your " + player.cockDescript(x) + " as you plunder him relentlessly.");
		if (player.cumQ() > 100) outputText(" Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last. T" + (condomed ? "Your condom swells nearly to the point of bursting, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.": "The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + player.cockDescript(x) + " with each thrust.") + "");
		outputText("<br><br>Satisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.  You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.");
	}
	player.orgasm();
	if (!condomed) player.modStats("cor", 1);
	cleanupAfterCombat();
};

// FEMALE RAPE

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
        outputText("<br><br>You lose track of time as you languidly pump against the imp's " + monster.cockDescriptShort(0) + ".  At long last you feel your " + player.vaginaDescript(0) + " ripple and quiver.  Your " + player.legs() + " give out as you lose your muscle control and collapse against the small demon.  You gasp as his " + monster.cockDescriptShort(0) + " erupts against you, splattering your chest with hot demonic cum that rapidly soaks into your skin.  You giggle as you rise up from the exhausted imp, feeling totally satisfied.");
    }
    //Big enough!
    else {
        outputText("  You sink down his " + monster.cockDescriptShort(0) + " slowly, delighting in the gradual penetration and the tingling feeling of his dripping hot pre-cum.  At last you bottom out on his balls.");
        player.cuntChange(monster.cockArea(0), true);
        outputText("  Your lust and desire spurs you into movement, driving you to bounce yourself up and down on the " + monster.cockDescriptShort(0) + ".  His exquisite member pushes you to the very height of pleasure, your " + player.vaginaDescript(0) + " clenching tightly of its own accord each time you bottom out.  The tensing of the little demon's hips is the only warning you get before he cums inside you, hot demonic jizz pouring into your womb.  Your " + player.legs() + " give out, pushing him deeper as he finishes filling you.");
        outputText("<br><br>The two of you lay there a moment while you recover, at last separating as you rise up off his " + monster.cockDescriptShort(0) + ".  Spunk drips down your legs, quickly wicking into your skin and disappearing.");
        //Taking it internal is more corruptive!
        player.modStats("cor", 1);
        //Preggers chance!
        player.knockUp(PREGNANCY_IMP, INCUBATION_IMP);
        player.cuntChange(monster.cockArea(0), true, true, false);
    }
    player.orgasm();
    player.modStats("cor", 1);
    cleanupAfterCombat();
}

// TAUR RAPE START

ImpScene.centaurOnImpStart = function() {
	clearOutput();
//Event: Centaur-Imp: Player Raping
	outputText("As the imp collapses in front of you, ");
	if (monster.HP == 0) outputText("panting in exhaustion");
	else outputText("masturbating furiously");
	outputText(", you advance toward the poor creature.  The demon's eyes run over your powerful equine muscles as you tower above it.  It is difficult to hide your smile as you look at the tiny creature's engorged cock and the perpetual lust filling its beady eyes.");
//OPTIONAL THOUGHTS
//[if previously gave birth to imps and Cor >50] A part of you wonders idly if this is one the offspring that you added to this world 
//[corruption is under 80] but the you quickly banish the thought. [corruption is over 80]  and the thought fills you with excitement. ))  
//<< Cor <50 >> 
if (player.cor < 50) outputText("  You lick your lips slightly as you begin to approach the small figure.");
else outputText("You lick your lips obscenely as you approach the small figure.<br><br>");
//[Even chance of any of the following happening if the player has the correct equipment, distribute chances between what equipment is available]
var x = player.cockThatFits(monster.analCapacity());
if (x >= 0 && !player.hasVagina()) ImpScene.centaurOnImpMale();
else if (player.hasVagina() && x < 0) ImpScene.centaurOnImpFemale();
else {
	outputText("Do you focus on your maleness or girl-parts?");
	menu();
	addButton(0, "Male", ImpScene.centaurOnImpMale, null, null, null, "TO BE ADDED.");
	addButton(1, "Female", ImpScene.centaurOnImpFemale, null, null, null, "TO BE ADDED.");
	}
}

// MALE RAPE AS TAUR

ImpScene.centaurOnImpMale = function(vape) {
	var x = player.cockThatFits(monster.analCapacity());
	if (x < 0) x = 0;
	if (vape) clearOutput();
	// Strange cocks first.

	//{{Player has multicock and they're very long}}
	if (player.cockTotal() > 1 && player.cocks[player.biggestCockIndex()].cockLength >= 24) {
		outputText("As your shadow falls over it, it looks with a hint of fear between your legs, and then its eyes widen in a mixture of apprehension and lust.  Before you can even more the little creatures scrambles forward between your hooves and wraps its hands around your " + player.cockDescript(player.biggestCockIndex()) + ".  Its tongue begins to trail all along the length of it as its small hands stroke it intensely.<br><br>");
		//<< Cor <50>>
		if (player.cor < 50) {
			outputText("You slowly undulate your " + player.cockDescript(player.biggestCockIndex()) + " against the creature's mouth, delighting in its eager tongue.  ", false);
			//<<GoTo I3 then return>> 
			ImpScene.centaurOnImpResults(3);
			outputText("The sounds beneath you quickly take on a more intense note and you feel massive amounts of cum splashing liberally over your hooves, belly, and " + player.cockDescript(player.biggestCockIndex()) + ".  The hot sensation sends you over the edge as you begin spilling yourself into the creature's eager mouth.<br><br>");
			//<<GoTo I2>>
			ImpScene.centaurOnImpResults(2);
			//<<End>>
			player.orgasm();
			cleanupAfterCombat();
			return;
		}
		//Really big cock, high corruption
		else {
			outputText("With an evil smile you wait for the creature's mouth to touch one of your tentacles before the other two snake their way down and wrap themselves around the imp's thighs.  With a tug the creatures is pulled off of it's feet and upside down, its eyes widening in a mixture of fear and debased lust as it sees your " + player.cockDescript(player.biggestCockIndex()) + " undulating in front of it.  You slowly move the tentacle up as your other cocks forcefully tug its legs apart, and then playfully begin sliding yourself over the imp's small cheeks.<br><br>");
			//<<Cor 80+, has given birth to an imp>>Part of you wonders idly if this is one of the creatures that you spawned, and that left its spermy surprise on you after it came out of the womb<</Cor>>  
			outputText("Licking your lips in anticipation you begin pushing your " + player.cockDescript(player.biggestCockIndex()) + " into the imp's " + monster.assholeDescript() + " while listening to the mewling sounds coming from beneath you.  You take your time as you push in, seeing no need to rush yourself as you feel the creature gaping more and more.  Once you bottom out you reach down and grab the creature's arms, securing it firmly against your belly as you break into a trot.  The sensation of the imp's " + monster.assholeDescript() + " bouncing around your " + player.cockDescript(player.biggestCockIndex()) + " is intense and you ride harder until you know you are close to the bring.  Quickly you slow down and drape the creature over a nearby boulder, using your hands and tentacles to pin it to the harsh surface, and then your mighty legs push you forward even deeper into the creature's bowels.  The shriek should be audible pretty far in this area, and you groan in debased pleasure thinking it might draw someone else for you to rape or be raped by.  Grunting slightly you begin pushing into the imp even harder just to generate more loud sex-noise.  ", false);
			//<<Breasts>>
			if (player.biggestTitSize() >= 0) {
				outputText("One of your hands releases it and begins playing with your " + player.allBreastsDescript(), false);
				//<<nips have pussies>> 
				if (player.hasFuckableNipples()) outputText(" and fingering your " + player.nippleDescript(0) + "s", false);
				outputText(" as you drool slightly in absolute pleasure.  ", false);
			}
			outputText("When the creature's noises lessen and all you can hear is the sloppy sounds of its ass being fucked you push yourself in a single mighty heave, grinding the creature into the rock and eliciting one last scream that pushes you over.<br><br>");
			//<<GoTo I1>>
			ImpScene.centaurOnImpResults(1);
			//<<End>>
			player.orgasm();
			cleanupAfterCombat();
			return;
		}
	}
	// Player has multicock, but not huge ones
	else if (player.cockTotal() == 2) {
		outputText("With an evil smile you wait for your " + player.cockDescript(player.smallestCockIndex()) + " to be at its lips before you slide it forward into its waiting mouth.  Giving it little more than a moment to catch its breath you slide your " + player.cockDescript(player.smallestCockIndex()) + " further and down the creature's throat.  Though you cannot see the obscene bulge it is making in the creature's mouth-pussy you delight in the intense tightness beneath you.  The throat muscles are massaging your " + player.cockDescript(player.smallestCockIndex()) + " as the imp desperately scrambles for air, pulling at the tentacles you have forced into it.  It cannot even begin to close its jaw as you thrust deeper and deeper, as you try to intensify the sensations.<br><br>");
		outputText("As the imp is focused on the tentacles cutting off its air, you position your " + player.cockDescript(player.biggestCockIndex()) + " against its " + monster.assholeDescript() + ".  Pausing only for a second for the pleasure of anticipation, you shove yourself deep inside the imp's " + monster.assholeDescript() + ", only making it a few inches before having to pull back and try again.  The creature's throat seems to be working overtime now as it tries to divide its attention between the two invaders.  Each thrust of your " + player.cockDescript(player.smallestCockIndex()) + " makes it a little bit deeper inside of the creature, and you wonder passionately if you can get the two to meet in the middle.<br><br>");
		outputText("It is not long before you begin to feel the creature's struggles slowing down.  ", false);
		//<<Cor <80 >> 
		if (player.cor < 80) {
			outputText("Feeling merciful you extract yourself from the creature, flipping it unto a nearby rock as it begins to regain consciousness.  Before it realizes what you are doing your " + player.cockDescript(player.biggestCockIndex()) + " is prodding at its " + monster.assholeDescript() + ", then sliding quickly between its cheeks.  The amount of slobber over you is more than enough lubricant.  You groan in pleasure as it gives a slight squeal, then proceed to finish yourself off in the once-tight orifice.<br><br>");
			//<<Goto I1>> 
			ImpScene.centaurOnImpResults(1);
			player.orgasm();
			cleanupAfterCombat();
			return;
		}
		//<<Cor 80+>> 
		else {
			outputText("You groan in pleasure and slide your " + player.cockDescript(player.biggestCockIndex()) + " even deeper down the creature's throat, until you can feel its head against your ", false);
			//<<if balls>>
			if (player.balls > 0) outputText(player.ballsDescriptLight() + ".<br><br>");
			else outputText("groin.<br><br>");
			//<<GoTo I3 then return>> 
			ImpScene.centaurOnImpResults(3);
			outputText("A guttural moan escapes your mouth as you realize the creature has completely passed out underneath you.  ", false);
			if (player.hasFuckableNipples()) outputText("Shoving your fingers deep into your " + player.nippleDescript(0) + "s", false);
			else outputText("With a fierce tug on your " + player.nippleDescript(0) + "s", false);
			outputText("you begin to cum deep and directly into the imp's stomach and " + monster.assholeDescript() + ".  ", false);
			//<<cum multiplier: lots>>
			if (player.cumQ() > 250) outputText("Beneath you the creature's belly is distending more and more, and you can feel some of the overflowing cum filling back out until it is pouring out of the creature's unconscious mouth and overstretched ass, forming a spermy pool beneath it.", false);
			outputText("With on last grunt you begin extracting the tentacles back out, almost cumming again from the tightness around them.  You give your " + player.cockDescript(player.smallestCockIndex()) + " one last shake over the creature's face before trotting away satisfied and already thinking about the next creature you might abuse.", false);
			player.orgasm();
			cleanupAfterCombat();
			return;
		}
	}
	// Normal cock
	else {
		outputText("As your shadow falls over the imp, it looks between your " + player.legs() + " with a hint of fear.  ", false);
		if (player.cockArea(x) <= 15) {
			outputText("Relief washes over it followed by intense lust as is throws itself onto a mossy rock and eagerly presents its " + monster.assholeDescript() + ".   The sound of your hooves moving on either side of its body seems to send the creature into a frenzy as it begins humping the air while small mewling sounds escape its lips.  ", false);
			//<<Cor <50>> 
			if (player.cor < 50) outputText("You slowly rub your " + player.cockDescript(x) + " between the creature's cheeks, letting your pre-cum oil the small hole, before slowly beginning the insertion.  Before you can get half-way the creatures drives its self back against you, impaling its " + monster.assholeDescript() + " around your " + player.cockDescript(x) + " and making inhuman sounds of ecstasy. The " + monster.assholeDescript() + " relaxes around your " + player.cockDescript(x) + ", taking it all in while its practiced muscles grip and jerk you off internally.<br><br>");
			//<<Cor 50+>> 
			else outputText("You position your " + player.cockDescript(x) + " against its dry anus and drive yourself inside of it using your powerful equine legs.  The creatures gives a loud shriek as its insides are forced open, and you feel the raw tightness trying to resist your intrusion.  Giving the creature no chance to relax you begin pistoning into it, grinning as the sounds of pain give way to grunts and yelps of pleasure. You cannot last long in the creature's hole, and soon spurts of cum begin shooting out and filling its bowels.<br><br>");
			//<<GoTo I1>>
			ImpScene.centaurOnImpResults(1);
			//<<End>>
			player.orgasm();
			cleanupAfterCombat();
			return;
		}
		else if (player.cor < 50) {
			//<<Cock: large, Cor <50>>
			outputText("The imp's eyes widen and you see its apprehension as it attempts to turn and flee.  You make soothing sounds as you approach the skittish creature, while easily keeping pace with it.  Seeing little chance for escape, the creature turns toward you again and carefully begins making its way between your " + player.legs() + ", eyes wide in supplication.  Your smile seems to relax it, and lust fills its eyes again as it slowly starts massaging your " + player.cockDescript(x) + ".  Getting more and more confident, the creature is soon using both of its hands on your " + player.cockDescript(x) + ", and its wet and serpentine tongue is moving all over the length of your erection.  There is little chance of your " + player.cockDescript(x) + " fitting into its small mouth, but it does its best to pleasure you as it goes more and more wild.  ", false);
			//<<Thick large>>
			if (player.cocks[0].cockThickness > 3) {
				outputText("It is not long before you feel its tongue slipping into your urethra, and cum rushes from your ", false);
				if (player.balls > 0) outputText(player.ballsDescriptLight(), false);
				else outputText("prostate", false);
				outputText(" as you feel the foreign invader wiggling inside.  ", false);
				//<</Thick>>  
			}
			outputText("You cannot take the attention for long before your hooves are scraping at the ground and jets of sperm shoot out of your " + player.cockDescript(x) + " and down its waiting throat.<br><br>");
			//<<GoTo I2>>
			ImpScene.centaurOnImpResults(2);
			//<<End>>
			player.orgasm();
			cleanupAfterCombat();
			return;
		}
		//<<Cock: large, Cor 50+>>
		else {
			outputText("The imp's eyes widen and you see apprehension as it tries to turn around and get away.  It does not make it far before you run it down, knocking it over with your muscled flank.  Before it can try to run again you pin it down and position your " + player.cockDescript(x) + " against its " + monster.assholeDescript() + ".  It feels far too small to handle your girth but a push of your powerful legs gets you in with the first inches.  The imp squeals out in pain and you wince slightly in the vice-like grip.  Gritting your teeth you push in the remaining length, the sounds of pain only serving to drive you forward all the harder.  Soon your " + player.cockDescript(x) + " is moving in and out with more ease, though the imp's tender asshole is distending abnormally to accommodate the invading member.  As much as you long to extend your pleasure, the sensation and the unnatural sounds of the penetration prove too much for you to last long.<br><br>");
			//<<GoTo I1>>
			ImpScene.centaurOnImpResults(1);
			//<<End>>
			player.orgasm();
			cleanupAfterCombat();
			return;
		}
		// Catchall

	}
	// Failsafe
	outputText("Reached Catchall for ImpScene.centaurOnImpMale. Report it please.")
	player.orgasm();
	cleanupAfterCombat();
}

// FEMALE RAPE AS TAUR

ImpScene.centaurOnImpFemale = function(vape) {
	if (vape) clearOutput();
	//PREGGERS CHANCE HERE - unfinished
	//{{Player has a cunt}}
	player.slimeFeed(); // Check this function
	player.knockUp(PREGNANCY_IMP, INCUBATION_IMP);
	outputText("As the imp lays beaten its hands stroke its " + monster.cockDescriptShort(0) + " as its eyes look over you in the hope that you might abuse it in some manner.  You lick your lips as you stare at the large member and you turn around to display your " + player.vaginaDescript(0) + ".  ", false);
	//Not gaping?
	if (player.vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS_GAPING) {
		//Penetration for non-gape cases
		outputText("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " + player.vaginaDescript(0) + ".  ", false);
		//<<If Pussy Virgin>>

		if (player.vaginas[0].virgin) {
		outputText("You cry out as your virginal pussy is torn open by the massive member and the creature cries out in pleasure as it realizes what it has taken from you.  ", false);
		//[Lose Virginity] <</Virgin>>
		}
		//Not virgin fucking flavors
		else {
			if (player.vaginalCapacity() < monster.cockArea(0)) outputText("It groans in delight at your incredible tightness and shoves itself forward even harder.  ", false);
			//[Increase size as needed]
			//<<At Dicksize>>
			if (player.vaginalCapacity() >= monster.cockArea(0) && player.vaginalCapacity() <= monster.cockArea(0)*1.25) outputText("It makes a pleased sound as it slides deeply into your " + player.vaginaDescript(0) + ".  ", false);
			//<<Bigger than dicksize>>
			if (player.vaginalCapacity() >= monster.cockArea(0) * 1.25) outputText("Its dick slides easily and slopping noises start sounding from your backside.  Part of you wishes that its large member was larger still, as your mind drifts to some of the monstrous cocks that have penetrated you in the past.  ", false);
		}
	//Ride around with him till he cums and falls off
		outputText("When the creature completely bottoms out inside of you, you begin trotting forward with a wicked grin.  The creature's hands grasp your flanks desperately, and its " + monster.cockDescriptShort(0) + " bounces inside your " + player.vaginaDescript(0) + ", adding to your sensation.  The movement is causing the imp to push himself even harder against you as it tries to not fall off, and it is all you can do to keep an eye on where you are going.  Soon you can feel the imp's sperm filling your " + player.vaginaDescript(0) + " and overflowing even as your cunt-muscles try to milk it of all of its seed. Unsatisfied you begin to speed up as you use its " + monster.cockDescriptShort(0) + " to bring about your own orgasm.  The small creature is unable to let go without hurting itself.  It hangs on desperately while you increase the pace and begin making short jumps to force it deeper into you.  The feeling of sperm dripping out and over your " + player.clitDescript() + " pushes you over and cry out in intense pleasure.  When you finally slow down and clear your head the imp is nowhere to be seen.  Trotting back along the trail of sperm you left behind you find only its small satchel.", false);
		player.cuntChange(monster.cockArea(0), true, true, false);
		player.orgasm();
		cleanupAfterCombat();
		return;
	//END OF NON GAPE CASE
	}
	//<<Gaping>>
	else {
		outputText("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " + player.vaginaDescript(0) + ".  While you might have considered him large before you came to this place, the sensation is now merely pleasant, and you can't help but groan in slight disappointment.  ", false);
	//<<Cor 50+>>
		if (player.cor >= 50) outputText("You take comfort in knowing that at least there is a cock inside of you, and that soon it will be filling you with its seed.  Perhaps it might even impregnate you!  ", false);
		outputText("The imp seems to have shared your initial annoyance, and suddenly you feel strange and harsh objects prodding your " + player.vaginaDescript(0) + " near where you are being penetrated.  Suddenly you feel yourself being forced open even wider, and you feel almost as if you are getting kicked inside of your pussy.  A second object touches near where the first had entered and you quickly brace yourself against a nearby tree.  The second jolt is even harder, feeling as if your cervix is getting stomped.  You howl out in pain as your pussy is virtually torn open, the imp using your tail to leverage not only his " + monster.cockDescriptShort(0) + " but also his legs inside your " + player.vaginaDescript(0) + ".  ", false);
	//<<Cor <80>>
		if (player.cor < 80) outputText("Tears pour out of your eyes and you are sure you must be bleeding slightly, ", false);
	//<<Cor <50>>
		if (player.cor <50) outputText("and you hang on to the tree, afraid of the pain from even the slightest movement.  ", false);
	//<<Cor 50+>>
		else outputText("and you hang on to the tree, grunting like a rutting animal as you delight in the intense pain.  ", false);
	//<<Cor 80+>>
		if (player.cor >= 80) outputText("You howl out in pain and pleasure, bucking and hoping to intensify the sensation, hurling enticements and insults at the imp like a slut.  ", false);
	//<<Cor 50+, Breasts>>
		if (player.cor >= 50 && player.biggestTitSize() >= 2) {
			outputText("You release the tree as you begin playing with your " + player.allBreastsDescript(), false);
			//<<w/ nip-pussies>>
			if (player.hasFuckableNipples()) outputText(" and shoving your fingers into your " + player.nippleDescript(0) + ".  ", false);
			else outputText(".  ", false);
			//<</Breasts>>
		}
		outputText("The imp is pushing deeper and deeper and in moments you cry out again as you feel first its hooves and then its " + monster.cockDescriptShort(0) + " tearing open your cervix and bottoming out in your womb.  ", false);
	//<<Asshole large+>>
		if (player.analCapacity() >= 35) {
		outputText("When the imp realizes it cannot go any further you feel its hands against your asshole, and your eyes go wide in realization of what it is planning on doing.  Lubed up by your now drooling juices, the fist pushes hard into your " + player.assholeDescript() + ", shoving past your ring-muscles.  ", false);
		//<<Assole <gaping, Cor <80>>
		if (player.ass.analLooseness < 4 && player.cor < 80) outputText("Your howl of pain leaves your throat raw.  ", false);
		else outputText("Your howl of perverse pleasure leaves your throat raw.  ", false);
		}
		outputText("<br><br>It is a relief when you feel the creature's sperm filling your womb and lubricating your raw cervix, your own body is wrecked by an intense orgasm while it breeds you.  You pass out, waking up to find that the imp has slipped out of you and is lying unconscious and coated completely in a mixture of your juices and his own. After looking for anything you might be able to take away from him you limp away, you ", false);
		if (player.cor < 80) outputText("promise to yourself that you will not do that again.", false);
		else outputText("find your cunt juices already dripping down your legs in anticipation of doing this again.", false);
		player.orgasm();
		cleanupAfterCombat();
		return;
	}
	// Failsafe
	player.orgasm();
	cleanupAfterCombat();
};

// FEMALE RAPE AS TAUR, GROUP OF IMPS

ImpScene.centaurGirlOnImps = function() {
	clearOutput();
outputText("You stand over the thoroughly defeated demon and get an amusing idea. The tiny creatures are far from a threat, but their features seem like they might be useful. You pick the imp up and place him in a tree with explicit orders to him to stay, much to his confusion. Once you're sure he won't move, you wolf whistle and wait.<br><br>");
outputText("A goblin appears from the underbrush behind you, but a swift kick sends her flying; she's not what you're after. You're soon rewarded with a trio of imps, who fly up to you, cocks at the ready.  Grabbing the defeated imp by the head, you explain your need to the group and waft a bit of your scent over to them with your tail. They confer among themselves only briefly, clear on the decision, as you toss their weaker fellow underneath them. The larger of the three, evidently the leader, smiles lewdly at you and agrees to your 'demands'.<br><br>");
//[Female:
if (player.hasVagina()) {
	outputText("The imps approach you, their various genitalia glistening in the sun and drawing your attention. Their cocks swing lewdly with every flap of their wings, but you turn around, wanting their ministrations to be a surprise.<br><br>");

	outputText("Hands slide over you, stroking and patting your equine form. The roving fingers find their way to your rear quickly, and begin teasing around your " + player.vaginaDescript() + " and " + player.assholeDescript() + ". They probe around but don't penetrate and you stamp your hoof in frustration. There's a chuckle from behind you and all but a handful of the hands disappear.<br><br>");

	outputText("A slightly larger hand smacks your " + player.assDescript() + " then slides up and pops a thick finger inside. Your " + player.assholeDescript() + " tries to suck it in deeper, but loses the opportunity as it's extracted before doing anything. Instead, the hand returns to your flank and slides slowly forward to your torso.<br><br>");

	outputText("The 'head' imp comes around into your vision, hovering in front of you and letting you get a good look at his long member. He pulls on it, extracting a large bead of pre onto his other hand. Opening your mouth, he wipes the salty substance onto your tongue. You swallow it happily and feel your mouth watering and your " + player.vaginaDescript() + " pumping out fluid.<br><br>");

	outputText("The leader looks past you and gives a signal to someone you can't see, but you don't have time to turn as a huge dog cock is slipped into your slavering cunt and an even larger spined prick is inserted into your " + player.assholeDescript() + ". They begin pumping into you hard, and you whinny in satisfaction while the demon before you watches, jerking on himself.");
	player.cuntChange(monster.cockArea(0), true, true, false);
	player.buttChange(monster.cockArea(0), true, true, false);
	outputText("<br><br>");

	outputText("He disappears behind you and gives you a slap on the haunches, yelling, \"<i>Giddyup!</i>\" and laughing heartily. Whether he expected you to or not, you decide to go for it and push off the ground with your forelegs, kicking them about in the air and feeling the demons aboard you scrabble to stay attached, before setting off at as fast a run as you can. You tear about in the dirt, clumps of mud and weeds flung behind you.<br><br>");

	outputText("At the edge of the clearing is the leader, laughing as he watches you and still jerking himself. As if realizing that there's a better option available, he grabs the defeated imp and inserts himself into him, using him like a living cock sleeve who appears to not mind the position and cries out repeatedly as his ass is abused.<br><br>");

	outputText("Your unexpected running momentarily paused the cocks inside you as their owners groped for holds on your " + player.hipDescript() + " and " + player.assDescript() + ". With their positions relatively well established, they begin pounding at you again, causing you to nearly stumble in pleasure.<br><br>");

	outputText("Managing to steady yourself, you run faster, feeling the frenetic cocks inside you explode. The hot spunk sprays about inside and you scream in ecstasy.");
	//[Has breasts:
	if (player.biggestTitSize() > 1) outputText("  Your hands reflexively grab your " + player.chestDesc() + " and mash them about.");
	outputText("<br><br>");

	outputText("The owner of the dog-cock in your " + player.vaginaDescript() + " manages to insert his knot as his balls empty inside you, but the cat-cock's body has no such luck and his grip on you falters. He slides out of your " + player.assholeDescript() + " but manages to grasp the fur of your back and straddle you, all while his cock continues to spray you down with jism.<br><br>");

	//[Has breasts:
	if (player.biggestTitSize() > 1) {
		outputText("He slides up to your torso and grasps your wildly flailing " + player.allBreastsDescript() + ", massaging them harshly. His ministrations are surprisingly crude, and you wonder how many times he's attempted to pleasure a woman.");
		//[Has fuckable nipples:
		if (player.hasFuckableNipples()) outputText("  His fingers slide inside your " + player.nippleDescript(0) + "s and start spreading and squishing them. Your femcum leaks out over his hands and soon your front is slick and shiny.");
		//All other nipples:
		else outputText("  His fingers grope and grab at your nipples, stretching them uncomfortably. Before you can complain he seems to realize his mistake and releases them.");
		//[Is lactating normally:
		if (player.biggestLactation() >= 1 && player.lactationQ() < 50) outputText("  Milk dribbles and squirts from you as his desperate squishing continues, forming small puddles on the ground.");
		else if (player.biggestLactation() >= 1) outputText("  Milk sprays from you as his desperate squishing continues, creating massive puddles of milk that you splash through as you continue moving.");
		outputText("<br><br>");
	}

	outputText("You stop running, spraying dirt in a massive fan and sending the imp on your back flying into a tree, where he crumples to the ground unceremoniously. The doggy-dicked imp collapses out of you and is sprayed down with your orgasm, coating him in femcum and his own semen.<br><br>");

	outputText("You trot over to the leader, still using the nearly unconscious imp as a cock sleeve, and pull the abused creature off of him. He looks shocked as you grab his cock and squeeze his balls, causing him to orgasm hard and spray you down in white hot seed. He collapses onto the ground, spent, as you wipe yourself down as best you can.");

	outputText("  Collecting your things, you give the assorted bodies one last look and stumble back to camp.");
	player.orgasm();
	player.modStats("cor", 1);
}
cleanupAfterCombat();
};

// TAUR RESULTS

ImpScene.centaurOnImpResults = function(iNum) {
	var x = player.cockThatFits(monster.analCapacity());
	if (x < 0) x = 0;

	//Result 1
	if (iNum == 1) {
		//<<cum multiplier: lots>>
		if (player.cumQ() >= 250) {
		//<<no knot>>
			if (player.cocks[x].cockType != CockTypesEnum.DOG) outputText("Soon the amount is overflowing from the abused " + monster.assholeDescript() + ", dripping between you with no sign of stopping as you continue thrusting yourself into the imp.  ", false);
			//<<knot>>
			else outputText("Soon the abused " + monster.assholeDescript() + " is full to the brim, though your knot keeps any from escaping while more and more pumps in.  Soon the creature's belly is distending and the imp is gasping wordlessly. ", false);
			outputText("When your " + player.cockDescript(x) + " finally emerges a torrent of cum follows out of the distended hole and covering the back of the creature's legs.  ", false);
			//<<I1_1>>
			//<<2 cocks>>
			if (player.cockTotal() == 2) outputText("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ", false);
			//<<3+ cocks>>
			if (player.cockTotal() > 2) outputText("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ", false);
			//<</I1_1>>
			outputText("You leave him panting and lapping at a pool of your semen.", false);
		}//<</multiplier>>
		//<<cum multiplier: little-normal>>
		else {
			outputText("With a last thrust into the cum receptacle you begin slowing down, even as its own " + monster.cockDescriptShort(0) + " spills its seed over the ground.  ", false);
			//<<I1_1>>
			//<<2 cocks>>
			if (player.cockTotal() == 2) outputText("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ", false);
			//<<3+ cocks>>
			if (player.cockTotal() > 2) outputText("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ", false);
			//<</I1_1>>
			outputText("You leave him panting and draped over the mossy boulder in a pool of your joint cum.", false);
		}
		return;
	}

	// Result 2
	if (iNum == 2) {
		//<<cum multiplier: lots>>
		if (player.cumQ() >= 250) {
			outputText("The imp's eyes widen in at the amount pouring in, and gobs of sperm begin overflowing down its chin.  ", false);
			//<<(lots cont.)  cum multiplier: excessive>>
			if (player.cumQ() >= 500) outputText("No matter how fast it is swallowing it does not seem to be enough, and soon its belly is distended and its skin is covered in a thick coating of cum.  ", false);
			//<</multiplier>>
		}
		outputText("Sated you trot away and leave the creature licking its lips and fingers, its eyes following you with lustful cunning.", false);
		return;
	}

	// Result 3
	if (iNum == 3) {
		//<<Has Breasts>>
		if (player.biggestTitSize() >= 2) {
		outputText("As the sensations intensify you reach up and begin massaging your " + player.breastDescript(0) + " and playing with your " + player.nippleDescript(0) + "s.  ", false);
		//<<(breasts cont.) nips have pussies>>
		if (player.hasFuckableNipples()) {
			//<<nip-pussies and milk>>
			if (player.biggestLactation() >= 1) outputText("Milk streams out from your " + player.nippleDescript(0) + "s as if they had been recently filled with dripping cum.  ", false);
			else outputText("Your fingers slide faster and faster into your " + player.nippleDescript(0) + "s even as the imp begins to stroke itself under you.  ", false);
			}
		//No pussies
		else {
			//<<else no pussies, has milk>>
			if (player.biggestLactation() > 0) {
				//<<little milk>>
				if (player.biggestLactation() <= 1) outputText("Beads of milk begin to drip down your chest and occasionally spurt outward.  ", false);
				//<<else>>
				else outputText("Milk pours out of your " + player.breastDescript(0) + " and streams down your body.  ", false);
				}//<</milk>>
			}
		}//<</Breasts>>
	return;
	}
};

// NIPPLE RAPE

ImpScene.impNippleRape = function() {
	clearOutput();
	outputText("You slowly walk over to the masturbating imp, your " + player.hipDescript() + " and " + player.buttDescript() + " swaying suggestively with every step.<br><br>");

	outputText("Shedding your clothes you push the imp to the ground and straddle him, keeping his hands away from his twitching pecker while you quickly tie him up with his own loincloth.  The lust-addled demon utterly incapacitated, you start to use both of your hands to toy freely with your slimy nipple-holes, as well as your ");
	if (player.hasCock()) outputText(player.cockDescript(0));
	if (player.hasCock() && player.hasVagina()) outputText(" and ");
	if (player.hasVagina()) outputText(player.vaginaDescript(0));
	else if (player.gender == 0) outputText(player.assholeDescript());
	outputText(".<br><br>");

	outputText("You gently insert a single digit into one of your nipple-cunts, ");
	if (player.lactationQ() >= 1000) outputText("unleashing a torrent of thick, creamy milk and ");
//(if regular milky; 
	else if (player.lactationQ() >= 50 && player.biggestLactation() >= 1) outputText("releasing a steady trickle of warm milk and ");
	outputText("lust-induced sex juice onto the imp's lap; your other hand instinctively moves down to stroke your ");
//((if male/herm; 
	if (player.hasCock()) {
		outputText("rock-hard cock");
	if (player.hasVagina()) outputText(" and ");
	}
	if (player.hasVagina()) outputText("dripping wet pussy");
	if (player.gender == 0) outputText(player.assholeDescript());
	outputText(", teasing him with a lewd moan as your head rolls back in sexual ecstasy.");
	if (silly()) outputText("  The imp is sickened, but curious.");
	outputText("<br><br>");

	outputText("You continue finger-fucking your nipple, becoming more and more aroused as the imp gets harder and harder from watching the exotic display before him.  You soon tire of watching the imp squirm beneath you, desperate for sexual relief; you slowly move your hand away from your groin, reaching down towards his crotch, and start to toy with his apple-sized balls, fondling and squeezing them roughly.  You casually slip a second finger into your wet nipple-hole, stretch it out teasingly, and hold the gaping orifice in front of the imp's face, giving him a good view of the inside of your freakish, wet nipple-cunt.<br><br>");

	//(If corrupt: 
	if (player.cor >= 66) {
		outputText("\"<i>Mmm, wouldn't you just love to stick your fat cock into this sopping wet hole, and cum deep inside my " + player.chestDesc() + "?</i>\"  You whisper huskily into his ear, sliding your fingers away from his balls and up along the underside of his aching dick, teasing every inch of it until you reach his swollen head and start rubbing your finger around his glans in small circles.  The imp is panting heavily, his eyes firmly locked on your ");
	//(if normal)
	if (player.biggestLactation() < 1) outputText("wet");
	//(if lactating)
	else outputText("milky");
	outputText(", bucking his hips upwards in desperation.<br><br>");
}
	outputText("Deciding that the poor bastard has suffered enough, you guide your stretched " + player.nippleDescript(0) + " down to his quivering member and hold it over the tip for a moment.  The imp groans in frustration, feeling the heat of your slutty juices dripping down onto his aching rod and overfull testes, making him even more desperate to drive deep into your waiting breast.  Without warning, you forcefully shove your breast onto his swollen fuckstick, ");
	if (player.biggestTitSize() <= 4) outputText("bottoming out halfway on his immense dick.");
	else outputText("only stopping when the flesh of your immense mammary bumps into his quaking ballsack.");
	outputText("<br><br>");

	outputText("You shudder in ecstasy as you rise off of his drenched girth; your nipple-hole is slick with arousal, making it easier for you to slide back down until ");
//((if breast size below D) 
	if (player.biggestTitSize() <= 4) outputText("you feel his swollen cock bottom out, your petite breast unable to swallow any more of his throbbing maleness");
//((over D) 
	else outputText("his swollen cock and desperately filled balls are entirely engulfed in tit-flesh");
	outputText(".  Eventually the imp starts timing his thrusts with your movements, and soon the two of you are working in a steady rhythm - thrust, retract, thrust, retract.  Minutes go by as the rhythm slowly builds towards a crescendo, with the only sounds being the lewd schlicking noise of your breast servicing the imp's rod, and the odd moan escaping your lips.  While one hand is furiously jilling off your vacant nipple-slit, the other one is furiously");
//[(if male)
	if (player.hasCock()) outputText(" pumping your " + player.cockDescript(0));
//(if female)
	else if (player.hasVagina()) outputText(" fingering your hungry baby tunnel");
	else outputText(" fingering your tingling anus");
	outputText(".<br><br>");

	outputText("Eventually the rhythm becomes more sporadic as you and the imp approach climax; your tongue rolls out of your open mouth and your toes curl as you feel the imp spasm violently inside you, letting an endless stream of his searing spunk pour directly into your " + player.chestDesc() + ".  The intense heat pushes you over the edge and ");
//(if dick)
	if (player.hasCock()) {
		outputText("a ");
	//[(cum production < 500ml)
		if (player.cumQ() < 500) outputText("jet ");
	//(cum production 500-1000ml)
		else if (player.cumQ() < 1000) outputText("geyser ");
	//(cum production > 1000ml)
		else outputText("volcano ");
		outputText("of cum sprays from your " + player.cockDescript(0) + " and splatters over both you and the hapless imp");
		if (player.hasVagina()) outputText(", while ");
	}
	if (player.hasVagina()) {
		outputText("your pussy juices spurt out as your " + player.vaginaDescript(0) + " twitches in orgasm");
	}
	if (player.gender == 0) outputText("your asshole clenches tight on your finger");
	outputText(".<br><br>");

	outputText("You collapse heavily on top of the imp, once again impaling your breast on his still-erect cock.  You lie like this for a few moments until you notice that the imp has dozed off, exhausted by the whole ordeal.  You stand up woozily as a mixture of ");
//(if lactating) 
	if (player.biggestLactation() >= 1 && player.lactationQ() < 40) outputText("milk, ");
	outputText("fem-spunk and hot demon cum leaks out from your gaping nipple-cunt.<br><br>");

//(if corruption > 60)
	if (player.cor > 60) outputText("You thrust your digits into your " + player.nippleDescript(0) + " once more, scooping out as much imp jizz as you can reach.  You happily drink up the thick goo, savoring the cloying taste before quickly getting dressed and leaving the imp to slumber.");
//(continue to non-corrupt text)
//(if not)
	else outputText("You quickly get dressed and leave the imp to his slumbering, his hands still tied together by his loincloth.");
//Gain xp and gems here
	player.orgasm();
	player.modStats("sen", -3, "cor", 1);
	cleanupAfterCombat();
}

// FEEDER SCENE WITH IMP

ImpScene.areImpsLactoseIntolerant = function() {
	clearOutput();
	outputText("You advance on the masturbating imp, baring your " + player.allBreastsDescript() + " and swinging them from side to side. The little creature watches them, mesmerized as he masturbates his foot-long erection.<br><br>");

	outputText("You sit down in front of the little creature and grab ahold of his hair. The imp squeals slightly in pain before his cries are silenced with a " + player.nippleDescript(0) + ".  It fills his mouth as he yields, defeated. At once he starts to drink down as much of your milk as he can.<br><br>");

	outputText("After a moment, he takes one of his hands off his large member and puts it against your " + player.biggestBreastSizeDescript() + " to steady himself as he continues to nurse. You give a pleased sigh and simply bask in the sensations of pleasure that being nursed gives you.  You ruffle the little imp's hair affectionately. \"<i>These creatures are so much nicer to be around when they just take their minds off their cocks,</i>\" you think as you see his other hand relax and stop rubbing his swollen, demonic member.<br><br>");

	outputText("You feel the imp's mighty gulps start to slow down until he lets out a sigh of relief. While imps may be small, they're very hungry creatures. Your " + player.nippleDescript(0) + " slips out of the imp's mouth, and you gently lay it down on the ground. It gives a few gentle burps before dozing off; you can see that the imp's erection has retracted, and its belly has expanded significantly. You smile to yourself and, feeling fully satisfied, you stand up.", false);
//set lust to 0, increase sensitivity slightly
	player.modStats("lib", .2);
	player.changeLust(-50);
	player.milked(); // Check this function
	cleanupAfterCombat();
}

// PUT BEE EGGS INTO IMP

ImpScene.putBeeEggsInAnImp = function() {
	clearOutput();
	//IMP EGGS
	//(functions for bipedal bee morphs.  At time of writing, unsure as to whether bee abdomen worked for centaur/naga/goo forms)
	//outputText(images.showImage("imp-egg"), false);
	outputText("You glance down at the masturbating imp, feeling a twitch in your swollen, insectile abdomen.  As the red-skinned homunculus writhes on the ground, beating his meat, you smile, feeling a globule of sweet nectar oozing out of your ovipositor.");

	outputText("<br><br>He’s too busy humping the air and stroking himself to notice you hooking the tip of one of your [feet] under him.  You kick up one of your [legs], flipping the fapping imp over.  He gasps as he lands face-down on the ground, startled enough to stop jerking his tool.");
	outputText("<br><br>You grin, straddling his surprisingly perky ass, resting your [hips] on his small, round cheeks.  With your arms pinning down his shoulders, he can’t stroke himself, and he whimpers at the restraint.");

	outputText("<br><br>\"<i>Wait - what’s going on?</i>\" he gasps.");

	outputText("<br><br>You deign not to answer him, lost in the unique sensation of your abdomen curling behind you.  You toss your head back, luxuriating in the pleasure of your black ovipositor emerging against smooth, glossy skin of the imp’s ass.");

	outputText("<br><br>\"<i>No, nooooooo...</i>\" whimpers the imp as you bite your lip, pushing the tip of your organ into his surprisingly pliant hole.");

	outputText("<br><br>You and the imp shudder in tandem as your sweet honey smears between his cheeks, oozing down his crack as you squeeze your throbbing ovipositor further and further into him.  Buried deep in his bowels, you feel the first of your eggs push through your rubbery organ, stretching out your tube along with his asshole.");

	outputText("<br><br>As you lay your first egg inside the imp, he gurgles, face-down against the ground, and you feel him tighten around your ovipositor.  The imp wriggles beneath your body and by the slowly-spreading pool of steaming cum; you guess that he just climaxed.");

	outputText("<br><br>The imp pants, trying to catch his breath as you twitch your abdomen, adjusting your ovipositor inside him.  Before he can recover, you push another egg down your tube, implanting it deep in the imp alongside the first egg.");

	outputText("<br><br>\"<i>Suh-stop...</i>\" groans the imp even as you push a third egg into his tiny body.  But you’re beyond stopping.  Egg after egg, you fill his twitching body.  The pool of cum grows, and it oozes around your ");
	if (player.isGoo()) outputText("rippled goo edges");
	else if (player.isNaga()) outputText("trembling coils");
	else outputText("straddling knees");
	outputText(" as you turn the imp into your own, private incubator.");

	outputText("<br><br>After a handful of eggs, you grunt, realizing that you’ve run out of room inside the imp.  Tilting your head to one side, you consider that the imp is face-down, and that his stomach might need more room to stretch.  You rise halfway up and flip him over beneath you, careful to leave your ovipositor still buried inside him.");

	outputText("<br><br>The imp’s eyes are almost completely rolled back in his head, his flat chest smothered with his own spunk.  His breathing is ragged, and his hard, massive cock is slathered with thick, white cum.  His belly already bulges slightly with your eggs and his small hands move to clutch at his stomach, giving him the look of a debased, pregnant mother.");

	outputText("<br><br>That realization is enough to stimulate your ovipositor again.  With a groan, you plant your hands on the ground to either side of his head, on your knees as your ovipositor pumps another egg into the imp’s bowels.  The imp shudders as his belly swells, filling with your brood.");

	outputText("<br><br>\"<i>More... more!</i>\" moans the imp beneath you.  You oblige, and ");
	if (player.biggestTitSize() >= 1) {
		outputText("his tiny claws grab your ");
		if (player.bRows() > 1) outputText("first row of ");
			outputText(player.breastDescript(0) + ", squeezing your tits as you fuck him full.");
		if (player.lactationQ() >= 500) outputText("  Rivulets of your milk run down his forearms as he inexpertly milks you.");
	}
	//[If cock:
	else if (player.hasCock()) outputText("the rise of his swollen belly soon presses against [oneCock] and the rhythm of your thrusts strokes his shiny red stomach against your sensitive organ.");
	else if (player.hasVagina()) outputText("the imp’s tiny, clawed feet scrabble against you as he flails in pleasure.  By mistake, one slips between the lips of your pussy, small toes wriggling against your inner walls, and you instinctively push down against the small limb, fucking yourself with his foot.");
	else outputText("you feel a firm pressure at your [asshole] as the tip of the imp’s lashing tail prods frantically against you, manically shoving in and out of your [asshole].");

	outputText("<br><br>You groan, climaxing against the imp, just as he lets out another gout of hot seed from his cum-smeared dick.  He spatters your front, his spunk mingling with your fluids, shuddering as he takes the last of your eggs inside him, his belly swollen to the size of a beach ball.");

	outputText("<br><br>You pant heavily, and with a messy squelching, you pull yourself out of the imp, pushing yourself up from your crouched position.  A gush of honey pours from the imp’s ass, cutting off quickly as an egg rolls into place from the inside, stopping up your imp-cubator.");

	outputText("<br><br>You hear a strange noise from the imp, one that sounds strangely like a giggle.  You glance down at him, instinctively evaluating him as a bearer of your eggs.  The imp is still panting, looking up at you from under his messy, black hair.  With a flushed, submissive expression and swollen, pregnant belly, the imp seems almost... cute?  He cradles his massive, egg-filled belly, caressing it, then looks back to you, blushing.");

	outputText("<br><br>You blink then stand up.  You shake your head as you walk away, chalking the odd thoughts up to your egg-laying instincts.  Some of these mutations have some weird effects, after all...");
	player.orgasm();
	player.modStats("sen", -1);
	player.dumpEggs();
	cleanupAfterCombat();
}

// KILL THE IMP

ImpScene.killImp = function() {
	clearOutput();
	gameFlags[IMPS_KILLED]++;
	outputText("You make a quick work of the imp before dragging the corpse away. That's one less foul creature prowling the realms. ");
	if (player.cor < 25) player.modStats("cor", -0.5);
	menu();
	addButton(0, "Take Skull", ImpScene.takeSkull);
	addButton(1, "Leave", cleanupAfterCombat);
}

// TAKE THE IMP'S SKULL

ImpScene.takeSkull = function() {
	Inventory.takeItem(Items.Materials.ImpSkull, cleanupAfterCombat);
};

// LOSE TO IMP SCENES

// STANDARD LOSS

/* The imp rapes you, pretty much. The only special loss is a 50% chance for males with thick penises to have their urethra raped by the imp. */

ImpScene.impRapesYou = function() {
	clearOutput();
	//if (doSFWloss()) return; FIGURE OUT THIS FUNCTION

	if ((player.findPerk(PerkLib.BimboBrains) >= 0 || player.findPerk(PerkLib.FutaFaculties) >= 0) && !player.isTaur() && player.hasVagina()) {
		//outputText(images.showImage("imp-loss-female-fuck"), false);
		outputText("You sink to the ground, assuming a position that feels all too natural to you now, leaning forward to let your " + player.allBreastsDescript() + " hang down slightly. The imp looks you up and down, wickedly eyeing your ready, slightly open lips. He drops his loin-cloth to reveal a hardening cock. Your eyes bulge as it grows larger... and larger... and larger! The imp's cock finally bulges to a full twelve inches... and it's moving closer. You struggle to think... but you just can't! You want that in your mouth, like, so bad!<br><br>");
		outputText("Your " + player.vaginaDescript(0) + " drips in anticipation, and you find yourself involuntarily moving your knees farther apart to prepare yourself to be filled. He smiles and presses his cock against your " + player.vaginaDescript(0) + ", pushing you back to get a better angle. You try to make words, but your brain can only think of so much at once! Right now, it's thinking of cock, which, naturally, makes you open your mouth and let out a slutty moan.<br><br>");

		outputText("The imp pushes into you violently, ramming his cock in to the hilt, leaving you gasping in pain and surprise. He leaves it in your slutty pussy, giving you a second to... oh who is he kidding... he can tell by your air-headed look that you've done nothing but take cocks your whole life. He fucks you hard, slapping your " + player.buttDescript() + " to remind you who is in charge. You can't help but think about, like, how you just love it when a man takes charge. Less thinking!", false);
		player.cuntChange(12,true,true,false);
		outputText("<br><br>");

		outputText("The rough fucking becomes more and more pleasurable as time goes on. You moan air-headedly with each thrust, hips squeezing around the demon-cock- loving the feeling of his fullness. Before long you can't help but cum all over him, your vagina locking around his cock like a vice, muscles rippling, milking him for his cum. The imp's prick explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption. You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with insane amounts of cum.<br><br>");

		outputText("With a sigh, he pulls his dick free, and you flop down, cum leaking out onto the ground from your well-fucked hole. If you could, like, focus at all, you'd totally be worrying about being, like, pregnant or whatever. But you lose consciousness.", false);
		player.knockUp(PREGNANCY_IMP, INCUBATION_IMP - 14); //Bigger imp means faster pregnancy

		player.orgasm();
		player.modStats("lib", 1, "sen", 1, "cor", 1);
		cleanupAfterCombat();
		return;
	}
	//Lust loss
	if (player.lust >= player.maxLust()) {
		//50% chance of sprocket rape for super-thick people.
		if (player.cocks.length >= 1 && rand(2) == 0) {
			if (player.cocks[0].cockThickness >= 4) {
				ImpScene.sprocketImp();
				return;
			}
		}
		//Female or Futa
		if (player.gender == 2 || player.gender == 3) {
			player.slimeFeed(); // Check this function
			//outputText(images.showImage("imp-loss-female-fuck"), false);
			outputText("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles, a wicked look glinting in his eyes.  He drops his loincloth to reveal a hardening cock.  Your eyes bulge a bit as it grows...and grows...and grows!  That imp has a twelve inch cock..and he's walking towards you.   Your " + player.vaginaDescript(0) + " practically juices itself in anticipation, and you find yourself spreading your " + player.legs() + " in preparation.", false);
			outputText("<br><br>He smiles and presses his cock against your " + player.vaginaDescript(0) + ".  Your lust-driven mind is speechless, leaving you panting and moaning like a whore.", false);
			//If too big, only partly penetrate.
			if (player.vaginalCapacity() < monster.cockArea(0)) {
				if (player.vaginas[0].virgin) {
					outputText("  He plunges in hard, breaking your hymen and stealing your virginity.  A look of surprise crosses his face, chased away by ecstasy.  If you had a rational bit left in your mind, you'd notice he looks... stronger somehow, but you're too horny to care.", false);
					player.vaginas[0].virgin = false;
				}
				else {
					outputText("  He pushes against your tight little pussy, struggling to penetrate you.", false);
				}
				outputText("  His cock only sinks a few inches in, but he begins fucking you hard, each time claiming a bit more of your pussy for his demonic tool.  You feel a painful stretching as he gets half of it inside you, ruining your " + player.vaginaDescript(0) + " for most humans.  He fucks you like this for what seems like forever, never getting much further. ", false);
				player.cuntChange(monster.cockArea(0), true);
			}
			else {
				outputText("  He plunges in violently, ramming his " + monster.cockDescriptShort(0) + " in to the hilt, leaving you gasping in pain and surprise.  He leaves it there, giving you a second to get used to him, and then begins fucking you hard, slapping your ass every few thrusts to remind you who is in charge.", false);
				player.cuntChange(12, true, true, false);
			}
			if (player.gender == 3) outputText("<br><br>The rough fucking becomes more and more pleasurable as time passes, until you cannot help but stroke your " + player.cockDescript(0) + " along with each plunge he takes in your " + player.vaginaDescript(0) + ".  You feel yourself clench around him as your sexual organs release, erupting spurts of cum and milking the demon's cock like your life depended on it.", false);
			if (player.gender == 2) outputText("<br><br>The rough fucking becomes more and more pleasurable as time passes.  You moan loudly and lewdly with each thrust, hips squeezing around the demon-cock, relishing the feeling of fullness.  Before long you cannot help but cum all over him, " + player.vaginaDescript(0) + " locking around his cock like a vice, muscles rippling, milking him for his cum.", false);
			outputText("  The imp's " + monster.cockDescriptShort(0) + " explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption.  You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with an unnatural quantity of corrupted semen.<br><br>With a sigh, he pulls his dick free, and you flop back on your back, cum surging out onto the ground from your well-fucked hole.  ", false);
			if (player.pregnancyIncubation > 0 && player.pregnancyIncubation <= 216) {
				outputText("You wonder what this will do to whatever is growing in your womb...  ", false);
			}
			else {
				if (player.inHeat) outputText("You find yourself hoping you're pregnant as you swiftly lose consciousness.", false);
				else if (player.pregnancyIncubation <= 0) {
					if (player.cor > 75) outputText("With an appreciative moan, you bury your fingers in its slimy warmth, hoping you are pregnant with some fiendish offspring, and lose consciousness.", false);
					else outputText("You hope you don't become pregnant, but promptly lose consciousness before you can contemplate the prospect any further.", false);
				}
			}
			player.knockUp(PREGNANCY_IMP, INCUBATION_IMP - 14); //Bigger imp means faster pregnancy
			player.modStats("lib", 1, "sen", 1, "lus", 1, "cor", 1);

		}
		//Male or genderless
		if (player.gender == 0 || player.gender == 1) {
			//Alternate male-only case
			if (player.gender == 1 && rand(2) == 0) {
				//outputText(images.showImage("imp-loss-male-fuck"), false);
				outputText("Your eyes glaze over with lust as the imp's dark magic destroys your will to continue fighting. You sink to your ", true);
				if (player.isTaur()) outputText("hocks and knees, your " + player.cockDescript(0) + " hurting from the massive blood pressure caused by your unbridled lust. He approaches you and stops about two feet in front of you, watching with delight your helpless state", false);
				else outputText("knees, pull out your " + player.cockDescript(0) + " and begin mindlessly stroking yourself as the imp approaches you, a wicked grin on his face. Your mind races with thoughts and images of sucking the imp's cock. He approaches you and stops about two feet in front of you, watching with delight as you succumb to your own lust", false);
				outputText(". Your eyes glance down to his waist and see a massive bulge form under his loincloth, the sight of which causes your " + player.cockDescript(0) + " to twitch and begin leaking pre-cum.<br><br>");
				outputText("The imp drops his loincloth, revealing his huge 12-inch penis, and then forcefully grabs your head and pulls you down on to his hard throbbing demon dick. He shoves his cock past your lips and deep down your throat in one slow, forceful push. You can barely accommodate his huge cock, and yet your lust makes you hunger for more. You cough and gag while the imp proceeds to fuck your mouth hard, slapping his hot balls against your chin, disregarding your need to breathe.  ", false);
				if (player.isTaur()) outputText("Dropping down to the ground, your " + player.cockDescript(0) + " trembles against your body to the rhythm of the imp's thrusts, leaving your underbelly smeared with its own pre-cum.<br><br>");
				else outputText("On all fours now, your " + player.cockDescript(0) + " bounces up and down against you to the rhythm of the imp's thrusts, leaving your belly smeared in your own pre-cum.<br><br>");
				if (player.ballSize >= 5) outputText("Your huge " + player.ballsDescriptLight() + " swing heavily against you as well, responding to the force of the imp's thrusts, slapping your own ass and driving your " + player.cockDescript(0) + " even stiffer with lust, the pre-cum pulsing out of your cock in time with the slapping.<br><br>");
				outputText("You begin to feel light-headed from lack of air just as the imp grips your head firmly and begins making rapid, shallow thrusts down your throat, nearing his orgasm. Suddenly he clenches tight, his claws digging into your head and thrusts down your throat as far as he can, holding his massive cock deep in your stomach. Your eyes go wide as you feel the imp's balls on your chin spasm violently.  His cock pulses in your mouth as the thick demon cum is pumped violently down your throat. It feels like an eternity as the imp continues to fill your guts with his hot cum, his orgasm lasting far longer than any human's. ");
				player.refillHunger(40); // CHECK THIS
				outputText("He slowly withdraws his still-pumping cock from you, coating your throat and then mouth with an almost continual spray of his unnaturally hot and sticky demon seed. The imp pulls out of your mouth just in time to splatter your face with his cum before his orgasm stops, coating your lips, nose, eyes, and hair with his incredibly thick and sticky cum.<br><br>");
				outputText("You fall to the ground gasping, exhausted and unable to move, the demon cum on your face and inside you still burning with intense heat and corruption. You lose consciousness, your " + player.cockDescript(0) + " still firmly erect, your lust not sated.", false);
				player.modStats("cor", 2);
				player.changeLust(20);
				cleanupAfterCombat();
				player.slimeFeed(); // CHECK THIS
				return;
			}
			else {
				player.slimeFeed(); // CHECK THIS
				outputText("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles and circles you, dropping his loincloth as he goes.  You are roughly shoved to the ground, your backside slapped hard.  You're too horny to do anything but moan from the pain ", false);
				if (!player.isTaur()) outputText("as you are disrobed", false);
				outputText(".  As the imp presses a large bulk against your backside, you realize he has a massive penis!<br><br>The imp pushes his " + monster.cockDescriptShort(0) + " into your ass and fucks you hard, with little regard to your pleasure.  After a rough fucking, he cums, stuffing your ass full of hot demon cum.  His orgasm lasts far longer than any human's, leaving your belly slightly distended.", false);
				player.buttChange(monster.cockArea(0), true, true, false);
				player.modStats("lib", 1, "sen", 1, "cor", 1);
				player.changeLust(1);
				if (player.sens > 40) {
					outputText("  You manage to orgasm from the feeling of being filled by hot cum.", false);
					if (player.gender == 1) outputText("  You jizz all over the ground in front of you, spraying cum in huge squirts in time with the demon's thrusts.", false);


					player.modStats("cor", 1);
				}
				outputText("<br><br>You drop to the ground when he's done with you, cum spilling from your abused ass all over the ground, too exhausted to move.  Consciousness fades.  ", false);
			}
		}
		cleanupAfterCombat();
		player.orgasm();

	}
//HP or insta-loss
	else {
	outputText("\n<b>You fall, defeated by the imp!</b>\nThe last thing you see before losing consciousness is the creature undoing its crude loincloth to reveal a rather disproportionately-sized member.", false);
		cleanupAfterCombat();
	}

};

// RARE LOSS SCENE FOR THICK MALES

ImpScene.sprocketImp = function() {
	player.slimeFeed();
	clearOutput();
	outputText("You fall to your knees, lost in thoughts of what you want the imp to do to you.  Your body burns with desire, ready for the anal assault to come.  At least that's what you think.  You reach a hand out to the imp, wanting to pull him to you, to make him take you the way you need to be taken.  But he doesn't, not this time.<br><br>");
	//New PG
	outputText("Much to your surprise, the imp flutters upward on his small leathery wings and rushes toward you.  ", false);
	if (player.hairLength > 0) outputText("His claws dig into your hair ", false);
	else outputText("His claws dig into your wrists ", false);
	outputText("and you find yourself dragged upward with him, soaring over the tops of the trees.  The cool rush of air does nothing to abate your arousal.  If anything, the cold shock only makes your body more aware of its own need.  After just a few seconds that feel like an eternity to your lust-filled being, the imp hurls you down into a tree.  You flail as you fall, barely catching yourself on the upper branches.  Your hands and " + player.legs() + " are tangled in the smooth wooden spiderweb below you, your mind torn between desire for the imp above and fear of the fall below.  You can see from the gleam in the horned creature's red eyes that he has you right where he wants you.<br><br>");
//New PG
outputText("The imp pulls the loincloth from his waist, revealing his red throbbing cock.  It is certainly large, even though it stands smaller than your own erection.  He tosses the cloth aside, and you see him fluttering down toward you just before the rough fabric lands on your face.  His clawed fingers grasp ", false);
//Variable cocktext
	if (player.cocks[0].cockType == CockTypesEnum.HUMAN || player.cocks[0].cockType == CockTypesEnum.DEMON) outputText("your " + player.cockDescript(0) + ", rubbing the tip of his prick against your own, ", false);
	else if (player.hasKnot(0)) outputText("your " + player.cockDescript(0) + ", rubbing the tip of his prick against your point, ", false);
	else if (player.cocks[0].cockType == CockTypesEnum.HORSE) outputText("your " + player.cockDescript(0) + ", rubbing the tip of his prick against your flared head, ", false);
	else if (player.cocks[0].cockType == CockTypesEnum.TENTACLE) outputText("your huge green dick, rubbing the tip of his prick against your purplish cock-head, ", false);
outputText("smearing your pre-cum together.  You wonder if he is planning on just jerking both of you off as you shake the cloth from your face.  He flashes you an evil smile, making your eyes widen in terror as you realize what he is planning. Before you can even think to make a move to stop him, the imp ", false);
	if (player.cocks[0].cockType == CockTypesEnum.HUMAN || player.cocks[0].cockType == CockTypesEnum.DEMON) outputText("shoves his shaft deeply into the slit in the head of your dick.  ", false);
	else if (player.hasKnot(0)) outputText("finds the hole in the pointed head of your cock and plunges his shaft deeply into it, literally fucking your urethra.  ", false);
	else if (player.cocks[0].cockType == CockTypesEnum.HORSE) outputText("seats his dick in the flared head of your prick, and then pushes farther. His shaft plunges into yours, filling your cock more than any cum load ever could.  ", false);
	else if (player.cocks[0].cockType == CockTypesEnum.TENTACLE) outputText("shoves his dick deeply into the slit in the head of your vine-like cock.  ", false);
//New PG
	outputText("<br><br>");
	outputText("He grips your cock tightly as he fucks you, treating you like a ", false);
//Differing cocksleeve texts
	if (player.skinDesc == "fur") outputText("furry cock-sleeve", false);
	else {
		if (player.skinTone == "purple" || player.skinTone == "blue" || player.skinTone == "shiny black") outputText("demonic cock-sleeve", false);
	else outputText("human cock-sleeve", false);
	}
//Bonus boob shake or period if no boobs.
	if (player.breastRows.length > 0 && player.biggestTitSize() > 2) outputText(", fucking you so hard that your " + player.allBreastsDescript() + " bounce with each thrust.  ", false);
	else outputText(".  ", false);
	outputText("It briefly crosses your mind that this should be painful, but something about either his lubrication or yours makes it comfortable enough to have you writhing in pleasure.  ", false);
outputText("He thrusts roughly into you for several minutes, your hips bucking upward to meet him, ", false);
	if (player.cocks.length == 2) outputText("your other cock finding pleasure in rubbing against his body ", false);
	if (player.cocks.length > 2) outputText("your other cocks finding pleasure in rubbing against his body ", false);
//Cum
	outputText("while copious amounts of sweat runs off of both your exposed forms, before he shivers and sinks deeply into you.  He cums hard, the heat of his demon seed burning your loins. His orgasm lasts longer than you think possible, forcing your own climax. Your seed mixes within your body, becoming more than you can handle and spilling out from your urethra around his intruding member.  ", false);
//Extra cum-texts
	if (player.cocks.length == 2) outputText("Your other cock cums at the same time, liberally splattering your spunk up his back.  ", false);
	if (player.cocks.length > 2) outputText("The rest of your " + player.multiCockDescriptLight() + " twitch and release their seed at the same time, creating a shower of spunk that rains down on both you and the imp, coating both of your bodies.  ", false);
	if (player.biggestLactation() >= 1) outputText("At the same time, milk bursts from your " + player.nippleDescript(0) + "s, splattering him in the face.  You feel a sick sort of triumph as you get him back for cumming inside you.  ", false);
//Vagoooz
	if (player.vaginas.length > 0) outputText("Your pussy quivers, contracting furiously as your orgasm hits you - like it's trying to milk a phantom dick dry.  ", false);
//new PG
	outputText("Satisfied, his dick slides from you and he flies away as mixed seed continues to spill from your abused body. Your limbs grow weak, and you fall from the tree with a hard thud before losing consciousness.  ", false);
//Take some damage
	// mainView.statsView.showStatDown( 'hp' ); Don't know how to show this. Might do it automatically?
// hpDown.visible = true;
	player.HP -= 10;
	if (player.HP < 1) player.HP = 1;
	cleanupAfterCombat();
};