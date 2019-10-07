// 코드 6-12 copyRect() 함수

$prototype.copyRect = function copyRect(width, height, xPos, yPos, xSrc, ySrc) {
    // 현재 프레임버퍼에서 화소 데이터를 가져옴
    var imageData = this.context.getImageData(xSrc, ySrc, width, height);
    // 대상 좌표에 화소 데이터를 넣음
    this.context.putImageData(imageData, xPos, yPos);
}
