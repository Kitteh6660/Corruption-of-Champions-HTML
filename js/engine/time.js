// These functions handle changing the clock.
// Right now there is no day counter.

Time = [];

// Global array for loading in pregnancies and other things that are time sensitive.
var timeAware = [];

Time.increment = function() {
	time.minutes++;
	if (time.minutes >= 60) {
		time.minutes -= 60;
		time.hours++;
	}
	if (time.hours >= 24) {
		time.hours -= 24;
		time.days++;
	}
}


Time.advanceMinutes = function(minutes) {
	if (timeAware.length > 0) { // If there's a function in timeAware
		for (i = 0; i < timeAware.length; i++) {
			timeAware[i].advanceTime(minutes);

		}
		for (i = 0; i < minutes; i++) {
			Time.increment();
		}
	}
}

	Time.advanceHours = function (hours) {
		//Feed the number of hours through a for loop and force advancement code
		if (timeAware.length > 0) { // If there's a function in timeAware
			for (i = 1; i < timeAware.length; i++) {
				timeAware[i].advanceTime(hours * 60);
				}
		}
        // Then advance the display clock
		Time.advanceMinutes(hours * 60);
    }
