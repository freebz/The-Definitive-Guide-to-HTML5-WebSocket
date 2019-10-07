// 코드 6-4 RfbProtocolClient 연결 함수

RfbProtocolClient = function() {};

$prototype = RfbProtocalClient.prototype;

$prototype.connect = function(url) {
    this.socket = new WebSocket(url);
    this.socket.binaryType = "arraybuffer";
    this.stream = new CompositeStream();

    bindSocketHandlers(this, this.socket);

    this.buttonMask = 0;
    // 첫 번째 핸들러 지정
    this.readHandler = versionHandler;
}
