// 코드 2-16 코드와 사유 인자를 전달하면서 close() 메서드를 호출

// 세션이 성공적으로 종료된 사유로 인해 웹소켓 연결을 닫음
ws.close(1000, "정상 종료합니다");