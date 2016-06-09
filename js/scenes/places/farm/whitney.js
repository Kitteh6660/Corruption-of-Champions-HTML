WhitneyScene = [];



//[YES]
WhitneyScene.whitneyMilkerHookup = function(breast) {
    if (breast == undefined) breast = true;
    displaySprite("whitney");
    outputText("Whitney takes the gear back to her farm after promising to have it working within the hour. She did leave you with a cryptic warning to \"<i>leave the milkings to the beasts, lest you become one</i>.</i>\"<br><br>You shrug and head back to check up on camp.", true);
    if (breast) {
        player.createKeyItem(KeyItems.BreastMilkerInstalled,0,0,0,0);
        player.removeKeyItem(KeyItems.BreastMilker);
    }
    else {
        player.createKeyItem(KeyItems.CockMilkerInstalled,0,0,0,0);
        player.removeKeyItem(KeyItems.CockMilker);
    }
    doNext(Camp.returnToCampUseOneHour);
}
//[NO]
WhitneyScene.whitneyMilkerRefusal = function() {
    displaySprite("whitney");
    clearOutput();
    outputText("Whitney shrugs and the two of you resume your conversation. But like all good things, it has to come to an end. The two of you go your separate ways.");
    doNext(Camp.returnToCampUseOneHour);
}
//TALK
WhitneyScene.talkWhitney = function() {
    displaySprite("whitney");
    //[FIND WHITNEY TXT]
    clearOutput();
    //Centaur Hookups!
    if (player.hasKeyItem(KeyItems.ToyFakeMare) < 0 && player.isTaur()) {
        WhitneyScene.centaurToysHoooooo();
        return;
    }
    /*// Requires: PC has met both Marble and Kelt
    if (gameFlags[MURBLE_FARM_TALK_LEVELS] > 0 && player.findStatusEffect(StatusEffects.Kelt) >= 0 && gameFlags[WHITNEY_TALK_MURBLE_AND_KELT] == 0)
    {
        gameFlags[WHITNEY_TALK_MURBLE_AND_KELT] = 1;

        outputText("You find Whitney in her usual spot underneath her tree, nose in book. She smiles at you distractedly as you approach.");

        outputText("\n\n“<i>Notice you’ve been nosey-ing around the place,</i>” she says. It’s difficult to tell from her bluff tone whether she’s teasing or accusing you; the dog morph has the mannerisms of a woman who has lived alone for some time. “<i>What do you make of my lil' place?</i>” You answer truthfully that is very peaceful and pretty, almost incongruously so in this savage and rapacious land. You say it seems like a very well-run operation, given that the only people who seem to be working on it are her, Marble and... your brow clouds. Whitney smiles understandingly.");

        outputText("\n\n“<i>Those two are hard workers, in their own different ways. Doubt I’d be able to keep the farm going without them.</i>” She sighs. “<i>When you are out in the sticks like this, you have to make allowances for the people you find yourself lumped together with. Be understanding, and look for the good in everyone. If you set boundaries and stand firm by 'em you can get by with most anyone.</i>” She looks you in the eye. “<i>You should be careful how much time you spend around just anyone, though. Some folks don’t have your best interests at heart. Some others think they do, and they’re even more dangerous. Know what I mean?</i>” Not particularly, but you get the distinct impression you’re being warned about something. Feeling slightly unsettled, you politely take your leave. Whitney nods once and returns to her book, the picture of placidity.");

        doNext(camp.returnToCampUseOneHour);
        return;
    }

    // Requires: PC has entered Tel’Adre
    if (player.findStatusEffect(StatusEffects.TelAdre) >= 0 && player.statusEffectv1(StatusEffects.TelAdre) >= 1 && gameFlags[WHITNEY_TALK_TELADRE] == 0 && gameFlags[WHITNEY_TALK_MURBLE_AND_KELT] == 1)
    {
        gameFlags[WHITNEY_TALK_TELADRE] = 1;

        outputText("You find the dog woman sitting on a stool, engaged in hand-milking a cow. She looks up sharply at your approach but smiles readily enough when she sees it’s you.");

        outputText("\n\n“<i>Hey stranger! How you doin'?</i>” Feeling slightly strange standing next to her whilst she pulls briskly at the teats of the cow staring dully into your face, you describe the rather incredible city in the desert you stumbled upon recently and ask whether she’s ever visited it. “<i>Heh. Well, of course I have,</i>” says Whitney, not looking up. “<i>Used to live there, back in the day. Urta still around? Went to school with her, and afterwards she persuaded me to join the guard with her. Everydog has a duty! That was her by-word.</i>” The dog morph laughs. “<i>She was just scared of bunking on her own. Silly thing, but a good friend.</i>”");

        outputText("\n\nYou ask why she left.");

        outputText("\n\n“<i> I had my reasons. I grew up in the country, </i>” she goes on after a short pause, “<i>and never held much with city life. Particularly not hot, dusty, close ‘n stinky city life. Course farm life is stinky too,</i>” she acknowledges as she heaves up the milk pail and starts to walk it towards a barn. You offer to help, but she shakes her head. “<i> But least here it’s stink you’ve created yourself. I moved out here eight years ago, and never regretted it. As for Urta... well, she was finding better friends at the bottom of bottles by then. </i>” She disappears into the barn with the milk, and you decide to leave it at that.");

        doNext(camp.returnToCampUseOneHour);
        return;
    }

    // Requires: PC has found High Mountain
    if (gameFlags[DISCOVERED_HIGH_MOUNTAIN] > 0 && gameFlags[WHITNEY_TALK_HIGH_MOUNTAIN] == 0 && gameFlags[WHITNEY_TALK_TELADRE] == 1)
    {
        gameFlags[WHITNEY_TALK_HIGH_MOUNTAIN] = 1;

        outputText("You find Whitney outside the milking shed, carefully writing labels at a trestle table and sticking them on large bottles of milk.");
        //[PC has used milking device:
        if (player.findStatusEffect(StatusEffects.BreastsMilked) >= 0)
        {
            outputText(" You are uncomfortably aware of the number of them which are labelled ‘[name]’, and a charged memory of strong suction on your [nipples] comes back to you.");
        }

        if (gameFlags[UNKNOWN_FLAG_NUMBER_00331] > 0 && gameFlags[ISABELLA_MILKED_YET] != -1)
        {
            // Jojo only
            outputText(" At the far end there is a small alabaster cluster labelled ‘Jojo’.");
        }
        else if (gameFlags[UNKNOWN_FLAG_NUMBER_00331] == 0 && gameFlags[ISABELLA_MILKED_YET] == -1)
        {
            // Isabella Only
            outputText(" At the far end there is a small alabaster cluster labelled ‘Isabella’.");
        }
        else if (gameFlags[UNKNOWN_FLAG_NUMBER_00331] > 0 && gameFlags[ISABELLA_MILKED_YET] == -1)
        {
            // Both
            outputText(" At the far end there is one alabaster cluster labelled ‘Jojo’, another labelled ‘Isabella’.");
        }

        outputText(" You ask her who she sells it all to.");

        outputText("\n\n“<i>Centaurs ‘n goblins mainly,</i>” she replies. “<i>Sometimes even get the mountain folk coming down here to trade. Milk’s a rare enough commodity to a harpy or basilisk to get 'em to stop ruttin' an' fighting for two minutes and buy some.</i>” She sighs. “<i>Used to be you could talk with em, get news, but they mostly don’t even bother doing that anymore - just point at what they want, throw their gems down and leave. Gnolls and imps like milk too,</i>” she goes on in a harder tone, “<i>but they prefer tryin' stealin' it. Marble and Kelt deal with them.</i>”");

        // [PC has used milking device:
        if (player.findStatusEffect(StatusEffects.BreastsMilked) >= 0)
        {
            outputText("\n\nShe smiles at you. “<i>I charge top gem for your produce, of course. Human milk is a very rare commodity these days, and it has a powerful calming effect on most anyone. Folks love it for their kids.</i>”");
        }

        //[PC has used cock milker:
        if (player.findStatusEffect(StatusEffects.CockPumped) >= 0)
        {
            if (player.findStatusEffect(StatusEffects.BreastsMilked) < 0) outputText("\n\n");

            outputText("You notice a number of smaller bottles filled with a creamy fluid on the table, arranged in a cargo container. It takes you a moment to realize what it is. “<i>Why d’you think I pay you for it?</i> ” says Whitney with a laugh, catching your expression. “<i>I kin use some of it for my herd, but it’s just as easy to sell it to goblins ‘n harpies. Much better to buy it from me than to waste energy catching and beating it out of a satyr. 'Sides, how'd ya think I kept my hair so luxurious? Goblin hairdressers are top notch.</i>”");
        }

        doNext(camp.returnToCampUseOneHour);
        return;
    }

    // Requires: PC cleared Factory
    if (gameFlags[FACTORY_SHUTDOWN] > 0 && gameFlags[WHITNEY_TALK_DUNGEON] == 0 && gameFlags[WHITNEY_TALK_HIGH_MOUNTAIN] == 1)
    {
        gameFlags[WHITNEY_TALK_DUNGEON] = 1;

        outputText("Whitney isn’t anywhere around the farm buildings. You take a guess and walk out to the tree in the far field: sure enough you spot a figure in a sunhat sat underneath it as you draw close. Having spent a fair amount of time around the farm you have come to appreciate that this is indeed the best spot on it; it is on a small rise from which the shade of the mighty oak allows a person to see all the farm buildings and the lake, though the latter is beyond the curve of the land, glimmering in the near distance. Whitney looks up at you as you take it in, listening to the wind in the leaves.");

        outputText("\n\n“<i>Look like you’ve got a story to tell, [name]. What’s up?</i>” Haltingly at first, you describe your attack on the demon factory, the sexual horrors you found inside, and finally the revelation the overseer gloatingly laid on you: that the elders of Ignam sold your village’s youth into twisted slavery, and how you only narrowly avoided that same fate. Whitney’s eyes are quite round by the time you’ve finished.");

        outputText("\n\n“<i>That’s... that’s an amazing tale, [name]. It’s so easy down here to believe that such evil doesn’t exist in this world but it does; oh it does. An' there're people as brave as you that are willing to stand against it. That’s difficult to believe sometimes too.</i>” She looks away and opens her mouth several times, stopping each time, before finally going on in a quieter tone.");

        outputText("\n\n“<i>I knew a guy who was like you, once. Met him soon after I joined up with the Tel’Adre guard. Kind ‘n funny in a stupid kinda way, 'an brave. Liked him enough that I married him.</i>” She looks off down to the lake. “<i>You have to be real brave to sign up for desert patrol. It ain’t for your benefit. It ain’t for Tel’Adre’s benefit. It’s just to scout for folks who are in trouble, survivors and runaways. The demons know about the existence of the city, oh they do, and they’re always lookin' for ways in. I think they're mostly lookin' to poison it like they did with the goblins, but they like informers too - captives. Gods, do they like captives.</i>”");

        outputText("\n\nShe stops for such a long while that you wonder whether she’s finished. “<i>Could- could you recognise any of those prisoners? The ones from your town. You said some of em stayed even when you freed em. What did you think about that? I often wonder- is it better never to know what happened to somebody, or find em and discover nothing but a twisted shell of what you remember: a soulless monster who even likes what’s been done to em?</i>” She stops and you think you see tears glittering in eyes still gazing at the lake. You wait a little longer but evidently that’s all you’re getting. You put a hand on her shoulder and then quietly walk away.");

        doNext(camp.returnToCampUseOneHour);
        return;
    }

    // Subsequent visit
    if (gameFlags[WHITNEY_TALK_DUNGEON_FOLLOWUP] == 0 && gameFlags[WHITNEY_TALK_DUNGEON] == 1) {
        gameFlags[WHITNEY_TALK_DUNGEON_FOLLOWUP] = 1;
        outputText("You find Whitney hard at work in the pepper patch. You approach her cautiously, but when she sees you she hails you brightly.");
        outputText("\n\n“<i>Hey there [name]! I’m afraid I’m almost done here fer the day - can’t get your hands dirty this time, I’m afraid!</i>” You hold the gate open as she hauls a paper bag full of peppers over and plonks it on the ground. As you are closing it again a hand falls on yours.");
        outputText("\n\n“<i>Listen [name],</i>” says Whitney hesitantly, “<i>I reckon I might come across as a bit... distant sometimes, but you know I 'preciate you coming down here to talk all the time, right? I like that a lot. Nobody 'round here is exactly a great conversationalist, and it’s nice to have someone who jus' listens. Particularly if they’re off savin' the world rest of the time.</i>” Slightly taken aback by her sincerity, you say it’s no big deal; you like hanging around the farm with her, too. She smiles broadly at that, and then with a nod of her head invites you to walk with her down to the storage barn. As delicately as you can, you ask her if she left Tel’Adre because of what happened to her husband.");
        outputText("\n\n“<i>Color kinda disappeared from that place for me,</i>” she replies. “<i>Maybe I coulda done what Urta did and used alcohol to make it feel better, but... I dunno. I couldn’t bear the sympathy and I couldn’t bear hanging around the same places he once did. I just wanted to be on my own. So I sold everything I had, used it to buy seed and supplies, then came out here, where I knew there was a ruin of a farm.</i>” She laughs shortly. “<i>'Course I knew. My family used to live here, 'til the demons came. My ma and pa thought they were so dang lucky to get me to Tel’Adre in one piece, and they thought I was so dang crazy to come out here again. Just told em it was something I had to do.</i>” She shakes her head fondly as she throws a knot in the pepper bag’s mouth and then shoves it into the gloom of the barn. “<i>Pa still sometimes comes out here, try’na persuade me to sell up and move back. Sell to who, I tell him? Anyways I think I’m reasonably safe. Demons have got bigger fish to fry these days.</i>” She looks at you with something different in her expression, and it takes you a while to realize what it is - real belief.");
        outputText("\n\nYou say goodbye with a hug and leave with a funny feeling in your gut.");
        doNext(Camp.returnToCampUseOneHour);
        return;
    }*/

    temp = rand(6);
    if (temp == 0) outputText("It doesn't take long to find the independent farmer-girl.<br><br>");
    if (temp == 1) outputText("She's patrolling the edges of her farm with a wicked-looking scythe in hand. She nods to you as you approach and fall in beside her.<br><br>");
    if (temp == 2) outputText("She's bent over in the pepper fields, pulling weeds left and right. She stands up straight to wipe sweat from her fur and muzzle, and she gives you a friendly wave, encouraging you to come over and talk while she works.<br><br>");
    if (temp == 3) outputText("She's behind the barn, working a forge and repairing a few damaged farming tools. Though her attention is focused on the metal on the anvil and the hammer in her hand, Whitney immediately turns and greets you, in between the blows of her hammer.<br><br>");
    if (temp == 4) outputText("She's rounding up a small herd of normal-looking cows. Amazingly she has chosen to do so on foot, but is quick enough to keep up and corral her beasts. Thankfully she's in the process of closing the gate to their pen when you finally catch up to her. Whitney gives you a friendly smile as you come up to her and the two of you begin chatting immediately.<br><br>");
    if (temp == 5) outputText("She's leaning back against a thick tree with a wide-brimmed hat drooped low over her eyes.  You call out to her, thinking the dog-woman has fallen asleep, but her head snaps up and her alert eyes lock on to you immediately. Maybe she wasn't dozing. She calls out, \"<i>Come on over and 'ave a sit, I'm starved fer company!</i>\" You settle in for a chat.<br><br>");
    //[HAVE MILKER THAT ISN'T PLUGGED IN]
    if (rand(4) == 0 && player.hasKeyItem("Breast Milker - Installed At Whitney's Farm") < 0) {
        if (player.hasKeyItem(KeyItems.BreastMilker) >= 0) {
            outputText("Before you can say much of anything, Whitney exclaims, \"<i>My stars! Is that one of them demon's milking machines?</i>\"<br><br>");
            outputText("You nod and tell her how you liberated it from the demonic factory and explain that even though it should be fully functional, it'll need to connect to some other machinery to work, and it's way more than any one person could handle.<br><br>");
            outputText("\"<i>Well of course, it needs hooked into a pump system, collection reservoir, and a power source. It just happens I've got all that equipment set up for my cows in the barn, and I reckon it'd be easier to plug into than a girl sniffing minotaur musk,</i>\" Whitney explains, \"<i>If you like I could get it all set up for ya, hell, I might even toss you a few gems if you can produce enough milk.</i>\"<br><br>");
            //(, hell, if you manage to gather large enough quantities with it, I might be able to find a way to inseminate my cattle with it and be able to pay you for it.  Don't you worry none, I know ways to make this kind of thing work).</i>\"
            outputText("Do you give the breast milker to Whitney for her to hook up?");
            doYesNo(WhitneyScene.whitneyMilkerHookup, WhitneyScene.whitneyMilkerRefusal);
            return;
        }
        else if (player.biggestLactation() >= 2) {
            outputText("Whitney gives you a bemused look when you settle down for a chat.<br><br>");
            outputText("\"<i>Ya might wanna get that looked at darlin',</i>\" she says, gesturing at milky wetness dripping from the front of your " + player.armorDescript("teats") + ".<br><br>");
            if (player.cor < 33) outputText("You blush with shame");
            else if (player.cor <= 66) outputText("You flush with a touch of exhibitionism");
            else outputText("You flush hotly and arch your back, openly displaying your milk to the dog-girl");
            outputText(" as her words sink in.  Runners of milk leak down your " + player.allBreastsDescript() + ", released by the stress of being so exposed.  In no time flat you're soaked in milk.<br><br>");
            outputText("Whitney starts to giggle, but immediately stifles it, apologizing, \"<i>Ah'm sorry, I didn't mean nothing by it. I know a few folks who LOVE being a walking milk-fountain. If ya like, I could probably get you set up with your own milking equipment.  You'd be able to keep up with the... fluid accumulations that seem to be troubling you.  I'd even be able to toss you a few gems if you produce enough.</i>\"<br><br>");
            outputText("It almost sounds too good to be true.  The farmer-girl nods, reading your expression quite clearly, \"<i>Yes, there is a bit of a catch. I'll need 250 gems for the parts to get this all set up.  Equipment like this isn't cheap.  Whaddya say, hun?  I understand if you don't want to – you can always just wait for the milk to stop.</i>\"<br><br>");
            if (player.gems >= 250) {
                outputText("Do you purchase a breast-milker from Whitney for 250 gems?");
                doYesNo(WhitneyScene.breastMilkerPurchase, WhitneyScene.breastMilkerNoPurchase);
            }
            else {
                outputText("You don't have enough money for the milker. You apologize and head back to camp, maybe you can get one later.");
                doNext(Camp.returnToCampUseOneHour);
            }
            return;
        }
    }
    //[HAVE COCK MILKER THAT ISN'T PLUGGED IN]
    if (rand(4) == 0 && player.hasKeyItem(KeyItems.CockMilkerInstalled) < 0 && player.hasKeyItem(KeyItems.CockMilker) >= 0) {
        outputText("Before you can say much of anything, Whitney exclaims, \"<i>My stars! Is that one of them demon's milking machines?</i>\"<br><br>");
        outputText("You nod and tell her how you got it and explain that even though it should be fully functional, it'll need to connect to some other machinery to work, and it's way more than any one person could handle.<br><br>");
        outputText("\"<i>Well of course, it needs hooked into a pump system, collection reservoir, and a power source. It just happens I've got all that equipment set up for my cows in the barn, and I reckon it'd be easier to plug into than a girl sniffing minotaur musk.</i>\" Whitney explains, \"<i>If you like I could get it all set up for ya, hell, if you manage to gather large enough quantities with it, I might be able to find a way to inseminate my cattle with it and pay ya for it. Don't you worry none, I know ways to make this kind of thing work.</i>\"<br><br>");
        outputText("Do you give the cock milker to Whitney for her to hook up?");
        doYesNo(createCallBackFunction(WhitneyScene.whitneyMilkerHookup, false), WhitneyScene.whitneyMilkerRefusal);
        return;
    }
    //[GENERIC TALK]
    outputText("You tell her of your recent trials and tribulations ");
    if (player.cor > 50) outputText("or at least the parts you think she would want to hear ");
    outputText("and she listens attentively, chiming in with witty quips and comfort when appropriate. When you finish she tells you ");
    /*if (!gameFlags[FACTORY_SHUTDOWN] == 2)*/ outputText("how well the farm has been going");
    //else outputText("how poorly the farm has been going since the lake became tainted.  She has to work three times as hard to keep her livestock and crops from succumbing to the taint, and the demons and monsters of the forest are many times more bold");
    outputText(". It feels good to get a chance to talk with another sane individual, but before long Whitney has to return to work, and you should check back on your camp.");
    //+3 int if less than 15, +2 int if less 20, +1 int if less than 30, +.5 int if less than 40.
    if (player.inte < 15) player.modStats("int", 1);
    if (player.inte < 20) player.modStats("int", 1);
    if (player.inte < 30) player.modStats("int", .5);
    if (player.inte < 40) player.modStats("int", .5);
    player.changeLust(-5, false);
    doNext(Camp.returnToCampUseOneHour);
    //+3 int if less than 15, +2 int if less 20, +1 int if less than 30, +.5 int if less than 40.
}

