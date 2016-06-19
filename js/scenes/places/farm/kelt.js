KeltScene = [];

addToGameFlags(KELT_MET, KELT_SUBMISSIVENESS, NEVER_RESIST_KELT, KELT_BAD_END_WARNING, KELT_DISABLED, KELT_KILLED, KELT_BREAK_LEVEL, KELLY_CUNT_TYPE, KELLY_COCK_SIZE, TIMES_PUNISHED_KELLY, TIMES_RIM_JOBBED_BY_KELLY, TIMES_RIDDEN_KELLY_FOR_PUNISHMENT, KELLY_BONUS_TIT_ROWS, KELLY_LACTATING, KELLY_DISOBEYING_COUNTER, KELLY_VAGINALLY_FUCKED_COUNT, KELT_KILLED);

function bowSkill(amount) {
    if (player.bowSkill == undefined) {
        player.bowSkill = 0;
    }
    //Increment
    player.bowSkill += amount;
    //Clamp values
    if (player.bowSkill > 100) player.bowSkill = 100;
    if (player.bowSkill < 0) player.bowSkill = 0;
}

//Function to choose which Kelt Encounter to load.
KeltScene.keltEncounter = function() {
    displaySprite("kelt");
    //Clear screen, set next button, and count how many times hes been encountered
    clearOutput();
    //If First Encounter
    if (gameFlags[KELT_MET] == 0) {
        gameFlags[KELT_MET] = 1;
        KeltScene.keltFirstTime();
    }
    //Repeated encounter
    else {
        gameFlags[KELT_MET]++;
        //Second/Third Events - Normal
        if (gameFlags[KELT_MET] <= 3) {
            KeltScene.keltMainEncounter();
            return;
        }
        //Bad Ends
        if (gameFlags[KELT_SUBMISSIVENESS] >= 100) {
            if (((player.lib + player.lust) < 30 && player.inte >= 50) || gameFlags[KELT_BAD_END_WARNING] == 0)
            {
                gameFlags[KELT_BAD_END_WARNING] = 1;
                outputText("You race towards the farm, only one thought on your mind. Kelt... your master, your love, your hunger. Your head is filled with thoughts of his cock, and you fancifully dream of how he will use it on you today. Once, you had a mission of some kind... an important duty. The stray thought vanishes almost instantly, though. Of course you have a duty! To be fucked by Kelt, whenever he wants to!\r\r")
                outputText("Suddenly, another thought crosses your mind. You have a feeling that if you meet him, it could be the end of your adventures. Do you give in to your thoughts and submit to Kelt for the final time or resist?")
                doYesNo(KeltScene.keltSubmissiveBadEnd, KeltScene.defySubmission);
                addButton(4, "FIGHT!", KeltScene.defySubmissionAndFight);
            }
            else KeltScene.keltSubmissiveBadEnd();
            return;
        }
        //Centaur bad end
        if (player.isTaur() && gameFlags[KELT_SUBMISSIVENESS] >= 100 && player.gender > 1) {
            if (player.inte > rand(40) && gameFlags[KELT_SUBMISSIVENESS] < 130 && gameFlags[KELT_BAD_END_WARNING] <= 0) {
                gameFlags[KELT_BAD_END_WARNING] = 1;
                outputText("You approach the farm, ready for another archery lesson. Kelt is oblivious to your presence, busy practicing with his own bow for the moment. The wind shifts and blows his musk your way. Unconsciously, you breathe deeply, sending heat racing between your rear legs. Alarm bells go off in your mind as you realize what his presence is doing to you, and you run away to your camp before he can notice you. It's clear to you that you can't resist him much longer; the next time you meet him, you'll probably volunteer to become his brood-mare. Perhaps you should avoid Kelt and the farm until you feel his influence less keenly.", true);
                player.changeLust(player.lib/5 + 10);
                doNext(Camp.returnToCampUseOneHour);
            }
            else KeltScene.keltCentaurBadEnd();
            return;
        }
        //Naked event if its time for it
        if (gameFlags[KELT_MET] == 4 && player.findStatusEffect(StatusEffects.NakedOn) < 0) {
            KeltScene.keltRequiresNakedness();
            return;
        }
        //60+ Submissiveness—First Time Blowjob Requirement
        if (player.statusEffectv2(StatusEffects.Kelt) >= 40 && player.findStatusEffect(StatusEffects.KeltBJ) < 0) {
            KeltScene.keltRequiresBlowjobs();
            return;
        }
        //75+ Submissiveness, 60+ Lust—Lust Encounter
        //Remaining events
        if (gameFlags[KELT_MET] > 4) {
            KeltScene.keltMainEncounter();
        }
    }
}

//Introduction
KeltScene.keltFirstTime = function() {
    outputText("As you approach Whitney's farm, you notice a figure in the pastures, way in the distance. It seems to be someone riding a horse, to your surprise... possibly even Whitney herself. You hadn't expected to find real horses in this forsaken realm. If you could somehow trade for one, it would be a real help. Energized by the idea, you hop the fence, approaching the distant figure.\r\r", false);
    outputText("As you get closer, however, the figure comes into view. The rider is not Whitney, but rather a muscular man. And the horse has no head... where its head should be is... with a start, you realize that this is no horse and rider. The figure is a large, male centaur!\r\r", false);
    outputText("Wariness growing, you slow down. But it is too late... the centaur has seen you. With a snort, he gallops closer, imposingly tall. You drop into a fighting stance, ready if he should attack you, and the centaur draws to a halt a few feet away.\r\rHe looks scornfully at you, and laughs, ", false);
    outputText("\"<i>Don't be stupid. You'd never even get close to me. If I wanted to kill you, you would have been dead a long time ago. My name is Kelt.</i>\"\r\r", false);
    outputText("He touches a longbow that is strung around his chest. The size of the bow is enough to convince you. If he can draw back a bow that thick, he would surely have enough power to hit you from almost across the field. A weapon like that could be very useful in fending off some of the monsters in this land. The centaur notices you looking, and grins arrogantly.\r\r", false);
    outputText("\"<i>Like my bow? As well you should. This is a real warrior's weapon! If you want to learn someday, visit me again. Maybe if you're not too stupid, you will be able to learn something. I won't cross my fingers.</i>\"\r\r", false);
    outputText("He laughs again derisively, and trots off. You bristle slightly... he is irritatingly arrogant. But if he can teach you to use a weapon like that, it may be worth putting up with his company...", false);
    doNext(Camp.returnToCampUseOneHour);
}

