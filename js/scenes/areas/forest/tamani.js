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

//WIN
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

// Victory Menu
TamaniScene.tamaniVictoryMenu = function() {
    gameFlags[TAMANI_DEFEAT_COUNTER]++;
    if (player.lust >= 33 && player.totalCocks() > 0 && gameFlags[SFW_MODE] <= 0) {
        outputText(" You could fuck her, but if that's the case why did you bother fighting her?");
        outputText("\n\nWhat do you do to her?");
        menu();
        addButton(0, "Fuck", TamaniScene.tamaniSexWon);
        if (player.cockThatFits(monster.analCapacity()) >= 0) addButton(1, "Buttfuck", TamaniScene.tamaniAnalSex);
        else addButtonDisabled(1, "Buttfuck", player.cockTotal() == 1 ? "Your cock is too big to fit in Tamani's ass." : "None of your cocks will fit in Tamani's ass.");
        //if (!getGame().forest.tamaniScene.pregnancy.isPregnant && player.canOvipositSpider()) addButton(2, "Lay Eggs", tamaniBeaten); //NOT PREGGERS //TODO Add After Pregnancy
        if (gameFlags[TAMANI_DEFEAT_COUNTER] >= 4 && monster.HP <= 0) addButton(3, "NO MORE!", TamaniScene.killTamaniChoice);
        addButton(4, "Leave", cleanupAfterCombat);
    }
    else {
        if (gameFlags[TAMANI_DEFEAT_COUNTER] >= 4 && monster.HP <= 0) {
            outputText(" If you're tired of Tamani trying to force herself upon you, you could resolve to not see her again.");
            addButton(3, "NO MORE!", TamaniScene.killTamaniChoice);
            addButton(4, "Leave", cleanupAfterCombat);
        }
        else {
            cleanupAfterCombat();
        }
    }
};

