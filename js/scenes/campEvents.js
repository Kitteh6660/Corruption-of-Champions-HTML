//----------
// Created by Matraia on 7/20/16.
//
// Holds non-pregnancy related player events
//----------

CampEvents = [];

CampEvents.checkEvents = function() {
    // Slime bad end, not enough fluids 
    if (gameFlags[SLIME_CRAVING] >= 18 && player.str <= 1) {
     CampEvents.slimeBadEnd();
         return;
     }
};


CampEvents.slimeBadEnd = function() { //Another gooey bad end; you should have drunk more fluids
    outputText("<br>Your entire body wobbles as your strength fails, collapsing into itself.  You struggle to rise, but your form loses more and more rigidity, melting into an amorphous blob.  Without the strength to rise, you've no hope of getting the fluids you need.  The aching craving for moisture drives you to roll to the lake, which you slip into.  With the constant runoff of bodily fluids that enter the lake, you're able to subsist for a time, forgetting about your mission as the all-consuming need devours your personality.");
    doNext(CampEvents.slimeBadEnd2);
};

CampEvents.slimeBadEnd2 = function() {
    clearOutput();
    outputText("One year later...");
    outputText("<br><br>The new champion has managed to escape imprisonment in the demons' sick plots, but the monsters and trials of this land have taken their toll on him.  He undresses and slips into the water, hesitant around his newly enlarged member, but once he slips beneath the soothing waters he forgets all about it and just relaxes.");
    outputText("<br><br>His reprieve is rudely interrupted as something thick and viscous wraps around his legs, gripping them with vicelike tightness.  He kicks futilely, accomplishing nothing but making the once-champion's goopy body jiggle as it slowly envelops more and more of the young man.  Suspended so that his head barely breaks the surface of the water, his entire body is wrapped up in more and more of the slime.  It curls around his member, slick and moist, gently massaging away his desire to resist.  The new champion relaxes and accepts it, twitching as the slime manages to caress a particularly tender spot.");
    outputText("<br><br>Though the situation is incredibly pleasurable to both parties, the slime is merely following its instincts and seeking to fulfill its never ending craving.  For his part, the champion resisted admirably, though perhaps he simply had a high sexual endurance.  Whatever the case, this male doesn't last too long.  His altered sexuality easily accommodates the creature's desires, filling it with spurt after spurt of creamy whiteness, making it stronger for the first time in a long time.  It does not release him once his orgasm concludes.  It milks him again, and again, and again until the champion is unconscious, cradled in the slime's sloppy embrace.");
    outputText("<br><br>Filled with new-found vigor, the slime travels up the beach, still holding its captive trapped inside it.  Its body shifts as a half-remembered humanoid form grows out from the blob's surface.  The new body is a parody of its former self, with sexually distorted features and jiggling, globe-like breasts.  It presses the captive's lips against a nipple, allowing him to suckle down a bit of her essence.  He does so instinctively – his parched body seeking relief from the orgasm-induced dehydration afflicting him.");
    outputText("<br><br>In a few hours he awakens, still entirely trapped by the wet-dream of a slime-girl.  His belly is full of her nutritious and corruptive slime, and his cock feels bigger and more sensitive than ever inside her tight embrace.  She squeezes and milks it, gurgling happily.  He cums for her.  Again and again he cums for her.  He can't stop or resist the feeling she gives him as he helplessly orgasms over and over.  She milks him forever, growing stronger, feeding him slime, and gathering incubi drafts and succubi's delight to satiate her ever-growing needs.");
    outputText("<br><br>Every year thereafter the new champion is greeted with a slippery prison, forced to orgasm and feed the slime-queen for the rest of their natural life.  Most of them stop minding by the second day, too drunk on her breast-milk and all the drugs she's mixed into it.");
    gameOver();
};
