// 코드 2-7 배열 버퍼(ArrayBuffer) 타입 message 이벤트 핸들러 예제

// binaryType 속성에 ArrayBuffer 타입을 지정
ws.binaryType = "arraybuffer";

// ArrayBuffer 타입의 메시지가 도착하면 실행될 이벤트 핸들러
ws.onmessage = function(e) {
    if (e.data instanceof ArrayBuffer) {
	console.log("ArrayBuffer 메시지가 도착했습니다", + e.data);
	// e.data는 ArrayBuffer 타입의 객체다. 다음과 같이 이 객체의 바이트 뷰를 생성하자.
	var a = new Uint8Array(e.data);
    }
};
