/**
 * Ported by Matraia on 10/7/16.
 */

var SandTrapScene = [];
addToGameFlags(SANDTRAP_LOSS_REPEATS, TIMES_ENCOUNTERED_SAND_TRAPS)

function SandTrap() {
    //1/3 have fertilized eggs!
    if (rand(3) == 0) this.createStatusEffect(StatusEffects.Fertilized,0,0,0,0);
    //Name and references
    this.a = "the ";
    this.name = "sandtrap" //TODO Silly Mode name is "sand tarp".
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "";
    this.himHer = "";
    this.hisHer = "";
    this.plural = false;
    this.battleDesc = "You are fighting the sandtrap.  It sits half buried at the bottom of its huge conical pit, only its lean human anatomy on show, leering at you from beneath its shoulder length black hair with its six equally sable eyes.  You cannot say whether its long, soft face with its pointed chin is very pretty or very handsome - every time the creature's face moves, its gender seems to shift.  Its lithe, brown flat-chested body supports four arms, long fingers playing with the rivulets of powder sand surrounding it.  Beneath its belly you occasionally catch glimpses of its insect half: a massive sand-coloured abdomen which anchors it to the desert, with who knows what kind of anatomy.";
    //Core stats
    this.str = 55;
    this.tou = 10;
    this.spe = 45;
    this.inte = 55;
    this.lib = 60;
    this.sens = 45;
    this.cor = 50;
    //Combat stats
    this.HP = this.maxHP();
    this.lust = 20;
    this.fatigue = 0;
    //Advancement
    this.level = 4;
    this.XP = 0;
    this.gems = 2 + rand(5);
    //Battle variables
    this.weapon.equipmentName = "claws";
    this.weapon.verb="claw";
    this.weapon.attack = 10;
    this.armor.equipmentName = "chitin";
    this.armor.defense = 20;
    this.shield = Items.NOTHING;
    this.upperGarment = Items.NOTHING;
    this.lowerGarment = Items.NOTHING;
    this.accessory1 = Items.NOTHING;
    this.accessory2 = Items.NOTHING;
    this.bonusHP = 100;
    this.additionalXP = 0;
    this.lustVuln = .55;
    //TODO this.temperment = TEMPERMENT_LOVE_GRAPPLES;

    this.drops = [];
    this.dropThresholds = [];

    //Appearance
    this.gender = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
    this.tallness = rand(8) + 150; //Height in inches
    this.skinTone = "fair";
    this.skinType = 0;
    this.skinAdj = "";
    this.skinDesc = "skin";
    this.hairType = 0;
    this.hairColor = "black";
    this.hairLength = 15;
    this.beardStyle = 0;
    this.beardLength = 0;
    this.furColor = "";

    //Head
    this.earType = 0;
    this.eyeType = 0;
    this.faceType = 0;
    this.tongueType = 0;
    //Body (This code section may be removed)
    this.lowerBody = 0;
    this.legCount = 2;
    this.armType = 0;
    //Extra parts (This code section may be removed)
    this.antennae = 0;
    this.hornType = 0;
    this.horns = 0;
    this.gills = false;
    this.tailType = TAIL_TYPE_DEMONIC;
    this.tailVenom = 0;
    this.tailRecharge = 0;
    this.wingType = 0;

    this.femininity = 50;
    this.tone = 0;
    this.thickness = 0;
    this.hipRating = HIP_RATING_AMPLE+2;
    this.buttRating = BUTT_RATING_LARGE;

    //Sexual Characteristics
    //Cocks
    this.createCock(10,2,CockTypesEnum.HUMAN);
    this.balls = 2;
    this.ballSize = 4;
    this.cumMultiplier = 3;
    //Vaginas
    this.createVagina(false, VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL);
    //Ass
    this.ass = new Ass();
    this.ass.analLooseness = ANAL_LOOSENESS_NORMAL;
    this.ass.analWetness = ANAL_WETNESS_DRY;
    //Breasts
    this.createBreastRow(0,0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    this.addDrop(Items.Consumables.TrapOil, 90); //The former is the item, the latter is the drop chance in percent.
    this.addDrop(Items.Consumables. OviElixir, 10);
    //TODO This actually should be a chained drop in the form of new ChainedDrop(consumables.TRAPOIL).add(consumables.OVIELIX,1/3);. Do we want to add in the chained drop functionality?

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = SandTrapScene.sandTrapLoss;
}
SandTrap.prototype = new Creature();
SandTrap.prototype.constructor = SandTrap;

SandTrap.prototype.doAI = function(){

};


//------------
// Victory and Defeat Scenes
//------------

SandTrapScene.sandTrapLoss = function() {
    //SFW Mode?
    if (gameFlags[SFW_MODE] > 0) { //No rape in SFW mode.
        clearOutput();
        cleanupAfterCombat();
        return;
    }
    //Lose to Sand Trap while in Bad End mode.
    if (gameFlags[SANDTRAP_LOSS_REPEATS] >= 2 && player.eyeType == EYES_BLACK_EYES_SAND_TRAP && player.wingType == WING_TYPE_GIANT_DRAGONFLY) {
        SandTrapScene.loseLastFightWithSandTrap();
        return;
    }
    // Otherwise...
    gameFlags[SANDTRAP_LOSS_REPEATS]++;
    //TODO Do we need a clear output here?
    outputText("\n\n");
    //TODO Sprite spriteSelect(97);
    // Sunk too far into the trap
    if (SandTrap.trapLevel() == 1) outputText("You are sunk to your belly in the depthless sand at the bottom of the pit, and are still falling fast.  The sun above you is blotted out by a shape which leans downwards towards you, smiling triumphantly.  Desperately, you try to keep your arms free so you can swing a blow at it, but with consummate ease, the sandtrap grabs your wrists with one set of hands while pushing you downwards with the others.  Within moments you are up to your armpits in the stuff, staring helplessly up at the strange androgynous creature which has you entirely at its mercy.");
    //PC lust loss:
    else outputText("You feel as radiant and molten as the sun above you... you just want to sink into the warm sand surrounding you forever.  Why are you struggling against it again?  You can't remember; with a sigh, you fall backwards onto the soft powder and allow yourself to be carried right down to the bottom.  The sandtrap chuckles softly as it envelopes you in its waiting arms.  \"<i>Good " + player.mf("boy","girl") + "...</i>\"");

    if (player.hasCock()) doNext(SandTrapScene.cockLoseToSandTrap);
    else if (player.hasVagina()) doNext(SandTrapScene.chicksLoseToSandTrap);
    else doNext(SandTrapScene.genderlessLoss);
};

SandTrapScene.cockLoseToSandTrap = function() {
    clearOutput();
    //TODO Sprite spriteSelect(97);
    outputText("\"<i>You're probably wondering what part of you I want to use,</i>\" purrs the sandtrap, pushing itself further upwards using your shoulders and drawing you closer until your face is pressed against where its human torso and insect abdomen join.  You are helpless to ignore the fact it has a genital slit where its human cock would be, particularly as the sandtrap places its hands behind your head and proceeds to rub your face into it.  Its smooth, supple human flesh trades with its rough, leathery insect hide against your cheeks and forehead, and as its excitement grows you feel the slit slide open and something long, warm, and oily presses insistently into your face.  The creature pulls back momentarily, and with a feeling of deep trepidation you take it in... a black ten-inch insect prong, thicker at the base than its dull tip, dripping with a clear, viscous fluid.");
    outputText("\n\n\"<i>The ans-zwer is all of you-wve, my fris-zky little drone,</i>\" chatters the trap.  It seems the more excited it gets and the less it feels the need to pretend, the more fluttery and broken its voice becomes; it is like you are listening to a hive of bees that just happens to be forming words.  \"<i>I am going to usze you, inszide and out.  You'wwwe going to be both mommy and daddy for my children.  Iszn't that excithhhing?</i>\"  Smiling tenderly, it presses the tip of its gleaming black prong against your lips.  \"<i>Drink.  It will make thingsz so much easier for hwyou if hwyou do.</i>\"  The creature is not exactly giving you much choice.  Packed tightly inside its sand and incapable of resisting, you steel yourself, close your eyes, open your mouth and accept it.");

    outputText("\n\nThe cock prong slides into your mouth and past your teeth with ease, already dripping with its strange, clear lubicrant.  Sighing dreamily, the sandtrap slowly pushes half of its length into your mouth before pulling itself back out, then in again, picking up a gentle rhythm, each time pushing a bit more of itself into your mouth.  Soon it is stretching your lips wide as it takes you right to its thick base, its tip finding the back of your throat.  It groans and you feel your mouth fill with its oil; rather than ejaculate, the sandtrap's cock seems to perspire its odorless payload from all sides.  The stuff swabs and swathes your mouth in warmth; it makes your lips, the inside of your cheeks and your tongue feel relaxed, accepting and soft.  It feels like your mouth was made to take and enjoy this creature's cock... you begin to suckle the sandtrap eagerly, hoping for more.  Sighing at your greed, the creature pushes as much of itself as it can down your throat, leaking oil deliriously as it does.  Your lips stretched wide by the base of its prong, you can't help but dribble oil down your front even as you inadvertently swallow a great deal of its warm, coating ooze.");

    outputText("\n\nYou feel flutters spread throughout you, penetrating your core.  The rest of your body begins to feel just like your mouth; languid, sensual and submissive.  The sands encompassing you feel like the most comfortable straitjacket imaginable, and you close your eyes again as [eachCock] begins to harden.  It hazily occurs to you that the sensation of your cock hardening in the sand should irritate you, but in effect it doesn't; below you the substance feels more like packed mud, and the feeling of your length sliding through the yielding, enveloping dirt is incredibly pleasurable.  You actually smile dreamily around the prong stuffing your face when you feel something hot and wet press insistently against the tip of your " + player.cockDescript(0) + ".   The sand massages every inch of your body as below the surface the sandtrap begins to sink its insect cunt down your sensitive shaft.");
    //[Less than 6 inches:
    if (player.cocks[0].cockLength < 6) outputText("\n\nThe creature looks down in surprise at you when its dripping, grasping sex reaches the base of your cock so quickly.  You feel a familiar sense of shame creeping across your cheeks... but the sandtrap uses the two hands grasping your head to stroke your brow and face with odd tenderness.  \"<i>Yyou do not like being all man, do you?  Perhaps little ant likes fooling mates with its looks, too.  Perhaps little ant is more like sandtrap than I thought.</i>\"  You look up at it, its prong still buried in your face, to see an odd look of hunger in its six eyes.  \"<i>Do not worry,</i>\" it says, smiling widely.  \"<i>Hyou are perfect to me.</i>\"  It begins to slowly work your small shaft, its pulsing muscles squeezing you possessively up and down.");
    //6 inches to 15:
    else if (player.cocks[0].cockLength < 15) outputText("\n\nThe creature owns an incredibly tight sex which grasps you possessively once it is on you; it fits your cock like a glove.  The sandtrap sighs its fluttering sigh when it reaches your base and then slowly begins to work you, its punishing, pulsing muscles squeezing your cock up and down.");
    //More than 15 inches:
    else outputText("\n\nThe creature owns an incredibly tight sex which grasp you possessively once it is on you.  Sweat beads the sandtrap's elegant brow as it forces itself brutally down your huge shaft; when it finally stops with a sizable portion of your " + player.cockDescript(0) + " inside it and draws back slightly, it feels like it is going to suck the cum right out of you.  It slowly begins to work what it can of you, its punishing, pulsing muscles squeezing your cock up and down.");

    outputText("\n\nThe sandtrap caresses your face tenderly as you suck its pseudo-cock while below the sand it assiduously begins to milk you.  You are pushed further into the hopelessly relaxed sex daze the creature's warm oil has instilled in you; it feels like the sand itself is moving with the creature, massaging your body in waves at the same gentle rhythm as the creature fucks your face and cock.  You can't keep track of time; there is only the sensation inundating your mouth, your body and " + player.cockDescript(0) + ", the sandtrap's gentle sighs, and the hiss and crunch of the sand itself.  Eventually the sandtrap begins to pick up the pace; it shoves your face into its groin as it begins to pant with need, stretching your mouth wide again as it begins to milk your cock as hard as it can.  Its vaginal muscles grip you tightly, rippling up and down your length; it feels like you are being fucked by a wet, grasping tube.  You can't possibly contain yourself against the creature which has sunk you into such glorious submission and, groaning around its prong, you spurt everything you can give into that clenching warmth.");
    //[High cum:
    if (player.cumQ() > 1000) outputText("  The sandtrap gasps and coos as you ejaculate over and over again, and beneath you feel your cum wet the sands as it beads around the clenching grip it has you in.");
    if (player.hasVagina()) outputText("  Ignored entirely, your " + player.vaginaDescript(0) + " quivers and orgasms in tandem, flexing and wetting fruitlessly against the dry water pressing against it.");

    outputText("\n\nThe sandtrap finally releases you, humming and fluttering sounds of pleasure as it draws its unseen cunt away and retracts its prong from your mouth and back into its slit, trailing oil and saliva as it goes.  You don't really notice these things or even if it is trying to say anything to you in that bizarre voice it has, still deep within the encasing sand and deep within your muddling daze, and your limbs feel like any returning strength has been sucked right back out of you by the creature's milking cunt.  You do not struggle when the sandtrap takes you into its arms and begins to turn you around.  It fondles your [chest] with one hand as its others busily work at pulling your bottom half this way and that, until your [butt] is poked outwards in supplication.  Only then does it dozily occur to you that the creature is not done with you yet.");

    outputText("\n\n\"<i>You'hhve done well for me so farhh,</i>\" chuckles the sandtrap lowly, bending over you and threading one set of arms under your ");
    if (!player.isTaur()) outputText("armpits");
    else outputText("forelegs");
    outputText(".  You try and turn your head to see what it is doing but it gently but insistently pushes your face into the yielding sand.  \"<i>You arrrrhe a fine little drone.  I wwill thank you for yourrh hard work... with the fruits of ssame hard work.</i>\" What does it mean by...?");

    outputText("\n\nThe self-same tube which sucked away your cum pushes into your sphincter, sliding easily into your anal passage with its wet weight.  You arch your back and open your mouth... but the complete relaxation the sandtrap's oil has instilled in you stops your body from clenching against the invader, and you feel no pain.");
    player.buttChange(30,true,true,false);
    outputText("  The creature pushes your head down, making soothing shushing noises as it feeds more of its bulbous length into your ass.");
    if (player.analCapacity() < 40) outputText("  Although the oil which coats your thoughts and reflexes with sensual supplication makes things easier, the feeling is still incredibly intense, and you grit your teeth as something round travels down the creature's ovipositor and stretches your tight hole wide.");
    else outputText("  Your accommodating ass feels like it was made for this purpose, and with the creature's oil soothing your thoughts and reflexes you savor the creature taking you like this as if it were your quim.  You moan as something round travels down the creature's ovipositor and into your wet ass, the sensation making [eachCock] hard again.");

    outputText("\n\nThe sandtrap continues to make its soothing, humming sounds and caresses your [chest] and [hair] whilst it holds you firmly in its sandy grasp, sinking egg after egg into your [butt].  It is a process which seems to go on for minutes on end, and the sensation of having your ass bred like this starts to drive you inexorably towards another peak.  You groan as the slick pressure in your bowels makes you cum, your cock");
    if (player.hasVagina()) outputText(" and cunt");
    outputText(" flexing out more moisture into the sand beneath you.  The oil-induced serenity and the sexual marathon the sandtrap has put you through are too much and, even with the creature still relentlessly pumping away at you, you pass out.");

    outputText("\n\nYou awaken a while later, wearily getting to your feet and looking around.  You are standing in a featureless stretch of desert... there is no suggestion of the sandtrap, or indeed that you are in the same place where it caught you.  A fair amount of time has passed though, judging by the sky above you.  Perhaps it was all a particularly lucid mirage?  A sensation of... fullness in your abdomen suggests otherwise.  Clutching your bowels uneasily, you make your way back to camp.");
    //monster.createStatusEffect(StatusEffects.Fertilized,0,0,0,0); // TODO TEST THIS
    //SandTrapScene.sandTrapPregChance(); // TODO Set Up Pregnancy
    player.orgasm();
    player.dynStats("lib", 1);
    player.slimeFeed();
    //reduce lust, increase lib, slimefeed, reset hours since cum
    cleanupAfterCombat();
};

SandTrapScene.chicksLoseToSandTrap = function() {
    clearOutput();
    // TODO Sprite spriteSelect(97);
    outputText("The sandtrap holds your hands whilst it pushes you further down with its other set of arms, until only your head is above the sand.  Below the surface you try to weakly move your limbs, try to work yourself out of this situation, but it is impossible; the sand feels impossibly heavy and is packed against you.  The sandtrap seems to have no such difficulty.  It sinks gracefully downwards until its face is almost level with yours.  You feel something wet touch your thigh and you try to flinch, but aside from flexing your muscles you cannot move.");
    outputText("\n\n\"<i>Hyou arrrhe a vessel creature, arrrhen't you?</i>\" says the sandtrap, gently stroking your face.  It seems the more excited it gets and the less it feels the need to pretend, the more fluttery and broken its voice becomes; it is like you are listening to a hive of bees that just happens to be forming words.");
    if (monster.findStatusEffect(StatusEffects.Fertilized) >= 0) outputText("  \"<i>A cute little wwworker hasz fallen into my home.  Wwwell, that isz ok.  Fortunately for hwyou, I already have some eggsz ready.  Hhyou will get to be a queen! Iszn't that exciting?</i>\"");
    else outputText("  \"<i>A cute little wwworker hasz fallen into my home, but I have no fertile eggsz to givve it.  Wwwell, that isz ok.  Hwwe can still have fun, can't we?</i>\"");

    outputText("\n\nIt makes a guttural noise, as if it were drawing fluids into its throat, and then draws you close.  \"<i>Drink.  It will make thingsz so much easier for hwyou if hwyou do.</i>\"  The creature is not exactly giving you much choice in the matter.  Packed tightly inside its sand and incapable of resisting, you steel yourself, close your eyes, and allow it to kiss you.");
    outputText("\n\nThe sandtrap's lips press against yours as it runs its hands through your [hair], before eagerly sliding its tongue into your mouth, finding and then lavishing your own with attention.  Your first thought is that the creature is an incredibly sloppy kisser - but as the fluid begins to coat your mouth, you realize that the fluid it is drooling into you isn't saliva, but some sort of odorless oil.  The viscous substance swabs and swathes your mouth in warmth; it makes your lips, the inside of your cheeks and your tongue feel relaxed, accepting and soft.  It feels like your mouth was made to take and enjoy this creature's tongue... you begin to kiss the sandtrap back eagerly, twining your tongues, hoping for more.  The creature hums happily at your greed, sending pleasurable vibrations through your mouth as it bends you into itself, kissing you deeply as it releases a great gush of oil into you.  You can't help but dribble oil down your front even as you inadvertently swallow a great deal of its warm, coating ooze.");
    outputText("\n\nYou feel flutters spread throughout you, penetrating your core.  The rest of your body begins to feel just like your mouth; languid, sensual and submissive.  The sands encompassing you feel like the most comfortable straitjacket imaginable, and you close your eyes again as your [vagina] moistens.  It hazily occurs to you that the sensation of your cunt being rubbed by the sand should irritate you, but in effect it doesn't; below you the substance acts more like packed mud, and the feeling of the dirt massaging against your most sensitive parts is incredibly pleasurable.  You actually smile dreamily as the creature takes you into its arms beneath the sand, its lean, supple chest rubbing against your [chest], and something hard and oily touches your [vagina].  The sands shift around your legs and you feel the endless particulate spreading your thighs wide; you have neither the strength nor the compulsion to fight against it.  You cling onto the sandtrap's back for support as it slowly slides into you.");
    player.cuntChange(30,true,true,false);
    outputText("\n\nYou have no idea what the sandtrap's cock looks like, but as it sinks into you, pushing half of its oiled length into your [vagina] before pulling itself back out, then in again, picking up a gentle rhythm, each time pushing a bit more of itself in, you quickly build up a good picture of it.  It must be at least ten inches long, and - it touches you deep in your wet sex, making you clutch the trap's supple flesh tighter for a second - it has a tapering dull point, much wider at the base than at the tip; less like a cock and more like a long barb.  ");
    if (player.vaginalCapacity() < 30) outputText("The creature sighs with pleasure, pressing you upon it as it begins to pick up the pace.  Whilst its narrow length feels great in your tight cunt, when it takes you to its base the feeling is incredibly intense, bordering on painful... your [vagina] isn't big enough.  Your mouth gapes open as you close your eyes, dreading each return thrust and yet longing for it, that sensation between pain and acute pleasure.");
    else outputText("  The creature sighs with pleasure, pressing you upon it as it begins to pick up the pace.  Although its tip sends darts of sensation up your spine, its narrow length cannot satisfy your vast cunt - that is, until it begins to take you to its wide base, spreading your outer lips wide.  You coo with delight and every time it thrusts you long for its peak, when it slides you wide open and plugs you fully with its dripping mass.");
    outputText("  The prong base rubs against your [clit] rhythmically and suddenly you find yourself orgasming in tandem with it, crying out as the creature groans and ejaculates its delicious ooze deliriously into you.");
    outputText("\n\nYou feel like you are leaking oil from every pore and you feel more relaxed than you have ever been before; you are just another million particles of warm sand, moving with it in the radiant heat freely.  It takes several moments for you to realize that the sandtrap has not retracted itself from you, and is still spearing you up to the hilt of its prong.  It smiles at you, affection glittering in its six black eyes as you feel something moist and hard push insistently against your sphincter.  What is...?  The creature kisses you again, pushing its tongue and hot breath into your mouth at the same time as it forces what feels like a long, lubricated, bulbous dick into your [butt].  You arch your back, but the complete relaxation the sandtrap's oil has instilled in you stops your body from clenching against the invader, and you feel no pain.");
    player.buttChange(30,true,true,false);
    outputText("\n\nThe creature makes soothing shushing noises into your mouth as it feeds more of its second, bulbous length into your ass.  ");
    if (player.analCapacity() < 30) outputText("Although the oil which coats your thoughts and reflexes with sensual supplication makes things easier, the feeling is still incredibly intense, and you grit your teeth as something round travels down the creature's ovipositor and stretches your tight ass wide.");
    else outputText("Your accommodating ass feels like it was made for this purpose, and with the creature's oil soothing your thoughts and reflexes you savor the creature taking you like this as if it were your second quim.  You moan as something round travels down the creature's ovipositor and into your wet ass.");
    outputText("  Slowly the creature begins to pick up its rhythm again, sliding in and out of your pussy as it breeds you.");
    outputText("\n\nThe sandtrap continues to make its soothing, humming sounds and caresses your [chest] and [hair] whilst holding you firmly in its sandy grasp as it fucks you, sinking egg after egg into your [butt].  It is a process which goes on for minutes on end.  The creature's prong and ovipositor rub against each through your inner walls and the sensation of being double penetrated like this drives you inexorably towards another peak.  You moan and your eyes roll as the slick pressure in your bowels makes you cum, both your gushing cunt and ass flexing helplessly against the creature's strange genitals.  The oil-induced serenity and the sexual marathon the sandtrap has put you through are too much and, even with the creature still relentlessly pumping away at you, you pass out.");
    outputText("\n\nYou awaken a while later, staggering to your feet and looking around.  You are standing in a featureless stretch of the desert... there is no suggestion of the sandtrap, or indeed that you are in the same place where it caught you.  A fair amount of time has passed though, judging by the sky above you.  Perhaps it was all a particularly lucid mirage?  A sensation of... fullness in your abdomen suggests otherwise.  Clutching your bowels uneasily, you make your way back to camp.");
    //buttpreg only if RNG decided trap was fertilized, reduce lust, increase lib, simefeed
    if (monster.findStatusEffect(StatusEffects.Fertilized) >= 0) SandTrapScene.sandTrapPregChance(); //TODO Pregnancy
    player.orgasm();
    player.dynStats("lib", 1);
    player.slimeFeed();
    //reduce lust, increase lib, slimefeed, reset hours since cum
    cleanupAfterCombat();
};



//------------
// Encounter Scenes
//------------

// Trips every time a Sand Trap is encountered
SandTrapScene.encounterASandTrap = function() {
    clearOutput();
//TODO Sprite spriteSelect(97);
// First, see if the bad end triggers
    if (gameFlags[SANDTRAP_LOSS_REPEATS] >= 2 && player.eyeType == EYES_BLACK_EYES_SAND_TRAP && player.wingType == WING_TYPE_GIANT_DRAGONFLY) {
        SandTrapScene.sandTrapBadEnd();
        return;
    }
// Mark we've met one
    gameFlags[TIMES_ENCOUNTERED_SAND_TRAPS]++;
    // Very first sandtrap encounter
    if (gameFlags[TIMES_ENCOUNTERED_SAND_TRAPS] == 1) {
        //femininity <= 65:
        if (player.femininity <= 65) {
            outputText("You are exploring the endlessly undulating landscape of the desert when you hear an agonized cry for help over the nearest dune.  You quickly scramble up it and are confronted by the sight of a small, flat lake of exceptionally fine sand, overlooked on each side by tall dunes.  Trapped in the middle of it is a young woman with black hair, up to her armpits in the sand.  \"<i>Oh, thank the Gods!</i>\" she cries, spotting you.  \"<i>I'm sinking, please help me!</i>\"  The word 'quicksand' flashes through your mind like fire and you take a nervous step back, attempting to quickly evaluate the situation.");
            if (player.inte > 65) outputText("  Something about this scene puts you on edge.  How come you've never encountered quicksand in this desert before, with no water and its steady, stubborn, but not violent winds?  There's something odd about the woman, too - although she can't be a sand witch with that hair, you can't quite make her features out clearly through the heat haze.");
            outputText("  You think you could just about reach her with your hand if you were careful.  If you're going to save her, it has to be now; even in the short time you've been here she has sunk down to her collarbone.  She stares at you with plaintive despair.");
        }
        else {
            outputText("You are exploring the endlessly undulating landscape of the desert when you hear an agonised cry for help over the nearest dune.  You quickly scramble up it and are confronted by the sight of a small, flat lake of exceptionally fine sand, overlooked on each side by tall dunes.  Trapped in the middle of it is a young man with black hair, up to his armpits in the sand.  \"<i>Oh, thank the Gods!</i>\" he cries, spotting you.  \"<i>I'm sinking, please help me!</i>\"  The word 'quicksand' flashes through your mind like fire and you take a nervous step back, attempting to quickly evaluate the situation.  ");
            if (player.inte > 65) outputText("Something about this scene puts you on edge.  How come you've never encountered quicksand in this desert before, with no water and its steady, stubborn, but not violent winds?  There's something odd about the man, too - although he probably isn't a demon, you can't quite make his features out clearly through the heat haze.  ");
            outputText("You think you could just about reach him with your hand if you were careful.  If you're going to save him, it has to be now; even in the short time you've been here he has sunk down to his collarbone.  He stares at you with plaintive despair.");
        }
        menu();
        addButton(0, "Save", SandTrapScene.saveTheSandTrap);
        addButton(1, "Don't Save", SandTrapScene.dontSaveTheTrap);
    }
// Later meetings
    else {
        //Standard encounter:
        outputText("You are walking aimlessly through the desert when your [leg] sinks six inches into powdery sand.  The sound of hissing fills your ears as all around you sand cascades downwards into a conical depression.  A slender figure is emerging at the bottom... you desperately free your lower half and fight your way upwards, trying to stay ahead of the collapsing particulate.");
        // Are you fast enough to avoid a fight?
        if (player.spe / 10 + rand(20) >= 16) {
            outputText("<br><br>Moving as quickly and lightly as you can, you manage to hop clear of the sandtrap's pitfall and claw your way up a relatively stable dune.  You turn to take the androgynous creature in, half buried in its deep hollow.");
            outputText("<br><br>\"<i>You've got quick feet, little ant!</i>\" it giggles.  It lowers its brow and leers up at you with smouldering black eyes, its hands slowly and sensuously trailing patterns in the sand.  \"<i>I bet you're good at lots of other things, too.  Why doesn't the brave little ant come down here and show me?</i>\"  If you're going to fight this creature, you will have to step into its treacherous hollow to get in range, which is surely its intention - if you try launching things at it from where you are, it will probably just hide itself.  On the other hand, it would be easy to just ignore its taunts and walk away.");
            //Fight]/[Leave]
            addButton(0, "Fight", SandTrapScene.startSandTrapFight);
            addButton(1, "Don't Save", Camp.returnToCampUseOneHour);
        }
        //Speed check fail:
        else {
            outputText("<br><br>You don't move quickly enough, however, and you may as well be running on the spot; the edge of the pit recedes as the fluid sand carries you downwards.  You struggle upright as best you can and ready yourself to fight the sandtrap, which is leering at you hungrily from the bottom of its vast pit.");
            outputText("<br><br>\"<i>Only a matter of time now, little ant,</i>\" it says huskily, in its fluttering, buzzing voice.  You will have to defeat it in order to escape, and before it pulls you to the bottom!");
            startCombat(new SandTrap());
            doNext(playerMenu);
        }
    }
};

// Get sucked in and start a fight.
SandTrapScene.saveTheSandTrap = function() {
    clearOutput();
    //TODO Sprite spriteSelect(97);
    //(femininity <= 65):
    if (player.femininity <= 65) {
        outputText("You carefully kneel at the edge of the quicksand and stretch your hand out towards the stricken woman, commanding her to grab hold.   With effort she pulls an arm clear of the treacherous powder and, straining, reaches out to grab the very tips of your fingers... before, with a triumphant sneer, pulling as hard as she can.  Thrown off-balance, you fall face first into the quicksand.  Coughing, you right yourself and struggle desperately to get back up the side, but you have no leverage, and your thrashing causes you to sink waist deep into what feels like dry, impossibly heavy water.");
        outputText("<br><br>\"<i>Don't struggle,</i>\" says the woman, drifting further away from you as easily as if she were swimming.  You can see a second collarbone flexing beneath her first as her arms rest easily upon the surface, a whole second pair of limbs doing the delicate balancing work, and she speaks in a buzzing, fluttering voice which is nothing like the one she enticed you into her trap with.  She smiles at you - or at least displays her teeth - and with a kind of horror you watch two sets of small, black eyes open on either side of her first pair to stare at you hungrily.  \"<i>Don't you know struggling just makes it worse?  Just relax.  Let me do all the work.</i>\"");
        outputText("<br><br>A rumbling, hissing sound fills your ears and the dunes surrounding you lift out of sight as all the sand in the hollow begins to run downwards, taking you with it.  You fight against it desperately, but you cannot swim up a landslide and within moments you find yourself buried up to your neck at the bottom of a huge, conical depression, eyes level with the naked abdomen of your captor.  You cough, spit and blink sand away and stare helplessly up at it.  The creature has a long, slim human upper half with four arms and a pair of flat breasts; its twenty slender fingers stroke your face, brush you off and massage your [chest] as it allows you to take it in.  With its glamour gone you can see clearly the six eyed creature is in fact male... or is it?  Its long face is soft around the edges with a cute, pointed chin which is very pretty - or very handsome.  Every time the creature moves its face its gender seems to shift.  Unnerved, you look downwards, and wish you hadn't.  Although its lower half is obscured below the sand, you can see that below its waist the creature's body balloons outwards into what must be a massive, sand-colored insect thorax.  You feel something brush against you and you instinctively attempt to flinch, but you can't.  The sand feels packed against you, and straining every muscle you have to free your limbs gets you nowhere.  Gently, the creature slides its fingers behind your neck and makes you look into its black eyes.");
        outputText("<br><br>\"<i>You made it all too easy for me, little ant,</i>\" it says pityingly.  \"<i>Did no one warn you about sandtraps?</i>\"  Slowly it sinks downwards, and whilst it fondles your face you feel its other set of hands cup your [butt].  \"<i>Never mind,</i>\" the insect monster sighs into your forehead in its fluttery voice.  \"<i>I'll teach you everything there is to know.</i>\"");
    }
    //(else fem > 65):
    else {
        outputText("You carefully kneel at the edge of the quicksand and stretch your hand out towards the stricken man, commanding him to grab hold.   With effort he pulls an arm clear of the treacherous powder and, straining, reaches out to grab the very tips of your fingers... before, with a triumphant sneer, pulling as hard as he can.  Thrown off-balance, you fall face first into the quicksand.  Coughing, you right yourself and struggle desperately to get back up the side, but you have no leverage, and your thrashing causes you to sink waist deep into what feels like dry, impossibly heavy water.");
        outputText("<br><br>\"<i>Don't struggle,</i>\" says the man, drifting further away from you as easily as if he were swimming.  You can see a second collarbone flexing beneath his first as his arms rest easily upon the surface, a whole second pair of limbs doing the delicate balancing work, and he speaks in a buzzing, fluttering voice which is nothing like the one he enticed you into his trap with.  He smiles at you - or at least displays his teeth - and with a kind of horror you watch two sets of small, black eyes open on either side of his first pair to stare at you hungrily.  \"<i>Don't you know struggling just makes it worse?  Just relax.  Let me do all the work.</i>\" ");
        outputText("<br><br>A rumbling, hissing sound fills your ears and the dunes surrounding you lift out of sight as all the sand in the hollow begins to run downwards, taking you with it.  You fight against it desperately, but you cannot swim up a landslide and within moments you find yourself buried up to your neck at the bottom of a huge, conical depression, eyes level with the naked abdomen of your captor.  You cough, spit and blink sand away and stare helplessly up at it.  The creature has a long, slim human upper half with four arms and a pair of flat breasts; its twenty slender fingers stroke your face, brush you off and massage your [chest] as it allows you to take it in.  With its glamour gone you can see clearly the six eyed creature is in fact female... or is it?  Its long face is soft around the edges with a cute, pointed chin which is very pretty - or very handsome.  Every time the creature moves its face its gender seems to shift.  Unnerved, you look downwards, and wish you hadn't.  Although its lower half is obscured below the sand, you can see that below its waist the creature's body balloons outwards into what must be a massive, sand-colored insect thorax.  You feel something brush against you and you instinctively attempt to flinch, but you can't.  The sand feels packed against you, and straining every muscle you have to free your limbs gets you nowhere.  Gently, the creature slides its fingers behind your neck and makes you look into its black eyes.");
        outputText("<br><br>\"<i>You made it all too easy for me, little ant,</i>\" it says pityingly.  \"<i>Did no one warn you about sandtraps?</i>\"  Slowly it sinks downwards, and whilst it fondles your face you feel its other set of hands cup your [butt].  \"<i>Never mind,</i>\" the insect monster sighs into your forehead in its fluttery voice.  \"<i>I'll teach you everything there is to know.</i>\"");
    }
    startCombat(new SandTrap());
    // monster.changeStatusValue(StatusEffects.Level,1,2); TODO See what this does!
    doNext(playerMenu);
};

// Don't get suckered, chance to leave
SandTrapScene.dontSaveTheSandTrap = function() {
    clearOutput();
    //TODO SPRITE spriteSelect(97);
    outputText("You carefully step backwards from the quicksand, not taking your eyes off the stricken ");
    if (player.femininity <= 65) outputText("woman");
    else outputText("man");
    outputText(".  \"<i>Please!</i>\" ");
    if (player.femininity <= 65) outputText("she");
    else outputText("he");
    outputText(" cries, neck sinking into the drift.  \"<i>Don't let me die like this... oh, very well.  Have it YOUR way!</i>\"  The ");
    if (player.femininity <= 65) outputText("woman");
    else outputText("man");
    outputText(" suddenly thrusts upwards and plunges a fist into the fluid sand surrounding ");
    if (player.femininity <= 65) outputText("her");
    else outputText("him");
    outputText(".  The dune you are standing on caves inwards, turning into a shifting slide to the morass below you.  You stumble and hop backwards as fast as you can, managing to stay just ahead of the ");
    if (player.femininity <= 65) outputText("woman");
    else outputText("man");
    outputText("'s spell.  In front of you, sand collapses downwards into a great conical depression, at the epicentre of which is your supposed rescuee.  With ");
    if (player.femininity <= 65) outputText("her");
    else outputText("his");
    outputText(" midriff exposed and glamour gone, the creature looks quite different; six eyes as black as its hair look at you hungrily from its beautiful androgynous face, whilst four slender arms trail patterns in the sand around its willowy, flat-chested midsection.  It wriggles its body tauntingly at you, making the sand beneath it move ponderously.  You glimpse insect chitin beneath its flat humanoid belly; the buried half of this creature must be monstrous.");
    outputText("<br><br>\"<i>You aren't as slow as you look, little ant,</i>\" it calls up to you, grinning slyly.  It speaks in a buzzing, fluttering voice which is nothing like the one it attempted to entice you into its trap with.  \"<i>Why don't you come down here and dance for me some more?  I'm sure a quick, strong traveller like you could run rings around a simple little sandtrap like me.</i>\"  If you're going to fight this creature, you will have to step into its treacherous hollow to get in range, which is surely its intention - if you try launching things at it from where you are, it will probably just hide itself.  On the other hand, it would be easy to just ignore its taunts and walk away.");
    //[Fight]/[Leave]
    addButton(0, "Fight", SandTrapScene.startSandTrapFight);
    addButton(1, "Don't Save", Camp.returnToCampUseOneHour);

};

// Get into a fight anyway
SandTrapScene.startSandTrapFight = function() {
    startCombat(new SandTrap());
    playerMenu(); //TODO Do we need this?
    //TODO Sprite spriteSelect(97);
};

// Bad End Start - Lose twice and have requisite body parts
SandTrapScene.sandTrapBadEnd = function() {
    clearOutput();
    //TODO Sprite spriteSelect(97);
    outputText("Once again you find yourself wandering back to the desert.  For all that it is a treacherous, barren wasteland, you feel an odd allure to the place; your feet seem to know where to take you as you walk far from the relative sanctuary of Tel'Adre, far from the slithering grounds of the Naga, your mind somewhere in the mercilessly clear sky.  Your thoughts bubble and seethe into a froth high up there above your vacant body; there is an odd... swarming sensation to them, as if they were reaching out to touch the tips of other consciences just like your own.  You feel an awakening yearning to join, a loneliness, a want to become more than the tiny speck in the desert that you are.");
    outputText("\n\nYou start and come to your senses as your feet point downwards into a shifting pit.  Out in the middle of nowhere, you have led yourself to a Sandtrap.  It lazily trails its hands in the sand at the bottom of its hollow and grins up at you, its face shimmering between genders.  There is something... knowing in its smile.  You try and collect yourself a bit.  Why didn't the creature try and surprise you?  Somehow the sight of it sitting there brazenly, waiting for you, is more eerie than if it had tried to suck you into its trap.");
    outputText("\n\n\"<i>My people have stories about wanderers like you,</i>\" the androgyne says softly, its multiple black eyes looking into your own black orbs.  \"<i>It has been so long since we had such a one as you, and we were so winnowed by the soulless lions of the mountains, that your kind have passed into legend.  Surface scratchers who not only bear our children, but choose to do so willingly; who drink the fluids we gift them to become of our flesh; who come back to our lands time and again, answering a call only they can hear.</i>\"  The creature opens all four of its arms to you, beaming triumphantly.  \"<i>You need only to take the final step, Flytrap.  Come to me, and embrace your desztiny.</i>\"");
    outputText("\n\nYou stand at the lip of the Sandtrap's hollow, shaking your head, trying to make sense of what it is saying.  It's talking nonsense...isn't it?  Again you feel light-headed, your thoughts a lonely cloud of bees without a hive.  They have no purpose, and the Sandtrap is offering you one... but don't you already have a purpose?  Not as good a purpose as this one.  Not as right a purpose, one that perfectly suits what your body has become...  ");
    if (player.hasCock()) outputText("[EachCock] hardens and your thin frame feels aflame, barely understood impulses deep within you begging you to walk down and submit to the Sandtrap's will.  ");
    //Female:
    else if (player.hasVagina()) outputText("Your [vagina] moistens and your thin frame feels aflame, barely understood impulses deep within you begging you to walk down and submit to the Sandtrap's will.  ");
    outputText("You inhale hard and try to clear your head, forcing yourself not to sleepwalk downwards into the Sandtrap's waiting embrace.  The creature doesn't seem to mind your hesitation; it smiles softly and confidently, waiting for you with the infinite patience of its kind.  You need to make a choice here fast, before your burning body makes it for you.");
    //Fight/Desztiny/Leave
    menu();
    addButton(0,"Fight",SandTrapScene.sandTrapBadEndFight);
    addButton(1,"Desztiny",SandTrapScene.destiny);
    addButton(4,"Leave",SandTrapScene.leaveSandTrapBadEnd);

};

//Bad End Fight:
SandTrapScene.sandTrapBadEndFight = function() {
    clearOutput();
    //TODO SPrite spriteSelect(97);
    outputText("You shake yourself out of your fog, clench your [weapon] and grit your teeth.  You are your own person, dammit, and you will show this creature just what that means!  The Sandtrap slowly lowers its arms and looks at you with almost parental disappointment as you march into its pit with the obvious intention of beating the crap out of it.  \"<i>You want to dance again, Flytrap?</i>\" it sighs.  \"<i>I would prefer that you look at yourself and accept what you are, but I will force you to accept it if that is what you wish.</i>\""); //TODO Take out Bracket in text.
//(If fight won, resets counter)
    startCombat(new SandTrap());
};

//Bad End Lose Fight;
SandTrapScene.loseLastFightWithSandTrap = function() {
    clearOutput();
    //TODO Sprite spriteSelect(97);
    outputText("\"<i>Hhhhhyou are brave, little Flytrap, and hyou dance well,</i>\" says the Sandtrap, color high in its cheeks as it strokes your face, the rest of you buried securely underneath the sand.  \"<i>But it is time to put reckless foolishnessz behind you.</i>\"  Don't you think?  \"<i>After all, hyou have much important wwwork to do.</i>\"  Isn't that right?  You blink.  How is it doing that?  Did it... open its mouth at all?  The Sandtrap smiles at you with terrible understanding in its black eyes as you struggle.  You may deny it, \"<i>but hhhyou are one of usz, now.  In body,</i>\" and in mind.  You shake your head and try and focus, but it is impossible.  The trance-like state you felt out in the desert has returned, and you can't focus on anything except that feeling of loneliness... of lacking a purpose.  That is what is wrong here, you lack a purpose and you feel so empty, a vessel that needs to be filled, in need of a warm, loving hand upon you, turning you and pointing where you need to go... like the hand brushing your face now.  You look up at the Sandtrap, trying to beg it with your eyes to explain what is going on, and it answers you by taking your head into its hands, bending in and kissing you deeply.");
    SandTrapScene.sandTrapBadEndFinale();
};

//Bad End Leave:
SandTrapScene.leaveSandTrapBadEnd = function() {
    clearOutput();
//TODO Sprite spriteSelect(97);
    outputText("With some effort you break your stare with the Sandtrap, turn away and step back towards camp, resolving to leave this disturbing scenario with its disturbing thoughts behind.");
    outputText("\n\n\"<i>I understand, Flytrap,</i>\" a calm voice reaches you from behind.  \"<i>You need time to think things over and truly recognise what you are.  I know you will come back.  You always do.</i>\"");
    doNext(Camp.returnToCampUseOneHour);
};

//Bad End Destiny:
SandTrapScene.destiny = function() {
    clearOutput();
    //TODO Sprite spriteSelect(97);
    outputText("The Sandtrap is right.  What your body and subconscious are telling you is so right.  At your acceptance of what the creature is saying warmth floods through your body; your mind bubbles as blood rushes towards your skin, making you feel incredibly sensitive, incredibly sexual.  ");
//Male:
    if (player.hasCock()) outputText("Your cock strains upwards and you moan; feeling as sensitive as you do, you are both desperate to be touched and desperate not to be.  ");
//Female:
    else if (player.hasVagina()) outputText("You feel but barely hear the drip of moisture on the sand, both your [asshole] and [vagina] beading with oily need.  ");
    outputText("It seems incredible, as you stumble slowly downwards, feeling every grain of sand underneath your receptive feet, that barely seconds ago you were even considering not doing this.  It dully occurs to you that there was a reason for that, that you had a purpose.  What is your purpose? You feel like you are shedding whatever that was like an old skin as you walk downwards, discarding an old, directionless life, becoming something newer and raw and purposeful.  You practically throw yourself into the waiting embrace of the Sandtrap, moaning softly as you press your hands against its supple body and feel its quartet of hands slowly explore your back, your nape, your thin wings, your [butt].  You feel like you've come home.");
    outputText("\n\n\"<i>Good " + player.mf("boy", "girl") + ",</i>\" says the Sandtrap, giggling slightly as it caresses you.  \"<i>Of course, that word doesn't mean anything to you anymore.</i>\"  You blearily look into its thin, beautiful face to ask what it means by that, and the creature takes the opportunity to plunge its tongue into your unresisting mouth.");
    SandTrapScene.sandTrapBadEndFinale();
};

//End the game
SandTrapScene.sandTrapBadEndFinale = function() {
    //TODO Sprite spriteSelect(97);
    outputText("\n\nIts lips move a slippery friction against yours as it twines its tongue around yours and begins to work glands deep in its gourd, trickling oil into your mouth.  It holds the back of your head kindly yet firmly as it does this, as if it were feeding you, but there is no need for it to apply any pressure at all.  You are nothing but a vessel for it, accepting what it is doing to you without question; you know nothing but the texture of oil and the creature's tongue pushing into you.  Your willingness is rewarded by making the Sandtrap's fluids flow swifter; it smiles against your face before gushing oil into your mouth in a torrent.  At the very edge of your awareness, you feel the sand parting around your feet, of the Sandtrap pushing you slowly downwards, of the delicious feeling of an infinity of warm particles against your “thighs”; but this is as nothing to the warm ooze sliding down your throat, intensifying your sensitivity, making you gasp and pull away and gush fluids of your own against the Sandtrap, before being pushed back into its dripping mouth with that insistent, loving pressure.  You drink, and drink, and drink, transfixed by a kiss which is more like suckling at a teat...");
    outputText("\n\nYou start and wake.  Groggily you get to your feet, and look around.  You are out in a featureless tract of the desert; there doesn't seem to be anyone around, and the sun is sinking slowly towards the dunes.  The Sandtrap let you go! You are free to return to your quest.  What was that again? You strain your mind against the layers of wooziness which cosset you, and you feel your thoughts once again flow into the high sky above you, throb and meld with others.  You feel a deep urge seize you from somewhere else, encompass your soft thoughts and thrust into you with a dominant demand and you gasp");
    if (player.gender > 0) {
        outputText(", feeling your ");
        if (player.hasCock()) outputText("cock harden");
        else outputText("vagina dribble");

    }
    outputText(".  Yes.  You remember your quest.");

    outputText("\n\nYou flit around the desert until you find what you are looking for.  A lone, purple shape, trailing along the dunes, throwing glances around himself uneasily - an incubus, almost certainly one of the oasis demons who has wandered away from the pack.  You land quietly behind him, tuck your wings behind your back and then feel your face shimmer, taking on a look of young, naive femininity, before you call out to him.  He turns, a look of relief melting into poorly disguised lechery as he hurries towards you.  He sees a way out of this treacherous wasteland and a free fuck at the end of it, and he gladly follows you as you beckon him towards yourself.");
    outputText("\n\nHis expression only changes when his cloven hoof sinks ten inches into the sand, and he lets out a deliciously despairing wail as the desert floor collapses all around him and drags him down into the waiting arms of a Sandtrap.  The androgyne smiles up at you perched upon the lip of its nest as it pushes the incubus down into the sandy mire, and you feel incredible euphoria.  Approval soaks into you from the sky above and the mere fact that you have fulfilled your purpose, that the dominant caste are pleased with you, has you kneeling upon the sand, stroking your [nipple]");
    if (player.hasCock()) outputText(" and masturbating [oneCock] desperately");
    else if (player.hasVagina()) outputText(" and fingering your [vagina] desperately");
    outputText(".  But, of course, as a fresh dominant urge takes you and drags you reluctantly from your needy genitals, there is much still left to be done.");

    outputText("\n\nYou spend the rest of your life fulfilling the duties of a Flytrap, leading unsuspecting wanderers of the desert into the grasp of the Sandtraps.  When times are lean you gladly submit to the Sandtraps yourself - gleefully allow them to pump your moist, obedient ass full of eggs.  They don't have to do that too often though, because you quickly become an absolute master at fooling travellers with your looks; able to sense what even the most cautious want to see and becoming it at the twitch of a wing, the ultimate desert mirage.  Before too long the air of Mareth's desert and plains become full of little Flytraps, their reaches treacherously pregnant with shifting Sandtraps, deadly even to the demons; you are joined by many others who willingly submit to the warm oil and the thoughts in the sky.  You have fulfilled your desztiny.");
    gameOver();
};
