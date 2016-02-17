Time = [];
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
	for (i = 0; i < minutes; i++) {
		Time.increment();
	}
}
Time.advanceHours = function(hours) {
	Time.advanceMinutes(hours * 60);
}