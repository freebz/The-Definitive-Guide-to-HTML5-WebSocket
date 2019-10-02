// 코드 5-11 버튼을 렌더링함

// 연결이 설정되면 호출되는 함수
var onconnect = function() {
    console.log(url + "에 연결됐습니다");
    client.subscribe(src, function(message) {
	console.log("수신된 메시지: " + message.body);
	// 수신되는 메시지는 플레이어 2가 선택할 차례임을 나타냄.
	// 따라서 플레이어 2에 버튼을 그림.
	// 플레이어 1의 차례가 아직 돌아오지 않았으면 버튼이 든 div를 감추고,
	// 차례가 돌아왔을 때만 표시한다.
	hasOpponentPicked = true;
	if (!hasUserPicked) {
	    $("#opponentsButtons").css("visibility", "hidden");
	    $("#instructions").html("<p>상대방이 당신의 선택을 기다립니다. 하나를 선택하세요!</p>");
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