KeltScene.keltMainEncounter = function() {
    outputText("Once more, you encounter Kelt the centaur at Whitney's farm. He smirks at you, and asks if the fool has come once more to learn from the master.\r\r", false);
    //(Submissive 0-30:
    if (gameFlags[KELT_SUBMISSIVENESS] <= 30) outputText("You grind your teeth in irritation, but swallow your pride enough to ask him for help. ", false);
    //(Submissive 30-70:
    else if (gameFlags[KELT_SUBMISSIVENESS] <= 70) outputText("You nod reluctantly, and Kelt grins. He may be arrogant, but he is rather good. ", false);
    //(Submissive 70-100:
    else outputText("You nod enthusiastically, almost begging him to teach you. ", false);

    //(Before Naked Requirement)
    if (gameFlags[KELT_MET] <= 3) {
        outputText("Kelt seems to find the idea of training a human almost comical, but suggests that if you want to follow him around for a while, he has no problem with it. Though his attitude is annoying, you resolve to learn what you can.\r\r", false);
    }
    //Stuff that happes after naked requirement
    else {
        Camp.keltMainEncounterAfterNakedReq();
        return;
    }
    //Continue encounter stuff
    Camp.keltMainEncounter2();
}

KeltScene.keltMainEncounterAfterNakedReq = function() {
    //After naked requirement
    //(Naked On)
    if (player.findStatusEffect(StatusEffects.NakedOn) >= 0) {
        outputText("He nods, smirking slightly, and gestures at your clothes impatiently. With some pleasure, you strip down before him, discarding your clothes with a little flair. Kelt is grinning by the end, openly admiring your body, and you feel a little more aroused for obeying his dominant command.\r\r", false);
        gameFlags[KELT_SUBMISSIVENESS] += 3;
    }
    //(Naked Off)
    else {
        //(40% Chance:
        if (rand(10) <= 5) {
            outputText("Kelt looks down your body scornfully, and claims he is unwilling to teach you unless you are willing to learn naked again. ", false);
            //(Corruption 60+, or Submissive 60+:
            if ((player.cor + player.lib + player.lust >= 180 && player.inte < 30) || gameFlags[KELT_SUBMISSIVENESS] >= 60) {
                outputText("This time, the idea turns you on a little, and you agree automatically, stripping naked before Kelt with enthusiasm. He obviously enjoys the show, and you are incredibly aroused by his attention. Part of you reasons that if training naked is better, maybe you should just strip down right away, each time? The thought is more than a little stimulating.", false);
                if ((player.cor + player.lib + player.lust >= 220 && player.inte < 40) || gameFlags[KELT_SUBMISSIVENESS] >= 70) {
                    outputText(" <b>With a lusty smile, you decide to ALWAYS get naked before practicing.</b>", false);
                    //player.createStatusEffect(StatusEffects.NakedOn,0,0,0,0);
                }
                outputText("\r\r", false);
                //[+5 Submissive])
                gameFlags[KELT_SUBMISSIVENESS] += 5;
            }
            //(Otherwise:
            else {
                outputText("\r\rYou're not certain you want to practice naked again... particularly with the way Kelt is looking at you, his arrogant smirk plastered on his face. Do you agree to his terms?", false);
                doYesNo(KeltScene.keltReluctantlyGetNaked, KeltScene.keltRefuseNakedness);
                addButton(4, "FIGHT!", KeltScene.fightToBeatKelt);
                if (player.inte > 40 && player.cor > 70 - player.corruptionTolerance() && !player.isTaur()) {
                    outputText("\n\n<b>If you fight back and take him down a peg, you might never see him again...</b>");
                    addButton(2, "Fight Back", KeltScene.keltResistance);
                }
                return;
            }
        }
        //(Otherwise:
        else {
            outputText("Kelt looks at your clothes sourly once more, and mocks you for what he calls 'human sensitivity'. He does not, however, directly tell you to take them off.\r\r", false);
            //(Corruption 60+, or Submissive 60+:
            if ((player.cor + player.lib + player.lust >= 180 && player.inte < 40)|| gameFlags[KELT_SUBMISSIVENESS] >= 60) {
                outputText("This time, though, the idea turns you on a little. You ask Kelt if he would prefer to see you naked, and begin stripping down in front of him. He seems surprised but obviously enjoys the show, and you are incredibly aroused by his attention. Part of you reasons that if training naked is better, maybe you should just strip down right away, each time? The thought is more than a little stimulating.", false);
                if ((player.cor + player.lib + player.lust >= 220 && player.inte < 40) || gameFlags[KELT_SUBMISSIVENESS] >= 75) {
                    outputText(" <b>You cast a seductive smile Kelt's way and decide you should always strip before practice</b>.", false);
                    player.createStatusEffect(StatusEffects.NakedOn,0,0,0,0);
                }
                outputText("\r\r", false);
                player.changeLust((player.lib / 10) + 5, false);
            }
            //(Otherwise:
            else outputText("You ignore his barbed comments as best as you can, and soon enough, he leaves the matter alone, instead critiquing your archery skills.\r\r", false);
        }
    }
    KeltScene.keltMainEncounter2();
}

