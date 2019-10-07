// 코드 6-1 프록시 서버 코드

var websocket = require("./websocket-example");
var net = require("net");

var remotePort = 5900;
var remoteHost = "localhost";

websocket.listen(8080, "localhost", function(websocket) {
    // 백엔드 TCP 연결을 설정
    var tcpsocket = new net.Socket({type:"tcp4"});
    tcpsocket.connect(remotePort, remoteHost);

    // TCP 핸들러 함수들
    tcpsocket.on("connect", function() {
	console.log("TCP 연결 열림");
    });
    tcpsocket.on("data", function(data) {
	websocket.send(data);
    });
    tcpsocket.on("error", function() {
	console.log("TCP 연결 에러", arguments);
    });

    // 웹소켓 핸들러 함수들
    websocket.on("data", function(opcode, data) {
	tcpsocket.write(data);
    });
    websocket.on("close", function(code, reason) {
	console.log("웹솟켓 닫힘")
	// 백엔드 연결을 닫음
	tcpsocket.send();
    });

    console.log("웹소켓 연결 열림");
});
