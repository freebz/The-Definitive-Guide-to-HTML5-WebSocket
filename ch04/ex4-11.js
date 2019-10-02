// 코드 4-11 수신되는 chat 타입의 메시지 스탠자를 감시

function messageHandler(message) {
    var from = message.getAttribute("from");
    var body = "";
    Strophe.forEachChild(message, "body", function(elem) {
	body = elem.textContent;
    });

    // body에 값이 있으면 다음과 같은 형식의 메시지를 기록
    if (body) {
	log(from + " : " + body);
    }

    // 이 핸들러 함수가 반복적으로 호출되게 함
    return true;
}
