function System() {
	var wordFile = "";
	var nameFile = "";
	var userFile = "";

	if(Exists("robocop/data/wordfilter.json")) {
		wordFile = OpenFile("robocop/data/wordfilter.json");
	}
	if(Exists("robocop/data/namefilter.json")) {
		nameFile = OpenFile("robocop/data/namefilter.json");
	}
	if(Exists("robocop/data/users.json")) {
		userFile = OpenFile("robocop/data/users.json");
	}

	// Load And Parse JSON into variables.
	this.users = JSON.parse(userFile);
	this.wordFilter = JSON.parse(wordFile);
	this.nameFilter = JSON.parse(nameFile);

	// Options
	this.maxStrikes = 0;
	// Max amount of mentions per message sent.
	this.maxMentions = 0;
	// Options: kick, ban or warn.
	this.minPunishment = "warn";
	// Options: kick, ban or warn.
	this.maxPunishment = "kick";

	// Punishment Messages.
	this.warnMessage = "";
	this.kickMessage = "";
	this.banMessage = "";

	// Auto delete the message?
	this.msgDelete = false;

	// Functions
	this.saveUsers = function() {
		var str = JSON.stringify(this.users, null, 2);
		SaveFile("robocop/data/users.json", str, 0777);
	};

	this.registerUser = function() {
		var newuser = {
			ID: msg.Author.ID,
			Username: msg.Author.Username,
			Strikes: 0,
			LastMention: 0,
			WordHistory: []
		};
		this.users.push(newuser);
		this.saveUsers();
	};

	this.userExists = function(user) {
		for(i = 0; i < this.users.length; i++) {
			if(this.users[i].ID == user) {
				return true;
			}
		}
		return false;
	};

	!this.userExists(msg.Author.ID) ? (this.registerUser()) : (void 0)

	this.userAddWord = function(user, word) {
		for(i = 0; i < this.users.length; i++) {
			if(this.users[i].ID == user) {
				this.users[i].WordHistory.push(word);
			}
		}
	};

	this.userAddStrike = function(user, amount) {
		for(i = 0; i < this.users.length; i++) {
			if(this.users[i].ID == user) {
				this.users[i].Strikes += amount;
			}
		}
	};

	this.SettlePunishment = function(a, u) {
		for(i = 0; i < this.users.length; i++) {
			if(this.users[i].ID == u) {
				if(this.users[i].Strikes >= this.maxStrikes) {
					// Find out the punishment for max strikes.
					if(this.maxPunishment == "warn") {
						SendMessage(msg.ChannelID, this.warnMessage);
					}

					if(this.maxPunishment == "kick") {
						Kick(Channel.GuildID, msg.Author.ID);
						if(error != "") {
							console.log(error);
						} else {
							SendMessage(msg.ChannelID, this.kickMessage);
						}
					}

					if(this.maxPunishment == "ban") {
						Ban(Channel.GuildID, msg.Author.ID);
						if(error != "") {
							console.log(error);
						} else {
							SendMessage(msg.ChannelID, this.banMessage);
						}
					}
					if(a == "Message") {
						DeleteMessage(msg.ChannelID, msg.ID);
					}
				} else {
					// Find out the punishment for min strikes.
					if(this.minPunishment == "warn") {
						SendMessage(msg.ChannelID, this.warnMessage);
					}

					if(this.minPunishment == "kick") {
						Kick(Channel.GuildID, msg.Author.ID);
						if(error != "") {
							console.log(error);
						} else {
							SendMessage(msg.ChannelID, this.kickMessage);
						}
					}

					if(this.minPunishment == "ban") {
						Ban(Channel.GuildID, msg.Author.ID);
						if(error != "") {
							console.log(error);
						} else {
							SendMessage(msg.ChannelID, this.banMessage);
						}
					}
					if(a == "Message") {
						DeleteMessage(msg.ChannelID, msg.ID);
					}
				}
			}
		}
	};

	this.EnableWordFilter = function() {
		if(this.wordFilter.length > 0) {
			for(i = 0; i < this.wordFilter.length; i++) {
				var slap = 0;
				// Regex based blocking.
				if(Contains(this.wordFilter[i], "regex=")) {
					var reg = this.wordFilter[i].split("regex=")[1];
					if(msg.Content.match(reg)) {
						if(this.userExists(msg.Author.ID)) {
							this.userAddWord(msg.Author.ID, this.wordFilter[i]);
							this.userAddStrike(msg.Author.ID, 1);
							this.SettlePunishment("Message", msg.Author.ID);
							this.saveUsers();
						}
						slap++;
					}
				}
				// Basic Text based blocking.
				if(Contains(msg.Content, this.wordFilter[i]) && slap == 0) {
					if(this.userExists(msg.Author.ID)) {
						this.userAddWord(msg.Author.ID, this.wordFilter[i]);
						this.userAddStrike(msg.Author.ID, 1);
						this.SettlePunishment("Message", msg.Author.ID);
						this.saveUsers();
					}
				}
			}
		}
	}; // End word filter

	this.EnableNameFilter = function() {
		if(this.nameFilter.length > 0) {
			for(i = 0; i < this.nameFilter.length; i++) {
				var slap = 0;
				// Regex based blocking.
				if(Contains(this.nameFilter[i], "regex=")) {
					var reg = this.nameFilter[i].split("regex=")[1];
					if(msg.Content.match(reg)) {
						if(this.userExists(msg.Author.ID)) {
							this.userAddStrike(msg.Author.ID, 1);
							this.SettlePunishment("Message", msg.Author.ID);
							this.saveUsers();
						}
						slap++;
					}
				}
				if(Contains(msg.Author.Username, this.nameFilter[i]) && slap == 0) {
					if(this.userExists(msg.Author.ID)) {
						this.userAddStrike(msg.Author.ID, 1);
						this.SettlePunishment("Message", msg.Author.ID);
						this.saveUsers();
					}
				}
			}
		}
	}; // End word filter

	this.mentionLimiter = function() {
		if(msg.Mentions.length > this.maxMentions) {
			if(this.userExists(msg.Author.ID)) {
				this.userAddStrike(msg.Author.ID, 1);
				this.SettlePunishment("Message", msg.Author.ID);
				this.saveUsers();
			}
		}
	};
}
