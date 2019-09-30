// 코드 2-19 브라우저에 웹소켓 기능이 있는지 알아내는 클라이언트 코드

if (window.WebSocket) {
    console.log("이 브라우저는 웹소켓을 지원하네요!");
} else {
    console.log("이 브라우저엔 웹소켓 기능이 없군요.");
}
