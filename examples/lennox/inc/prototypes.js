// ## Internal functions v0.1;
// ## Created for ease of deployment.


// String prototypes
// ------------------------------------------------------------------
// trimPrefix
// prefix - the prefix you want trimmed.
String.prototype.trimPrefix = function(prefix) {
	return TrimPrefix(this, prefix);
}

// trimSuffix
// suffix - the suffix you want trimmed.
String.prototype.trimSuffix = function(suffix) {
	return TrimSuffix(this, suffix);
}

// hasPrefix
// prefix - the prefix you want checked.
String.prototype.hasPrefix = function(prefix) {
	return HasPrefix(this, prefix);
}

// hasSuffix
// suffix - the suffix you want checked.
String.prototype.hasSuffix = function(suffix) {
	return HasSuffix(this, suffix);
}

// Alter
// wth - The string you want to be replaced.
// wht - The string to replace with.
String.prototype.Alter = function(wth, wht) {
	return Replace(this, wth, wht);
}

// isMaster
// role - Discord master role name.
String.prototype.isMaster = function(role) {
	return MemberHasRole(this, role);
}

// hasRole
// role - The Discord role you want to check for.
String.prototype.hasRole = function(role) {
	return MemberHasRole(this, role);
}

String.prototype.giveRole = function(role) {
	// collect the server roles.
	usr = GetMember(Channel.GuildID, this);
	var usrRoles = new Array();
	for(i = 0; i < usr.Roles.length; i++) {
		usrRoles.push(usr.Roles[i]);
	}
	for(i = 0; i < Server.Roles.length; i++) {
		if(Server.Roles[i].Name == role) {
			usrRoles.push(Server.Roles[i].ID);
		}
	}
	EditMember(Channel.GuildID, this, usrRoles);
}

String.prototype.takeRole = function(role) {
	usr = GetMember(Channel.GuildID, this);
	var usrRoles = new Array();
	var trashIndex;
	var srvRole = "";
	// Grab the role id from the server.
	for(i = 0; i < Server.Roles.length; i++) {
		if(Server.Roles[i].Name == role) {
			srvRole = Server.Roles[i].ID;
		}
	}
	// Fill the array and collect trashIndex if exists.
	for(i = 0; i < usr.Roles.length; i++) {
		usrRoles.push(usr.Roles[i]);
		if(usr.Roles[i] == srvRole) {
			trashIndex = i;
		}
	}
	if(trashIndex != null) {
		usrRoles.splice(trashIndex, 1);
	}
	EditMember(Channel.GuildID, this, usrRoles);
}

// Roles
// type - Name / ID
String.prototype.Roles = function(type) {
	if(type == null) { type = "Name"; } // Give default type if one hasn't been given.
	var usr = GetMember(Channel.GuildID, this);
	var arr = new Array();
	if(type.toLowerCase() == "name") {
		for(i = 0; i < Server.Roles.length; i++) {
			if(this.hasRole(Server.Roles[i].Name)) {
				arr.push(Server.Roles[i].Name);
			}
		}
	} else {
		for(i = 0; i < Server.Roles.length; i++) {
			if(this.hasRole(Server.Roles[i].Name)) {
				arr.push(Server.Roles[i].ID);
			}
		}
	}
	return arr;
}

// isHTTP
String.prototype.isHTTP = function() {
	var chk;
	chk = this.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	if(chk != null) {
		return true;
	} else {
		return false;
	}
}

String.prototype.saveFile = function(path) {
	SaveFile(path, this, 0777);
	if(error != "") {
		console.log(error);
	}
}

// Number prototypes
// randomize
// max - the max number. (Hasto be larger than the number)
Number.prototype.randomize = function(max) {
	if(max > this) {
   		return Math.floor(Math.random() * max) + 1;
	} else {
		return 0;
	}
}

// Commafy
Number.prototype.Commafy = function() {
	var returnNum;
	if(this != null) {
	   	var dat = this.toString();
	   	var arrTheNumber = dat.split("").reverse();
	   	var newNum = Array();
	   	for(var i=0; i<arrTheNumber.length; i++){
	        newNum[newNum.length] = ((i%3===2) && (i<arrTheNumber.length-1)) ? "," + arrTheNumber[i]: arrTheNumber[i];
	   	}
	   	returnNum = newNum.reverse().join("");
	} else {
		returnNum = this;
	}
   return returnNum;
}

String.prototype.CleanMentions = function() {
	if(Contains(this, "<@")) {
		var c = this.split("<@")[1];
		if(Contains(c, "> ")) {
			c = c.split("> ")[0];
			return Replace(this, "<@"+c+"> ", "");
		}
		if(Contains(c, ">")) {
			c = c.split(">")[0];
			return Replace(this, "<@"+c+">", "");
		}
	} else {
		return this;
	}
}

String.prototype.embedThis = function() {
	var emb = {};
	var t = "";
	var d = "";
	var c = 0;
	var fields = new Array();
	var footer = {};
	var thumb = {};

	if(Contains(this, "-t(")) {
		t = this.split("-t(")[1];
		if(Contains(t, "),")) {
			t = t.split("),")[0];
		}
	}
	if(Contains(this, "-d(")) {
		d = this.split("-d(")[1];
		if(Contains(d, "),")) {
			d = d.split("),")[0];
		}
	}
	if(Contains(this, "-c(")) {
		c = this.split("-c(")[1];
		if(Contains(c, "),")) {
			c = c.split("),")[0];
		}
	}
	if(Contains(this, "-f(")) {
		ls = this.split("-f(");
		for(i = 1; i < ls.length; i++) {
			var dat = ls[i];
			if(Contains(dat, "),")) {
				var e = dat.split("),")[0];
				if(Contains(e, "|")) {
					var field = {};
					// Name|Value|True
					var data = e.split("|");
					if(data.length == 3) {
						field.name = e.split("|")[0];
						field.value = e.split("|")[1];
						if(e.split("|")[2].toLowerCase() == "true") {
							field.inline = true;
						} else {
							field.inline = false;
						}
						fields.push(field);
					}
				}
			}
		}
	}
	if(Contains(this, "-ft(")) {
		var f = this.split("-ft(")[1];
		f = f.split("),")[0];
		footer.text = f;
	}
	if(Contains(this, "-fi")) {
		var f = this.split("-fi(")[1];
		f = f.split("),")[0];
		footer.icon_url = f;
	}
	if(Contains(this, "-tn")) {
		var f = this.split("-tn(")[1];
		f = f.split("),")[0];
		thumb.url = f;
	}
	if(Contains(this, "-td")) {
		var f = this.split("-td(")[1];
		f = f.split("),")[0];
		if(Contains(f, "x")) {
			var ff = f.split("x");
			thumb.height = ff[1];
			thumb.width = ff[0];
		}
	}

	emb.title = t;
	emb.description = d;
	emb.color = HTML2Int(c);
	if(thumb != null) {
		emb.thumbnail = thumb;
	}
	if(footer != null) {
		emb.footer = footer;
	}
	if(fields.length > 0) {
		emb.fields = fields;
	}
	return emb;
}
