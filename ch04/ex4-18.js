// 코드 4-18 addHandler 함수를 등록

connection.addHandler(pingHandler, "urn:xmpp:ping", "iq", "get");