WhitneyScene.breastMilkerPurchase = function() {
    outputText("Whitney takes the gems and leaves with the promise of having your gear set up within the hour. She calls back over her shoulder with a cryptic warning, \"<i>Watch how much time you spend getting milked like an animal, lest you wind up like one.</i>\"", true);
    player.createKeyItem(KeyItems.BreastMilker, 0, 0, 0, 0);
    player.changeGems(-250);
    doNext(Camp.returnToCampUseOneHour);
}

WhitneyScene.breastMilkerNoPurchase = function() {
    outputText("Whitney shrugs and the two of you chat about other things, just passing the time and enjoying a relatively normal chat.", true);
    //+3 int if less than 15, +2 int if less 20, +1 int if less than 30, +.5 int if less than 40.
    if (player.inte < 15) player.modStats("int", 1);
    if (player.inte < 20) player.modStats("int", 1);
    if (player.inte < 30) player.modStats("int", .5);
    if (player.inte < 40) player.modStats("int", .5);
    doNext(Camp.returnToCampUseOneHour);
}

WhitneyScene.centaurToysHoooooo = function() {
    clearOutput();
    //[Places] - [Farm] - [Talk] If PC = Centaur
    outputText("You find the dog-morph Whitney standing in the entrance to her barn, scratching her head with consternation. You approach her and ask what's up.<br><br>");
    outputText("\"<i>Oh, hey there, " + player.name + ",</i>\" Whitney says, leaning heavily on her pitchfork. \"<i>Not much, just trying to figure out... Hey, now!</i>\" she says, eying up your powerful centaur frame. ");
    if (player.cor < 50) outputText("You shift awkwardly and ask her what's wrong.");
    else outputText("You strut a bit, showing yourself off in a subtly lewd manner. When you're finished, you ask the dog-girl if she likes what she saw.");
    outputText("<br><br>");
    outputText("She clears her throat awkwardly. \"<i>Uh, well... A pair of centaurs that lived here the last couple of years ran off, looks like. Gone to get married or something, by the sound of things. So, hey, wanna help me solve a little problem I'm having?</i>\"<br><br>");
    outputText("You shrug. Sure.<br><br>");
    outputText("\"<i>See, the two of them left some rather personal belongings behind,</i>\" Whitney says, swinging the barn door open. Inside, lying in the middle of a stall are what looks like a tall, slender totem with a giant rubber horsecock sticking out of it and a fake mare standing on reinforced wooden legs with a glistening, horsey onahole between its thighs. Oh, my. \"<i>So, " + player.short + ", since you look to have the right build for 'em... they're yours.</i>\"<br><br>");
    outputText("You tell her sure, and spend the next few minutes loading them onto the back of your horse-body. Even if you don't end up using them yourself, you've got plenty of room in camp for them, unlike Whitney. Loaded up with centaur-friendly sex toys, you make your way back to camp.<br><br>");
    outputText("(<b>Key Items Gained: Fake Mare and Centaur Pole</b>)");
    player.createKeyItem(KeyItems.ToyFakeMare,0,0,0,0);
    player.createKeyItem(KeyItems.ToyCentaurPole,0,0,0,0);
    doNext(Camp.returnToCampUseOneHour);
}