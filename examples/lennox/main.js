/*
 __       _______ .__   __. .__   __.   ______   ___   ___ 
|  |     |   ____||  \ |  | |  \ |  |  /  __  \  \  \ /  / 
|  |     |  |__   |   \|  | |   \|  | |  |  |  |  \  V  /  
|  |     |   __|  |  . `  | |  . `  | |  |  |  |   >   <   
|  `----.|  |____ |  |\   | |  |\   | |  `--'  |  /  .  \  
|_______||_______||__| \__| |__| \__|  \______/  /__/ \__\ 
-------------------------------------------------------------
## This bot was created as an example of what AnnexJS can do.
## You're free to use and learn from this source as you wish.
## ----------------------------------------------------------
## Bot Requirements (Otherwise you will have issues):
## None as of yet...
## ----------------------------------------------------------
*/
var f = OpenFile("config.json");
var config = JSON.parse(f);
// Setup the bot system.

var System = {};
// Bot token required to login to discord.
System.Token = config.token;
// The project source path.
System.Path = "lennox/";
// The bot owner
System.Owner = "146046383726657536";
// Keep the bot alive until you type something.
System.StayAlive = true;
// Check for updates?
System.AutoUpdate = true;

// List All the events you want to cover, along with the file path.
// If you don't need or want an event, leave the path as ""
System.Events = {
	messageCreate: System.Path + "messageCreate.js",
	onReady: System.Path + "onReady.js"
};

console.log("Logging into Lennox v0.1");