//Normal Encounter 2
KeltScene.keltMainEncounter2 = function() {
    //Used for randomization
    var temporary = 0;
    //(No bow equipped)
    if (player.hasKeyItem("Bow") < 0) {
        outputText("\"<i>Here,</i>\" Kelt says, tossing you a spare bow. \"<i>You can use this, for right now. We train colts on it... you know, before their balls drop. Should be just about right for your level. Keep it if you want.</i>\"\r\r", false);
        outputText("Despite his mocking description, the bow he gives you really is a decent weapon. You take it up and start towards the practice field, Kelt following behind.\r\r", false);
        if (player.hasKeyItem("Bow") < 0) player.createKeyItem("Bow",0,0,0,0);
    }
    //(Bow equipped)
    else {
        outputText("Kelt sneers as he looks at your bow, \"<i>You're still using that rotten old thing? Well, it will do. We'll just have to shoot for the close targets.</i>\"\r\r", false);
        outputText("Together, the two of you head off to the practice field.\r\r", false);
    }
    //IF BLOWJOB HAS HAPPENED ALREADY, chances to repeat
    if (player.statusEffectv2(StatusEffects.Kelt) >= 60 && rand(4) == 0 && player.findStatusEffect(StatusEffects.KeltBJ) >= 0) {
        KeltScene.keltMainEncounterPostBlowjob();
        return;
    }
    KeltScene.keltMainEncounter3();
}

