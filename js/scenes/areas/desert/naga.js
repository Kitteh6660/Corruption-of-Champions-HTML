NagaScene = [];

addToGameFlags(NAGA_LAST_ENCOUNTERED_AS_NAGA, NAGA_FUCKED_AS_NAGA);

function Naga() {
    //Name and references
    this.a = "the ";
    this.name = "naga";
    this.refName = this.name;
    this.isAre = "is";
    this.heShe = "she";
    this.himHer = "her";
    this.hisHer = "her";
    this.battleDesc = "You are fighting a naga. She resembles a beautiful and slender woman from the waist up, with dark hair hanging down to her neck. Her upper body is deeply tanned, while her lower body is covered with shiny scales, striped in a pattern reminiscent of the dunes around you. Instead of bifurcating into legs, her hips elongate into a snake's body which stretches far out behind her, leaving a long and curving trail in the sand. She's completely naked, with her round C-cup breasts showing in plain sight. In her mouth you can see a pair of sharp, venomous fangs and a long forked tongue moving rapidly as she hisses at you.";

    //Stats
    this.str = 28;
    this.tou = 20;
    this.spe = 35;
    this.inte = 42;
    this.lib = 55;
    this.sens = 55;
    this.cor = 40;
    //Combat stats
    this.HP = this.maxHP();
    this.lust = 30;
    this.fatigue = 0;
    //Advancement
    this.level = 2;
    this.gems = 5 + rand(15);
    //Battle variables
    this.weapon.equipmentName = "fist";
    this.weapon.attack = 3;
    this.weapon.verb = "punch";
    this.armor.equipmentName = "scales";
    this.armor.defense = 5;
    this.lustVuln = 1;

    this.venom = 100;

    //Appearance
    this.tallness = rand(12) + 55;
    this.hipRating = HIP_RATING_CURVY;
    this.buttRating = BUTT_RATING_LARGE;
    this.skinTone = "bronzed";
    this.hairColor = "sandy-blonde";
    this.hairLength = 15;
    //Sexual characteristics
    this.createVagina(false, VAGINA_WETNESS_WET, VAGINA_LOOSENESS_LOOSE);
    this.createBreastRow(Appearance.breastCupInverse("C"));
    this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
    this.ass.analWetness = ANAL_WETNESS_DRY;
    this.createStatusEffect(StatusEffects.BonusACapacity, 10, 0, 0, 0);

    //Drops
    this.clearDrops(); //Need to be called before populating the item arrays.
    //this.addDrop(Items.Consumables.Reptilum, 50);
    //this.addDrop(Items.Consumables.SnakeOil, 40);

    //Victory/defeat
    this.victory = cleanupAfterCombat;
    this.defeat = cleanupAfterCombat;
}
Naga.prototype = new Creature();
Naga.constructor = Naga;

//------------
// COMBAT
//------------
Naga.prototype.doAI = function() {
    switch(rand(4)) {
        case 0:
            if (this.venom >= 25) {
                Naga.nagaPoisonBiteAttack();
            }
            else {
                Naga.attack();
            }
            break;
        case 1:
            Naga.nagaConstrict();
            break;
        case 2:
            Naga.nagaTailWhip();
            break;
        default:
            this.attack();
    }
    combatRoundOver();
}

Naga.nagaPoisonBiteAttack = function() {
    var damage = 0;
    outputText("The naga strikes with the speed of a cobra, sinking her fangs into your flesh! ");
    if (player.findStatusEffect(StatusEffects.Venom) < 0) {
        outputText("The venom's effects are almost instantaneous; your vision begins to blur and it becomes increasingly harder to stand. ");
        if (player.spe > 4) {
            player.spe -= 3;
            player.createStatusEffect(StatusEffects.Venom, VENOM_TYPE_NAGA, 3, 0, 0);
        }
        else {
            player.createStatusEffect(StatusEffects.Venom, VENOM_TYPE_NAGA, 0, 0, 0);
            damage += 5 + rand(5);
        }
        damage += 5 + rand(5);
    }
    else {
        outputText("The venom's effects intensify as your vision begins to blur and it becomes increasingly harder to stand. ");
        if (player.spe > 3) {
            player.spe -= 2;
            player.addStatusValue(StatusEffects.Venom, 2, 2);
        }
        else
            damage += 5 + rand(5);
        damage += 5 + rand(5);
    }
    player.changeHP(-damage, true, false);
    monster.venom -= 25;
    if (monster.venom <= 0) {
        outputText("<b>The naga seems to have exhausted her venom reserves.</b>");
    }
}

