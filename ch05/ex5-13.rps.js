// 코드 5-13 사용자 선택 옵션(가위, 바위, 보)에 따른 상호작용을 추가

// ActiveMQ STOMP 연결 URL
var url = "ws://0.0.0.0:61614/stomp";
// ActiveMQ 사용자명과 암호, 기본값은 둘 다 guest이다.
var un, pw = "guest";

var client, src, dest;

// 로컬/원격 사용자의 차례가 돌아왔는지 여부의 상태를 저장할 변수
var hasUserPicked, hasOpponentPicked = false;

// 플레이어 2에 표시도리 세 버튼과 플레이어 2의 선택을 나타내는 변수를 표시하는 HTML 코드
var opponentsBtns = '<button id="opponentScissorsBtn" name="opponentScissors" disabled="disabled">가위</button>' +
    '<button id="opponentRockBtn" name="opponentRock" disabled="disabled">바위</button>' +
    '<button id="opponentPaperBtn" name="opponentPaper" disabled="disabled">보</button>';
var opponentsPick;

// 플레이어 1의 세 버튼을 나타내는 변수;
var rockBtn, paperBtn, scissorsBtn;

// 사용 중인 브라우저가 웹소켓을 지원하는지 검사해서,
// 지원하면 사용자명을 입력받는 필드가 렌더링된다.
$(document).ready(function() {
    if (!window.WebSocket) {
	var msg = "이 브라우저는 웹소켓을 지원하지 않습니다. 따라서 이 프로그램을 제대로 실행할 수 없습니다.";
	$("#nameFields").css("visibility", "hidden");
	$("#instructions").css("visibility", "visible");
	$("#instructions").html(msg);
    }
});

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

// 연결을 설정하는 함수
var connect = function() {
    client = Stomp.client(url);
    client.connect(un, pw, onconnect, onerror);
};

// 연결이 설정되면 호출되는 함수
var onconnect = function() {
    console.loog(url + "에 연결됐습니다");
    client.subscribe(src, function(message) {
	console.log("수신된 메시지: " + message.body);
	// 수신되는 메시지는 플레이어 2가 선택할 차례임을 나타냄.
	// 따라서 플레이어 2에 버튼을 그림.
	// 플레이어 1의 차례가 아직 돌아오지 않았으면 버튼이 든 div를 감추고,
	// 차례가 돌아왔을 때만 표시한다.
	hasOpponentPicked = true;
	if (!hasUserPicked) {
	    $("#opponentsButtons").css("visibility", "hidden");
	    $("#instructions").html("<p>상대방이 당신의 선택을 기다립니다. 하나를 선택하세요</p>");
	} else {
	    $("#instructions").html("<p>결과:</p>");
	    client.disconnect( function() {
		console.log("연결이 종료됐습니다...");
	    })
	}
	$("#opponentsButtons").html(opponentsBtns);
	switch (message.body) {
 	    case "scissors" :
	        opponentsPick = "#opponentScissorsBtn";
	        break;
  	    case "rock"     :
 	        opponentsPick = "#opponentRockBtn";
	        break;
 	    case "paper"    :
	        opponentsPick = "#opponentPaperBtn";
	        break;
	}
	$(opponentsPick).css("background-color", "yellow");
    });
    console.log(src + "를 구독했습니다");
};

var onerror = function(error) {
    console.log(error);
};

var buttonClicked = function(btn) {
    client.send(dest, null, btn.name);
    hasUserPicked = true;
    console.log("송신한 메시지: " + btn.name);

    // 플레이어가 선택했음을 나타내기 위해 버튼 배경색을 오랜지로 할당한다.
    // 모든 버튼을 클릭 불가능하게 비활성화함
    $("#" + btn.id).css("background-color", "orange");
    $("#rockBtn").attr("disabled", "disabled");
    $("#paperBtn").attr("disabled", "disabled");
    $("#scissorsBtn").attr("disabled", "disabled");
    // 플레이어 2가 선택을 했는지 검사해서, 선택했으면
    // onconnect 함수에서 미리 그려놓았던 버튼을 표시함
    if (hasOpponentPicked) {
	$("#opponentsButtons").css("visibility", "visible");
	$("#instructions").html("<p>결과:</p>");
	client.disconnect(function() {
	    onerror = function() {};
	    console.log("연결이 종료됐습니다...");
	});
    } else {
	$("#instructions").html("<p>상대방의 선택을 기다립니다...</p>");
    }
};
