// 코드 6-5 bindSocketHandlers() 함수

var bindSocketHandlers = function($this, socket) {
    socket.onopen = function(e) {
	// 웹소켓 open 이벤트를 무시.
	// 서버는 첫 번째 메시지를 송신한다
    }

    var stream = $this.stream;
    socket.onmessage = function messageHandler(e) {
	// 스트림 뒤에 바이트 추가
	stream.append(e.data);
	// 읽기 핸들러 루프
	while($this.readHandler($this, stream)) {
	    // 아무것도 하지 않음
	}
    }

    socket.onclose = socket.onerror = function() {
	console.log("연결 닫힘", arguments);
    }
}
