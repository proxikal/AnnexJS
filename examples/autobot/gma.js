var joined = Instance;
// Options you can change.
var useGreet = true;
var useAutoRole = true;
var RoleName = "Member";

// Choose your channels!.
// You need to change this to the channel id you want
var GreetChannel = Server.Channels[0].ID;
var AutoChannel = Server.Channels[0].ID;

if(useGreet) {
	SendMessage(GreetChannel, joined.User.Username + " has joined the server!");
}

if(useAutoRole) {
	var exists = false;
	for(i = 0; i < Server.Roles.length; i++) {
		if(Server.Roles[i].Name == RoleName) {
			GiveRole(joined.GuildID, joined.User.ID, Server.Roles[i].ID);
			SendMessage(AutoChannel, "I have given " + joined.User.Username + " the role `" + RoleName + "`");
			exists = true;
		}
	}
	if(!exists) {
		SendMessage(AutoChannel, "The role `" + RoleName + "` no longer exists.");
	}
}