KeltScene.keltMainEncounter3 = function() {
    var temporary = 0;
    //(Clothed)
    if (player.findStatusEffect(StatusEffects.NakedOn) < 0) {
        outputText("Kelt is arrogant, crude, and all too often cruel as he mocks your attempts at archery again and again. Despite all this, however, he obviously does know what he's doing. You try to ignore his insults and lewd comments as best as you can and focus on the archery. In the end, you feel you've learned a lot, though Kelt remains snide.\r\r", false);
        temp = rand(4);
        //(25% Chance:
        if (temp == 0) outputText("\"<i>Oh, yes. Looks like you're shaping up to be a pretty accurate archer. Just make sure you only fight blind giants. You know, massive targets that have no chance to dodge. You'll do fine.</i>\"\r\r", false);
        //(25% Chance:
        if (temp == 1) outputText("\"<i>Ha! You want to become an archer? Here's a hint... stop thinking about sucking cock for two seconds and AIM.</i>\"\r\r", false);
        //(25% Chance:
        if (temp == 2) outputText("\"<i>See the red dot, in the middle of the target? Imagine that's your ass, and the arrow is a big, fat, minotaur cock. That should help you hit the target.</i>\"\r\r", false);
        //(25% Chance:
        if (temp == 3) {
            if (player.race() != "centaur") outputText("\"<i>If you were a centaur, I'd recommend suicide. Since you're a " + player.race() + ", I'd say your best option is to fuck off.</i>\"\r\r", false);
            else outputText("\"<i>As a centaur, I'd recommend suicide. Really, it's that or man the fuck up.</i>\"\r\r", false);
        }
        //player.addStatusValue(StatusEffects.Kelt,1,5+rand(4));
        if (player.statusEffectv1(StatusEffects.Kelt) < 90) bowSkill(5+rand(4));
        else bowSkill(1);
    }
    //NAKERS
    else {
        //(Naked, Player in Heat:)
        if (player.inHeat && player.gender > 1) {
            outputText(images.showImage("kelt-farm-female-inheat"));
            outputText("You line up as normal to begin practicing, shooting at the distant targets while Kelt criticizes your technique... usually in as loud, lewd, and offensive a way as possible. Today, however, he seems particularly energetic. He looms over you, distractingly close, his hooves stomping at the ground like an anxious horse. His insults are as harsh as ever... perhaps even more cruel than usual as he mocks your attempts to hit the targets.\r\r", false);
            outputText("One shot goes wide, and Kelt furiously demands that you go to retrieve the arrow, lodged in a nearby bale of hay. You do so quickly, snapping to obey his orders with a little shiver of pleasure. Somehow, it feels right to obey his every wish; to do what you can to satisfy him. His scent has been distracting you... the rich, masculine power of him. How had you never noticed before what a spectacular creature Kelt was?\r\r", false);
            outputText("You lean over to pluck the arrow from the haystack, and feel a sharp blow to the back of your head, knocking you over and sending your consciousness spinning. Dizzily, you realize Kelt is standing over you, tossing aside the bow he just used to crack you in the head. Between his horse legs, a massive manhood is dropping from his sheath, flanked by testes the size of softballs. A lewd grin is on his face.\r\r", false);
            outputText("\"<i>Did you think I wouldn't notice, slut? You reek like a mare in heat. I could smell it on you the moment you arrived. Fortunately, I know just what to do with a fertile bitch. Let's put a baby centaur in that tight pussy of yours.</i>\"\r\r", false);
            outputText("Kelt's forelegs rear up just enough to plant them around your shoulders, his massive weight bearing down on you. The bale of hay lifts you just high enough to line up with his fat erection, which presses between your asscheeks even now.\r\r", false);
            //(Submissive, 0-30:
            if (player.statusEffectv2(StatusEffects.Kelt) <= 30) outputText("You struggle as best as you can, but Kelt weighs a good deal more than you do. As his thrusting hips anxiously press his cock to your nether-lips, you realize this is going to happen, whether you want it to or not. The thought fills you with an undeniable shiver of pleasure.\r\r", false);
            //(Submissive, 30-70:
            else if (player.statusEffectv2(StatusEffects.Kelt) <= 70) outputText("You put forth a token effort to escape, but it is obvious from the beginning that there is no way to get out from under the heavy weight of the centaur. Besides, the desire running through you is palpable... in a way, you want this to happen. So much so that as Kelt is thrusting, trying to line up his cock, you raise your hips to help him out, silently longing for penetration.\r\r", false);
            //(Submissive, 70-100:
            else outputText("The masculine scent of him is overpowering, desperate. Your body wants nothing more than to submit to Kelt's ferocious desires, and your mind agrees. Eagerly, you thrust your hips up, reaching back with one hand to guide his cock to your wet pussy. Kelt snorts his approval, and you feel a shivering tremor of lust run through you.\r\r", false);

            outputText("The centaur's cock has truly equine proportions, being easily two and a half feet long and over three inches thick. ", false);
            //(Vagina, Small:
            if (player.vaginalCapacity() <= 16) outputText("The fit seems impossible, but Kelt could care less about your comfort, and shoves the flared head into you without hesitation. You let out a scream, feeling like you are being torn apart by his cock as it rudely presses against your insides, spreading you wide open. Kelt thrusts with growing frustration, but can fit no more than half his cock inside of you, despite his best efforts. Every twitch makes you cry out as your tight pussy squeezes and milks that massive organ.\r\r", false);
            //(Vagina, Medium:
            else if (player.vaginalCapacity() <= 40) outputText("Even for you, Kelt's cock seems oversized as he presses the flared head of his massive manhood against your netherlips. Even so, he does not hesitate, lunging forward and spearing you on his manhood without hesitation. You let out a groan as that massive organ spreads you wide open, straining your bounderies and almost certainly stretching you out even further. The centaur's thrusts are relentless, but even at his best, he can only fit in about three fourths of his cock. He snorts, frustrated... but you are so filled that your head is spinning with pleasure.\r\r", false);
            //(Vagina, Large:
            else outputText("It seems like a perfect fit for your gaping, hungry pussy as Kelt rams the flared head deep into you. You feel that glorious manhood filling you like few cocks can these days, spreading you wide and searching out your depths. Kelt lets out a pleased laugh when he bottoms out with you just barely able to accommodate his size. His heavy balls slap pleasantly against your ass as you groan with pleasure, filled to the core with cock.", false);
            player.cuntChange(50,true,true,false);
            outputText("\n\n");
            outputText("From then on, the ride only becomes rougher. Kelt begins pumping his hips steadily, deep and hard, intent on burying as much of his manhood as possible with each thrust. He gives little thought to your pleasure, but it hardly matters. With a cock that size, you cannot help but moan with each buck of his hips.\r\r", false);
            outputText("\"<i>Not too bad, not too bad! You make for a pretty decent fuck! Maybe after you bear a couple of my foals, I'll add you to my harem. You'd like that, wouldn't you? You just can't wait to get a bellyful of centaurs, can you?</i>\"\r\r", false);
            //(Submissive, 0-30:
            if (player.statusEffectv2(StatusEffects.Kelt) <= 30) outputText("You shiver and groan, unable to help yourself. It is clear that Kelt has every intention of breeding you, and you are helpless to stop the urges of your body. Terrifying images of being raped daily by this cruel beast fill your head... of your belly swelling with his young again and again. You let out a moaning cry, and orgasm helplessly even as Kelt laughs.\r\r", false);
            //(Submissive, 30-70:
            else if (player.statusEffectv2(StatusEffects.Kelt) <= 70) outputText("The thought of that fills you with a dreadful shiver of lust, from your head to your toes. Your body longs to be bred, again and again, and the idea of submitting to this powerful creature is so powerfully erotic that you cum on the spot, orgasming with delightful abandon. The thought of being this centaur's breeding slave feels so right!\r\r", false);
            //(Submissive, 70-100:
            else outputText("You whimper in the afirmative helplessly, shivering with delight. You have a feeling deep inside you that this powerful creature, this paragon of manhood, is your master, and you but his breeding slave. Your pussy squeezes and milks his member, trying to urge out that explosion of cum that will make you his forever. The knowledge that your great master will impregnate you soon, filling you with his seed, sends you over the edge into a mind-wracking orgasm.\r\r", false);
            outputText("\"<i>Alright, slut... here comes your baby!</i>\"\r\r", false);
            outputText("You feel a bloom of warmth as the centaur's cock bursts within you, pumping thick semen straight into your womb. The quantity is unbelievable, and you orgasm again just from the sensation of his steaming spunk filling your belly. Each little twitch of his cock sends sprays of seed and juices squelching from your overstuffed pussy, the majority of it being trapped inside. Your stomach begins to swell slightly from the sheer quantity, and you all but dissolve into a puddle of satiated goo.\r\r", false);
            outputText("Some time later, Kelt's enormous cock softens enough to slip out of your abused cunt, a virtual torrent of cum flowing out afterwards. You lay on the bale of hay, panting tiredly, hands pressed to your full belly. Kelt looks down at you, and snorts.\r\r", false);
            outputText("\"<i>That's a good look for you. Come back tomorrow if it doesn't take, slut. I'll be glad to do the job again.</i>\"\r\r", false);
            player.slimeFeed();
            player.orgasm();
            outputText("He leaves you without another word.", false);
            //(+5 Submissive)
            player.addStatusValue(StatusEffects.Kelt,2,5);
            //(Pregnancy Chance)
            player.knockUp(PregnancyStore.PREGNANCY_KELT, PregnancyStore.INCUBATION_CENTAUR, 50);
            //Should be equivalent to the old way, but now Kelt does all the usual things like checking for contraceptives and fertilizing eggs if PC can oviposit
            doNext(Camp.returnToCampUseOneHour);
            return;
        }
        temporary = rand(5);
        //(Naked, 60% Chance)
        if (temporary <= 2) {
            outputText("The lesson proceeds as normal, with you taking shots while Kelt arrogantly critiques your style, tossing out colorful and creative insults whenever possible. He has no shame about mocking your body as much as he laughs at your archery, and makes several crude comments about what it might be good for.", false);
            //(Submissive, 0-30:
            if (player.statusEffectv2(StatusEffects.Kelt) <= 30) outputText("You try to ignore the foul remarks, telling yourself that this is simply the way he is. It does not help, though, that at times you feel Kelt's eyes wandering across you lustfully. At least some of his comments are not mockeries, but suggestions. The entire experience makes you feel a little more uncomfortable around the abusive centaur.", false);
            //(Submissive, 30-70:
            else if (player.statusEffectv2(StatusEffects.Kelt) <= 70) outputText("Despite yourself, some of his cruder comments make you blush. By now, you're getting used to the oft times depraved sexuality of the demon world... but it is a little humiliating to subject yourself to this kind of treatment... and, to your shame, sometimes it's a little arousing. Though Kelt is insulting, cruel, and crude, you also notice real lust in some of his glances. By the end of the lesson, you are flushed with arousal as well as exertion.", false);
            //(Submissive, 70-100:
            else outputText("Of course, Kelt's words only distract you even more from hitting the target. Not because you are angry... but because you are aroused. Somehow, his lewd comments and crude jibes make you shiver with anticipation. He's just so powerful, so masculine. Kelt seems well aware of the effect he has on you, and once reaches out to slap your ass heartily. By the end of the training, you feel intensely horny.", false);
            player.changeLust("lus", 10);
            //player.addStatusValue(StatusEffects.Kelt,1,4);
            if (player.statusEffectv1(StatusEffects.Kelt) < 90) bowSkill(4);
            else bowSkill(1);
            doNext(Camp.returnToCampUseOneHour);
            return;
        }
        //(No Breasts—Do standard Naked event)
        if (player.biggestTitSize() == 0 && temporary == 3) temporary = 4;
        //(Naked, 20% Chance)
        if (temporary == 3) {
            outputText("The practice begins as normal, but something is a little different today. To your surprise, Kelt's regular insults and comments seem to be a little less harsh and a little more bemused. Although he still insults your achievements and mocks your failures, he almost seems entertained by your efforts. His apparent good mood is not necessarily better... without his usual fiery insults, you are a little unsure of how your progress is going. One shot goes long, and to your surprise, Kelt doesn't yell at you. Instead, he laughs heartily. Flushed and a little embarrased, you ask what you did wrong.\r\r", false);
            outputText("\"<i>Isn't it obvious?</i>\" he asks, grinning down at you in sardonic amusment. \"<i>You were way off balance. Of course, I would be too, if I had a couple of extra pounds of fat hanging off my chest.</i>\"\r\r", false);
            outputText("Indignantly, you cover your breasts with your hands, telling him to be serious. He laughs again, more cruelly this time.\r\r", false);
            outputText("\"<i>I am being serious. Women aren't warriors. And those with tits do not become warriors. I just think it's funny. You, begging me to teach you, while you have those udders hanging off your chest!</i>\"\r\r", false);
            outputText("To your surprise, he suddenly leans forward, fist moving towards your head. You raise your arms to deflect the blow, but he changes tactics suddenly and grabs one of your " + player.breastDescript(0) + " instead. You stiffen, but before you can react further, he squeezes them brutally, mauling your breasts roughly with his hands.\r\r", false);
            //(Small Size, A-DD:
            if (player.biggestTitSize() <= 5) outputText("\"<i>Ha! Even with your itty-bitty-titty, you have to admit to a certain... weakness, is it? Awfully sensitive, aren't they? Ooh, am I making the little girl wet? Naughty slut!</i>\"\r\r", false);
            //(Medium Size, E-HHH:
            else if (player.biggestTitSize() <= 11) outputText("\"<i>Just look at these mommy melons! You want to be an archer? I'm amazed you don't slap yourself in the tits with every shot! Easy target to grab onto. But hey, I bet you like it that way. Like it when people grope these fat titties of yours?</i>\"\r\r", false);
            //(Big Size, Watermelon and beyond:
            else outputText("\"<i>Look at you! You're a miracle of science, you are... any other creature would break their back, trying to haul these milk bags around! Tell the truth, now... which one of your parents was actually a cow?</i>\"\r\r", false);
            outputText("Despite his cruel words, you can't help but groan a little bit as he brutalizes your sensitive chest. Kelt seems to take a good deal of pleasure in how helpless you are, pinching and flicking your " + player.nippleDescript(0) + "s.\r\r", false);
            //(Milk)
            if (player.biggestLactation() > 1) {
                outputText("Inevitably, beads of milk appear on the tips of your breasts, and Kelt lets out a hoot of laughter.\r\r", false);
                outputText("\"<i>Oh, boy! Mommy here brought snacks for everyone! Don't mind if I do!</i>\"\r\r", false);
                outputText("Without hesitation, he lowers his lips to your engorged breast, suckling on the nipple. He is immediately rewarded with a jet of milk, and you whimper slightly with pleasure as the centaur begins aggressively suckling your tit. He drinks down your sweet, warm cream hungrily, and you are so enthralled with the sensations of release that you are powerless to stop him as he takes his fill of you. The other hand continues to crudely grope your unattended teat, and despite yourself, you can feel your arousal building. At last, Kelt releases you, wiping his mouth with an arrogant grin.\r\r", false);
                outputText("\"<i>Not bad, for a cow. You certainly seemed to enjoy it too.</i>\"\r\r", false);
                outputText("Even released, your teat continues to drizzle slightly, spilling your milk shamefully on the ground as Kelt continues to squeeze your breasts.\r\r", false);
                //You've now been milked, reset the timer for that
                player.addStatusValue(StatusEffects.Feeder,1,1);
                player.changeStatusValue(StatusEffects.Feeder,2,0);
            }
            outputText("\"<i>Take it from me, bitch. Know your place. Breasts are for women, and women are for fucking until their bellies are full of foals. 'Teach me archery, Kelt!' Ha! Now that's a joke.</i>\"\r\r", false);
            outputText("Flicking your erect teats painfully one last time, Kelt walks away, laughing loudly to himself.", false);
            doNext(Camp.returnToCampUseOneHour);
            //(+5 Submissive)
            player.addStatusValue(StatusEffects.Kelt,2,5);
            //player.addStatusValue(StatusEffects.Kelt,1,4);
            if (player.statusEffectv1(StatusEffects.Kelt) < 90) bowSkill(4);
            else bowSkill(1);
            return;
        }
        //(Naked, 20% Chance)
        if (temporary == 4)
        {
            outputText("Nothing you do today seems to please your tutor, however. He roars at you for every mistake, explodes at every misfire, and merely sneers contemptuously at every actual hit. While his contempt for your efforts is nothing new, he seems particularly agitated today. His aggressive behavior begins to distract you, and finally, you make a huge mistake. Your shot goes flying, nowhere near the target, and Kelt is suddenly right behind you.\r\r", false);
            outputText("\"<i>You stupid slut!</i>\" he roars out, backhanding you with casual contempt. You stumble to the ground, dazed but uninjured, as he rants. \"<i>Hit the FUCKING target! It's not hard, you dirty whore! Maybe if you weren't so focused on FUCKING DICK you'd be able to get a single shot in! Stand up... I said stand up, fucker!</i>\"\r\r", false);
            outputText("Thrown off guard by his aggressive attitude, you hastily stand, and at his command, face the target, trembling slightly. Kelt looms over you from behind, and grabs you roughly by the hair. Then, with his other hand, he crudely shoves two fingers up your ass. You let out a cry of shock, but Kelt growls and tightens his grip on your hair.\r\r", false);
            outputText("\"<i>THERE. Is that what you fucking wanted, whore? Something nice to fill that ass of yours? Bet it feels good, huh? Bet you were fucking DREAMING of a nice, fat cock up your ass. Well, here you go! Feel better now that you're being fucked, slut?</i>\"\r\r", false);
            outputText("He lifts up with his fingers, painfully raising you off the ground with his great strength. You squirm, aroused despite yourself by this sudden intrusion, and Kelt growls, lowering you to the ground and releasing your hair. Moments later, your bow is in your hand... though Kelt has still not removed his fingers.\r\r", false);
            outputText("\"<i>Okay. Now that our little bitch is getting an assfuck, maybe she'll be satisfied enough to hit the fucking target. Now shoot... and don't you dare fuck this up again.</i>\"\r\r", false);
            outputText("Groaning, distracted and unnerved, you hurriedly line up the shot as best as you can. Kelt's fingers flex, forcing you to stand up straighter. Your arm shakes as you take aim, and you can feel Kelt's hot breath on your hair, and then the arrow is flying! Ten meters... five... bullseye!\r\r", false);
            outputText("With a snort, Kelt shoves you to the ground, removing his fingers as he does so. Wincing, you sit up with the centaur staring down at you snidely.\r\r", false);
            outputText("\"<i>Lesson's over for now. Next time it's my cock, slut.</i>\"\r\r", false);
            outputText("He walks away without another word, taking some of your dignity with him.", false);
            //(+5 Submissive)
            player.changeLust(15, false);
            gameFlags[KELT_SUBMISSIVENESS] += 5;
            //player.addStatusValue(StatusEffects.Kelt,1,4);
            if (player.statusEffectv1(StatusEffects.Kelt) < 90) bowSkill(4);
            else bowSkill(1);
            bowSkill(4);
            doNext(Camp.returnToCampUseOneHour);
            return;
        }
    }
    doNext(Camp.returnToCampUseOneHour);
}

