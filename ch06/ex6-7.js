// 코드 6-7 프레임버퍼 요청

var doUpdateRequest = function doUpdateRequest($this, incremental) {
    var request = new CompositeStream();

    request.appendBytes(3);	         // type (u8 3)
    request.appendBytes(1);	         // 증분

    request.appendBytes(0,0,0,0);        // 상단 왼쪽 모서리: x (u16 0) y (u16 0)
    request.appendUint16($this.width);   // width (u16 800)
    request.appendUint16($this.height);  // height (u16 600)

    sendBytes($this, request.consume(request.length));
}
