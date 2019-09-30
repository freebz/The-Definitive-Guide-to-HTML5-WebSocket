// 코드 2-11 연결이 채 열리기도 전에 메시지 전송을 시도

// 연결을 열면서 메시지 전송을 시도(이래서는 안 된다!)
var ws = new WebSocket("ws://echo.websocket.org")
ws.send("최초 데이터");
