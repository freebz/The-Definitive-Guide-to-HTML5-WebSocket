// 코드 2-13 readyState 속성을 검사해서 웹소켓 연결이 열렸는지 확인

// 발신 데이터를 처리한다. 소켓이 열린 상태이면 웹소켓에 전송한다.
function myEventHandler(data) {
    if (ws.readyState === WebSocket.OPEN) {
	// 소켓이 열린 상태이므로 데이터를 송신해도 된다.
	ws.send(data);
    } else {
	// 데이터를 무시하든지 큐에 저장하는 등
	// 여기엔 다른 작업 처리를 넣는다.
    }
}
