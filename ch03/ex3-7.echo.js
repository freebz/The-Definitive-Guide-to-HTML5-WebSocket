// 코드 3-7 작성한 Server API를 토대로 Echo 서버 제작하기

var websocket = require("./websocket-example");

websocket.listen(9999, "localhost", function(conn) {
    console.log("연결 열림");

    conn.on("data", function(opcode, data) {
	console.log("메시지: ", data);
	conn.send(data);
    });

    conn.on("close", function(code, reason) {
	console.log("연결 닫힘: ", code, reason);
    });
});
