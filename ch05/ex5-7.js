// 코드 5-7 자바스크립트 코드에 사용할 변수를 선언

// ActiveMQ STOMP 연결 URL
var url = "ws://0.0.0.0:61614/stomp";
// ActiveMQ 사용자명과 암호. 기본값은 둘 다 guest이다.
var un, pw = "guest";

var client, src, dest;

// 로컬/원격 사용자의 차례가 돌아왔는지 여부의 상태를 저장할 변수
var hasUserPicked, hasOpponentPicked = false;

// 플레이어 2에 표시될 세 버튼과 플레이어 2의 선택을 나타내는 변수를 표시하는 HTML 코드
var opponentsBtns = '<button id="opponentScissorsBtn" name="opponentScissors" disabled="disabled">가위</button>' +
    '<button id="opponentRockBtn" name="opponentRock" disabled="disabled">바위</button>' +
    '<button id="opponentPaperBtn" name="opponentPaper" disabled="disabled">보</button>';
var opponentsPick;

// 플레이어 1의 세 버튼을 나타내는 변수
var rockBtn, paperBtn, scissorsBtn;
