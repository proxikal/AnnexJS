// give <role name> - gives the role to the user typing the command
// give @User <rolename> - gives the role to the mentioned user.
Bot.regCommand(Bot.Prefix + "give ", function() {
	var user = msg.Author.ID;
	var role = msg.Content.CleanMentions().split(Bot.Prefix + "give ")[1];
	if(msg.Mentions.length > 0) {
		user = msg.Mentions[0].ID;
	}
	if((Bot.Botmaster) && (!Bot.isPrivate())) {
		if(user.hasRole(role) == false) {
			user.giveRole(role);
			if(error == "") {
				SendMessage(msg.ChannelID, "<@" + user + "> has been given the role `"+role+"`");
			} else {
				SendMessage(msg.ChannelID, "Something went wrong... `" + error + "`");
			}
		} else {
			SendMessage(msg.ChannelID, "<@" + user + "> already has this role.");	
		}
	}
});

// take <rolename> - takes the role from the user typing the command.
// take @User <rolename> - takes the role from the mentioned user.
Bot.regCommand(Bot.Prefix + "take ", function() {
if((Bot.Botmaster) && (!Bot.isPrivate())) {
	var user = msg.Author.ID;
	var role = msg.Content.CleanMentions().split(Bot.Prefix + "take ")[1];
	if(msg.Mentions.length > 0) {
		user = msg.Mentions[0].ID;
	}
	if(user.hasRole(role)) {
		user.takeRole(role);
		if(error == "") {
			SendMessage(msg.ChannelID, "The role has been taken away from <@" + user + ">");
		} else {
			SendMessage(msg.ChannelID, "Something went wrong... `" + error + "`");
		}
	} else {
		SendMessage(msg.ChannelID, "The user doesn't have this role.");
	}
}
});

// weather <zip>
// weather City, State (Zephyrhills, FL or Detroit, MI, etc..)
// weather London, UK
Bot.regCommand(Bot.Prefix + "weather ", function() {
	if(Bot.Externals.WeatherAPI != "") {
		var area = msg.Content.split(Bot.Prefix + "weather ")[1];
		var obj = GetJSON("http://api.wunderground.com/api/"+Bot.Externals.WeatherAPI+"/conditions/q/"+area+".json");
		var randColor = ["#00FF00", "#FF0000", "#0000FF", "#0F0F0F", "#000FFF", "#FFF000", "#F0FF00"];
		var maxRand = randColor.length;
		if(obj["current_observation"]) {
			var emb = {};
			emb.title = obj["current_observation"]["display_location"]["full"] + " Information";
			emb.color = HTML2Int(randColor[Math.floor(Math.random() * maxRand) + 1]);
			var thumb = {};
			thumb.url = obj["current_observation"]["image"]["url"];
			emb.thumbnail = thumb;
			var footer = {};
			footer.text = obj["current_observation"]["observation_time"];
			emb.footer = footer;
			var fields = new Array();

			var f1 = {};
			f1.name = "Currently";
			f1.value = obj["current_observation"]["weather"];
			f1.inline = true;

			var f2 = {};
			f2.name = "Temperature";
			f2.value = obj["current_observation"]["temperature_string"];
			f2.inline = true;

			var f3 = {};
			f3.name = "Humidity";
			f3.value = obj["current_observation"]["relative_humidity"].toString();
			f3.inline = true;

			var f4 = {};
			f4.name = "Wind Direction";
			f4.value = obj["current_observation"]["wind_dir"].toString();
			f4.inline = true;

			var f5 = {};
			f5.name = "Wind Speeds";
			f5.value = obj["current_observation"]["wind_mph"] + "mph";
			f5.inline = true;

			var f6 = {};
			f6.name = "Feels Like:";
			f6.value = obj["current_observation"]["feelslike_string"].toString();
			f6.inline = true;

			fields.push(f1, f2, f3, f4, f5, f6);
			emb.fields = fields;
			SendEmbed(msg.ChannelID, emb);
		}
	} else {
		// Throw an error.
		SendMessage(msg.ChannelID, "Missing Weather underground API Key.");
	}
});