//Fuck Tamani
TamaniScene.tamaniSexWon = function() {
    //spriteSelect(56); TODO Sprite
    //tamaniKnockUp(); TODO Pregnancy
    var x:Number = player.cockThatFits(90);
    if (x == -1) x = player.biggestCockIndex();
    clearOutput();
    if (player.cockArea(x) <= 90) {
        outputText("You grab hold of the insensate goblin by her pink-dyed hair and shove her into the mud, irritated with her constant demands and rape attempts.  The horny slut doesn't even have the grace to be ashamed of her defeat.  She just lies in the mud, wiggling her exposed ass back and forth in the air, trying to tempt you with it.\n\n", false);
        outputText("It's too tempting of a target to resist.  You open your " + player.armor.equipmentName + " and allow your " + player.multiCockDescriptLight() + " to flop free.  You're already hard from the enticing display, and in a moment you're pressing against her lust-slicked pussy", false);
        if (player.totalCocks() > 1) outputText(" and tight asshole", false);
        outputText(".  You don't allow her any say in the matter, pushing forward as you feel the small girl's flesh yield around ", false);
        if (player.totalCocks() > 1) outputText("each of ", false);
        outputText("your girth", false);
        if (player.totalCocks() > 1) outputText("s", false);
        outputText(".  She squeals happily, clearly getting what she desires.  For a moment you feel disappointed in yourself, but the sensations of her tight hole", false);
        if (player.totalCocks() > 1) outputText("s", false);
        outputText(" clenching and squeezing around you quickly washes it away.\n\n", false);

        outputText("You rock back and forth methodically, treating Tamani like a tight cock-sleeve.  The goblin slut's hands rub her belly, not even attempting to pull her face out of the mud as she moans and giggles like a whore.  You keep working her cunt like a ", false);
        if (player.gender == 1) outputText("man", false);
        else outputText("herm", false);
        outputText(" possessed, sawing in and out with brutal efficiency, the wet squelches of the slut's juices driving you to piston back and forth with even greater force.  She gurgles happily, her ", false);
        if (player.totalCocks() == 1) outputText("pussy squeezing tightly as she cums hard.\n\n", false);
        else outputText("holes squeezing tightly as she cums hard.\n\n", false);

        if (player.totalCocks() > 1) {
            outputText("Each of your " + player.multiCockDescriptLight() + " pulsates, spasming inside your goblin-flesh prison, spraying a bit of sticky goo into the happy slut.   You can hear her babbling, pleasure-drunk as she quivers around you, \"<i>Fuck yes! Cu-ah-ahm in me!  Fuck fuckfuckfucKFUCKYEAH!  Oooh, that's it, put me in the dirt and show me who's boss!</i>\"  The words seem to have the desired effect, helping you empty every ounce of cock-cream into the slut's tight holes.", false);
            if (player.cumQ() >= 250) outputText("  She pants, turning her head in the mud to watch as her belly visibly inflates, stuffed totally full of cum. ", false);
            if (player.cumQ() >= 500) outputText("  In no time at all a river of jism pours from her, pooling below as you overwhelm her body's capacity to store spunk.", false);
        }
        else {
            outputText("Your " + player.multiCockDescriptLight() + " pulsates, spasming inside your goblin-flesh prison, spraying a bit of sticky goo into the happy slut.   You can hear her babbling, pleasure-drunk as she quivers around you, \"<i>Fuck yes! Cu-ah-ahm in me!  Fuck fuckfuckfucKFUCKYEAH!  Oooh, that's it, put me in the dirt and show me who's boss!</i>\"  The words seem to have the desired effect, helping you empty every ounce of cock-cream into the slut's tight hole.", false);
            if (player.cumQ() >= 250) outputText("  She pants, turning her head in the mud to watch as her belly visibly inflates, stuffed totally full of cum. ", false);
            if (player.cumQ() >= 500) outputText("  In no time at all a river of jism pours from her, pooling below as you overwhelm her body's capacity to store spunk.", false);
        }
        outputText("\n\nTamani winks, sucking on her finger as she staggers up.  She coos, \"<i>Mmmm, Tamani loves it when her " + player.mf("sexy lover","stud") + " dominates her.  Do you think your ", false);
        if (player.balls > 0) outputText("sexy balls have ", false);
        else outputText("sweet cock has ", false);
        outputText("any more cream to give to me?</i>\"\n\n", false);
        outputText("She doesn't give you a chance to answer as she wobbles off, jiggling pleasantly in all the right places, \"<i>Of course you do.  I'll be back for the rest later!</i>\"\n\n", false);
        player.orgasm();
        if (inCombat()) cleanupAfterCombat(); //TODO TEST THIS
        else doNext(Camp.returnToCampUseOneHour);
    }
    //Too big? Jerk off with feet and bukkake
    else {
        outputText("You throw Tamani on her back, too drunk on desire to care how it feels for the tiny slut.  There's no way she could ever take ", false);
        if (player.totalCocks() > 1) outputText("any of your massive members", false);
        else outputText("your massive member", false);
        outputText(", so you grab her by the ankles and wrap her soft-soled feet about yourself.   You start jerking yourself off, using Tamani as a cute but expendable masturbation aid.  She chews a fingernail and massages her " + tamaniChest() + " as she watches you, doing her best to put on a show.  The little slut seems to like it.\n\n", false);
        outputText("Her feet start to grow slick with your sweat and pre-cum, sliding effortlessly along the length of your shaft as you continue to bring yourself towards orgasm.  You watch while Tamani dips her fingers into the slick folds of her hungry cunt, getting off on being used in such a perverse manner.  She coos, \"<i>How do my feet feel " + player.mf("stud","slut") + "?  Are they soft and slick when they slide on your cock?  Are you going to cum for Tamani and paint her white?  You are.  You know you are.  Cum for Tamani.</i>\"\n\n", false);

        outputText("Oh gods, you are... it'd be so easy to just release all over her tight little body, soaking her in cum from head to toe.  You know she'd like it.  Hell, you'd like it, but you want to make her wait.   Your hands keep sliding and squeezing, jerking her now-slippery soles with faster and faster strokes.  Holding back is TOO hard!  You need to release – the little slut's words ring true as you squeeze tightly, feeling warmth building in your crotch as your body begins to climax.\n\n", false);

        outputText("Tamani licks her lips and pushes with her legs, assisting you as you milk yourself with her feet, squeezing out the first jet of hot goblin-treat.   It spatters over the green girl's forehead, running into her pink highlights.  She opens wide, craning up to catch the next blast of salty seed in her dirty lipstick-coated mouth.   Swallowing like a pro, she leans up further, letting you coat her tits with cream.", false);
        if (player.cumQ() >= 250) outputText("  You continue working your " + player.cockDescript(x) + " with her supple feet, watching your dripping spooge froth and bubble as you continue to pump more onto the sassy wench.", false);
        if (player.cumQ() >= 500) outputText("  She sputters, blowing some of the caked up semen off her face so she can breathe.  The slut gathers up the goopy mess as you continue to paint her, alternatively devouring it with her mouth and shoveling drippy handfuls into her eager cunt.", false);
        outputText("\n\n", false);

        outputText("Tamani winks, blinking the cum out of an eye as you finish up, releasing her seed-covered form.  She coos, \"<i>Mmmm, Tamani loves it when you dominate her, " + player.mf("stud","sexy") + ".  Do you think your ", false);
        if (player.balls > 0) outputText("sexy balls have ", false);
        else outputText("sweet cock has", false);
        outputText("has any more cream to give to me?</i>\"\n\n", false);

        outputText("She doesn't give you a chance to answer as she staggers up and strikes a sexy pose, \"<i>Of course you do.  I'll be back for the rest later!</i>\"\n\n", false);

        outputText("Tamani wiggles in the sexiest way as she leaves, arousing your body all over again...", false);
        player.orgasm(); //TODO Test Position
        player.changeLust(35);
        if (inCombat()) cleanupAfterCombat(); //TODO Test This
        else doNext(Camp.returnToCampUseOneHour);
    }
};

