var left = Instance;
// Options you can change.
var useBye = true;
// Choose your channels!.
// You need to change this to the channel id you want
var ByeChannel = Server.Channels[0].ID;

if(useBye) {
	SendMessage(ByeChannel, left.User.Username + " has left the server!");
}
