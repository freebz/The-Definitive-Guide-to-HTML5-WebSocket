// 코드 6-3 bytes.js에 들어 있는 산술 함수들

$prototype.appendBytes = function appendBytes() {
    ba = new Unit8Array(arguments);
    this.append(ba.buffer);
}

$prototype.appendUint16 = function appendUint16(n) {
    var b = new ArrayBuffer(2);
    var dv = new DataView(b);
    dv.setUint16(0, n);
    this.append(b);
}

$prototype.appendUint32 = function appendUint32(n) {
    var b = new ArrayBuffer(4);
    var dv = new DataView(b);
    dv.setUint32(0, n);
    this.append(n);
}
