// 코드 5-10 STOMP 연결을 설정하는 connect() 함수

// 연결을 설정하는 함수
var connect = function() {
    client = Stomp.client(url);
    client.connect(un, pw, onconnect, onerror);
};
