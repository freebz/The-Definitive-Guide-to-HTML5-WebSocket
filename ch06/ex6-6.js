// 코드 6-6 versionHandler() 함수

var versionHandler = function($this, stream) {
    if (stream.length < 12) {
	return false;
    }

    var version = new Uint8Array(stream.consume(12));
    // 버전을 반송
    sendBytes($this, version.buffer)

    // 두 번째 핸들러 지정
    $this.readHandler = numSecurityTypesHandler;
    return true;
}