KeltScene.keltMainEncounterPostBlowjob = function() {
    //(Blowjob Requirement On)
    if (player.findStatusEffect(StatusEffects.BlowjobOn) >= 0) {
        //(Submissiveness 75+, Lust 60+)
        if (player.lust >= 75 || gameFlags[KELT_SUBMISSIVENESS] >= 90 && rand(2) == 0) {
            //outputText(images.showImage("kelt-farm-smallbarn"));
            outputText("It is almost too much to wait for your meeting with Kelt today. His familiar musk enflames your senses, making you ache with need. You try to wriggle your ass enticingly for Kelt as the two of you walk, eager to start in on the usual blowjob. Even you don't usually hunger after it this much, but a need for Kelt's cock fills you to the core. You long for nothing more than to service your mighty stud.\r\r", false);
            outputText("To your surprise, Kelt leads you not towards the practice field, but towards a small barn, near the edge of the field. When you meekly ask why he's taken you here, his brow clouds and he lashes out, striking you with casual violence. ", false);
            outputText("\"<i>Bitch! I said get in there. Do I need to repeat myself, you stupid whore?\"</i>\r\r", false);
            outputText("Scrambling to your feet and babbling apologies, you hastily open the door to the barn, entering immediately. Before you is a thin, upraised table, with straps in it, like saddle stirrups. Your heart leaps excitedly, and Kelt laughs a little to himself as he tells you to get on, facedown. You hasten to comply.\r\r", false);
            outputText("Lying on the rough table with your feet in the stirrups, your ass is suspended at just the right height. Kelt moves with obvious hunger, running his finger along your nethers.", false);
            //(Penis:
            if (player.totalCocks() > 0) outputText(" Your " + player.cockDescript(0) + " is rock hard, but he ignores it almost contemptuously. You almost feel ashamed of it, compared to the slowly-growing manhood between his legs.", false);
            //(Vagina:
            if (player.hasVagina()) outputText(" For a moment, his fingers trace the line of your exposed " + player.vaginaDescript(0) + ", giving you the slightest of warnings before he crudely jams two fingers deep inside, as though scouting out your depths. You whimper urgently at the treatment, and more so as Kelt removes his fingers, licking with obvious pleasure.", false);
            outputText("\r\r\"<i>Oh? Like that, do you? Well, we're not here for what you like. You're here to satisfy me, slut. And I know what I'm after.</i>\"\r\r", false);
            outputText("You flinch slightly as his two front hooves land forcefully on either side of your head, as Kelt mounts you from behind. You can feel his massive cock pressing firmly into your back, drooling a warm little blob of precum between your shoulder blades. For a few, anxious moments, you tremble and bite your lip, waiting for him to line up his shot. You almost cum on the spot as the flared head of his member presses squarely between your " + player.buttDescript() + ".\r\r", false);
            outputText("Kelt doesn't hesitate. With an almost primal snarl, he rams his cock forward, anxious to sink himself deep into your ass. With no lube and no foreplay, you let out a cry as the massive cock splits you open. Fortunately, it drools precum eagerly into your backside, making the next thrust easier, though no less forceful. Kelt shows no mercy, trying to fit himself inside your ");
            if (player.tallness < 112) outputText("smaller ");
            outputText("body with no concern for your well being.", false);
            player.buttChange(70, true, true, false);
            outputText("\r\r", false);
            outputText("You can't help it... at the thought of being used as his worthless fucktoy, you suffer a mild orgasm of your own, crying out your submission to this powerful creature.", false);
            //(Penis:
            if (player.totalCocks() > 0) outputText(" Beneath you, pressed firmly into the harsh wood of the mounting board, your " + player.cockDescript(0) + " erupts, splattering your stomach with your own cum. As the thick semen slides down towards your face, you begin slipping on your own warm seed, rocking back and forth with each harsh pounding Kelt delivers to your backside.", false);
            //(Vagina:
            if (player.hasVagina()) outputText(" Your poor, neglected pussy quivers with delight, convulsing without even being touched. Thick juices run freely down your leg, dripping off to splatter the hay below you as you moan like a bitch in heat.", false);
            //(Genderless:
            if (player.gender == 0) outputText(" Never before has a complete lack of genitalia been so frustrating... or pleasurable. Not being able to physically cum, the explosions of climax simply rack up within your body... waves of cascading pleasure with no release and no mercy.", false);
            outputText("\r\rIf anything, your orgasm only seems to spur Kelt on, causing him to push deeper and faster. The idea of fitting his massive, nearly three-foot cock into your bowels seems ludicrous, but the aggressive centaur obviously has no intention of taking 'no' for an answer. With each powerful thrust of his hips, he sinks more cock deep within your ass, filling you, stretching you, ripping you open with still more to come. It is almost a terrible relief when you feel his massive testicles colide with your ass, buried at last to the hilt. Even in victory, Kelt is snide. ", false);
            if (player.looseness(false) < 3) outputText("\"<i>Fuck! About time! Sure got a tight little ass back here, but don't worry, slut. We'll stretch it out in no time. I promise you this... you'll be getting a lot more of my cock from now on, so you'd better be ready!</i>\"\r\r", false);
            else if (player.looseness(false) < 5) outputText("\"<i>Fuck! About time! Sure got a nice ass back here, but don't worry, slut. We'll turn it into a real gaper soon. It's a good thing you've been practicing... you'll be getting a lot more of my cock from now on, so you'd better be ready!</i>\"\n\n");
            else outputText("\"<i>Fuck! About time! Sure got a nice, stretched out little pucker back here, but don't worry, slut. I'll train into to squeeze down just right in no time. I promise you this... you'll be getting a lot more of my cock from now on, so you'd better be ready!</i>\"\n\n");
            outputText("You lose track of time, moaning and whimpering beneath your master as he ruthlessly takes his pleasure from your distended ass. Did you cum again? Almost certainly... but it is hard to focus on that one sensation. The much greater sensation welling up within you is a sense of rightness. This is where you belong; this is where you are happy. As his cock begins to swell within you, preparing to unload his spunk deep inside, your voice rises in a cry of jubilation. Impaled upon your master's cock, now and forever, being filled with his seed... you could want nothing more.\r\r", false);
            outputText("The torrent of jizz is pumped into you lewdly, Kelt's heavy testicles blasting burst after burst into your bowels, filling your belly with hot centaur cum. He doesn't relent until well after your ass has been filled to the point of making you sick... at one point you cough up a mouthful of his cum, only to weakly try to swallow it back down. It is your master's cum... it belongs inside you.\r\r", false);
            outputText("When Kelt pulls out, he leaves behind your ravaged asshole, spread wide and filled with cum. You whimper as he withdraws, but are unable to move, unable to think. You dimly hear him laughing at you again, and taste his cum once more as he dips a finger into your gaping asshole and presses it to your lips.\r\r", false);
            outputText("\"<i>Now stay there for a while, bitch. Let it get good and stuck up there. Come back tomorrow, and maybe, if you're lucky, I'll fuck you again. You do, after all, make a pretty good cumdump.</i>\"\r\r", false);
            outputText("It's some hours later before you rouse yourself, clenching your ass as best as you can to keep the tide inside. Despite your efforts, a steady trail oozes down your leg, marking your path as you slowly, happily trudge back to your Camp.", false);
            doNext(Camp.returnToCampUseTwoHours);
            player.slimeFeed();
            //(+10 Submissiveness)
            if (player.buttChange(70,true)) outputText("\r\r", false);
            gameFlags[KELT_SUBMISSIVENESS] += 10;
            player.orgasm();
            player.modStats("cor", 1);
            return;
        }
        //(Otherwise)
        else {
            //outputText(images.showImage("kelt-farm-eagerbj"));
            outputText("As you move out to the practice field, you feel Kelt's eyes on you, staring intensely and maybe a little hungrily. Knowing what is coming, you deliberately sway your hips as best as you can, trying to show off for his benefit. It apparently helps, as you only get about halfway before Kelt growls in a familiar tone of voice, \"<i>On your knees, bitch.</i>\"\r\r", false);
            outputText("Excitement rushing through you, you anxiously kneel before him, mouth wide open and heart fluttering. Kelt immediately moves over you, grinding his cock forcefully into your face. He seems to enjoy teasing you with it above anything else, as you wait anxiously for his command, nuzzling his cock but unable to do more until he allows it.\r\r", false);
            outputText("\"<i>Alright, bitch. Swallow my cock.</i>\"\r\r", false);
            outputText("Nothing could give you more pleasure. Experienced by now, you open wide enough to slurp the head of his member in greedily, taking a mere moment to savor the wonderful taste of his precum before opening your throat to his use. Grunting to himself, Kelt takes your invitation gladly, and you begin deepthroating him worshipfully, stroking his exposed shaft and fondling his bloated testicles when possible, trying to encourage every drop of wonderful cum.\r\r", false);
            outputText("Though he lasts some time, it is still too short before he groans aloud and begins spewing thick seed into your stomach. Rapturous, you gulp it down eagerly, feeling it warm your insides and slide into your stuffed belly. By the time he is finished, your stomach is so packed it aches... but the feeling of contentment at being full of his seed once more is far more satisfying. Kelt allows you to clean his cock before pulling away.\r\r", false);
            outputText("\"<i>Pretty good, slut. I knew there was a reason I kept you around. I've indulged you enough, though. Get over there and shoot some arrows, before I get bored with you.</i>\"\r\r", false);
            outputText("You hardly remember the rest of the training. You're far too distracted by the fullness of your belly, and the thought of maybe getting a little more. Kelt seems almost bored by the end, despite your attempts to entice him during the lesson, and leaves soon afterwards, to your chagrin.", false);
            player.slimeFeed();
            //(+5 Submissiveness)
            gameFlags[KELT_SUBMISSIVENESS] += 5;
            bowSkill(3);
            player.changeLust(20, false);
            player.modStats("cor", 1);
            doNext(Camp.returnToCampUseOneHour);
            return;
        }
    }
    //(Blowjob Requirement Off, 40% Chance)
    else if (rand(10) <= 3) {
        outputText("You move towards the practice field, trying to ignore the way Kelt openly and hungrily eyes your naked body. He has become more and more open about his lust for you. Despite yourself, you can't help but enjoy his attentions.\r\r", false);
        outputText("Once at the field, you move to draw an arrow and begin practice, when Kelt roughly pushes you down to your knees.\r\r", false);
        outputText("\"<i>Not today, bitch. I think it's time you gave a little back. So be a good little whore, and get to work on my cock. I'm gonna bust a nut in that pretty little mouth before I do any more teaching.</i>\"\r\r", false);
        outputText("A shiver of desire and a tremor of fear run through you. You had hoped to avoid this requirement. A hunger lies within you... the thought of once more slurping down centaur cum is all but irresistible. But you fear that with each time, you are losing yourself more and more...\r\r", false);
        //(Submissiveness +80, or Corruption +80)
        if (player.cor + player.lib + player.lust >= 220 && gameFlags[KELT_SUBMISSIVENESS] >= 80) {
            outputText("You try to resist the need. You honestly try. But this time, there is just no stopping it. Your desire for Kelt to cum within you again is so great, you fall to your knees immediately before him, waiting hungrily for your treat. A part of you wonders why you ever resisted in the first place... in fact, why not suck him off before every lesson? Surely that would make him like you more...\r\r", false);
            doNext(KeltScene.keltSubmitGivingBJ);
            return;
        }
        //Otherwise)
        else {
            outputText("Despite the need, despite the desire, you are still in control of yourself enough to make a choice. Do you submit to the centaur's will, and your own hunger? Or will you somehow find the strength to walk away?", false);
            //Submit				Resist!
            menu();
            addButton(0, "Submit", KeltScene.keltSubmitGivingBJ);
            addButton(1, "Resist", KeltScene.keltResistGivingBJ);
            addButton(4, "FIGHT!", KeltScene.fightToBeatKelt);
            return;
        }
    }
    KeltScene.keltMainEncounter3();
}

