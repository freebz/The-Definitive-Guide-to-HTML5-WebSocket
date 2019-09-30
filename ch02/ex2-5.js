// 코드 2-5 문자열(String) 타입 message 이벤트 핸들러 예제

// String 타입의 메시지가 도착하면 실행도리 이벤트 핸들러
ws.onmessage = function(e) {
    if(typeof e.data === "string") {
	console.log("String 메시지가 도착했습니다", e, e.data);
    } else {
	console.log("String 이외 타입의 메시지가 도착했습니다", e, e.data);
    }
};
