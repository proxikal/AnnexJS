/*
      .o.                       .             oooooooooo.                .   
     .888.                    .o8             `888'   `Y8b             .o8   
    .8"888.     oooo  oooo  .o888oo  .ooooo.   888     888  .ooooo.  .o888oo 
   .8' `888.    `888  `888    888   d88' `88b  888oooo888' d88' `88b   888   
  .88ooo8888.    888   888    888   888   888  888    `88b 888   888   888   
 .8'     `888.   888   888    888 . 888   888  888    .88P 888   888   888 . 
o88o     o8888o  `V88V"V8P'   "888" `Y8bod8P' o888bood8P'  `Y8bod8P'   "888" 
-----------------------------------------------------------------------------
## This bot was created as an example of what AnnexJS can do.
## You're free to use and learn from this source as you wish.
## ----------------------------------------------------------
## Bot Requirements (Otherwise you will have issues):
## The bot needs to have a role higher than the roles you want him to manage!
## The bot also needs to have manage role permissions.
## ----------------------------------------------------------
*/
var f = OpenFile("config.json");
var config = JSON.parse(f);
// Setup the bot system.

var System = {};
// Bot token required to login to discord.
System.Token = config.token;
// The project source path.
System.Path = "autobot/";
// The bot owner
System.Owner = "146046383726657536";
// Keep the bot alive until you type something.
System.StayAlive = true;
// Check for updates?
System.AutoUpdate = true;

// List All the events you want to cover, along with the file path.
// If you don't need or want an event, leave the path as ""
System.Events = {
	guildMemberAdd: System.Path + "gma.js",
	guildMemberRemove: System.Path + "gmr.js"
};

console.log("Logging into AutoBot v0.1");
