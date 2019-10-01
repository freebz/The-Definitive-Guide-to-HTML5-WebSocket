// 코드 3-6 자바스크립트로 Node.js를 이용해 만든 웹소켓 서버 API

// 웹소켓 서버 예제

// 웹소켓 프로토콜에 대한 공식 명세는
// http://tools.ietf.org/html/rfc6455를 참고하자.

var events = require("events");
var http = require("http");
var crypto = require("crypto");
var util = require("util");

// 웹소켓 프레임별 오피코드는
// http://tools.ietf.org/html/rfc6455#section-5.2를 참고하자.

var opcodes = { TEXT  : 1
    , BINARY: 2
    , CLOSE : 8
    , PING  : 9
    , PONG  : 10
};

var WebSocketConnection = function(req, socket, upgradeHead) {
    var self = this;

    var key = hashWebSocketKey(req.headers["sec-websocket-key"]);

    // 핸드쉐이크 응답
    // http://tools.ietf.org/html/rfc6455#section-4.2.2

    socket.write('HTTP/1.1 101 웹소켓 프로토콜 앤드셰이크\r\n' +
		 '업그레이드: 웹소켓\r\n' +
		 'sec-websocket-accept: ' + key +
		 '\r\n\r\n');

    socket.on("data", function(buf) {
	self.buffer = Buffer.concat([self.buffer, buf]);
	while(self._processBuffer()) {
	    // 완전한 프레임이 들어 있는 동안의 프로세스 버퍼
	}
    });

    socket.on("colse", function(had_error) {
	if (!self.closed) {
	    self.emit("close", 1006);
	    self.closed = true;
	}
    });

    // 연결 상태를 초기화
    this.socket = socket;
    this.buffer = new Buffer(0);
    this.closed = false;
}
util.inherits(WebSocketConnection, events.EventEmitter);

// 웹소켓 연결을 통해 텍스트나 2진 메시지를 송신하는 함수
WebSocketConnection.prototype.send = function(obj) {
    var opcode;
    var payload;
    if (Buffer.isBuffer(obj)) {
	opcode = opcodes.BINARY;
	payload = obj;
    } else if (typeof obj == "string") {
	opcode = opcodes.TEXT;
	// UTF-8로 인코딩된 문자열을 포함한 새 버퍼를 생성
	payload = new Buffer(obj, "utf8");
    } else {
	throw new Error("객체를 송신할 수 없습니다. 반드시 문자열이나 Buffer여야 합니다.");
    }
    this._doSend(opcode, payload);
}

// 웹소켓 연결을 닫는 함수
WebSocketConnection.prototype.close = function(code, reason) {
    var opcode = opcodes.CLOSE;
    var buffer;

    // 닫기와 사유를 암호화

    if (code) {
	buffer = new Buffer(Buffer.byteLength(reason) + 2);
	buffer.writeUInt16BE(code, 0);
	buffer.write(reason, 2);
    } else {
	buffer = new Buffer(0);
    }
    this.doSend(opcode, buffer);
    this.closed = true;
}

// 수신되는 바이트를 처리하는 함수
WebSocketConnection.prototype._processBuffer = function() {
    var buf = this.buffer;

    if (buf.length < 2) {
	// 읽어들인 데이터가 불충분하면 종료
	return;
    }

    var idx = 2;

    var b1 = buf.readUInt8(0);
    var fin = b1 & 0x80;
    var opcode = b1 & 0x0f;	// 하위 4비트
    var b2 = buf.readUInt8(1);
    var mask = b2 & 0x80;
    var length = b2 & 0x7f;	// 하위 7비트

    if (length > 125) {
	if (buf.length < 8) {
	    // 읽어들인 데이터가 불충분하면 종료
	    return;
	}

	if (length == 126) {
	    length = buf.readUInt16BE(2);
	    idx += 2;
	} else if (length == 127) {
	// 이 서버는 길이가 길면 처리할 수 없으므로 상위 4비트는 버린다.
	    var highBits = buf.readUInt32BE(2);
	    if (highBits != 0) {
		this.close(1009, "");
	    }
	    length = buf.readUInt32BE(6);
	    idx += 8;
	}
    }

    if (buf.length < idx + 4 + length) {
	// 읽어들인 데이터가 불충분하면 종료
	return;
    }

    maskBytes = buf.slice(idx, idx+4);
    idx += 4;
    var payload = buf.slice(idx, idx+length);
    payload = unmask(maskBytes, payload);
    this._handleFrame(opcode, payload);

    this.buffer = buf.slice(idx+length);
    return true;
}