//Fuck Tamani Anal
TamaniScene.tamaniAnalSex = function() {
    //spriteSelect(56); TODO Sprite
    var x = player.cockThatFits(monster.analCapacity());
    clearOutput();
    outputText("You grab hold of the insensate goblin by her pink-dyed hair and shove her into the mud, irritated with her constant demands and rape attempts.  The horny slut doesn't even have the grace to be ashamed of her defeat.  She just lies in the mud, wiggling her exposed ass back and forth in the air, trying to tempt you with it.\n\n", false);

    outputText("It's too tempting of a target to resist.  You open your " + player.armor.equipmentName + " and allow your prick to flop free.  You're already hard from the enticing display, and unable to resist any longer, you grab her hips and pull her plump ass up towards you.  She gasps as she's dragged along the ground and tries to crane her neck to face you.  \"<i>H-hey stud,</i>\" Tamani stammers, suddenly nervous, \"<i>you aren't thinking of-</i>\" You pull her close and press the tip of your " + player.cockDescript(x) + " against her tight asshole.  \"<i>HEY!</i>\" she shouts back, glaring threateningly at you.  \"<i>You better not, I need that baby batter in my womb, not my ass!</i>\"\n\n", false);

    outputText("Your menacing grin betrays no pity for the goblin, though.  You slowly press into her, her face contorting in pain as the tightness of her ass envelops you.  She grunts, hands clenched into tight fists as you bottom out in her.  \"<i>Please,</i>\" she begs, her eyes watering in pain and frustration, \"<i>I need you in my cunt! It... I don't want- oof!</i>\"  You start pumping your shaft forcefully in and out of her, slamming her full cheeks against you with every thrust.  You can tell from the way she feels around you that she's not very experienced with this way of doing things.\n\n", false);

    outputText("The more your " + player.cockDescript(x) + " stretches her tight anus, though, the more comfortable she seems to get with it.  She still protests weakly between grunts, but every once in a while a moan bursts from her, and the passion in them tells you that she's starting to like this.  Eventually she relaxes in your grip, resigning herself to letting you abuse her ass like it's a cheap toy.  One of her hands even sneaks up to her wet snatch and dips in.  Her hips start to move a bit without your influence, too, bouncing back and forth and you ram into her harder and harder.  Clearly she likes the feeling, even if she knows she won't get pregnant from it.\n\n", false);

    outputText("The slutty creature's moans turn to shouts as the sensation overwhelms her, and she bucks wildly back against you, face still in the dirt and tongue lolling out of her mouth.  \"<i>Oh, fuck yes, harder, HARDER!</i>\" she bursts forth wildly.  You oblige and pick up the intensity, absolutely ravaging her tight ass now with the motions of your " + player.cockDescript(x) + ".  She squeals somewhere down below you as her face is ground against the mud.  You rock her whole body back and forth as you slam into her, reveling in the feeling of her tight ass squeezing your cock as you slide inches in and out of her.\n\n", false);

    outputText("You can feel the cum building up inside you, and you know that you won't be able to hold out much longer.  Looking down, you can see that Tamani isn't far from orgasm, either.  Her fingers slip rapidly in and out of her cunt, and the look on her face is one of thoughtless bliss.  She shudders and goes limp in your grasp just as you cum, painting the insides of her ass with your semen.  Her eyes are still rolled up into the back of her head as you pull your softening prick out of her ass.  You drop her, letting her legs fall back to the ground with a dull thud.  She turns over onto her side, looking up at you.  Between exhausted pants, she manages to say, \"<i>Don't... think that I... enjoyed that... or anything... I'll be back for you, and you better not...</i>\" before she passes out.  You shake your head and laugh at the stubborn little slut as you tuck " + player.sMultiCockDesc() + " back into your " + player.armor.equipmentName + " and head back to your camp.", false);

    player.orgasm();
    cleanupAfterCombat();
};

