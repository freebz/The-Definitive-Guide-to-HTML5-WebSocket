// 코드 4-19 완성된 chat_app.js의 코드

// 출력 영역에 메시지를 기록
var output = document.getElementById("output");
function log(message) {
    var line = document.createElement("div");
    line.textContent = message;
    output.appendChild(line);
}

function connectHandler(cond) {
    if (cond == Strophe.Status.CONNECTED) {
	log("연결됐습니다");
	connection.send($pres());
    }
}

var url = "ws://localhost:5280/";
var connection = null;

var connectButton = document.getElementById("connectButton");
connectButton.onclick = function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    connection = new Strophe.Connection({proto: new Strophe.WebSocket(url)});
    connection.connect(username, password, connectHandler);

    // 핸들러 설정
    connection.addHandler(messageHandler, null, "message", "chat");
    connection.addHandler(presenceHandler, null, "presence", null);
    connection.addHandler(pingHandler, "urn:xmpp:ping", "iq", "get");
}

// 접속 상태 정보 업데이트 UI 생성
var presenceArea = document.getElementById("presenceArea");
var sel = document.createElement("select");
var availabilities = ["away", "chat", "dnd", "xa"];
var labels = ["자리 비움", "온라인", "다른 용무 중", "오프라인"];
for (var i=0; i<availabilities.length; i++) {
    var option = document.createElement("option");
    option.value = availabilities[i];
    option.text = labels[i];
    sel.add(option);
}
presenceArea.appendChild(sel);

var statusInput = document.createElement("input");
statusInput.setAttribute("placeholder", "사용자 상태");
presenceArea.appendChild(statusInput);

var statusButton = document.createElement("button");
statusButton.textContent = "사용자 상태를 업데이트";
statusButton.onclick = function() {
    var pres = $pres()
	.c("show").t(sel.value).up()
	.c("status").t(statusInput.value);
    connection.send(pres);
}
presenceArea.appendChild(statusButton);

function presenceHandler(presence) {
    var from = presence.getAttribute("from");
    var show = "";
    var status = "";

    Strophe.forEachChild(presence, "show", function(elem) {
	show = elem.textContent;
    });
    Strophe.forEachChild(presence, "status", function(elem) {
	status = elem.textContent;
    });

    // show나 status에 값이 있으면 다음과 같은 형식으로 표시
    if (show || status) {
	log("[presence] " + from + " : " + status + " " + show);
    }

    // 이 핸들러 함수가 반복적으로 호출되게 함
    return true;
}

// 채팅 UI 생성
var chatArea = document.getElementById("chatArea");
var toJid = document.createElement("input");
toJid.setAttribute("placeholder", "user@server");
chatArea.appendChild(toJid);

var chatBody = document.createElement("input");
chatBody.setAttribute("placeholder", "대화 내용");
chatArea.appendChild(chatBody);

var sendButton = document.createElement("button");
sendButton.textContent = "메시지 전송";
sendButton.onclick = function() {
    var message = $msg({to: toJid.value, type:"chat"})
	.c("body").t(chatBody.value);
    connection.send(message);
}
chatArea.appendChild(sendButton);

function messagehandler(message) {
    var from = message.getAttribute("from");
    var body = "";
    Strophe.forEachChild(message, "body", function(elem) {
	body = elem.textContent;
    });

    // body에 값이 있으면 다음과 같은 형식의 메시지를 기록
    if (body) {
	log(from + " : " + body);
    }

    // 이 핸들러 함수가 반복적으로 호출되게 함
    return true;
}

function pingHandler(ping) {
    var pingId = ping.getAttribute("id");
    var from = ping.getAttribute("from");
    var to = ping.getAttribute("to");

    var pong = $iq({type: "result", "to": from, id: pingId, "from": to});
    connection.send(pong);

    // 이 핸들러 함수가 반복적으로 호출되게 함
    return true;
}
