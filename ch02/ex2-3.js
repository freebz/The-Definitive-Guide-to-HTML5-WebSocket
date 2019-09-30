// 코드 2-3 다수의 프로토콜을 지원하는 WebSocket 생성자 예제

// 다수의 프로토콜 중에서 선택하여 서버에 연결
var echoSocket = new WebSocket("ws://echo.websocket.org", ["com.kaazing.echo", "example.imaginary.protocol"]);

echoSocket.onopen = function(e) {
    // 서버가 선택한 프로토콜을 확인
    console.log(echoSocket.protocol);
}