//Kill Tamani Choice - Silly Mode and Normal Mode options
TamaniScene.killTamaniChoice = function() {
    clearOutput();
    outputText("Tamani has really gotten to your nerves and you tire of her forcing herself upon you. You kick Tamani once and she writhes in pain. \"<i>Guess you don't want me anymore?</i>\" Tamani sniffles.");
    outputText("");
    menu();
    if (silly()) {
        addButton(0, "FIGHT", TamaniScene.killTamani);
        addButton(1, "MERCY", TamaniScene.spareTamani);
    }
    else {
        addButton(0, "Kill Her", TamaniScene.killTamani);
        addButton(1, "Spare Her", TamaniScene.spareTamani);
    }
};

//Choose to kill Tamani - no difference in Silly or Normal mode
TamaniScene.killTamani = function() {
    clearOutput();
    outputText("You step over and grab her head. \"<i>NO!</i>\" Tamani cries out. You tell her that she shouldn't have forced herself upon you. You snap her neck and set her lifeless body on the ground.");
    gameFlags[TAMANI_BAD_ENDED] = 1;
    TamaniScene.postTamaniRemoval();
};

//Choose to spare Tamani - no difference in Silly or Normal mode
TamaniScene.spareTamani = function() {
    clearOutput();
    outputText("You tell her that should she ever cross paths again, she's going to have a really bad time. \"<i>Yes...</i>\" Tamani sniffles, tears welling up in her face. She gets up and leaves her satchel on the ground before running into the foliage, never to be seen again.");
    gameFlags[TAMANI_BAD_ENDED] = 0.5;
    TamaniScene.postTamaniRemoval();
}

//Clean up Tamani leaving, Gain Tamani's satchel
TamaniScene.postTamaniRemoval = function() {
    outputText("\n\nWith Tamani no more, you take her satchel and return to your camp.");
    monster.XP += 100; //Gain more XP as Tamani's removed from the game.
    player.createKeyItem("Tamani's Satchel", 2, 1, 1, 100); // GAIN SATCHEL
    //if (pregnancy.isPregnant) pregnancy.knockUpForce(); //Clear Tamani Pregnancy. TODO PREGNANCY
    cleanupAfterCombat();
}

//LOSE
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
};

