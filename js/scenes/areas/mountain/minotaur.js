MinotaurScene = [];

addToGameFlags(MINOTAUR_TF2, MINOTAUR_AND_COWGIRL);

function Minotaur(axe) {
    //Name and references
    this.a = "the ";
    this.name = "minotaur";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "he";
    this.himHer = "him";
    this.hisHer = "his";
    this.battleDesc = "An angry-looking minotaur looms over you. Covered in shaggy " + this.furColor + " fur, the beast is an imposing sight. Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment. Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. ";

    //Stats
    this.str = 50;
    this.tou = 60;
    this.spe = 30;
    this.inte = 20;
    this.lib = 40 + this.ballSize * 2;
    this.sens = 15 + this.ballSize * 2;
    this.cor = 35;
    //Combat stats
    this.HP = this.maxHP();
    this.bonusHP = 20 + rand(this.ballSize * 2);
    this.lust = 20 + rand(40);
    this.fatigue = 0;
    //Advancement
    this.level = 5;
    this.gems = 5 + rand(5);
    //Battle variables
    this.hasAxe = axe || rand(3) == 0;
    this.weapon.equipmentName = "fists";
    this.weapon.verb = "punch";
    this.armor.equipmentName = "thick fur";
    this.lustVuln = 0.87;

    //Appearance
    this.tallness = rand(37) + 84;
    this.hipRating = HIP_RATING_AVERAGE;
    this.buttRating = BUTT_RATING_AVERAGE;
    this.lowerBody = LOWER_BODY_TYPE_HOOFED;
    this.furColor = randomChoice("black", "brown");
    this.skinDesc = "shaggy fur";
    this.skinTone = this.furColor;
    this.hairColor = this.furColor;
    this.hairLength = 3;
    //Sexual characteristics
    this.createBreastRow();
    this.createCock(rand(13) + 24, 2 + rand(3), CockTypesEnum.HORSE);
    this.balls = 2;
    this.ballSize = 2 + rand(9);
    this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
    this.ass.analWetness = ANAL_WETNESS_NORMAL;
    this.createStatusEffect(StatusEffects.BonusACapacity, 30, 0, 0, 0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    //this.addDrop(Items.Consumables.MinotaurBlood, 50);
    //this.addDrop(Items.Consumables.MinotaurCum, 20);

    if (this.ballSize > 4) {
        this.battleDesc += " Barely visible below the tattered shreds of loincloth are " + Appearance.ballsDescription(true, true, this) + ", swollen with the minotaur's long pent-up need.";
    }
    if (this.hasAxe) {
        this.battleDesc += " <b>This minotaur seems to have found a deadly looking axe somewhere!</b>";
        //this.weapon = Items.Weapons.LargeAxe;
        this.weapon.equipmentName = "axe";
        this.weapon.verb = "cleave";
        this.weapon.attack = 15;
        this.bonusHP += 20;
        this.lustVuln -= 0.03;
        this.level++;
        //this.addDrop(Items.Weapons.LargeAxe, 25);
    }

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = cleanupAfterCombat;
}
Minotaur.prototype = new Creature();
Minotaur.constructor = Minotaur;

//------------
// COMBAT
//------------
Minotaur.prototype.doAI = function() {
    switch(rand(4)) {
        case 0:
            Minotaur.minoPheromones();
            break;
        default:
            this.attack();
    }
    combatRoundOver();
}

Minotaur.minoPheromones = function() {
    var lustDamage = 0;
    outputText("The minotaur smiles at you and lifts his loincloth, flicking it at you. Thick ropes of pre-cum fly through the air, ");
    //sometimes get hit with the pre for stronger effect!
    if (rand(3) == 0) {
        outputText("slapping into your face before you can react!  You wipe the slick snot-like stuff out of your eyes and nose, ");
        if (player.lust > 75) {
            outputText("swallowing it into your mouth without thinking. ");
            lustDamage += 10 + (player.lib / 10);
        }
        else {
            outputText("feeling your heart beat with desire as your tongue licks the residue from your lips. ");
            lustDamage += 5 + (player.lib / 20);
        }
    }
    else
        outputText("right past your head. ");
    outputText("The animalistic scent of it seems to get inside you, the musky aroma burning a path of liquid heat to your groin. ");
    lustDamage += 10 + (player.lib / 20);
    if (player.findPerk(PerkLib.MinotaurCumAddict) >= 0 || flags[MINOTAUR_CUM_ADDICTION_STATE] == 2) {
        if (rand(2) == 0)
            outputText("<br><b>You shiver with need, wanting nothing more than to bury your face under that loincloth and slurp out every drop of goopey goodness.</b> ");
        else
            outputText("<br><b>You groan and lick your lips over and over, craving the taste of him in your mouth.</b> ");
        lustDamage += 5 + rand(5);

    }
    player.changeLust(lustDamage, true);
}

//------------
// SCENES
//------------
MinotaurScene.encounterMinotaur = function() {
    clearOutput();
    displaySprite("minotaur");
    if (gameFlags[MINOTAUR_TF2] == 0 && player.level <= 1 && player.str <= 40) {
        if (silly()) {
            //(Ideally, this should occur the first time the player would normally get an auto-rape encounter with the minotaur. The idea is to give a breather encounter to serve as a warning of how dangerous the mountain is)
            outputText("Crossing over the treacherous mountain paths, you walk past an ominous cave. The bones and the smell of death convince you to hasten your pace. However, as you walk by, you hear a deep bellow and a snort as a monstrous man with a bull's head steps out. With hell in his eyes and a giant ax in his hand, he begins to approach you in clear rage. As he comes out into the light, you see that he is completely naked and sports a monstrous erection as angry as the minotaur himself, freely leaking a steady stream of pre-cum as he stalks you.<br><br>");
            outputText("You stumble in your attempt to escape and realize that you are completely helpless. The minotaur towers over you and heaves his ax for a <i>coup de grace</i>. As he readies the blow, a monstrous explosion rocks the entire mountainside, causing the bull-man to stumble before he can finish you off. You look around, bewildered, trying to understand this strange new turn of events, and notice a group of maybe half a dozen people approaching from further up the path. They appear to be a motley crew clad in blue and carrying monstrous weapons. The tallest man holds a weapon made of multiple rotating tubes, and begins spinning the barrels. A second later, while screaming in a language you do not understand, a rain of lead begins shredding the minotaur into a cloud of blood and flesh.<br><br>");
            outputText("An equally imposing black man with a patch over one eye begins firing canisters at the beast, which explode violently. \"<i>Ya ragged-arsed beast man!</i>\" he taunts. \"<i>Ye should pick on someone yer own size, BOY-O! HEHEHE!</i>\"<br><br>");
            outputText("Coming up the path next is a freak of a person clad in a contained shiny suit with a weapon that burns with flame. He freely walks into the explosions and gunfire and begins igniting the beast.<br><br>");
            outputText("\"<i>MRPHHUMFHRUFH!!!!! HUMFHUFMMRUF!</i>\" the freak mumbles through his mask.<br><br>");
            outputText("\"<i>I like me steak well done, ye crazy bugger!</i>\" yells the black man.<br><br>");
            outputText("The beast collapses in a charred and bloody heap. As you stand back up, you hear a strange noise behind you. You turn around to find a well-dressed man wearing a ski mask and smoking a cigarette. \"<i>Don't you know ze mountains are dangereuse,</i>\" the man says with a thick accent. \"<i>You will get FUCKED up here if you are not careful.</i>\"<br><br>");
            outputText("You thank the man and his team, but they brush off your gratitude. \"<i>Non, non!</i>\" the man with the accent says. \"<i>As zey say, everyone gets ONE.</i>\" With that, he touches the watch on his wrist and disappears. The rest of the group continues on their way.<br><br>");
            outputText("As they leave, the giant with the chain gun yells in a horribly accented manner, \"<i>YOU LEAVE SANDVICH ALONE! SANDVICH IS MINE!</i>\"<br><br>");
            outputText("With that, another hail of bullets break the scene as they walk away, leaving you safe from the minotaur, but utterly baffled as to what in hell just happened.");
        }
        else {
            outputText("Crossing over the treacherous mountain paths, you walk past an ominous cave. The bones and the smell of death convince you to hasten your pace. However, as you walk by, you hear a deep bellow and a snort as a monstrous man with a bull's head steps out. With hell in his eyes and a giant ax in his hand, he begins to approach you in clear rage. As he comes out into the light, you see that he is completely naked and sports a monstrous erection as angry as the minotaur himself, freely leaking a steady stream of pre-cum as he stalks you.<br><br>");
            outputText("You stumble in your attempt to escape and realize that you are completely helpless. The minotaur towers over you and heaves his ax for a <i>coup de grace</i>. As he readies the blow, another beast-man slams into him from the side. The two of them begin to fight for the honor of raping you, giving you the opening you need to escape. You quietly sneak away while they fight – perhaps you should avoid the mountains for now?<br><br>");
        }
        gameFlags[MINOTAUR_TF2] = 1;
        doNext(Camp.returnToCampUseOneHour);
        return;
    }
    //Mino gangbang
    if (gameFlags[MINOTAUR_AND_COWGIRL] == 0 || rand(10) == 0) {
        /*if (flags[HAS_SEEN_MINO_AND_COWGIRL] == 1 && player.cowScore() >= 4 && player.lactationQ() >= 200 && player.biggestTitSize() >= 3 && player.minotaurAddicted()) {
            //PC must be a cowmorph (horns, legs, ears, tail, lactating, breasts at least C-cup)
            //Must be addicted to minocum
            outputText("As you pass a shadowy cleft in the mountainside, you hear the now-familiar call of a cowgirl echoing from within. Knowing what's in store, you carefully inch closer and peek around the corner.<br><br>");
            outputText("Two humanoid shapes come into view, both with pronounced bovine features - tails, horns and hooves instead of feet. Their genders are immediately apparent due to their stark nudity. The first is the epitome of primal femininity, with a pair of massive, udder-like breasts and wide child-bearing hips. The other is the pinnacle of masculinity, with a broad, muscular chest, a huge horse-like penis and a heavy set of balls more appropriate on a breeding stud than a person. You have once again stumbled upon a cow-girl engaging in a not-so-secret rendezvous with her minotaur lover.<br><br>");
            if (gameFlags[CODEX_ENTRY_MINOTAURS] <= 0) {
                gameFlags[CODEX_ENTRY_MINOTAURS] = 1;
                outputText("<b>New codex entry unlocked: Minotaurs!</b><br><br>")
            }
            if (gameFlags[CODEX_ENTRY_LABOVINES] <= 0) {
                gameFlags[CODEX_ENTRY_LABOVINES] = 1;
                outputText("<b>New codex entry unlocked: Lacta Bovines/Cowgirl!</b><br><br>")
            }
            outputText("<br><br>You settle in behind an outcropping, predicting what comes next. You see the stark silhouettes of imps and goblins take up similar positions around this makeshift theatre, this circular clearing surrounded on the edge by boulders and nooks where all manner of creatures might hide. You wonder if they're as eager for the upcoming show as you are. The heady scent of impending sex rises in the air... and with it comes something masculine, something that makes your stomach rumble in anticipation. The mouth-watering aroma of fresh minotaur cum wafts up to your nose, making your whole body quiver in need. Your [vagOrAss] immediately ");
            if (player.hasVagina()) outputText("dampens");
            else outputText("twinges");
            outputText(", aching to be filled");
            if (player.hasCock()) outputText(", while [eachCock] rises to attention, straining at your [armor]");
            outputText(".");

            outputText("<br><br>You can barely see it from your vantage point, but you can imagine it: the semi-transparent pre-cum dribbling from the minotaur's cumslit, oozing down onto your tongue. Your entire body shivers at the thought, whether from disgust or desire you aren't sure. You imagine your lips wrapping around that large equine cock, milking it for all of its delicious cum. Your body burns hot like the noonday sun at the thought, hot with need, with envy at the cow-girl, but most of all with arousal.");

            outputText("<br><br>Snapping out of your imaginative reverie, you turn your attention back to the show. You wonder if you could make your way over there and join them, or if you should simply remain here and watch, as you have in the past.");
            menu();
            //[Join] [Watch]
            addButton(0, "Join", MinotaurScene.joinBeingAMinoCumSlut);
            addButton(1, "Watch", MinotaurScene.watchAMinoCumSlut);
            return;
        }*/
        flags[HAS_SEEN_MINO_AND_COWGIRL] = 1;
        gameFlags[MINOTAUR_AND_COWGIRL]++;
        outputText("As you pass a shadowy cleft in the mountainside, you hear the sounds of a cow coming out from it. Wondering how a cow got up here, but mindful of this land's dangers, you cautiously sneak closer and peek around the corner.<br><br>");
        outputText("What you see is not a cow, but two large human-shaped creatures with pronounced bovine features -- tails, horns, muzzles, and hooves instead of feet. They're still biped, however, and their genders are obvious due to their stark nudity. One has massive, udder-like breasts and wide hips, the other a gigantic, horse-like dong and a heavy set of balls more appropriate to a breeding stud than a person. You've stumbled upon a cow-girl and a minotaur.<br><br>");
        if (gameFlags[CODEX_ENTRY_MINOTAURS] <= 0) {
            gameFlags[CODEX_ENTRY_MINOTAURS] = 1;
            outputText("<b>New codex entry unlocked: Minotaurs!</b><br><br>")
        }
        if (gameFlags[CODEX_ENTRY_LABOVINES] <= 0) {
            gameFlags[CODEX_ENTRY_LABOVINES] = 1;
            outputText("<b>New codex entry unlocked: Lacta Bovines/Cowgirl!</b><br><br>")
        }
        outputText("A part of your mind registers bits of clothing tossed aside and the heady scent of impending sex in the air, but your attention is riveted on the actions of the pair. The cow-girl turns and places her hands on a low ledge, causing her to bend over, her ample ass facing the minotaur. The minotaur closes the distance between them in a single step.<br><br>");
        outputText("She bellows, almost moaning, as the minotaur grabs her cushiony ass-cheeks with both massive hands. Her tail raises to expose a glistening wet snatch, its lips already parted with desire. She moos again as his rapidly hardening bull-cock brushes her crotch. You can't tear your eyes away as he positions himself, his flaring, mushroom-like cock-head eliciting another moan as it pushes against her nether lips.<br><br>");
        outputText("With a hearty thrust, the minotaur plunges into the cow-girl's eager fuck-hole, burying himself past one -- two of his oversized cock's three ridge rings. She screams in half pain, half ecstasy and pushes back, hungry for his full length. After pulling back only slightly, he pushes deeper, driving every inch of his gigantic dick into his willing partner who writhes in pleasure, impaled exactly as she wanted.<br><br>");
        outputText("The pair quickly settles into a rhythm, punctuated with numerous grunts, groans, and moans of sexual excess. To you it's almost a violent assault sure to leave both of them bruised and sore, but the cow-girl's lolling tongue and expression of overwhelming desire tells you otherwise. She's enjoying every thrust as well as the strokes, gropes, and seemingly painful squeezes the minotaur's powerful hands deliver to her jiggling ass and ponderous tits. He's little better, his eyes glazed over with lust as he continues banging the fuck-hole he found and all but mauling its owner.");
        doNext(MinotaurScene.continueMinoVoyeurism);
        return;
    }
    //Cum addictus interruptus!  LOL HARRY POTTERFAG
    //Withdrawl auto-fuck!
    /*if (flags[MINOTAUR_CUM_ADDICTION_STATE] == 3 && rand(2) == 0 && player.inte/10 + rand(20) < 15) {
        MinotaurScene.minoAddictionFuck();
        return;
    }*/
    //Rare Minotaur Lord
    /*if (rand(5) == 0 && player.level >= 10) {
        outputText("Minding your own business, you walk along the winding paths.  You take your time to enjoy the view until you see a shadow approaching you.  You turn around to see a minotaur!  However, he is much bigger than the other minotaurs you've seen.  You estimate him to be eleven feet tall and he's wielding a chain-whip.  He's intent on raping you!");
        startCombat(new MinotaurLord());
        return;
    }*/
    //Regular Minotaur Encounter
    outputText("As you take the winding path up through the rocky trail, you come upon the opening to a cave. Peering inside, the stench of an overpowering musk washes over you. The primal scent excites you, causing you to become aroused almost immediately. Not thinking as clearly as you normally might, you slowly sneak your way into the cave. Signs of life litter the cave floor.<br><br>");
    if (gameFlags[CODEX_ENTRY_MINOTAURS] <= 0) {
        gameFlags[CODEX_ENTRY_MINOTAURS] = 1;
        outputText("<br><br><b>New codex entry unlocked: Minotaurs!</b>");
    }
    player.changeLust(10 + player.lib / 5, false);
    if (rand(30) + (player.inte / 5) > 18 || flags[SFW_MODE] > 0) {
        outputText("You spot a shadow moving and spin around to see a minotaur lumbering after you from the back of the cave!");
        startCombat(new Minotaur());
        return;
    }
    outputText("Suddenly you're grabbed from behind, your arms held together by a single massive, furry hand. A heavy, snorting breath brushes the top of your head. You turn your neck to see a massive bull-man. His impressive dick presses ");
    if (player.isTaur())
        outputText("against your buttocks");
    else
        outputText("into the small of your back");
    outputText(" as it grows larger and harder, smearing its pre-cum into your skin and making you shiver. ");
    //High str escape
    if (rand(20) + (player.str / 3) > 18 || flags[SFW_MODE] || true) {
        outputText("<br><br>You twist around using the additional lubrication and squirm free! Rolling away, you come up in a crouch, ready to fight!");
        startCombat(new Minotaur());
    }
}

/*MinotaurScene.joinBeingAMinoCumSlut = function() {
    clearOutput();
    outputText("The prospect of getting a huge dose of that fresh minotaur cum is just too much to bear. Before you realize what's happening, you're moving out of your rocky hiding spot and making your way down to the two bovine creatures, stripping your [armor] as you go. By the time you reach the two figures, you're as naked as they are. You shiver softly, whether due to some chill in the air or desperate anticipation, you can't say.");
    outputText("<br><br>The cow-girl is bent over, her hands on a low ledge with the minotaurs hands on either side of her ample ass. She moans, more like a moo than a human groan, as the minotaur plunges into her quaking depths. As you step forward, suddenly unsure of yourself, both the bull and the cow turn their sharp gazes on to you. You feel very small");
    if (player.tallness <= 96) outputText(" despite your immense height");
    outputText(" as they look you up and down. The entire area goes silent, even the goblins and the imps that are no doubt watching seem to be holding their breath, wondering what will happen to you.");
    outputText("<br><br>The minotaur grunts, finally, as if he finds you acceptable, and turns back to the plush ass before him, plowing into it once more. The cow-girl, however, motions for you to move forward, and latches onto a [nipple] when you do. Her soft lips encircle your areola, while her tongue dances over the rapidly hardening flesh of your teat. Your breasts tingle with the slightest bit of suction, making you gasp as small droplets of milk escape your nipple and roll over the cow-girl's tongue. She sucks more and more, eagerly gulping down your refreshing lactic beverage.");

    outputText("<br><br>All the while the minotaur continues grunting, thrusting his massive member into the woman's hungry cunt. The two rock back and forth, pushing her face right into your breast before pulling back again. The cow-girl's legs tremble and you suddenly find her arm grasping your shoulder for support. Her other hand drifts down between your own naked legs, ");
    if (player.hasCock()) {
        outputText("ignoring your cock");
        if (player.cockTotal() > 1) outputText("s");
        outputText(" entirely, ");
    }
    outputText("slipping a finger into your moistening ");
    if (player.hasVagina()) outputText("pussy");
    else outputText("asshole");
    outputText(". A low moan escapes your lips as a second finger slips in while the busty bovine woman's thumb ");
    if (player.hasVagina()) outputText("swirls around your clitoris");
    else outputText("presses against your perineum");
    outputText(".");

    outputText("<br><br>The broad-shouldered minotaur urges his mate onto her knees while he does the same, his dick never leaving its temporary home. The cow-girl pulls you along, bringing you to your knees and then onto your back. You have a moment of sudden modesty as you fold your legs, trying to block your crotch from view. The bovine woman simply chuckles in between moans and lightly presses your knees apart. Your legs spread wide, lewdly showing off your nether region to the cow-girl, and anyone else that's watching.");

    outputText("<br><br>Without wasting any time, the girl leans down and");
    if (player.hasCock()) outputText(", once again ignoring your manhood completely");
    outputText(", dives tongue first into your wet ");
    if (player.hasVagina()) outputText("quim");
    else outputText("back door");
    outputText(". The movement is so quick that you can't even suppress the sudden, perverted moan that leaves your lips... a moan that sounds shockingly like a cow's moo. The surprise at your sudden bovine outburst quickly dissipates as the cow-girl's large tongue dips in and out of your ");
    if (player.hasVagina()) outputText("sodden box");
    else outputText("moist butthole");
    outputText(". Any remaining fears of joining this very public sex show are gone, and you wonder why you didn't join in sooner.");

    outputText("<br><br>The tongue lavishes your hole, paying homage to your crotch in the only way it knows how. Your breath comes shorter while your arms and legs tingle, fingers and toes curling against your will. The cow-girl laps and licks, her broad mouth muscle slipping in and out, curving in and around to hit every tender part of your insides. You run your fingers through the woman's long red hair, forcing her head even deeper into your crotch. With her head down like this, you have an easy view of her ass high up in the air, getting fucked senseless by the minotaur. Every thrust makes the cow-girl moan into your lap, the added vibrations causing you to squirm even more.");

    outputText("<br><br>The bull thrusts in to the hilt, letting out one final bellow of pleasure. The cow-girl brings her head up, her mouth and chin slick and dripping with your juices. She lets out a moo-like bellow along with the minotaur, whose balls churn, no doubt depositing a heavy load of that delicious cum directly into her waiting womb. You lick your lips, wishing you could just wrap them around that cock right now, to get your fix and feel the blissful sensations of relief run across your body.");

    outputText("<br><br>The girl gibbers incoherently as she slides off the minotaur's still-rigid cock, a small spurt of pearly white spunk running down her thighs. The minotaur smirks, smacking the cow's ass and casually pushing her to the side. A goofy grin is plastered on her face, eyes rolled up into their sockets like she's just experienced the most divine fuck imaginable. He then looks you dead in the eyes and says, in a deep, masculine and very dominant voice, \"<i>You get to ride my cock next, cow.</i>\"");

    outputText("<br><br>His rough, strong hands grasp your legs and draw you closer. You squirm half-heartedly, not really trying to get away. Though your mind tries to fight it, you know all you really want is that warm, sticky cum inside you one way or another. You want to be just like the half-unconscious girl beside you, stuffed with cock and turned into this rugged man's breeding bitch.");

    outputText("<br><br>\"<i>Eager for a fucking, huh slut?</i>\" he taunts, his turgid member resting along your stomach. You nod slowly. You feel a deep burning in your core. You want that cock inside you. You want to be filled to bursting with this bull's seed, to feel it churn ");
    if (player.hasVagina()) outputText("within your womb, knocked up by this manly beast");
    else outputText("within your bowels");
    outputText(". \"<i>That's a good slut,</i>\" he grunts, pulling his cock off your belly and rubbing the slick, flat head against your awaiting [vagOrAss]. He teases you with the slight contact until you open your mouth to voice your complaints, then he suddenly thrusts inside. Any words forming on your tongue fly away, replaced by a whine of relief as your hole gets stretched wide by the invading member.");
    if (player.hasVagina()) player.cuntChange(36, true, true, false);
    else player.buttChange(36, true, true, false);

    outputText("<br><br>\"<i>Ahh, yeah. That's some good ");
    if (player.hasVagina()) outputText("cow-pussy");
    else outputText("ass");
    outputText(" right there,</i>\" he groans, more of his bombastic cock slipping deep inside you. The minotaur hooks an arm under each of your knees, lifting up your lower body, pressing even deeper. Powerful sensations drift up from your ");
    if (player.hasVagina()) outputText("g-spot");
    else outputText("prostate");
    outputText(" as the minotaur's wide flare strokes it through your ");
    if (player.hasVagina()) outputText("vaginal");
    else outputText("anal");
    outputText(" walls. Biting your lip with barely contained pleasure, you bring your hands to your breasts, playing with your milk-sodden nipples in between each orgasmic thrust of the bull's hips.");

    outputText("<br><br>A giggle comes from your side, as you see the cow-girl is back up onto her knees, having recovered from her exalted orgasm. She crawls forward, kneeling just over your head and leaning in to kiss her minotaur lover. The two whisper sweet nothings to each other, too vague and indistinct to hear, but it doesn't matter. All you can focus on is the dick lodged firmly inside of you... that, and the soaking cunt of the cow-girl just inches from your face. Alabaster droplets drip down her legs, one even landing on your lips. Before you can stop yourself, you lick them clean, savoring the taste of the second-hand cum.");

    outputText("<br><br>Some part of your mind voices a complaint at what comes next, a voice that's quickly squelched inside the addiction-fueled haze of your brain. You pull your head upwards and extend your tongue, slurping a large glob of cum from the cow-girl's snatch. There's a surprised yelp from above you, followed by a coo of pleasure. To your surprise, the cow-girl actually lowers her cunt down onto your face, giggling madly, filling your nostrils with the scent of her muff, with the scent of recent sex. Not letting this opportunity go to waste, you repay her actions from earlier, slipping your ");
    if (player.tongueType == TONGUE_SNAKE) outputText("serpentine ");
    else if (player.tongueType == TONGUE_DEMONIC) outputText("demonic ");
    else if (player.tongueType == TONGUE_DRACONIC) outputText("draconic ");
    else if (player.hasLongTongue()) outputText("inhumanly long ");
    outputText("tongue inside her, eagerly licking out and guzzling down the remnants of the minotaur's present.");

    outputText("<br><br>The minotaur, for his part, is in no rush to give you a cream pie of your own. His thrusts are slow and deliberate, with a rhythm that has you writhing with pleasure. The three of you moan together like some kind of erotic pyramid. The bull's assault on your ");
    if (player.hasVagina()) outputText("womb");
    else outputText("back door");
    outputText(" increases slowly, and you can feel your limbs tingling at the prospect of your mino-cum-induced orgasm.");

    outputText("<br><br>It starts in your fingers, where your nerves seethe, gathering up fistfuls of grass like one might grab a sheet. The heat continues down your arms and strikes your body like a lightning bolt, your belly suddenly spiking up, back arching as the orgasmic thunderstorm rolls over you. The flames don't stop there, however. They travel down into your crotch, suddenly lighting up every nerve in your ");
    if (player.hasVagina()) outputText("[vagina]");
    else outputText("[asshole]");
    outputText(" like a Christmas tree. You're acutely aware of every single movement, every pulse, every little bit of contact between you and the huge cock living inside you.");

    outputText("<br><br>Your muscles spasm and clench as the minotaur lets loose a powerful roar. His own member twitches, suddenly releasing a flood of hot cum into your awaiting ");
    if (player.hasVagina()) outputText("womb");
    else outputText("bowels");
    outputText(". The moment that long-awaited jism hits your walls, it's like another lightning bolt hits. It travels up your spine and sets your entire brain aglow. Ecstasy wrapped in bliss with a side of euphoric rapture consumes your thoughts. Your vision goes white, pearly white like the seed filling your body, and your lips part as a primal \"<i>moo</i>\" slips out.");

    outputText("<br><br>For the longest time, the only thing your cum-addled mind can think about is cocks and cunts, of pregnant bellies and stomachs filled to capacity. You mind fills itself with visions of yourself on your knees, servicing this minotaur daily, hoping to please him enough that he might grace your ");
    if (!player.hasVagina()) outputText("new ");
    outputText("womb with his divine dick.");

    outputText("<br><br>It takes several minutes for you to come down from this orgasmic high, and when you do, you see your minotaur lover has yet to recover from his. He lays on his back in the midst of this clearing, his still-rock-hard cock jutting upwards, coating in a mixture of various juices. The cow-girl sits beside him, carefully licking the towering pillar of cock clean. You sit up, wobbly and clutch your stomach. Filled with cum in two ends, you can't help but feel oddly unsatisfied. Perhaps guzzling down some second-hand cum isn't quite enough to sate your hunger. Perhaps you need it straight from the tap, as it were.");

    outputText("<br><br>You gingerly sit up, your body still quaking with pleasure. Every movement sends another luxurious aftershock rippling through your body. You crawl over to the splayed out minotaur, opposite your cow-girl partner, and join her in licking the man's cock clean. It takes some work, but soon it glistens in the light of the red sky above you.");

    outputText("<br><br>As if you both possess some kind of bovine telepathy, you both lean forward, wrapping your ");
    if (player.bRows() > 1) outputText("uppermost ");
    outputText("breasts around his monolithic shaft. Your faces meet and her soft lips press against yours, each of you earnestly pressing your tongues into the other's mouths, swapping the juices you've collected over the past hour or so. The bull beneath you groans, awakening to the feeling of four breasts surrounding his love muscle.");

    outputText("<br><br>The two of your pump your breasts up and down, your lips barely leaving each other long enough to give his member the occasional kiss, lick or slurp. Up and down you go, and this time it's the minotaur's body that's wracked with bliss, writhing on the ground. Milk dribbles from your breasts, coating you, the cow-girl and the minotaur in a fine white sheen and creating a sweet-smelling aroma that permeates the air.");

    outputText("<br><br>The bull groans, biting his lip as a third, and likely final, orgasm rips through him. His hips buck upwards, his cock flaring up and out of your mammaries. Ropes of immaculate silver seed jet from his cumslit, arcing up into the air several feet before splattering down on your heads. Wasting no time, you slip your lips around the flare, gulping down mouthful after mouthful of the sweet man-milk. Even though it's his third load of the hour, it's just as big as the others, and soon your find you can't swallow any more; your cum-laden belly just won't allow it.");

    outputText("<br><br>Sadly, you relinquish your hold on his cock and sit back, watching the cow-girl opposite you pick up where you left off, slurping up whatever you missed with a dedicated fervor.");

    outputText("<br><br><b>Now</b> you feel satisfied. Filled with that precious, precious minotaur spunk in both ends, fresh from the source. You slump onto your back and drift off into a hazy, bull-filled dream world.");

    outputText("...");

    outputText("<br><br>You awaken several hours later. The minotaur and the cow-girl are nowhere to be seen, but your [armor] is left neatly folded next to you, along with a small bottle filled with some white liquid, most likely a gift from your \"bull\".");

    outputText("<br><br>You quickly re-dress and head back to camp, spying the occassional goblin or imp scurrying from its hiding spot, no doubt recovering from their own self-inflicted orgasms.");
    player.orgasm();
    player.modStats("lib", .5, "sen", -3, "cor", 1);
    if (flags[PC_FETISH] > 0) {
        outputText(" A thrill runs through you. Even though you were brought to such a satisfying climax, the whole thought that goblins and imps were watching you and getting off on it... it just makes you hornier than you were before.");
        player.changeLust(player.maxLust(), false);
    }
    //Chance to impregnate PC, get mino-fix, and maybe relief from feeder perk.
    player.minoCumAddiction(10);
    player.knockUp(PregnancyStore.PREGNANCY_MINOTAUR, PregnancyStore.INCUBATION_MINOTAUR);
    if (player.findStatusEffect(StatusEffects.Feeder) >= 0) {
        //You've now been milked, reset the timer for that
        player.addStatusValue(StatusEffects.Feeder, 1, 1);
        player.changeStatusValue(StatusEffects.Feeder, 2, 0);
    }
    //(Acquired minotaur cum!)
    Inventory.takeItem(Items.Consumables.MinoCum, Camp.returnToCampUseOneHour);
}

MinotaurScene.watchAMinoCumSlut = function() {
    clearOutput();
    outputText("Deciding not to risk it, you settle back into your nook in the rocks and watch on eagerly. The cow-girl turns and places her hands on a low ledge, causing her to bend over, her ample ass facing the minotaur. The minotaur closes the distance between them in a single step.<br><br>");
    outputText("She bellows, almost moaning, as the minotaur grabs her cushiony ass-cheeks with both massive hands. Her tail raises to expose a glistening wet snatch, its lips already parted with desire. She moos again as his rapidly hardening bull-cock brushes her crotch. You can't tear your eyes away as he positions himself, his flaring, mushroom-like cock-head eliciting another moan as it pushes against her nether lips.<br><br>");
    outputText("With a hearty thrust, the minotaur plunges into the cow-girl's eager fuck-hole, burying himself past one -- two of his oversized cock's three ridge rings. She screams in half pain, half ecstasy and pushes back, hungry for his full length. After pulling back only slightly, he pushes deeper, driving every inch of his gigantic dick into his willing partner who writhes in pleasure, impaled exactly as she wanted.<br><br>");
    outputText("The pair quickly settles into a rhythm, punctuated with numerous grunts, groans, and moans of sexual excess. To you it's almost a violent assault sure to leave both of them bruised and sore, but the cow-girl's lolling tongue and expression of overwhelming desire tells you otherwise. She's enjoying every thrust as well as the strokes, gropes, and seemingly painful squeezes the minotaur's powerful hands deliver to her jiggling ass and ponderous tits. He's little better, his eyes glazed over with lust as he continues banging the fuck-hole he found and all but mauling its owner.<br><br>");
    player.changeLust(10, false);
    doNext(0, "Next", MinotaurScene.continueMinoVoyeurism);
}*/

MinotaurScene.continueMinoVoyeurism = function() {
    clearOutput();
    outputText("They go at it for nearly an hour, oblivious to you watching them, before their intensity heightens as they near orgasm. The results are almost explosive, both of them crying out as they begin twitching uncontrollably. Clinging desperately to the cow-girl's ass, the minotaur pumps so much cum into her depths that it begins spurting out. This accidental lubrication releases his grip and the pair collapse to the ground. Yet the minotaur isn't finished, his man-milk spraying into the air almost like his still-erect dick is a hose and splattering down onto both of them.<br><br>");
    outputText("As you look at the two cum-covered creatures laying their in their exhausted sex-induced stupors, the minotaur's thick horse-cock now slowly deflating, you realize that you've been touching yourself. You make yourself stop ");
    if (player.cor < 33)
        outputText("in disgust.");
    else if (player.cor < 66)
        outputText("in confusion.");
    else
        outputText("reluctantly.");
    outputText("<br><br>Only now do you notice other faces peeking over ledges and ridges. You count at least two goblins and one imp who quickly pull back. From the sounds, they were busy getting themselves off.");
    if (gameFlags[MINOTAUR_AND_COWGIRL] == 0)
        outputText(" Apparently this isn't an uncommon show, and the locals enjoy it immensely. ");
    //Lust!
    player.changeLust(5 + player.lib / 20 + player.minoScore() + player.cowScore(), true);
    doNext(Camp.returnToCampUseOneHour);
}

MinotaurScene.getRapedByMinotaur = function() {
    //NYI. Lazy as Sans.
}