// gif <keyword>
Bot.regCommand(Bot.Prefix + "gif ", function() {
	var key = msg.Content.split(Bot.Prefix + "gif ")[1];
	var original = key;
	if(key.indexOf(" ") >= 0) {
		key = key.Alter(" ", "-");
	}

	var obj = GetJSON("http://api.tenor.co/v1/search?tag=" + key); // Collect Info from API.
	if(obj.results.length > 0) {
	    // Displays the first image from Tenor GIF Website.
	    SendMessage(msg.ChannelID, "Results for: `" + original + "`:\n" + obj.results[0].url);
	} else {
	    // results array is empty.
	    SendMessage(msg.ChannelID, "Sorry, no results found!");
	}
});

// emb
// -t(Embed Title),
// -d(Embed Description),
// More about this command at https://github.com/proxikal/AnnexJS/examples/lennox
Bot.regCommand(Bot.Prefix + "emb ", function() {
	var data = msg.Content.split(Bot.Prefix + "emb ")[1];
	var obj = data.embedThis();
	SendEmbed(msg.ChannelID, obj);
});

Bot.regCommand(Bot.Prefix + "help", function() {
	SendMessage(msg.ChannelID, "There are `" + Bot.Commands.length + "` command(s) in my registry:" + Bot.listCommands() + "learn more at https://github.com/proxikal/AnnexJS/examples/lennox");
});

// status add New Status Here!
Bot.regCommand(Bot.Prefix + "status add ", function() {
	if(Bot.Botmaster) {
		var status = msg.Content.split("status add ")[1];
		var sFile = OpenFile("lennox/data/status_list.json");
		var sList = JSON.parse(sFile);
		sList.push(status);
		var str = JSON.stringify(sList);
		SaveFile("lennox/data/status_list.json", str, 0777);
	}
});

// status lst
Bot.regCommand(Bot.Prefix + "status lst", function() {
	var data = "```";
	if(Bot.Botmaster) {
		var sFile = OpenFile("lennox/data/status_list.json");
		var sList = JSON.parse(sFile);
		for(e = 0; e < sList.length; e++) {
			data = data + "[" + e + "] " + sList[e] + "\n";
		}
		if(sList.length == 0) {
			data = data + "No status messages available";
		}
	}
	if(data != "```") {
		SendMessage(msg.ChannelID, data + "```");
	}
});

// status rem StatusID
Bot.regCommand(Bot.Prefix + "status rem ", function() {
	if(Bot.Botmaster) {
		var ind = msg.Content.split("status rem ")[1];
		var sFile = OpenFile("lennox/data/status_list.json");
		var sList = JSON.parse(sFile);
		var chk = false;
		for(e = 0; e < sList.length; e++) {
			if(e == parseInt(ind)) {
				chk = true;
			}
		}
		if(chk == true) {
			sList.splice(ind, 1);
			SendMessage(msg.ChannelID, "The status has been removed.");
		} else {
			SendMessage(msg.ChannelID, "The Status ID doesn't exist.");
		}
	}
});

// auto add Trigger=>Response
Bot.regCommand(Bot.Prefix + "auto add ", function() {
	var trigger = "";
	var response = "";
	var dat = msg.Content.split(Bot.Prefix + "auto add ")[1];
	trigger = dat.split("=>")[0];
	response = dat.split("=>")[1];

	var chk = false;
	Exists("lennox/data/ars.json") ? (chk = true) : (chk = false)
	if(!chk) {
		var f = "{}";
		SaveFile("lennox/data/ars.json", f, 0777);
		pass = true;
	}

	if(chk) {
		var f = OpenFile("lennox/data/ars.json");
		var ars = JSON.parse(f);
		if(response != "") {
			ars[trigger] = response;
		}
		var str = JSON.stringify(ars, null, 2);
		SaveFile("lennox/data/ars.json", str, 0777);
		SendMessage(msg.ChannelID, "You have added " + trigger + " to the autonomous system");
	}
});

