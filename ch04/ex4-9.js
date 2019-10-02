// 코드 4-9 접속 여부 업데이트를 처리

function presenceHandler(presence) {
    var from = presence.getAttribute("from");
    var show = "";
    var status = "";

    Strophe.forEachChild(presence, "show", function(elem) {
	show = elem.textContent;
    });
    Strophe.forEachChild(presence, "status", function(elem) {
	status = elem.textContent;
    });

    // show나 status에 값이 있으면 다음과 같은 형식으로 표시
    if (show || status) {
	log("[presence] " + from + " : " + status + " " + show);
    }

    // 이 핸들러 함수가 반복적으로 호출되게 함
    return true;
}
