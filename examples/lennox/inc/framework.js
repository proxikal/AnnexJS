// Framework.js - v1.0
// Created for ease of deployment.
var Bot = {
	Prefix: "-",
	Blacklist: [],
	Commands: [],
	Botmaster: false,
	AllowPM: true,
	isPrivate: function() {
		if(Channel.Type == 0) { return false; }
		if(Channel.Type == 1) { return true; }
		if(Channel.Type == 3) { return true; }
		return false;
	},
	regCommand: function(command, callback) {
		var prod = {};
		prod.Command = command;
		prod.Callback = callback;
		this.Commands.push(prod);
	},
	listCommands: function() {
		var data = "```";
		if(this.Commands.length > 0) {
			for(i = 0; i < this.Commands.length; i++) {
				data = data + this.Commands[i].Command + "\n";
			}
		}
		return data + "```";
	},
	Externals: {
		WeatherAPI: ""
	}
};

// Initiate the msg variable for the messageCreate event.
var msg = Instance;