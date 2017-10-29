var file = "var statusFile = OpenFile('lennox/data/status_list.json');\
var status = JSON.parse(statusFile);\
var i = Random(0, status.length);\
UpdateStatus(0, status[i]);";
Routine("1m", file, 0);