// 코드 3-5 페이로드를 언마스크 처리하기

var unmask = function(mask_bytes, buffer) {
    var payload = new Buffer(buffer.length);
    for (var i=0; i<buffer.length; i++) {
	payload[i] = mask_bytes[i%4] ^ buffer[i];
    }
    return payload;
}