//(Resist)
KeltScene.keltResistGivingBJ = function() {
    clearOutput();
    outputText("Summoning what remains of your fragmented willpower, you resist the need, apologizing to Kelt and turning to walk away. It hurts to do so, aching within your chest with an almost physical need to go back; to apologize and kneel before him worshipfully.\r\r", false);
    outputText("To your surprise, however, Kelt does not seem particularly bothered. In fact, he laughs as you leave.\r\r", false);
    outputText("\"<i>Keep fooling yourself, bitch. I'll be waiting when you get hungry.</i>\" \r\rKelt leaves, refusing to teach you now.", false);
    //(-5 Submissiveness)
    player.addStatusValue(StatusEffects.Kelt,2,-5);
    player.changeLust(5, false);
    doNext(Camp.returnToCampUseOneHour);
}
//(Submit)
KeltScene.keltSubmitGivingBJ = function() {
    player.slimeFeed();
    clearOutput();
    outputText("\"<i>There we go. Who's a good little whore? Who's a hungry little slut? Okay, bitch... time to fill that belly of yours. Open wide.</i>\"\r\r", false);
    outputText("Reluctantly, with shame burning in your cheeks and desire ravaging your mind, you lower yourself before him and do just that.\r\r", false);
    if (player.statusEffectv2(StatusEffects.Kelt) >= 90) {
        player.createStatusEffect(StatusEffects.BlowjobOn,0,0,0,0);
    }
    KeltScene.keltReluctantGivingBJ();
    doNext(KeltScene.continueAfterBJ);
}
//Continue training post BJ
KeltScene.continueAfterBJ = function() {
    clearOutput();
    outputText("After a brief rest, you manage to get back to practicing archery. ");
    KeltScene.keltMainEncounter3();
}
//(Reluctant Blowjob)
KeltScene.keltReluctantGivingBJ = function() {
    player.slimeFeed();
    clearOutput();
    //outputText(images.showImage("kelt-farm-reluctantbj"));
    outputText("Kelt immediately moves over you, grinding his cock forcefully into your face. He seems to enjoy teasing you with it above anything else as you wait anxiously for his command, nuzzling his cock but unable to do more until he allows it. The musky scent of it fills you with a desire you don't dare admit to... but is present all the same.\r\r", false);
    outputText("\"<i>Alright, bitch. Swallow my cock.</i>\"\r\r", false);
    outputText("Nothing could give you more pleasure. You try to restrain yourself, forcing yourself to stroke the shaft experimentally a few times... but your hunger will not be contained. Flushed with need, you open wide enough to slurp the head of his member in greedily, savoring the glorious taste of that wonderful precum. Grunting to himself with satisfaction, Kelt pushes his hips forward insistantly. Without even thinking about it, you open your throat to him, gagging slightly as his cock pushes past your tonsils and once more splits open your throat. Those swollen testicles hang teasingly out of reach, and thoughts of his cum warming your belly urge you on further to swallow more and more wondrous cock.\r\r", false);
    outputText("Kelt does not hesitate, and does more than his fair share. Whenever you are reluctant, he firmly shoves forward, coaxing more out of your throat than you were willing to give. Though he lasts some time, it is still too short before he groans aloud and begins spewing thick seed into your stomach. You can feel the gooey wads warm your insides and slide into your stuffed belly, and shudder with satisfaction despite yourself. His thick loads belong inside of you, his hungry, needy little cumdump. By the time he is finished, your stomach is so full it aches... but the feeling of contentment at being full of his seed once more is far more cruelly satisfying to your bruised ego. You almost feel incomplete as his slimy cock softens and withdraws from your aching throat... but you resist the need to lick it clean.", false);
    player.refillHunger(50);
    outputText("\r\r\"<i>Pretty good, slut. I knew there was a reason I kept you around. Come back next time, and maybe I'll actually teach you something. Or, who knows? Maybe I'll just give you another snack, huh? Ha!</i>\"\r\r", false);
    outputText("Meekly you nod, humiliated and full of cum. The worst part, by far, is how happy you are on the inside. You try to tell yourself that this is wrong, that Kelt is an arrogant, cruel creature, and that this is the last time. But you don't really believe that. Despite the lies you tell yourself, you look forward to the next time he decides to use you.\r\r", false);
    player.changeLust(5, false);
    //(+5 Submissiveness)*/
    gameFlags[KELT_SUBMISSIVENESS] += 5;
    doNext(Camp.returnToCampUseOneHour);
}