Naga.nagaConstrict = function() {
    outputText("The naga draws close and suddenly wraps herself around you, binding you in place! You can't help but feel strangely aroused by the sensation of her scales rubbing against your body. All you can do is struggle as she begins to squeeze tighter! ");
    player.createStatusEffect(StatusEffects.Bind, BIND_TYPE_NAGA, 0, 0, 0);
    /*if (player.findPerk(PerkLib.Juggernaut) < 0 && armorPerk != "Heavy") {
        player.changeHP(-(2+rand(4)), true);
    }*/
}

//2c) Abiliy - Tail Whip - minus ??? HP
//(base it on toughness?)
Naga.nagaTailWhip = function() {
    outputText("The naga tenses and twists herself forcefully.  ");
    //[if evaded]
    if ((player.findPerk(PerkLib.Evade) && rand(6) == 0)) {
        outputText("You see her tail whipping toward you and evade it at the last second. You quickly roll back onto your feet.");
    }
    else if (player.findPerk(PerkLib.Misdirection) >= 0 && rand(100) < 10 && player.armor.equipmentName == "red, high-society bodysuit") {
        outputText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + monster.a + monster.refName + "'s tail-whip.");
    }
    else if (player.spe > rand(300)) {
        outputText("You see her tail whipping toward you and jump out of the way at the last second. You quickly roll back onto your feet.");
    }
    else {
        outputText("Before you can even think, you feel a sharp pain at your side as the naga's tail slams into you and shoves you into the sands. You pick yourself up, wincing at the pain in your side. ");
        var damage = 10;
        if (player.armor.defense < 10) damage += 10 - player.armor.defense;
        damage += rand(3);
        damage = player.changeHP(-damage, true);
    }
}

//------------
// SCENES
//------------
NagaScene.nagaEncounter = function() {
    clearOutput();
    displaySprite("naga");
    if (player.isNaga()) {
        NagaScene.nagaEncounterSex(true);
    }
    else {
        if (gameFlags[NAGA_LAST_ENCOUNTERED_AS_NAGA] == 1) { //Was a naga in last encounter.
            outputText("You walk in the desert for what feels like an eternity, thinking of how much easier it was to move across the sand back when you had a tail, but then you're brought back to reality by a familiar hissing. The identity of your follower is no secret to you. As you open your mouth to greet your naga friend, you find yourself unable to pronounce any words. The girl comes towards you and slithers around in a confused way, trying to communicate. But the sounds that once formed words and phrases now seem to slip through you; all you can do is stand there, unable to grasp what she's trying to tell you. Realizing that you're not who you used to be anymore, she sadly looks down and turns around. The naga slithers away into the distance until she's nothing but a blink on the horizon.");
            gameFlags[NAGA_LAST_ENCOUNTERED_AS_NAGA] = 0;
            doNext(Camp.returnToCampUseOneHour);
        }
        else { //Not a naga.
            outputText("You are walking through the shifting sands of the desert when you hear a sudden hiss behind you.  Expecting to be attacked by a snake, you quickly leap forward and turn around.<br><br>");
            outputText("To your surprise, what you see is not exactly a snake; it's a naga - a half-human half-snake hybrid.  She surges up and hisses even louder than before, showing off a pair of formidable fangs dripping with venom. Gazing at her long and slender reptilian body swaying on the sand like quicksilver, you can only stand still in admiration of this terrible wonder.<br><br>");
            if (gameFlags[CODEX_ENTRY_NAGAS] <= 0) {
                gameFlags[CODEX_ENTRY_NAGAS] = 1;
                outputText("<b>New codex entry unlocked: Nagas!</b>");
            }
            startCombat(new Naga());
        }
    }
}

