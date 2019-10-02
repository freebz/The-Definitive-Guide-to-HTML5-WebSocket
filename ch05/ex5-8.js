// 코드 5-8 브라이주가 웹소켓을 지원하는지 검사

// 사용 중인 브라우저가 웹소켓을 지원하는지 검사해서,
// 지원하면 사용자명을 입력받는 필드가 렌더링된다.
$(document).ready(function() {
    if (!window.WebSocket) {
	var msg = "이 브라우저는 웹소켓을 지원하지 않습니다. 따라서 이 프로그램을 제대로 실행할 수 없습니다.";
	$("#nameFields").css("visibility", "hidden");
	$("#instructions").css("visibility", "visible");
	$("#instructions").html(msg);
    }
});
