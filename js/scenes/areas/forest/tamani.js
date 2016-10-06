/**
 * Converted by matraia on 10/6/16.
 */

TamaniScene = [];

//---------
// Tamani Combat Information
//---------

//Tamani Description
function Tamani() {
    //Names and References
    this.a = "";
    this.name = "Tamani";
    this.refName = this.name
    //this.imageName = "tamani";
    this.long = "She keeps her arms folded across her " + TamaniScene.tamaniChest() + " and glares at you.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts bulges out around her arms, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs."; //TODO Fix Desc.
    // this.plural = false;
    this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_NORMAL);
    this.createStatusEffect(StatusEffects.BonusVCapacity, 55, 0, 0, 0);
    this.createBreastRow(Appearance.breastCupInverse("E"));
    this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
    this.ass.analWetness = ANAL_WETNESS_DRY;
    this.createStatusEffect(StatusEffects.BonusACapacity,40,0,0,0);
    this.tallness = 40;
    this.hipRating = HIP_RATING_AMPLE+2;
    this.buttRating = BUTT_RATING_LARGE;
    this.skinTone = "greenish gray";
    this.hairColor = "pink and black";
    this.hairLength = 16;
    this.str = 32;
    this.tou = 43;
    this.spe = 55;
    this.inte = 62;
    this.lib = 65;
    this.sens = 65;
    this.cor = 50;
    this.weapon.equipmentName = "fists";
    this.weapon.verb="tiny punch";
    this.armor.equipmentName = "leather straps";
    this.bonusHP = 40;
    this.lust = 40;
    this.lustVuln = 0.9;
    //this.temperment = TEMPERMENT_RANDOM_GRAPPLES; // TODO Get Grapple Temperment Properly Coded
    this.level = 4;
    this.gems = rand(25) + 5;
    this.clearDrops();
    this.addDrop(Items.Consumables.GoblinAle, 25);
    this.addDrop(Items.Consumables.LustDraft, 5);
    this.addDrop(Items.Consumables.HairDyePink, 5);
    this.addDrop(Items.Consumables.HairDyeBlue, 5);
    this.addDrop(Items.Consumables.HairDyeOrange, 5);
    this.addDrop(Items.Consumables.HairDyePurple, 5);
    this.addDrop(Items.Consumables.IncubiDraft, 5);
    this.addDrop(Items.Consumables.Reducto, 5);
    //this.addDrop(Item.Consumables., 5); //TODO Add Large Blue Egg

    this.victory = TamaniScene.tamaniWin;
    this.defeat = TamaniScene.tamaniLoss;
}
Tamani.prototype = new Creature();
Tamani.prototype.constructor = Tamani;


//COMBAT AI
Tamani.prototype.doAI = function() {
    switch (rand(4)) {
        case 0:
            Tamani.tamaniTeaseAttack(); // If her hypnosis attack succeeds, this will divert to her special tease attack.
            break;
        case 1:
            Goblin.goblinDrugAttack(); // Tamani is an extension of Goblin in the original code. Let's see if we can just refer to this attack and not cause a problem.
            break;
        case 2:
            Tamani.tamaniHypnoTease(); // She really likes the hypnosis thing.
            break;
        default:
            this.attack();
    }
    combatRoundOver();
};


Tamani.tamaniTeaseAttack = function() {
    if (gameFlags[TAMANI_TIMES_HYPNOTIZED] > 0) {
        Tamani.tamaniHypnoTease();
    }
    else Goblin.goblinTeaseAttack();
};