// auto rem Trigger
Bot.regCommand(Bot.Prefix + "auto rem ", function() {
	var chk = false;
	Exists("lennox/data/ars.json") ? (chk = true) : (chk = false)
	if(chk) {
		var f = OpenFile("lennox/data/ars.json");
		var ars = JSON.parse(f);
		var trigger = msg.Content.split(Bot.Prefix + "auto rem ")[1];
		if(ars[trigger]) {
			delete ars[trigger];
			SendMessage(msg.ChannelID, "The rule has been removed!");
			var str = JSON.stringify(ars, null, 2);
			SaveFile("lennox/data/ars.json", str, 0777);
		} else {
			SendMessage(msg.ChannelID, "The rule doesn't exist.");
		}
	}
});

Bot.regCommand(Bot.Prefix + "auto lst", function() {
	if(Bot.Botmaster) {
		if(Exists("lennox/data/ars.json")) {
			var f = OpenFile("lennox/data/ars.json");
			var ars = JSON.parse(f);
			var data = "```";
			console.log("go");
			for(var key in ars) {
				data = data + key + " => " + ars[key] + "\n";
			}

			if(data != "```") {
				SendMessage(msg.ChannelID, data + "```");
			} else {
				SendMessage(msg.ChannelID, "Your autonomous system is empty.");
			}
		} else {
			SendMessage(msg.ChannelID, "`ars.json` is missing from the `data/` folder.");
		}
	}
});

// blacklist add @User
Bot.regCommand(Bot.Prefix + "blacklist add ", function() {
	if(Bot.Botmaster) {
		if(msg.Mentions.length > 0) {
			var f = OpenFile("lennox/data/blacklist.json");
			var bl = JSON.parse(f);
			var pass = true;
			for(a = 0; a < bl.length; a++) {
				if(bl[a] == msg.Mentions[0].ID) {
					pass = false;
				}
			}
			if(pass) {
				bl.push(msg.Mentions[0].ID);
				var str = JSON.stringify(bl);
				SaveFile("lennox/data/blacklist.json", str, 0777);
				SendMessage(msg.ChannelID, "The user has been blacklisted from my system.");
			} else {
				SendMessage(msg.ChannelID, "The user already exists on the blacklist.");
			}
		} else {
			SendMessage(msg.ChannelID, "You need to mention the user.");
		}
	}
});

// blacklist rem @User
Bot.regCommand(Bot.Prefix + "blacklist rem ", function() {
	if(Bot.Botmaster) {
		if(msg.Mentions.length > 0) {
			var f = OpenFile("lennox/data/blacklist.json");
			var bl = JSON.parse(f);
			var pass = false;
			var ind = -1;
			for(a = 0; a < bl.length; a++) {
				if(bl[a] == msg.Mentions[0].ID) {
					pass = true;
					ind = a;
				}
			}

			if(pass) {
				bl.splice(ind, 1);
				var str = JSON.stringify(bl);
				SaveFile("lennox/data/blacklist.json", str, 0777);
				SendMessage(msg.ChannelID, "The user has been removed from my blacklist");
			} else {
				SendMessage(msg.ChannelID, "The user doesn't exist in my blacklist.");
			}
		}
	}
});


Bot.regCommand(Bot.Prefix + "blacklist lst", function() {
	if(Bot.Botmaster) {
		var f = OpenFile("lennox/data/blacklist.json");
		var bl = JSON.parse(f);
		var data = "```\n";
		for(a = 0; a < bl.length; a++) {
			data += bl[a] + "\n";
		}
		if(data != "```\n") {
			SendMessage(msg.ChannelID, data + "```");
		} else {
			SendMessage(msg.ChannelID, "The blacklist is empty.");
		}
	}
});


Bot.regCommand(Bot.Prefix + "info", function() {
	SendMessage(msg.ChannelID, "AnnexJS `" + annexjs.Build + " r" + annexjs.Version + "`");
});