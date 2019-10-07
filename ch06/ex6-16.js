// 코드 6-16 KeyEvent() 함수

var doKeyEvent = function doKeyEvent($this, key, downFlag) {
    var event = new CompositeStream();

    event.appendBytes(4);	// bype (u8 4)
    event.appendBytes(downFlag);
    event.appendBytes(0,0);	// 패딩
    event.appendUint32(kye);

    sendBytes($this, event.consume(event.length));
}