Tamani.tamaniHypnoTease = function() {
    var selector = rand(3);
    if (selector == 0) outputText("Tamani smiles and shifts her leather straps, pulling one into the puffy gash that is her vagina.  She groans out loud, sliding the studded leather band into her outer lips and sawing it along her clit.  Her whole body blushes as she pulls it free, running a fingertip up the now wet strip of leather, \"<i>Mmm, can't you see how much my pussy needs a man inside it?  Be a good husband and fuck Tamani full!  You know you want to.</i>\"<br><br>", false);
    if (selector == 1) outputText("Tamani saunters up to you, sliding her fingers down to each side of her pussy and spreading them.  Your eyes are drawn to her honeyed tunnel, unable to look away she gets closer.  She whispers, \"<i>Your cock knows what it needs.  Just be a good husband and obey your dick, it KNOWS how badly you need mistress's pussy.</i>\"<br><br>", false);
    if (selector == 2) outputText("Tamani turns around and bends down, pressing her hands into the dirt as she kicks her legs apart.  Your stare open-mouthed at her bouncy ass-cheeks and the tantalizingly wet entrance of her slit.  She smirks and offers, \"<i>You've cum so many times inside me, why resist when you can give in and feel that pleasure again today?  Come on husband, don't make Tamani beg...</i>\"<br><br>", false);

    //Low Hypnosis
    if (gameFlags[TAMANI_TIMES_HYPNOTIZED] < 5) {
        selector = rand(3);
        if (selector == 0) outputText("You reluctantly pull your stare away from the heavenly entrance between her legs.  There's an urge to walk over to her and plunge yourself inside her over and over, but you dismiss it.", false);
        if (selector == 1) outputText("You find it hard to pull your gaze from her inviting twat, but you manage.  You shake your head, clearing away thoughts of fertilizing your wife.  Her rhetoric must be getting to you.", false);
        if (selector == 2) outputText("No matter the case, her actions shifted a fair bit of your blood-flow to your groin.", false);
    }
    //Medium Hypnosis
    else if (gameFlags[TAMANI_TIMES_HYPNOTIZED] < 10) {
        selector = rand(2);
        if (selector == 0) {
            outputText("With effort you manage to wrench your eyes away from the inviting folds of Tamani's vagina.  ", false);
            if (player.totalCocks() > 1) outputText("Each of y", false);
            else outputText("Y", false);
            outputText("our " + player.multiCockDescriptLight(), false);
            if (player.lust > 80) outputText(" drips pre-cum", false);
            else if (player.lust > 40) outputText(" grows harder", false);
            else outputText(" hardens", false);
            outputText(" from the sexual sight, and you feel a compulsion to rush to your wife and take her on the spot.  Obviously she's not really your wife, but after so many fuckings it kind of makes sense to think of her that way.", false);
            if (player.lust < 70) outputText("  Still, you don't want to fuck her right now!", false);
        }
        else {
            outputText("Struggling, you pull your eyes back into your head and away from Tamani's gorgeous slit.  You shudder, feeling ", false);
            if (player.totalCocks () > 1) outputText("each of ", false);
            outputText("your " + player.multiCockDescriptLight(), false);
            if (player.lust <= 41) outputText(" thicken perceptibly", false);
            else if (player.lust <= 81) outputText(" twitch eagerly", false);
            else outputText("drip pre-cum", false);
            outputText(", responding to the overly sensual goblin's body.  You start to approach her, but stop yourself, realizing you were about to pick up your wife and fuck her on the spot.  You know she's not really your wife, but you have a hard time thinking of her as anything else, save for maybe your mistress.", false);
            if (player.lust < 70) outputText("  Regardless, you're resolute in your desire not to fuck her right now!", false);
        }
    }
    //High Hypnosis
    else {
        selector = rand(2);
        if (selector == 0) {
            outputText("You barely manage to step yourself from lunging forward to bury your mouth between your mistress's legs.  Hard and trembling between your legs, ", false);
            if (player.totalCocks() > 1) outputText("each of ", false);
            outputText("your " + player.multiCockDescriptLight() + " aches with need.  You battle with the compulsion to kneel before your short, stacked mistress and perform your duties as her breeder husband.", false);
        }
        else {
            outputText("You wrench your gaze from the juicy mound before you with great difficulty.  The desire to submit to your wife and fuck her on the spot rages through your body, melting your resistance into liquid lust and pooling it in your groin.  ", false);
            if (player.totalCocks() > 1) outputText("Each of y", false);
            else outputText("Y", false);
            outputText("our " + player.multiCockDescriptLight() + " pulses and dribbles pre-cum, aching to do its duty and fire load after load into Tamani's perfect pussy.", false);
        }
    }
    if (gameFlags[TAMANI_TIMES_HYPNOTIZED] == undefined) gameFlags[TAMANI_TIMES_HYPNOTIZED] = 0; // Kludge for save fix.
    player.changeLust((rand(player.lib/5)) + 3 + gameFlags[TAMANI_TIMES_HYPNOTIZED]);
    gameFlags[TAMANI_TIMES_HYPNOTIZED]++; //TODO Test this for balance. May have to put an upper limit or else Tamani could instantly win in a long game.
};

