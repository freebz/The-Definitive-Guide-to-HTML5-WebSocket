// 코드 6-13 마우스 이벤트

var doMouseEvent = function ($this, e) {
    var event = new CompositeStream();

    event.appendBytes(5);	 // type (u8 5)
    event.appendBytes($this.buttonMask);

    // 좌표
    event.appendUint16(e.offsetX);
    event.appendUint16(e.offsetY);

    sendBytes($this, event.consume(event.length));
}