WebSocketConnection.prototype._handleFrame = function(opcode, buffer) {
    var payload;
    switch (opcode) {
    case opcodes.TEXT:
	payload = buffer.toString("utf8");
	this.emit("data", opcode, payload);
	break;
    case opcodes.BINARY:
	payload = buffer;
	this.emit("data", opcode, payload);
	break;
    case opcodes.PING:
	// 핑에 대해 퐁으로 응답
	this._doSend(opcodes.PONG, buffer);
	break;
    case opcodes.PONG:
	// 퐁ㅇ르 무시함
	break;
    case opcodes.CLOSE:
	// 닫기와 원인을 파싱
	var code, reason;
	if (buffer.length >= 2) {
	    code = buffer.readUInt16BE(0);
	    reason = buffer.toString("utf8",2);
	}
	this.close(code, reason);
	this.emit("close", code, reason);
	break;
    default:
	this.close(1002, "잘못된 어피코드입니다");
    }
}

// 웹소켓 메시지를 형식화해서 송신하는 함수
WebSocketConnection.prototype._doSend = function(opcode, payload) {
    this.socket.write(encodeMessage(opcode, payload));
}

var KEY_SUFFIX = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
var hashWebSocketKey = function(key) {
    var sha1 = crypto.createHash("sha1");
    sha1.update(key+KEY_SUFFIX, "ascii");
    return sha1.digest("base64");
}

var unmask = function(maskBytes, data) {
    var payload = new Buffer(data.length);
    for (var i=0; i<data.length; i++) {
	payload[i] = maskBytes[i%4] ^ data[i];
    }
    return payload;
}

var encodeMessage = function(opcode, payload) {
    var buf;
    // 첫 번째 바이트: fin과 오피코드
    var b1 = 0x80 | opcode;
    // 항상 메시지를 한 프레임(fin)으로 송신한다.

    // 두 번째 바이트: mask와 length 파트1
    // 이어지는 길이의 0 또는 2 또는 4바이트가 뒤에 추가로 붙음
    var b2 = 0; // 서버가 프레임을 마스킹하지 않음
    var length = payload.length;
    if (length<126) {
	buf = new Buffer(payload.length + 2 + 0);
	// 추가 0바이트
	buf.writeUInt8(b1, 0);
	buf.writeUInt8(b2, 1);
	payload.copy(buf, 2);
    } else if (length<(1<<16)) {
	buf = new Buffer(payload.length + 2 + 2);
	// 추가 2바이트
	b2 |= 126;
	buf.writeUInt8(b1, 0);
	buf.writeUInt8(b2, 1);
	// 2바이트 길이를 추가
	buf.writeUInt16BE(length, 2);
	payload.copy(buf, 4);
    } else {
	buf = new Buffer(payload.length + 2 + 8);
	// 추가 8바이트
	b2 |= 127;
	buf.writeUInt8(b1, 0);
	buf.writeUInt8(b2, 1);
	// 8바이트 길이를 추가
	// 참고: 이 구현 함수는 2^32보다 긴 길이를 처리할 수 없다.
	// 32비트 길이는 앞에 0x0000가 붙는다.
	buf.writeUInt32BE(0, 2);
	buf.writeUInt32BE(length, 6);
	payload.copy(buf, 10);
    }
    return buf;
}

exports.listen = function(port, host, connectionHandler) {
    var srv = http.createServer(function(req, res) {
    });

    srv.on('upgrade', function(req, socket, upgradeHead) {
	var ws = new WebSocketConnection(req, socket, upgradeHead);
	connectionHandler(ws);
    });

    srv.listen(port, host);
};
