// 코드 4-17 iq 스탠자에 핸들러 등록하기

function pingHandler(ping) {
    var pingId = ping.getAttribute("id");
    var from = ping.getAttribute("from");
    var to = ping.getAttribute("to");
    var pong = $iq({type: "result", "to": from, id: pingId, "from": to});
    connection.send(pong);

    // 이 핸들러 함수가 반복적으로 호출되게 함
    return true;
}
