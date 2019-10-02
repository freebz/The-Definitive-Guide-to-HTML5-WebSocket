// 코드 5-9 startGame() 함수

// 게임을 시작하는 함수, 플레이어 1과 플레이어 2의 이름이 전송되는 순간 호출됨
var startGame = function() {
    // 이름 입력 필드를 비활성화
    $("#myName").attr("disabled", "disabled");
    $("#opponentName").attr("disabled", "disabled");
    $("#goBtn").attr("disabled", "disabled");
    // 안내 문구와 버튼을 보이게 함
    $("#instructions").css("visibility", "visible");
    $("#buttons").css("visibility", "visible");
    // 두 개의 큐는 입력받은 플레이어 이름을 그대로 사용함
    dest = "/queue/" + $("#opponentName").val();
    src = "/queue/" + $("#myName").val();
    connect();
};
