// 코드 4-14 Strophe.js를 이용해 메시지 생성

// 채팅 UI
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