//Normal Loss Scene
TamaniScene.tamaniSexLost = function() {
    //spriteSelect(56); TODO SPRITE
    //tamaniKnockUp(); TODO Pregnancy
    clearOutput();
    outputText("Tamani gives you a knowing smile as you ", false);
    if (player.HP < 1) outputText("lie there, unable to fight back.  ", false);
    else outputText("touch yourself, giving in to the tiny goblin's desire to breed.  ", false);
    outputText("She advances, her bare feet padding across the soil as she rummages in a faded leather pouch for something.  Her eyes light up as she finds whatever it is she was looking for.  In her hand is a ribbed silver ring, covered on every surface with numerous carved runes.  You whimper and back up, knowing she intends to fit it over your " + player.cockDescript(0) + ", but Tamani only 'tsks' and shakes her head.\n\n", false);
    outputText("\"<i>You were such a naughty boy, teasing me with that juicy dick and then pretending like you didn't want this.  I'll have to punish you for being bad, that's all there is to it,</i>\" she explains, pushing your hands away and fitting the ring around your flare.  ", false);
    if (player.cocks[0].cockThickness >= 5) outputText("Impossibly, despite your titanic girth, the ring somehow expands to squeeze onto you, though it's painfully tight.\n\n", false);
    else outputText("Somehow the ring fits onto you perfectly, as if it was made exactly for your " + player.cockDescript(0) + ", though it remains painfully tight.\n\n", false);
    outputText("\"<i>Don't fret, " + player.mf("stud","hun") + ".  I'll still let you get off after I feel you've learned your lesson,</i>\" she offers, pulling up a large empty milk-bottle in her other hand.  \"<i>Of course I'll need to collect some for myself,</i>\" she says, \"<i>Since you played hard to get, you'll have to miss out on the feel of my juicy snatch!</i>\"  At the mere mention your eyes lock between her legs, zeroing in on her puffy engorged labia.  Why didn't you just submit right away and let her have your cum?\n\n", false);
    outputText("She forces the ring down your entire length, not stopping until it bottoms out against the flesh of your groin.  In response, the obviously magical ring cinches even tighter and begins a slow vibration, providing pleasure but denying you the ability to orgasm.  Tamani wraps a single hand around your tight tender shaft, squeezing and pulling, using discomfort to guide you up onto your hands and knees.  She eases up on the pressure, allowing you a bit of pleasure once she has you where she wants you.  You look down between your arms ", false);
    if (player.biggestTitSize() >= 6) outputText("but can't manage to see your bloated prick past the wall of titflesh.\n\n", false);
    else outputText("at your bloated prick, looking almost overinflated from all the blood that tight ring has forced into it.\n\n", false);
    outputText("<b>*SMACK*</b>  Tamani's hand cracks against your " + player.buttDescript() + " making you lurch and bite back a cry of pain.   \"<i>Bad boys get punished!</i>\" she yells as she brings her hand down again, slapping your other cheek.  You're sure there must be two tiny red hand-prints forming already. The kinetic impacts of her blows vibrate through your hips, traveling into your sensitive " + player.cockDescript(0) + " and working with the magic-ring to spread equal measures of pain and pleasure through its length.\n\n", false);
    outputText("The spanking doesn't let up until your ass is cherry-red and tender.  Tamani gently pats it, making you wince in displeasure, and giggles, pleased with herself, \"<i>Hehe, do you think I've punished you enough?  I'm sure you do, but what I really want to know is – have you learned your lesson?  I need to make sure you'll be a good boy and jump right into my honeypot next time I ask.  I hate wasting time fighting when we could be making love and breeding.</i>\"\n\n", false);
    outputText("Tamani pours oil over your abused backside, letting it soak in and start to numb the pain.  She pours quite a different type of oil into her hands and starts massaging you, letting the alchemical mixture make your skin tingle and enhance the sensation of pleasure while numbing away the pain of your cock being kept so... tightly bound.  Your arms and " + player.legs() + " tremble from supporting yourself at such an awkward angle, struggling not to relax at the sudden influx of pleasure.  The feelings bring you to the edge, and you feel your body's internal muscles clenching, but the tight vibrating ring blocks your cum and your orgasm, leaving you backed up and desperate.\n\n", false);
    outputText("Your goblin mistress ", false);
    if (player.balls > 0) outputText("cups your " + player.ballsDescriptLight() + " tightly", false);
    else outputText("caresses you around the ring", false);
    outputText(" and asks, \"<i>So are you sorry for making me wait for my cream " + player.mf("stud","slut") + "?  If you are, just say <b>I'm sorry mistress Tamani, please milk my cock whenever you want</b> and then beg me to cum.</i>\"\n\n", false);
    outputText("You NEED to cum.  Her hands... they keep stroking you, and each time your body begins to orgasm it's held back, trapped within you painfully.  ", false);
    if (player.balls > 0) outputText("Your balls are getting VERY swollen and tender.", false);
    else outputText("Your body aches inside, feeling bloated and ready to pop.", false);
    if (player.cor < 50) outputText("  You have no choice, you'll say what she wants you to say.\n\n", false);
    else outputText("  Being denied like this was kind of fun, but you REALLY need to get off now, so you'll say what she wants you to say.\n\n", false);

    outputText("\"<i>Mistress Tamani, I'm so sorry!  Milk my cock dry any time you want!  Puhleeeeeaaaaase let me cum!  Please, I'm so fucking horny, I'll do what you want, just give me release!</i>\" you beg, ", false);
    if (player.cor > 50) outputText("blushing hotly and doing your best to look like a submissive toy.\n\n", false);
    else outputText("blushing in shame and embarrassment, but meaning every word.\n\n", false);

    outputText("She takes the empty bottle and presses it against your " + player.cockHead() + ", caressing your length with loving affection with her free hand as she replies, \"<i>Not exactly what I told you to say, but it DID sound heartfelt.  Let's let out all that backed up cum now, hrmmm?</i>\"   Her free hand touches the ring and you feel the pressure relax a bit - still tight enough to keep you beyond-hard, but loose enough for you to cum.  She strokes and squeezes as your blocked orgasms slowly flow into the bottle, smiling as it thickens and begins spurting as pleasure overtakes you.  You hold yourself on all fours, red-assed and submissive as your goblin mistress milks you of the last of your cum.", false);
    if (player.cumQ() >= 250) outputText("  The bottle quickly overflows, but Tamani happily sets it aside and slides her own cunt under you, letting you pump the rest of your seed into her fertile womb.", false);
    if (player.cumQ() >= 500) outputText("  She coos happily when you still manage to pump enough jism into her to bloat her belly, but even with your impressive fertility, the orgasm has to end.", false);
    outputText("\n\n", false);

    outputText("Tamani removes the ring once you have finished.  She seals the bottle and places it in her pouch as you drop to the ground, exhausted.  All you can do is watch as she walks away, her ass swaying confidently from side to side.  Your last thought before you pass out is how much easier it would've been to just fuck her.", false);
    player.orgasm();
    player.dynStats("lib", .5, "sen", -1, "cor", .5);
    cleanupAfterCombat();
};

