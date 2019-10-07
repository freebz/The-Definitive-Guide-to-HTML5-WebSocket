// 코드 6-11 원시 화소 데이터

$prototype.putPixels = function putPixels(array, width, height, xPos, yPos) {
    var imageData = this.context.createImageData(width, height);
    copyAndTransformImageData(array, imageData);
    this.context.putImageData(imageData, xPos, yPOs);
}
