// 코드 2-2 하나의 프로토콜만 지원하는 WebSocket 생성자 예제

// myProtocol이라는 포로토콜 하나를 이용해 서버에 연결
var ws = new WebSocket("ws:echo.websocket.org", "myProtocol");
