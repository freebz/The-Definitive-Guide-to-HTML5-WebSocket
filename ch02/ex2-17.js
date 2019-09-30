// 코드 2-17 bufferedAmount 속성의 사용 예

// 최대 버퍼 사이즈인 10kB로 지정
var THRESHOLD = 10240;

// 새 웹소켓 연결을 생성
var ws = new WebSocket("ws://echo.websocket.org/updates");

// open 이벤트를 감시
ws.onopen = function () {
    // 매초 업데이트 전송을 시도
    setInterval( function() {
	// 버퍼가 가득 차지 않았을 때만 전송
	if (ws.bufferedAmount < THRESHOLD) {
	    ws.send(getApplicationState());
	}
    }, 1000);
};
