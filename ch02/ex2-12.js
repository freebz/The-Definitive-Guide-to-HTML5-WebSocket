// 코드 2-12 open 이벤트를 기다렸다가 메시지를 전송

// 연결 open 이벤트를 기다렸다가 send() 메서드를 호출
var ws = new WebSocket("ws://echo.websocket.org")
ws.onopen = function(e) {
    ws.send("최초 데이터");
}
