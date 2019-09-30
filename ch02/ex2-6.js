// 코드 2-6 블랍(Blob) 타입 message 이벤트 핸들러 예제

// binaryType 속성에 Blob 값을 지정 (Blob이 기본값이다)
ws.binaryType = "Blob";

// Blob 타입의 메시지 도착 시에 실행될 이벤트 핸들러
ws.onmessage = function(e) {
    if(e.data instanceof Blob) {
	console.log("Blob 메시지가 도착했습니다", e.data);
	var blob = new Blob(e.data);
    }
};