//Submissive Loss Scene
TamaniScene.tamaniSexLetHer = function() {

};

//-------
// ENCOUNTERS
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
        // TODO Switch Block After Tamani Pregnancy is Complete
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

//Male - Repeat Encounters
TamaniScene.tamaniMaleRepeatEncounter = function() {
    //spriteSelect(56); TODO SPRITE
    clearOutput();
    //(IF FUCKED - check to see if she's pregnant or has given birth)
    //TODO PREGNANCY LINE BELOW
    /// /if (pregnancy.isPregnant || flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] > 0) outputText("While exploring, you're startled by the feeling of tiny hands stroking the insides of your thighs.  You look down and find Tamani there, grinning wolfishly,  \"<i>Ready for another fuck, big " + player.mf("boy", "girl") + "?\"\n\n", false);
    // Else check for hypnoslut scene (large hypnosis number, then 50% chance)
    else outputText("While exploring, you're startled by the feeling of tiny hands stroking the insides of your thighs.  You look down and find Tamani the goblin there, grinning with desire, \"<i>Ready to stuff me with cum?  I'm not taking no for an answer this time.</i>\"\n\n", false);
    if (gameFlags[TAMANI_TIMES_HYPNOTIZED] > 19 && rand(2) == 0) {
        TamaniScene.getRapedByTamaniYouHypnoSlut();
        return;
    }
    //(+1 lust per 10 sensitivity)
    player.changeLust(player.sens/10);
    //[Take Her – win sex]
    //[Let Her – Get dommed]
    //[No – starts fight]
    menu();
    addButton(0, "Take Her", TamaniScene.tamaniSexWon);
    addButton(1, "Let Her", TamaniScene.tamaniSexLetHer);
    addButton(2, "No", TamaniScene.tamaniStartFight);
};

// Starts Tamani Fight
TamaniScene.tamaniStartFight = function() {
    clearOutput();
    outputText("Tamani adopts a fighting pose and says, \"<i>If I have to I'll beat my children out of you!</b>\"");
    startCombat(new Tamani());
};



//--------
// Tamani misc functions
//--------



TamaniScene.tamaniChest = function() {
 outputText("chest");
 return;
};