//------
// VICTORY AND DEFEAT SCENES
//------

TamaniScene.tamaniWin = function() {
    clearOutput();
    if (monster.HP <= 0) {
        outputText("Tamani is defeated!");
    }
    else {
        outputText("Tamani gives up on defeating you and starts masturbating!");
    }
    TamaniScene.tamaniVictoryMenu();
};

TamaniScene.tamaniLoss = function() {
    if (player.HP <= 0) {
        if (player.totalCocks() > 0) {
            if (rand(2) == 0) TamaniScene.tamaniSexLost();
            else TamaniScene.tamaniSexLetHer();
        }else {
            outputText("Tamani sighs as you begin to lose consciousness, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"", true);
            cleanupAfterCombat();
        }
    } else {
        if (player.totalCocks() > 0) {
            //hypnoslut loss scene
            if (gameFlags[TAMANI_TIMES_HYPNOTIZED] > 19 && rand(2) == 0) {
                TamaniScene.getRapedByTamaniYouHypnoSlut();
            } else if (rand(2) == 0) TamaniScene.tamaniSexLost();
            else TamaniScene.tamaniSexLetHer();
        } else {
            outputText("You give into your lusts and masturbate, but Tamani doesn't seem to care.  She kicks and punches you over and over, screaming, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"", true);
            player.HP = 0; // Beats you up
            cleanupAfterCombat();
        }
    }
}

//-------
// INITIAL ENCOUNTER
//-------

TamaniScene.encounterTamani = function() {
    if (player.totalCocks() <= 0) {
        TamaniScene.tamaniFemaleEncounter();
        //TODO Expansion idea - Additional female encounters?
    }
    //Dudezillaz:
    else if (gameFlags[TAMANI_MET] == 0) {
        TamaniScene.tamaniMaleFirstEncounter();
    }
    else {
        TamaniScene.tamaniMaleRepeatEncounter();
        //Switch Block After Tamani Pregnancy is Complete
        /*
        switch (pregnancy.event) {
            case  2: tamaniPregnantEncounter();	break;	//She's moderately pregnant
            case  3: tamaniPoopsOutBabies(); break;		//She's close to giving birth so do it now
            default: tamaniMaleRepeatEncounter();		//She's not pregnant or is only slightly pregnant
        }
        */
    }
}

//Female Encounters Start
TamaniScene.tamaniFemaleEncounter = function() {
    //spriteSelect(56); TODO Tamani Sprite
    clearOutput();
    outputText("A goblin leaps out from behind a rock outcropping.  She keeps her arms folded across her " + TamaniScene.tamaniChest() + " and glares at you.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts bulges out around her arms, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs.<br><br>", false);
    outputText("She says, \"<i>There's only so much cock around, and I got dibs on ALL of it, O.K. skank?</i>\"<br><br>", false);
    //[Umm OK?] [No]
    menu();
    addButton(0, "Yes", TamaniScene.tamaniFemaleYes);
    addButton(1, "No", TamaniScene.tamaniFemaleNo);
    addButton(2, "PreferGirls", TamaniScene.preferTamaniFemdom);
};

// Female Agree with Tamani, Obtain Deluxe Dildo
TamaniScene.tamaniFemaleYes = function() {
    //spriteSelect(56); TODO Tamani Sprite
    clearOutput();
    outputText("\"<i>That's what I thought,</i>\" says the goblin as she fishes around in her pouches, \"<i>but I'm not cruel, I'll give you my best dildo so you can keep your hot little box stuffed all the time.</i>\"<br><br>", false);
    outputText("She pulls out a long pink dick and tosses it to you.  You catch it and it flops around, nearly slapping you in the cheek.  ", false);
    if (player.cor < 50) outputText("Gross.<br><br>", false);
    else outputText("Getting cock-slapped would've been kind of hot...<br><br>", false);
    outputText("The goblin leaves you with a warning, \"<i>Be careful, it likes to leak aphrodisiacs like crazy.  Believe me, those are FUN to get addicted to.  Oh, and remember – Tamani owns all the cocks around here, so if you ever grow one, come pay your dues!</i>\"<br><br>", false);
    outputText("(<b>Deluxe Dildo acquired!</b>)", false);
    player.createKeyItem("Deluxe Dildo",0,0,0,0);
    doNext(Camp.returnToCampUseOneHour);
};

// Female Disagree with Tamani. Tamani leaves in a huff.
TamaniScene.tamaniFemaleNo = function() {
    //spriteSelect(56); TODO Tamani Sprite
    clearOutput();
    outputText("The goblin harrumphs, \"<i>We'll see about that slut.  I'll be knocked up from every monster and stud this side of the mountain.  Hell, just grow one dick, and see how fast Tamani's legs get wrapped around you!</i>\"<br><br>", false);
    outputText("She flounces off, clearly planning on fucking everything capable of producing sperm on her way home.  ", false);
    if (player.cor < 33) outputText("What a slut.", false);
    else if (player.cor < 66) outputText("How odd.", false);
    else outputText("You hope she misses a few.", false);
    doNext(Camp.returnToCampUseOneHour);
};

// Facesitting Femdom option
TamaniScene.preferTamaniFemdom = function() {
    clearOutput();
    //Tamani Facesit
    //===========Tamani============
    //((Female PC has a third option when they encounter Tamani, labeled 'Like girls' if this is implemented; it gets them the following text.))
    outputText("\"<i>You're into girls, huh?</i>\" Tamani laughs, turning around and giving her fat butt a playful swat.  You watch as she does it a second time, laughing more at you than <i>with</i> you now, and then turns back around.  \"<i>Tell you what then, slut! I've had crap luck today finding a good stud, so I'll make you a deal.</i>\"");
    outputText("<br><br>Tamani advances closer, staring you straight in the eye with an impish smirk.  \"<i>I'll let you get me off if you swear to stay away from </i>my<i> cocks. Deal?</i>\"");
    menu();
    addButton(0,"Accept", TamaniScene.acceptTamaniFacesits);
    addButton(1,"Refuse", TamaniScene.declineTamaniFacesits);
};

// Decline Femdom
TamaniScene.declineTamaniFacesits = function() {
    clearOutput();
    outputText("You tell her you're not interested.");
    outputText("<br><br>The curvy goblin kicks you with a snarl, making you instinctively grab at one [leg] and hop around on the other - until she kicks it too, knocking you down.  \"<i>Fine, bitch. Have it your way. But if I find you taking <b>my</b> cocks again, you're going to be in trouble!</i>\"  She darts off before you can get a word in edgewise, leaving you alone.");
    //TODO ((Needs non-leg and centaur equivalents))
    doNext(Camp.returnToCampUseOneHour);
};

// Accept Femdom
TamaniScene.acceptTamaniFacesits = function() {
    clearOutput();
    outputText("You eye the goblin's wide hips again before you nod, anticipating the idea.");
    outputText("<br><br>Tamani's impish smirk blooms into a wide grin, and the little goblin gently shoves you.  \"<i>Lay down, then!</i>\" she tells you.  You decide to comply, reaching for your [armor] - but she stops your hand.  \"<i>No need to strip, skank. Just lay down,</i>\" she tells you, pushing again.  You shrug and comply with her request, finding a comfortable spot on the ground to lay on, and then look over at her.");
    outputText("<br><br>She's pulled a vial off of one of the straps of fabric draped over her body and uncorked it; she empties the vial's purple-hued contents into a hand, not even looking at you, and then smears them all over her pussy.  The goblin gives a lusty moan as her fingers dig in, jilling herself as her knees shake, and a heat starts to build between your legs as you watch her getting off.  Just as your hands are about to creep south for a little self-pleasuring of your own, Tamani starts to walk over to you, her engorged, green cunt dripping with her juices, rather than the fluid she just rubbed all over it.");
    outputText("<br><br>\"<i>A little insurance.</i>\"  Tamani explains.  \"<i>I know </i>you're<i> going to enjoy getting me off, skank. I want to make sure I'll enjoy it just as much,</i>\"  She swings a leg over your head, one to either side of your neck - and then slowly sits down.  \"<i>Here we go~</i>\" she coos, sing-song.");
    outputText("<br><br>Your field of view is already dominated by her giant green butt, the thick globes of her ass-cheeks jiggling as she lowers herself down - and her pussy drips all over your mouth, the little green whore using the fluids to line herself up.  There's a sudden rush of air as her butt drops the rest of the way all at once, her hips dropping straight down onto your [face], and her pussy lips mash against your mouth in a perverse, sloppy 'kiss'.");
    outputText("<br><br>Your nose ends up jammed somewhere between her cheeks, tainting your every breath with the scent of goblin butt, and the juicy haunches of her backside block most of your view, most of the light you can see coming from the crack between them.  \"<i>Lick me, cunt!</i>\" she yells, grinding her hips left-to-right and rubbing her wet snatch against you in the process.");
    outputText("<br><br>You try to breathe - but find it difficult, most of your breath being blocked out by plump goblin ass, and so you reach your hands up and move the squishy cheeks, your tongue darting out as you breathe.  You run your tongue up and down along the goblin's gash, enjoying the weird, slightly-creamy taste of her juices, and she lets out a short moan.  \"<i>Come on, you can do better than that!</i>\"  She grabs your hands, then bounces up, bringing her gash smacking back down against your tongue - which slips between her outer lips.");
    outputText("<br><br>\"<i>Fuck yeah!</i>\" she yells, bouncing on top of your [face] and smothering you with 50 pounds of dripping goblin pussy and ass.  Your tongue dips in and out of her honey pot, and you try your best to slather her walls and her lips with attention whenever they're within reach, drawing more and more juices out of the lusty bitch.  \"<i>Yeah, f-f-fuck, keep licking!</i>\"  You consider reaching up to grab her butt and <i>hold</i> her against your [face], but her constant bouncing keeps your efforts to move your hands from amounting to too much.");
    outputText("<br><br>Instead she stops on her own, grinding her snatch against you instead, and her soppy cunt smears its juices all over your mouth as she rubs it back and forth, using your [face] like some kind of living sex toy before stopping with her cunt over your mouth.  \"<i>Get your tongue in there!</i>\" She playfully orders you, leaning forward and freeing a bit of your view from the thick green asscheeks.");
    outputText("<br><br>It takes all you have to not let out a frustrated 'finally' as the goblin settles down long enough for you to actually try to get her off, but you manage to slip your tongue deep between her folds instead.  You lick and lap at the inside of her tunnel, letting out a few hushed moans and sighs as your own cunt drips far below, and her juices keep flowing out in reward.  The slutty goblin herself 'helps' things along by constantly rubbing her breasts and moaning, and you keep licking away at her insides.");
    outputText("<br><br>Getting an idea, you slip one hand around to her front and one towards her big ass - and attack her from both angles at once as you curl your tongue around inside of her, forcing its tip against her walls as you swirl it around and around in circles.  Your right hand reaches out and grabs the goblin's engorged clit, forcing a shrill cry of pleasure out of her whorish lips, and your left slips a pair of fingers between the cunt's cheeks, piercing her asshole.");
    outputText("<br><br>\"<i>O-oh f-fuck!</i>\" she cries, cheeks clenching down on your hand - but you're not having any of that.  You pinch her clit and give it a little twist, making her hips jump forward as her legs try to close in front of her - and then quickly fingerfuck her asshole, stopping that movement with the sudden shock.  Back and forth you pleasure her, licking her sloppy cunt all the while, and she bucks atop you, crying out in pleasure.");
    outputText("<br><br>\"<i>F-fuck yeah, fuck yeah, ye-he-he-hehhsss!</i>\" she screams, pinching and twisting her nipples.  Her hips move so that her lips are pushed at an awkward angle against your mouth and searching tongue - and you manage to snake it into rubbing against a weird-feeling little spot inside of her.  Instantly, her entire body seizes up as you lick what has to be a sensitive spot in her green twat, and you abuse the advantage by assaulting it with your tongue.");

    outputText("<br><br>The movements of her bucking hips and fat ass stop, instead replaced by a full-body shivering as you finger her ass and molest her clit on top of everything else, and she tries to speak again.  \"<i>F-f-f... ff-... f-f-f-f...</i>\"  All she manages to do is let out high-pitched, half-squealing little 'fffff' sounds, like she's trying to swear over and over and failing just as often, and then you pinch her clit one more time.");
    outputText("<br><br>\"<i>FFFFFFFNNNNNnnnnnnnn!</i>\" the green whore cries out, her thighs clamping down on the sides of your head like a vice.  Her asshole grips down on your invading fingers, holding them in place, and her pussy undulates around your tongue like a living thing, more and more of her juices gushing out as the little slut comes <b>hard</b> before she just... goes limp.");
    outputText("<br><br>You withdraw your fingers from her ass and let go of her clit, and the little green fuck-doll topples over, falling into the dirt and muttering something incoherently. You sit up and look, admiring the sight of her fat green ass sticking up in the air with her juices still dripping down her thighs, and decide to walk away from the clearly unconscious goblin.");
    player.changeLust(20+player.lib/20);
    doNext(Camp.returnToCampUseOneHour);
};

//Male Encounters Start - First Time
TamaniScene.tamaniMaleFirstEncounter = function() {
    //spriteSelect(56); TODO Tamani Sprite
    gameFlags[TAMANI_MET] = 1; //Indicates you've met her as a male at least once
    clearOutput();
    outputText("A goblin leaps out from behind a rock outcropping.  For something so small, she has a lot of curves.  She advances towards you, rolling her hips in a suggestive way, immediately diverting your blood-flow to your crotch.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts jiggles pleasantly with every step, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs.\n\n", false);
    outputText("The goblin makes you an offer that's difficult to turn down, \"<i>Hey there stud, want to fuck me pregnant?  I promise my box will milk your dick dry.  Just let Tamani take care of all your boners OK?</i>\"", false);
    //[Fuck Her] [Refuse]
    menu();
    addButton(0, "Fuck Her", TamaniScene.tamaniFirstTimeConsentual);
    addButton(1, "Refuse", TamaniScene.tamaniFirstTimeRefusal);
};

//Male - Accept Sex First Time
TamaniScene.tamaniFirstTimeConsentual = function() {
    //spriteSelect(56); TODO Tamani Sprite
    //tamaniKnockUp(); TODO Tamani Pregnancy
    clearOutput();
    outputText("You almost can't believe your good fortune.  Finally you meet a creature willing to talk instead of just launching into violent rape.   Her direct advances were so crude and overtly sexual that you felt yourself stiffening before she could even finish her offer.   Your decision was made by the tent in your " + player.armorName + ".  You'll give Tamani exactly what you both want.\n\n", false);
    outputText("Her hips sway seductively as she approaches with her right hand dipping into the moist honeypot of her sex.  You disrobe, throwing your " + player.armorName + " to the side before you reach down and lift her up, pressing her curvy body against your ", false);
    if (player.biggestTitSize() > 1) outputText(player.allBreastsDescript(), false);
    else outputText("chest", false);
    outputText(".  She wraps her tiny arms around your neck and kisses you passionately, letting her tongue slither through your lips.   The two of you french kiss hard, virtually tongue-fucking each other.\n\n", false);
    outputText("She breaks the kiss and smiles, licking the shining purple lipstick she wears as she whispers in your ear, \"<i>Mmmhmm, I knew your juicy cock just couldn't resist a wet and ready pussy like mine.  I made sure to lace my lipstick with fertility enhancing chemicals too, so we'll be nice and messy.</i>\"\n\n", false);
    outputText("As if to emphasize her point, she curls her toes around your " + player.cockDescript(0) + ", squeezing as she slides her feet up and down your length, milking out a few large drops of pre-cum.  You groan and kiss her again – too turned on to care if the drug-laced lipstick turns your orgasm into a pregnancy-inducing flood. ", false);
    if (player.balls > 0) outputText("Your " + player.ballsDescriptLight() + " swell with seed, spurring your desire to new heights.", false);
    else outputText("Something inside you swells up with seed, spurring your desire to new heights.", false);
    outputText("  You NEED to fuck her pussy full – NOW.\n\n", false);
    //(FITS)
    if (player.cockArea(0) <= 90) {
        outputText("Tamani breaks the kiss and gives you a coy smile as she shimmies down your body, dropping her moist cunt onto your " + player.cockDescript(0) + "'s " + player.cockHead() + ".  She swings her hips in a little circle, teasing you with her moist entrance as your drug-enhanced pre-cum bubbles and drools around her lips, mixing with her own copious fluids as it flows down your length", false);
        if (player.balls > 0) outputText(" and drips from your " + player.ballsDescriptLight(), false);
        outputText(".  She stops and teases, \"<i>Ready to stuff me full of your cream?  I just KNOW I'll get pregnant from such a purrfect mate.</i>\"\n\n", false);
        outputText("Tamani doesn't wait for an answer – she pauses until you're about to reply, then drops her weight down, fully impaling herself and turning the beginnings of your reply into a babbled moan.  She plants her feet on your thighs and her arms around your back and begins bouncing up and down rapidly, squeezing and contracting, milking your " + player.cockDescript(0) + " in her tight wet walls the entire time. Your inner abdominal muscles begin clenching and squeezing, sending a wave of heat through your groin as your baby-batter begins its journey towards the goblin's womb.\n\n", false);
        outputText("You grab her with both hands and slam her down, taking her to the hilt", false);
        if (player.cockArea(0) > 30) outputText(" and watching her belly bulge from your size", false);
        outputText(".  She twists violently, practically thrashing in your arms as spunk begins pouring into her womb, making her belly start to bloat.  The goblin babbles incoherently with each blast of cum, stretching tighter and tighter around you as her pussy works to hold in every drop of spunk.  Her belly bloats a bit more, until the pressure is too much to bear and jism begins spurting around her opening, splattering into a puddle on the ground.\n\n", false);
        outputText("All good things eventually end, and with a sigh you pull the insensate goblin slut free of your " + player.cockDescript(0) + ", watching a river of whiteness drain from between her thighs.  You set her down and the escaping jism suddenly stops, the remainder held inside by some kind of reflex.  Tamani giggles and pats her still pregnant-looking belly, \"<i>Wasn't the sample nice?  Come see me when your dick has had a chance to recover and we can do this again, and again, and again.  You're practically hooked already aren't you " + player.mf("stud","hun") + "?</i>\"\n\n", false);
        outputText("It takes a moment to put your " + player.armorName + " back on and make ready to leave, but somehow you know this isn't the last you've seen of this goblin.", false);
        //[CORRUPT]
        if (player.cor > 66) outputText("  Your " + player.cockDescript(0) + " twitches at the thought, ready and wanting more.", false);
    }
    //(TOO BIG)
    else {
        outputText("Tamani breaks your sloppy kiss and shimmies down your body, clutching tightly to your " + player.cockDescript(0) + " and " + player.skinDesc + " as she settles down lower on your groin.  The goblin somehow manages to turn herself around so that is she is hanging upside-down, with her legs and arms clutching tightly to your member while her tongue ", false);
        if (player.hasSheath()) {
            outputText("licks the edges of your sheath", false);
            if (player.balls > 0) outputText(" and balls", false);
        }
        else {
            if (player.balls > 0) outputText("licks all over your balls", false);
            else if (player.hasVagina()) outputText("sneaks between your folds to tease your now-hardening clit", false);
            else outputText("licks the sensitive " + player.skinTone + " " + player.skinDesc + " of your inner thighs", false);
        }
        outputText("\n\n", false);
        outputText("Her cunt grinds on your crown, smearing it with a mixture of the drooling cunt-lubricant and your own drizzles of pre-cum.  As your dick becomes slick and wet, the feeling of her arms and legs wrapped around you feels better and better.   She even squeezes her arms tight around you like a cock-ring, making your dick pulse and swell with blood for a few seconds before she releases.  Your inner abdominal muscles begin clenching and squeezing, sending a wave of heat through your groin as your baby-batter begins its journey to freedom.\n\n", false);
        outputText("She feels it pass between the fingers she has pressing on her vulva, and with surprising athleticism, the goblin pushes herself up, landing the wet gash of her cunt directly on top of your over-sized urethra.  You groan as the first wad blasts free of your body, filling her rather adaptable love-canal with thick spoo.  A few sprays of spunk squirt out to the sides around the edge of the imperfect seal, while her hands work from the bottom to the top of your " + player.cockDescript(0) + " trying to squeeze out even more.\n\n", false);
        outputText("Tamani's body starts to distend as you pack more and more spunk into her hungry womb.  Her belly bloats out as more and more jizz escapes around her wet lips, unable to fill her any further.  The goblin rocks from the force of your eruptions before falling off and landing flat on her back.  Still, your body keeps pumping out more", false);
        if (player.balls > 0 && player.hoursSinceCum > 200) outputText(", visibly draining your " + player.ballsDescriptLight() + " down to their normal size", false);
        outputText(" as Tamani does her best to catch it in her mouth and soaked cunt.\n\n", false);
        outputText("You shake the last few drops of spoo free, letting them drip into her hair as you finish.  You look down at the satisfied goblin girl as she says, \"<i>Wasn't my free sample nice?  Come see me when your dick has had a chance to recover and we can do this again, and again, and again.  You're practically hooked already aren't you " + player.mf("stud","hun") + "?</i>\"\n\n", false);
        outputText("It takes a moment to put your " + player.armorName + " back on and make ready to leave, but somehow you know this isn't the last you've seen of this goblin.", false);
        //([CORRUPT]
        if (player.cor > 66) outputText("  Your " + player.cockDescript(0) + " twitches at the thought, ready and wanting more.", false);
    }
    player.dynStats("lib", .5, "sen", -1, "cor", .5);
    doNext(Camp.returnToCampUseOneHour);
    player.orgasm(); //TODO Check order on this. I recall there being something funny about it.
};

//Male - Refuse Sex First Time
TamaniScene.tamaniFirstTimeRefusal = function() {
    //TODO Tamani Sprite spriteSelect(56);
    clearOutput();
    outputText("Tamani's eyes widen in surprise, \"<i>Don't let the size fool you, big " + player.mf("boy", "girl") + ". I can take more than you think,</i>\" she says while her hands begins playing with her box, \"<i>Are you sure you don't want to just let off a little steam?</i>\"\n\n", false);
    //[Fuck Her (Goes to fuck her - consensual first time)]
    //[No means no]
    player.changeLust(5);
    addButton(0, "Fuck Her", TamaniScene.tamaniFirstTimeConsentual);
    addButton(1, "Refuse", TamaniScene.tamaniSecondRefusal);
};

//Male - Refuse Sex First Time - Second Refusal
TamaniScene.tamaniSecondRefusal = function() {
    //spriteSelect(56); TODO Tamani Sprite
    clearOutput();
    outputText("The goblin pouts, anger clouding her cute little features.  She turns and storms off, clearly pissed at you, \"<i>Think about it.  Next time that dick better ache for me, or I'll MAKE you want it.</i>\"\n\n", false);
    outputText("...What?", false);
    doNext(Camp.returnToCampUseOneHour);
};



//--------
// Tamani misc functions
//--------



TamaniScene.tamaniChest = function() {
 outputText("chest");
 return;
};