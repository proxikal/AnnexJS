import "robocop/functions.js";
var msg = Instance;
var work = false;
msg.Author.Bot ? (work = false) : (work = true)

if(work == true) {
	var Bot = new System();
	// Options
	Bot.maxStrikes = 3;
	Bot.maxMentions = 1;

	// For example purposes i've set the maxPunishment to warn.
	Bot.minPunishment = "warn"; // warn, kick or ban.
	Bot.maxPunishment = "warn"; // warn, kick or ban.

	// Don't want the bot to delete the messages that have the offensive words? Comment out below!
	Bot.msgDelete = true;

	// Punishment Messages
	Bot.warnMessage = "You have been warned <@" + msg.Author.ID + ">";
	Bot.kickMessage = msg.Author.Username + " has been kicked for having maximum strikes.";
	Bot.banMessage = msg.Author.Username + " has been banned for having maximum strikes.";

	// The bot will not warn, kick or ban anyone from these roles.
	var isSafe = false;
	var safeRoles = [
		"Role Name Here",
		"Another Role Here!"
	];

	if(safeRoles.length > 0) {
		for(i = 0; i < safeRoles.length; i++) {
			if(MemberHasRole(msg.Author.ID, safeRoles[i])) {
				isSafe = true;
			}
		}
	}

	if(isSafe == false) {
		// Don't want a word filter enabled? Comment out below!
		Bot.EnableWordFilter();
		// Don't want a name filter enabled? Comment out below!
		Bot.EnableNameFilter();
		// Don't want a mention limiter per message? comment out below!
		Bot.mentionLimiter();
	}
}
