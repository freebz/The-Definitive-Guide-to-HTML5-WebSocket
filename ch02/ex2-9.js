// 코드 2-9 웹소켓 연결 close 이벤트 핸들러 예제

// 연결이 닫히면 실행될 이벤트 핸들러
ws.onclose = function(e) {
    console.log("연결이 닫혔습니다", e);
};
