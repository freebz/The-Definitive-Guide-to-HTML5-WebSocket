// 코드 2-8 error 이벤트 핸들러 예제

// WebSocket 객체 안에서 에러가 발생하면 실행도리 이벤트 핸들러
ws.onerror = function(e) {
    console.log("WebSocket Error: ", e);
    // 에러를 처리할 사용자 정의 함수
    handleErrors(e);
};
