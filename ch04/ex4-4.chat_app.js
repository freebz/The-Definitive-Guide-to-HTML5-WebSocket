// 코드 4-4 chat_app.js 제 1차 버전

// 출력 영역에 메시지를 기록
var output = document.getElementById("output");
function log(message) {
    var line = document.createElement("div");
    line.textContent = message;
    output.appendChild(line);
}

function connectHandler(cond) {
    if (cond == Strophe.Status.CONNECTED) {
	log("연결됐습니다"); connection.send($pres());
    }
}

var url = "ws://localhost:5280/";
var connection = null;

var connectButton = document.getElementById("connectButton");
connectButton.onclick = function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    connection = new Strophe.Connection(
	{proto: new Strophe.Websocket(url)});
    connection.connect(username, password, connectHandler);
}
