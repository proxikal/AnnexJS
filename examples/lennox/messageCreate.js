// Load up some useful string and number prototypes.
import "lennox/inc/prototypes.js";
// Initiate the System Framework.
import "lennox/inc/framework.js";
// Register Bot Commands.
import "lennox/inc/cmdRegistry.js";

// pass check for the system.
var pass = true;
Exists("lennox/data/blacklist.json") ? (Bot.Blacklist = JSON.parse(OpenFile("lennox/data/blacklist.json"))) : (void 0)
// Check if the user is a Bot Commander.
msg.Author.ID.isMaster("Management") ? (Bot.Botmaster = true) : (Bot.Botmaster = false)
// Check for private channels.
!Bot.AllowPM && Bot.isPrivate() ? (pass = false) : (pass = true)
// Check if the user is a bot. If so than don't work.
// If you want this bot to react to other bots you can comment out the line below.
msg.Author.Bot ? (pass = false) : (pass = true)
// Check to see if the user has been Blacklisted from using this bot.
if(Bot.Blacklist.length > 0) {
	for(i = 0; i < Bot.Blacklist.length; i++) {
		if(Bot.Blacklist[i] == msg.Author.ID) {
			pass = false;
		}
	}
}

if(pass) {
	// ######## Command Handler ########
	// ---------------------------------------
	if(Bot.Commands.length > 0) {
		for(cmi = 0; cmi < Bot.Commands.length; cmi++) {
			var cmd = Bot.Commands[cmi].Command;
			//Println(cmd);
			if(msg.Content.hasPrefix(cmd)) {
				Bot.Commands[cmi].Callback();
				console.log("Running Commands => " + cmd);
			}
		}
	}
	// ---------------------------------------

	// Autonomous system.
	var isa = false;
	Exists("lennox/data/ars.json") ? (isa = true) : (isa = false)
	if(isa) {
		var f = OpenFile("lennox/data/ars.json");
		var ars = JSON.parse(f);
		if(ars[msg.Content]) {
			var resp = ars[msg.Content];
			resp = Replace(resp, "$username", msg.Author.Username);
			resp = Replace(resp, "$user", "<@" + msg.Author.ID + ">");

			if(Contains(resp, "$pm")) {
				resp = Replace(resp, "$pm", "");
				MessageUser(msg.Author.ID, resp);
			} else {
				SendMessage(msg.ChannelID, resp);
			}
		}
	}
} // Check if everything passed the checks!