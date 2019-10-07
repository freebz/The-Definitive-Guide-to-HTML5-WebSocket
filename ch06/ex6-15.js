// 코드 6-15 마우스 클릭을 마우스 이벤트로서 전송

$prototype.mouseDownHandler = function($this, e) {
    if (e.which == 1) {
	// 좌클릭
	$this.buttonMask ^= 1;
    } else if (e.which == 3) {
	// 우클릭
	$this.buttonMask ^= (1<<2);
    }
    doMouseEvent($this, e);
}