NagaScene.nagaEncounterSex = function(prompt) {
    if (prompt) {
        clearOutput();
        if (gameFlags[NAGA_LAST_ENCOUNTERED_AS_NAGA] == 0) {
            outputText("You wander into the desert, noting how good the sand feels on your underbelly compared to rocks and dirt. You are wondering to yourself if maybe it wouldn't be a bad idea to come out here more often when you spot something moving a little farther ahead of you.<br><br>");
            outputText("As you get closer, you see that it is the naga that inhabits this dry desert. You stop in your tracks, wondering if it isn't too late to turn and run, when she turns her head and looks straight at you. You slowly tense your hands, ready to raise your " + player.weapon.equipmentName + " as the naga eyes your new snake-like body hungrily. Just before you can ready yourself, the naga opens her mouth. But instead of hissing, you find that you can understand her speech. \"<i>Your new body looks so much better than it did before,</i>\" she says, \"<i>It looks far more... delectable now.</i>\"<br><br>");
            outputText("You wonder how it is that you can understand her now. Perhaps eating and drinking everything you find isn't the greatest idea after all, and as a result you're hallucinating? \"<i>It's been so long since I last saw another of my scaly kin,</i>\" she hisses softly, pulling you out of your introspection. \"<i>I had almost forgotten how good it is to be able to look at the sleek and powerful curves our kind possess. This place can make you forget, if you aren't too careful.</i>\" As strange as it sounds in your head, you are surprised at how she doesn't hold her s's. You aren't quite sure why you thought that would make sense.<br><br>");
            outputText("You relax a little as she slithers over to you, though you're still wary of possibly being attacked despite the bright smile on her face. When she is close enough to you, she surprises you again by draping her arms around your shoulders in a friendly hug and pressing her chest firmly against you. You jump slightly at the sudden embrace, but slowly wrap your arms around her waist and pull her closer to you.<br><br>");
            gameFlags[NAGA_LAST_ENCOUNTERED_AS_NAGA] = 1;
        }
        else {
            outputText("You slide over the hot sand of the desert, enjoying the soft hiss that it makes as your scaled body slides over it. You see a strange yet familiar shape in the distance, and as you approach you realize that it is the naga from before. You quickly slither up behind her and wrap your arms around her. You can feel her tense up momentarily, before recognizing that it's you and turning herself to face you. \"<i>You came back!</i>\" She wraps her arms around your waist and you draw her closer to you.<br><br>");
        }
        outputText("She lets out a soft moan and leans her head forward, pressing her lips against yours. You squeeze her body even more firmly against yours in response, the tips of your tails wrapping around one another. You open your mouth slightly and press your tongue against her lips. She offers no resistance and you begin caressing the inside of her mouth with your tongue, circling her fangs as she uses her own tongue to gently stroke ");
        if (player.faceType == FACE_SNAKE_FANGS) //If player has fangs
            outputText("your own.");
        else //Player has no fangs
            outputText("the inside of your mouth.");
        outputText("<br><br>");
        if (gameFlags[CODEX_ENTRY_NAGAS] <= 0) {
            gameFlags[CODEX_ENTRY_NAGAS] = 1;
            outputText("<b>New codex entry unlocked: Nagas!</b>");
        }
        menu();
        addButton(0, "Sex", NagaScene.nagaEncounterSex, false, null, null, "Embrace the Naga and proceed to have sex.");
        addButton(1, "FIGHT!", NagaScene.nagaEncounterRefusalFight, null, null, null, "Realize what the Naga is doing to you and angrily reject her. This will lead to a fight.");
        return;
    }
    if (player.hasCock && (!player.hasVagina() || rand(2) == 0)) { //Cocks
        //[Player cock is too big]
        if (player.cockArea(0) > 35) {
            outputText("The kiss continues as both of your bodies rub together sensually, your tails continuing to wrap around one another. There is a pulsing in your " + player.cockDescript(0) + " as it starts to grow hard against the naga's soft belly. Feeling this, the naga gently pulls away, slowly letting your tongue out of her mouth as she does so. Her hands make their way over your shoulders, down your abs, and stop at your " + player.multiCockDescriptLight() +".<br><br>");
            outputText("\"<i>You're quite the big boy, aren't you?</i>\" she says as she wraps both of her hands around your now throbbing " + player.cockDescript(0) + ". She starts to slide her hands up and down your length. Sticking out her tongue, she wraps it around the tip and licks at the pre that is starting to leak out.<br><br>");
            outputText("A hiss of pleasure escapes your lips as the naga strokes and licks at your " + player.cockDescript(0) + ", her talented fingers and tongue bringing you into a further state of arousal. The naga stops her caressing and brings your " + player.cockDescript(0) + " to her chest, pressing her breasts around it. She slowly starts to slide her body up and down your shaft, using her tongue to bring some of your pre and lubricate her body. Once she is satisfied with her body's slickness, she quickens her pace.<br><br>");
            outputText("You moan in pleasure as the naga takes the tip of your member into her mouth and starts to suck. You can feel her deft tongue licking every inch of your cock head.<br><br>");
            outputText("At your limit, you let out a yell as you cum into her mouth. ");
            //[lots of jizz]
            if (player.cumQ() > 250) outputText("Her cheeks bulge with the volume and she struggles to swallow as much of it as she can. ");
            //[JIZZOFTHEGODS]
            if (player.cumQ() > 1000) outputText("Her cheeks bulge out with the sheer volume of your cum and she is forced to release you from her mouth to avoid drowning in your seed. ");
            outputText("You collapse onto the sand and lay there, basking in the warm glow of your orgasm. The naga slides onto your chest and gives you a kiss. \"<i>I rather enjoyed that,</i>\" she hisses into your ear, \"<i>We should do this more often.</i>\"<br><br>");
            outputText("She gives you one last kiss before slithering off into the desert. You watch as she leaves and blow her a kiss goodbye before she disappears from your sight.<br><br>");
        }
        //[Cock isn't too big]
        else {
            outputText("The kiss continues and both of your bodies rub together sensually, your tails continuing to wrap around one another. There is a pulsing in your " + player.multiCockDescriptLight() + " as ");
            if (player.cockTotal() == 1) outputText("it starts ");
            else outputText("they start ");
            outputText("to grow hard against the naga's soft belly. Feeling this, the naga gently pulls away, slowly letting your tongue out of her mouth as she does so. Her hands make their way over your shoulders, down your abs, and stop at your " + player.multiCockDescriptLight() + ".<br><br>");
            //[player has one dick]
            if (player.totalCocks() == 1) outputText("Gently she starts to stroke the length of your " + player.cockDescript(0) + " with one hand while circling the tip with the other. ");
            //[player has two dicks]
            if (player.totalCocks() == 2) outputText("She takes one in each of her hands and gently strokes them up and down. Every few seconds she stops at the tip to rub her palms over them. ");
            //[player has three or more dicks]
            if (player.totalCocks() >= 3) outputText("She takes one in each hand, stroking them slowly and making sure to pay attention to the tip. Every so often she switches to a different dick to make sure that each and every one of your throbbing cocks has some love given to them. ");
            outputText("A hiss of pleasure escapes your lips as the naga strokes your " + player.multiCockDescriptLight() + ", her talented fingers bringing you further into a state of arousal. She stops her caress and brings her hand to a scaly covering at her crotch, spreading it wide to reveal her soft pussy.<br><br>");

            //[player has one dick]
            if (player.totalCocks() == 1) outputText("She carefully lines it up with your member and starts to tease the tip before gently inserting the first few inches. ");
            //[player has two dicks]
            if (player.totalCocks() == 2) outputText("She carefully lines it up with both of your members and starts to tease their tips before gently inserting the first few inches. ");
            //[player has three or more dicks]
            if (player.totalCocks() >= 3) outputText("She carefully lines it up with one of your members and starts to tease the tip before gently inserting the first few inches. ");
            outputText("She pulls her hips back slightly before pushing them back down, swallowing a bit more of you into her.  As she pulls back the second time, she shifts her arms to rest on your shoulders and grips your back tightly as she pushes you deeper inside of her.<br><br>");
            outputText("Every thrust brings you deeper inside of her pussy, its soft walls massaging you. It seems like her pussy managed to swallow your entire cock in no time at all. The naga pauses for a moment, your hips pressed together, panting. You shift your arms up a little higher to rest at her waist and lower your head to nuzzle at her neck. The naga leans her head into yours and wraps one of her arms around your head. Once more she pulls back her hips before thrusting them back onto your cock. No longer is she slowly bringing you inside her, now she thrusts herself onto you, going faster and faster. Your tails tighten around each other as you reach climax. A sudden yell escapes your throat as you cum inside of her, your tail squeezing hard enough to crush a lesser being. The naga shudders in your grip as she reaches her own climax. ");
            //[lots of jizz]
            if (player.cumQ() > 250) outputText("You quickly fill her with your seed to the point where she overflows, leaving her pussy dripping with semen afterwards.");
            //[JIZZ, JIZZ EVERYWHERE]
            else if (player.cumQ() > 1000) outputText("Her stomach quickly swells from the sheer volume of seed pumped into her. The sperm that her womb is unable to hold starts to gush out from her stuffed cunt.");

            outputText("<br><br>The two of you lay there for a moment, basking in the warm glow of orgasm. Eventually the naga slowly unwraps her tail from your own and gives you a kiss on the forehead. \"<i>I look forward to our next encounter,</i>\" she whispers softly into your ear before slithering off into the desert.  You watch as she leaves and wave her a kiss goodbye before she disappears from your sight.<br><br>");
        }
        player.orgasm();
    }
    else if (player.hasVagina()) { //Pussies
        outputText("The kiss continues and you can feel your " + player.breastDescript(0) + " pressing against her own. You kiss her harder, pressing your body as close to her as you can, enjoying the feeling of your two bodies entwined together. You wrap your tail around hers, trying to make every part of your body touch every part of hers.  The feeling of her scaled tail rubbing against your body sends shivers of ecstasy down your spine. You pull away from her mouth and move your head to kiss at her neck, ");
        //(if player has fangs)
        if (player.faceType == FACE_SNAKE_FANGS) outputText("carefully nibbling at it so as to not break the skin.  ");
        else outputText("nibbling gently at it.  ");
        outputText("Traveling down, you pause at her collarbone, letting go of her hips to bring your hands up to her perfectly rounded breasts. A moan escapes the naga's lips as you massage her erect nipples. Your mouth continues its trek down the naga's supple body and you make sure to pause on each breast, circling inward and stopping on each nipple to suck gently on them.<br><br>");
        outputText("Once more your hands move down the naga's body, making their way across her sides as your mouth simultaneously kisses at the smooth flesh of her exposed belly. Goose pimples slowly begin to appear, denoting how much she enjoys it. You pause at her hips, hovering over the slit at her crotch. One of your hands slide down to the slit and you start to stroke at it gently as you kiss at the area around it. Your partner shudders a bit, overcome by the sensations. Slowly you slide a finger into her, hearing a gasp of pleasure as you move it around inside her.  ");
        //(if never encountered as a naga)
        if (gameFlags[NAGA_FUCKED_AS_NAGA] == 0) {
            outputText("As you start to unveil her innermost recess, it appears to you that she must have lost the habit of such intimate contact after spending all these years deprived of any contact.  ");
        }
        outputText("You twist your fingers deeper inside of her, feeling the moist walls of her love canal press around your finger. Carefully you move your hand and push another of your fingers inside, then a third, moving them to massage her innermost depths. The naga's whole body is shuddering with arousal at your touch. It would be easy enough to bring her to a climax like this, but you decide that you want to make a slight change to the situation.<br><br>");
        outputText("You slide your fingers out of her and lift yourself up to look into her flushed face. \"<i>N-no,</i>\" she pants. \"<i>Don't stop... So close...</i>\"<br><br>");
        outputText("You place a finger onto her luscious lips. \"<i>Shhhhh,</i>\" you say lovingly. \"<i>All good things must come to an end, but I'm not done yet.</i>\"<br><br>");
        outputText("You untangle the end of your tail from hers and bring it up between the two of you, sliding it between your " + player.breastDescript(0) + " and inserting it sensually into your mouth. You suck on the end, making sure to coat it liberally before bringing it down to the naga's awaiting slit.<br><br>");
        outputText("The tip of your tail slides into her soft folds, eliciting a gasp from her. You press further into her, feeling the walls of her pussy tighten over the length of your improvised shaft. Now that you are free of any length constraints, you decide you can now finish her off with the most intense orgasm she has ever had. Your scaly tail slowly crawls inside the depths of your friend, taking its time to tickle every lump, to tease all the sensitive bits while she grips you with all of her strength. Your friend pulls herself to your body, hugging you tight and squishing her breasts against your own. She wraps her arms around you, and begins to whisper things into your ear, \"<i>P-please... more... deeper...</i>\"<br><br>");
        outputText("You simply run your tongue around her ear, gently nibbling on it as you slowly impale your naga lover on your thick, nimble tail. Her tail whips back and forth across the sand as she slowly succumbs to the intense pleasure of your deep, intimate penetration. You begin to wriggle your own tail inside your naga friend and her response is immediate. First, she shudders as a chill of excitement rushes up her spine. As the sensation overwhelms her, she lets out a wail of satisfaction followed by a series of loud moans in time with your tail's various jerks and twists inside her. As the naga girl begins to climax, driven over the edge by your tail's intense sensations, her tail begins to flick about wildly. In a stroke of genius, you manage to grab the end of her tail, holding it more or less steady against your own " + player.clitDescript() + ". As her tail wiggles back and forth, it drives your " + player.clitDescript() + " insane, rubbing it back and forth over and over again. You prolong your friend's climax by driving your wriggling tail ever deeper inside her and soon you find yourself close to orgasm. As you feel your own climax commence, you clench your teeth and lean against your partner, your breasts mashing together and your juices beginning to intermingle. As you both begin to calm down again, chests heaving, the only thing you can think to do is kiss your partner.<br><br>");
        outputText("She returns your kiss, but while you are distracted she prepares herself to help you in the same way you helped her. She begins to rub her tail along your " + player.vaginaDescript(0) + ", getting it wet. As you feel her scaly member begin to slide inside your own " + player.vaginaDescript(0) + ", the very thought gets you excited. Although somewhat jumpy, she is able to push at a modest rate, slowly inching her tail inside you, very much like the way you did to her. As you continue to passionately kiss each other, your tongues wrapping around one another and your arms wrapped around each other's warm bodies, you cannot think of a better place to be. Soon, you and your partner are tail-fucking each other in unison, your lips never parting, your bodies never separating. The both of you collapse upon the sand, too focused on one another to care about the surroundings.  That is how it carried on for what seemed like a beautiful, passionate eternity. You wake up several hours later, lying on the sand next to your friend, and you can't help but notice how cute she looks asleep. Your tails are still buried within one another, testament to the intensity of your lovemaking. You loved until the both of you collapsed, side by side, juices dripping out into the dry desert sands. You slowly remove your tail from inside her body, and simultaneously pull hers from your " + player.vaginaDescript(0) + ". You kiss her on the cheek, and are just close enough to hear her whisper, \"<i>Will we ever meet again?</i>\"  You lean in close, and whisper a simple \"<i>Yes.</i>\" Then, you leave her to her well-deserved rest, and slowly meander back to your camp, your brain still intoxicated with passion.<br><br>");
        player.cuntChange(30,true,false,true);
        player.orgasm();
    }
    else { //Genderless
        outputText("The naga looks down and suddenly giggles at your stark lack of fun-bits. You turn away in embarrassment and start to head back to your camp.<br><br>");
        outputText("\"<i>Wait,</i>\" the naga reaches out and places a hand on your shoulder. \"<i>I didn't mean to insult you. I've never seen anyone else quite like you.</i>\" She slides her hand down your body. \"<i>I wonder if you can show me just what a body like yours can do.</i>\"<br><br>");
        outputText("Enjoying this new shift in the conversation, you coil around her and position your head over the scaly covering over her pussy. A soft hiss escapes the naga as you slide your tongue into her, twirling it around to caress every inch of her. Her hands make their way to your head and press you deeper into her.<br><br>");
        //(If tongue is forked)
        //9999 - BLAH!
        if (player.hasLongTongue()) outputText("You move your tongue faster and deeper into her pussy, your forked tongue reaching deeper than any human tongue ever could.  ");
        //(Otherwise)
        else outputText("You move your tongue faster and faster into her pussy, reaching as far in as you possibly can.  ");
        outputText("The naga grips your head tightly to her and suddenly thrusts her hips in orgasm, her girl cum coating your tongue and mouth.<br><br>");
        outputText("You uncoil yourself and slowly gather your things, the naga lying on the sand panting.<br><br>");
        outputText("\"<i>We should do this more often,</i>\" she says before you head off.<br><br>");
        player.changeLust(player.lib / 5, false);
    }
    outputText("You think it would be a very good idea to come to the desert more often.");
    doNext(Camp.returnToCampUseOneHour);
}

NagaScene.nagaEncounterRefusalFight = function() {
    clearOutput();
    outputText("You shake your head and realize what the Naga is doing to you. You shove her and raise your " + player.weapon.equipmentName + ". It's time to fight her!");
    startCombat(new Naga());
}
