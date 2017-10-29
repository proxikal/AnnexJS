/*
#####################################################
  ___     _          ___          
 | _ \___| |__  ___ / __|___ _ __ 
 |   / _ \ '_ \/ _ \ (__/ _ \ '_ \
 |_|_\___/_.__/\___/\___\___/ .__/
                            |_|   
#####################################################
## This bot was created as an example of what AnnexJS can do.
## You're free to use and learn from this source as you wish.
## ----------------------------------------------------------
## Bot Requirements (Otherwise you will have issues):
## If you set the punishments to kick or ban, the bot needs those permissions.
## If you want the bot to delete offensive messages he needs manage messages permissions.
## ----------------------------------------------------------
*/
var f = OpenFile("config.json");
var config = JSON.parse(f);
// Setup the bot system.

var System = {};
// Bot token required to login to discord.
System.Token = config.token;
// The project source path.
System.Path = "robocop/";
// The bot owner
System.Owner = "146046383726657536";
// Keep the bot alive until you type something.
System.StayAlive = true;
// Check for updates?
System.AutoUpdate = true;

// List All the events you want to cover, along with the file path.
// If you don't need or want an event, leave the path as ""
System.Events = {
	messageCreate: System.Path + "messageCreate.js"
};

console.log("Logging into Robocop v0.1");
