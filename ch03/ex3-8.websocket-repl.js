// 코드 3-8 websocket-repl.js

var websocket = require("./websocket-example");
var repl = require("repl");

var connections = Object.create(null);

var remoteMultiEval = function(cmd, context, filename, callback) {
    for (var c in connections) {
	connections[c].send(cmd);
    }
    callback(null, "(결과 유보)");
}

websocket.listen(9999, "localhost", function(conn) {
    conn.id = Math.random().toString().substr(2);
    connections[conn.id] = conn;
    console.log("새 연결: " + conn.id);

    conn.on("data", function(opcode, data) {
	console.log("\t" + conn.id + ":\t" + data);
    });
    conn.on("close", function() {
	// 연결 제거
	delete connections[conn.id];
    });
});

repl.start({"eval": remoteMultiEval});
