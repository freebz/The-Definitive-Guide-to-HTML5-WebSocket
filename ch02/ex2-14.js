// 코드 2-14 웹소켓을 통해 2진 메시지를 전송

// Blob 타입의 메시지를 전송
var blob = new Blob("blob 타입의 콘텐츠");
ws.send(blob);

// ArrayBuffer 타입의 메시지를 전송
var a = new Unit8Array([8,6,7,5,3,0,9]);
ws.send(a.buffer);
